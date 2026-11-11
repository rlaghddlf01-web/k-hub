// 허브 이름은 여기 한 곳만 바꾸면 화면·검색 제목에 모두 반영됩니다.
export const BRAND = {
  /** 큰 로고 글자 */
  name: 'KTRS',
  /** 로고 옆 작은 부제 (영문) */
  sub: 'Korea Life Hub',
  /** 허브의 대표 주소 (배포 후 실제 주소로 바꾸세요. 검색 노출용 주소 정보에 쓰입니다) */
  url: process.env.NEXT_PUBLIC_HUB_URL || 'https://ktrs-hub.vercel.app',
};
