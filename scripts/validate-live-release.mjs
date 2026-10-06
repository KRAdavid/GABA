import assert from "node:assert/strict";

const urlArg = process.argv.find((value) => value.startsWith("--url="));
const baseUrl = (urlArg ? urlArg.slice("--url=".length) : "https://gaba-evidence-index-kr.dubaissday.chatgpt.site").replace(/\/$/, "");

const pageResponse = await fetch(baseUrl, { headers: { "User-Agent": "GABA-evidence-index-live-contract/1.0" } });
assert.equal(pageResponse.status, 200, `public page status ${pageResponse.status}`);
const page = await pageResponse.text();
assert.equal(page.includes("docs.google.com/spreadsheets"), false, "public page exposes management Sheet URL");
assert.equal(page.includes("릴리스 추적"), true, "public page is missing release provenance marker");

const healthResponse = await fetch(`${baseUrl}/api/health`, { headers: { "User-Agent": "GABA-evidence-index-live-contract/1.0" } });
assert.equal(healthResponse.status, 200, `health status ${healthResponse.status}`);
const health = await healthResponse.json();
assert.equal(health.ok, true);
assert.equal(health.publicRelease, true);
assert.equal(health.sourceMode, "read-only public snapshot");
assert.equal(health.candidatePromotion, "manual-review-required");
assert.ok(Number(health.records) > 0);
assert.ok(Number(health.stagedCandidates) > 0);
assert.ok(Number(health.discoveryMergedUnique) >= Number(health.stagedCandidates));
assert.equal(Number(health.discoverySourceErrors), 0);
assert.ok(health.linkAudit && Number(health.linkAudit.failed) === 0);
assert.ok(Number(health.release?.snapshotVersion) > 0);
assert.ok(Number(health.release?.siteVersion) > 0);
assert.match(String(health.release?.siteSourceCommit || ""), /^[0-9a-f]{40}$/i);
assert.match(String(health.release?.publicMirrorCommit || ""), /^[0-9a-f]{40}$/i);

console.log(JSON.stringify({
  valid: true,
  url: baseUrl,
  records: health.records,
  discoverySnapshotDate: health.discoverySnapshotDate,
  stagedCandidates: health.stagedCandidates,
  discoverySourceErrors: health.discoverySourceErrors,
  linkAuditFailed: health.linkAudit.failed,
  release: {
    snapshotVersion: health.release.snapshotVersion,
    siteVersion: health.release.siteVersion,
    siteSourceCommit: health.release.siteSourceCommit,
    publicMirrorCommit: health.release.publicMirrorCommit
  }
}));
