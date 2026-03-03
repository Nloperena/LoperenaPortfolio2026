# Intake Backend (Heroku)

Heroku-ready Express backend to store contact form submissions from your portfolio.

## Stack

- Node.js + Express
- PostgreSQL (`pg`)
- Validation with `zod`
- Security + logging: `helmet`, `cors`, `morgan`

## Endpoints

- `GET /health` -> service + DB health
- `POST /api/submissions` -> create submission

### `POST /api/submissions` payload

```json
{
  "name": "Jane Doe",
  "email": "jane@company.com",
  "company": "Acme Corp",
  "projectScope": "We need to rebuild our B2B catalog and improve speed."
}
```

## Local setup

1. Copy env template:

```bash
cp .env.example .env
```

2. Fill `.env` values (`DATABASE_URL`, `ALLOWED_ORIGINS`).
3. Create DB table:

```bash
psql "$DATABASE_URL" -f sql/schema.sql
```

4. Run dev server:

```bash
npm run dev
```

## Heroku deployment

1. Create a new Heroku app:

```bash
heroku create your-backend-app-name
```

2. Add Postgres:

```bash
heroku addons:create heroku-postgresql:mini
```

3. Set CORS origin(s):

```bash
heroku config:set ALLOWED_ORIGINS=https://your-frontend-domain.com
```

4. Push backend repo to Heroku remote:

```bash
git init
git add .
git commit -m "Initial Heroku intake backend"
heroku git:remote -a your-backend-app-name
git push heroku main
```

5. Run DB schema:

```bash
heroku pg:psql -a your-backend-app-name < sql/schema.sql
```

## Frontend integration

Submit your intake form to:

`https://your-backend-app-name.herokuapp.com/api/submissions`

Use `Content-Type: application/json`.
