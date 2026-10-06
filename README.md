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
- 후보 큐: `?candidate=priority` 또는 `?candidate=followup` 링크로 같은 검토 범위를 공유
- 후보 상세: `?candidateId=<Candidate_ID>` 링크로 특정 자동 탐색 후보의 원문 확인 체크리스트를 공유
- 자료 상세 공유: `?record=<Record_ID>` 링크로 특정 논문·규제자료의 상세 화면을 공유
- 비교 화면: 연구 유형·설계·개입 형태/경로·결과 영역·결과 방향을 나란히 표시하며, 혼합 근거의 직접 합산과 제품 효능 자동 판정을 금지하는 해석 안내를 함께 제공
- 비교 결과는 클립보드 복사와 CSV 저장을 지원해 내부 검토·회의 자료로 재사용할 수 있습니다.
- 근거 CSV는 검증 스냅샷, 개입 구분, SCI/SCIE, 추출 상태, 확인일, 한계, 연구의 의미와 마케팅 활용 방안을 함께 포함합니다.

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
- `node scripts/validate-pending-sheet-sync.mjs`: 대기 payload의 36열·Record_ID·중복 상태 검증
- `node scripts/validate-health-contract.mjs`: 탐색일·PubMed·OpenAlex·Crossref·병합·후보·원천 오류 Health 지표의 데이터 계약 검증
- `node scripts/validate-ui-contract.mjs`: 포털·Intelligence·검토 큐 UI 계약 확인
- `node scripts/audit-public-links.mjs`: 원문·DOI·PubMed 대체 링크 체인을 검사하고 서버 접근 제한과 실제 실패를 구분
- 비교 기능 QA: 최소 2건 선택 → 비교 대화상자 → 연구 설계·결과 방향·해석 주의문 표시를 확인
- `node scripts/chrome-cdp-qa.mjs`: Playwright 없이 설치된 Chrome으로 desktop/mobile 핵심 흐름과 overflow 확인
- 모바일 필터 QA는 전환 완료 후 패널이 뷰포트 안에 배치되는지와 닫기 뒤 필터 버튼으로 포커스가 복귀하는지도 확인합니다.
- `/api/health`: 검증 스냅샷·자동 탐색 후보·후보 미리보기 상태를 읽기 전용으로 확인
- `node scripts/validate-public-surface.mjs`: 공개 HTML/API에 내부 관리 Sheet URL이 노출되지 않는지 확인
- `node scripts/validate-live-release.mjs`: 실제 공개 URL의 Health·릴리스 provenance·원문 감사·공개면 위생을 최종 확인하고 로컬 공개 데이터의 기대 provenance와 일치하는지 검증
- `node scripts/sync-public-release.mjs`: 지정된 공개 릴리스 디렉터리에 운영 template/data/build/validate/hosting과 UI/Chrome QA 검증기를 동기화하고 관리 Sheet URL을 제거
- `node scripts/package-public-release.mjs`: 최신 커밋 기준 Sites용 tar 경로를 출력하고 필수 파일·내부 Sheet URL 비노출을 재검증

Sheets 쓰기 권한이 없을 때는 재시도 루프를 만들지 않고 대기 payload만 갱신합니다.
외부 게시, 규제·안전성·법률·특허·금융 판단은 별도 검증과 승인이 필요합니다.
