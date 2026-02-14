import { query } from "./_generated/server";

export const listLeads = query({
  args: {},
  handler: async (ctx) => {
    const leads = await ctx.db.query("leads").order("desc").take(1000);
    return leads.map((l) => ({
      id: l._id,
      email: l.email,
      createdAt: l.createdAt,
    }));
  },
});

export const listApplications = query({
  args: {},
  handler: async (ctx) => {
    const apps = await ctx.db.query("applications").order("desc").take(1000);
    return apps.map((a) => ({
      id: a._id,
      name: a.name,
      email: a.email,
      githubUrl: a.githubUrl,
      linkedinUrl: a.linkedinUrl,
      experienceLevel: a.experienceLevel,
      motivation: a.motivation,
      status: a.status,
      createdAt: a.createdAt,
    }));
  },
});
