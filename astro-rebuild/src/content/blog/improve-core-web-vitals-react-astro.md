---
title: "How to Improve Core Web Vitals on React and Astro Sites"
description: "Practical Core Web Vitals fixes for React and Astro — LCP, INP, and CLS improvements that hold up after launch on Vercel."
pubDate: 2026-05-27
updatedDate: 2026-06-10
audience: engineering
tags: ["Core Web Vitals", "React", "Astro", "Performance", "Vercel"]
ogImage: "/blog/blog-core-web-vitals.png"
---

Google’s Core Web Vitals are still one of the clearest signals that a site is built for real users—not just demos. When I rebuilt [ForzaBuilt.com](https://forzabuilt.com) and [RuggedRed.com](https://ruggedred.com) on React and Astro, performance wasn’t a nice-to-have; it was part of the product.

Here’s what actually moved the needle.

## Start with LCP: the hero and above-the-fold assets

**Largest Contentful Paint (LCP)** usually comes down to one element: a hero image, a headline block, or a large video.

On Astro sites, keep heavy animation libraries out of the server bundle. I load GSAP with a dynamic `import()` inside `useLayoutEffect` so the first paint isn’t blocked by animation code.

For images:

- Serve WebP or AVIF with explicit `width` and `height` to avoid layout shift.
- Preload only the true LCP asset—usually one hero image, not every font and icon.
- Avoid lazy-loading above-the-fold content.

On React/Next.js pages, prefer static generation or streaming for marketing routes. Client-only data fetching on the homepage almost always hurts LCP.

## Fix INP before you add more JavaScript

**Interaction to Next Paint (INP)** replaced FID as the responsiveness metric. The biggest wins I see:

1. **Split event handlers from render work.** Debounce non-critical UI updates; keep click handlers thin.
2. **Reduce main-thread long tasks.** Audit third-party scripts (analytics, chat widgets, A/B tools).
3. **Use `client:visible` or `client:idle` in Astro** for below-the-fold React islands instead of `client:load` everywhere.

If a modal or drawer opens on first interaction, preload its chunk after idle time—not on every page load.

## CLS: reserve space for everything that moves

**Cumulative Layout Shift (CLS)** is often caused by fonts, ads, embeds, and images without dimensions.

Checklist I use on every launch:

- Font display: `swap` with a fallback metrically similar to the final face.
- Skeleton placeholders for async content—not spinners that appear/disappear.
- Fixed aspect-ratio containers for embeds and product media.

## Measure in the field, not just Lighthouse

Lab scores help during development. **Search Console Core Web Vitals** and **Vercel Speed Insights** tell you what real users experience on slow networks and mid-range devices.

Fix URLs with “Poor” status first—even if your homepage looks green in Lighthouse.

## Stack-specific notes

| Stack | Quick win |
| --- | --- |
| Astro | Partial hydration; prerender marketing pages |
| Next.js | Route-level code splitting; optimize `next/image` |
| React SPA | Avoid rendering the entire app before first route |
| Vercel | Edge caching for static assets; sensible `Cache-Control` |

## When to invest deeper

If LCP is still above 2.5s after asset optimization, look at server response time (TTFB), CDN configuration, and database queries on SSR routes. Performance work is iterative—ship improvements weekly rather than waiting for a perfect audit.

---

**Related:** See [selected work](/work) for production sites where these patterns were applied, or [get in touch](/about) if you need help auditing a React or Astro codebase.
