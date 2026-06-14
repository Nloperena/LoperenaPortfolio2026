const DEFAULT_NEXRENA_API_URL = 'https://nexrena-api-5dc54effaa9f.herokuapp.com';

type MirrorPayload = {
  name: string;
  email: string;
  company?: string;
  message: string;
  formName?: string;
  pageUrl?: string;
  inquiryType?: string;
};

/** Server-side mirror to nexrena ops (best-effort, non-blocking for the visitor). */
export async function mirrorSubmissionToNexrena(payload: MirrorPayload): Promise<boolean> {
  const apiBase = (process.env.NEXRENA_API_URL || DEFAULT_NEXRENA_API_URL).replace(/\/$/, '');
  try {
    const res = await fetch(`${apiBase}/api/forms/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        siteKey: 'nicoloperena',
        name: payload.name,
        email: payload.email,
        company: payload.company || undefined,
        message: payload.message,
        inquiryType: payload.inquiryType,
        formName: payload.formName ?? 'contact',
        pageUrl: payload.pageUrl,
        formSecret: process.env.NICOLOPERENA_FORM_SECRET,
      }),
    });
    return res.ok;
  } catch (err) {
    console.error('Nexrena form mirror failed:', err);
    return false;
  }
}
