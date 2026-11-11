import { NextRequest, NextResponse } from 'next/server';
import {
  ADMIN_COOKIE,
  ADMIN_SESSION_MS,
  checkAdminPassword,
  isAdminConfigured,
  issueAdminToken,
} from '@/lib/server/adminAuth';
import { clientIp, rateLimit } from '@/lib/server/security';

// POST /api/admin/login : 비밀번호를 서버에서 확인하고 로그인 쿠키를 발급
export async function POST(req: NextRequest) {
  if (!isAdminConfigured()) {
    return NextResponse.json(
      { success: false, message: '서버에 ADMIN_PASSWORD(8자 이상)가 설정되어 있지 않습니다.' },
      { status: 503 }
    );
  }
  if (!rateLimit(`admin-login:${clientIp(req)}`, 10, 10 * 60 * 1000)) {
    return NextResponse.json({ success: false, message: '시도 횟수가 많습니다. 잠시 후 다시 시도해 주세요.' }, { status: 429 });
  }

  const body = await req.json().catch(() => null);
  if (!body || !checkAdminPassword(body.password)) {
    return NextResponse.json({ success: false, message: '비밀번호가 일치하지 않습니다.' }, { status: 401 });
  }

  const res = NextResponse.json({ success: true });
  res.cookies.set(ADMIN_COOKIE, issueAdminToken(), {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: Math.floor(ADMIN_SESSION_MS / 1000),
  });
  return res;
}

// DELETE /api/admin/login : 로그아웃 (쿠키 삭제)
export async function DELETE() {
  const res = NextResponse.json({ success: true });
  res.cookies.set(ADMIN_COOKIE, '', { httpOnly: true, path: '/', maxAge: 0 });
  return res;
}
