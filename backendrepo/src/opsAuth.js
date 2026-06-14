const { createHmac, timingSafeEqual } = require("node:crypto");

const OPS_COOKIE = "ops_session";
const SESSION_TTL_SEC = 7 * 24 * 60 * 60;

function getPassword() {
  return process.env.OPS_PASSWORD?.trim() || null;
}

function getSecret() {
  return process.env.OPS_SESSION_SECRET?.trim() || getPassword();
}

function isOpsConfigured() {
  return Boolean(getPassword());
}

function verifyOpsPassword(input) {
  const expected = getPassword();
  if (!expected) return false;

  const provided = Buffer.from(input);
  const target = Buffer.from(expected);
  if (provided.length !== target.length) return false;

  return timingSafeEqual(provided, target);
}

function createSessionToken() {
  const secret = getSecret();
  if (!secret) return null;

  const exp = Date.now() + SESSION_TTL_SEC * 1000;
  const payload = String(exp);
  const sig = createHmac("sha256", secret).update(payload).digest("base64url");
  return `${payload}.${sig}`;
}

function verifySessionToken(token) {
  if (!token) return false;

  const secret = getSecret();
  if (!secret) return false;

  const [payload, sig] = token.split(".");
  if (!payload || !sig) return false;

  const exp = Number(payload);
  if (!Number.isFinite(exp) || exp < Date.now()) return false;

  const expected = createHmac("sha256", secret).update(payload).digest("base64url");
  try {
    return timingSafeEqual(Buffer.from(sig), Buffer.from(expected));
  } catch {
    return false;
  }
}

function parseCookies(header) {
  if (!header) return {};
  return header.split(";").reduce((acc, part) => {
    const [key, ...rest] = part.trim().split("=");
    if (key) acc[key] = decodeURIComponent(rest.join("="));
    return acc;
  }, {});
}

function getSessionFromRequest(req) {
  const cookies = parseCookies(req.headers.cookie);
  return cookies[OPS_COOKIE];
}

function isOpsAuthenticated(req) {
  return verifySessionToken(getSessionFromRequest(req));
}

function setOpsSessionCookie(res, token) {
  const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";
  res.setHeader(
    "Set-Cookie",
    `${OPS_COOKIE}=${token}; HttpOnly; SameSite=Strict; Path=/${secure}; Max-Age=${SESSION_TTL_SEC}`,
  );
}

function clearOpsSessionCookie(res) {
  const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";
  res.setHeader(
    "Set-Cookie",
    `${OPS_COOKIE}=; HttpOnly; SameSite=Strict; Path=/${secure}; Max-Age=0`,
  );
}

module.exports = {
  isOpsConfigured,
  verifyOpsPassword,
  createSessionToken,
  isOpsAuthenticated,
  setOpsSessionCookie,
  clearOpsSessionCookie,
};
