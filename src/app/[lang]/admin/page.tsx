import type { Metadata } from 'next';
import AdminDashboard from '@/components/admin/AdminDashboard';
import AdminLogin from '@/components/admin/AdminLogin';
import { isAdminConfigured, isAdminSession } from '@/lib/server/adminAuth';
import { loadHubStats, parsePeriod } from '@/lib/server/stats';

// 로그인 상태와 최신 통계가 필요하므로 매 요청마다 서버에서 만든다
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'KTRS Hub 관리자',
  robots: { index: false, follow: false },
};

export default async function AdminPage({ searchParams }: { searchParams: Promise<{ p?: string }> }) {
  if (!(await isAdminSession())) return <AdminLogin configured={isAdminConfigured()} />;
  const period = parsePeriod((await searchParams).p);
  return <AdminDashboard stats={await loadHubStats(period)} />;
}
