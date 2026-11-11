// 허브 방문 통계 집계 (서버 전용). 마켓·세금환급·텔레콤과 같은 Supabase 테이블(kmarket_traffic_logs)에서 허브 방문만 골라 읽는다.
// 기간(일/주/월/년)을 고르면 그 기간의 방문만으로 모든 표를 다시 집계한다. 시간은 모두 한국 시간(KST).
import { getSupabaseAdmin, isSupabaseConfigured } from '@/lib/server/supabaseAdmin';
import { BRAND } from '@/lib/brand';
import { isLang, DEFAULT_LANG } from '@/lib/langs';

export type Period = 'day' | 'week' | 'month' | 'year';
export const PERIODS: { id: Period; label: string; desc: string }[] = [
  { id: 'day', label: '일', desc: '오늘 (시간대별)' },
  { id: 'week', label: '주', desc: '최근 7일' },
  { id: 'month', label: '월', desc: '최근 30일' },
  { id: 'year', label: '년', desc: '최근 12개월' },
];
export function parsePeriod(v: unknown): Period {
  return v === 'day' || v === 'week' || v === 'month' || v === 'year' ? v : 'week';
}

interface Row {
  channel_key: string;
  channel_name?: string | null;
  created_at: string;
  source_url?: string | null;
  utm_source?: string | null;
  utm_medium?: string | null;
  utm_campaign?: string | null;
  visitor_id?: string | null;
  country?: string | null;
  event?: string | null;
  target?: string | null;
}

export interface Count {
  key: string;
  total: number;
  visitors: number;
}

export interface ChannelRow extends Count {
  exits: number;
  exitVisitors: number;
}

export interface CampaignRow extends Count {
  source: string;
  medium: string;
  campaign: string;
}

export interface HubStats {
  period: Period;
  configured: boolean;
  migrated: boolean; // country/event/target 컬럼이 있는지
  truncated: boolean; // 읽는 한도(5만 건)에 걸렸는지
  total: number;
  uniqueVisitors: number;
  buckets: { label: string; count: number; isCurrent: boolean }[];
  channels: ChannelRow[];
  countries: Count[];
  unknownCountry: number;
  languages: Count[];
  campaigns: CampaignRow[];
  untagged: number;
  exits: { total: number; visitors: number; byTarget: { key: string; count: number }[] };
}

const KST = 9 * 3600000;

/** KST 기준 "오늘 0시 − offsetDays" 의 실제(UTC) 시각(ms) */
function kstMidnight(offsetDays: number): number {
  const k = new Date(Date.now() + KST);
  return Date.UTC(k.getUTCFullYear(), k.getUTCMonth(), k.getUTCDate() - offsetDays) - KST;
}

/** KST 기준 "이번 달 1일 0시 − offsetMonths" 의 실제(UTC) 시각(ms) */
function kstMonthStart(offsetMonths: number): number {
  const k = new Date(Date.now() + KST);
  return Date.UTC(k.getUTCFullYear(), k.getUTCMonth() - offsetMonths, 1) - KST;
}

const kstIso = (t: string | number) => new Date(new Date(t).getTime() + KST).toISOString(); // 'YYYY-MM-DDTHH:...' (KST 값)

function emptyStats(period: Period, configured: boolean): HubStats {
  return {
    period, configured, migrated: false, truncated: false, total: 0, uniqueVisitors: 0, buckets: [],
    channels: [], countries: [], unknownCountry: 0, languages: [], campaigns: [], untagged: 0,
    exits: { total: 0, visitors: 0, byTarget: [] },
  };
}

/** 허브 주소(ktrs-life / ktrs-hub 와 NEXT_PUBLIC_HUB_URL 의 도메인)에서 온 방문인지 */
function hubHosts(): string[] {
  const hosts = new Set(['ktrs-life.vercel.app', 'ktrs-hub.vercel.app']);
  try {
    hosts.add(new URL(BRAND.url).hostname);
  } catch {
    // 주소가 올바르지 않으면 기본 두 개만 사용
  }
  return [...hosts];
}

type Acc = { total: number; v: Set<string> };
function bump(map: Map<string, Acc>, key: string, vid?: string | null) {
  const c = map.get(key) ?? { total: 0, v: new Set<string>() };
  c.total++;
  if (vid) c.v.add(vid);
  map.set(key, c);
}
const toCounts = (map: Map<string, Acc>): Count[] =>
  [...map.entries()].map(([key, c]) => ({ key, total: c.total, visitors: c.v.size })).sort((a, b) => b.total - a.total);

/** 기간에 맞는 막대 그래프 칸(라벨·키)과 읽기 시작 시각 */
function planPeriod(period: Period) {
  const slots: { key: string; label: string }[] = [];
  let startMs: number;
  let keyOf: (iso: string) => string;
  let currentKey: string;

  if (period === 'day') {
    startMs = kstMidnight(0);
    for (let h = 0; h < 24; h++) slots.push({ key: String(h).padStart(2, '0'), label: `${h}시` });
    keyOf = (iso) => iso.slice(11, 13);
    currentKey = kstIso(Date.now()).slice(11, 13);
  } else if (period === 'year') {
    startMs = kstMonthStart(11);
    for (let i = 11; i >= 0; i--) {
      const key = kstIso(kstMonthStart(i)).slice(0, 7);
      slots.push({ key, label: `${+key.slice(5)}월` });
    }
    keyOf = (iso) => iso.slice(0, 7);
    currentKey = kstIso(Date.now()).slice(0, 7);
  } else {
    const days = period === 'week' ? 7 : 30;
    startMs = kstMidnight(days - 1);
    for (let i = days - 1; i >= 0; i--) {
      const key = kstIso(kstMidnight(i)).slice(0, 10);
      slots.push({ key, label: `${+key.slice(5, 7)}/${+key.slice(8)}` });
    }
    keyOf = (iso) => iso.slice(0, 10);
    currentKey = kstIso(Date.now()).slice(0, 10);
  }
  return { slots, startMs, keyOf, currentKey };
}

