# GABA 섭취 근거 인덱스

Google Sheet로 관리되는 GABA 섭취 임상·동물시험 문헌을 한국어로 검색하고
필터링할 수 있도록 만든 읽기 전용 웹 스냅샷입니다.

## 운영 구조

- 원본 관리: Google Sheet
- 공개 탐색: Sites 웹 인덱스
- 데이터 갱신: `npm run check`
- 배포물: `dist/server/index.js`

웹 인덱스는 원본 시트를 직접 수정하지 않으며, 배포 시점의 검증된 스냅샷을
사용합니다.
