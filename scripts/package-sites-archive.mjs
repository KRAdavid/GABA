import { mkdir, rm } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));
const outputArg = process.argv.find((value) => value.startsWith("--output="));
if (!outputArg) throw new Error("Usage: node scripts/package-sites-archive.mjs --output=<absolute .tar.gz path>");
const output = resolve(outputArg.slice("--output=".length));

const run = (command, args) => {
  const result = spawnSync(command, args, { cwd: root, stdio: "inherit", windowsHide: true });
  if (result.status !== 0) throw new Error(`${command} failed with code ${result.status ?? 1}`);
};

await rm(resolve(root, "dist"), { recursive: true, force: true });
await mkdir(dirname(output), { recursive: true });
run(process.execPath, [resolve(root, "scripts", "build.mjs")]);
run(process.execPath, [resolve(root, "scripts", "validate-built-provenance.mjs")]);
run("tar", ["-C", root, "-czf", output, "dist"]);

const listing = spawnSync("tar", ["-tzf", output], { cwd: root, encoding: "utf8", windowsHide: true });
if (listing.status !== 0 || !listing.stdout.split(/\r?\n/).includes("dist/.openai/hosting.json")) {
  throw new Error("Sites archive is missing dist/.openai/hosting.json");
}

console.log(JSON.stringify({ valid: true, output, archive: "dist", provenance: "validated" }));
