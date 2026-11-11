'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ArrowRight, X } from 'lucide-react';
import { Crest } from '@/components/Logo';
import { CHOOSE_COPY } from '@/lib/copy';
import { LANGS, flagUrl, fromBrowserLang, hubPath, type Lang } from '@/lib/langs';

const STORAGE_KEY = 'ktrs_hub_lang';

/**
 * 처음 들어오면 뜨는 언어 선택 창 (케이마켓과 같은 방식).
 * - 이 브라우저에서 한 번 고르거나 닫으면 다시 뜨지 않는다 (localStorage).
 * - 브라우저 언어와 같은 카드를 금색 테두리로 강조한다.
 * - 고른 언어는 서비스로 이동할 때도 이어진다 (services.ts).
 */
export default function LanguageGate({ lang, search }: { lang: Lang; search: string }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [detected, setDetected] = useState<Lang | null>(null);

  useEffect(() => {
    let saved: string | null = null;
    try {
      saved = localStorage.getItem(STORAGE_KEY);
    } catch {
      saved = null;
    }
    if (saved) return; // 이미 고른 적이 있으면 뜨지 않는다
    setDetected(fromBrowserLang(navigator.language));
    setOpen(true);
  }, []);

  // 창이 열려 있는 동안 뒤 화면 스크롤을 막고, Esc 로 닫을 수 있게 한다
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') finish(lang);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, lang]);

  function finish(code: Lang) {
    try {
      localStorage.setItem(STORAGE_KEY, code);
    } catch {
      // 저장소를 못 쓰면 다음에 다시 뜬다
    }
    setOpen(false);
    if (code !== lang) router.push(`${hubPath(code)}${search}`);
  }

  if (!open) return null;

  // 제목: 브라우저 언어(있으면)로, 아래에 영어를 함께 보여 준다 (케이마켓과 같은 방식)
  const titleLang: Lang = detected ?? lang;
  const c = CHOOSE_COPY[titleLang];
  const title = titleLang === 'en' ? CHOOSE_COPY.en.title : `${c.title} / ${CHOOSE_COPY.en.title}`;
  const cont = CHOOSE_COPY[lang].cont;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={CHOOSE_COPY.en.title}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#05081a]/80 p-3 backdrop-blur-sm sm:p-6"
    >
      <div className="relative flex max-h-[92dvh] w-full max-w-2xl flex-col overflow-hidden rounded-[1.75rem] bg-[#fffdf8] shadow-[0_40px_120px_-20px_rgba(0,0,0,0.7)] ring-1 ring-amber-300/40">
        <button
          type="button"
          onClick={() => finish(lang)}
          aria-label="close"
          className="absolute end-3 top-3 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition hover:bg-slate-200 hover:text-slate-800"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="border-b border-amber-900/10 px-5 pb-5 pt-7 text-center sm:px-8">
          <Crest className="mx-auto h-14 w-auto drop-shadow-[0_6px_14px_rgba(243,186,47,0.4)]" />
          <h2 className="mx-auto mt-3 max-w-md text-balance text-xl font-black leading-snug text-[#0f1740] sm:text-2xl">{title}</h2>
          <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-slate-500">{c.sub}</p>
        </div>

        <div className="overflow-y-auto px-4 py-4 sm:px-6">
          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 md:grid-cols-4">
            {LANGS.map((l) => {
              const isDetected = l.code === detected;
              const isCurrent = l.code === lang;
              return (
                <button
                  key={l.code}
                  type="button"
                  onClick={() => finish(l.code)}
                  className={`flex min-h-[5.5rem] flex-col items-center justify-center gap-1.5 rounded-2xl px-2 py-3 text-center ring-1 transition hover:-translate-y-0.5 hover:shadow-lg ${
                    isDetected
                      ? 'bg-amber-50 ring-2 ring-amber-500'
                      : isCurrent
                      ? 'bg-white ring-amber-300'
                      : 'bg-white ring-slate-200 hover:ring-amber-300'
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={flagUrl(l.flag)} alt="" width={40} height={27} className="h-[1.7rem] w-auto rounded-[3px] shadow-sm" />
                  <span className="text-[15px] font-extrabold leading-tight text-[#0f1740]">{l.name}</span>
                  <span className="text-[10.5px] font-medium leading-tight text-slate-400">{l.country}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex items-center justify-end border-t border-amber-900/10 bg-[#faf6ec] px-4 py-3 sm:px-6">
          <button
            type="button"
            onClick={() => finish(lang)}
            className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[#0f1740] px-6 text-sm font-extrabold text-white transition hover:bg-[#1a1458]"
          >
            {cont}
            <ArrowRight className="h-4 w-4 text-amber-300 rtl:rotate-180" />
          </button>
        </div>
      </div>
    </div>
  );
}
