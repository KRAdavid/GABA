import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));
const data = JSON.parse(await readFile(resolve(root, "worker", "data.json"), "utf8"));
const linkAudit = data.meta?.linkAudit || {};
const publicMode = process.argv.includes("--public");

const resolved = Number(linkAudit.resolved || 0);
const blocked = Number(linkAudit.blockedCount || 0);
const failed = Number(linkAudit.failed || 0);
if (linkAudit.recordStatuses != null) {
  assert.equal(Array.isArray(linkAudit.recordStatuses), true, "record-level link audit statuses must be an array");
  assert.equal(linkAudit.recordStatuses.length, Number(linkAudit.records || 0), "record-level link audit statuses must cover every record");
}
assert.equal(failed, 0, `worker/data.json reports ${failed} failed link-audit checks`);

if (publicMode) {
  assert.equal(resolved + blocked, Number(linkAudit.recordsWithLinks || 0), "public link-audit totals do not reconcile");
  console.log(JSON.stringify({ valid: true, publicMode: true, resolved, blocked, failed, report: null }));
  process.exit(0);
}

const report = await readFile(resolve(root, ".navi", "AUDIT_REPORT.md"), "utf8");
const checks = [
  [`${resolved}건 해소`, `AUDIT_REPORT.md is missing resolved link-audit count ${resolved}`],
  [`${blocked}건은 접근 제한·일시 오류`, `AUDIT_REPORT.md is missing blocked link-audit count ${blocked}`],
  [`실질 오류 0건`, "AUDIT_REPORT.md must state that link-audit substantive errors are zero"]
];

for (const [needle, message] of checks) assert.match(report, new RegExp(needle), message);

console.log(JSON.stringify({
  valid: true,
  resolved,
  blocked,
  failed,
  report: ".navi/AUDIT_REPORT.md"
}));
