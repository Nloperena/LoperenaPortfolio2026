# AI Recruiting Assistant — Architecture & Operations

Production implementation for **nicoloperena.com** — evidence-based recruiter chat grounded in portfolio data.

---

## 1. Architecture

```
┌──────────────────────────────────────────────────────────────────┐
│  RecruitingAssistant.tsx (FAB + modal on all pages)               │
│  ForRecruitersHub → openRecruitingAssistant()                     │
└────────────────────────────┬─────────────────────────────────────┘
                             │ POST /api/recruiting/chat
                             ▼
┌──────────────────────────────────────────────────────────────────┐
│  API route (Astro server / Vercel)                                │
│  rateLimit → retrieveChunks → assessRoleFit → OpenAI chat        │
│  guardrails → JSON response + citations                           │
└────────────────────────────┬─────────────────────────────────────┘
                             │
         ┌───────────────────┴───────────────────┐
         ▼                                       ▼
┌─────────────────────┐                 ┌─────────────────────┐
│ knowledge/buildChunks│                 │ prompts.ts          │
│ (compile-time TS)    │                 │ system + context    │
│ experience, projects │                 │ fit instructions    │
│ hiring, FAQs, recs   │                 └─────────────────────┘
└─────────────────────┘
```

**Design critique:** RAG is intentionally **simple keyword retrieval**, not vector search. For ~40 static chunks and a single candidate, embeddings add cost, latency, and ops burden with marginal gain. Upgrade path: OpenAI `text-embedding-3-small` + cosine similarity when chunk count exceeds ~100 or blog content is indexed live.

**Model:** `gpt-4o-mini` default (cost/latency). Set `RECRUITING_ASSISTANT_MODEL=gpt-4o` for higher-stakes demo periods.

**Hosting:** Reuses existing Astro `output: 'server'` + Vercel adapter — no new infrastructure.

---

## 2. Knowledge base structure

| Layer | Source | Chunk IDs (examples) |
|-------|--------|----------------------|
| Profile | `site.ts`, `hiring.ts` | `profile-summary`, `hiring-fit` |
| Experience | `experience.ts` | `experience-forza`, … |
| Projects | `projects.ts` + case studies | `project-forza-built`, … |
| Stack | `stack.ts`, `whatIBring.ts` | `stack-overview`, `what-i-bring` |
| Metrics | `capabilityProof.ts` | `capability-metrics` |
| Recommendations | `linkedinRecommendations.ts` | `rec-randy-bakes`, … |
| Education | `education.ts` | `education-university-of-central-florida` |
| Recruiter FAQ | `knowledge/faqs.ts` | `faq-remote`, `faq-weaknesses`, … |
| Technical depth | `knowledge/faqs.ts` | `tech-react`, `tech-postgresql`, … |

**Sync rule:** When resume, projects, or recommendations change, chunks rebuild automatically at deploy (module import). No separate vector DB to drift.

**Gap list (document honestly in FAQ):** automated testing depth, Kubernetes, mobile native, exact salary, some debugging process details.

---

## 3. Prompt hierarchy

1. **System prompt** (`prompts.ts`) — role, personality, guardrails, output format
2. **Retrieved context** — top 8 chunks formatted with `id`, title, source URL
3. **Precomputed fit signal** — optional `assessRoleFit()` when user describes a role
4. **Conversation history** — last 8 turns
5. **User message** — sanitized, max 2000 chars

Critique: Single system message keeps cost down. Alternative (multi-message system) slightly improves instruction following but doubles token overhead — not worth it at this scale.

---

## 4. Retrieval strategy

- Tokenize query (lowercase, strip stopwords)
- Score chunks: keyword match (+8), title (+4), content (+2), partial keyword (+3)
- Return top 8; fallback to profile + hiring-fit if no hits
- Boost `profile-summary` on “who / about / introduce” queries

**Eval:** `npm run recruiting:eval` — 270+ questions, expects ≥85% retrieval hit rate.

