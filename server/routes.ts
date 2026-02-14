import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertLeadSchema, insertApplicationSchema } from "@shared/schema";
import { ZodError } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  app.post("/api/leads", async (req, res) => {
    try {
      const data = insertLeadSchema.parse(req.body);
      const lead = await storage.createLead(data);
      res.status(201).json(lead);
    } catch (e) {
      if (e instanceof ZodError) {
        res.status(400).json(e);
      } else {
        // Handle unique constraint violation (duplicate email)
        if ((e as any).code === '23505') {
             res.status(409).json({ message: "Email already subscribed" });
        } else {
             res.status(500).json({ message: "Failed to subscribe" });
        }
      }
    }
  });

  app.post("/api/applications", async (req, res) => {
    try {
      const data = insertApplicationSchema.parse(req.body);
      const application = await storage.createApplication(data);
      res.status(201).json(application);
    } catch (e) {
      if (e instanceof ZodError) {
        res.status(400).json(e);
      } else {
        res.status(500).json({ message: "Failed to submit application" });
      }
    }
  });

  app.get("/api/leads", async (_req, res) => {
    try {
      const leads = await storage.getLeads();
      res.json(leads);
    } catch (e) {
      res.status(500).json({ message: "Failed to fetch leads" });
    }
  });

  app.get("/api/applications", async (_req, res) => {
    try {
      const applications = await storage.getApplications();
      res.json(applications);
    } catch (e) {
      res.status(500).json({ message: "Failed to fetch applications" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
