-- Contact form submissions for portfolio site.
-- Run once on Heroku Postgres (e.g. heroku pg:psql -a your-app-name < database/schema.sql)
-- or in the Heroku Dashboard SQL console.

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
