# Model Families & Modalities (Text · Vision · Audio)



## 1. Purpose & Scope

This article is about **modalities** (text, images, audio) and the **model types** that work with them. It aims to give a working mental model: what the model “sees,” what it’s good at, and how to apply it without diving into research papers.



## 2. Modalities & Data Representations (what the model actually “sees”)

* **Text → tokens.** Before a model reads text, it chops it into small pieces called *tokens*. A sentence becomes a handful of tokens; a long document becomes thousands. The model tracks patterns between tokens to predict the next ones. Two limits matter in practice:

  * **Context window** — how much text the model can read at once (the “attention span”). If you exceed it, older parts get dropped or compressed.
  * **Input/Output length** — longer prompts and longer answers cost more and respond slower.
* **Images → patches or latents.** Images are grids of pixels. Vision models either look at small **patches** of the image or compress the image into a **latent** representation (a compact numeric version). From there they can:

  * **understand** (read text via OCR, find objects, interpret charts, parse UI screenshots), or
  * **create/edit** (draw new images or change parts of an existing one based on a prompt or example).
* **Audio → wave or spectrogram.** Audio is a time series. Models often turn it into a **spectrogram** (a picture of how sound energy changes over time). From there they can:

  * **recognize speech** (audio → text),
  * **speak** (text → audio with a chosen voice), or
  * **generate sound/music**.

> **text becomes tokens; images become patches/latents; audio becomes a time–frequency map**. Models learn stable patterns in these forms.

---

## 3. Text models today (what’s useful now)

* **GPT‑style generative models (decoder‑only).** This is the mainstream for creating text and code, following instructions, and multi‑step reasoning. Examples include GPT‑family models, Claude‑style models, and Grok‑style models. Use them when you need *drafting, rewriting, summarizing, code generation, tool use, or agents*. Some offer a **thinking/reasoning mode** that spends extra budget to plan and self‑check on hard tasks.
* **Embedding models (and rerankers).** These turn text into vectors that capture meaning. They power **semantic search, retrieval‑augmented generation (RAG), deduplication, clustering**, and “find similar.” Rerankers refine a search list to surface the best matches.
* **Seq‑to‑seq / encoder‑decoder (niche but handy).** Useful for *structured transforms* (e.g., translation, format conversion) when you want strong control over input → output pairs.

Practical idea: **pair** an embedding model for search with a GPT‑style generator for answers. Keep outputs short and structured when possible.

---

## 4. Vision models

* **Understand images (and screenshots).** Vision models read pixels to locate objects, extract text (OCR), and make sense of layouts (documents, tables, UIs). When combined with a language model, they can answer questions about what they “see.”
* **Create or edit images.** Diffusion‑style models are the go‑to for generating visuals or making targeted edits. They are great for marketing assets, ideation, and in‑product editing tools.

Rule of thumb: **understand** with vision encoders/VLMs; **create** with diffusion.

---

## 5. Audio & speech models (the voice toolbox)

* **ASR (speech → text):** turn recordings into text for notes, commands, and analytics.
* **TTS (text → speech):** produce natural speech with chosen style/voice for voice UIs and audio versions of content.
* **Audio generators:** create music, ambience, or effects from prompts or examples.

Many voice experiences are a **pipeline**: ASR → text model (reason/plan) → TTS.

---

## 6. Multimodal models (what “multimodal” really means)

**Multimodal** models can take several inputs (e.g., text + image) and reason across them. In practice this enables:

* Asking questions about **documents, charts, whiteboards, or app screens**.
* Using what the model “sees” to **call tools** (e.g., read an error screenshot, then query an API).
* **Voice assistants** that listen and speak in real time.

These models are flexible, but heavier. Expect higher costs and latency, so keep tasks focused and outputs concise.

---

## 7. Common product patterns

* **Search then answer (RAG).** First, search your own content using embeddings. Then, let a generator answer **only** from what was found. This reduces make‑believe answers and keeps content fresh.
* **Label then draft (cascade).** A small, fast model labels the request. If it’s simple, return the label; if it’s complex, escalate to a smarter generator. Saves time and money.
* **Read documents and pull out fields.** Point a vision+language model at invoices, contracts, or forms and extract a short, fixed set of fields. Return a neat JSON object.
* **Screenshot helper.** Send a UI screenshot when something breaks; the model explains what it sees and suggests the next step or a relevant doc.
* **Voice loop.** User talks → ASR makes text → a text model decides and drafts → TTS replies. Works well for hands‑busy contexts.
* **Visual content helper.** For images, iterate quickly: “make brighter,” “remove background,” “add a clean header,” until it’s good enough to ship.

---

## 8. Trade‑offs & risks

* **Quality vs. speed/cost.** Bigger, smarter models often answer better but are slower and pricier. Start small; escalate only when you must.
* **Control vs. creativity.** Strict formats (tables/JSON) keep outputs reliable but limit flair. Choose what your use case needs.
* **Grounding vs. guessing.** If facts matter, ground answers in your data (RAG) and allow the model to say “unknown.”
* **Privacy & exposure.** Images, audio, and long texts can contain sensitive details. Minimize what you send; prefer providers and settings that protect user data.

---

## 9. Summary

Different models excel at different jobs. **Text models** draft, explain, and reason; **vision models** either understand images or create them; **audio models** listen and speak; **multimodal models** combine these in one flow. Think first about the **input you have** and the **output you need**, keep the task small, and add complexity only when the simpler setup can’t deliver the result.
