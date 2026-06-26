/** Legacy Heroku intake ops dashboard (optional). Form submissions go to Nexrena Ops via nexrenaFormSubmit. */
export const INTAKE_OPS_URL =
  (import.meta.env.PUBLIC_INTAKE_OPS_URL as string | undefined)?.trim() ||
  'https://loperena-intake-backend-38a778db1c8b.herokuapp.com/operations';
