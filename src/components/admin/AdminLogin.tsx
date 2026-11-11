'use client';

import { useState } from 'react';

export default function AdminLogin({ configured }: { configured: boolean }) {
  const [pw, setPw] = useState('');
  const [msg, setMsg] = useState('');
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setMsg('');
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: pw }),
      });
      const json = await res.json().catch(() => ({}));
      if (res.ok && json.success) {
        window.location.reload();
        return;
      }
      setMsg(json.message || '로그인에 실패했습니다.');
    } catch {
      setMsg('네트워크 오류가 발생했습니다.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="min-h-dvh flex items-center justify-center px-4">
      <form onSubmit={submit} className="w-full max-w-sm rounded-2xl border border-white/10 bg-white/[0.04] p-6 space-y-4">
        <div>
          <p className="serif text-2xl gold-text font-bold">KTRS Hub</p>
          <p className="text-sm text-[var(--muted)] mt-1">관리자 로그인</p>
        </div>
        {!configured ? (
          <p className="text-sm text-amber-300">
            서버에 관리자 비밀번호가 설정되어 있지 않습니다. Vercel 환경변수에 <b>ADMIN_PASSWORD</b>(8자 이상)를 추가하고 다시 배포하세요.
          </p>
        ) : (
          <>
            <input
              type="password"
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              placeholder="비밀번호"
              autoComplete="current-password"
              className="w-full rounded-xl bg-black/30 border border-white/15 px-4 py-3 text-sm outline-none focus:border-amber-300"
            />
            {msg && <p className="text-sm text-rose-300">{msg}</p>}
            <button
              type="submit"
              disabled={busy || pw.length === 0}
              className="w-full rounded-xl bg-amber-400 text-black font-bold py-3 text-sm disabled:opacity-50 cursor-pointer"
            >
              {busy ? '확인 중…' : '로그인'}
            </button>
          </>
        )}
      </form>
    </main>
  );
}
