// 관리자 확인 (서버 전용). 비밀번호는 환경변수 ADMIN_PASSWORD 로만 정한다 (코드에 기본값 없음).
// 로그인 쿠키 서명 키는 ADMIN_SESSION_SECRET, 없으면 ADMIN_PASSWORD 를 쓴다.
import { cookies } from 'next/headers';
import type { NextRequest } from 'next/server';
import { safeEqual, signToken, verifyToken } from '@/lib/server/security';

export const ADMIN_COOKIE = 'hub_admin';
export const ADMIN_SESSION_MS = 12 * 60 * 60 * 1000;

type Session = { role: string; exp: number };

function password(): string | null {
  const p = process.env.ADMIN_PASSWORD;
  return p && p.length >= 8 ? p : null;
}

function secret(): string {
  return process.env.ADMIN_SESSION_SECRET || password() || '';
}

/** 관리자 비밀번호가 서버에 설정돼 있는지 (없으면 로그인 자체를 막는다) */
export function isAdminConfigured(): boolean {
  return password() !== null;
}

export function checkAdminPassword(input: unknown): boolean {
  const expected = password();
  if (!expected || typeof input !== 'string') return false;
  return safeEqual(input, expected);
}

export function issueAdminToken(): string {
  return signToken({ role: 'admin', exp: Date.now() + ADMIN_SESSION_MS } satisfies Session, secret());
}

function validSession(token: string | undefined): boolean {
  if (!isAdminConfigured()) return false;
  const payload = verifyToken<Session>(token, secret());
  return !!payload && payload.role === 'admin' && payload.exp > Date.now();
}

/** 서버 컴포넌트에서: 지금 요청이 로그인된 관리자인지 */
export async function isAdminSession(): Promise<boolean> {
  return validSession((await cookies()).get(ADMIN_COOKIE)?.value);
}

/** API 라우트에서 */
export function isAdminRequest(req: NextRequest): boolean {
  return validSession(req.cookies.get(ADMIN_COOKIE)?.value);
}
