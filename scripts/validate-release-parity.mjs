import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

const canonicalRoot = resolve(process.argv[2] || process.cwd());
const publicRoot = resolve(process.argv[3] || "C:/Users/computer/Documents/GABA/cellpinda-gaba-lab-public");
const [canonicalTemplate, publicTemplate, publicData, publicDist] = await Promise.all([
  readFile(resolve(canonicalRoot, "worker/template.js"), "utf8"),
  readFile(resolve(publicRoot, "worker/template.js"), "utf8"),
  readFile(resolve(publicRoot, "worker/data.json"), "utf8").then(JSON.parse),
  readFile(resolve(publicRoot, "dist/server/index.js"), "utf8")
]);

assert.equal(publicTemplate, canonicalTemplate, "public worker template must match canonical template");
assert.equal(publicData?.meta?.publicRelease, true, "public data must be marked as a public release");
assert.equal(publicData?.meta?.sourceSheet ?? null, null, "public data must not expose the management source Sheet");
assert.equal(publicData?.meta?.discovery?.candidateSheet ?? null, null, "public data must not expose the candidate Sheet");
assert.ok(publicDist.includes("intelligence-detail-verification"), "public build must include the verification summary");
assert.ok(!publicDist.includes("docs.google.com/spreadsheets"), "public build must not expose management Sheet URLs");

console.log(JSON.stringify({
  valid: true,
  canonicalRoot,
  publicRoot,
  templateParity: true,
  publicSurface: "clean",
  verificationSummary: "included"
}));
