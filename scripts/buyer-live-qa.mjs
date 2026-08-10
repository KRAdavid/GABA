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
const response = await page.goto("https://cellpinda-gaba-data-room.dubaissday.chatgpt.site", {
  waitUntil: "networkidle",
  timeout: 90_000
});
await page.waitForTimeout(3_000);
assert.equal(response?.status(), 200);
const initialBody = await page.locator("body").innerText();
assert.match(initialBody, /176\s*건/);
const search = page.locator('input[placeholder="제목, 저자, 주제, 대상 또는 결과 검색"]');
await search.fill("nattokinase");
await page.waitForTimeout(800);
const searchBody = await page.locator("body").innerText();
assert.match(searchBody, /Effect of γ-aminobutyric acid and nattokinase-enriched fermented beans/);
assert.deepEqual(errors, []);
console.log(JSON.stringify({
  valid: true,
  status: response?.status(),
  title: await page.title(),
  url: page.url(),
  liveCount: 176,
  newRecordSearch: "A-2014-126 / nattokinase",
  errors
}));
await browser.close();
