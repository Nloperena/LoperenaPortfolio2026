import type { APIRoute } from 'astro';
import { clearOpsSession } from '../../../lib/opsAuth';

export const prerender = false;

export const POST: APIRoute = async ({ cookies }) => {
  clearOpsSession(cookies);
  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
