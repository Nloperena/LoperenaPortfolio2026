import type { APIRoute } from 'astro';
import {
  createSessionToken,
  isOpsConfigured,
  setOpsSession,
  verifyOpsPassword,
} from '../../../lib/opsAuth';

export const prerender = false;

export const POST: APIRoute = async ({ request, cookies }) => {
  const headers = { 'Content-Type': 'application/json' };

  if (!isOpsConfigured()) {
    return new Response(
      JSON.stringify({ ok: false, error: 'Operations access is not configured.' }),
      { status: 503, headers }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return new Response(JSON.stringify({ ok: false, error: 'Invalid JSON body' }), {
      status: 400,
      headers,
    });
  }

  const password = typeof body.password === 'string' ? body.password : '';
  if (!verifyOpsPassword(password)) {
    return new Response(JSON.stringify({ ok: false, error: 'Incorrect password.' }), {
      status: 401,
      headers,
    });
  }

  const token = createSessionToken();
  if (!token) {
    return new Response(JSON.stringify({ ok: false, error: 'Could not create session.' }), {
      status: 500,
      headers,
    });
  }

  setOpsSession(cookies, token);
  return new Response(JSON.stringify({ ok: true }), { status: 200, headers });
};
