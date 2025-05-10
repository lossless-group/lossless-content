---
title: How Micromark Handles Markdown and the AST
lede: A deep dive into how Micromark tokenizes Markdown and how the AST is built by higher-level utilities in the remark/unified ecosystem.
date_reported: 2025-04-18
date_resolved: 2025-04-23
date_last_updated: null
affected_systems: Markdown-Rendering
at_semantic_version: 0.0.0.1
status: Resolved
augmented_with: Cascade AI
category: Markdown-Parsing
site_uuid: be6c6a53-45cc-4390-b701-26d96c751916
date_created: 2025-04-18
date_modified: 2025-04-23
tags:
  - Micromark
  - Markdown-Parsing
  - Abstract-Syntax-Trees
  - Unified-Ecosystem
authors:
  - Michael Staton
portrait_image: https://ik.imagekit.io/xvpgfijuw/uploads/lossless/issue-resolutions/2025-05-10_portrait_image_How-Micromark-Handles-Markdown-AST_81bef1e5-b166-49f1-9439-7118dbad12db_G0OpoFsJL.webp
image_prompt: Micromark gears emitting a stream of tokens, transforming into an abstract syntax tree (AST) by higher-level utilities, with visual separation between token stream and AST.
banner_image: https://ik.imagekit.io/xvpgfijuw/uploads/lossless/issue-resolutions/2025-05-10_banner_image_How-Micromark-Handles-Markdown-AST_d195657c-9822-47a2-8473-1b083cd4ab56_uOqyd6GEF.webp
---

# How Micromark Handles Markdown and the AST: The Ultimate Deep Dive

***
## 1. What is Micromark?

**Micromark** is the low-level, highly efficient streaming tokenizer and parser at the core of the modern markdown ecosystem (remark, unified, etc). It is responsible for:
- Turning raw markdown text into a stream of tokens (not an AST!)
- Handling every byte, line ending, and markdown edge case according to the CommonMark and GFM specs
- Providing extension points for plugins (like GFM tables, footnotes, etc)

**Key fact:** Micromark itself does NOT build an AST. It emits a token/event stream. The AST (MDAST, HAST, etc) is built by higher-level utilities (like `mdast-util-from-markdown`).

***

## 2. The Micromark Pipeline: Step by Step

### Step 1: Preprocessing
- **File:** `lib/preprocess.js`
- Handles normalization of line endings, encodings, and prepares the input for streaming parsing.

### Step 2: Parsing (Tokenization)
- **File:** `lib/parse.js`
- The heart of micromark. It:
  - Combines built-in and extension constructs (syntax rules)
  - Sets up the parsing context (lines, columns, buffers)
  - Uses the `createTokenizer` function (from `lib/create-tokenizer.js`) to walk the input and emit tokens
- **Constructs:**
  - Each markdown feature (heading, list, code block, table, etc) is a "construct" (see `lib/constructs.js` and `micromark-core-commonmark`)
  - Constructs are organized by context: document, content, flow, string, text, etc

### Step 3: Tokenizer State Machine
- **File:** `lib/create-tokenizer.js`
- This is a streaming state machine:
  - Maintains a `Point` (line, column, offset) as it walks the input
  - At each character, checks the current construct(s) to see if a match is possible
  - Emits tokens for open/close/enter/exit of each markdown element
  - Handles nested constructs (e.g., emphasis inside a link inside a table cell)
  - Uses effects (enter, exit, consume, etc) to manage state

### Step 4: Postprocessing
- **File:** `lib/postprocess.js`
- Final adjustments to the token stream (e.g., resolving references, normalizing whitespace)

### Step 5: Compilation (to HTML or other output)
- **File:** `lib/compile.js`
- By default, micromark can compile the token stream directly to HTML.
- The compiler walks the token stream, mapping tokens to HTML tags, handling escaping, and applying extensions (e.g., GFM tables, autolinks).
- **You can swap in your own compiler** to output a CST, AST, or any other format.

---

## 3. How Extensions (like GFM) Plug In
- Extensions are objects that define additional constructs (syntax rules) and/or HTML handlers.
- When you call `micromark(markdown, { extensions: [gfm()] })`, the GFM constructs (tables, strikethrough, etc) are merged with the core constructs.
- Each extension can add, override, or modify constructs for any context (document, flow, text, etc).

---

## 4. Token/Event Stream Format
- Each token/event is an object with:
  - `type` (e.g., 'heading', 'list', 'tableCell', etc)
  - `start` and `end` points (line, column, offset)
  - `value` (the matched text, if relevant)
- The token stream is a flat list, not a tree.
- Example (simplified):
  ```js
  [
    { type: 'heading', start: {line:1,column:1}, end: {line:1,column:7}, value: '# Hello' },
    { type: 'paragraph', ... },
    { type: 'table', ... },
    ...
  ]
  ```

---

## 5. How the AST is Actually Built
- **Micromark does NOT build the AST.**
- Instead, higher-level utilities (like `mdast-util-from-markdown`) walk the token stream and build the MDAST (Markdown AST) or HAST (HTML AST).
- These utilities use the start/end info and nesting of tokens to build the correct tree structure.

---

## 6. Anatomy of a Construct (Syntax Rule)
- Each construct is an object with:
  - `tokenize`: the main function for matching the syntax
  - `resolve`: (optional) post-processing for matched tokens
- Example: the heading construct checks for `#` at the start of a line, then consumes the rest of the line as heading text.
- Constructs can be as simple as a character match or as complex as a full table parser (see GFM extension).

---

## 7. How to Build Your Own Markdown Feature
- Define a construct (with `tokenize` and optionally `resolve`)
- Add it to the relevant context (document, flow, text, etc)
- Pass your extension as `{ extensions: [myExtension] }` to micromark
- Optionally, add HTML handlers for direct HTML output

---

## 8. Key Files for Reference
- `index.js`: Main entry point, wires up all phases
- `lib/parse.js`: Parsing/tokenization logic
- `lib/constructs.js`: List of all built-in constructs
- `lib/create-tokenizer.js`: The streaming state machine
- `lib/compile.js`: HTML compiler
- `lib/preprocess.js`, `lib/postprocess.js`: Input/output normalization

---

## 9. Official Docs and Source
- [Micromark README](https://github.com/micromark/micromark)
- [Constructs API](https://github.com/micromark/micromark#constructs)
- [GFM Extension Example](https://github.com/micromark/micromark-extension-gfm)

---

## 10. Life-or-Death Summary
- **Micromark is the streaming, spec-accurate tokenizer for markdown.**
- **It emits a flat token/event stream, not an AST.**
- **Extensions add new syntax rules (constructs) and output handlers.**
- **The AST is built by utilities like mdast-util-from-markdown.**
- **You can build your own extensions, compilers, or AST builders on top of micromark.**

---

**If you need a code sample, a walk-through of a specific construct, or a guide to writing your own extension, just ask.**