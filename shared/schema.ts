import { z } from "zod";

// NOTE: We removed Drizzle/Postgres from this repo.
// These schemas remain as shared validation/types for the UI.

export const insertLeadSchema = z.object({
  email: z.string().email(),
});

export const insertApplicationSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  githubUrl: z.string().url().optional().or(z.literal("")),
  linkedinUrl: z.string().url().optional().or(z.literal("")),
  experienceLevel: z.enum(["beginner", "intermediate", "advanced"]),
  motivation: z.string().min(1),
});

export type InsertLead = z.infer<typeof insertLeadSchema>;
export type InsertApplication = z.infer<typeof insertApplicationSchema>;

// Legacy types for UI usage (kept for minimal refactors)
export type Lead = {
  id: string;
  email: string;
  createdAt: number;
};

export type Application = {
  id: string;
  name: string;
  email: string;
  githubUrl?: string;
  linkedinUrl?: string;
  experienceLevel: string;
  motivation: string;
  status?: string;
  createdAt: number;
};
