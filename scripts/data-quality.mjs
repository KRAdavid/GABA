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
    const mtime = (await stat(path)).mtimeMs;
    // A discovery run is complete only when its staged-sheet payload also
    // exists. Partial runs must not shadow the latest complete QA input.
    await stat(resolve(gabaRoot, "outputs", directory.name, "candidate-sheet-payload.json"));
    candidateFiles.push({ path, mtime });
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
const candidateSheetPayload = JSON.parse(await readFile(
  resolve(candidateFiles[0].path, "..", "candidate-sheet-payload.json"),
  "utf8"
));
const stagedRows = candidateSheetPayload.dataBatches.flatMap((batch) =>
  batch.requests.flatMap((request) => request.updateCells?.rows || [])
).map((row) => row.values.map((cell) => {
  const value = cell.userEnteredValue || {};
  return value.stringValue ?? value.numberValue ?? value.boolValue ?? "";
}));

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

assert.ok(database.meta.literature >= 174);
assert.ok(database.meta.regulatory >= 7);
assert.equal(database.meta.literature, database.records.filter((record) => record.kind !== "규제").length);
assert.equal(database.meta.regulatory, database.records.filter((record) => record.kind === "규제").length);
assert.equal(database.records.length, database.meta.total);
assert.deepEqual(duplicateValues(database.records, "id"), []);
assert.deepEqual(duplicateValues(database.records, "doi"), []);
assert.deepEqual(duplicateValues(database.records, "pmid"), []);
assert.ok(database.records.every((record) => record.id && record.title && record.year));

// The triage artifact is refreshed by the daily search and may carry a
// date/version suffix. Validate its shape rather than pinning the checker to
// an obsolete historical artifact version.
assert.match(summary.triageVersion, /^\d{4}-\d{2}-\d{2}(?:\.\d+)?$/);
assert.equal(summary.identifierExtraction, "PubMed primary ArticleIdList only");
assert.ok(summary.pubmed.uniqueRetrieved >= 2000);
const openAlexUnavailable = summary.sourceErrors?.some((entry) =>
  entry.source?.startsWith("OpenAlex:")
  && /429|Too Many Requests|503|Service Unavailable/i.test(entry.error || ""));
assert.ok(summary.openAlex.retrieved === 800 || openAlexUnavailable,
  "OpenAlex must retrieve the expected batch or explicitly record an unavailable/rate-limit error");
assert.equal(candidates.length, 1000);
assert.equal(stagedRows.length, 1000);
const idPrefix = `C-${summary.snapshotDate.replaceAll("-", "")}-`;
assert.equal(candidates[0].candidateId, `${idPrefix}0001`);
assert.equal(candidates.at(-1).candidateId, `${idPrefix}1000`);
assert.deepEqual(duplicateValues(candidates, "candidateId"), []);
assert.deepEqual(duplicateValues(stagedRows.map((row) => ({ id: row[0] })), "id"), []);
assert.deepEqual(duplicateValues(stagedRows.map((row) => ({ doi: row[10] })), "doi"), []);
assert.deepEqual(duplicateValues(stagedRows.map((row) => ({ pmid: row[9] })), "pmid"), []);
assert.equal(candidateSheetPayload.summary.stagedPriority, stagedRows.filter((row) => row[4] === "우선검토").length);
assert.equal(candidateSheetPayload.summary.manualDecisionsPreserved, stagedRows.filter((row) => row[2] !== "미검토").length);
assert.ok(candidates.every((record) => record.title
  && (record.score >= 25 || /출판 후속조치/.test(record.screeningRecommendation || ""))));
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
  // Validate eight identifiers even when one of the highest-ranked candidates
  // is DOI-only. The candidate array is already priority/score ordered.
  const topPubmed = candidates
    .filter((record) => record.pmid)
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
  stagedPriority: candidateSheetPayload.summary.stagedPriority,
  screeningCounts: candidateSheetPayload.summary.screeningCounts,
  pubmedUnique: summary.pubmed.uniqueRetrieved,
  openAlexRetrieved: summary.openAlex.retrieved,
  remoteChecked
}));
