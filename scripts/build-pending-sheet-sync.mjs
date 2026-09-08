import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const data = JSON.parse(fs.readFileSync(path.join(root, "worker", "data.json"), "utf8"));
const manifestPath = path.join(root, "..", "outputs", "master-sheet-sync-pending-ids-2026-09-09.json");
const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));

const columns = [
  "Record_ID", "상태", "연구구분", "연구설계", "연도", "논문제목", "대표저자", "저널", "DOI", "PMID",
  "대상/종", "N", "건강상태/모델", "개입형태", "GABA 용량", "투여경로", "기간", "대조군", "결과영역", "주요평가변수",
  "결과방향", "핵심결과", "안전성/이상반응", "한계/비뚤림·이해상충", "PubMed 상태", "WoS/SCI 상태", "SCI 확인일",
  "PubMed URL", "원문/DOI URL", "추출완성도", "추가일", "최종확인일", "중복여부", "비고", "종그룹", "주제그룹"
];

const fieldMap = {
  Record_ID: "id", 상태: "status", 연구구분: "kind", 연구설계: "design", 연도: "year", 논문제목: "title", 대표저자: "author", 저널: "journal",
  DOI: "doi", PMID: "pmid", "대상/종": "population", N: "n", "건강상태/모델": "model", 개입형태: "form", "GABA 용량": "dose", 투여경로: "route",
  기간: "duration", 대조군: "comparator", 결과영역: "domain", 주요평가변수: "outcome", 결과방향: "direction", 핵심결과: "finding", "안전성/이상반응": "safety",
  "한계/비뚤림·이해상충": "limitation", "PubMed 상태": "pubmedStatus", "WoS/SCI 상태": "sciStatus", "SCI 확인일": "sciChecked", "PubMed URL": "pubmedUrl",
  "원문/DOI URL": "fulltextUrl", 추출완성도: "extraction", 추가일: "added", 최종확인일: "checked", 중복여부: "duplicate", 비고: "notes", 종그룹: "species", 주제그룹: "topic"
};

const byId = new Map(data.records.map((record) => [record.id, record]));
const rows = manifest.records.map(({ Record_ID }) => {
  const record = byId.get(Record_ID);
  if (!record) throw new Error(`Missing site record: ${Record_ID}`);
  return columns.map((column) => {
    const field = fieldMap[column];
    if (column === "중복여부") return record.duplicate || "없음";
    if (column === "원문/DOI URL") return record.fulltextUrl || record.doiUrl || record.pubmedUrl || "";
    return record[field] ?? "";
  });
});

const output = {
  generatedAt: new Date().toISOString(),
  sourceSpreadsheetId: manifest.sourceSpreadsheetId,
  sourceSheet: manifest.sourceSheet,
  columns,
  rows,
  recordIds: manifest.records.map((record) => record.Record_ID)
};
const outputPath = path.join(root, "..", "outputs", "master-sheet-sync-payload-2026-09-09.json");
fs.writeFileSync(outputPath, JSON.stringify(output, null, 2) + "\n");
console.log(JSON.stringify({ outputPath, rows: rows.length, columns: columns.length }));
