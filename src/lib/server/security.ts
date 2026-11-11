// 서버 전용 유틸 (브라우저 번들에 포함되면 안 됩니다)

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
