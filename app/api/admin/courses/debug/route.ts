import { NextResponse, type NextRequest } from "next/server";
import { auth0 } from "../../../../../lib/auth0";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../../../../../convex/_generated/api";

export async function GET(req: NextRequest) {
  const session = await auth0.getSession(req);
  const email = (session?.user as any)?.email?.toLowerCase?.();

  if (email !== "moe@bannaa.co") {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }

  const internalKey = process.env.INTERNAL_API_KEY?.trim();
  const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL?.trim();

  if (!internalKey || !convexUrl) {
    return NextResponse.json(
      {
        error: "not_configured",
        missing: {
          INTERNAL_API_KEY: !internalKey,
          NEXT_PUBLIC_CONVEX_URL: !convexUrl,
        },
      },
      { status: 500 },
    );
  }

  const client = new ConvexHttpClient(convexUrl);
  const drafts = await client.query(api.siteCourses.listByStage, {
    stage: "draft",
  });

  return NextResponse.json(
    {
      ok: true,
      viewer: email,
      convexUrl,
      draftsCount: (drafts as any[])?.length ?? null,
      drafts,
    },
    { status: 200 },
  );
}
