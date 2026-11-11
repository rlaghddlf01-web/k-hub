'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

/**
 * 스크롤해서 화면에 들어올 때 살짝 떠오르는 효과.
 * - 처음부터 화면에 보이는 요소는 건드리지 않는다 (깜빡임 방지)
 * - 자바스크립트가 꺼져 있거나 "동작 줄이기" 설정이면 처음부터 그대로 보인다
 */
export default function Reveal({
  children,
  className = '',
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<'visible' | 'hidden' | 'shown'>('visible');

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.92) return; // 이미 보이는 요소

    setState('hidden');
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setState('shown');
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${className} transition duration-700 ease-out ${state === 'hidden' ? 'translate-y-8 opacity-0' : 'translate-y-0 opacity-100'}`}
      style={{ transitionDelay: state === 'shown' ? `${delay}ms` : undefined }}
    >
      {children}
    </div>
  );
}
