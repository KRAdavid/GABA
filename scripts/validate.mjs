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
assert.match(html, /대량 탐색 후보/);
assert.match(html, /정확한 문구는 “따옴표”/);
assert.match(html, /data-query="한시적 인정"/);

const health = await worker.fetch(new Request("https://example.test/api/health"));
assert.equal(health.status, 200);
const body = await health.json();
assert.equal(body.ok, true);

const api = await worker.fetch(new Request("https://example.test/api/records"));
assert.equal(api.status, 200);
const db = await api.json();
assert.equal(body.records, db.meta.total);
assert.equal(db.records.length, db.meta.total);
assert.equal(db.meta.literature, 286);
assert.equal(db.meta.regulatory, 8);
assert.equal(db.meta.total, 294);
assert.ok(db.meta.safetyCategory > 0);
assert.ok(db.facets.category.some((item) => item.label === "안전성"));
for (const label of ["수면", "성장호르몬", "근육발달", "다이어트", "고혈압", "당뇨"]) {
  assert.ok(db.facets.effectCategory.some((item) => item.label === label));
}
assert.equal(db.meta.discovery.stagedCandidates, 1000);
assert.ok(db.meta.discovery.priority >= 0);
assert.ok(db.meta.discovery.pubmedUnique >= 2000);
assert.equal(db.meta.discovery.identifierExtraction, "PubMed primary ArticleIdList only");
assert.equal(db.meta.dataQuality.duplicateDois, 0);
assert.equal(db.meta.dataQuality.duplicatePmids, 0);
assert.equal(new Set(db.records.map((r) => r.id)).size, db.meta.total);
assert.equal(db.records.filter((r) => r.kind === "임상").length, db.meta.clinical);
assert.equal(db.records.filter((r) => r.kind === "동물").length, db.meta.animal);
assert.equal(db.records.filter((r) => r.kind === "규제").length, db.meta.regulatory);
assert.ok(db.records.every((r) => r.id && r.title && r.year));
assert.ok(db.records.filter((r) => r.kind !== "규제").every((r) => r.notes && r.notes.includes("연구의 의미:") && r.notes.includes("기대 행동:")));
assert.ok(db.records.filter((r) => r.kind === "규제").every((r) => r.titleKo && r.summaryKo && r.sourceUrl));
const includedLiterature = db.records.filter((r) => r.status === "포함" && r.kind !== "규제");
assert.ok(includedLiterature.every((r) => r.pubmedUrl || r.fulltextUrl || r.doiUrl), "included literature must have a verification link");
assert.ok(includedLiterature.every((r) => !r.doi || r.doiUrl), "records with a DOI must have a DOI link");

const countBy = (records, field) => records.reduce((counts, record) => {
  const key = record[field] || "기타";
  counts[key] = (counts[key] || 0) + 1;
  return counts;
}, {});
const assertFacetCounts = (facetName, records, field = facetName) => {
  const actual = countBy(records, field);
  const expected = Object.fromEntries(db.facets[facetName].map((item) => [item.label, item.value]));
  assert.deepEqual(expected, actual, `${facetName} facet counts must match records`);
};
const literatureRecords = db.records.filter((record) => record.kind !== "규제");
assertFacetCounts("species", literatureRecords);
assertFacetCounts("topic", literatureRecords);
assertFacetCounts("sciGroup", literatureRecords);
assertFacetCounts("extraction", literatureRecords);
assertFacetCounts("direction", literatureRecords);
assertFacetCounts("status", db.records);
assertFacetCounts("category", db.records);
assertFacetCounts("effectCategory", db.records);
assert.equal(db.meta.safetyCategory, db.records.filter((record) => record.category === "안전성").length);
assert.equal(db.meta.effectCategory, db.records.filter((record) => record.effectCategory !== "기타").length);
assert.equal(db.meta.dataQuality.extractionPartial, literatureRecords.filter((record) => record.extraction === "부분").length);

console.log(JSON.stringify({
  valid: true,
  records: db.records.length,
  literature: db.meta.literature,
  regulatory: db.meta.regulatory,
  clinical: db.meta.clinical,
  animal: db.meta.animal,
  projectId: hosting.project_id
}));
