# Tool & Function Calling

---

## 1. Purpose & Scope

Tool/function calling lets a language model **ask an external system to do something** (look up data, perform a calculation, fetch a document, create a record) and then use the result to complete the task. This article focuses on **when it is useful** and **how it appears in real product flows**.

---

## 2. Core idea (when function calling is needed)

In simple terms, use function calling when the model must **leave the text world** and interact with **real systems or fresh data**. Typical needs:

* **Facts the model does not know**: current prices, inventory, weather, user‑specific records.
* **Deterministic operations**: exact math, currency conversion, date arithmetic, validation.
* **Private or structured data**: database lookups by ID, searching a company knowledge base, retrieving a policy page.
* **Actions**: create a support ticket, send a Slack message, schedule a calendar event, update a CRM field.
* **Long artifacts**: fetch a URL or file, then extract a small, relevant piece for the answer.
* **Multi‑step tasks**: call one tool, read its result, decide the next call, and so on (within limits).

If a response can be produced **purely from the provided text**, there is no need to call a tool. If the task requires **fresh, exact, or user‑specific** information—or must **change something in a system**—a tool call is appropriate.

---

## 3. The calling flow

1. **Decide** whether a tool is needed for the current request.
2. **Select** the appropriate tool from an allow‑listed catalog.
3. **Build arguments** from the current context (IDs, dates, query terms).
4. **Invoke** the tool and receive a structured result.
5. **Incorporate** that result into the final answer or choose the next step.

---

## 4. Common product patterns

Below are practical, composable patterns. For each, example functions illustrate what the model would call.

### 4.1 Retrieval‑Augmented Answering (search → cite → answer)

**When to use**: factual Q\&A that must reference company content or the web.

**Example functions**

```yaml
search_docs(query: string) -> { hits: [ {id, title, snippet, url} ] }
get_doc(id: string) -> { id, title, content }
```

**Flow**: model calls `search_docs` to find passages, optionally fetches full text via `get_doc`, then answers **using only retrieved content**, including citations.

---

### 4.2 Database lookup for user‑specific answers

**When to use**: personalized status, entitlements, account or order details.

**Example functions**

```yaml
get_user(id: string) -> { id, plan, locale }
get_orders(user_id: string, limit: number) -> { orders: [ {id, status, total} ] }
```

**Flow**: parse the request to identify the user, call `get_user`, then `get_orders` if needed, and synthesize the answer from these records.

---

### 4.3 Deterministic computation

**When to use**: calculations that must be exact and auditable.

**Example functions**

```yaml
convert_currency(amount: number, from: string, to: string, date?: ISODate) -> { amount, rate, date }
add_business_days(date: ISODate, days: number, region: string) -> { date }
```

**Flow**: extract parameters from the text, call the function, and present the computed result with a short explanation.

---

### 4.4 Ticketing and workflow actions

**When to use**: create or update records as part of a support or ops flow.

**Example functions**

```yaml
create_ticket(title: string, body: string, priority: enum[low,med,high]) -> { id, url }
update_ticket(id: string, fields: object) -> { id, status }
notify_slack(channel: string, text: string) -> { ts }
```

**Flow**: model classifies the issue, drafts a concise ticket, calls `create_ticket`, and optionally posts a summary via `notify_slack`.

---

### 4.5 Document intake and field extraction

**When to use**: invoices, contracts, forms, resumes.

**Example functions**

```yaml
fetch_file(url: string) -> { mime, bytes }
extract_fields(file_bytes: bytes, template: string) -> { fields: object }
```

**Flow**: fetch the file (PDF/image), run a field extractor (template‑driven or model‑assisted), then return a compact JSON with the required fields.

---

### 4.6 Screenshot or UI understanding

**When to use**: explain an error screen, locate a control, or map UI state to a next step.

**Example functions**

```yaml
analyze_screenshot(image_bytes: bytes) -> { text: string, elements: [ {role, label, bbox} ] }
open_doc(slug: string) -> { title, url }
```

**Flow**: analyze the screenshot, identify the visible error or element, and link to the right runbook or help page via `open_doc`.

---

### 4.7 Calendar, reminders, and scheduling

**When to use**: propose times, set reminders, coordinate small tasks.

**Example functions**

```yaml
find_slots(attendees: [email], duration_min: number, range: {start, end}) -> { slots: [ISODate] }
create_event(title: string, start: ISODate, end: ISODate, attendees: [email]) -> { id, url }
```

**Flow**: extract participants and constraints, offer 2–3 slots, then create the event once a choice is confirmed.

---

### 4.8 Research assistants (competitor, market, lead)

**When to use**: collect small facts from multiple sources and summarize.

**Example functions**

```yaml
web_search(query: string) -> { hits: [ {title, url, snippet} ] }
fetch_url(url: string) -> { title, text }
extract_company_snapshot(text: string) -> { name, country, products: [string], pricing?: string }
```

**Flow**: search, fetch 2–3 sources, extract a compact snapshot, and present a short, cited summary.

---

## 5. End‑to‑end mini‑scenarios

* **Support triage**: classify the ticket → call `create_ticket` with a clean title and reason → if priority is high, call `notify_slack` to alert the channel.
* **Competitor brief**: `web_search` for the brand → `fetch_url` top sources → extract fields → compile a 5‑bullet brief with citations.
* **Order status checker**: parse order ID → `get_orders` → answer with status and expected date → if missing, offer to create a follow‑up ticket.
* **Invoice intake**: `fetch_file` → `extract_fields` → return normalized JSON → if totals mismatch, add a clear discrepancy note.

---

## 6. Summary

Function calling is the bridge between a model’s language skills and the **systems where work happens**. It becomes relevant whenever answers depend on fresh facts, private records, exact computations, or real actions like creating tickets and events. Product patterns can be assembled from a small set of clear functions—search, fetch, compute, look up, and act—so that results stay grounded, concise, and useful.
