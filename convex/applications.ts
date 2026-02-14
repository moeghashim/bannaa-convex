import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const create = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    githubUrl: v.optional(v.string()),
    linkedinUrl: v.optional(v.string()),
    experienceLevel: v.string(),
    motivation: v.string(),
  },
  handler: async (ctx, args) => {
    const email = args.email.trim().toLowerCase();

    const id = await ctx.db.insert("applications", {
      name: args.name.trim(),
      email,
      githubUrl: args.githubUrl?.trim() || undefined,
      linkedinUrl: args.linkedinUrl?.trim() || undefined,
      experienceLevel: args.experienceLevel,
      motivation: args.motivation,
      status: "pending",
      createdAt: Date.now(),
      paymentStatus: "pending",
      stripeCustomerId: undefined,
      stripeCheckoutSessionId: undefined,
      stripePaymentIntentId: undefined,
    });

    return { id };
  },
});
