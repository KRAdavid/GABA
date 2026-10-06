# GABA 연구·규제·안전성 근거 포털

Google Sheet로 관리되는 GABA 섭취 임상·동물시험 문헌을 한국어로 검색하고
필터링하는 읽기 전용 웹 스냅샷입니다. 연구·규제·발효·특허·제품 활용 레인을
분리해 사실, 연구의 의미, 마케팅 활용 방안을 구분해서 검토합니다.

## 운영 구조

- 원본 관리: Google Sheet
- 공개 탐색: Sites 웹 인덱스
- 데이터 갱신: `npm run check`
- 배포물: `dist/server/index.js`
- 운영 소스: `worker/template.js` 및 `worker/data.json`
- 검토 큐: 브라우저 로컬 완료 표시와 JSON 내보내기 제공

웹 인덱스는 원본 시트를 직접 수정하지 않으며, 배포 시점의 검증된 스냅샷을
사용합니다. 검토 큐의 완료 표시도 현재 브라우저에만 저장됩니다.

## 검증 순서

```text
data-quality → build → validate → build-pending-sheet-sync → UI contract
```

- `node scripts/data-quality.mjs`: 원본·후보·식별자·중복 상태 확인
- `node scripts/build.mjs`: 검증된 스냅샷을 `dist/server/index.js`에 임베드
- `node scripts/validate.mjs`: 레코드 유형·수량·프로젝트 연결 검증
- `node scripts/build-pending-sheet-sync.mjs`: Sheets 403 등으로 대기 중인 레코드의 36열 payload 재생성
- `node scripts/validate-ui-contract.mjs`: 포털·Intelligence·검토 큐 UI 계약 확인
- `node scripts/chrome-cdp-qa.mjs`: Playwright 없이 설치된 Chrome으로 desktop/mobile 핵심 흐름과 overflow 확인
- `node scripts/validate-public-surface.mjs`: 공개 HTML/API에 내부 관리 Sheet URL이 노출되지 않는지 확인
- `node scripts/sync-public-release.mjs`: 지정된 공개 릴리스 디렉터리에 운영 template/data/build/validate/hosting과 UI/Chrome QA 검증기를 동기화하고 관리 Sheet URL을 제거
- 공개 릴리스 디렉터리에서 `npm run release:package <tar 경로>`: 최신 커밋 기준으로 Sites용 tar를 만들고 필수 파일·제목 정규화·내부 Sheet URL 비노출을 패키지 내부에서 재검증

Sheets 쓰기 권한이 없을 때는 재시도 루프를 만들지 않고 대기 payload만 갱신합니다.
외부 게시, 규제·안전성·법률·특허·금융 판단은 별도 검증과 승인이 필요합니다.
