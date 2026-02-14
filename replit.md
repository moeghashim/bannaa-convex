# Overview

This is a full-stack web application built with React and Express that appears to be a landing page for an educational program called "بنّاء" (Builder). The application allows users to subscribe via email (leads) and submit full applications with their details and experience level. The architecture follows a modern monorepo structure with a Vite-powered React frontend and an Express backend, using PostgreSQL for data persistence through Drizzle ORM.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture

**Problem**: Need a modern, responsive UI with form handling and API communication.

**Solution**: React-based Single Page Application (SPA) with the following key decisions:

- **UI Framework**: Vite + React with TypeScript for fast development and type safety
- **Styling**: Tailwind CSS with custom brutal/neobrutalist design system featuring:
  - Custom color scheme (black/white/acid green)
  - Grid background pattern
  - Brutal shadow effects (box shadows for depth)
  - Custom fonts (Inter, Archivo Black, Cairo, Space Mono, Tajawal)
- **Component Library**: shadcn/ui components (Radix UI primitives) for accessible, customizable UI components
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **Form Handling**: React Hook Form with Zod schema validation for type-safe form validation

**Rationale**: This stack provides a modern developer experience with excellent performance, type safety throughout the application, and a comprehensive component library that reduces custom UI development.

## Backend Architecture

**Problem**: Need a simple REST API to handle lead subscriptions and application submissions.

**Solution**: Express.js server with minimal endpoints:

- **POST /api/leads**: Create email subscription (lead)
- **POST /api/applications**: Submit full application with user details

**Key Decisions**:
- TypeScript for type safety across the stack
- ESM modules throughout (type: "module" in package.json)
- Shared schema validation between client and server via `shared/schema.ts`
- Zod schemas for runtime validation of incoming requests
- Simple storage layer abstraction (`IStorage` interface) for potential future database changes

**Rationale**: Express provides a minimal, flexible foundation. The shared schema approach ensures validation consistency and reduces code duplication.

## Data Storage

**Problem**: Need persistent storage for leads and applications with schema validation.

**Solution**: PostgreSQL database with Drizzle ORM

**Schema Design**:
```
leads table:
  - id (serial primary key)
  - email (text, unique, not null)
  - createdAt (timestamp)

applications table:
  - id (serial primary key)
  - name, email, githubUrl, linkedinUrl (text)
  - experienceLevel (text: beginner/intermediate/advanced)
  - motivation (text)
  - status (text: pending/approved/rejected)
  - createdAt (timestamp)
```

**Key Decisions**:
- Drizzle ORM with PostgreSQL dialect for type-safe database queries
- Neon serverless PostgreSQL driver with WebSocket support
- Schema-first approach using `drizzle-zod` to generate Zod validators from database schema
- Unique constraint on lead emails to prevent duplicate subscriptions

**Rationale**: Drizzle provides excellent TypeScript integration and the schema-first approach ensures database schema and validation logic stay synchronized. Neon provides serverless PostgreSQL which works well in modern hosting environments.

## External Dependencies

### Database
- **Neon Serverless PostgreSQL**: Managed PostgreSQL database with WebSocket support
- Connection via `DATABASE_URL` environment variable
- WebSocket constructor configured for server-side usage

### UI Libraries
- **Radix UI**: Unstyled, accessible component primitives (@radix-ui/react-*)
- **shadcn/ui**: Pre-styled components built on Radix UI
- **Lucide React**: Icon library
- **Tailwind CSS**: Utility-first CSS framework

### Development Tools
- **Vite**: Build tool and dev server
- **Replit Plugins**: 
  - Runtime error modal
  - Cartographer (code navigation)
  - Dev banner
  - Integration with Replit environment

### Form & Validation
- **React Hook Form**: Form state management
- **Zod**: Schema validation
- **@hookform/resolvers**: Zod integration for React Hook Form

### State Management
- **TanStack Query**: Async state management and data fetching

### Fonts
- **Google Fonts**: Archivo Black, Space Mono, Inter, Cairo, Tajawal (Arabic support)

### Hosting Considerations
- Application designed to run on Replit (evidenced by Replit-specific plugins)
- Environment variable `REPL_ID` used to conditionally enable Replit features
- Build process creates static frontend in `dist/public` and bundled backend in `dist/index.js`