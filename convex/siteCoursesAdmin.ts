import { v } from "convex/values";
import { mutation } from "./_generated/server";

type ParsedCourse = {
  slug: string;
  title: string;
  modules: { title: string; lessons: { lessonNo: number; title: string }[] }[];
  lessonPacks: Record<
    string,
    {
      objectiveMd?: string;
      conceptsMd?: string;
      lessonTextMd?: string;
      slidesMd?: string;
      quizMd?: string;
      homeworkMd?: string;
      rubricMd?: string;
      remotionMd?: string;
    }
  >;
};

function requireInternalKey(args: { internalKey: string }) {
  const expected = process.env.INTERNAL_API_KEY;
  if (!expected) throw new Error("Missing INTERNAL_API_KEY in Convex env");
  if (args.internalKey !== expected) throw new Error("Unauthorized");
}

function normalizeCourseSlugFromFilename(path: string) {
  return path
    .replace(/^.*\//, "")
    .replace(/\.md$/i, "")
    .toLowerCase();
}

function parseCourseMarkdown(sourcePath: string, markdown: string): ParsedCourse {
  const firstLine = markdown.split("\n").find((l) => l.trim().length > 0) ?? "";
  const title = firstLine.replace(/^#\s+/, "").trim() || sourcePath;

  const slug = normalizeCourseSlugFromFilename(sourcePath);

  const lines = markdown.split("\n");
  const modules: ParsedCourse["modules"] = [];

  let currentModule: { title: string; lessons: any[] } | null = null;

  // Outline parsing: "### Module X — ..." then "- **L1. ...**"
  for (const line of lines) {
    const mod = line.match(/^###\s+Module\s+[A-Z]\s+—\s+(.*)$/);
    if (mod) {
      currentModule = { title: mod[1].trim(), lessons: [] };
      modules.push(currentModule);
      continue;
    }

    const lesson = line.match(/^\-\s+\*\*L(\d+)\.\s+(.+?)\*\*\s*$/);
    if (lesson) {
      if (!currentModule) {
        currentModule = { title: "", lessons: [] };
        modules.push(currentModule);
      }
      currentModule.lessons.push({
        lessonNo: Number(lesson[1]),
        title: lesson[2].trim(),
      });
    }
  }

  // Lesson pack parsing (only guaranteed for L1 right now):
  // Find "## Lx — ..." blocks, then capture known "###" sections until next "###"/"##".
  const lessonPacks: ParsedCourse["lessonPacks"] = {};

  const lessonHeaderRe = /^##\s+L(\d+)\s+—\s+(.+?)\s*$/;
  const sectionHeaderRe = /^###\s+(.+?)\s*$/;

  let currentLessonKey: string | null = null;
  let currentSection: string | null = null;
  let buf: string[] = [];

  const flush = () => {
    if (!currentLessonKey || !currentSection) return;
    const text = buf.join("\n").trim();
    if (!text) return;

    const pack = (lessonPacks[currentLessonKey] ??= {});

    const name = currentSection.toLowerCase();
    if (name.startsWith("objective")) pack.objectiveMd = text;
    else if (name.startsWith("core concepts")) pack.conceptsMd = text;
    else if (name.startsWith("lesson text")) pack.lessonTextMd = text;
    else if (name.startsWith("slides script")) pack.slidesMd = text;
    else if (name === "quiz") pack.quizMd = text;
    else if (name.startsWith("homework")) {
      // split rubric if present
      const parts = text.split(/\n\s*Rubric\s*\(\d+\):/i);
      pack.homeworkMd = parts[0].trim();
      if (parts[1]) {
        pack.rubricMd = ("Rubric (10):" + parts[1]).trim();
      }
    } else if (name.startsWith("remotion")) pack.remotionMd = text;
  };

  for (const line of lines) {
    const lh = line.match(lessonHeaderRe);
    if (lh) {
      flush();
      currentLessonKey = `l${Number(lh[1])}`;
      currentSection = null;
      buf = [];
      continue;
    }

    const sh = line.match(sectionHeaderRe);
    if (sh && currentLessonKey) {
      flush();
      currentSection = sh[1].trim();
      buf = [];
      continue;
    }

    // Stop capturing when we hit next "##" while in a section.
    if (line.startsWith("## ") && currentLessonKey) {
      flush();
      currentSection = null;
      buf = [];
      continue;
    }

    if (currentLessonKey && currentSection) buf.push(line);
  }
  flush();

  return { slug, title, modules, lessonPacks };
}

export const upsertDraftFromMarkdown = mutation({
  args: {
    internalKey: v.string(),
    sourcePath: v.string(),
    markdown: v.string(),
  },
  handler: async (ctx, args) => {
    requireInternalKey(args);

    const parsed = parseCourseMarkdown(args.sourcePath, args.markdown);

    // Create a fresh draft snapshot every time (append-only). We'll keep latest-first.
    const courseId = await ctx.db.insert("siteCourses", {
      slug: parsed.slug,
      title: parsed.title,
      stage: "draft",
      version: "draft",
      sourcePath: args.sourcePath,
      rawMarkdown: args.markdown,
      createdAt: Date.now(),
    });

    // Create modules/lessons
    let moduleOrder = 1;
    let lessonOrder = 1;

    for (const m of parsed.modules) {
      const moduleId = await ctx.db.insert("siteCourseModules", {
        courseId,
        title: m.title || "Module",
        order: moduleOrder++,
      });

      for (const l of m.lessons) {
        const lessonSlug = `l${l.lessonNo}`;
        const lessonId = await ctx.db.insert("siteCourseLessons", {
          courseId,
          moduleId,
          lessonNo: l.lessonNo,
          slug: lessonSlug,
          title: l.title,
          order: lessonOrder++,
        });

        const pack = parsed.lessonPacks[lessonSlug];
        if (pack) {
          await ctx.db.insert("siteLessonPacks", {
            courseId,
            lessonId,
            objectiveMd: pack.objectiveMd,
            conceptsMd: pack.conceptsMd,
            lessonTextMd: pack.lessonTextMd,
            slidesMd: pack.slidesMd,
            quizMd: pack.quizMd,
            homeworkMd: pack.homeworkMd,
            rubricMd: pack.rubricMd,
            remotionMd: pack.remotionMd,
          });
        }
      }
    }

    return { courseId, slug: parsed.slug, stage: "draft" };
  },
});

export const publishLatestDraft = mutation({
  args: {
    internalKey: v.string(),
    slug: v.string(),
    version: v.string(),
  },
  handler: async (ctx, args) => {
    requireInternalKey(args);

    const draftRows = await ctx.db
      .query("siteCourses")
      .withIndex("by_slug_stage", (q) => q.eq("slug", args.slug).eq("stage", "draft"))
      .order("desc")
      .take(1);

    const draft = draftRows[0];
    if (!draft) throw new Error("No draft found");

    // duplicate course snapshot as published
    const publishedCourseId = await ctx.db.insert("siteCourses", {
      slug: draft.slug,
      title: draft.title,
      stage: "published",
      version: args.version,
      sourcePath: draft.sourcePath,
      rawMarkdown: draft.rawMarkdown,
      createdAt: Date.now(),
    });

    // copy modules
    const draftModules = await ctx.db
      .query("siteCourseModules")
      .withIndex("by_course", (q) => q.eq("courseId", draft._id))
      .order("asc")
      .collect();

    const moduleMap = new Map<string, any>();
    for (const dm of draftModules) {
      const pmId = await ctx.db.insert("siteCourseModules", {
        courseId: publishedCourseId,
        title: dm.title,
        order: dm.order,
      });
      moduleMap.set(dm._id, pmId);
    }

    const draftLessons = await ctx.db
      .query("siteCourseLessons")
      .withIndex("by_course", (q) => q.eq("courseId", draft._id))
      .order("asc")
      .collect();

    const lessonMap = new Map<string, any>();
    for (const dl of draftLessons) {
      const plId = await ctx.db.insert("siteCourseLessons", {
        courseId: publishedCourseId,
        moduleId: moduleMap.get(dl.moduleId) ?? Array.from(moduleMap.values())[0],
        lessonNo: dl.lessonNo,
        slug: dl.slug,
        title: dl.title,
        order: dl.order,
      });
      lessonMap.set(dl._id, plId);
    }

    // copy packs
    for (const dl of draftLessons) {
      const pack = await ctx.db
        .query("siteLessonPacks")
        .withIndex("by_lesson", (q) => q.eq("lessonId", dl._id))
        .first();
      if (!pack) continue;

      await ctx.db.insert("siteLessonPacks", {
        courseId: publishedCourseId,
        lessonId: lessonMap.get(dl._id),
        objectiveMd: pack.objectiveMd,
        conceptsMd: pack.conceptsMd,
        lessonTextMd: pack.lessonTextMd,
        slidesMd: pack.slidesMd,
        quizMd: pack.quizMd,
        homeworkMd: pack.homeworkMd,
        rubricMd: pack.rubricMd,
        remotionMd: pack.remotionMd,
      });
    }

    return { slug: args.slug, stage: "published", version: args.version };
  },
});
