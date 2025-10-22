# Top Beton SRL - Design Guidelines

## Design Approach
**Reference-Based Industrial B2B**: Drawing from construction industry leaders like Cemex, HeidelbergCement, and modern industrial websites. Professional, trust-building design with bold visual hierarchy and clear service presentation.

## Color Palette

**Primary Colors:**
- Industrial Green: `150 40% 38%` - Deep, professional construction green (similar to heavy machinery)
- Clean White: `0 0% 100%` - Primary backgrounds and contrast
- Accent Yellow: `45 95% 55%` - CTAs, highlights, important metrics

**Supporting Colors:**
- Charcoal: `0 0% 20%` - Primary text
- Medium Gray: `0 0% 45%` - Secondary text
- Light Gray: `0 0% 96%` - Subtle backgrounds, section dividers

## Typography

**Font Families:**
- Headlines: Inter or Work Sans (700, 800 weights) - strong, industrial feel
- Body: Inter (400, 500, 600) - clean, professional readability

**Scale:**
- Hero H1: text-5xl md:text-7xl font-bold
- Section Headers: text-3xl md:text-5xl font-bold
- Subheadings: text-xl md:text-2xl font-semibold
- Body: text-base md:text-lg
- Small/Meta: text-sm

## Layout System

**Spacing Primitives:** Consistent use of 4, 8, 12, 16, 20, 24, 32 (Tailwind units)
- Section padding: py-16 md:py-24 lg:py-32
- Component spacing: gap-8 md:gap-12
- Inner padding: p-6 md:p-8

**Container Strategy:**
- Full-width sections with max-w-7xl inner containers
- Content max-w-6xl for feature grids
- Text content max-w-prose for readability

## Page Structure & Components

### 1. Header/Navigation
- White background with subtle shadow (sticky)
- Logo left, navigation center, yellow CTA button right
- Mobile: hamburger menu with slide-in drawer
- Include: Home, Services, Projects, About, Contact, Quote CTA

### 2. Hero Section (100vh or 90vh)
**Full-bleed image background** with overlay (dark gradient 40% opacity)
- Large concrete truck/construction site image
- Centered content with:
  - Bold headline (white text)
  - Supporting tagline (text-xl, light opacity white)
  - Dual CTAs: Primary yellow button + outline white button (with backdrop blur)
  - Trust indicators below: "25+ Years Experience | 500+ Projects | ISO Certified"

### 3. Services Grid (3-column on desktop)
- White background
- Grid: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- Each service card:
  - Icon/image placeholder (green background circle)
  - Service name (text-2xl font-bold)
  - Brief description (3-4 lines)
  - Hover: subtle lift effect and green border
- Services: Ready-Mix Concrete, Concrete Pumping, Commercial Projects, Residential Solutions, Infrastructure, Specialized Mixes

### 4. Stats/Numbers Section
- Light gray background (96%)
- 4-column grid on desktop (stack on mobile)
- Large yellow numbers (text-5xl font-bold)
- Labels below in charcoal
- Examples: "1M+ m³ Delivered", "500+ Projects", "25 Years", "50+ Trucks"

### 5. Featured Projects
- White background
- Masonry-style grid or 2-column layout
- Project cards with:
  - Large project image
  - Green overlay on hover with project details
  - Project name, type, volume/scope
- "View All Projects" yellow CTA button

### 6. Why Choose Us / Benefits
- Green background section (industrial green)
- White text
- 2-column layout on desktop:
  - Left: Large headline + supporting paragraph
  - Right: 3-4 benefit points with checkmarks/icons
- Benefits: Quality Assurance, On-Time Delivery, Expert Team, Modern Fleet

### 7. Certifications & Partners
- White background
- Centered heading
- Logo grid of certifications/partner logos (grayscale, hover to color)
- 4-6 logos in a row (responsive)

### 8. Contact/Quote Section
- Light gray background
- 2-column layout:
  - Left: Contact form (Name, Email, Phone, Project Type, Message)
  - Right: Contact information, office hours, location map placeholder
- Yellow submit button
- Form fields: white background, subtle gray border, green focus state

### 9. Footer
- Charcoal background, white text
- 4-column grid on desktop:
  - Column 1: Logo + brief description
  - Column 2: Quick Links (Services, Projects, About)
  - Column 3: Contact Info (phone, email, address)
  - Column 4: Business hours, social media
- Bottom bar: Copyright, Terms, Privacy (small text)

## Component Library

**Buttons:**
- Primary (Yellow): bg-yellow, text-charcoal, px-8 py-4, rounded-lg, font-semibold
- Secondary (Green): bg-green, text-white, same sizing
- Outline (on images): border-2 border-white, text-white, backdrop-blur-md

**Cards:**
- White background, rounded-xl, shadow-lg
- Padding: p-6 md:p-8
- Hover: transform scale-105, increased shadow

**Form Inputs:**
- White background, border gray, rounded-lg
- Focus: green border, ring-2 ring-green/20
- Padding: px-4 py-3

## Images

**Required Images:**
1. **Hero**: Large concrete mixer truck on construction site (full-width, high-quality, industrial setting) - modern truck with Top Beton branding
2. **Services Icons**: 6 simple industrial icons or small images representing each service
3. **Projects**: 4-6 completed project photos (buildings, infrastructure, concrete work)
4. **Team/About**: Optional concrete pouring action shot or team photo
5. **Contact**: Office/facility exterior or location map

**Image Treatment:**
- Hero: 40% dark overlay for text readability
- Project images: Green overlay on hover (30% opacity)
- All images: rounded corners where applicable (rounded-xl)

## Animations

**Minimal, purposeful motion:**
- Scroll-triggered fade-ins for sections (subtle)
- Button hover: slight scale and brightness change
- Card hover: gentle lift (translateY -4px)
- NO complex scroll animations or parallax

## Accessibility & Responsiveness

- Mobile-first approach
- All grids collapse to single column on mobile
- Touch-friendly button sizes (min 44px height)
- ARIA labels for all interactive elements
- Sufficient color contrast (green passes WCAG AA with white)
- Focus states visible and clear (green ring)