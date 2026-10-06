const DATABASE = __GABA_DATABASE__;

const PAGE_TEMPLATE = String.raw`<!doctype html>
<html lang="ko">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="theme-color" content="#0b5f59">
  <meta name="description" content="GABA 섭취 임상·동물시험 문헌과 식약처·해외 규제 안전성 자료를 제목과 내용의 한국어 검색으로 탐색하는 근거 인덱스">
  <meta property="og:type" content="website">
  <meta property="og:title" content="GABA 연구·규제 안전성 근거 인덱스">
  <meta property="og:description" content="GABA 섭취 연구와 규제·안전성 자료를 근거 수준과 원문 연결로 탐색하는 한국어 포털">
  <meta property="og:url" content="https://gaba-evidence-index-kr.dubaissday.chatgpt.site/">
  <meta name="twitter:card" content="summary">
  <meta name="twitter:title" content="GABA 연구·규제 안전성 근거 인덱스">
  <meta name="twitter:description" content="GABA 섭취 연구와 규제·안전성 자료를 근거 수준과 원문 연결로 탐색하는 한국어 포털">
  <link rel="canonical" href="https://gaba-evidence-index-kr.dubaissday.chatgpt.site/">
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
    .review-queue-summary { display: flex; flex-wrap: wrap; gap: 6px; margin: 0 0 12px; }
    .review-queue-summary span { padding: 5px 8px; border: 1px solid var(--line); border-radius: 8px; background: var(--surface-2); color: var(--muted); font-size: 10px; font-weight: 800; }
    .review-queue-summary span strong { color: var(--ink); }
    .review-queue-controls { display: flex; flex-wrap: wrap; align-items: center; gap: 6px; margin: 0 0 12px; }
    .review-queue-filter { min-height: 30px; padding: 5px 9px; border: 1px solid var(--line); border-radius: 999px; background: #fff; color: var(--muted); font-size: 11px; font-weight: 800; cursor: pointer; }
    .review-queue-filter.active { border-color: var(--amber); background: var(--amber-soft); color: var(--amber); }
    .review-queue-toggle { display: inline-flex; align-items: center; gap: 5px; margin-left: auto; color: var(--muted); font-size: 11px; }
    .review-queue-storage { width: 100%; color: var(--muted); font-size: 10px; }
    .review-queue-export { min-height: 30px; padding: 5px 9px; border: 1px solid var(--teal); border-radius: 8px; background: var(--teal); color: #fff; font-size: 11px; font-weight: 800; cursor: pointer; }
    .review-queue-list { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 10px; }
    .review-queue-card { padding: 14px; border: 1px solid var(--line); border-left: 3px solid var(--amber); border-radius: 10px; background: var(--surface-2); }
    .review-queue-card.priority-high { border-left-color: #d97706; }
    .review-queue-card.priority-medium { border-left-color: var(--teal); }
    .review-priority { display: inline-flex; margin-top: 7px; padding: 3px 6px; border-radius: 6px; background: var(--amber-soft); color: var(--amber); font-size: 10px; font-weight: 800; }
    .review-priority.high { background: #fff0d8; color: #a65300; }
    .review-priority.medium { background: var(--teal-soft); color: var(--teal-dark); }
    .review-queue-card h3 { margin: 7px 0 5px; font-size: 13px; line-height: 1.4; }
    .review-queue-card p { margin: 0; color: var(--muted); font-size: 11px; line-height: 1.5; }
    .review-queue-card button { margin-top: 10px; margin-right: 10px; padding: 0; border: 0; background: transparent; color: var(--teal-dark); font-size: 11px; font-weight: 800; cursor: pointer; }
    .review-queue-card button[data-review-done] { color: var(--amber); }
    .review-queue-card.review-done { opacity: .66; border-left-color: var(--green); }
    .review-queue-card.review-hold { border-left-color: #7c3aed; }
    @media (max-width: 640px) { .review-queue-list { grid-template-columns: 1fr; } }
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
    .distribution-item:hover,
    .distribution-item:focus-visible {
      border-color: var(--teal);
      box-shadow: 0 6px 16px rgba(15, 118, 110, .12);
      transform: translateY(-1px);
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
    .filter-head h2 { margin: 0; font-size: 17px; }
    .filter-close {
      display: none;
      width: 40px;
      height: 40px;
      border: 1px solid var(--line);
      border-radius: 10px;
      background: #fff;
      cursor: pointer;
    }
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
    .result-interpretation-stat strong { color: var(--teal-dark); }
    .result-interpretation-note { grid-column: 1 / -1; margin: 0; color: var(--muted); font-size: 11px; line-height: 1.5; }
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
        <a href="#results">시장·활용</a>
      </nav>
      <div class="top-actions">
        <a class="top-link" id="sheet-link" hidden target="_blank" rel="noopener noreferrer">관리 원본 Sheet</a>
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
        </div>
        <div class="hero-meta">
          <span class="hero-pill"><span class="pulse" aria-hidden="true"></span><span id="snapshot-label"></span></span>
          <span class="hero-pill" id="coverage-label"></span>
          <span class="hero-pill" id="freshness-label" title="공개 데이터 스냅샷의 최신성">스냅샷 최신성 확인 중</span>
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
        <h2 id="discovery-title">검증 인덱스와 자동 탐색 후보를 분리해 관리합니다</h2>
        <p id="discovery-copy">대량 탐색 현황을 불러오는 중입니다.</p>
        <div class="discovery-stats" id="discovery-stats" aria-label="대량 탐색 통계"></div>
      </div>
        <a class="discovery-link" id="candidate-link" hidden target="_blank" rel="noopener noreferrer">후보 큐 열기 ↗</a>
    </section>

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

    <section class="intelligence-feed" aria-labelledby="intelligence-feed-title">
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
    <section class="review-queue" aria-labelledby="review-queue-title">
      <div class="review-queue-head">
        <div><h2 id="review-queue-title">추가 검토 큐</h2><p>후보·부분추출·핵심 기록 누락 자료를 다음 확인 작업으로 연결합니다.</p></div>
        <span class="review-queue-count" id="review-queue-count">-</span>
      </div>
      <div class="review-queue-controls" aria-label="추가 검토 큐 필터">
        <button class="review-queue-filter active" type="button" data-review-filter="all">전체</button>
        <button class="review-queue-filter" type="button" data-review-filter="candidate">후보</button>
        <button class="review-queue-filter" type="button" data-review-filter="partial">부분추출</button>
        <button class="review-queue-filter" type="button" data-review-filter="missing">핵심 누락</button>
        <button class="review-queue-export" id="review-queue-export" type="button">검토 큐 내보내기</button>
        <label class="review-queue-toggle"><input id="review-hide-done" type="checkbox"> 완료 숨기기</label>
        <span class="review-queue-storage">검토 완료 표시는 현재 브라우저에만 저장되며 원본 인덱스·Sheets를 변경하지 않습니다.</span>
      </div>
      <div class="review-queue-summary" id="review-queue-summary" aria-label="검토 큐 요약"></div>
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
          <h3>검토 체크 <span style="color:var(--muted);font-size:10px;font-weight:600">기록 충실도 표시</span></h3>
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

    <section class="section" aria-labelledby="distribution-title">
      <div class="section-head">
        <div>
          <h2 id="distribution-title">근거 분포</h2>
          <p>상위 항목을 선택해 결과를 좁힐 수 있습니다. 나머지 항목은 전체 분포에서 확인합니다.</p>
        </div>
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
          <button class="mobile-filter" id="mobile-filter" type="button" aria-controls="filter-panel" aria-expanded="false">필터</button>
        </div>
        <p class="search-help">원문 제목은 그대로 보존하며 한국어 용어 확장을 제목·내용 전체에 적용합니다. 정확한 문구는 “따옴표”, 제외할 말은 -단어로 입력하세요. <kbd>/</kbd> 키로 바로 검색할 수 있습니다.</p>
        <div class="search-suggestions" aria-label="추천 한글 검색어">
          <button class="suggestion-button" type="button" data-query="수면">수면</button>
          <button class="suggestion-button" type="button" data-query="혈압">혈압</button>
          <button class="suggestion-button" type="button" data-query="불안 스트레스">불안·스트레스</button>
          <button class="suggestion-button" type="button" data-query="안전성 독성">안전성·독성</button>
          <button class="suggestion-button" type="button" data-query="돼지 장건강">돼지·장건강</button>
          <button class="suggestion-button" type="button" data-query="수산 성장">수산·성장</button>
          <button class="suggestion-button" type="button" data-query="한시적 인정">한시적 인정</button>
        </div>
        <div class="explorer-intents" aria-label="탐색 목적 빠른 선택">
          <span class="explorer-intents-label">탐색 목적</span>
          <button class="intent-button" type="button" data-preset="clinical">인체 직접근거</button>
          <button class="intent-button" type="button" data-preset="regulatory">안전·규제</button>
          <button class="intent-button" type="button" data-preset="source">원문 확인 우선</button>
          <button class="intent-button" type="button" data-preset="review">추가 검토</button>
        </div>
        <div class="quick-row" aria-label="연구구분 빠른 필터">
          <button class="quick-button active" type="button" data-kind="">전체</button>
          <button class="quick-button" type="button" data-kind="임상">인체 임상</button>
          <button class="quick-button" type="button" data-kind="동물">동물시험</button>
          <button class="quick-button" type="button" data-kind="규제">규제·안전성</button>
          <button class="quick-button" type="button" data-category="안전성">안전성 자료</button>
          <button class="quick-button" type="button" data-effect-category="수면">수면</button>
          <details class="quick-more">
            <summary>분야 더보기</summary>
            <div class="quick-more-menu" aria-label="추가 분야 빠른 필터">
              <button class="quick-button" type="button" data-effect-category="성장호르몬">성장호르몬</button>
              <button class="quick-button" type="button" data-effect-category="근육발달">근육발달</button>
              <button class="quick-button" type="button" data-effect-category="다이어트">다이어트</button>
              <button class="quick-button" type="button" data-effect-category="고혈압">고혈압</button>
              <button class="quick-button" type="button" data-effect-category="당뇨">당뇨</button>
            </div>
          </details>
          <span class="quick-spacer"></span>
          <label class="sr-only" for="sort">정렬</label>
          <select class="sort-select" id="sort">
            <option value="latest">최신 연도순</option>
            <option value="oldest">과거 연도순</option>
            <option value="title">제목 가나다순</option>
            <option value="updated">최근 확인순</option>
          </select>
          <label class="sr-only" for="page-size">페이지당 결과 수</label>
          <select class="page-size-select" id="page-size">
            <option value="20">20개씩</option>
            <option value="50">50개씩</option>
            <option value="100">100개씩</option>
          </select>
        </div>
      </div>

      <div class="explorer-grid">
        <aside class="filter-panel" id="filter-panel" aria-label="상세 필터">
          <div class="filter-head">
            <h2>상세 필터</h2>
            <button class="filter-close" id="filter-close" type="button" aria-label="필터 닫기">×</button>
          </div>
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
                <option value="drive">Drive 원문 있음</option>
                <option value="link">외부 원문·DOI 링크 있음</option>
                <option value="none">원문 링크 없음</option>
              </select>
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
          <button class="reset-button" id="reset" type="button">필터 전체 초기화</button>
        </aside>

        <section class="results-panel" id="results" aria-labelledby="explorer-title">
          <div class="result-top">
            <p class="result-count" id="result-count" aria-live="polite"></p>
            <button class="result-reset" id="result-reset" type="button">필터 초기화</button>
          </div>
          <div class="active-filters" id="active-filters" aria-label="적용된 필터"></div>
          <div class="result-interpretation" id="result-interpretation" aria-live="polite"></div>
          <div class="papers" id="papers"></div>
          <nav class="pagination" id="pagination" aria-label="검색 결과 페이지">
            <button class="page-button" id="prev" type="button" aria-label="이전 페이지">←</button>
            <span class="page-status" id="page-status"></span>
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
      var reviewQueueHideDone = false;
      var reviewDecisions = {};
      try { reviewDecisions = JSON.parse(localStorage.getItem("gaba-review-decisions") || "{}"); } catch (_) { reviewDecisions = {}; }
      var currentDetailRecordId = null;
      var urlRecordId = "";
      var detailReturnFocus = null;
      var reviewDraftStatus = "pending";
      var reviewDraftNote = "";
      var state = {
        q: "", kind: "", category: "", effectCategory: "", status: "", sci: "", species: "", topic: "",
        grade: "", agency: "", safetyArea: "", extraction: "", direction: "", source: "", from: DB.meta.minYear,
        to: DB.meta.maxYear, sort: "latest", page: 1
      };

      var el = function (id) { return document.getElementById(id); };
      var controls = {
        q: el("search"),
        category: el("category"),
        effectCategory: el("effect-category"),
        status: el("status"),
        grade: el("grade"),
        agency: el("agency"),
        safetyArea: el("safety-area"),
        sci: el("sci"),
        species: el("species"),
        topic: el("topic"),
        extraction: el("extraction"),
        direction: el("direction"),
        source: el("source"),
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
      function updateFreshnessLabel(snapshotDate, discoveryDate) {
        var target = el("freshness-label");
        if (!target) return;
        var parsed = new Date(String(snapshotDate || "") + "T00:00:00");
        var discoveryParsed = new Date(String(discoveryDate || "") + "T00:00:00");
        if (Number.isNaN(parsed.getTime())) {
          target.textContent = "갱신일 확인 필요";
          target.classList.add("freshness-stale");
          return;
        }
        var today = new Date();
        today.setHours(0, 0, 0, 0);
        var age = Math.max(0, Math.floor((today.getTime() - parsed.getTime()) / 86400000));
        var discoveryAge = Number.isNaN(discoveryParsed.getTime())
          ? null
          : Math.max(0, Math.floor((today.getTime() - discoveryParsed.getTime()) / 86400000));
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
      function countText(value) { return Number(value || 0).toLocaleString("ko-KR") + "편"; }
      function optionLabel(item) { return item.label + " (" + item.value.toLocaleString("ko-KR") + ")"; }
      function addOptions(select, items) {
        items.forEach(function (item) {
          var option = document.createElement("option");
          option.value = item.label;
          option.textContent = optionLabel(item);
          select.appendChild(option);
        });
      }

      function initMeta() {
        var discovery = DB.meta.discovery || {};
        var quality = DB.meta.dataQuality || {};
        var identified = records.filter(function (record) {
          return record.kind !== "규제" && (record.pmid || record.doi);
        }).length;
        var sheetLink = el("sheet-link");
        if (DB.meta.sourceSheet) {
          sheetLink.href = DB.meta.sourceSheet;
          sheetLink.hidden = false;
        }
        el("snapshot-label").textContent = "최종 갱신 " + koreanDate(DB.meta.snapshotDate);
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
          ["PubMed", Number(discovery.pubmedUnique || 0).toLocaleString("ko-KR") + "건"],
          ["OpenAlex", Number(discovery.openAlexRetrieved || 0).toLocaleString("ko-KR") + "건"],
          ["통합 고유", Number(discovery.mergedUnique || 0).toLocaleString("ko-KR") + "건"],
          ["우선검토", Number(discovery.priority || 0).toLocaleString("ko-KR") + "건"],
          ["중복 식별자", Number((quality.duplicateDois || 0) + (quality.duplicatePmids || 0)).toLocaleString("ko-KR") + "건"]
        ].map(function (item) {
          return '<span class="discovery-stat">' + esc(item[0]) + " " + esc(item[1]) + '</span>';
        }).join("");
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
        var extra = items.slice(4, field === "species" ? 8 : 6);
        var total = items.reduce(function (sum, item) { return sum + item.value; }, 0);
        var colors = ["#0f766e", "#2563eb", "#b7791f", "#b42318", "#7c3aed", "#0f766e", "#2563eb", "#b7791f"];
        var renderItem = function (item, index, hidden) {
          var percent = total ? (item.value / total * 100).toFixed(1) : "0.0";
          return '<button class="distribution-item' + (hidden ? ' distribution-item-extra' : '') + '" type="button"' + (hidden ? ' hidden' : '') + ' data-distribution-field="' + esc(field) + '" data-distribution-value="' + esc(item.label) + '" style="--distribution-color:' + colors[index % colors.length] + ';--distribution-percent:' + percent + '" aria-label="' + esc(item.label + " " + item.value + "편, 전체의 " + percent + "% 필터") + '">' +
            '<span class="distribution-ring" aria-hidden="true"><span class="distribution-percent">' + percent + '%</span></span>' +
            '<span><span class="distribution-label">' + esc(item.label) + '</span><span class="distribution-value">' + item.value.toLocaleString("ko-KR") + '편</span></span></button>';
        };
        target.innerHTML = visible.map(function (item, index) { return renderItem(item, index, false); }).join("") +
          extra.map(function (item, index) { return renderItem(item, index + visible.length, true); }).join("") +
          (extra.length ? '<button class="distribution-more" type="button" data-distribution-more="' + esc(targetId) + '" aria-expanded="false">전체 분포 보기</button>' : '');
      }

      function loadUrlState() {
        var params = new URLSearchParams(location.search);
        state = {
          q: "", kind: "", category: "", effectCategory: "", status: "", sci: "", species: "", topic: "",
          grade: "", agency: "", safetyArea: "", extraction: "", direction: "", source: "", from: DB.meta.minYear,
          to: DB.meta.maxYear, sort: "latest", page: 1
        };
        pageSize = 20;
        ["q", "kind", "category", "effectCategory", "status", "grade", "agency", "safetyArea", "sci", "species", "topic", "extraction", "direction", "source", "sort"].forEach(function (key) {
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
        urlRecordId = params.get("record") || "";
      }

      function syncControls() {
        Object.keys(controls).forEach(function (key) {
          if (controls[key]) controls[key].value = key === "pageSize" ? String(pageSize) : state[key];
        });
        document.querySelectorAll("[data-kind]").forEach(function (button) {
          button.classList.toggle("active", button.dataset.kind === state.kind);
        });
        document.querySelectorAll("[data-category]").forEach(function (button) {
          button.classList.toggle("active", button.dataset.category === state.category);
        });
        document.querySelectorAll("[data-effect-category]").forEach(function (button) {
          button.classList.toggle("active", button.dataset.effectCategory === state.effectCategory);
        });
        document.querySelectorAll("[data-preset]").forEach(function (button) {
          button.classList.toggle("active", button.dataset.preset === activePreset());
        });
      }

      function activePreset() {
        if (state.q || state.from !== DB.meta.minYear || state.to !== DB.meta.maxYear || state.sort !== "latest") return "";
        var common = ["category", "effectCategory", "grade", "agency", "safetyArea", "sci", "species", "topic", "extraction", "direction"];
        if (common.some(function (key) { return state[key]; })) return "";
        if (state.kind === "임상" && !state.status && !state.source) return "clinical";
        if (state.kind === "규제" && !state.status && !state.source) return "regulatory";
        if (state.source === "drive" && !state.kind && !state.status) return "source";
        if (state.status === "후보" && !state.kind && !state.source) return "review";
        return "";
      }

      function applyPreset(name) {
        var keys = ["q", "kind", "category", "effectCategory", "status", "sci", "species", "topic", "grade", "agency", "safetyArea", "extraction", "direction", "source", "from", "to", "sort"];
        keys.forEach(function (key) {
          if (key === "from") state[key] = DB.meta.minYear;
          else if (key === "to") state[key] = DB.meta.maxYear;
          else if (key === "sort") state[key] = "latest";
          else state[key] = "";
        });
        if (name === "clinical") state.kind = "임상";
        if (name === "regulatory") state.kind = "규제";
        if (name === "source") state.source = "drive";
        if (name === "review") state.status = "후보";
        state.page = 1;
        render("push");
        scrollToResults();
      }

      function persistUrl(historyMode) {
        var params = new URLSearchParams();
        ["q", "kind", "category", "effectCategory", "status", "grade", "agency", "safetyArea", "sci", "species", "topic", "extraction", "direction", "source"].forEach(function (key) {
          if (state[key]) params.set(key, state[key]);
        });
        if (state.from !== DB.meta.minYear) params.set("from", state.from);
        if (state.to !== DB.meta.maxYear) params.set("to", state.to);
        if (state.sort !== "latest") params.set("sort", state.sort);
        if (pageSize !== 20) params.set("pageSize", pageSize);
        if (urlRecordId) params.set("record", urlRecordId);
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
        var match;
        while ((match = expression.exec(String(value || "")))) {
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
          if (state.grade && record.grade !== state.grade) return false;
          if (state.agency && record.agency !== state.agency) return false;
          if (state.safetyArea && record.safetyArea !== state.safetyArea) return false;
          if (state.sci && record.sciGroup !== state.sci) return false;
          if (state.species && record.species !== state.species) return false;
          if (state.topic && record.topic !== state.topic) return false;
          if (state.extraction && record.extraction !== state.extraction) return false;
          if (state.direction && record.direction !== state.direction) return false;
          if (record.year < state.from || record.year > state.to) return false;
          if (state.source === "drive" && !record.hasDrivePdf) return false;
          if (state.source === "link" && (record.hasDrivePdf || !(record.fulltextUrl || record.doiUrl || record.pubmedUrl))) return false;
          if (state.source === "none" && (record.fulltextUrl || record.doiUrl || record.pubmedUrl)) return false;
          return true;
        });
        list.sort(function (a, b) {
          var aTitle = a.titleKo || a.title;
          var bTitle = b.titleKo || b.title;
          if (state.sort === "oldest") return a.year - b.year || aTitle.localeCompare(bTitle, "ko");
          if (state.sort === "title") return aTitle.localeCompare(bTitle, "ko") || b.year - a.year;
          if (state.sort === "updated") return String(b.checked).localeCompare(String(a.checked)) || b.year - a.year;
          return b.year - a.year || aTitle.localeCompare(bTitle, "ko");
        });
        return list;
      }

      function badgeClass(type, value) {
        if (type === "kind") return value === "임상" ? "clinical" : value === "동물" ? "animal" : "regulatory";
        if (type === "status") return value === "포함" || value === "유효" ? "include" : value === "후보" || value === "검토중" ? "candidate" : "exclude";
        if (type === "sci") return value === "SCIE" ? "scie" : "";
        if (type === "extraction") return value === "부분" ? "partial" : "include";
        if (type === "direction") return value === "유익" ? "benefit" : value === "혼재" ? "mixed" : value === "유해" ? "harm" : "";
        return "";
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

      function detail(label, value) {
        if (!value) return "";
        return '<div class="detail-item"><dt>' + esc(label) + '</dt><dd>' + esc(value) + '</dd></div>';
      }
      function researchMeaning(record) {
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
        return [
          "GABA 근거 브리프",
          "자료: " + koreanTitle(record),
          "연구 유형: " + (record.kind || "미분류"),
          "핵심 결과: " + (record.finding || record.summaryKo || "주요 결과 미추출"),
          "해석 경계: " + evidenceBoundary(record),
          "연구의 의미: " + researchMeaning(record),
          "마케팅 활용 방안: " + utilizationDirection(record),
          citationText(record)
        ].join("\n\n");
      }
      function utilizationDirection(record) {
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
          button.classList.toggle("active", button.dataset.intelligenceKind === intelligenceKind);
        });
        document.querySelectorAll("[data-intelligence-review]").forEach(function (button) {
          button.classList.toggle("active", button.dataset.intelligenceReview === intelligenceReview);
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
        panel.scrollIntoView({ behavior: "smooth", block: "nearest" });
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
      function reviewPriority(item) {
        var record = item.record;
        var score = 0;
        if (record.status === "후보") score += 5;
        if (record.extraction === "부분") score += 3;
        if (record.kind === "임상") score += 3;
        if (record.kind === "규제") score += 2;
        if (item.missing.length >= 4) score += 3;
        else if (item.missing.length >= 3) score += 2;
        if (item.missing.indexOf("식별자") >= 0) score += 2;
        return score >= 7 ? { key: "high", label: "우선 검토" } : score >= 4 ? { key: "medium", label: "다음 검토" } : { key: "normal", label: "기본 검토" };
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
          button.classList.toggle("active", button.dataset.detailReviewStatus === reviewDraftStatus);
        });
        var note = el("intelligence-detail-note");
        if (note) note.value = reviewDraftNote;
      }
      function renderReviewQueue() {
        var target = el("review-queue-list");
        var countTarget = el("review-queue-count");
        var summaryTarget = el("review-queue-summary");
        if (!target || !countTarget) return;
        var baseQueue = records.map(function (record) {
          var missing = reviewChecklist(record).filter(function (item) { return !item[1]; }).map(function (item) { return item[0]; });
          var item = { record: record, missing: missing };
          item.priority = reviewPriority(item);
          return item;
        }).filter(function (item) {
          return item.record.status === "후보" || item.record.extraction === "부분" || item.missing.length >= 3;
        }).sort(function (a, b) {
          var priorityRank = { high: 3, medium: 2, normal: 1 };
          return priorityRank[b.priority.key] - priorityRank[a.priority.key] || b.missing.length - a.missing.length || String(b.record.checked || "").localeCompare(String(a.record.checked || "")) || Number(b.record.year || 0) - Number(a.record.year || 0);
        });
        var doneCount = baseQueue.filter(function (item) { return reviewDecisionState(item.record.id).status === "done"; }).length;
        var holdCount = baseQueue.filter(function (item) { return reviewDecisionState(item.record.id).status === "hold"; }).length;
        var highCount = baseQueue.filter(function (item) { return item.priority.key === "high"; }).length;
        var identifierGapCount = baseQueue.filter(function (item) { return item.missing.indexOf("식별자") >= 0; }).length;
        var queue = baseQueue.filter(function (item) {
          if (reviewQueueHideDone && reviewDecisionState(item.record.id).status === "done") return false;
          if (reviewQueueFilter === "candidate") return item.record.status === "후보";
          if (reviewQueueFilter === "partial") return item.record.extraction === "부분";
          if (reviewQueueFilter === "missing") return item.missing.length >= 3;
          return true;
        });
        countTarget.textContent = queue.length.toLocaleString("ko-KR") + "건 대기 · " + doneCount.toLocaleString("ko-KR") + "건 완료 · " + holdCount.toLocaleString("ko-KR") + "건 자료 필요";
        if (summaryTarget) summaryTarget.innerHTML = '<span><strong>' + highCount.toLocaleString("ko-KR") + '건</strong> 우선 검토</span><span><strong>' + identifierGapCount.toLocaleString("ko-KR") + '건</strong> 식별자 확인 필요</span><span><strong>' + holdCount.toLocaleString("ko-KR") + '건</strong> 추가 자료 필요</span><span><strong>' + baseQueue.length.toLocaleString("ko-KR") + '건</strong> 전체 대기</span>';
        document.querySelectorAll("[data-review-filter]").forEach(function (button) {
          button.classList.toggle("active", button.dataset.reviewFilter === reviewQueueFilter);
        });
        target.innerHTML = queue.length ? queue.slice(0, 6).map(function (item) {
          var record = item.record;
          var decision = reviewDecisionState(record.id);
          var done = decision.status === "done";
          var hold = decision.status === "hold";
          var note = decision.note ? '<p><strong>로컬 메모</strong> · ' + esc(decision.note) + '</p>' : '';
          return '<article class="review-queue-card priority-' + esc(item.priority.key) + (done ? " review-done" : hold ? " review-hold" : "") + '"><div class="paper-badges"><span class="badge ' + badgeClass("status", record.status) + '">' + esc(record.status || "상태 미분류") + '</span><span class="badge ' + marketingClass(record) + '">' + esc(marketingLabel(record)) + '</span></div><span class="review-priority ' + esc(item.priority.key) + '">' + esc(item.priority.label) + '</span><h3>' + esc(koreanTitle(record)) + '</h3><p><strong>추가 확인</strong> · ' + esc(item.missing.join(" · ")) + '</p>' + note + '<button type="button" data-intelligence-id="' + esc(record.id) + '">상세 검토 →</button><button type="button" data-query="' + esc(record.domain || record.topic || "GABA") + '">관련 검색</button><button type="button" data-review-status="' + (done ? "pending" : "done") + '" data-review-id="' + esc(record.id) + '">' + (done ? "완료 취소" : "검토 완료 표시") + '</button><button type="button" data-review-status="' + (hold ? "pending" : "hold") + '" data-review-id="' + esc(record.id) + '">' + (hold ? "자료 필요 해제" : "자료 필요 표시") + '</button></article>';
        }).join("") : '<article class="review-queue-card"><h3>현재 대기 자료가 없습니다</h3><p>검토 큐가 비어 있습니다.</p></article>';
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
            sourceUrls: [record.fulltextUrl, record.doiUrl, record.pubmedUrl, record.sourceUrl].filter(Boolean)
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
        el("intelligence-detail-facts").innerHTML = [
          fact("연구 유형", kind), fact("상태", record.status), fact("대상", record.population || record.species),
          fact("GABA 용량", record.dose || record.exposure), fact("기간", record.duration), fact("근거 수준", record.grade || record.sciGroup),
          fact("결과 방향", record.direction), fact("확인일", record.checked)
        ].join("");
        el("intelligence-detail-finding").textContent = record.finding || record.summaryKo || "주요 결과가 충분히 추출되지 않은 자료입니다.";
        el("intelligence-detail-boundary").textContent = evidenceBoundary(record);
        el("intelligence-detail-checklist").innerHTML = reviewChecklist(record).map(function (item) {
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
        var sourcePrimary = record.kind === "규제" ? (record.sourceUrl || record.fulltextUrl) : (record.fulltextUrl || record.doiUrl || record.pubmedUrl);
        el("intelligence-detail-actions").innerHTML =
          linkButton(sourcePrimary, "원문 확인", true) +
          (record.doiUrl && record.doiUrl !== sourcePrimary ? linkButton(record.doiUrl, "DOI", false) : "") +
          (record.pubmedUrl && record.pubmedUrl !== sourcePrimary ? linkButton(record.pubmedUrl, "PubMed", false) : "") +
          '<button type="button" data-copy-citation="' + esc(record.id) + '">인용 정보 복사</button>' +
          '<button type="button" data-copy-brief="' + esc(record.id) + '">근거 브리프 복사</button>' +
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
          '<div class="interpretation action"><strong>마케팅 활용 방안</strong>: ' + esc(utilizationDirection(record)) + '</div>' +
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
        var kind = record.kind === "임상" ? "인체" : record.kind === "동물" ? "동물" : "자료";
        var topic = clean(record.domain || record.topic || "주요 평가");
        var matrix = record.form && /발효유|초콜릿|채소|클로렐라|음료|식품/i.test(record.form) ? " 식품 기반" : "";
        return kind + matrix + " GABA 섭취의 " + topic + " 관련 연구";
      }

      function regulatoryCard(record) {
        var sourcePrimary = record.sourceUrl || record.fulltextUrl;
        var decisionExtra = record.decisionUrl && record.decisionUrl !== sourcePrimary
          ? linkButton(record.decisionUrl, "규제결정", false)
          : "";
        var originalTitle = record.title && record.title !== record.titleKo
          ? '<p class="original-title" lang="en">' + esc(record.title) + '</p>'
          : "";
        return '<article class="paper-card regulatory-card">' +
          '<div class="paper-badges">' +
            '<span class="badge regulatory">규제·안전성</span>' +
            '<span class="badge ' + badgeClass("status", record.status) + '">' + esc(record.status) + '</span>' +
            '<span class="badge ' + marketingClass(record) + '">' + esc(marketingLabel(record)) + '</span>' +
            '<span class="badge">' + esc(record.grade) + '</span>' +
            '<span class="badge">' + esc(record.agency) + '</span>' +
            '<span class="badge">품질 ' + esc(record.quality) + '</span>' +
          '</div>' +
          '<h3 class="paper-title"><span class="title-label">한국어 제목</span><span class="paper-title-korean">' + esc(koreanTitle(record)) + '</span></h3>' +
          originalTitle +
          '<p class="paper-meta"><strong>' + esc(record.year) + '</strong> · ' + esc(record.agency) + ' · ' + esc(record.country) + ' · ' + esc(record.documentType) + '</p>' +
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
            linkButton(sourcePrimary, "공식 원문", true) + decisionExtra +
            '<span class="record-id">' + esc(record.id) + '</span>' +
          '</div>' +
        '</article>';
      }

      function paperCard(record) {
        if (record.kind === "규제") return regulatoryCard(record);
        var sourcePrimary = record.fulltextUrl || record.doiUrl || record.pubmedUrl;
        var sourceLabel = record.hasDrivePdf ? "Drive 원문" : record.fulltextUrl ? "원문·DOI" : record.doiUrl ? "DOI" : "PubMed";
        var pubmedExtra = record.pubmedUrl && record.pubmedUrl !== sourcePrimary ? linkButton(record.pubmedUrl, "PubMed", false) : "";
        var doiExtra = record.doiUrl && record.doiUrl !== sourcePrimary && record.doiUrl !== record.pubmedUrl ? linkButton(record.doiUrl, "DOI", false) : "";
        var identifierLabel = record.pmid && record.doi ? "PMID·DOI" : record.pmid ? "PMID" : record.doi ? "DOI" : "식별자 미완";
        return '<article class="paper-card">' +
          '<div class="paper-badges">' +
            '<span class="badge ' + badgeClass("kind", record.kind) + '">' + esc(record.kind === "임상" ? "인체 임상" : record.kind === "동물" ? "동물시험" : record.kind) + '</span>' +
            '<span class="badge ' + badgeClass("status", record.status) + '">' + esc(record.status) + '</span>' +
            '<span class="badge ' + marketingClass(record) + '">' + esc(marketingLabel(record)) + '</span>' +
            '<span class="badge ' + badgeClass("sci", record.sciGroup) + '">' + esc(record.sciGroup) + '</span>' +
            '<span class="badge ' + badgeClass("extraction", record.extraction) + '">추출 ' + esc(record.extraction) + '</span>' +
            '<span class="badge">' + esc(identifierLabel) + '</span>' +
            (record.direction ? '<span class="badge ' + badgeClass("direction", record.direction) + '">' + esc(record.direction) + '</span>' : "") +
          '</div>' +
          '<h3 class="paper-title"><span class="title-label">한국어 제목 요약</span><span class="paper-title-korean">' + esc(koreanTitle(record)) + '</span></h3>' +
          '<p class="original-title" lang="en"><span class="title-label">영문 원제</span>' + esc(record.title) + '</p>' +
          '<p class="paper-meta"><strong>' + esc(record.year) + '</strong> · ' + esc(record.author || "저자 미상") + ' · ' + esc(record.journal || "저널 미상") + '</p>' +
          (record.finding ? '<p class="finding"><strong>핵심결과</strong> · ' + esc(record.finding) + '</p>' : "") +
          interpretationBlock(record) +
          '<dl class="fact-grid">' +
            fact("대상", record.population || record.species) +
            fact("표본수", record.n) +
            fact("GABA 용량", record.dose) +
            fact("기간", record.duration) +
          '</dl>' +
          '<details class="paper-detail">' +
            '<summary>연구조건·안전성·한계 자세히 보기</summary>' +
            '<dl class="detail-grid">' +
              detail("연구설계", record.design) +
              detail("건강상태/모델", record.model) +
              detail("개입형태", record.form) +
              detail("투여경로", record.route) +
              detail("대조군", record.comparator) +
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
            linkButton(sourcePrimary, sourceLabel, true) + pubmedExtra + doiExtra +
            '<span class="record-id">' + esc(record.id) + '</span>' +
          '</div>' +
        '</article>';
      }

      var filterNames = {
        q: "검색", kind: "구분", category: "자료 카테고리", effectCategory: "효과·적용 분야", status: "상태", grade: "규제등급", agency: "규제기관",
        safetyArea: "안전성영역", sci: "SCI", species: "종",
        topic: "주제", extraction: "추출", direction: "결과", source: "원문"
      };
      function sourceLabel(value) {
        return { drive: "Drive 원문", link: "외부 링크", none: "링크 없음" }[value] || value;
      }
      function renderActiveFilters() {
        var chips = [];
        Object.keys(filterNames).forEach(function (key) {
          if (!state[key]) return;
          var value = key === "source" ? sourceLabel(state[key]) : state[key];
          chips.push('<button class="filter-chip" type="button" data-remove="' + esc(key) + '">' + esc(filterNames[key] + ": " + value) + ' ×</button>');
        });
        if (state.from !== DB.meta.minYear || state.to !== DB.meta.maxYear) {
          chips.push('<button class="filter-chip" type="button" data-remove="year">연도: ' + state.from + "–" + state.to + ' ×</button>');
        }
        el("active-filters").innerHTML = chips.join("");
      }

      function syncAdvancedFilterDisclosure() {
        var advancedKeys = ["grade", "agency", "safetyArea", "sci", "species", "topic", "extraction", "direction", "source"];
        var count = advancedKeys.filter(function (key) { return Boolean(state[key]); }).length;
        if (state.from !== DB.meta.minYear || state.to !== DB.meta.maxYear) count += 1;
        var badge = el("advanced-filter-count");
        var details = el("advanced-filters");
        if (!badge || !details) return;
        badge.textContent = count ? count + "개 선택" : "선택 없음";
        badge.classList.toggle("has-filters", count > 0);
        if (count) details.open = true;
      }

      function renderResultInterpretation(list) {
        var target = el("result-interpretation");
        if (!target) return;
        var clinical = list.filter(function (record) { return record.kind === "임상"; }).length;
        var animal = list.filter(function (record) { return record.kind === "동물"; }).length;
        var regulatory = list.filter(function (record) { return record.kind === "규제"; }).length;
        var review = list.filter(function (record) { return record.status === "후보" || record.status === "보류" || record.extraction === "부분"; }).length;
        var query = state.q ? state.q.trim() : "전체 근거";
        target.innerHTML = '<div class="result-interpretation-head"><span class="result-interpretation-label">현재 탐색</span><strong class="result-interpretation-query" title="' + esc(query) + '">' + esc(query) + '</strong></div>' +
          '<div class="result-interpretation-stats" aria-label="현재 결과의 근거 구성">' +
            '<span class="result-interpretation-stat">인체 연구 <strong>' + clinical.toLocaleString("ko-KR") + '</strong></span>' +
            '<span class="result-interpretation-stat">동물·전임상 <strong>' + animal.toLocaleString("ko-KR") + '</strong></span>' +
            '<span class="result-interpretation-stat">규제·안전성 <strong>' + regulatory.toLocaleString("ko-KR") + '</strong></span>' +
            '<span class="result-interpretation-stat">추가 확인 <strong>' + review.toLocaleString("ko-KR") + '</strong></span>' +
          '</div>' +
          '<p class="result-interpretation-note">인체·동물·규제 자료는 근거의 범위가 다릅니다. <strong>' + list.length.toLocaleString("ko-KR") + '건</strong>을 확인할 때 인체 연구와 원문 상태를 먼저 비교하세요.</p>';
      }

      function render(historyMode) {
        var renderStarted = performance.now();
        var list = filteredRecords();
        var totalPages = Math.max(1, Math.ceil(list.length / pageSize));
        if (state.page > totalPages) state.page = totalPages;
        var start = (state.page - 1) * pageSize;
        var pageRecords = list.slice(start, start + pageSize);
        var elapsed = Math.max(0, performance.now() - renderStarted);
        el("result-count").innerHTML = '검증 레코드 ' + DB.meta.total.toLocaleString("ko-KR") + '건 중 <strong>' + list.length.toLocaleString("ko-KR") + '건</strong> · ' + elapsed.toFixed(elapsed < 10 ? 1 : 0) + 'ms<small>문헌 ' + Number(DB.meta.literature || 0).toLocaleString("ko-KR") + '편 + 규제·안전성 자료 ' + Number(DB.meta.regulatory || 0).toLocaleString("ko-KR") + '건 · 자동 탐색 후보는 별도 큐</small>';
        el("papers").innerHTML = pageRecords.length
          ? pageRecords.map(paperCard).join("")
          : '<div class="empty-state"><h3>조건에 맞는 자료가 없습니다</h3><p>검색어를 줄이거나 상세 필터를 초기화해 보세요.</p></div>';
        el("page-status").textContent = state.page + " / " + totalPages;
        el("prev").disabled = state.page <= 1;
        el("next").disabled = state.page >= totalPages;
        el("pagination").hidden = list.length <= pageSize;
        renderActiveFilters();
        syncAdvancedFilterDisclosure();
        renderResultInterpretation(list);
        syncControls();
        persistUrl(historyMode);
      }

      function changeState(key, value, historyMode) {
        state[key] = value;
        state.page = 1;
        render(historyMode || "push");
      }
      function resetFilters() {
        pageSize = 20;
        state = {
          q: "", kind: "", category: "", effectCategory: "", status: "", sci: "", species: "", topic: "",
          grade: "", agency: "", safetyArea: "", extraction: "", direction: "", source: "", from: DB.meta.minYear,
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

      loadUrlState();
      initMeta();
      renderDistribution("species-distribution", DB.facets.species, "species");
      renderDistribution("direction-distribution", DB.facets.direction, "direction");
      syncControls();
      render();
      if (urlRecordId) openIntelligenceDetail(urlRecordId, "replace");

      window.addEventListener("popstate", function () {
        var detailWasOpen = el("intelligence-detail").open;
        loadUrlState();
        syncControls();
        render();
        if (urlRecordId) openIntelligenceDetail(urlRecordId, "replace");
        else if (detailWasOpen) closeIntelligenceDetail();
      });

      var searchTimer;
      controls.q.addEventListener("input", function () {
        clearTimeout(searchTimer);
        searchTimer = setTimeout(function () { changeState("q", controls.q.value, "replace"); }, 120);
      });
      ["category", "effectCategory", "status", "grade", "agency", "safetyArea", "sci", "species", "topic", "extraction", "direction", "source", "sort"].forEach(function (key) {
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
          renderReviewQueue();
        });
      });
      el("review-hide-done").addEventListener("change", function () {
        reviewQueueHideDone = el("review-hide-done").checked;
        renderReviewQueue();
      });
      el("review-queue-export").addEventListener("click", exportReviewQueue);
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
      el("portal-lane-overview-close").addEventListener("click", function () {
        activeLane = null;
        el("portal-lane-overview").hidden = true;
      });
      document.addEventListener("click", async function (event) {
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
        var citationButton = event.target.closest("[data-copy-citation]");
        if (citationButton) {
          var citationRecord = records.find(function (item) { return String(item.id) === String(citationButton.dataset.copyCitation); });
          if (!citationRecord) return;
          var citation = citationText(citationRecord);
          try {
            await navigator.clipboard.writeText(citation);
            toast("인용 정보를 복사했습니다");
          } catch (_) {
            window.prompt("아래 인용 정보를 복사하세요", citation);
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
            window.prompt("아래 근거 브리프를 복사하세요", brief);
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
          distributionMore.textContent = isOpen ? "전체 분포 보기" : "상위 항목만 보기";
          return;
        }
        var distribution = event.target.closest("[data-distribution-field]");
        if (distribution) {
          var field = distribution.dataset.distributionField;
          changeState(field, distribution.dataset.distributionValue);
          document.getElementById("results").scrollIntoView({ behavior: "smooth", block: "start" });
        }
        var chip = event.target.closest("[data-remove]");
        if (chip) {
          var key = chip.dataset.remove;
          if (key === "year") { state.from = DB.meta.minYear; state.to = DB.meta.maxYear; }
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
      el("prev").addEventListener("click", function () { state.page -= 1; render("push"); scrollToResults(); });
      el("next").addEventListener("click", function () { state.page += 1; render("push"); scrollToResults(); });
      el("mobile-filter").addEventListener("click", function () { openFilters(true); });
      el("filter-close").addEventListener("click", function () { openFilters(false); el("mobile-filter").focus(); });
      document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
          if (el("intelligence-detail").open) closeIntelligenceDetail();
          else openFilters(false);
        }
        if (event.key === "/" && !/INPUT|TEXTAREA|SELECT/.test(document.activeElement?.tagName || "")) {
          event.preventDefault();
          controls.q.focus();
          controls.q.select();
        }
      });
      el("share-button").addEventListener("click", async function () {
        try {
          await navigator.clipboard.writeText(location.href);
          toast("현재 검색 조건 링크를 복사했습니다");
        } catch (_) {
          window.prompt("아래 링크를 복사하세요", location.href);
        }
      });
      function scrollToResults() {
        var top = el("results").getBoundingClientRect().top + window.scrollY - 150;
        window.scrollTo({ top: top, behavior: "smooth" });
      }
    })();
  </script>
</body>
</html>`;

const PAGE = PAGE_TEMPLATE.replace(
  "__EMBEDDED_DATA__",
  JSON.stringify(DATABASE).replaceAll("<", "\\u003c")
);

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
      return response(JSON.stringify({
        ok: true,
        records: DATABASE.meta.total,
        snapshotDate: DATABASE.meta.snapshotDate
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
