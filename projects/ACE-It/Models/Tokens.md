---
date_created: 2025-08-17
date_modified: 2025-08-22
---
# Tokens, Context Windows, Truncation & Branching

---

## 1. Purpose

This article outlines three fundamentals:

* **Tokens** — the unit models use to measure and process text, including language‑dependent effects.
* **Context windows** — how much information can be considered at once, and how window size shapes behavior.
* **Truncation & branching** — deliberate strategies when inputs do not fit, and when exploring multiple answers is beneficial.

---

## 2. Tokens: what the model counts

Models operate on **tokens** rather than words. Tokens are subword pieces, punctuation, and spaces. Tokenization depends on the model and on the language; the same sentence can yield different token counts across systems.

**Language effects (illustrative):**

* **Norwegian**: compound words (e.g., *høyhastighetstog*) often split into several tokens; inflection adds variation.
* **Russian**: rich morphology (declensions, conjugations) typically increases tokens per surface word compared with English.
* **Japanese**: no spaces between words; segmentation relies on learned patterns, so short sentences can still produce many tokens depending on kanji/kana combinations.

**Rules of thumb:**

* 1 token roughly corresponds to 3–4 Latin characters; this varies by language and tokenizer.
* Frequent fragments tend to map to single tokens; rare names and compounds often break into several.

---

## 3. Context windows: the model’s attention span

A **context window** is the maximum amount of text a model can consider in a single exchange. It includes:

* system/developer instructions;
* task instructions and examples;
* retrieved snippets or tool outputs;
* the model’s **own completion** (which must also fit).

### 3.1 How window size affects behavior

* **Capacity and recency**. With large inputs, attention tends to emphasize more recent segments. Earlier constraints or facts can fade, leading to partial **forgetting** of prior messages.
* **Dilution**. Adding many irrelevant lines reduces the signal‑to‑noise ratio; important cues compete with background text and may be under‑used.
* **Compression side‑effects**. When long histories are summarized to stay within the window, nuance can be lost, and later steps may rely on approximate memories rather than original details.
* **Output room**. The completion must fit in the remaining window. If the prompt consumes nearly all capacity, answers can be cut mid‑generation or become overly terse.

### 3.2 Long documents and conversations

* **Document sprawl**. Pasting entire documents invites dilution and truncation. Salient fragments are more effective than full dumps.
* **Layout and OCR**. Scanned PDFs and screenshots introduce noise (headers, footers, footnotes). Without preprocessing, models may latch onto irrelevant fragments.
* **Conversation drift**. Extended chats can exceed window capacity; earlier instructions may be truncated or overshadowed by later turns, altering tone or rules.

---

## 4. Truncation: controlled policies

When inputs do not fit, apply explicit rules rather than relying on provider defaults.

* **Head‑only**: keep the beginning (definitions, core instructions); risk: recent details lost.
* **Tail‑only**: keep the end (latest context); risk: terms and constraints lost.
* **Head + Tail**: keep the first *A* and last *B* tokens; drop the middle.
* **Chunking with overlap**: split long inputs into segments with small overlaps; process sequentially.
* **Summarize then answer**: first condense to a brief, then produce the final output from that brief.
* **Retrieve, not paste**: index sources and insert only top‑k relevant snippets per query.

Always reserve space for the completion and prefer a clear rejection or deferral over silent loss of input.

---

## 5. Branching: multiple concise candidates

**Branching** requests several short variants and then selects one.

* **n‑best generation**: produce *N* alternatives under a strict length cap per variant; select by simple criteria or a secondary scorer.
* **Self‑check then draft**: create a brief checklist of requirements, then a draft that satisfies it.
* **Cascades**: start with a short prompt or smaller model; escalate only when quality is insufficient.

Set explicit per‑branch length limits and a global cap to keep runs predictable.

---

## 6, Streaming and controlled stopping

* Enable **streaming** for longer answers to reduce perceived delay.
* Use **stop sequences** and **maximum output lengths** to end completions precisely.
* For extraction and labeling, enforce compact fixed formats to keep responses consistent.

---

## 7. Specification examples

**Concise output rule**

```text
Return at most 8 bullet points (≤ 12 words each). If data is missing, write "unknown".
```

**Head + Tail policy**

```text
If the input exceeds N tokens, keep the first A and last B tokens; drop the rest. Ensure at least C tokens remain for the model's completion.
```

**Branching request**

```text
Generate 3 alternative answers, each ≤ 60 tokens and meaningfully different. Then output only the best one according to: {criteria}.
```

---

## 8. Summary

Tokens are the accounting unit that governs how models process text, and tokenization varies across languages such as Norwegian (compounds), Russian (morphology), and Japanese (no spaces). Context windows bound how much can be considered in one exchange; large windows introduce recency effects, dilution, and risks of forgetting earlier messages, especially in long conversations or with entire documents. Effective designs plan window usage, highlight what matters, and leave space for the completion. When inputs exceed limits, apply explicit truncation or retrieval; for open‑ended tasks, prefer several concise branches over one long attempt. These practices improve reliability and keep behavior predictable.
