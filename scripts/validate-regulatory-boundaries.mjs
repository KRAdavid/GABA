import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));
const database = JSON.parse(await readFile(resolve(root, "worker", "data.json"), "utf8"));
const regulatory = (database.records || []).filter((record) => record.kind === "규제");

assert.ok(regulatory.length > 0, "The public snapshot must contain regulatory records");
const requiredFields = ["agency", "country", "documentType", "grade", "summaryKo", "limitation", "notes"];
const missing = [];
for (const record of regulatory) {
  for (const field of requiredFields) {
    if (!String(record[field] || "").trim()) missing.push(`${record.id}:${field}`);
  }
  if (!String(record.sourceUrl || record.fulltextUrl || record.decisionUrl || "").trim()) {
    missing.push(`${record.id}:source`);
  }
  assert.notEqual(record.kind, "임상", `${record.id} must not be classified as human clinical evidence`);
  assert.notEqual(record.kind, "동물", `${record.id} must not be classified as animal evidence`);
}
assert.deepEqual(missing, [], `Regulatory records are missing required boundary fields: ${missing.join(", ")}`);

console.log(JSON.stringify({
  valid: true,
  regulatoryRecords: regulatory.length,
  requiredFields,
  sourceLinks: regulatory.filter((record) => String(record.sourceUrl || record.fulltextUrl || record.decisionUrl || "").trim()).length
}));
