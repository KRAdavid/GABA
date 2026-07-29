import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(new URL("..", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1"));
const regulatory = JSON.parse(await readFile(resolve(root, "worker", "regulatory-data.json"), "utf8"));

const spreadsheetId = "1BRtPXEruHYLJ62vCVvDvb6-JkCvKdFi-bBUa7Md7vAQ";
const sheetId = 1740989138;
const guideSheetId = 1813661842;
const headers = [
  "자료_ID", "관리상태", "근거등급", "규제기관", "국가", "자료유형", "안전성영역",
  "원료명_한글", "원료명_영문", "자료제목_한글", "원문제목", "본문요약_한글",
  "심사활용_질문", "원료_동일성", "사용조건_일치", "대상·시험계", "용량·노출량",
  "시험기간", "핵심안전성결과", "NOAEL·안전역", "유해·이상반응", "자료품질",
  "GLP·시험지침", "국내외_인정상태", "원문_URL", "규제결정_URL", "최종확인일", "업데이트메모"
];
const keys = [
  "id", "status", "grade", "agency", "country", "documentType", "safetyArea",
  "ingredientKo", "ingredientEn", "titleKo", "title", "summaryKo", "useQuestion",
  "identity", "useMatch", "subject", "exposure", "duration", "safetyFinding",
  "noael", "adverse", "quality", "guidelines", "recognition", "sourceUrl",
  "decisionUrl", "checked", "notes"
];

function serialDate(value) {
  if (!value) return "";
  return Math.round((Date.parse(`${value}T00:00:00Z`) - Date.UTC(1899, 11, 30)) / 86400000);
}
function cell(value, isDate = false) {
  if (value === "" || value == null) return {};
  if (isDate) {
    return {
      userEnteredValue: { numberValue: serialDate(value) },
      userEnteredFormat: { numberFormat: { type: "DATE", pattern: "yyyy-mm-dd" } }
    };
  }
  return { userEnteredValue: { stringValue: String(value) } };
}
const sheetRows = regulatory.records.map((record) => keys.map((key) => record[key] ?? ""));
const gridRows = [headers, ...sheetRows].map((row, rowIndex) => ({
  values: row.map((value, columnIndex) => cell(value, rowIndex > 0 && columnIndex === 26))
}));
const range = (startRowIndex, endRowIndex, startColumnIndex = 0, endColumnIndex = 28) => ({
  sheetId, startRowIndex, endRowIndex, startColumnIndex, endColumnIndex
});
const rgb = (red, green, blue) => ({ rgbColor: { red, green, blue } });
const requests = [
  { mergeCells: { range: range(0, 2), mergeType: "MERGE_ALL" } },
  { mergeCells: { range: range(2, 3), mergeType: "MERGE_ALL" } },
  {
    updateCells: {
      range: range(0, 1, 0, 1),
      rows: [{ values: [cell("GABA 규제·안전성 자료 인덱스")] }],
      fields: "userEnteredValue"
    }
  },
  {
    updateCells: {
      range: range(2, 3, 0, 1),
      rows: [{ values: [cell(regulatory.meta.notice)] }],
      fields: "userEnteredValue"
    }
  },
  {
    updateCells: {
      range: range(3, 4 + regulatory.records.length),
      rows: gridRows,
      fields: "userEnteredValue,userEnteredFormat.numberFormat"
    }
  },
  {
    repeatCell: {
      range: range(0, 2),
      cell: {
        userEnteredFormat: {
          backgroundColorStyle: rgb(0.09019608, 0.19607843, 0.3019608),
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
      range: range(2, 3),
      cell: {
        userEnteredFormat: {
          backgroundColorStyle: rgb(0.9098039, 0.94509804, 0.972549),
          verticalAlignment: "MIDDLE",
          wrapStrategy: "WRAP",
          textFormat: {
            foregroundColorStyle: rgb(0.09019608, 0.12941177, 0.16862746),
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
      range: range(3, 4),
      cell: {
        userEnteredFormat: {
          backgroundColorStyle: rgb(0.05882353, 0.4627451, 0.43137255),
          horizontalAlignment: "CENTER",
          verticalAlignment: "MIDDLE",
          wrapStrategy: "WRAP",
          textFormat: {
            foregroundColorStyle: rgb(1, 1, 1),
            fontFamily: "Arial",
            fontSize: 10,
            bold: true
          }
        }
      },
      fields: "userEnteredFormat(backgroundColorStyle,horizontalAlignment,verticalAlignment,wrapStrategy,textFormat)"
    }
  },
  {
    repeatCell: {
      range: range(4, 4 + regulatory.records.length),
      cell: {
        userEnteredFormat: {
          verticalAlignment: "TOP",
          wrapStrategy: "WRAP",
          textFormat: { fontFamily: "Arial", fontSize: 10 }
        }
      },
      fields: "userEnteredFormat(verticalAlignment,wrapStrategy,textFormat)"
    }
  },
  {
    updateCells: {
      range: { sheetId: guideSheetId, startRowIndex: 0, endRowIndex: 1, startColumnIndex: 0, endColumnIndex: 1 },
      rows: [{ values: [cell("GABA 섭취 연구·규제 안전성 근거 데이터베이스")] }],
      fields: "userEnteredValue"
    }
  },
  {
    updateCells: {
      range: { sheetId: guideSheetId, startRowIndex: 2, endRowIndex: 3, startColumnIndex: 0, endColumnIndex: 1 },
      rows: [{ values: [cell("범위: GABA 자체가 경구·음수·사료·십이지장 경로로 투여된 인체·동물 원저와, 식약처 한시적 기준·규격 인정에 활용 가능한 규제·안전성 자료. 해외 승인자료는 식약처 인정의 자동 대체가 아니며 원료·공정·용도·노출량 동등성을 별도 검토합니다.")] }],
      fields: "userEnteredValue"
    }
  },
  {
    updateCells: {
      range: { sheetId: guideSheetId, startRowIndex: 5, endRowIndex: 6, startColumnIndex: 7, endColumnIndex: 8 },
      rows: [{ values: [cell("매주 1회 + 분기 심층검토")] }],
      fields: "userEnteredValue"
    }
  },
  {
    updateCells: {
      range: { sheetId: guideSheetId, startRowIndex: 7, endRowIndex: 8, startColumnIndex: 7, endColumnIndex: 8 },
      rows: [{ values: [cell("PubMed/PMC + Crossref/OpenAlex + MFDS/Health Canada")] }],
      fields: "userEnteredValue"
    }
  },
  {
    updateCells: {
      range: { sheetId: guideSheetId, startRowIndex: 11, endRowIndex: 12, startColumnIndex: 7, endColumnIndex: 8 },
      rows: [{ values: [cell("신규검색 → 원문추출 → 규제자료 검증 → QC → 웹갱신")] }],
      fields: "userEnteredValue"
    }
  }
];

const widths = [
  [0, 1, 150], [1, 3, 125], [3, 5, 140], [5, 7, 125], [7, 9, 150],
  [9, 11, 240], [11, 13, 260], [13, 15, 105], [15, 18, 145], [18, 19, 250],
  [19, 21, 170], [21, 23, 145], [23, 24, 210], [24, 26, 260], [26, 27, 110], [27, 28, 240]
];
for (const [startIndex, endIndex, pixelSize] of widths) {
  requests.push({
    updateDimensionProperties: {
      range: { sheetId, dimension: "COLUMNS", startIndex, endIndex },
      properties: { pixelSize },
      fields: "pixelSize"
    }
  });
}
for (const [startIndex, endIndex, pixelSize] of [
  [0, 2, 34], [2, 3, 54], [3, 4, 44], [4, 4 + regulatory.records.length, 92]
]) {
  requests.push({
    updateDimensionProperties: {
      range: { sheetId, dimension: "ROWS", startIndex, endIndex },
      properties: { pixelSize },
      fields: "pixelSize"
    }
  });
}

console.log(JSON.stringify({
  spreadsheet_id: spreadsheetId,
  requests,
  include_spreadsheet_in_response: true,
  response_include_grid_data: false,
  response_ranges: ["'규제안전성자료'!A1:AB9", "'관리안내'!A1:H12"]
}));
