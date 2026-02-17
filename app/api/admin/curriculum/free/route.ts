import { NextResponse, type NextRequest } from "next/server";
import { auth0 } from "../../../../../lib/auth0";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../../../../../convex/_generated/api";

export async function POST(req: NextRequest) {
  const session = await auth0.getSession(req);
  const email = (session?.user as any)?.email?.toLowerCase?.();

  if (email !== "moe@bannaa.co") {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }

  const { slug, isFree } = (await req.json()) as {
    slug: string;
    isFree: boolean;
  };

  const internalKey = process.env.INTERNAL_API_KEY?.trim();
  const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL?.trim();

  if (!internalKey || !convexUrl) {
    return NextResponse.json({ error: "not_configured" }, { status: 500 });
  }

  const client = new ConvexHttpClient(convexUrl);
  const result = await client.mutation(api.curriculumAdmin.setCurriculumFree, {
    slug,
    isFree,
    internalKey,
  });

  return NextResponse.json(result, { status: 200 });
}
