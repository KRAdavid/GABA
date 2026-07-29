import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { mkdir } from "node:fs/promises";
import { resolve } from "node:path";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");
const root = resolve(new URL("..", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1"));
const workerPath = resolve(root, "dist", "server", "index.js");
const worker = (await import(`${new URL(`file:///${workerPath.replaceAll("\\", "/")}`).href}?t=${Date.now()}`)).default;
const qaDir = resolve(root, "qa");
await mkdir(qaDir, { recursive: true });

const browser = await chromium.launch({
  headless: true,
  executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"
});
const errors = [];

async function prepare(page) {
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(`console: ${message.text()}`);
  });
  page.on("pageerror", (error) => errors.push(`page: ${error.message}`));
  await page.route("https://preview.local/**", async (route) => {
    const request = new Request(route.request().url(), { method: route.request().method() });
    const response = await worker.fetch(request);
    const headers = Object.fromEntries(response.headers.entries());
    await route.fulfill({
      status: response.status,
      headers,
      body: response.body ? Buffer.from(await response.arrayBuffer()) : undefined
    });
  });
}

const desktop = await browser.newPage({ viewport: { width: 1440, height: 1100 }, deviceScaleFactor: 1 });
await prepare(desktop);
await desktop.goto("https://preview.local/", { waitUntil: "networkidle" });
await desktop.locator("#metric-total").waitFor({ state: "visible" });
await desktop.screenshot({ path: resolve(qaDir, "desktop-top.png"), fullPage: false });
assert.equal((await desktop.locator("#metric-total").textContent()).trim(), "174편");
assert.equal((await desktop.locator("#metric-regulatory").textContent()).trim(), "5건");
assert.equal(await desktop.locator(".paper-card").count(), 20);
assert.equal(await desktop.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth), true);
await desktop.locator("#search").fill("식약처");
await desktop.waitForTimeout(250);
assert.ok(await desktop.locator(".regulatory-card").count() > 0);
await desktop.locator('[data-kind="규제"]').click();
await desktop.waitForTimeout(100);
assert.ok(await desktop.locator(".regulatory-card").count() >= 3);
await desktop.locator('[data-kind=""]').click();
await desktop.waitForTimeout(100);
await desktop.locator("#search").fill("수면");
await desktop.waitForTimeout(250);
assert.match((await desktop.locator("#result-count").textContent()).trim(), /[1-9][0-9]*건/);
await desktop.locator('[data-kind="임상"]').click();
await desktop.waitForTimeout(100);
assert.equal(await desktop.locator(".paper-card .badge.clinical").count(), await desktop.locator(".paper-card").count());
await desktop.locator(".paper-detail").first().click();
await desktop.screenshot({ path: resolve(qaDir, "desktop.png"), fullPage: true });

const mobile = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1 });
await prepare(mobile);
await mobile.goto("https://preview.local/", { waitUntil: "networkidle" });
assert.equal(await mobile.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth), true);
await mobile.screenshot({ path: resolve(qaDir, "mobile-top.png"), fullPage: false });
await mobile.locator("#mobile-filter").click();
await mobile.locator("#filter-panel").waitFor({ state: "visible" });
assert.equal(await mobile.locator("#filter-panel").getAttribute("class"), "filter-panel open");
await mobile.locator("#species").selectOption("설치류");
await mobile.waitForTimeout(100);
await mobile.locator("#filter-close").click();
await mobile.waitForTimeout(350);
assert.equal(await mobile.locator("#filter-panel").getAttribute("class"), "filter-panel");
assert.equal(await mobile.locator("body").getAttribute("class"), "");
await mobile.screenshot({ path: resolve(qaDir, "mobile.png"), fullPage: true });

await browser.close();
assert.deepEqual(errors, []);
console.log(JSON.stringify({
  visualQa: true,
  screenshots: [
    resolve(qaDir, "desktop-top.png"),
    resolve(qaDir, "desktop.png"),
    resolve(qaDir, "mobile-top.png"),
    resolve(qaDir, "mobile.png")
  ],
  consoleErrors: errors.length
}));
