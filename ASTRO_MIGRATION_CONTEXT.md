# Astro Migration Context: Loperena Portfolio 2026

## 🎯 Overview
This document provides the full context, aesthetic guidelines, and technical requirements for rebuilding the Loperena Portfolio using **Astro**. The current version is built with Next.js (App Router), but the goal is a smaller, faster, and more optimized version that prioritizes **smaller/shorter desktop displays** and **mobile devices**.

---

## 🎨 Aesthetic & Brand Identity
- **Vibe**: "Modern, trustworthy residential investing guidance: light, open, and honest." / "Atelier" / "Techno-Archival".
- **Visual Metaphor**: The "3D Book Container" – the website looks like a broadsheet paper or an open book lying on a desk.
- **Key Elements**:
  - **Paper Texture**: Subtle grain (`public/paper-texture.png`).
  - **Color Palette**:
    - **Parchment/Background**: `#F2F0E6`, `#F8F4F0`
    - **Oxblood/Heritage Maroon**: `#800000`, `#49111C`
    - **Antique Gold/Terracotta**: `#8C7A5E`, `#E2725B`
    - **Hunter Green**: `#0A1F1C`
    - **Burnt Sienna/Copper**: `#B87333`
  - **Typography**: 
    - Sans: `Satoshi`
    - Serif: `Playfair Display`, `EB Garamond`
    - Mono: `JetBrains Mono`
  - **Ornamentation**: Ornamental dividers, custom cursors, and broadsheet-style gutter (vertical spine).

---

## 🛠 Technical Stack (Current)
- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion (used for reveal effects, scroll animations)
- **Icons/Graphics**: Lucide React, custom SVGs
- **Deployment**: Vercel (planned)

---

## 🚀 Astro Rebuild Goals
1. **Vertical Optimization**: Shorter desktop displays often feel cramped. Reduce vertical padding and ensure "Hero" sections fit within ~700px height where possible.
2. **Performance**: Leverage Astro's "Islands Architecture" to minimize JavaScript. Only components like `CustomCursor`, `Drawers`, or complex animations should use React/Framer Motion.
3. **Mobile First**: Ensure all layouts stack gracefully and touch targets are optimized.
4. **Code Cleanliness**: Maintain files under 200-300 lines. Avoid duplication.

---

## 📁 Key Files & Components to Migrate

### Components (`/components`)
- `Navbar.tsx`: Heritage style, fixed/sticky navigation.
- `NewHero.tsx`: High-impact value prop ("Digital Architect").
- `StatsBar.tsx`: Rapid credibility (6+ years, 70+ testimonials).
- `TrustBar.tsx`: Logos of brands worked with.
- `AboutMeSection.tsx`: 3-chunk story structure.
- `TechArsenal.tsx`: Tools and specializations.
- `SelectedWorks.tsx`: Project grid (VITO, RuggedRed).
- `AtelierCTA.tsx`: Final conversion point.
- `CustomCursor.tsx`: Client-side interactive element.

### Data (`/data`)
- `blogPosts.ts`: Current content for the blog.

### Assets (`/public`)
- `paper-texture.png`
- `family-crest-illustration.png`
- `RuggedRed.png`, `VITOShop.png` (Project images)

---

## 📐 Optimization Requirements
- **Desktop (Short)**: Use `vh` or `max-h` constraints to prevent sections from being too tall. Avoid massive white space between sections on smaller monitors.
- **Navigation**: Keep the "Broadsheet" container (`max-w-[1600px]`) but ensure it scales down smoothly.
- **Interactivity**: Use Astro's `client:visible` for Framer Motion components to keep the initial load light.

---

## 📝 Current Implementation Details (Next.js)
```tsx
// Example of the "Book" container in app/page.tsx
<div className="max-w-[1600px] mx-auto bg-[#F2F0E6] bg-paper-grain relative shadow-xl">
  <div className="absolute left-1/2 top-0 bottom-0 w-px hidden lg:block" style={{ background: 'linear-gradient(...)' }} />
  <main>
    <Navbar />
    <NewHero />
    {/* ... */}
  </main>
</div>
```

## 🛠 Migration Strategy
1. Initialize Astro with Tailwind and React integrations.
2. Copy `tailwind.config.ts` (keeping the custom palette).
3. Create a `BaseLayout.astro` for the "3D Book" container.
4. Port React components. Many can stay as `.tsx` but used with `client:load` or `client:visible`.
5. Optimize images using Astro's `<Image />` component.

