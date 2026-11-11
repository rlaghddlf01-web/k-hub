import type { Service } from '@/lib/services';

/** 실제 서비스 화면 캡처를 끼운 스마트폰 프레임 */
export default function Phone({ service, className = '' }: { service: Service; className?: string }) {
  return (
    <div
      className={`relative aspect-[390/844] rounded-[2.1rem] bg-gradient-to-b from-slate-500 via-slate-800 to-slate-950 p-[5px] shadow-[0_30px_70px_-18px_rgba(0,0,0,0.7)] ring-1 ring-white/25 ${className}`}
    >
      <div className="relative h-full w-full overflow-hidden rounded-[1.7rem] bg-white">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={service.shot}
          alt={service.name}
          width={390}
          height={844}
          decoding="async"
          className="h-full w-full object-cover object-top"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/25 via-transparent to-transparent" />
      </div>
    </div>
  );
}
