import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

const start = Number(process.argv[2]);
const end = Number(process.argv[3]);
const batchDir = resolve(process.argv[4]);
const requests = [];
for (let index = start; index <= end; index += 1) {
  const path = resolve(batchDir, `batch-${String(index).padStart(2, "0")}.json`);
  requests.push(...JSON.parse(await readFile(path, "utf8")).requests);
}
process.stdout.write(JSON.stringify({ requests }));
