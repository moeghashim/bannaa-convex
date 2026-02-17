import { Auth0Client } from "@auth0/nextjs-auth0/server";
import { getAuth0RuntimeConfig } from "./auth0-compat";

const cfg = getAuth0RuntimeConfig();

export const auth0 = new Auth0Client({
  domain: cfg.domain,
  clientId: cfg.clientId,
  clientSecret: cfg.clientSecret,
  secret: cfg.secret,
  appBaseUrl: cfg.appBaseUrl,
  authorizationParameters: {
    scope: "openid profile email",
  },
  routes: {
    login: "/api/auth/login",
    logout: "/api/auth/logout",
    callback: "/api/auth/callback",
  },
});
