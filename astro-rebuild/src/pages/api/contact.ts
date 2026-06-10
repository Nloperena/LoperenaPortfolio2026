import type { APIRoute } from 'astro';
import { getPool } from '../../lib/db';
import { sendContactEmail } from '../../lib/contactNotify';

const MAX_LENGTH = { name: 255, email: 255, company: 255, message: 5000 };

function trim(str: unknown): string {
  return typeof str === 'string' ? str.trim() : '';
}

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const headers = { 'Content-Type': 'application/json' };

  if (request.headers.get('Content-Type')?.includes('application/json') !== true) {
    return new Response(
      JSON.stringify({ ok: false, error: 'Content-Type must be application/json' }),
      { status: 400, headers }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return new Response(
      JSON.stringify({ ok: false, error: 'Invalid JSON body' }),
      { status: 400, headers }
    );
  }

  const name = trim(body.name);
  const email = trim(body.email);
  const company = trim(body.company);
  const message = trim(body.message);

  if (!name || !email) {
    return new Response(
      JSON.stringify({ ok: false, error: 'Name and email are required' }),
      { status: 400, headers }
    );
  }

  if (name.length > MAX_LENGTH.name || email.length > MAX_LENGTH.email) {
    return new Response(
      JSON.stringify({ ok: false, error: 'Name or email too long' }),
      { status: 400, headers }
    );
  }
  if (company.length > MAX_LENGTH.company || message.length > MAX_LENGTH.message) {
    return new Response(
      JSON.stringify({ ok: false, error: 'Company or message too long' }),
      { status: 400, headers }
    );
  }

  const payload = {
    name,
    email,
    company: company || undefined,
    message: message || undefined,
  };

  let savedToDb = false;
  const pool = getPool();
  if (pool) {
    try {
      await pool.query(
        `INSERT INTO contact_submissions (name, email, company, message)
         VALUES ($1, $2, $3, $4)`,
        [name, email, company || null, message || null]
      );
      savedToDb = true;
    } catch (err) {
      console.error('Contact submission DB error:', err);
    }
  }

  const emailed = await sendContactEmail(payload);

  if (!savedToDb && !emailed) {
    return new Response(
      JSON.stringify({
        ok: false,
        error:
          'Contact form is temporarily unavailable. Use the Email me button below, or email nicholasloperena@gmail.com directly.',
      }),
      { status: 503, headers }
    );
  }

  return new Response(
    JSON.stringify({ ok: true, message: "Thank you — I'll be in touch soon." }),
    { status: 201, headers }
  );
};
