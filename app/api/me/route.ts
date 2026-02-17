import { NextResponse, type NextRequest } from "next/server";
import { auth0 } from "../../../lib/auth0";

export async function GET(req: NextRequest) {
  const session = await auth0.getSession(req);
  return NextResponse.json({ user: session?.user ?? null }, { status: 200 });
}
