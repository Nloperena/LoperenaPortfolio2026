import type { APIRoute } from 'astro';
import { getPool } from '../../../lib/db';
import { isOpsAuthenticated } from '../../../lib/opsAuth';

export const prerender = false;

export const GET: APIRoute = async ({ cookies }) => {
  const headers = { 'Content-Type': 'application/json' };

  if (!isOpsAuthenticated(cookies)) {
    return new Response(JSON.stringify({ ok: false, error: 'Unauthorized' }), {
      status: 401,
      headers,
    });
  }

  const pool = getPool();
  if (!pool) {
    return new Response(
      JSON.stringify({ ok: false, error: 'Database is not configured.' }),
      { status: 503, headers }
    );
  }

  try {
    const result = await pool.query<{
      id: number;
      name: string;
      email: string;
      company: string | null;
      message: string | null;
      created_at: Date;
    }>(
      `SELECT id, name, email, company, message, created_at
       FROM contact_submissions
       ORDER BY created_at DESC
       LIMIT 200`
    );

    return new Response(
      JSON.stringify({
        ok: true,
        submissions: result.rows.map((row) => ({
          ...row,
          created_at: row.created_at.toISOString(),
        })),
      }),
      { status: 200, headers }
    );
  } catch (err) {
    console.error('Ops submissions error:', err);
    return new Response(JSON.stringify({ ok: false, error: 'Failed to load submissions.' }), {
      status: 500,
      headers,
    });
  }
};
