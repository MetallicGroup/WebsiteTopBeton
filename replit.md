# Top Beton SRL - Concrete Business Website

## Overview

Top Beton SRL is a Romanian concrete production and delivery company website built with React, Express, and TypeScript. The application serves as a marketing and informational platform for a concrete business based in Cornetu, Ilfov, delivering fresh concrete to customers in Ilfov and southern Bucharest. The site features product catalogs, equipment information, company values, news/blog posts, service area coverage, career opportunities, and contact functionality.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Routing:**
- React 18 with TypeScript for type-safe component development
- Wouter for lightweight client-side routing
- Vite as the build tool and development server

**UI Component System:**
- Shadcn/ui component library (New York style) with Radix UI primitives
- Tailwind CSS for styling with custom CSS variables for theming
- Custom color scheme: neutral base with primary (dark blue-gray), accent (amber/gold), and secondary colors
- Inter font family for consistent typography

**State Management & Data Fetching:**
- React Query (TanStack Query) for server state management
- React Hook Form with Zod validation for form handling
- Custom toast notifications for user feedback

**Key Features:**
- Multi-page application with routes for home, products, equipment, mission/vision/values, career, news, contact, special offers, guarantees, partners, photo gallery, coverage area, and location-specific pages
- Responsive design with mobile-first approach
- Map integration using Leaflet for displaying service areas and location
- Image lightbox functionality for photo galleries
- Contact form (placeholder for EmailJS or Formspree integration)

### Backend Architecture

**Server Framework:**
- Express.js with TypeScript running on Node.js
- ESM module system throughout
- Vite integration for development with HMR support
- Static file serving for production builds

**API Structure:**
- RESTful API pattern with `/api` prefix for all endpoints
- Route registration system in `server/routes.ts`
- Centralized error handling and request logging middleware
- JSON request/response format with raw body capture for webhooks

**Storage Layer:**
- Abstract storage interface (`IStorage`) for database operations
- In-memory implementation (`MemStorage`) as default
- Database-agnostic design pattern allowing easy migration to Drizzle ORM with PostgreSQL
- User management methods (get, create, find by username)

### Data Storage Solutions

**Current Implementation:**
- In-memory storage using ES6 Maps for development/testing
- User entity with id, username, and password fields

**Prepared for PostgreSQL:**
- Drizzle ORM configuration ready (`drizzle.config.ts`)
- Schema defined in `shared/schema.ts` using Drizzle syntax
- Neon serverless PostgreSQL adapter configured
- Database schema uses PostgreSQL-specific features (gen_random_uuid)
- Migration system configured to output to `/migrations` directory

**Schema Design:**
- Users table with UUID primary keys
- Zod schema validation for type-safe inserts
- Shared types between frontend and backend

### External Dependencies

**Third-Party Services:**
- Neon Database (@neondatabase/serverless) - Serverless PostgreSQL hosting
- OpenStreetMap with Leaflet - Map display and location visualization
- Placeholder for email service (EmailJS or Formspree) - Contact form submissions

**Key Libraries:**
- Drizzle ORM - Type-safe database queries and migrations
- React Query - Server state caching and synchronization
- Radix UI - Unstyled accessible component primitives
- Zod - Schema validation for forms and API data
- Date-fns - Date formatting and manipulation

**Development Tools:**
- Replit-specific plugins for development (cartographer, dev banner, runtime error overlay)
- TypeScript for full-stack type safety
- ESBuild for production server bundling
- PostCSS with Tailwind and Autoprefixer

**Session Management:**
- Connect-pg-simple configured for PostgreSQL-backed sessions (when database is active)

**Content Management:**
- Static data files for products, guarantees, locations, and blog posts
- Romanian language content throughout the application
- Image placeholder system using Unsplash URLs