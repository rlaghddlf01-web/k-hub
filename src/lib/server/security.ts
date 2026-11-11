// 서버 전용 유틸 (브라우저 번들에 포함되면 안 됩니다)
import { createHmac, timingSafeEqual } from 'node:crypto';

/** 길이가 달라도 안전하게 같은 문자열인지 비교 (타이밍 공격 방지) */
export function safeEqual(a: string, b: string): boolean {
  const ha = createHmac('sha256', 'hub-compare').update(a).digest();
  const hb = createHmac('sha256', 'hub-compare').update(b).digest();
  return timingSafeEqual(ha, hb);
}

/** 서명된 토큰 발급: base64url(payload).서명 */
export function signToken(payload: object, secret: string): string {
  const body = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const sig = createHmac('sha256', secret).update(body).digest('base64url');
  return `${body}.${sig}`;
}

/** 서명이 맞으면 payload 를, 아니면 null 을 돌려준다 (만료 시각 확인은 호출한 쪽에서) */
export function verifyToken<T>(token: string | undefined, secret: string): T | null {
  if (!token) return null;
  const [body, sig] = token.split('.');
  if (!body || !sig) return null;
  const expected = createHmac('sha256', secret).update(body).digest('base64url');
  if (!safeEqual(sig, expected)) return null;
  try {
    return JSON.parse(Buffer.from(body, 'base64url').toString('utf8')) as T;
  } catch {
    return null;
  }
}

// 요청 횟수 제한 (서버 메모리 방식)
// 한계: 서버리스에서는 인스턴스마다 따로 세므로 완벽하지 않습니다.
const buckets = new Map<string, number[]>();

/** true = 허용, false = 제한 초과 */
export function rateLimit(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const recent = (buckets.get(key) ?? []).filter((t) => now - t < windowMs);
  if (recent.length >= limit) {
    buckets.set(key, recent);
    return false;
  }
  recent.push(now);
  buckets.set(key, recent);
  if (buckets.size > 5000) {
    for (const [k, v] of buckets) {
      if (v.every((t) => now - t >= windowMs)) buckets.delete(k);
    }
  }
  return true;
}

export function clientIp(req: Request): string {
  const forwarded = req.headers.get('x-forwarded-for');
  return (forwarded?.split(',')[0] || req.headers.get('x-real-ip') || 'unknown').trim();
}
