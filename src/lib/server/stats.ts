// 허브 방문 통계 집계 (서버 전용). 마켓·세금환급·텔레콤과 같은 Supabase 테이블(kmarket_traffic_logs)에서 허브 방문만 골라 읽는다.
import { getSupabaseAdmin, isSupabaseConfigured } from '@/lib/server/supabaseAdmin';
import { BRAND } from '@/lib/brand';
import { isLang, DEFAULT_LANG } from '@/lib/langs';

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
  today: number;
  week: number;
  visitors: number;
}

export interface ChannelRow extends Count {
  exits: number;
  exitVisitors: number;
}

export interface HubStats {
  configured: boolean;
  migrated: boolean; // country/event/target 컬럼이 있는지
  truncated: boolean; // 읽는 한도(5만 건)에 걸렸는지
  total: number;
  today: number;
  week: number;
  month: number;
  uniqueVisitors: number;
  days: { label: string; count: number; isToday: boolean }[];
  hours: number[];
  channels: ChannelRow[];
  countries: Count[];
  unknownCountry: number;
  languages: Count[];
  campaigns: (Count & { source: string; medium: string; campaign: string })[];
  untagged: number;
  exits: { total: number; today: number; week: number; byTarget: { key: string; count: number }[] };
}

const KST = 9 * 3600000;
const kstDay = (d: Date | string) => new Date(new Date(d).getTime() + KST).toISOString().slice(0, 10);

