import { Plus } from 'lucide-react';
import Reveal from '@/components/Reveal';

/** 자바스크립트 없이 동작하는 접이식 질문 목록 (details/summary) */
export default function Faq({ title, items }: { title: string; items: { q: string; a: string }[] }) {
  return (
    <section id="faq" className="bg-[#faf7f0] px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <h2 className="text-center text-3xl font-black tracking-tight text-[#0f1740] sm:text-5xl">{title}</h2>
          <div className="mx-auto mt-5 h-px w-24 bg-gradient-to-r from-transparent via-amber-500 to-transparent" />
        </Reveal>
        <div className="mt-12 space-y-3">
          {items.map((it, i) => (
            <Reveal key={it.q} delay={i * 40}>
              <details className="group rounded-2xl bg-white ring-1 ring-amber-900/10 transition open:shadow-xl open:shadow-amber-900/5">
                <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-base font-extrabold text-[#0f1740] [&::-webkit-details-marker]:hidden">
                  <span>{it.q}</span>
                  <Plus className="h-5 w-5 shrink-0 text-amber-600 transition duration-300 group-open:rotate-45" />
                </summary>
                <p className="px-5 pb-5 text-[15px] leading-relaxed text-slate-600">{it.a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
