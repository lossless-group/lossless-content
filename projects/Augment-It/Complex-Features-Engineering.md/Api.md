# API Design & Integration



## Introduction

**What an API is:** a contract for how one system asks another for data or actions. In practice, two worlds exist:

* **Third‑party APIs** you consume (payments, auth, calendars). Their contracts, limits, and versions are set by the provider.
* **Your own API** you expose (or a thin BFF). Its shape should follow your screens and jobs, not internal database structure.



## Third‑Party APIs

**Goal:** call a provider safely and only as much as needed.

### A. Quick checklist

* **Prove the method exists.** Point the LLM to the official docs/SDK. Ask it to list **exact** path, HTTP verb, headers, body fields, version, and expected status codes. No guessing.
* **Confirm limits.** Have the LLM extract the provider’s **rate limits**, pagination rules, and any batch endpoints; include them as comments near the call site.
* **Keep secrets off the client.** Keys live in env/secret manager, not in browser/mobile code. Ask the LLM to wire calls through a tiny server adapter.
* **No secret echoes.** In prompts and code, forbid printing tokens in logs, errors, or UI. Ask the LLM to redact common patterns.
* **DevTools sanity check.** After wiring one action, open Chrome **Network**: ensure exactly **one** POST/PUT per user action; no duplicates on re‑renders; payloads are minimal; no secrets in URLs/headers.
* **Adapter first.** Wrap vendor quirks in **one** backend function so the rest of the app calls a stable interface.

### B. Handy prompts for the LLM

**“Verify and summarize the endpoint”**

```text
Here is the official doc/SDK link or excerpt: <link or pasted text>.
List only the endpoints we can use to achieve <goal>. For each, give: method, path, required headers, required/optional fields with types, versioning notes, sample 200/4xx bodies, rate limits. If anything is unclear, say "unknown".
```

**“Generate a minimal server adapter”**

```text
Produce a Typescript/Node function `getOrderStatus(orderId)` using the official endpoint above. Read the API key from process.env. Validate inputs, handle 429 with a short backoff once, and return a small object {id,status,updatedAt}. No secrets in logs.
```

**“DevTools checklist for this screen”**

```text
Given the flow <describe>, list what should appear in Chrome Network for a single click: expected URL(s), method(s), count, and payload sizes. Include what would indicate a bug (double calls, 4xx loops, secrets in query).
```

---

## Custom API

**Goal:** expose the smallest interface that serves the UI/jobs well.

### A. Quick checklist

* **Start from jobs.** One GET to render a screen, one POST/PATCH to submit a form. Long work → a **job** resource with status.
* **Three connections only.** REST for screens/forms; **SSE/WebSockets** for live updates; **Webhooks** for cross‑system notifications.
* **Explicit contracts.** Stable field names, clear status codes, predictable IDs; keep responses compact.
* **Files via links.** Use pre‑signed URLs; store only metadata in JSON.
* **Errors with IDs.** Return typed error JSON and a request/correlation ID.

### B. Handy prompts for the LLM

**“Draft the endpoint table from screens”**

```text
Screens: <list>. Propose an endpoint table with: Method, Path, Purpose, Required fields, Example request/response, Error cases. Keep it small and page‑oriented.
```

**“Make a tiny spec + examples”**

```text
From the table, generate a minimal OpenAPI or plain Markdown spec plus curl examples. Include one failing case per endpoint with the exact error body we will return.
```

**“Suggest SSE/Webhook shapes”**

```text
For <long task>, design: (a) SSE event names and small data fields, and (b) a webhook payload for state changes. Keep both concise and versionable.
```

### Pro Tip

Before writing any code with an LLM: begin by defining the contract and documentation. Have it propose an endpoint table (methods/paths), request/response schemas, error shapes with stable codes, pagination and ID rules, and 2–3 canonical examples (success and failure). Review and edit this mini‑spec, make it the source of truth, and only then generate server stubs and client calls. In short: code follows the contract, not the other way around.



### Ready‑made Services & Functions

To accelerate delivery, this project includes **prebuilt, reusable functions and services for API work**—connectivity, validation, authorization, and structured parsing. Use them as‑is or extend them for your domain. Detailed specifications below:

* **[API Connector Service](./shared-services/apiConnectorService.md)**: Complete specification for AI model API connectivity, health monitoring, and intelligent routing
* **[API Request Validator](./shared-services/apiRequestValidator.md)**: Comprehensive validation service for security, performance, and compliance
* **[User Authorization Service](./shared-services/userAuthorizationService.md)**: Authentication and authorization framework
* **[YAML Parser Service](./shared-services/yamlParser.md)**: Specialized YAML processing for configuration and data
* **[JSON Parser Service](./shared-services/jsonParser.md)**: High-performance JSON processing and validation
* **[Flavored Markdown Parser](./shared-services/flavoredMarkdownParser.md)**: Extended markdown processing with AI-specific features


## Summary

There are two worlds: **third‑party APIs** (prove the method exists, respect limits, protect secrets, and confirm there are no extra calls in the Network tab) and **your own API** (start from screens/jobs, keep it to REST + SSE/Webhooks, and make contracts explicit before writing code). When an LLM helps, feed it the official docs, require exact paths/fields, and ask for adapters and runnable examples rather than guesses.

On top of this, the project ships **ready‑made, reusable services and functions** that work **out of the box** and cover the core API tasks—**connectivity & routing, request validation, authorization, and structured parsing** (YAML/JSON/Flavored Markdown). Use them immediately to integrate faster and with fewer bugs, and extend them only when your domain needs more detail.


