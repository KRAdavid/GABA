import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));
const data = JSON.parse(await readFile(resolve(root, "worker", "data.json"), "utf8"));
const bundle = await readFile(resolve(root, "dist", "server", "index.js"), "utf8");
const deployment = data.meta?.release?.currentCodeDeployment;
assert.ok(deployment, "worker data is missing currentCodeDeployment provenance");
const serialized = JSON.stringify(deployment);
assert.ok(bundle.includes(serialized), "dist/server/index.js does not contain current source provenance; rebuild before packaging");

console.log(JSON.stringify({ valid: true, siteVersion: deployment.siteVersion, sourceCommit: deployment.sourceCommit }));
