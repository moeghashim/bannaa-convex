import { v } from "convex/values";
import { query } from "./_generated/server";

export const listPublic = query({
  args: {},
  handler: async (ctx) => {
    const curricula = await ctx.db.query("curricula").order("asc").collect();
    return curricula.map((c) => ({
      id: c._id,
      slug: c.slug,
      title: c.title,
      description: c.description,
      status: c.status,
      imageUrl: c.imageUrl,
      order: c.order,
      isFree: c.isFree,
    }));
  },
});

export const getBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    const curriculum = await ctx.db
      .query("curricula")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .first();
    if (!curriculum) return null;

    const modules = await ctx.db
      .query("curriculumModules")
      .withIndex("by_curriculum", (q) => q.eq("curriculumId", curriculum._id))
      .order("asc")
      .collect();

    const moduleIds = modules.map((m) => m._id);

    // Fetch lessons per module (simple N+1 to keep schema straightforward for now)
    const lessonsByModule: Record<string, any[]> = {};
    for (const moduleId of moduleIds) {
      const lessons = await ctx.db
        .query("curriculumLessons")
        .withIndex("by_module", (q) => q.eq("moduleId", moduleId))
        .order("asc")
        .collect();
      lessonsByModule[moduleId] = lessons;
    }

    return {
      id: curriculum._id,
      slug: curriculum.slug,
      title: curriculum.title,
      description: curriculum.description,
      status: curriculum.status,
      imageUrl: curriculum.imageUrl,
      order: curriculum.order,
      isFree: curriculum.isFree,
      modules: modules.map((m) => ({
        id: m._id,
        title: m.title,
        order: m.order,
        lessons: (lessonsByModule[m._id] ?? []).map((l) => ({
          id: l._id,
          title: l.title,
          type: l.type,
          url: l.url,
          order: l.order,
        })),
      })),
    };
  },
});
