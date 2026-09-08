import assert from "node:assert/strict";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");
const browser = await chromium.launch({
  headless: true,
  executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"
});
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
const errors = [];
page.on("console", (message) => {
  if (message.type() === "error") errors.push(`console: ${message.text()}`);
});
page.on("pageerror", (error) => errors.push(`page: ${error.message}`));
const response = await page.goto("https://gaba-evidence-index-kr.dubaissday.chatgpt.site", {
  waitUntil: "networkidle",
  timeout: 90_000
});
await page.waitForTimeout(3_000);
assert.equal(response?.status(), 200);
const initialBody = await page.locator("body").innerText();
assert.match(initialBody, /298\s*건/);
const search = page.locator("input").first();
await search.fill("7419665");
await page.waitForTimeout(800);
const searchBody = await page.locator("body").innerText();
assert.match(searchBody, /성장호르몬|growth hormone/i);
assert.deepEqual(errors, []);
console.log(JSON.stringify({
  valid: true,
  status: response?.status(),
  title: await page.title(),
  url: page.url(),
  liveCount: 298,
  newRecordSearch: "H-1980-181 / PMID 7419665",
  errors
}));
await browser.close();
