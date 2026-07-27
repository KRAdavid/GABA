import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(new URL("..", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1"));
const templatePath = resolve(root, "worker", "template.js");
const dataPath = resolve(root, "worker", "data.json");
const hostingPath = resolve(root, ".openai", "hosting.json");
const distRoot = resolve(root, "dist");

const [template, rawData, hosting] = await Promise.all([
  readFile(templatePath, "utf8"),
  readFile(dataPath, "utf8"),
  readFile(hostingPath, "utf8"),
]);

const database = JSON.parse(rawData);
const embedded = JSON.stringify(database).replaceAll("<", "\\u003c");
const worker = template.replace("__GABA_DATABASE__", embedded);

if (worker.includes("__GABA_DATABASE__")) {
  throw new Error("Database placeholder was not replaced");
}

await rm(distRoot, { recursive: true, force: true });
await mkdir(resolve(distRoot, "server"), { recursive: true });
await mkdir(resolve(distRoot, ".openai"), { recursive: true });
await writeFile(resolve(distRoot, "server", "index.js"), worker, "utf8");
await writeFile(resolve(distRoot, ".openai", "hosting.json"), hosting, "utf8");

console.log(JSON.stringify({
  built: resolve(distRoot, "server", "index.js"),
  records: database.records.length,
  snapshotDate: database.meta.snapshotDate
}));
