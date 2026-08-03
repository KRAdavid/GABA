import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

const siteRoot = resolve(new URL("..", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1"));
const regulatory = JSON.parse(await readFile(resolve(siteRoot, "worker", "regulatory-data.json"), "utf8"));
const ids = new Set(process.argv.slice(2));
const keys = [
  "id", "status", "grade", "agency", "country", "documentType", "safetyArea",
  "ingredientKo", "ingredientEn", "titleKo", "title", "summaryKo", "useQuestion",
  "identity", "useMatch", "subject", "exposure", "duration", "safetyFinding",
  "noael", "adverse", "quality", "guidelines", "recognition", "sourceUrl",
  "decisionUrl", "checked", "notes"
];
const serialDate = (value) => Math.round((Date.parse(`${value}T00:00:00Z`) - Date.UTC(1899, 11, 30)) / 86400000);
const rows = regulatory.records
  .filter((record) => !ids.size || ids.has(record.id))
  .map((record) => ({
    values: keys.map((key, index) => {
      const value = record[key] ?? "";
      if (value === "") return {};
      if (index === 26) {
        return {
          userEnteredValue: { numberValue: serialDate(value) },
          userEnteredFormat: { numberFormat: { type: "DATE", pattern: "yyyy-mm-dd" } }
        };
      }
      return { userEnteredValue: { stringValue: String(value) } };
    })
  }));
process.stdout.write(JSON.stringify({ rows }));
