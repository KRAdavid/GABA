import { readdir, readFile, stat, writeFile } from "node:fs/promises";
import { basename, resolve } from "node:path";

const siteRoot = resolve(new URL("..", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1"));
const gabaRoot = resolve(siteRoot, "..");
const outputsRoot = resolve(gabaRoot, "outputs");
const regulatoryPath = resolve(siteRoot, "worker", "regulatory-data.json");
const curatedPath = resolve(siteRoot, "worker", "curated-records.json");
const annotationsPath = resolve(siteRoot, "worker", "record-annotations.json");

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
let curated = { records: [] };
try {
  curated = JSON.parse(await readFile(curatedPath, "utf8"));
} catch {
  curated = { records: [] };
}
let annotations = {};
try {
  annotations = JSON.parse(await readFile(annotationsPath, "utf8"));
} catch {
  annotations = {};
}
const previousDataPath = resolve(siteRoot, "worker", "data.json");
let previousData = null;
try {
  previousData = JSON.parse(await readFile(previousDataPath, "utf8"));
} catch {
  previousData = null;
}
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

function enrichLiteratureNote(record) {
  if (record.kind === "규제") return record.notes;
  if (record.notes.includes("연구의 의미:") && record.notes.includes("기대 행동:")) return record.notes;
  const meaning = record.finding
    ? `${record.kind || "문헌"}에서 ${record.finding}`
    : `${record.kind || "문헌"}의 GABA 섭취·노출과 ${record.outcome || record.domain || "관련 지표"}를 탐색한 자료`;
  const action = record.kind === "임상"
    ? "인체 근거로 검토하되 대상·용량·기간·대조군과 제품 조건의 일치 여부를 확인한 뒤 제한적으로 활용한다."
    : record.kind === "고찰"
      ? "배경·가설 정립 자료로 활용하고 원저 임상시험의 결과와 구분한다."
      : "전임상·기전 근거로만 활용하고 사람의 효능·용량·안전성으로 직접 일반화하지 않는다.";
  const prefix = record.notes ? `${record.notes} ` : "";
  return `${prefix}연구의 의미: ${meaning} 기대 행동: ${action}`;
}

function normalizedKey(value) {
  return clean(value).toLowerCase().replace(/^https?:\/\/(?:dx\.)?doi\.org\//, "");
}

const sheetLiteratureRecords = indexWrite.rows.map((row) => {
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

  const record = {
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
    notes: clean(annotations[clean(cells[0])] || cells[33]),
    species: clean(cells[34]) || "기타",
    topic: clean(cells[35]) || "기타",
    hasDrivePdf,
    linkType: hasDrivePdf ? "Drive PDF" : fulltextUrl ? "원문·DOI" : doiUrl ? "DOI" : pubmedUrl ? "PubMed" : "링크 없음"
  };
  record.notes = enrichLiteratureNote(record);
  const safetyText = [record.topic, record.domain, record.outcome, record.safety, record.limitation, record.notes].join(" ");
  record.category = record.topic === "장기·독성·안전성" || /안전성|이상반응|독성|toxicity|toxicology|adverse|NOAEL|tolerability/i.test(safetyText)
    ? "안전성"
    : "연구 근거";
  const effectText = [record.title, record.topic, record.domain, record.outcome, record.finding, record.notes].join(" ");
  record.effectCategory = /수면|불면|sleep|insomnia/i.test(effectText)
    ? "수면"
    : /성장호르몬|growth hormone|\bGH\b/i.test(effectText)
      ? "성장호르몬"
      : /근육|근비대|muscle|myogenesis|hypertrophy/i.test(effectText)
        ? "근육발달"
        : /다이어트|체중|비만|weight loss|body weight|obesity|adiposity|fat mass|adipose/i.test(effectText)
          ? "다이어트"
          : /고혈압|혈압|hypertension|hypertensive|blood pressure/i.test(effectText)
            ? "고혈압"
            : /당뇨|혈당|diabetes|glucose|glycemic|insulin resistance/i.test(effectText)
              ? "당뇨"
              : "기타";
  return record;
}).filter((record) => record.id);

// Preserve verified local records while the source Sheet is temporarily read-only.
// This prevents a stale Sheet snapshot from silently removing already-reviewed evidence.
const sheetKeys = new Set(sheetLiteratureRecords.flatMap((record) => [
  record.id,
  normalizedKey(record.doi),
  normalizedKey(record.pmid)
].filter(Boolean)));
const preservedLiteratureRecords = (previousData?.records || [])
  .filter((record) => record.kind !== "규제" && record.id)
  .filter((record) => !sheetKeys.has(record.id)
    && !sheetKeys.has(normalizedKey(record.doi))
    && !sheetKeys.has(normalizedKey(record.pmid)));
const curatedLiteratureRecords = (curated.records || [])
  .filter((record) => record.kind !== "규제" && record.id)
  .map((record) => ({
    ...record,
    status: record.status || "후보",
    category: record.category || "연구 근거",
    effectCategory: record.effectCategory || "기타",
    species: record.species || "기타",
    topic: record.topic || "기타",
    linkType: record.linkType || (record.fulltextUrl ? "원문·DOI" : record.pubmedUrl ? "PubMed" : "링크 없음")
  }));
const curatedOverrideByKey = new Map(curatedLiteratureRecords.flatMap((record) => [
  [record.id, record],
  [normalizedKey(record.doi), record],
  [normalizedKey(record.pmid), record]
].filter(([key]) => Boolean(key))));
const overriddenSheetLiteratureRecords = sheetLiteratureRecords.map((record) => {
  const override = [record.id, normalizedKey(record.doi), normalizedKey(record.pmid)]
    .map((key) => curatedOverrideByKey.get(key))
    .find(Boolean);
  return override ? { ...record, ...override } : record;
});
const literatureKeys = new Set(overriddenSheetLiteratureRecords.flatMap((record) => [
  record.id, normalizedKey(record.doi), normalizedKey(record.pmid)
].filter(Boolean)));
const addUniqueLiterature = (recordsToAdd) => recordsToAdd.filter((record) => {
  const keys = [record.id, normalizedKey(record.doi), normalizedKey(record.pmid)].filter(Boolean);
  if (keys.some((key) => literatureKeys.has(key))) return false;
  keys.forEach((key) => literatureKeys.add(key));
  return true;
});
const literatureRecords = [
  ...overriddenSheetLiteratureRecords,
  ...addUniqueLiterature(curatedLiteratureRecords),
  ...addUniqueLiterature(preservedLiteratureRecords)
].map((record) => ({ ...record, notes: enrichLiteratureNote(record) }));

const sheetRegulatoryRecords = regulatory.records.map((record) => ({
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
  effectCategory: "안전성·규제",
  hasDrivePdf: false,
  linkType: "공식 원문",
  category: "안전성"
}));

const regulatoryKeys = new Set(sheetRegulatoryRecords.map((record) => record.id).filter(Boolean));
const preservedRegulatoryRecords = (previousData?.records || [])
  .filter((record) => record.kind === "규제" && record.id && !regulatoryKeys.has(record.id));
const regulatoryRecords = [...sheetRegulatoryRecords, ...preservedRegulatoryRecords];

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
    safetyCategory: count((record) => record.category === "안전성"),
    effectCategory: count((record) => record.effectCategory !== "기타"),
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
    safetyArea: tally(regulatoryRecords, "safetyArea"),
    category: tally(records, "category"),
    effectCategory: tally(records, "effectCategory")
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
