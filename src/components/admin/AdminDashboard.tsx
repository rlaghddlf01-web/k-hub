import type { ReactNode } from 'react';
import { LANGS } from '@/lib/langs';
import type { ChannelRow, Count, HubStats } from '@/lib/server/stats';
import AdminActions from './AdminActions';

const TARGET_NAMES: Record<string, string> = {
  market: '🛒 KTRS 마켓',
  tax: '💰 Korea Tax Refund Service',
  telecom: '📱 K-Telecom',
};

function countryLabel(code: string): string {
  if (!/^[A-Z]{2}$/.test(code)) return code;
  const flag = String.fromCodePoint(...[...code].map((c) => 0x1f1e6 + c.charCodeAt(0) - 65));
  let name = code;
  try {
    name = new Intl.DisplayNames(['ko'], { type: 'region' }).of(code) || code;
  } catch {
    // 지원하지 않으면 코드 그대로
  }
  return `${flag} ${name}`;
}

const n = (v: number) => v.toLocaleString('ko-KR');

function Card({ title, note, children }: { title: string; note?: string; children: ReactNode }) {
  return (
    <section className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 sm:p-5">
      <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-white/10 pb-2.5 mb-3">
        <h2 className="text-sm font-bold">{title}</h2>
        {note && <span className="text-[11px] text-[var(--muted)]">{note}</span>}
      </div>
      {children}
    </section>
  );
}

function Empty({ children }: { children: ReactNode }) {
  return <p className="text-xs text-[var(--muted)] py-4 text-center">{children}</p>;
}

function Th({ children, right }: { children: ReactNode; right?: boolean }) {
  return <th className={`py-1.5 px-2 font-semibold text-[var(--muted)] ${right ? 'text-right' : 'text-left'}`}>{children}</th>;
}
function Td({ children, right, strong }: { children: ReactNode; right?: boolean; strong?: boolean }) {
  return <td className={`py-1.5 px-2 ${right ? 'text-right' : ''} ${strong ? 'font-bold' : ''}`}>{children}</td>;
}

function Table({ head, children }: { head: ReactNode; children: ReactNode }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-xs min-w-[420px]">
        <thead>
          <tr className="border-b border-white/10">{head}</tr>
        </thead>
        <tbody className="[&>tr]:border-b [&>tr]:border-white/5 [&>tr:last-child]:border-0">{children}</tbody>
      </table>
    </div>
  );
}

