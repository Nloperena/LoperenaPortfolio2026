import pg from 'pg';

const { Pool } = pg;

let pool: pg.Pool | null = null;

/**
 * Returns a Postgres pool when DATABASE_URL is set (e.g. Heroku Postgres).
 * In dev/test without DATABASE_URL, returns null so the API can fail gracefully.
 */
export function getPool(): pg.Pool | null {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl || typeof databaseUrl !== 'string') {
    return null;
  }
  if (!pool) {
    pool = new Pool({
      connectionString: databaseUrl,
      ssl: databaseUrl.includes('localhost') ? false : { rejectUnauthorized: false },
    });
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
