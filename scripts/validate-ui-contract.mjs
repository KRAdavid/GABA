import { readFile } from "node:fs/promises";

const sourcePath = new URL("../worker/template.js", import.meta.url);
const source = await readFile(sourcePath, "utf8");

const required = [
  ["Intelligence section", 'id="intelligence"'],
  ["Intelligence type filter", "data-intelligence-kind"],
  ["Intelligence detail dialog", 'id="intelligence-detail"'],
  ["Detail facts", 'id="intelligence-detail-facts"'],
  ["Detail study design facts", "fact(\"연구 설계\", record.design)"],
  ["Detail meaning", 'id="intelligence-detail-meaning"'],
  ["Evidence boundary", 'id="intelligence-detail-boundary"'],
  ["Marketing utilization", 'id="intelligence-detail-marketing"'],
  ["Related evidence", 'id="intelligence-detail-related"'],
  ["Portal exploration lanes", 'id="portal-lanes-list"'],
  ["Portal lane model", "var PORTAL_LANES"],
  ["Portal lane overview", 'id="portal-lane-overview"'],
  ["Portal lane overview renderer", "function renderPortalLaneOverview"],
  ["Portal lane insight", 'id="portal-lane-insight"'],
  ["Regulatory comparison renderer", "function renderPortalLaneInsight"],
  ["Product comparison table", "product-matrix"],
  ["Technology comparison table", "technology-matrix"],
  ["Review-state filters", "data-intelligence-review"],
  ["Review checklist", 'id="intelligence-detail-checklist"'],
  ["Review queue", 'id="review-queue-list"'],
  ["Review queue renderer", "function renderReviewQueue"],
  ["Review queue filters", "data-review-filter"],
  ["Review queue summary", 'id="review-queue-summary"'],
  ["Review queue priority", "function reviewPriority"],
  ["Local review decision panel", 'id="review-decision-controls"'],
  ["Local review note", 'id="intelligence-detail-note"'],
  ["Local review save", 'id="intelligence-detail-save"'],
  ["Local review completion", "data-review-done"],
  ["Review queue export", 'id="review-queue-export"'],
  ["Review queue export renderer", "function exportReviewQueue"],
  ["Review queue import", 'id="review-queue-import"'],
  ["Review queue import renderer", "function importReviewQueue"],
  ["Freshness indicator", 'id="freshness-label"'],
  ["Discovery freshness distinction", "자동 탐색"],
  ["Candidate preview", 'id="candidate-preview"'],
  ["Candidate preview renderer", "function renderCandidatePreview"],
  ["Candidate source link guard", "function candidateSourceUrl"],
  ["Candidate preview expansion", 'id="candidate-preview-more"'],
  ["Candidate preview filters", "data-candidate-filter"],
  ["Candidate detail dialog", 'id="candidate-detail-dialog"'],
  ["Candidate screening signals", 'id="candidate-detail-screening"'],
  ["Candidate detail renderer", "function openCandidateDetail"],
  ["Candidate detail close", "function closeCandidateDetail"],
  ["Candidate preview export", 'id="candidate-preview-export"'],
  ["Candidate export filter parity", "function filterCandidatePreviewRecords"],
  ["Candidate filter URL state", "candidatePreviewFilter"],
  ["Candidate filter share parameter", 'params.set("candidate"'],
  ["Candidate deep-link focus", "candidatePreviewNeedsFocus"],
  ["Candidate filter counts", "candidateFilterLabels"],
  ["Immunity search suggestions", "면역 타액 IgA"],
  ["Canada monograph search suggestion", "캐나다 모노그래프"],
  ["Korean title provenance label", "koreanTitleLabel"],
  ["Marketing badge filter", "marketing-filter-badge"],
  ["CSV title provenance", "한국어 제목/분류 요약"],
  ["Marketing filter counts", "data-marketing-count"],
  ["Server marketing counts", "serverMarketingLabel"],
  ["Accessible active toggles", "function setActiveToggle"],
  ["Evidence compare tray", 'id="compare-tray"'],
  ["Evidence compare dialog", 'id="compare-dialog"'],
  ["Evidence compare renderer", "function renderCompareTable"],
  ["Comparison study design", '["연구 설계", "design"]'],
  ["Comparison result direction", '["결과 방향", "direction"]'],
  ["Comparison interpretation note", 'id="compare-dialog-insight"'],
  ["Comparison CSV export", 'id="compare-export"'],
  ["Search result brief", 'id="result-brief"'],
  ["Shareable compare state", 'params.set("compare"'],
  ["Comparison copy action", 'id="compare-copy"'],
  ["Comparison focus return", "compareReturnFocus"],
  ["Result evidence composition", 'id="result-interpretation"'],
  ["Shareable record deep link", "urlRecordId"],
  ["Citation copy action", "data-copy-citation"],
  ["Evidence brief copy action", "data-copy-brief"],
  ["Hero search entry", "hero-primary"],
  ["Exploration presets", "data-preset"],
  ["Detail opener", "function openIntelligenceDetail"],
  ["Dynamic event delegation", 'event.target.closest("[data-intelligence-id]")']
  ,["Reading list dialog", 'id="reading-list-dialog"']
  ,["Reading list state", "gaba-reading-ids"]
  ,["Reading list toggle", "data-reading-toggle"]
  ,["Reading list focus return", "readingReturnFocus"]
  ,["Reading list brief copy", 'id="reading-list-copy"']
  ,["Reading list clear", 'id="reading-list-clear"']
  ,["Reading list brief renderer", "function readingListBriefText"]
  ,["Reading list share", 'id="reading-list-share"']
  ,["Shareable reading state", 'params.set("read"']
  ,["Filtered result export", 'id="result-export"']
  ,["Filtered result CSV renderer", "function exportFilteredResults"]
  ,["Marketing utilization filter", "data-marketing"]
  ,["Marketing utilization URL state", "state.marketing"]
  ,["Intervention classification filter", "data-intervention"]
  ,["Intervention classification counts", "data-intervention-count"]
  ,["Server-rendered intervention counts", "serverInterventionClass"]
  ,["Verified snapshot label", "검증 스냅샷"]
  ,["Collapsed filter state labels", "data-quick-summary"]
  ,["Review queue share link", "review-queue-share"]
  ,["Review queue URL state", "sharedReviewIds"]
  ,["Review share dialog", "review-share-dialog"]
  ,["Review share copy action", "copyReviewShareUrl"]
  ,["Shared queue exit", "clearSharedReviewQueue"]
  ,["Shared queue focus", "sharedReviewNeedsFocus"]
  ,["Stale shared queue notice", "sharedReviewMissingCount"]
  ,["Intervention badge", "interventionShortLabel"]
  ,["Intervention badge filter", "intervention-filter-badge"]
  ,["Structured search metadata", "application/ld+json"]
  ,["Unified copy dialog", "copy-dialog"]
  ,["Unified copy fallback", "openCopyDialog"]
  ,["Intervention classification", "function interventionClass"]
  ,["Intervention classification URL state", "state.intervention"]
];

const missing = required.filter(([, marker]) => !source.includes(marker));
if (missing.length) {
  console.error(JSON.stringify({ valid: false, missing: missing.map(([name]) => name) }));
  process.exit(1);
}

console.log(JSON.stringify({ valid: true, checked: required.length, source: "worker/template.js" }));
