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

  const { courseId, moduleId, lessonNo, title } = (await req.json()) as {
    courseId: string;
    moduleId: string;
    lessonNo: number;
    title: string;
  };

  const internalKey = process.env.INTERNAL_API_KEY;
  const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;

  if (!internalKey || !convexUrl) {
    return NextResponse.json({ error: "not_configured" }, { status: 500 });
  }

  const client = new ConvexHttpClient(convexUrl);
  const slug = `l${lessonNo}`;
  const result = await client.mutation(api.siteCoursesAdminCms.addLesson, {
    internalKey,
    courseId: courseId as any,
    moduleId: moduleId as any,
    lessonNo,
    title,
    slug,
  });

  return NextResponse.json(result, { status: 200 });
}
