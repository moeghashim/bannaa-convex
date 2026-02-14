import { NextResponse, type NextRequest } from "next/server";
import { auth0 } from "./lib/auth0";

// Protect admin routes. Note: /admin is currently handled by the legacy SPA
// mounted inside Next.js, but middleware runs before route handling.

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // First, let Auth0 mount its own routes.
  if (pathname.startsWith("/api/auth")) {
    return auth0.middleware(req);
  }

  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  const session = await auth0.getSession(req);
  if (session?.user) {
    return NextResponse.next();
  }

  const loginUrl = req.nextUrl.clone();
  loginUrl.pathname = "/api/auth/login";
  loginUrl.searchParams.set("returnTo", pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/api/auth/:path*", "/admin", "/admin/:path*"],
};
