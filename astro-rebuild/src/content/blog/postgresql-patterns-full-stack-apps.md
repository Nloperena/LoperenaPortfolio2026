---
title: "PostgreSQL Patterns for Full-Stack Apps in Production"
description: "Schema design, indexing, and API patterns I use with PostgreSQL, Node.js, and Next.js for reliable production applications."
pubDate: 2026-05-13
tags: ["PostgreSQL", "Node.js", "TypeScript", "API", "Database"]
ogImage: "/blog/blog-postgresql.png"
---

PostgreSQL is the default database on most of my projects—from a custom CRM at Nexrena to contact intake on this portfolio. It’s boring in the best way: strong consistency, mature tooling, and a query planner that rewards thoughtful indexing.

These patterns keep apps fast and operable after launch.

## Schema design: optimize for queries, not diagrams

Start from access patterns:

- **What lists do users paginate?** Add composite indexes matching `WHERE` + `ORDER BY`.
- **What must be unique?** Enforce with constraints, not application checks alone.
- **What is append-only?** Consider separate tables for events/audit logs.

Use `uuid` or `bigint` for public IDs depending on exposure; never leak sequential internal IDs in public APIs unless intentional.

## Migrations are part of the product

Treat migrations like code review items:

1. Backward-compatible steps for zero-downtime deploys when possible.
2. Index creation with `CONCURRENTLY` on large tables in production.
3. Seed scripts only for dev/test—never fake production data patterns.

On Vercel + serverless Postgres, keep connection pooling in mind (PgBouncer or the provider’s pooler).

## API layer patterns with Node/Express or Next.js route handlers

**Thin handlers, fat services.** Route files validate input and call service functions that own transactions.

```typescript
// Good: one transaction per business action
await db.query('BEGIN');
try {
  await insertSubmission(data);
  await enqueueNotification(data.id);
  await db.query('COMMIT');
} catch (e) {
  await db.query('ROLLBACK');
  throw e;
}
```

Avoid N+1 queries in list endpoints—use joins or batched loaders (`WHERE id = ANY($1)`).

## Indexing checklist

| Symptom | Likely fix |
| --- | --- |
| Slow filtered lists | Composite index on filter + sort columns |
| Slow text search | `tsvector` + GIN, or dedicated search (Meilisearch, etc.) |
| Lock contention | Shorter transactions; avoid `SELECT FOR UPDATE` without need |
| Table bloat | Autovacuum tuning; archive old rows |

Run `EXPLAIN (ANALYZE, BUFFERS)` on production-shaped data—not empty dev tables.

## Observability

Log slow queries above a threshold. Track:

- Connection pool saturation
- Deadlocks and serialization failures
- Migration duration in CI

Alerts on error rate beats guessing from average latency alone.

## When to reach for extras

- **Read replicas** when reporting hammers the primary.
- **Materialized views** for dashboards with tolerable staleness.
- **Row-level security** when multi-tenant isolation must live in the database.

## Wrapping up

PostgreSQL rewards discipline: clear schemas, indexed access paths, and transactions that match business boundaries. That’s how full-stack apps stay fast under real load—not by swapping databases every quarter.

Explore [my experience](/about#experience) or [recent projects](/work) for examples in production.
