'use client';

import { useEffect } from 'react';
import { getVisitorId } from '@/lib/visitor';
import { SERVICES } from '@/lib/services';

// 방문 추적: 접속할 때 유입 채널(광고 태그·이전 주소)을 판별해 /api/traffic 으로 한 번 보낸다.
// 채널 이름(key)은 K-Market 관리자 대시보드의 채널과 같아야 합니다.

const SESSION_KEY = 'hub_last_visit_session';
const CHANNEL_KEY = 'hub_visit_channel';
const SESSION_GAP_MS = 10 * 60 * 1000; // 같은 탭에서 10분 안의 재방문은 다시 세지 않음

type Channel = { key: string; name: string };

// utm_source 에서 찾을 단어. 짧은 약어(tt, fb ...)는 단어가 정확히 같을 때만 인정한다
const UTM_RULES: { key: string; name: string; text?: string[]; word?: string[] }[] = [
  { key: 'tiktok', name: '틱톡 (TikTok Shorts/바이럴)', text: ['tiktok'], word: ['tt'] },
  { key: 'facebook', name: '페이스북 (외국인 커뮤니티 그룹)', text: ['facebook', 'meta'], word: ['fb'] },
  { key: 'zalo', name: '잘로 (Zalo 베트남 메신저)', text: ['zalo'] },
  { key: 'line', name: '라인 (LINE 태국/동남아 채널)', text: ['line'] },
  { key: 'telegram', name: '텔레그램 (Telegram 우즈벡/러시아어)', text: ['telegram'], word: ['tg'] },
  { key: 'wechat', name: '위챗 (WeChat 동포 네트워크)', text: ['wechat'], word: ['wx'] },
  { key: 'youtube', name: '유튜브 (YouTube 한국생활 쇼츠)', text: ['youtube'], word: ['yt'] },
  { key: 'threads', name: '스레드 (Threads)', text: ['threads'] },
  { key: 'instagram', name: '인스타그램 (Instagram 릴스)', text: ['instagram', 'insta'], word: ['ig'] },
  { key: 'offline_qr', name: '기숙사/쉼터 QR코드 오프라인', text: ['qr', 'dormitory', 'shelter'] },
  { key: 'kakaotalk', name: '카카오톡 (오픈채팅/알림톡)', text: ['kakao', 'talk'] },
  { key: 'google', name: '구글 (Google 다국어 검색)', text: ['google', 'adwords'], word: ['gads'] },
  { key: 'naver', name: '네이버 (블로그/카페)', text: ['naver'] },
  { key: 'eps_gov', name: '고용노동부 EPS 게시판', text: ['eps', 'gov', 'hikorea'] },
  { key: 'referral', name: '지인 초대 (친구추천 링크)', text: ['invite', 'friend', 'referral'] },
];

// 이전 주소(referrer)의 도메인으로 판별
const REFERRER_RULES: { key: string; name: string; hosts: string[] }[] = [
  { key: 'tiktok', name: '틱톡 (TikTok Shorts/바이럴)', hosts: ['tiktok.com'] },
  { key: 'facebook', name: '페이스북 (외국인 커뮤니티 그룹)', hosts: ['facebook.com', 'fb.com', 'fb.me'] },
  { key: 'zalo', name: '잘로 (Zalo 베트남 메신저)', hosts: ['zalo.me'] },
  { key: 'line', name: '라인 (LINE 태국/동남아 채널)', hosts: ['line.me'] },
  { key: 'telegram', name: '텔레그램 (Telegram 우즈벡/러시아어)', hosts: ['t.me', 'telegram.org'] },
  { key: 'threads', name: '스레드 (Threads)', hosts: ['threads.com', 'threads.net'] },
  { key: 'instagram', name: '인스타그램 (Instagram 릴스)', hosts: ['instagram.com'] },
  { key: 'youtube', name: '유튜브 (YouTube 한국생활 쇼츠)', hosts: ['youtube.com', 'youtu.be'] },
  { key: 'google', name: '구글 (Google 다국어 검색)', hosts: ['google.com', 'google.co.kr'] },
  { key: 'naver', name: '네이버 (블로그/카페)', hosts: ['naver.com'] },
  { key: 'eps_gov', name: '고용노동부 EPS 게시판', hosts: ['eps.go.kr', 'hikorea.go.kr', 'moel.go.kr'] },
];

