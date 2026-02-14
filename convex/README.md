# Convex backend (migration in progress)

This repo was migrated from the previous Postgres/Drizzle backend.

## Current status
- Added initial `convex/schema.ts` mirroring the Postgres tables we care about.
- Next steps:
  1. Configure a Convex project (cloud) and generate `convex/_generated` types.
  2. Implement queries/mutations equivalent to the current Express routes.
  3. Import Postgres data from `migration/database_export.sql`.

## Setup (local)
```bash
npm install
npx convex dev
```

If you want cloud deployments, log in during `npx convex dev` and pick the team/project.
