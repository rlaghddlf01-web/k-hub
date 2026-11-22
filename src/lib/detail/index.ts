import type { Lang } from '@/lib/langs';
import type { BaseDetailCopy, DetailCopy } from '@/lib/detail-types';
import { HOME } from './home';
import { detail as ko } from './ko';
import { detail as en } from './en';
import { detail as ja } from './ja';
import { detail as ru } from './ru';
import { detail as vi } from './vi';
import { detail as zh } from './zh';
import { detail as th } from './th';
import { detail as uz } from './uz';
import { detail as km } from './km';
import { detail as mn } from './mn';
import { detail as ne } from './ne';
import { detail as id } from './id';
import { detail as my } from './my';
import { detail as si } from './si';
import { detail as kk } from './kk';
import { detail as bn } from './bn';
import { detail as ur } from './ur';

/**
 * 언어별 상세 문구 (17개국어). 한국어가 원문이고, 나머지는 번역 초안입니다.
 * 정식 공개 전에 각 언어 원어민 검수를 권장합니다.
 */
const TABLE: Record<Lang, BaseDetailCopy> = { ko, en, ja, ru, vi, zh, th, uz, km, mn, ne, id, my, si, kk, bn, ur };

/** 세 서비스 문구에 KTRS HOME 문구를 더한다: 상세 소개·바로가기·추천 문장, 그리고 "세 서비스"라고 적힌 안내 두 곳 */
function withHome(d: BaseDetailCopy, lang: Lang): DetailCopy {
  const h = HOME[lang];
  return {
    ...d,
    nav: { ...d.nav, home: h.nav },
    services: { ...d.services, home: h.detail },
    intents: [...d.intents, ...h.intents.map((text) => ({ text, service: 'home' as const }))],
    steps: d.steps.map((s, i) => (i === 1 ? { ...s, text: h.pickStep } : s)),
    faq: d.faq.map((f, i) => (i === 1 ? { ...f, q: h.accountsQ } : f)),
  };
}

export function getDetail(lang: Lang): DetailCopy {
  return TABLE[lang] ? withHome(TABLE[lang], lang) : withHome(en, 'en');
}
