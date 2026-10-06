import assert from "node:assert/strict";
import { readFile, readdir, stat } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(new URL("..", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1"));
const outputRoot = resolve(root, "..", "outputs");
const files = (await readdir(outputRoot, { withFileTypes: true }))
  .filter((entry) => entry.isFile() && /^master-sheet-sync-payload-\d{4}-\d{2}-\d{2}\.json$/.test(entry.name));
assert.ok(files.length, "No master-sheet-sync-payload JSON found");

const candidates = await Promise.all(files.map(async (entry) => ({
  path: resolve(outputRoot, entry.name),
  mtime: (await stat(resolve(outputRoot, entry.name))).mtimeMs
})));
candidates.sort((left, right) => right.mtime - left.mtime);
const selected = candidates[0];
const payload = JSON.parse(await readFile(selected.path, "utf8"));
const columns = payload.columns || [];
const rows = payload.rows || [];

assert.equal(columns.length, 36, "Master Sheets payload must preserve the 36-column schema");
assert.ok(payload.sourceSpreadsheetId, "Source spreadsheet identity is required");
assert.ok(Array.isArray(rows), "Master Sheets rows must be an array");
assert.ok(rows.every((row) => Array.isArray(row) && row.length === columns.length), "Every pending row must contain exactly 36 columns");
const ids = rows.map((row) => String(row[0] || "").trim());
assert.ok(ids.every(Boolean), "Every pending row must have a Record_ID");
assert.equal(new Set(ids).size, ids.length, "Pending Record_ID values must be unique");

console.log(JSON.stringify({
  valid: true,
  file: selected.path,
  generatedAt: payload.generatedAt || null,
  rows: rows.length,
  columns: columns.length,
  uniqueRecordIds: ids.length
}));
