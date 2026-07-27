import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(new URL("..", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1"));
const workerPath = resolve(root, "dist", "server", "index.js");
const hostingPath = resolve(root, "dist", ".openai", "hosting.json");
const [source, hostingRaw] = await Promise.all([
  readFile(workerPath, "utf8"),
  readFile(hostingPath, "utf8"),
]);
const hosting = JSON.parse(hostingRaw);
assert.equal(hosting.project_id, "appgprj_6a671feb9cd881919b9d103e17c82756");

const moduleUrl = `data:text/javascript;base64,${Buffer.from(source).toString("base64")}`;
const worker = (await import(moduleUrl)).default;
assert.equal(typeof worker?.fetch, "function");

const home = await worker.fetch(new Request("https://example.test/"));
assert.equal(home.status, 200);
const html = await home.text();
assert.match(html, /GABA 섭취 근거 인덱스/);
assert.match(html, /lang="ko"/);
assert.match(html, /id="results"/);

const health = await worker.fetch(new Request("https://example.test/api/health"));
assert.equal(health.status, 200);
const body = await health.json();
assert.equal(body.ok, true);

const api = await worker.fetch(new Request("https://example.test/api/records"));
assert.equal(api.status, 200);
const db = await api.json();
assert.equal(body.records, db.meta.total);
assert.equal(db.records.length, db.meta.total);
assert.equal(new Set(db.records.map((r) => r.id)).size, db.meta.total);
assert.equal(db.records.filter((r) => r.kind === "임상").length, db.meta.clinical);
assert.equal(db.records.filter((r) => r.kind === "동물").length, db.meta.animal);
assert.ok(db.records.every((r) => r.id && r.title && r.year));

console.log(JSON.stringify({
  valid: true,
  records: db.records.length,
  clinical: db.meta.clinical,
  animal: db.meta.animal,
  projectId: hosting.project_id
}));
