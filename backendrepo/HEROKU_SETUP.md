# Heroku intake backend

Express + Postgres API in `backendrepo/` for portfolio contact form submissions.

## One-time: log in to Heroku

I cannot complete login for you — run this in a terminal and finish auth in the browser:

```powershell
heroku login
```

Verify:

```powershell
heroku auth:whoami
```

## Deploy (from repo root)

```powershell
cd C:\Users\nimro\Developer\LoperenaPortfolio2026
.\scripts\deploy-heroku-backend.ps1
```

The script will:

1. Create app `loperena-intake-backend` (or reuse if it exists)
2. Add Heroku Postgres
3. Set CORS for `https://www.nicoloperena.com` and `https://nicoloperena.com`
4. Run DB schema
5. Deploy `backendrepo/` via git subtree push

## Connect Vercel frontend

After deploy, copy the app URL from script output, then in **Vercel → Settings → Environment Variables**:

| Variable | Example |
|----------|---------|
| `PUBLIC_INTAKE_API_URL` | `https://loperena-intake-backend-xxxxx.herokuapp.com/api/submissions` |

Redeploy the Vercel site.

## Test

```powershell
# Health
Invoke-RestMethod https://YOUR-APP.herokuapp.com/health

# Submission
Invoke-RestMethod -Method POST -Uri "https://YOUR-APP.herokuapp.com/api/submissions" `
  -ContentType "application/json" `
  -Body '{"name":"Test","email":"test@example.com","message":"Hello from Heroku"}'
```

## View submissions

```powershell
heroku pg:psql -a loperena-intake-backend -c "SELECT * FROM intake_submissions ORDER BY created_at DESC LIMIT 10;"
```
