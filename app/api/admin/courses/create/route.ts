import { NextResponse, type NextRequest } from "next/server";
import { auth0 } from "../../../../../lib/auth0";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../../../../../convex/_generated/api";

export async function POST(req: NextRequest) {
  try {
    const session = await auth0.getSession(req);
    const email = (session?.user as any)?.email?.toLowerCase?.();

    if (email !== "moe@bannaa.co") {
      return NextResponse.json({ error: "forbidden" }, { status: 403 });
    }

    const { slug, title } = (await req.json()) as {
      slug: string;
      title: string;
    };

    const internalKey = process.env.INTERNAL_API_KEY;
    const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;

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
    const result = await client.mutation(
      api.siteCoursesAdminCms.createDraftCourse,
      {
        internalKey,
        slug,
        title,
      },
    );

    return NextResponse.json(result, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      {
        error: "create_failed",
        message: err?.message || String(err),
      },
      { status: 500 },
    );
  }
}
