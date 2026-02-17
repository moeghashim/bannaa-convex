// Auth0 env var compatibility.
//
// Some hosts can't set env var keys containing `0`, so we store Auth0 config
// as AUTHO_* (letter O). This module reads both AUTHO_* and AUTH0_* safely.
//
// IMPORTANT: This module must be safe in Next.js Middleware (edge runtime).
// Do NOT mutate process.env here.

function normalizeAuth0Domain(input?: string) {
  if (!input) return undefined;
  // Accept either `dev-xxx.us.auth0.com` or `https://dev-xxx.us.auth0.com/`
  return input.replace(/^https?:\/\//, "").replace(/\/+$/, "");
}

export function getAuth0RuntimeConfig() {
  const domain = normalizeAuth0Domain(
    process.env.AUTHO_DOMAIN || process.env.AUTH0_DOMAIN,
  );

  const clientId = (process.env.AUTHO_CLIENT_ID || process.env.AUTH0_CLIENT_ID)?.trim();
  const clientSecret = (
    process.env.AUTHO_CLIENT_SECRET || process.env.AUTH0_CLIENT_SECRET
  )?.trim();

  const secret = (process.env.AUTHO_SECRET || process.env.AUTH0_SECRET)?.trim();

  const appBaseUrl = (process.env.AUTHO_BASE_URL || process.env.APP_BASE_URL)?.trim();

  const issuerBaseUrl = (
    process.env.AUTH0_ISSUER_BASE_URL ||
    (domain ? `https://${domain}` : undefined)
  )?.trim();

  return {
    domain,
    clientId,
    clientSecret,
    secret,
    appBaseUrl,
    issuerBaseUrl,
  };
}