export default function AdminDashboard({ stats }: { stats: HubStats }) {
  const maxDay = Math.max(1, ...stats.days.map((d) => d.count));
  const maxHour = Math.max(1, ...stats.hours);
  const langName = (code: string) => LANGS.find((l) => l.code === code)?.name ?? code;

  return (
    <main className="mx-auto max-w-5xl px-4 py-6 sm:py-8 space-y-4">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="serif text-2xl gold-text font-bold">KTRS Hub 관리자</h1>
          <p className="text-xs text-[var(--muted)] mt-0.5">허브(ktrs-life) 방문만 집계합니다 · 시간은 한국 시간(KST)</p>
        </div>
        <AdminActions />
      </header>

      {!stats.configured && <Empty>Supabase 환경변수가 없어 통계를 불러올 수 없습니다.</Empty>}

      {stats.configured && !stats.migrated && (
        <div className="rounded-xl border border-amber-300/40 bg-amber-300/10 p-3 text-xs text-amber-200">
          국가·서비스 이동 기록 컬럼이 아직 없습니다. Supabase 에서 <b>supabase_migration_traffic_country_events.sql</b> 을 실행하면 그때부터 쌓입니다.
        </div>
      )}
      {stats.truncated && (
        <div className="rounded-xl border border-amber-300/40 bg-amber-300/10 p-3 text-xs text-amber-200">
          기록이 5만 건을 넘어 가장 최근 5만 건까지만 집계했습니다.
        </div>
      )}

      {/* 요약 */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
        {[
          ['오늘 방문', stats.today],
          ['최근 7일', stats.week],
          ['최근 4주', stats.month],
          ['전체 누적', stats.total],
          ['고유 방문자', stats.uniqueVisitors],
        ].map(([label, value]) => (
          <div key={label as string} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
            <p className="text-[11px] text-[var(--muted)]">{label}</p>
            <p className="serif text-3xl gold-text font-bold mt-1">{n(value as number)}</p>
          </div>
        ))}
      </div>

      {/* 일별 / 시간별 */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card title="📅 최근 14일 방문">
          <div className="flex items-end gap-1.5 h-36">
            {stats.days.map((d) => (
              <div key={d.label} className="flex-1 flex flex-col items-center justify-end h-full gap-1">
                <span className="text-[10px] text-[var(--muted)]">{d.count || ''}</span>
                <div
                  className={`w-full rounded-t ${d.isToday ? 'bg-amber-300' : 'bg-indigo-400/70'}`}
                  style={{ height: `${Math.max(3, (d.count / maxDay) * 100)}%` }}
                />
                <span className={`text-[9px] ${d.isToday ? 'text-amber-300 font-bold' : 'text-[var(--muted)]'}`}>{d.label}</span>
              </div>
            ))}
          </div>
        </Card>
        <Card title="🕐 오늘 시간대별 방문" note="0~23시 KST">
          <div className="flex items-end gap-[3px] h-36">
            {stats.hours.map((c, h) => (
              <div key={h} className="flex-1 flex flex-col items-center justify-end h-full gap-1" title={`${h}시 ${c}회`}>
                <div className="w-full rounded-t bg-indigo-400/70" style={{ height: `${Math.max(2, (c / maxHour) * 100)}%` }} />
                {h % 3 === 0 && <span className="text-[9px] text-[var(--muted)]">{h}</span>}
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* 어느 채널로 들어오고, 어느 서비스로 넘어가나 */}
      <Card title="📡 유입 채널 → 서비스 이동" note="방문 수 기준 · 이동 = 마켓/세금환급/텔레콤 링크 클릭">
        {stats.channels.length === 0 ? (
          <Empty>아직 방문 기록이 없습니다.</Empty>
        ) : (
          <Table
            head={
              <>
                <Th>채널</Th>
                <Th right>오늘</Th>
                <Th right>7일</Th>
                <Th right>방문</Th>
                <Th right>이동 클릭</Th>
                <Th right>이동한 사람</Th>
              </>
            }
          >
            {stats.channels.map((c: ChannelRow) => (
              <tr key={c.key}>
                <Td strong>{c.key}</Td>
                <Td right>{n(c.today)}</Td>
                <Td right>{n(c.week)}</Td>
                <Td right strong>{n(c.total)}</Td>
                <Td right>{n(c.exits)}</Td>
                <Td right>{n(c.exitVisitors)}</Td>
              </tr>
            ))}
          </Table>
        )}
      </Card>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card title="🚪 어느 서비스로 넘어갔나" note={`이동 클릭 ${n(stats.exits.total)}회 (오늘 ${n(stats.exits.today)} · 7일 ${n(stats.exits.week)})`}>
          {stats.exits.byTarget.length === 0 ? (
            <Empty>아직 서비스 이동 기록이 없습니다.</Empty>
          ) : (
            <Table head={<><Th>서비스</Th><Th right>클릭</Th></>}>
              {stats.exits.byTarget.map((t) => (
                <tr key={t.key}>
                  <Td strong>{TARGET_NAMES[t.key] ?? t.key}</Td>
                  <Td right strong>{n(t.count)}</Td>
                </tr>
              ))}
            </Table>
          )}
        </Card>

        <Card title="🌐 허브 언어별 방문" note="방문 주소의 언어 기준">
          {stats.languages.length === 0 ? (
            <Empty>아직 방문 기록이 없습니다.</Empty>
          ) : (
            <Table head={<><Th>언어</Th><Th right>7일</Th><Th right>전체</Th></>}>
              {stats.languages.map((l: Count) => (
                <tr key={l.key}>
                  <Td strong>{langName(l.key)}</Td>
                  <Td right>{n(l.week)}</Td>
                  <Td right strong>{n(l.total)}</Td>
                </tr>
              ))}
            </Table>
          )}
        </Card>
      </div>

      <Card
        title="🌏 국가별 방문"
        note={stats.unknownCountry > 0 ? `국가 기록 없음 ${n(stats.unknownCountry)}회 (이전 방문 등)` : undefined}
      >
        {stats.countries.length === 0 ? (
          <Empty>아직 국가가 기록된 방문이 없습니다.</Empty>
        ) : (
          <Table head={<><Th>국가</Th><Th right>오늘</Th><Th right>7일</Th><Th right>전체</Th><Th right>고유방문자</Th></>}>
            {stats.countries.slice(0, 40).map((c) => (
              <tr key={c.key}>
                <Td strong>{countryLabel(c.key)}</Td>
                <Td right>{n(c.today)}</Td>
                <Td right>{n(c.week)}</Td>
                <Td right strong>{n(c.total)}</Td>
                <Td right>{n(c.visitors)}</Td>
              </tr>
            ))}
          </Table>
        )}
      </Card>

      <Card title="📣 광고(캠페인)별 유입" note={`태그 있음 ${n(stats.total - stats.untagged)} / 태그 없음 ${n(stats.untagged)}`}>
        {stats.campaigns.length === 0 ? (
          <Empty>
            광고 태그가 붙은 방문이 없습니다. 광고 링크 끝에 <span className="font-mono">?utm_source=youtube&amp;utm_medium=post&amp;utm_campaign=이름</span> 을 붙이세요.
          </Empty>
        ) : (
          <Table head={<><Th>캠페인</Th><Th>소스 / 매체</Th><Th right>오늘</Th><Th right>7일</Th><Th right>전체</Th><Th right>고유방문자</Th></>}>
            {stats.campaigns.slice(0, 50).map((c) => (
              <tr key={`${c.source}|${c.medium}|${c.campaign}`}>
                <Td strong>{c.campaign || '(캠페인 없음)'}</Td>
                <Td>{c.source || '-'} / {c.medium || '-'}</Td>
                <Td right>{n(c.today)}</Td>
                <Td right>{n(c.week)}</Td>
                <Td right strong>{n(c.total)}</Td>
                <Td right>{n(c.visitors)}</Td>
              </tr>
            ))}
          </Table>
        )}
      </Card>
    </main>
  );
}
