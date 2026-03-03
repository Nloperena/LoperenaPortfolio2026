import pg from 'pg';

const { Pool } = pg;

let pool: pg.Pool | null = null;
let poolConnectionString: string | null = null;

function getDatabaseUrl(): string | null {
  const candidates = [
    process.env.DATABASE_URL,
    process.env.DATABASE_URL_UNPOOLED,
    process.env.POSTGRES_URL,
    process.env.POSTGRES_PRISMA_URL,
    process.env.POSTGRES_URL_NON_POOLING,
  ];
  for (const candidate of candidates) {
    if (typeof candidate === 'string' && candidate.trim().length > 0) {
      return candidate.trim();
    }
  }
  return null;
}

/**
 * Returns a Postgres pool when a DB URL env var is set (Heroku/Vercel).
 * In dev/test without a DB URL, returns null so the API can fail gracefully.
 */
export function getPool(): pg.Pool | null {
  const databaseUrl = getDatabaseUrl();
  if (!databaseUrl) {
    return null;
  }

  if (!pool || poolConnectionString !== databaseUrl) {
    pool = new Pool({
      connectionString: databaseUrl,
      ssl: databaseUrl.includes('localhost') ? false : { rejectUnauthorized: false },
    });
    poolConnectionString = databaseUrl;
  }

  return pool;
}

export type ContactSubmission = {
  id: number;
  name: string;
  email: string;
  company: string | null;
  message: string | null;
  created_at: Date;
};
