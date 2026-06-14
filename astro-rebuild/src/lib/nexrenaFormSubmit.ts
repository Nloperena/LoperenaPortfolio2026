const DEFAULT_NEXRENA_FORM_API_URL =
  'https://nexrena-api-5dc54effaa9f.herokuapp.com/api/forms/submit';

export function nexrenaFormApiUrl(): string {
  return (
    (import.meta.env.PUBLIC_NEXRENA_FORM_API_URL as string | undefined)?.trim() ||
    DEFAULT_NEXRENA_FORM_API_URL
  );
}

export type NexrenaIntakePayload = {
  name: string;
  email: string;
  company?: string;
  message: string;
  inquiryType: 'hiring' | 'project';
  pageUrl?: string;
};

export async function submitToNexrenaForms(payload: NexrenaIntakePayload): Promise<void> {
  const res = await fetch(nexrenaFormApiUrl(), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      siteKey: 'nicoloperena',
      name: payload.name,
      email: payload.email,
      company: payload.company || undefined,
      message: payload.message,
      inquiryType: payload.inquiryType,
      formName: 'intake',
      pageUrl: payload.pageUrl,
      formSecret: import.meta.env.PUBLIC_NICOLOPERENA_FORM_SECRET as string | undefined,
    }),
  });

  if (!res.ok) {
    const body = (await res.json().catch(() => ({}))) as { error?: string };
    throw new Error(body.error ?? 'Submission failed');
  }
}
