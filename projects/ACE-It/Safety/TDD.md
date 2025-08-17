# Specification by Tests: LLM‑Driven TDD

Until now we often asked the LLM to produce the final result right away: write the code, assemble the screen, wire the API. There is another, equally valid way to build with an LLM: express the requirement as checks first and only then implement. Using tests as the specification gives a concrete, objective definition of done and keeps the assistant from guessing.

Test‑driven development (TDD) is exactly that discipline. A small, precise expectation is written as a test; the minimum code is created to satisfy it; the code is then cleaned up without changing behaviour. Starting from a failing test turns vague instructions into something measurable, and every discovered issue becomes another test so the fix remains permanent.

---

## Where this approach fits best

* **Well‑defined flows** with observable outcomes (signup, checkout, ticket creation).
* **Adapters & clients** for third‑party APIs (deterministic inputs/outputs, pagination, rate‑limit handling).
* **Business rules & validation** (eligibility, pricing, form rules, content policies).
* **Transformations & utilities** (parsers, normalizers, formatters) that are easy to isolate.
* **Contracts at boundaries**: microfrontend remotes, public component APIs, endpoint tables.
* **Security & safety rules** (authorization boundaries, data redaction) that must never regress.

*Less suitable for open‑ended visual design or rapidly shifting specs until acceptance criteria settle.*

---

## Workflow (docs → failing tests → code → green)

1. **Collect inputs**: product brief, endpoint table, data model, security rules.
2. **Ask LLM for a test plan**: list user stories, edge cases, and negative paths.
3. **Generate executable tests** (start small): unit/contract tests with minimal fixtures and clear pass/fail.
4. **Review & trim**: remove implementation hints; keep behavior‑only assertions.
5. **Run tests** → they fail (by design).
6. **Ask LLM to implement** the minimal code to satisfy the failing tests.
7. **Iterate**: add edge cases; refactor with tests green.
8. **Add acceptance checks** for critical flows (happy path + key errors).
9. **Keep tests as living docs**: when requirements change, update tests first.

---

## Test types (start with a small set)

* **Unit / business‑rule tests**: pure functions; no network or database.
* **Contract tests for API clients**: verify request shape, headers, pagination, 429 handling; run against a local mock.
* **Component/contract tests for microfrontends**: mount public exports; check props/events only.
* **Integration tests (thin)**: a narrow slice through adapter → service → response; fast and deterministic.
* **Acceptance/E2E (very few)**: smoke the critical user paths with stable selectors/test IDs.

---

## Prompt templates

**Generate a test plan from docs**

```text
Context: <paste product brief, endpoint table, data rules>.
Task: Propose a minimal test plan that defines behavior without prescribing implementation. Cover: happy paths, edge cases, negative cases, and security/authorization rules. Output a numbered list with short titles and expected outcomes.
```

**Produce executable unit tests**

```text
From tests #1–#3 in the plan, generate executable unit tests in <framework>. Use small, explicit fixtures. No network or file I/O. Assert behavior only. If a rule depends on time/randomness, inject a clock/seed.
```

**Contract tests for a third‑party API client**

```text
Given the official API spec <link or excerpt>, generate contract tests that:
- build requests with exact paths/methods/headers/fields,
- verify pagination and rate‑limit handling (429 backoff once max),
- forbid unknown fields. Use a local mock server with canned responses.
```

**Microfrontend remote contract**

```text
For remote "profile/Widget": write tests that mount the exposed component and verify props/events only. Do not import internal files. Fail if undocumented props are used. Provide a minimal host stub.
```

**Implement to pass tests**

```text
Write the minimal code to make these tests pass. Do not change tests. If a test is ambiguous, propose a clearer assertion. Keep functions small; no side effects outside specified adapters.
```

**Extend with acceptance checks**

```text
Generate 2–3 acceptance tests for the primary user flow. Use stable selectors/test IDs. Mock network at the boundary adapter. Keep each test under 2 seconds.
```


## Review checklist for LLM‑written tests

* Does each test state **behavior**, not implementation details?
* Are selectors/IDs **stable** and tied to public contracts?
* Are there clear **negative tests** (forbidden actions, validation failures)?
* Are network calls **mocked** with official spec shapes only?
* Is flakiness minimized (no sleeps; use events/awaits; fixed seeds)?


## Summary

Treat tests as the contract. Let the LLM draft the tests from your documentation, then implement to make them pass. Start with a few unit/contract checks, keep acceptance tests minimal, and require exact API shapes to avoid hallucinations. This keeps behavior explicit, enables parallel work, and provides reliable guardrails as the product evolves.
