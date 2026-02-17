import { NextResponse, type NextRequest } from "next/server";
import { auth0 } from "../../../../../lib/auth0";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../../../../../convex/_generated/api";
import fs from "node:fs";
import path from "node:path";

export async function POST(req: NextRequest) {
  try {
    const session = await auth0.getSession(req);
    const email = (session?.user as any)?.email?.toLowerCase?.();

    if (email !== "moe@bannaa.co") {
      return NextResponse.json({ error: "forbidden" }, { status: 403 });
    }

    const internalKey = process.env.INTERNAL_API_KEY;
    const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
    if (!internalKey || !convexUrl) {
      return NextResponse.json({ error: "not_configured" }, { status: 500 });
    }

    const repoRoot = process.cwd();
    const coursesDir = path.join(repoRoot, "courses");

    if (!fs.existsSync(coursesDir)) {
      return NextResponse.json(
        {
          error: "missing_courses_dir",
          details: {
            repoRoot,
            coursesDir,
          },
        },
        { status: 500 },
      );
    }

    const files = fs
      .readdirSync(coursesDir)
      .filter((f) => f.toLowerCase().endsWith(".md"))
      // avoid syncing the production approach doc as a course
      .filter((f) => f.toLowerCase() !== "course_production_approach.md");

    if (files.length === 0) {
      return NextResponse.json(
        { error: "no_course_files", details: { coursesDir } },
        { status: 500 },
      );
    }

    const client = new ConvexHttpClient(convexUrl);

    const results: any[] = [];
    for (const file of files) {
      const sourcePath = `courses/${file}`;
      const markdown = fs.readFileSync(path.join(coursesDir, file), "utf8");

      const r = await client.mutation(
        api.siteCoursesAdmin.upsertDraftFromMarkdown,
        {
          internalKey,
          sourcePath,
          markdown,
        },
      );

      results.push(r);
    }

    return NextResponse.json({ synced: results.length, results }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      {
        error: "sync_failed",
        message: err?.message || String(err),
      },
      { status: 500 },
    );
  }
}
