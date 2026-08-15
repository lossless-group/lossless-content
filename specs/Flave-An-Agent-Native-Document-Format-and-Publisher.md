---
title: "Flave — An Agent-Native Document Format and Desktop Publisher"
date: 2026-08-14
publish: false
generated_with: Claude Code on Opus 5
categories: Technical-Specification
date_created: 2026-08-14
date_modified: 2026-08-14
lede: "A package format (.flave) and a Svelte+Tauri publisher that replace Pages, Keynote, and Word with a document whose internals are exactly the languages agents are already fluent in — LFM, HTML, CSS, JS, JSON, CSV, YAML, SVG, Vega-Lite, and D3."
status: Draft — v0.1, pre-engineering-handoff
category: Technical Specifications
site_uuid: 8c41d7b2-59ae-4e0c-9b3d-1f7a2c6e8055
tags: [Flave, Lossless-Flavored-Markdown, Desktop-Publishing, Document-Formats, Tauri, Svelte, Agent-Native, Open-Specs]
authors:
  - Michael Staton
spec_owner: Michael Staton
pm_of_record: Claude (Opus 5), acting lead PM
depends_on:
  - "[[lfm]]"
  - "[[ai-labs/augment-it/apps/chat]]"
  - "[[ai-labs/memopop-ai/apps/memopop-native]]"
supersedes:
  - "[[content/specs/Create-a-Collaborative-Markdown-based-Desktop-Publisher]]"
image_prompt: "An open document that is simultaneously a stack of paper and a lattice of glowing structured files — markdown, CSS, a CSV table, an SVG curve — hovering in ordered layers, warm light, precise geometry."
---

