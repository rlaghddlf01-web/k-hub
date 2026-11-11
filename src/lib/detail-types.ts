import type { ServiceId } from '@/lib/services';

/** 기능 목록 앞에 붙는 아이콘 이름 (components/icons.tsx 에서 실제 아이콘으로 바뀐다) */
export type IconKey =
  | 'chat' | 'shield' | 'map' | 'bell' | 'camera' | 'file' | 'phone' | 'sim' | 'calc' | 'users'
  | 'star' | 'clock' | 'globe' | 'check' | 'tag' | 'book' | 'heart' | 'wifi' | 'support' | 'gift';

export interface Feature {
  icon: IconKey;
  title: string;
  text: string;
}

export interface ServiceDetailCopy {
  /** 작은 윗글: 예) "01 · 중고거래" */
  eyebrow: string;
  headline: string;
  desc: string;
  features: Feature[];
  /** 이런 분께 */
  forWho: string[];
}

export interface DetailCopy {
  /** 서비스별 상세 */
  services: Record<ServiceId, ServiceDetailCopy>;
  /** 상단 바로가기 글자 */
  nav: Record<ServiceId, string>;
  featuresLabel: string;
  forWhoLabel: string;
  /** "어떤 서비스가 맞을까요?" 구간 */
  intentTitle: string;
  intentSub: string;
  intents: { text: string; service: ServiceId }[];
  /** 이용 방법 3단계 */
  howTitle: string;
  steps: { title: string; text: string }[];
  /** 자주 묻는 질문 */
  faqTitle: string;
  faq: { q: string; a: string }[];
  /** 맨 아래 안내: 서비스 내용·요금은 각 서비스에서 최종 확인 */
  disclaimer: string;
}
