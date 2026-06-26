---
title: "Nexrena Platform — Full-Stack Agency Operations System"
description: "Custom CRM, project management, invoicing, and client API platform on Next.js, Express, and PostgreSQL — one owned system replacing a stack of SaaS tools."
projectId: nexrena-platform
industry: "Agency / Internal Platform"
year: "2024–Present"
role: "Lead engineer — sole builder and operator of the platform"
stack: ["Next.js", "Node.js", "PostgreSQL", "TypeScript", "Prisma"]
liveUrl: "https://www.nexrena.com"
metrics:
  - value: "1"
    label: "Unified ops system"
  - value: "5+"
    label: "SaaS tools replaced"
  - value: "CRM"
    label: "PM · invoicing · APIs"
  - value: "Live"
    label: "Daily production use"
pubDate: 2026-06-05
ogImage: "/Nexrena.png"
---

Nexrena is my client studio for B2B web design and SEO. Running it on scattered SaaS subscriptions — CRM here, invoicing there, project tracking in a third tool — created friction on every client handoff. I built a single platform to own the full delivery loop.

## The problem

Agency operations were spread across:

- CRM and lead tracking in one product.
- Project management and task status in another.
- Invoicing, subscriptions, and payment follow-up in a third.
- Client communication and file handoffs in ad hoc channels.

Every new client meant context switching across tools, manual reconciliation, and no single source of truth for delivery status.

## My role

I am the sole engineer — I designed, built, and operate the platform in daily production use.

## What I built

### Next.js client portal and admin UI

- Client-facing views for project status, deliverables, and service upgrades.
- Internal admin for leads, engagements, and delivery tracking.
- Authentication and role separation between client and operator workflows.

### Express API layer

- REST endpoints for CRM records, project milestones, invoicing events, and subscription state.
- Validation and error handling aligned to production client data — not demo fixtures.
- Heroku-deployed backend with Postgres persistence.

### PostgreSQL data model (Prisma)

- Unified schema for contacts, projects, invoices, subscriptions, and service catalog items.
- Relational integrity across entities that previously lived in separate SaaS silos.
- Migration workflow for schema changes without downtime on live client data.

### Integrated client workflows

- Service upgrade paths (pages, SEO, forms, automations) connected to the same project record.
- API integrations for client delivery — intake forms, status updates, and operational dashboards.
- Replaces the need for separate CRM, PM, and billing subscriptions for standard agency operations.

## Outcomes

| Result | Detail |
|--------|--------|
| Tool consolidation | CRM, PM, invoicing, and client portal in one system |
| Daily use | Platform runs live client delivery today |
| Cost | Eliminated multiple SaaS seats for core ops |
| Extensibility | New service types added as schema + UI modules, not new vendors |

This is the same engineering muscle applied internally that I bring to client migrations and commerce builds — own the data model, ship the API, and keep it running in production.

## What this demonstrates

- Full-stack ownership from schema design through deployed UI.
- Building internal platforms that replace SaaS sprawl — relevant for product engineering and platform teams.
- Shipping and operating software you depend on daily, not portfolio-only demos.