> [!warning] Reading order
> This is a **PM working spec under active grilling**, not a settled contract.
> Sections marked **`⟨DECIDE⟩`** are open forks where the answer materially
> changes engineering scope. The register of every open fork is
> [§14 Open Decisions](#14--open-decisions-register). Nothing below §14's
> unresolved items should be treated as committed.

---

## 1 · The one-sentence pitch

**Flave is a document that keeps its workings.**

Publish it and people see the conclusion. Send the file itself and they get the
evidence, the data and its sources, the reasoning, and the shared design
vocabulary that produced it — written in the languages agents already speak
fluently, so a human and an agent can co-author inside it.

*(This thesis is the result of D-01, §2.2 — it replaced an earlier
agent-legibility-first framing. Agent-native internals remain load-bearing:
they are **why** the workings are legible when handed over. But legibility is
the mechanism; the surviving private layer is the value.)*

Where Keynote hides your deck in an opaque bundle of protobufs, and Word hides
your report in OOXML nobody enjoys, a `.flave` document is a **bundle of plain
web-native files** — LFM markdown, YAML metadata, CSS tokens, JSON layout, CSV
and Parquet data, SVG assets, and optional JS. An agent opening a `.flave` does
not need a parser, a plugin, or a translation layer. It is already at home.

---

## 1.1 · Scope discipline — what we would actually build first

> [!warning] **Added 2026-08-14 at the owner's intervention:**
> *"I'm not sure if this is getting way out of scope. The reality is that
> something quite simple should be way better than the current vibe."*
>
> **This is correct, and the rest of this document should be read in its
> light.** What follows §2 is a *design record* — the thinking behind a set of
> decisions, most of which are sound. It is **not a build plan**, and the
> milestone list in §13 is not a queue to start at the top of.

### The honest cut

D-01 (§2.2) established the core: **a document that keeps its workings, and
produces several audience versions that don't drift.** Measured against that
one claim, most of this spec is not load-bearing:

| Needed early | Not needed early |
|---|---|
| The bundle: manifest + `content/` + `data/` + `assets/` | The Tauri app (a local web app suffices) |
| LFM parse (**`lfm` already does this**) + an MDAST→HTML renderer | **The entire layout / frame system (§7.2)** |
| Declarative trigger-packs (§6.2 Tier 1) + live preview | `deck` and `paged` surfaces |
| One hand-edited `theme.css` | Themes as packages, the registry, Tailwind generation |
| Block-level `clearance` + audience publish + the scan | `jj`, geek mode, the settings dashboard |
| | DuckDB, `sql` fences, figures, HTMX |
| | The embedded agent chat — **use Claude Code beside the editor** |

**The single biggest cut is the layout and frame system** — §7.2's cascade,
frames, the command palette, the three surfaces. That is the largest body of
work in this document, and it exists to serve the *"replace Pages and Keynote"*
framing which **§2.2 already demoted from thesis to positioning.** It does not
serve the core at all. It was specced in depth because it is genuinely
interesting, not because it is first.

### v0 — the editor

Proposed by the owner 2026-08-14 as "v0.5." **Renumbered to v0, because it
should come first** — reasoning below.

> *"I just want a markdown editor where I can choose how it renders, so it
> renders really well with my styles, and I can define the markdown syntax
> triggers (like `:::directive`, but extensible so I can add what covers use
> cases not thought of now), and I can see the rendered output as the edits are
> happening."*

**The whole product is one loop:**

```
type markdown  →  see it rendered, instantly, in your styles
                       ↑
            ask an agent for a new syntax
                       ↓
     trigger-pack appears; editor hot-reloads; the syntax works
```

| Piece | Status |
|---|---|
| Parse + normalize triggers | ✅ **`lfm` already does this** — `parseMarkdown()`, published on JSR |
| Defining a new syntax | 🔨 **A Svelte component + one line registering the syntax.** *Not* §6.2's declarative Tier 1 format — see §12.1 for why that's deferred |
| Editor pane | CodeMirror 6 |
| Styles | One hand-editable `theme.css` of custom properties. **No tokens pipeline, no registry.** |
| **MDAST → HTML renderer** dispatching `componentNode` to trigger-pack templates | ◐ **A port, not an invention** — `@flave/render` is `AstroMarkdown.astro` translated to Svelte 5. See §12.1. |

**Deliberately absent:** Tauri (a local web app suffices; native file access
comes later), frames, layout, surfaces, themes-as-packages, `jj`, clearance,
audiences, figures, DuckDB — **and the embedded agent chat.** At v0 you run
Claude Code in a terminal next to the editor; it writes trigger-packs into the
project and the editor hot-reloads them. Almost no agent-integration work, and
the loop is already real.

#### Plain `.md` files or `.flave` bundles? — a false binary

I posed this as a v0 fork. It isn't one.

**A `.flave` bundle *is* a folder of markdown files with a manifest in it.** So
v0 opens **a folder**. If `flave.yaml` is present, read it; if not, use
defaults. Nothing in the editor changes between the two cases.

- Day one: point it at an existing Obsidian vault. No manifest, defaults apply.
- Later: a `flave.yaml` appears in a folder and adds capabilities.
- **No migration, no fork, no decision.** The bundle was never a different
  format — it is the same folder with one more file in it.

#### Slicing v0 against implementation variance

The owner's actual blocker, 2026-08-15: *"I don't know how long Claude Code as
Lead Engineer would take. I've seen the agent get lost in a loop. I've seen it
do what might take days in 15 minutes."*

**The right response is not an estimate — it is to structure the work so the
estimate stops mattering.** Agent implementation is fast when there is a working
reference to port, a binary done-condition it can check itself, and a boring
toolchain. It loops when the target is "make it good," when success is
unverifiable, and — most often — **when the environment is complicated.**
Toolchain trouble generates more loops than logic ever does.

So v0 is built as five slices, each with a **binary done-condition** and each
independently useful:

| Slice | Done when | Notes |
|---|---|---|
| **1 · The probe** | Type in the left pane, see rendered output on the right, for the ~8 core node types (root, paragraph, heading, list, link, emphasis, strong, code) | Vite + Svelte 5 + CodeMirror 6 + `lfm.parseMarkdown()`. **No Tauri, no module federation, no workspace.** The most boring toolchain available. |
| **2 · Full port** | A fixture corpus renders with nothing falling through to unknown-node | Port remaining node types + `Callout`, `CodeBlock`, `MarkdownImage`, `HeadingAnchor` from `lfm-astro` (§12.1) |
| **3 · Extensibility** | A new `:::pullquote` renders after adding one component + one registration line, **without touching the dispatcher** | The loop that is the actual product (§1.1) |
| **4 · Folders** | Point it at an existing Obsidian vault; browse and edit real files | Reads `flave.yaml` if present |
| **5 · Styles** | Swap `theme.css`, see the document change | One file of custom properties |

**Slice 1 is the estimate.** It is small enough that a loop costs half a day
rather than a project, and once it lands there is a real velocity number for
slices 2–5 instead of a guess. **Run the probe, then decide** — that is
cheaper than any amount of further planning, including this document.

Two things worth handing the engineer explicitly, because they are the
difference between the fast case and the loop:

1. **Give the agent a way to know when it is done, before it starts building.**

   Concretely: a folder of paired files — an input and the output expected from
   it — plus a script that runs the renderer over each pair and reports
   pass/fail.

   ```
   fixtures/
   ├── 01-heading.md     →  # Hello {#hello}
   ├── 01-heading.html   →  <h1 id="hello">Hello</h1>
   ├── 02-callout.md     →  :::callout{type=warning}⏎Be careful.⏎:::
   ├── 02-callout.html   →  <aside class="callout callout--warning"><p>Be careful.</p></aside>
   └── … ten more
   ```

   **Why this is the highest-leverage anti-loop move:** without it, *"is the
   renderer working?"* is a judgment call — the agent looks at output, decides
   it is not quite right, tweaks, looks again. That is the observed loop. With
   it, the answer is *"9 of 12 pass, and here are the 3 that don't."* **"Make
   these twelve pass" has an end; "make the renderer good" does not.**

   > [!warning] **Simplified 2026-08-15 — the elaborate version below was
   > over-built.** Owner: *"unless there is a CSS collision I don't really
   > understand where an error could be. The main thing is that the syntax
   > triggers are mapped to desired output and it works."* Correct. There are
   > only four failure modes in this renderer, and full-HTML snapshots are the
   > wrong instrument for them.
   >
   > | # | What breaks | How you find out |
   > |---|---|---|
   > | 1 | **Trigger doesn't fire** — `:::pullquote` renders as literal text. Plugin unregistered, name mismatch, or LFM parsed it as something else | One assertion per trigger |
   > | 2 | **Trigger fires, props don't arrive** — `:::callout{type=warning}` renders with `type` undefined, so no warning styling | Same assertion |
   > | 3 | **Node type has no branch** — a table or footnote renders *nothing*. ★ **The dangerous one: content silently disappears**, and nobody thinks to look for it | ★ **A loud fallback, not a test** — see below |
   > | 4 | **Nesting breaks** — a callout containing a list containing a link | One nested fixture |
   >
   > **The whole test suite is one assertion per trigger:**
   >
   > ```js
   > test(':::callout{type=warning}', async () => {
   >   const { body } = render(/* … */);
   >   expect(body).toContain('class="callout callout--warning"');  // trigger + prop
   >   expect(body).toContain('Careful.');                          // content survived
   > });
   > ```
   >
   > Syntax in → expected element out, props applied, content still present.
   > **No snapshots.**
   >
   > ★ **And for failure 3, do something better than testing: make it loud.**
   > The dispatcher's fallback branch must render a *visible* marker —
   > `⚠ unhandled node type: table`, in red — never nothing. It then announces
   > itself in the preview the moment you type a table, and needs no test at
   > all. **Converting a silent failure into a visible one beats testing for
   > it**, and it is one branch of code.

   **How the agent runs a check without a browser** (kept for reference; the
   mechanism is the same even though the assertions are simpler). Svelte 5 ships
   a server renderer, so a component can be turned into an HTML string directly:

   ```js
   // test/render.test.js
   import { render } from 'svelte/server';        // ← verify against the
   import { parseMarkdown } from '@lossless-group/lfm';  //   installed Svelte
   import FlaveMarkdown from '../src/FlaveMarkdown.svelte';

   test('heading', async () => {
     const tree = await parseMarkdown('# Hello {#hello}');
     const { body } = render(FlaveMarkdown, { props: { node: tree } });
     expect(body).toMatchSnapshot();     // body === '<h1 id="hello">Hello</h1>'
   });
   ```

   **And nobody hand-writes the expected HTML.** With Vitest's
   `toMatchSnapshot()`, the first run writes whatever it produced into
   `__snapshots__/`; **a human reads it once, confirms it is right, and commits
   it.** Every later run compares against it and fails with a diff. `vitest -u`
   accepts a change deliberately. Setup is roughly ten lines; the human cost is
   one review pass, not twelve authored files.

   **What this does and does not catch — keep the two rungs distinct:**

   | Failure | Caught by | Who |
   |---|---|---|
   | Wrong tag, wrong attribute, variable not interpolated, node type unhandled | Snapshot test | **Agent, constantly, unattended** |
   | *Looks* wrong — CSS not applying, spacing off, callout unstyled | Nothing automatic | **Human, once per feature, in the live preview** |
   | Visual regression over time | Playwright screenshot diff (per the browser-drive convention) | **Deferred — not v0** |

   Snapshot tests prove the **structure**; they say nothing about appearance,
   because they only ever produce an HTML string and no CSS is involved. That
   second rung is free here — **opening the app and looking at the preview is
   the product's main loop anyway.**
2. **`AstroMarkdown.astro` is the reference, and it is 313 lines.** Say so.
   Porting a file you can read is the fastest thing an agent does; inventing a
   renderer is among the slowest.

### v1 — clearance and audiences

What this document previously called v0. The core thesis (§2.2, D-01) —
block-level `clearance`, named audiences, `flave publish --audience`, the
clearance scan. **Small once v0 exists**, because it is a remark plugin and an
output filter over a renderer that already works.

### Why the editor comes first

I had the order backwards, and the reason is worth stating plainly:

- **The clearance CLI proves the thesis but has no daily pull.** You would have
  to make yourself use it. Anything you must force yourself to use produces no
  evidence, because the usage isn't real.
- **The editor is something you would open unprompted.** That generates actual
  documents — which is precisely the raw material the clearance model needs to
  operate on. *You cannot test "five audience versions of a document" before you
  have documents.*
- **Clearance is a small addition to a working editor. An editor is a large
  addition to a working CLI.** Build the expensive thing first, in the form you
  will actually use.

### Why this is much smaller than it sounds

The reason is the owner's closing point, and it deserves to be stated as
positioning rather than buried as an aside:

> **Extensible markdown has always been theoretically wonderful and practically
> developer-only** — defining a new syntax meant authoring a `remark` plugin,
> which is an afternoon and a mental model most authors will never acquire.
>
> **Agents are near-perfect and near-instant at exactly that work:** content,
> data, assets, HTML, CSS. Writing a trigger-pack is a thirty-second agent task.
>
> **The barrier was never the idea. It was the labor — and the labor just went
> to zero.**

This is the sharpest "why now" in the document, sharper than §2.1's. Extensible
authoring stops being a developer feature the moment defining an extension costs
nothing, and that threshold was crossed recently enough that nobody has built
the editor that assumes it.

**How we'd know v0 worked:** you reach for it instead of Obsidian or a plain
editor for a real document, and within the first week you ask an agent for a
syntax that doesn't exist yet — and then keep using it.

### Standing rule for the rest of this document

Everything past §2 is **designed, parked**. A section being detailed here is
evidence that a question was thought through, **not** that the thing is
scheduled. Before any of it is built, it has to answer: *does this serve the
core, or the positioning?*

---

## 2 · Why this, why now

### 2.1 The forcing function

Every incumbent document format was designed for a world where **the only
author was a human with a mouse**. The format could be opaque because the only
program that ever needed to read it was the program that wrote it.

That assumption is now false. In 2026 a meaningful and rising share of document
authorship is done *by* or *with* an agent. And agents are catastrophically bad
at the incumbent formats:

| Format | Agent experience |
|---|---|
| `.docx` / `.pptx` | OOXML round-trips destroy formatting; every edit is a whole-file rewrite |
| `.key` / `.pages` | Effectively closed; agents can't touch them at all |
| Google Docs | API is imperative-index-based; agents misplace edits constantly |
| Notion | Block API is fine, but the doc isn't a *file* you own, and export is lossy |
| PDF | Write-only. A tombstone, not a document. |

Meanwhile the thing agents are *outstanding* at — HTML, CSS, SVG, JSON, and the
declarative chart grammars — is exactly the substrate a modern document needs.

#### The sharper forcing function — the labor went to zero

Everything above argues from *format legibility*. There is a second, stronger
argument, developed in §1.1 and worth stating here so no one reads §2 and
misses it:

> **Extensible authoring was always a good idea and always developer-only.**
> Defining a new markdown syntax meant writing a `remark` plugin — an afternoon,
> plus a mental model most authors will never acquire. That cost, not the
> concept, is why every author outside engineering lives inside a fixed set of
> block types someone else chose.
>
> **Writing a trigger definition and its template and CSS is now a
> thirty-second agent task.** The barrier was labor, and the labor is gone.

This is the "why now" with the shortest fuse. Extensible authoring stops being a
developer feature the moment defining an extension is free, and that threshold
was crossed recently enough that **nobody has yet built the editor that assumes
it.** It is also why §1.1 makes the editor v0: it is the smallest artifact that
puts this claim in front of a real user.

### 2.2 The uncomfortable competitor — and what the owner actually feels

**The strongest competitor to Flave is not Pages. It is "ask Claude for a
self-contained HTML file."** That already works, costs nothing, and ships today.
Flave earns its existence only where a one-shot HTML file is structurally bad.

> [!success] **D-01 — RESOLVED 2026-08-14.** Five candidate differentiators were
> put to the owner as concrete scenarios, with a forced ranking. The result
> **changes the product's center of gravity**, so it is recorded in full rather
> than summarized.

| # | Differentiator | Felt? |
|---|---|---|
| 1 | **Separation of internals from publication** — what you share ≠ what you ship | ★ **THE CORE.** Named as the one that alone justifies building this |
| 2 | **Data & asset provenance** — six months later, where did that ARR figure come from? | ✅ Felt |
| 3 | **Reuse across documents** — third deck this quarter; fix the brand blue once, not eleven times | ✅ Felt |
| 4 | **Surgical revision** — edit one paragraph without regenerating fourteen pages | ❌ **Not felt** |
| 5 | **Durable identity** — a document you maintain rather than emit | ❌ Not named |

#### The reframe this forces

The three felt pains are not a list. **They are the same pain**, and naming it
correctly is the most important thing in this document:

> ## Flave is a document that keeps its workings.
>
> Publish it and people see the conclusion. Send the file itself and they get
> the evidence, the data and its sources, the reasoning, and the shared design
> vocabulary that produced it.

Provenance (#2) *is* internals — `data/_sources.yaml` is the private layer.
Reuse (#3) *is* internals — the theme is shared workings. Both are instances of
#1. **The document carries more than it shows, and the surplus is the valuable
part.**

**This is emphatically not what Pages, Keynote, or Word do.** Those are pure
presentation tools with no concept of a private layer. The §1 framing —
"replace Pages and Keynote" — describes the *surfaces* Flave renders, not the
*job* it does. Keep it as positioning; do not mistake it for the thesis.

#### What #4 not being felt should change

Surgical revision was my lead differentiator and the motivation for a lot of
machinery. It is not a felt pain, so:

- **It stops being the headline.** §13's milestone claims should not be
  organized around it.
- **Block addressing (§8.1) survives anyway**, because layout refs, v2 review
  comments, and drift reporting all need it. It is infrastructure, not a
  feature — build it, don't sell it.
- **Deep patch machinery relaxes.** `block.edit(ref, patch)` need not be
  surgical to the character; whole-block replacement is fine at v1.

*One hypothesis worth holding lightly, not an argument to reopen a resolved
decision:* the owner may not feel #4 because the existing workaround — building
an Astro site for a one-off document (§3.1) — already provides it. Masked pain
still reads as no pain, and should be treated as no pain until evidence
appears. Watch for it at the dogfood gate (§13).

#### The nearest real category

If the core is a private layer that survives sharing, the honest neighbours are
not office suites. They are **literate-document tools** — Jupyter, Quarto,
Observable, R Markdown — all of which separate workings from output.

**Flave's claim against them: they compile in one direction.** Nobody sends a
colleague a `.qmd` expecting them to *work* in it; the source is the author's
private business and the output is what travels. **A `.flave` is built to be
exchanged and worked in** — the workings are the thing you hand over, and
publishing is the lossy act, not the source. That inversion is the product.

It also sharpens §15's "we build a worse Quarto" risk from a vague worry into a
testable boundary.

### 2.3 Why *we* specifically

We have three of the four hard pieces already built and in production use:

- **`lfm`** (`/lfm`) — the polyglot markdown pipeline. The STC paradigm
  (Syntax → Trigger → Component), a normalized `componentNode` AST, a
  zero-dependency `remarkCodeFences` registry with `FenceFormat` handlers
  (`mermaid`, `jsonCanvas`, `yang`, `json-schema`, `plantuml`). **This is
  already the extensibility engine Flave needs.**
- **`ai-labs/augment-it/apps/chat`** — a Svelte 5 agent-chat surface with a
  three-mode response contract (`answer` / `propose` / `invoke`) plus
  `capability_result`, mounted as a module-federation remote. **This is already
  the co-authoring surface Flave needs.**
- **`ai-labs/memopop-ai/apps/memopop-native`** — a Tauri 2 + SvelteKit desktop
  app with a Rust `src-tauri/src/api` layer and a spawned sidecar process.
  **This is already the shell Flave needs.**

The missing fourth piece is the format itself and the editing model over it.
That is what this spec is for.

---

## 3 · Users, jobs, and the one we build for first

### 3.1 Candidate segments

| # | Segment | Job to be done | Fit |
|---|---|---|---|
| A | **The Lossless team (dogfood)** | Fundraise decks, investment memos, client hubs, specs — currently hand-built as Astro sites, which is absurd for a one-off document | Highest |
| B | **Analysts / researchers** | Data-backed reports where the chart must stay live against the data | High |
| C | **Consultants / agencies** | Client deliverables that must look bespoke and ship as a link | High |
| D | **Prosumer "Pages replacement"** | General word processing | Low (v3+) |

**Recommendation:** build for **A**, validate on **B/C**, ignore **D** until the
format is stable. Segment D requires WYSIWYG parity that would eat two years.

> [!success] **D-02 — RESOLVED 2026-08-14 · fourth sibling, built clean**
> Flave does not absorb `memopop-ai` or `dididecks-ai`. They continue as they
> are. Flave gets its own repo and its own roadmap, unblocked by either
> product's existing commitments.
>
> **The cost this incurs, stated plainly:** Flave loses its automatic forcing
> function. No external product *makes* the format prove itself under real
> load. The only thing standing in for that is the **dogfood gate in §13** — a
> real Lossless deliverable must ship end-to-end from Flave before the format
> is declared stable. With D-02 resolved this way, that gate stops being a nice
> discipline and becomes the sole load-bearing check on the format's realism.
> Do not let it slip.

### 3.2 The primary persona

> **"Operator-author."** Comfortable in markdown. Not a designer. Has an agent.
> Needs the output to look like a designer made it. Ships 3–10 documents a
> month, each of which matters. Currently over-engineers by spinning up an
> Astro site, or under-delivers by shipping a Google Doc.

### 3.3 Anti-personas

- Someone who wants to co-edit a shopping list in real time. (Use anything else.)
- Someone who needs pixel-exact print production. (Use InDesign.)
- Someone who has never seen a markdown file. (v3, if ever.)

---

## 4 · Product principles

1. **The document is legible to an agent without tooling.** If a competent
   agent can't understand a `.flave` by reading it, the design is wrong.
2. **Source of truth is text; layout is data; style is tokens.** Never CSS
   soup emitted by a drag handle. See §7.
3. **Escape hatches are first-class but quarantined.** Raw HTML/CSS/JS is
   always allowed, always sandboxed, and never round-tripped through the GUI.
4. **Internals travel with the document; publication does not.** Sharing a
   `.flave` shares the workings. Publishing flattens.
5. **Nothing renders that a plain browser can't render.** No proprietary
   runtime. The published artifact must survive Flave being discontinued.
6. **Extensibility without code, then with code.** Declarative trigger-packs
   for authors; real plugins for developers. Two tiers, never one.
7. **Every agent mutation is a typed operation, not a byte write.** See §9.

### 4.1 Technical principles

Added 2026-08-14. **Principle T1 is not new — it is the `astro-knots` tech
hierarchy applied verbatim.** Flave inherits the house rule rather than
inventing one, which also means an engineer moving between an Astro Knots site
and Flave carries the same instincts.

> **T1 · HTML first, CSS second, JS third, dependencies last.**
> Reach for the next tier only when the current one genuinely cannot express
> the thing. A dependency must justify itself against all three.

> **T2 · Semantic HTML always.**
> `<article>`, `<section>`, `<figure>` / `<figcaption>`, `<aside>`, `<hgroup>`,
> `<time>`, `<details>`, `<mark>`, `<blockquote>` / `<cite>`. Never a `<div>`
> where an element with meaning exists.

> **T3 · Use the latest language features. They were introduced for a reason.**
> Modern CSS in particular exists precisely to delete the JS that used to be
> required. Using an old pattern out of habit is a T1 violation in disguise.

#### Why T2 matters more here than on a website

Semantic HTML in a document format pays off in four places at once, and the
fourth is the one people miss:

1. **Accessibility** — screen readers navigate a document by landmark.
2. **Tagged PDF** — `paged` export (§7.1) produces accessible, structured PDFs
   only if the source HTML carries real structure. A `<div>` soup exports as an
   untagged PDF, which is legally unacceptable in some contexts.
3. **Print CSS** — `break-inside`, running heads, and figure-keeping rules all
   hang off real elements.
4. **The published artifact stays agent-legible.** A `.flave` is agent-native
   by construction (Principle 1), but the *exported HTML* is what most people
   receive. Semantic markup means an agent handed the published output can
   still recover the document's structure — **the round trip closes.** Div soup
   is a one-way door.

#### T3, concretely — the modern CSS that carries real weight here

Not a wish list. Each of these deletes work we would otherwise do in JS:

| Feature | What it removes |
|---|---|
| **Container queries** | ★ **The enabling technology for frames.** A slot must respond to *its own* width, because the same frame renders in a scrolling doc, a 16:9 slide, and a printed page. Media queries answer "how wide is the viewport," which is the wrong question in all three cases. Without container queries, frames need JS measurement. **This single feature is why the frame system is viable.** |
| **Cascade layers (`@layer`)** | The specificity war between theme CSS, frame CSS, trigger-pack CSS, and document CSS. Declaring `@layer theme, frames, packs, document` makes precedence deterministic and declared, rather than an emergent property of selector weight. **This should be a spec-level requirement, not a style choice** — see below. |
| **Subgrid** | JS-computed alignment across nested frame slots |
| **`:has()`** | Whole categories of "add a class when the block contains X" JS |
| **`@property`** | Untyped custom properties. Typed, animatable tokens with declared syntax and fallbacks — directly relevant to `tokens.yaml` (§5.5) |
| **`color-mix()` + relative color syntax** | Precomputed palette ramps. A theme declares one brand color and derives its tints, shades, and state colors in CSS |
| **`text-wrap: balance` / `pretty`** | Manual line-break tuning in headlines and pull quotes — a real desktop-publishing chore, now one declaration |
| **CSS anchor positioning** | JS-positioned sidenotes, margin notes, and callout tails — squarely relevant to `paged` (§7.1) |
| **View transitions** | JS animation libraries for slide advance in `deck` |
| **CSS Paged Media** | The core of `paged`, alongside Paged.js as the polyfill |

**Spec-level requirement arising from this:** the cascade layer order
`@layer reset, theme, frames, packs, document` is **part of the format
contract**, not an implementation detail. A trigger-pack's CSS (§6.2) must not
be able to out-specific a theme by accident, and a theme must not be able to
break a pack. Declaring the order once, in the format, is what makes third-party
packs and third-party themes safely composable. Fix this at M0.

### 4.2 Naming — settling the collision

**D-14 — RESOLVED 2026-08-14.** The namespace is `@flave/*` (not `@knots/*`).
That created a collision worth naming explicitly: with `.flave` the document,
`flave` the CLI, and `@flave/*` the packages, **"a flave" cannot also mean a
theme.** Those first three coexist fine — `git` the tool, `.git` the directory,
and Git the project have never confused anyone — but a *second kind of object*
sharing the noun would.

**The governing rule:** *coin a noun only where no standard word exists.*
Novel concepts earn names; familiar ones keep theirs. A product that renames
things users already know is harder to learn for no gain.

| Thing | Name | Coined? |
|---|---|---|
| The document file | **`.flave`** | ✅ Coined — genuinely new object |
| The project & site | **flave.md** | ✅ |
| The CLI | **`flave`** | ✅ |
| Package namespace | **`@flave/*`** | ✅ |
| A named arrangement (grid + slots) | **frame** | ✅ Coined — Keynote calls it a "slide layout," which is wrong for `flow` and `paged` |
| A document's geometry mode | **surface** — `flow` / `deck` / `paged` | ✅ Coined — no standard term exists |
| A syntax extension | **trigger-pack** | ✅ Coined — inherits `lfm`'s STC vocabulary |
| **A brand package (tokens + fonts + frames)** | **theme** | ❌ **Kept plain.** Users know the word from Keynote, VS Code, and WordPress. This is the one concept with a perfect universal name — coining over it would be pure cost. |
| A `jj` operation | **Step** (user-facing) | ❌ §8.2 |
| A `jj` change | **Version** (user-facing) | ❌ §8.2 |

*(The "flavor" reading — LFM is Lossless **Flavored** Markdown, so a theme is
the flavor you give a document — is a genuinely apt lineage and fine in
marketing copy. It is deliberately **not** the product noun: `.flave` vs.
`.flavor` differ by two letters on screen, and a format where those name
different objects is a support burden.)*

#### The tension T3 creates, and how it resolves

"Use the latest features" runs directly into Principle 5 — *the published
artifact must survive Flave being discontinued* — because a document rendered
with a six-month-old feature may not open in whatever the recipient uses.

**Resolution: two different compatibility targets, and they are not the same.**

| Context | Target | Rationale |
|---|---|---|
| **The Flave app** (editor, preview) | Whatever the bundled WebView supports | One known runtime. Use everything. **Caveat: Tauri on Linux uses WebKitGTK, which lags meaningfully behind WKWebView and WebView2** — the app's floor is set by Linux, not by macOS. Test there or drop Linux from v1 explicitly. |
| **Published HTML / PDF** | **Baseline Widely Available**, with graceful degradation | Goes to arbitrary browsers, email clients, unfurl crawlers, and headless Chromium. Newer-than-Baseline features are permitted only behind `@supports` with a working fallback. |

`flave publish` should **lint for this** — flagging any feature in the output
that is not Baseline Widely Available and lacks an `@supports` guard. Cheap to
build, and it converts a permanent judgment call into a check.

---

## 5 · The `.flave` package format

### 5.1 Physical form

**`⟨DECIDE⟩ D-03`** — three candidates:

| Option | Pros | Cons |
|---|---|---|
| **Zip container** (`.docx`, `.key` model) | One-file mental model users already have; trivially emailable | Opaque to `git`, `grep`, and to agents without an unzip step — violates Principle 1 |
| **Plain directory** | Perfectly diffable, git-native, agent-native | Users lose the "one file" affordance; drag-to-email breaks |
| **macOS bundle-style directory** (`.app`, `.rtfd`, `.xcodeproj` model) | Finder shows one icon, filesystem sees a directory — *both* affordances at once | Only macOS gives the single-icon illusion; Windows/Linux see a folder |

**PM recommendation: bundle-style directory as canonical, with a
`flave pack` / `flave unpack` zip transport for email and upload.** The zip is
a *shipping container*, never the working format. This preserves Principle 1
absolutely while giving users the one-file gesture on the platform we build for
first.

### 5.2 Canonical layout

```
Q3-Investor-Update.flave/
├── flave.yaml                  # manifest — the ONLY required file
├── content/
│   ├── 001-cover.lfm.md        # ordered content blocks, LFM markdown
│   ├── 002-thesis.lfm.md
│   ├── 003-metrics.lfm.md
│   └── 004-appendix.lfm.md
├── layout/
│   ├── surfaces.json           # surface geometry & block placement (see §7.2)
│   └── grid.json               # named grid/frame definitions
├── theme/
│   ├── tokens.yaml             # two-tier design tokens (see theme-system skill)
│   ├── theme.css               # generated FROM tokens.yaml; never hand-edited
│   └── fonts/                  # subset webfonts, licensed & embedded
├── data/
│   ├── arr-by-month.csv
│   ├── cohorts.parquet
│   └── _sources.yaml           # provenance: origin URL, fetched_at, sha256
├── assets/
│   ├── logo.svg
│   ├── team-photo.jpg
│   └── _manifest.yaml          # sha256, alt text, license, dimensions
├── figures/                    # saved displays over the data — §7.6, D-22
│   └── arr-growth.figure.yaml  #   query + spec + clearance + captions
├── viz/
│   ├── arr-growth.vl.json      # Vega-Lite specs a figure points at
│   └── funnel.plot.js          # Observable Plot / D3 (sandboxed — §10)
├── components/                 # local trigger-pack: syntax the agent can use
│   ├── metric-card.trigger.yaml
│   └── metric-card.html
├── .jj/                        # Jujutsu repo — history lives here (§8.2)
├── .git/                       # colocated git backend, for interchange (§8.2)
├── .flave/
│   ├── agent/                  # transcripts, plans, agent scratch (§9.4)
│   ├── review/                 # RESERVED at M0, populated in v2 (§8.4)
│   └── cache/                  # derived artifacts + atomic-write temps; disposable
└── README.md                   # optional human note to collaborators
```

**Design notes worth defending in review:**

**The source-material trinity** (owner, 2026-08-14): *"data, content, and
assets."* Those three directories are **what the document keeps** — the workings
of §1's thesis. Everything else in the bundle is derived from them or describes
how to present them:

| Kind | Directory | Holds |
|---|---|---|
| **Content** | `content/` | Prose, transcripts, notes, raw source text — carrying `clearance` and `register` (§11.1) |
| **Data** | `data/` | Rows: CSV, Parquet, JSON, plus `_sources.yaml` provenance |
| **Assets** | `assets/` | Binaries: images, logos, headshots, screenshots, plus `_manifest.yaml` |

*(`document/` was renamed to `content/` on 2026-08-14 for exactly this reason:
"document" names the thing you produce, "content" names the material you hold —
and the material is the point. `layout/`, `theme/`, `figures/`, and `viz/`
describe presentation; `.flave/` is app-owned.)*

- `content/` is **ordered by filename prefix**, not by an index in a manifest.
  Reordering is a rename, which is a clean diff. (Learned from
  `context-v` conventions; index files rot.)
- `theme.css` is **generated**, never authored. Hand-editing it is a lint error.
  The two-tier token model comes straight from the existing `theme-system`
  skill so Flave documents and Astro Knots sites share a palette vocabulary.
- `data/_sources.yaml` and `assets/_manifest.yaml` exist because provenance is
  the thing agents lose first and humans need most in a document that makes
  claims.
- `.flave/` is the only directory the app owns. Everything else is the user's.

### 5.3 The manifest — `flave.yaml`

```yaml
flave: 1                              # format version — integer, not semver
id: 018f2a1c-6e3b-7c4d-9a10-2b5e7f0c3d81   # UUIDv7, minted once, immutable
title: Q3 Investor Update
surface: flow                          # flow | paged | deck   (§7.1)
created: 2026-08-14T09:12:00Z
modified: 2026-08-14T17:40:31Z

authors:
  - name: Michael Staton
    role: author
  - name: claude-opus-5
    role: agent

theme:
  extends: lossless/dark-vibrant@2.1  # installed theme, or ./theme
  tokens: ./theme/tokens.yaml

lfm:
  preset: lfm@0.3
  triggers:                            # which STC triggers are live
    - callouts
    - citations
    - link-preview
    - wikilinks
    - code-fences
  fence_formats:                       # opt-in, per lfm's zero-default registry
    - mermaid
    - vega-lite
    - json-canvas
  packs:                               # installed trigger-packs (§6.2)
    - ./components
    - lossless/pitch-blocks@1.4

capabilities:                          # the security contract (§10)
  scripts: sandboxed                   # none | sandboxed | trusted
  network: deny                        # deny | allowlist
  network_allowlist: []
  fonts: embedded
  data_exec: duckdb-wasm               # none | duckdb-wasm

publish:
  targets: [html-single, html-site, pdf]
  strip: [.flave/, data/_sources.yaml, README.md]
  redact: []                           # explicit block ids to omit
```

**`⟨DECIDE⟩ D-04`** — `flave: 1` as an integer format version with a hard
compatibility promise (a `flave: 1` reader must open any `flave: 1` document
forever), versus semver with negotiated features. Recommendation: **integer.**
Semver in file formats produces the OOXML nightmare.

### 5.4 How "Save as `Document.flave`" actually works

> Requested explicitly by the owner. This section is written to teach the
> mechanism, not just to specify it. **The honest summary: two-thirds of this
> is genuinely easy, and one-third is a real gotcha that sinks people.**

#### 5.4.1 The trick: a folder that the OS shows as a file

There is no special filesystem magic in `.app`, `.key`, `.pages`,
`.rtfd`, `.photoslibrary`, or `.xcodeproj`. **Every one of them is an ordinary
directory.** macOS just agrees to *draw* them as a single item and to open them
in an app on double-click instead of navigating into them.

The agreement is declared by the app, in its `Info.plist`, as a **Uniform Type
Identifier (UTI)** that conforms to `com.apple.package`:

```xml
<!-- flave-desktop Info.plist -->
<key>UTExportedTypeDeclarations</key>
<array>
  <dict>
    <key>UTTypeIdentifier</key>
    <string>sh.didi.flave.document</string>
    <key>UTTypeDescription</key>
    <string>Flave Document</string>
    <key>UTTypeConformsTo</key>
    <array>
      <string>com.apple.package</string>       <!-- ← the whole trick -->
      <string>public.composite-content</string>
    </array>
    <key>UTTypeTagSpecification</key>
    <dict>
      <key>public.filename-extension</key>
      <array><string>flave</string></array>
    </dict>
    <key>UTTypeIconFile</key>
    <string>FlaveDocument.icns</string>
  </dict>
</array>

<key>CFBundleDocumentTypes</key>
<array>
  <dict>
    <key>CFBundleTypeName</key><string>Flave Document</string>
    <key>LSItemContentTypes</key>
    <array><string>sh.didi.flave.document</string></array>
    <key>CFBundleTypeRole</key><string>Editor</string>
  </dict>
</array>
```

That is it. Once Launch Services sees this declaration, any directory named
`Something.flave` renders in Finder as one icon, double-clicks into Flave, and
shows "Show Package Contents" on right-click. **Creating the document is then
just `mkdir Q3-Update.flave` and writing files into it.**

**Two caveats you must know before betting on this:**

1. **The illusion requires Flave to be installed.** On a machine without it,
   `Q3-Update.flave` is a plain folder. Per Principle 1 this is *correct and
   desirable* — an agent or a collaborator without our software still sees
   readable files — but it means the single-file affordance is a courtesy to
   our users, never a guarantee about the format.
2. **It is macOS-only.** Windows Explorer and the Linux desktops have no
   equivalent. There, a `.flave` is visibly a folder.

#### 5.4.2 The transport problem, and the precedent that proves it

A directory does not survive the paths documents actually travel: email
attachment, Slack upload, a web form, most cloud-drive sync. Every one of those
either refuses a directory or silently uploads a folder.

**This is not hypothetical — Apple hit it and reversed course.** iWork
originally shipped `.pages` / `.key` as packages; modern iWork saves a **single
zip file** by default, keeping the package form only as an option for very large
documents. The transport problem beat the elegance.

So: **the directory is the working format; a zip is the shipping container.**

```
Q3-Update.flave/         ← directory. What you edit. jj repo. Agent-legible.
Q3-Update.flave          ← zip.       What you send. Byte-identical contents.
```

**Same extension for both, deliberately.** Directory-vs-zip is unambiguous at
the filesystem level — a directory is a directory, and a zip begins with the
magic bytes `PK\x03\x04` — so `flave-format` sniffs on open and the user never
learns there are two forms. This is strictly better than a `.flavez` second
extension, which would leak an implementation detail into the user's mental
model. Verify this at M0 with a fixture of each form.

#### 5.4.3 What "Save" actually does — and why it is *not* a save dialog

This is the part where the earlier draft would have gone wrong, and the `jj`
decision (§8.2) is what corrects it.

**A `.flave` is a `jj` repo. Therefore saving does not write a new document —
it writes changed files in place, and `jj` snapshots them.**

| Action | What actually happens |
|---|---|
| **New Document** | Native save panel (extension filter `flave`) → `mkdir Name.flave` → write `flave.yaml` + `content/001-untitled.lfm.md` → `jj git init --colocate` → initial snapshot. |
| **Save (`⌘S`)** | Write only the files whose contents changed, each atomically (§5.4.4). `jj` auto-snapshots the working copy. **No dialog, no full rewrite, no re-zip.** For most saves this is a handful of small text writes. |
| **Autosave** | The same thing on a debounce. Because `jj`'s working copy *is* a commit, autosave costs nothing conceptually — there is no "unsaved state" to reason about. |
| **Save As / Duplicate** | Copy the directory to a new path, mint a **new `id:` UUIDv7** in `flave.yaml` (§5.3 — the id is immutable per document, so a copy is a *new document*), and reinitialize history rather than inheriting the original's. |
| **Send to a collaborator** | `flave pack` → zip. `--with-history` includes `.jj` so they get the full change record; omitted by default because it is the bulk of the bytes. |
| **Publish** | Entirely separate path (§11). Never touches the bundle. |

> [!warning] **The gotcha that sinks people: do not "atomically swap the bundle."**
> The instinctive design for a package format is: write a whole new directory to
> a temp location, then atomically swap it over the old one. **That is exactly
> wrong here.** It would blow away the `.jj` directory — and with it the entire
> history — on every save, or at best leave `jj` staring at a working copy that
> teleported.
>
> **Atomicity belongs at the file level, not the bundle level.** The bundle is a
> live repo, not an artifact you republish on each keystroke.

#### 5.4.4 Per-file atomic write (the standard, boring, correct recipe)

For each changed file, on the **same volume** as the target — cross-volume
`rename` is a copy and is not atomic:

1. Write the new contents to a sibling temp file (`.flave/cache/tmp-XXXX`).
2. `fsync` the file descriptor.
3. `rename(2)` the temp path over the destination — POSIX guarantees this is
   atomic within a volume.
4. `fsync` the parent directory so the rename itself is durable.

A crash at any point leaves either the old file or the new file intact, never a
half-written one. This is ~20 lines in the Rust host and is the single highest
value-per-line safety measure in the app.

#### 5.4.5 The one part that needs a spike

Everything above is well-trodden except this: **Tauri 2's dialog plugin exposes
extension filters, not macOS `allowedContentTypes`.** The UTI declaration in
`Info.plist` is what makes Finder draw the package, and that part is
independent of the dialog — but `NSSavePanel` behaves subtly differently when
the target type is a package (for instance, it will not let you navigate *into*
an existing one). Whether Tauri's wrapper gets that behavior for free, or needs
a small Objective-C shim in `src-tauri`, is unknown.

**Action: a half-day spike at M0.** Declare the UTI, build a signed `.app`,
create a directory through the Tauri save dialog, and confirm Finder shows one
icon and double-click routes to the app. Everything else in the milestone
depends on the answer, and finding out at M3 would be expensive.

#### 5.4.6 Known rough edges to accept, not solve

- **Cloud-drive sync mangles packages.** iCloud Drive handles them; Google
  Drive and some Dropbox configurations historically have not, syncing them as
  folders or corrupting them mid-write. Guidance, not engineering: documents in
  sync folders should be kept in zip form, or better, in a `jj`/git remote.
- **Many small files are slow on network volumes.** A large document with a
  hundred assets is fine locally and sluggish over SMB. Acceptable.
- **Windows and Linux see a folder.** Also acceptable — and per §5.4.1, the
  format is *designed* to be legible when the illusion is absent.

### 5.5 Theme distribution — the shared design system

**Requested 2026-08-14: publish a brand's design system so a team shares one
theme, served from a CDN, with themed Tailwind as a supported output.**

`flave.yaml`'s `theme.extends: lossless/dark-vibrant@2.1` is the hook. A theme
package is itself a small, publishable bundle:

```
lossless-dark-vibrant/
├── theme.yaml           # name, version, author, license, mode support
├── tokens.yaml          # two-tier tokens — the source of truth
├── frames/              # ★ frame vocabulary ships WITH the theme (§7.2, D-15)
│   ├── flow/
│   ├── deck/
│   └── paged/
├── fonts/               # subset + license assertion
└── dist/
    ├── theme.css        # generated — CSS custom properties
    └── tailwind.preset.js  # generated — same tokens as a Tailwind preset
```

**Two design instructions here matter more than the plumbing:**

1. **A theme carries frames as well as tokens — and it is one layer of a
   cascade, not the sole owner.** (Full resolution model: §7.2, D-15.)

   *Why a theme carries frames at all:* **a Keynote theme is not a color scheme
   — it is a color scheme plus a set of slide masters.** Apple put layouts in
   the theme because adopting a look without its arrangements yields a document
   that is the right color and the wrong shape. That holds more strongly here,
   because §7.2 made frames the entire layout product. A theme that shipped
   only tokens would leave every team to reinvent the arrangements.

   *Why it is not the only source:* Flave ships a baseline set beneath it, and a
   document can define its own above it — `builtin < theme < pack < document`,
   most local wins. The theme layer is where a **team standard** lives: the
   thing everyone adopts together, in between what we ship and what one person
   improvised in one document.

   *What it buys:* the promotion path (§7.2). A frame proven inside one document
   graduates into the shared theme by an explicit act, and publishing the theme
   distributes it to the whole team. **This is the mechanism by which a team
   accumulates a design system rather than being handed one.**

2. **Tailwind is a generated output, never an input — so the two can't drift.**

   *Drift* is the standard design-system failure: someone edits the blue in
   `theme.css`, the Tailwind config still carries the old blue, and the brand
   now has two blues with no authority to settle which is right.

   *The fix:* design values are authored **once**, in `tokens.yaml`. A build
   step emits **both** `dist/theme.css` (CSS custom properties, consumed by the
   Flave renderer) and `dist/tailwind.preset.js` (identical values as a
   Tailwind preset, for anyone building a page with Tailwind). Because neither
   output is ever hand-authored, disagreement between them is not discouraged
   by policy — it is **structurally impossible**. This is why §5.2 makes
   hand-editing `theme.css` a lint error rather than a code-review preference.

#### Adopting a theme is a copy, not a link

> [!success] **RESOLVED 2026-08-14 — the owner's framing, which is simpler than
> the one I had:**
> > *"On starting a document, choosing a theme is more or less just copying it.
> > The agent should mainly adhere to it, but in places the user asks them to
> > innovate or change outside of it, that's fine. Resolving the diff with the
> > brand is the user team's issue."*

I had specced this as **fetch-and-pin**, reasoning from lockfiles. That was the
right *mechanism* reached by a needlessly complicated route. **It is a starter
copy** — the same thing this tree already does everywhere else (§12), applied
to themes.

The mechanics are unchanged and the reasoning gets shorter:

- Choosing a theme **copies** its tokens, fonts, and frames into the bundle
  under `theme/` and `frames/`, recording the source and version in
  `flave.yaml`. Network touched once, on an explicit gesture.
- The document then renders offline, forever, identically — no registry, no
  runtime dependency, no conflict with `network: deny` or Principle 5. **Not
  because we engineered around a hosted dependency, but because there was never
  a link in the first place.**
- A document sent last month cannot restyle itself because someone edited the
  brand this month. That falls out of copying; it needs no mechanism.
- The CDN (D-18) distributes **copies**. That is its entire job.

#### Drift is recorded, never prevented

The corollary the owner named — *resolving the diff with the brand is the user
team's issue* — is a real design instruction, and it replaces the brand-lock
that an earlier draft had put in §9.5:

> **A document knows which theme it started from and what it now does
> differently. Nothing about that record ever interrupts anyone.**

`flave theme diff` reports it — which tokens were overridden, which frames were
shadowed or newly authored (§7.2). A team lead can run it across many documents
to see where the brand is actually drifting in practice. **It is a report, not
a gate.** The agent adheres to the theme by default because that is the obvious
thing to do; asked to depart from it, it departs without ceremony.

`flave theme update` re-copies from the source and shows what changed — a merge
the user resolves, not a version bump that silently restyles them.

> [!success] **This closes a loop that was already half-built.** The owner noted
> *"we might have a solve for that eventually"* for reconciling drift against
> the brand. **The solve is the promotion path from §7.2**: drift is visible via
> `theme diff`, and a deviation that proves itself gets `flave frame promote`d
> into the theme, which is then republished to the team. Divergence becomes the
> mechanism by which the design system *learns*, rather than a compliance
> problem to police.

**`⟨DECIDE⟩ D-18`** — where does the registry live, and is it a product?
Candidates: (a) plain static hosting / GitHub Pages, resolved by URL — nearly
free, no accounts, no service to operate; (b) a real registry with namespaces,
private themes, and team access control — a service with a bill, but the only
version in which "two people on the same team share a design system" works for
teams that are not us. Recommendation: **(a) for v1**, with the manifest's
`theme.extends` shaped so a namespaced registry can be added later without a
format break. Note the strong pull toward (b) if D-12 (hosted publish) is also
a yes — they are the same service.

---

## 6 · The language layer: LFM, extended

### 6.1 What Flave inherits from `lfm` unchanged

The whole STC paradigm ports directly. Today `lfm` normalizes many authoring
syntaxes into one `componentNode`; a renderer dispatches on it. Flave is just a
**new renderer** on the same AST — one that runs live in a Svelte app instead
of at Astro build time.

Concretely reused with no fork:
`remarkCallouts` · `remarkCitations` · `remarkLinkPreview` ·
`remarkLosslessWikilinks` · `remarkHeadingIds` · `remarkCodeFences` +
`FenceFormat` registry · the `LfmComponentNode` shape · `parseMarkdown()`.

**`⟨DECIDE⟩ D-05`** — the one architectural strain: `lfm`'s `og-fetcher` and
link-preview enrichment are **build-time, network-touching** operations. In a
live editor with `network: deny`, they can't run inline. Options: (a) enrichment
is an explicit user-invoked "fetch previews" action that writes results into
`data/`, (b) enrichment happens in the Rust host process, outside the sandbox,
on user gesture. Recommendation: **(b), gated on the same trust gesture as
scripts.**

### 6.2 Trigger-packs — extensibility without code

> *"Anyone can customize the syntax and give it a power."*

Today that means writing a remark plugin — a developer act. Flave splits it:

**Tier 1 — Trigger-pack (declarative, no JS, safe by default).** A YAML file
mapping a syntax to a template plus a props schema.

```yaml
# components/metric-card.trigger.yaml
name: metric-card
syntaxes:
  - directive: "metric-card"          # :::metric-card{value=... label=...}
  - fence: "metric"                   # ```metric ... ```
props:
  value:  { type: string, required: true }
  label:  { type: string, required: true }
  delta:  { type: string }
  trend:  { type: enum, values: [up, down, flat], default: flat }
template: ./metric-card.html          # HTML with {{ props }} interpolation
styles:   ./metric-card.css           # scoped at render
```

This is the tier the **agent** works in, and the tier that ships with the
document. It has no code execution, so it needs no trust gesture.

**Tier 2 — Plugin (real JS, developer tier, trust-gated).** A published npm/JSR
package exporting remark plugins and/or Svelte components. Installed at the app
level, not bundled into the document, and subject to §10.

**Why the split matters:** if end-users must write remark plugins, this is a
developer tool, not a Pages competitor. Tier 1 is what makes the claim true.

### 6.3 Formats agents are fluent in — the full roster

The user asked "anything else?" Beyond HTML/CSS/JS/JSON/CSV/YAML/Vega-Lite/D3/SVG,
these all clear the bar of *"an agent writes this correctly on the first try"*
and are worth first-class fence handlers:

| Format | Why it earns a slot | Tier |
|---|---|---|
| **Observable Plot** | ✅ **APPROVED 2026-08-14.** Dramatically higher agent first-try success than raw D3 — grammar-of-graphics ergonomics, imperative-friendly. **The default chart tier**: Vega-Lite for anything a declarative spec can express (and it is privileged in §10 because a `.vl.json` is data, not code), Plot for everything else, raw D3 only as the escape hatch. | Core |
| **Mermaid** | Already an `lfm` fence format. Flowcharts, sequence, gantt, ER. | Core |
| **KaTeX / LaTeX math** | Non-negotiable for segments B and D | Core |
| **GFM tables** | Already in the `lfm` preset | Core |
| **TOML** | Config-shaped metadata; agents handle it as well as YAML | Core |
| **GeoJSON / TopoJSON** | Maps, with Plot's geo marks | Extended |
| **JSON Canvas** | Already an `lfm` fence format; open spec; whiteboard surfaces | Extended |
| **Graphviz DOT** | Better than Mermaid for dense graphs | Extended |
| **PlantUML** | Already in `lfm/src/formats/plantuml.ts` | Extended |
| **SQL (over DuckDB-WASM)** | Turns `data/*.csv|parquet` into a queryable in-document warehouse — a genuinely differentiating feature (§7.4) | Core |
| **JSON Schema** | Already in `lfm/src/formats/json-schema.ts`; renders prop contracts | Extended |
| **Web Components** | The correct framework-free escape hatch for custom blocks | Extended |
| **Typst** | Only if paged/print fidelity becomes a v2 requirement — see §7.1 | Deferred |

Deliberately excluded: MDX (JSX lock-in — the whole reason `lfm` exists),
Jupyter `.ipynb` (execution model is a different product), R Markdown/Quarto
(would make us a Quarto skin).

---

## 7 · The editing model — the hardest problem in the spec

Pages and Keynote users **direct-manipulate**: they drag a box. If the source of
truth is markdown and CSS, what changes on disk when a user drags?

This question has killed products. Dreamweaver, Adobe Muse, and every
"visual HTML editor" died on it. Flave must answer it explicitly.

### 7.1 Surface types

Not all documents are the same beast. A `.flave` declares exactly one:

| `surface` | Model | Geometry | Print |
|---|---|---|---|
| **`flow`** | Continuous scrolling document (report, memo, essay) | Single column, responsive, no page breaks | Print-to-PDF via browser; pagination is best-effort |
| **`paged`** | Fixed page geometry (Word/Pages replacement) | CSS Paged Media + Paged.js, real page boxes, running headers | First-class, deterministic |
| **`deck`** | Discrete slide surfaces (Keynote replacement) | Fixed aspect-ratio frames, one block-group per slide | Export = one page per slide |

> [!success] **D-06 — RESOLVED 2026-08-14 · all three surfaces are v1 scope**
> Built in risk order — `flow`, then `deck`, then `paged` — but all three ship
> before v1 is called v1. The honest claim becomes *"replaces Google Docs,
> Keynote, and Pages,"* and we have to earn all three.
>
> **This decision got materially cheaper because of the §7.2 resolution.**
> The expensive part of `paged` was never rendering — Paged.js and CSS Paged
> Media handle rendering. The expensive part was always *direct manipulation
> across a page break*: a user dragging a text box that then reflows onto the
> next page, and the app having to decide what that means. **With the mouse
> removed from layout entirely (§7.2), that entire class of problem does not
> exist.** Content flows; the engine paginates; the user adjusts by naming a
> frame or setting a token. This is the rare case where a stricter interaction
> model makes a harder surface tractable.

#### The real cost of `paged`: three capabilities LFM does not have

`paged` is not free, and the cost is not in the app — it is **upstream in
`lfm`**. Print-shaped documents require three things the current pipeline
cannot express:

| Missing | Why `paged` needs it | Where it must land |
|---|---|---|
| **Footnotes** with page-bottom placement | The defining feature of a printed report. `remarkCitations` handles hex-code *citations* (a different concept — a reference to a source), not numbered notes anchored to a page box. | New `remarkFootnotes` in `lfm` |
| **Cross-references** (`see §4`, `Figure 3 on page 11`) | Page numbers only exist after pagination, so a reference must be a resolvable node the renderer fills in late | New `remarkCrossRefs` in `lfm` |
| **Auto table-of-contents** with page numbers | Same late-binding problem; `remarkHeadingIds` supplies the anchors but nothing assembles or numbers them | New `remarkToc` in `lfm` |

Per §15's non-negotiable, **all three are upstream PRs to `lfm`, not Flave-local
forks.** They are good additions to LFM on their own merits — any Astro Knots
long-form page wants footnotes and cross-refs too. Budget them as real work:
they are the hidden two-thirds of the `paged` milestone.

### 7.2 The three-layer separation (the core proposal)

```
┌─ PROSE ────────── content/*.lfm.md ──── markdown. Direct text editing.
│                                          Agent-editable. Diffs beautifully.
├─ LAYOUT ───────── layout/surfaces.json ─ JSON. What sits where, in what
│                                          frame, at what span. THIS is what a
│                                          drag handle writes to.
├─ STYLE ────────── theme/tokens.yaml ──── Tokens. Colors, type scale, spacing.
│                                          A style control writes a token, never
│                                          an inline CSS rule.
└─ ESCAPE ───────── raw HTML/CSS/JS ────── Allowed, sandboxed, and NEVER
                                           round-tripped through the GUI.
```

> [!success] **RESOLVED 2026-08-14 · the ceiling holds, and drops further:
> there is no mouse-driven layout editing at all**
>
> The original proposal was *"a GUI gesture may only write to `layout/` or
> `theme/`."* The owner's resolution goes further and is better:
>
> > **The mouse reads. The keyboard and the agent write.**
> > There is no drag-to-position, no drag-to-resize, no drag-between-slots.
> > Layout is changed by **naming a frame** (command palette or source view) or
> > by **asking the agent**. The mouse selects text, scrolls, and operates
> > token controls — nothing else.

**Why this is the right call and not merely a simplification:**

1. **It kills the failure mode outright.** The Dreamweaver/Muse death was never
   "the ceiling was too low" — it was that drag handles must emit *something*,
   and the something is always positional CSS. Remove the handles and there is
   no emission path to police.
2. **It makes `paged` and `deck` affordable** (see §7.1). Direct manipulation
   is what makes fixed-geometry surfaces expensive.
3. **It is honest about who this is for.** The operator-author persona (§3.2)
   is comfortable in markdown and has an agent. They would rather type
   `⌘K two-column, chart on the right` than hunt for a drag target. Pretending
   otherwise would have produced a mouse-driven layer nobody in Segment A uses.
4. **It makes agent and human writes identical.** Both go through the same
   named-frame vocabulary and the same typed ops (§9.2). There is no
   "the human did it by hand so the agent can't understand it" divergence —
   which is the exact rot that makes agent-edited documents degrade over
   sessions.

**Precise statement of what the mouse may still do**, since "no mouse" is too
blunt:

| Mouse may | Mouse may not |
|---|---|
| Select and edit text inline in Compose | Position, resize, or reorder blocks |
| Operate token controls (color picker, type-scale slider) — these write to `theme/tokens.yaml`, which was always permitted | Emit any inline style or positional CSS |
| Click a frame in a frame-picker (a *named choice*, not a manipulation) | Free-form drag anything, in any surface |
| Navigate, scroll, zoom, select blocks for a subsequent keyboard/agent command | Edit a raw escape-hatch HTML/CSS/JS block visually |

#### What a frame is

Removing the mouse from layout removes the answer to *"how does a block end up
on the right side of the page?"* **A frame is the replacement**: a named
arrangement — grid geometry plus named slots that content drops into.

```yaml
# frames/flow/two-col-emphasis-right.yaml
name: two-col-emphasis-right
description: Commentary at left, the thing you're emphasizing at right.
slots:
  main:  { span: 4, accepts: [prose] }
  aside: { span: 8, accepts: [viz, image, prose] }
geometry: "grid-template-columns: 4fr 8fr; gap: var(--space-6)"
```

Instead of dragging a chart rightward, the user (or the agent) says *"use
`two-col-emphasis-right`, chart in `aside`."* The frame owns the geometry; the
caller supplies only a name and a slot. `layout/surfaces.json` (§7.2) is
therefore a list of *frame choices and slot assignments*, never coordinates.

**The familiar equivalent: these are Keynote's slide layouts.** Choosing
"Title & Bullets" or "Photo — 3 Up" in Keynote *is* choosing a frame.
PowerPoint stores the same concept as slide layouts inside the slide master.
Flave's contribution is applying it to `flow` and `paged` surfaces too, and
making the name addressable by keyboard and by agent.

#### Where frames come from — the cascade

> [!success] **D-15 — RESOLVED 2026-08-14 · frames cascade; the most local
> definition wins**
> Not "app-owned" or "theme-owned" — **both, resolved like CSS.** Flave ships a
> baseline set; a theme may override or extend it; a document may override or
> extend that. The most specific, most local definition wins.

Resolution order, lowest precedence first — deliberately parallel to the
`@layer` order in §4.1:

```
builtin  <  theme  <  pack  <  document
   │         │         │         └─ frames/ inside the .flave bundle
   │         │         └─────────── frames a trigger-pack brings with it (§6.2)
   │         └───────────────────── frames/ inside the theme package (§5.5)
   └─────────────────────────────── the baseline set Flave installs with
```

**Three mechanics that make this debuggable rather than mysterious:**

1. **Same name = full shadow, not a merge.** A document-local
   `two-col-emphasis-right` replaces the theme's frame of that name *entirely*.
   Implicit multi-layer merging of grid geometry is the kind of thing nobody
   can debug at 11pm. The app **warns visibly** when a name is shadowed.
2. **Partial override is explicit, via `extends:`.**
   ```yaml
   name: two-col-emphasis-right
   extends: theme/two-col-emphasis-right   # inherit, then override
   slots:
     aside: { span: 9 }                    # just wider
   ```
   You get the ergonomics of inheritance without the ambiguity of implicit merge.
3. **Provenance is always visible.** Every frame in the ⌘K palette (§7.3) shows
   its origin — `builtin` / `theme` / `pack` / `document` — and shadowed frames
   render as shadowed. With four possible sources, *"why do I have two frames
   called X"* has to be answerable at a glance.

#### The promotion path — local experiment to shared standard

The owner's addition: *users can publish their own frames back into a shared
theme.* This is the loop that makes the cascade a system rather than an
override hack:

```
author locally in frames/  →  prove it in a real document  →  promote to the theme
                                                          →  publish the theme (§5.5)
```

`flave frame promote <name> --to theme` is a file move plus a version bump —
trivial to build, and it is the **curation gate**. Frames are born free and
unreviewed inside one document; they become shared standards only by an explicit
act. This is exactly how our own conventions already graduate from a one-off
into a skill.

> [!success] **Two open questions collapse into this resolution.**
>
> **The "thin frame library is a hard wall" risk (§15) drops from Critical to
> Medium.** The wall existed only because a missing frame had no workaround. Now
> a user — or an agent — who needs an arrangement that does not exist authors it
> into the document's own `frames/` and keeps working. Nobody waits on us. What
> remains is a *quality* concern (the baseline set should be good) rather than a
> *blocking* one.
>
> **"Curated frames vs. agent-authored frames" is answered: both, with locality
> as the safety boundary.** The agent may freely author frames into the
> document's `frames/`, where the blast radius is one document. Promotion is
> where a human decides something earned wider use. Unbounded vocabulary where
> it is cheap; curation where it matters.

> [!warning] **The burden this transfers — read this before agreeing**
> If nobody can drag, **the frame vocabulary becomes the entire layout
> product.** Every arrangement a user could reach by dragging must instead
> exist as a *named, discoverable frame*. A poor frame library under this model
> is not an inconvenience; it is a hard wall with no workaround short of
> hand-editing `surfaces.json`.
>
> This converts the riskiest v1 deliverable from an *interaction* problem into
> a *design-system* problem: someone must author a genuinely good, well-named,
> well-documented frame library across all three surfaces. See §15 and the new
> **D-15**.

**`⟨DECIDE⟩ D-07` is hereby MOOT.** Free absolute positioning in `deck`
surfaces was a drag-gesture question. With no drag, slides are frame-composed
like every other surface. If a deck genuinely needs an element at an arbitrary
coordinate, that is a *frame* someone authored with that slot in it.

A layout entry looks like:

```json
{
  "surface": "s3",
  "frame": "two-col-right-emphasis",
  "blocks": [
    { "ref": "003-metrics#arr-growth", "slot": "main", "span": 8 },
    { "ref": "003-metrics#commentary", "slot": "aside", "span": 4 }
  ]
}
```

`ref` is a stable block address (§8.1). Prose does not know where it renders.

### 7.3 Editing surfaces in the app

Four coexisting surfaces over the same document. Note that with §7.2 resolved,
**three of the four are keyboard-or-agent driven** — the app is far closer to a
fast text editor with a live preview than to a page-layout tool.

1. **Compose** — the rendered document. Inline text editing (typing).
   Block selection for subsequent commands. **No manipulation handles exist.**
2. **Command palette (`⌘K`)** — *promoted from a convenience to the primary
   layout interface.* Everything the mouse can no longer do lives here:
   `frame: two-column, emphasis right` · `place chart in aside` ·
   `move block after §Metrics` · `new slide from frame: quote-full-bleed`.
   Fuzzy-searchable over the installed frame vocabulary, which makes the
   vocabulary *discoverable* — the mitigation for the burden §7.2 flags.
3. **Source** — the actual LFM / JSON / YAML with live preview. CodeMirror 6.
   The floor: anything the palette can't express is hand-editable here.
4. **Chat** — the agent surface (§9). Always available in a rail. For layout,
   this is often the *fastest* path: *"put the two charts side by side and move
   the commentary under them."*

**Design consequence worth naming:** the command palette and the agent's
Document API (§9.2) should be **the same operation set**, differing only in
input modality — the palette is a typed, autocompleted front-end over the
identical ops the agent calls. Build them as one layer. This is a real
architectural instruction, not a nicety: it guarantees a human and an agent can
never reach a state the other can't describe.

### 7.4 Live data (the differentiator)

Because `data/` ships with the document and DuckDB-WASM can query it in-process:

````markdown
```sql name=arr_by_segment
SELECT segment, month, SUM(arr) AS arr
FROM 'data/arr-by-month.csv'
GROUP BY 1, 2 ORDER BY 2;
```

```vega-lite data=arr_by_segment
{ "mark": "line", "encoding": {
    "x": {"field": "month", "type": "temporal"},
    "y": {"field": "arr", "type": "quantitative"},
    "color": {"field": "segment"} } }
```
````

The chart is not an image. It is a query plus a spec. Swap the CSV, everything
downstream updates. **This is the capability no "ask Claude for an HTML file"
workflow can match**, and it is the strongest single answer to §2.2.

### 7.5 Live data from an API — and where HTMX actually fits

The owner raised HTMX for the case *"a graph or image or variable reading from
an API."* Allowed, but with one correction and one hard rule.

> [!warning] **The correction: HTMX is probably the wrong tool for the case
> described.**
> HTMX's model is **HTML over the wire** — the server returns an HTML fragment
> and HTMX swaps it into the DOM. An API returning **JSON** — which is what
> nearly every API returns — is not what HTMX is built for. Reaching for it
> there means writing JSON-to-HTML glue anyway, which is the dependency-tier
> answer (T1 rung 4) to a problem the data tier already solves.

**The T1 ladder for live data, in order.** Take the highest rung that works:

| Rung | Tool | Use when |
|---|---|---|
| **1 · Data** | **Vega-Lite `data: {url: "..."}`** | *"A graph reads from an API."* ★ **This is the right answer for the owner's example.** Vega-Lite loads remote JSON/CSV natively — no JS authored, stays in the data tier, and inherits Vega-Lite's §10 privilege of being a spec rather than code. |
| **2 · Data** | Pinned fetch into `data/` on a user gesture | The numbers should be *as of send time*, not as of read time — true for most memos, updates, and decks. Almost always what people actually want. |
| **3 · JS** | Native `fetch` + `<template>` | A scalar or variable interpolated into prose. A dozen lines; no dependency. |
| **4 · Dependency** | **HTMX** | ✅ **Approved for exactly one case: the server genuinely returns HTML fragments.** Internal dashboards and status endpoints do this. Then HTMX is the right tool and the small dependency is earned. |

#### The hard rule: every live binding carries a pinned snapshot

Non-negotiable, and it falls straight out of the fetch-and-pin decision already
made for themes (§5.5) and out of Principle 5:

> **Any live-data binding MUST write its last successful response into `data/`
> with an `_sources.yaml` timestamp. A document renders the pinned snapshot
> when the live fetch is unavailable, disallowed, or slow — never an error,
> never a blank, never a spinner that stays.** Live values render with a
> visible "as of" affordance so a reader always knows which they are seeing.

**This mechanism does double duty, which is why it is cheap.** The pinned
snapshot is not a fallback bolted on for reliability — it is *the rendering for
untrusted documents*:

| Reader's trust level | What renders |
|---|---|
| `scripts: none` (default for received documents, §10.2) | The pinned snapshot, with its "as of" date. **Fully readable.** |
| `scripts: sandboxed` + `network: allowlist` + explicit trust gesture | Live values, refreshing against the allowlisted host |

One document, one mechanism, correct behavior at both trust levels. An LP
opening your memo in 2029 sees the numbers as of the day you sent it — not a
broken chart, and not silently different numbers than the ones you meant.

**`⟨DECIDE⟩ D-19`** — is the "live document" (dashboard, status page, current
portfolio) a v1 use case at all, or does v1 ship only rungs 1–2, with rungs 3–4
deferred? Recommendation: **rungs 1–2 in v1** — they cover the owner's stated
example completely and require no trust tier — with HTMX and `fetch` landing at
M6 alongside the capability model that makes them safe. Building the network
tier before the trust tier is the wrong order.

---

### 7.6 Figures — saved displays over one dataset

Owner, 2026-08-14:

> *"If I have all of a portfolio company's financials and KPIs in a time series
> spanning the life of the company, I have all the data I need to generate any
> data vis for any use case. I guess this hits on a v1.5 or v2.5 — to save
> 'displays' or 'renders,' where different kinds of rendered outputs can be
> saved within the same `.flave`."*

**This is the same pattern as §11.1, on the data axis.** Content has one source
and many renditions; data has one dataset and many displays. The `.flave` holds
the *full* series; what any given audience sees is a derived view of it.

#### Naming: **Figure**

Per §4.2 — *coin a noun only where none exists* — this one has a perfect
standard word. In technical and academic publishing a **Figure** is exactly
this: a numbered, captioned, referenceable visual. It also composes with the
cross-reference work already budgeted for `paged` (§7.1, *"Figure 3 on page
11"*), which "display" and "render" would not.

*(Nuance accepted: traditionally "figure" names the rendered output, while here
it names the saved recipe. That is the same elision as "chart" and it has never
confused anyone.)*

#### A figure is a query + a spec + a clearance + captions

```yaml
# viz/arr-growth.figure.yaml
name: arr-growth
clearance: public              # the FIGURE's clearance — NOT the data's
query: arr_by_segment          # a named `sql` fence result (§7.4)
spec: ./arr-growth.vl.json
materialize: aggregate         # ★ see below — what actually ships
caption:
  full:  "ARR by segment, 2021–2026. Enterprise overtook self-serve in Q2 2024."
  brief: "ARR up 4× since 2021."
```

Captions carry registers, consistent with §11.1 — the same figure gets a
thorough caption in the LP deck and a punchy one in the public one-pager,
without a second copy of the figure.

One dataset, many figures: the full financials yield a growth chart for the
public deck, a cohort table for the LP appendix, and a burn-detail chart for the
board — **each with its own clearance, all from the same rows.**

> [!warning] **`materialize:` is a security control, not a performance knob**
> This is where §7.6 collides with §11.1's Critical risk, and the collision is
> the reason this cannot be deferred wholesale.
>
> A portfolio company's full time series is `clearance: private`. A chart
> derived from it is `clearance: public`. **Vega-Lite inlines its data** — so a
> naive publish of that public chart ships every private row inside the spec.
> It is the exact vector §11.1 names as highest-risk *because nothing about it
> looks wrong*.
>
> **The rule: publishing a figure materializes only the rows the spec actually
> renders — the query result, post-aggregation — and never the source table.**
> A public figure over private data must be provably free of the private rows,
> and the clearance scan checks the published bytes for exactly that.

#### On timing — partly agreeing, partly not

The owner placed this at v1.5/v2.5. **Split it:**

| Piece | When | Why |
|---|---|---|
| **The figure object** — `name`, `clearance`, `query`, `spec`, `materialize`, registered captions | ★ **v1 (M2/M5)** | Clearance-safe materialization is a v1 requirement *regardless*, because it is the top leak vector. And retrofitting clearance into a data model after people have real documents is precisely the migration that poisons a format — the same argument that froze block addressing at M0 (§8.4). |
| **The figure gallery** — browse, preview, duplicate, "make me one like this" | **v2** | Pure UX over a settled model. Genuinely deferrable, exactly as the owner supposed. |

So: **the model lands at v1 because safety demands it; the experience lands at
v2 because nothing demands it sooner.** Cheap now, expensive later.

#### Why this makes the agent's job well-posed

Given the full series plus a library of existing figures, *"make me a burn chart
for the board deck"* is a **well-specified request**: the data is present, the
house conventions are visible as examples, and the target clearance is declared.
Compare the alternative — an agent handed a spreadsheet and a vibe. **Figures
are how this product's most common agent request stops being open-ended.**

**`⟨DECIDE⟩ D-22`** — do figures live in `viz/` alongside their specs, or in a
top-level `figures/`? Recommendation: **`figures/`**, with `viz/` holding only
raw specs. A figure is a document-level object with a caption and a clearance;
a `.vl.json` is an implementation detail it points at.

---

## 8 · Document mechanics

### 8.1 Block addressing

Every block gets a stable id so layout, agent ops, comments, and diffs can all
point at it. Derived deterministically (`lfm`'s `remarkHeadingIds` sets the
precedent, and `remarkCodeFences`' comment is explicit that ids must be
derivable, never `Math.random()`).

Address form: `content/003-metrics.lfm.md#arr-growth`, shortened to
`003-metrics#arr-growth`. Explicit ids via `{#id}` win over derived ones.

### 8.2 Version control — Jujutsu, driven by the agent

**RESOLVED 2026-08-14 · every `.flave` is a `jj` repo. The agent runs all VCS
operations under the hood. A "geek mode" toggle lets the user watch.**

This is not a preference; `jj`'s model is a materially better fit for a
document application than git's, on four specific points:

| `jj` property | Why a document app needs exactly this |
|---|---|
| **The working copy *is* a commit, auto-snapshotted** | There is no staging area, no `add`, no "did I forget to commit." Every save is already history. **`.flave/history/` from the earlier draft is deleted — `jj` subsumes it entirely**, and does it better, because the snapshot is a real revision rather than a private blob format. |
| **The operation log with `jj undo` / `jj op restore`** | Undo applies to *operations*, not just commits. An agent that restructured six blocks, moved a chart, and recolored two tokens is **one operation the user can undo as one gesture.** In git that is a multi-file reset nobody would trust an agent to perform. This is the single strongest argument for `jj` here. |
| **Stable change IDs across rewrites** | An agent can durably reference *"the change where I restructured the metrics section"* even after that change is amended or rebased. Git commit hashes churn on every rewrite and break exactly this kind of agent memory (§9.4). |
| **First-class conflicts — recorded, not blocking** | Merging a collaborator's returned bundle never hard-fails. The document opens with conflicts *represented* and resolvable in-app, which is the only tolerable behavior for a non-developer receiving a colleague's edits (§8.4, v1 async). |

**Git compatibility is retained, not sacrificed.** `jj` uses a git-compatible
backend and colocates (`jj git init --colocate`), so the §2.2 differentiator
*"a `.flave` in a repo gets real code review"* still holds, and any user or CI
system that only speaks git sees a normal git repo. **`jj` is our interface to
history; git remains the interchange format.**

#### Geek mode

The default experience never mentions version control. The user saves; history
happens. Geek mode is a toggle that reveals:

- **The command stream** — every `jj` invocation the agent makes, verbatim,
  with its rationale, as it happens.
- **The operation log** — a readable `jj op log` view with one-click undo per
  operation.
- **The change graph** — `jj log`, for users who want it.

**Rule regardless of the toggle:** every agent VCS action is recorded in plain
language in `.flave/agent/`. Geek mode changes *visibility*, never *auditability*.
An agent that can rewrite history invisibly and unloggably is not acceptable
even when the user has said they don't want to see it.

#### Agent autonomy over history — the undo horizon

> [!success] **D-17 — RESOLVED 2026-08-14 · agents are fully autonomous by
> default. No permission prompts.**
> The owner's reasoning, which is correct: permission dialogs are technical,
> constant, and train users to click through them. *Just do the job.* The
> constraint is not "ask first" — it is **"stay somewhere everything can be
> taken back."**

My earlier recommendation (gate `squash` / `abandon` / `rebase` behind
`propose`) was **wrong, and jj is why.** Those operations feel destructive
because in git they are. In `jj` they are recorded in the operation log and
reversible with `jj undo` / `jj op restore`. Gating them would have imposed
git's anxieties on a tool built specifically to remove them.

The correct line is not a list of scary commands. It is a **boundary**:

> **The undo horizon — the agent acts with full autonomy on any operation
> `jj undo` can reverse. Operations that leave that region require a human
> gesture, because outside it "revert" stops being available.**

| Inside the horizon — fully autonomous, no prompt | Outside — requires a gesture |
|---|---|
| snapshot, `describe`, `new`, `edit`, `split`, `duplicate`, `bookmark` | **`jj git push`** (any form) — once pushed, someone else may have it; local undo cannot reach them |
| **`squash`, `abandon`, `rebase`, `restore`** — all reversible via the op log | **`jj op abandon` / op-log pruning** — destroys the undo mechanism itself. **The agent may never do this, gesture or not.** |
| Creating, rewriting, and reorganizing document history freely | **Writing outside the bundle**, or deleting the bundle |
| Deleting files inside the bundle (auto-snapshotted first, so recoverable) | **`flave publish` to a hosted target** (§11) — same class: it leaves the machine |

**Why this is both more permissive and safer than what I proposed:** the agent
gets *more* freedom over history than a propose-gate would have allowed, and the
guarantee is stronger — not "the agent only adds," but **"nothing the agent did
locally is unrecoverable."** The worst outcome of a bad agent session is one
`jj undo`.

**One implementation requirement this creates:** an agent's work in a turn must
be **one operation, not twenty**. If restructuring six blocks produces six
separate ops, "undo the agent's last session" becomes six undos and the
guarantee degrades into a chore. `flave-vcs` wraps each agent turn in a single
`jj` operation so it undoes as a unit. This is the difference between the
guarantee being real and being technically true.

#### Plain-language vocabulary — jj is the implementation, not the interface

The default user must never encounter the word *jujutsu*, *revision*, or
*bookmark*. **The plain-language layer is the primary UI; `jj` is what runs
underneath it.** Geek mode (above) reveals the real thing for those who want it.

| `jj` concept | User-facing name | One-line explanation shown in the UI |
|---|---|---|
| operation | **Step** | "Something that happened to your document." |
| `jj undo` | **Undo that step** | "Takes back everything that step did — including a whole agent session at once." |
| change / revision | **Version** | "A saved state of the document you can return to." |
| operation log | **History** | "Every step, newest first. Undo any of them." |
| conflict | **Disagreement** | "Two versions changed the same thing. Pick one, or blend them." |
| bookmark | **Marker** | "A name you gave a version so you can find it again." |
| `jj git push` | **Share to remote** | "Sends your history somewhere others can see. This one can't be undone from here." |

**These strings are a v1 deliverable with an owner, not copy written at the
end.** Every prompt, option, and log entry the user sees comes from this table.
An agent operating autonomously over version control is only acceptable if its
actions are legible to the person it is acting for — and legibility here is
entirely a vocabulary problem.

#### Semantic diff

**`⟨DECIDE⟩ D-08`** (unchanged) — do we ship a `flave diff` rendering a
*document-semantic* diff (block moved, chart data changed, token recolored), or
lean on `jj diff` / `git diff` for v1? Recommendation: **`jj diff` for v1.**
`jj`'s auto-snapshotting makes a semantic diff *easier* later, since every
intermediate state is already addressable — reserve the design, build it in v2
alongside structured review (§8.4), where the two features reinforce each other.

### 8.3 What `jj` replaces

For clarity against the earlier draft: `.flave/history/` **no longer exists**.
The `.flave/` directory holds `agent/` and `cache/` only. History is `jj`'s job,
lives in the repo, and is a first-class artifact rather than an app-private
safety net.

### 8.4 Collaboration

**D-09 — RESOLVED 2026-08-14 · all three, staged in this order:**

| Release | Model | What it buys |
|---|---|---|
| **v1** | **Async file exchange** — send the bundle; git optional | Matches Principle 4 and the "you get the internals" pitch exactly. Near-zero incremental cost: because everything is text, `git diff` and `git merge` work the day the format exists. |
| **v2** | **Structured review** — comments stored in `.flave/review/`, suggest-mode where proposed edits are accepted block-by-block | Google Docs' actual killer feature. **Reuses the agent's `propose` contract (§9.1) pointed at humans instead of at an agent** — one acceptance mechanism, two producers. This reuse is why it lands in v2 rather than v3. |
| **v3** | **Real-time CRDT multiplayer** (Yjs / Automerge) | Live co-editing. Deferred deliberately: CRDT over a three-layer document (prose + layout JSON + tokens) with a sandboxed script tier is a multi-quarter project on its own, and Segment A does not need it. |

**Design instruction that follows from the staging:** v1 must store comments
and review state *nowhere*, but v2's `.flave/review/` location and the
block-addressing scheme (§8.1) must be reserved and stable from M0. Retrofitting
stable block ids after people have real documents is the kind of migration that
poisons a format.

---

## 9 · The agent layer

### 9.1 Reuse from `augment-it/apps/chat`

Port wholesale, not re-architect:

- The **three response modes** — `answer` (talk), `propose` (offer changes the
  user accepts), `invoke` (call a capability) — plus `capability_result`.
  The `propose` mode is *exactly* the right contract for document editing:
  the agent never silently mutates; it proposes and the human accepts.
- The **inline-draft pattern** from `PromptDraftPanel.svelte` — drafts render
  as turns in the dialog, not as detached artifacts. Directly applicable to
  proposed document blocks.
- The **Svelte 5 `$state` transcript container** shape from
  `chat-state.svelte.ts`.
- The **module-federation remote** mount contract, so the chat surface stays a
  separable app rather than fusing into the editor.

### 9.2 The Document API — what the agent is actually allowed to do

The agent never writes bytes to files. It calls typed operations. This is the
thing that makes Flave agent-*native* rather than "an editor with a chat panel."

```ts
// Prose
block.insert(after: BlockRef, content: LfmSource): BlockRef
block.replace(ref: BlockRef, content: LfmSource): void
block.edit(ref: BlockRef, patch: TextPatch): void       // surgical, not rewrite
block.move(ref: BlockRef, to: BlockRef): void
block.remove(ref: BlockRef): void

// Layout
layout.place(ref: BlockRef, surface: SurfaceId, slot: string, span?: number): void
layout.reframe(surface: SurfaceId, frame: FrameId): void
surface.create(after: SurfaceId, frame: FrameId): SurfaceId

// Style — tokens only. There is no `style.setCss`. Deliberately.
theme.setToken(path: string, value: string): void
theme.extend(themeRef: string): void

// Data & viz
data.add(path: string, bytes: Uint8Array, source: Provenance): void
data.query(sql: string): Table
viz.upsert(id: string, spec: VegaLiteSpec | PlotSource): void

// Extensibility
pack.define(trigger: TriggerPackDef): void
pack.install(ref: string): void        // trust-gated

// Publication
publish.preview(target: PublishTarget): PreviewHandle
publish.export(target: PublishTarget, dest: Path): Artifact
```

**Note the absence:** there is no `style.setCss(...)`, and no way to emit an
inline style or a free-floating rule. **This is not a ban on the agent writing
CSS** — §9.6 explicitly expects it to. It is a requirement that CSS always
arrive *attached to a named thing*: a frame definition or a trigger-pack, both
of which have a name, a home in the cascade, and a promotion path. Free-floating
CSS has none of those, which is precisely why documents rot after ten agent
sessions. Same capability ceiling as the GUI (§7.2), applied to the agent.

### 9.3 Where the agent runs

**`⟨DECIDE⟩ D-10`** — three options, following `memopop-native`'s precedent of
a Rust host spawning a sidecar:

| Option | Notes |
|---|---|
| **BYO-key, in-app** (Claude Agent SDK from the Tauri host) | Simplest; matches `augment-it`'s existing `@anthropic-ai/claude-agent-sdk` dependency; no server to run |
| **Local sidecar** (like memopop's FastAPI process) | Needed if we want heavier orchestration/tooling |
| **Hosted service** | Required for a non-technical segment; a whole business to operate |

Recommendation: **BYO-key in-app for v1.** Segment A already has keys. Do not
build a backend before the format is proven.

### 9.4 Agent memory in the bundle

`.flave/agent/` holds the transcript, the current plan, and scratch notes —
so reopening a document six weeks later gives the agent its own context back.
**Excluded from publish by default** (see `publish.strip`), because it will
contain thinking the author never intended to ship.

### 9.5 The agent settings dashboard

Requested 2026-08-14, as the counterweight to full autonomy (D-17): *"if users
are having problems with agents they should have a settings dashboard that is
detailed, and that agents can set after discussion."*

**Defaults stay wide open.** This is not a permissions system users must
configure before the product works — it is the **dial they reach for when
something specific has gone wrong**, and it must be granular enough to fix that
one thing without switching the agent off.

#### Two scopes, and conflating them would be a bug

| Scope | Lives in | Travels? | Holds |
|---|---|---|---|
| **User preferences** | `~/.flave/settings.yaml` | **No** | How *I* like agents to behave. My impatience is not a property of your document. |
| **Document properties** | `flave.yaml` → `agent:` | **Yes, with the bundle** | Facts about *this document* that a recipient should inherit — its origin theme, its drift record, an author's note about intent. **Not permissions.** See the correction below. |

```yaml
# ~/.flave/settings.yaml — user preferences, all defaults shown
agent:
  autonomy: full                  # full | confirm-writes | read-only
  confirm:
    before_publish: true          # outside the undo horizon (§8.2) — always true
    before_push: true             # outside the undo horizon — always true
    before_theme_update: false    # network + restyles the document
    before_restructure: false     # moving/removing blocks vs. editing prose
    before_data_replace: false    # swapping a file in data/
    before_frame_authoring: false # minting new frames into frames/ (§7.2)
  turn_granularity: session       # session | operation — see §8.2 undo horizon
  narrate: summary                # silent | summary | verbose (= geek mode)
```

```yaml
# flave.yaml — document properties, travel with the bundle
agent:
  note: "Board template — the shape is deliberate, but change it if you need to."
  # NO structure: locked / theme: locked. See the correction below.
```

> [!warning] **Correction 2026-08-14 — brand lock is removed from the spec**
> An earlier draft of this section had `structure: locked` and `theme: locked`
> as document properties that would make the agent refuse or confirm before
> deviating from a template. **The owner rejected this, and is right:**
>
> > *"I can't imagine if every time I was changing a layout in Keynote from our
> > team's standard template it said 'Are you sure you want to do this?' No way."*
>
> It was also **internally inconsistent** — D-17 removed permission prompts on
> the grounds that they are technical, constant, and train users to click
> through them. Re-introducing them for brand compliance would have been the
> same mistake wearing a design-system hat.
>
> **The replacement: record drift, never prevent it.** See §5.5 — a document
> knows which theme it came from and what it now does differently. That record
> is *available* to a team that wants to reconcile, and never interrupts the
> person doing the work. The agent adheres to the theme by default because it
> is the obvious thing to do; when the user asks it to depart, it departs
> without ceremony.

#### Agents writing their own settings

Permitted, per the request, with one asymmetry:

- **Narrowing is autonomous.** An agent may tighten its own constraints at any
  time — *"I've noticed you undo my chart edits; I'll confirm before touching
  `viz/` from now on"* — and just do it.
- **Widening requires an affirmative in the conversation.** The agent may
  propose it, but the settings entry records **which turn authorized it**, and
  that reference is inspectable. An agent that can silently expand its own
  autonomy has no meaningful autonomy limit at all.
- **Every agent-initiated settings change is logged** in `.flave/agent/` with
  its rationale and conversation reference. Settings files are plain YAML, so
  `jj diff` shows changes like any other edit.

#### The product move: surface the setting at the moment of pain

The dashboard's real failure mode is that a frustrated user never finds it. So
it should not primarily be found by navigation:

> **When a user undoes an agent action, offer the relevant setting inline,
> right there.** *"Undid: agent restructured §3. → Always confirm before
> restructuring?"* One click writes the setting.

The same signal feeds the agent: **repeated undos of the same category are the
strongest available evidence that a default is wrong for this user**, and the
agent should raise it in conversation rather than waiting to be configured.
This is what makes "detailed settings" compatible with "defaults are wide
open" — the detail exists, but users are led to exactly the dial they need at
the moment they need it, instead of being asked to anticipate anything.

### 9.6 Innovation discipline — where the agent writes a change

Owner's guidance, 2026-08-14:

> *"Adhere to the patterns, and innovate at CSS specificity layers first.
> Change the 'flave' only as consistency will matter across `.flave` files."*

This is the **write-side counterpart** to §7.2's read-side cascade, and the two
are mirror images:

| | Direction | Rule |
|---|---|---|
| **Reading** a frame or token (§7.2) | `builtin → theme → pack → document` | **Most local definition wins** |
| **Writing** a change (this section) | `document → pack → theme → builtin` | **Write at the most local layer that can express it** |

Escalate only when the answer to *"will this need to be true in other
documents?"* is yes. That question — not aesthetics, not effort — is the sole
criterion for touching a shared layer.

#### The escalation ladder

| Rung | Action | Blast radius | Reach for it when |
|---|---|---|---|
| **0** | Use an existing frame / token unchanged | none | **Default. Always try this first.** |
| **1** | Recompose — different frame, different slot assignment | none | The pieces exist; the arrangement was wrong |
| **2** | Override a token or `extends:` a frame, in the `document` cascade layer (§4.1) | this document | A value is wrong *here*, and only here |
| **3** | Author a new frame into the document's `frames/` | this document | The arrangement genuinely does not exist. Free and unreviewed — this is what locality is *for* (§7.2) |
| **4** | Author or amend a trigger-pack (§6.2) | wherever the pack is installed | A new *kind of block*, not a new arrangement of existing ones |
| **5** | **Change the theme** — edit tokens, or `flave frame promote` | every document on that theme | ★ **Only when consistency across `.flave` files matters.** A shared act, not a styling decision |

#### What "innovate at CSS specificity layers first" means concretely

It maps onto the `@layer reset, theme, frames, packs, document` order fixed in
§4.1. The agent writes into **`@layer document`** — the last and most specific
layer — so its change wins without editing, out-specifying, or fighting
anything upstream. No `!important`. No selector-weight escalation. No inline
styles. **The cascade was declared precisely so that "make this win here" is a
layer choice rather than a specificity trick.**

That is also why §9.2 has no `style.setCss`: CSS is welcome, but it arrives
inside a frame definition or a trigger-pack — named, scoped, cascade-placed, and
promotable. A rule with no name has nowhere to be promoted *to*, which is
another way of saying it can never graduate from a hack into a standard.

#### Rung 5 is narrated, not gated

Consistent with D-17 and the Keynote objection (§9.5): changing the theme does
**not** raise a confirmation. It is a shared act, so the agent **says so** —
*"Promoted `metric-row-3up` into the theme; you'll want it on the other decks
too."* Narration, not permission. The user can undo it like anything else
inside the undo horizon (§8.2), and `flave theme diff` shows the state at any
time.

---

## 10 · Security — a v1 requirement, not a v2 hardening pass

> A `.flave` is a **document containing executable JavaScript that people email
> to each other.** That is the exact shape of the single most successful
> malware vector in computing history (Office macros). If we do not solve this
> in v1, we should not ship v1.

### 10.1 The capability model

`flave.yaml`'s `capabilities:` block is a **declaration, not a grant.** The app
enforces:

| `scripts` | Behavior |
|---|---|
| `none` | Default for any document from an untrusted origin. Vega-Lite specs still render (they are data, compiled by *our* runtime — not the document's code). Plot/D3 blocks render as source, not output. |
| `sandboxed` | JS runs in a cross-origin-isolated iframe: no DOM access to the host, no `fetch`, no filesystem, no `localStorage`, CSP `default-src 'none'`. Communication is a narrow postMessage channel carrying only query results in and SVG/canvas out. |
| `trusted` | Full runtime. Requires an **explicit, per-document, non-remembered** user gesture with a plain-language dialog. |

### 10.2 Rules

1. **Received documents open at `scripts: none`, always.** The manifest cannot
   self-elevate; only a human gesture elevates.
2. **The trust gesture names what it grants**, in prose, with the actual
   network allowlist enumerated. No "Enable Content" button.
3. **Network is deny-by-default**, allowlist only, host-enforced (Rust side),
   not iframe-enforced.
4. **Vega-Lite is privileged over Plot/D3** precisely because it is *data*
   rather than *code* — a `.vl.json` cannot exfiltrate anything. This is a
   reason to push authors toward Vega-Lite for anything a spec can express.
5. **Published HTML carries its own CSP** and, at `scripts: none`, contains no
   `<script>` at all — charts pre-rendered to inline SVG.
6. **Fonts are embedded and license-checked** at pack time; a document that
   embeds a font it can't redistribute fails export with a clear error.

**`⟨DECIDE⟩ D-11`** — Do we sign bundles (publisher identity + integrity), or
is trust purely "do you trust the person who sent you this"? Signing is a real
cost (key management, revocation) but is what makes org-wide distribution safe.
Recommendation: **defer signing; design the manifest so a `signature:` block
can be added without a format break.**

---

## 11 · Publication and export

| Target | Output | Notes |
|---|---|---|
| `html-single` | One self-contained `.html`; assets as data URIs; charts pre-rendered SVG | The share-a-link default. Must render with JS disabled. |
| `html-site` | A directory / static site; real asset URLs; Pagefind search | For longer documents; deploys anywhere |
| `pdf` | Via headless Chromium print, Paged.js for `paged` surfaces | Deterministic for `paged` and `deck`; best-effort for `flow` |
| `flave-bundle` | The `.flave` itself, zipped | The collaborate-with-internals path |
| `md` | Flattened LFM + assets | Escape hatch. **Guaranteed forever** (Principle 5). |

### 11.1 The flatten contract — *the core promise, per D-01*

> [!warning] **Read §2.2 first.** This section was drafted as three config
> bullets. D-01 named *internals-vs-publication* as the one differentiator that
> alone justifies the product. **This is therefore the spine, and a single leak
> is product-fatal** — not a bug to fix in a patch release, but the falsification
> of the only promise anyone bought.

Publishing is a **one-way flatten**. The flattened output has no path back to
the internals. **Sharing internals is a deliberate act (send the bundle), never
an accident of publishing.**

#### Audiences — the model, expanded 2026-08-14

The owner's elaboration:

> *"There are often different **levels** of audiences — my own private notes, a
> verbatim transcript, a polished version for the team, a limited version for
> LPs that has sensitive data, a concise and punchy version for the public.
> The `.flave` will have content and data and files inside it used to generate
> and regenerate different versions. Right now knowledge workers write and
> rewrite and cut and paste and copy."*

> [!warning] **This breaks the model I had specced.** `strip` + `redact` are
> purely **subtractive** — every audience is the full document minus some
> blocks. That covers "the LP doesn't see the appendix." It cannot express
> **"concise and punchy for the public,"** which is not the LP version minus
> anything. It is a *different rendition of the same material*.

#### Two orthogonal axes — and conflating them would be a serious design error

| Axis | What it is | Values | Nature |
|---|---|---|---|
| **Clearance** | A property of **content**. Who is permitted to see this fact at all. | `private` → `team` → `lp` → `public` | **Monotonic, enforceable, machine-checkable.** The safety axis. |
| **Register** | A property of **presentation**. How this material is expressed. | `verbatim`, `full`, `brief` | Editorial judgment. **Not a safety property.** |

An **audience** is a *(clearance, register, target)* triple:

```yaml
publish:
  audiences:
    notes:      { clearance: private, register: verbatim, target: html-single }
    transcript: { clearance: private, register: verbatim, target: md }
    team:       { clearance: team,    register: full,     target: html-single }
    lp:         { clearance: lp,      register: full,     target: pdf }
    public:     { clearance: public,  register: brief,    target: html-single }
```

**Keeping these separate is what makes the leak scan possible.** Clearance is a
provable property — a `private` block must not appear in a `public` render,
full stop, and that is checkable in the output bytes. Register is a judgment
call that no scanner can verify. Fusing them into one "audience level" would
make the safety-critical half unverifiable, which given §11.1's Critical risk
row is not a tradeoff available to us.

#### How content carries this

```markdown
<!-- content/003-metrics.lfm.md -->

## Unit economics {#unit-econ clearance=team}

:::variant{register=full}
Contribution margin reached 61% in Q3, up from 48%, driven primarily by the
renegotiated infrastructure contract and a 12% reduction in support load per
account following the self-serve onboarding launch…
:::

:::variant{register=brief}
Margins hit 61%, up 13 points. Cheaper infra, less support per account.
:::
```

- **Clearance is inherited** down the block tree unless overridden — so a
  section marked `clearance=team` cannot accidentally leak a child block.
  Defaults to the document's `clearance` floor.
- **A missing variant falls back** to the nearest more-verbose register
  (`brief` → `full` → `verbatim`). Never silently empty.
- **A block with no clearance attribute takes the document default**, which is
  the *most* restrictive of the declared audiences. **Fail closed.** Forgetting
  to tag something must never publish it.

#### Renditions are generated, materialized, and go stale — never silently regenerated

This is the direct answer to *"knowledge workers write and rewrite and cut and
paste."* **The cut-and-paste problem is not the copying — it is that the five
versions drift and nobody knows which is current.**

- A variant is either **`authored`** (a human or agent wrote it; canonical) or
  **`derived`** (generated from another variant, recording its source).
- When a source variant changes, its derived variants are marked **stale** —
  flagged in the UI and in `flave publish`, **never auto-regenerated**.
- Regenerating shows a **diff against the existing rendition**, so hand-edits
  to the punchy public version are visible and survivable rather than silently
  clobbered.

> **Versions stop drifting and start going stale — visibly, with a regenerate
> path.** That is the whole product claim in this area, and it is the same
> shape as theme drift (§5.5) and frame promotion (§7.2): **derived things
> declare their source, report divergence, and never overwrite a human without
> showing the diff.** The consistency is not a coincidence — it is the rule
> this document keeps arriving at.

#### What this changes elsewhere

1. **The leak scan (below) verifies clearance, not audiences.** For each
   published artifact, no content above its clearance may appear in the output
   bytes. This is now a **monotonic, provable property** rather than a
   configuration to review.
2. **`source/` is just content with `clearance: private`.** Transcripts,
   interview notes, and research live in the bundle as first-class material,
   publishable when someone deliberately wants to hand over the raw thing.
3. **M2's claim strengthens** (§13): not merely "two audiences from one
   document," but *"five levels from one document, none of which drift, and I
   can prove the public one contains nothing private."*
4. **`⟨DECIDE⟩ D-21`** — is `register` a **fixed three-value ladder**
   (`verbatim`/`full`/`brief`) or an **open vocabulary** a document can extend
   (`brief`, `technical`, `narrative`, `investor`)? Recommendation: **fixed at
   v1.** An open vocabulary multiplies the authoring burden by the number of
   registers and makes fallback ordering undefinable — and the fallback chain
   is what keeps a missing variant from publishing an empty section.

#### Redaction removes. It never hides.

> **A redacted block must be absent from the output bytes — not
> `display: none`, not `hidden`, not a collapsed `<details>`, not a commented-out
> node, not present-but-unstyled.**

This is the failure that has repeatedly and publicly embarrassed organizations
publishing PDFs with black rectangles drawn over text that was still selectable
underneath. **We must not reinvent it in HTML.** The output is built by
*constructing* only what publishes, never by *rendering everything and then
suppressing*. That is an architectural instruction for `@flave/publish`, and it
should be structurally impossible to get wrong rather than remembered.

#### Leak vectors that are easy to miss

Each of these has to be handled explicitly, because none is obvious and every
one silently defeats the promise:

| Vector | Why it leaks |
|---|---|
| **Vega-Lite inlined data** | A spec that visualizes a summary often embeds the **entire dataset** in the published JSON. A chart showing three aggregate bars can ship every underlying row. **The highest-risk vector in the list**, because nothing about it looks wrong. |
| **`sql` fences (§7.4)** | The query text names tables, columns, and file paths — often revealing more than the answer does. And satisfying it may require shipping the source data. |
| **Image & font metadata** | EXIF (camera, GPS, author), XMP, embedded font names and licensing strings survive naive copies. Strip on export. |
| **SVG internals** | Editor metadata, layer names, and off-canvas elements outside the viewBox travel with the file. |
| **HTML comments & `data-*`** | Renderer scaffolding and block ids that map straight back to internal structure. |
| **Source maps / build residue** | Ship nothing generated for debugging. |
| **The document `id` (UUIDv7)** | Correlates two audiences' outputs as the same document. Usually fine, occasionally not — make it strippable. |
| **Frame & token names** | `frames/internal-do-not-share.yaml` reveals its own existence via a class name. Hash or omit class names on export. |

#### Verification is mandatory, not advisory

Because redaction bugs are **silent** — the output looks correct precisely when
it is wrong — the promise needs proof, not care:

1. **Publish preview — "here is exactly what they will see."** Rendered, in the
   app, per audience, before anything leaves. Not a checklist of what was
   stripped: the actual artifact.
2. **A clearance scan on every publish.** For an artifact published at
   clearance *C*, scan the output bytes for the content of **every block whose
   clearance exceeds *C***, plus every `data/` filename and every source URL in
   `_sources.yaml` above that level. **Any hit fails the publish.**

   Because clearance is monotonic and orthogonal to register (§11.1), this is a
   **provable property**, not a configuration review: *"nothing above `public`
   appears in the public artifact"* is a statement a machine can settle. That
   separation is the entire reason the safety promise is checkable, and it is
   why `register` must never be folded into it.
3. **Stale-rendition check.** A publish whose derived variants are stale
   against their sources warns loudly and names them. Shipping a public
   one-pager built from last quarter's numbers is a different failure from a
   leak, but it is the *other* way this product breaks its promise.
4. **A published-artifact diff between audiences**, so *"what does the partner
   see that the LP doesn't"* is answerable in one command rather than by
   reading two files.

**This earns its own milestone claim** (§13, M2 · Publish) and its own Critical risk row
(§15). Nothing publishes publicly before the scan exists.

**`⟨DECIDE⟩ D-12`** — Do we want a hosted publish target (`flave.link/xyz`)?
It is the single feature most likely to drive adoption and the one that turns
this from a format into a service with a bill.

---

## 12 · Architecture and reuse map

```
flave/   ← its OWN pseudomonorepo at the anchor root, per D-02 (fourth sibling).
         Peer of ai-labs/ and astro-knots/, NOT a child of either. Depends on
         published `lfm`; shares no build with memopop-ai or dididecks-ai.
├── packages/              # namespace: @flave/*  (per the owner, 2026-08-14 —
│   │                      #   NOT @knots/*, which was given up on. See §12 note.)
│   ├── format/            # @flave/format  — read/write, manifest schema, pack/unpack
│   ├── render/            # @flave/render  — LFM AST → Svelte components, over lfm
│   ├── layout/            # @flave/layout  — surfaces.json + the OPERATION SET (§7.3, §9.2)
│   ├── frames/            # @flave/frames  — ★ the frame cascade (§7.2, D-15). With no
│   │                      #   drag-to-layout this is the layout product, not a stylesheet.
│   ├── theme/             # @flave/theme   — tokens.yaml → theme.css + tailwind preset;
│   │                      #   theme copy-on-adopt + drift reporting (§5.5)
│   ├── vcs/               # @flave/vcs     — jj wrapper: one-op-per-turn, undo horizon,
│   │                      #   plain-language vocabulary, geek-mode stream (§8.2)
│   ├── agent/             # @flave/agent   — Document API tools over @flave/layout ops
│   └── publish/           # @flave/publish — export pipeline, CSP emission, Paged.js
├── apps/
│   ├── flave-desktop/     # Tauri 2 + SvelteKit    ← memopop-native pattern
│   └── flave-site/        # Astro marketing/splash ← maintain-splash-pages skill
├── cli/
│   └── flave              # pack, unpack, validate, render, publish — headless
│                          #   plus `frame promote`, `theme update` (§7.2, §5.5)
├── context-v/             # per the context-vigilance skill
└── changelog/             # per the changelog-conventions skill
```

**Surveyed on disk 2026-08-14.** Confidence below reflects what was actually
read, not what the directory names suggest. Two categories are distinguished
deliberately, because conflating them is how reuse plans become fiction:
**inherit code** (a working implementation Flave consumes) vs. **inherit
boundary** (the package shape and naming are right; the implementation is a
seed Flave would build out).

| Need | Source | Verified state | Kind |
|---|---|---|---|
| Markdown parse + trigger normalization | `lfm` — `parseMarkdown`, `remarkLfm` preset | **Real and published (JSR `@lossless-group/lfm@0.3`).** 6 plugins, full STC pipeline | ✅ **Inherit code** — direct dep, no fork |
| Fence-format registry | `lfm` `remarkCodeFences` + `FenceFormat`, `formats/{mermaid,jsonCanvas,yang,json-schema,plantuml}` | **Real.** Zero-default registry; the annotate-never-replace and no-`Math.random()` disciplines are already codified in-source | ✅ **Inherit code** |
| Agent chat surface & response modes | `augment-it/apps/chat` — `chat-state.svelte.ts`, `ResponseModeRenderer.svelte`, `PromptDraftPanel.svelte` | **Real.** Svelte 5 `$state`, 6-variant `ChatTurn` union, inline-draft-as-turn pattern, module-federation remote | ✅ **Inherit code** |
| Tauri shell, Rust API layer, sidecar spawn | `memopop-ai/apps/memopop-native` — `src-tauri/src/{api,lib.rs,main.rs}`, SvelteKit `src/lib/{transport,stores,components}` | **Real and shipping.** Tauri 2 + SvelteKit + spawned sidecar over localhost | ✅ **Inherit code** |
| Astro LFM component renderer | `astro-knots/packages/lfm-astro` | Real, but **Astro-targeted**. Flave needs a Svelte renderer | ◐ **Inherit contracts** — component set + prop shapes are the reference |
| Tailwind preset + plugin | `astro-knots/packages/tailwind` — `preset.mjs`, `plugin.mjs` | **Small but real** (427 B / 824 B) | ◐ **Inherit boundary** |
| Design tokens | `astro-knots/packages/tokens` — `css/variables.css` (49 L), `css/modes.css` (68 L) | **Seed.** Hand-written CSS custom properties. **No `tokens.yaml`; no generation step.** See the inversion note below | ○ **Inherit boundary only** |
| Brand/theme packaging | `astro-knots/packages/brand-config` — `BrandConfig` + `brandConfigToCSSVars()` | **Seed, 16 lines.** Three colors and a CSS-var emitter. The right *idea* for §5.5, ~2% of the surface | ○ **Inherit boundary only** |
| Shared Svelte components | `astro-knots/packages/svelte` | **Effectively empty** — `src/index.ts` is 0 bytes; one `Button.svelte` | ○ **Boundary only** |
| Theme/mode toggle UI | `astro-knots/packages/ui/theme-mode` | Real but narrow — `ModeToggle.astro` + two switcher utils | ◐ **Port to Svelte** |
| Design system preview surface | `astro-knots/design-system-viewer` | **Seed** — one `index.astro`. But the *concept* is exactly Flave's theme/frame preview need | ○ **Boundary only** |
| Three-mode theming discipline | `theme-system` skill | Documented convention, not code | ✅ **Inherit convention** |
| Splash site & Pages deploy | `maintain-splash-pages` skill + `lfm/splash`, `astro-knots/splash` | Three reference implementations exist | ✅ **Inherit pattern** |
| Native-shell / conversational-UI prior art | `ai-labs/studies/conversational-ui-and-native-shells` (librechat, onyx) | Pinned upstream repos | ◐ **Study first** per `study-repos-first` |
| Format prior art | `ai-labs/studies/open-specs-and-standards` (JSON Canvas, OpenUI) | Pinned upstream repos | ◐ **Study first** |

> [!warning] **Correction from the owner, 2026-08-14 — `@knots` is not an
> upstream to build into.**
> The `@knots/*` package concept was **given up on**. `lfm` was the only one
> that was a true package, and it was extracted to its own repo — which is why
> it is the one row in the table above with a published version.
>
> **What `astro-knots/packages/*` actually is:** *"a starter copy at its finest,
> and reference prior art at its loosest."* Not a dependency graph. Nothing in
> Flave should `import` from it, and no plan should assume work can be pushed
> upstream into it.
>
> The `Kind` column above must be read accordingly: **✅ inherit code** means a
> real dependency (`lfm`) or a genuine port (`augment-it/apps/chat`,
> `memopop-native`). **◐ / ○** rows are **copy-and-adapt or read-for-reference**
> — never a package boundary Flave depends on.

### 12.1 The renderer — port `AstroMarkdown`, don't invent

Owner, 2026-08-14: *"Here we should ALWAYS try to copy Astro. All our sites use
Astro, unified/remark, and a single rendering master component called
`AstroMarkdown.astro` which calls subsidiary components. I'm not opposed to
using Astro, it just seems like overkill."*

**Read on disk** (`astro-knots/packages/lfm-astro/components/`, 313 lines) —
the pattern is precise, and it is the thing to copy:

```astro
export interface Props { node: Root | Content; data?: any }
...
{type === "paragraph" && (
  <p>{childrenOf(node).map((c) => <Astro.self node={c} data={data} />)}</p>
)}
```

- **A single recursive dispatcher** switching on `node.type`, recursing through
  `<Astro.self>`, threading an opaque `data` bag unchanged to every child.
- **Subsidiary components** for node types needing real markup: `Callout`,
  `CodeBlock`, `MarkdownImage`, `HeadingAnchor`, `Sources`.
- **A discipline already encoded in that source**, to be carried over verbatim:
  heading ids come from `lfm`'s `remarkHeadingIds` and are *never* recomputed in
  the renderer — *"one place decides what a fragment URL says; a second
  implementation in the render layer is exactly how the fleet's anchors drifted
  apart."*

#### The port is close to mechanical

Svelte 5 has every capability the Astro version uses: a component may import
itself (replacing `Astro.self`), `$props()` replaces `Astro.props`, and `{#if}`
branches replace the `{type === "…" && (…)}` idiom. **`FlaveMarkdown.svelte` is
`AstroMarkdown.astro` with different syntax around the same dispatch table.**
This downgrades §1.1's renderer row from "the one genuinely new package" to a
port with a known shape.

The single real addition is a final branch: an unrecognized `componentNode` or
`containerDirective` looks up the **trigger-pack registry** (§6.2) and renders
its template with the parsed props. That is the extensibility hook — one branch,
not a system.

#### Why not just use Astro — and why that is not a loss

The owner's instinct is right. **Astro is a static site builder; v0 needs a live
preview that re-renders from an in-memory editor buffer on every keystroke.**
Astro's dev server does HMR on *file change* — driving it from an editor would
mean writing to disk per keystroke and awaiting a reload. Wrong shape, and slow
at exactly the moment the product must feel instant. Svelte 5 renders
client-side from memory, which is the shape the loop needs.

**Two renderers over one AST is LFM's design working as intended, not
duplication.** Per §6.1, LFM owns stages 01–02 and *"the component renderer is
yours."* `lfm-astro` stays the renderer for sites; `@flave/render` is the
renderer for the editor.

#### Renderer drift — explicitly not a v0 concern

Owner, 2026-08-15: *"I'm not worried about drift right now at all."* Correct —
v0 has one renderer and one user. Two renderers can only disagree once two
renderers matter, which is when the Astro sites start consuming the same
trigger-packs. **Parked, with the cheap options noted so nobody has to
rediscover them:** share `lfm-astro`'s already-framework-agnostic stylesheets
(`callout.css`); and, if it ever bites, a fixture corpus rendered by both and
diffed in CI — the same shape as M1's parity test.

> [!success] **What this cut removes from v0: the declarative trigger-pack format**
>
> §6.2 splits extensibility into **Tier 1** (declarative YAML + HTML template,
> no code) and **Tier 2** (real JS). Tier 1 was justified by three things —
> cross-renderer portability, sandboxing untrusted packs, and letting a
> non-developer define syntax without writing code.
>
> **The first two are not v0 concerns**, and the third dissolved when the labor
> went to zero (§2.1): a non-developer defines syntax by *asking an agent*, and
> an agent writes a Svelte component as readily as it writes YAML.
>
> **So at v0 a trigger-pack is just a Svelte component plus a one-line syntax
> registration.** No template language, no props schema, no interpolation
> engine. The declarative format earns its place later, when packs get shared
> between people, when the Astro renderer needs them too, or when an untrusted
> pack has to be sandboxed — and none of those is now.

#### Where the token pipeline actually lives — and the direction reverses

`@knots/tokens` authors CSS custom properties **by hand**. §5.5 requires the
opposite: `tokens.yaml` is the source, and `theme.css` *and*
`tailwind.preset.js` are generated from it so they cannot drift.

My earlier recommendation was to build that inversion upstream in
`@knots/tokens`. **With `@knots` deprecated, there is no upstream — so Flave
builds it, and the flow runs the other way:**

> **Flave originates the theme format. `astro-knots` sites starter-copy from
> it** if and when they want to, exactly as they already copy from each other.

This is the better arrangement anyway, for a reason independent of `@knots`'s
status: **Flave has by far the stronger forcing function.** It needs tokens
*and* frames *and* two generated output formats across three surfaces. A theme
format hardened against that is more than sufficient for a website; one
designed for a website would not have survived contact with `paged`.

The larger payoff survives intact — **a brand authored once can dress the
websites and the documents.** It simply arrives by starter-copy from Flave
rather than by shared dependency, which is how this tree already works.

**`⟨DECIDE⟩ D-13`** — the CLI is listed as a peer of the app. It should be:
headless `flave` makes CI publishing, agent-without-GUI authoring, and testing
all possible, and it forces the format to be genuinely app-independent. Confirm
it is in v1 scope, because building it later usually means never.

---

## 13 · Milestones

Each milestone is defined by a **claim we can demonstrate**, not by a feature list.

**v1 is M0–M8** (all three surfaces, per D-06). v2 is structured review; v3 is
CRDT multiplayer (D-09). This is a large v1 and the spec should not pretend
otherwise — the mitigation is that each milestone has a demonstrable claim, so
slippage is visible early rather than at the end.

> [!warning] **Reordered 2026-08-14 after D-01.** The original order was
> render → edit → agent → data → trust → surfaces, which front-loaded the
> editing experience. D-01 identified **internals-vs-publication** as the core,
> so **Publish moved from a late detail to M2** and provenance moved out of the
> old "Data" milestone into the format itself. Milestone numbers changed;
> the set did not.

| # | Claim | Contains |
|---|---|---|
| **M0 · Format** | *"An agent can read and correctly modify a `.flave` with no Flave software installed."* | `flave.yaml` schema, directory layout, `@flave/format`, CLI (`validate`, `render`), fixture corpus, published format spec. **Frozen here:** block addressing (§8.1), the reserved `.flave/review/` path (§8.4), the provenance schemas (`data/_sources.yaml`, `assets/_manifest.yaml`), and the `publish.audiences` shape (§11.1) |
| **M1 · Render** | *"A `.flave` renders identically in the CLI and in the Svelte app."* | `@flave/render` over `lfm`, tokens→CSS pipeline, `flow` surface, Vega-Lite + Mermaid fences, `html-single` export, CI screenshot-diff parity test |
| **M2 · Publish** ★ | *"I produce five levels from one document — private notes, transcript, team, LP, public — **none of which drift**, and I can **prove** the public one contains nothing private."* | ★ **The core promise (§11.1, D-01).** The clearance × register model, block-level clearance with fail-closed defaults, per-register variants with fallback, derived-variant staleness, redaction-by-construction, the **clearance scan**, per-audience preview, cross-audience diff, and the Vega-Lite inlined-data / metadata vectors |
| **M3 · Edit** | *"A human composes a full document — prose, layout, and theme — without ever touching a drag handle or a line of CSS."* | Tauri shell, Compose / Source views, **command palette as primary layout interface**, `@flave/layout` operation set, token editor. **First `flow` frame vocabulary ships here.** |
| **M4 · Agent** | *"An agent restructures a document through the same operation set the palette uses, and everything it did undoes in one gesture."* | `@flave/agent` over `@flave/layout` ops, chat surface port from `augment-it`, `propose` mode, `.flave/agent/` memory, `@flave/vcs` one-op-per-turn (§8.2) |
| **M5 · Data** | *"I swap a CSV and every chart updates — and six months later I can still say where the number came from."* | DuckDB-WASM, `sql` fence, `data=` binding, **provenance capture** into `_sources.yaml`, Observable Plot tier |
| **M6 · Trust** | *"I open a stranger's `.flave` and nothing can hurt me."* | Capability enforcement, sandboxed iframe runtime, trust-gesture UX, CSP on export, host-side network gating. **Gates any public release.** |
| **M7 · Deck** | *"I replace Keynote for a real fundraise deck."* | `deck` surface, fixed-aspect frames, per-slide export, presenter view, **deck frame vocabulary** |
| **M8 · Paged** | *"I replace Pages for a printed report."* | `paged` surface, Paged.js, running heads, deterministic PDF, **paged frame vocabulary**, and the three upstream `lfm` PRs from §7.1 (footnotes, cross-refs, auto-TOC) |

**Parallel track — the frame vocabulary (D-15).** Because §7.2 removed drag,
frames are not a milestone but a *continuous deliverable* running from M3
through M8, expanding once per surface. Treat it as a named workstream with its
own owner. **If the frame library is thin, every milestone after M3 feels
broken regardless of whether its engineering landed.**

**Dogfood gate — rewritten after D-01 to test the core rather than the app.**
Before M3 starts, one real Lossless deliverable must go **both ways** on the
same document:

1. **Publish** a redacted audience version to a real external recipient —
   an LP, a client, a board member — with the leak scan passing.
2. **Send the bundle** to a real collaborator, who opens it, reads the
   provenance, and edits something.

Per D-02, Flave has no migrating product forcing realism on it, so this gate is
the only thing that does — and per D-01, *both directions* are the product. A
gate that only tested publishing would pass a tool that is merely a static-site
generator with a nice editor.

---

## 14 · Open decisions register

The engineering handoff is not complete until every row is resolved.

| ID | Decision | §  | Status / resolution |
|---|---|---|---|
| D-01 | Are all five differentiators vs. "one-shot HTML" real, felt pains? | 2.2, 11.1 | ✅ **RESOLVED 2026-08-14 — no, three of five.** Felt: **internals-vs-publication (THE core)**, data/asset provenance, reuse across documents. **Not felt: surgical revision** (my former lead differentiator) or durable identity. **Consequences:** thesis rewritten to *"a document that keeps its workings"* (§1); Publish promoted to **M2**; the flatten contract becomes the spine (§11.1) with a leak scan and named audiences; a leak becomes a **Critical, product-fatal** risk; nearest category reframed from office suites to literate-document tools |
| D-02 | Substrate for memopop/dididecks, or fourth sibling? | 3.1 | ✅ **RESOLVED 2026-08-14 — fourth sibling, own pseudomonorepo.** Consequence: §13 dogfood gate is now the sole realism check |
| D-03 | Bundle-dir vs. zip vs. plain dir | 5.1, 5.4 | ✅ **RESOLVED 2026-08-14 — directory canonical (macOS package UTI), zip as transport, same `.flave` extension for both, sniffed on open.** Carries the M0 Tauri save-panel spike (§5.4.5) |
| D-04 | Integer format version vs. semver | 5.3 | **OPEN** — rec: integer |
| D-05 | Where does OG/link-preview enrichment run under `network: deny`? | 6.1 | **OPEN** — rec: Rust host, on user gesture |
| D-06 | Which surfaces in v1? | 7.1 | ✅ **RESOLVED 2026-08-14 — all three (`flow`, `deck`, `paged`).** Built in that risk order. Carries three upstream `lfm` PRs |
| D-07 | Is free absolute positioning ever allowed? | 7.3 | ⊘ **MOOT** — superseded by the §7.2 resolution; no drag means no absolute drag |
| D-08 | Semantic `flave diff` vs. lean on `git diff` | 8.2 | **OPEN** — rec: git for v1 |
| D-09 | Collaboration model | 8.4 | ✅ **RESOLVED 2026-08-14 — async v1 · structured review v2 · CRDT v3.** Block ids and `.flave/review/` frozen at M0 |
| D-10 | Agent runtime: in-app BYO-key / sidecar / hosted | 9.3 | **OPEN** — rec: in-app BYO-key |
| D-11 | Do we sign bundles? | 10.2 | **OPEN** — rec: defer, reserve manifest space |
| D-12 | Hosted publish target (`flave.link`)? | 11 | **OPEN** — wanted, but it's a service business |
| D-13 | Is the headless CLI in v1 scope? | 12 | **OPEN** — rec: yes; build it now or never |
| D-14 | Naming across format / tool / site / packages | 4.2 | ✅ **RESOLVED 2026-08-14 — `@flave/*` namespace** (not `@knots/*`). Coin a noun only where none exists: `.flave`, `frame`, `surface`, `trigger-pack` are coined; **`theme` stays plain** to avoid a second object sharing the "flave" noun |
| — | **The capability ceiling** — may a GUI gesture edit layout? | 7.2 | ✅ **RESOLVED 2026-08-14 — no mouse-driven layout at all.** The mouse reads; keyboard and agent write. Strengthens the original proposal |
| **D-15** | Who owns the frame vocabulary? | 7.2, 5.5, 13 | ✅ **RESOLVED 2026-08-14 — a cascade: `builtin < theme < pack < document`, most local wins.** Same-name shadows fully; `extends:` for partial override; provenance shown in the palette; `flave frame promote` graduates a local frame to the shared theme. Also settles *curated vs. agent-authored* (both — locality is the blast radius, promotion is the gate) and downgrades the §15 risk from Critical to Medium. **Still open: how many frames in the v1 baseline set, per surface.** |
| **D-16** | Do footnotes / cross-refs / auto-TOC land upstream in `lfm`, or Flave-local? | 7.1 | **OPEN — NEW.** Rec: upstream, per the no-fork rule in §15. Created by the D-06 resolution |
| — | Chart tier: Vega-Lite / Observable Plot / D3 | 6.3 | ✅ **RESOLVED 2026-08-14 — Observable Plot is the default tier**; Vega-Lite preferred where a spec suffices; D3 as escape hatch |
| — | Version control | 8.2 | ✅ **RESOLVED 2026-08-14 — Jujutsu, agent-driven, git-colocated, with geek mode.** `.flave/history/` deleted; `jj` subsumes it |
| — | Shared design system via published themes | 5.5 | ✅ **RESOLVED 2026-08-14 — theme registry with fetch-and-pin.** Themes carry tokens **and frames**; Tailwind preset is a generated output |
| **D-17** | How far does agent autonomy over `jj` history extend? | 8.2, 9.5 | ✅ **RESOLVED 2026-08-14 — fully autonomous, no prompts, bounded by the *undo horizon*.** Anything `jj undo` can reverse is unrestricted (including `squash`/`abandon`/`rebase`); only ops that leave the horizon (`git push`, op-log pruning, publish, writes outside the bundle) need a gesture. **Supersedes my earlier propose-gate recommendation, which imported git's anxieties into a tool built to remove them.** Carries two deliverables: the plain-language vocabulary table (§8.2) and the settings dashboard (§9.5) |
| **D-18** | Theme registry: static hosting vs. a real registry service | 5.5 | **OPEN — NEW.** Rec: static for v1; note it converges with D-12 if hosted publish is a yes |
| — | Technical principles: HTML→CSS→JS→deps, semantic HTML, latest features | 4.1 | ✅ **RESOLVED 2026-08-14.** Inherits the `astro-knots` tech hierarchy. Adds the **`@layer` order as a format contract** and the **two-compatibility-targets** rule (app = bundled WebView; published = Baseline Widely Available) |
| — | HTMX | 7.5 | ✅ **RESOLVED 2026-08-14 — approved, narrowly.** Only where the server returns HTML fragments. The owner's example ("a graph reads from an API") is better served by Vega-Lite `data.url`, one tier lower |
| **D-19** | Is the "live document" a v1 use case, or ship rungs 1–2 only? | 7.5 | **OPEN — NEW.** Rec: rungs 1–2 in v1; `fetch`/HTMX land at M6 with the trust model. Never build the network tier before the trust tier |
| — | Audience model | 11.1 | ✅ **RESOLVED 2026-08-14 — *(clearance × register × target)*, not strip/redact.** My subtractive model couldn't express "concise and punchy for the public." **Clearance** is content-level, monotonic, machine-provable (the safety axis); **register** is presentational (the editorial axis); fusing them would make the clearance scan unverifiable. Blocks inherit clearance and **fail closed**; variants fall back to the more verbose register; derived variants go **stale, never auto-regenerate** |
| **D-21** | Is `register` a fixed ladder (`verbatim`/`full`/`brief`) or an open vocabulary? | 11.1 | **OPEN — NEW.** Rec: **fixed at v1.** Open vocabularies multiply authoring burden per register and make the fallback chain undefinable — and fallback is what stops a missing variant from publishing an empty section |
| — | Saved displays over one dataset | 7.6 | ✅ **RESOLVED 2026-08-14 — "figures," and the timing splits.** Named **Figure** per §4.2 (standard publishing word; composes with `paged` cross-refs). **Model lands v1** because clearance-safe `materialize:` is the top leak vector regardless, and retrofitting clearance into a data model poisons formats; **gallery UX lands v2**, as the owner supposed |
| **D-22** | Do figures live in `figures/` or inside `viz/`? | 7.6 | **OPEN — NEW.** Rec: `figures/` — a figure is a document-level object with a caption and a clearance; a `.vl.json` is an implementation detail it points at |
| **D-20** | Where does the `tokens.yaml` → `theme.css` + Tailwind generator live? | 12, 5.5 | ✅ **RESOLVED 2026-08-14 — in `@flave/theme`.** My "build it upstream in `@knots/tokens`" recommendation was wrong: **`@knots` was given up on**; only `lfm` was a true package and it was extracted. `astro-knots/packages/*` is starter-copy and prior art, never a dependency. **Flave originates the theme format; astro-knots sites starter-copy from it** — Flave has the stronger forcing function (frames + 3 surfaces + 2 generated outputs) |
| — | Theme adoption model | 5.5 | ✅ **RESOLVED 2026-08-14 — adopting a theme is a *copy*, not a link.** Simpler than the fetch-and-pin framing that reached the same mechanism. Kills the `network: deny` / Principle 5 conflict outright — there was never a link |
| — | Brand compliance enforcement | 5.5, 9.5 | ✅ **RESOLVED 2026-08-14 — none. Drift is recorded, never prevented.** `flave theme diff` reports; it does not gate. The earlier `structure: locked` / `theme: locked` draft is **removed** — it re-introduced the permission prompts D-17 deleted, wearing a design-system hat |
| — | Agent innovation discipline | 9.6 | ✅ **RESOLVED 2026-08-14 — adhere to patterns; write at the most local cascade layer that works; escalate to the theme only when consistency across `.flave` files matters.** Mirror image of §7.2's read cascade. Rung 5 is **narrated, not gated** |

---

## 15 · Risks

| Risk | Severity | Mitigation |
|---|---|---|
| **The baseline frame vocabulary is thin** | **Medium** — *downgraded from Critical 2026-08-14 by the D-15 cascade* | The wall existed only while a missing frame had no workaround. With document-local frames, a user or agent authors what they need in place and keeps working. Remaining exposure is *quality*, not *blocking*: a weak baseline means everyone reinvents the same six arrangements. Mitigation: instrument the ⌘K palette — every failed frame search is a candidate for the baseline set, and every frame promoted out of a document (§7.2) is evidence the baseline missed something. |
| **v1 is three surfaces and that is a lot of v1** | High | Per-milestone demonstrable claims (§13) so slippage surfaces early. `paged` last, and its true cost (the three upstream `lfm` PRs) is budgeted in §7.1 rather than discovered at M8. |
| **No migrating product means the format never meets reality** | High | Consequence of D-02. The dogfood gate (§13) is the entire mitigation — and post-D-01 it must run BOTH ways: a redacted publish to a real external recipient AND a bundle a real collaborator opens and edits. |
| **The remote theme registry becomes a runtime dependency** | High | *Largely dissolved 2026-08-14: adopting a theme is a **copy**, not a link (§5.5) — there is no runtime dependency to become.* Residual risk is only that someone later adds fetch-at-render as a convenience. A published document must render with the registry offline, deleted, or the company gone — Principle 5 is not negotiable for a convenience feature. |
| **`jj` is unfamiliar and the agent's under-the-hood VCS ops become unauditable** | Medium | Geek mode (§8.2) is the mitigation and ships in v1, not later. Every agent VCS action is logged in plain language whether or not geek mode is visible. |
| **"Agent-native" is a positioning claim we can't prove** | High | M0's claim is literally the proof. Ship a fixture corpus and measure agent success rate on real edit tasks. |
| **🔴 An internals leak in a published artifact** | **Critical — product-fatal per D-01** | The core promise is that internals don't travel. One leak falsifies the only differentiator the owner said justifies building this, and trust does not come back. Mitigations are all in §11.1 and are non-optional: **redaction removes rather than hides** (constructed output, never render-then-suppress), the **leak scan fails the publish on any hit**, per-audience preview shows the actual artifact, and the miss-prone vectors — **Vega-Lite inlined data above all** — are handled explicitly. Nothing publishes publicly before M6. |
| **We build a worse Quarto** | Medium — *sharpened by D-01 from a worry into a testable boundary* | Quarto and Jupyter compile in **one direction**: nobody sends a colleague a `.qmd` expecting them to work in it. **A `.flave` is built to be exchanged and worked in** — the workings are what you hand over, and publishing is the lossy act. If the bundle stops being something people actually send each other, we have become a worse Quarto and should stop. The dogfood gate's second leg tests exactly this. |
| **Scope: three surface types is three products** | High | Milestone gating (M7/M8 last) is the entire mitigation. Do not let `paged` leak into v1. |
| **Security work is deprioritized under demo pressure** | High | M6 is a *milestone with a claim*, not a hardening pass. Nothing ships publicly before it. |
| **`lfm` gets forked to serve the live editor** | Medium | Non-negotiable: Flave depends on published `lfm`. Any need becomes an upstream PR. A fork means two markdown flavors and the polyglot promise dies. |
| **Tauri/webview rendering differs from published HTML** | Medium | M1's claim is CLI/app render parity; make it a CI test with screenshot diffs. |

---

## 16 · What is explicitly not in this product

- Real-time multiplayer cursors (pending D-09)
- Spreadsheet-grade cell computation (`sql` blocks are the answer)
- A template marketplace
- Mobile authoring (viewing published HTML on mobile is required; authoring is not)
- Import fidelity from `.docx` / `.pptx` — **`⟨DECIDE⟩`** a lossy "import as
  LFM" is cheap and probably worth it; fidelity import is a trap
- Any proprietary rendering runtime (Principle 5 forbids it)

---

## 17 · Considerations and further exploration

Open threads that are **not decisions** — no crisp fork, no recommendation
ready, but each is real and would bite if it stayed unexamined. Kept
deliberately loose. **★ marks the ones that bear on v0 (§1.1)** and should not
wait.

### Near-term — these touch v0 or the core claim

**★ C-1 · Is an agent-generated `brief` good enough that you'd actually send it?**
The register axis (§11.1) depends entirely on this. If condensed versions read
as mediocre, nobody ships them and everyone reverts to cut-and-paste — the exact
pain we claim to solve. **Cheaply testable now:** take one real memo, have an
agent produce the punchy public version, and judge whether you'd have sent it.
Do this *before* building variant machinery, not after.

**★ C-2 · Is `clearance` genuinely linear?**
`private → team → lp → public` is monotonic, which is what makes the scan
provable. Real life has exceptions — something an LP sees that the team doesn't
(side letters, deal-specific terms). Tag-sets would express it but are far
harder to prove correct. Current instinct: keep the ladder, treat exceptions as
separate documents. Watch for how often that bites.

**★ C-3 · How does the source material actually get in?**
Widened by the owner 2026-08-14 — it is not just data, it is **all three legs
of the trinity (§5.2)**, and each arrives from somewhere different:

| | Comes from | Unsolved part |
|---|---|---|
| **Data** | CRM export, Decile pull, a spreadsheet someone emailed, a board deck's tables | Normalizing to a time series; capturing `_sources.yaml` provenance *at* ingest rather than reconstructing it later |
| **Content** | Transcripts, voice notes, email threads, prior documents, meeting notes | Assigning `clearance` on the way in — a transcript is `private` by default, but the *useful* pieces need promoting to `team`/`lp` without hand-retyping |
| **Assets** | Logos, headshots, screenshots, photos | Licensing and alt text, both of which are dead on arrival if not captured at ingest |

**This is plausibly where the friction actually lives.** A beautiful figure
system over data nobody can get in is worth nothing, and the clearance model is
only as good as the tagging that happens at the door. Composes directly with
existing work — `decile-hub-connector`, `crawl-fetch-ingest`,
`decile-hub-interface`'s voice-note importer — which is an argument for
prototyping ingest **against a real Lossless workflow** rather than designing it
cold.

*Note this raises the stakes on §1.1's v0:* if ingest is the real friction,
then a v0 that only proves clearance-and-publish tests the **second** hardest
problem. Worth deciding whether v0 should carry one narrow ingest path — say,
a CSV plus a transcript — to find out.

**★ C-4 · Round-tripping a bundle.**
v1 is async file exchange (§8.4), but the *experience* of receiving an edited
bundle back and reconciling it is undesigned. `jj` makes conflicts non-blocking;
it does not make them legible to someone who has never seen a merge.

**C-5 · Starting from last quarter's document.**
The most common real action — *"make me the Q4 update from the Q3 one"* — is
neither "duplicate" nor "apply a theme." It wants last quarter's structure, this
quarter's data, and last quarter's prose as a starting draft. Adjacent to
templates, themes, and figures without being any of them.

### Later — real, but not blocking

**C-6 · Bundle size.**
A life-of-company time series plus assets plus fonts plus history is not small,
and people will try to email it. `flave pack` without history helps; a genuinely
large document may need a story we do not have.

**C-7 · Collections.** Thirty portfolio companies, thirty `.flave` files. Is
there a workspace? Cross-document figures? A portfolio-level roll-up? Figures
(§7.6) create real pull toward this, and it is a different product if we say yes.

**C-8 · Publications as artifacts.** *"The version I sent the LP on March 3"*
should be retrievable. `jj` records the document's history but a *publication*
is its own object — a rendering at a clearance at a moment, arguably worth
identity and retention independent of the source.

**C-9 · Accessibility of generated content.** Semantic HTML (T2) gets structure
right. Alt text on agent-generated figures, meaningful captions, and tagged-PDF
export for `paged` are obligations we have gestured at and not designed.

**C-10 · Theme merge.** Two people adopt one theme and both promote frames
(§7.2). Themes are copies, so this is a real merge with no owner. Probably
fine at team scale; unclear beyond it.

**C-11 · The competitor improves.** "Ask Claude for an HTML file" gets better
every year, and the surgical-revision gap — already not felt (D-01) — narrows
further. **What stays durable is the private layer**, because it is a property of
the *artifact*, not of model capability. Worth re-checking annually that this is
still true; it is the load-bearing assumption of the whole product.

---

## 18 · Appendix — a complete minimal document

```
Hello.flave/
├── flave.yaml
└── content/
    └── 001-hello.lfm.md
```

```yaml
# flave.yaml
flave: 1
id: 018f2b40-0000-7000-8000-000000000001
title: Hello
surface: flow
lfm: { preset: lfm@0.3, triggers: [callouts] }
capabilities: { scripts: none, network: deny }
```

```markdown
<!-- content/001-hello.lfm.md -->
# Hello {#hello}

:::callout{type=tip title="This is the whole format"}
Everything else in the spec is optional. A `.flave` is a manifest and some
markdown. Layout, theme, data, viz, and components are all additive.
:::
```

Every additional directory in §5.2 is optional. **The floor is a manifest and a
markdown file** — which is exactly the property that makes the format credible
to an agent and cheap to adopt.
