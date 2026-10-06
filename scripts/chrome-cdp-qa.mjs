import assert from "node:assert/strict";
import { createServer } from "node:http";
import { access, mkdtemp, mkdir, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";

const root = resolve(new URL("..", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1"));
const worker = (await import(`${new URL(`file:///${resolve(root, "dist/server/index.js").replaceAll("\\", "/")}`).href}?qa=${Date.now()}`)).default;
const chromePath = process.env.GABA_CHROME_PATH || "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
await access(chromePath);

function freePort() {
  return new Promise((resolvePort, reject) => {
    const probe = createServer();
    probe.once("error", reject);
    probe.listen(0, "127.0.0.1", () => {
      const port = probe.address().port;
      probe.close(() => resolvePort(port));
    });
  });
}

function sleep(ms) { return new Promise((resolveSleep) => setTimeout(resolveSleep, ms)); }

async function waitForJson(url, timeoutMs = 8000) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    try {
      const response = await fetch(url);
      if (response.ok) return response.json();
    } catch (_) {}
    await sleep(100);
  }
  throw new Error(`Timed out waiting for ${url}`);
}

class CdpClient {
  constructor(url) {
    this.socket = new WebSocket(url);
    this.nextId = 0;
    this.pending = new Map();
    this.events = new Map();
  }
  async connect() {
    await new Promise((resolveOpen, rejectOpen) => {
      this.socket.addEventListener("open", resolveOpen, { once: true });
      this.socket.addEventListener("error", rejectOpen, { once: true });
    });
    this.socket.addEventListener("message", (event) => {
      const message = JSON.parse(event.data);
      if (message.id && this.pending.has(message.id)) {
        const pending = this.pending.get(message.id);
        this.pending.delete(message.id);
        if (message.error) pending.reject(new Error(message.error.message));
        else pending.resolve(message.result || {});
        return;
      }
      const listeners = this.events.get(message.method) || [];
      listeners.forEach((listener) => listener(message.params || {}));
    });
  }
  call(method, params = {}) {
    const id = ++this.nextId;
    return new Promise((resolveCall, rejectCall) => {
      this.pending.set(id, { resolve: resolveCall, reject: rejectCall });
      this.socket.send(JSON.stringify({ id, method, params }));
    });
  }
  once(method, timeoutMs = 8000) {
    return new Promise((resolveEvent, rejectEvent) => {
      const listeners = this.events.get(method) || [];
      const listener = (params) => {
        this.events.set(method, listeners.filter((item) => item !== listener));
        clearTimeout(timer);
        resolveEvent(params);
      };
      this.events.set(method, [...listeners, listener]);
      const timer = setTimeout(() => {
        this.events.set(method, (this.events.get(method) || []).filter((item) => item !== listener));
        rejectEvent(new Error(`Timed out waiting for CDP event ${method}`));
      }, timeoutMs);
    });
  }
  close() { this.socket.close(); }
}

async function evaluate(client, expression) {
  const result = await client.call("Runtime.evaluate", { expression, returnByValue: true, awaitPromise: true });
  if (result.exceptionDetails) throw new Error(result.exceptionDetails.text || "Runtime evaluation failed");
  return result.result?.value;
}

const httpPort = await freePort();
const debugPort = await freePort();
const server = createServer(async (request, response) => {
  const upstream = await worker.fetch(new Request(`http://127.0.0.1:${httpPort}${request.url || "/"}`, { method: request.method }));
  response.statusCode = upstream.status;
  for (const [key, value] of upstream.headers) response.setHeader(key, value);
  response.end(Buffer.from(await upstream.arrayBuffer()));
});
await new Promise((resolveListen) => server.listen(httpPort, "127.0.0.1", resolveListen));
const localQaOrigin = `http://127.0.0.1:${httpPort}`;
const qaOrigin = (process.env.GABA_QA_URL || localQaOrigin).replace(/\/+$/, "");

const profile = await mkdtemp(join(tmpdir(), "gaba-chrome-qa-"));
const chrome = spawn(chromePath, [
  "--headless=new", "--disable-gpu", "--no-sandbox", "--hide-scrollbars",
  `--remote-debugging-port=${debugPort}`, `--user-data-dir=${profile}`, "about:blank"
], { stdio: "ignore", windowsHide: true });
let client;
try {
  const version = await waitForJson(`http://127.0.0.1:${debugPort}/json/version`);
  const targets = await waitForJson(`http://127.0.0.1:${debugPort}/json/list`);
  const pageTarget = targets.find((target) => target.type === "page" && target.webSocketDebuggerUrl);
  if (!pageTarget) throw new Error("No page target exposed by Chrome DevTools Protocol");
  client = new CdpClient(pageTarget.webSocketDebuggerUrl);
  await client.connect();
  await client.call("Page.enable");
  await client.call("Runtime.enable");

  async function navigate(url) {
    const loaded = client.once("Page.loadEventFired");
    const targetUrl = url.startsWith(localQaOrigin) ? qaOrigin + url.slice(localQaOrigin.length) : url;
    await client.call("Page.navigate", { url: targetUrl });
    await loaded;
    await sleep(150);
  }
  async function screenshot(name) {
    const shot = await client.call("Page.captureScreenshot", { format: "png", captureBeyondViewport: false });
    const qaDir = resolve(root, "qa");
    await mkdir(qaDir, { recursive: true });
    await writeFile(resolve(qaDir, name), Buffer.from(shot.data, "base64"));
  }

  await navigate(`http://127.0.0.1:${httpPort}/`);
  await evaluate(client, "document.querySelector('#sort').value = 'human-source'; document.querySelector('#sort').dispatchEvent(new Event('change', { bubbles: true }))");
  assert.equal(await evaluate(client, "new URLSearchParams(location.search).get('sort')"), "human-source");
  assert.equal(await evaluate(client, "document.querySelector('#sort').value"), "human-source");
  assert.equal(await evaluate(client, "document.querySelector('#sort-help')?.hidden"), false);
  await navigate(`http://127.0.0.1:${httpPort}/`);
  assert.equal(await evaluate(client, "document.querySelector('#metric-total')?.textContent.trim()"), "384편");
  const health = await evaluate(client, "fetch('/api/health').then(function (response) { return response.json(); })");
  assert.equal(health.ok, true);
  assert.equal(health.records, 392);
  assert.equal(health.release?.snapshotVersion, 457);
  assert.equal(health.release?.siteVersion, 485);
  assert.equal(health.release?.sourceCommit, "bd958c5faec6c86dda8b99ea5dd09aecf777656a");
  assert.equal(health.release?.publicMirrorCommit, "e60d363a0133da4c59e65f1e1c44296650894d46");
  assert.ok(Number.isInteger(health.release?.currentCodeDeployment?.siteVersion));
  assert.match(health.release?.currentCodeDeployment?.sourceCommit || "", /^[0-9a-f]{40}$/);
  assert.match(health.release?.currentCodeDeployment?.publicMirrorCommit || "", /^[0-9a-f]{40}$/);
  assert.ok(health.stagedCandidates >= health.candidatePreviewCount);
  assert.ok(health.candidateExportCount >= health.stagedCandidates);
  assert.ok(health.candidatePreviewCount > 0);
  const speciesDistributionTotal = await evaluate(client, "document.querySelectorAll('#species-distribution [data-distribution-field=species]').length");
  const speciesDistributionHidden = await evaluate(client, "document.querySelectorAll('#species-distribution .distribution-item-extra[hidden]').length");
  assert.ok(speciesDistributionTotal > 8, `Expected all species distribution items, got ${speciesDistributionTotal}`);
  assert.ok(speciesDistributionHidden > 0, "Expected lower-ranked distribution items to start collapsed");
  await evaluate(client, "document.querySelector('#species-distribution .distribution-more').click()");
  assert.equal(await evaluate(client, "document.querySelectorAll('#species-distribution .distribution-item-extra[hidden]').length"), 0);
  assert.equal(await evaluate(client, "document.querySelector('#species-distribution .distribution-more')?.textContent"), "상위 항목만 보기");
  await evaluate(client, "document.querySelector('#species-distribution .distribution-more').click()");
  assert.equal(await evaluate(client, "document.querySelectorAll('#species-distribution .distribution-item-extra[hidden]').length"), speciesDistributionHidden);
  await evaluate(client, "document.querySelector('#species-distribution [data-distribution-value=\"설치류\"]').click()");
  assert.equal(await evaluate(client, "document.querySelector('#species-distribution [data-distribution-value=\"설치류\"]')?.getAttribute('aria-pressed')"), "true");
  assert.equal(await evaluate(client, "document.querySelector('#species-distribution [data-distribution-value=\"설치류\"]')?.classList.contains('active')"), true);
  await evaluate(client, "document.querySelector('#result-reset').click()");
  assert.equal(await evaluate(client, "document.querySelector('#species-distribution [data-distribution-value=\"설치류\"]')?.getAttribute('aria-pressed')"), "false");
  assert.equal(await evaluate(client, "Boolean(document.querySelector('[data-query=\"면역 타액 IgA\"]'))"), true);
  assert.equal(await evaluate(client, "document.querySelector('.search-suggestions-more')?.open"), false);
  assert.equal(await evaluate(client, "document.querySelector('.search-suggestions-more summary')?.textContent.includes('추천 검색어 더보기')"), true);
  await evaluate(client, "document.querySelector('.search-suggestions-more summary').click()");
  assert.equal(await evaluate(client, "document.querySelector('.search-suggestions-more')?.open"), true);
  assert.equal(await evaluate(client, "document.querySelectorAll('.search-suggestions-more-list .suggestion-button').length"), 5);
  await evaluate(client, "document.querySelector('.search-suggestions-more summary').click()");
  assert.equal(await evaluate(client, "document.querySelector('.search-suggestions-more')?.open"), false);
  await navigate(`http://127.0.0.1:${httpPort}/?intervention=${encodeURIComponent('수용체 약물·작용제')}`);
  assert.equal(await evaluate(client, "document.querySelector('[data-intervention=\"수용체 약물·작용제\"]')?.classList.contains('active')"), true);
  assert.equal(await evaluate(client, "new URLSearchParams(location.search).get('intervention')"), "수용체 약물·작용제");
  await navigate(`http://127.0.0.1:${httpPort}/?q=${encodeURIComponent('존재하지 않는 GABA 자료 검색어')}`);
  assert.equal(await evaluate(client, "Boolean(document.querySelector('[data-empty-reset]'))"), true);
  await evaluate(client, "document.querySelector('[data-empty-clear-query]').click()");
  assert.equal(await evaluate(client, "new URLSearchParams(location.search).has('q')"), false);
  assert.equal(await evaluate(client, "document.querySelectorAll('.paper-card').length > 0"), true);
  await navigate(`http://127.0.0.1:${httpPort}/?q=${encodeURIComponent('현수교 스트레스')}`);
  assert.equal(await evaluate(client, "document.querySelector('#papers')?.textContent.includes('Relaxation and immunity')"), true);
  await navigate(`http://127.0.0.1:${httpPort}/`);
  assert.equal(await evaluate(client, "Boolean(document.querySelector('[data-query=\"캐나다 모노그래프\"]'))"), true);
  await evaluate(client, "document.querySelector('[data-preset=source]').click()");
  assert.equal(await evaluate(client, "new URLSearchParams(location.search).get('source')"), "available");
  assert.equal(await evaluate(client, "document.querySelector('#papers .paper-card') !== null"), true);
  await navigate(`http://127.0.0.1:${httpPort}/?kind=${encodeURIComponent('규제')}&source=available`);
  assert.equal(await evaluate(client, "document.querySelector('#papers .regulatory-card') !== null"), true);
  await navigate(`http://127.0.0.1:${httpPort}/`);
  await navigate(`http://127.0.0.1:${httpPort}/?q=${encodeURIComponent('캐나다 모노그래프')}`);
  assert.equal(await evaluate(client, "document.querySelector('#papers')?.textContent.includes('인지기능 제품 모노그래프')"), true);
  await navigate(`http://127.0.0.1:${httpPort}/`);
  assert.equal(await evaluate(client, "Boolean(document.querySelector('.paper-card:not(.regulatory-card) .title-label')?.textContent.includes('한국어 분류 요약'))"), true);
  await evaluate(client, "document.querySelector('.marketing-filter-badge')?.click()");
  assert.equal(await evaluate(client, "Boolean(new URLSearchParams(location.search).get('marketing'))"), true);
  await navigate(`http://127.0.0.1:${httpPort}/`);
  assert.equal(await evaluate(client, "Boolean(document.querySelector('#freshness-label')?.textContent.trim())"), true);
  assert.notEqual(await evaluate(client, "document.querySelector('#freshness-label')?.textContent.trim()"), "매주 업데이트");
  assert.equal(await evaluate(client, "document.querySelector('#freshness-label')?.textContent.includes('탐색')"), true);
  assert.equal(await evaluate(client, "document.querySelector('#candidate-preview')?.hidden"), false);
  assert.equal(await evaluate(client, "document.querySelector('#candidate-preview-more')?.hidden"), false);
  assert.equal(await evaluate(client, "/^전체 \\d+$/.test(document.querySelector('[data-candidate-filter=all]')?.textContent.trim() || '')"), true);
  const automaticPriorityLabel = await evaluate(client, "document.querySelector('[data-candidate-filter=priority]')?.textContent.trim() || ''");
  assert.match(String(automaticPriorityLabel), /^자동 우선검토\s+\d+$/, `Unexpected automatic priority label: ${automaticPriorityLabel}`);
  assert.equal(await evaluate(client, "/^직접 근거 \\d+$/.test(document.querySelector('[data-marketing-count=\"직접 근거 검토\"]')?.parentElement?.textContent.trim() || '')"), true);
  await evaluate(client, "document.querySelector('#candidate-preview-more').click()");
  assert.equal(await evaluate(client, "document.querySelectorAll('#candidate-preview-list .candidate-preview-card').length > 6"), true);
  await evaluate(client, "document.querySelector('#candidate-preview-more').click()");
  assert.equal(await evaluate(client, "document.querySelectorAll('#candidate-preview-list .candidate-preview-card').length"), 6);
  await evaluate(client, "document.querySelector('[data-candidate-filter=followup]').click()");
  assert.equal(await evaluate(client, "document.querySelector('[data-candidate-filter=followup]')?.getAttribute('aria-pressed')"), "true");
  assert.equal(await evaluate(client, "new URLSearchParams(location.search).get('candidate')"), "followup");
  assert.equal(await evaluate(client, "document.querySelectorAll('#candidate-preview-list .candidate-preview-card').length > 0"), true);
  assert.equal(await evaluate(client, "document.querySelector('.candidate-preview-note')?.textContent.includes('전체 후보 1,000건')"), true);
  assert.equal(await evaluate(client, "document.querySelector('.candidate-preview-note')?.textContent.includes('전체 큐:')"), true);
  assert.equal(await evaluate(client, "document.querySelector('#candidate-preview-list')?.textContent.includes('검토 권고')"), true);
  assert.equal(await evaluate(client, "document.querySelector('[data-candidate-filter=reviewed]')?.textContent.includes('수동 검토됨')"), true);
  assert.equal(await evaluate(client, "document.querySelector('#candidate-preview-list')?.textContent.includes('수동 검토 상태')"), true);
  assert.equal(await evaluate(client, "document.querySelector('#candidate-preview-list')?.textContent.includes('경로·섭취 표현')"), true);
  assert.equal(await evaluate(client, "document.querySelector('#candidate-preview-export')?.textContent.includes('전체 후보 CSV')"), true);
  await evaluate(client, "document.querySelector('[data-candidate-detail]').click()");
  assert.equal(await evaluate(client, "document.querySelector('#candidate-detail-dialog')?.open"), true);
  assert.equal(await evaluate(client, "document.querySelector('#candidate-detail-checklist')?.textContent.includes('경구·섭취 여부')"), true);
  const candidateId = await evaluate(client, "document.querySelector('[data-candidate-detail]')?.getAttribute('data-candidate-detail')");
  assert.equal(await evaluate(client, "new URLSearchParams(location.search).get('candidateId')"), candidateId);
  assert.equal(await evaluate(client, "Boolean(document.querySelector('[data-copy-candidate-link]'))"), true);
  await evaluate(client, "Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText: async function () { throw new Error('candidate clipboard denied'); } } })");
  await evaluate(client, "document.querySelector('[data-copy-candidate-link]').click()");
  await sleep(80);
  assert.equal(await evaluate(client, "document.querySelector('#copy-dialog')?.open"), true);
  assert.equal(await evaluate(client, "new URL(document.querySelector('#copy-dialog-value')?.value || location.href).searchParams.get('candidateId')"), candidateId);
  await evaluate(client, "document.querySelector('#copy-dialog-close').click()");
  assert.equal(await evaluate(client, "document.querySelector('#candidate-detail-abstract')?.textContent.length > 0"), true);
  assert.equal(await evaluate(client, "document.querySelector('#candidate-detail-screening')?.textContent.includes('검토 권고')"), true);
  assert.equal(await evaluate(client, "document.querySelector('#candidate-detail-checklist')?.textContent.includes('경구·섭취 여부')"), true);
  await evaluate(client, "document.querySelector('#candidate-detail-close').click()");
  assert.equal(await evaluate(client, "document.querySelector('#candidate-detail-dialog')?.open"), false);
  assert.equal(await evaluate(client, "new URLSearchParams(location.search).has('candidateId')"), false);
  await navigate(`http://127.0.0.1:${httpPort}/?candidateId=${encodeURIComponent(candidateId)}`);
  assert.equal(await evaluate(client, "document.querySelector('#candidate-detail-dialog')?.open"), true);
  assert.equal(await evaluate(client, "new URLSearchParams(location.search).get('candidateId')"), candidateId);
  await evaluate(client, "document.querySelector('#candidate-detail-close').click()");
  await evaluate(client, "document.querySelector('#candidate-preview-export').click()");
  await sleep(80);
  assert.equal(await evaluate(client, "document.querySelector('#toast')?.textContent.includes('후보 큐 CSV')"), true);
  await evaluate(client, "document.querySelector('[data-candidate-filter=all]').click()");
  await navigate(`http://127.0.0.1:${httpPort}/?candidate=priority`);
  assert.equal(await evaluate(client, "document.querySelector('[data-candidate-filter=priority]')?.getAttribute('aria-pressed')"), "true");
  assert.equal(await evaluate(client, "new URLSearchParams(location.search).get('candidate')"), "priority");
  assert.equal(await evaluate(client, "document.querySelectorAll('#candidate-preview-list .candidate-preview-card').length > 0"), true);
  assert.equal(await evaluate(client, "document.activeElement?.id"), "candidate-preview-title");
  assert.equal(await evaluate(client, "window.scrollY > 0"), true);
  await navigate(`http://127.0.0.1:${httpPort}/?candidate=reviewed`);
  assert.equal(await evaluate(client, "document.querySelector('[data-candidate-filter=reviewed]')?.getAttribute('aria-pressed')"), "true");
  assert.equal(await evaluate(client, "new URLSearchParams(location.search).get('candidate')"), "reviewed");
  await navigate(`http://127.0.0.1:${httpPort}/?candidate=unreviewed`);
  assert.equal(await evaluate(client, "document.querySelector('[data-candidate-filter=unreviewed]')?.getAttribute('aria-pressed')"), "true");
  assert.equal(await evaluate(client, "new URLSearchParams(location.search).get('candidate')"), "unreviewed");
  await navigate(`http://127.0.0.1:${httpPort}/`);
  assert.equal(await evaluate(client, "JSON.parse(document.querySelector('script[type=\"application/ld+json\"]')?.textContent || '{}').potentialAction.target.includes('{search_term_string}')"), true);
  assert.equal(await evaluate(client, "document.querySelector('#result-interpretation')?.textContent.includes('인체 연구')"), true);
  assert.equal(await evaluate(client, "document.querySelector('#result-review-jump')?.textContent.includes('추가 확인 큐 보기')"), true);
  await evaluate(client, "document.querySelector('#result-review-jump').click()");
  await sleep(120);
  assert.equal(await evaluate(client, "document.activeElement?.id"), "review-queue-title");
  assert.equal(await evaluate(client, "document.querySelector('#discovery-stats')?.textContent.includes('Crossref')"), true);
  const currentDeploymentLabel = "현재 운영 코드 기준(런타임) Sites v" + health.release.currentCodeDeployment.siteVersion + " · GitHub " + health.release.currentCodeDeployment.publicMirrorCommit.slice(0, 7);
  assert.equal(await evaluate(client, "document.querySelector('#discovery-stats')?.textContent.includes(" + JSON.stringify(currentDeploymentLabel) + ")"), true);
  assert.equal(await evaluate(client, "document.querySelector('#discovery-stats')?.textContent.includes('마지막 완전 검증 릴리스 데이터 v457 · Sites v485 · GitHub e60d363')"), true);
  assert.equal(await evaluate(client, "document.querySelector('#discovery-stats')?.textContent.includes('원천 오류')"), true);
  assert.equal(await evaluate(client, "document.querySelector('#discovery-stats')?.textContent.includes('원문 감사')"), true);
  assert.equal(await evaluate(client, "document.querySelector('#link-audit-note')?.textContent.includes('근거 약함')"), true);
  assert.equal(await evaluate(client, "document.querySelector('#discovery-stats')?.textContent.includes('수동 검토 상태')"), true);
  assert.equal(await evaluate(client, "document.querySelector('#discovery-stats')?.textContent.includes('미검토')"), true);
  assert.equal(await evaluate(client, "document.querySelector('#discovery-stats')?.textContent.includes('수동 판정 연결 / 보존')"), true);
  assert.equal(await evaluate(client, "document.querySelector('.paper-title-korean')?.textContent.includes('·')"), true);
  assert.equal(await evaluate(client, "!document.querySelector('.paper-title-korean')?.textContent.includes('GABA 관련 자료')"), true);
  await evaluate(client, "document.querySelector('#search').value = ''; document.querySelector('#search').dispatchEvent(new Event('input', { bubbles: true }))");
  await sleep(100);
  assert.ok(await evaluate(client, "document.querySelector('.followup-badge')?.textContent.includes('출판 후속조치')"));
  await evaluate(client, "document.querySelector('[data-preset=human-direct]').click()");
  assert.equal(await evaluate(client, "new URLSearchParams(location.search).get('status')"), "포함");
  assert.equal(await evaluate(client, "new URLSearchParams(location.search).get('intervention')"), "순수 GABA 섭취");
  await navigate(`http://127.0.0.1:${httpPort}/`);
  await evaluate(client, "document.querySelector('.quick-button[data-kind=임상]').click()");
  assert.equal(await evaluate(client, "document.querySelector('.quick-button[data-kind=임상]')?.classList.contains('active')"), true);
  assert.equal(await evaluate(client, "document.querySelector('.quick-button[data-kind=임상]')?.getAttribute('aria-pressed')"), "true");
  assert.equal(await evaluate(client, "document.querySelector('#snapshot-label')?.textContent.startsWith('검증 스냅샷')"), true);
  assert.equal(await evaluate(client, "document.querySelector('#freshness-label')?.tagName"), "BUTTON");
  await evaluate(client, "document.querySelector('#methodology-open').click()");
  assert.equal(await evaluate(client, "document.querySelector('#methodology-dialog')?.open"), true);
  assert.equal(await evaluate(client, "document.querySelector('#methodology-dialog')?.textContent.includes('순수 GABA')"), true);
  assert.equal(await evaluate(client, "document.querySelector('#methodology-dialog')?.textContent.includes('출판 후속조치')"), true);
  await evaluate(client, "document.querySelector('#methodology-close').click()");
  await sleep(180);
  assert.equal(await evaluate(client, "document.querySelector('#methodology-dialog')?.open"), false);
  assert.equal(await evaluate(client, "document.querySelector('#methodology-open')?.getAttribute('aria-haspopup')"), "dialog");
  await evaluate(client, "document.querySelector('#freshness-label').click()");
  await sleep(160);
  assert.equal(await evaluate(client, "document.activeElement?.id"), "discovery-title");
  assert.equal(await evaluate(client, "document.querySelector('#result-export-menu')?.open"), false);
  assert.equal(await evaluate(client, "document.querySelector('#result-export-menu summary')?.textContent.includes('내보내기')"), true);
  await evaluate(client, "document.querySelector('#result-export-menu summary').click()");
  assert.equal(await evaluate(client, "document.querySelector('#result-export-menu')?.open"), true);
  assert.equal(await evaluate(client, "document.querySelectorAll('#result-export-menu .result-reset').length"), 4);
  await evaluate(client, "document.querySelector('#result-export').click()");
  assert.equal(await evaluate(client, "document.querySelector('#result-export-menu')?.open"), false);
  await sleep(80);
  assert.equal(await evaluate(client, "document.querySelector('#toast')?.textContent.includes('CSV')"), true);
  assert.equal(await evaluate(client, "Boolean(document.querySelector('#result-json'))"), true);
  await evaluate(client, "document.querySelector('#result-json').click()");
  await sleep(80);
  assert.equal(await evaluate(client, "document.querySelector('#toast')?.textContent.includes('JSON')"), true);
  assert.equal(await evaluate(client, "Boolean(document.querySelector('#result-ris'))"), true);
  await evaluate(client, "document.querySelector('#result-ris').click()");
  await sleep(80);
  assert.equal(await evaluate(client, "document.querySelector('#toast')?.textContent.includes('RIS')"), true);
  await evaluate(client, "document.querySelector('#result-brief').click()");
  await sleep(80);
  assert.equal(await evaluate(client, "document.querySelector('#toast')?.textContent.includes('검색 결과 브리프') || document.querySelector('#copy-dialog')?.open"), true);
  if (await evaluate(client, "document.querySelector('#copy-dialog')?.open")) await evaluate(client, "document.querySelector('#copy-dialog-close').click()");
  await evaluate(client, "document.querySelector('#result-export-menu summary').click()");
  assert.equal(await evaluate(client, "document.querySelector('#result-export-menu')?.open"), true);
  await evaluate(client, "document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))");
  assert.equal(await evaluate(client, "document.querySelector('#result-export-menu')?.open"), false);
  await evaluate(client, "document.querySelector('[data-marketing=\"조건부 검토\"]').click()");
  assert.equal(await evaluate(client, "document.querySelector('[data-marketing=\"조건부 검토\"]')?.getAttribute('aria-pressed')"), "true");
  assert.equal(await evaluate(client, "new URLSearchParams(location.search).get('marketing')"), "조건부 검토");
  await evaluate(client, "document.querySelector('[data-intervention=\"수용체 약물·작용제\"]').click()");
  assert.equal(await evaluate(client, "document.querySelector('[data-intervention=\"수용체 약물·작용제\"]')?.getAttribute('aria-pressed')"), "true");
  assert.equal(await evaluate(client, "new URLSearchParams(location.search).get('intervention')"), "수용체 약물·작용제");
  assert.equal(await evaluate(client, "Number(document.querySelector('[data-intervention-count=\"규제·안전성 자료\"]')?.textContent || 0) > 0"), true);
  assert.equal(await evaluate(client, "document.querySelector('[data-quick-summary=\"intervention\"]')?.textContent.includes('선택')"), true);
  await evaluate(client, "document.querySelector('[data-followup=\"signal\"]').click()");
  assert.equal(await evaluate(client, "new URLSearchParams(location.search).get('followup')"), "signal");
  assert.ok(await evaluate(client, "Array.from(document.querySelectorAll('.paper-card')).every(function (card) { return card.querySelector('.followup-badge'); })"));
  await evaluate(client, "document.querySelector('[data-followup=\"signal\"]').click()");
  assert.equal(await evaluate(client, "Boolean(document.querySelector('#review-queue-share'))"), true);
  await evaluate(client, "document.querySelector('#review-queue-share').click()");
  assert.equal(await evaluate(client, "document.querySelector('#review-share-dialog')?.open"), true);
  assert.equal(await evaluate(client, "document.querySelector('#review-share-url')?.value.includes('review=')"), true);
  await evaluate(client, "document.querySelector('#review-share-copy').click()");
  await sleep(80);
  assert.equal(await evaluate(client, "document.querySelector('#toast')?.textContent.includes('링크')"), true);
  await evaluate(client, "document.querySelector('#review-share-close').click()");
  assert.equal(await evaluate(client, "document.querySelector('#review-share-dialog')?.open"), false);
  await evaluate(client, "document.querySelector('[data-review-filter=candidate]').click()");
  assert.equal(await evaluate(client, "document.querySelector('[data-review-filter=candidate]')?.classList.contains('active')"), true);
  const reviewShareId = await evaluate(client, "document.querySelector('[data-review-status][data-review-id]')?.getAttribute('data-review-id')");
  assert.ok(reviewShareId, "Expected at least one review queue record for deep-link QA");
  await navigate(`http://127.0.0.1:${httpPort}/?review=${encodeURIComponent(reviewShareId)}&reviewFilter=candidate`);
  assert.equal(await evaluate(client, "new URLSearchParams(location.search).get('review')"), reviewShareId);
  assert.equal(await evaluate(client, "new URLSearchParams(location.search).get('reviewFilter')"), "candidate");
  assert.equal(await evaluate(client, "document.querySelector('[data-review-filter=candidate]')?.classList.contains('active')"), true);
  assert.equal(await evaluate(client, "document.querySelector('#review-queue-count')?.textContent.includes('공유 큐')"), true);
    assert.equal(await evaluate(client, "document.querySelector('#review-queue-summary')?.textContent.includes('전체 큐 완료율')"), true);
    assert.equal(await evaluate(client, "document.querySelector('#review-queue-more')?.textContent.includes('전체 큐 표시')"), true);
  assert.equal(await evaluate(client, "document.activeElement?.id"), "review-queue-title");
  assert.equal(await evaluate(client, "window.scrollY > 0"), true);
  assert.equal(await evaluate(client, "document.querySelector('#review-queue-shared-note')?.hidden"), false);
  assert.equal(await evaluate(client, "document.querySelectorAll('#review-queue-list [data-review-status]').length > 0"), true);
  await evaluate(client, "document.querySelector('#review-queue-shared-clear').click()");
  assert.equal(await evaluate(client, "new URLSearchParams(location.search).has('review')"), false);
  assert.equal(await evaluate(client, "new URLSearchParams(location.search).has('reviewFilter')"), false);
  assert.equal(await evaluate(client, "document.querySelector('#review-queue-shared-note')?.hidden"), true);
  await navigate(`http://127.0.0.1:${httpPort}/?review=QA-MISSING-RECORD`);
  assert.equal(await evaluate(client, "document.querySelector('#review-queue-shared-note')?.hidden"), false);
  assert.equal(await evaluate(client, "document.querySelector('#review-queue-shared-copy')?.textContent.includes('현재 스냅샷')"), true);
  await evaluate(client, "document.querySelector('#review-queue-shared-clear').click()");
  assert.equal(await evaluate(client, "document.querySelector('#review-queue-shared-note')?.hidden"), true);
  await navigate(`http://127.0.0.1:${httpPort}/`);
  await evaluate(client, "document.querySelector('.quick-button[data-kind=임상]').click()");
  assert.equal(await evaluate(client, "document.querySelectorAll('[data-compare-toggle]').length >= 2"), true);
  await evaluate(client, "document.querySelectorAll('[data-compare-toggle]')[0].click(); document.querySelectorAll('[data-compare-toggle]')[1].click()");
  assert.equal(await evaluate(client, "document.querySelector('#compare-open')?.disabled"), false);
  assert.equal(await evaluate(client, "new URLSearchParams(location.search).get('compare')?.includes(',')"), true);
  await evaluate(client, "document.querySelector('#compare-open').focus(); document.querySelector('#compare-open').click()");
  assert.equal(await evaluate(client, "document.querySelector('#compare-dialog')?.open"), true);
  assert.equal(await evaluate(client, "document.activeElement?.id"), "compare-dialog-close");
  assert.equal(await evaluate(client, "document.querySelector('#compare-table')?.textContent.includes('연구 유형')"), true);
  assert.equal(await evaluate(client, "document.querySelector('#compare-table')?.textContent.includes('연구 설계')"), true);
  assert.equal(await evaluate(client, "document.querySelector('#compare-table')?.textContent.includes('결과 방향')"), true);
  assert.equal(await evaluate(client, "document.querySelector('#compare-dialog-insight')?.textContent.includes('자동 판정하지 않습니다')"), true);
  assert.equal(await evaluate(client, "Boolean(document.querySelector('#compare-copy'))"), true);
  assert.equal(await evaluate(client, "Boolean(document.querySelector('#compare-export'))"), true);
  await evaluate(client, "document.querySelector('#compare-export').click()");
  assert.equal(await evaluate(client, "document.querySelector('#toast')?.textContent.includes('비교표 CSV')"), true);
  await evaluate(client, "document.querySelector('#compare-dialog-close').click()");
  assert.equal(await evaluate(client, "document.activeElement?.id"), "compare-open");
  await evaluate(client, "document.querySelector('#compare-clear').click()");
  assert.equal(await evaluate(client, "document.querySelector('#compare-tray')?.hidden"), true);
  assert.equal(await evaluate(client, "new URLSearchParams(location.search).has('compare')"), false);
  await evaluate(client, "document.querySelector('[data-reading-toggle]').click()");
  assert.equal(await evaluate(client, "document.querySelector('#reading-list-count')?.textContent"), "1");
  assert.equal(await evaluate(client, "document.querySelector('[data-reading-toggle]')?.getAttribute('aria-pressed')"), "true");
  await evaluate(client, "document.querySelector('#reading-list-open').focus(); document.querySelector('#reading-list-open').click()");
  assert.equal(await evaluate(client, "document.querySelector('#reading-list-dialog')?.open"), true);
  assert.equal(await evaluate(client, "document.querySelector('#reading-list-items')?.textContent.includes('상세 보기')"), true);
  await evaluate(client, "Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText: async function () {} } })");
  await evaluate(client, "document.querySelector('#reading-list-copy').click()");
  await sleep(80);
  assert.equal(await evaluate(client, "document.querySelector('#toast')?.textContent.includes('브리프')"), true);
  await evaluate(client, "document.querySelector('#reading-list-share').click()");
  await sleep(80);
  assert.equal(await evaluate(client, "new URLSearchParams(location.search).has('read')"), true);
  const sharedReadingUrl = await evaluate(client, "location.href");
  await navigate(sharedReadingUrl);
  assert.equal(await evaluate(client, "document.querySelector('#reading-list-count')?.textContent"), "1");
  await evaluate(client, "document.querySelector('#reading-list-open').focus(); document.querySelector('#reading-list-open').click()");
  assert.equal(await evaluate(client, "document.querySelector('#reading-list-dialog')?.open"), true);
  await evaluate(client, "document.querySelector('#reading-list-close').click()");
  assert.equal(await evaluate(client, "document.activeElement?.id"), "reading-list-open");
  await evaluate(client, "document.querySelector('[data-reading-toggle]').click()");
  assert.equal(await evaluate(client, "document.querySelector('#reading-list-count')?.textContent"), "0");
  await evaluate(client, "Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText: async function () { throw new Error('qa clipboard denied'); } } })");
  await evaluate(client, "document.querySelector('#share-button').click()");
  await sleep(80);
  assert.equal(await evaluate(client, "document.querySelector('#copy-dialog')?.open"), true);
  assert.equal(await evaluate(client, "new URL(document.querySelector('#copy-dialog-value')?.value || location.href).searchParams.get('kind')"), "임상");
  await evaluate(client, "document.querySelector('#copy-dialog-close').click()");
  assert.equal(await evaluate(client, "document.querySelector('#copy-dialog')?.open"), false);
  assert.equal(await evaluate(client, "document.documentElement.scrollWidth <= document.documentElement.clientWidth"), true);
  assert.equal(await evaluate(client, "document.querySelectorAll('[data-intelligence-id]').length > 0"), true);
  assert.equal(await evaluate(client, "document.querySelectorAll('.paper-card .badge.intervention').length > 0"), true);
  const cardIntervention = await evaluate(client, "document.querySelector('.paper-card .intervention-filter-badge')?.getAttribute('data-intervention')");
  assert.ok(cardIntervention, "Expected an intervention filter badge on a result card");
  await evaluate(client, "document.querySelector('.paper-card .intervention-filter-badge').click()");
  assert.equal(await evaluate(client, "new URLSearchParams(location.search).get('intervention')"), cardIntervention);
  await evaluate(client, "document.querySelector('.quick-button[data-kind=임상]').click()");
  await evaluate(client, "document.querySelector('[data-intelligence-id]').click()");
  assert.equal(await evaluate(client, "document.querySelector('#intelligence-detail')?.open"), true);
  assert.equal(await evaluate(client, "document.querySelector('#intelligence-detail-facts')?.textContent.includes('개입 구분')"), true);
  assert.equal(await evaluate(client, "document.querySelector('#intelligence-detail-facts')?.textContent.includes('연구 설계')"), true);
  assert.equal(await evaluate(client, "document.querySelector('#intelligence-detail-facts')?.textContent.includes('대조군')"), true);
  assert.equal(await evaluate(client, "document.querySelector('#intelligence-detail-facts')?.textContent.includes('자료 최신성')"), true);
  assert.equal(await evaluate(client, "document.querySelector('#intelligence-detail-verification')?.textContent.includes('검증 기록 충실도')"), true);
  assert.equal(await evaluate(client, "document.querySelector('#intelligence-detail-verification')?.textContent.includes('연구의 질·효능·규제 적합성 순위를 의미하지 않습니다')"), true);
  assert.equal(await evaluate(client, "new URLSearchParams(location.search).has('record')"), true);
  assert.equal(await evaluate(client, "Boolean(document.querySelector('[data-copy-record-link]'))"), true);
  assert.equal(await evaluate(client, "Boolean(document.querySelector('[data-copy-citation]'))"), true);
  assert.equal(await evaluate(client, "Boolean(document.querySelector('[data-copy-brief]'))"), true);
  await evaluate(client, "history.back()");
  await new Promise((resolve) => setTimeout(resolve, 180));
  assert.equal(await evaluate(client, "document.querySelector('#intelligence-detail')?.open"), false);
  assert.equal(await evaluate(client, "new URLSearchParams(location.search).get('kind')"), "임상");
  await evaluate(client, "document.querySelector('[data-intelligence-id]').click()");
  await evaluate(client, "document.querySelector('#intelligence-detail-close').click()");
  assert.equal(await evaluate(client, "new URLSearchParams(location.search).has('record')"), false);
  await evaluate(client, "history.pushState({}, '', '/?q=%EB%B6%88%EC%95%88&kind=%EC%9E%84%EC%83%81'); window.dispatchEvent(new PopStateEvent('popstate'))");
  assert.equal(await evaluate(client, "document.querySelector('#search')?.value"), "불안");
  assert.equal(await evaluate(client, "document.querySelector('.quick-button[data-kind=임상]')?.classList.contains('active')"), true);
  const deepLinkId = await evaluate(client, "document.querySelector('[data-intelligence-id]')?.dataset.intelligenceId");
  await evaluate(client, "history.pushState({}, '', '/?record=' + encodeURIComponent(" + JSON.stringify(deepLinkId) + ")); window.dispatchEvent(new PopStateEvent('popstate'))");
  assert.equal(await evaluate(client, "document.querySelector('#intelligence-detail')?.open"), true);
  await evaluate(client, "history.pushState({}, '', '/'); window.dispatchEvent(new PopStateEvent('popstate'))");
  assert.equal(await evaluate(client, "document.querySelector('#intelligence-detail')?.open"), false);
  await evaluate(client, "document.querySelector('[data-review-status]').click()");
  assert.match(String(await evaluate(client, "localStorage.getItem('gaba-review-decisions')")), /status/);
  const importPath = resolve(profile, "review-import.json");
  await writeFile(importPath, JSON.stringify({
    schemaVersion: "gaba-review-queue-0.1",
    records: [{ recordId: deepLinkId, reviewStatus: "추가 자료 필요", reviewNote: "QA 가져오기" }]
  }), "utf8");
  await client.call("DOM.enable");
  const documentNode = await client.call("DOM.getDocument");
  const fileNode = await client.call("DOM.querySelector", { nodeId: documentNode.root.nodeId, selector: "#review-queue-file" });
  await client.call("DOM.setFileInputFiles", { nodeId: fileNode.nodeId, files: [importPath] });
  await sleep(180);
  assert.match(String(await evaluate(client, "localStorage.getItem('gaba-review-decisions')")), /QA 가져오기/);
  await screenshot("cdp-desktop-top.png");

  await client.call("Emulation.setDeviceMetricsOverride", { width: 390, height: 844, deviceScaleFactor: 1, mobile: true });
  await navigate(`http://127.0.0.1:${httpPort}/`);
  assert.equal(await evaluate(client, "document.documentElement.scrollWidth <= document.documentElement.clientWidth"), true);
  assert.notEqual(await evaluate(client, "getComputedStyle(document.querySelector('#mobile-filter')).display"), "none");
  assert.equal(await evaluate(client, "document.querySelector('#filter-panel .filter-guidance')?.textContent"), "자료 카테고리와 분야부터 고른 뒤, 필요한 경우에만 추가 조건을 여세요.");
  await evaluate(client, "document.querySelector('#mobile-filter').click()");
  assert.equal(await evaluate(client, "document.activeElement?.id"), "filter-close");
  await sleep(320);
  const mobilePanelRect = await evaluate(client, "(function () { var r = document.querySelector('#filter-panel').getBoundingClientRect(); return { left: r.left, right: r.right, width: r.width, viewport: window.innerWidth }; })()");
  assert.equal(mobilePanelRect.left >= 0 && mobilePanelRect.right <= mobilePanelRect.viewport, true, JSON.stringify(mobilePanelRect));
  await evaluate(client, "document.querySelector('#species').value = '설치류'; document.querySelector('#species').dispatchEvent(new Event('change', { bubbles: true }))");
  assert.equal(await evaluate(client, "document.querySelector('#mobile-filter-count')?.textContent"), "1");
  assert.equal(await evaluate(client, "document.querySelector('#filter-result-count')?.textContent"), "현재 114건");
  assert.equal(await evaluate(client, "document.querySelector('#filter-reset-quick')?.hidden"), false);
  assert.match(String(await evaluate(client, "document.querySelector('#filter-status-text')?.textContent")), /설치류/);
  assert.equal(await evaluate(client, "document.querySelector('#filter-status-reset')?.hidden"), false);
  assert.match(String(await evaluate(client, "document.querySelector('#mobile-filter')?.getAttribute('aria-label')")), /1개 조건 적용/);
  await screenshot("cdp-mobile-top.png");
  await evaluate(client, "document.querySelector('#filter-close').click()");
  assert.equal(await evaluate(client, "document.activeElement?.id"), "mobile-filter");
  console.log(JSON.stringify({ browserQa: true, browser: version.Browser, target: qaOrigin, desktop: true, mobile: true, horizontalOverflow: false, screenshots: ["qa/cdp-desktop-top.png", "qa/cdp-mobile-top.png"] }));
} finally {
  client?.close();
  server.close();
  if (!chrome.killed) chrome.kill();
  await new Promise((resolveExit) => {
    if (chrome.exitCode !== null) return resolveExit();
    const timer = setTimeout(resolveExit, 1500);
    chrome.once("exit", () => {
      clearTimeout(timer);
      resolveExit();
    });
  });
  try {
    await rm(profile, { recursive: true, force: true, maxRetries: 5, retryDelay: 250 });
  } catch (error) {
    // Windows Chrome may keep a short-lived Crashpad lock after the browser exits.
    // The browser assertions already passed; do not turn cleanup-only EBUSY into a QA failure.
    if (error?.code !== "EBUSY") throw error;
  }
}
