import type { APIRoute } from 'astro';
import { getPool } from '../../lib/db';

const MAX_LENGTH = { name: 255, email: 255, company: 255, message: 5000, roleTitle: 255, compBand: 128, remotePolicy: 255 };

function trim(str: unknown): string {
  return typeof str === 'string' ? str.trim() : '';
}

export const prerender = false;

/** Local/dev fallback when Heroku intake URL is not used. Production form posts to Heroku. */
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
  const roleTitle = trim(body.roleTitle);
  const compBand = trim(body.compBand);
  const remotePolicy = trim(body.remotePolicy);
  const inquiryType = trim(body.inquiryType);

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
  if (
    roleTitle.length > MAX_LENGTH.roleTitle ||
    compBand.length > MAX_LENGTH.compBand ||
    remotePolicy.length > MAX_LENGTH.remotePolicy
  ) {
    return new Response(JSON.stringify({ ok: false, error: 'Field too long' }), { status: 400, headers });
  }

  const hiringDetails = [
    roleTitle ? `Role: ${roleTitle}` : '',
    compBand ? `Comp band: ${compBand}` : '',
    remotePolicy ? `Remote: ${remotePolicy}` : '',
  ]
    .filter(Boolean)
    .join('\n');

  const storedMessage = [inquiryType ? `[${inquiryType}]` : '', hiringDetails, message].filter(Boolean).join('\n\n');

  const pool = getPool();
  if (!pool) {
    return new Response(
      JSON.stringify({
        ok: false,
        error:
          'Contact form is temporarily unavailable. Use the Email me button below, or email nicholasloperena@gmail.com directly.',
      }),
      { status: 503, headers }
    );
  }

  try {
    await pool.query(
      `INSERT INTO contact_submissions (name, email, company, message)
       VALUES ($1, $2, $3, $4)`,
      [name, email, company || null, storedMessage || null]
    );
  } catch (err) {
    console.error('Contact submission DB error:', err);
    return new Response(JSON.stringify({ ok: false, error: 'Failed to save submission.' }), {
      status: 500,
      headers,
    });
  }

  return new Response(
    JSON.stringify({ ok: true, message: "Thank you — I'll be in touch soon." }),
    { status: 201, headers }
  );
};
