import "../server/auth0-compat";

import { Auth0Client } from "@auth0/nextjs-auth0/server";

// After importing auth0-compat, we expect AUTH0_* env vars to be present.
// The SDK also supports using env vars directly, but we keep the config explicit.

export const auth0 = new Auth0Client({
  domain: process.env.AUTH0_DOMAIN,
  clientId: process.env.AUTH0_CLIENT_ID,
  clientSecret: process.env.AUTH0_CLIENT_SECRET,
  secret: process.env.AUTH0_SECRET,
  appBaseUrl: process.env.APP_BASE_URL,
  authorizationParameters: {
    scope: "openid profile email",
  },
  routes: {
    login: "/api/auth/login",
    logout: "/api/auth/logout",
    callback: "/api/auth/callback",
    profile: "/api/auth/me",
  },
});