function emptyStats(configured: boolean): HubStats {
  return {
    configured, migrated: false, truncated: false, total: 0, today: 0, week: 0, month: 0, uniqueVisitors: 0,
    days: [], hours: Array(24).fill(0), channels: [], countries: [], unknownCountry: 0, languages: [], campaigns: [],
    untagged: 0, exits: { total: 0, today: 0, week: 0, byTarget: [] },
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

function bump(map: Map<string, { total: number; today: number; week: number; v: Set<string> }>, key: string, today: boolean, week: boolean, vid?: string | null) {
  const c = map.get(key) ?? { total: 0, today: 0, week: 0, v: new Set<string>() };
  c.total++;
  if (today) c.today++;
  if (week) c.week++;
  if (vid) c.v.add(vid);
  map.set(key, c);
}

const toCounts = (map: Map<string, { total: number; today: number; week: number; v: Set<string> }>): Count[] =>
  [...map.entries()]
    .map(([key, c]) => ({ key, total: c.total, today: c.today, week: c.week, visitors: c.v.size }))
    .sort((a, b) => b.total - a.total);

export async function loadHubStats(): Promise<HubStats> {
  if (!isSupabaseConfigured()) return emptyStats(false);
  const db = getSupabaseAdmin();

  const base = 'channel_key, channel_name, created_at, source_url, utm_source, utm_medium, utm_campaign';
  const SETS = [`${base}, visitor_id, country, event, target`, `${base}, visitor_id`, base];
  const hostFilter = hubHosts().map((h) => `source_url.ilike.%${h}%`).join(',');

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
      return emptyStats(true);
    }
    rows.push(...(data as unknown as Row[]));
    if (data.length < PAGE) break;
    if (from + PAGE >= MAX) truncated = true;
  }

  const stats = emptyStats(true);
  stats.migrated = setIdx === 0;
  stats.truncated = truncated;

  const now = Date.now();
  const todayStr = kstDay(new Date());
  const dayList: string[] = [];
  for (let i = 13; i >= 0; i--) dayList.push(kstDay(new Date(now - i * 86400000)));
  const weekSet = new Set(dayList.slice(-7));
  const dayCount = new Map(dayList.map((d) => [d, 0]));

  const all = new Set<string>();
  const ch = new Map<string, { total: number; today: number; week: number; v: Set<string> }>();
  const chName = new Map<string, string>();
  const chExit = new Map<string, { n: number; v: Set<string> }>();
  const cc = new Map<string, { total: number; today: number; week: number; v: Set<string> }>();
  const lg = new Map<string, { total: number; today: number; week: number; v: Set<string> }>();
  const cp = new Map<string, { total: number; today: number; week: number; v: Set<string>; source: string; medium: string; campaign: string }>();
  const tg = new Map<string, number>();

  for (const r of rows) {
    const day = kstDay(r.created_at);
    const isToday = day === todayStr;
    const isWeek = weekSet.has(day);

    if (r.event === 'exit') {
      stats.exits.total++;
      if (isToday) stats.exits.today++;
      if (isWeek) stats.exits.week++;
      tg.set(r.target || 'unknown', (tg.get(r.target || 'unknown') ?? 0) + 1);
      const e = chExit.get(r.channel_key) ?? { n: 0, v: new Set<string>() };
      e.n++;
      if (r.visitor_id) e.v.add(r.visitor_id);
      chExit.set(r.channel_key, e);
      continue;
    }

    stats.total++;
    if (r.visitor_id) all.add(r.visitor_id);
    if (isToday) {
      stats.today++;
      const h = new Date(new Date(r.created_at).getTime() + KST).getUTCHours();
      stats.hours[h]++;
    }
    if (isWeek) stats.week++;
    if (dayCount.has(day)) dayCount.set(day, (dayCount.get(day) ?? 0) + 1);
    if (now - new Date(r.created_at).getTime() < 28 * 86400000) stats.month++;

    bump(ch, r.channel_key, isToday, isWeek, r.visitor_id);
    if (r.channel_name && !chName.has(r.channel_key)) chName.set(r.channel_key, r.channel_name);

    const country = (r.country || '').trim().toUpperCase();
    if (country) bump(cc, country, isToday, isWeek, r.visitor_id);
    else stats.unknownCountry++;

    // 허브 언어: 방문 주소의 첫 경로 (/vi → vi, / → ko)
    try {
      const first = new URL(r.source_url || '').pathname.split('/')[1];
      bump(lg, isLang(first) ? first : DEFAULT_LANG, isToday, isWeek, r.visitor_id);
    } catch {
      // 주소를 해석할 수 없으면 언어 집계에서 제외
    }

    const src = (r.utm_source || '').trim();
    const med = (r.utm_medium || '').trim();
    const cmp = (r.utm_campaign || '').trim();
    if (src || med || cmp) {
      const k = `${src.toLowerCase()}|${med.toLowerCase()}|${cmp.toLowerCase()}`;
      const c = cp.get(k) ?? { total: 0, today: 0, week: 0, v: new Set<string>(), source: src, medium: med, campaign: cmp };
      c.total++;
      if (isToday) c.today++;
      if (isWeek) c.week++;
      if (r.visitor_id) c.v.add(r.visitor_id);
      cp.set(k, c);
    } else {
      stats.untagged++;
    }
  }

  stats.uniqueVisitors = all.size;
  stats.days = dayList.map((d) => ({ label: d === todayStr ? '오늘' : `${+d.slice(5, 7)}/${+d.slice(8)}`, count: dayCount.get(d) ?? 0, isToday: d === todayStr }));
  stats.channels = toCounts(ch).map((c) => ({
    ...c,
    key: c.key,
    exits: chExit.get(c.key)?.n ?? 0,
    exitVisitors: chExit.get(c.key)?.v.size ?? 0,
  }));
  // 채널 이름은 화면에서 쓰도록 key 대신 저장해 둔 이름을 돌려준다
  stats.channels = stats.channels.map((c) => ({ ...c, key: chName.get(c.key) ?? c.key }));
  stats.countries = toCounts(cc);
  stats.languages = toCounts(lg);
  stats.campaigns = [...cp.values()]
    .map((c) => ({ key: c.campaign, source: c.source, medium: c.medium, campaign: c.campaign, total: c.total, today: c.today, week: c.week, visitors: c.v.size }))
    .sort((a, b) => b.total - a.total);
  stats.exits.byTarget = [...tg.entries()].map(([key, count]) => ({ key, count })).sort((a, b) => b.count - a.count);
  return stats;
}
