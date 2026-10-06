import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { access, mkdir, stat } from "node:fs/promises";
import { basename, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const output = resolve(process.argv[2] || resolve(root, "..", `gaba-site-${shortCommit()}.tar`));

function shortCommit() {
  return execFileSync("git", ["-C", root, "rev-parse", "--short", "HEAD"], { encoding: "utf8" }).trim();
}

function run(command, args, options = {}) {
  return execFileSync(command, args, { encoding: options.encoding || "utf8", maxBuffer: 20 * 1024 * 1024 });
}

await access(resolve(root, "dist", "server", "index.js"));
await access(resolve(root, "dist", ".openai", "hosting.json"));
await access(resolve(root, ".openai", "hosting.json"));
await mkdir(dirname(output), { recursive: true });

run("tar", ["-cf", output, "-C", root, "dist", ".openai"]);
const listing = run("tar", ["-tf", output]);
const bundle = run("tar", ["-xOf", output, "dist/server/index.js"]);
const requiredFiles = ["dist/server/index.js", "dist/.openai/hosting.json", ".openai/hosting.json"];
for (const file of requiredFiles) {
  if (!listing.split(/\r?\n/).includes(file)) throw new Error(`Archive is missing ${file}`);
}
if (!bundle.includes("function koreanTitle")) throw new Error("Archive does not contain the title normalizer");
if (!bundle.includes("interventionLabels")) throw new Error("Archive does not contain intervention labels");
if (bundle.includes("docs.google.com/spreadsheets")) throw new Error("Management Sheets URL found in public archive");

const bytes = (await stat(output)).size;
const hash = createHash("sha256").update(await import("node:fs/promises").then(({ readFile }) => readFile(output))).digest("hex");
console.log(JSON.stringify({
  valid: true,
  output,
  archive: basename(output),
  commit: run("git", ["-C", root, "rev-parse", "HEAD"]).trim(),
  bytes,
  sha256: hash,
  requiredFiles,
  publicSurface: "clean"
}));
