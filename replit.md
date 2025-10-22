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
- Custom color scheme: industrial green primary (hsl 150 40% 38%), white backgrounds, bright yellow accents (hsl 45 95% 55%) for professional B2B construction aesthetic
- Inter font family for consistent typography

**State Management & Data Fetching:**
- React Query (TanStack Query) for server state management
- React Hook Form with Zod validation for form handling
- Custom toast notifications for user feedback

**Key Features:**
- Multi-page application with routes for home, products, equipment, mission/vision/values, career, news, contact, special offers, guarantees, partners, photo gallery, coverage area, and location-specific pages
- Responsive design with mobile-first approach
- Interactive Romania map with service coverage visualization on homepage
- Coverage area section showcasing 24 featured localities with real Romania map image
- Top Beton logo positioned on București with pulsing animation effect
- Map integration using Leaflet for displaying service areas and location
- Image lightbox functionality for photo galleries
- Contact form with validation and toast notifications (placeholder for EmailJS or Formspree integration)

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
- 48 localities served (24 featured on homepage, all 48 on dedicated page)
- Real Romania map image with Top Beton logo marker on București
- Image assets for logos, maps, and certifications stored in attached_assets directory

**Product Catalog:**
- 9 structural concrete classes (C 8/10 to C 40/50) compliant with SR EN 206+A2:2021
- 4 road concrete grades (BcR 3.5 to BcR 5) for infrastructure projects
- 3 cement-stabilized aggregate options (4%, 5%, 6%) for road foundations
- Organized into three distinct categories on products page

**Certifications:**
- IRD CERTIFICARE product certificates: 135P (SR EN 206+A2:2021), 136P (NE 014:2002), 137P (STAS 10473-1:87)
- ISO management system certificates: 382C (ISO 9001:2015 Quality), 383M (ISO 14001:2015 Environmental)
- Certificate images displayed on homepage in dedicated "Calitate certificată" section