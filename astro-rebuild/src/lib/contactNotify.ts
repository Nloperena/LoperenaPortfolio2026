export type ContactPayload = {
  name: string;
  email: string;
  company?: string;
  message?: string;
  roleTitle?: string;
  compBand?: string;
  remotePolicy?: string;
  inquiryType?: string;
};

/** Sends contact form to inbox via Resend when RESEND_API_KEY is set on Vercel. */
export async function sendContactEmail(payload: ContactPayload): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) return false;

  const to = process.env.CONTACT_TO_EMAIL?.trim() || 'nicholasloperena@gmail.com';
  const from =
    process.env.RESEND_FROM?.trim() || 'Portfolio Contact <onboarding@resend.dev>';

  const lines = [
    payload.inquiryType ? `Inquiry: ${payload.inquiryType}` : '',
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    payload.company ? `Company: ${payload.company}` : '',
    payload.roleTitle ? `Role: ${payload.roleTitle}` : '',
    payload.compBand ? `Comp band: ${payload.compBand}` : '',
    payload.remotePolicy ? `Remote policy: ${payload.remotePolicy}` : '',
    payload.message ? `\nMessage:\n${payload.message}` : '',
  ].filter(Boolean);

  const subjectPrefix = payload.inquiryType?.toLowerCase().includes('hiring') ? 'Hiring inquiry' : 'Portfolio inquiry';

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
      subject: `${subjectPrefix} from ${payload.name}`,
      text: lines.join('\n'),
    }),
  });

  if (!res.ok) {
    console.error('Resend error:', res.status, await res.text().catch(() => ''));
    return false;
  }

  return true;
}
