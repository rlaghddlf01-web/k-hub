'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function AdminActions() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  return (
    <div className="flex gap-2">
      <button
        type="button"
        onClick={() => router.refresh()}
        className="rounded-lg border border-white/15 px-3 py-1.5 text-xs font-bold hover:bg-white/10 cursor-pointer"
      >
        새로고침
      </button>
      <button
        type="button"
        disabled={busy}
        onClick={async () => {
          setBusy(true);
          await fetch('/api/admin/login', { method: 'DELETE' }).catch(() => {});
          window.location.reload();
        }}
        className="rounded-lg border border-white/15 px-3 py-1.5 text-xs font-bold hover:bg-white/10 cursor-pointer"
      >
        로그아웃
      </button>
    </div>
  );
}
