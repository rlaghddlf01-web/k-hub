'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ArrowUpRight, ChevronDown } from 'lucide-react';
import Faq from '@/components/Faq';
import LanguageGate from '@/components/LanguageGate';
import { Crest, LogoInline } from '@/components/Logo';
import Phone from '@/components/Phone';
import Reveal from '@/components/Reveal';
import ServiceDetail from '@/components/ServiceDetail';
import { BRAND } from '@/lib/brand';
import { CHOOSE_COPY, COPY, STAT_LABELS } from '@/lib/copy';
import { getDetail } from '@/lib/detail';
import { LANGS, flagUrl, fromBrowserLang, hubPath, langInfo, type Lang } from '@/lib/langs';
import { SERVICES, buildServiceHref, type Service } from '@/lib/services';
import { getVisitorId } from '@/lib/visitor';

export default function Hub({ lang }: { lang: Lang }) {
  const copy = COPY[lang];
  const detail = getDetail(lang);
  const stat = STAT_LABELS[lang];
  const current = langInfo(lang);

  const [search, setSearch] = useState('');
  const [visitorId, setVisitorId] = useState<string | undefined>();
  const [langOpen, setLangOpen] = useState(false);
  const [suggest, setSuggest] = useState<Lang | null>(null);

  useEffect(() => {
    setSearch(window.location.search);
    setVisitorId(getVisitorId());

    // 예전에 다른 언어를 골랐던 사람이 한국어 대표 주소(/)로 다시 들어오면 "내 언어로 보기"를 한 줄 제안한다.
    // (처음 방문한 사람에게는 언어 선택 창이 뜬다 - LanguageGate)
    if (lang === 'ko') {
      let saved: string | null = null;
      try {
        saved = localStorage.getItem('ktrs_hub_lang');
      } catch {
        saved = null;
      }
      const wanted = saved ? fromBrowserLang(saved) : null;
      if (wanted && wanted !== 'ko') setSuggest(wanted);
    }
  }, [lang]);

  const incoming = new URLSearchParams(search);
  const hrefOf = (s: Service) => buildServiceHref(s, lang, incoming, visitorId);
  const serviceOf = (id: Service['id']) => SERVICES.find((s) => s.id === id)!;
  const langHref = (code: Lang) => `${hubPath(code)}${search}`;
  const rememberLang = (code: Lang) => {
    try {
      localStorage.setItem('ktrs_hub_lang', code);
    } catch {
      // 저장소를 못 쓰면 기억하지 않음
    }
  };

  const [market, tax, telecom] = SERVICES;

  return (
    <main className="overflow-x-clip bg-[#faf7f0] text-slate-900">
      <LanguageGate lang={lang} search={search} />

      {/* ───────── 1. 히어로 ───────── */}
      <section
        className="grain relative isolate overflow-hidden rounded-b-[2.5rem] text-white sm:rounded-b-[4rem]"
        style={{
          background:
            'radial-gradient(900px 520px at 75% -10%, rgba(124,92,255,0.5), transparent 70%), radial-gradient(700px 500px at -5% 100%, rgba(243,186,47,0.2), transparent 70%), linear-gradient(180deg,#080c1f 0%,#0f1740 55%,#1a1458 100%)',
        }}
      >
        {suggest && suggest !== lang && (
          <div className="border-b border-white/10 bg-white/10 px-4 py-2 text-center text-sm backdrop-blur">
            <Link
              href={langHref(suggest)}
              onClick={() => rememberLang(suggest)}
              className="inline-flex items-center gap-2 font-semibold text-amber-200 underline-offset-4 hover:underline"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={flagUrl(langInfo(suggest).flag)} alt="" width={20} height={14} className="rounded-[2px]" />
              {copy.switchTo.replace('{lang}', langInfo(suggest).name)}
            </Link>
          </div>
        )}

        <header className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 pt-[max(1rem,env(safe-area-inset-top))] pb-2 sm:px-6">
          <Link href={hubPath(lang) + search} aria-label={BRAND.name} className="rounded-xl outline-offset-4">
            <LogoInline />
          </Link>

          <div className="relative">
            <button
              type="button"
              onClick={() => setLangOpen((v) => !v)}
              aria-expanded={langOpen}
              aria-haspopup="listbox"
              className="flex min-h-11 items-center gap-2 rounded-full bg-white/10 px-4 text-sm font-bold ring-1 ring-amber-200/30 backdrop-blur transition hover:bg-white/20"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={flagUrl(current.flag)} alt="" width={22} height={15} className="rounded-[2px]" />
              <span>{current.name}</span>
              <ChevronDown className={`h-4 w-4 transition ${langOpen ? 'rotate-180' : ''}`} />
            </button>

            {langOpen && (
              <>
                <button type="button" aria-label="close" className="fixed inset-0 z-40 cursor-default" onClick={() => setLangOpen(false)} />
                <div
                  role="listbox"
                  className="absolute end-0 z-50 mt-2 grid max-h-[70dvh] w-[min(20rem,calc(100vw-2rem))] grid-cols-2 gap-1 overflow-y-auto rounded-2xl bg-white p-2 text-slate-800 shadow-2xl ring-1 ring-black/10"
                >
                  {LANGS.map((l) => (
                    <Link
                      key={l.code}
                      href={langHref(l.code)}
                      onClick={() => {
                        rememberLang(l.code);
                        setLangOpen(false);
                      }}
                      className={`flex min-h-11 items-center gap-2 rounded-xl px-3 text-sm font-semibold transition hover:bg-amber-50 ${
                        l.code === lang ? 'bg-amber-100 text-amber-900' : ''
                      }`}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={flagUrl(l.flag)} alt="" width={22} height={15} className="rounded-[2px]" />
                      <span className="leading-tight">{l.name}</span>
                    </Link>
                  ))}
                </div>
              </>
            )}
          </div>
        </header>

        <div className="mx-auto max-w-6xl px-4 pt-14 text-center sm:px-6 sm:pt-24">
          <h1 className="mx-auto max-w-3xl text-balance text-4xl font-black leading-[1.15] tracking-tight sm:text-6xl">{copy.tagline}</h1>
          <p className="mx-auto mt-5 max-w-2xl text-balance text-base text-white/75 sm:text-xl">{copy.sub}</p>
          <a
            href="#services"
            className="mt-9 inline-flex min-h-12 items-center gap-2 rounded-full px-8 text-base font-extrabold text-[#1a1205] shadow-[0_14px_40px_-10px_rgba(243,186,47,0.7)] transition hover:scale-[1.03] active:scale-95"
            style={{ background: 'linear-gradient(135deg,#fbe08a 0%,#f3ba2f 55%,#d99a10 100%)' }}
          >
            {copy.pick}
            <ChevronDown className="h-5 w-5" />
          </a>

          {/* 실제 서비스 화면 3개 */}
          <div className="relative mx-auto mt-14 flex max-w-3xl items-end justify-center gap-0 px-2 sm:mt-20">
            <div className="pointer-events-none absolute inset-x-8 bottom-0 -z-10 h-2/3 rounded-full bg-amber-300/15 blur-3xl" />
            <div className="float-b -me-5 w-[29%] origin-bottom -rotate-6 sm:-me-8">
              <Phone service={market} />
            </div>
            <div className="float-a relative z-10 w-[36%] -translate-y-6 sm:-translate-y-10">
              <Phone service={tax} />
            </div>
            <div className="float-c -ms-5 w-[29%] origin-bottom rotate-6 sm:-ms-8">
              <Phone service={telecom} />
            </div>
          </div>
        </div>
        <div className="h-0 sm:h-4" />
      </section>

      {/* ───────── 고정 메뉴: 서비스별 상세로 바로 이동 ───────── */}
      <nav className="sticky top-3 z-30 mx-auto -mt-6 w-fit max-w-[calc(100vw-1.5rem)]">
        <ul className="flex items-center gap-1 rounded-full bg-[#0a0f26]/90 p-1.5 shadow-[0_18px_40px_-14px_rgba(10,15,38,0.7)] ring-1 ring-amber-300/30 backdrop-blur">
          <li className="px-2">
            <Crest className="h-7 w-auto" />
          </li>
          {SERVICES.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className="inline-flex min-h-10 items-center whitespace-nowrap rounded-full px-3.5 text-[13px] font-bold text-white/85 transition hover:bg-white/10 hover:text-amber-200 sm:px-4 sm:text-sm"
              >
                {detail.nav[s.id]}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* ───────── 2. 17개국어: 히어로 바로 밑 (큰 숫자 구간과 합침) ───────── */}
      <section id="languages" className="scroll-mt-20 bg-[#fffdf8] px-4 pb-16 pt-20 sm:px-6 sm:pb-24 sm:pt-28">
        <Reveal>
          <h2 className="mx-auto max-w-3xl text-center text-3xl font-black tracking-tight text-[#0f1740] sm:text-5xl">
            <span className="serif gold-text text-6xl sm:text-8xl">{LANGS.length}</span> {stat.languages}
          </h2>
          <div className="mx-auto mt-5 h-px w-24 bg-gradient-to-r from-transparent via-amber-500 to-transparent" />
          <p className="mx-auto mt-4 max-w-xl text-center text-sm text-slate-500 sm:text-base">{CHOOSE_COPY[lang].sub}</p>
        </Reveal>

        <div className="mx-auto mt-10 grid max-w-5xl grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {LANGS.map((l) => (
            <Link
              key={l.code}
              href={langHref(l.code)}
              onClick={() => rememberLang(l.code)}
              className={`flex min-h-14 items-center gap-3 rounded-2xl px-4 text-sm font-bold text-[#0f1740] transition hover:-translate-y-0.5 hover:shadow-lg ${
                l.code === lang ? 'bg-amber-50 ring-2 ring-amber-500' : 'bg-white ring-1 ring-amber-900/10 hover:ring-amber-300'
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={flagUrl(l.flag)} alt="" width={28} height={19} className="rounded-[3px] shadow-sm" />
              <span className="leading-tight">{l.name}</span>
            </Link>
          ))}
        </div>
      </section>
      {/* ───────── 3. 한눈에 고르기 ───────── */}
      <section id="services" className="scroll-mt-20 px-4 pb-20 pt-10 sm:px-6 sm:pb-28 sm:pt-16">
        <Reveal>
          <h2 className="mx-auto max-w-3xl text-balance text-center text-3xl font-black tracking-tight text-[#0f1740] sm:text-5xl">{copy.pick}</h2>
          <div className="mx-auto mt-5 h-px w-24 bg-gradient-to-r from-transparent via-amber-500 to-transparent" />
          <p className="mx-auto mt-4 max-w-xl text-center text-sm text-slate-500 sm:text-base">{copy.footer}</p>
        </Reveal>

        <div className="mx-auto mt-12 grid max-w-6xl gap-7 md:grid-cols-3">
          {SERVICES.map((s, i) => (
            <Reveal key={s.id} delay={i * 90}>
              <a
                href={hrefOf(s)}
                className="group flex h-full flex-col overflow-hidden rounded-[2rem] bg-white shadow-[0_20px_60px_-25px_rgba(15,23,64,0.35)] ring-1 ring-black/5 transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_30px_80px_-25px_rgba(15,23,64,0.5)]"
              >
                <div
                  className="relative h-[21rem] overflow-hidden px-8 pt-8"
                  style={{ background: `radial-gradient(120% 80% at 50% 0%, ${s.accent}40, transparent 70%), linear-gradient(180deg, #fbf8f1, #f1ece0)` }}
                >
                  <div className="mx-auto w-[11.5rem] translate-y-2 transition duration-500 group-hover:translate-y-0 sm:w-[12.5rem]">
                    <Phone service={s} />
                  </div>
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white to-transparent" />
                </div>

                <div className="flex flex-1 flex-col gap-3 p-7 pt-3">
                  <div className="flex items-center gap-2.5">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ background: s.accent }} />
                    <h3 className="text-xl font-black tracking-tight text-[#0f1740]">{s.name}</h3>
                  </div>
                  <p className="flex-1 text-[15px] leading-relaxed text-slate-600">{copy[s.id]}</p>
                  <span className="mt-3 inline-flex min-h-12 items-center justify-between rounded-full bg-[#0f1740] px-6 text-base font-extrabold text-white transition group-hover:bg-[#1a1458]">
                    {copy.go}
                    <ArrowUpRight className="h-5 w-5 text-amber-300 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ───────── 4. 서비스별 자세한 소개 ───────── */}
      {SERVICES.map((s, i) => (
        <ServiceDetail
          key={s.id}
          service={s}
          detail={detail.services[s.id]}
          href={hrefOf(s)}
          index={i}
          labels={{ features: detail.featuresLabel, forWho: detail.forWhoLabel }}
          goLabel={copy.go}
        />
      ))}

      {/* ───────── 5. 어떤 서비스가 맞을까요? ───────── */}
      <section
        className="grain relative isolate overflow-hidden px-4 py-20 text-white sm:px-6 sm:py-28"
        style={{ background: 'linear-gradient(135deg,#080c1f 0%,#14194a 55%,#241a6b 100%)' }}
      >
        <div className="pointer-events-none absolute -top-24 start-1/4 -z-10 h-80 w-80 rounded-full bg-amber-300/10 blur-3xl" />
        <Reveal>
          <h2 className="mx-auto max-w-3xl text-balance text-center text-3xl font-black tracking-tight sm:text-5xl">{detail.intentTitle}</h2>
          <div className="mx-auto mt-5 h-px w-24 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
          <p className="mx-auto mt-4 max-w-xl text-center text-base text-white/65">{detail.intentSub}</p>
        </Reveal>
        <div className="mx-auto mt-12 grid max-w-3xl gap-3">
          {detail.intents.map((it, i) => {
            const s = serviceOf(it.service);
            return (
              <Reveal key={it.text} delay={i * 50}>
                <a
                  href={hrefOf(s)}
                  className="group flex min-h-16 items-center justify-between gap-4 rounded-2xl bg-white/[0.05] px-5 py-4 ring-1 ring-white/10 transition hover:bg-white/[0.1] hover:ring-amber-300/50"
                >
                  <span className="text-base font-bold leading-snug sm:text-lg">{it.text}</span>
                  <span className="flex shrink-0 items-center gap-2 rounded-full bg-amber-300/15 px-3.5 py-1.5 text-xs font-extrabold text-amber-200 ring-1 ring-amber-300/30 sm:text-sm">
                    {detail.nav[s.id]}
                    <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </a>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ───────── 6. 이용 방법 ───────── */}
      <section className="bg-[#faf7f0] px-4 py-20 sm:px-6 sm:py-28">
        <Reveal>
          <h2 className="mx-auto max-w-3xl text-balance text-center text-3xl font-black tracking-tight text-[#0f1740] sm:text-5xl">{detail.howTitle}</h2>
          <div className="mx-auto mt-5 h-px w-24 bg-gradient-to-r from-transparent via-amber-500 to-transparent" />
        </Reveal>
        <ol className="mx-auto mt-14 grid max-w-5xl gap-6 md:grid-cols-3">
          {detail.steps.map((st, i) => (
            <Reveal key={st.title} delay={i * 100}>
              <li className="relative h-full rounded-[1.6rem] bg-white p-7 pt-9 ring-1 ring-amber-900/10 shadow-[0_18px_50px_-28px_rgba(15,23,64,0.4)]">
                <span className="serif gold-text absolute -top-7 start-6 text-7xl font-semibold leading-none">{i + 1}</span>
                <h3 className="text-xl font-black text-[#0f1740]">{st.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-slate-600">{st.text}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* ───────── 7. 자주 묻는 질문 ───────── */}
      <Faq title={detail.faqTitle} items={detail.faq} />

      {/* ───────── 9. 마무리 ───────── */}
      <footer className="bg-[#05081a] px-4 pb-[max(2.5rem,env(safe-area-inset-bottom))] pt-14 text-slate-400 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
            <div className="max-w-sm">
              <Link href={hubPath(lang) + search} aria-label={BRAND.name} className="inline-block rounded-xl outline-offset-4">
                <LogoInline />
              </Link>
              <p className="mt-4 text-sm leading-relaxed text-slate-400">{copy.sub}</p>
            </div>

            <div className="flex flex-wrap items-center gap-2 md:justify-end">
              {SERVICES.map((s) => (
                <a
                  key={s.id}
                  href={hrefOf(s)}
                  className="inline-flex min-h-11 items-center rounded-full bg-white/5 px-4 text-sm font-bold text-white ring-1 ring-white/15 transition hover:bg-white/15"
                >
                  {s.name}
                </a>
              ))}
            </div>
          </div>

          <div className="mt-10 h-px w-full bg-gradient-to-r from-transparent via-amber-300/30 to-transparent" />
          <p className="mt-6 max-w-3xl text-xs leading-relaxed text-slate-500">{detail.disclaimer}</p>
        </div>
      </footer>
    </main>
  );
}
