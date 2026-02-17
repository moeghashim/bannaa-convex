import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

// NOTE: This schema mirrors the existing Postgres structure from migration/database_schema.sql
// (tables in public schema). We'll refine types + add indexes once queries are implemented.

export default defineSchema({
  users: defineTable({
    // original: public.user.id (text)
    legacyId: v.optional(v.string()),
    name: v.optional(v.string()),
    email: v.string(),
    emailVerified: v.optional(v.number()), // store as ms epoch
    image: v.optional(v.string()),
    // Avoid storing plaintext passwords in Convex. If still needed, use a hash.
    passwordHash: v.optional(v.string()),
    // SaaS plan
    plan: v.optional(v.union(v.literal("free"), v.literal("paid"))),
  }).index("by_email", ["email"]),

  curricula: defineTable({
    slug: v.string(),
    title: v.string(),
    description: v.string(),
    status: v.union(v.literal("available"), v.literal("coming-soon")),
    imageUrl: v.optional(v.string()),
    order: v.number(),
    isFree: v.boolean(),
  }).index("by_slug", ["slug"]).index("by_order", ["order"]),

  curriculumModules: defineTable({
    curriculumId: v.id("curricula"),
    title: v.string(),
    order: v.number(),
  }).index("by_curriculum", ["curriculumId", "order"]),

  curriculumLessons: defineTable({
    moduleId: v.id("curriculumModules"),
    title: v.string(),
    type: v.union(
      v.literal("video"),
      v.literal("file"),
      v.literal("community"),
      v.literal("text"),
    ),
    url: v.optional(v.string()),
    order: v.number(),
  }).index("by_module", ["moduleId", "order"]),

  courses: defineTable({
    legacyId: v.optional(v.int64()),
    title: v.string(),
    description: v.string(),
    thumbnailUrl: v.optional(v.string()),
    isPublished: v.boolean(),
    createdAt: v.number(),
    updatedAt: v.number(),
  }),

  courseModules: defineTable({
    legacyId: v.optional(v.int64()),
    courseLegacyId: v.int64(),
    title: v.string(),
    description: v.optional(v.string()),
    order: v.int64(),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_courseLegacyId", ["courseLegacyId"]),

  courseContent: defineTable({
    legacyId: v.optional(v.int64()),
    moduleLegacyId: v.int64(),
    title: v.string(),
    type: v.string(),
    contentUrl: v.optional(v.string()),
    content: v.optional(v.string()),
    order: v.int64(),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_moduleLegacyId", ["moduleLegacyId"]),

  leads: defineTable({
    legacyId: v.optional(v.int64()),
    email: v.string(),
    createdAt: v.number(),
  }).index("by_email", ["email"]),

  prompts: defineTable({
    legacyId: v.optional(v.int64()),
    prompt: v.string(),
    tool: v.string(),
    analysis: v.string(),
    category: v.string(),
    createdAt: v.number(),
    imageUrl: v.optional(v.string()),
  }),

  applications: defineTable({
    legacyId: v.optional(v.int64()),
    name: v.string(),
    email: v.string(),
    githubUrl: v.optional(v.string()),
    linkedinUrl: v.optional(v.string()),
    experienceLevel: v.string(),
    motivation: v.string(),
    status: v.string(),
    createdAt: v.number(),
    paymentStatus: v.optional(v.string()),
    stripeCustomerId: v.optional(v.string()),
    stripeCheckoutSessionId: v.optional(v.string()),
    stripePaymentIntentId: v.optional(v.string()),
  }).index("by_email", ["email"]),

  studentEnrollments: defineTable({
    legacyId: v.optional(v.int64()),
    userLegacyId: v.string(),
    courseLegacyId: v.int64(),
    enrolledAt: v.number(),
    completedAt: v.optional(v.number()),
  }).index("by_userLegacyId", ["userLegacyId"]),

  studentProgress: defineTable({
    legacyId: v.optional(v.int64()),
    userLegacyId: v.string(),
    contentLegacyId: v.int64(),
    completed: v.boolean(),
    completedAt: v.optional(v.number()),
  }).index("by_userLegacyId", ["userLegacyId"]),
});
