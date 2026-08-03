import { readdir, readFile, stat, writeFile } from "node:fs/promises";
import { basename, resolve } from "node:path";

const siteRoot = resolve(new URL("..", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1"));
const gabaRoot = resolve(siteRoot, "..");
const outputsRoot = resolve(gabaRoot, "outputs");
const regulatoryPath = resolve(siteRoot, "worker", "regulatory-data.json");

async function findNamedFiles(dir, fileName) {
  const found = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = resolve(dir, entry.name);
    if (entry.isDirectory()) found.push(...await findNamedFiles(full, fileName));
    else if (entry.isFile() && entry.name === fileName) found.push(full);
  }
  return found;
}

const payloads = await findNamedFiles(outputsRoot, "google_sync_payload.json");
if (!payloads.length) throw new Error(`No google_sync_payload.json under ${outputsRoot}`);
const dated = await Promise.all(payloads.map(async (path) => ({ path, mtime: (await stat(path)).mtimeMs })));
dated.sort((a, b) => b.mtime - a.mtime);
const payloadPath = dated[0].path;
const payload = JSON.parse(await readFile(payloadPath, "utf8"));
const regulatory = JSON.parse(await readFile(regulatoryPath, "utf8"));
const searchSummaries = await findNamedFiles(outputsRoot, "search-summary.json");
const searchDated = await Promise.all(searchSummaries.map(async (path) => ({ path, mtime: (await stat(path)).mtimeMs })));
searchDated.sort((a, b) => b.mtime - a.mtime);
const searchDiscovery = searchDated.length
  ? JSON.parse(await readFile(searchDated[0].path, "utf8"))
  : null;
const candidateSheetPayloads = await findNamedFiles(outputsRoot, "candidate-sheet-payload.json");
const candidateSheetDated = await Promise.all(candidateSheetPayloads.map(async (path) => ({ path, mtime: (await stat(path)).mtimeMs })));
candidateSheetDated.sort((a, b) => b.mtime - a.mtime);
const candidateSheetPayload = candidateSheetDated.length
  ? JSON.parse(await readFile(candidateSheetDated[0].path, "utf8"))
  : null;
const discovery = candidateSheetPayload?.summary || searchDiscovery;

const indexWrite = payload.requests.find((request) => {
  const update = request.updateCells;
  const range = update?.range;
  return range?.sheetId === 2070574867
    && range?.startRowIndex === 1
    && range?.endColumnIndex === 36
    && Array.isArray(update?.rows)
    && update.rows.length >= 170;
})?.updateCells;

if (!indexWrite) throw new Error("Could not find the literature-index data write in payload");

function valueOf(cell) {
  const value = cell?.userEnteredValue;
  if (!value) return "";
  if ("stringValue" in value) return value.stringValue;
  if ("numberValue" in value) return value.numberValue;
  if ("boolValue" in value) return value.boolValue;
  if ("formulaValue" in value) return "";
  return "";
}

function dateFromSerial(value) {
  if (typeof value !== "number" || !Number.isFinite(value)) return "";
  const epoch = Date.UTC(1899, 11, 30);
  return new Date(epoch + value * 86400000).toISOString().slice(0, 10);
}

function clean(value) {
  return value == null ? "" : String(value).trim();
}

function httpUrl(value) {
  const text = clean(value);
  return /^https?:\/\//i.test(text) ? text : "";
}

function normalizedKey(value) {
  return clean(value).toLowerCase().replace(/^https?:\/\/(?:dx\.)?doi\.org\//, "");
}

const literatureRecords = indexWrite.rows.map((row) => {
  const cells = Array.from({ length: 36 }, (_, index) => valueOf(row.values?.[index]));
  const doi = clean(cells[8]);
  const pubmedUrl = httpUrl(cells[27]);
  const fulltextUrl = httpUrl(cells[28]);
  const doiUrl = doi ? `https://doi.org/${doi.replace(/^https?:\/\/(?:dx\.)?doi\.org\//i, "")}` : "";
  const sciStatus = clean(cells[25]);
  const sciGroup = sciStatus.startsWith("SCIE")
    ? "SCIE"
    : sciStatus.startsWith("ESCI")
      ? "ESCI"
      : "현행 미확인";
  const hasDrivePdf = /drive\.google\.com\/file\/d\//i.test(fulltextUrl);

  return {
    id: clean(cells[0]),
    status: clean(cells[1]),
    kind: clean(cells[2]),
    design: clean(cells[3]),
    year: Number(cells[4]) || null,
    title: clean(cells[5]),
    author: clean(cells[6]),
    journal: clean(cells[7]),
    doi,
    pmid: clean(cells[9]),
    population: clean(cells[10]),
    n: clean(cells[11]),
    model: clean(cells[12]),
    form: clean(cells[13]),
    dose: clean(cells[14]),
    route: clean(cells[15]),
    duration: clean(cells[16]),
    comparator: clean(cells[17]),
    domain: clean(cells[18]),
    outcome: clean(cells[19]),
    direction: clean(cells[20]),
    finding: clean(cells[21]),
    safety: clean(cells[22]),
    limitation: clean(cells[23]),
    pubmedStatus: clean(cells[24]),
    sciStatus,
    sciGroup,
    sciChecked: dateFromSerial(cells[26]),
    pubmedUrl,
    fulltextUrl,
    doiUrl,
    extraction: clean(cells[29]),
    added: dateFromSerial(cells[30]),
    checked: dateFromSerial(cells[31]),
    notes: clean(cells[33]),
    species: clean(cells[34]) || "기타",
    topic: clean(cells[35]) || "기타",
    hasDrivePdf,
    linkType: hasDrivePdf ? "Drive PDF" : fulltextUrl ? "원문·DOI" : doiUrl ? "DOI" : pubmedUrl ? "PubMed" : "링크 없음"
  };
}).filter((record) => record.id);

const regulatoryRecords = regulatory.records.map((record) => ({
  ...record,
  status: record.status || "검토중",
  kind: "규제",
  design: record.documentType || "",
  author: record.agency || "",
  journal: [record.country, record.agency].filter(Boolean).join(" · "),
  doi: "",
  pmid: "",
  population: record.subject || "",
  n: "",
  model: [record.ingredientKo, record.ingredientEn].filter(Boolean).join(" / "),
  form: record.documentType || "",
  dose: record.exposure || "",
  route: record.useMatch || "",
  duration: record.duration || "",
  comparator: record.identity || "",
  domain: record.safetyArea || "",
  outcome: record.useQuestion || "",
  direction: "해당없음",
  finding: record.safetyFinding || record.summaryKo || "",
  safety: record.adverse || "",
  limitation: record.notes || "",
  pubmedStatus: "해당없음",
  sciStatus: "해당없음",
  sciGroup: "해당없음",
  sciChecked: record.checked || "",
  pubmedUrl: "",
  fulltextUrl: record.sourceUrl || "",
  doiUrl: "",
  extraction: "검토완료",
  added: regulatory.meta.snapshotDate,
  checked: record.checked || regulatory.meta.snapshotDate,
  notes: record.notes || "",
  species: "규제자료",
  topic: record.safetyArea || "종합평가",
  hasDrivePdf: false,
  linkType: "공식 원문"
}));

const records = [...literatureRecords, ...regulatoryRecords];

const duplicates = (field) => {
  const seen = new Set();
  const repeated = [];
  for (const record of records) {
    const key = normalizedKey(record[field]);
    if (!key) continue;
    if (seen.has(key)) repeated.push(key);
    seen.add(key);
  }
  return repeated;
};

const duplicateIds = duplicates("id");
const duplicateDois = duplicates("doi");
const duplicatePmids = duplicates("pmid");
if (duplicateIds.length || duplicateDois.length || duplicatePmids.length) {
  throw new Error(JSON.stringify({ duplicateIds, duplicateDois, duplicatePmids }));
}

const count = (predicate) => records.reduce((total, record) => total + (predicate(record) ? 1 : 0), 0);
const tally = (source, field) => Object.entries(source.reduce((result, record) => {
  const key = record[field] || "기타";
  result[key] = (result[key] || 0) + 1;
  return result;
}, {})).map(([label, value]) => ({ label, value })).sort((a, b) => b.value - a.value || a.label.localeCompare(b.label, "ko"));

const dates = records.map((record) => record.checked).filter(Boolean).sort();
const years = records.map((record) => record.year).filter(Number.isFinite);
const database = {
  meta: {
    title: "GABA 섭취 근거 인덱스",
    subtitle: "임상·동물시험 SCI/SCIE 문헌 탐색",
    snapshotDate: dates.at(-1) || new Date().toISOString().slice(0, 10),
    minYear: Math.min(...years),
    maxYear: Math.max(...years),
    total: records.length,
    literature: literatureRecords.length,
    regulatory: regulatoryRecords.length,
    clinical: count((record) => record.kind === "임상"),
    animal: count((record) => record.kind === "동물"),
    scie: count((record) => record.sciGroup === "SCIE"),
    complete: count((record) => record.extraction === "완료"),
    partial: count((record) => record.extraction === "부분"),
    drivePdf: count((record) => record.hasDrivePdf),
    included: count((record) => record.status === "포함"),
    candidate: count((record) => record.status === "후보"),
    excluded: count((record) => record.status === "제외"),
    dataQuality: {
      duplicateIds: duplicateIds.length,
      duplicateDois: duplicateDois.length,
      duplicatePmids: duplicatePmids.length,
      literatureWithDoi: literatureRecords.filter((record) => record.doi).length,
      literatureWithPmid: literatureRecords.filter((record) => record.pmid).length,
      extractionComplete: literatureRecords.filter((record) => record.extraction === "완료").length,
      extractionPartial: literatureRecords.filter((record) => record.extraction === "부분").length
    },
    discovery: discovery ? {
      snapshotDate: discovery.snapshotDate,
      generatedAt: discovery.generatedAt,
      triageVersion: discovery.triageVersion,
      identifierExtraction: discovery.identifierExtraction,
      pubmedUnique: discovery.pubmed?.uniqueRetrieved || 0,
      openAlexRetrieved: discovery.openAlex?.retrieved || 0,
      mergedUnique: discovery.mergedUnique || 0,
      stagedCandidates: candidateSheetPayload?.rows || discovery.newCandidates || 0,
      priority: discovery.stagedPriority ?? discovery.priority ?? 0,
      general: discovery.stagedGeneral ?? discovery.general ?? 0,
      low: discovery.stagedLow ?? discovery.low ?? 0,
      screeningCounts: discovery.screeningCounts || null,
      candidateSheet: "https://docs.google.com/spreadsheets/d/1BRtPXEruHYLJ62vCVvDvb6-JkCvKdFi-bBUa7Md7vAQ/edit#gid=573213442",
      disclaimer: "자동 탐색 후보는 확정 근거가 아니며 원문·투여경로·SCI/SCIE·중복 검증 후 문헌인덱스로 승격합니다."
    } : null,
    sourceSheet: "https://docs.google.com/spreadsheets/d/1BRtPXEruHYLJ62vCVvDvb6-JkCvKdFi-bBUa7Md7vAQ/edit",
    sourceFile: basename(payloadPath),
    notice: "이 웹 인덱스는 배포 시점의 읽기 전용 스냅샷입니다."
  },
  facets: {
    species: tally(literatureRecords, "species"),
    topic: tally(literatureRecords, "topic"),
    status: tally(records, "status"),
    sciGroup: tally(literatureRecords, "sciGroup"),
    extraction: tally(literatureRecords, "extraction"),
    direction: tally(literatureRecords, "direction"),
    grade: tally(regulatoryRecords, "grade"),
    agency: tally(regulatoryRecords, "agency"),
    safetyArea: tally(regulatoryRecords, "safetyArea")
  },
  records
};

await writeFile(resolve(siteRoot, "worker", "data.json"), `${JSON.stringify(database, null, 2)}\n`, "utf8");
console.log(JSON.stringify({
  payloadPath,
  output: resolve(siteRoot, "worker", "data.json"),
  records: records.length,
  snapshotDate: database.meta.snapshotDate,
  duplicateIds: duplicateIds.length,
  duplicateDois: duplicateDois.length,
  duplicatePmids: duplicatePmids.length
}));
