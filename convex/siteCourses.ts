import { v } from "convex/values";
import { query } from "./_generated/server";

export const listByStage = query({
  args: { stage: v.union(v.literal("draft"), v.literal("published")) },
  handler: async (ctx, args) => {
    // latest-first
    const rows = await ctx.db
      .query("siteCourses")
      .withIndex("by_stage", (q) => q.eq("stage", args.stage))
      .order("desc")
      .take(50);

    return rows.map((c) => ({
      id: c._id,
      slug: c.slug,
      title: c.title,
      stage: c.stage,
      version: c.version,
      createdAt: c.createdAt,
      sourcePath: c.sourcePath,
    }));
  },
});

export const getLatestBySlug = query({
  args: {
    slug: v.string(),
    stage: v.union(v.literal("draft"), v.literal("published")),
  },
  handler: async (ctx, args) => {
    const rows = await ctx.db
      .query("siteCourses")
      .withIndex("by_slug_stage", (q) =>
        q.eq("slug", args.slug).eq("stage", args.stage),
      )
      .order("desc")
      .take(1);

    const course = rows[0];
    if (!course) return null;

    const modules = await ctx.db
      .query("siteCourseModules")
      .withIndex("by_course", (q) => q.eq("courseId", course._id))
      .order("asc")
      .collect();

    const lessons = await ctx.db
      .query("siteCourseLessons")
      .withIndex("by_course", (q) => q.eq("courseId", course._id))
      .order("asc")
      .collect();

    const lessonsByModule = new Map<string, any[]>();
    for (const l of lessons) {
      const key = l.moduleId;
      const arr = lessonsByModule.get(key) ?? [];
      arr.push({
        id: l._id,
        slug: l.slug,
        lessonNo: l.lessonNo,
        title: l.title,
        order: l.order,
      });
      lessonsByModule.set(key, arr);
    }

    return {
      id: course._id,
      slug: course.slug,
      title: course.title,
      stage: course.stage,
      version: course.version,
      createdAt: course.createdAt,
      modules: modules.map((m) => ({
        id: m._id,
        title: m.title,
        order: m.order,
        lessons: (lessonsByModule.get(m._id) ?? []).sort(
          (a, b) => a.order - b.order,
        ),
      })),
    };
  },
});

export const getLessonPack = query({
  args: {
    courseSlug: v.string(),
    stage: v.union(v.literal("draft"), v.literal("published")),
    lessonSlug: v.string(),
  },
  handler: async (ctx, args) => {
    const courseRows = await ctx.db
      .query("siteCourses")
      .withIndex("by_slug_stage", (q) =>
        q.eq("slug", args.courseSlug).eq("stage", args.stage),
      )
      .order("desc")
      .take(1);

    const course = courseRows[0];
    if (!course) return null;

    const lesson = await ctx.db
      .query("siteCourseLessons")
      .withIndex("by_course_slug", (q) =>
        q.eq("courseId", course._id).eq("slug", args.lessonSlug),
      )
      .first();

    if (!lesson) return null;

    const pack = await ctx.db
      .query("siteLessonPacks")
      .withIndex("by_lesson", (q) => q.eq("lessonId", lesson._id))
      .first();

    return {
      course: {
        id: course._id,
        slug: course.slug,
        title: course.title,
        stage: course.stage,
        version: course.version,
      },
      lesson: {
        id: lesson._id,
        slug: lesson.slug,
        lessonNo: lesson.lessonNo,
        title: lesson.title,
      },
      pack: pack
        ? {
            objectiveMd: pack.objectiveMd,
            conceptsMd: pack.conceptsMd,
            lessonTextMd: pack.lessonTextMd,
            slidesMd: pack.slidesMd,
            quizMd: pack.quizMd,
            homeworkMd: pack.homeworkMd,
            rubricMd: pack.rubricMd,
            remotionMd: pack.remotionMd,
          }
        : null,
    };
  },
});
