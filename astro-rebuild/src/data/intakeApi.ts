/** Heroku intake API — form submissions stored in Postgres. */
export const INTAKE_SUBMIT_URL =
  (import.meta.env.PUBLIC_INTAKE_API_URL as string | undefined)?.trim() ||
  'https://loperena-intake-backend.herokuapp.com/api/submissions';

export const INTAKE_OPS_URL =
  (import.meta.env.PUBLIC_INTAKE_OPS_URL as string | undefined)?.trim() ||
  'https://loperena-intake-backend.herokuapp.com/operations';
