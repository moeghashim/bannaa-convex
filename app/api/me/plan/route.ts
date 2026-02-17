import { NextResponse, type NextRequest } from "next/server";
import { auth0 } from "../../../../lib/auth0";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../../../../convex/_generated/api";

export async function GET(req: NextRequest) {
  const session = await auth0.getSession(req);
  const email = (session?.user as any)?.email as string | undefined;

  if (!email) {
    return NextResponse.json({ plan: "free" }, { status: 200 });
  }

  const internalKey = process.env.INTERNAL_API_KEY?.trim();
  const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL?.trim();

  if (!internalKey || !convexUrl) {
    return NextResponse.json(
      { error: "Server not configured" },
      { status: 500 },
    );
  }

  const client = new ConvexHttpClient(convexUrl);
  const result = await client.query(api.userPlan.getByEmail, {
    email,
    internalKey,
  });

  return NextResponse.json(result, { status: 200 });
}
