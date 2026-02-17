import type { NextRequest } from "next/server";
import { auth0 } from "../../../../lib/auth0";

// Mount Auth0 endpoints in the App Router without Next.js edge middleware.
// Handles: /api/auth/login, /api/auth/logout, /api/auth/callback, etc.
export async function GET(req: NextRequest) {
  return auth0.middleware(req);
}

export async function POST(req: NextRequest) {
  return auth0.middleware(req);
}
