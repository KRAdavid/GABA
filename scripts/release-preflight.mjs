import { spawnSync } from "node:child_process";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));
const publicMode = process.argv.includes("--public");
const publicRoot = process.argv.find((value) => !value.startsWith("-") && value !== process.argv[0] && value !== process.argv[1]) || null;
const steps = [
  ["build-pending-sheet-sync", "scripts/build-pending-sheet-sync.mjs", []],
  ["validate-pending-sheet-sync", "scripts/validate-pending-sheet-sync.mjs", []],
  ["build", "scripts/build.mjs", []],
  ["validate-curated-notes", "scripts/validate-curated-notes.mjs", []],
  ["validate-data-and-surface", "scripts/validate.mjs", []],
  ["validate-ui-contract", "scripts/validate-ui-contract.mjs", []],
  ["validate-health-contract", "scripts/validate-health-contract.mjs", []],
  ["validate-audit-consistency", "scripts/validate-audit-consistency.mjs", publicMode || publicRoot ? ["--public"] : []]
];
if (publicRoot) {
  steps.push(
    ["validate-public-surface", "scripts/validate-public-surface.mjs", []],
    ["validate-release-parity", "scripts/validate-release-parity.mjs", [publicRoot]]
  );
}

const results = [];
for (const [name, script, extraArgs] of steps) {
  const args = [resolve(root, script), ...extraArgs];
  const result = spawnSync(process.execPath, args, { cwd: root, stdio: "inherit", windowsHide: true });
  const code = result.status ?? 1;
  results.push({ name, code });
  if (code !== 0) {
    console.error(JSON.stringify({ valid: false, failed: name, results }));
    process.exit(code);
  }
}

console.log(JSON.stringify({ valid: true, publicRoot, results }));
