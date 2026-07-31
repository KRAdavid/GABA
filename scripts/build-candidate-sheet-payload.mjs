import { mkdir, readFile, readdir, rm, stat, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const siteRoot = resolve(new URL("..", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1"));
const gabaRoot = resolve(siteRoot, "..");
const inputArg = process.argv.find((value) => value.startsWith("--input="));
const outputArg = process.argv.find((value) => value.startsWith("--out="));
async function latestCandidatePath() {
  const outputsRoot = resolve(gabaRoot, "outputs");
  const directories = (await readdir(outputsRoot, { withFileTypes: true }))
    .filter((entry) => entry.isDirectory() && entry.name.startsWith("literature-search-"));
  const candidates = [];
  for (const directory of directories) {
    const path = resolve(outputsRoot, directory.name, "candidates.json");
    try {
      candidates.push({ path, mtime: (await stat(path)).mtimeMs });
    } catch (_) {
      // Ignore incomplete search runs without a candidates.json output.
    }
  }
  candidates.sort((left, right) => right.mtime - left.mtime);
  if (!candidates.length) throw new Error(`No literature-search candidate output under ${outputsRoot}`);
  return candidates[0].path;
}
const inputPath = inputArg
  ? resolve(inputArg.slice("--input=".length))
  : await latestCandidatePath();
const outputPath = outputArg
  ? resolve(outputArg.slice("--out=".length))
  : resolve(inputPath, "..", "candidate-sheet-payload.json");

const spreadsheetId = "1BRtPXEruHYLJ62vCVvDvb6-JkCvKdFi-bBUa7Md7vAQ";
const sheetId = 573213442;
const { summary, candidates } = JSON.parse(await readFile(inputPath, "utf8"));

const headers = [
  "Candidate_ID", "수집일", "선별상태", "자동관련도점수", "우선순위",
  "중복상태", "기존Record_ID", "출처", "검색쿼리", "PMID", "DOI",
  "연도", "논문제목", "대표저자", "저널", "섭취근거신호",
  "제외신호", "초록", "원문_URL", "검토메모", "식별자검증"
];

const serialDate = (value) => {
  if (!value) return "";
  return Math.round((Date.parse(`${value}T00:00:00Z`) - Date.UTC(1899, 11, 30)) / 86400000);
};
const text = (value) => String(value ?? "").replace(/\s+/g, " ").trim();
const truncate = (value, limit) => {
  const clean = text(value);
  return clean.length > limit ? `${clean.slice(0, limit - 1)}…` : clean;
};
const cell = (value, type = "string") => {
  if (value === "" || value == null) return {};
  if (type === "number") return { userEnteredValue: { numberValue: Number(value) } };
  if (type === "date") {
    return {
      userEnteredValue: { numberValue: serialDate(value) },
      userEnteredFormat: { numberFormat: { type: "DATE", pattern: "yyyy-mm-dd" } }
    };
  }
  return { userEnteredValue: { stringValue: String(value) } };
};
const signalLabels = (record) => {
  const raw = (record.routeSignals ?? []).join(" ");
  const labels = [];
  if (/oral/.test(raw)) labels.push("경구");
  if (/ingest/.test(raw)) labels.push("섭취");
  if (/intake/.test(raw)) labels.push("섭취량");
  if (/gavage/.test(raw)) labels.push("위관투여");
  if (/diet/.test(raw)) labels.push("식이");
  if (/feed/.test(raw)) labels.push("사료");
  if (/fed/.test(raw)) labels.push("급이");
  if (/drinking water/.test(raw)) labels.push("음수");
  if (/supplement/.test(raw)) labels.push("보충");
  if (/consum/.test(raw)) labels.push("소비");
  if (/beverage/.test(raw)) labels.push("음료");
  return [...new Set(labels)].join("·");
};
const exclusionLabels = (record) => {
  const hard = (record.exclusionSignals ?? []).join(" ");
  const indirect = (record.indirectTitleSignals ?? []).join(" ");
  const production = (record.productionSignals ?? []).join(" ");
  const labels = [];
  if (/intracerebral|intracranial|intrathecal|intraventricular|microinject/.test(hard)) labels.push("중추주입");
  if (/intraperitoneal|intravenous|subcutaneous/.test(hard)) labels.push("비경구");
  if (/gabapentin|pregabalin|baclofen|vigabatrin|transaminase/.test(hard)) labels.push("GABA계 약물");
  if (/receptor|mediated|signaling|neuron|release|uptake|transport|level|concentration|expression|dynamics/.test(indirect)) labels.push("간접 GABA 지표");
  if (/produce|production|biosynthesis|enrichment|development|optimization|cell|in vitro/.test(`${indirect} ${production}`)) labels.push("생산·세포·가공");
  return [...new Set(labels)].join("·");
};
const identifierStatus = (record) => {
  if ((record.source ?? []).includes("PubMed")) return "PubMed 레코드 확인";
  if (record.pmid) return "OpenAlex PMID 제공·미교차검증";
  if (record.doi) return "DOI 제공·미교차검증";
  return "식별자 부족";
};

const rows = candidates.map((record) => [
  record.candidateId,
  record.collectedDate,
  "미검토",
  record.score,
  record.bucket,
  record.duplicateStatus,
  record.existingRecordId,
  (record.source ?? []).join(" + "),
  (record.queryLabels ?? []).join(" · "),
  record.pmid,
  record.doi,
  record.year || "",
  text(record.title),
  text(record.author || record.authors?.[0]),
  text(record.journal),
  signalLabels(record),
  exclusionLabels(record),
  truncate(record.abstract, 1600),
  text(record.sourceUrl),
  "",
  identifierStatus(record)
]);

const gridRange = (startRowIndex, endRowIndex, startColumnIndex = 0, endColumnIndex = 21) => ({
  sheetId, startRowIndex, endRowIndex, startColumnIndex, endColumnIndex
});
const rgb = (red, green, blue) => ({ rgbColor: { red, green, blue } });
const headerCells = headers.map((value) => cell(value));

const setupRequests = [
  { mergeCells: { range: gridRange(0, 2), mergeType: "MERGE_ALL" } },
  { mergeCells: { range: gridRange(2, 3), mergeType: "MERGE_ALL" } },
  {
    updateCells: {
      range: gridRange(0, 1, 0, 1),
      rows: [{ values: [cell("GABA 대량 문헌 탐색 후보 큐")] }],
      fields: "userEnteredValue"
    }
  },
  {
    updateCells: {
      range: gridRange(2, 3, 0, 1),
      rows: [{
        values: [cell(
          `PubMed ${summary.pubmed.uniqueRetrieved.toLocaleString("ko-KR")}건 + OpenAlex ${summary.openAlex.retrieved.toLocaleString("ko-KR")}건을 자동 중복제거·관련도 선별. `
          + "자동점수는 포함 판정이 아니며, 원문·투여경로·GABA 직접노출을 검토한 뒤 문헌인덱스로 승격합니다."
        )]
      }],
      fields: "userEnteredValue"
    }
  },
  {
    updateCells: {
      range: gridRange(3, 4),
      rows: [{ values: headerCells }],
      fields: "userEnteredValue"
    }
  },
  {
    repeatCell: {
      range: gridRange(0, 2),
      cell: {
        userEnteredFormat: {
          backgroundColorStyle: rgb(0.039, 0.29, 0.275),
          horizontalAlignment: "CENTER",
          verticalAlignment: "MIDDLE",
          textFormat: {
            foregroundColorStyle: rgb(1, 1, 1),
            fontFamily: "Arial",
            fontSize: 18,
            bold: true
          }
        }
      },
      fields: "userEnteredFormat(backgroundColorStyle,horizontalAlignment,verticalAlignment,textFormat)"
    }
  },
  {
    repeatCell: {
      range: gridRange(2, 3),
      cell: {
        userEnteredFormat: {
          backgroundColorStyle: rgb(0.91, 0.945, 0.973),
          verticalAlignment: "MIDDLE",
          wrapStrategy: "WRAP",
          textFormat: {
            foregroundColorStyle: rgb(0.09, 0.13, 0.17),
            fontFamily: "Arial",
            fontSize: 10
          }
        }
      },
      fields: "userEnteredFormat(backgroundColorStyle,verticalAlignment,wrapStrategy,textFormat)"
    }
  },
  {
    repeatCell: {
      range: gridRange(3, 4),
      cell: {
        userEnteredFormat: {
          backgroundColorStyle: rgb(0.09, 0.196, 0.302),
          horizontalAlignment: "CENTER",
          verticalAlignment: "MIDDLE",
          wrapStrategy: "WRAP",
          textFormat: {
            foregroundColorStyle: rgb(1, 1, 1),
            fontFamily: "Arial",
            fontSize: 9,
            bold: true
          }
        }
      },
      fields: "userEnteredFormat(backgroundColorStyle,horizontalAlignment,verticalAlignment,wrapStrategy,textFormat)"
    }
  },
  {
    repeatCell: {
      range: gridRange(4, 1004),
      cell: {
        userEnteredFormat: {
          verticalAlignment: "TOP",
          wrapStrategy: "WRAP",
          textFormat: { fontFamily: "Arial", fontSize: 9 }
        }
      },
      fields: "userEnteredFormat(verticalAlignment,wrapStrategy,textFormat)"
    }
  },
  {
    setDataValidation: {
      range: gridRange(4, 1200, 2, 3),
      rule: {
        condition: {
          type: "ONE_OF_LIST",
          values: ["미검토", "우선검토", "포함후보", "제외", "보류"].map((value) => ({ userEnteredValue: value }))
        },
        strict: true,
        showCustomUi: true
      }
    }
  },
  {
    setDataValidation: {
      range: gridRange(4, 1200, 4, 5),
      rule: {
        condition: {
          type: "ONE_OF_LIST",
          values: ["우선검토", "일반검토", "낮은우선순위"].map((value) => ({ userEnteredValue: value }))
        },
        strict: true,
        showCustomUi: true
      }
    }
  },
  {
    addConditionalFormatRule: {
      rule: {
        ranges: [gridRange(4, 1200, 4, 5)],
        booleanRule: {
          condition: { type: "TEXT_EQ", values: [{ userEnteredValue: "우선검토" }] },
          format: {
            backgroundColorStyle: rgb(0.882, 0.953, 0.91),
            textFormat: { foregroundColorStyle: rgb(0.09, 0.396, 0.227), bold: true }
          }
        }
      },
      index: 0
    }
  },
  {
    addConditionalFormatRule: {
      rule: {
        ranges: [gridRange(4, 1200, 16, 17)],
        booleanRule: {
          condition: { type: "NOT_BLANK" },
          format: {
            backgroundColorStyle: rgb(1, 0.953, 0.804),
            textFormat: { foregroundColorStyle: rgb(0.478, 0.353, 0), bold: true }
          }
        }
      },
      index: 1
    }
  },
  {
    updateDimensionProperties: {
      range: { sheetId, dimension: "ROWS", startIndex: 0, endIndex: 2 },
      properties: { pixelSize: 38 },
      fields: "pixelSize"
    }
  },
  {
    updateDimensionProperties: {
      range: { sheetId, dimension: "ROWS", startIndex: 2, endIndex: 3 },
      properties: { pixelSize: 48 },
      fields: "pixelSize"
    }
  },
  {
    updateDimensionProperties: {
      range: { sheetId, dimension: "ROWS", startIndex: 3, endIndex: 4 },
      properties: { pixelSize: 44 },
      fields: "pixelSize"
    }
  }
];

const widths = [
  145, 92, 92, 95, 104, 112, 118, 92, 170, 90, 165,
  72, 390, 145, 180, 140, 140, 460, 260, 220, 180
];
for (let index = 0; index < widths.length; index += 1) {
  setupRequests.push({
    updateDimensionProperties: {
      range: { sheetId, dimension: "COLUMNS", startIndex: index, endIndex: index + 1 },
      properties: { pixelSize: widths[index] },
      fields: "pixelSize"
    }
  });
}

setupRequests.push({
  addTable: {
    table: {
      name: "BulkLiteratureCandidatesTable",
      range: gridRange(3, 1004)
    }
  }
});

const dataBatches = [];
// Keep each request comfortably below connector payload limits while avoiding
// hundreds of tiny round trips during the weekly refresh.
const rowsPerBatch = 10;
for (let start = 0; start < rows.length; start += rowsPerBatch) {
  const chunk = rows.slice(start, start + rowsPerBatch);
  dataBatches.push({
    requests: [{
      updateCells: {
        range: gridRange(4 + start, 4 + start + chunk.length),
        rows: chunk.map((row) => ({
          values: row.map((value, columnIndex) => cell(
            value,
            columnIndex === 1 ? "date" : [3, 11].includes(columnIndex) && value !== "" ? "number" : "string"
          ))
        })),
        fields: "userEnteredValue,userEnteredFormat.numberFormat"
      }
    }]
  });
}

const payload = {
  spreadsheetId,
  sheetId,
  summary,
  rows: rows.length,
  columns: headers.length,
  setupRequests,
  dataBatches
};
const batchDir = resolve(outputPath, "..", "candidate-sheet-batches");
await rm(batchDir, { recursive: true, force: true });
await mkdir(batchDir, { recursive: true });
await writeFile(outputPath, `${JSON.stringify(payload)}\n`, "utf8");
await Promise.all([
  writeFile(resolve(batchDir, "setup.json"), `${JSON.stringify({ requests: setupRequests })}\n`, "utf8"),
  ...dataBatches.map((batch, index) => writeFile(
    resolve(batchDir, `batch-${String(index + 1).padStart(2, "0")}.json`),
    `${JSON.stringify(batch)}\n`,
    "utf8"
  ))
]);
console.log(JSON.stringify({ outputPath, batchDir, rows: rows.length, columns: headers.length, batches: dataBatches.length }));
