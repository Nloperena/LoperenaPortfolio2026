# Contact form setup (Vercel)

## What was broken in production (Jun 2026)

| URL | `/api/contact` result |
|-----|------------------------|
| `https://nicoloperena.com` (no www) | **404** — apex was not hitting the SSR API |
| `https://www.nicoloperena.com` | **503** — API works, but no database configured |

The site form uses `fetch('/api/contact')`, so visitors on the apex domain saw a broken form.

## Fixes in code (deploy to activate)

1. **`vercel.json`** — redirect `nicoloperena.com` → `www.nicoloperena.com` (all paths)
2. **`contact.ts`** — saves to Postgres **or** sends email via **Resend** (either one = success)
3. **Fallback UI** — on error, modal shows **Email me** button (already built in)

## Option A: Resend email (fastest — recommended)

1. Create free account at [resend.com](https://resend.com)
2. Create API key
3. Vercel → project → **Settings → Environment Variables** (Production):
   - `RESEND_API_KEY` = `re_...`
   - `CONTACT_TO_EMAIL` = `nicholasloperena@gmail.com`
   - `RESEND_FROM` = `Portfolio <onboarding@resend.dev>` (testing) or `Contact <contact@nicoloperena.com>` after domain verify
4. **Redeploy**

No Postgres required if Resend is configured.

## Option B: Neon Postgres (optional archive)

See steps in this file's previous version — add `DATABASE_URL`, run `database/schema.sql`, redeploy.

Both Resend **and** Postgres can be enabled; the form succeeds if either works.

## After deploy

Test:

```powershell
Invoke-RestMethod -Uri "https://www.nicoloperena.com/api/contact" -Method POST -ContentType "application/json" -Body '{"name":"Test","email":"you@example.com","message":"hello"}'
```

Expect `{ "ok": true, ... }` with status 201.
