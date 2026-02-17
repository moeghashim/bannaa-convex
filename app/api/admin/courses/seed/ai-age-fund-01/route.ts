import { NextResponse, type NextRequest } from "next/server";
import { auth0 } from "../../../../../../lib/auth0";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../../../../../../convex/_generated/api";

export async function POST(req: NextRequest) {
  const session = await auth0.getSession(req);
  const email = (session?.user as any)?.email?.toLowerCase?.();

  if (email !== "moe@bannaa.co") {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }

  const { courseId } = (await req.json()) as { courseId: string };

  const internalKey = process.env.INTERNAL_API_KEY?.trim();
  const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL?.trim();

  if (!internalKey || !convexUrl) {
    return NextResponse.json({ error: "not_configured" }, { status: 500 });
  }

  const client = new ConvexHttpClient(convexUrl);

  // Seed outline based on AI-AGE-FUND-01 spec (12 lessons)
  const modules = [
    {
      title: "Shipping & GitHub Workflow",
      lessons: [
        { no: 1, title: "The AI Age Map + How This Course Works" },
        { no: 2, title: "Git + GitHub Basics (Practical)" },
        { no: 3, title: "Project Hygiene" },
      ],
    },
    {
      title: "LLM Fundamentals",
      lessons: [
        { no: 4, title: "What an LLM Is (and Isn’t)" },
        { no: 5, title: "Prompting 101" },
        { no: 6, title: "Evaluation & Iteration Basics" },
      ],
    },
    {
      title: "Agents Fundamentals",
      lessons: [
        { no: 7, title: "What Is an Agent?" },
        { no: 8, title: "Agent Workflows in Real Life" },
      ],
    },
    {
      title: "Audio Fundamentals",
      lessons: [
        { no: 9, title: "Audio Use Cases" },
        { no: 10, title: "Audio Quality & Pipeline" },
      ],
    },
    {
      title: "Video & Remotion Fundamentals",
      lessons: [
        { no: 11, title: "Video Explainers: Script → Slides → Storyboard" },
        { no: 12, title: "Remotion Overview + Capstone Plan" },
      ],
    },
  ];

  const created: any[] = [];

  for (const m of modules) {
    const { moduleId } = await client.mutation(api.siteCoursesAdminCms.addModule, {
      internalKey,
      courseId: courseId as any,
      title: m.title,
    });

    for (const l of m.lessons) {
      const r = await client.mutation(api.siteCoursesAdminCms.addLesson, {
        internalKey,
        courseId: courseId as any,
        moduleId: moduleId as any,
        lessonNo: l.no,
        title: l.title,
        slug: `l${l.no}`,
      });
      created.push({ moduleTitle: m.title, lessonNo: l.no, lessonId: r.lessonId });
    }
  }

  return NextResponse.json({ ok: true, createdCount: created.length }, { status: 200 });
}
