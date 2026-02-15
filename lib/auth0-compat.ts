// Auth0 env var compatibility.
//
// Host env vars use AUTHO_* (letter O) due to platform limitation.
// The Auth0 Next.js SDK expects AUTH0_* (zero) variables by default.
//
// This file sets process.env.AUTH0_* aliases at runtime so the SDK works.

function setIfMissing(key: string, value?: string) {
  if (!process.env[key] && value) process.env[key] = value;
}

function normalizeAuth0Domain(input?: string) {
  if (!input) return undefined;
  // Accept either `dev-xxx.us.auth0.com` or `https://dev-xxx.us.auth0.com/`
  return input.replace(/^https?:\/\//, "").replace(/\/+$/, "");
}

setIfMissing("AUTH0_DOMAIN", normalizeAuth0Domain(process.env.AUTHO_DOMAIN));
setIfMissing("AUTH0_CLIENT_ID", process.env.AUTHO_CLIENT_ID);
setIfMissing("AUTH0_CLIENT_SECRET", process.env.AUTHO_CLIENT_SECRET);

setIfMissing("AUTH0_SECRET", process.env.AUTHO_SECRET);
// The SDK uses APP_BASE_URL
setIfMissing("APP_BASE_URL", process.env.AUTHO_BASE_URL);

if (!process.env.AUTH0_ISSUER_BASE_URL && process.env.AUTH0_DOMAIN) {
  process.env.AUTH0_ISSUER_BASE_URL = `https://${normalizeAuth0Domain(process.env.AUTH0_DOMAIN)}`;
}

if (!process.env.APP_BASE_URL && process.env.VERCEL_URL) {
  process.env.APP_BASE_URL = `https://${process.env.VERCEL_URL}`;
}

if (!process.env.APP_BASE_URL) {
  process.env.APP_BASE_URL = "http://localhost:3000";
}
