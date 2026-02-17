import { NextResponse, type NextRequest } from "next/server";
import { auth0 } from "./lib/auth0";

// Protect admin routes. Note: /admin is currently handled by the legacy SPA
// mounted inside Next.js, but middleware runs before route handling.

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Always run Auth0 middleware first so it can manage rolling sessions
  // and set/refresh cookies as needed.
  const authRes = await auth0.middleware(req);

  // Auth0-owned routes should return immediately.
  if (pathname.startsWith("/api/auth")) {
    return authRes;
  }

  if (!pathname.startsWith("/admin") && !pathname.startsWith("/dashboard")) {
    return authRes;
  }

  const session = await auth0.getSession(req);
  if (session?.user) {
    // Admin allowlist (simple & explicit)
    if (pathname.startsWith("/admin")) {
      const email = (session.user as any)?.email?.toLowerCase?.();
      if (email !== "moe@bannaa.co") {
        return NextResponse.redirect(new URL("/", req.url));
      }
    }

    return authRes;
  }

  const loginUrl = req.nextUrl.clone();
  loginUrl.pathname = "/api/auth/login";
  loginUrl.searchParams.set("returnTo", pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: [
    "/api/auth/:path*",
    "/admin",
    "/admin/:path*",
    "/dashboard",
    "/dashboard/:path*",
  ],
};
