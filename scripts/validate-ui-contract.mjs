import { readFile } from "node:fs/promises";

const sourcePath = new URL("../worker/template.js", import.meta.url);
const source = await readFile(sourcePath, "utf8");

const required = [
  ["Intelligence section", 'id="intelligence"'],
  ["Intelligence type filter", "data-intelligence-kind"],
  ["Intelligence detail dialog", 'id="intelligence-detail"'],
  ["Detail facts", 'id="intelligence-detail-facts"'],
  ["Verification summary", 'id="intelligence-detail-verification"'],
  ["Verification summary renderer", "function verificationSummary"],
  ["Detail record freshness", "function recordFreshness"],
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
  ["Result card detail review action", 'class="paper-review"'],
  ["Review queue local-only scope", 'id="review-queue-scope"'],
  ["Review queue renderer", "function renderReviewQueue"],
  ["Review queue action hierarchy", "review-card-primary"],
  ["Review queue source action", "review-card-source"],
  ["Primary source label", "function primarySourceLabel"],
  ["Review queue filters", "data-review-filter"],
  ["Review queue audit filter", 'data-review-filter="audit"'],
  ["Review queue audit summary", "원문 접근 제한"],
  ["Review queue audit count", "auditGapCount.toLocaleString"],
  ["Review queue summary", 'id="review-queue-summary"'],
  ["Review queue completion rate", "전체 큐 완료율"],
  ["Review queue expansion", "전체 큐 표시"],
  ["Review queue priority", "function reviewPriority"],
  ["Advanced filter grouping", "filter-subgroup-heading"],
  ["Advanced filter research group", "연구·원문 확인"],
  ["Route group filter", 'id="route-group"'],
  ["Saved search storage", "gaba-saved-searches-v1"],
  ["Saved search renderer", "function renderSavedSearches"],
  ["Saved search share link", "data-saved-search-share"],
  ["Brief primary source link", "대표 원문:"],
  ["App ready marker", "dataset.gabaReady"],
  ["Personal workspace reset", 'id="personal-workspace-clear"'],
  ["Result next-action routes", "data-result-preset"],
  ["Result next-action renderer", "result-interpretation-actions"],
  ["Oral route next action", 'data-result-preset="oral"'],
  ["Review priority rationale", "review-priority-reason"],
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
  ["Candidate preview scope", "전체 후보"],
  ["Candidate recommendation summary", "검토 권고"],
  ["Candidate source link guard", "function candidateSourceUrl"],
  ["Candidate source label", "function candidateSourceLabel"],
  ["Candidate preview expansion", 'id="candidate-preview-more"'],
  ["Candidate preview filters", "data-candidate-filter"],
  ["Candidate review-status filters", 'data-candidate-filter="reviewed"'],
  ["Candidate review status", "screeningStatus"],
  ["Candidate queue scope", "전체 큐:"],
  ["Candidate full export", "candidateExport"],
  ["Candidate export health", "candidateExportCount"],
  ["Candidate screening signals", "routeSignals"],
  ["Candidate human signal labels", "candidateHumanSignals"],
  ["Candidate review URL regression", 'requestedCandidateFilter'],
  ["Candidate detail dialog", 'id="candidate-detail-dialog"'],
  ["Candidate screening signals", 'id="candidate-detail-screening"'],
  ["Candidate detail renderer", "function openCandidateDetail"],
  ["Candidate detail close", "function closeCandidateDetail"],
  ["Candidate preview export", 'id="candidate-preview-export"'],
  ["Candidate export filter parity", "function filterCandidatePreviewRecords"],
  ["Candidate filter URL state", "candidatePreviewFilter"],
  ["Candidate filter share parameter", 'params.set("candidate"'],
  ["Candidate detail URL state", "urlCandidateId"],
  ["Candidate detail share parameter", 'params.set("candidateId"'],
  ["Candidate detail deep-link restore", "openCandidateDetail(urlCandidateId"],
  ["Candidate link copy", "data-copy-candidate-link"],
  ["Candidate link copy fallback", "copyCandidateLink"],
  ["Candidate deep-link focus", "candidatePreviewNeedsFocus"],
  ["Candidate filter counts", "candidateFilterLabels"],
  ["Immunity search suggestions", "면역 타액 IgA"],
  ["Canada monograph search suggestion", "캐나다 모노그래프"],
  ["Progressive search suggestions", "search-suggestions-more"],
  ["Search suggestion expansion label", "추천 검색어 더보기"],
  ["Korean title provenance label", "koreanTitleLabel"],
  ["Korean type-aware title fallback", "문헌 고찰"],
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
  ["Brief reproducible link", "조건 링크:"],
  ["Brief condition summary", "현재 조건: "],
  ["Candidate promotion checklist", 'id="candidate-detail-checklist"'],
  ["Discovery health metrics", "discoveryMergedUnique"],
  ["Discovery source transparency", '["Crossref", Number(discovery.crossrefRetrieved'],
  ["Discovery screening status", "discovery.screeningCounts"],
  ["Discovery matched manual decisions", "manualDecisionsMatched"],
  ["Freshness explanation action", 'id="freshness-label" type="button"'],
  ["Shareable compare state", 'params.set("compare"'],
  ["Comparison copy action", 'id="compare-copy"'],
  ["Comparison focus return", "compareReturnFocus"],
  ["Result evidence composition", 'id="result-interpretation"'],
  ["Result next review action", 'id="result-review-jump"'],
  ["Shareable record deep link", "urlRecordId"],
  ["Citation copy action", "data-copy-citation"],
  ["Record link copy action", "data-copy-record-link"],
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
  ,["Filtered result share", 'id="result-share"']
  ,["Filtered result export menu", 'id="result-export-menu"']
  ,["Filtered result export options", "result-export-options"]
  ,["Filtered result export close", "function closeResultExportMenu"]
  ,["Filtered result CSV renderer", "function exportFilteredResults"]
  ,["Filtered result JSON export", 'id="result-json"']
  ,["Filtered result JSON renderer", "function exportFilteredJson"]
  ,["Filtered result RIS export", 'id="result-ris"']
  ,["Filtered result RIS renderer", "function exportFilteredRis"]
  ,["Publication follow-up signal", "function publicationFollowupLabel"]
  ,["CSV evidence boundaries", "SCI/SCIE"]
  ,["CSV extraction and review date", "추출 상태"]
  ,["CSV snapshot provenance", "검증 스냅샷"]
  ,["Marketing utilization filter", "data-marketing"]
  ,["Marketing utilization URL state", "state.marketing"]
  ,["Intervention classification filter", "data-intervention"]
  ,["Intervention classification counts", "data-intervention-count"]
  ,["Server-rendered intervention counts", "serverInterventionClass"]
  ,["Verified snapshot label", "검증 스냅샷"]
  ,["Collapsed filter state labels", "data-quick-summary"]
  ,["Human-source review sort", 'value="human-source"']
  ,["Human-source review sort logic", "function humanSourcePriority"]
  ,["Human-source sort explanation", 'id="sort-help"']
  ,["Human-source sort explanation sync", "function syncSortHelp"]
  ,["Review queue share link", "review-queue-share"]
  ,["Review queue URL state", "sharedReviewIds"]
  ,["Review queue filter share state", "reviewFilter"]
  ,["Review queue filter labels", "reviewQueueFilterLabels"]
  ,["Curated note extraction", "function labeledNote"]
  ,["Curated research meaning priority", 'var curated = labeledNote(record, "연구의 의미", "마케팅 활용 방안")']
  ,["Curated marketing direction priority", 'var curated = labeledNote(record, "마케팅 활용 방안")']
  ,["Marketing boundary note", "활용 방향 제시 · 광고 허가·효능 입증 아님 · 외부 검토 필요"]
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
  ,["Intervention classification URL restoration", '\"intervention\", \"followup\", \"grade\"']
  ,["Publication follow-up filter", 'data-followup="signal"']
  ,["Publication follow-up URL state", "state.followup"]
  ,["Link audit transparency", "DB.meta.linkAudit"]
  ,["Link audit interpretation guard", 'id="link-audit-note"']
  ,["Link audit methodology action", 'id="link-audit-methodology"']
  ,["Per-record link audit status", "function sourceAuditRecord"]
  ,["Per-record link audit guard", "sourceAuditDescription"]
  ,["Link audit KST date", "function koreanDateTime"]
  ,["Link audit freshness", "function linkAuditFreshnessLabel"]
  ,["Link audit freshness timezone", 'timeZone: "Asia/Seoul"']
  ,["Link audit freshness interpretation", "감사 신선도"]
  ,["Snapshot freshness KST", "function updateFreshnessLabel"]
  ,["Comparison sticky context", "position: sticky; left: 0"]
  ,["Discovery delta helper", "function discoveryDeltaLabel"]
  ,["Snapshot provenance", "release.snapshotVersion"]
  ,["Release traceability", "release.siteVersion"]
  ,["Current code deployment provenance", "release.currentCodeDeployment"]
  ,["Release provenance distinction note", 'id="release-provenance-note"']
  ,["Per-record audit filter", 'id="audit"']
  ,["Audit filter counts", "function syncAuditFilterOptions"]
  ,["Freshness filter", 'id="freshness"']
  ,["Freshness filter buckets", "function freshnessBucket"]
  ,["Freshness filter interpretation guard", "확인일 경과만 표시하며 근거의 질을 평가하지 않습니다."]
  ,["Freshness result interpretation guard", "최신 원문과 출판 후속 공지를 다시 확인하세요."]
  ,["Freshness review queue filter", 'data-review-filter="freshness"']
  ,["Freshness review queue count", "freshnessGapCount.toLocaleString"]
  ,["Freshness review queue action", "최신 원문·후속 공지"]
  ,["Audit follow-up preset", 'data-preset="audit-unavailable"']
  ,["Audit interpretation guard", "원문 재확인·대체 경로 검토 대상"]
  ,["Methodology dialog", "id=\"methodology-dialog\""]
  ,["Methodology rules", "출판 후속조치를 확인합니다"]
  ,["Methodology refresh and sync policy", "공개·갱신·동기화 원칙"]
  ,["Methodology Sheets 403 policy", "403이면 재시도하지 않고 동기화 대기목록"]
  ,["Copy dialog accessible name", 'id="copy-dialog-value" aria-labelledby="copy-dialog-title"']
  ,["Empty result recovery suggestions", 'data-empty-query="수면"']
  ,["Pagination status announcement", 'id="page-status" role="status" aria-live="polite"']
  ,["Candidate personal review actions", "data-candidate-review-status=\"검토 완료\""]
  ,["Candidate review progress summary", 'id="candidate-review-progress"']
  ,["Candidate status separation", "자동 선별 상태"]
  ,["Brief verification status", "원문 접근:"]
  ,["Candidate detail focus return", "candidateDetailReturnFocus"]
  ,["Review priority sort", 'value="review-priority"']
  ,["Sort guidance association", 'id="sort" aria-describedby="sort-help"']
  ,["Sort condition visibility", "sortLabel"]
  ,["Page size condition visibility", "pageSizeLabel"]
  ,["Default sort condition guard", 'state.sort === "latest"']
  ,["Empty result recovery", "data-empty-reset"]
  ,["Visible filter status", 'id="filter-status-strip"']
  ,["Filter status summary", 'id="filter-status-text"']
  ,["Filter status reset", 'id="filter-status-reset"']
  ,["Dose query interpretation", "function queryFilterLabel"]
  ,["Mobile filter result action", 'id="filter-mobile-apply"']
  ,["Result interpretation guard", "해석 경계"]
  ,["Result evidence scope actions", 'data-result-preset="animal"']
  ,["Result evidence scope preset", 'if (name === "animal") state.kind = "동물"']
  ,["Card study condition summary", 'fact("표본·대조군"']
  ,["Evidence scope selection state", "result-interpretation-stat-action[aria-pressed"]
  ,["Card verification date", "record.checked ? ' · 확인 '"]
  ,["Review queue verification meta", 'class="review-priority-meta"']
  ,["Review checklist action summary", 'id="review-check-summary"']
  ,["Verification next action wording", "원문에서 확인한 뒤 활용 범위를 판단"]
  ,["Balanced direction quick filter", 'data-direction="무효"']
  ,["Balanced direction disclosure", 'data-quick-summary="direction"']
  ,["Reading list source action", "원문 확인"]
  ,["Reading list compare action", 'data-compare-toggle=']
  ,["Evidence distribution expansion", "function renderDistribution"]
  ,["Evidence distribution complete list", "var extra = items.slice(4)"]
  ,["Evidence distribution hidden state", ".distribution-item[hidden]"]
  ,["Evidence distribution selected state", "function syncDistributionSelection"]
  ,["Evidence distribution pressed state", "aria-pressed"]
  ,["Evidence distribution toggle", "state[field] === value ? \"\" : value"]
  ,["Evidence distribution focus return", 'id="result-count" tabindex="-1"']
];

const missing = required.filter(([, marker]) => !source.includes(marker));
if (missing.length) {
  console.error(JSON.stringify({ valid: false, missing: missing.map(([name]) => name) }));
  process.exit(1);
}

console.log(JSON.stringify({ valid: true, checked: required.length, source: "worker/template.js" }));
