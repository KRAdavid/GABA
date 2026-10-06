import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));
const database = JSON.parse(await readFile(resolve(root, "worker", "data.json"), "utf8"));
const literature = database.records.filter((record) => record.kind !== "규제");

function labeledNote(record, label, nextLabel) {
  const notes = String(record.notes || "");
  const marker = `${label}:`;
  const start = notes.indexOf(marker);
  if (start < 0) return "";
  let value = notes.slice(start + marker.length);
  if (nextLabel) {
    const next = value.indexOf(`${nextLabel}:`);
    if (next >= 0) value = value.slice(0, next);
  }
  return value.trim();
}

const invalid = [];
for (const record of literature) {
  const meaning = labeledNote(record, "연구의 의미", "마케팅 활용 방안");
  const marketing = labeledNote(record, "마케팅 활용 방안");
  if (!meaning || !marketing) invalid.push({ id: record.id, meaning: Boolean(meaning), marketing: Boolean(marketing) });
}

assert.equal(invalid.length, 0, `literature records missing non-empty curated note sections: ${JSON.stringify(invalid.slice(0, 10))}`);
console.log(JSON.stringify({ valid: true, literature: literature.length, meaningSections: literature.length, marketingSections: literature.length }));
