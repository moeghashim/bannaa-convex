import type { NextRequest } from "next/server";
import { auth0 } from "../../../../lib/auth0";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Mount Auth0 endpoints in App Router.
// Handles: /api/auth/login, /api/auth/logout, /api/auth/callback, etc.
export async function GET(req: NextRequest) {
  return auth0.middleware(req);
}

export async function POST(req: NextRequest) {
  return auth0.middleware(req);
}
