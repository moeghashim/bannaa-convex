import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const subscribe = mutation({
  args: {
    email: v.string(),
  },
  handler: async (ctx, args) => {
    const email = args.email.trim().toLowerCase();

    const existing = await ctx.db
      .query("leads")
      .withIndex("by_email", (q) => q.eq("email", email))
      .first();

    if (existing) {
      return { id: existing._id, alreadySubscribed: true };
    }

    const id = await ctx.db.insert("leads", {
      email,
      createdAt: Date.now(),
    });

    return { id, alreadySubscribed: false };
  },
});
