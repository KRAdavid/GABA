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
  assert.equal(await evaluate(client, "document.documentElement.scrollWidth <= document.documentElement.clientWidth"), true);
  assert.equal(await evaluate(client, "document.querySelectorAll('[data-intelligence-id]').length > 0"), true);
  await evaluate(client, "document.querySelector('[data-intelligence-id]').click()");
  assert.equal(await evaluate(client, "document.querySelector('#intelligence-detail')?.open"), true);
  await evaluate(client, "document.querySelector('#intelligence-detail-close').click()");
  await evaluate(client, "document.querySelector('[data-review-status]').click()");
  assert.match(String(await evaluate(client, "localStorage.getItem('gaba-review-decisions')")), /status/);
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
  await rm(profile, { recursive: true, force: true });
}
