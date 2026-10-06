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
    await client.call("Page.navigate", { url });
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
  assert.equal(await evaluate(client, "document.querySelector('#metric-total')?.textContent.trim()"), "384편");
  assert.equal(await evaluate(client, "Boolean(document.querySelector('#freshness-label')?.textContent.trim())"), true);
  assert.notEqual(await evaluate(client, "document.querySelector('#freshness-label')?.textContent.trim()"), "매주 업데이트");
  assert.equal(await evaluate(client, "document.querySelector('#freshness-label')?.textContent.includes('탐색')"), true);
  assert.equal(await evaluate(client, "document.querySelector('#result-interpretation')?.textContent.includes('인체 연구')"), true);
  await evaluate(client, "document.querySelector('[data-preset=clinical]').click()");
  assert.equal(await evaluate(client, "document.querySelector('.quick-button[data-kind=임상]')?.classList.contains('active')"), true);
  assert.equal(await evaluate(client, "document.querySelector('.quick-button[data-kind=임상]')?.getAttribute('aria-pressed')"), "true");
  assert.equal(await evaluate(client, "document.querySelector('#snapshot-label')?.textContent.startsWith('검증 스냅샷')"), true);
  await evaluate(client, "document.querySelector('#result-export').click()");
  await sleep(80);
  assert.equal(await evaluate(client, "document.querySelector('#toast')?.textContent.includes('CSV')"), true);
  await evaluate(client, "document.querySelector('[data-marketing=\"조건부 검토\"]').click()");
  assert.equal(await evaluate(client, "document.querySelector('[data-marketing=\"조건부 검토\"]')?.getAttribute('aria-pressed')"), "true");
  assert.equal(await evaluate(client, "new URLSearchParams(location.search).get('marketing')"), "조건부 검토");
  await evaluate(client, "document.querySelector('[data-intervention=\"수용체 약물·작용제\"]').click()");
  assert.equal(await evaluate(client, "document.querySelector('[data-intervention=\"수용체 약물·작용제\"]')?.getAttribute('aria-pressed')"), "true");
  assert.equal(await evaluate(client, "new URLSearchParams(location.search).get('intervention')"), "수용체 약물·작용제");
  assert.equal(await evaluate(client, "Number(document.querySelector('[data-intervention-count=\"규제·안전성 자료\"]')?.textContent || 0) > 0"), true);
  assert.equal(await evaluate(client, "document.querySelector('[data-quick-summary=\"intervention\"]')?.textContent.includes('선택')"), true);
  assert.equal(await evaluate(client, "Boolean(document.querySelector('#review-queue-share'))"), true);
  const reviewShareId = await evaluate(client, "document.querySelector('[data-review-status][data-review-id]')?.getAttribute('data-review-id')");
  assert.ok(reviewShareId, "Expected at least one review queue record for deep-link QA");
  await navigate(`http://127.0.0.1:${httpPort}/?review=${encodeURIComponent(reviewShareId)}`);
  assert.equal(await evaluate(client, "new URLSearchParams(location.search).get('review')"), reviewShareId);
  assert.equal(await evaluate(client, "document.querySelector('#review-queue-count')?.textContent.includes('공유 큐')"), true);
  assert.equal(await evaluate(client, "document.querySelectorAll('#review-queue-list [data-review-status]').length > 0"), true);
  await navigate(`http://127.0.0.1:${httpPort}/`);
  await evaluate(client, "document.querySelector('[data-preset=clinical]').click()");
  assert.equal(await evaluate(client, "document.querySelectorAll('[data-compare-toggle]').length >= 2"), true);
  await evaluate(client, "document.querySelectorAll('[data-compare-toggle]')[0].click(); document.querySelectorAll('[data-compare-toggle]')[1].click()");
  assert.equal(await evaluate(client, "document.querySelector('#compare-open')?.disabled"), false);
  assert.equal(await evaluate(client, "new URLSearchParams(location.search).get('compare')?.includes(',')"), true);
  await evaluate(client, "document.querySelector('#compare-open').focus(); document.querySelector('#compare-open').click()");
  assert.equal(await evaluate(client, "document.querySelector('#compare-dialog')?.open"), true);
  assert.equal(await evaluate(client, "document.activeElement?.id"), "compare-dialog-close");
  assert.equal(await evaluate(client, "document.querySelector('#compare-table')?.textContent.includes('연구 유형')"), true);
  assert.equal(await evaluate(client, "Boolean(document.querySelector('#compare-copy'))"), true);
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
  assert.equal(await evaluate(client, "document.documentElement.scrollWidth <= document.documentElement.clientWidth"), true);
  assert.equal(await evaluate(client, "document.querySelectorAll('[data-intelligence-id]').length > 0"), true);
  await evaluate(client, "document.querySelector('[data-intelligence-id]').click()");
  assert.equal(await evaluate(client, "document.querySelector('#intelligence-detail')?.open"), true);
  assert.equal(await evaluate(client, "new URLSearchParams(location.search).has('record')"), true);
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
  await screenshot("cdp-mobile-top.png");
  console.log(JSON.stringify({ browserQa: true, browser: version.Browser, desktop: true, mobile: true, horizontalOverflow: false, screenshots: ["qa/cdp-desktop-top.png", "qa/cdp-mobile-top.png"] }));
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
