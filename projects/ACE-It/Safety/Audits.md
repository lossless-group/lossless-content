# LLM‑Assisted Security Audits & Automation


## 1. Purpose & scope

Security audits are essential for production apps with real users, payments, and sensitive data. Even during MVPs and experiments, it’s easy to leak keys or personal data. This article explains:

* what a pragmatic audit should cover,
* how to run an LLM‑assisted audit using checklists and prompt snippets,
* how to use Lovable’s built‑in audit effectively and interpret its output,
* how to report and follow through on fixes.



## 2. What a pragmatic audit covers

A useful audit inspects, at minimum:

* **Secrets & credentials**: repo, configs, client bundles; exposure and rotation.
* **Dependencies & licenses**: vulnerable versions, transitive risks, license compliance.
* **Data flows**: where sensitive data enters, is stored, and leaves; retention & deletion.
* **AuthN/AuthZ**: session handling, role/tenant boundaries, RLS/policy rules.
* **APIs (consumed & exposed)**: contract mismatches vs. official specs, rate‑limit handling, webhooks verification.
* **Client network behavior**: redundant calls, secrets in URLs/headers, error loops.
* **Config & infra**: environment separation, CORS, egress allow‑lists, storage permissions.
* **Logging & observability**: PII masking, request IDs, actionable error codes.
* **LLM usage (if any)**: prompt injection risk, untrusted content handling, output format controls.



## 3. Prompt addenda (drop‑in snippets)

**Audit charter**

```text
You are performing a security audit for a web app. Use the attached policy and specs. Identify concrete risks only; no hypotheticals. For each finding, include: severity (high/med/low), affected files/paths, why it matters, and a minimal fix. If something is unknown, say "unknown".
```

**Secrets & config scan**

```text
Scan the diff/repo for secrets, tokens, private URLs, or keys in client code. Check logs/error handlers for secret leakage. Propose rotation steps and redaction rules.
```

**API contract check**

```text
Compare implemented API calls to the official spec. Flag endpoints or fields that are not present. Verify rate-limit handling (429), auth headers, webhook signature checks, and pagination rules.
```

**AuthZ boundaries**

```text
Given the data model and policies, verify tenant/role checks for each read/write path. Propose minimal tests that must fail if cross-tenant access occurs.
```

**Client network sanity**

```text
For the <screen/flow>, list the exact network calls that should occur (URL, method, count). Flag duplicate calls from re-renders, 4xx/5xx loops, and secrets in query params.
```

**LLM red‑team**

```text
Attempt prompt injection and data exfiltration against the provided prompts/retrieval examples. Show the attack string and expected safe behavior. Suggest policy or prompt hardening.
```



## 4. Using Lovable’s built‑in audit

Lovable includes a **built‑in security audit** that analyzes the project and returns prioritized advice. Recommended flow:

1. **Run the built‑in audit first** to capture quick wins and high‑signal issues.
2. **Address critical findings** (secrets, auth gaps, public storage) immediately.
3. **Triage and assign owners**; track remediation to closure.
4. **Re‑run after major merges** and before releases.



## 5. Reporting & follow‑through

* **Finding format**: `severity • title • path • why • minimal fix` (single paragraph each).
* **Dashboards**: track open findings, time‑to‑fix, and repeat offenders by domain.
* **Owner mapping**: assign by directory or feature; avoid unowned risks.
* **Post‑fix verification**: re‑run focused checks and keep proof (logs/screenshots) with the ticket.



## 6. Limitations & human review

LLMs accelerate audits but do not replace human judgment. Require sign‑off for destructive or high‑impact changes, validate patches in staging, and revisit policies as the product evolves.



## 7. Summary

Start with the basics: secrets, dependencies, data flows, auth boundaries, APIs, client calls, and logging. Use an LLM to map the surface, verify contracts, and propose minimal fixes. Lovable’s built‑in audit provides a strong first pass; run it regularly and track remediation to keep the product safe as it grows.

All code in this project was authored with a **continuous‑audit** mindset: adapters, prompts, and services are instrumented for tracing, follow least‑privilege defaults, and integrate with the built‑in audit so checks remain effective by default.
