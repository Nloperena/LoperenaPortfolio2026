# Contact form: database setup (Vercel)

The contact form stores submissions in Postgres. On **nicoloperena.com** you see *"Contact form is unavailable: database is not configured on the server"* until a database is connected and the right env var is set.

## Option A: Add Neon Postgres from Vercel (recommended)

1. Open [Vercel Dashboard](https://vercel.com/dashboard) → your **project** (e.g. LoperenaPortfolio2026).
2. Go to **Storage** (or **Integrations** → Marketplace).
3. Add **Neon Postgres** (or “Postgres”): Create/connect a database and **Connect** it to this project.
4. When connecting, choose **Production** (and Preview if you want) so the deployment gets the env vars.
5. The integration injects **`DATABASE_URL`** automatically. **Redeploy** the project (Deployments → … → Redeploy) so the new env is used.

## Option B: Use your own Postgres URL

If you already have a Postgres database (e.g. Neon, Supabase, Railway):

1. Vercel Dashboard → your project → **Settings** → **Environment Variables**.
2. Add one of (the app checks in this order):
   - **`DATABASE_URL`** (recommended), or  
   - **`POSTGRES_URL`**
3. Value: your full connection string, e.g.  
   `postgres://user:password@host:5432/dbname?sslmode=require`
4. **Redeploy** after saving.

## Create the table

Run this SQL once in your database (Neon SQL Editor, Supabase SQL, etc.):

```sql
CREATE TABLE IF NOT EXISTS contact_submissions (
  id         SERIAL PRIMARY KEY,
  name       VARCHAR(255) NOT NULL,
  email      VARCHAR(255) NOT NULL,
  company    VARCHAR(255),
  message    TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at
  ON contact_submissions (created_at DESC);
```

The same schema is in `database/schema.sql`.

After the database is connected and the table exists, the live contact form will save submissions and the error will go away.