---

## 5. Recruiter conversation flows

| Intent | Example | Primary chunks |
|--------|---------|----------------|
| Overview | “Tell me about Nico” | profile, what-i-bring |
| Fit | “B2B SaaS startup” | hiring-fit + fit engine |
| Project deep-dive | “ForzaBuilt migration” | project-forza-built |
| Verification | “Has he worked remotely?” | faq-remote |
| Reference check | “What do managers say?” | rec-randy-bakes |
| Next step | “Should we interview?” | profile + CTA in prompt |

Flow ends with: resume PDF, case study link, contact modal, or email — never fake scheduling URL.

---

## 6. Technical conversation flows

Technical questions route to `tech-*` chunks + project chunks. Assistant must:

- Describe **production** usage, not tutorial knowledge
- Admit gaps (`faq-testing`, `faq-weaknesses`, `tech-*` notes)
- Avoid claiming expert depth in undocumenteds (K8s, mobile)

---

## 7. Guardrails against hallucination

| Control | Implementation |
|---------|----------------|
| Evidence-only answers | Context injected; system forbids invention |
| Low temperature | `0.35` on chat completion |
| Uncertainty phrases | Logged when detected (`looksUnanswered`) |
| Post-validation | Regex warnings for FAANG/ inflated tenure |
| Rate limit | 20 req/min/IP |
| No API key → hidden UI | `GET /api/recruiting/chat` + `enabled: false` |

Critique: No automated fact-checker against chunk text yet — rely on prompt + low temp. Phase 2: require citation chunk ids in structured output.

---

## 8. Analytics recommendations

Track via existing Vercel Analytics (`track()`):

- `recruiting_assistant_open`
- `recruiting_assistant_message`
- `recruiting_assistant_citation`
- `contact_click` with `source: recruiting_assistant`

**Server logs:** `[recruiting-assistant] unanswered` for gap analysis.

**Phase 2:** Postgres table on Heroku intake backend:

```sql
recruiting_chat_logs (id, created_at, ip_hash, question, unanswered, chunk_ids, fit_level)
```

Weekly review: top unanswered questions → new FAQ chunks or portfolio content.

---

## 9. Testing suite

| Command | Purpose |
|---------|---------|
| `npm run recruiting:eval` | 270+ questions, retrieval accuracy |
| `npm run recruiting:eval:live` | 25 live OpenAI responses (needs `OPENAI_API_KEY`) |

Output: `scripts/recruiting-assistant/test-questions.json` (regenerated each run).

Categories: general, projects, technical, behavioral, fit, career, honesty, interview variants.

---

## 10. Continuous improvement roadmap

| Phase | Work |
|-------|------|
| **Now** | Set `OPENAI_API_KEY` on Vercel; deploy |
| **Week 2** | Index blog markdown chunks; add scheduling URL to `hiring.ts` when ready |
| **Month 1** | Log unanswered questions; add FAQ entries |
| **Month 2** | Optional embeddings; citation-required response schema |
| **Month 3** | A/B starter prompts; recruiter feedback button (“Was this helpful?”) |

**Portfolio improvements driven by assistant gaps:**

- Document testing approach on one case study
- Add “How I work” section (debugging, PR review, CI)
- Publish 2–3 blog posts linked in retrieval
- Add Cal.com/scheduling link when available

---

## Environment

```bash
OPENAI_API_KEY=sk-...
# optional
RECRUITING_ASSISTANT_MODEL=gpt-4o-mini
```

Local dev: copy `.env.example` → `.env` (never commit `.env`).

---

## File map

```
src/lib/recruiting/
  types.ts
  knowledge/buildChunks.ts
  knowledge/faqs.ts
  retrieve.ts
  prompts.ts
  guardrails.ts
  openai.ts
  rateLimit.ts
src/pages/api/recruiting/chat.ts
src/components/RecruitingAssistant.tsx
scripts/recruiting-assistant/eval-retrieval.ts
```
