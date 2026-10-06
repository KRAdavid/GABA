import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));
const data = JSON.parse(await readFile(resolve(root, "worker", "data.json"), "utf8"));
const discovery = data.meta?.discovery;
const release = data.meta?.release;
const required = ["snapshotDate", "generatedAt", "pubmedUnique", "openAlexRetrieved", "crossrefRetrieved", "mergedUnique", "stagedCandidates", "candidateExport"];
const missing = required.filter((key) => discovery?.[key] === undefined || discovery?.[key] === null);
const invalid = [];
for (const key of ["pubmedUnique", "openAlexRetrieved", "crossrefRetrieved", "mergedUnique", "stagedCandidates"]) {
  if (!Number.isFinite(Number(discovery?.[key])) || Number(discovery[key]) < 0) invalid.push(key);
}
if (!Array.isArray(discovery?.sourceErrors)) invalid.push("sourceErrors[]");
if (!Array.isArray(discovery?.candidateExport) || discovery.candidateExport.length < Number(discovery?.stagedCandidates || 0)) invalid.push("candidateExport");
if (!discovery?.screeningCounts || !Number.isFinite(Number(discovery?.manualDecisionsPreserved))) invalid.push("screeningCounts/manualDecisionsPreserved");
if (!Number.isInteger(Number(release?.snapshotVersion)) || Number(release.snapshotVersion) < 1) invalid.push("release.snapshotVersion");
if (!Number.isInteger(Number(release?.siteVersion)) || Number(release.siteVersion) < 1) invalid.push("release.siteVersion");
if (!/^[0-9a-f]{40}$/i.test(String(release?.sourceCommit || ""))) invalid.push("release.sourceCommit");
if (!/^[0-9a-f]{40}$/i.test(String(release?.siteSourceCommit || ""))) invalid.push("release.siteSourceCommit");
if (!/^[0-9a-f]{40}$/i.test(String(release?.publicMirrorCommit || ""))) invalid.push("release.publicMirrorCommit");
if (!release?.publishedAt) invalid.push("release.publishedAt");
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
  candidateExport: discovery.candidateExport.length,
  screeningCounts: discovery.screeningCounts,
  manualDecisionsPreserved: discovery.manualDecisionsPreserved,
  sourceErrors: discovery.sourceErrors.length,
  release: { snapshotVersion: release.snapshotVersion, siteVersion: release.siteVersion, siteSourceCommit: release.siteSourceCommit, publicMirrorCommit: release.publicMirrorCommit }
}));
