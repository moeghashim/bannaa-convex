// Auth0 env var compatibility.
//
// Host env vars use AUTHO_* (letter O) due to platform limitation.
// The Auth0 Next.js SDK expects AUTH0_* (zero) variables by default.
//
// This file sets process.env.AUTH0_* aliases at runtime so the SDK works
// without leaking secrets into the repo.

function setIfMissing(key: string, value?: string) {
  if (!process.env[key] && value) process.env[key] = value;
}

// Base vars
setIfMissing("AUTH0_DOMAIN", process.env.AUTHO_DOMAIN);
setIfMissing("AUTH0_CLIENT_ID", process.env.AUTHO_CLIENT_ID);
setIfMissing("AUTH0_CLIENT_SECRET", process.env.AUTHO_CLIENT_SECRET);

// Optional vars
setIfMissing("AUTH0_SECRET", process.env.AUTHO_SECRET);
// The SDK uses APP_BASE_URL
setIfMissing("APP_BASE_URL", process.env.AUTHO_BASE_URL);

// Derivatives
if (!process.env.AUTH0_ISSUER_BASE_URL && process.env.AUTH0_DOMAIN) {
  process.env.AUTH0_ISSUER_BASE_URL = `https://${process.env.AUTH0_DOMAIN}`;
}

// In Vercel, VERCEL_URL is set without scheme.
if (!process.env.APP_BASE_URL && process.env.VERCEL_URL) {
  process.env.APP_BASE_URL = `https://${process.env.VERCEL_URL}`;
}

if (!process.env.APP_BASE_URL) {
  process.env.APP_BASE_URL = "http://localhost:3000";
}
