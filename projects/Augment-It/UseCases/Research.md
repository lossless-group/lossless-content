# Lead Enrichment & Research (Salesforce‑connected)

## 1. Purpose

Sales teams need context: what a company does, size, tech stack, latest news, risks, and people to talk to. Manual research is slow and inconsistent. An enrichment assistant gathers facts from approved sources, normalizes them, and attaches structured, citeable results to the lead/account/opportunity in Salesforce. The goal is faster prep, consistent briefs, and fewer tabs.

---

## 2. Core user stories

* **Enrich a single lead**: “Enrich Lead: Dana Li at ExampleCo — company basics, domain, size, location, recent news.”
* **Company brief for an account**: “Give me a 60‑second brief on Acme Corp: what they do, size, tech signals, recent press; include links.”
* **Competitive context**: “Summarize top three competitors for a prospect with links to recent launches.”
* **Signal watch**: “Alert me if Acme raises funding or posts a relevant job opening.”

---

## 3. Architecture at a glance

* **Assistant app (host)**: chat + actions, auth/session, logging, approvals.
* **Salesforce adapter**: read current records; write back enrichment snapshots to custom fields/objects (read‑first; writes gated).
* **Enrichment tools (function calls)**: domain discovery, company lookup, website metadata fetch, news search, technology signals; all allow‑listed.
* **Evidence store**: compact records of facts with source URLs, timestamps, and confidence scores.
* **Policies**: compliance with site Terms of Service/robots.txt; avoid scraping disallowed sources; minimal PII; redaction in logs.

This can start as a single web app with server‑side adapters and a short‑lived cache.

---

## 4. Data model (minimal)

**Objects**

* `EnrichmentSnapshot__c` (Salesforce custom object) with fields:

  * `TargetType` (Lead/Account/Opportunity)
  * `TargetId`
  * `CompanyName`, `Domain`, `Description`
  * `HeadcountRange`, `HQ_City`, `HQ_Country`
  * `TechSignals` (JSON)
  * `News` (JSON array of {title,url,publishedAt})
  * `Confidence` (0..1)
  * `EvidenceCount`
  * `CreatedAt`
* `EnrichmentEvidence__c` (child): `{ SnapshotId, Field, Value, SourceURL, RetrievedAt }`

**Idempotency**

* Key on `(TargetId, SourceURL, Field)`; ignore duplicates; keep latest timestamp.

---

## 5. Tooling (function‑calling surface)

Keep the surface small and auditable; block ad‑hoc fetches.

```yaml
resolve_domain:
  description: Given a company name or email domain, return canonical domain and basic metadata.
  args: { name?: string, email_domain?: string }

company_lookup:
  description: Fetch company profile from an approved provider by domain.
  args: { domain: string }

fetch_website_meta:
  description: Retrieve title/meta/faq/about content from the homepage and /about.
  args: { url: string }

search_news:
  description: Find recent articles about the company; return top N with titles, URLs, dates.
  args: { query: string, since?: string, limit?: number }

detect_tech_stack:
  description: Identify front‑end/back‑end/CDN/analytics hints from headers and public assets.
  args: { url: string }

sf_write_enrichment:
  description: Write a structured snapshot to Salesforce custom object; attach evidence links.
  args: { target_type: string, target_id: string, snapshot: object, evidence: object[] }
```

Use the **Salesforce adapter** to enforce Field‑Level Security and tenant scoping. Writes are only via `sf_write_enrichment` after human confirmation.

---

## 6. Flow patterns

**On‑demand (single record)**

1. Read lead/account from Salesforce.
2. Resolve domain from name/email.
3. Pull company profile and website metadata; run tech detection.
4. Search for recent news.
5. Merge fields; score confidence; present a preview with citations.
6. On confirm, write snapshot + evidence to Salesforce.

**Batch enrichment**

* Take a list (report view); process in small batches with rate‑limit backoff; write snapshots; mark success/failure per record.

**Research brief**

* Compose a short, citeable brief from snapshot + evidence: mission, size, tech hints, latest news; include links for verification.

**Signals & alerts**

* Keep a lightweight watcher for domains; when funding/news matches filters, post a summary and link it to owners.

---

## 7. Prompting patterns (grounded, no guessing)

**System rules (excerpt)**

```text
Answer only with facts from allowed tools. Include short citations (domain or source name + URL). If you cannot corroborate a claim with tool output, say you do not have it. Do not guess personal emails or phone numbers. Respect Terms of Service and avoid scraping disallowed sources.
```

**Enrichment run (single lead)**

```text
Target: <Lead/Account with fields>
Goal: Create an enrichment snapshot with: company name, domain, description (1–2 sentences), headcount range, HQ city/country, tech signals (JSON), and 3 recent news items.
Steps: resolve_domain → company_lookup → fetch_website_meta → detect_tech_stack → search_news.
Output: JSON snapshot + list of evidence links; include a confidence score 0..1. If a field is unknown, set null and explain briefly.
```

**Research brief**

```text
Using the snapshot and evidence, write a 6–8 sentence company brief with inline citations (e.g., [1], [2]) that map to the evidence list. Keep neutral tone; no speculation.
```



## Summary

Lead enrichment adds a fast, consistent research layer to Salesforce. Start with read‑first tools and tight prompts that demand citations, present a preview with confidence, and write back only after confirmation. Over time, batch enrichment and alerts keep records current with minimal manual effort, while the evidence store maintains trust in every field the assistant fills.
