---
date_created: 2025-08-15
date_modified: 2025-08-17
---
# Prompt Engineering Essentials

> Essential: [work on prompts](#meta-prompts) with AI, but with a "Product Management role." Once the documentation is all ready, then ask the model to switch roles.  Even better, create a new chat so you have a clean context window

[work on prompts][#6. Let the AI help you write prompts (meta‑prompts)]
## 1. What is a prompt?

A **prompt** is a short brief for the AI: what you want, what the AI should consider, and how the answer should look. Think of it like a creative brief or a task description.

[[Vocabulary/Markup|Markup]]

Typical pieces:

* **Role** – who the AI should act as (e.g., “act as a product manager”).
* **Goal** – one thing you want done.
* **Context** – what matters (audience, tone, constraints, known facts).
* **Output** – the shape of the answer (bullets, table, plain text, JSON).

> Treat the prompt as a mini‑contract: it sets expectations and the finish line.

---

## 2. The shape of a clear prompt

1. **One goal** – don’t mix multiple tasks in one go.
2. **Audience & tone** – who will read it and how it should sound.
3. **Boundaries** – what to avoid; what to do when information is missing (e.g., “say ‘unknown’ rather than guessing”).
4. **Output format** – choose one: bullets, table, short paragraph, or simple JSON.
5. **Example** – give 1 short example of a good answer (and, if helpful, one bad example).

**Before → After (tiny example)**

* *Before:* “Write about our product.”
* *After:* “Act as our product marketer. Goal: 5 bullet points for a landing page hero. Audience: startup founders. Tone: crisp and factual. Output: 5 bullets, each ≤14 words, including one risk/limitation. If something is unknown → write ‘unknown’.”

---

## 3. A simple prompt template (copy‑paste)

```text
Role: {who should you be?}
Goal: {one clear task}
Audience & Tone: {who reads this, how it should sound}
Context: {facts, constraints, links if needed}
Output: {bullets | table | short paragraph | JSON}
Rules:
- If information is missing, say "unknown" (don’t invent).
- Keep it concise and concrete.
- Follow the Output exactly.
Example of a good answer:
{place a short example here}
```

---

## 4. How to write prompts (five simple rules)

* **Start narrow.** Ask for one thing at a time.
* **Be concrete.** Prefer numbers, ranges, and word limits over vague words like “detailed.”
* **Say what not to do.** Ban guessing, marketing fluff, or off‑topic content.
* **Show the shape.** Name the output and give a quick example.
* **Keep it short.** Short prompts are easier to maintain and improve.

---

## 5. How to improve quickly (lightweight loop)

1. **Try on 3–5 real examples.**
2. **Mark what went wrong.** Was it too long? Off‑tone? Missing structure?
3. **Change one thing** in the prompt (goal, tone, output, example).
4. **Ask the AI to critique your prompt** and propose two edits. Pick one and retry.
5. **Save the better version** with a clear name (e.g., “landing\_hero\_v2”).

**Quality checklist (use after each run):**

* Fits the chosen output shape
* Concise and readable for the audience
* No invented facts when data is missing
* Meets the word/length limits
* Answers the single goal you set

---

<a name="meta-prompts"></a>
## 6. Let the AI help you write prompts (meta‑prompts)

**Draft a prompt from a brief**

```text
You design prompts. Based on the brief below, write a clear prompt using the template:
Role / Goal / Audience & Tone / Context / Output / Rules / Example.
Brief: {what I want}
```

**Critique and improve**

```text
Critique the prompt below: point out ambiguity and missing rules. Propose two improved versions and explain the difference.
<PROMPT>
{paste your prompt}
</PROMPT>
```

**Create examples**

```text
Generate 3 short example inputs and ideal outputs that match this prompt. Include one tricky case with missing information.
```

**Translate tone**

```text
Rewrite the prompt so the output sounds {friendly | formal | neutral | bold} without adding fluff.
```

---

## 7. Output patterns (pick one and stick to it)

**Bullets**

```text
Output: 5 bullet points. Each ≤14 words. Include one risk.
```

**Short paragraph**

```text
Output: one paragraph (3–4 sentences). Avoid marketing language. Include one limitation.
```

**Table**

```text
Output: a 2‑column Markdown table with headers: Feature | Benefit. Max 6 rows.
```

**Simple JSON (optional, when structure helps)**

```text
Output: ONLY JSON: {"title": string, "audience": string, "risks": string[]}. If unknown → null.
```

---

## 8. Common pitfalls → quick fixes

* **Too many goals at once** → split into steps; run step by step.
* **Vague words (“detailed”, “great”)** → replace with counts, limits, or examples.
* **No audience defined** → name who will read it and adjust tone.
* **No shape** → state bullets/table/paragraph/JSON and give a 1‑line example.
* **Guessing** → explicitly say “if unknown, write ‘unknown’.”

---

## 9. Mini‑templates you can reuse

**One‑page summary for leaders**

```text
Role: analyst
Goal: Summarize the document for busy leaders.
Audience & Tone: execs, concise and neutral
Output: 5 bullets with facts (numbers, dates, risks). No marketing language.
Rules: If a fact is missing, write "unknown".
```

**Customer support triage**

```text
Role: support triage specialist
Goal: Assign a ticket to one of: [billing, bug, feature, account]
Audience & Tone: internal, factual
Output: "label: <one of the four>" and one‑line reason
Rules: If unclear, choose "account" and explain why.
```

**Competitor snapshot**

```text
Role: market researcher
Goal: Extract a brief snapshot about a competitor from the text
Audience & Tone: product team, neutral
Output: bullets: Company | Country | Products (max 3) | Pricing model
Rules: Do not guess; write "unknown" if not stated.
Example of a good answer:
- Company: Acme
- Country: Germany
- Products: mobile app; web suite
- Pricing model: freemium
```

### Long Prompts & Example

Some workflows legitimately require very large prompts (for example: bootstrapping or refactoring a large codebase, setting up a mono‑/multi‑package repository, or laying down end‑to‑end acceptance criteria and conventions in one place). When using long prompts, keep them navigable: add a short table of contents, use clear section headers, number the steps, keep file paths and IDs exact, and separate stable policy from task‑specific context.

See our full example used to set up a monorepo:
[**Example**](projects/Augment-It/Prompts/Prompt-Queue/Full%20Prompt%20for%20Monorepo%20Setup%20(Stack%20Agnostic).md)




### Takeaway

Clear prompts aren’t about fancy tricks. They’re about **one goal**, **useful context**, **simple rules**, and a **clean output shape**. Start small, improve with tiny edits, and let the AI help you refine the prompt as you go.
