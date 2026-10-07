const DATABASE = __GABA_DATABASE__;

const PAGE_TEMPLATE = String.raw`<!doctype html>
<html lang="ko">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="theme-color" content="#0b5f59">
  <meta name="description" content="GABA 섭취 임상·동물시험 문헌과 식약처·해외 규제 안전성 자료를 제목과 내용의 한국어 검색으로 탐색하는 근거 인덱스">
  <meta name="gaba-release" content="2026-10-06-public-surface-guard">
  <meta property="og:type" content="website">
  <meta property="og:title" content="GABA 연구·규제 안전성 근거 인덱스">
  <meta property="og:description" content="GABA 섭취 연구와 규제·안전성 자료를 근거 수준과 원문 연결로 탐색하는 한국어 포털">
  <meta property="og:url" content="https://gaba-evidence-index-kr.dubaissday.chatgpt.site/">
  <meta name="twitter:card" content="summary">
  <meta name="twitter:title" content="GABA 연구·규제 안전성 근거 인덱스">
  <meta name="twitter:description" content="GABA 섭취 연구와 규제·안전성 자료를 근거 수준과 원문 연결로 탐색하는 한국어 포털">
  <link rel="canonical" href="https://gaba-evidence-index-kr.dubaissday.chatgpt.site/">
  <script type="application/ld+json">{"@context":"https://schema.org","@type":"WebSite","name":"GABA 연구·규제 안전성 근거 인덱스","description":"GABA 섭취 연구와 규제·안전성 자료를 한국어로 탐색하는 공개 읽기 전용 포털","url":"https://gaba-evidence-index-kr.dubaissday.chatgpt.site/","inLanguage":"ko-KR","isAccessibleForFree":true,"potentialAction":{"@type":"SearchAction","target":"https://gaba-evidence-index-kr.dubaissday.chatgpt.site/?q={search_term_string}","query-input":"required name=search_term_string"}}</script>
  <title>GABA 연구·규제 안전성 근거 인덱스</title>
  <style>
    :root {
      color-scheme: light;
      --ink: #132b3a;
      --ink-2: #3d5361;
      --muted: #647681;
      --line: #d9e1df;
      --surface: #ffffff;
      --surface-2: #f5f7f6;
      --surface-3: #eaf3f1;
      --teal: #0f766e;
      --teal-dark: #0b5f59;
      --teal-soft: #dff3ef;
      --blue: #2563eb;
      --blue-soft: #e9efff;
      --amber: #9a6700;
      --amber-soft: #fff1c7;
      --red: #b42318;
      --red-soft: #fee4e2;
      --green: #16794a;
      --green-soft: #e2f5e9;
      --shadow: 0 10px 30px rgba(25, 54, 64, .08);
      --radius-lg: 22px;
      --radius-md: 14px;
      --radius-sm: 9px;
      --max: 1440px;
    }

    * { box-sizing: border-box; }
    html { scroll-behavior: smooth; }
    section[id], h2[id] { scroll-margin-top: 84px; }
    .sr-only {
      position: absolute !important;
      width: 1px !important;
      height: 1px !important;
      padding: 0 !important;
      margin: -1px !important;
      overflow: hidden !important;
      clip: rect(0, 0, 0, 0) !important;
      white-space: nowrap !important;
      border: 0 !important;
    }
    body {
      margin: 0;
      background: var(--surface-2);
      color: var(--ink);
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans KR",
        "Apple SD Gothic Neo", "Malgun Gothic", sans-serif;
      line-height: 1.55;
      word-break: keep-all;
      overflow-wrap: anywhere;
    }
    button, input, select { font: inherit; }
    button, a { -webkit-tap-highlight-color: transparent; }
    a { color: var(--teal-dark); }
    a:hover { color: var(--teal); }
    :focus-visible {
      outline: 3px solid rgba(37, 99, 235, .42);
      outline-offset: 2px;
    }
    .skip-link {
      position: fixed;
      left: 16px;
      top: -80px;
      z-index: 999;
      padding: 12px 16px;
      border-radius: 8px;
      background: var(--ink);
      color: #fff;
      text-decoration: none;
    }
    .skip-link:focus { top: 16px; }

    .topbar {
      position: sticky;
      top: 0;
      z-index: 80;
      border-bottom: 1px solid rgba(217, 225, 223, .9);
      background: rgba(255, 255, 255, .92);
      backdrop-filter: blur(14px);
    }
    .topbar-inner {
      width: min(var(--max), calc(100% - 40px));
      min-height: 68px;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 18px;
    }
    .brand {
      display: flex;
      align-items: center;
      gap: 12px;
      color: var(--ink);
      text-decoration: none;
      min-width: 0;
    }
    .brand-mark {
      width: 38px;
      height: 38px;
      display: grid;
      place-items: center;
      border-radius: 12px;
      background: var(--teal-dark);
      color: #fff;
      font-size: 13px;
      font-weight: 800;
      letter-spacing: -.04em;
      white-space: nowrap;
      flex: 0 0 auto;
    }
    .brand-copy { display: grid; gap: 1px; min-width: 0; }
    .brand-copy strong { font-size: 15px; }
    .brand-copy span { color: var(--muted); font-size: 12px; }
    .top-actions { display: flex; align-items: center; gap: 8px; }
    .portal-nav { display: flex; align-items: center; gap: 4px; margin-left: auto; }
    .portal-nav a {
      display: inline-flex; align-items: center; min-height: 38px; padding: 7px 10px;
      border-radius: 9px; color: var(--muted); text-decoration: none; font-size: 12px; font-weight: 700;
    }
    .portal-nav a:hover, .portal-nav a:focus-visible { color: var(--ink); background: var(--surface-2); }
    .top-link, .share-button {
      min-height: 42px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 7px;
      padding: 8px 13px;
      border: 1px solid var(--line);
      border-radius: 10px;
      background: #fff;
      color: var(--ink);
      font-weight: 700;
      font-size: 13px;
      text-decoration: none;
      cursor: pointer;
    }
    .share-button {
      border-color: var(--teal);
      background: var(--teal);
      color: #fff;
    }

    .page {
      width: min(var(--max), calc(100% - 40px));
      margin: 0 auto;
      padding: 34px 0 60px;
    }
    .intelligence-strip {
      display: grid; grid-template-columns: minmax(0, 1.1fr) repeat(3, minmax(0, 1fr));
      gap: 12px; margin: 24px 0 30px; align-items: stretch;
    }
    .intelligence-intro, .intelligence-card {
      border: 1px solid var(--line); border-radius: var(--radius-md); background: #fff; padding: 18px;
    }
    .intelligence-intro { background: var(--ink); color: #fff; }
    .intelligence-intro h2, .intelligence-card h3 { margin: 0; letter-spacing: -.03em; }
    .intelligence-intro h2 { font-size: 19px; }
    .intelligence-intro p { margin: 8px 0 0; color: rgba(255,255,255,.72); font-size: 12px; line-height: 1.55; }
    .intelligence-card { display: grid; align-content: space-between; gap: 16px; min-height: 138px; }
    .intelligence-card h3 { font-size: 14px; }
    .intelligence-card p { margin: 6px 0 0; color: var(--muted); font-size: 12px; line-height: 1.5; }
    .intelligence-value { display: block; color: var(--teal-dark); font-size: 24px; letter-spacing: -.05em; }
    .intelligence-link { color: var(--teal-dark); font-size: 12px; font-weight: 800; text-decoration: none; }
    .intelligence-feed { margin: 0 0 30px; }
    .intelligence-feed-head { display: flex; align-items: end; justify-content: space-between; gap: 16px; margin-bottom: 12px; }
    .intelligence-feed-head h2 { margin: 0; font-size: 22px; letter-spacing: -.04em; }
    .intelligence-feed-head p { margin: 4px 0 0; color: var(--muted); font-size: 12px; }
    .intelligence-filters { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 12px; }
    .intelligence-filter { min-height: 32px; padding: 5px 10px; border: 1px solid var(--line); border-radius: 999px; background: #fff; color: var(--muted); font-size: 11px; font-weight: 800; cursor: pointer; }
    .intelligence-filter.active { border-color: var(--teal); background: var(--teal-soft); color: var(--teal-dark); }
    .intelligence-filter-label { display: block; margin-top: 10px; color: var(--muted); font-size: 10px; font-weight: 800; }
    .intelligence-feed-list { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 12px; }
    .intelligence-feed-card { min-width: 0; border-top: 3px solid var(--teal); border-radius: var(--radius-md); background: #fff; padding: 18px; box-shadow: var(--shadow); }
    .intelligence-feed-card .feed-kicker { color: var(--teal-dark); font-size: 11px; font-weight: 800; }
    .intelligence-feed-card h3 { margin: 8px 0 6px; font-size: 16px; line-height: 1.35; letter-spacing: -.03em; }
    .intelligence-feed-card p { margin: 0; color: var(--muted); font-size: 12px; line-height: 1.55; }
    .intelligence-feed-card .feed-action { margin-top: 14px; padding-top: 12px; border-top: 1px solid var(--line); color: var(--ink); font-size: 12px; line-height: 1.5; }
    .intelligence-feed-card button { margin-top: 12px; margin-right: 12px; padding: 0; border: 0; background: transparent; color: var(--teal-dark); font-size: 12px; font-weight: 800; cursor: pointer; }
    .intelligence-detail { width: min(760px, calc(100% - 28px)); max-height: min(760px, calc(100vh - 36px)); margin: auto; padding: 0; border: 0; border-radius: 18px; background: #fff; color: var(--ink); box-shadow: 0 24px 80px rgba(19, 43, 58, .24); }
    .intelligence-detail::backdrop { background: rgba(19, 43, 58, .46); backdrop-filter: blur(3px); }
    .intelligence-detail-inner { padding: 24px; overflow: auto; max-height: min(760px, calc(100vh - 36px)); }
    .intelligence-detail-head { display: flex; justify-content: space-between; align-items: start; gap: 16px; padding-bottom: 16px; border-bottom: 1px solid var(--line); }
    .intelligence-detail-kicker { color: var(--teal-dark); font-size: 11px; font-weight: 800; }
    .intelligence-detail h2 { margin: 6px 0 0; font-size: 24px; line-height: 1.3; letter-spacing: -.04em; }
    .intelligence-detail-close { width: 34px; height: 34px; border: 1px solid var(--line); border-radius: 9px; background: #fff; color: var(--ink); font-size: 20px; cursor: pointer; }
    .intelligence-detail-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; margin: 18px 0; }
    .verification-summary { display: grid; grid-template-columns: auto minmax(0, 1fr); gap: 14px; align-items: center; margin: 18px 0; padding: 14px 16px; border: 1px solid var(--line); border-radius: 12px; background: linear-gradient(135deg, #f5fbfa, #fff); }
    .verification-score { display: grid; place-items: center; width: 64px; height: 64px; border: 6px solid var(--teal-soft); border-top-color: var(--teal); border-radius: 50%; color: var(--teal-dark); font-size: 13px; font-weight: 900; }
    .verification-summary h3 { margin: 0 0 4px; font-size: 13px; }
    .verification-summary p { margin: 0; color: var(--ink-2); font-size: 12px; line-height: 1.55; }
    .verification-summary small { display: block; margin-top: 5px; color: var(--muted); font-size: 10px; line-height: 1.45; }
    .intelligence-detail-section { margin-top: 18px; padding: 16px; border-radius: 12px; background: var(--surface-2); }
    .intelligence-detail-section h3 { margin: 0 0 7px; font-size: 13px; }
    .intelligence-detail-section p { margin: 0; color: var(--ink-2); font-size: 13px; line-height: 1.65; }
    .review-checklist { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 7px; }
    .review-check { display: flex; align-items: center; gap: 7px; padding: 8px 10px; border-radius: 8px; background: #fff; color: var(--muted); font-size: 11px; }
    .review-check-mark { display: grid; place-items: center; width: 19px; height: 19px; border-radius: 50%; background: var(--surface-3); color: var(--teal-dark); font-weight: 900; }
    .review-check.missing .review-check-mark { background: var(--amber-soft); color: var(--amber); }
    .review-queue { margin: 0 0 30px; padding: 18px; border: 1px solid var(--line); border-radius: var(--radius-md); background: #fff; }
    .review-queue-head { display: flex; align-items: end; justify-content: space-between; gap: 14px; margin-bottom: 12px; }
    .review-queue-head h2 { margin: 0; font-size: 20px; letter-spacing: -.04em; }
    .review-queue-head p { margin: 4px 0 0; color: var(--muted); font-size: 12px; }
    .review-queue-count { color: var(--amber); font-size: 12px; font-weight: 800; white-space: nowrap; }
    .review-queue-scope { display: inline-flex; align-items: center; gap: 5px; margin-top: 8px; padding: 5px 8px; border: 1px solid rgba(15,118,110,.24); border-radius: 999px; background: var(--teal-soft); color: var(--teal-dark); font-size: 10px; font-weight: 800; }
    .review-queue-summary { display: flex; flex-wrap: wrap; gap: 6px; margin: 0 0 12px; }
    .review-queue-summary span { padding: 5px 8px; border: 1px solid var(--line); border-radius: 8px; background: var(--surface-2); color: var(--muted); font-size: 10px; font-weight: 800; }
    .review-queue-summary span strong { color: var(--ink); }
    .review-queue-controls { display: flex; flex-wrap: wrap; align-items: center; gap: 6px; margin: 0 0 12px; }
    .review-queue-filter { min-height: 30px; padding: 5px 9px; border: 1px solid var(--line); border-radius: 999px; background: #fff; color: var(--muted); font-size: 11px; font-weight: 800; cursor: pointer; }
    .review-queue-filter.active { border-color: var(--amber); background: var(--amber-soft); color: var(--amber); }
    .review-queue-toggle { display: inline-flex; align-items: center; gap: 5px; margin-left: auto; color: var(--muted); font-size: 11px; }
    .review-queue-storage { width: 100%; color: var(--muted); font-size: 10px; }
    .review-queue-shared-note { display: flex; align-items: center; justify-content: space-between; gap: 10px; margin: 0 0 12px; padding: 9px 11px; border: 1px solid rgba(15,118,110,.24); border-radius: 9px; background: var(--teal-soft); color: var(--teal-dark); font-size: 11px; line-height: 1.45; }
    .review-queue-shared-note[hidden] { display: none; }
    .review-queue-shared-note button { flex: 0 0 auto; min-height: 29px; padding: 5px 9px; border: 1px solid rgba(15,118,110,.32); border-radius: 8px; background: #fff; color: var(--teal-dark); font-size: 10px; font-weight: 800; cursor: pointer; }
    .review-queue-title:focus-visible { outline: 3px solid rgba(15,118,110,.28); outline-offset: 5px; border-radius: 4px; }
    .review-queue-export, .review-queue-import, .review-queue-share, .review-queue-more { min-height: 30px; padding: 5px 9px; border: 1px solid var(--teal); border-radius: 8px; background: var(--teal); color: #fff; font-size: 11px; font-weight: 800; cursor: pointer; }
    .review-queue-tools { position: relative; }
    .review-queue-tools > summary { min-height: 30px; display: inline-flex; align-items: center; padding: 5px 9px; border: 1px solid var(--teal); border-radius: 8px; background: #fff; color: var(--teal-dark); font-size: 11px; font-weight: 800; cursor: pointer; list-style: none; }
    .review-queue-tools > summary::-webkit-details-marker { display: none; }
    .review-queue-tools > summary::after { content: "＋"; margin-left: 5px; color: var(--muted); }
    .review-queue-tools[open] > summary { background: var(--teal-soft); }
    .review-queue-tools[open] > summary::after { content: "－"; }
    .review-queue-tools-menu { position: absolute; z-index: 4; top: calc(100% + 6px); left: 0; display: flex; flex-wrap: wrap; gap: 6px; min-width: 190px; padding: 8px; border: 1px solid var(--line); border-radius: 10px; background: #fff; box-shadow: 0 10px 24px rgba(25, 54, 64, .14); }
    .review-queue-tools-menu .review-queue-export, .review-queue-tools-menu .review-queue-import, .review-queue-tools-menu .review-queue-share, .review-queue-tools-menu .review-queue-more { width: 100%; text-align: left; }
    .review-queue-import { border-color: var(--line); background: #fff; color: var(--teal-dark); }
    .review-queue-more { border-color: rgba(15,118,110,.28); background: var(--teal-soft); color: var(--teal-dark); }
    .review-queue-more[hidden] { display: none; }
    .review-share-dialog { width: min(640px, calc(100% - 28px)); margin: auto; padding: 0; border: 0; border-radius: 18px; background: #fff; color: var(--ink); box-shadow: 0 24px 80px rgba(19,43,58,.24); }
    .review-share-dialog::backdrop { background: rgba(19,43,58,.46); backdrop-filter: blur(3px); }
    .review-share-inner { padding: 22px; }
    .review-share-head { display: flex; align-items: start; justify-content: space-between; gap: 14px; padding-bottom: 14px; border-bottom: 1px solid var(--line); }
    .review-share-head h2 { margin: 0; font-size: 21px; letter-spacing: -.04em; }
    .review-share-head p { margin: 4px 0 0; color: var(--muted); font-size: 11px; line-height: 1.5; }
    .review-share-close { width: 34px; height: 34px; border: 1px solid var(--line); border-radius: 9px; background: #fff; color: var(--ink); font-size: 20px; cursor: pointer; }
    .review-share-label { display: block; margin-top: 16px; color: var(--muted); font-size: 11px; font-weight: 800; }
    .review-share-url { width: 100%; min-height: 42px; margin-top: 7px; padding: 9px 10px; border: 1px solid var(--line); border-radius: 9px; background: var(--surface-2); color: var(--ink); font: inherit; font-size: 11px; line-height: 1.4; }
    .review-share-actions { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 12px; }
    .review-share-actions button { min-height: 34px; padding: 6px 10px; border: 1px solid var(--teal); border-radius: 8px; background: var(--teal); color: #fff; font-size: 11px; font-weight: 800; cursor: pointer; }
    .review-share-actions button.secondary { border-color: var(--line); background: #fff; color: var(--muted); }
    @media (max-width: 640px) { .review-share-inner { padding: 16px; } }
    .copy-dialog { width: min(720px, calc(100% - 28px)); margin: auto; padding: 0; border: 0; border-radius: 18px; background: #fff; color: var(--ink); box-shadow: 0 24px 80px rgba(19,43,58,.24); }
    .copy-dialog::backdrop { background: rgba(19,43,58,.46); backdrop-filter: blur(3px); }
    .copy-dialog-inner { padding: 22px; }
    .copy-dialog-head { display: flex; align-items: start; justify-content: space-between; gap: 14px; padding-bottom: 14px; border-bottom: 1px solid var(--line); }
    .copy-dialog-head h2 { margin: 0; font-size: 21px; letter-spacing: -.04em; }
    .copy-dialog-head p { margin: 4px 0 0; color: var(--muted); font-size: 11px; line-height: 1.5; }
    .copy-dialog-close { width: 34px; height: 34px; border: 1px solid var(--line); border-radius: 9px; background: #fff; color: var(--ink); font-size: 20px; cursor: pointer; }
    .copy-dialog-value { width: 100%; min-height: 140px; margin-top: 16px; padding: 10px; border: 1px solid var(--line); border-radius: 9px; background: var(--surface-2); color: var(--ink); font: inherit; font-size: 11px; line-height: 1.5; resize: vertical; }
    .copy-dialog-actions { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 12px; }
    .copy-dialog-actions button { min-height: 34px; padding: 6px 10px; border: 1px solid var(--teal); border-radius: 8px; background: var(--teal); color: #fff; font-size: 11px; font-weight: 800; cursor: pointer; }
    .copy-dialog-actions button.secondary { border-color: var(--line); background: #fff; color: var(--muted); }
    @media (max-width: 640px) { .copy-dialog-inner { padding: 16px; } }
    .methodology-dialog { width: min(760px, calc(100% - 28px)); max-height: min(780px, calc(100vh - 36px)); margin: auto; padding: 0; border: 0; border-radius: 18px; background: #fff; color: var(--ink); box-shadow: 0 24px 80px rgba(19,43,58,.24); }
    .methodology-dialog::backdrop { background: rgba(19,43,58,.46); backdrop-filter: blur(3px); }
    .methodology-dialog-inner { padding: 22px; overflow: auto; max-height: min(780px, calc(100vh - 36px)); }
    .methodology-dialog-head { display: flex; align-items: start; justify-content: space-between; gap: 14px; padding-bottom: 14px; border-bottom: 1px solid var(--line); }
    .methodology-dialog-head h2 { margin: 0; font-size: 21px; letter-spacing: -.04em; }
    .methodology-dialog-head p { margin: 4px 0 0; color: var(--muted); font-size: 11px; line-height: 1.5; }
    .methodology-dialog-close { width: 34px; height: 34px; border: 1px solid var(--line); border-radius: 9px; background: #fff; color: var(--ink); font-size: 20px; cursor: pointer; }
    .methodology-dialog-body { display: grid; gap: 14px; margin-top: 16px; }
    .methodology-dialog-section { padding: 13px 14px; border: 1px solid var(--line); border-radius: 11px; background: var(--surface-2); }
    .methodology-dialog-section h3 { margin: 0 0 6px; font-size: 13px; }
    .methodology-dialog-section p, .methodology-dialog-section li { color: var(--muted); font-size: 11px; line-height: 1.65; }
    .methodology-dialog-section p { margin: 0; }
    .methodology-dialog-section ul { margin: 0; padding-left: 18px; }
    @media (max-width: 640px) { .methodology-dialog-inner { padding: 16px; } }
    .review-queue-list { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 10px; }
    .review-queue-card { padding: 14px; border: 1px solid var(--line); border-left: 3px solid var(--amber); border-radius: 10px; background: var(--surface-2); }
    .review-queue-card.priority-high { border-left-color: #d97706; }
    .review-queue-card.priority-medium { border-left-color: var(--teal); }
    .review-priority { display: inline-flex; margin-top: 7px; padding: 3px 6px; border-radius: 6px; background: var(--amber-soft); color: var(--amber); font-size: 10px; font-weight: 800; }
    .review-priority.high { background: #fff0d8; color: #a65300; }
    .review-priority.medium { background: var(--teal-soft); color: var(--teal-dark); }
    .review-priority-reason { margin: 5px 0 0; color: var(--muted); font-size: 10px; line-height: 1.45; }
    .review-priority-meta { margin-top: 5px !important; color: var(--ink-2) !important; font-size: 10px !important; }
    .source-audit-badge { border-color: #e8c2a7; background: #fff8f1; color: #9a4d17; }
    .review-queue-card h3 { margin: 7px 0 5px; font-size: 13px; line-height: 1.4; }
    .review-queue-card p { margin: 0; color: var(--muted); font-size: 11px; line-height: 1.5; }
    .review-card-actions { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 11px; }
    .review-card-actions button { min-height: 29px; padding: 5px 8px; border: 1px solid var(--line); border-radius: 8px; background: #fff; color: var(--muted); font-size: 10px; font-weight: 800; cursor: pointer; }
    .review-card-actions .review-card-primary { border-color: var(--teal); background: var(--teal); color: #fff; }
    .review-card-actions .review-card-secondary { color: var(--teal-dark); }
    .review-card-actions .review-card-source { display: inline-flex; align-items: center; min-height: 29px; padding: 5px 8px; border: 1px solid var(--line); border-radius: 8px; color: var(--teal-dark); font-size: 10px; font-weight: 800; text-decoration: none; }
    .review-card-actions .review-card-state[data-review-status="done"] { color: var(--amber); }
    .review-card-actions .review-card-state[data-review-status="hold"] { color: #7c3aed; }
    .review-queue-card.review-done { opacity: .66; border-left-color: var(--green); }
    .review-queue-card.review-hold { border-left-color: #7c3aed; }
    @media (max-width: 640px) { .review-queue-list { grid-template-columns: 1fr; } }
    .compare-tray { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; margin: 10px 0 12px; padding: 10px 12px; border: 1px solid rgba(15,118,110,.24); border-radius: 10px; background: var(--teal-soft); color: var(--teal-dark); font-size: 11px; font-weight: 800; }
    .compare-tray[hidden] { display: none; }
    .compare-tray button { min-height: 30px; padding: 5px 9px; border: 1px solid var(--teal); border-radius: 8px; background: var(--teal); color: #fff; font-size: 11px; font-weight: 800; cursor: pointer; }
    .compare-tray button.secondary { border-color: rgba(15,118,110,.28); background: #fff; color: var(--teal-dark); }
    .compare-tray button:disabled { opacity: .48; cursor: not-allowed; }
    .paper-compare { display: inline-flex; align-items: center; min-height: 30px; padding: 5px 9px; border: 1px solid var(--line); border-radius: 8px; background: #fff; color: var(--teal-dark); font-size: 11px; font-weight: 800; cursor: pointer; }
    .paper-compare[aria-pressed="true"] { border-color: var(--teal); background: var(--teal-soft); }
    .compare-dialog { width: min(1120px, calc(100% - 28px)); max-height: min(820px, calc(100vh - 36px)); margin: auto; padding: 0; border: 0; border-radius: 18px; background: #fff; color: var(--ink); box-shadow: 0 24px 80px rgba(19,43,58,.24); }
    .compare-dialog::backdrop { background: rgba(19,43,58,.46); backdrop-filter: blur(3px); }
    .compare-dialog-inner { padding: 22px; overflow: auto; max-height: min(820px, calc(100vh - 36px)); }
    .compare-dialog-head { display: flex; align-items: start; justify-content: space-between; gap: 14px; padding-bottom: 14px; border-bottom: 1px solid var(--line); }
    .compare-dialog-head h2 { margin: 0; font-size: 21px; letter-spacing: -.04em; }
    .compare-dialog-head p { margin: 4px 0 0; color: var(--muted); font-size: 11px; }
    .compare-dialog-close { width: 34px; height: 34px; border: 1px solid var(--line); border-radius: 9px; background: #fff; color: var(--ink); font-size: 20px; cursor: pointer; }
    .compare-dialog-actions { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 14px; }
    .compare-dialog-actions button { min-height: 34px; padding: 6px 10px; border: 1px solid var(--teal); border-radius: 8px; background: var(--teal); color: #fff; font-size: 11px; font-weight: 800; cursor: pointer; }
    .compare-dialog-insight { margin-top: 14px; padding: 11px 13px; border: 1px solid rgba(15,118,110,.24); border-radius: 10px; background: var(--teal-soft); color: var(--teal-dark); font-size: 12px; line-height: 1.6; }
    .compare-table-wrap { overflow-x: auto; margin-top: 16px; }
    .compare-table { min-width: 760px; width: 100%; border-collapse: collapse; font-size: 12px; }
    .compare-table th, .compare-table td { padding: 10px; border-bottom: 1px solid var(--line); vertical-align: top; text-align: left; line-height: 1.5; }
    .compare-table th:first-child, .compare-table td:first-child { position: sticky; left: 0; z-index: 2; width: 130px; background: var(--surface-2); color: var(--muted); font-weight: 800; box-shadow: 4px 0 8px rgba(19,43,58,.08); }
    .compare-table thead th:first-child { z-index: 3; }
    .compare-table th { color: var(--ink); font-size: 13px; }
    .compare-table td { color: var(--ink-2); }
    .compare-table .compare-title { color: var(--ink); font-weight: 900; }
    .compare-table .paper-link { display: inline-flex; margin-top: 6px; color: var(--teal-dark); font-size: 11px; font-weight: 800; text-decoration: none; }
    @media (max-width: 640px) { .compare-dialog-inner { padding: 16px; } }
    .reading-list-dialog { width: min(720px, calc(100% - 28px)); max-height: min(760px, calc(100vh - 36px)); margin: auto; padding: 0; border: 0; border-radius: 18px; background: #fff; color: var(--ink); box-shadow: 0 24px 80px rgba(19,43,58,.24); }
    .reading-list-dialog::backdrop { background: rgba(19,43,58,.46); backdrop-filter: blur(3px); }
    .reading-list-inner { padding: 22px; overflow: auto; max-height: min(760px, calc(100vh - 36px)); }
    .reading-list-head { display: flex; align-items: start; justify-content: space-between; gap: 14px; padding-bottom: 14px; border-bottom: 1px solid var(--line); }
    .reading-list-head h2 { margin: 0; font-size: 21px; letter-spacing: -.04em; }
    .reading-list-head p { margin: 4px 0 0; color: var(--muted); font-size: 11px; }
    .reading-list-close { width: 34px; height: 34px; border: 1px solid var(--line); border-radius: 9px; background: #fff; color: var(--ink); font-size: 20px; cursor: pointer; }
    .reading-list-actions { display: flex; flex-wrap: wrap; gap: 7px; margin-top: 14px; }
    .reading-list-actions button { min-height: 32px; padding: 5px 10px; border: 1px solid var(--teal); border-radius: 8px; background: var(--teal); color: #fff; font-size: 11px; font-weight: 800; cursor: pointer; }
    .reading-list-actions button.secondary { border-color: var(--line); background: #fff; color: var(--muted); }
    .reading-list-items { display: grid; gap: 9px; margin-top: 16px; }
    .reading-list-item { display: grid; grid-template-columns: 1fr auto; gap: 12px; align-items: center; padding: 13px; border: 1px solid var(--line); border-radius: 11px; background: var(--surface-2); }
    .reading-list-item h3 { margin: 0; font-size: 13px; line-height: 1.4; }
    .reading-list-item p { margin: 4px 0 0; color: var(--muted); font-size: 11px; line-height: 1.45; }
    .reading-list-item-actions { display: flex; flex-wrap: wrap; justify-content: end; gap: 6px; }
    .reading-list-item-actions button { min-height: 30px; padding: 5px 9px; border: 1px solid var(--line); border-radius: 8px; background: #fff; color: var(--teal-dark); font-size: 11px; font-weight: 800; cursor: pointer; }
    .reading-list-item-actions button[data-reading-remove] { color: var(--muted); }
    .reading-list-empty { margin: 16px 0 0; padding: 18px; border: 1px dashed var(--line); border-radius: 11px; background: var(--surface-2); color: var(--muted); font-size: 12px; line-height: 1.6; }
    .reading-list-button { display: inline-flex; align-items: center; gap: 6px; min-height: 38px; padding: 7px 11px; border: 1px solid var(--teal); border-radius: 9px; background: #fff; color: var(--teal-dark); font-size: 12px; font-weight: 800; cursor: pointer; }
    .reading-list-count { min-width: 18px; padding: 1px 5px; border-radius: 999px; background: var(--teal-soft); font-size: 10px; text-align: center; }
    .paper-read-later { display: inline-flex; align-items: center; min-height: 30px; padding: 5px 9px; border: 1px solid var(--line); border-radius: 8px; background: #fff; color: var(--teal-dark); font-size: 11px; font-weight: 800; cursor: pointer; }
    .paper-read-later[aria-pressed="true"] { border-color: var(--teal); background: var(--teal-soft); }
    .paper-review { display: inline-flex; align-items: center; min-height: 30px; padding: 5px 9px; border: 1px solid var(--teal); border-radius: 8px; background: var(--teal); color: #fff; font-size: 11px; font-weight: 800; cursor: pointer; }
    .paper-review:hover, .paper-review:focus-visible { background: var(--teal-dark); }
    @media (max-width: 640px) { .reading-list-inner { padding: 16px; } .reading-list-item { grid-template-columns: 1fr; } .reading-list-item-actions { justify-content: start; } }
    .intelligence-related-list { display: grid; gap: 8px; }
    .intelligence-related-list button { width: 100%; padding: 10px 12px; border: 1px solid var(--line); border-radius: 9px; background: #fff; color: var(--ink); text-align: left; font-size: 12px; font-weight: 700; line-height: 1.45; cursor: pointer; }
    .intelligence-related-list button:hover { border-color: var(--teal); background: var(--teal-soft); }
    .review-decision-copy { margin: 0 0 10px; color: var(--muted); font-size: 11px; line-height: 1.5; }
    .review-decision-controls { display: flex; flex-wrap: wrap; gap: 6px; }
    .review-decision-controls button { min-height: 30px; padding: 5px 9px; border: 1px solid var(--line); border-radius: 8px; background: #fff; color: var(--muted); font-size: 11px; font-weight: 800; cursor: pointer; }
    .review-decision-controls button.active { border-color: var(--teal); background: var(--teal-soft); color: var(--teal-dark); }
    .review-decision-note { width: 100%; min-height: 72px; margin-top: 10px; padding: 9px 10px; border: 1px solid var(--line); border-radius: 9px; background: #fff; color: var(--ink); font: inherit; font-size: 12px; line-height: 1.5; resize: vertical; }
    .review-decision-save { margin-top: 8px; min-height: 32px; padding: 5px 10px; border: 1px solid var(--teal); border-radius: 8px; background: var(--teal); color: #fff; font-size: 11px; font-weight: 800; cursor: pointer; }
    .intelligence-detail-actions { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 20px; }
    .intelligence-detail-actions a, .intelligence-detail-actions button { display: inline-flex; align-items: center; min-height: 38px; padding: 7px 12px; border: 1px solid var(--line); border-radius: 9px; background: #fff; color: var(--ink); font-size: 12px; font-weight: 800; text-decoration: none; cursor: pointer; }
    .intelligence-detail-actions a.primary { border-color: var(--teal); background: var(--teal); color: #fff; }
    @media (max-width: 640px) { .intelligence-detail-grid { grid-template-columns: 1fr; } .review-checklist { grid-template-columns: 1fr; } .intelligence-detail-inner { padding: 18px; } .intelligence-detail h2 { font-size: 20px; } }
    .portal-lanes { margin: 0 0 30px; }
    .portal-lanes-head { margin-bottom: 12px; }
    .portal-lanes-head h2 { margin: 0; font-size: 22px; letter-spacing: -.04em; }
    .portal-lanes-head p { margin: 4px 0 0; color: var(--muted); font-size: 12px; }
    .portal-lanes-list { display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 10px; }
    .portal-lane { min-height: 142px; display: flex; flex-direction: column; justify-content: space-between; padding: 16px; border: 1px solid var(--line); border-radius: var(--radius-md); background: #fff; text-align: left; cursor: pointer; }
    .portal-lane:hover, .portal-lane:focus-visible { border-color: var(--teal); box-shadow: var(--shadow); }
    .portal-lane strong { font-size: 14px; letter-spacing: -.02em; }
    .portal-lane p { margin: 7px 0 0; color: var(--muted); font-size: 11px; line-height: 1.5; }
    .portal-lane-meta { display: flex; align-items: end; justify-content: space-between; gap: 8px; margin-top: 16px; }
    .portal-lane-count { color: var(--teal-dark); font-size: 18px; font-weight: 800; letter-spacing: -.04em; }
    .portal-lane-action { color: var(--teal-dark); font-size: 11px; font-weight: 800; }
    .portal-lane-overview { margin: -14px 0 30px; padding: 18px; border: 1px solid var(--line); border-radius: var(--radius-md); background: var(--surface-3); }
    .portal-lane-overview[hidden] { display: none; }
    .portal-lane-overview-head { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-bottom: 12px; }
    .portal-lane-overview-head h3 { margin: 0; font-size: 16px; letter-spacing: -.03em; }
    .portal-lane-overview-head p { margin: 3px 0 0; color: var(--muted); font-size: 11px; }
    .portal-lane-overview-close { border: 0; background: transparent; color: var(--muted); font-size: 12px; font-weight: 800; cursor: pointer; }
    .portal-lane-overview-list { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 10px; }
    .portal-lane-overview-card { padding: 14px; border: 1px solid rgba(15,118,110,.18); border-radius: 11px; background: #fff; }
    .portal-lane-overview-card h4 { margin: 0 0 6px; font-size: 13px; line-height: 1.4; }
    .portal-lane-overview-card p { margin: 0; color: var(--muted); font-size: 11px; line-height: 1.5; }
    .portal-lane-overview-card button { margin-top: 10px; padding: 0; border: 0; background: transparent; color: var(--teal-dark); font-size: 11px; font-weight: 800; cursor: pointer; }
    .portal-lane-insight { margin-top: 14px; padding-top: 14px; border-top: 1px solid rgba(15,118,110,.18); }
    .portal-lane-insight h4 { margin: 0 0 8px; font-size: 12px; }
    .portal-lane-insight p { margin: 0 0 8px; color: var(--muted); font-size: 11px; line-height: 1.5; }
    .regulatory-matrix { width: 100%; border-collapse: collapse; background: #fff; font-size: 11px; }
    .regulatory-matrix th, .regulatory-matrix td { padding: 8px 9px; border-bottom: 1px solid var(--line); text-align: left; }
    .regulatory-matrix th { color: var(--muted); font-size: 10px; font-weight: 800; }
    .regulatory-matrix td:last-child, .regulatory-matrix th:last-child { text-align: right; }
    .product-matrix-wrap { overflow-x: auto; }
    .product-matrix { min-width: 680px; }
    .technology-matrix { min-width: 760px; }
    @media (max-width: 980px) { .portal-lanes-list { grid-template-columns: repeat(3, minmax(0, 1fr)); } }
    @media (max-width: 640px) { .portal-lanes-list { grid-template-columns: 1fr 1fr; } .portal-lane-overview-list { grid-template-columns: 1fr; } }
    @media (max-width: 430px) { .portal-lanes-list { grid-template-columns: 1fr; } }
    .hero {
      position: relative;
      overflow: hidden;
      display: grid;
      grid-template-columns: minmax(0, 1.35fr) minmax(260px, .65fr);
      align-items: end;
      gap: 42px;
      padding: clamp(28px, 5vw, 58px);
      border-radius: 28px;
      color: #fff;
      background:
        radial-gradient(circle at 88% 18%, rgba(157, 230, 216, .26), transparent 28%),
        linear-gradient(135deg, #0a4c49 0%, #0f766e 56%, #0e5c66 100%);
      box-shadow: var(--shadow);
    }
    .hero::after {
      content: "";
      position: absolute;
      width: 300px;
      height: 300px;
      right: -110px;
      bottom: -190px;
      border: 48px solid rgba(255, 255, 255, .08);
      border-radius: 50%;
    }
    .eyebrow {
      margin: 0 0 12px;
      font-size: 13px;
      font-weight: 800;
      letter-spacing: .08em;
      opacity: .88;
    }
    .hero h1 {
      max-width: 800px;
      margin: 0;
      font-size: clamp(32px, 5vw, 58px);
      line-height: 1.13;
      letter-spacing: -.045em;
    }
    .hero p {
      max-width: 740px;
      margin: 18px 0 0;
      font-size: clamp(15px, 2vw, 19px);
      color: rgba(255, 255, 255, .86);
    }
    .hero-copy { position: relative; z-index: 1; min-width: 0; max-width: 100%; }
    .hero-actions { position: relative; z-index: 1; display: flex; flex-wrap: wrap; gap: 8px; margin-top: 22px; }
    .hero-actions a { display: inline-flex; align-items: center; min-height: 40px; padding: 8px 13px; border-radius: 10px; font-size: 12px; font-weight: 900; text-decoration: none; }
    .hero-actions .hero-primary { background: #fff; color: var(--teal-dark); }
    .hero-actions .hero-secondary { border: 1px solid rgba(255,255,255,.32); background: rgba(255,255,255,.09); color: #fff; }
    .hero-actions a:hover, .hero-actions a:focus-visible { transform: translateY(-1px); }
    .mobile-portal-jump { display: none; margin-top: 2px; color: #fff; }
    .mobile-portal-jump summary { min-height: 34px; padding: 7px 10px; border: 1px solid rgba(255,255,255,.32); border-radius: 9px; background: rgba(255,255,255,.09); font-size: 11px; font-weight: 800; cursor: pointer; list-style: none; }
    .mobile-portal-jump summary::-webkit-details-marker { display: none; }
    .mobile-portal-jump summary::after { content: "＋"; float: right; }
    .mobile-portal-jump[open] summary::after { content: "－"; }
    .mobile-portal-jump-links { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 7px; }
    .mobile-portal-jump-links a { padding: 5px 8px; border: 1px solid rgba(255,255,255,.3); border-radius: 999px; color: #fff; font-size: 10px; font-weight: 800; text-decoration: none; }
    .mobile-portal-jump-links a:focus-visible, .mobile-portal-jump-links a:hover { background: rgba(255,255,255,.16); }
    .hero-proof {
      position: relative;
      z-index: 1;
      min-width: 0;
      display: grid;
      gap: 13px;
      padding-left: 24px;
      border-left: 1px solid rgba(255, 255, 255, .25);
    }
    .hero-proof-item {
      display: grid;
      grid-template-columns: 34px 1fr;
      gap: 10px;
      align-items: start;
    }
    .hero-proof-mark {
      display: grid;
      width: 30px;
      height: 30px;
      place-items: center;
      border: 1px solid rgba(255, 255, 255, .28);
      border-radius: 9px;
      background: rgba(255, 255, 255, .12);
      font-size: 13px;
      font-weight: 900;
    }
    .hero-proof strong { display: block; font-size: 14px; }
    .hero-proof span { display: block; margin-top: 2px; color: rgba(255, 255, 255, .72); font-size: 12px; line-height: 1.45; overflow-wrap: anywhere; }
    .hero-meta {
      position: relative;
      z-index: 1;
      margin-top: 26px;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 9px;
    }
    .hero-pill {
      display: inline-flex;
      align-items: center;
      gap: 7px;
      min-height: 34px;
      padding: 6px 11px;
      border: 1px solid rgba(255, 255, 255, .23);
      border-radius: 999px;
      background: rgba(255, 255, 255, .10);
      font-size: 13px;
      font-weight: 700;
    }
    .freshness-action { cursor: pointer; font: inherit; }
    .freshness-action:hover, .freshness-action:focus-visible { background: rgba(255, 255, 255, .18); color: #fff; outline: 2px solid rgba(255, 255, 255, .78); outline-offset: 2px; }
    .hero-pill.freshness-stale { border-color: rgba(255, 216, 154, .72); background: rgba(255, 216, 154, .18); color: #ffe4b5; }
    .hero-pill.freshness-recent { border-color: rgba(183, 243, 231, .5); color: #d6fff7; }
    .pulse {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #8ff0d6;
      box-shadow: 0 0 0 5px rgba(143, 240, 214, .13);
    }

    .metric-grid {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 12px;
      margin: 18px 0 0;
    }
    .metric {
      min-height: 122px;
      padding: 18px 18px 16px;
      border: 1px solid var(--line);
      border-radius: var(--radius-md);
      background: var(--surface);
      box-shadow: 0 5px 18px rgba(25, 54, 64, .04);
    }
    .metric-label {
      display: block;
      color: var(--muted);
      font-size: 13px;
      font-weight: 700;
    }
    .metric-value {
      display: block;
      margin-top: 5px;
      color: var(--ink);
      font-size: 32px;
      font-weight: 800;
      letter-spacing: -.04em;
    }
    .metric-help {
      display: block;
      margin-top: 3px;
      color: var(--ink-2);
      font-size: 12px;
    }
    .orientation-strip {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 1px;
      margin-top: 18px;
      overflow: hidden;
      border: 1px solid var(--line);
      border-radius: var(--radius-md);
      background: var(--line);
    }
    .orientation-step {
      display: grid;
      grid-template-columns: 30px 1fr;
      gap: 10px;
      align-items: center;
      min-height: 72px;
      padding: 13px 16px;
      background: #fff;
      color: var(--ink);
      text-decoration: none;
    }
    .orientation-step:hover { background: var(--surface-3); color: var(--ink); }
    .orientation-step-number {
      display: grid;
      width: 28px;
      height: 28px;
      place-items: center;
      border-radius: 50%;
      background: var(--teal-soft);
      color: var(--teal-dark);
      font-size: 12px;
      font-weight: 900;
    }
    .orientation-step strong { display: block; font-size: 13px; }
    .orientation-step span { display: block; margin-top: 2px; color: var(--muted); font-size: 11px; }
    .discovery-banner {
      display: grid;
      grid-template-columns: minmax(0, 1fr) auto;
      align-items: center;
      gap: 22px;
      margin-top: 14px;
      padding: 18px 20px;
      border: 1px solid #b9d9d2;
      border-radius: var(--radius-md);
      background: linear-gradient(135deg, #f2fbf8, #f8fbfa);
    }
    .discovery-banner h2 {
      margin: 0;
      font-size: 17px;
      letter-spacing: -.02em;
    }
    .discovery-banner p {
      margin: 6px 0 0;
      color: var(--ink-2);
      font-size: 13px;
      line-height: 1.65;
    }
    .discovery-stats {
      display: flex;
      flex-wrap: wrap;
      gap: 7px;
      margin-top: 10px;
    }
    .release-provenance-note {
      margin: 9px 0 0;
      color: var(--muted);
      font-size: 11px;
      line-height: 1.55;
    }
    .data-boundary {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-top: 11px;
    }
    .data-boundary span {
      padding: 5px 8px;
      border: 1px solid #d7e8e4;
      border-radius: 999px;
      background: rgba(255,255,255,.75);
      color: #41615d;
      font-size: 11px;
      font-weight: 700;
    }
    .discovery-stat {
      padding: 5px 9px;
      border-radius: 999px;
      background: #fff;
      color: var(--teal-dark);
      font-size: 12px;
      font-weight: 800;
      box-shadow: inset 0 0 0 1px #c9e1dc;
    }
    .discovery-link {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-height: 42px;
      padding: 9px 14px;
      border-radius: 11px;
      background: var(--teal);
      color: #fff;
      font-size: 13px;
      font-weight: 800;
      text-decoration: none;
      white-space: nowrap;
    }
    .candidate-preview {
      margin-top: 14px;
      padding: 18px 20px;
      border: 1px solid var(--line);
      border-radius: var(--radius-md);
      background: #fff;
    }
    .candidate-preview[hidden] { display: none; }
    .candidate-preview-head { display: flex; align-items: end; justify-content: space-between; gap: 14px; }
    .candidate-preview-head h2 { margin: 0; font-size: 17px; letter-spacing: -.02em; }
    .candidate-preview-head p { margin: 5px 0 0; color: var(--muted); font-size: 12px; line-height: 1.5; }
    .candidate-review-progress { margin-top: 5px !important; color: var(--teal-dark) !important; font-size: 11px !important; font-weight: 800; }
    .candidate-preview-head-actions { display: flex; align-items: center; gap: 8px; }
    .candidate-preview-note { max-width: 560px; color: var(--amber); font-size: 11px; font-weight: 800; line-height: 1.45; text-align: right; }
    .candidate-preview-export { min-height: 30px; padding: 5px 9px; border: 1px solid var(--teal); border-radius: 8px; background: #fff; color: var(--teal-dark); font-size: 10px; font-weight: 900; cursor: pointer; }
    .candidate-preview-filters { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 13px; }
    .candidate-preview-filter { min-height: 30px; padding: 5px 9px; border: 1px solid var(--line); border-radius: 999px; background: #fff; color: var(--muted); font-size: 11px; font-weight: 800; cursor: pointer; }
    .candidate-preview-filter.active { border-color: var(--amber); background: var(--amber-soft); color: var(--amber); }
    .candidate-preview-filter.review { border-color: var(--teal); }
    .candidate-preview-list { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 10px; margin-top: 14px; }
    .candidate-preview-card { min-width: 0; padding: 14px; border: 1px solid var(--line); border-left: 3px solid var(--amber); border-radius: 11px; background: var(--surface-2); }
    .candidate-preview-card h3 { margin: 7px 0 5px; font-size: 13px; line-height: 1.45; }
    .candidate-preview-card p { margin: 0; color: var(--muted); font-size: 11px; line-height: 1.5; }
    .candidate-preview-kicker { color: var(--amber); font-size: 10px; font-weight: 900; }
    .candidate-preview-meta { display: flex; flex-wrap: wrap; gap: 5px; margin-top: 7px; }
    .candidate-preview-meta span { padding: 3px 6px; border-radius: 6px; background: #fff; color: var(--muted); font-size: 10px; font-weight: 800; }
    .candidate-preview-signal { margin-top: 9px !important; color: var(--ink-2) !important; }
    .candidate-preview-card a { display: inline-flex; margin-top: 10px; color: var(--teal-dark); font-size: 11px; font-weight: 900; text-decoration: none; }
    .candidate-preview-detail { display: inline-flex; margin-top: 10px; margin-right: 8px; min-height: 29px; padding: 5px 8px; border: 1px solid var(--teal); border-radius: 8px; background: var(--teal); color: #fff; font-size: 10px; font-weight: 900; cursor: pointer; }
    .candidate-preview-more { display: inline-flex; margin-top: 14px; min-height: 34px; padding: 7px 11px; border: 1px solid var(--line); border-radius: 9px; background: #fff; color: var(--teal-dark); font-size: 11px; font-weight: 900; cursor: pointer; }
    .candidate-detail-dialog { width: min(760px, calc(100% - 28px)); max-height: min(780px, calc(100vh - 36px)); margin: auto; padding: 0; border: 0; border-radius: 18px; background: #fff; color: var(--ink); box-shadow: 0 24px 80px rgba(19,43,58,.24); }
    .candidate-detail-dialog::backdrop { background: rgba(19,43,58,.46); backdrop-filter: blur(3px); }
    .candidate-detail-inner { padding: 22px; overflow: auto; max-height: min(780px, calc(100vh - 36px)); }
    .candidate-detail-head { display: flex; align-items: start; justify-content: space-between; gap: 14px; padding-bottom: 14px; border-bottom: 1px solid var(--line); }
    .candidate-detail-head h2 { margin: 0; font-size: 21px; line-height: 1.35; letter-spacing: -.04em; }
    .candidate-detail-close { width: 34px; height: 34px; border: 1px solid var(--line); border-radius: 9px; background: #fff; color: var(--ink); font-size: 20px; cursor: pointer; }
    .candidate-detail-meta { margin-top: 14px; color: var(--muted); font-size: 12px; line-height: 1.6; }
    .candidate-detail-warning { margin-top: 14px; padding: 11px 12px; border-radius: 10px; background: var(--amber-soft); color: var(--amber); font-size: 12px; font-weight: 800; line-height: 1.5; }
    .candidate-detail-screening { margin-top: 12px; padding: 12px 14px; border: 1px solid rgba(183,121,31,.22); border-radius: 10px; background: #fffaf0; color: var(--ink-2); font-size: 12px; line-height: 1.65; }
    .candidate-detail-screening strong { color: var(--amber); }
    .candidate-detail-checklist { margin-top: 12px; padding: 12px 14px; border: 1px solid var(--line); border-radius: 10px; background: var(--surface-2); }
    .candidate-detail-checklist h3 { margin: 0 0 8px; color: var(--ink); font-size: 12px; }
    .candidate-detail-checklist ul { display: grid; gap: 6px; margin: 0; padding: 0; list-style: none; }
    .candidate-detail-checklist li { display: flex; align-items: baseline; justify-content: space-between; gap: 10px; color: var(--ink-2); font-size: 11px; line-height: 1.45; }
    .candidate-detail-checklist li strong { color: var(--ink); }
    .candidate-detail-checklist li span { color: var(--muted); text-align: right; }
    .candidate-detail-abstract { margin-top: 16px; padding: 15px; border-radius: 11px; background: var(--surface-2); color: var(--ink-2); font-size: 13px; line-height: 1.7; white-space: pre-wrap; }
    .candidate-detail-actions { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 14px; }
    .candidate-detail-actions a, .candidate-detail-actions button { display: inline-flex; min-height: 34px; align-items: center; padding: 6px 10px; border: 1px solid var(--teal); border-radius: 8px; background: var(--teal); color: #fff; font: inherit; font-size: 11px; font-weight: 900; text-decoration: none; cursor: pointer; }
    .candidate-detail-actions button.secondary { border-color: var(--line); background: #fff; color: var(--ink-2); }
    .candidate-detail-actions button[aria-pressed="true"] { border-color: var(--teal); background: var(--teal-soft); color: var(--teal-dark); }
    @media (max-width: 640px) { .candidate-detail-inner { padding: 16px; } .candidate-detail-head h2 { font-size: 19px; } }
    @media (max-width: 980px) { .candidate-preview-list { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
    @media (max-width: 640px) { .candidate-preview-head { align-items: start; flex-direction: column; gap: 5px; } .candidate-preview-list { grid-template-columns: 1fr; } }

    .section {
      margin-top: 22px;
      border: 1px solid var(--line);
      border-radius: var(--radius-lg);
      background: var(--surface);
      box-shadow: 0 6px 22px rgba(25, 54, 64, .04);
    }
    .section-head {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      gap: 20px;
      padding: 24px 26px 0;
    }
    .section-head h2 {
      margin: 0;
      font-size: 22px;
      letter-spacing: -.025em;
    }
    .section-head p {
      margin: 5px 0 0;
      color: var(--muted);
      font-size: 13px;
    }
    .distribution-grid {
      display: grid;
      grid-template-columns: 1.1fr .9fr;
      gap: 24px;
      padding: 20px 26px 26px;
    }
    .distribution-context {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 8px;
      margin: 16px 26px 0;
      color: var(--muted);
      font-size: 11px;
      line-height: 1.45;
    }
    .distribution-context strong {
      padding: 4px 8px;
      border-radius: 999px;
      background: var(--teal-soft);
      color: var(--teal-dark);
      font-size: 10px;
      font-weight: 900;
      white-space: nowrap;
    }
    .distribution h3 {
      margin: 0 0 12px;
      color: var(--ink-2);
      font-size: 14px;
    }
    .distribution-list {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 10px;
    }
    .distribution-more {
      min-height: 34px;
      margin-top: 9px;
      padding: 6px 10px;
      border: 1px solid var(--line);
      border-radius: 10px;
      background: var(--surface-2);
      color: var(--teal-dark);
      font-size: 12px;
      font-weight: 800;
      cursor: pointer;
    }
    .distribution-more:hover,
    .distribution-more:focus-visible {
      border-color: var(--teal);
      background: var(--teal-soft);
    }
    .distribution-item {
      width: 100%;
      display: grid;
      grid-template-columns: 54px 1fr;
      align-items: center;
      gap: 11px;
      padding: 10px;
      border: 1px solid var(--line);
      border-radius: 14px;
      background: #fff;
      color: var(--ink);
      text-align: left;
      cursor: pointer;
      transition: transform .2s ease, border-color .2s ease, box-shadow .2s ease;
    }
    .distribution-item[hidden] { display: none; }
    .distribution-item:hover,
    .distribution-item:focus-visible {
      border-color: var(--teal);
      box-shadow: 0 6px 16px rgba(15, 118, 110, .12);
      transform: translateY(-1px);
    }
    .distribution-item.active {
      border-color: var(--teal);
      background: var(--teal-soft);
      box-shadow: 0 0 0 2px rgba(15, 118, 110, .12);
    }
    .distribution-ring {
      position: relative;
      display: grid;
      width: 54px;
      height: 54px;
      place-items: center;
      border-radius: 50%;
      background: conic-gradient(var(--distribution-color) calc(var(--distribution-percent) * 1%), #e8efed 0);
    }
    .distribution-ring::after {
      position: absolute;
      width: 38px;
      height: 38px;
      border-radius: 50%;
      background: #fff;
      content: "";
    }
    .distribution-percent {
      position: relative;
      z-index: 1;
      color: var(--ink-2);
      font-size: 11px;
      font-weight: 800;
    }
    .distribution-label {
      overflow: hidden;
      font-size: 13px;
      font-weight: 700;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .distribution-value {
      margin-top: 3px;
      color: var(--muted);
      font-size: 12px;
    }

    .explorer {
      margin-top: 22px;
    }
    .explorer-toolbar {
      position: sticky;
      top: 68px;
      z-index: 60;
      padding: 16px;
      border: 1px solid var(--line);
      border-radius: var(--radius-lg);
      background: rgba(255, 255, 255, .96);
      box-shadow: var(--shadow);
      backdrop-filter: blur(12px);
    }
    .explorer-toolbar::before {
      display: block;
      margin: 0 0 10px 2px;
      color: var(--teal-dark);
      content: "검증된 근거 찾기";
      font-size: 16px;
      font-weight: 900;
      letter-spacing: -.02em;
    }
    .search-row {
      display: grid;
      grid-template-columns: minmax(260px, 1fr) auto;
      gap: 10px;
      align-items: stretch;
    }
    .search-box {
      position: relative;
      display: flex;
      align-items: center;
    }
    .search-icon {
      position: absolute;
      left: 15px;
      color: var(--muted);
      pointer-events: none;
    }
    .search-box input {
      width: 100%;
      min-height: 50px;
      padding: 11px 46px 11px 44px;
      border: 1px solid #bdcbc8;
      border-radius: 13px;
      background: #fff;
      color: var(--ink);
      font-size: 15px;
    }
    .search-box input::placeholder { color: #7c8c94; }
    .search-help {
      margin: 8px 2px 0;
      color: var(--muted);
      font-size: 12px;
      line-height: 1.5;
    }
    .search-suggestions {
      display: flex;
      flex-wrap: wrap;
      gap: 7px;
      margin-top: 9px;
    }
    .search-suggestions-more {
      align-self: center;
    }
    .search-suggestions-more summary {
      min-height: 31px;
      display: inline-flex;
      align-items: center;
      gap: 5px;
      padding: 5px 10px;
      border: 1px dashed #b8cbc7;
      border-radius: 999px;
      background: #f8fbfa;
      color: var(--teal-dark);
      font-size: 12px;
      font-weight: 800;
      cursor: pointer;
      list-style: none;
    }
    .search-suggestions-more summary::-webkit-details-marker { display: none; }
    .search-suggestions-more summary::after { content: "＋"; font-size: 15px; line-height: 1; }
    .search-suggestions-more[open] summary::after { content: "−"; }
    .search-suggestions-more summary:hover,
    .search-suggestions-more summary:focus-visible { border-color: var(--teal); background: var(--teal-soft); }
    .search-suggestions-more-count {
      display: inline-grid;
      min-width: 17px;
      min-height: 17px;
      place-items: center;
      padding: 0 4px;
      border-radius: 999px;
      background: rgba(15, 118, 110, .1);
      color: var(--teal-dark);
      font-size: 10px;
      line-height: 1;
    }
    .search-suggestions-more-list {
      display: flex;
      flex-wrap: wrap;
      gap: 7px;
      margin-top: 7px;
    }
    .suggestion-button {
      min-height: 31px;
      padding: 5px 10px;
      border: 1px solid #d2dfdc;
      border-radius: 999px;
      background: #fff;
      color: var(--ink-2);
      font-size: 12px;
      font-weight: 700;
      cursor: pointer;
    }
    .suggestion-button:hover {
      border-color: var(--teal);
      color: var(--teal-dark);
    }
    .explorer-intents { display: flex; flex-wrap: wrap; align-items: center; gap: 6px; margin-top: 14px; }
    .explorer-intents-label { margin-right: 3px; color: var(--muted); font-size: 11px; font-weight: 900; }
    .intent-button { min-height: 32px; padding: 5px 10px; border: 1px solid #c9d4d1; border-radius: 999px; background: #fff; color: var(--ink-2); font-size: 11px; font-weight: 800; cursor: pointer; }
    .intent-button:hover, .intent-button:focus-visible, .intent-button.active { border-color: var(--teal); background: var(--teal-soft); color: var(--teal-dark); }
    .search-clear {
      position: absolute;
      right: 8px;
      width: 36px;
      height: 36px;
      border: 0;
      border-radius: 9px;
      background: transparent;
      color: var(--muted);
      cursor: pointer;
    }
    .search-clear:hover { background: var(--surface-2); }
    .mobile-filter {
      display: none;
      min-height: 50px;
      padding: 0 16px;
      border: 1px solid var(--teal);
      border-radius: 13px;
      background: #fff;
      color: var(--teal-dark);
      font-weight: 800;
      cursor: pointer;
    }
    .mobile-filter-count {
      display: inline-grid;
      min-width: 19px;
      min-height: 19px;
      place-items: center;
      margin-left: 4px;
      padding: 0 5px;
      border-radius: 999px;
      background: var(--teal);
      color: #fff;
      font-size: 10px;
      line-height: 1;
    }
    .mobile-filter-count[hidden] { display: none; }
    .quick-row {
      margin-top: 11px;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 8px;
    }
    .quick-button {
      min-height: 38px;
      padding: 7px 13px;
      border: 1px solid var(--line);
      border-radius: 999px;
      background: var(--surface-2);
      color: var(--ink-2);
      font-size: 13px;
      font-weight: 800;
      cursor: pointer;
    }
    .quick-button.active {
      border-color: var(--teal);
      background: var(--teal-soft);
      color: var(--teal-dark);
    }
    .quick-count {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-width: 18px;
      margin-left: 4px;
      padding: 1px 5px;
      border-radius: 999px;
      background: rgba(15, 118, 110, .1);
      color: var(--teal-dark);
      font-size: 10px;
      font-weight: 900;
    }
    .quick-spacer { flex: 1; }
    .quick-more {
      position: relative;
    }
    .quick-more summary {
      min-height: 38px;
      display: inline-flex;
      align-items: center;
      padding: 7px 13px;
      border: 1px solid var(--line);
      border-radius: 999px;
      background: var(--surface-2);
      color: var(--ink-2);
      font-size: 13px;
      font-weight: 800;
      cursor: pointer;
      list-style: none;
    }
    .quick-more summary::-webkit-details-marker { display: none; }
    .quick-more summary::after { content: "＋"; margin-left: 6px; color: var(--muted); }
    .quick-more[open] summary { border-color: var(--teal); background: var(--teal-soft); color: var(--teal-dark); }
    .quick-more summary.has-filter { border-color: var(--teal); color: var(--teal-dark); }
    .quick-more[open] summary::after { content: "－"; }
    .quick-more-menu {
      position: absolute;
      z-index: 2;
      top: calc(100% + 7px);
      left: 0;
      display: grid;
      min-width: 150px;
      gap: 4px;
      padding: 7px;
      border: 1px solid var(--line);
      border-radius: 12px;
      background: #fff;
      box-shadow: 0 10px 24px rgba(25, 54, 64, .12);
    }
    .quick-more-menu .quick-button { width: 100%; border-radius: 8px; text-align: left; }
    .quick-advanced { position: relative; }
    .quick-advanced > summary {
      min-height: 38px;
      display: inline-flex;
      align-items: center;
      padding: 7px 13px;
      border: 1px solid var(--line);
      border-radius: 999px;
      background: var(--surface-2);
      color: var(--ink-2);
      font-size: 13px;
      font-weight: 800;
      cursor: pointer;
      list-style: none;
    }
    .quick-advanced > summary::-webkit-details-marker { display: none; }
    .quick-advanced > summary::after { content: "＋"; margin-left: 6px; color: var(--muted); }
    .quick-advanced[open] > summary::after { content: "－"; }
    .quick-advanced > summary.has-filter,
    .quick-advanced[open] > summary { border-color: var(--teal); background: var(--teal-soft); color: var(--teal-dark); }
    .quick-advanced-menu {
      position: absolute;
      z-index: 3;
      top: calc(100% + 7px);
      left: 0;
      display: flex;
      flex-wrap: wrap;
      align-items: flex-start;
      gap: 8px;
      min-width: min(610px, calc(100vw - 42px));
      max-width: calc(100vw - 42px);
      padding: 10px;
      border: 1px solid var(--line);
      border-radius: 12px;
      background: #fff;
      box-shadow: 0 12px 28px rgba(25, 54, 64, .14);
    }
    .quick-advanced-menu .quick-more { flex: 0 0 auto; }
    .quick-advanced-menu .quick-more summary { min-height: 32px; padding: 6px 10px; font-size: 11px; }
    .quick-advanced-menu .quick-more-menu { position: static; margin-top: 6px; min-width: 170px; }
    .filter-status-strip {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 7px 10px;
      min-height: 34px;
      margin-top: 10px;
      padding: 7px 10px;
      border: 1px solid var(--line);
      border-radius: 10px;
      background: var(--surface-2);
      color: var(--muted);
      font-size: 11px;
      line-height: 1.35;
    }
    .filter-status-label {
      color: var(--ink-2);
      font-weight: 900;
      white-space: nowrap;
    }
    .filter-status-text {
      min-width: 0;
      color: var(--ink-2);
      font-weight: 700;
      overflow-wrap: anywhere;
    }
    .filter-status-reset {
      min-height: 26px;
      margin-left: auto;
      padding: 3px 8px;
      border: 1px solid #c9d4d1;
      border-radius: 7px;
      background: #fff;
      color: var(--teal-dark);
      font-size: 10px;
      font-weight: 900;
      cursor: pointer;
    }
    .filter-status-reset:hover,
    .filter-status-reset:focus-visible { border-color: var(--teal); background: var(--teal-soft); }
    .sort-select {
      min-height: 38px;
      padding: 7px 32px 7px 12px;
      border: 1px solid var(--line);
      border-radius: 10px;
      background: #fff;
      color: var(--ink);
      font-size: 13px;
      font-weight: 700;
    }
    .page-size-select {
      min-height: 38px;
      padding: 7px 30px 7px 10px;
      border: 1px solid var(--line);
      border-radius: 10px;
      background: #fff;
      color: var(--ink-2);
      font-size: 12px;
      font-weight: 700;
    }

    .explorer-grid {
      display: grid;
      grid-template-columns: 280px minmax(0, 1fr);
      gap: 18px;
      margin-top: 18px;
      align-items: start;
    }
    .filter-panel {
      position: sticky;
      top: 194px;
      max-height: calc(100vh - 215px);
      overflow: auto;
      padding: 20px;
      border: 1px solid var(--line);
      border-radius: var(--radius-lg);
      background: var(--surface);
      box-shadow: 0 5px 18px rgba(25, 54, 64, .04);
    }
    .filter-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      margin-bottom: 14px;
    }
    .filter-head-title {
      display: flex;
      align-items: center;
      gap: 8px;
      min-width: 0;
    }
    .filter-head h2 { margin: 0; font-size: 17px; }
    .filter-active-count {
      padding: 3px 7px;
      border: 1px solid transparent;
      border-radius: 999px;
      color: var(--muted);
      font-size: 10px;
      font-weight: 800;
      white-space: nowrap;
    }
    .filter-active-count.has-filters {
      border-color: #b7ded7;
      background: var(--teal-soft);
      color: var(--teal-dark);
    }
    .filter-head-actions {
      display: flex;
      align-items: center;
      gap: 6px;
      margin-left: auto;
    }
    .filter-result-count {
      padding: 4px 8px;
      border-radius: 999px;
      background: var(--surface-3);
      color: var(--teal-dark);
      font-size: 10px;
      font-weight: 900;
      white-space: nowrap;
    }
    .filter-quick-reset {
      min-height: 30px;
      padding: 5px 8px;
      border: 1px solid var(--line);
      border-radius: 8px;
      background: #fff;
      color: var(--teal-dark);
      font-size: 10px;
      font-weight: 900;
      cursor: pointer;
    }
    .filter-quick-reset:hover,
    .filter-quick-reset:focus-visible { border-color: var(--teal); background: var(--teal-soft); }
    .filter-guidance {
      margin: -2px 0 14px;
      color: var(--muted);
      font-size: 11px;
      line-height: 1.5;
    }
    .filter-close {
      display: none;
      width: 40px;
      height: 40px;
      border: 1px solid var(--line);
      border-radius: 10px;
      background: #fff;
      cursor: pointer;
    }
    .filter-mobile-apply {
      display: none;
      width: 100%;
      min-height: 44px;
      margin-top: 12px;
      padding: 9px 12px;
      border: 1px solid var(--teal);
      border-radius: 10px;
      background: var(--teal);
      color: #fff;
      font-size: 12px;
      font-weight: 900;
      cursor: pointer;
    }
    .filter-mobile-apply:hover,
    .filter-mobile-apply:focus-visible { background: var(--teal-dark); }
    .filter-group {
      display: grid;
      gap: 7px;
      margin-top: 14px;
    }
    .filter-group label {
      color: var(--ink-2);
      font-size: 12px;
      font-weight: 800;
    }
    .sort-help { max-width: 260px; color: var(--muted); font-size: 10px; line-height: 1.35; }
    .filter-group select,
    .filter-group input {
      width: 100%;
      min-height: 44px;
      padding: 9px 11px;
      border: 1px solid #c9d4d1;
      border-radius: 10px;
      background: #fff;
      color: var(--ink);
    }
    .advanced-filters {
      margin: 6px 0 12px;
      border-top: 1px solid var(--line);
      border-bottom: 1px solid var(--line);
    }
    .advanced-filters summary {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      min-height: 42px;
      color: var(--ink);
      font-size: 12px;
      font-weight: 800;
      cursor: pointer;
      list-style: none;
    }
    .advanced-filters summary::-webkit-details-marker { display: none; }
    .advanced-filters summary::after { content: "＋"; color: var(--muted); font-size: 15px; }
    .advanced-filters[open] summary::after { content: "－"; }
    .advanced-filter-count {
      margin-left: auto;
      padding: 3px 7px;
      border-radius: 999px;
      background: var(--surface-3);
      color: var(--muted);
      font-size: 10px;
      font-weight: 800;
    }
    .advanced-filter-count.has-filters { background: var(--teal-soft); color: var(--teal-dark); }
    .year-pair {
      display: grid;
      grid-template-columns: 1fr 18px 1fr;
      align-items: center;
      gap: 6px;
    }
    .link-audit-note {
      margin: 10px 0 0;
      color: var(--muted);
      font-size: 11px;
      line-height: 1.5;
    }
    .link-audit-note-wrap { display: flex; align-items: start; flex-wrap: wrap; gap: 8px 12px; margin-top: 10px; }
    .link-audit-note-wrap .link-audit-note { flex: 1 1 560px; margin: 0; }
    .link-audit-methodology { flex: 0 0 auto; min-height: 27px; padding: 4px 8px; border: 1px solid #c9d4d1; border-radius: 7px; background: #fff; color: var(--teal-dark); font-size: 10px; font-weight: 900; cursor: pointer; }
    .link-audit-methodology:hover, .link-audit-methodology:focus-visible { border-color: var(--teal); background: var(--teal-soft); }
    .year-pair span {
      color: var(--muted);
      text-align: center;
    }
    .reset-button {
      width: 100%;
      min-height: 44px;
      margin-top: 20px;
      border: 1px solid var(--line);
      border-radius: 10px;
      background: var(--surface-2);
      color: var(--ink);
      font-weight: 800;
      cursor: pointer;
    }

    .results-panel { min-width: 0; }
    .result-top {
      min-height: 48px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 14px;
      margin: 0 2px 12px;
    }
    .result-top-actions { display: flex; flex-wrap: wrap; justify-content: end; gap: 6px; }
    .result-export-menu { position: relative; }
    .result-export-menu summary {
      display: inline-flex;
      align-items: center;
      min-height: 36px;
      padding: 7px 11px;
      border: 1px solid var(--line);
      border-radius: 9px;
      background: #fff;
      color: var(--ink-2);
      font-size: 12px;
      font-weight: 800;
      cursor: pointer;
      list-style: none;
    }
    .result-export-menu summary::-webkit-details-marker { display: none; }
    .result-export-menu summary::after { content: "＋"; margin-left: 5px; color: var(--teal-dark); font-size: 14px; }
    .result-export-menu[open] summary::after { content: "−"; }
    .result-export-menu summary:hover,
    .result-export-menu summary:focus-visible { border-color: var(--teal); color: var(--teal-dark); }
    .result-export-options {
      position: absolute;
      top: calc(100% + 6px);
      right: 0;
      z-index: 20;
      display: grid;
      min-width: 178px;
      gap: 4px;
      padding: 6px;
      border: 1px solid var(--line);
      border-radius: 11px;
      background: #fff;
      box-shadow: 0 12px 28px rgba(18, 43, 55, .14);
    }
    .result-export-options .result-reset { width: 100%; text-align: left; }
    .saved-search-note { margin: 4px 2px 6px; color: var(--muted); font-size: 10px; line-height: 1.45; }
    .saved-search-manage { display: flex; justify-content: flex-end; margin: 6px 0 2px; }
    .saved-search-clear { border: 0; padding: 2px 0; background: transparent; color: var(--muted); font-size: 10px; cursor: pointer; text-decoration: underline; text-underline-offset: 2px; }
    .saved-search-clear:hover, .saved-search-clear:focus-visible { color: #a33b39; }
    .saved-search-list { display: grid; gap: 5px; max-height: 220px; overflow: auto; }
    .saved-search-empty { margin: 2px; color: var(--muted); font-size: 10px; line-height: 1.45; }
    .saved-search-item { display: grid; grid-template-columns: minmax(0, 1fr) auto auto; gap: 5px; align-items: center; }
    .saved-search-load, .saved-search-share, .saved-search-delete { min-height: 29px; border: 1px solid var(--line); border-radius: 7px; background: #fff; color: var(--ink-2); font-size: 10px; font-weight: 800; cursor: pointer; }
    .saved-search-load { overflow: hidden; padding: 5px 7px; text-align: left; text-overflow: ellipsis; white-space: nowrap; }
    .saved-search-share { width: 29px; color: var(--muted); }
    .saved-search-delete { width: 29px; color: var(--muted); }
    .saved-search-load:hover, .saved-search-load:focus-visible, .saved-search-share:hover, .saved-search-share:focus-visible, .saved-search-delete:hover, .saved-search-delete:focus-visible { border-color: var(--teal); color: var(--teal-dark); }
    .result-count {
      margin: 0;
      color: var(--ink-2);
      font-size: 14px;
      font-weight: 700;
    }
    .result-count strong { color: var(--teal-dark); font-size: 18px; }
    .result-count small {
      display: block;
      margin-top: 2px;
      color: var(--muted);
      font-size: 12px;
      font-weight: 500;
    }
    .result-reset {
      flex: 0 0 auto;
      min-height: 36px;
      padding: 7px 11px;
      border: 1px solid var(--line);
      border-radius: 9px;
      background: #fff;
      color: var(--ink-2);
      font-size: 12px;
      font-weight: 800;
      cursor: pointer;
    }
    .result-reset:hover { border-color: var(--teal); color: var(--teal-dark); }
    .result-interpretation {
      display: grid;
      grid-template-columns: minmax(150px, .8fr) minmax(0, 1.6fr);
      gap: 10px 16px;
      margin: 0 0 12px;
      padding: 13px 15px;
      border: 1px solid rgba(15, 118, 110, .18);
      border-radius: 12px;
      background: var(--surface-3);
    }
    .result-interpretation-head { display: flex; flex-direction: column; gap: 3px; min-width: 0; }
    .result-interpretation-label { color: var(--muted); font-size: 10px; font-weight: 800; }
    .result-interpretation-query { overflow: hidden; color: var(--ink); font-size: 14px; font-weight: 900; text-overflow: ellipsis; white-space: nowrap; }
    .result-interpretation-stats { display: flex; flex-wrap: wrap; align-items: center; gap: 6px; }
    .result-interpretation-stat { padding: 5px 8px; border-radius: 7px; background: #fff; color: var(--ink-2); font-size: 11px; font-weight: 800; }
    .result-interpretation-stat-action { border: 1px solid transparent; cursor: pointer; font: inherit; text-align: left; }
    .result-interpretation-stat-action:hover, .result-interpretation-stat-action:focus-visible { border-color: rgba(15,118,110,.28); background: var(--teal-soft); color: var(--teal-dark); outline: none; }
    .result-interpretation-stat-action[aria-pressed="true"] { border-color: var(--teal); background: var(--teal-soft); color: var(--teal-dark); }
    .result-interpretation-stat strong { color: var(--teal-dark); }
    .result-interpretation-note { grid-column: 1 / -1; margin: 0; color: var(--muted); font-size: 11px; line-height: 1.5; }
    .result-interpretation-guard { grid-column: 1 / -1; margin: 0; padding: 8px 10px; border-left: 3px solid var(--amber); border-radius: 6px; background: var(--amber-soft); color: var(--ink-2); font-size: 11px; line-height: 1.5; }
    .result-interpretation-guard strong { color: var(--amber); }
    .result-interpretation-action { justify-self: start; min-height: 30px; padding: 5px 9px; border: 1px solid rgba(15,118,110,.3); border-radius: 8px; background: #fff; color: var(--teal-dark); font-size: 11px; font-weight: 900; cursor: pointer; }
    .result-interpretation-action:hover, .result-interpretation-action:focus-visible { border-color: var(--teal); background: var(--teal-soft); }
    .result-interpretation-actions { display: flex; flex-wrap: wrap; align-items: center; gap: 6px; grid-column: 1 / -1; }
    .result-interpretation-actions-label { color: var(--muted); font-size: 10px; font-weight: 900; }
    .result-interpretation-route { min-height: 28px; padding: 4px 8px; border: 1px solid var(--line); border-radius: 8px; background: #fff; color: var(--ink-2); font-size: 10px; font-weight: 850; cursor: pointer; }
    .result-interpretation-route:hover, .result-interpretation-route:focus-visible { border-color: var(--teal); background: var(--teal-soft); color: var(--teal-dark); }
    .filter-subgroup-heading { display: flex; align-items: baseline; justify-content: space-between; gap: 8px; margin: 12px 0 8px; padding-top: 10px; border-top: 1px solid var(--line-soft); color: var(--ink-2); font-size: 11px; font-weight: 900; }
    .filter-subgroup-heading:first-child { margin-top: 4px; padding-top: 0; border-top: 0; }
    .filter-subgroup-heading small { color: var(--muted); font-size: 10px; font-weight: 700; }
    .filter-subgroup-count {
      margin-left: 5px;
      color: var(--teal-dark);
      font-size: 10px;
      font-weight: 900;
      white-space: nowrap;
    }
    .advanced-subfilters {
      margin: 4px 0;
      border-bottom: 1px solid var(--line-soft);
    }
    .advanced-subfilters:last-child { border-bottom: 0; }
    .advanced-subfilters summary {
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      gap: 8px;
      min-height: 38px;
      padding: 5px 0;
      color: var(--ink-2);
      font-size: 11px;
      font-weight: 900;
      cursor: pointer;
      list-style: none;
    }
    .advanced-subfilters summary::-webkit-details-marker { display: none; }
    .advanced-subfilters summary::after { content: "＋"; color: var(--muted); font-size: 14px; }
    .advanced-subfilters[open] summary::after { content: "－"; }
    .advanced-subfilters summary small { color: var(--muted); font-size: 10px; font-weight: 700; }
    .advanced-subfilters .filter-group:first-of-type { margin-top: 2px; }
    @media (max-width: 640px) {
      .result-interpretation { grid-template-columns: 1fr; gap: 8px; }
      .result-interpretation-note { grid-column: auto; }
    }
    .active-filters {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-bottom: 12px;
    }
    .filter-chip {
      min-height: 34px;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 5px 10px;
      border: 1px solid #acd7d1;
      border-radius: 999px;
      background: var(--teal-soft);
      color: var(--teal-dark);
      font-size: 12px;
      font-weight: 800;
      cursor: pointer;
    }
    .papers { display: grid; gap: 12px; }
    .paper-card {
      padding: 20px;
      border: 1px solid var(--line);
      border-radius: 17px;
      background: var(--surface);
      box-shadow: 0 4px 16px rgba(25, 54, 64, .04);
      transition: border-color .2s ease, transform .2s ease, box-shadow .2s ease;
    }
    .paper-card:hover {
      border-color: #adc4bf;
      transform: translateY(-1px);
      box-shadow: 0 10px 24px rgba(25, 54, 64, .07);
    }
    .paper-badges {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-bottom: 10px;
    }
    .badge {
      display: inline-flex;
      align-items: center;
      min-height: 26px;
      padding: 3px 8px;
      border-radius: 7px;
      background: #eef2f4;
      color: #40535e;
      font-size: 11px;
      font-weight: 800;
    }
    .badge.clinical { background: var(--blue-soft); color: #1e4fc4; }
    .badge.animal { background: var(--teal-soft); color: var(--teal-dark); }
    .badge.regulatory { background: #ede9fe; color: #5b21b6; }
    .badge.include, .badge.benefit { background: var(--green-soft); color: var(--green); }
    .badge.candidate, .badge.mixed { background: var(--amber-soft); color: var(--amber); }
    .badge.exclude, .badge.harm { background: var(--red-soft); color: var(--red); }
    .badge.scie { background: #e7eefc; color: #244da8; }
    .badge.partial { background: #f3efe2; color: #725a0b; }
    .badge.intervention { background: #e7f5f2; color: var(--teal-dark); }
    .badge.intervention-filter-badge { border: 0; cursor: pointer; font: inherit; }
    .badge.intervention-filter-badge:hover, .badge.intervention-filter-badge:focus-visible { background: #cfece6; outline: 2px solid rgba(15,118,110,.24); outline-offset: 1px; }
    .badge.marketing-filter-badge { border: 0; cursor: pointer; font: inherit; }
    .badge.marketing-filter-badge:hover, .badge.marketing-filter-badge:focus-visible { filter: brightness(.96); outline: 2px solid rgba(15,118,110,.24); outline-offset: 1px; }
    .badge.followup-badge { background: var(--amber-soft); color: #8a5a00; }
    .paper-title {
      margin: 0;
      color: var(--ink);
      font-size: clamp(17px, 2.2vw, 21px);
      line-height: 1.42;
      letter-spacing: -.015em;
      word-break: normal;
    }
    .paper-title-korean {
      display: block;
      font-size: clamp(18px, 2.35vw, 22px);
      font-weight: 850;
      line-height: 1.38;
    }
    .title-label {
      display: block;
      margin-bottom: 3px;
      color: var(--muted);
      font-size: 10px;
      font-weight: 800;
      letter-spacing: .03em;
    }
    .paper-meta {
      margin: 8px 0 0;
      color: var(--muted);
      font-size: 13px;
    }
    .paper-meta strong { color: var(--ink-2); }
    .original-title {
      margin: 6px 0 0;
      color: var(--muted);
      font-size: 12px;
      line-height: 1.5;
    }
    .regulatory-note {
      margin: 12px 0 0;
      padding: 10px 12px;
      border-radius: 9px;
      background: #fff8df;
      color: #76570b;
      font-size: 12px;
      font-weight: 700;
    }
    .finding {
      margin: 14px 0 0;
      padding: 13px 14px;
      border-left: 4px solid var(--teal);
      border-radius: 0 9px 9px 0;
      background: #f1f7f6;
      color: var(--ink-2);
      font-size: 14px;
    }
    .interpretation-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 9px;
      margin-top: 10px;
    }
    .interpretation {
      min-width: 0;
      padding: 11px 12px;
      border: 1px solid var(--line);
      border-radius: 9px;
      background: #fff;
      color: var(--ink-2);
      font-size: 12px;
      line-height: 1.55;
    }
    .interpretation.action {
      background: #f7f8fc;
    }
    .interpretation-caution {
      display: block;
      margin-top: 7px;
      color: var(--muted);
      font-size: 10px;
      font-weight: 800;
      line-height: 1.45;
    }
    .interpretation strong {
      display: block;
      margin-bottom: 3px;
      color: var(--teal-dark);
      font-size: 11px;
    }
    .fact-grid {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 8px;
      margin-top: 13px;
    }
    .fact {
      min-width: 0;
      padding: 9px 10px;
      border-radius: 9px;
      background: var(--surface-2);
    }
    .fact dt {
      color: var(--muted);
      font-size: 10px;
      font-weight: 800;
    }
    .fact dd {
      margin: 2px 0 0;
      color: var(--ink);
      font-size: 12px;
      font-weight: 700;
    }
    .paper-detail {
      margin-top: 13px;
      border-top: 1px solid var(--line);
    }
    .paper-detail summary {
      min-height: 44px;
      display: flex;
      align-items: center;
      color: var(--teal-dark);
      font-size: 13px;
      font-weight: 800;
      cursor: pointer;
    }
    .detail-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 12px 18px;
      padding: 4px 0 12px;
    }
    .detail-item dt {
      color: var(--muted);
      font-size: 11px;
      font-weight: 800;
    }
    .detail-item dd {
      margin: 3px 0 0;
      color: var(--ink-2);
      font-size: 13px;
    }
    .paper-footer {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 8px;
      margin-top: 8px;
    }
    .paper-link {
      min-height: 40px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 7px 12px;
      border: 1px solid #a9c7c2;
      border-radius: 9px;
      background: #fff;
      color: var(--teal-dark);
      font-size: 12px;
      font-weight: 800;
      text-decoration: none;
    }
    .paper-link.primary {
      border-color: var(--teal);
      background: var(--teal);
      color: #fff;
    }
    .record-id {
      margin-left: auto;
      color: var(--muted);
      font-family: ui-monospace, "Cascadia Code", Consolas, monospace;
      font-size: 11px;
    }
    .empty-state {
      padding: 50px 24px;
      border: 1px dashed #b7c8c4;
      border-radius: 17px;
      background: #fff;
      text-align: center;
    }
    .empty-state h3 { margin: 0; font-size: 20px; }
    .empty-state p { color: var(--muted); }
    .empty-actions { display: flex; flex-wrap: wrap; justify-content: center; gap: 8px; margin-top: 16px; }
    .empty-action { min-height: 36px; padding: 7px 11px; border: 1px solid var(--teal); border-radius: 9px; background: var(--teal); color: #fff; font-size: 11px; font-weight: 800; cursor: pointer; }
    .empty-action.secondary { border-color: var(--line); background: #fff; color: var(--teal-dark); }
    .empty-suggestions { display: flex; flex-wrap: wrap; align-items: center; justify-content: center; gap: 7px; margin-top: 14px; }
    .empty-suggestions-label { color: var(--muted); font-size: 11px; font-weight: 800; }
    .empty-suggestion { min-height: 30px; padding: 5px 10px; border: 1px solid var(--line); border-radius: 999px; background: #fff; color: var(--ink-2); font: inherit; font-size: 11px; font-weight: 800; cursor: pointer; }
    .empty-suggestion:hover, .empty-suggestion:focus-visible { border-color: var(--teal); background: var(--teal-soft); color: var(--teal-dark); outline: none; }
    .pagination {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 9px;
      margin-top: 18px;
    }
    .page-button {
      min-width: 44px;
      min-height: 44px;
      border: 1px solid var(--line);
      border-radius: 10px;
      background: #fff;
      color: var(--ink);
      font-weight: 800;
      cursor: pointer;
    }
    .page-button:disabled { opacity: .42; cursor: not-allowed; }
    .page-status {
      min-width: 92px;
      color: var(--ink-2);
      font-size: 13px;
      font-weight: 700;
      text-align: center;
    }

    .guide-grid {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 12px;
      padding: 20px 26px 26px;
    }
    .guide-card {
      padding: 17px;
      border: 1px solid var(--line);
      border-radius: 13px;
      background: var(--surface-2);
    }
    .guide-card h3 { margin: 0; font-size: 15px; }
    .guide-card p { margin: 7px 0 0; color: var(--ink-2); font-size: 13px; }
    .caution {
      margin-top: 12px;
      padding: 16px 18px;
      border: 1px solid #ead498;
      border-radius: 13px;
      background: #fff9e8;
      color: #654d0b;
      font-size: 13px;
    }
    .site-footer {
      margin-top: 28px;
      padding: 24px 4px 0;
      border-top: 1px solid var(--line);
      color: var(--muted);
      font-size: 12px;
    }
    .site-footer p { margin: 4px 0; }
    .toast {
      position: fixed;
      left: 50%;
      bottom: 24px;
      z-index: 200;
      transform: translate(-50%, 30px);
      padding: 11px 15px;
      border-radius: 10px;
      background: var(--ink);
      color: #fff;
      font-size: 13px;
      font-weight: 800;
      opacity: 0;
      pointer-events: none;
      transition: opacity .2s ease, transform .2s ease;
    }
    .toast.show { opacity: 1; transform: translate(-50%, 0); }

    @media (max-width: 1100px) {
      .metric-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
      .fact-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    }
    @media (max-width: 900px) {
      .page, .topbar-inner { width: min(100% - 24px, var(--max)); }
      .topbar-inner { min-height: 62px; }
      .brand-copy span, .top-link { display: none; }
      .mobile-portal-jump { display: block; }
      .page { padding-top: 20px; }
      .hero { grid-template-columns: 1fr; gap: 24px; padding: 28px 22px; border-radius: 22px; }
      .portal-nav { display: none; }
      .intelligence-strip { grid-template-columns: 1fr 1fr; }
      .hero-proof { padding: 18px 0 0; border-top: 1px solid rgba(255, 255, 255, .25); border-left: 0; grid-template-columns: repeat(3, 1fr); }
      .metric-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
      .discovery-banner { grid-template-columns: 1fr; }
      .discovery-link { justify-self: start; }
      .distribution-grid { grid-template-columns: 1fr; }
      .explorer-toolbar { top: 62px; border-radius: 16px; }
      .mobile-filter { display: inline-flex; align-items: center; }
      .explorer-grid { grid-template-columns: 1fr; }
      .filter-panel {
        position: fixed;
        inset: 0 0 0 auto;
        z-index: 120;
        width: min(88vw, 360px);
        max-height: none;
        border-radius: 0;
        transform: translateX(102%);
        transition: transform .25s ease;
        box-shadow: -18px 0 40px rgba(18, 43, 55, .18);
      }
      .filter-panel.open { transform: translateX(0); }
      .filter-close { display: inline-grid; place-items: center; }
      .filter-mobile-apply { display: block; position: sticky; bottom: 0; z-index: 1; box-shadow: 0 -8px 14px rgba(255,255,255,.92); }
      body.filter-open::before {
        content: "";
        position: fixed;
        inset: 0;
        z-index: 110;
        background: rgba(8, 28, 37, .42);
      }
      .guide-grid { grid-template-columns: 1fr; }
    }
    @media (max-width: 620px) {
      .topbar-inner { width: calc(100% - 20px); }
      .brand-mark { width: 34px; height: 34px; border-radius: 10px; font-size: 11px; }
      .brand-copy strong { font-size: 13px; }
      .share-button { padding-inline: 11px; }
      .page { width: calc(100% - 20px); }
      .hero h1 { font-size: 34px; }
      .hero, .hero-copy, .hero p, .hero-proof { min-width: 0; max-width: 100%; }
      .hero h1, .hero p { overflow-wrap: anywhere; word-break: break-word; }
      .hero-proof { grid-template-columns: 1fr; }
      .intelligence-strip { grid-template-columns: 1fr; }
      .intelligence-feed-list { grid-template-columns: 1fr; }
      .metric { min-height: 105px; padding: 14px; }
      .metric-value { font-size: 27px; }
      .section-head { padding: 20px 18px 0; }
      .distribution-grid, .guide-grid { padding: 16px 18px 20px; }
      .search-row { grid-template-columns: 1fr auto; }
      .quick-spacer { display: none; }
      .sort-select { width: 100%; order: 2; }
      .page-size-select { flex: 1; order: 2; }
      .paper-card { padding: 17px 15px; }
      .orientation-strip { grid-template-columns: 1fr; }
      .detail-grid { grid-template-columns: 1fr; }
      .record-id { width: 100%; margin-left: 0; }
    }
    @media (prefers-reduced-motion: reduce) {
      *, *::before, *::after { scroll-behavior: auto !important; transition: none !important; }
    }
    @media print {
      .topbar, .explorer-toolbar, .filter-panel, .distribution-grid,
      .pagination, .share-button, .mobile-filter { display: none !important; }
      body { background: #fff; }
      .page { width: 100%; padding: 0; }
      .hero { color: #000; background: #fff; box-shadow: none; border: 1px solid #aaa; }
      .paper-card { break-inside: avoid; box-shadow: none; }
    }
  </style>
</head>
<body>
  <a class="skip-link" href="#results">검색 결과로 건너뛰기</a>
  <header class="topbar">
      <div class="topbar-inner">
      <a class="brand" href="#" aria-label="GABA 섭취 근거 인덱스 홈">
        <span class="brand-mark">GABA</span>
        <span class="brand-copy">
          <strong>GABA 연구·안전성 근거 인덱스</strong>
          <span>임상·동물·규제자료 통합 탐색</span>
        </span>
      </a>
      <nav class="portal-nav" aria-label="포털 영역">
        <a href="#results">근거 인덱스</a>
        <a href="#intelligence">Intelligence</a>
        <a href="#distribution-title">규제·안전</a>
        <a href="#market-use">시장·활용</a>
      </nav>
      <div class="top-actions">
        <a class="top-link" id="sheet-link" hidden target="_blank" rel="noopener noreferrer">관리 원본 Sheet</a>
        <button class="top-link" id="methodology-open" type="button" aria-haspopup="dialog">방법론</button>
        <button class="reading-list-button" id="reading-list-open" type="button" aria-haspopup="dialog" aria-label="읽기 목록, 0개 저장됨">읽기 목록 <span class="reading-list-count" id="reading-list-count" aria-live="polite" aria-atomic="true">0</span></button>
        <button class="share-button" id="share-button" type="button" aria-label="현재 검색 조건 링크 복사">링크 복사</button>
      </div>
    </div>
  </header>

  <main class="page">
    <section class="hero" aria-labelledby="page-title">
      <div class="hero-copy">
        <p class="eyebrow">EVIDENCE EXPLORER · 읽기 전용 공개 스냅샷</p>
        <h1 id="page-title">검증된 GABA 근거를<br>가장 빠르게 찾는 방법</h1>
        <p>인체 임상·동물시험·규제자료를 분리해 검색하고, 연구의 의미와 마케팅 활용 방안까지 한 화면에서 비교할 수 있습니다.</p>
        <div class="hero-actions" aria-label="빠른 시작">
          <a class="hero-primary" href="#explorer-title">근거 검색 시작 →</a>
          <a class="hero-secondary" href="#intelligence">오늘의 검토 신호 보기</a>
          <details class="mobile-portal-jump">
            <summary>포털 둘러보기</summary>
            <div class="mobile-portal-jump-links" aria-label="모바일 주요 영역">
              <a href="#results">근거 인덱스</a>
              <a href="#market-use">시장·활용</a>
              <a href="#distribution-title">규제·안전</a>
              <a href="#review-queue">추가 검토</a>
            </div>
          </details>
        </div>
        <div class="hero-meta">
          <span class="hero-pill"><span class="pulse" aria-hidden="true"></span><span id="snapshot-label"></span></span>
          <span class="hero-pill" id="coverage-label"></span>
          <button class="hero-pill freshness-action" id="freshness-label" type="button" title="검증 스냅샷과 자동 탐색 기준일 설명 보기" aria-controls="discovery-banner">스냅샷 최신성 확인 중</button>
        </div>
      </div>
      <div class="hero-proof" aria-label="인덱스의 핵심 원칙">
        <div class="hero-proof-item"><span class="hero-proof-mark" aria-hidden="true">⌕</span><div><strong>신뢰할 수 있는 선별</strong><span>검증 상태와 출처를 함께 표시</span></div></div>
        <div class="hero-proof-item"><span class="hero-proof-mark" aria-hidden="true">▤</span><div><strong>핵심만 빠르게</strong><span>연구의 의미·활용 방향을 카드에서 확인</span></div></div>
        <div class="hero-proof-item"><span class="hero-proof-mark" aria-hidden="true">↗</span><div><strong>원문으로 연결</strong><span>PMID·DOI·Drive 원문을 한 번에 확인</span></div></div>
      </div>
    </section>

    <nav class="orientation-strip" aria-label="근거 탐색 순서">
      <a class="orientation-step" href="#explorer-title"><span class="orientation-step-number">1</span><span><strong>질문을 입력하세요</strong><span>수면·혈압·안전성 등 한국어 검색</span></span></a>
      <a class="orientation-step" href="#filter-panel"><span class="orientation-step-number">2</span><span><strong>조건을 좁히세요</strong><span>대상·연구유형·규제상태로 필터</span></span></a>
      <a class="orientation-step" href="#results"><span class="orientation-step-number">3</span><span><strong>근거를 확인하세요</strong><span>결과·의미·마케팅 활용 방향 비교</span></span></a>
    </nav>

    <section class="metric-grid" aria-label="데이터 요약">
      <article class="metric">
        <span class="metric-label">검증 레코드</span>
        <strong class="metric-value" id="metric-total">-</strong>
        <span class="metric-help">문헌·규제자료 포함 · 후보 큐 별도</span>
      </article>
      <article class="metric">
        <span class="metric-label">인체 임상</span>
        <strong class="metric-value" id="metric-clinical">-</strong>
        <span class="metric-help">사람을 대상으로 한 섭취 연구</span>
      </article>
      <article class="metric">
        <span class="metric-label">동물시험</span>
        <strong class="metric-value" id="metric-animal">-</strong>
        <span class="metric-help">설치류·가축·수산 등</span>
      </article>
      <article class="metric">
        <span class="metric-label">SCIE 확인</span>
        <strong class="metric-value" id="metric-scie">-</strong>
        <span class="metric-help">Clarivate 등재상태 확인</span>
      </article>
      <article class="metric">
        <span class="metric-label">Drive 원문</span>
        <strong class="metric-value" id="metric-pdf">-</strong>
        <span class="metric-help">검증 후 연결된 원문 PDF</span>
      </article>
      <article class="metric">
        <span class="metric-label">규제·안전성 자료</span>
        <strong class="metric-value" id="metric-regulatory">-</strong>
        <span class="metric-help">식약처 직접근거와 해외 규제 참고</span>
      </article>
      <article class="metric">
        <span class="metric-label">대량 탐색 후보</span>
        <strong class="metric-value" id="metric-candidates">-</strong>
        <span class="metric-help">검증 전 별도 큐 · 문헌 수 미포함</span>
      </article>
      <article class="metric">
        <span class="metric-label">PMID 또는 DOI</span>
        <strong class="metric-value" id="metric-identifiers">-</strong>
        <span class="metric-help">검증 문헌의 식별자 보유율</span>
      </article>
    </section>

    <section class="discovery-banner" id="discovery-banner" aria-labelledby="discovery-title">
      <div>
        <h2 id="discovery-title" tabindex="-1">검증 인덱스와 자동 탐색 후보를 분리해 관리합니다</h2>
        <p id="discovery-copy">대량 탐색 현황을 불러오는 중입니다.</p>
        <div class="discovery-stats" id="discovery-stats" aria-label="대량 탐색 통계"></div>
        <p class="release-provenance-note" id="release-provenance-note" role="note">운영 코드 버전과 완전 검증 데이터 스냅샷 버전은 추적 목적이 달라 다를 수 있습니다. 버전 차이는 근거의 질·효능·규제 적합성을 의미하지 않습니다.</p>
        <div class="link-audit-note-wrap" id="link-audit-note-wrap" hidden>
          <p class="link-audit-note" id="link-audit-note" role="note"></p>
          <button class="link-audit-methodology" id="link-audit-methodology" type="button">감사 기준 보기</button>
        </div>
        <div class="data-boundary" aria-label="데이터 운영 경계">
          <span>공개면: 읽기 전용 검증 스냅샷</span>
          <span>후보: 자동 승격하지 않음</span>
          <span>운영 원본·Sheets: 별도 관리</span>
        </div>
      </div>
      <a class="discovery-link" id="candidate-link" hidden target="_blank" rel="noopener noreferrer">후보 큐 열기 ↗</a>
    </section>
    <section class="candidate-preview" id="candidate-preview" aria-labelledby="candidate-preview-title" hidden>
      <div class="candidate-preview-head">
        <div><h2 id="candidate-preview-title">최근 자동 탐색 후보 미리보기</h2><p>아직 공개 근거로 승격되지 않은 후보입니다. 원문·섭취 경로·철회·정정 상태를 확인한 뒤 별도 판정합니다.</p><p class="candidate-review-progress" id="candidate-review-progress" role="status" aria-live="polite"></p></div>
        <div class="candidate-preview-head-actions"><span class="candidate-preview-note">확정 근거 아님</span><button class="candidate-preview-export" id="candidate-preview-export" type="button">전체 후보 CSV</button></div>
      </div>
      <div class="candidate-preview-filters" aria-label="후보 유형 필터">
        <button class="candidate-preview-filter active" type="button" data-candidate-filter="all" aria-pressed="true">전체</button>
        <button class="candidate-preview-filter" type="button" data-candidate-filter="priority" aria-pressed="false">자동 우선검토</button>
        <button class="candidate-preview-filter" type="button" data-candidate-filter="followup" aria-pressed="false">출판 후속조치</button>
        <button class="candidate-preview-filter review" type="button" data-candidate-filter="reviewed" aria-pressed="false">수동 검토됨</button>
        <button class="candidate-preview-filter review" type="button" data-candidate-filter="unreviewed" aria-pressed="false">미검토</button>
      </div>
      <div class="candidate-preview-list" id="candidate-preview-list"></div>
      <button class="candidate-preview-more" id="candidate-preview-more" type="button" hidden>후보 더 보기</button>
    </section>
    <dialog class="candidate-detail-dialog" id="candidate-detail-dialog" aria-labelledby="candidate-detail-title">
      <div class="candidate-detail-inner">
        <div class="candidate-detail-head"><div><h2 id="candidate-detail-title">후보 상세</h2><p class="candidate-detail-meta" id="candidate-detail-meta"></p></div><button class="candidate-detail-close" id="candidate-detail-close" type="button" aria-label="후보 상세 닫기">×</button></div>
        <div class="candidate-detail-warning">자동 탐색 후보입니다. 원문·투여경로·연구설계·출판 후속조치를 확인하기 전에는 공개 근거 또는 마케팅 근거로 사용하지 않습니다.</div>
        <div class="candidate-detail-screening" id="candidate-detail-screening"></div>
        <div class="candidate-detail-checklist" id="candidate-detail-checklist"></div>
        <div class="candidate-detail-abstract" id="candidate-detail-abstract"></div>
        <div class="candidate-detail-actions" id="candidate-detail-actions"></div>
      </div>
    </dialog>
    <dialog class="methodology-dialog" id="methodology-dialog" aria-labelledby="methodology-title">
      <div class="methodology-dialog-inner">
        <div class="methodology-dialog-head">
          <div><h2 id="methodology-title">이 포털의 근거 검토 방법</h2><p>검색 결과를 효능·규제 승인으로 과잉 해석하지 않도록 같은 순서로 확인합니다.</p></div>
          <button class="methodology-dialog-close" id="methodology-close" type="button" aria-label="방법론 닫기">×</button>
        </div>
        <div class="methodology-dialog-body">
          <section class="methodology-dialog-section"><h3>1. 확정 인덱스와 후보를 분리합니다</h3><p>공개 인덱스는 원문·식별자·개입·대상·결과·한계를 확인한 검증 스냅샷입니다. 자동 탐색 후보는 검색 신호일 뿐이며 원문 확인 전에는 근거로 승격하지 않습니다.</p></section>
          <section class="methodology-dialog-section"><h3>2. 연구 유형과 개입을 섞지 않습니다</h3><ul><li>인체 섭취, 동물시험, 규제·안전성 자료를 별도 레인으로 표시합니다.</li><li>순수 GABA, 복합제·식품 매트릭스, GABA 생성 프로바이오틱, 수용체 약물을 구분합니다.</li><li>투여경로·용량·기간·대조군·평가변수와 안전성 정보를 원문 기준으로 확인합니다.</li></ul></section>
          <section class="methodology-dialog-section"><h3>3. 출판 후속조치를 확인합니다</h3><p>철회·정정·Expression of Concern과 출판사 후속 공지를 원 논문과 연결합니다. 후속조치 자료는 효능 근거로 재사용하지 않습니다.</p></section>
          <section class="methodology-dialog-section"><h3>4. 연구 의미와 마케팅 활용을 분리합니다</h3><p>연구의 의미는 해당 연구가 제공하는 과학적 정보로, 마케팅 활용 방안은 조건부 활용 방향으로만 작성합니다. 이는 제품 효능 입증, 허가, 표시 적합성을 대신하지 않습니다.</p></section>
          <section class="methodology-dialog-section"><h3>5. 공개·갱신·동기화 원칙</h3><p>검증 스냅샷 기준일과 자동 탐색 후보 기준일을 구분해 표시합니다. 후보는 원문 확인 전 자동 승격하지 않습니다. 원문 감사의 ‘감사 신선도’는 KST 기준으로 링크가 응답했는지 확인한 시점만 나타내며, 근거의 질·효능·최신성·규제 상태를 평가하지 않습니다. 접근 제한·일시 응답은 대체 경로와 원문을 다시 확인할 대상입니다. Google Sheets 쓰기 권한이 정상일 때만 검증된 레코드를 동기화하며, 403이면 재시도하지 않고 동기화 대기목록과 36열 payload를 갱신해 기록합니다. PubMed·OpenAlex·Crossref 등 자동 탐색과 원문 링크 감사를 반복하고, 중복·품질·빌드·UI·브라우저 QA 후 공개합니다. 공개면은 읽기 전용이며 관리용 Sheets URL과 자격증명을 노출하지 않습니다.</p></section>
        </div>
      </div>
    </dialog>

    <section class="intelligence-strip" id="intelligence" aria-labelledby="intelligence-title">
      <div class="intelligence-intro">
        <h2 id="intelligence-title">오늘의 검토 신호</h2>
        <p>인덱스에 확인된 자료를 연구·규제·활용 관점으로 나누어 보여줍니다. 해석은 원문 확인과 승인 후에만 사업 자료로 사용합니다.</p>
        <a class="intelligence-link" href="#results" style="color:#b7f3e7">근거부터 확인하기 →</a>
      </div>
      <article class="intelligence-card">
        <div><h3>인체 근거</h3><p id="intelligence-clinical-copy">확인된 인체 연구</p></div>
        <strong class="intelligence-value" id="intelligence-clinical">-</strong>
      </article>
      <article class="intelligence-card">
        <div><h3>규제·안전성</h3><p id="intelligence-regulatory-copy">공식 자료와 안전성 기록</p></div>
        <strong class="intelligence-value" id="intelligence-regulatory">-</strong>
      </article>
      <article class="intelligence-card">
        <div><h3>원문 추적</h3><p id="intelligence-source-copy">식별자와 원문 링크가 있는 문헌</p></div>
        <strong class="intelligence-value" id="intelligence-source">-</strong>
      </article>
    </section>

    <section class="intelligence-feed" id="market-use" aria-labelledby="intelligence-feed-title">
      <div class="intelligence-feed-head">
        <div>
          <h2 id="intelligence-feed-title">최신 인덱스에서 읽는 검토 포인트</h2>
          <p>최신 스냅샷의 자료를 기준으로 정리한 탐색용 요약입니다. 확정적 사업 판단은 원문과 전체 근거를 함께 검토하세요.</p>
          <div class="intelligence-filters" aria-label="Intelligence 자료 유형 필터">
            <button class="intelligence-filter active" type="button" data-intelligence-kind="">전체</button>
            <button class="intelligence-filter" type="button" data-intelligence-kind="임상">인체</button>
            <button class="intelligence-filter" type="button" data-intelligence-kind="규제">규제·안전</button>
            <button class="intelligence-filter" type="button" data-intelligence-kind="동물">동물·전임상</button>
          </div>
          <span class="intelligence-filter-label">검토 상태</span>
          <div class="intelligence-filters" aria-label="Intelligence 검토 상태 필터">
            <button class="intelligence-filter active" type="button" data-intelligence-review="">전체</button>
            <button class="intelligence-filter" type="button" data-intelligence-review="direct">포함된 직접 근거</button>
            <button class="intelligence-filter" type="button" data-intelligence-review="candidate">후보·추가 검토</button>
            <button class="intelligence-filter" type="button" data-intelligence-review="regulatory">규제 참고</button>
            <button class="intelligence-filter" type="button" data-intelligence-review="partial">추출 부분</button>
          </div>
        </div>
        <a class="intelligence-link" href="#results">전체 근거 보기 →</a>
      </div>
      <div class="intelligence-feed-list" id="intelligence-feed-list"></div>
    </section>

    <section class="portal-lanes" aria-labelledby="portal-lanes-title">
      <div class="portal-lanes-head">
        <h2 id="portal-lanes-title">전문 조사 레인</h2>
        <p>관심 영역을 선택하면 현재 인덱스의 관련 자료로 바로 이동합니다. 자료가 부족한 레인은 추가 조사 대상으로 표시됩니다.</p>
      </div>
      <div class="portal-lanes-list" id="portal-lanes-list"></div>
    </section>
    <section class="portal-lane-overview" id="portal-lane-overview" aria-live="polite" hidden>
      <div class="portal-lane-overview-head">
        <div><h3 id="portal-lane-overview-title">조사 레인을 선택하세요</h3><p id="portal-lane-overview-copy"></p></div>
        <button class="portal-lane-overview-close" id="portal-lane-overview-close" type="button">닫기</button>
      </div>
      <div class="portal-lane-overview-list" id="portal-lane-overview-list"></div>
      <div class="portal-lane-insight" id="portal-lane-insight"></div>
    </section>
    <section class="review-queue" id="review-queue" aria-labelledby="review-queue-title">
      <div class="review-queue-head">
        <div><h2 id="review-queue-title" tabindex="-1">추가 검토 큐</h2><p>후보·부분추출·핵심 기록 누락 자료를 다음 확인 작업으로 연결합니다.</p><span class="review-queue-scope" id="review-queue-scope">개인 브라우저 작업 · 원본·Sheets 미변경</span></div>
        <span class="review-queue-count" id="review-queue-count">-</span>
      </div>
      <div class="review-queue-controls" aria-label="추가 검토 큐 필터">
        <button class="review-queue-filter active" type="button" data-review-filter="all">전체</button>
        <button class="review-queue-filter" type="button" data-review-filter="candidate">후보</button>
        <button class="review-queue-filter" type="button" data-review-filter="partial">부분추출</button>
        <button class="review-queue-filter" type="button" data-review-filter="missing">핵심 누락</button>
        <button class="review-queue-filter" type="button" data-review-filter="audit">원문 접근 제한</button>
        <button class="review-queue-filter" type="button" data-review-filter="freshness">재확인 필요</button>
        <details class="review-queue-tools" id="review-queue-tools">
          <summary data-review-tools-summary>검토 도구</summary>
          <div class="review-queue-tools-menu" aria-label="검토 큐 도구">
            <button class="review-queue-export" id="review-queue-export" type="button">검토 큐 JSON</button>
            <button class="review-queue-export" id="review-queue-markdown" type="button">검토 큐 Markdown</button>
            <button class="review-queue-share" id="review-queue-share" type="button">검토 큐 링크 복사</button>
            <button class="review-queue-import" id="review-queue-import" type="button">검토 기록 가져오기</button>
            <button class="review-queue-more" id="review-queue-more" type="button" hidden>전체 큐 표시</button>
          </div>
        </details>
        <input id="review-queue-file" type="file" accept="application/json,.json" hidden>
        <label class="review-queue-toggle"><input id="review-hide-done" type="checkbox"> 완료 숨기기</label>
        <span class="review-queue-storage">검토 완료 표시는 현재 브라우저에만 저장되며 원본 인덱스·Sheets를 변경하지 않습니다.</span>
      </div>
      <div class="review-queue-summary" id="review-queue-summary" aria-label="검토 큐 요약"></div>
      <div class="review-queue-shared-note" id="review-queue-shared-note" role="status" hidden><span id="review-queue-shared-copy"></span><button id="review-queue-shared-clear" type="button">공유 큐 해제</button></div>
      <div class="review-queue-list" id="review-queue-list"></div>
    </section>

    <dialog class="intelligence-detail" id="intelligence-detail" aria-labelledby="intelligence-detail-title">
      <div class="intelligence-detail-inner">
        <div class="intelligence-detail-head">
          <div>
            <span class="intelligence-detail-kicker" id="intelligence-detail-kicker">근거 상세</span>
            <h2 id="intelligence-detail-title">자료를 선택하세요</h2>
          </div>
          <button class="intelligence-detail-close" id="intelligence-detail-close" type="button" aria-label="상세 닫기">×</button>
        </div>
        <section class="verification-summary" id="intelligence-detail-verification" aria-label="검증 충실도 요약"></section>
        <div class="intelligence-detail-grid" id="intelligence-detail-facts"></div>
        <section class="intelligence-detail-section">
          <h3>핵심 결과</h3>
          <p id="intelligence-detail-finding"></p>
        </section>
        <section class="intelligence-detail-section">
          <h3>해석 경계</h3>
          <p id="intelligence-detail-boundary"></p>
        </section>
        <section class="intelligence-detail-section">
          <h3>검토 체크 <span id="review-check-summary" style="color:var(--muted);font-size:10px;font-weight:600">기록 충실도 표시</span></h3>
          <div class="review-checklist" id="intelligence-detail-checklist"></div>
        </section>
        <section class="intelligence-detail-section">
          <h3>로컬 검토 기록</h3>
          <p class="review-decision-copy">현재 브라우저에만 저장되는 검토 상태와 메모입니다. 원본 인덱스·Sheets·공개 데이터는 변경하지 않습니다.</p>
          <div class="review-decision-controls" id="review-decision-controls" aria-label="검토 상태 선택">
            <button type="button" data-detail-review-status="pending">대기</button>
            <button type="button" data-detail-review-status="hold">추가 자료 필요</button>
            <button type="button" data-detail-review-status="done">검토 완료</button>
          </div>
          <textarea class="review-decision-note" id="intelligence-detail-note" placeholder="검토 메모를 남겨두세요. 예: 원문에서 용량·대조군 확인 필요"></textarea>
          <button class="review-decision-save" id="intelligence-detail-save" type="button">검토 기록 저장</button>
        </section>
        <section class="intelligence-detail-section">
          <h3>연구의 의미</h3>
          <p id="intelligence-detail-meaning"></p>
        </section>
        <section class="intelligence-detail-section">
          <h3>마케팅 활용 방안</h3>
          <p id="intelligence-detail-marketing"></p>
        </section>
        <section class="intelligence-detail-section">
          <h3>같은 주제의 연결 근거</h3>
          <div class="intelligence-related-list" id="intelligence-detail-related"></div>
        </section>
        <div class="intelligence-detail-actions" id="intelligence-detail-actions"></div>
      </div>
    </dialog>

    <dialog class="compare-dialog" id="compare-dialog" aria-labelledby="compare-dialog-title">
      <div class="compare-dialog-inner">
        <div class="compare-dialog-head">
          <div>
            <h2 id="compare-dialog-title">선택 자료 비교</h2>
            <p>인체·동물·규제 자료의 범위와 한계를 같은 표에서 비교합니다.</p>
          </div>
          <button class="compare-dialog-close" id="compare-dialog-close" type="button" aria-label="비교 닫기">×</button>
        </div>
        <div class="compare-dialog-insight" id="compare-dialog-insight" role="note" aria-live="polite"></div>
        <div id="compare-table" class="compare-table-wrap"></div>
        <div class="compare-dialog-actions"><button id="compare-copy" type="button">비교표 복사</button><button id="compare-export" type="button">비교표 CSV 저장</button></div>
      </div>
    </dialog>
    <dialog class="reading-list-dialog" id="reading-list-dialog" aria-labelledby="reading-list-title">
      <div class="reading-list-inner">
        <div class="reading-list-head">
          <div><h2 id="reading-list-title">내 읽기 목록</h2><p>현재 브라우저에만 저장됩니다. 원본 인덱스·Sheets·공개 데이터는 변경하지 않습니다.</p></div>
          <button class="reading-list-close" id="reading-list-close" type="button" aria-label="읽기 목록 닫기">×</button>
        </div>
        <div class="reading-list-actions"><button id="reading-list-copy" type="button">전체 근거 브리프 복사</button><button id="reading-list-download" type="button">Markdown 저장</button><button id="reading-list-share" type="button">읽기 목록 링크 복사</button><button class="secondary" id="reading-list-clear" type="button">전체 비우기</button></div>
        <div class="reading-list-items" id="reading-list-items"></div>
      </div>
    </dialog>
    <dialog class="review-share-dialog" id="review-share-dialog" aria-labelledby="review-share-title">
      <div class="review-share-inner">
        <div class="review-share-head">
          <div><h2 id="review-share-title">검토 큐 공유</h2><p id="review-share-summary">검토 대상 ID만 링크에 포함됩니다. 개인 메모·완료 상태·Sheets 데이터는 공유되지 않습니다.</p></div>
          <button class="review-share-close" id="review-share-close" type="button" aria-label="검토 큐 공유 닫기">×</button>
        </div>
        <label class="review-share-label" for="review-share-url">공유 링크</label>
        <input class="review-share-url" id="review-share-url" type="url" readonly>
        <div class="review-share-actions"><button id="review-share-copy" type="button">링크 복사</button><button class="secondary" id="review-share-close-secondary" type="button">닫기</button></div>
      </div>
    </dialog>
    <dialog class="copy-dialog" id="copy-dialog" aria-labelledby="copy-dialog-title">
      <div class="copy-dialog-inner">
        <div class="copy-dialog-head">
          <div><h2 id="copy-dialog-title">복사할 내용</h2><p id="copy-dialog-description">클립보드 권한이 없을 때 아래 내용을 선택해 직접 복사할 수 있습니다.</p></div>
          <button class="copy-dialog-close" id="copy-dialog-close" type="button" aria-label="복사 패널 닫기">×</button>
        </div>
        <textarea class="copy-dialog-value" id="copy-dialog-value" aria-labelledby="copy-dialog-title" aria-describedby="copy-dialog-description" readonly></textarea>
        <div class="copy-dialog-actions"><button id="copy-dialog-copy" type="button">다시 복사</button><button class="secondary" id="copy-dialog-close-secondary" type="button">닫기</button></div>
      </div>
    </dialog>

    <section class="section" aria-labelledby="distribution-title">
      <div class="section-head">
        <div>
          <h2 id="distribution-title">근거 분포</h2>
          <p>상위 항목을 선택해 결과를 좁힐 수 있습니다. 나머지 항목은 전체 분포에서 확인합니다.</p>
        </div>
      </div>
      <div class="distribution-context" role="note" aria-label="근거 분포 사용 안내">
        <strong id="distribution-scope">전체 검증 인덱스 기준</strong>
        <span>카드를 누르면 해당 조건으로 검색합니다. 분포 비율은 탐색용 요약이며 근거의 질·효능·규제 적합성 순위가 아닙니다.</span>
      </div>
      <div class="distribution-grid">
        <div class="distribution">
          <h3>대상 종 그룹</h3>
          <div class="distribution-list" id="species-distribution"></div>
        </div>
        <div class="distribution">
          <h3>결과 방향</h3>
          <div class="distribution-list" id="direction-distribution"></div>
        </div>
      </div>
    </section>

    <section class="explorer" aria-labelledby="explorer-title">
      <div class="explorer-toolbar">
        <div class="search-row">
          <div class="search-box">
            <span class="search-icon" aria-hidden="true">⌕</span>
            <label class="sr-only" for="search">제목과 내용 통합검색</label>
            <input id="search" type="search" autocomplete="off"
              placeholder="한글로 제목·본문·안전성 내용 검색">
            <button class="search-clear" id="search-clear" type="button" aria-label="검색어 지우기">×</button>
          </div>
          <button class="mobile-filter" id="mobile-filter" type="button" aria-controls="filter-panel" aria-expanded="false">필터 <span class="mobile-filter-count" id="mobile-filter-count" hidden></span></button>
        </div>
        <p class="search-help">원문 제목은 그대로 보존하며 한국어 용어 확장을 제목·내용 전체에 적용합니다. 정확한 문구는 “따옴표”, 제외할 말은 -단어로 입력하세요. <kbd>/</kbd> 키로 바로 검색할 수 있습니다.</p>
        <div class="search-suggestions" aria-label="추천 한글 검색어">
          <button class="suggestion-button" type="button" data-query="수면">수면</button>
          <button class="suggestion-button" type="button" data-query="혈압">혈압</button>
          <button class="suggestion-button" type="button" data-query="불안 스트레스">불안·스트레스</button>
          <button class="suggestion-button" type="button" data-query="면역 타액 IgA">면역·타액 IgA</button>
          <button class="suggestion-button" type="button" data-query="현수교 스트레스">현수교 스트레스</button>
          <details class="search-suggestions-more">
            <summary aria-label="추가 추천 검색어 열기">추천 검색어 더보기 <span class="search-suggestions-more-count">5</span></summary>
            <div class="search-suggestions-more-list">
              <button class="suggestion-button" type="button" data-query="캐나다 모노그래프">캐나다·GABA 모노그래프</button>
              <button class="suggestion-button" type="button" data-query="안전성 독성">안전성·독성</button>
              <button class="suggestion-button" type="button" data-query="돼지 장건강">돼지·장건강</button>
              <button class="suggestion-button" type="button" data-query="수산 성장">수산·성장</button>
              <button class="suggestion-button" type="button" data-query="한시적 인정">한시적 인정</button>
            </div>
          </details>
        </div>
        <div class="explorer-intents" aria-label="탐색 목적 빠른 선택">
          <span class="explorer-intents-label">탐색 목적</span>
          <button class="intent-button" type="button" data-preset="human-direct">인체 직접근거</button>
          <button class="intent-button" type="button" data-preset="regulatory">안전·규제</button>
          <button class="intent-button" type="button" data-preset="source">원문 확인 우선</button>
          <button class="intent-button" type="button" data-preset="audit-unavailable">접근 제한 후속검토</button>
          <button class="intent-button" type="button" data-preset="review">추가 검토</button>
        </div>
        <div class="quick-row" aria-label="연구구분 빠른 필터">
          <button class="quick-button active" type="button" data-kind="">전체</button>
          <button class="quick-button" type="button" data-kind="임상">인체 임상</button>
          <button class="quick-button" type="button" data-kind="동물">동물시험</button>
          <button class="quick-button" type="button" data-kind="규제">규제·안전성</button>
          <button class="quick-button" type="button" data-category="안전성">안전성 자료</button>
          <button class="quick-button" type="button" data-effect-category="수면">수면</button>
          <details class="quick-advanced" id="quick-advanced">
            <summary data-quick-advanced-summary>추가 필터</summary>
            <div class="quick-advanced-menu" aria-label="추가 빠른 필터">
              <details class="quick-more">
                <summary data-quick-summary="effectCategory">분야 더보기</summary>
                <div class="quick-more-menu" aria-label="추가 분야 빠른 필터">
                  <button class="quick-button" type="button" data-effect-category="성장호르몬">성장호르몬</button>
                  <button class="quick-button" type="button" data-effect-category="근육발달">근육발달</button>
                  <button class="quick-button" type="button" data-effect-category="다이어트">다이어트</button>
                  <button class="quick-button" type="button" data-effect-category="고혈압">고혈압</button>
                  <button class="quick-button" type="button" data-effect-category="당뇨">당뇨</button>
                </div>
              </details>
              <details class="quick-more">
                <summary data-quick-summary="marketing">활용 판단</summary>
                <div class="quick-more-menu" aria-label="마케팅 활용 판단 필터">
                  <button class="quick-button" type="button" data-marketing="직접 근거 검토">직접 근거 <span class="quick-count" data-marketing-count="직접 근거 검토">__COUNT_MARKETING_DIRECT__</span></button>
                  <button class="quick-button" type="button" data-marketing="조건부 검토">조건부 검토 <span class="quick-count" data-marketing-count="조건부 검토">__COUNT_MARKETING_CONDITIONAL__</span></button>
                  <button class="quick-button" type="button" data-marketing="마케팅 사용 금지">사용 금지 <span class="quick-count" data-marketing-count="마케팅 사용 금지">__COUNT_MARKETING_EXCLUDE__</span></button>
                </div>
              </details>
              <details class="quick-more">
                <summary data-quick-summary="intervention">개입 구분</summary>
                <div class="quick-more-menu" aria-label="GABA 개입 구분 필터">
                  <button class="quick-button" type="button" data-intervention="순수 GABA 섭취">순수 GABA <span class="quick-count" data-intervention-count="순수 GABA 섭취">__COUNT_PURE__</span></button>
                  <button class="quick-button" type="button" data-intervention="복합제·복합개입">복합제·복합개입 <span class="quick-count" data-intervention-count="복합제·복합개입">__COUNT_COMBINATION__</span></button>
                  <button class="quick-button" type="button" data-intervention="GABA 생성 발효·프로바이오틱">발효·프로바이오틱 <span class="quick-count" data-intervention-count="GABA 생성 발효·프로바이오틱">__COUNT_FERMENTED__</span></button>
                  <button class="quick-button" type="button" data-intervention="수용체 약물·작용제">수용체 약물 <span class="quick-count" data-intervention-count="수용체 약물·작용제">__COUNT_RECEPTOR__</span></button>
                  <button class="quick-button" type="button" data-intervention="규제·안전성 자료">규제자료 <span class="quick-count" data-intervention-count="규제·안전성 자료">__COUNT_REGULATORY__</span></button>
                </div>
              </details>
              <details class="quick-more">
                <summary data-quick-summary="followup">출판 후속조치</summary>
                <div class="quick-more-menu" aria-label="출판 후속조치 필터">
                  <button class="quick-button" type="button" data-followup="signal">철회·정정·우려표명 신호 <span class="quick-count" data-followup-count="signal">__COUNT_FOLLOWUP__</span></button>
                </div>
              </details>
              <details class="quick-more">
                <summary data-quick-summary="direction">결과 방향</summary>
                <div class="quick-more-menu" aria-label="결과 방향 필터">
                  <button class="quick-button" type="button" data-direction="무효">무효 <span class="quick-count">__COUNT_DIRECTION_NULL__</span></button>
                  <button class="quick-button" type="button" data-direction="혼재">혼재 <span class="quick-count">__COUNT_DIRECTION_MIXED__</span></button>
                  <button class="quick-button" type="button" data-direction="유해">유해 <span class="quick-count">__COUNT_DIRECTION_HARM__</span></button>
                  <button class="quick-button" type="button" data-direction="중립">중립 <span class="quick-count">__COUNT_DIRECTION_NEUTRAL__</span></button>
                </div>
              </details>
            </div>
          </details>
          <span class="quick-spacer"></span>
          <label class="sr-only" for="sort">정렬</label>
          <select class="sort-select" id="sort" aria-describedby="sort-help">
            <option value="latest">최신 연도순</option>
            <option value="oldest">과거 연도순</option>
            <option value="title">제목 가나다순</option>
            <option value="updated">최근 확인순</option>
            <option value="human-source">인체·원문 우선</option>
            <option value="review-priority">검토 우선순위</option>
          </select>
          <span class="sort-help" id="sort-help" hidden>검토 시작점을 돕는 정렬이며 근거의 우열·효능 순위가 아닙니다. 검토 우선순위는 누락·접근성·최신성 신호를 먼저 보여줍니다.</span>
          <label class="sr-only" for="page-size">페이지당 결과 수</label>
          <select class="page-size-select" id="page-size">
            <option value="20">20개씩</option>
            <option value="50">50개씩</option>
            <option value="100">100개씩</option>
          </select>
        </div>
        <div class="filter-status-strip" id="filter-status-strip" role="status" aria-live="polite">
          <span class="filter-status-label">현재 조건</span>
          <span class="filter-status-text" id="filter-status-text">전체 검증 근거</span>
          <button class="filter-status-reset" id="filter-status-reset" type="button" hidden>조건 초기화</button>
        </div>
      </div>

      <div class="explorer-grid">
        <aside class="filter-panel" id="filter-panel" aria-label="상세 필터">
          <div class="filter-head">
            <div class="filter-head-title"><h2>상세 필터</h2><span class="filter-active-count" id="filter-active-count">조건 없음</span></div>
            <div class="filter-head-actions">
              <span class="filter-result-count" id="filter-result-count" aria-live="polite">전체 결과 확인 중</span>
              <button class="filter-quick-reset" id="filter-reset-quick" type="button" hidden>초기화</button>
            </div>
            <button class="filter-close" id="filter-close" type="button" aria-label="필터 닫기">×</button>
          </div>
          <p class="filter-guidance">자료 카테고리와 분야부터 고른 뒤, 필요한 그룹만 여세요.</p>
          <div class="filter-group">
            <label for="category">자료 카테고리</label>
            <select id="category"><option value="">전체</option></select>
          </div>
          <div class="filter-group">
            <label for="effect-category">효과·적용 분야</label>
            <select id="effect-category"><option value="">전체</option></select>
          </div>
          <div class="filter-group">
            <label for="status">관리 상태</label>
            <select id="status"><option value="">전체</option></select>
          </div>
          <details class="advanced-filters" id="advanced-filters">
            <summary><span>추가 조건</span><span class="advanced-filter-count" id="advanced-filter-count">선택 없음</span></summary>
            <details class="advanced-subfilters" id="regulatory-filters">
              <summary><span>규제·자료 분류</span><small>기관·등급·안전 영역 <span class="filter-subgroup-count" id="regulatory-filter-group-count">선택 없음</span></small></summary>
            <div class="filter-group">
              <label for="grade">규제 근거등급</label>
              <select id="grade"><option value="">전체</option></select>
            </div>
            <div class="filter-group">
              <label for="agency">규제기관</label>
              <select id="agency"><option value="">전체</option></select>
            </div>
            <div class="filter-group">
              <label for="safety-area">안전성 영역</label>
              <select id="safety-area"><option value="">전체</option></select>
            </div>
            </details>
            <details class="advanced-subfilters" id="research-filters">
              <summary><span>연구·원문 확인</span><small>대상·결과·접근 상태 <span class="filter-subgroup-count" id="research-filter-group-count">선택 없음</span></small></summary>
            <div class="filter-group">
              <label for="route-group">투여 경로 분류</label>
              <select id="route-group"><option value="">전체</option></select>
            </div>
            <div class="filter-group">
              <label for="sci">SCI/SCIE 상태</label>
              <select id="sci"><option value="">전체</option></select>
            </div>
            <div class="filter-group">
              <label for="species">대상 종 그룹</label>
              <select id="species"><option value="">전체</option></select>
            </div>
            <div class="filter-group">
              <label for="topic">연구 주제</label>
              <select id="topic"><option value="">전체</option></select>
            </div>
            <div class="filter-group">
              <label for="extraction">추출 완성도</label>
              <select id="extraction"><option value="">전체</option></select>
            </div>
            <div class="filter-group">
              <label for="direction">결과 방향</label>
              <select id="direction"><option value="">전체</option></select>
            </div>
            <div class="filter-group">
              <label for="source">원문 연결</label>
              <select id="source">
                <option value="">전체</option>
                <option value="available">원문·식별자 링크 있음</option>
                <option value="drive">Drive 원문 있음</option>
                <option value="link">외부 원문·DOI 링크 있음</option>
                <option value="none">원문 링크 없음</option>
              </select>
            </div>
            <div class="filter-group">
              <label for="audit">원문 접근 감사</label>
              <select id="audit">
                <option value="">전체</option>
                <option value="ok">감사 시점 접근 확인</option>
                <option value="unavailable">접근 제한·일시 응답·페이지 오류</option>
                <option value="missing">개별 감사 기록 없음</option>
              </select>
            </div>
            <div class="filter-group">
              <label for="freshness">재확인 상태</label>
              <select id="freshness">
                <option value="">전체</option>
                <option value="recent">최근 확인 (90일 이내)</option>
                <option value="stale">재확인 권고 (90일 초과)</option>
                <option value="unknown">확인일 미상</option>
              </select>
              <small class="filter-help">확인일 경과만 표시하며 근거의 질을 평가하지 않습니다.</small>
            </div>
            <div class="filter-group">
              <label>출판 연도</label>
              <div class="year-pair">
                <input id="year-from" type="number" inputmode="numeric" aria-label="시작 연도">
                <span>–</span>
                <input id="year-to" type="number" inputmode="numeric" aria-label="종료 연도">
              </div>
            </div>
            </details>
          </details>
          <button class="reset-button" id="reset" type="button">필터 전체 초기화</button>
          <button class="filter-mobile-apply" id="filter-mobile-apply" type="button">현재 결과 보기</button>
        </aside>

        <section class="results-panel" id="results" aria-labelledby="explorer-title">
          <div class="result-top">
            <p class="result-count" id="result-count" tabindex="-1" aria-live="polite"></p>
            <div class="result-top-actions">
              <button class="result-reset" id="result-reset" type="button">필터 초기화</button>
              <button class="result-reset" id="result-share" type="button">조건 링크 복사</button>
              <details class="result-export-menu saved-search-menu" id="saved-search-menu">
              <summary aria-label="저장 검색, 0개 저장됨">저장 검색 <span class="saved-search-count" id="saved-search-count" aria-live="polite" aria-atomic="true">0</span></summary>
                <div class="result-export-options" aria-label="저장된 검색 조건">
                  <button class="result-reset" id="result-save-search" type="button">현재 조건 저장</button>
                  <p class="saved-search-note">이 브라우저에만 저장됩니다. 원본 Sheets와 공개 인덱스는 변경하지 않습니다.</p>
                  <div class="saved-search-list" id="saved-search-list"></div>
                  <div class="saved-search-manage"><button class="saved-search-clear" id="personal-workspace-clear" type="button">개인 작업 초기화</button></div>
                </div>
              </details>
              <button class="result-reset" id="result-reading-list" type="button">읽기 목록 열기</button>
              <details class="result-export-menu" id="result-export-menu">
                <summary>내보내기</summary>
                <div class="result-export-options" aria-label="검색 결과 내보내기 형식">
                  <button class="result-reset" id="result-export" type="button">검색 결과 CSV</button>
                  <button class="result-reset" id="result-json" type="button">검색 결과 JSON</button>
                  <button class="result-reset" id="result-ris" type="button">검색 결과 RIS</button>
                  <button class="result-reset" id="result-brief" type="button">검색 결과 브리프</button>
                  <button class="result-reset" id="result-brief-download" type="button">브리프 Markdown 저장</button>
                </div>
              </details>
            </div>
          </div>
          <div class="compare-tray" id="compare-tray" hidden aria-live="polite">
            <span id="compare-summary">비교 자료를 선택하세요.</span>
            <button id="compare-open" type="button" disabled>선택 자료 비교</button>
            <button class="secondary" id="compare-clear" type="button">선택 해제</button>
          </div>
          <div class="active-filters" id="active-filters" aria-label="적용된 필터"></div>
          <div class="result-interpretation" id="result-interpretation" aria-live="polite"></div>
          <div class="papers" id="papers"></div>
          <nav class="pagination" id="pagination" aria-label="검색 결과 페이지">
            <button class="page-button" id="prev" type="button" aria-label="이전 페이지">←</button>
            <span class="page-status" id="page-status" role="status" aria-live="polite"></span>
            <button class="page-button" id="next" type="button" aria-label="다음 페이지">→</button>
          </nav>
        </section>
      </div>
    </section>

    <section class="section" aria-labelledby="guide-title">
      <div class="section-head">
        <div>
          <h2 id="guide-title">처음 사용하는 분을 위한 안내</h2>
          <p>관리 상태와 근거 수준을 같은 의미로 해석하지 않도록 구분했습니다.</p>
        </div>
      </div>
      <div class="guide-grid">
        <article class="guide-card">
          <h3>포함 · 후보 · 제외</h3>
          <p><strong>포함</strong>은 기준을 충족한 연구, <strong>후보</strong>는 원문·경로·SCI 상태 확인이 필요한 연구, <strong>제외</strong>는 직접 GABA 섭취 기준에 맞지 않는 연구입니다.</p>
        </article>
        <article class="guide-card">
          <h3>완료 · 부분</h3>
          <p><strong>완료</strong>는 원문 또는 충분한 공개 전문으로 주요 정보를 검토한 상태이며, <strong>부분</strong>은 초록이나 제한된 정보만 확인된 상태입니다.</p>
        </article>
        <article class="guide-card">
          <h3>SCIE와 PubMed</h3>
          <p>PubMed 등재와 SCIE 등재는 서로 다른 기준입니다. 이 인덱스는 저널의 SCI/SCIE 상태를 별도로 관리합니다.</p>
        </article>
        <article class="guide-card">
          <h3>식약처 직접근거 · 해외 규제 참고</h3>
          <p><strong>식약처 직접근거</strong>는 국내 고시·공식 안내서이며, <strong>해외 규제 참고</strong>는 자료 구조와 유사사례를 찾는 용도입니다. 해외 승인만으로 국내 한시적 인정이 보장되지는 않습니다.</p>
        </article>
      </div>
    </section>

    <div class="caution" role="note">
      <strong>해석 주의:</strong> 이 인덱스는 문헌 탐색과 관리 목적이며 의학적 진단·치료 지침이 아닙니다.
      동물시험 결과를 인체 효능으로 직접 해석하지 마세요. 규제자료는 신청전략 참고자료이며 식약처의 접수·인정 또는 개별 시험자료의 적합성을 보증하지 않습니다.
    </div>

    <footer class="site-footer">
      <p id="footer-snapshot"></p>
      <p>데이터 원본: GABA 섭취 연구·규제 안전성 마스터 인덱스 · 웹 화면은 읽기 전용 스냅샷입니다.</p>
    </footer>
  </main>

  <div class="toast" id="toast" role="status" aria-live="polite"></div>
  <script id="database" type="application/json">__EMBEDDED_DATA__</script>
  <script>
    (function () {
      "use strict";
      var DB = JSON.parse(document.getElementById("database").textContent);
      var records = DB.records;
      var pageSize = 20;
      var intelligenceKind = "";
      var intelligenceReview = "";
      var activeLane = null;
      var reviewQueueFilter = "all";
      var reviewQueueFilterLabels = { all: "전체", candidate: "후보", partial: "부분추출", missing: "핵심 누락", audit: "원문 접근 제한", freshness: "재확인 필요" };
      var reviewQueueHideDone = false;
      var reviewQueueShowAll = false;
      var sharedReviewIds = [];
      var sharedReviewMissingCount = 0;
      var sharedReviewNeedsFocus = false;
      var candidatePreviewFilter = "all";
      var candidatePreviewNeedsFocus = false;
      var urlCandidateId = "";
      var candidateDetailReturnFocus = null;
      var candidateDetailReturnFocusId = "";
      var reviewDecisions = {};
      try { reviewDecisions = JSON.parse(localStorage.getItem("gaba-review-decisions") || "{}"); } catch (_) { reviewDecisions = {}; }
      var candidateDecisions = {};
      try { candidateDecisions = JSON.parse(localStorage.getItem("gaba-candidate-decisions-v1") || "{}"); } catch (_) { candidateDecisions = {}; }
      var compareIds = [];
      try {
        compareIds = JSON.parse(localStorage.getItem("gaba-compare-ids") || "[]")
          .map(String).filter(function (id) { return records.some(function (record) { return String(record.id) === id; }); }).slice(0, 4);
      } catch (_) { compareIds = []; }
      var readingIds = [];
      try {
        readingIds = JSON.parse(localStorage.getItem("gaba-reading-ids") || "[]")
          .map(String).filter(function (id) { return records.some(function (record) { return String(record.id) === id; }); });
      } catch (_) { readingIds = []; }
      var savedSearches = [];
      try {
        savedSearches = JSON.parse(localStorage.getItem("gaba-saved-searches-v1") || "[]")
          .filter(function (item) { return item && item.id && typeof item.search === "string"; })
          .slice(0, 10);
      } catch (_) { savedSearches = []; }
      var currentDetailRecordId = null;
      var urlRecordId = "";
      var detailReturnFocus = null;
      var compareReturnFocus = null;
      var readingReturnFocus = null;
      var reviewShareReturnFocus = null;
      var copyDialogReturnFocus = null;
      var copyDialogSuccessMessage = "내용을 복사했습니다";
      var urlReadingIds = [];
      var reviewDraftStatus = "pending";
      var reviewDraftNote = "";
      var state = {
         q: "", kind: "", category: "", effectCategory: "", status: "", marketing: "", intervention: "", routeGroup: "", followup: "", sci: "", species: "", topic: "",
        grade: "", agency: "", safetyArea: "", extraction: "", direction: "", source: "", audit: "", freshness: "", from: DB.meta.minYear,
        to: DB.meta.maxYear, sort: "latest", page: 1
      };

      var el = function (id) { return document.getElementById(id); };
      var controls = {
        q: el("search"),
        category: el("category"),
        effectCategory: el("effect-category"),
        status: el("status"),
        routeGroup: el("route-group"),
        grade: el("grade"),
        agency: el("agency"),
        safetyArea: el("safety-area"),
        sci: el("sci"),
        species: el("species"),
        topic: el("topic"),
        extraction: el("extraction"),
        direction: el("direction"),
        source: el("source"),
        audit: el("audit"),
        freshness: el("freshness"),
        from: el("year-from"),
        to: el("year-to"),
        sort: el("sort"),
        pageSize: el("page-size")
      };

      function esc(value) {
        return String(value == null ? "" : value).replace(/[&<>"']/g, function (char) {
          return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char];
        });
      }
      function safeUrl(value) {
        try {
          var url = new URL(String(value || ""));
          return url.protocol === "http:" || url.protocol === "https:" ? url.href : "";
        } catch (_) { return ""; }
      }
      function normalize(value) {
        return String(value || "").normalize("NFKC").toLocaleLowerCase("ko").replace(/\s+/g, " ").trim();
      }
      function koreanDate(value) {
        var parts = String(value || "").split("-");
        return parts.length === 3 ? Number(parts[0]) + "년 " + Number(parts[1]) + "월 " + Number(parts[2]) + "일" : value;
      }
      function koreanDateTime(value) {
        var parsed = new Date(String(value || ""));
        if (Number.isNaN(parsed.getTime())) return "확인 필요";
        var formatted = new Intl.DateTimeFormat("ko-KR", {
          timeZone: "Asia/Seoul",
          year: "numeric",
          month: "2-digit",
          day: "2-digit"
        }).formatToParts(parsed);
        var values = {};
        formatted.forEach(function(part) { values[part.type] = part.value; });
        return values.year + "년 " + Number(values.month) + "월 " + Number(values.day) + "일";
      }
      function signedDelta(value) {
        var number = Number(value || 0);
        return (number > 0 ? "+" : "") + number.toLocaleString("ko-KR");
      }
      function discoveryDeltaLabel(delta) {
        if (!delta) return "이전 탐색과 비교 불가";
        return "PubMed " + signedDelta(delta.pubmedUnique) + " · 통합 " + signedDelta(delta.mergedUnique) + " · 후보 " + signedDelta(delta.stagedCandidates);
      }
      function updateFreshnessLabel(snapshotDate, discoveryDate) {
        var target = el("freshness-label");
        if (!target) return;
        var startToday = kstDayStart(new Date());
        var startSnapshot = kstDayStart(snapshotDate);
        var startDiscovery = kstDayStart(discoveryDate);
        if (Number.isNaN(startSnapshot)) {
          target.textContent = "갱신일 확인 필요";
          target.classList.add("freshness-stale");
          return;
        }
        var age = Math.max(0, Math.floor((startToday - startSnapshot) / 86400000));
        var discoveryAge = Number.isNaN(startDiscovery)
          ? null
          : Math.max(0, Math.floor((startToday - startDiscovery) / 86400000));
        var discoveryText = discoveryAge == null ? "탐색일 확인 필요" : "자동 탐색 " + discoveryAge + "일 전";
        if (age <= 7) {
          target.textContent = "검증 최신 · 탐색 " + (discoveryAge == null ? "확인 필요" : discoveryAge + "일 전");
          target.classList.add("freshness-recent");
          target.title = "검증 인덱스는 " + age + "일 전 갱신되었습니다. " + discoveryText + "입니다.";
        } else if (age <= 21) {
          target.textContent = "검증 갱신 예정 · 탐색 " + (discoveryAge == null ? "확인 필요" : discoveryAge + "일 전");
          target.title = "검증 인덱스가 " + age + "일 경과했습니다. " + discoveryText + "이며, 후보는 검증 인덱스와 별도입니다.";
        } else {
          target.textContent = "검증 점검 " + age + "일 · 탐색 " + (discoveryAge == null ? "확인 필요" : discoveryAge + "일 전");
          target.title = "검증 인덱스가 " + age + "일 경과했습니다. " + discoveryText + "이지만 자동 탐색 후보는 검증 전 자료입니다.";
          target.classList.add("freshness-stale");
        }
      }
      function focusDiscoveryStatus() {
        var target = el("discovery-banner");
        var heading = el("discovery-title");
        if (target) target.scrollIntoView({ behavior: preferredScrollBehavior(), block: "start" });
        if (heading) window.setTimeout(function () { heading.focus(); }, 120);
      }
      function countText(value) { return Number(value || 0).toLocaleString("ko-KR") + "편"; }
      function preferredScrollBehavior() {
        return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
      }
      function optionLabel(item) { return item.label + " (" + item.value.toLocaleString("ko-KR") + ")"; }
      function addOptions(select, items) {
        items.forEach(function (item) {
          var option = document.createElement("option");
          option.value = item.label;
          option.textContent = optionLabel(item);
          select.appendChild(option);
        });
      }
      function setActiveToggle(button, active) {
        button.classList.toggle("active", active);
        button.setAttribute("aria-pressed", String(active));
      }

      function candidateSourceUrl(candidate) {
        if (candidate.pmid) return "https://pubmed.ncbi.nlm.nih.gov/" + encodeURIComponent(candidate.pmid) + "/";
        if (candidate.doi) return "https://doi.org/" + encodeURIComponent(candidate.doi);
        return "";
      }
      function candidateSourceLabel(candidate) {
        if (candidate.pmid) return "PubMed 원문";
        if (candidate.doi) return "DOI 원문";
        return "원문 식별자";
      }
      function candidateReviewStatus(candidate) {
        var saved = candidateDecisions[String(candidate?.candidateId || "")];
        return saved?.status || "미검토";
      }
      function candidateScreeningStatus(candidate) {
        return candidate.screeningStatus || "미분류";
      }
      function saveCandidateDecisions() {
        try { localStorage.setItem("gaba-candidate-decisions-v1", JSON.stringify(candidateDecisions)); } catch (_) {}
      }

      function filterCandidatePreviewRecords(candidates, activeFilter) {
        return (Array.isArray(candidates) ? candidates : []).filter(function (candidate) {
          if (activeFilter === "priority") return candidate.bucket === "우선검토";
          if (activeFilter === "followup") return (candidate.exclusionSignals || []).length > 0 || /출판 후속조치|철회|정정|우려표명/.test(candidate.screeningRecommendation || "");
          if (activeFilter === "reviewed") return candidateReviewStatus(candidate) !== "미검토";
          if (activeFilter === "unreviewed") return candidateReviewStatus(candidate) === "미검토";
          return true;
        });
      }

      function candidateBucketLabel(value) {
        return { "우선검토": "자동 우선검토", "일반검토": "자동 일반검토", "낮은우선순위": "자동 낮은 우선순위" }[value] || value || "검토 후보";
      }

      function renderCandidatePreview(candidates) {
        var section = el("candidate-preview");
        var list = el("candidate-preview-list");
        var more = el("candidate-preview-more");
        if (!section || !list) return;
        var totalCandidates = Number(DB.meta.discovery?.stagedCandidates || candidates.length);
        var scopeNote = el("candidate-preview")?.querySelector(".candidate-preview-note");
        if (scopeNote) {
          var screeningCounts = DB.meta.discovery?.screeningCounts || {};
          var queueLabels = ["포함후보", "보류", "제외", "미검토"];
          var queueTotal = queueLabels.reduce(function (sum, label) { return sum + Number(screeningCounts[label] || 0); }, 0);
          var queueOther = Math.max(0, totalCandidates - queueTotal);
          var queueSummary = queueLabels.map(function (label) { return label + " " + Number(screeningCounts[label] || 0).toLocaleString("ko-KR"); });
          if (queueOther) queueSummary.push("기타 " + queueOther.toLocaleString("ko-KR"));
          scopeNote.textContent = "확정 근거 아님 · 미리보기 " + candidates.length.toLocaleString("ko-KR") + "건 / 전체 후보 " + totalCandidates.toLocaleString("ko-KR") + "건 · 전체 큐: " + queueSummary.join(" · ");
        }
        if (!Array.isArray(candidates) || !candidates.length) {
          section.hidden = true;
          list.innerHTML = "";
          if (more) more.hidden = true;
          return;
        }
        section.hidden = false;
        var activeFilter = candidatePreviewFilter;
        section.dataset.filter = activeFilter;
        var filtered = filterCandidatePreviewRecords(candidates, activeFilter);
        var reviewedCount = candidates.filter(function (candidate) { return candidateReviewStatus(candidate) !== "미검토"; }).length;
        var progress = el("candidate-review-progress");
        if (progress) {
          progress.textContent = "현재 미리보기 " + candidates.length.toLocaleString("ko-KR") + "건 중 개인 검토 " + reviewedCount.toLocaleString("ko-KR") + "건 · 미검토 " + Math.max(0, candidates.length - reviewedCount).toLocaleString("ko-KR") + "건 · 원본·Sheets 미변경";
        }
        var candidateFilterLabels = { all: "전체", priority: "자동 우선검토", followup: "출판 후속조치", reviewed: "수동 검토됨", unreviewed: "미검토" };
        document.querySelectorAll("[data-candidate-filter]").forEach(function (button) {
          var filterKey = button.dataset.candidateFilter || "all";
          var filterCount = filterCandidatePreviewRecords(candidates, filterKey).length;
          button.textContent = (candidateFilterLabels[filterKey] || "후보") + " " + filterCount.toLocaleString("ko-KR");
          button.setAttribute("aria-label", (candidateFilterLabels[filterKey] || "후보") + " " + filterCount.toLocaleString("ko-KR") + "건");
          button.onclick = function () {
            candidatePreviewFilter = filterKey;
            section.dataset.filter = candidatePreviewFilter;
            section.dataset.expanded = "false";
            persistUrl("push");
            renderCandidatePreview(candidates);
          };
          var active = button.dataset.candidateFilter === activeFilter;
          setActiveToggle(button, active);
        });
        var expanded = section.dataset.expanded === "true";
        list.innerHTML = filtered.slice(0, expanded ? 24 : 6).map(function (candidate) {
          var sourceUrl = candidateSourceUrl(candidate);
          var signals = candidateHumanSignals(candidate);
          var recommendation = candidate.screeningRecommendation || "원문·식별자 확인 필요";
          var reviewStatus = candidateReviewStatus(candidate);
          var screeningStatus = candidateScreeningStatus(candidate);
          var score = candidate.score == null ? "" : " · 자동 점수 " + candidate.score;
          var identifiers = [candidate.pmid ? "PMID " + candidate.pmid : "", candidate.doi ? "DOI" : ""].filter(Boolean);
          var types = (candidate.publicationTypes || []).slice(0, 2);
          return '<article class="candidate-preview-card">' +
            '<div class="candidate-preview-kicker">' + esc(candidateBucketLabel(candidate.bucket)) + ' · ' + esc(candidate.candidateId || "후보") + '</div>' +
            '<h3>' + esc(candidate.title || "제목 확인 필요") + '</h3>' +
            '<p>' + esc([candidate.author, candidate.journal, candidate.year].filter(Boolean).join(" · ") || "서지정보 확인 필요") + '</p>' +
            '<div class="candidate-preview-meta">' + identifiers.concat(types).map(function (item) { return '<span>' + esc(item) + '</span>'; }).join("") + '</div>' +
            '<p class="candidate-preview-signal"><strong>개인 검토 상태</strong> · ' + esc(reviewStatus) + '</p>' +
            '<p class="candidate-preview-signal"><strong>자동 선별 상태</strong> · ' + esc(screeningStatus) + (candidate.screeningPriority ? ' · 자동 우선순위 ' + esc(candidate.screeningPriority) : '') + (candidate.screeningNote ? ' <span>· ' + esc(candidate.screeningNote) + '</span>' : '') + '</p>' +
            '<p class="candidate-preview-signal"><strong>검토 권고</strong> · ' + esc(recommendation) + '</p>' +
            '<p class="candidate-preview-signal"><strong>자동 신호</strong> · ' + esc(signals + score) + ' <span>(확정 판정 아님)</span></p>' +
            '<button class="candidate-preview-detail" type="button" data-candidate-detail="' + esc(candidate.candidateId || "") + '">후보 상세 보기</button>' +
            (sourceUrl ? '<a href="' + esc(sourceUrl) + '" target="_blank" rel="noopener noreferrer">' + esc(candidateSourceLabel(candidate)) + ' 확인 ↗</a>' : '') +
            '</article>';
        }).join("");
        if (more) {
          more.hidden = filtered.length <= 6;
          more.textContent = expanded ? "후보 접기" : "후보 " + filtered.length.toLocaleString("ko-KR") + "건 더 보기";
          more.onclick = function () {
            section.dataset.expanded = expanded ? "false" : "true";
            renderCandidatePreview(candidates);
          };
        }
      }

      function openCandidateDetail(candidateId, historyMode) {
        var candidates = DB.meta.discovery?.candidatePreview || [];
        var candidate = candidates.find(function (item) { return String(item.candidateId) === String(candidateId); });
        if (!candidate) return;
        var dialog = el("candidate-detail-dialog");
        urlCandidateId = String(candidate.candidateId || candidateId);
        persistUrl(historyMode || "push");
        el("candidate-detail-title").textContent = candidate.title || "후보 상세";
        el("candidate-detail-meta").textContent = [candidate.candidateId, candidate.author, candidate.journal, candidate.year, candidate.pmid ? "PMID " + candidate.pmid : "", candidate.doi ? "DOI " + candidate.doi : ""].filter(Boolean).join(" · ");
        var reviewStatus = candidateReviewStatus(candidate);
        el("candidate-detail-screening").innerHTML = '<strong>검토 권고</strong> · ' + esc(candidate.screeningRecommendation || "원문·식별자 확인 필요") + '<br><strong>개인 검토 상태</strong> · ' + esc(reviewStatus) + '<br><strong>자동 선별 상태</strong> · ' + esc(candidateScreeningStatus(candidate)) + (candidate.screeningPriority ? " · 자동 우선순위 " + esc(candidate.screeningPriority) : "") + '<br><strong>자동 탐색 우선순위</strong> · ' + esc(candidateBucketLabel(candidate.bucket || "미분류")) + (candidate.score != null ? " · 자동 점수 " + esc(candidate.score) : "") + '<br><strong>자동 신호 요약</strong> · ' + esc(candidateHumanSignals(candidate)) + '<br><strong>탐색 쿼리</strong> · ' + esc((candidate.queryLabels || []).join(" · ") || "자동 탐색") ;
        var followup = (candidate.queryLabels || []).includes("publication_followup") || (candidate.publicationTypes || []).some(function (type) { return /retract|correct/i.test(type); });
        var sourceUrl = candidateSourceUrl(candidate);
        var checklist = [
          ["경구·섭취 여부", (candidate.routeSignals || []).length ? "탐색 신호 있음 · 원문 확인" : "신호 없음 · 원문 확인"],
          ["개입 구분", (candidate.interventionSignals || []).length ? "탐색 신호 있음 · 순수 GABA 여부 확인" : "신호 없음 · 원문 확인"],
          ["연구 설계·대상", (candidate.studySignals || []).concat(candidate.subjectSignals || []).length ? "탐색 신호 있음 · 방법 확인" : "신호 없음 · 원문 확인"],
          ["철회·정정·우려표명", followup ? "후속조치 신호 있음 · 원 논문과 연결" : "신호 없음 · 출판사 공지 확인"],
          ["식별자·원문", sourceUrl ? "링크 있음 · 전문 확인" : "링크 없음 · 식별자부터 확인"]
        ];
        el("candidate-detail-checklist").innerHTML = '<h3>공개 근거 승격 전 확인 순서</h3><ul>' + checklist.map(function (item) { return '<li><strong>' + esc(item[0]) + '</strong><span>' + esc(item[1]) + '</span></li>'; }).join("") + '</ul>';
        el("candidate-detail-abstract").textContent = candidate.abstract || "초록이 수집되지 않았습니다. 원문 식별자를 통해 확인하세요.";
        el("candidate-detail-actions").innerHTML = (sourceUrl ? '<a href="' + esc(sourceUrl) + '" target="_blank" rel="noopener noreferrer">' + esc(candidateSourceLabel(candidate)) + ' 확인 ↗</a>' : "") + '<button type="button" data-copy-candidate-link="' + esc(candidate.candidateId || "") + '">후보 검토 링크 복사</button><button class="secondary" type="button" data-candidate-review-status="검토 완료" data-candidate-review-id="' + esc(candidate.candidateId || "") + '" aria-pressed="' + String(reviewStatus === "검토 완료") + '">검토 완료 표시</button><button class="secondary" type="button" data-candidate-review-status="자료 필요" data-candidate-review-id="' + esc(candidate.candidateId || "") + '" aria-pressed="' + String(reviewStatus === "자료 필요") + '">자료 필요 표시</button>';
        candidateDetailReturnFocus = document.activeElement && typeof document.activeElement.matches === "function" && document.activeElement.matches("[data-candidate-detail]") ? document.activeElement : null;
        candidateDetailReturnFocusId = String(candidate.candidateId || candidateId || "");
        if (typeof dialog.showModal === "function") dialog.showModal(); else dialog.setAttribute("open", "");
        el("candidate-detail-close").focus();
      }

      function closeCandidateDetail() {
        var dialog = el("candidate-detail-dialog");
        if (dialog && typeof dialog.close === "function" && dialog.open) dialog.close();
        else if (dialog) dialog.removeAttribute("open");
        if (urlCandidateId) {
          urlCandidateId = "";
          persistUrl("replace");
        }
        var returnFocus = candidateDetailReturnFocus;
        var returnFocusId = candidateDetailReturnFocusId;
        candidateDetailReturnFocus = null;
        candidateDetailReturnFocusId = "";
        if ((!returnFocus || !returnFocus.isConnected) && returnFocusId) {
          var fallbackFocus = Array.prototype.find.call(document.querySelectorAll("[data-candidate-detail]"), function (button) {
            return String(button.dataset.candidateDetail || "") === returnFocusId;
          });
          returnFocus = fallbackFocus || null;
        }
        if (returnFocus && returnFocus.isConnected && typeof returnFocus.focus === "function") returnFocus.focus();
      }

      function exportCandidatePreview() {
        var candidates = DB.meta.discovery?.candidateExport || DB.meta.discovery?.candidatePreview || [];
        var activeFilter = el("candidate-preview")?.dataset.filter || "all";
        candidates = filterCandidatePreviewRecords(candidates, activeFilter);
        if (!candidates.length) { toast("내보낼 후보가 없습니다"); return; }
        var headers = ["후보 ID", "수집일", "자동 탐색 우선순위", "수동 검토 상태", "수동 우선순위", "제목", "저자", "저널", "연도", "PMID", "DOI", "검토 권고", "경로 신호", "개입 신호", "대상 신호", "설계 신호", "자동 제외 신호", "탐색 쿼리", "원문 링크"];
        var rows = candidates.map(function (candidate) {
          return [candidate.candidateId, candidate.collectedDate, candidate.bucket, candidateReviewStatus(candidate), candidate.screeningPriority || "", candidate.title, candidate.author, candidate.journal, candidate.year, candidate.pmid, candidate.doi, candidate.screeningRecommendation, (candidate.routeSignals || []).join(" · "), (candidate.interventionSignals || []).join(" · "), (candidate.subjectSignals || []).join(" · "), (candidate.studySignals || []).join(" · "), (candidate.exclusionSignals || []).join(" · "), (candidate.queryLabels || []).join(" · "), candidateSourceUrl(candidate)].map(csvCell);
        });
        var csv = "\uFEFF" + [headers.map(csvCell).join(",")].concat(rows.map(function (row) { return row.join(","); })).join("\r\n");
        var blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
        var url = URL.createObjectURL(blob);
        var anchor = document.createElement("a");
        anchor.href = url;
        anchor.download = "gaba-candidate-queue-" + String(DB.meta.discovery?.snapshotDate || DB.meta.snapshotDate || "snapshot") + ".csv";
        document.body.appendChild(anchor);
        anchor.click();
        anchor.remove();
        URL.revokeObjectURL(url);
        toast(candidates.length.toLocaleString("ko-KR") + "건의 후보 큐 CSV를 내보냈습니다");
      }

      function initMeta() {
        var discovery = DB.meta.discovery || {};
        var quality = DB.meta.dataQuality || {};
        var release = DB.meta.release || {};
        var screeningCounts = discovery.screeningCounts || {};
        var screeningSummary = ["미검토", "포함후보", "보류", "제외"].map(function (label) {
          return label + " " + Number(screeningCounts[label] || 0).toLocaleString("ko-KR");
        }).join(" · ");
        var identified = records.filter(function (record) {
          return record.kind !== "규제" && (record.pmid || record.doi);
        }).length;
        var sheetLink = el("sheet-link");
        if (DB.meta.sourceSheet) {
          sheetLink.href = DB.meta.sourceSheet;
          sheetLink.hidden = false;
        }
        el("snapshot-label").textContent = "검증 스냅샷 " + koreanDate(DB.meta.snapshotDate);
        var distributionScope = el("distribution-scope");
        if (distributionScope) distributionScope.textContent = "전체 검증 인덱스 " + Number(DB.meta.total || 0).toLocaleString("ko-KR") + "건 기준";
        updateFreshnessLabel(DB.meta.snapshotDate, discovery.snapshotDate);
        el("coverage-label").textContent = DB.meta.minYear + "–" + DB.meta.maxYear + "년";
        el("metric-total").textContent = countText(DB.meta.literature || DB.meta.total);
        el("metric-clinical").textContent = countText(DB.meta.clinical);
        el("metric-animal").textContent = countText(DB.meta.animal);
        el("metric-scie").textContent = countText(DB.meta.scie);
        el("metric-pdf").textContent = countText(DB.meta.drivePdf);
        el("metric-regulatory").textContent = Number(DB.meta.regulatory || 0).toLocaleString("ko-KR") + "건";
        el("metric-candidates").textContent = Number(discovery.stagedCandidates || 0).toLocaleString("ko-KR") + "건";
        el("metric-identifiers").textContent = DB.meta.literature
          ? Math.round(identified / DB.meta.literature * 100).toLocaleString("ko-KR") + "%"
          : "-";
        el("intelligence-clinical").textContent = countText(DB.meta.clinical);
        el("intelligence-regulatory").textContent = Number(DB.meta.regulatory || 0).toLocaleString("ko-KR") + "건";
        el("intelligence-source").textContent = DB.meta.literature
          ? Math.round(identified / DB.meta.literature * 100).toLocaleString("ko-KR") + "%"
          : "-";
        el("intelligence-clinical-copy").textContent = "사람을 대상으로 한 섭취 연구 · " + (DB.meta.clinical || 0).toLocaleString("ko-KR") + "편";
        el("intelligence-regulatory-copy").textContent = "공식 규제·안전성 자료 · " + (DB.meta.regulatory || 0).toLocaleString("ko-KR") + "건";
        el("intelligence-source-copy").textContent = "PMID 또는 DOI 확인 문헌 비율";
        var candidateLink = el("candidate-link");
        var candidateUrl = discovery.candidateSheet || DB.meta.sourceSheet;
        if (candidateUrl) {
          candidateLink.href = candidateUrl;
          candidateLink.hidden = false;
        }
        el("discovery-copy").textContent = discovery.disclaimer
          || "자동 탐색 후보는 검증 자료와 분리하며, 최종 판정 후에만 공개 인덱스로 승격합니다.";
        el("discovery-stats").innerHTML = [
          ["탐색일", koreanDate(discovery.snapshotDate || DB.meta.snapshotDate)],
          ["현재 운영 코드 기준(런타임)", release.currentCodeDeployment ? "Sites v" + Number(release.currentCodeDeployment.siteVersion || 0) + (release.currentCodeDeployment.publicMirrorCommit ? " · GitHub " + String(release.currentCodeDeployment.publicMirrorCommit).slice(0, 7) : "") : "확인 필요"],
          ["마지막 완전 검증 릴리스", release.snapshotVersion ? "데이터 v" + Number(release.snapshotVersion) + " · Sites v" + Number(release.siteVersion || 0) + (release.publicMirrorCommit ? " · GitHub " + String(release.publicMirrorCommit).slice(0, 7) : "") : "확인 필요"],
          ["PubMed", Number(discovery.pubmedUnique || 0).toLocaleString("ko-KR") + "건"],
          ["OpenAlex", Number(discovery.openAlexRetrieved || 0).toLocaleString("ko-KR") + "건"],
          ["Crossref", Number(discovery.crossrefRetrieved || 0).toLocaleString("ko-KR") + "건"],
          ["통합 고유", Number(discovery.mergedUnique || 0).toLocaleString("ko-KR") + "건"],
          ["이번 갱신 변화", discoveryDeltaLabel(discovery.delta) + " (총량 변화 · 확정 인덱스 아님)"],
          ["자동 우선검토", Number(discovery.priority || 0).toLocaleString("ko-KR") + "건"],
          ["수동 검토 상태", discovery.screeningCounts ? screeningSummary : "확인 필요"],
          ["수동 판정 연결 / 보존", Number(discovery.manualDecisionsMatched || 0).toLocaleString("ko-KR") + " / " + Number(discovery.manualDecisionsPreserved || 0).toLocaleString("ko-KR") + "건"],
          ["원천 오류", Number((discovery.sourceErrors || []).length).toLocaleString("ko-KR") + "건"],
          ["중복 식별자", Number((quality.duplicateDois || 0) + (quality.duplicatePmids || 0)).toLocaleString("ko-KR") + "건"],
          ["원문 감사", DB.meta.linkAudit ? "해소 " + Number(DB.meta.linkAudit.resolved || 0).toLocaleString("ko-KR") + "건 · 제한 " + Number(DB.meta.linkAudit.blockedCount || 0).toLocaleString("ko-KR") + "건 · 실패 " + Number(DB.meta.linkAudit.failed || 0).toLocaleString("ko-KR") + "건" : "실행 기록 없음"],
          ["감사 시점", DB.meta.linkAudit ? koreanDateTime(DB.meta.linkAudit.checkedAt) : "확인 필요"],
          ["감사 신선도", linkAuditFreshnessLabel(DB.meta.linkAudit)]
        ].map(function (item) {
          return '<span class="discovery-stat">' + esc(item[0]) + " " + esc(item[1]) + '</span>';
        }).join("");
        var auditNote = el("link-audit-note");
        var auditNoteWrap = el("link-audit-note-wrap");
        if (auditNote && auditNoteWrap && DB.meta.linkAudit) {
          auditNote.textContent = DB.meta.linkAudit.note || "원문 감사는 링크 접근성만 점검하며, 접근 제한·일시 응답·페이지 오류는 근거 약함을 뜻하지 않습니다.";
          auditNoteWrap.hidden = false;
        }
        syncAuditFilterOptions();
        syncFreshnessFilterOptions();
        renderCandidatePreview(discovery.candidatePreview || []);
        renderIntelligenceFeed();
        renderPortalLanes();
        renderReviewQueue();
        el("footer-snapshot").textContent = "게시 스냅샷: " + koreanDate(DB.meta.snapshotDate) + " · 문헌 " + countText(DB.meta.literature || DB.meta.total) + " · 규제자료 " + Number(DB.meta.regulatory || 0).toLocaleString("ko-KR") + "건";
        controls.from.min = DB.meta.minYear;
        controls.from.max = DB.meta.maxYear;
        controls.to.min = DB.meta.minYear;
        controls.to.max = DB.meta.maxYear;
        controls.from.value = state.from;
        controls.to.value = state.to;
        addOptions(controls.status, DB.facets.status);
        addOptions(controls.category, DB.facets.category || []);
        addOptions(controls.effectCategory, DB.facets.effectCategory || []);
        addOptions(controls.routeGroup, DB.facets.routeGroup || []);
        addOptions(controls.grade, DB.facets.grade || []);
        addOptions(controls.agency, DB.facets.agency || []);
        addOptions(controls.safetyArea, DB.facets.safetyArea || []);
        addOptions(controls.sci, DB.facets.sciGroup);
        addOptions(controls.species, DB.facets.species);
        addOptions(controls.topic, DB.facets.topic);
        addOptions(controls.extraction, DB.facets.extraction);
        addOptions(controls.direction, DB.facets.direction);
      }

      function renderDistribution(targetId, items, field) {
        var target = el(targetId);
        var visible = items.slice(0, 4);
        var extra = items.slice(4);
        var total = items.reduce(function (sum, item) { return sum + item.value; }, 0);
        var colors = ["#0f766e", "#2563eb", "#b7791f", "#b42318", "#7c3aed", "#0f766e", "#2563eb", "#b7791f"];
        var renderItem = function (item, index, hidden) {
          var percent = total ? (item.value / total * 100).toFixed(1) : "0.0";
          return '<button class="distribution-item' + (hidden ? ' distribution-item-extra' : '') + '" type="button"' + (hidden ? ' hidden' : '') + ' data-distribution-field="' + esc(field) + '" data-distribution-value="' + esc(item.label) + '" style="--distribution-color:' + colors[index % colors.length] + ';--distribution-percent:' + percent + '" aria-label="' + esc(item.label + " " + item.value + "건, 전체의 " + percent + "% 필터") + '">' +
            '<span class="distribution-ring" aria-hidden="true"><span class="distribution-percent">' + percent + '%</span></span>' +
            '<span><span class="distribution-label">' + esc(item.label) + '</span><span class="distribution-value">' + item.value.toLocaleString("ko-KR") + '건</span></span></button>';
        };
        target.innerHTML = visible.map(function (item, index) { return renderItem(item, index, false); }).join("") +
          extra.map(function (item, index) { return renderItem(item, index + visible.length, true); }).join("") +
          (extra.length ? '<button class="distribution-more" type="button" data-distribution-more="' + esc(targetId) + '" aria-expanded="false">전체 분포 보기 (' + extra.length.toLocaleString("ko-KR") + '개)</button>' : '');
      }

      function syncDistributionSelection() {
        document.querySelectorAll("[data-distribution-field]").forEach(function (button) {
          var active = state[button.dataset.distributionField] === button.dataset.distributionValue;
          button.classList.toggle("active", active);
          button.setAttribute("aria-pressed", String(active));
        });
      }

      function loadUrlState() {
        var params = new URLSearchParams(location.search);
        var requestedCandidateFilter = params.get("candidate") || "all";
        candidatePreviewFilter = ["all", "priority", "followup", "reviewed", "unreviewed"].includes(requestedCandidateFilter)
          ? requestedCandidateFilter
          : "all";
        candidatePreviewNeedsFocus = candidatePreviewFilter !== "all";
        state = {
           q: "", kind: "", category: "", effectCategory: "", status: "", marketing: "", intervention: "", routeGroup: "", followup: "", sci: "", species: "", topic: "",
          grade: "", agency: "", safetyArea: "", extraction: "", direction: "", source: "", audit: "", freshness: "", from: DB.meta.minYear,
          to: DB.meta.maxYear, sort: "latest", page: 1
        };
        pageSize = 20;
        ["q", "kind", "category", "effectCategory", "status", "marketing", "intervention", "routeGroup", "followup", "grade", "agency", "safetyArea", "sci", "species", "topic", "extraction", "direction", "source", "audit", "freshness", "sort"].forEach(function (key) {
          if (params.has(key)) state[key] = params.get(key) || "";
        });
        if (params.has("from")) state.from = Math.max(DB.meta.minYear, Number(params.get("from")) || DB.meta.minYear);
        if (params.has("to")) state.to = Math.min(DB.meta.maxYear, Number(params.get("to")) || DB.meta.maxYear);
        if (state.from > state.to) {
          var boundedFrom = state.from;
          state.from = state.to;
          state.to = boundedFrom;
        }
        if (["20", "50", "100"].includes(params.get("pageSize"))) pageSize = Number(params.get("pageSize"));
        if (params.has("compare")) {
          var requestedCompareIds = String(params.get("compare") || "").split(",").map(function (id) { return id.trim(); }).filter(Boolean);
          compareIds = requestedCompareIds.filter(function (id, index) {
            return index < 4 && records.some(function (record) { return String(record.id) === id; });
          });
          saveCompareIds();
        }
        if (params.has("read")) {
          urlReadingIds = String(params.get("read") || "").split(",").map(function (id) { return id.trim(); }).filter(Boolean).filter(function (id, index) {
            return index < 50 && records.some(function (record) { return String(record.id) === id; });
          });
          readingIds = urlReadingIds.slice();
          saveReadingIds();
        } else {
          urlReadingIds = [];
        }
        if (params.has("review")) {
          reviewQueueFilter = reviewQueueFilterLabels[params.get("reviewFilter")] ? params.get("reviewFilter") : "all";
          var requestedReviewIds = String(params.get("review") || "").split(",").map(function (id) { return id.trim(); }).filter(Boolean).slice(0, 50);
          sharedReviewIds = requestedReviewIds.filter(function (id) {
            return records.some(function (record) { return String(record.id) === id; });
          });
          sharedReviewMissingCount = requestedReviewIds.length - sharedReviewIds.length;
          sharedReviewNeedsFocus = sharedReviewIds.length > 0;
        } else {
          reviewQueueFilter = "all";
          sharedReviewIds = [];
          sharedReviewMissingCount = 0;
          sharedReviewNeedsFocus = false;
        }
        urlRecordId = params.get("record") || "";
        urlCandidateId = params.get("candidateId") || "";
      }

      function syncControls() {
        Object.keys(controls).forEach(function (key) {
          if (controls[key]) controls[key].value = key === "pageSize" ? String(pageSize) : state[key];
        });
        document.querySelectorAll("[data-kind]").forEach(function (button) {
          setActiveToggle(button, button.dataset.kind === state.kind);
        });
        document.querySelectorAll("[data-category]").forEach(function (button) {
          setActiveToggle(button, button.dataset.category === state.category);
        });
        document.querySelectorAll("[data-effect-category]").forEach(function (button) {
          setActiveToggle(button, button.dataset.effectCategory === state.effectCategory);
        });
        document.querySelectorAll("[data-marketing]").forEach(function (button) {
          setActiveToggle(button, button.dataset.marketing === state.marketing);
        });
        document.querySelectorAll("[data-intervention]").forEach(function (button) {
          setActiveToggle(button, button.dataset.intervention === state.intervention);
        });
        document.querySelectorAll("[data-followup]").forEach(function (button) {
          setActiveToggle(button, button.dataset.followup === state.followup);
        });
        document.querySelectorAll("[data-direction]").forEach(function (button) {
          setActiveToggle(button, button.dataset.direction === state.direction);
        });
        document.querySelectorAll("[data-preset]").forEach(function (button) {
          setActiveToggle(button, button.dataset.preset === activePreset());
        });
        syncQuickDisclosure();
      }

      function syncQuickDisclosure() {
        var activeAdvanced = 0;
        document.querySelectorAll("[data-quick-summary]").forEach(function (summary) {
          var key = summary.dataset.quickSummary;
          var base = { effectCategory: "분야 더보기", marketing: "활용 판단", intervention: "개입 구분", followup: "출판 후속조치", direction: "결과 방향" }[key] || "추가 필터";
          var active = Boolean(state[key]);
          if (active) activeAdvanced += 1;
          summary.textContent = active ? base + " · 선택" : base;
          summary.classList.toggle("has-filter", active);
          summary.setAttribute("aria-label", active ? base + " 필터 선택됨" : base + " 필터");
        });
        var advancedSummary = document.querySelector("[data-quick-advanced-summary]");
        if (advancedSummary) {
          advancedSummary.textContent = activeAdvanced ? "추가 필터 · " + activeAdvanced + "개 선택" : "추가 필터";
          advancedSummary.classList.toggle("has-filter", activeAdvanced > 0);
          advancedSummary.setAttribute("aria-label", activeAdvanced ? "추가 필터 " + activeAdvanced + "개 선택됨" : "추가 필터, 선택 없음");
        }
      }

      function activePreset() {
        if (state.q || state.from !== DB.meta.minYear || state.to !== DB.meta.maxYear || state.sort !== "latest") return "";
        var common = ["category", "effectCategory", "marketing", "intervention", "followup", "grade", "agency", "safetyArea", "sci", "species", "topic", "extraction", "direction"];
        if (state.kind === "임상" && state.status === "포함" && state.intervention === "순수 GABA 섭취" && !state.source) return "human-direct";
        if (common.some(function (key) { return state[key]; })) return "";
        if (state.kind === "임상" && !state.status && !state.source) return "clinical";
        if (state.kind === "규제" && !state.status && !state.source) return "regulatory";
        if (state.source === "available" && !state.kind && !state.status) return "source";
        if (state.audit === "unavailable" && !state.freshness && !state.kind && !state.status) return "audit-unavailable";
        if (state.status === "후보" && !state.kind && !state.source) return "review";
        return "";
      }

      function applyPreset(name, preserveQuery) {
        var preservedQuery = preserveQuery ? state.q : "";
        var keys = ["q", "kind", "category", "effectCategory", "status", "marketing", "intervention", "routeGroup", "followup", "sci", "species", "topic", "grade", "agency", "safetyArea", "extraction", "direction", "source", "audit", "freshness", "from", "to", "sort"];
        keys.forEach(function (key) {
          if (key === "from") state[key] = DB.meta.minYear;
          else if (key === "to") state[key] = DB.meta.maxYear;
          else if (key === "sort") state[key] = "latest";
          else state[key] = "";
        });
        if (preserveQuery) state.q = preservedQuery;
        if (name === "clinical") state.kind = "임상";
        if (name === "human-direct") {
          state.kind = "임상";
          state.status = "포함";
          state.intervention = "순수 GABA 섭취";
        }
        if (name === "animal") state.kind = "동물";
        if (name === "oral") state.routeGroup = "경구·섭취";
        if (name === "regulatory") state.kind = "규제";
        if (name === "source") state.source = "available";
        if (name === "audit-unavailable") state.audit = "unavailable";
        if (name === "review") state.status = "후보";
        state.page = 1;
        render("push");
        scrollToResults();
      }

      function persistUrl(historyMode) {
        var params = new URLSearchParams();
        ["q", "kind", "category", "effectCategory", "status", "marketing", "intervention", "routeGroup", "followup", "grade", "agency", "safetyArea", "sci", "species", "topic", "extraction", "direction", "source", "audit", "freshness"].forEach(function (key) {
          if (state[key]) params.set(key, state[key]);
        });
        if (state.from !== DB.meta.minYear) params.set("from", state.from);
        if (state.to !== DB.meta.maxYear) params.set("to", state.to);
        if (state.sort !== "latest") params.set("sort", state.sort);
        if (pageSize !== 20) params.set("pageSize", pageSize);
        if (compareIds.length) params.set("compare", compareIds.join(","));
        if (urlReadingIds.length) params.set("read", urlReadingIds.join(","));
        if (sharedReviewIds.length) params.set("review", sharedReviewIds.join(","));
        if (sharedReviewIds.length && reviewQueueFilter !== "all") params.set("reviewFilter", reviewQueueFilter);
        if (candidatePreviewFilter !== "all") params.set("candidate", candidatePreviewFilter);
        if (urlRecordId) params.set("record", urlRecordId);
        if (urlCandidateId) params.set("candidateId", urlCandidateId);
        var query = params.toString();
        var method = historyMode === "push" ? "pushState" : "replaceState";
        history[method](null, "", location.pathname + (query ? "?" + query : ""));
      }

      function recordSearchText(record) {
        return normalize([
          record.id, record.title, record.author, record.journal, record.doi, record.pmid, record.clinicalTrialId,
          record.population, record.model, record.form, record.dose, record.route,
          record.domain, record.outcome, record.finding, record.safety, record.limitation,
          record.notes, record.species, record.topic, record.direction, record.titleKo,
          record.summaryKo, record.grade, record.agency, record.country, record.documentType,
          record.safetyArea, record.ingredientKo, record.ingredientEn, record.useQuestion,
          record.identity, record.useMatch, record.subject, record.exposure, record.safetyFinding,
          record.noael, record.adverse, record.quality, record.guidelines, record.recognition
        ].join(" "));
      }
      function humanSourcePriority(record) {
        var score = 0;
        if (record.kind === "임상") score += 4;
        if (record.status === "포함") score += 2;
        if (record.hasDrivePdf) score += 2;
        else if (hasSourceLink(record)) score += 1;
        if (record.extraction === "완료") score += 1;
        if (interventionClass(record) === "순수 GABA 섭취") score += 1;
        if (publicationFollowupLabel(record)) score -= 2;
        return score;
      }
      records.forEach(function (record) { record._search = recordSearchText(record); });

      var KOREAN_SEARCH_TERMS = {
        "수면": ["sleep", "insomnia"], "불면": ["insomnia", "sleep"],
        "혈압": ["blood pressure", "hypertension"], "고혈압": ["hypertension", "blood pressure"],
        "불안": ["anxiety"], "스트레스": ["stress"], "릴렉세이션": ["relaxation", "relax", "calmness", "stress"],
        "이완": ["relaxation", "relax", "calmness"], "긴장완화": ["relaxation", "stress", "calmness"],
        "진정": ["calmness", "calming", "relaxation"], "마음안정": ["calmness", "relaxation"], "기억": ["memory"],
        "인지": ["cognition", "cognitive"], "뇌": ["brain", "neural"],
        "안전성": ["safety", "tolerability"], "독성": ["toxicity", "toxicology"],
        "이상반응": ["adverse event", "side effect"], "간": ["liver", "hepatic"],
        "신장": ["kidney", "renal"], "혈당": ["glucose", "glycemic"],
        "당뇨": ["diabetes"], "체중": ["body weight"], "비만": ["obesity"],
        "염증": ["inflammation", "inflammatory"], "면역": ["immune", "immunological"],
        "항산화": ["antioxidant", "oxidative"], "장건강": ["gut", "intestinal", "gastrointestinal", "microbiome"],
        "소화": ["digestive", "gastrointestinal"], "알레르기": ["allergy", "allergenicity"],
        "섭취": ["intake", "ingestion", "oral"], "노출": ["exposure", "dietary"],
        "원료": ["ingredient"], "한시적": ["temporary", "provisional", "novel food"],
        "인정": ["approval", "authorization", "recognition"], "식약처": ["mfds", "ministry of food and drug safety"],
        "캐나다": ["canada", "health canada"], "심혈관": ["cardiovascular"],
        "심박": ["heart rate"], "통증": ["pain"], "피로": ["fatigue"],
        "근육": ["muscle"], "성장": ["growth"], "사료": ["feed", "diet"],
        "닭": ["chicken", "poultry", "broiler"], "돼지": ["pig", "swine", "porcine"],
        "소": ["cattle", "bovine"], "생쥐": ["mouse", "mice", "murine"],
        "쥐": ["rat", "rats", "rodent"], "물고기": ["fish"]
      };
      function expandQueryToken(token) {
          var terms = [token];
          Object.keys(KOREAN_SEARCH_TERMS).forEach(function (key) {
            if (token === key || (key.length > 1 && (token.includes(key) || key.includes(token)))) {
              terms = terms.concat(KOREAN_SEARCH_TERMS[key]);
            }
          });
          return Array.from(new Set(terms.map(normalize).filter(Boolean)));
      }
      function parseDoseRange(token) {
        var match = String(token || "").match(/^(\d+(?:\.\d+)?)\s*(?:~|–|-|to)\s*(\d+(?:\.\d+)?)\s*mg(?:\/day)?$/i);
        if (!match) return null;
        var from = Number(match[1]);
        var to = Number(match[2]);
        return { from: Math.min(from, to), to: Math.max(from, to) };
      }
      function queryPlan(value) {
        var positive = [];
        var negative = [];
        var doseRanges = [];
        var expression = /(-?)"([^"]+)"|(-?)([^\s"]+)/g;
        var normalizedValue = String(value || "").replace(/(\d+(?:\.\d+)?)\s*(?:~|–|-|to)\s*(\d+(?:\.\d+)?)\s+mg(?=\/day|\b)/gi, "$1~$2mg");
        var match;
        while ((match = expression.exec(normalizedValue))) {
          var isNegative = (match[1] || match[3]) === "-";
          var token = normalize(match[2] || match[4]);
          if (!token) continue;
          var doseRange = parseDoseRange(token);
          if (doseRange && !isNegative) {
            doseRanges.push(doseRange);
            continue;
          }
          var group = match[2] ? [token] : expandQueryToken(token);
          (isNegative ? negative : positive).push(group);
        }
        return { positive: positive, negative: negative, doseRanges: doseRanges };
      }

      function hasSourceLink(record) {
        return Boolean(record.hasDrivePdf || record.fulltextUrl || record.sourceUrl || record.decisionUrl || record.doiUrl || record.pubmedUrl);
      }
      function primarySourceUrl(record) {
        return record.kind === "규제"
          ? (record.sourceUrl || record.decisionUrl || record.fulltextUrl || record.doiUrl || record.pubmedUrl)
          : (record.fulltextUrl || record.doiUrl || record.pubmedUrl || record.sourceUrl || record.decisionUrl);
      }
      function primarySourceLabel(record) {
        if (record.kind === "규제" && record.sourceUrl) return "공식 규제 원문";
        if (record.hasDrivePdf) return "Drive 원문";
        if (record.fulltextUrl) return "출판사 원문";
        if (record.doiUrl) return "DOI 원문";
        if (record.pubmedUrl) return "PubMed 원문";
        if (record.sourceUrl) return "원문 링크";
        if (record.decisionUrl) return "결정문";
        return "원문 확인";
      }
      function sourceAuditRecord(record) {
        var statuses = DB.meta && DB.meta.linkAudit && Array.isArray(DB.meta.linkAudit.recordStatuses) ? DB.meta.linkAudit.recordStatuses : [];
        return statuses.find(function (item) { return String(item.id) === String(record.id); }) || null;
      }
      function kstDayStart(value) {
        var raw = String(value || "");
        var parsed = value instanceof Date ? value : new Date(/^\d{4}-\d{2}-\d{2}$/.test(raw) ? raw + "T00:00:00+09:00" : raw);
        if (Number.isNaN(parsed.getTime())) return NaN;
        var parts = new Intl.DateTimeFormat("en-CA", {
          timeZone: "Asia/Seoul",
          year: "numeric",
          month: "2-digit",
          day: "2-digit"
        }).formatToParts(parsed);
        var values = {};
        parts.forEach(function(part) { values[part.type] = part.value; });
        return Date.UTC(Number(values.year), Number(values.month) - 1, Number(values.day));
      }
      function linkAuditFreshnessLabel(audit) {
        if (!audit || !audit.checkedAt) return "확인 필요";
        var startToday = kstDayStart(new Date());
        var startChecked = kstDayStart(audit.checkedAt);
        if (Number.isNaN(startToday) || Number.isNaN(startChecked)) return "확인 필요";
        var days = Math.max(0, Math.floor((startToday - startChecked) / 86400000));
        return days <= 7 ? "최근 확인 (" + days.toLocaleString("ko-KR") + "일 전)" : "재감사 권고 (" + days.toLocaleString("ko-KR") + "일 전)";
      }
      function syncAuditFilterOptions() {
        var select = el("audit");
        if (!select) return;
        var counts = { ok: 0, unavailable: 0, missing: 0 };
        records.forEach(function (record) {
          var audit = sourceAuditRecord(record);
          if (!audit) counts.missing += 1;
          else if (audit.status === "ok") counts.ok += 1;
          else counts.unavailable += 1;
        });
        var labels = {
          ok: "감사 시점 접근 확인",
          unavailable: "접근 제한·일시 응답·페이지 오류",
          missing: "개별 감사 기록 없음"
        };
        Object.keys(labels).forEach(function (value) {
          var option = select.querySelector('option[value="' + value + '"]');
          if (option) option.textContent = labels[value] + " (" + counts[value].toLocaleString("ko-KR") + "건)";
        });
      }
      function freshnessBucket(record) {
        var checked = new Date(String(record.checked || "") + "T00:00:00");
        if (Number.isNaN(checked.getTime())) return "unknown";
        var today = new Date();
        var days = Math.max(0, Math.floor((Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()) - Date.UTC(checked.getFullYear(), checked.getMonth(), checked.getDate())) / 86400000));
        return days <= 90 ? "recent" : "stale";
      }
      function syncFreshnessFilterOptions() {
        var select = el("freshness");
        if (!select) return;
        var counts = { recent: 0, stale: 0, unknown: 0 };
        records.forEach(function (record) { counts[freshnessBucket(record)] += 1; });
        var labels = { recent: "최근 확인 (90일 이내)", stale: "재확인 권고 (90일 초과)", unknown: "확인일 미상" };
        Object.keys(labels).forEach(function (value) {
          var option = select.querySelector('option[value="' + value + '"]');
          if (option) option.textContent = labels[value] + " (" + counts[value].toLocaleString("ko-KR") + "건)";
        });
      }
      function sourceAuditDescription(record) {
        var audit = sourceAuditRecord(record);
        if (!audit) return "개별 감사 기록 없음 · 링크와 원문을 직접 확인하세요.";
        if (audit.status === "ok") return "감사 시점 기준 접근 응답 확인 · " + audit.attempts + "개 경로 확인";
        if (audit.status === "unavailable") return "접근 제한·일시 응답·페이지 오류 포함 · 대체 경로와 원문을 직접 확인하세요. 이는 근거 약함을 뜻하지 않습니다.";
        return "원문 링크 재확인 필요 · 링크 오류가 근거의 질을 뜻하지 않습니다.";
      }
      function sourceAuditBadge(record) {
        var audit = sourceAuditRecord(record);
        if (!audit || audit.status === "ok") return "";
        return '<span class="badge source-audit-badge" title="접근 제한·일시 응답·페이지 오류는 근거 약함을 뜻하지 않습니다.">원문 접근 제한</span>';
      }

      function recordDoseValues(record) {
        return [record.dose, record.exposure].join(" ")
          .match(/\d+(?:\.\d+)?\s*mg(?:\s*\/\s*(?:day|d))?/gi);
      }

      function doseMatchesRange(record, range) {
        var values = recordDoseValues(record) || [];
        return values.some(function (value) {
          var amount = Number(String(value).match(/\d+(?:\.\d+)?/)[0]);
          return amount >= range.from && amount <= range.to;
        });
      }

      function filteredRecords() {
        var plan = queryPlan(state.q);
        var list = records.filter(function (record) {
          if (plan.positive.length && !plan.positive.every(function (group) {
            return group.some(function (term) { return record._search.includes(term); });
          })) return false;
          if (plan.negative.some(function (group) {
            return group.some(function (term) { return record._search.includes(term); });
          })) return false;
          if (plan.doseRanges.length && !plan.doseRanges.every(function (range) {
            return doseMatchesRange(record, range);
          })) return false;
          if (state.kind && record.kind !== state.kind) return false;
          if (state.category && record.category !== state.category) return false;
          if (state.effectCategory && record.effectCategory !== state.effectCategory) return false;
          if (state.status && record.status !== state.status) return false;
          if (state.marketing && marketingLabel(record) !== state.marketing) return false;
          if (state.intervention && interventionClass(record) !== state.intervention) return false;
          if (state.routeGroup && (record.routeGroup || "미기록") !== state.routeGroup) return false;
          if (state.followup === "signal" && !publicationFollowupLabel(record)) return false;
          if (state.grade && record.grade !== state.grade) return false;
          if (state.agency && record.agency !== state.agency) return false;
          if (state.safetyArea && record.safetyArea !== state.safetyArea) return false;
          if (state.sci && record.sciGroup !== state.sci) return false;
          if (state.species && record.species !== state.species) return false;
          if (state.topic && record.topic !== state.topic) return false;
          if (state.extraction && record.extraction !== state.extraction) return false;
          if (state.direction && record.direction !== state.direction) return false;
          if (record.year < state.from || record.year > state.to) return false;
          if (state.source === "available" && !hasSourceLink(record)) return false;
          if (state.source === "drive" && !record.hasDrivePdf) return false;
          if (state.source === "link" && (record.hasDrivePdf || !hasSourceLink(record))) return false;
          if (state.source === "none" && hasSourceLink(record)) return false;
          var audit = state.audit ? sourceAuditRecord(record) : null;
          if (state.audit === "ok" && (!audit || audit.status !== "ok")) return false;
          if (state.audit === "unavailable" && (!audit || audit.status === "ok")) return false;
          if (state.audit === "missing" && audit) return false;
          if (state.freshness && freshnessBucket(record) !== state.freshness) return false;
          return true;
        });
        list.sort(function (a, b) {
          var aTitle = a.titleKo || a.title;
          var bTitle = b.titleKo || b.title;
          if (state.sort === "oldest") return a.year - b.year || aTitle.localeCompare(bTitle, "ko");
          if (state.sort === "title") return aTitle.localeCompare(bTitle, "ko") || b.year - a.year;
          if (state.sort === "updated") return String(b.checked).localeCompare(String(a.checked)) || b.year - a.year;
          if (state.sort === "human-source") return humanSourcePriority(b) - humanSourcePriority(a) || b.year - a.year || aTitle.localeCompare(bTitle, "ko");
          if (state.sort === "review-priority") return recordReviewPriorityScore(b) - recordReviewPriorityScore(a) || String(a.checked || "").localeCompare(String(b.checked || "")) || b.year - a.year || aTitle.localeCompare(bTitle, "ko");
          return b.year - a.year || aTitle.localeCompare(bTitle, "ko");
        });
        return list;
      }

      function recordReviewPriorityScore(record) {
        var missing = reviewChecklist(record).filter(function (item) { return !item[1]; }).map(function (item) { return item[0]; });
        var priority = reviewPriority({ record: record, missing: missing });
        return priority.key === "high" ? 3 : priority.key === "medium" ? 2 : 1;
      }

      function badgeClass(type, value) {
        if (type === "kind") return value === "임상" ? "clinical" : value === "동물" ? "animal" : "regulatory";
        if (type === "status") return value === "포함" || value === "유효" ? "include" : value === "후보" || value === "검토중" ? "candidate" : "exclude";
        if (type === "sci") return value === "SCIE" ? "scie" : "";
        if (type === "extraction") return value === "부분" ? "partial" : "include";
        if (type === "direction") return value === "유익" ? "benefit" : value === "혼재" ? "mixed" : value === "유해" ? "harm" : "";
        return "";
      }
      function interventionClass(record) {
        if (record.kind === "규제") return "규제·안전성 자료";
        var text = [record.title, record.form, record.ingredientKo, record.ingredientEn, record.notes, record.domain].filter(Boolean).join(" ");
        if (/프로바이오틱|유산균|발효|ferment|probiotic|GABA 생성/i.test(text)) return "GABA 생성 발효·프로바이오틱";
        if (/수용체|작용제|길항제|약물|muscimol|baclofen|receptor|agonist|antagonist|drug/i.test(text)) return "수용체 약물·작용제";
        if (/복합|혼합|추출물|with|plus|GABA.{0,100}\b(?:and|with|plus)\b/i.test(text)) return "복합제·복합개입";
        return "순수 GABA 섭취";
      }
      function interventionShortLabel(record) {
        return {
          "순수 GABA 섭취": "순수 GABA",
          "복합제·복합개입": "복합제·복합개입",
          "GABA 생성 발효·프로바이오틱": "발효·프로바이오틱",
          "수용체 약물·작용제": "수용체 약물",
          "규제·안전성 자료": "규제·안전성"
        }[interventionClass(record)] || interventionClass(record);
      }
      function renderInterventionCounts() {
        var counts = {};
        records.forEach(function (record) {
          var label = interventionClass(record);
          counts[label] = (counts[label] || 0) + 1;
        });
        document.querySelectorAll("[data-intervention-count]").forEach(function (node) {
          node.textContent = (counts[node.dataset.interventionCount] || 0).toLocaleString("ko-KR");
          node.setAttribute("aria-label", "전체 인덱스 기준 " + node.textContent + "건");
        });
      }
      function marketingLabel(record) {
        if (record.kind === "규제") return "규제 참고";
        if (record.status === "제외" || /철회|사용 금지/.test(record.direction || "")) return "마케팅 사용 금지";
        if (record.status === "후보" || record.extraction === "부분" || record.kind === "동물") return "조건부 검토";
        return "직접 근거 검토";
      }
      function marketingClass(record) {
        var label = marketingLabel(record);
        return label === "마케팅 사용 금지" ? "exclude" : label === "조건부 검토" ? "candidate" : label === "규제 참고" ? "regulatory" : "include";
      }
      function marketingFilterBadge(record) {
        var label = marketingLabel(record);
        return '<button class="badge ' + marketingClass(record) + ' marketing-filter-badge" type="button" data-marketing="' + esc(label) + '" aria-label="' + esc(label + ' 자료로 필터') + '">' + esc(label) + '</button>';
      }

      function detail(label, value) {
        if (!value) return "";
        return '<div class="detail-item"><dt>' + esc(label) + '</dt><dd>' + esc(value) + '</dd></div>';
      }
      function labeledNote(record, label, nextLabel) {
        var notes = String(record.notes || "");
        var marker = label + ":";
        var start = notes.indexOf(marker);
        if (start < 0) return "";
        var value = notes.slice(start + marker.length);
        if (nextLabel) {
          var next = value.indexOf(nextLabel + ":");
          if (next >= 0) value = value.slice(0, next);
        }
        return value.trim();
      }
      function researchMeaning(record) {
        var curated = labeledNote(record, "연구의 의미", "마케팅 활용 방안");
        if (curated) return curated;
        if (record.kind === "규제") {
          return "이 자료가 직접 보여주는 것은 " + (record.domain || "규제·안전성") + "에 관한 공식 기준 또는 선례입니다. 따라서 " + (record.useQuestion || "국내 적용 가능성을 검토할 때 참고할 기준") + "으로 해석할 수 있지만, 해외 자료가 국내 인정이나 안전성 판단을 자동으로 대신하지는 않습니다.";
        }
        var focus = [record.domain, record.outcome].filter(Boolean).join(" · ") || "주요 평가변수";
        var condition = [record.form, record.route, record.dose, record.duration].filter(Boolean).join(" · ") || "기록된 투여 조건";
        var status = record.status === "포함" ? "검토 가능한 직접 섭취 근거" : record.status === "후보" ? "추가 검증이 필요한 후보 근거" : "제한 또는 제외 사유를 함께 봐야 하는 근거";
        var finding = record.finding || record.summaryKo || "주요 결과가 충분히 추출되지 않았습니다.";
        var limitation = record.limitation ? " 한계는 " + record.limitation + "입니다." : " 다른 대상·제형·용량으로 자동 확대할 수 없습니다.";
        return "이 연구는 " + finding + " 따라서 " + focus + "에 대한 " + status + "이며, " + condition + " 조건에서 관찰된 결과로 해석해야 합니다." + limitation;
      }
      function evidenceBoundary(record) {
        var boundaries = [];
        if (record.kind === "동물") boundaries.push("동물·전임상 자료이므로 사람의 효능으로 직접 외삽하지 않습니다.");
        if (record.kind === "규제") boundaries.push("규제·안전성 자료는 기준과 검토 근거이며, 제품 효능이나 국내 허가를 자동으로 증명하지 않습니다.");
        if (record.status === "후보" || record.status === "보류" || record.extraction === "부분") boundaries.push("현재 기록만으로는 마케팅 문구에 사용하지 않고 원문 확인 후 판정을 갱신합니다.");
        if (record.status === "제외" || /철회|사용 금지/.test(record.direction || "")) boundaries.push("제외·철회 또는 사용 제한 신호가 있어 효능 근거로 재사용하지 않습니다.");
        var formText = [record.form, record.ingredientKo, record.ingredientEn, record.notes].filter(Boolean).join(" ");
        if (/복합|혼합|발효|프로바이오틱|약물|receptor|probiotic|ferment/i.test(formText)) boundaries.push("복합제·발효물·프로바이오틱·수용체 약물은 순수 GABA 섭취 근거와 분리해 해석합니다.");
        return boundaries.length ? boundaries.join(" ") : "기록된 대상·개입·조건의 범위 안에서만 해석하며, 다른 용량·기간·제품으로 자동 확대하지 않습니다.";
      }
      function citationText(record) {
        var parts = [record.author, record.title || koreanTitle(record), record.journal, record.year].filter(Boolean);
        var identifiers = [record.doi ? "DOI: " + record.doi : "", record.pmid ? "PMID: " + record.pmid : ""].filter(Boolean);
        return parts.join(". ") + (identifiers.length ? ". " + identifiers.join(" · ") : "") + ".";
      }
      function evidenceBriefText(record) {
        var source = primarySourceUrl(record);
        var audit = sourceAuditRecord(record);
        return [
          "GABA 근거 브리프",
          "자료: " + koreanTitle(record),
          "연구 유형: " + (record.kind || "미분류"),
          "근거 상태: " + (record.status || "미분류") + " · 추출 상태: " + (record.extraction || "미상"),
          "원문 접근: " + (audit ? auditLabel(audit.status) : "감사 기록 없음") + " · 확인일: " + (record.checked || "미상"),
          "핵심 결과: " + (record.finding || record.summaryKo || "주요 결과 미추출"),
          "해석 경계: " + evidenceBoundary(record),
          "연구의 의미: " + researchMeaning(record),
          "마케팅 활용 방안: " + utilizationDirection(record),
          citationText(record),
          "대표 원문: " + (source ? primarySourceLabel(record) + " · " + source : "확인된 대표 원문 링크 없음")
        ].join("\n\n");
      }
      function utilizationDirection(record) {
        var curated = labeledNote(record, "마케팅 활용 방안");
        if (curated) return curated;
        if (record.kind === "규제") {
          return "원료 동일성·제조공정·사용조건·노출량을 국내 기준과 대조하는 규제 검토 자료로 활용합니다. 필요한 제출자료와 추가 확인 항목을 함께 정리합니다.";
        }
        if (record.status === "제외") {
          return "제외 사유를 확인하는 품질관리 자료로만 활용하고, 공개 효능 근거 또는 광고 문구의 근거로 사용하지 않습니다.";
        }
        if (record.status === "후보" || record.extraction === "부분") {
          return "아직 마케팅 근거로 바로 사용하지 않습니다. 원문에서 직접 GABA 섭취 여부, 용량·기간·대조군·안전성·SCI/SCIE 상태를 확인한 뒤 인덱스 승격과 인용 가능성을 판단합니다.";
        }
        if (record.kind === "동물") {
          return "인체 연구의 가설 설정, 제품·시험 설계, 용량·노출 비교를 위한 전임상 자료로 활용합니다. 동물 결과를 인체 효능 문구로 직접 전환하지 않습니다.";
        }
        return "제품·표시·추가 연구를 검토할 때 대상·용량·기간이 실제 사용조건과 맞는지 비교 자료로 활용합니다. 여러 인체 연구와 안전성 자료를 함께 검토한 뒤 표현 범위를 정합니다.";
      }
      function renderIntelligenceFeed() {
        var target = el("intelligence-feed-list");
        if (!target) return;
        var source = records.filter(function (record) {
          if (intelligenceKind && record.kind !== intelligenceKind) return false;
          if (intelligenceReview === "direct" && record.status !== "포함") return false;
          if (intelligenceReview === "candidate" && record.status !== "후보") return false;
          if (intelligenceReview === "regulatory" && record.kind !== "규제") return false;
          if (intelligenceReview === "partial" && record.extraction !== "부분") return false;
          return true;
        });
        var latest = source.slice().sort(function (a, b) {
          return String(b.checked || "").localeCompare(String(a.checked || "")) || Number(b.year || 0) - Number(a.year || 0);
        }).slice(0, 3);
        target.innerHTML = latest.map(function (record) {
          var kind = record.kind === "규제" ? "규제·안전성" : record.kind === "임상" ? "인체 연구" : record.kind === "동물" ? "동물시험" : "근거 자료";
          var summary = record.finding || record.summaryKo || "주요 결과가 충분히 추출되지 않은 자료입니다.";
          return '<article class="intelligence-feed-card">' +
            '<span class="feed-kicker">' + esc(kind) + ' · ' + esc(record.year || "연도 미상") + '</span>' +
            '<h3>' + esc(koreanTitle(record)) + '</h3>' +
            '<p>' + esc(summary) + '</p>' +
            '<p class="feed-action"><strong>검토 포인트</strong> · ' + esc(utilizationDirection(record)) + '</p>' +
            '<button type="button" data-intelligence-id="' + esc(record.id) + '">상세 검토 →</button>' +
            '<button type="button" data-query="' + esc(record.domain || record.topic || "GABA") + '">관련 근거 검색 →</button>' +
            '</article>';
        }).join("");
        document.querySelectorAll("[data-intelligence-kind]").forEach(function (button) {
          setActiveToggle(button, button.dataset.intelligenceKind === intelligenceKind);
        });
        document.querySelectorAll("[data-intelligence-review]").forEach(function (button) {
          setActiveToggle(button, button.dataset.intelligenceReview === intelligenceReview);
        });
      }
      var PORTAL_LANES = [
        { title: "연구·임상", query: "GABA", description: "인체·동물 연구와 연구조건 비교", match: function (record) { return record.kind === "임상" || record.kind === "동물"; } },
        { title: "규제·안전", query: "안전성", description: "공식 규제자료와 안전성 검토", match: function (record) { return record.kind === "규제" || record.category === "안전성"; } },
        { title: "발효·생산", query: "발효", description: "발효 GABA·생산·기능성 식품", match: function (record) { return /발효|ferment|생산|production/i.test(record._search || ""); } },
        { title: "특허·기술", query: "특허", description: "특허·공정·기술 선행자료", match: function (record) { return /특허|patent|공정|strain|균주/i.test(record._search || ""); } },
        { title: "제품·활용", query: "원료", description: "원료·제품·마케팅 활용 검토", match: function (record) { return /제품|원료|marketing|마케팅|기능성 식품/i.test(record._search || ""); } }
      ];
      function renderPortalLanes() {
        var target = el("portal-lanes-list");
        if (!target) return;
        target.innerHTML = PORTAL_LANES.map(function (lane) {
          var count = records.filter(lane.match).length;
          var countLabel = count.toLocaleString("ko-KR") + "건";
          var note = count ? "현재 연결 자료" : "추가 조사 필요";
          return '<button class="portal-lane" type="button" data-query="' + esc(lane.query) + '">' +
            '<span><strong>' + esc(lane.title) + '</strong><p>' + esc(lane.description) + '</p></span>' +
            '<span class="portal-lane-meta"><span><span class="portal-lane-count">' + countLabel + '</span><br><span style="color:var(--muted);font-size:10px">' + note + '</span></span><span class="portal-lane-action">탐색 →</span></span>' +
            '</button>';
        }).join("");
      }
      function renderPortalLaneOverview(lane) {
        var panel = el("portal-lane-overview");
        if (!panel || !lane) return;
        activeLane = lane;
        var items = records.filter(lane.match).sort(function (a, b) {
          return String(b.checked || "").localeCompare(String(a.checked || "")) || Number(b.year || 0) - Number(a.year || 0);
        }).slice(0, 3);
        el("portal-lane-overview-title").textContent = lane.title + " 레인 개요";
        el("portal-lane-overview-copy").textContent = items.length
          ? "현재 연결된 " + records.filter(lane.match).length.toLocaleString("ko-KR") + "건 중 대표 자료입니다."
          : "현재 인덱스에 직접 연결된 자료가 부족해 추가 조사가 필요합니다.";
        el("portal-lane-overview-list").innerHTML = items.length
          ? items.map(function (record) {
              return '<article class="portal-lane-overview-card"><div class="paper-badges"><span class="badge ' + badgeClass("status", record.status) + '">' + esc(record.status || "상태 미분류") + '</span><span class="badge ' + marketingClass(record) + '">' + esc(marketingLabel(record)) + '</span></div><h4>' + esc(koreanTitle(record)) + '</h4><p>' + esc(record.finding || record.summaryKo || "주요 결과 미추출") + '</p><p><strong>근거 수준</strong> · ' + esc(record.grade || record.sciGroup || "미분류") + '</p><button type="button" data-intelligence-id="' + esc(record.id) + '">상세 검토 →</button></article>';
            }).join("")
          : '<article class="portal-lane-overview-card"><h4>추가 자료를 확보해야 합니다</h4><p>현재 검색 인덱스에 충분한 직접 연결 자료가 없어 후보 큐와 원문 검색을 우선 확인하세요.</p></article>';
        renderPortalLaneInsight(lane);
        panel.hidden = false;
        panel.scrollIntoView({ behavior: preferredScrollBehavior(), block: "nearest" });
      }
      function renderPortalLaneInsight(lane) {
        var target = el("portal-lane-insight");
        if (!target) return;
        var items = records.filter(lane.match);
        if (lane.title === "발효·생산" || lane.title === "특허·기술") {
          var technologyItems = items.slice().sort(function (a, b) {
            return Number(b.year || 0) - Number(a.year || 0) || String(b.checked || "").localeCompare(String(a.checked || ""));
          }).slice(0, 8);
          target.innerHTML = '<h4>기술 검토 매트릭스</h4><p>연구·생산 선행자료를 기술 검토용으로 묶은 표입니다. 특허 침해, FTO, 권리 유효성 판단은 별도 특허 전문가 검토가 필요합니다.</p>' +
            (technologyItems.length ? '<div class="product-matrix-wrap"><table class="regulatory-matrix technology-matrix"><thead><tr><th>자료</th><th>기술 초점</th><th>형태·원료</th><th>대상·모델</th><th>평가지표</th><th>제한·안전</th></tr></thead><tbody>' + technologyItems.map(function (record) {
              return '<tr><td>' + esc(record.kind || "자료") + ' · ' + esc(record.year || "-") + '</td><td>' + esc(record.topic || record.domain || "미분류") + '</td><td>' + esc(record.form || record.ingredientKo || "미보고") + '</td><td>' + esc(record.model || record.population || record.species || "미보고") + '</td><td>' + esc(record.outcome || record.finding || "미보고") + '</td><td>' + esc(record.limitation || record.safety || "추가 확인 필요") + '</td></tr>';
            }).join("") + '</tbody></table></div>' : '<p>기술 분류 가능한 자료가 아직 없습니다.</p>');
          return;
        }
        if (lane.title === "제품·활용") {
          var productItems = items.slice().sort(function (a, b) {
            var aClinical = a.kind === "임상" ? 1 : 0;
            var bClinical = b.kind === "임상" ? 1 : 0;
            return bClinical - aClinical || Number(b.year || 0) - Number(a.year || 0);
          }).slice(0, 8);
          target.innerHTML = '<h4>제형·용량·결과 비교</h4><p>현재 인덱스에 기록된 자료만 비교합니다. 이 표는 제품 주장이나 허가를 승인하는 표가 아니며, 복합제·발효물은 GABA 단독 근거와 구분해야 합니다.</p>' +
            (productItems.length ? '<div class="product-matrix-wrap"><table class="regulatory-matrix product-matrix"><thead><tr><th>자료</th><th>제형·개입</th><th>GABA 용량</th><th>결과영역</th><th>방향</th><th>활용 판정</th></tr></thead><tbody>' + productItems.map(function (record) {
              return '<tr><td>' + esc(record.kind || "자료") + ' · ' + esc(record.year || "-") + '</td><td>' + esc(record.form || record.ingredientKo || "미보고") + '</td><td>' + esc(record.dose || record.exposure || "미보고") + '</td><td>' + esc(record.domain || record.effectCategory || "미분류") + '</td><td>' + esc(record.direction || "미분류") + '</td><td>' + esc(marketingLabel(record)) + '</td></tr>';
            }).join("") + '</tbody></table></div>' : '<p>비교 가능한 제품·활용 자료가 없습니다.</p>');
          return;
        }
        if (lane.title === "규제·안전") {
          var groups = {};
          items.forEach(function (record) {
            var key = [record.country || "국가 미상", record.agency || "기관 미상"].join(" · ");
            groups[key] = (groups[key] || 0) + 1;
          });
          var rows = Object.keys(groups).sort(function (a, b) { return groups[b] - groups[a] || a.localeCompare(b, "ko"); });
          target.innerHTML = '<h4>국가·기관 비교</h4><p>현재 인덱스의 규제·안전성 자료를 출처 단위로 묶었습니다. 해외 참고자료는 국내 허가·표시 적합성이나 임상효능을 자동으로 보장하지 않습니다.</p>' +
            (rows.length ? '<table class="regulatory-matrix"><thead><tr><th>국가 · 기관</th><th>자료 수</th></tr></thead><tbody>' + rows.map(function (key) { return '<tr><td>' + esc(key) + '</td><td>' + groups[key].toLocaleString("ko-KR") + '건</td></tr>'; }).join("") + '</tbody></table>' : '<p>현재 연결된 규제자료가 없습니다.</p>');
          return;
        }
        var buckets = lane.title === "발효·생산" || lane.title === "특허·기술"
          ? [{ label: "발효·생산", pattern: /발효|ferment|생산|production/i }, { label: "균주·미생물", pattern: /균주|strain|미생물|microb/i }, { label: "공정·최적화", pattern: /공정|최적화|process|optimization/i }, { label: "기능성 식품", pattern: /기능성 식품|functional food/i }]
          : [{ label: "인체", pattern: /인체|human|사람/i }, { label: "동물·전임상", pattern: /동물|animal|mouse|rat|전임상/i }, { label: "안전성", pattern: /안전성|safety|독성/i }];
        var counts = buckets.map(function (bucket) { return [bucket.label, items.filter(function (record) { return bucket.pattern.test(record._search || ""); }).length]; }).filter(function (entry) { return entry[1] > 0; });
        target.innerHTML = '<h4>자료 구성</h4><p>현재 인덱스의 검색 가능한 텍스트에서 분류 키워드를 집계했습니다. 키워드 집계는 기술·법률 판단을 대신하지 않습니다.</p>' + (counts.length ? '<div class="discovery-stats">' + counts.map(function (entry) { return '<span class="discovery-stat">' + esc(entry[0]) + ' ' + entry[1].toLocaleString("ko-KR") + '건</span>'; }).join("") + '</div>' : '<p>분류 가능한 자료가 아직 없습니다.</p>');
      }
      function reviewChecklist(record) {
        return [
          ["개입·제형", record.form || record.exposure],
          ["용량", record.dose || record.exposure],
          ["기간", record.duration],
          ["대조군", record.comparator],
          ["안전성", record.safety || record.safetyFinding],
          ["한계", record.limitation],
          ["식별자", record.pmid || record.doi]
        ];
      }
      function verificationSummary(record) {
        var checklist = reviewChecklist(record);
        var complete = checklist.filter(function (item) { return Boolean(item[1]); }).length;
        var missing = checklist.filter(function (item) { return !item[1]; }).map(function (item) { return item[0]; });
        var total = checklist.length;
        var score = total ? Math.round((complete / total) * 100) : 0;
        var label = score >= 80 ? "핵심 기록이 비교적 갖춰짐" : score >= 50 ? "일부 핵심 기록 추가 확인" : "원문 확인 우선";
        var action = missing.length
          ? "먼저 " + missing.join("·") + "을(를) 원문에서 확인한 뒤 활용 범위를 판단하세요."
          : "원문과 연구대상·용량·기간의 일치를 최종 확인하세요.";
        return '<div class="verification-score" aria-label="검증 기록 충실도 ' + score + '퍼센트">' + score + '%</div>' +
          '<div><h3>검증 기록 충실도 · ' + esc(label) + '</h3><p>' + esc(action) + ' <strong>' + complete + '/' + total + '개 핵심 항목 기록</strong></p><small>이 수치는 기록의 완성도만 보여주며, 연구의 질·효능·규제 적합성 순위를 의미하지 않습니다.</small></div>';
      }
      function recordFreshness(record) {
        var checked = new Date(String(record.checked || "") + "T00:00:00");
        if (Number.isNaN(checked.getTime())) return "확인일 미상 · 재확인 필요";
        var today = new Date();
        var days = Math.max(0, Math.floor((Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()) - Date.UTC(checked.getFullYear(), checked.getMonth(), checked.getDate())) / 86400000));
        var label = days > 180 ? "재확인 권고" : days > 90 ? "정기 재확인 권고" : "최근 확인";
        return label + " · " + days.toLocaleString("ko-KR") + "일 전 (" + koreanDate(record.checked) + ")";
      }
      function reviewPriority(item) {
        var record = item.record;
        var score = 0;
        var reasons = [];
        if (record.status === "후보") { score += 5; reasons.push("후보 상태"); }
        if (record.extraction === "부분") { score += 3; reasons.push("추출 부분"); }
        if (record.kind === "임상") { score += 3; reasons.push("인체 자료"); }
        if (record.kind === "규제") { score += 2; reasons.push("규제·안전성 자료"); }
        if (sourceAuditRecord(record)?.status === "unavailable") { score += 2; reasons.push("원문 접근 제한"); }
        if (freshnessBucket(record) !== "recent") { score += 2; reasons.push("재확인 권고"); }
        if (item.missing.length >= 4) { score += 3; reasons.push("핵심 기록 다수 누락"); }
        else if (item.missing.length >= 3) { score += 2; reasons.push("핵심 기록 누락"); }
        if (item.missing.indexOf("식별자") >= 0) { score += 2; reasons.push("식별자 확인 필요"); }
        var result = score >= 7 ? { key: "high", label: "우선 검토" } : score >= 4 ? { key: "medium", label: "다음 검토" } : { key: "normal", label: "기본 검토" };
        result.reason = reasons.length ? reasons.join(" · ") : "기본 검토 순서";
        return result;
      }
      function reviewDecisionState(recordId) {
        var saved = reviewDecisions[recordId];
        if (!saved) return { status: "pending", note: "", updatedAt: null, completedAt: null };
        if (typeof saved === "string") return { status: saved, note: "", updatedAt: null, completedAt: null };
        return {
          status: saved.status || (saved.completedAt ? "done" : "pending"),
          note: saved.note || "",
          updatedAt: saved.updatedAt || null,
          completedAt: saved.completedAt || null
        };
      }
      function persistReviewDecision(recordId, status, note) {
        if (status === "pending" && !String(note || "").trim()) delete reviewDecisions[recordId];
        else {
          var previous = reviewDecisionState(recordId);
          reviewDecisions[recordId] = {
            status: status,
            note: String(note || "").trim(),
            updatedAt: new Date().toISOString(),
            completedAt: status === "done" ? (previous.completedAt || new Date().toISOString()) : null
          };
        }
        try { localStorage.setItem("gaba-review-decisions", JSON.stringify(reviewDecisions)); } catch (_) {}
      }
      function renderReviewDecisionPanel(recordId) {
        var decision = reviewDecisionState(recordId);
        reviewDraftStatus = decision.status;
        reviewDraftNote = decision.note;
        document.querySelectorAll("[data-detail-review-status]").forEach(function (button) {
          setActiveToggle(button, button.dataset.detailReviewStatus === reviewDraftStatus);
        });
        var note = el("intelligence-detail-note");
        if (note) note.value = reviewDraftNote;
      }
      function buildReviewQueue() {
        return records.map(function (record) {
          var missing = reviewChecklist(record).filter(function (item) { return !item[1]; }).map(function (item) { return item[0]; });
          if (sourceAuditRecord(record)?.status === "unavailable" && missing.indexOf("원문 접근 감사") < 0) missing.push("원문 접근 감사");
          if (freshnessBucket(record) !== "recent" && missing.indexOf("최신 원문·후속 공지") < 0) missing.push("최신 원문·후속 공지");
          var item = { record: record, missing: missing };
          item.priority = reviewPriority(item);
          return item;
        }).filter(function (item) {
          return item.record.status === "후보" || item.record.extraction === "부분" || item.missing.length >= 3 || sourceAuditRecord(item.record)?.status === "unavailable" || freshnessBucket(item.record) !== "recent";
        }).sort(function (a, b) {
          var priorityRank = { high: 3, medium: 2, normal: 1 };
          return priorityRank[b.priority.key] - priorityRank[a.priority.key] || b.missing.length - a.missing.length || String(b.record.checked || "").localeCompare(String(a.record.checked || "")) || Number(b.record.year || 0) - Number(a.record.year || 0);
        });
      }
      function reviewQueueForDisplay(baseQueue) {
        var queue = baseQueue;
        if (sharedReviewIds.length) {
          queue = queue.filter(function (item) { return sharedReviewIds.indexOf(String(item.record.id)) >= 0; });
        }
        return queue.filter(function (item) {
          if (reviewQueueHideDone && reviewDecisionState(item.record.id).status === "done") return false;
          if (reviewQueueFilter === "candidate") return item.record.status === "후보";
          if (reviewQueueFilter === "partial") return item.record.extraction === "부분";
          if (reviewQueueFilter === "missing") return item.missing.length >= 3;
          if (reviewQueueFilter === "audit") return sourceAuditRecord(item.record)?.status === "unavailable";
          if (reviewQueueFilter === "freshness") return freshnessBucket(item.record) !== "recent";
          return true;
        });
      }
      function renderReviewQueue() {
        var target = el("review-queue-list");
        var countTarget = el("review-queue-count");
        var summaryTarget = el("review-queue-summary");
        var sharedNote = el("review-queue-shared-note");
        var sharedCopy = el("review-queue-shared-copy");
        var moreTarget = el("review-queue-more");
        if (!target || !countTarget) return;
        var baseQueue = buildReviewQueue();
        var doneCount = baseQueue.filter(function (item) { return reviewDecisionState(item.record.id).status === "done"; }).length;
        var holdCount = baseQueue.filter(function (item) { return reviewDecisionState(item.record.id).status === "hold"; }).length;
        var completionRate = baseQueue.length ? Math.round(doneCount / baseQueue.length * 100) : 0;
        var highCount = baseQueue.filter(function (item) { return item.priority.key === "high"; }).length;
        var identifierGapCount = baseQueue.filter(function (item) { return item.missing.indexOf("식별자") >= 0; }).length;
        var auditGapCount = baseQueue.filter(function (item) { return sourceAuditRecord(item.record)?.status === "unavailable"; }).length;
        var freshnessGapCount = baseQueue.filter(function (item) { return freshnessBucket(item.record) !== "recent"; }).length;
        var auditFilterButton = document.querySelector('[data-review-filter="audit"]');
        if (auditFilterButton) {
          auditFilterButton.textContent = "원문 접근 제한 " + auditGapCount.toLocaleString("ko-KR");
          auditFilterButton.setAttribute("aria-label", "원문 접근 제한 " + auditGapCount.toLocaleString("ko-KR") + "건");
        }
        var freshnessFilterButton = document.querySelector('[data-review-filter="freshness"]');
        if (freshnessFilterButton) {
          freshnessFilterButton.hidden = freshnessGapCount === 0;
          freshnessFilterButton.textContent = "재확인 필요 " + freshnessGapCount.toLocaleString("ko-KR");
          freshnessFilterButton.setAttribute("aria-label", "재확인 필요 " + freshnessGapCount.toLocaleString("ko-KR") + "건");
        }
        var queue = reviewQueueForDisplay(baseQueue);
        if (moreTarget) {
          moreTarget.hidden = queue.length <= 6;
          moreTarget.textContent = reviewQueueShowAll ? "우선 6건만 보기" : "전체 큐 표시";
          moreTarget.setAttribute("aria-expanded", String(reviewQueueShowAll));
        }
        var visibleDoneCount = queue.filter(function (item) { return reviewDecisionState(item.record.id).status === "done"; }).length;
        var visibleHoldCount = queue.filter(function (item) { return reviewDecisionState(item.record.id).status === "hold"; }).length;
        countTarget.textContent = (sharedReviewIds.length ? "공유 큐 · " : "") + queue.length.toLocaleString("ko-KR") + "건 대기 · " + visibleDoneCount.toLocaleString("ko-KR") + "건 완료 · " + visibleHoldCount.toLocaleString("ko-KR") + "건 자료 필요";
        if (sharedNote && sharedCopy) {
          sharedNote.hidden = !(sharedReviewIds.length || sharedReviewMissingCount);
          if (sharedReviewMissingCount && sharedReviewIds.length) sharedCopy.textContent = "공유된 검토 대상 " + queue.length.toLocaleString("ko-KR") + "건을 표시 중이며, " + sharedReviewMissingCount.toLocaleString("ko-KR") + "건은 현재 스냅샷에서 찾지 못했습니다.";
          else if (sharedReviewMissingCount) sharedCopy.textContent = "이 공유 링크의 " + sharedReviewMissingCount.toLocaleString("ko-KR") + "건은 현재 스냅샷에 없습니다. 최신 검토 큐를 확인하세요.";
          else if (sharedReviewIds.length) sharedCopy.textContent = "공유된 검토 대상 " + queue.length.toLocaleString("ko-KR") + "건만 표시 중입니다 · 필터: " + reviewQueueFilterLabels[reviewQueueFilter] + ". 이 브라우저의 로컬 검토 기록은 공유되지 않습니다.";
        }
        if (summaryTarget) summaryTarget.innerHTML = '<span><strong>' + completionRate + '%</strong> 전체 큐 완료율</span><span><strong>' + highCount.toLocaleString("ko-KR") + '건</strong> 우선 검토</span><span><strong>' + identifierGapCount.toLocaleString("ko-KR") + '건</strong> 식별자 확인 필요</span><span><strong>' + auditGapCount.toLocaleString("ko-KR") + '건</strong> 원문 접근 제한</span>' + (freshnessGapCount ? '<span><strong>' + freshnessGapCount.toLocaleString("ko-KR") + '건</strong> 최신성 재확인</span>' : '') + '<span><strong>' + holdCount.toLocaleString("ko-KR") + '건</strong> 추가 자료 필요</span><span><strong>' + baseQueue.length.toLocaleString("ko-KR") + '건</strong> 전체 대기</span>';
        document.querySelectorAll("[data-review-filter]").forEach(function (button) {
          setActiveToggle(button, button.dataset.reviewFilter === reviewQueueFilter);
        });
        target.innerHTML = queue.length ? queue.slice(0, reviewQueueShowAll ? queue.length : 6).map(function (item) {
          var record = item.record;
          var decision = reviewDecisionState(record.id);
          var done = decision.status === "done";
          var hold = decision.status === "hold";
          var note = decision.note ? '<p><strong>로컬 메모</strong> · ' + esc(decision.note) + '</p>' : '';
          var source = safeUrl(primarySourceUrl(record));
          var sourceAction = source ? '<a class="review-card-source" href="' + esc(source) + '" target="_blank" rel="noopener noreferrer">' + esc(primarySourceLabel(record)) + ' ↗</a>' : '';
          var auditStatus = sourceAuditRecord(record)?.status || "missing";
          var reviewMeta = '<p class="review-priority-meta"><strong>확인일</strong> · ' + esc(record.checked || "미상") + ' · <strong>원문</strong> · ' + esc(auditLabel(auditStatus)) + '</p>';
          return '<article class="review-queue-card priority-' + esc(item.priority.key) + (done ? " review-done" : hold ? " review-hold" : "") + '"><div class="paper-badges"><span class="badge ' + badgeClass("status", record.status) + '">' + esc(record.status || "상태 미분류") + '</span><span class="badge ' + marketingClass(record) + '">' + esc(marketingLabel(record)) + '</span></div><span class="review-priority ' + esc(item.priority.key) + '">' + esc(item.priority.label) + '</span><p class="review-priority-reason"><strong>우선순위 근거</strong> · ' + esc(item.priority.reason) + '</p>' + reviewMeta + '<h3>' + esc(koreanTitle(record)) + '</h3><p><strong>추가 확인</strong> · ' + esc(item.missing.join(" · ")) + '</p>' + note + '<div class="review-card-actions"><button class="review-card-primary" type="button" data-intelligence-id="' + esc(record.id) + '">상세 검토 →</button>' + sourceAction + '<button class="review-card-secondary" type="button" data-query="' + esc(record.domain || record.topic || "GABA") + '">관련 검색</button><button class="review-card-state" type="button" data-review-status="' + (done ? "pending" : "done") + '" data-review-id="' + esc(record.id) + '">' + (done ? "완료 취소" : "검토 완료 표시") + '</button><button class="review-card-state" type="button" data-review-status="' + (hold ? "pending" : "hold") + '" data-review-id="' + esc(record.id) + '">' + (hold ? "자료 필요 해제" : "자료 필요 표시") + '</button></div></article>';
          }).join("") : '<article class="review-queue-card"><h3>현재 대기 자료가 없습니다</h3><p>검토 큐가 비어 있습니다.</p></article>';
      }
      function openReviewShareDialog(url, count) {
        var dialog = el("review-share-dialog");
        el("review-share-url").value = url;
        el("review-share-summary").textContent = count.toLocaleString("ko-KR") + "건의 검토 대상 ID만 링크에 포함됩니다. 개인 메모·완료 상태·Sheets 데이터는 공유되지 않습니다.";
        reviewShareReturnFocus = document.activeElement;
        if (typeof dialog.showModal === "function") dialog.showModal();
        else dialog.setAttribute("open", "");
        el("review-share-copy").focus();
      }
      function closeReviewShareDialog() {
        var dialog = el("review-share-dialog");
        if (dialog && typeof dialog.close === "function" && dialog.open) dialog.close();
        else if (dialog) dialog.removeAttribute("open");
        if (reviewShareReturnFocus && typeof reviewShareReturnFocus.focus === "function") reviewShareReturnFocus.focus();
        reviewShareReturnFocus = null;
      }
      async function copyReviewShareUrl() {
        var input = el("review-share-url");
        try {
          await navigator.clipboard.writeText(input.value);
          toast("검토 큐 링크를 복사했습니다");
        } catch (_) {
          input.focus();
          input.select();
          toast("링크를 선택했습니다 · Ctrl+C로 복사하세요");
        }
      }

      function openMethodology() {
        var dialog = el("methodology-dialog");
        if (!dialog) return;
        if (typeof dialog.showModal === "function") dialog.showModal(); else dialog.setAttribute("open", "");
        el("methodology-close").focus();
      }

      function closeMethodology() {
        var dialog = el("methodology-dialog");
        if (dialog && typeof dialog.close === "function" && dialog.open) dialog.close();
        else if (dialog) dialog.removeAttribute("open");
        setTimeout(function () { el("methodology-open")?.focus(); }, 120);
      }
      function renderFollowupCounts() {
        var count = records.filter(function (record) { return Boolean(publicationFollowupLabel(record)); }).length;
        document.querySelectorAll("[data-followup-count]").forEach(function (node) {
          node.textContent = count.toLocaleString("ko-KR");
          node.setAttribute("aria-label", "전체 인덱스 기준 " + count.toLocaleString("ko-KR") + "건");
        });
      }

      function candidateHumanSignals(candidate) {
        var labels = [];
        if ((candidate.routeSignals || []).length) labels.push("경로·섭취 표현");
        if ((candidate.interventionSignals || []).length) labels.push("GABA 개입 표현");
        if ((candidate.subjectSignals || []).length) labels.push("대상 표현");
        if ((candidate.studySignals || []).length) labels.push("연구설계·용량 표현");
        if ((candidate.exclusionSignals || []).length) labels.push("주의·제외 신호");
        if ((candidate.queryLabels || []).includes("publication_followup")) labels.push("출판 후속조치");
        return labels.join(" · ") || "신호 없음 · 원문 확인";
      }
      function publicationFollowupLabel(record) {
        var status = [record.status, record.direction, record.pubmedStatus, record.sciStatus].filter(Boolean).join(" ");
        if (/철회됨|철회 공지|retracted publication|retraction notice|correction|정정 연결|우려표명|expression of concern/i.test(status)) {
          return "출판 후속조치 확인";
        }
        return "";
      }
      async function copyRecordLink(recordId) {
        var record = records.find(function (item) { return String(item.id) === String(recordId); });
        if (!record) return;
        var params = new URLSearchParams(location.search);
        params.set("record", String(record.id));
        var link = location.origin + location.pathname + "?" + params.toString();
        try {
          await navigator.clipboard.writeText(link);
          toast("자료 링크를 복사했습니다");
        } catch (_) {
          openCopyDialog("자료 링크", "클립보드 권한이 없으면 아래 링크를 선택해 직접 복사하세요.", link, "자료 링크를 복사했습니다");
        }
      }
      async function copyCandidateLink(candidateId) {
        var candidate = (DB.meta.discovery?.candidatePreview || []).find(function (item) { return String(item.candidateId) === String(candidateId); });
        if (!candidate) return;
        var url = new URL(location.href);
        url.searchParams.set("candidateId", String(candidate.candidateId));
        var link = url.href;
        try {
          await navigator.clipboard.writeText(link);
          toast("후보 검토 링크를 복사했습니다");
        } catch (_) {
          openCopyDialog("후보 검토 링크", "클립보드 권한이 없으면 아래 링크를 선택해 직접 복사하세요.", link, "후보 검토 링크를 복사했습니다");
        }
      }
      function openCopyDialog(title, description, value, successMessage) {
        var dialog = el("copy-dialog");
        el("copy-dialog-title").textContent = title;
        el("copy-dialog-description").textContent = description;
        el("copy-dialog-value").value = value;
        copyDialogSuccessMessage = successMessage || "내용을 복사했습니다";
        copyDialogReturnFocus = document.activeElement;
        if (typeof dialog.showModal === "function") dialog.showModal();
        else dialog.setAttribute("open", "");
        el("copy-dialog-value").focus();
        el("copy-dialog-value").select();
      }
      function closeCopyDialog() {
        var dialog = el("copy-dialog");
        if (dialog && typeof dialog.close === "function" && dialog.open) dialog.close();
        else if (dialog) dialog.removeAttribute("open");
        if (copyDialogReturnFocus && typeof copyDialogReturnFocus.focus === "function") copyDialogReturnFocus.focus();
        copyDialogReturnFocus = null;
      }
      async function copyDialogValue() {
        var input = el("copy-dialog-value");
        try {
          await navigator.clipboard.writeText(input.value);
          toast(copyDialogSuccessMessage);
        } catch (_) {
          input.focus();
          input.select();
          toast("내용을 선택했습니다 · Ctrl+C로 복사하세요");
        }
      }
      function shareReviewQueue() {
        var queue = reviewQueueForDisplay(buildReviewQueue());
        if (!queue.length) { toast("공유할 검토 자료가 없습니다"); return; }
        var ids = queue.slice(0, 50).map(function (item) { return String(item.record.id); });
        var url = new URL(location.href);
        url.searchParams.set("review", ids.join(","));
        if (reviewQueueFilter !== "all") url.searchParams.set("reviewFilter", reviewQueueFilter);
        openReviewShareDialog(url.href, ids.length);
      }
      function clearSharedReviewQueue() {
        if (!sharedReviewIds.length && !sharedReviewMissingCount) return;
        sharedReviewIds = [];
        sharedReviewMissingCount = 0;
        reviewQueueFilter = "all";
        persistUrl("replace");
        renderReviewQueue();
        toast("공유 큐를 해제하고 전체 검토 큐를 표시합니다");
      }
      function exportReviewQueue() {
        var recordsPayload = records.map(function (record) {
          var missing = reviewChecklist(record).filter(function (item) { return !item[1]; }).map(function (item) { return item[0]; });
          var queued = record.status === "후보" || record.extraction === "부분" || missing.length >= 3;
          if (!queued) return null;
          return {
            recordId: record.id,
            titleKo: koreanTitle(record),
            kind: record.kind || "",
            status: record.status || "",
            extraction: record.extraction || "",
            missingFields: missing,
            reviewStatus: reviewDecisionState(record.id).status === "done" ? "완료" : reviewDecisionState(record.id).status === "hold" ? "추가 자료 필요" : "대기",
            reviewPriority: reviewPriority({ record: record, missing: missing }).key,
            reviewNote: reviewDecisionState(record.id).note || "",
            completedAt: reviewDecisionState(record.id).completedAt || null,
            checkedAt: record.checked || null,
            sourceUrls: [primarySourceUrl(record), record.fulltextUrl, record.doiUrl, record.pubmedUrl, record.sourceUrl, record.decisionUrl].filter(Boolean).filter(function (url, index, urls) { return urls.indexOf(url) === index; })
          };
        }).filter(Boolean);
        var payload = {
          schemaVersion: "gaba-review-queue-0.1",
          exportedAt: new Date().toISOString(),
          snapshotDate: DB.meta.snapshotDate,
          note: "로컬 검토 상태를 Sheets 동기화 또는 독립 검토 전에 확인하기 위한 대기 payload입니다. 원본 인덱스를 자동 변경하지 않습니다.",
          records: recordsPayload
        };
        var blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
        var url = URL.createObjectURL(blob);
        var anchor = document.createElement("a");
        anchor.href = url;
        anchor.download = "gaba-review-queue-" + String(DB.meta.snapshotDate || "snapshot") + ".json";
        document.body.appendChild(anchor);
        anchor.click();
        anchor.remove();
        URL.revokeObjectURL(url);
        toast(recordsPayload.length.toLocaleString("ko-KR") + "건의 검토 큐를 내보냈습니다");
      }
      function reviewQueueMarkdownText() {
        var queue = reviewQueueForDisplay(buildReviewQueue());
        if (!queue.length) return "";
        var lines = [
          "# GABA 추가 검토 큐",
          "",
          "- 표시 자료: " + queue.length.toLocaleString("ko-KR") + "건",
          "- 검증 스냅샷: " + String(DB.meta.snapshotDate || "미상"),
          "- 자동 탐색 기준일: " + discoverySnapshotValue(),
          "- 현재 큐 필터: " + String(reviewQueueFilterLabels[reviewQueueFilter] || "전체"),
          "- 공유 범위: 현재 브라우저의 필터와 공개 레코드만 포함하며 개인 메모는 문서에 포함하지 않습니다.",
          "- 해석 주의: 우선순위는 검토 순서를 돕는 신호이며 근거의 질·효능·규제 적합성 순위가 아닙니다.",
          "",
          "## 확인할 자료"
        ];
        queue.forEach(function (item, index) {
          var record = item.record;
          var decision = reviewDecisionState(record.id);
          var source = safeUrl(primarySourceUrl(record));
          lines.push("", "### " + (index + 1) + ". " + koreanTitle(record));
          lines.push("", "- ID: " + record.id);
          lines.push("- 우선순위: " + item.priority.label + " · " + item.priority.reason);
          lines.push("- 검토 상태: " + (decision.status === "done" ? "완료" : decision.status === "hold" ? "추가 자료 필요" : "대기"));
          lines.push("- 추가 확인: " + (item.missing.join(" · ") || "원문과 사용조건 최종 대조"));
          lines.push("- 연구 유형·연도: " + (record.kind || "자료") + " · " + (record.year || "연도 미상"));
          if (record.checked) lines.push("- 마지막 확인일: " + record.checked);
          if (source) lines.push("- 원문: " + source);
        });
        return lines.join("\n");
      }
      function exportReviewQueueMarkdown() {
        var queue = reviewQueueForDisplay(buildReviewQueue());
        if (!queue.length) { toast("저장할 검토 큐가 없습니다"); return; }
        var blob = new Blob([reviewQueueMarkdownText()], { type: "text/markdown;charset=utf-8" });
        var url = URL.createObjectURL(blob);
        var anchor = document.createElement("a");
        anchor.href = url;
        anchor.download = "gaba-review-queue-" + String(DB.meta.snapshotDate || "snapshot") + ".md";
        document.body.appendChild(anchor);
        anchor.click();
        anchor.remove();
        URL.revokeObjectURL(url);
        toast(queue.length.toLocaleString("ko-KR") + "건의 검토 큐 Markdown을 저장했습니다");
      }
      function csvCell(value) {
        return '"' + String(value == null ? "" : value).replace(/"/g, '""').replace(/\r?\n/g, " ") + '"';
      }
      function exportFilteredResults() {
        var list = filteredRecords();
        if (!list.length) { toast("내보낼 검색 결과가 없습니다"); return; }
        var headers = ["ID", "검증 스냅샷", "자동 탐색 기준일", "현재 조건", "한국어 제목/분류 요약", "영문 원제", "연구 유형", "개입 구분", "상태", "연도", "저자", "저널", "대상·시험계", "GABA 용량·노출", "기간", "대조군", "핵심 결과", "연구의 의미", "마케팅 활용 방안", "한계", "SCI/SCIE", "추출 상태", "확인일", "DOI", "PMID", "원문 링크"];
        var rows = list.map(function (record) {
          return [record.id, DB.meta.snapshotDate, discoverySnapshotValue(), currentConditionSummary(), koreanTitle(record), record.title, record.kind, interventionClass(record), record.status, record.year, record.author, record.journal, record.population || record.species, record.dose || record.exposure, record.duration, record.comparator, record.finding || record.summaryKo, researchMeaning(record), utilizationDirection(record), record.limitation, record.sciGroup, record.extraction, record.checked, record.doi, record.pmid, primarySourceUrl(record)].map(csvCell);
        });
        var csv = "\uFEFF" + [headers.map(csvCell).join(",")].concat(rows.map(function (row) { return row.join(","); })).join("\r\n");
        var blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
        var url = URL.createObjectURL(blob);
        var anchor = document.createElement("a");
        anchor.href = url;
        anchor.download = "gaba-evidence-results-" + String(DB.meta.snapshotDate || "snapshot") + ".csv";
        document.body.appendChild(anchor);
        anchor.click();
        anchor.remove();
        URL.revokeObjectURL(url);
        toast(list.length.toLocaleString("ko-KR") + "건의 검색 결과 CSV를 내보냈습니다");
      }
      function exportFilteredJson() {
        var list = filteredRecords();
        if (!list.length) { toast("내보낼 검색 결과가 없습니다"); return; }
        var payload = {
          schemaVersion: "gaba-evidence-export-0.1",
          exportedAt: new Date().toISOString(),
          snapshotDate: DB.meta.snapshotDate,
          discoverySnapshotDate: discoverySnapshotValue(),
          publicRelease: DB.meta.publicRelease === true,
          sourceMode: "read-only public snapshot",
          conditionSummary: currentConditionSummary(),
          filters: Object.assign({}, state),
          records: list.map(function (record) {
            var copy = JSON.parse(JSON.stringify(record));
            delete copy._search;
            return copy;
          })
        };
        var blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json;charset=utf-8" });
        var url = URL.createObjectURL(blob);
        var anchor = document.createElement("a");
        anchor.href = url;
        anchor.download = "gaba-evidence-results-" + String(DB.meta.snapshotDate || "snapshot") + ".json";
        document.body.appendChild(anchor);
        anchor.click();
        anchor.remove();
        URL.revokeObjectURL(url);
        toast(list.length.toLocaleString("ko-KR") + "건의 검색 결과 JSON을 내보냈습니다");
      }
      function risValue(value) {
        return String(value == null ? "" : value).replace(/\r?\n/g, " ").replace(/\s+/g, " ").trim();
      }
      function exportFilteredRis() {
        var list = filteredRecords();
        if (!list.length) { toast("내보낼 검색 결과가 없습니다"); return; }
        var rows = [];
        list.forEach(function (record) {
          var sourceUrl = record.fulltextUrl || record.doiUrl || record.pubmedUrl;
          rows.push("TY  - " + (record.kind === "규제" ? "RPRT" : "JOUR"));
          if (record.title) rows.push("TI  - " + risValue(record.title));
          if (record.author) rows.push("AU  - " + risValue(record.author));
          if (record.journal) rows.push("JO  - " + risValue(record.journal));
          if (record.year) rows.push("PY  - " + risValue(record.year));
          if (record.doi) rows.push("DO  - " + risValue(record.doi));
          if (record.pmid) rows.push("AN  - PMID:" + risValue(record.pmid));
          if (sourceUrl) rows.push("UR  - " + risValue(sourceUrl));
          rows.push("N1  - Record ID: " + risValue(record.id));
          rows.push("N1  - Verification snapshot: " + risValue(DB.meta.snapshotDate));
          rows.push("N1  - Discovery snapshot: " + risValue(discoverySnapshotValue()));
          rows.push("N1  - Search conditions: " + risValue(currentConditionSummary()));
          rows.push("N1  - Intervention class: " + risValue(interventionClass(record)));
          rows.push("ER  - ");
          rows.push("");
        });
        var blob = new Blob([rows.join("\r\n")], { type: "application/x-research-info-systems;charset=utf-8" });
        var url = URL.createObjectURL(blob);
        var anchor = document.createElement("a");
        anchor.href = url;
        anchor.download = "gaba-evidence-results-" + String(DB.meta.snapshotDate || "snapshot") + ".ris";
        document.body.appendChild(anchor);
        anchor.click();
        anchor.remove();
        URL.revokeObjectURL(url);
        toast(list.length.toLocaleString("ko-KR") + "건의 검색 결과 RIS를 내보냈습니다");
      }
      function filteredBriefText(list) {
        var query = state.q ? state.q.trim() : "전체 근거";
        var clinical = list.filter(function (record) { return record.kind === "임상"; }).length;
        var animal = list.filter(function (record) { return record.kind === "동물"; }).length;
        var regulatory = list.filter(function (record) { return record.kind === "규제"; }).length;
        var review = list.filter(function (record) { return record.status === "후보" || record.status === "보류" || record.extraction === "부분"; }).length;
        var currentLink = location.origin + location.pathname + location.search;
        var lines = [
          "GABA 검색 결과 브리프",
          "검색어: " + query,
          "현재 조건: " + currentConditionSummary(),
          "검증 스냅샷: " + String(DB.meta.snapshotDate || "미상"),
          "자동 탐색 기준일: " + discoverySnapshotValue(),
          "결과: " + list.length.toLocaleString("ko-KR") + "건 · 인체 " + clinical + "건 · 동물·전임상 " + animal + "건 · 규제·안전성 " + regulatory + "건 · 추가 확인 " + review + "건",
          "조건 링크: " + currentLink,
          "공유 범위: 공개 검증 스냅샷과 현재 조건만 포함하며 브라우저 저장 검색·개인 검토 기록은 포함하지 않습니다.",
          "해석 주의: 인체·동물·규제 자료는 범위가 다르므로 결과를 직접 합산하지 않습니다. 원문·대상·용량·기간·대조군을 먼저 확인하세요.",
          "",
          "주요 자료(최대 10건)"
        ];
        list.slice(0, 10).forEach(function (record, index) {
          lines.push((index + 1) + ". " + evidenceBriefText(record));
        });
        if (list.length > 10) lines.push("", "※ 전체 " + list.length.toLocaleString("ko-KR") + "건 중 10건만 브리프에 포함했습니다. 전체 자료는 CSV로 저장하세요.");
        return lines.join("\n\n");
      }
      async function copyFilteredBrief() {
        var list = filteredRecords();
        if (!list.length) { toast("브리프로 만들 검색 결과가 없습니다"); return; }
        var text = filteredBriefText(list);
        try {
          await navigator.clipboard.writeText(text);
          toast("검색 결과 브리프를 복사했습니다");
        } catch (_) {
          openCopyDialog("검색 결과 브리프", "클립보드 권한이 없으면 아래 내용을 선택해 직접 복사하세요.", text, "검색 결과 브리프를 복사했습니다");
        }
      }
      function exportFilteredBrief() {
        var list = filteredRecords();
        if (!list.length) { toast("저장할 브리프가 없습니다"); return; }
        var text = filteredBriefText(list);
        var blob = new Blob([text], { type: "text/markdown;charset=utf-8" });
        var url = URL.createObjectURL(blob);
        var anchor = document.createElement("a");
        anchor.href = url;
        anchor.download = "gaba-evidence-brief-" + String(DB.meta.snapshotDate || "snapshot") + ".md";
        document.body.appendChild(anchor);
        anchor.click();
        anchor.remove();
        URL.revokeObjectURL(url);
        toast("검색 결과 브리프 Markdown을 저장했습니다");
      }
      async function importReviewQueue(file) {
        if (!file) return;
        try {
          var payload = JSON.parse(await file.text());
          if (payload?.schemaVersion !== "gaba-review-queue-0.1" || !Array.isArray(payload.records)) throw new Error("schema");
          var knownIds = new Set(records.map(function (record) { return String(record.id); }));
          var statusMap = { "완료": "done", "추가 자료 필요": "hold", "대기": "pending" };
          var imported = 0;
          payload.records.forEach(function (item) {
            var recordId = String(item.recordId || "");
            var status = statusMap[item.reviewStatus] || item.reviewStatus;
            if (!knownIds.has(recordId) || !["done", "hold", "pending"].includes(status)) return;
            var note = String(item.reviewNote || "").trim().slice(0, 2000);
            if (status === "pending" && !note) delete reviewDecisions[recordId];
            else reviewDecisions[recordId] = {
              status: status,
              note: note,
              updatedAt: new Date().toISOString(),
              completedAt: status === "done" ? (item.completedAt || new Date().toISOString()) : null
            };
            imported += 1;
          });
          localStorage.setItem("gaba-review-decisions", JSON.stringify(reviewDecisions));
          renderReviewQueue();
          toast(imported.toLocaleString("ko-KR") + "건의 로컬 검토 기록을 가져왔습니다");
        } catch (_) {
          toast("검토 기록 JSON 형식을 확인하세요");
        }
      }
      function openIntelligenceDetail(recordId, historyMode) {
        var record = records.find(function (item) { return String(item.id) === String(recordId); });
        var dialog = el("intelligence-detail");
        if (!record || !dialog) {
          urlRecordId = "";
          persistUrl("replace");
          return;
        }
        detailReturnFocus = document.activeElement;
        currentDetailRecordId = record.id;
        urlRecordId = String(record.id);
        persistUrl(historyMode || "push");
        var kind = record.kind === "규제" ? "규제·안전성" : record.kind === "임상" ? "인체 연구" : record.kind === "동물" ? "동물·전임상" : "근거 자료";
        el("intelligence-detail-kicker").textContent = kind + " · " + (record.year || "연도 미상");
        el("intelligence-detail-title").textContent = koreanTitle(record);
        el("intelligence-detail-verification").innerHTML = verificationSummary(record);
        el("intelligence-detail-facts").innerHTML = [
          fact("연구 유형", kind), fact("개입 구분", interventionClass(record)), fact("상태", record.status), fact("대상", record.population || record.species),
          fact("연구 설계", record.design), fact("개입 형태", record.form), fact("투여 경로", record.route), fact("대조군", record.comparator),
          fact("결과 영역", record.outcome || record.domain), fact("GABA 용량", record.dose || record.exposure), fact("기간", record.duration), fact("근거 수준", record.grade || record.sciGroup),
          fact("결과 방향", record.direction), fact("확인일", record.checked), fact("자료 최신성", recordFreshness(record)), fact("원문 접근 감사", sourceAuditDescription(record))
        ].join("");
        el("intelligence-detail-finding").textContent = record.finding || record.summaryKo || "주요 결과가 충분히 추출되지 않은 자료입니다.";
        el("intelligence-detail-boundary").textContent = evidenceBoundary(record);
        var checklist = reviewChecklist(record);
        var missingChecklist = checklist.filter(function (item) { return !item[1]; });
        el("review-check-summary").textContent = missingChecklist.length ? "추가 확인 " + missingChecklist.length + "개" : "핵심 항목 기록 완료";
        el("intelligence-detail-checklist").innerHTML = checklist.map(function (item) {
          var complete = Boolean(item[1]);
          return '<div class="review-check' + (complete ? "" : " missing") + '"><span class="review-check-mark">' + (complete ? "✓" : "–") + '</span><span>' + esc(item[0]) + (complete ? " 기록 있음" : " 추가 확인") + '</span></div>';
        }).join("");
        renderReviewDecisionPanel(record.id);
        el("intelligence-detail-meaning").textContent = researchMeaning(record);
        el("intelligence-detail-marketing").textContent = utilizationDirection(record);
        var related = records.filter(function (item) {
          if (String(item.id) === String(record.id)) return false;
          return (record.domain && item.domain === record.domain) || (record.topic && item.topic === record.topic);
        }).sort(function (a, b) {
          return Number(b.year || 0) - Number(a.year || 0) || String(b.checked || "").localeCompare(String(a.checked || ""));
        }).slice(0, 4);
        el("intelligence-detail-related").innerHTML = related.length
          ? related.map(function (item) { return '<button type="button" data-intelligence-id="' + esc(item.id) + '">' + esc(koreanTitle(item)) + '<br><span style="color:var(--muted);font-weight:600">' + esc(item.kind || "자료") + ' · ' + esc(item.year || "연도 미상") + '</span></button>'; }).join("")
          : '<p>동일 주제의 연결 근거가 아직 충분히 분류되지 않았습니다.</p>';
        var sourcePrimary = primarySourceUrl(record);
        el("intelligence-detail-actions").innerHTML =
            linkButton(sourcePrimary, primarySourceLabel(record), true) +
          (record.doiUrl && record.doiUrl !== sourcePrimary ? linkButton(record.doiUrl, "DOI 원문", false) : "") +
          (record.pubmedUrl && record.pubmedUrl !== sourcePrimary ? linkButton(record.pubmedUrl, "PubMed 원문", false) : "") +
          '<button type="button" data-copy-record-link="' + esc(record.id) + '">자료 링크 복사</button>' +
          '<button type="button" data-copy-citation="' + esc(record.id) + '">인용 정보 복사</button>' +
          '<button type="button" data-copy-brief="' + esc(record.id) + '">근거 브리프 복사</button>' +
          '<button type="button" data-compare-toggle="' + esc(record.id) + '" aria-pressed="false">비교에 추가</button>' +
          '<button type="button" data-query="' + esc(record.domain || record.topic || "GABA") + '">관련 근거 검색</button>';
        if (typeof dialog.showModal === "function") dialog.showModal();
        else dialog.setAttribute("open", "");
      }
      function closeIntelligenceDetail() {
        var dialog = el("intelligence-detail");
        urlRecordId = "";
        currentDetailRecordId = null;
        persistUrl();
        if (dialog && typeof dialog.close === "function" && dialog.open) dialog.close();
        else if (dialog) dialog.removeAttribute("open");
        if (detailReturnFocus && typeof detailReturnFocus.focus === "function") detailReturnFocus.focus();
        detailReturnFocus = null;
      }
      function interpretationBlock(record) {
        return '<div class="interpretation-grid">' +
          '<div class="interpretation"><strong>연구의 의미</strong>' + esc(researchMeaning(record)) + '</div>' +
          '<div class="interpretation action"><strong>마케팅 활용 방안</strong>: ' + esc(utilizationDirection(record)) + '<span class="interpretation-caution">활용 방향 제시 · 광고 허가·효능 입증 아님 · 외부 검토 필요</span></div>' +
          '</div>';
      }
      function fact(label, value) {
        return '<div class="fact"><dt>' + esc(label) + '</dt><dd>' + esc(value || "미보고") + '</dd></div>';
      }
      function linkButton(url, label, primary) {
        var safe = safeUrl(url);
        if (!safe) return "";
        return '<a class="paper-link' + (primary ? " primary" : "") + '" href="' + esc(safe) + '" target="_blank" rel="noopener noreferrer">' + esc(label) + ' ↗</a>';
      }
      function koreanTitle(record) {
        var clean = function (value) { return String(value || "").trim().replace(/\s+/g, " ").replace(/연구 연구/g, "연구"); };
        if (record.titleKo) return clean(record.titleKo);
        var kind = record.kind === "임상" ? "인체" : record.kind === "동물" ? "동물" : record.kind === "규제" ? "규제·안전성" : record.kind === "리뷰" || record.kind === "고찰" ? "문헌 고찰" : record.kind === "전임상" ? "전임상" : record.kind === "문헌" ? "문헌" : "GABA 관련";
        var interventionLabels = {
          "순수 GABA 섭취": "GABA 섭취",
          "복합제·복합개입": "복합 개입",
          "GABA 생성 발효·프로바이오틱": "발효·프로바이오틱",
          "수용체 약물·작용제": "수용체 약물",
          "규제·안전성 자료": "규제·안전성"
        };
        var interventionClassName = interventionClass(record);
        var intervention = interventionLabels[interventionClassName] || "GABA 관련";
        var topic = clean(record.domain || record.topic || "주요 평가")
          .replace(/^경구\s*GABA[·/\s-]*/i, "")
          .replace(/^GABA[·/\s-]*/i, "")
          .replace(/\s*\/\s*/g, "·")
          .replace(/·{2,}/g, "·")
          .replace(/^·|·$/g, "") || "주요 평가";
        var headline = kind === "인체" && interventionClassName === "순수 GABA 섭취" ? "인체 GABA 섭취 연구"
          : kind === "동물" && interventionClassName === "순수 GABA 섭취" ? "동물 GABA 섭취 연구"
          : kind === "규제·안전성" ? "규제·안전성 자료"
          : [kind, intervention, "연구"].join(" ");
        return [headline, topic].join(" · ");
      }
      function koreanTitleLabel(record) {
        return record.titleKo ? "한국어 제목" : "한국어 분류 요약";
      }
      function selectedCompareRecords() {
        return compareIds.map(function (id) {
          return records.find(function (record) { return String(record.id) === String(id); });
        }).filter(Boolean);
      }
      function saveCompareIds() {
        try { localStorage.setItem("gaba-compare-ids", JSON.stringify(compareIds)); } catch (_) {}
      }
      function saveReadingIds() {
        try { localStorage.setItem("gaba-reading-ids", JSON.stringify(readingIds)); } catch (_) {}
      }
      function readingListRecords() {
        return readingIds.map(function (id) {
          return records.find(function (record) { return String(record.id) === String(id); });
        }).filter(Boolean);
      }
      function renderReadingListButtonState() {
        var selected = readingListRecords();
        var count = el("reading-list-count");
        if (count) count.textContent = String(selected.length);
        var openButton = el("reading-list-open");
        if (openButton) openButton.setAttribute("aria-label", "읽기 목록, " + selected.length + "개 저장됨");
        document.querySelectorAll("[data-reading-toggle]").forEach(function (button) {
          var active = readingIds.indexOf(String(button.dataset.readingToggle)) >= 0;
          button.setAttribute("aria-pressed", String(active));
          button.textContent = active ? "읽기 목록에서 제거" : "읽기 목록에 저장";
        });
      }
      function renderReadingList() {
        var target = el("reading-list-items");
        if (!target) return;
        var selected = readingListRecords();
        target.innerHTML = selected.length ? selected.map(function (record) {
          var source = primarySourceUrl(record);
          return '<article class="reading-list-item"><div><h3>' + esc(koreanTitle(record)) + '</h3><p>' + esc(compareKind(record) + " · " + (record.year || "연도 미상") + " · " + (record.journal || "저널 미상")) + '</p></div><div class="reading-list-item-actions"><button type="button" data-intelligence-id="' + esc(record.id) + '">상세 보기</button>' + (source ? linkButton(source, "원문 확인 · " + primarySourceLabel(record), false) : '') + '<button type="button" data-compare-toggle="' + esc(record.id) + '" aria-pressed="false">비교에 추가</button><button type="button" data-reading-remove="' + esc(record.id) + '">제거</button></div></article>';
        }).join("") : '<p class="reading-list-empty">아직 저장한 자료가 없습니다. 검색 결과에서 <strong>읽기 목록에 저장</strong>을 누르면 나중에 한 번에 다시 확인할 수 있습니다.</p>';
        renderReadingListButtonState();
        renderCompareTray();
      }
      function readingListBriefText() {
        var selected = readingListRecords();
        return selected.length
          ? selected.map(function (record, index) { return "[" + (index + 1) + "]\n" + evidenceBriefText(record); }).join("\n\n--------------------\n\n")
          : "저장한 자료가 없습니다.";
      }
      function readingListMarkdownText() {
        var selected = readingListRecords();
        if (!selected.length) return "";
        var shareUrl = new URL(location.href);
        shareUrl.searchParams.set("read", readingIds.slice(0, 50).join(","));
        var lines = [
          "# GABA 읽기 목록",
          "",
          "- 선택 자료: " + selected.length.toLocaleString("ko-KR") + "건",
          "- 검증 스냅샷: " + String(DB.meta.snapshotDate || "미상"),
          "- 자동 탐색 기준일: " + discoverySnapshotValue(),
          "- 읽기 목록 링크: " + shareUrl.toString(),
          "- 공유 범위: 공개 검증 스냅샷에서 브라우저에 저장한 자료와 현재 읽기 목록 링크만 포함합니다.",
          "- 해석 주의: 인체·동물·규제 자료는 범위가 다르므로 결과를 직접 합산하지 않습니다. 원문·대상·용량·기간·대조군을 먼저 확인하세요.",
          "",
          "## 선택 자료"
        ];
        selected.forEach(function (record, index) {
          lines.push("", "### " + (index + 1) + ". " + koreanTitle(record), "", evidenceBriefText(record));
        });
        return lines.join("\n");
      }
      function downloadReadingList() {
        var selected = readingListRecords();
        if (!selected.length) { toast("저장할 읽기 목록이 없습니다"); return; }
        var blob = new Blob([readingListMarkdownText()], { type: "text/markdown;charset=utf-8" });
        var url = URL.createObjectURL(blob);
        var anchor = document.createElement("a");
        anchor.href = url;
        anchor.download = "gaba-reading-list-" + String(DB.meta.snapshotDate || "snapshot") + ".md";
        document.body.appendChild(anchor);
        anchor.click();
        anchor.remove();
        URL.revokeObjectURL(url);
        toast("읽기 목록 Markdown을 저장했습니다");
      }
      async function shareReadingList() {
        if (!readingListRecords().length) { toast("공유할 읽기 목록이 없습니다"); return; }
        urlReadingIds = readingIds.slice(0, 50);
        persistUrl("replace");
        var text = location.href;
        try {
          await navigator.clipboard.writeText(text);
          toast("읽기 목록 링크를 복사했습니다");
        } catch (_) {
          openCopyDialog("읽기 목록 링크", "클립보드 권한이 없으면 아래 링크를 선택해 직접 복사하세요.", text, "읽기 목록 링크를 복사했습니다");
        }
      }
      async function copyReadingList() {
        var text = readingListBriefText();
        if (!readingListRecords().length) { toast("복사할 읽기 목록이 없습니다"); return; }
        try {
          await navigator.clipboard.writeText(text);
          toast("읽기 목록 브리프를 복사했습니다");
        } catch (_) {
          openCopyDialog("읽기 목록 브리프", "클립보드 권한이 없으면 아래 내용을 선택해 직접 복사하세요.", text, "읽기 목록 브리프를 복사했습니다");
        }
      }
      function clearReadingList() {
        if (!readingIds.length) { toast("읽기 목록이 이미 비어 있습니다"); return; }
        if (!window.confirm("저장한 자료를 모두 읽기 목록에서 제거할까요?")) return;
        readingIds = [];
        saveReadingIds();
        if (urlReadingIds.length) { urlReadingIds = readingIds.slice(0, 50); persistUrl("replace"); }
        renderReadingList();
        toast("읽기 목록을 비웠습니다");
      }
      function toggleReadingList(recordId) {
        var id = String(recordId || "");
        var index = readingIds.indexOf(id);
        if (index >= 0) {
          readingIds.splice(index, 1);
          toast("읽기 목록에서 제거했습니다");
        } else if (records.some(function (record) { return String(record.id) === id; })) {
          readingIds.unshift(id);
          toast("읽기 목록에 저장했습니다");
        }
        saveReadingIds();
        if (urlReadingIds.length) { urlReadingIds = readingIds.slice(0, 50); persistUrl("replace"); }
        renderReadingList();
      }
      function openReadingList() {
        renderReadingList();
        var dialog = el("reading-list-dialog");
        readingReturnFocus = document.activeElement;
        if (typeof dialog.showModal === "function") dialog.showModal();
        else dialog.setAttribute("open", "");
        el("reading-list-close").focus();
      }
      function closeReadingList() {
        var dialog = el("reading-list-dialog");
        if (dialog && typeof dialog.close === "function" && dialog.open) dialog.close();
        else if (dialog) dialog.removeAttribute("open");
        if (readingReturnFocus && typeof readingReturnFocus.focus === "function") readingReturnFocus.focus();
        readingReturnFocus = null;
      }
      function compareKind(record) {
        return record.kind === "규제" ? "규제·안전성" : record.kind === "임상" ? "인체 연구" : record.kind === "동물" ? "동물·전임상" : "근거 자료";
      }
      function compareValue(record, key) {
        var values = {
          kind: compareKind(record), status: record.status, population: record.population || record.species || record.subject,
          design: record.design, intervention: [record.form, record.route].filter(Boolean).join(" · "),
          outcome: record.outcome || record.domain, direction: record.direction,
          dose: record.dose || record.exposure, duration: record.duration, comparator: record.comparator || record.useMatch,
          finding: record.finding || record.summaryKo || record.safetyFinding, boundary: evidenceBoundary(record),
          grade: record.grade || record.sciGroup || record.quality, audit: sourceAuditDescription(record), checked: record.checked,
          meaning: researchMeaning(record), marketing: utilizationDirection(record)
        };
        return values[key] || "미보고";
      }
      function compareSummary(selected) {
        var counts = { "인체 연구": 0, "동물·전임상": 0, "규제·안전성": 0, "근거 자료": 0 };
        selected.forEach(function (record) { var kind = compareKind(record); counts[kind] = (counts[kind] || 0) + 1; });
        var parts = Object.keys(counts).filter(function (key) { return counts[key]; }).map(function (key) { return key + " " + counts[key] + "건"; });
        var mixed = [counts["인체 연구"], counts["동물·전임상"], counts["규제·안전성"]].filter(function (value) { return value; }).length > 1;
        return "선택 자료 " + selected.length + "건 · " + parts.join(" · ") + ". " + (mixed
          ? "자료 유형이 다르므로 결과를 직접 합산하지 말고 연구 설계·개입·대조군·기간을 먼저 비교하세요."
          : "연구 설계·개입·대조군·기간을 먼저 확인하세요.") + " 이 표는 근거의 우열이나 제품 효능을 자동 판정하지 않습니다.";
      }
      function renderCompareTray() {
        var tray = el("compare-tray");
        if (!tray) return;
        var selected = selectedCompareRecords();
        compareIds = selected.map(function (record) { return String(record.id); });
        tray.hidden = selected.length === 0;
        el("compare-summary").textContent = selected.length + "개 선택 · 최대 4개까지 비교할 수 있습니다.";
        el("compare-open").disabled = selected.length < 2;
        document.querySelectorAll("[data-compare-toggle]").forEach(function (button) {
          var active = compareIds.indexOf(String(button.dataset.compareToggle)) >= 0;
          button.setAttribute("aria-pressed", String(active));
          button.textContent = active ? "비교에서 제거" : "비교에 추가";
        });
      }
      function toggleCompare(recordId) {
        var id = String(recordId || "");
        var index = compareIds.indexOf(id);
        if (index >= 0) compareIds.splice(index, 1);
        else if (selectedCompareRecords().length >= 4) { toast("비교 자료는 최대 4개까지 선택할 수 있습니다"); return; }
        else if (records.some(function (record) { return String(record.id) === id; })) compareIds.push(id);
        saveCompareIds();
        persistUrl("replace");
        renderCompareTray();
      }
      function renderCompareTable() {
        var selected = selectedCompareRecords();
        var target = el("compare-table");
        if (!target) return;
        var insight = el("compare-dialog-insight");
        if (insight) insight.textContent = compareSummary(selected);
        var rows = [
          ["연구 유형", "kind"], ["연구 설계", "design"], ["개입 형태·경로", "intervention"], ["결과 영역", "outcome"], ["결과 방향", "direction"],
          ["관리 상태", "status"], ["근거 등급", "grade"], ["대상·시험계", "population"], ["GABA 용량·노출", "dose"],
          ["기간", "duration"], ["대조군·사용조건", "comparator"], ["핵심 결과", "finding"], ["해석 경계", "boundary"],
          ["원문 접근 감사", "audit"], ["확인일", "checked"],
          ["연구의 의미", "meaning"], ["마케팅 활용 방안", "marketing"]
        ];
        target.innerHTML = '<table class="compare-table"><thead><tr><th scope="col">비교 항목</th>' + selected.map(function (record) {
          return '<th scope="col"><span class="compare-title">' + esc(koreanTitle(record)) + '</span><br><span style="color:var(--muted);font-size:11px">' + esc(compareKind(record)) + " · " + esc(record.year || "연도 미상") + '</span>' + linkButton(primarySourceUrl(record), "원문 확인 · " + primarySourceLabel(record), false) + '</th>';
        }).join("") + '</tr></thead><tbody>' + rows.map(function (row) {
          return '<tr><th scope="row">' + esc(row[0]) + '</th>' + selected.map(function (record) { return '<td>' + esc(compareValue(record, row[1])) + '</td>'; }).join("") + '</tr>';
        }).join("") + '</tbody></table>';
      }
      function compareText() {
        var selected = selectedCompareRecords();
        var rows = [
          ["연구 유형", "kind"], ["연구 설계", "design"], ["개입 형태·경로", "intervention"], ["결과 영역", "outcome"], ["결과 방향", "direction"],
          ["관리 상태", "status"], ["근거 등급", "grade"], ["대상·시험계", "population"], ["GABA 용량·노출", "dose"],
          ["기간", "duration"], ["대조군·사용조건", "comparator"], ["핵심 결과", "finding"], ["해석 경계", "boundary"],
          ["원문 접근 감사", "audit"], ["확인일", "checked"],
          ["연구의 의미", "meaning"], ["마케팅 활용 방안", "marketing"]
        ];
        return [["검증 스냅샷", DB.meta.snapshotDate], ["자동 탐색 기준일", discoverySnapshotValue()], ["현재 조건", currentConditionSummary()], ["비교 해석", compareSummary(selected)], ["비교 항목"].concat(selected.map(function (record) { return koreanTitle(record); }))]
          .concat(rows.map(function (row) { return [row[0]].concat(selected.map(function (record) { return compareValue(record, row[1]); })); }))
          .map(function (row) { return row.join("\t"); }).join("\n");
      }
      async function copyCompareSelection() {
        var text = compareText();
        try {
          await navigator.clipboard.writeText(text);
          toast("비교표를 복사했습니다");
        } catch (_) {
          openCopyDialog("비교표", "클립보드 권한이 없으면 아래 표를 선택해 직접 복사하세요.", text, "비교표를 복사했습니다");
        }
      }
      function exportCompareSelection() {
        var selected = selectedCompareRecords();
        if (selected.length < 2) { toast("비교할 자료를 2개 이상 선택하세요"); return; }
        var rows = [
          ["연구 유형", "kind"], ["연구 설계", "design"], ["개입 형태·경로", "intervention"], ["결과 영역", "outcome"], ["결과 방향", "direction"],
          ["관리 상태", "status"], ["근거 등급", "grade"], ["대상·시험계", "population"], ["GABA 용량·노출", "dose"], ["기간", "duration"],
          ["대조군·사용조건", "comparator"], ["핵심 결과", "finding"], ["해석 경계", "boundary"], ["원문 접근 감사", "audit"], ["확인일", "checked"], ["연구의 의미", "meaning"], ["마케팅 활용 방안", "marketing"]
        ];
        var csvRows = [["검증 스냅샷", DB.meta.snapshotDate], ["자동 탐색 기준일", discoverySnapshotValue()], ["현재 조건", currentConditionSummary()], [], ["비교 항목"].concat(selected.map(function (record) { return koreanTitle(record); }))]
          .concat(rows.map(function (row) { return [row[0]].concat(selected.map(function (record) { return compareValue(record, row[1]); })); }))
          .map(function (row) { return row.map(csvCell).join(","); });
        var blob = new Blob(["\uFEFF" + csvRows.join("\r\n")], { type: "text/csv;charset=utf-8" });
        var url = URL.createObjectURL(blob);
        var anchor = document.createElement("a");
        anchor.href = url;
        anchor.download = "gaba-evidence-comparison-" + String(DB.meta.snapshotDate || "snapshot") + ".csv";
        document.body.appendChild(anchor);
        anchor.click();
        anchor.remove();
        URL.revokeObjectURL(url);
        toast("비교표 CSV를 저장했습니다");
      }
      function openCompareDialog() {
        if (selectedCompareRecords().length < 2) { toast("비교할 자료를 2개 이상 선택하세요"); return; }
        renderCompareTable();
        var dialog = el("compare-dialog");
        compareReturnFocus = document.activeElement;
        if (typeof dialog.showModal === "function") dialog.showModal();
        else dialog.setAttribute("open", "");
        el("compare-dialog-close").focus();
      }
      function closeCompareDialog() {
        var dialog = el("compare-dialog");
        if (dialog && typeof dialog.close === "function" && dialog.open) dialog.close();
        else if (dialog) dialog.removeAttribute("open");
        if (compareReturnFocus && typeof compareReturnFocus.focus === "function") compareReturnFocus.focus();
        compareReturnFocus = null;
      }

      function regulatoryCard(record) {
        var sourcePrimary = record.sourceUrl || record.fulltextUrl;
        var decisionExtra = record.decisionUrl && record.decisionUrl !== sourcePrimary
          ? linkButton(record.decisionUrl, "규제 결정문", false)
          : "";
        var originalTitle = record.title && record.title !== record.titleKo
          ? '<p class="original-title" lang="en">' + esc(record.title) + '</p>'
          : "";
        return '<article class="paper-card regulatory-card">' +
          '<div class="paper-badges">' +
            '<span class="badge regulatory">규제·안전성</span>' +
            '<span class="badge ' + badgeClass("status", record.status) + '">' + esc(record.status) + '</span>' +
            sourceAuditBadge(record) +
            marketingFilterBadge(record) +
            '<span class="badge">' + esc(record.grade) + '</span>' +
            '<span class="badge">' + esc(record.agency) + '</span>' +
            '<span class="badge">품질 ' + esc(record.quality) + '</span>' +
          '</div>' +
          '<h3 class="paper-title"><span class="title-label">한국어 제목</span><span class="paper-title-korean">' + esc(koreanTitle(record)) + '</span></h3>' +
          originalTitle +
          '<p class="paper-meta"><strong>' + esc(record.year) + '</strong> · ' + esc(record.agency) + ' · ' + esc(record.country) + ' · ' + esc(record.documentType) + (record.checked ? ' · 확인 ' + esc(record.checked) : '') + '</p>' +
          '<p class="finding"><strong>한국어 요약</strong> · ' + esc(record.summaryKo || record.finding) + '</p>' +
          interpretationBlock(record) +
          '<dl class="fact-grid">' +
            fact("안전성 영역", record.safetyArea) +
            fact("원료 동일성", record.identity) +
            fact("사용조건 일치", record.useMatch) +
            fact("자료품질", record.quality) +
          '</dl>' +
          '<p class="regulatory-note">해외 규제자료는 식약처 인정의 자동 대체가 아닙니다. 국내 원료·공정·용도·노출량과 최신 고시를 함께 확인하세요.</p>' +
          '<details class="paper-detail">' +
            '<summary>심사 활용도·안전성 내용 자세히 보기</summary>' +
            '<dl class="detail-grid">' +
              detail("심사활용 질문", record.useQuestion) +
              detail("원료명", [record.ingredientKo, record.ingredientEn].filter(Boolean).join(" / ")) +
              detail("대상·시험계", record.subject) +
              detail("용량·노출량", record.exposure) +
              detail("시험기간", record.duration) +
              detail("핵심안전성결과", record.safetyFinding) +
              detail("NOAEL·안전역", record.noael) +
              detail("유해·이상반응", record.adverse) +
              detail("GLP·시험지침", record.guidelines) +
              detail("국내외 인정상태", record.recognition) +
              detail("업데이트메모", record.notes) +
            '</dl>' +
          '</details>' +
          '<div class="paper-footer">' +
            linkButton(sourcePrimary, primarySourceLabel(record), true) + decisionExtra + '<button class="paper-review" type="button" data-intelligence-id="' + esc(record.id) + '">상세 검토</button><button class="paper-compare" type="button" data-compare-toggle="' + esc(record.id) + '" aria-pressed="false">비교에 추가</button>' +
            '<span class="record-id">' + esc(record.id) + '</span>' +
          '</div>' +
        '</article>';
      }

      function paperCard(record) {
        if (record.kind === "규제") return regulatoryCard(record);
        var sourcePrimary = primarySourceUrl(record);
        var pubmedExtra = record.pubmedUrl && record.pubmedUrl !== sourcePrimary ? linkButton(record.pubmedUrl, "PubMed 원문", false) : "";
        var doiExtra = record.doiUrl && record.doiUrl !== sourcePrimary && record.doiUrl !== record.pubmedUrl ? linkButton(record.doiUrl, "DOI 원문", false) : "";
        var identifierLabel = record.pmid && record.doi ? "PMID·DOI" : record.pmid ? "PMID" : record.doi ? "DOI" : "식별자 미완";
        return '<article class="paper-card">' +
          '<div class="paper-badges">' +
            '<span class="badge ' + badgeClass("kind", record.kind) + '">' + esc(record.kind === "임상" ? "인체 임상" : record.kind === "동물" ? "동물시험" : record.kind) + '</span>' +
            '<span class="badge ' + badgeClass("status", record.status) + '">' + esc(record.status) + '</span>' +
            sourceAuditBadge(record) +
            (publicationFollowupLabel(record) ? '<span class="badge followup-badge" title="철회·정정·우려표명 등 출판 후속조치 신호입니다. 원문 공지를 확인하세요.">' + esc(publicationFollowupLabel(record)) + '</span>' : '') +
            marketingFilterBadge(record) +
            '<button class="badge intervention intervention-filter-badge" type="button" data-intervention="' + esc(interventionClass(record)) + '" aria-label="' + esc(interventionClass(record) + ' 자료로 필터') + '">개입 · ' + esc(interventionShortLabel(record)) + '</button>' +
            '<span class="badge ' + badgeClass("sci", record.sciGroup) + '">' + esc(record.sciGroup) + '</span>' +
            '<span class="badge ' + badgeClass("extraction", record.extraction) + '">추출 ' + esc(record.extraction) + '</span>' +
            '<span class="badge">' + esc(identifierLabel) + '</span>' +
            (record.direction ? '<span class="badge ' + badgeClass("direction", record.direction) + '">' + esc(record.direction) + '</span>' : "") +
          '</div>' +
          '<h3 class="paper-title"><span class="title-label">' + esc(koreanTitleLabel(record)) + '</span><span class="paper-title-korean">' + esc(koreanTitle(record)) + '</span></h3>' +
          '<p class="original-title" lang="en"><span class="title-label">영문 원제</span>' + esc(record.title) + '</p>' +
          '<p class="paper-meta"><strong>' + esc(record.year) + '</strong> · ' + esc(record.author || "저자 미상") + ' · ' + esc(record.journal || "저널 미상") + (record.checked ? ' · 확인 ' + esc(record.checked) : '') + '</p>' +
          (record.finding ? '<p class="finding"><strong>핵심결과</strong> · ' + esc(record.finding) + '</p>' : "") +
          interpretationBlock(record) +
          '<dl class="fact-grid">' +
            fact("대상", record.population || record.species) +
            fact("표본·대조군", [record.n ? "n=" + record.n : "", record.comparator].filter(Boolean).join(" · ")) +
            fact("GABA 용량", record.dose) +
            fact("기간", record.duration) +
          '</dl>' +
          '<details class="paper-detail">' +
            '<summary>연구조건·안전성·한계 자세히 보기</summary>' +
            '<dl class="detail-grid">' +
              detail("연구설계", record.design) +
              detail("건강상태/모델", record.model) +
              detail("개입형태", record.form) +
              detail("개입 구분", interventionClass(record)) +
              detail("투여경로", record.route) +
              detail("대조군", record.comparator) +
              detail("출판 후속조치", publicationFollowupLabel(record) || "확인 신호 없음 · 원문 공지 별도 확인") +
              detail("결과영역", record.domain) +
              detail("주요평가변수", record.outcome) +
              detail("안전성/이상반응", record.safety || "상세 미보고") +
              detail("한계/비뚤림·이해상충", record.limitation || "상세 미보고") +
              detail("비고", record.notes) +
              detail("DOI", record.doi) +
              detail("PMID", record.pmid) +
              detail("임상시험 등록번호", record.clinicalTrialId) +
            '</dl>' +
          '</details>' +
          '<div class="paper-footer">' +
            linkButton(sourcePrimary, sourceLabel, true) + pubmedExtra + doiExtra + '<button class="paper-review" type="button" data-intelligence-id="' + esc(record.id) + '">상세 검토</button><button class="paper-compare" type="button" data-compare-toggle="' + esc(record.id) + '" aria-pressed="false">비교에 추가</button><button class="paper-read-later" type="button" data-reading-toggle="' + esc(record.id) + '" aria-pressed="false">읽기 목록에 저장</button>' +
            '<span class="record-id">' + esc(record.id) + '</span>' +
          '</div>' +
        '</article>';
      }

      var filterNames = {
         q: "검색", kind: "구분", category: "자료 카테고리", effectCategory: "효과·적용 분야", status: "상태", marketing: "마케팅 활용", intervention: "개입 구분", followup: "출판 후속조치", grade: "규제등급", agency: "규제기관",
        safetyArea: "안전성영역", sci: "SCI", species: "종",
        topic: "주제", extraction: "추출", direction: "결과", source: "원문", audit: "원문 접근 감사", freshness: "재확인 상태", sort: "정렬"
      };
      function sourceLabel(value) {
        return { available: "원문·식별자 링크 있음", drive: "Drive 원문", link: "외부 링크", none: "링크 없음" }[value] || value;
      }
      function auditLabel(value) {
        return { ok: "감사 시점 접근 확인", unavailable: "접근 제한·일시 응답·페이지 오류", missing: "개별 감사 기록 없음" }[value] || value;
      }
      function freshnessLabel(value) {
        return { recent: "최근 확인 (90일 이내)", stale: "재확인 권고 (90일 초과)", unknown: "확인일 미상" }[value] || value;
      }
      function sortLabel(value) {
        return { latest: "최신 연도순", oldest: "과거 연도순", title: "제목 가나다순", updated: "최근 확인순", "human-source": "인체·원문 우선", "review-priority": "검토 우선순위" }[value] || value;
      }
      function pageSizeLabel(value) {
        return Number(value || 20).toLocaleString("ko-KR") + "개씩";
      }
      function doseRangeLabel(range) {
        return Number(range.from).toLocaleString("ko-KR") + "–" + Number(range.to).toLocaleString("ko-KR") + " mg/day";
      }
      function queryFilterLabel(value) {
        var text = String(value || "").trim();
        var plan = queryPlan(text);
        if (!plan.doseRanges.length) return text;
        return text + " · 용량 범위 " + plan.doseRanges.map(doseRangeLabel).join(", ");
      }
      function activeConditionLabels() {
        var labels = [];
        Object.keys(filterNames).forEach(function (key) {
          if (!state[key]) return;
          if (key === "sort" && state.sort === "latest") return;
          var value = key === "q" ? queryFilterLabel(state[key]) : key === "source" ? sourceLabel(state[key]) : key === "audit" ? auditLabel(state[key]) : key === "freshness" ? freshnessLabel(state[key]) : key === "sort" ? sortLabel(state[key]) : key === "followup" ? "철회·정정·우려표명 신호" : state[key];
          labels.push(filterNames[key] + ": " + value);
        });
        if (state.from !== DB.meta.minYear || state.to !== DB.meta.maxYear) labels.push("연도: " + state.from + "–" + state.to);
        if (pageSize !== 20) labels.push("표시 수: " + pageSizeLabel(pageSize));
        return labels;
      }
      function currentConditionSummary() {
        var labels = activeConditionLabels();
        return labels.length ? labels.join(" · ") : "전체 검증 근거";
      }
      function discoverySnapshotValue() {
        return String((DB.meta.discovery && DB.meta.discovery.snapshotDate) || "미상");
      }
      function renderActiveFilters() {
        var chips = [];
        var summary = activeConditionLabels();
        Object.keys(filterNames).forEach(function (key) {
          if (!state[key] || (key === "sort" && state.sort === "latest")) return;
          var value = key === "q" ? queryFilterLabel(state[key]) : key === "source" ? sourceLabel(state[key]) : key === "audit" ? auditLabel(state[key]) : key === "freshness" ? freshnessLabel(state[key]) : key === "sort" ? sortLabel(state[key]) : key === "followup" ? "철회·정정·우려표명 신호" : state[key];
          chips.push('<button class="filter-chip" type="button" data-remove="' + esc(key) + '">' + esc(filterNames[key] + ": " + value) + ' ×</button>');
        });
        if (state.from !== DB.meta.minYear || state.to !== DB.meta.maxYear) chips.push('<button class="filter-chip" type="button" data-remove="year">연도: ' + state.from + "–" + state.to + ' ×</button>');
        if (pageSize !== 20) chips.push('<button class="filter-chip" type="button" data-remove="pageSize">표시 수: ' + pageSizeLabel(pageSize) + ' ×</button>');
        el("active-filters").innerHTML = chips.join("");
        var statusText = el("filter-status-text");
        var statusReset = el("filter-status-reset");
        var resultCount = el("filter-result-count");
        if (statusText) {
          var resultLabel = resultCount ? resultCount.textContent : "현재 결과";
          var shown = summary.slice(0, 3);
          if (summary.length > shown.length) shown.push("외 " + (summary.length - shown.length) + "개");
          statusText.textContent = (summary.length ? shown.join(" · ") : "전체 검증 근거") + " · " + resultLabel;
        }
        if (statusReset) statusReset.hidden = summary.length === 0;
      }
      function syncSortHelp() {
        var note = el("sort-help");
        if (!note) return;
        note.hidden = !["human-source", "review-priority"].includes(state.sort);
      }
      function closeResultExportMenu() {
        var menu = el("result-export-menu");
        if (menu) menu.open = false;
      }

      function syncAdvancedFilterDisclosure() {
        var advancedKeys = ["grade", "agency", "safetyArea", "sci", "species", "topic", "extraction", "direction", "source", "audit", "freshness"];
        var count = advancedKeys.filter(function (key) { return Boolean(state[key]); }).length;
        if (state.from !== DB.meta.minYear || state.to !== DB.meta.maxYear) count += 1;
        var badge = el("advanced-filter-count");
        var details = el("advanced-filters");
        if (!badge || !details) return;
        badge.textContent = count ? count + "개 선택" : "선택 없음";
        badge.classList.toggle("has-filters", count > 0);
        if (count) details.open = true;

        var regulatoryKeys = ["grade", "agency", "safetyArea"];
        var researchKeys = ["routeGroup", "sci", "species", "topic", "extraction", "direction", "source", "audit", "freshness"];
        var regulatoryCount = regulatoryKeys.filter(function (key) { return Boolean(state[key]); }).length;
        var researchCount = researchKeys.filter(function (key) { return Boolean(state[key]); }).length;
        if (state.from !== DB.meta.minYear || state.to !== DB.meta.maxYear) researchCount += 1;
        var regulatoryLabel = el("regulatory-filter-group-count");
        var researchLabel = el("research-filter-group-count");
        if (regulatoryLabel) regulatoryLabel.textContent = regulatoryCount ? regulatoryCount + "개 선택" : "선택 없음";
        if (researchLabel) researchLabel.textContent = researchCount ? researchCount + "개 선택" : "선택 없음";
        var regulatoryDetails = el("regulatory-filters");
        var researchDetails = el("research-filters");
        if (regulatoryCount && regulatoryDetails) regulatoryDetails.open = true;
        if (researchCount && researchDetails) researchDetails.open = true;

        var topLevelKeys = ["kind", "category", "effectCategory", "status", "marketing", "intervention", "followup"];
        var total = count + topLevelKeys.filter(function (key) { return Boolean(state[key]); }).length + (state.q ? 1 : 0);
        var activeCount = el("filter-active-count");
        if (activeCount) {
          activeCount.textContent = total ? total + "개 적용" : "조건 없음";
          activeCount.classList.toggle("has-filters", total > 0);
          activeCount.setAttribute("aria-label", total ? total + "개 필터 조건 적용" : "적용된 필터 조건 없음");
        }
        var mobileCount = el("mobile-filter-count");
        if (mobileCount) {
          mobileCount.textContent = total ? String(total) : "";
          mobileCount.hidden = total === 0;
          mobileCount.setAttribute("aria-label", total ? total + "개 조건 적용" : "조건 없음");
        }
        var mobileButton = el("mobile-filter");
        if (mobileButton) mobileButton.setAttribute("aria-label", total ? "필터, " + total + "개 조건 적용" : "필터 열기");
        var quickReset = el("filter-reset-quick");
        if (quickReset) {
          quickReset.hidden = total === 0;
          quickReset.setAttribute("aria-label", total ? total + "개 조건 초기화" : "필터 조건 없음");
        }
      }

      function renderResultInterpretation(list) {
        var target = el("result-interpretation");
        if (!target) return;
        var clinical = list.filter(function (record) { return record.kind === "임상"; }).length;
        var animal = list.filter(function (record) { return record.kind === "동물"; }).length;
        var regulatory = list.filter(function (record) { return record.kind === "규제"; }).length;
        var review = list.filter(function (record) { return record.status === "후보" || record.status === "보류" || record.extraction === "부분"; }).length;
        var oral = list.filter(function (record) { return record.routeGroup === "경구·섭취"; }).length;
        var clinicalAction = clinical ? '<button class="result-interpretation-stat result-interpretation-stat-action" type="button" data-result-preset="clinical" aria-pressed="' + String(state.kind === "임상") + '" aria-label="인체 연구 ' + clinical.toLocaleString("ko-KR") + '건만 보기">인체 연구 <strong>' + clinical.toLocaleString("ko-KR") + '</strong></button>' : '<span class="result-interpretation-stat">인체 연구 <strong>0</strong></span>';
        var animalAction = animal ? '<button class="result-interpretation-stat result-interpretation-stat-action" type="button" data-result-preset="animal" aria-pressed="' + String(state.kind === "동물") + '" aria-label="동물·전임상 ' + animal.toLocaleString("ko-KR") + '건만 보기">동물·전임상 <strong>' + animal.toLocaleString("ko-KR") + '</strong></button>' : '<span class="result-interpretation-stat">동물·전임상 <strong>0</strong></span>';
        var regulatoryAction = regulatory ? '<button class="result-interpretation-stat result-interpretation-stat-action" type="button" data-result-preset="regulatory" aria-pressed="' + String(state.kind === "규제") + '" aria-label="규제·안전성 ' + regulatory.toLocaleString("ko-KR") + '건만 보기">규제·안전성 <strong>' + regulatory.toLocaleString("ko-KR") + '</strong></button>' : '<span class="result-interpretation-stat">규제·안전성 <strong>0</strong></span>';
        var oralAction = oral ? '<button class="result-interpretation-route" type="button" data-result-preset="oral">경구·섭취만 보기 · ' + oral.toLocaleString("ko-KR") + '건</button>' : '';
        var query = state.q ? state.q.trim() : "전체 근거";
        var guard = state.audit === "unavailable"
          ? "접근 제한·일시 응답은 근거 약함이 아니라 원문 재확인·대체 경로 검토 대상입니다."
          : state.freshness === "stale" || state.freshness === "unknown"
            ? "확인일 경과·미상은 근거 약함을 뜻하지 않습니다. 최신 원문과 출판 후속 공지를 다시 확인하세요."
          : "검색 결과 요약은 효능 등급·규제 승인·광고 허가를 뜻하지 않습니다. 원문에서 대상·용량·기간·대조군을 확인하세요.";
        target.innerHTML = '<div class="result-interpretation-head"><span class="result-interpretation-label">현재 탐색</span><strong class="result-interpretation-query" title="' + esc(query) + '">' + esc(query) + '</strong></div>' +
          '<div class="result-interpretation-stats" aria-label="현재 결과의 근거 구성">' +
            clinicalAction +
            animalAction +
            regulatoryAction +
            '<span class="result-interpretation-stat">추가 확인 <strong>' + review.toLocaleString("ko-KR") + '</strong></span>' +
          '</div>' +
          '<p class="result-interpretation-note">인체·동물·규제 자료는 근거의 범위가 다릅니다. <strong>' + list.length.toLocaleString("ko-KR") + '건</strong>을 확인할 때 인체 연구와 원문 상태를 먼저 비교하세요.</p>' +
          '<div class="result-interpretation-actions" aria-label="현재 결과에서 다음 행동"><span class="result-interpretation-actions-label">다음 행동</span><button class="result-interpretation-route" type="button" data-result-preset="human-direct">인체 직접근거만 보기</button>' + oralAction + '<button class="result-interpretation-route" type="button" data-result-preset="source">원문 연결 자료만 보기</button>' + (review ? '<button class="result-interpretation-route" type="button" data-result-preset="review">추가 검토 큐 보기</button>' : '') + '</div>' +
          '<p class="result-interpretation-guard"><strong>해석 경계</strong> ' + esc(guard) + '</p>' +
          (review ? '<button class="result-interpretation-action" id="result-review-jump" type="button">추가 확인 큐 보기 · ' + review.toLocaleString("ko-KR") + '건</button>' : '');
      }

      function render(historyMode) {
        var renderStarted = performance.now();
        var list = filteredRecords();
        var filterResultCount = el("filter-result-count");
        if (filterResultCount) filterResultCount.textContent = "현재 " + list.length.toLocaleString("ko-KR") + "건";
        var mobileApply = el("filter-mobile-apply");
        if (mobileApply) mobileApply.textContent = "현재 결과 보기 · " + list.length.toLocaleString("ko-KR") + "건";
        var totalPages = Math.max(1, Math.ceil(list.length / pageSize));
        if (state.page > totalPages) state.page = totalPages;
        var start = (state.page - 1) * pageSize;
        var pageRecords = list.slice(start, start + pageSize);
        var elapsed = Math.max(0, performance.now() - renderStarted);
        el("result-count").innerHTML = '검증 레코드 ' + DB.meta.total.toLocaleString("ko-KR") + '건 중 <strong>' + list.length.toLocaleString("ko-KR") + '건</strong> · ' + elapsed.toFixed(elapsed < 10 ? 1 : 0) + 'ms<small>문헌 ' + Number(DB.meta.literature || 0).toLocaleString("ko-KR") + '편 + 규제·안전성 자료 ' + Number(DB.meta.regulatory || 0).toLocaleString("ko-KR") + '건 · 자동 탐색 후보는 별도 큐</small>';
        el("papers").innerHTML = pageRecords.length
          ? pageRecords.map(paperCard).join("")
          : '<div class="empty-state"><h3>조건에 맞는 자료가 없습니다</h3><p>현재 조건을 완화하면 다시 탐색할 수 있습니다.</p><div class="empty-actions">' +
            (state.q ? '<button class="empty-action secondary" type="button" data-empty-clear-query>검색어 지우기</button>' : '') +
            '<button class="empty-action" type="button" data-empty-reset>모든 조건 초기화</button></div><div class="empty-suggestions" aria-label="추천 재탐색 경로"><span class="empty-suggestions-label">추천 재탐색</span><button class="empty-suggestion" type="button" data-empty-query="수면">수면</button><button class="empty-suggestion" type="button" data-empty-query="불안 스트레스">불안·스트레스</button><button class="empty-suggestion" type="button" data-empty-query="안전성 독성">안전성·독성</button></div></div>';
        el("page-status").textContent = state.page + " / " + totalPages;
        el("page-status").setAttribute("aria-label", "현재 " + state.page + "페이지 / 전체 " + totalPages + "페이지");
        el("prev").disabled = state.page <= 1;
        el("next").disabled = state.page >= totalPages;
        el("pagination").hidden = list.length <= pageSize;
        renderActiveFilters();
        syncSortHelp();
        renderCompareTray();
        renderReadingListButtonState();
        syncAdvancedFilterDisclosure();
        renderResultInterpretation(list);
        syncControls();
        syncDistributionSelection();
        persistUrl(historyMode);
        if (sharedReviewNeedsFocus && sharedReviewIds.length) {
          sharedReviewNeedsFocus = false;
          window.setTimeout(function () {
            var queueSection = el("review-queue");
            var queueTitle = el("review-queue-title");
            if (queueSection) queueSection.scrollIntoView({ block: "start" });
            if (queueTitle && typeof queueTitle.focus === "function") queueTitle.focus({ preventScroll: true });
          }, 0);
        } else if (candidatePreviewNeedsFocus && candidatePreviewFilter !== "all") {
          candidatePreviewNeedsFocus = false;
          window.setTimeout(function () {
            var candidateSection = el("candidate-preview");
            var candidateTitle = el("candidate-preview-title");
            if (candidateSection) candidateSection.scrollIntoView({ block: "start" });
            if (candidateTitle && typeof candidateTitle.focus === "function") {
              candidateTitle.setAttribute("tabindex", "-1");
              candidateTitle.focus({ preventScroll: true });
            }
          }, 0);
        }
      }

      function changeState(key, value, historyMode) {
        state[key] = value;
        state.page = 1;
        render(historyMode || "push");
      }
      function resetFilters() {
        pageSize = 20;
        var advanced = el("advanced-filters");
        if (advanced) advanced.open = false;
        var regulatoryDetails = el("regulatory-filters");
        var researchDetails = el("research-filters");
        if (regulatoryDetails) regulatoryDetails.open = false;
        if (researchDetails) researchDetails.open = false;
        state = {
           q: "", kind: "", category: "", effectCategory: "", status: "", marketing: "", intervention: "", routeGroup: "", followup: "", sci: "", species: "", topic: "",
          grade: "", agency: "", safetyArea: "", extraction: "", direction: "", source: "", audit: "", freshness: "", from: DB.meta.minYear,
          to: DB.meta.maxYear, sort: "latest", page: 1
        };
        render("push");
      }
      function openFilters(open) {
        el("filter-panel").classList.toggle("open", open);
        document.body.classList.toggle("filter-open", open);
        el("mobile-filter").setAttribute("aria-expanded", String(open));
        if (open) el("filter-close").focus();
      }
      var toastTimer;
      function toast(message) {
        clearTimeout(toastTimer);
        el("toast").textContent = message;
        el("toast").classList.add("show");
        toastTimer = setTimeout(function () { el("toast").classList.remove("show"); }, 1800);
      }
      function persistSavedSearches() {
        try { localStorage.setItem("gaba-saved-searches-v1", JSON.stringify(savedSearches.slice(0, 10))); } catch (_) {}
      }
      function savedSearchLabel() {
        var label = state.q ? state.q.trim() : "전체 검증 근거";
        var status = el("filter-status-text")?.textContent || "";
        if (!state.q && status && status !== "전체 검증 근거") label = status;
        return label.length > 52 ? label.slice(0, 52) + "…" : label;
      }
      function renderSavedSearches() {
        var count = el("saved-search-count");
        var list = el("saved-search-list");
        if (!count || !list) return;
        var savedCount = savedSearches.length.toLocaleString("ko-KR");
        count.textContent = savedCount;
        var summary = document.querySelector("#saved-search-menu summary");
        if (summary) summary.setAttribute("aria-label", "저장 검색, " + savedCount + "개 저장됨");
        list.innerHTML = savedSearches.length ? savedSearches.map(function (item) {
          return '<div class="saved-search-item"><button class="saved-search-load" type="button" data-saved-search-load="' + esc(item.id) + '" title="' + esc(item.label) + '">' + esc(item.label) + '</button><button class="saved-search-share" type="button" data-saved-search-share="' + esc(item.id) + '" aria-label="' + esc(item.label + " 조건 링크 복사") + '" title="조건 링크 복사">↗</button><button class="saved-search-delete" type="button" data-saved-search-delete="' + esc(item.id) + '" aria-label="' + esc(item.label + " 저장 검색 삭제") + '">×</button></div>';
        }).join("") : '<p class="saved-search-empty">저장된 검색 조건이 없습니다.</p>';
      }
      function saveCurrentSearch() {
        var search = location.search || "";
        var existing = savedSearches.find(function (item) { return item.search === search; });
        if (existing) {
          savedSearches = [existing].concat(savedSearches.filter(function (item) { return item !== existing; }));
          toast("이미 저장된 조건을 위로 올렸습니다");
        } else {
          savedSearches.unshift({ id: "search-" + Date.now().toString(36), label: savedSearchLabel(), search: search, savedAt: new Date().toISOString() });
          savedSearches = savedSearches.slice(0, 10);
          toast("검색 조건을 저장했습니다");
        }
        persistSavedSearches();
        renderSavedSearches();
      }
      function loadSavedSearch(id) {
        var item = savedSearches.find(function (entry) { return entry.id === id; });
        if (!item) return;
        history.pushState({}, "", item.search || location.pathname);
        loadUrlState();
        syncControls();
        render();
        var menu = el("saved-search-menu");
        if (menu) menu.open = false;
        toast("저장된 검색 조건을 불러왔습니다");
        scrollToResults();
      }
      async function copySavedSearchLink(id) {
        var item = savedSearches.find(function (entry) { return entry.id === id; });
        if (!item) return;
        var url = location.origin + location.pathname + (item.search || "");
        try {
          await navigator.clipboard.writeText(url);
          toast("저장 검색 조건 링크를 복사했습니다");
        } catch (_) {
          openCopyDialog("저장 검색 조건 링크", "클립보드 권한이 없으면 아래 링크를 선택해 직접 복사하세요.", url, "저장 검색 조건 링크를 복사했습니다");
        }
      }
      function deleteSavedSearch(id) {
        savedSearches = savedSearches.filter(function (item) { return item.id !== id; });
        persistSavedSearches();
        renderSavedSearches();
        toast("저장된 검색 조건을 삭제했습니다");
      }
      function resetPersonalWorkspace() {
        var confirmed = window.confirm("이 브라우저에 저장된 검색 조건·읽기 목록·비교 선택·근거·후보 개인 검토 기록을 모두 초기화할까요? 공개 인덱스와 Sheets는 변경되지 않습니다.");
        if (!confirmed) return;
        ["gaba-saved-searches-v1", "gaba-reading-ids", "gaba-compare-ids", "gaba-review-decisions", "gaba-candidate-decisions-v1"].forEach(function (key) {
          try { localStorage.removeItem(key); } catch (_) {}
        });
        savedSearches = [];
        readingIds = [];
        compareIds = [];
        reviewDecisions = {};
        candidateDecisions = {};
        renderSavedSearches();
        renderReadingList();
        renderReviewQueue();
        renderCompareTray();
        toast("개인 작업을 초기화했습니다");
      }

      loadUrlState();
      initMeta();
      renderSavedSearches();
       renderInterventionCounts();
       renderFollowupCounts();
      renderDistribution("species-distribution", DB.facets.species, "species");
      renderDistribution("direction-distribution", DB.facets.direction, "direction");
      syncControls();
      render();
      if (urlRecordId) openIntelligenceDetail(urlRecordId, "replace");
      if (urlCandidateId) openCandidateDetail(urlCandidateId, "replace");

      window.addEventListener("popstate", function () {
        var detailWasOpen = el("intelligence-detail").open;
        loadUrlState();
        syncControls();
        render();
        if (urlRecordId) openIntelligenceDetail(urlRecordId, "replace");
        else if (urlCandidateId) openCandidateDetail(urlCandidateId, "replace");
        else if (detailWasOpen) closeIntelligenceDetail();
        else if (el("candidate-detail-dialog")?.open) closeCandidateDetail();
      });

      var searchTimer;
      controls.q.addEventListener("input", function () {
        clearTimeout(searchTimer);
        searchTimer = setTimeout(function () { changeState("q", controls.q.value, "replace"); }, 120);
      });
      ["category", "effectCategory", "status", "routeGroup", "grade", "agency", "safetyArea", "sci", "species", "topic", "extraction", "direction", "source", "audit", "freshness", "sort"].forEach(function (key) {
        controls[key].addEventListener("change", function () { changeState(key, controls[key].value); });
      });
      controls.pageSize.addEventListener("change", function () {
        pageSize = Number(controls.pageSize.value) || 20;
        state.page = 1;
        render("push");
      });
      controls.from.addEventListener("change", function () {
        state.from = Math.min(Number(controls.to.value), Math.max(DB.meta.minYear, Number(controls.from.value) || DB.meta.minYear));
        state.page = 1; render("push");
      });
      controls.to.addEventListener("change", function () {
        state.to = Math.max(Number(controls.from.value), Math.min(DB.meta.maxYear, Number(controls.to.value) || DB.meta.maxYear));
        state.page = 1; render("push");
      });
      document.querySelectorAll("[data-kind]").forEach(function (button) {
        button.addEventListener("click", function () {
          var kind = button.dataset.kind || "";
          state.kind = kind;
          if (kind === "규제") {
            state.sci = ""; state.species = ""; state.topic = ""; state.extraction = ""; state.direction = "";
          } else if (kind) {
            state.grade = ""; state.agency = ""; state.safetyArea = "";
          }
          state.page = 1;
          render("push");
        });
      });
      document.querySelectorAll("[data-category]").forEach(function (button) {
        button.addEventListener("click", function () {
          var category = button.dataset.category || "";
          state.category = state.category === category ? "" : category;
          state.page = 1;
          render("push");
        });
      });
      document.querySelectorAll("[data-effect-category]").forEach(function (button) {
        button.addEventListener("click", function () {
          var effectCategory = button.dataset.effectCategory || "";
          state.effectCategory = state.effectCategory === effectCategory ? "" : effectCategory;
          state.page = 1;
          render();
        });
      });
      document.querySelectorAll("[data-marketing]").forEach(function (button) {
        button.addEventListener("click", function () {
          var marketing = button.dataset.marketing || "";
          state.marketing = state.marketing === marketing ? "" : marketing;
          state.page = 1;
          render("push");
        });
      });
      document.querySelectorAll("[data-intervention]").forEach(function (button) {
        button.addEventListener("click", function () {
          var intervention = button.dataset.intervention || "";
          state.intervention = state.intervention === intervention ? "" : intervention;
          state.page = 1;
          render("push");
        });
      });
      document.querySelectorAll("[data-followup]").forEach(function (button) {
        button.addEventListener("click", function () {
          var followup = button.dataset.followup || "";
          state.followup = state.followup === followup ? "" : followup;
          state.page = 1;
          render("push");
        });
      });
      document.querySelectorAll("[data-direction]").forEach(function (button) {
        button.addEventListener("click", function () {
          var direction = button.dataset.direction || "";
          state.direction = state.direction === direction ? "" : direction;
          state.page = 1;
          render("push");
        });
      });
      document.querySelectorAll("[data-preset]").forEach(function (button) {
        button.addEventListener("click", function () { applyPreset(button.dataset.preset || ""); });
      });
      document.querySelectorAll("[data-query]").forEach(function (button) {
        if (button.closest(".intelligence-feed, .portal-lane, .review-queue")) return;
        button.addEventListener("click", function () {
          controls.q.value = button.dataset.query || "";
          changeState("q", controls.q.value);
          controls.q.focus();
        });
      });
      document.querySelectorAll("[data-intelligence-kind]").forEach(function (button) {
        button.addEventListener("click", function () {
          intelligenceKind = button.dataset.intelligenceKind || "";
          renderIntelligenceFeed();
        });
      });
      document.querySelectorAll("[data-intelligence-review]").forEach(function (button) {
        button.addEventListener("click", function () {
          intelligenceReview = button.dataset.intelligenceReview || "";
          renderIntelligenceFeed();
        });
      });
      document.querySelectorAll("[data-review-filter]").forEach(function (button) {
        button.addEventListener("click", function () {
          reviewQueueFilter = button.dataset.reviewFilter || "all";
          if (sharedReviewIds.length) persistUrl("replace");
          renderReviewQueue();
        });
      });
      el("review-hide-done").addEventListener("change", function () {
        reviewQueueHideDone = el("review-hide-done").checked;
        renderReviewQueue();
      });
      el("review-queue-more").addEventListener("click", function () {
        reviewQueueShowAll = !reviewQueueShowAll;
        renderReviewQueue();
      });
      el("review-queue-export").addEventListener("click", exportReviewQueue);
      el("review-queue-markdown").addEventListener("click", exportReviewQueueMarkdown);
      el("methodology-open").addEventListener("click", openMethodology);
      el("link-audit-methodology").addEventListener("click", openMethodology);
      el("methodology-close").addEventListener("click", closeMethodology);
      el("review-queue-share").addEventListener("click", shareReviewQueue);
      el("review-queue-shared-clear").addEventListener("click", clearSharedReviewQueue);
      el("review-share-copy").addEventListener("click", copyReviewShareUrl);
      el("review-share-close").addEventListener("click", closeReviewShareDialog);
      el("review-share-close-secondary").addEventListener("click", closeReviewShareDialog);
      el("review-share-dialog").addEventListener("click", function (event) {
        if (event.target === el("review-share-dialog")) closeReviewShareDialog();
      });
      el("review-share-dialog").addEventListener("cancel", function (event) {
        event.preventDefault();
        closeReviewShareDialog();
      });
      el("copy-dialog-copy").addEventListener("click", copyDialogValue);
      el("copy-dialog-close").addEventListener("click", closeCopyDialog);
      el("copy-dialog-close-secondary").addEventListener("click", closeCopyDialog);
      el("copy-dialog").addEventListener("click", function (event) {
        if (event.target === el("copy-dialog")) closeCopyDialog();
      });
      el("copy-dialog").addEventListener("cancel", function (event) {
        event.preventDefault();
        closeCopyDialog();
      });
      el("review-queue-import").addEventListener("click", function () { el("review-queue-file").click(); });
      el("review-queue-file").addEventListener("change", async function () {
        var file = el("review-queue-file").files?.[0];
        await importReviewQueue(file);
        el("review-queue-file").value = "";
      });
      document.querySelectorAll("[data-detail-review-status]").forEach(function (button) {
        button.addEventListener("click", function () {
          reviewDraftStatus = button.dataset.detailReviewStatus || "pending";
          renderReviewDecisionPanel(currentDetailRecordId);
        });
      });
      el("intelligence-detail-save").addEventListener("click", function () {
        if (!currentDetailRecordId) return;
        var note = el("intelligence-detail-note");
        persistReviewDecision(currentDetailRecordId, reviewDraftStatus, note ? note.value : reviewDraftNote);
        renderReviewQueue();
        toast("로컬 검토 기록을 저장했습니다");
      });
      el("intelligence-detail-close").addEventListener("click", closeIntelligenceDetail);
      el("intelligence-detail").addEventListener("click", function (event) {
        if (event.target === el("intelligence-detail")) closeIntelligenceDetail();
      });
      el("intelligence-detail").addEventListener("cancel", function (event) {
        event.preventDefault();
        closeIntelligenceDetail();
      });
      el("candidate-detail-close").addEventListener("click", closeCandidateDetail);
      el("candidate-detail-dialog").addEventListener("click", function (event) {
        if (event.target === el("candidate-detail-dialog")) closeCandidateDetail();
      });
      el("candidate-detail-dialog").addEventListener("cancel", function (event) {
        event.preventDefault();
        closeCandidateDetail();
      });
      el("candidate-preview-export").addEventListener("click", exportCandidatePreview);
      el("compare-open").addEventListener("click", openCompareDialog);
      el("compare-copy").addEventListener("click", copyCompareSelection);
      el("compare-export").addEventListener("click", exportCompareSelection);
      el("compare-clear").addEventListener("click", function () {
        compareIds = [];
        saveCompareIds();
        persistUrl("replace");
        renderCompareTray();
        toast("비교 선택을 해제했습니다");
      });
      el("compare-dialog-close").addEventListener("click", function () {
        closeCompareDialog();
      });
      el("compare-dialog").addEventListener("click", function (event) {
        if (event.target === el("compare-dialog")) closeCompareDialog();
      });
      el("compare-dialog").addEventListener("cancel", function (event) {
        event.preventDefault();
        closeCompareDialog();
      });
      el("reading-list-open").addEventListener("click", openReadingList);
      el("result-reading-list").addEventListener("click", openReadingList);
      el("reading-list-copy").addEventListener("click", copyReadingList);
      el("reading-list-download").addEventListener("click", downloadReadingList);
      el("reading-list-share").addEventListener("click", shareReadingList);
      el("reading-list-clear").addEventListener("click", clearReadingList);
      el("reading-list-close").addEventListener("click", closeReadingList);
      el("reading-list-dialog").addEventListener("click", function (event) {
        if (event.target === el("reading-list-dialog")) closeReadingList();
      });
      el("reading-list-dialog").addEventListener("cancel", function (event) {
        event.preventDefault();
        closeReadingList();
      });
      el("portal-lane-overview-close").addEventListener("click", function () {
        activeLane = null;
        el("portal-lane-overview").hidden = true;
      });
      document.addEventListener("click", async function (event) {
        if (!event.target.closest("#result-export-menu")) closeResultExportMenu();
        var savedSearchLoad = event.target.closest("[data-saved-search-load]");
        if (savedSearchLoad) {
          loadSavedSearch(savedSearchLoad.dataset.savedSearchLoad || "");
          return;
        }
        var savedSearchShare = event.target.closest("[data-saved-search-share]");
        if (savedSearchShare) {
          await copySavedSearchLink(savedSearchShare.dataset.savedSearchShare || "");
          return;
        }
        var savedSearchDelete = event.target.closest("[data-saved-search-delete]");
        if (savedSearchDelete) {
          deleteSavedSearch(savedSearchDelete.dataset.savedSearchDelete || "");
          return;
        }
        var resultPreset = event.target.closest("[data-result-preset]");
        if (resultPreset) {
          applyPreset(resultPreset.dataset.resultPreset || "", true);
          return;
        }
        var reviewJump = event.target.closest("#result-review-jump");
        if (reviewJump) {
          var reviewTitle = el("review-queue-title");
          reviewTitle.scrollIntoView({ behavior: preferredScrollBehavior(), block: "start" });
          setTimeout(function () { reviewTitle.focus(); }, 120);
          return;
        }
        var emptyReset = event.target.closest("[data-empty-reset]");
        if (emptyReset) {
          resetFilters();
          scrollToResults();
          return;
        }
        var emptyClearQuery = event.target.closest("[data-empty-clear-query]");
        if (emptyClearQuery) {
          changeState("q", "");
          controls.q.focus();
          return;
        }
        var emptyQuery = event.target.closest("[data-empty-query]");
        if (emptyQuery) {
          controls.q.value = emptyQuery.dataset.emptyQuery || "";
          changeState("q", controls.q.value);
          controls.q.focus();
          return;
        }
        var candidateReviewButton = event.target.closest("[data-candidate-review-status]");
        if (candidateReviewButton) {
          var candidateReviewId = String(candidateReviewButton.dataset.candidateReviewId || "");
          if (candidateReviewId) {
            candidateDecisions[candidateReviewId] = { status: candidateReviewButton.dataset.candidateReviewStatus || "미검토", updatedAt: new Date().toISOString() };
            saveCandidateDecisions();
            var candidateDialog = el("candidate-detail-dialog");
            if (candidateDialog?.open) {
              closeCandidateDetail();
              openCandidateDetail(candidateReviewId, "replace");
            } else {
              renderCandidatePreview(DB.meta.discovery?.candidatePreview || []);
            }
            toast("후보 개인 검토 상태를 저장했습니다");
          }
          return;
        }
        var candidateDetailButton = event.target.closest("[data-candidate-detail]");
        if (candidateDetailButton) {
          openCandidateDetail(candidateDetailButton.dataset.candidateDetail || "");
          return;
        }
        var interventionBadge = event.target.closest(".intervention-filter-badge");
        if (interventionBadge) {
          changeState("intervention", interventionBadge.dataset.intervention || "");
          scrollToResults();
          return;
        }
        var marketingBadge = event.target.closest(".marketing-filter-badge");
        if (marketingBadge) {
          changeState("marketing", marketingBadge.dataset.marketing || "");
          scrollToResults();
          return;
        }
        var readingToggle = event.target.closest("[data-reading-toggle]");
        if (readingToggle) {
          toggleReadingList(readingToggle.dataset.readingToggle);
          return;
        }
        var readingRemove = event.target.closest("[data-reading-remove]");
        if (readingRemove) {
          toggleReadingList(readingRemove.dataset.readingRemove);
          return;
        }
        var compareButton = event.target.closest("[data-compare-toggle]");
        if (compareButton) {
          toggleCompare(compareButton.dataset.compareToggle);
          return;
        }
        var reviewStatusButton = event.target.closest("[data-review-status]");
        if (reviewStatusButton) {
          var statusId = reviewStatusButton.dataset.reviewId;
          var nextStatus = reviewStatusButton.dataset.reviewStatus || "pending";
          var currentDecision = reviewDecisionState(statusId);
          persistReviewDecision(statusId, nextStatus, currentDecision.note);
          renderReviewQueue();
          return;
        }
        var reviewDoneButton = event.target.closest("[data-review-done]");
        if (reviewDoneButton) {
          var reviewId = reviewDoneButton.dataset.reviewDone;
          if (reviewDecisions[reviewId]) delete reviewDecisions[reviewId];
          else reviewDecisions[reviewId] = { completedAt: new Date().toISOString() };
          try { localStorage.setItem("gaba-review-decisions", JSON.stringify(reviewDecisions)); } catch (_) {}
          renderReviewQueue();
          return;
        }
        var candidateLinkButton = event.target.closest("[data-copy-candidate-link]");
        if (candidateLinkButton) {
          await copyCandidateLink(candidateLinkButton.dataset.copyCandidateLink);
          return;
        }
        var recordLinkButton = event.target.closest("[data-copy-record-link]");
        if (recordLinkButton) {
          await copyRecordLink(recordLinkButton.dataset.copyRecordLink);
          return;
        }
        var citationButton = event.target.closest("[data-copy-citation]");
        if (citationButton) {
          var citationRecord = records.find(function (item) { return String(item.id) === String(citationButton.dataset.copyCitation); });
          if (!citationRecord) return;
          var citation = citationText(citationRecord);
          try {
            await navigator.clipboard.writeText(citation);
            toast("인용 정보를 복사했습니다");
          } catch (_) {
            openCopyDialog("인용 정보", "클립보드 권한이 없으면 아래 인용 정보를 선택해 직접 복사하세요.", citation, "인용 정보를 복사했습니다");
          }
          return;
        }
        var briefButton = event.target.closest("[data-copy-brief]");
        if (briefButton) {
          var briefRecord = records.find(function (item) { return String(item.id) === String(briefButton.dataset.copyBrief); });
          if (!briefRecord) return;
          var brief = evidenceBriefText(briefRecord);
          try {
            await navigator.clipboard.writeText(brief);
            toast("근거 브리프를 복사했습니다");
          } catch (_) {
            openCopyDialog("근거 브리프", "클립보드 권한이 없으면 아래 브리프를 선택해 직접 복사하세요.", brief, "근거 브리프를 복사했습니다");
          }
          return;
        }
        var laneButton = event.target.closest(".portal-lane");
        if (laneButton) {
          var lane = PORTAL_LANES.find(function (item) { return item.title === laneButton.querySelector("strong")?.textContent; });
          if (lane) {
            renderPortalLaneOverview(lane);
            controls.q.value = lane.query;
            changeState("q", lane.query);
          }
          return;
        }
        var intelligenceButton = event.target.closest("[data-intelligence-id]");
        if (intelligenceButton) {
          if (el("reading-list-dialog").open) closeReadingList();
          openIntelligenceDetail(intelligenceButton.dataset.intelligenceId);
          return;
        }
        var intelligenceQuery = event.target.closest(".intelligence-feed [data-query], .intelligence-detail [data-query], .review-queue [data-query]");
        if (intelligenceQuery) {
          controls.q.value = intelligenceQuery.dataset.query || "";
          changeState("q", controls.q.value);
          controls.q.focus();
          if (el("intelligence-detail").open) closeIntelligenceDetail();
          return;
        }
        var distributionMore = event.target.closest("[data-distribution-more]");
        if (distributionMore) {
          var distributionTarget = el(distributionMore.dataset.distributionMore);
          var isOpen = distributionMore.getAttribute("aria-expanded") === "true";
          distributionTarget.querySelectorAll(".distribution-item-extra").forEach(function (item) { item.hidden = isOpen; });
          distributionMore.setAttribute("aria-expanded", String(!isOpen));
          distributionMore.textContent = isOpen ? "전체 분포 보기 (" + distributionTarget.querySelectorAll(".distribution-item-extra").length.toLocaleString("ko-KR") + "개)" : "상위 항목만 보기";
          return;
        }
        var distribution = event.target.closest("[data-distribution-field]");
        if (distribution) {
          var field = distribution.dataset.distributionField;
          var value = distribution.dataset.distributionValue;
          changeState(field, state[field] === value ? "" : value);
          document.getElementById("results").scrollIntoView({ behavior: preferredScrollBehavior(), block: "start" });
          var resultCount = document.getElementById("result-count");
          if (resultCount && typeof resultCount.focus === "function") resultCount.focus({ preventScroll: true });
        }
        var chip = event.target.closest("[data-remove]");
        if (chip) {
          var key = chip.dataset.remove;
          if (key === "year") { state.from = DB.meta.minYear; state.to = DB.meta.maxYear; }
          else if (key === "pageSize") { pageSize = 20; if (controls.pageSize) controls.pageSize.value = "20"; }
          else state[key] = "";
          state.page = 1; render("push");
        }
        if (document.body.classList.contains("filter-open") && !event.target.closest("#filter-panel") && !event.target.closest("#mobile-filter")) {
          openFilters(false);
        }
      });
      el("search-clear").addEventListener("click", function () { changeState("q", ""); controls.q.focus(); });
      el("reset").addEventListener("click", resetFilters);
      el("result-reset").addEventListener("click", resetFilters);
      el("filter-reset-quick").addEventListener("click", resetFilters);
      el("filter-status-reset").addEventListener("click", resetFilters);
      el("result-export").addEventListener("click", function () { exportFilteredResults(); closeResultExportMenu(); });
      el("result-json").addEventListener("click", function () { exportFilteredJson(); closeResultExportMenu(); });
      el("result-ris").addEventListener("click", function () { exportFilteredRis(); closeResultExportMenu(); });
      el("result-brief").addEventListener("click", function () { copyFilteredBrief(); closeResultExportMenu(); });
      el("result-brief-download").addEventListener("click", function () { exportFilteredBrief(); closeResultExportMenu(); });
      el("result-save-search").addEventListener("click", saveCurrentSearch);
      el("personal-workspace-clear").addEventListener("click", resetPersonalWorkspace);
      el("prev").addEventListener("click", function () { state.page -= 1; render("push"); scrollToResults(); });
      el("next").addEventListener("click", function () { state.page += 1; render("push"); scrollToResults(); });
      el("mobile-filter").addEventListener("click", function () { openFilters(true); });
      el("filter-close").addEventListener("click", function () { openFilters(false); el("mobile-filter").focus(); });
      el("filter-mobile-apply").addEventListener("click", function () {
        openFilters(false);
        var resultCount = el("result-count");
        if (resultCount && typeof resultCount.focus === "function") resultCount.focus({ preventScroll: true });
        el("results").scrollIntoView({ behavior: preferredScrollBehavior(), block: "start" });
      });
      document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
          if (el("copy-dialog").open) closeCopyDialog();
          else if (el("result-export-menu").open) closeResultExportMenu();
          else if (el("candidate-detail-dialog").open) closeCandidateDetail();
          else if (el("review-share-dialog").open) closeReviewShareDialog();
          else if (el("reading-list-dialog").open) closeReadingList();
          else if (el("compare-dialog").open) closeCompareDialog();
          else if (el("intelligence-detail").open) closeIntelligenceDetail();
          else openFilters(false);
        }
        if (event.key === "/" && !/INPUT|TEXTAREA|SELECT/.test(document.activeElement?.tagName || "")) {
          event.preventDefault();
          controls.q.focus();
          controls.q.select();
        }
      });
      async function shareCurrentQuery() {
        try {
          await navigator.clipboard.writeText(location.href);
          toast("현재 검색 조건 링크를 복사했습니다");
        } catch (_) {
          openCopyDialog("현재 검색 조건 링크", "클립보드 권한이 없으면 아래 링크를 선택해 직접 복사하세요.", location.href, "현재 검색 조건 링크를 복사했습니다");
        }
      }
      el("share-button").addEventListener("click", shareCurrentQuery);
      el("result-share").addEventListener("click", shareCurrentQuery);
      el("freshness-label").addEventListener("click", focusDiscoveryStatus);
      function scrollToResults() {
        var top = el("results").getBoundingClientRect().top + window.scrollY - 150;
        window.scrollTo({ top: top, behavior: preferredScrollBehavior() });
      }
      function focusAnchorHeading(target) {
        if (!target) return;
        var heading = target.matches("h1, h2, h3, [role='heading']") ? target : target.querySelector("h1, h2, h3, [role='heading']");
        if (!heading) return;
        if (!heading.hasAttribute("tabindex")) heading.setAttribute("tabindex", "-1");
        window.setTimeout(function () { heading.focus({ preventScroll: true }); }, 120);
      }
      document.querySelectorAll("a[href^='#']").forEach(function (anchor) {
        anchor.addEventListener("click", function () {
          var href = anchor.getAttribute("href") || "";
          if (href.length > 1) focusAnchorHeading(document.getElementById(href.slice(1)));
        });
      });
      document.documentElement.dataset.gabaReady = "true";
    })();
  </script>
</body>
</html>`;

function serverInterventionClass(record) {
  if (record.kind === "규제") return "규제·안전성 자료";
  const text = [record.title, record.form, record.ingredientKo, record.ingredientEn, record.notes, record.domain].filter(Boolean).join(" ");
  if (/프로바이오틱|유산균|발효|ferment|probiotic|GABA 생성/i.test(text)) return "GABA 생성 발효·프로바이오틱";
  if (/수용체|작용제|길항제|약물|muscimol|baclofen|receptor|agonist|antagonist|drug/i.test(text)) return "수용체 약물·작용제";
  if (/복합|혼합|추출물|with|plus|GABA.{0,100}\b(?:and|with|plus)\b/i.test(text)) return "복합제·복합개입";
  return "순수 GABA 섭취";
}
const INTERVENTION_COUNTS = DATABASE.records.reduce((counts, record) => {
  const label = serverInterventionClass(record);
  counts[label] = (counts[label] || 0) + 1;
  return counts;
}, {});
function serverMarketingLabel(record) {
  if (record.kind === "규제") return "규제 참고";
  if (record.status === "제외" || /철회|사용 금지/.test(record.direction || "")) return "마케팅 사용 금지";
  if (record.status === "후보" || record.extraction === "부분" || record.kind === "동물") return "조건부 검토";
  return "직접 근거 검토";
}
const MARKETING_COUNTS = DATABASE.records.reduce((counts, record) => {
  const label = serverMarketingLabel(record);
  counts[label] = (counts[label] || 0) + 1;
  return counts;
}, {});
const DIRECTION_COUNTS = DATABASE.records.reduce((counts, record) => {
  const label = String(record.direction || "");
  counts[label] = (counts[label] || 0) + 1;
  return counts;
}, {});
const PAGE = PAGE_TEMPLATE
  .replace("__EMBEDDED_DATA__", JSON.stringify(DATABASE).replaceAll("<", "\\u003c"))
  .replaceAll("__COUNT_PURE__", String(INTERVENTION_COUNTS["순수 GABA 섭취"] || 0))
  .replaceAll("__COUNT_COMBINATION__", String(INTERVENTION_COUNTS["복합제·복합개입"] || 0))
  .replaceAll("__COUNT_FERMENTED__", String(INTERVENTION_COUNTS["GABA 생성 발효·프로바이오틱"] || 0))
  .replaceAll("__COUNT_RECEPTOR__", String(INTERVENTION_COUNTS["수용체 약물·작용제"] || 0))
  .replaceAll("__COUNT_REGULATORY__", String(INTERVENTION_COUNTS["규제·안전성 자료"] || 0))
  .replaceAll("__COUNT_MARKETING_DIRECT__", String(MARKETING_COUNTS["직접 근거 검토"] || 0))
  .replaceAll("__COUNT_MARKETING_CONDITIONAL__", String(MARKETING_COUNTS["조건부 검토"] || 0))
  .replaceAll("__COUNT_MARKETING_EXCLUDE__", String(MARKETING_COUNTS["마케팅 사용 금지"] || 0))
  .replaceAll("__COUNT_DIRECTION_NULL__", String(DIRECTION_COUNTS["무효"] || 0))
  .replaceAll("__COUNT_DIRECTION_MIXED__", String(DIRECTION_COUNTS["혼재"] || 0))
  .replaceAll("__COUNT_DIRECTION_HARM__", String(DIRECTION_COUNTS["유해"] || 0))
  .replaceAll("__COUNT_DIRECTION_NEUTRAL__", String(DIRECTION_COUNTS["중립"] || 0));

function response(body, status, contentType, cacheControl) {
  return new Response(body, {
    status,
    headers: {
      "content-type": contentType,
      "cache-control": cacheControl,
      "x-content-type-options": "nosniff",
      "referrer-policy": "strict-origin-when-cross-origin",
      "x-frame-options": "DENY",
      "permissions-policy": "camera=(), microphone=(), geolocation=()",
      "content-security-policy": "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'unsafe-inline'; img-src 'self' data:; connect-src 'self'; frame-ancestors 'none'; base-uri 'none'; form-action 'none'"
    }
  });
}

const PUBLIC_ORIGIN = "https://gaba-evidence-index-kr.dubaissday.chatgpt.site";
const ROBOTS = `User-agent: *\nAllow: /\nDisallow: /api/\nSitemap: ${PUBLIC_ORIGIN}/sitemap.xml\n`;
const SITEMAP = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${PUBLIC_ORIGIN}/</loc></url></urlset>`;

export default {
  async fetch(request) {
    const url = new URL(request.url);
    if (request.method !== "GET" && request.method !== "HEAD") {
      return response("Method Not Allowed", 405, "text/plain; charset=utf-8", "no-store");
    }
    if (url.pathname === "/api/health") {
      const discovery = DATABASE.meta.discovery || {};
      return response(JSON.stringify({
        ok: true,
        records: DATABASE.meta.total,
        snapshotDate: DATABASE.meta.snapshotDate,
        discoverySnapshotDate: discovery.snapshotDate || null,
        discoveryGeneratedAt: discovery.generatedAt || null,
        discoveryMergedUnique: Number(discovery.mergedUnique || 0),
        discoveryPubmedUnique: Number(discovery.pubmedUnique || 0),
        discoveryOpenAlexRetrieved: Number(discovery.openAlexRetrieved || 0),
        discoveryCrossrefRetrieved: Number(discovery.crossrefRetrieved || 0),
        discoverySourceErrors: Array.isArray(discovery.sourceErrors) ? discovery.sourceErrors.length : 0,
        discoveryScreeningCounts: discovery.screeningCounts || null,
         discoveryManualDecisionsPreserved: Number(discovery.manualDecisionsPreserved || 0),
         discoveryManualDecisionsMatched: Number(discovery.manualDecisionsMatched || 0),
         stagedCandidates: Number(discovery.stagedCandidates || 0),
         candidatePreviewCount: Array.isArray(discovery.candidatePreview) ? discovery.candidatePreview.length : 0,
         candidateExportCount: Array.isArray(discovery.candidateExport) ? discovery.candidateExport.length : 0,
         candidatePreviewSnapshotDate: discovery.snapshotDate || null,
         linkAudit: DATABASE.meta.linkAudit || null,
         publicRelease: DATABASE.meta.publicRelease === true,
         release: DATABASE.meta.release || null,
        sourceMode: "read-only public snapshot",
        syncPolicy: "management-sheet-write-gated",
        candidatePromotion: "manual-review-required"
      }), 200, "application/json; charset=utf-8", "public, max-age=60");
    }
    if (url.pathname === "/api/records") {
      return response(JSON.stringify(DATABASE), 200, "application/json; charset=utf-8", "public, max-age=300");
    }
    if (url.pathname === "/robots.txt") {
      return response(ROBOTS, 200, "text/plain; charset=utf-8", "public, max-age=3600");
    }
    if (url.pathname === "/sitemap.xml") {
      return response(SITEMAP, 200, "application/xml; charset=utf-8", "public, max-age=3600");
    }
    return response(request.method === "HEAD" ? null : PAGE, 200, "text/html; charset=utf-8", "public, max-age=120");
  }
};
