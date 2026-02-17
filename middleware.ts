import { type NextRequest } from "next/server";
import { auth0 } from "./lib/auth0";

// Auth0 SDK v4 uses middleware to mount /api/auth/* endpoints.
// Keep this middleware ONLY for /api/auth/*.
export async function middleware(req: NextRequest) {
  return auth0.middleware(req);
}

export const config = {
  matcher: ["/api/auth/:path*"],
};
