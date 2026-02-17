import { auth0 } from "../../../../lib/auth0";
import type { NextRequest } from "next/server";

// Delegate /api/auth/* handling to the Auth0 SDK.
// This covers: /api/auth/login, /api/auth/logout, /api/auth/callback, etc.
export async function GET(req: NextRequest) {
  return auth0.middleware(req);
}

export async function POST(req: NextRequest) {
  return auth0.middleware(req);
}