export async function loadHubStats(period: Period): Promise<HubStats> {
  if (!isSupabaseConfigured()) return emptyStats(period, false);
  const db = getSupabaseAdmin();
  const { slots, startMs, keyOf, currentKey } = planPeriod(period);

  const base = 'channel_key, channel_name, created_at, source_url, utm_source, utm_medium, utm_campaign';
  const SETS = [`${base}, visitor_id, country, event, target`, `${base}, visitor_id`, base];
  const hostFilter = hubHosts().map((h) => `source_url.ilike.%${h}%`).join(',');
  const startIso = new Date(startMs).toISOString();

  const PAGE = 1000;
  const MAX = 50000;
  let setIdx = 0;
  const rows: Row[] = [];
  let truncated = false;

  for (let from = 0; from < MAX; from += PAGE) {
    const { data, error } = await db
      .from('kmarket_traffic_logs')
      .select(SETS[setIdx])
      .or(hostFilter)
      .gte('created_at', startIso)
      .order('created_at', { ascending: false })
      .range(from, from + PAGE - 1);
    if (error) {
      if (setIdx < SETS.length - 1 && /visitor_id|country|event|target|column/i.test(error.message || '')) {
        setIdx++;
        rows.length = 0;
        from = -PAGE;
        continue;
      }
      console.warn('hub stats failed:', error.message);
      return emptyStats(period, true);
    }
    rows.push(...(data as unknown as Row[]));
    if (data.length < PAGE) break;
    if (from + PAGE >= MAX) truncated = true;
  }

  const stats = emptyStats(period, true);
  stats.migrated = setIdx === 0;
  stats.truncated = truncated;

  const bucketCount = new Map(slots.map((s) => [s.key, 0]));
  const all = new Set<string>();
  const ch = new Map<string, Acc>();
  const chName = new Map<string, string>();
  const chExit = new Map<string, { n: number; v: Set<string> }>();
  const cc = new Map<string, Acc>();
  const lg = new Map<string, Acc>();
  const cp = new Map<string, Acc & { source: string; medium: string; campaign: string }>();
  const tg = new Map<string, number>();
  const exitVisitors = new Set<string>();

  for (const r of rows) {
    if (r.event === 'exit') {
      stats.exits.total++;
      if (r.visitor_id) exitVisitors.add(r.visitor_id);
      tg.set(r.target || 'unknown', (tg.get(r.target || 'unknown') ?? 0) + 1);
      const e = chExit.get(r.channel_key) ?? { n: 0, v: new Set<string>() };
      e.n++;
      if (r.visitor_id) e.v.add(r.visitor_id);
      chExit.set(r.channel_key, e);
      continue;
    }

    stats.total++;
    if (r.visitor_id) all.add(r.visitor_id);
    const k = keyOf(kstIso(r.created_at));
    if (bucketCount.has(k)) bucketCount.set(k, (bucketCount.get(k) ?? 0) + 1);

    bump(ch, r.channel_key, r.visitor_id);
    if (r.channel_name && !chName.has(r.channel_key)) chName.set(r.channel_key, r.channel_name);

    const country = (r.country || '').trim().toUpperCase();
    if (country) bump(cc, country, r.visitor_id);
    else stats.unknownCountry++;

    // 허브 언어: 방문 주소의 첫 경로 (/vi → vi, / → ko)
    try {
      const first = new URL(r.source_url || '').pathname.split('/')[1];
      bump(lg, isLang(first) ? first : DEFAULT_LANG, r.visitor_id);
    } catch {
      // 주소를 해석할 수 없으면 언어 집계에서 제외
    }

    const src = (r.utm_source || '').trim();
    const med = (r.utm_medium || '').trim();
    const cmp = (r.utm_campaign || '').trim();
    if (src || med || cmp) {
      const key = `${src.toLowerCase()}|${med.toLowerCase()}|${cmp.toLowerCase()}`;
      const c = cp.get(key) ?? { total: 0, v: new Set<string>(), source: src, medium: med, campaign: cmp };
      c.total++;
      if (r.visitor_id) c.v.add(r.visitor_id);
      cp.set(key, c);
    } else {
      stats.untagged++;
    }
  }

  stats.uniqueVisitors = all.size;
  stats.exits.visitors = exitVisitors.size;
  stats.buckets = slots.map((s) => ({ label: s.label, count: bucketCount.get(s.key) ?? 0, isCurrent: s.key === currentKey }));
  // 채널은 저장해 둔 한국어 이름으로 보여준다 (없으면 키)
  stats.channels = toCounts(ch).map((c) => ({
    ...c,
    key: chName.get(c.key) ?? c.key,
    exits: chExit.get(c.key)?.n ?? 0,
    exitVisitors: chExit.get(c.key)?.v.size ?? 0,
  }));
  stats.countries = toCounts(cc);
  stats.languages = toCounts(lg);
  stats.campaigns = [...cp.values()]
    .map((c) => ({ key: c.campaign, source: c.source, medium: c.medium, campaign: c.campaign, total: c.total, visitors: c.v.size }))
    .sort((a, b) => b.total - a.total);
  stats.exits.byTarget = [...tg.entries()].map(([key, count]) => ({ key, count })).sort((a, b) => b.count - a.count);
  return stats;
}
