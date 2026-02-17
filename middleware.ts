import { type NextRequest } from "next/server";
import { auth0 } from "./lib/auth0";

// Auth0 SDK mounts /api/auth/* via Next.js Middleware.
export async function middleware(req: NextRequest) {
  return auth0.middleware(req);
}

export const config = {
  matcher: ["/api/auth/:path*"],
};
