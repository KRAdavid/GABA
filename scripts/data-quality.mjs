import assert from "node:assert/strict";
import { readFile, readdir, stat } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(new URL("..", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1"));
const gabaRoot = resolve(root, "..");
const database = JSON.parse(await readFile(resolve(root, "worker", "data.json"), "utf8"));
const outputDirectories = (await readdir(resolve(gabaRoot, "outputs"), { withFileTypes: true }))
  .filter((entry) => entry.isDirectory() && entry.name.startsWith("literature-search-"));
const candidateFiles = [];
for (const directory of outputDirectories) {
  const path = resolve(gabaRoot, "outputs", directory.name, "candidates.json");
  try {
    candidateFiles.push({ path, mtime: (await stat(path)).mtimeMs });
  } catch (_) {
    // Ignore incomplete runs.
  }
}
candidateFiles.sort((left, right) => right.mtime - left.mtime);
assert.ok(candidateFiles.length, "No literature-search candidates.json found");
const candidatePayload = JSON.parse(await readFile(
  candidateFiles[0].path,
  "utf8"
));
const { candidates, summary } = candidatePayload;

const normalized = (value) => String(value || "").trim().toLowerCase()
  .replace(/^https?:\/\/(?:dx\.)?doi\.org\//, "")
  .replace(/[^\p{L}\p{N}]+/gu, " ")
  .replace(/\s+/g, " ")
  .trim();
const normalizedDoi = (value) => String(value || "").trim().toLowerCase()
  .replace(/^https?:\/\/(?:dx\.)?doi\.org\//, "")
  .replace(/^doi:\s*/, "")
  .replace(/[).,;]+$/, "");
const duplicateValues = (records, field) => {
  const seen = new Set();
  const duplicates = new Set();
  for (const record of records) {
    const value = normalized(record[field]);
    if (!value) continue;
    if (seen.has(value)) duplicates.add(value);
    seen.add(value);
  }
  return [...duplicates];
};
const titleSimilarity = (left, right) => {
  const a = new Set(normalized(left).split(" ").filter((token) => token.length > 1));
  const b = new Set(normalized(right).split(" ").filter((token) => token.length > 1));
  if (!a.size || !b.size) return 0;
  let overlap = 0;
  for (const token of a) if (b.has(token)) overlap += 1;
  return overlap / Math.max(a.size, b.size);
};

assert.equal(database.meta.literature, 174);
assert.equal(database.meta.regulatory, 5);
assert.equal(database.records.length, database.meta.total);
assert.deepEqual(duplicateValues(database.records, "id"), []);
assert.deepEqual(duplicateValues(database.records, "doi"), []);
assert.deepEqual(duplicateValues(database.records, "pmid"), []);
assert.ok(database.records.every((record) => record.id && record.title && record.year));

assert.equal(summary.triageVersion, "2026-07-31.2");
assert.equal(summary.identifierExtraction, "PubMed primary ArticleIdList only");
assert.ok(summary.pubmed.uniqueRetrieved >= 2000);
assert.equal(summary.openAlex.retrieved, 800);
assert.equal(candidates.length, 1000);
const idPrefix = `C-${summary.snapshotDate.replaceAll("-", "")}-`;
assert.equal(candidates[0].candidateId, `${idPrefix}0001`);
assert.equal(candidates.at(-1).candidateId, `${idPrefix}1000`);
assert.deepEqual(duplicateValues(candidates, "candidateId"), []);
assert.ok(candidates.every((record) => record.title && record.score >= 25));
assert.ok(candidates.filter((record) => record.bucket === "우선검토")
  .every((record) => !record.reviewSignal && !record.exclusionSignals.length && !record.indirectTitleSignals.length));

const multiOmics = candidates.find((record) => /Multi-Omics Reveal/.test(record.title));
if (multiOmics) {
  assert.equal(multiOmics.pmid, "39595230");
  assert.equal(multiOmics.doi, "10.3390/ani14223177");
}
const siga = candidates.find((record) => /Intestinal SIgA Secretion/.test(record.title));
if (siga) {
  assert.equal(siga.pmid, "32565729");
  assert.equal(siga.doi, "10.1155/2020/7368483");
}
assert.ok(!candidates.some((record) =>
  /Intestinal SIgA Secretion/.test(record.title) && record.doi === "10.1016/j.chom.2019.04.002"
));

let remoteChecked = 0;
if (process.argv.includes("--remote")) {
  const topPubmed = candidates
    .filter((record) => record.bucket === "우선검토" && record.pmid)
    .slice(0, 8);
  const ids = topPubmed.map((record) => record.pmid).join(",");
  const response = await fetch(
    `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=pubmed&id=${ids}&retmode=json`,
    { headers: { "User-Agent": "GABA-evidence-index/2.0 quality audit" } }
  );
  assert.equal(response.ok, true);
  const official = await response.json();
  for (const record of topPubmed) {
    const pubmed = official.result?.[record.pmid];
    assert.ok(pubmed, `Missing PubMed summary for ${record.pmid}`);
    assert.ok(titleSimilarity(record.title, pubmed.title) >= 0.72, `PubMed title mismatch for ${record.pmid}`);
    const officialDoi = pubmed.articleids?.find((item) => item.idtype === "doi")?.value || "";
    if (record.doi && officialDoi) assert.equal(normalizedDoi(record.doi), normalizedDoi(officialDoi));
    remoteChecked += 1;
  }
}

console.log(JSON.stringify({
  valid: true,
  verifiedRecords: database.records.length,
  candidates: candidates.length,
  priority: summary.priority,
  pubmedUnique: summary.pubmed.uniqueRetrieved,
  openAlexRetrieved: summary.openAlex.retrieved,
  remoteChecked
}));
