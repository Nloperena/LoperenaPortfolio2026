# Portfolio Next.js Version

This is a Next.js conversion of the portfolio website, containing only the components currently being used on the main index page.

## Components Included

All components are converted from React Router to Next.js:

- `NewHeader` - Uses Next.js `Link` instead of React Router `Link`
- `NewHero` - Hero section with FaultyTerminal background
- `CredibilityStrip` - Brand ticker marquee
- `TechStackStrip` - Tech stack display
- `AboutMeSection` - About section with CurvedLoop
- `SpecializationsSection` - Specializations grid
- `VITOCaseStudyTeaser` - VITO case study teaser (converted to Next.js Link)
- `SimplifiedCTA` - CTA section
- `FooterV2` - Footer component
- `TestimonialVideosGrid` - Testimonial videos marquee
- `CurvedLoop` - Curved text marquee
- `FaultyTerminal` - WebGL terminal effect
- `GradualBlur` - Blur effect component
- `ServicesDrawer` - Services drawer modal

## Key Conversions

1. **React Router → Next.js**: All `Link` components from `react-router-dom` converted to Next.js `Link` from `next/link`
2. **DynamicMetaTags → Metadata API**: Replaced `DynamicMetaTags` with Next.js metadata API in `layout.tsx` and `page.tsx`
3. **useLocation**: Removed `useLocation` from NewHeader (not needed in Next.js for home page)

## Installation

```bash
cd portfolio-nextjs
npm install
npm run dev
```

## Structure

- `app/` - Next.js App Router directory
  - `layout.tsx` - Root layout with metadata
  - `page.tsx` - Main index page
  - `globals.css` - Global styles
- `components/` - All React components (copied from src/components)

