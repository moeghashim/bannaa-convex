import { v } from "convex/values";
import { mutation } from "./_generated/server";

function requireInternalKey(args: { internalKey: string }) {
  const expected = process.env.INTERNAL_API_KEY;
  if (!expected) throw new Error("Missing INTERNAL_API_KEY in Convex env");
  if (args.internalKey !== expected) throw new Error("Unauthorized");
}

function normalizeSlug(slug: string) {
  return slug
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9\-]+/g, "")
    .replace(/\-+/g, "-")
    .replace(/^\-+|\-+$/g, "");
}

export const createDraftCourse = mutation({
  args: {
    internalKey: v.string(),
    slug: v.string(),
    title: v.string(),
  },
  handler: async (ctx, args) => {
    requireInternalKey(args);

    const slug = normalizeSlug(args.slug);
    if (!slug) throw new Error("Invalid slug");

    const courseId = await ctx.db.insert("siteCourses", {
      slug,
      title: args.title.trim() || slug,
      stage: "draft",
      version: "draft",
      rawMarkdown: undefined,
      sourcePath: undefined,
      createdAt: Date.now(),
    });

    return { courseId, slug };
  },
});

export const updateDraftCourseTitle = mutation({
  args: {
    internalKey: v.string(),
    courseId: v.id("siteCourses"),
    title: v.string(),
  },
  handler: async (ctx, args) => {
    requireInternalKey(args);
    await ctx.db.patch(args.courseId, { title: args.title });
    return { ok: true };
  },
});

export const addModule = mutation({
  args: {
    internalKey: v.string(),
    courseId: v.id("siteCourses"),
    title: v.string(),
    order: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    requireInternalKey(args);

    const existing = await ctx.db
      .query("siteCourseModules")
      .withIndex("by_course", (q) => q.eq("courseId", args.courseId))
      .order("desc")
      .take(1);

    const nextOrder = args.order ?? ((existing[0]?.order ?? 0) + 1);

    const moduleId = await ctx.db.insert("siteCourseModules", {
      courseId: args.courseId,
      title: args.title,
      order: nextOrder,
    });

    return { moduleId };
  },
});

export const addLesson = mutation({
  args: {
    internalKey: v.string(),
    courseId: v.id("siteCourses"),
    moduleId: v.id("siteCourseModules"),
    lessonNo: v.number(),
    title: v.string(),
    slug: v.string(),
    order: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    requireInternalKey(args);

    const existing = await ctx.db
      .query("siteCourseLessons")
      .withIndex("by_course", (q) => q.eq("courseId", args.courseId))
      .order("desc")
      .take(1);

    const nextOrder = args.order ?? ((existing[0]?.order ?? 0) + 1);

    const lessonId = await ctx.db.insert("siteCourseLessons", {
      courseId: args.courseId,
      moduleId: args.moduleId,
      lessonNo: args.lessonNo,
      slug: args.slug.toLowerCase(),
      title: args.title,
      order: nextOrder,
    });

    return { lessonId };
  },
});

export const upsertLessonPack = mutation({
  args: {
    internalKey: v.string(),
    courseId: v.id("siteCourses"),
    lessonId: v.id("siteCourseLessons"),
    objectiveMd: v.optional(v.string()),
    conceptsMd: v.optional(v.string()),
    lessonTextMd: v.optional(v.string()),
    slidesMd: v.optional(v.string()),
    quizMd: v.optional(v.string()),
    homeworkMd: v.optional(v.string()),
    rubricMd: v.optional(v.string()),
    remotionMd: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    requireInternalKey(args);

    const existing = await ctx.db
      .query("siteLessonPacks")
      .withIndex("by_lesson", (q) => q.eq("lessonId", args.lessonId))
      .first();

    const fields = {
      courseId: args.courseId,
      lessonId: args.lessonId,
      objectiveMd: args.objectiveMd,
      conceptsMd: args.conceptsMd,
      lessonTextMd: args.lessonTextMd,
      slidesMd: args.slidesMd,
      quizMd: args.quizMd,
      homeworkMd: args.homeworkMd,
      rubricMd: args.rubricMd,
      remotionMd: args.remotionMd,
    };

    if (existing) {
      await ctx.db.patch(existing._id, fields);
      return { packId: existing._id };
    }

    const packId = await ctx.db.insert("siteLessonPacks", fields);
    return { packId };
  },
});
