const DATABASE = __GABA_DATABASE__;

const PAGE_TEMPLATE = String.raw`<!doctype html>
<html lang="ko">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="theme-color" content="#0b5f59">
  <meta name="description" content="GABA 섭취 임상·동물시험 문헌과 식약처·해외 규제 안전성 자료를 제목과 내용의 한국어 검색으로 탐색하는 근거 인덱스">
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
    .hero {
      position: relative;
      overflow: hidden;
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
    .bar-list { display: grid; gap: 9px; }
    .bar-row {
      width: 100%;
      display: grid;
      grid-template-columns: minmax(88px, 130px) 1fr 38px 46px;
      align-items: center;
      gap: 10px;
      padding: 3px 0;
      border: 0;
      background: none;
      color: var(--ink);
      text-align: left;
      cursor: pointer;
    }
    .bar-row:hover .bar-track { background: #dce9e7; }
    .bar-label {
      overflow: hidden;
      font-size: 13px;
      font-weight: 700;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .bar-track {
      height: 9px;
      overflow: hidden;
      border-radius: 999px;
      background: #e8efed;
      transition: background .2s ease;
    }
    .bar-fill {
      height: 100%;
      border-radius: inherit;
      background: linear-gradient(90deg, var(--teal), #44aa9e);
    }
    .bar-value {
      color: var(--ink-2);
      font-size: 12px;
      font-weight: 800;
      text-align: right;
    }
    .bar-percent {
      color: var(--muted);
      font-size: 11px;
      text-align: right;
      white-space: nowrap;
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
      .hero { padding: 28px 22px; border-radius: 22px; }
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
      .metric { min-height: 105px; padding: 14px; }
      .metric-value { font-size: 27px; }
      .section-head { padding: 20px 18px 0; }
      .distribution-grid, .guide-grid { padding: 16px 18px 20px; }
      .search-row { grid-template-columns: 1fr auto; }
      .quick-spacer { display: none; }
      .sort-select { width: 100%; order: 2; }
      .page-size-select { flex: 1; order: 2; }
      .paper-card { padding: 17px 15px; }
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
      <div class="top-actions">
        <a class="top-link" id="sheet-link" target="_blank" rel="noopener noreferrer">관리 원본 Sheet</a>
        <button class="share-button" id="share-button" type="button" aria-label="현재 검색 조건 링크 복사">링크 복사</button>
      </div>
    </div>
  </header>

  <main class="page">
    <section class="hero" aria-labelledby="page-title">
      <p class="eyebrow">EVIDENCE EXPLORER · 읽기 전용 공개 스냅샷</p>
      <h1 id="page-title">GABA 연구와 규제 안전성 자료를<br>한국어로 빠르게 탐색하세요</h1>
      <p>인체 임상시험·동물시험과 식약처·해외 규제자료를 분리하고, 연구조건·핵심결과·안전성·심사 활용도를 한 화면에서 비교할 수 있습니다.</p>
      <div class="hero-meta">
        <span class="hero-pill"><span class="pulse" aria-hidden="true"></span><span id="snapshot-label"></span></span>
        <span class="hero-pill" id="coverage-label"></span>
        <span class="hero-pill">매주 업데이트</span>
      </div>
    </section>

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
      <a class="discovery-link" id="candidate-link" target="_blank" rel="noopener noreferrer">후보 큐 열기 ↗</a>
    </section>

    <section class="section" aria-labelledby="distribution-title">
      <div class="section-head">
        <div>
          <h2 id="distribution-title">근거 분포</h2>
          <p>막대를 선택하면 해당 조건으로 바로 필터링됩니다.</p>
        </div>
      </div>
      <div class="distribution-grid">
        <div class="distribution">
          <h3>대상 종 그룹</h3>
          <div class="bar-list" id="species-bars"></div>
        </div>
        <div class="distribution">
          <h3>결과 방향</h3>
          <div class="bar-list" id="direction-bars"></div>
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
        <div class="quick-row" aria-label="연구구분 빠른 필터">
          <button class="quick-button active" type="button" data-kind="">전체</button>
          <button class="quick-button" type="button" data-kind="임상">인체 임상</button>
          <button class="quick-button" type="button" data-kind="동물">동물시험</button>
          <button class="quick-button" type="button" data-kind="규제">규제·안전성</button>
          <button class="quick-button" type="button" data-category="안전성">안전성 자료</button>
          <button class="quick-button" type="button" data-effect-category="수면">수면</button>
          <button class="quick-button" type="button" data-effect-category="성장호르몬">성장호르몬</button>
          <button class="quick-button" type="button" data-effect-category="근육발달">근육발달</button>
          <button class="quick-button" type="button" data-effect-category="다이어트">다이어트</button>
          <button class="quick-button" type="button" data-effect-category="고혈압">고혈압</button>
          <button class="quick-button" type="button" data-effect-category="당뇨">당뇨</button>
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
          <button class="reset-button" id="reset" type="button">필터 전체 초기화</button>
        </aside>

        <section class="results-panel" id="results" aria-labelledby="explorer-title">
          <div class="result-top">
            <p class="result-count" id="result-count" aria-live="polite"></p>
            <button class="result-reset" id="result-reset" type="button">필터 초기화</button>
          </div>
          <div class="active-filters" id="active-filters" aria-label="적용된 필터"></div>
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
        el("sheet-link").href = DB.meta.sourceSheet;
        el("snapshot-label").textContent = "최종 갱신 " + koreanDate(DB.meta.snapshotDate);
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
        el("candidate-link").href = discovery.candidateSheet || DB.meta.sourceSheet;
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

      function renderBars(targetId, items, field) {
        var target = el(targetId);
        var visible = items.slice(0, field === "species" ? 8 : 6);
        var max = Math.max.apply(null, items.map(function (item) { return item.value; }));
        var total = items.reduce(function (sum, item) { return sum + item.value; }, 0);
        target.innerHTML = visible.map(function (item) {
          var width = max ? (item.value / max * 100).toFixed(2) : 0;
          var percent = total ? (item.value / total * 100).toFixed(1) : "0.0";
          return '<button class="bar-row" type="button" data-bar-field="' + esc(field) + '" data-bar-value="' + esc(item.label) + '" aria-label="' + esc(item.label + " " + item.value + "편, 전체의 " + percent + "% 필터") + '">' +
            '<span class="bar-label">' + esc(item.label) + '</span>' +
            '<span class="bar-track"><span class="bar-fill" style="width:' + width + '%"></span></span>' +
            '<span class="bar-value">' + item.value.toLocaleString("ko-KR") + '</span>' +
            '<span class="bar-percent">' + percent + '%</span></button>';
        }).join("");
      }

      function loadUrlState() {
        var params = new URLSearchParams(location.search);
        ["q", "kind", "category", "effectCategory", "status", "grade", "agency", "safetyArea", "sci", "species", "topic", "extraction", "direction", "source", "sort"].forEach(function (key) {
          if (params.has(key)) state[key] = params.get(key) || "";
        });
        if (params.has("from")) state.from = Math.max(DB.meta.minYear, Number(params.get("from")) || DB.meta.minYear);
        if (params.has("to")) state.to = Math.min(DB.meta.maxYear, Number(params.get("to")) || DB.meta.maxYear);
        if (["20", "50", "100"].includes(params.get("pageSize"))) pageSize = Number(params.get("pageSize"));
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
      }

      function persistUrl() {
        var params = new URLSearchParams();
        ["q", "kind", "category", "effectCategory", "status", "grade", "agency", "safetyArea", "sci", "species", "topic", "extraction", "direction", "source"].forEach(function (key) {
          if (state[key]) params.set(key, state[key]);
        });
        if (state.from !== DB.meta.minYear) params.set("from", state.from);
        if (state.to !== DB.meta.maxYear) params.set("to", state.to);
        if (state.sort !== "latest") params.set("sort", state.sort);
        if (pageSize !== 20) params.set("pageSize", pageSize);
        var query = params.toString();
        history.replaceState(null, "", location.pathname + (query ? "?" + query : ""));
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
      function utilizationDirection(record) {
        if (record.kind === "규제") {
          return "원료 동일성·제조공정·사용조건·노출량을 국내 기준과 대조하는 규제 검토 자료로 활용합니다. 필요한 제출자료와 추가 확인 항목을 함께 정리합니다.";
        }
        if (record.status === "제외") {
          return "제외 사유를 확인하는 품질관리 자료로만 활용하고, 공개 효능 근거 또는 광고 문구의 근거로 사용하지 않습니다.";
        }
        if (record.status === "후보" || record.extraction === "부분") {
          return "원문 확인 우선 자료로 활용합니다. 직접 GABA 섭취 여부, 용량·기간·대조군·안전성·SCI/SCIE 상태를 확인한 뒤 인덱스 승격과 인용 가능성을 판단합니다.";
        }
        if (record.kind === "동물") {
          return "인체 연구의 가설 설정, 제품·시험 설계, 용량·노출 비교를 위한 전임상 자료로 활용합니다. 동물 결과를 인체 효능 문구로 직접 전환하지 않습니다.";
        }
        return "제품·표시·추가 연구를 검토할 때 대상·용량·기간이 실제 사용조건과 맞는지 비교 자료로 활용합니다. 여러 인체 연구와 안전성 자료를 함께 검토한 뒤 표현 범위를 정합니다.";
      }
      function interpretationBlock(record) {
        return '<div class="interpretation-grid">' +
          '<div class="interpretation"><strong>연구의 의미</strong>' + esc(researchMeaning(record)) + '</div>' +
          '<div class="interpretation action"><strong>마케팅 활용 방안</strong>' + esc(utilizationDirection(record)) + '</div>' +
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
        if (record.titleKo) return record.titleKo;
        var kind = record.kind === "임상" ? "인체" : "동물";
        var topic = record.topic || "임상·동물";
        var matrix = record.form && /발효유|초콜릿|채소|클로렐라|음료|식품/i.test(record.form) ? " 식품매트릭스" : "";
        return kind + matrix + " GABA " + topic + " 섭취 연구";
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

      function render() {
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
        syncControls();
        persistUrl();
      }

      function changeState(key, value) {
        state[key] = value;
        state.page = 1;
        render();
      }
      function resetFilters() {
        pageSize = 20;
        state = {
          q: "", kind: "", category: "", effectCategory: "", status: "", sci: "", species: "", topic: "",
          grade: "", agency: "", safetyArea: "", extraction: "", direction: "", source: "", from: DB.meta.minYear,
          to: DB.meta.maxYear, sort: "latest", page: 1
        };
        render();
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
      renderBars("species-bars", DB.facets.species, "species");
      renderBars("direction-bars", DB.facets.direction, "direction");
      syncControls();
      render();

      var searchTimer;
      controls.q.addEventListener("input", function () {
        clearTimeout(searchTimer);
        searchTimer = setTimeout(function () { changeState("q", controls.q.value); }, 120);
      });
      ["category", "effectCategory", "status", "grade", "agency", "safetyArea", "sci", "species", "topic", "extraction", "direction", "source", "sort"].forEach(function (key) {
        controls[key].addEventListener("change", function () { changeState(key, controls[key].value); });
      });
      controls.pageSize.addEventListener("change", function () {
        pageSize = Number(controls.pageSize.value) || 20;
        state.page = 1;
        render();
      });
      controls.from.addEventListener("change", function () {
        state.from = Math.min(Number(controls.to.value), Math.max(DB.meta.minYear, Number(controls.from.value) || DB.meta.minYear));
        state.page = 1; render();
      });
      controls.to.addEventListener("change", function () {
        state.to = Math.max(Number(controls.from.value), Math.min(DB.meta.maxYear, Number(controls.to.value) || DB.meta.maxYear));
        state.page = 1; render();
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
          render();
        });
      });
      document.querySelectorAll("[data-category]").forEach(function (button) {
        button.addEventListener("click", function () {
          var category = button.dataset.category || "";
          state.category = state.category === category ? "" : category;
          state.page = 1;
          render();
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
      document.querySelectorAll("[data-query]").forEach(function (button) {
        button.addEventListener("click", function () {
          controls.q.value = button.dataset.query || "";
          changeState("q", controls.q.value);
          controls.q.focus();
        });
      });
      document.addEventListener("click", function (event) {
        var bar = event.target.closest("[data-bar-field]");
        if (bar) {
          var field = bar.dataset.barField;
          changeState(field, bar.dataset.barValue);
          document.getElementById("results").scrollIntoView({ behavior: "smooth", block: "start" });
        }
        var chip = event.target.closest("[data-remove]");
        if (chip) {
          var key = chip.dataset.remove;
          if (key === "year") { state.from = DB.meta.minYear; state.to = DB.meta.maxYear; }
          else state[key] = "";
          state.page = 1; render();
        }
        if (document.body.classList.contains("filter-open") && !event.target.closest("#filter-panel") && !event.target.closest("#mobile-filter")) {
          openFilters(false);
        }
      });
      el("search-clear").addEventListener("click", function () { changeState("q", ""); controls.q.focus(); });
      el("reset").addEventListener("click", resetFilters);
      el("result-reset").addEventListener("click", resetFilters);
      el("prev").addEventListener("click", function () { state.page -= 1; render(); scrollToResults(); });
      el("next").addEventListener("click", function () { state.page += 1; render(); scrollToResults(); });
      el("mobile-filter").addEventListener("click", function () { openFilters(true); });
      el("filter-close").addEventListener("click", function () { openFilters(false); el("mobile-filter").focus(); });
      document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") openFilters(false);
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
    return response(request.method === "HEAD" ? null : PAGE, 200, "text/html; charset=utf-8", "public, max-age=120");
  }
};
