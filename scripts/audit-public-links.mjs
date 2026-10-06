import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));
const publicRoot = resolve(process.argv[2] || "C:/Users/computer/Documents/GABA/cellpinda-gaba-lab-public");
const writeMeta = process.argv.includes("--write-meta");
const data = JSON.parse(await readFile(resolve(publicRoot, "worker", "data.json"), "utf8"));
const records = Array.isArray(data.records) ? data.records : [];
const blockedStatuses = new Set([401, 403, 405, 408, 429, 451]);
const transientStatus = (status) => Number(status) >= 500 && Number(status) < 600;
const timeoutMs = 12000;
const candidatesFor = (record) => {
  const urls = record.kind === "규제"
    ? [record.sourceUrl, record.fulltextUrl]
    : [record.fulltextUrl, record.doiUrl, record.pubmedUrl];
  return [...new Set(urls.filter((url) => /^https?:\/\//i.test(String(url || ""))).map(String))];
};

async function probe(url) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    let response = await fetch(url, { method: "HEAD", redirect: "follow", signal: controller.signal, headers: { "User-Agent": "GABA-evidence-index/2.0 public-link-audit" } });
    if (!response.ok) {
      response = await fetch(url, { method: "GET", redirect: "follow", signal: controller.signal, headers: { "Range": "bytes=0-1023", "User-Agent": "GABA-evidence-index/2.0 public-link-audit" } });
    }
    return { url, status: response.status, ok: response.ok, finalUrl: response.url || url };
  } catch (error) {
    return { url, status: 0, ok: false, error: error?.name || "fetch_failed" };
  } finally {
    clearTimeout(timer);
  }
}

let cursor = 0;
const recordResults = [];
const linkResults = [];
async function worker() {
  while (cursor < records.length) {
    const record = records[cursor++];
    const attempts = [];
    for (const url of candidatesFor(record)) {
      const result = await probe(url);
      attempts.push(result);
      linkResults.push({ id: record.id, kind: record.kind, ...result });
      if (result.ok) break;
    }
    const success = attempts.find((item) => item.ok);
    const hasBlocked = attempts.some((item) => blockedStatuses.has(item.status));
    const hasTransient = attempts.some((item) => transientStatus(item.status));
    const hasFetchFailure = attempts.some((item) => item.status === 0 || item.error);
    recordResults.push({ id: record.id, kind: record.kind, status: success ? "ok" : hasBlocked || hasTransient || hasFetchFailure ? "unavailable" : "failed", attempts: attempts.length, resolvedUrl: success?.finalUrl || "", failures: attempts.filter((item) => !item.ok).map((item) => item.status || item.error) });
  }
}
await Promise.all(Array.from({ length: Math.min(8, records.length) }, worker));

const failed = recordResults.filter((item) => item.status === "failed");
const blocked = recordResults.filter((item) => item.status === "unavailable");
recordResults.sort((a, b) => String(a.id).localeCompare(String(b.id)));
const redirects = linkResults.filter((item) => item.finalUrl && item.finalUrl !== item.url);
const statusCounts = linkResults.reduce((counts, item) => { const key = String(item.status || "fetch_failed"); counts[key] = (counts[key] || 0) + 1; return counts; }, {});
const summary = { valid: failed.length === 0, checkedAt: new Date().toISOString(), records: records.length, recordsWithLinks: recordResults.filter((item) => item.attempts > 0).length, resolved: recordResults.filter((item) => item.status === "ok").length, blockedCount: blocked.length, failed: failed.length, redirects: redirects.length, attempts: linkResults.length, statusCounts, failures: failed.slice(0, 25), recordStatuses: recordResults };
if (writeMeta) {
  const dataPath = resolve(publicRoot, "worker", "data.json");
  const database = JSON.parse(await readFile(dataPath, "utf8"));
  database.meta = database.meta || {};
  database.meta.linkAudit = {
    checkedAt: summary.checkedAt,
    records: summary.records,
    recordsWithLinks: summary.recordsWithLinks,
    resolved: summary.resolved,
    blockedCount: summary.blockedCount,
    failed: summary.failed,
    redirects: summary.redirects,
    attempts: summary.attempts,
    statusCounts: summary.statusCounts,
    recordStatuses: summary.recordStatuses,
    note: "접근 제한·일시 응답은 원문 내용의 부재나 근거 약함을 뜻하지 않음"
  };
  await writeFile(dataPath, JSON.stringify(database, null, 2) + "\n", "utf8");
}
console.log(JSON.stringify(summary));
if (failed.length) process.exitCode = 2;
