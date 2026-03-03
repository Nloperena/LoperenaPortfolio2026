# Heroku Deploy Guide

## Prerequisites
- Heroku CLI installed and logged in (`heroku login`)
- Git repository at the project root

## Initial Deployment Steps (Run from repository root)

1. **Create the Heroku app**
   ```bash
   heroku create <your-app-name>
   ```

2. **Add PostgreSQL Add-on**
   Heroku will automatically set the `DATABASE_URL` config var.
   ```bash
   heroku addons:create heroku-postgresql:mini -a <your-app-name>
   ```

3. **Initialize the Database Schema**
   ```bash
   heroku pg:psql -a <your-app-name> < astro-rebuild/database/schema.sql
   ```

4. **Deploy the App**
   Because the Astro project lives in the `astro-rebuild` subdirectory, we use `git subtree push`.
   ```bash
   git subtree push --prefix astro-rebuild heroku main
   ```
   *(If your default branch is `master`, use `git subtree push --prefix astro-rebuild heroku master` instead)*

5. **Open the App**
   ```bash
   heroku open -a <your-app-name>
   ```

## Inspecting Database Submissions

To see the contact form submissions:
```bash
heroku pg:psql -a <your-app-name>
```
Then inside the psql prompt:
```sql
SELECT * FROM contact_submissions ORDER BY created_at DESC;
\q
```

## Future Deployments

Whenever you make changes to the code, commit them to your repository, then run the subtree push again from the repo root:
```bash
git subtree push --prefix astro-rebuild heroku main
```
