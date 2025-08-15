# Internal Knowledge Assistant (Salesforce‑backed)


## 1. Purpose

Many teams need quick answers about customers, deals, and support—without clicking through dozens of Salesforce pages. An internal assistant provides:

* a single chat/search box for “who/what/why/next” questions;
* grounded answers with citations to Salesforce records and internal docs;
* optional action handoffs (draft an email, open a ticket) behind clear confirmation steps.

The goal is faster decisions with less context switching, while keeping data access safe and auditable.


## 2. Core user stories

* **Account snapshot:** “Show a quick brief on Acme Corp: people, open opps, last touch, red flags.”
* **Opportunity status:** “What changed on the Q4 Enterprise renewal since last week? Any risks?”
* **Contact prep:** “Give a 60‑second brief on Dana Li before today’s call. Include last 3 emails and open cases.”
* **Support triage:** “List P1 cases for our top 10 accounts with links and owners.”
* **Compose with facts:** “Draft a renewal follow‑up using key dates and previous objections.”


## 3. Architecture at a glance

* **Assistant app (host):** chat UI, auth/session, identity mapping, logging, and approvals.
* **Salesforce connector (tools):** read‑only first: SOQL query, record fetch by ID, recent changes. Optional write tools later (create task/case, log call).
* **Knowledge retrieval (optional):** embed and search internal docs (playbooks, competitive notes) for context; cite sources.
* **Policy guardrails:** tenant/user scoping, field‑level security (FLS), redaction, and rate‑limit handling.

A minimal implementation can run as a single web app with server‑side adapters and a small cache for recent queries.


## 4. Salesforce integration (read‑first)

### 4.1 Auth & identity

* Use **OAuth 2.0** with a connected app. Start with a **service account** for a proof‑of‑concept; move to **user impersonation** (on‑behalf‑of) to honor FLS/sharing rules.
* Map app users to Salesforce user IDs; store only what is needed (opaque IDs, refresh tokens on the server).

### 4.2 Minimal read tools (function calls)

Define a small, allow‑listed toolkit the assistant may call:

```yaml
salesforce_search:
  description: Full‑text search across Accounts/Contacts/Opportunities/Cases with filters.
  args: { query: string, sobject: enum[Account,Contact,Opportunity,Case], limit: number }

salesforce_soql:
  description: Run a parameterized SOQL query (read‑only). Reject queries touching disallowed objects/fields.
  args: { soql: string }

salesforce_get_record:
  description: Fetch a record by SObject + Id and selected fields.
  args: { sobject: string, id: string, fields: string[] }

salesforce_recent_changes:
  description: List recent field changes for a record (audit‑style).
  args: { sobject: string, id: string, since: string }
```

Keep the surface tiny; block ad‑hoc endpoints. Enforce FLS and sharing in the adapter, not in prompts.

### 4.3 Typical SOQL snippets

```sql
-- Account snapshot
SELECT Id, Name, AccountOwner.Alias, Industry, ARR__c, Health__c, LastActivityDate
FROM Account WHERE Name LIKE 'Acme%'
LIMIT 5;

-- Open opportunities on account
SELECT Id, Name, StageName, Amount, CloseDate, Owner.Alias
FROM Opportunity WHERE AccountId = '001...' AND IsClosed = false
ORDER BY CloseDate ASC LIMIT 10;

-- Recent case risks
SELECT Id, CaseNumber, Priority, Status, Subject, Owner.Alias, LastModifiedDate
FROM Case WHERE AccountId = '001...' AND (Priority = 'High' OR Priority = 'P1')
ORDER BY LastModifiedDate DESC LIMIT 10;
```

Return compact JSON to the model; display links to Salesforce record pages for verification.


## 5. Prompting patterns (make answers grounded)

**System rules (excerpt):**

```text
Act as an internal assistant. Answer only with information retrieved via the allowed tools. If a fact is not present in tool results, say you do not have it. Include short citations: object name and record link. Honor user scope and do not reveal fields not returned by tools.
```

**Account brief template:**

```text
Task: Produce a 6–8 sentence brief for <AccountName>.
Use results from: salesforce_get_record(Account), salesforce_soql(Opportunities/Cases).
Include: owner, ARR/segment, key contacts, open opps (stage, date), open P1 cases, last activity.
Finish with “Watch‑outs” (1–2 bullets) and “Next steps” (1–2 bullets) derived only from tool data.
```

**Change since last week:**

```text
Compare current fields to salesforce_recent_changes(..., since=ISO_DATE).
Summarize what changed (stage/date/amount/owner) in 3–5 sentences. Cite each change with a record link.
```

## 6. UI flow (minimal)

* **One box UX:** natural‑language query; show answer plus **Sources** (Salesforce links) and **Tool log** for transparency.
* **Unsafe actions disabled by default:** start read‑only; later gate writes behind explicit buttons (“Create follow‑up task”).
* **Saved briefs:** allow users to pin an account/opportunity brief and share a link.

## 7. Example end‑to‑end interactions

**A) 60‑second account brief**

1. Assistant parses “Brief on Acme Corp”.
2. Calls `salesforce_search(Account)` → top hit.
3. Calls `salesforce_get_record(Account, fields=[...])`.
4. Calls `salesforce_soql` for open opps and recent P1 cases.
5. Composes a short brief with citations and links.

**B) “What changed since last week?” on an opportunity**

1. User selects opportunity or pastes URL.
2. Assistant calls `salesforce_recent_changes` with last‑week timestamp.
3. Returns a concise change log: stage, amount, owner, date shifts, with links.

**C) Draft a follow‑up email**

1. Assistant gathers opportunity facts + last contact notes.
2. Produces a short email draft; user edits and sends via their email client or logs it as a Salesforce task (optional write tool later).



## 8. Summary

An internal knowledge assistant can turn Salesforce into fast, contextual answers—without bypassing governance. Start read‑only with a tiny set of tools (search, SOQL, get by ID, recent changes), write clear prompts that demand citations, and keep the UI honest with sources and tool logs. Add actions later behind explicit approvals. The result is less tab‑hopping, better prep, and safer, faster decisions.
