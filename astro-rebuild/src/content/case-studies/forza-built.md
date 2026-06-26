---
title: "Forzabuilt — WordPress to Astro B2B Catalog Migration"
description: "How I rebuilt a 200+ SKU industrial adhesives catalog on Astro with layered redirects, structured data, and 99% Lighthouse — driving 28 qualified inbound leads in four months."
projectId: forza-built
industry: "Industrial / B2B Manufacturing"
year: "2025–2026"
role: "Senior full-stack engineer — platform architecture, migration, and SEO-critical release controls"
stack: ["Astro", "React", "TypeScript", "Tailwind", "Vercel"]
liveUrl: "https://forzabuilt.com"
nexrenaUrl: "https://www.nexrena.com/work/forzabuilt"
quote:
  text: "Literally the best single website contact in the history of the company."
  attribution: "Forzabuilt leadership"
metrics:
  - value: "99%"
    label: "Lighthouse desktop"
  - value: "28"
    label: "Qualified inbound (4 mo)"
  - value: "200+"
    label: "SKU catalog migrated"
  - value: "99%"
    label: "Technical SEO health"
pubDate: 2026-06-01
ogImage: "/Forzabuilt.png"
---

Forzabuilt is a B2B industrial adhesives manufacturer serving Florida and the Southeast construction market. When they rebranded and outgrew WordPress, they needed a full platform transition — not a reskin — without the indexing collapse that kills most B2B migrations.

## The problem

The legacy site carried three risks at once:

- **Performance debt** — media-heavy product pages with poor Core Web Vitals on a catalog buyers actually search by specification.
- **URL sprawl** — years of WordPress paths that procurement teams had bookmarked, linked, and indexed.
- **Wrong information architecture** — products organized for marketing, not how adhesive buyers search (application, substrate, compliance).

A failed migration would mean lost organic equity right when the rebrand needed inbound to work.

## My role

I owned front-end architecture and the migration program end to end: Astro with React islands, canonical route design, redirect continuity, structured data, and release validation before cutover.

## What I built

### Migration without the indexing cliff

B2B catalog migrations fail when redirect coverage is an afterthought. I treated URL continuity as a first-class deliverable:

- Canonical route structure replacing legacy WordPress patterns across 200+ product pages.
- Layered redirect rules — middleware plus edge configuration — preserving equity on high-traffic legacy paths.
- Pre-launch crawl/index validation so we could ship the rebrand and platform change in one transition.

### B2B-native catalog architecture

Industrial buyers do not browse hero banners. I restructured IA around procurement intent:

- Category and product pages organized by application, substrate, and specification.
- Product and FAQ schema across the catalog for rich results.
- Downloadable spec paths and comparison-friendly layouts for technical buyers.

### Production-grade performance

On a media-heavy catalog, I sustained **99% Lighthouse desktop** through:

- Selective React hydration (islands) instead of shipping a full SPA.
- Image optimization and edge delivery on Vercel.
- Code splitting so category pages stay fast under real catalog weight.

## Outcomes

| Metric | Result |
|--------|--------|
| Lighthouse desktop | 99% sustained |
| Technical SEO health | 99% post-remediation |
| Qualified inbound | 28 MQL submissions (26 unique contacts) in first four months |
| Baseline | Effectively zero qualified web inbound pre-rebuild |

Leadership credited the rebuild with the **best single website contact in company history** — the kind of inbound that validates both the technical migration and the procurement-focused IA.

## What this demonstrates

- Shipping a full platform transition on a 200+ SKU catalog without the visibility loss common in B2B rebuilds.
- Layered redirect strategy when URL patterns change materially.
- SEO and engineering decisions made as one program — not SEO bolted on after launch.
