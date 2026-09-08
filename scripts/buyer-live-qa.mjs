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
assert.match(initialBody, /검증 레코드/);
assert.match(initialBody, /대량 탐색 후보/);
const liveLiterature = Number(initialBody.match(/검증 레코드\s+([\d,]+)편/)?.[1]?.replace(/,/g, ""));
assert.ok(Number.isFinite(liveLiterature));
const search = page.locator("input").first();
await search.fill("10.1016/j.jia.2026.08.003");
await page.waitForTimeout(800);
const searchBody = await page.locator("body").innerText();
assert.match(searchBody, /Dietary GABA improves growth and intestinal health|A-2026-123|10.1016\/j\.jia\.2026\.08\.003/i);
await search.fill("NCT06464172");
await page.waitForTimeout(800);
const registryBody = await page.locator("body").innerText();
assert.match(registryBody, /Association Between Serum and Neuroimaging Measurements|H-REG-2024-002|NCT06464172/i);
await search.fill("NCT06997406");
await page.waitForTimeout(800);
const compositeRegistryBody = await page.locator("body").innerText();
assert.match(compositeRegistryBody, /Inner Ear Support|H-REG-2026-004|NCT06997406/i);
assert.deepEqual(errors, []);
console.log(JSON.stringify({
  valid: true,
  status: response?.status(),
  title: await page.title(),
  url: page.url(),
  liveCount: liveLiterature,
  newRecordSearch: "A-2026-123 / DOI 10.1016/j.jia.2026.08.003; H-REG-2024-002 / NCT06464172; H-REG-2026-004 / NCT06997406",
  errors
}));
await browser.close();
