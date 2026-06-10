import { createHmac, timingSafeEqual } from 'node:crypto';
import type { AstroCookies } from 'astro';

export const OPS_COOKIE = 'ops_session';
const SESSION_TTL_SEC = 7 * 24 * 60 * 60;

function getPassword(): string | null {
  return process.env.OPS_PASSWORD?.trim() || null;
}

function getSecret(): string | null {
  return process.env.OPS_SESSION_SECRET?.trim() || getPassword();
}

export function isOpsConfigured(): boolean {
  return Boolean(getPassword());
}

export function verifyOpsPassword(input: string): boolean {
  const expected = getPassword();
  if (!expected) return false;

  const provided = Buffer.from(input);
  const target = Buffer.from(expected);
  if (provided.length !== target.length) return false;

  return timingSafeEqual(provided, target);
}

export function createSessionToken(): string | null {
  const secret = getSecret();
  if (!secret) return null;

  const exp = Date.now() + SESSION_TTL_SEC * 1000;
  const payload = String(exp);
  const sig = createHmac('sha256', secret).update(payload).digest('base64url');
  return `${payload}.${sig}`;
}

export function verifySessionToken(token: string | undefined): boolean {
  if (!token) return false;

  const secret = getSecret();
  if (!secret) return false;

  const [payload, sig] = token.split('.');
  if (!payload || !sig) return false;

  const exp = Number(payload);
  if (!Number.isFinite(exp) || exp < Date.now()) return false;

  const expected = createHmac('sha256', secret).update(payload).digest('base64url');
  try {
    return timingSafeEqual(Buffer.from(sig), Buffer.from(expected));
  } catch {
    return false;
  }
}

export function isOpsAuthenticated(cookies: AstroCookies): boolean {
  return verifySessionToken(cookies.get(OPS_COOKIE)?.value);
}

export function setOpsSession(cookies: AstroCookies, token: string): void {
  cookies.set(OPS_COOKIE, token, {
    httpOnly: true,
    secure: import.meta.env.PROD,
    sameSite: 'strict',
    path: '/',
    maxAge: SESSION_TTL_SEC,
  });
}

export function clearOpsSession(cookies: AstroCookies): void {
  cookies.delete(OPS_COOKIE, { path: '/' });
}
