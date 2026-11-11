// 지원 언어 17개. 주소 규칙은 K-Market 과 같다: 한국어는 /, 나머지는 /vi 처럼 언어 코드를 앞에 붙인다.
export const LANG_CODES = [
  'ko', 'en', 'ja', 'ru', 'vi', 'zh', 'th', 'uz', 'km', 'mn', 'ne', 'id', 'my', 'si', 'kk', 'bn', 'ur',
] as const;
export type Lang = (typeof LANG_CODES)[number];
export const DEFAULT_LANG: Lang = 'ko';

export interface LangInfo {
  code: Lang;
  name: string;
  country: string;
  /** flagcdn 국기 코드 */
  flag: string;
}

/** 언어 선택 화면에 보이는 순서 (K-Market 과 동일) */
export const LANGS: LangInfo[] = [
  { code: 'ko', name: '한국어', country: 'South Korea', flag: 'kr' },
  { code: 'en', name: 'English', country: 'United States / Global', flag: 'us' },
  { code: 'ja', name: '日本語', country: 'Japan', flag: 'jp' },
  { code: 'ru', name: 'Русский', country: 'Russia / CIS', flag: 'ru' },
  { code: 'vi', name: 'Tiếng Việt', country: 'Vietnam', flag: 'vn' },
  { code: 'zh', name: '中文', country: 'China', flag: 'cn' },
  { code: 'th', name: 'ไทย', country: 'Thailand', flag: 'th' },
  { code: 'uz', name: "O'zbekcha", country: 'Uzbekistan', flag: 'uz' },
  { code: 'km', name: 'ភាសាខ្មែរ', country: 'Cambodia', flag: 'kh' },
  { code: 'mn', name: 'Монгол', country: 'Mongolia', flag: 'mn' },
  { code: 'ne', name: 'नेपाली', country: 'Nepal', flag: 'np' },
  { code: 'id', name: 'Bahasa Indonesia', country: 'Indonesia', flag: 'id' },
  { code: 'my', name: 'မြန်မာဘာသာ', country: 'Myanmar', flag: 'mm' },
  { code: 'si', name: 'සිංහල', country: 'Sri Lanka', flag: 'lk' },
  { code: 'kk', name: 'Қазақша', country: 'Kazakhstan', flag: 'kz' },
  { code: 'bn', name: 'বাংলা', country: 'Bangladesh', flag: 'bd' },
  { code: 'ur', name: 'اردو', country: 'Pakistan', flag: 'pk' },
];

export const flagUrl = (flag: string) => `https://flagcdn.com/w80/${flag}.png`;

export const isLang = (v: unknown): v is Lang => typeof v === 'string' && (LANG_CODES as readonly string[]).includes(v);

export const langInfo = (code: string): LangInfo => LANGS.find((l) => l.code === code) ?? LANGS[0];

/** 오른쪽에서 왼쪽으로 쓰는 언어 */
export const isRtl = (lang: Lang) => lang === 'ur';

/** 이 허브의 언어 주소: 한국어 '/', 나머지 '/vi' */
export const hubPath = (lang: Lang) => (lang === DEFAULT_LANG ? '/' : `/${lang}`);

/** 브라우저 언어(예: 'vi-VN', 'zh-CN')를 허브 언어로 바꾼다. 지원하지 않으면 null */
export function fromBrowserLang(raw: string | undefined): Lang | null {
  if (!raw) return null;
  const base = raw.toLowerCase().split('-')[0];
  return isLang(base) ? base : null;
}
