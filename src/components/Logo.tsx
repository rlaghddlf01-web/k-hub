import { BRAND } from '@/lib/brand';

/**
 * 허브 로고 = 세금 환급 서비스(KTRS) 로고(금색 방패 K + KTRS) 그대로, 맨 아래 작은 글자만 "Korea Life Hub".
 * 이미지는 public/brand 에 있고 배경이 투명해서 어두운 바탕에 바로 올릴 수 있습니다.
 *  - logo-hub.webp : 방패 + KTRS + 작은 글자 (724 x 790)
 *  - crest.webp    : 방패만 (445 x 530)
 * 작은 글자를 바꾸려면 이미지를 다시 만들어야 합니다 (README 참고).
 */

/** 방패만 (메뉴 바 같은 작은 곳) */
export function Crest({ className = '' }: { className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src="/brand/crest.webp" alt={BRAND.name} width={445} height={530} decoding="async" className={className} />
  );
}

/** 가로형: 헤더용. 왼쪽 방패, 오른쪽에 앱 이름(KTRS)과 작은 부제 */
export function LogoInline({ className = '' }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <Crest className="h-11 w-auto drop-shadow-[0_4px_12px_rgba(243,186,47,0.35)] sm:h-12" />
      <span className="flex flex-col leading-none">
        <span className="serif gold-metal text-[1.7rem] font-bold tracking-[0.14em] sm:text-[2rem]">{BRAND.name}</span>
        <span className="serif mt-1.5 text-[0.6rem] font-semibold uppercase tracking-[0.3em] text-amber-200/80 sm:text-[0.68rem]">
          {BRAND.sub}
        </span>
      </span>
    </span>
  );
}

/** 세로형: 바닥글용 */
export function LogoStacked({ size = 'lg', className = '' }: { size?: 'md' | 'lg'; className?: string }) {
  const h = size === 'lg' ? 'h-[15rem] sm:h-[19rem]' : 'h-44 sm:h-52';
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/brand/logo-hub.webp"
      alt={`${BRAND.name} ${BRAND.sub}`}
      width={724}
      height={790}
      decoding="async"
      fetchPriority={size === 'lg' ? 'high' : 'auto'}
      className={`${h} mx-auto block w-auto drop-shadow-[0_18px_40px_rgba(243,186,47,0.28)] ${className}`}
    />
  );
}
