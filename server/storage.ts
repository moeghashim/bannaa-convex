import { leads, applications, type Lead, type InsertLead, type Application, type InsertApplication } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  createLead(lead: InsertLead): Promise<Lead>;
  createApplication(app: InsertApplication): Promise<Application>;
  getLeads(): Promise<Lead[]>;
  getApplications(): Promise<Application[]>;
}

export class DatabaseStorage implements IStorage {
  async createLead(insertLead: InsertLead): Promise<Lead> {
    const [lead] = await db.insert(leads).values(insertLead).returning();
    return lead;
  }

  async createApplication(insertApp: InsertApplication): Promise<Application> {
    const [app] = await db.insert(applications).values(insertApp).returning();
    return app;
  }

  async getLeads(): Promise<Lead[]> {
    return await db.select().from(leads).orderBy(leads.createdAt);
  }

  async getApplications(): Promise<Application[]> {
    return await db.select().from(applications).orderBy(applications.createdAt);
  }
}

export const storage = new DatabaseStorage();
