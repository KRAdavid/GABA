import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));
const data = JSON.parse(await readFile(resolve(root, "worker", "data.json"), "utf8"));
const discovery = data.meta?.discovery;
const required = ["snapshotDate", "generatedAt", "pubmedUnique", "openAlexRetrieved", "crossrefRetrieved", "mergedUnique", "stagedCandidates"];
const missing = required.filter((key) => discovery?.[key] === undefined || discovery?.[key] === null);
const invalid = [];
for (const key of ["pubmedUnique", "openAlexRetrieved", "crossrefRetrieved", "mergedUnique", "stagedCandidates"]) {
  if (!Number.isFinite(Number(discovery?.[key])) || Number(discovery[key]) < 0) invalid.push(key);
}
if (!Array.isArray(discovery?.sourceErrors)) invalid.push("sourceErrors[]");
if (!discovery?.screeningCounts || !Number.isFinite(Number(discovery?.manualDecisionsPreserved))) invalid.push("screeningCounts/manualDecisionsPreserved");
if (missing.length || invalid.length) {
  throw new Error(JSON.stringify({ valid: false, missing, invalid }));
}
console.log(JSON.stringify({
  valid: true,
  snapshotDate: discovery.snapshotDate,
  generatedAt: discovery.generatedAt,
  pubmedUnique: discovery.pubmedUnique,
  openAlexRetrieved: discovery.openAlexRetrieved,
  crossrefRetrieved: discovery.crossrefRetrieved,
  mergedUnique: discovery.mergedUnique,
  stagedCandidates: discovery.stagedCandidates,
  screeningCounts: discovery.screeningCounts,
  manualDecisionsPreserved: discovery.manualDecisionsPreserved,
  sourceErrors: discovery.sourceErrors.length
}));
