export type ContactPayload = {
  name: string;
  email: string;
  company?: string;
  message?: string;
};

/** Sends contact form to inbox via Resend when RESEND_API_KEY is set on Vercel. */
export async function sendContactEmail(payload: ContactPayload): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) return false;

  const to = process.env.CONTACT_TO_EMAIL?.trim() || 'nicholasloperena@gmail.com';
  const from =
    process.env.RESEND_FROM?.trim() || 'Portfolio Contact <onboarding@resend.dev>';

  const lines = [
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    payload.company ? `Company: ${payload.company}` : '',
    payload.message ? `\nProject scope:\n${payload.message}` : '',
  ].filter(Boolean);

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: payload.email,
      subject: `Portfolio inquiry from ${payload.name}`,
      text: lines.join('\n'),
    }),
  });

  if (!res.ok) {
    console.error('Resend error:', res.status, await res.text().catch(() => ''));
    return false;
  }

  return true;
}
