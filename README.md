# KTRS 허브

KTRS 서비스 3개(KTRS 마켓 · Korea Tax Refund Service · K-Telecom)로 사용자를 나눠 보내는 **안내 전용 첫 화면**입니다.
회원가입·로그인은 없습니다. 각 서비스 주소로 연결만 합니다.

## 주소
- 한국어 `/`, 나머지 17개국어는 K-Market 처럼 `/vi`, `/en`, `/ja` …

## 이름 바꾸기
`src/lib/brand.ts` 한 곳만 바꾸면 화면과 검색 제목에 모두 반영됩니다.

## 로고
세금 환급 서비스(KTRS)의 로고(금색 방패 K + KTRS)를 그대로 쓰고, 맨 아래 작은 글자만 `Korea Life Hub`로 바꾼 이미지입니다.
- `public/brand/logo-hub.webp` 전체 로고, `public/brand/crest.webp` 방패만, `src/app/icon.png` 브라우저 탭 아이콘
- 화면에서는 방패 이미지 + HTML 글자(`src/components/Logo.tsx`)로 가로 로고를 만듭니다. 글자는 `src/lib/brand.ts` 에서 바꿉니다.

## 화면에 쓰인 서비스 캡처
`public/shots/*.webp` 는 실제 사이트의 모바일 화면을 찍은 것입니다. 사이트 화면이 바뀌면 새로 찍어서 교체하세요.
홍보성·오해를 부를 수 있는 문구(예: "정부 지원", 국세청 로고)가 크게 보이지 않는 화면을 골랐습니다.

## 소개 문구 (한국어 → 번역은 나중에)
- 서비스별 상세 소개·자주 묻는 질문: `src/lib/detail/ko.ts` (영어 `en.ts`). 다른 언어는 문구가 확정되면 같은 형식으로 추가하고 `src/lib/detail/index.ts` 표에 등록합니다.
- 첫 화면·카드 문구(17개국어): `src/lib/copy.ts` — 마켓 카드 문구는 한국어·영어만 최신입니다.
- 코드에서 확인된 기능만 적었습니다. 가격·수수료·"1등"·"공식"·"정부" 같은 문구는 일부러 뺐습니다.

## 서비스 연결 주소
`src/lib/services.ts` 에서 각 서비스의 주소·지원 언어를 관리합니다.
- 허브로 들어올 때 붙어 있던 광고 태그(`utm_*`, `gclid`, `fbclid`, `ttclid`)는 서비스로 넘길 때 그대로 이어붙입니다.
- 광고 태그 없이 들어온 사람은 `utm_source=ktrs-hub` 로 표시됩니다.
- 서비스가 지원하지 않는 언어는 영어로 연결합니다 (Korea Tax Refund Service는 15개국어: 일본어·러시아어 없음).

## 방문 기록 (선택)
`NEXT_PUBLIC_SUPABASE_URL` / `SUPABASE_SERVICE_ROLE_KEY` 가 있으면 방문이 같은 Supabase 의 `kmarket_traffic_logs` 에 쌓입니다.
없으면 기록만 건너뛰고 화면은 정상 동작합니다. 키는 `.env.local` 에 넣고 저장소에 올리지 마세요.

## 실행
```bash
npm install
npm run dev     # http://localhost:3200
npm run build
```