const DIRECT: Channel = { key: 'direct', name: '직접 방문 (Direct / 북마크)' };

function detectChannel(params: URLSearchParams, utmSource: string, referrer: string): Channel {
  const tokens = utmSource.split(/[^a-z0-9]+/).filter(Boolean);

  for (const r of UTM_RULES) {
    if (r.text?.some((t) => utmSource.includes(t)) || r.word?.some((w) => tokens.includes(w))) {
      return { key: r.key, name: r.name };
    }
  }

  // UTM 이 없을 때: 광고 클릭 ID 로 식별
  if (!utmSource) {
    if (params.has('ttclid')) return { key: 'tiktok', name: UTM_RULES[0].name };
    if (params.has('fbclid')) return { key: 'facebook', name: UTM_RULES[1].name };
    if (params.has('gclid')) return { key: 'google', name: UTM_RULES.find((r) => r.key === 'google')!.name };
  }

  if (!utmSource || referrer) {
    let host = '';
    try {
      host = referrer ? new URL(referrer).hostname.toLowerCase() : '';
    } catch {
      host = '';
    }
    if (host) {
      const hit = REFERRER_RULES.find((r) => r.hosts.some((h) => host === h || host.endsWith('.' + h)));
      if (hit) return { key: hit.key, name: hit.name };
      // 허브 안에서 언어만 바꿔 이동한 경우는 외부 유입이 아님
      if (host === window.location.hostname) return DIRECT;
      return { key: 'other', name: '기타 타사이트 유입' };
    }
  }

  return DIRECT;
}

/** 서비스 주소(origin) → 서비스 id. 허브에서 이 주소로 나가는 링크 클릭을 "서비스 이동"으로 기록한다 */
const EXIT_TARGETS = SERVICES.map((s) => ({ id: s.id, origin: new URL(s.url).origin }));

function readChannel(): Channel {
  try {
    const raw = sessionStorage.getItem(CHANNEL_KEY);
    if (raw) return JSON.parse(raw) as Channel;
  } catch {
    // 저장소를 못 쓰면 직접 방문으로 취급
  }
  return DIRECT;
}

export default function TrafficTracker() {
  // 서비스(마켓·세금환급·텔레콤)로 나가는 링크 클릭 기록: 어느 유입 채널에서 어느 서비스로 넘어갔는지 본다
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.('a[href]') as HTMLAnchorElement | null;
      if (!a) return;
      let origin = '';
      try {
        origin = new URL(a.href).origin;
      } catch {
        return;
      }
      const hit = EXIT_TARGETS.find((t) => t.origin === origin);
      if (!hit) return;
      const channel = readChannel();
      const data = JSON.stringify({
        event: 'exit',
        target: hit.id,
        channelKey: channel.key,
        channelName: channel.name,
        sourceUrl: window.location.href,
        visitorId: getVisitorId(),
      });
      // 페이지를 떠나는 순간에도 전송되도록 sendBeacon 우선
      const ok = navigator.sendBeacon?.('/api/traffic', new Blob([data], { type: 'application/json' }));
      if (!ok) fetch('/api/traffic', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: data, keepalive: true }).catch(() => {});
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const utmSource = (params.get('utm_source') || params.get('source') || params.get('ref') || '').toLowerCase();
    const referrer = document.referrer ? document.referrer.toLowerCase() : '';

    try {
      const last = sessionStorage.getItem(SESSION_KEY);
      const now = Date.now();
      if (last && now - parseInt(last, 10) < SESSION_GAP_MS) return;
      sessionStorage.setItem(SESSION_KEY, String(now));
    } catch {
      // 저장소를 못 쓰면 매번 기록 (드물게 중복될 수 있음)
    }

    const channel = detectChannel(params, utmSource, referrer);
    try {
      sessionStorage.setItem(CHANNEL_KEY, JSON.stringify(channel));
    } catch {
      // 무시
    }

    fetch('/api/traffic', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        channelKey: channel.key,
        channelName: channel.name,
        sourceUrl: window.location.href,
        utmSource: utmSource || undefined,
        utmMedium: params.get('utm_medium') || undefined,
        utmCampaign: params.get('utm_campaign') || undefined,
        referrer: referrer || undefined,
        visitorId: getVisitorId(),
      }),
      keepalive: true,
    }).catch(() => {
      // 오프라인이거나 실패해도 사용자 화면에는 영향 없음
    });
  }, []);

  return null;
}
