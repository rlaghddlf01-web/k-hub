import { DEFAULT_LANG, LANG_CODES, type Lang } from '@/lib/langs';

export type ServiceId = 'market' | 'tax' | 'telecom';

export interface Service {
  id: ServiceId;
  /** 화면에 보이는 이름 (번역하지 않음) */
  name: string;
  /** 서비스 대표 주소 (끝에 / 없음) */
  url: string;
  /** 이 서비스가 지원하는 언어. 지원하지 않는 언어로 들어온 사람은 영어로 연결한다 */
  langs: readonly Lang[];
  /** 카드 강조 색 (각 서비스의 실제 브랜드 색) */
  accent: string;
  /** 실제 서비스 화면 캡처 (public/shots) */
  shot: string;
  /** 서비스 언어 주소를 만든다 */
  path: (lang: Lang) => string;
}

// K-Market · K-Telecom 은 한국어 '/', 나머지 '/vi' 처럼 언어가 주소 앞에 붙는다.
const prefixPath = (lang: Lang) => (lang === DEFAULT_LANG ? '/' : `/${lang}`);

export const SERVICES: Service[] = [
  {
    id: 'market',
    name: 'KTRS 마켓',
    url: 'https://ktrs-market.vercel.app',
    langs: LANG_CODES,
    accent: '#d9a21b',
    shot: '/shots/market.webp',
    path: prefixPath,
  },
  {
    id: 'tax',
    name: 'Korea Tax Refund Service',
    url: 'https://ktrs-service.vercel.app',
    // 세금 환급 서비스(Korea Tax Refund Service)는 15개국어 (일본어·러시아어 없음). ?lang= 으로 언어를 받는다.
    langs: ['ko', 'en', 'vi', 'zh', 'th', 'uz', 'km', 'mn', 'ne', 'id', 'my', 'si', 'kk', 'bn', 'ur'],
    accent: '#1e3a6e',
    shot: '/shots/tax.webp',
    path: (lang) => `/welcome?lang=${lang}`,
  },
  {
    id: 'telecom',
    name: 'K-Telecom',
    url: 'https://k-telecom.vercel.app',
    langs: LANG_CODES,
    accent: '#e11d48',
    shot: '/shots/telecom.webp',
    path: prefixPath,
  },
];

/** 허브로 들어올 때 붙어 있던 광고 정보. 서비스로 넘길 때 그대로 이어붙인다 */
const PASS_THROUGH = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid', 'fbclid', 'ttclid'];

/**
 * 서비스로 가는 주소를 만든다.
 * - 광고 태그(utm_*)와 클릭 ID 는 그대로 이어붙여서 광고 효과가 허브에서 끊기지 않게 한다.
 * - 광고 태그 없이 허브에 직접 들어온 사람은 utm_source=ktrs-hub 로 표시해 "허브에서 왔다"는 걸 알 수 있게 한다.
 * - hub_vid: 허브 방문자 ID (같은 사람이 서비스를 오가는지 나중에 이어서 세기 위한 선택 값. 서비스가 무시해도 된다)
 */
export function buildServiceHref(service: Service, lang: Lang, incoming: URLSearchParams, visitorId?: string): string {
  const useLang: Lang = service.langs.includes(lang) ? lang : 'en';
  const path = service.path(useLang);

  const out = new URLSearchParams();
  for (const key of PASS_THROUGH) {
    const v = incoming.get(key);
    if (v) out.set(key, v);
  }
  if (!out.has('utm_source')) {
    out.set('utm_source', 'ktrs-hub');
    out.set('utm_medium', 'hub');
    if (!out.has('utm_campaign')) out.set('utm_campaign', `hub-${service.id}`);
  }
  if (!out.has('utm_content')) out.set('utm_content', `via-hub_${service.id}`);
  if (visitorId) out.set('hub_vid', visitorId);

  const joiner = path.includes('?') ? '&' : '?';
  return `${service.url}${path}${joiner}${out.toString()}`;
}
