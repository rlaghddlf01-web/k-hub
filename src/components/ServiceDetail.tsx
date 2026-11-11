import { ArrowUpRight } from 'lucide-react';
import { FeatureIcon } from '@/components/icons';
import Phone from '@/components/Phone';
import Reveal from '@/components/Reveal';
import type { ServiceDetailCopy } from '@/lib/detail-types';
import type { Service } from '@/lib/services';

/** 서비스 하나를 자세히 소개하는 구간. 짝수 번째는 폰과 글을 좌우로 바꿔 리듬을 준다. */
export default function ServiceDetail({
  service,
  detail,
  href,
  index,
  labels,
  goLabel,
}: {
  service: Service;
  detail: ServiceDetailCopy;
  href: string;
  index: number;
  labels: { features: string; forWho: string };
  goLabel: string;
}) {
  const flip = index % 2 === 1;
  const dark = index % 2 === 1;

  return (
    <section
      id={service.id}
      className={`relative isolate scroll-mt-16 overflow-hidden px-4 py-20 sm:px-6 sm:py-28 ${
        dark ? 'bg-[#0a0f26] text-white' : 'bg-[#faf7f0] text-slate-900'
      }`}
    >
      {dark && (
        <>
          <div className="pointer-events-none absolute -top-40 end-0 -z-10 h-[28rem] w-[28rem] rounded-full bg-indigo-500/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-40 start-0 -z-10 h-[26rem] w-[26rem] rounded-full bg-amber-300/10 blur-3xl" />
        </>
      )}

      <div className={`mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[0.8fr_1.2fr] ${flip ? 'lg:[direction:rtl]' : ''}`}>
        {/* 폰 */}
        <Reveal className={`${flip ? 'lg:[direction:ltr]' : ''} relative mx-auto w-full max-w-[19rem]`}>
          <div
            className="pointer-events-none absolute -inset-10 -z-10 rounded-full opacity-60 blur-3xl"
            style={{ background: `radial-gradient(closest-side, ${service.accent}55, transparent)` }}
          />
          <div className="float-a">
            <Phone service={service} />
          </div>
        </Reveal>

        {/* 글 */}
        <div className={flip ? 'lg:[direction:ltr]' : ''}>
          <Reveal>
            <div className="flex items-center gap-4">
              <span className="serif gold-text text-5xl font-semibold leading-none sm:text-6xl">0{index + 1}</span>
              <span className="h-px flex-1 max-w-24 bg-gradient-to-r from-amber-400/70 to-transparent rtl:bg-gradient-to-l" />
              <span className={`text-xs font-bold uppercase tracking-[0.28em] ${dark ? 'text-amber-200/80' : 'text-amber-700'}`}>
                {detail.eyebrow}
              </span>
            </div>
            <h2 className="mt-5 text-balance text-3xl font-black leading-[1.2] tracking-tight sm:text-5xl">{detail.headline}</h2>
            <p className={`mt-5 max-w-2xl text-base leading-relaxed sm:text-lg ${dark ? 'text-white/70' : 'text-slate-600'}`}>
              {detail.desc}
            </p>
          </Reveal>

          <Reveal delay={80}>
            <div className={`mt-9 text-[11px] font-bold uppercase tracking-[0.3em] ${dark ? 'text-white/45' : 'text-slate-400'}`}>
              {labels.features}
            </div>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {detail.features.map((f) => (
                <li
                  key={f.title}
                  className={`flex gap-3.5 rounded-2xl p-4 ring-1 transition ${
                    dark ? 'bg-white/[0.04] ring-white/10 hover:bg-white/[0.07]' : 'bg-white ring-amber-900/10 hover:shadow-lg hover:shadow-amber-900/5'
                  }`}
                >
                  <span
                    className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-[#1a1205]"
                    style={{ background: 'linear-gradient(135deg,#fbe08a,#f3ba2f 60%,#d99a10)' }}
                  >
                    <FeatureIcon name={f.icon} className="h-5 w-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[15px] font-extrabold leading-snug">{f.title}</span>
                    <span className={`mt-1 block text-sm leading-relaxed ${dark ? 'text-white/60' : 'text-slate-600'}`}>{f.text}</span>
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={140}>
            <div className={`mt-8 text-[11px] font-bold uppercase tracking-[0.3em] ${dark ? 'text-white/45' : 'text-slate-400'}`}>
              {labels.forWho}
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {detail.forWho.map((w) => (
                <span
                  key={w}
                  className={`rounded-full px-3.5 py-1.5 text-sm font-semibold ring-1 ${
                    dark ? 'bg-amber-300/10 text-amber-100 ring-amber-300/30' : 'bg-amber-50 text-amber-900 ring-amber-300/50'
                  }`}
                >
                  {w}
                </span>
              ))}
            </div>

            <a
              href={href}
              className="mt-10 inline-flex min-h-13 items-center gap-3 rounded-full px-8 py-3.5 text-base font-extrabold text-[#1a1205] shadow-[0_14px_40px_-12px_rgba(243,186,47,0.65)] transition hover:scale-[1.03] active:scale-95"
              style={{ background: 'linear-gradient(135deg,#fbe08a 0%,#f3ba2f 55%,#d99a10 100%)' }}
            >
              {service.name} · {goLabel}
              <ArrowUpRight className="h-5 w-5" />
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
