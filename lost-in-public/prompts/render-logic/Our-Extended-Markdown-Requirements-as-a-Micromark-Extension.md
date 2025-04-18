---
title: Our Extended Markdown Requirements as a Micromark Extension
lede: A comprehensive, explicit prompt for a contractor to implement our proprietary extended markdown flavor as a micromark extension—bypassing remark, rehype, and all unified abstractions.
date_authored_initial_draft: 2025-04-17
status: To-Prompt
authors:
  - Michael Staton
category: Prompts
---

# Prompt: Build Our Proprietary Extended Markdown Flavor as a Micromark Extension

## Executive Summary
You are to implement a **micromark extension** (or set of extensions) that fully supports our proprietary extended markdown flavor, as specified in `content/specs/Maintain-a-Proprietary-Extended-Markdown-Flavor-Rendering-Pipeline.md`. We are intentionally bypassing all remark/rehype/unified abstractions. The goal is a direct, robust, maintainable, and extensible micromark-based pipeline that:
- **Tokenizes and parses all of our custom markdown features at the micromark level**
- **Outputs a clean, extensible event/token stream** (not MDAST/HAST)
- **Supports custom HTML compilation or downstream AST building as needed**

This prompt is your single source of truth. You must read, re-read, and reference every section of the linked specification and all referenced files. **Do not make assumptions, do not invent syntax, and do not deviate from the requirements.**

---

## 1. Context & Philosophy
- We are abandoning the remark/unified plugin stack due to its complexity and lack of flexibility for our needs.
- We want a direct, low-level, and fully transparent markdown pipeline.
- All parsing, tokenization, and extension logic must happen at the micromark layer.
- The output must be easy to debug, extend, and maintain.

---

## 2. Required Features (from the Spec)
You must implement **all** of the following, with precise handling of edge cases and full support for our content authoring conventions:

### 2.1 Container Elements (First Pass)
- Callouts: `> [!NOTE]`, `> [!WARNING]`, etc. (with nested content and citation compatibility)
- Alert blocks
- Custom containers (future-proof for additional types)

### 2.2 Inline Elements (Second Pass)
- Wiki-links: `[[page]]`, `[[page|title]]` (with backlink and path resolution logic)
- Citations: `[1]`, `[2]`, etc. (inline and section, with auto-collection and URL support)
- Custom inline syntax (future-proof)

### 2.3 Rich Content (Third Pass)
- iFrames: raw HTML, YouTube/Loom optimizations, responsive containers
- Images:
  - Internal embeds: `![[Visuals/filename.png]]`, with optional sizing (`|100x145`)
  - External images: `![alt](https://url)`
- Code blocks: language highlighting, custom block types, metadata

### 2.4 Final Processing (Fourth Pass)
- HTML generation (via micromark's compile phase or custom compiler)
- Component mapping (ensure tokens/events are annotated for downstream rendering)
- Style application (ensure tokens/events can be mapped to CSS classes/components)

---

## 3. Processing Pipeline & Order
- **Strictly follow the processing order:**
  1. Container elements
  2. Inline elements
  3. Rich content
  4. Final processing
- Each extension must be modular, testable, and independently togglable.
- Extensions must be registered in the correct context (document, flow, text, string, etc) as per micromark's architecture.

---

## 4. Implementation Constraints
- **NO files outside assigned locations.**
- **Naming conventions must be strictly followed.**
- **All code must be aggressively, continuously commented as per our project rules.**
- **TypeScript preferred for all logic and type definitions.**
- **Do not modify project-wide config files without explicit permission.**
- **All extension logic must be implemented as micromark constructs.**
- **HTML output must be extensible and easily debuggable.**

---

## 5. Edge Cases & Error Handling
- All extensions must degrade gracefully: if a construct fails, output the original markdown as a fallback.
- All errors must be logged with clear context for debugging.
- Debug hooks and output must be included for each processing phase.

---

## 6. References & Resources
- **Primary Spec:** `content/specs/Maintain-a-Proprietary-Extended-Markdown-Flavor-Rendering-Pipeline.md`
- **Micromark Docs:** https://github.com/micromark/micromark
- **Micromark Extension Guide:** https://github.com/micromark/micromark#creating-a-micromark-extension
- **Project Commenting & Naming Rules:** See project root memories and all referenced prompts

---

## 7. Deliverables
- A complete set of micromark extensions (in TypeScript) supporting all required features
- A test suite demonstrating all features and edge cases
- Full code comments and documentation
- A README describing extension registration, usage, and architecture

---

## 8. Life-or-Death Reminders
- **If you are confused, STOP and ask for clarification.**
- **Do not invent or guess. Reference the spec and ask.**
- **Every requirement and constraint here is non-negotiable.**
- **You are building the foundation for all future content rendering at this company.**

---

**If you need code samples, architectural diagrams, or further clarification, ask immediately.**
