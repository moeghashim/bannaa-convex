import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

function requireInternalKey(args: { internalKey: string }) {
  const expected = process.env.INTERNAL_API_KEY;
  if (!expected) throw new Error("Missing INTERNAL_API_KEY in Convex env");
  if (args.internalKey !== expected) throw new Error("Unauthorized");
}

export const getByEmail = query({
  args: { email: v.string(), internalKey: v.string() },
  handler: async (ctx, args) => {
    requireInternalKey(args);
    const email = args.email.trim().toLowerCase();

    const user = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", email))
      .first();

    return {
      email,
      plan: (user as any)?.plan ?? "free",
    } as { email: string; plan: "free" | "paid" };
  },
});

export const setPlan = mutation({
  args: {
    email: v.string(),
    plan: v.union(v.literal("free"), v.literal("paid")),
    internalKey: v.string(),
  },
  handler: async (ctx, args) => {
    requireInternalKey(args);
    const email = args.email.trim().toLowerCase();

    const existing = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", email))
      .first();

    if (!existing) {
      await ctx.db.insert("users", {
        email,
        name: undefined,
        image: undefined,
        emailVerified: undefined,
        legacyId: undefined,
        passwordHash: undefined,
        plan: args.plan,
      } as any);
    } else {
      await ctx.db.patch(existing._id, {
        plan: args.plan,
      } as any);
    }

    return { email, plan: args.plan };
  },
});
