---
title: Using Presentations-as-Code Frameworks
lede: Presentations-as-Code frameworks can be used to create dynamic presentations.
date_authored_initial_draft: 2025-05-15
date_authored_current_draft: 2025-05-15
date_authored_final_draft:
date_first_published:
date_last_updated:
at_semantic_version: 0.0.0.1
publish: false
status: To-Implement
augmented_with: Windsurf Cascade on Claude 3.7 Sonnet
category: Frontend-Development
date_created: 2025-05-15
date_modified: 2026-05-03
tags: [Astro, Islands-Architeture, Frontend-Development, Svelte]
authors:
  - Michael Staton
image_prompt: An young alien astronaut is in front of a human business boardroom. The astronaut is giving a presentation.
site_uuid: 84df9380-2722-4ea7-b01b-f7f08b223553
slug: using-presentations-as-code-frameworks
---
This is a rich topic. Presentations specifically have a compelling cluster of text-native, agent-writable formats. Here's a breakdown:

## The Markdown-as-Slides Ecosystem

The most agent-fluent presentation formats are all built on Markdown, using a simple delimiter convention (`---`) to separate slides. The **big three** are:

- **[Marp](https://marp.app)** — a Markdown Presentation Ecosystem that converts `.md` files to slides, PDF, or HTML. Agents write pure Markdown with a YAML front matter block to control theme and layout. It's the simplest entry point. [^rm8444] [^my4niu]
- **[Slidev](https://sli.dev/guide/syntax)** — uses `.md` files with embedded Vue components, Mermaid/PlantUML diagrams, LaTeX math, and code highlighting natively. An agent can express rich, developer-focused decks in a single text file — including embedded Mermaid inside a slide. [^8dcvz4] [^z5dzbv]
- **[Remark.js](https://remarkjs.com)** — plain Markdown chunks separated by `---`, rendered in-browser, with speaker notes after `???`. The most minimal of the three — nearly zero syntax beyond standard Markdown. [^rr4c8y] [^ut1ub9]

All three are ideal for agents because the format is **nearly identical to Markdown the agent already knows** — the only new concept is the slide-separator and a handful of layout hints.

## Academic / Precision Track: Beamer (LaTeX)

**Beamer** is LaTeX's presentation class. Agents trained on academic corpora have strong implicit fluency with it — it's the standard format for physics, mathematics, and CS conference talks. A slide is a `frame` environment; equations, citations, and theorems render natively. For users collaborating with an agent on a technical lecture or paper presentation, Beamer lets the agent handle layout logic that would be tedious in PowerPoint. It compiles to PDF with precisely controlled typography. [^6ca3q2] [^vk63fk]

## The "Diagrams as Slides" Formats

These blur the boundary between whiteboard-style canvases and presentations:

- **[Reveal.js](https://revealjs.com/markdown/)** HTML-with-Markdown — slides are `<section>` elements in HTML, but content can be authored in Markdown via `data-markdown`. Agents can write both the HTML structure and the slide content, giving fine-grained control over animation, layout, and speaker notes. [^w95x3k] [^ka6115]
- **Slidev's `.md` + frontmatter** — the closest thing to a true "presentation as code" spec right now, explicitly designed to be written by developers (and agents) rather than clicked through a GUI. [^ydrq6n]

## Agent Fluency Comparison

| Format | Syntax | Agent Writes | Best For |
|---|---|---|---|
| **Marp** `.md` | Markdown + YAML front matter | Easily — nearly pure Markdown | Quick, styled decks |
| **Slidev** `.md` | Markdown + Vue snippets | Mostly — needs Vue component awareness | Developer / code-heavy talks |
| **Remark.js** `.md` | Plain Markdown + `---` | Trivially — zero new syntax | Minimal, no-frills decks |
| **Reveal.js** HTML | HTML + optional Markdown | Moderately — HTML structure required | Custom animated decks |
| **Beamer** `.tex` | LaTeX | Strongly for math/academic content | Conference, academic talks |

The key pattern matching your framing: **Marp and Slidev are exactly the "diagrams as code" equivalent for presentations** — a plain text file an agent can read, reason about, modify, and generate, which then renders visually through a separate tool. Slidev in particular is becoming a go-to for agent-generated technical presentations because it natively embeds Mermaid diagrams, meaning an agent can compose an entire talk — narrative, code blocks, and architecture diagrams — in one cohesive Markdown file. [^rm8444] [^8dcvz4] [^ydrq6n]

Sources
[^rm8444]: [Marp: Markdown Presentation Ecosystem](https://marp.app)
[^my4niu]: [My new presentation slide setup | David Straub](https://davidstraub.de/posts/my-new-presentation-slide-setup/)
[^8dcvz4]: [Syntax Guide - Slidev](https://sli.dev/guide/syntax)
[^z5dzbv]: [Slidev 101: Coding presentations with Markdown - Snyk](https://snyk.io/blog/slidev-101-coding-presentations-with-markdown/)
[^rr4c8y]: [Remark.js](https://remarkjs.com)
[^ut1ub9]: [Remark Slides Starter - tjaddison.com](https://tjaddison.com/blog/2020/01/remark-slide-starter/)
[^6ca3q2]: [[PDF] The beamer class](https://gking.harvard.edu/files/beameruserguide.pdf)
[^vk63fk]: [Presentation Slides with Markdown | Hacker News](https://news.ycombinator.com/item?id=43816634)
[^w95x3k]: [Markdown - Reveal.js](https://revealjs.com/markdown/)
[^ka6115]: [reveal-md - NPM](https://www.npmjs.com/package/reveal-md)
[^ydrq6n]: [Using slidev as a markdown-to-presentation format to quickly present](https://hashbang.nl/blog/using-slidev-as-markdown-presentation-format)
[^nahhl8]: [rstudio/revealjs: R Markdown Format for reveal.js Presentations](https://github.com/rstudio/revealjs)
[^lk4yuy]: [The HTML presentation framework | reveal.js](https://revealjs.com)
[^so0e42]: [[PDF] revealjs: R Markdown Format for 'reveal.js' Presentations - CRAN](https://cran.r-project.org/web/packages/revealjs/revealjs.pdf)
[^ybm8gt]: [Displaying Markdown Presentation Slides with Reveal.js in Hugo Blox](https://www.dbbrunson.com/docs/effective-online-presence/markdown-extensions-capabilities/displaying-markdown-slides/)
[^a9ii80]: [How to create Reveal.js slides with Markdown and Pandoc - YouTube](https://www.youtube.com/watch?v=PodcwH83zvc)
[^07nxl2]: [VS Code Extension - Slidev](https://sli.dev/features/vscode-extension)
[^ppq269]: [slides - reveal.js - GitHub Pages](https://kripken.github.io/slides/)
[^qk835e]: [Coders, here's a JavaScript presentation tool you'll love | InfoWorld](https://www.infoworld.com/article/2258229/coders-heres-a-javascript-presentation-tool-youll-love.html)
[^3y0ezz]: [syntax-tree/mdast: Markdown Abstract Syntax Tree format - GitHub](https://github.com/syntax-tree/mdast)
[^y04o0a]: [The Ultimate Markdown Hack: Instantly Create Slides Like a Pro](https://www.youtube.com/watch?v=eSfTiicH-PE)
[^syd7vs]: [PowerPoint Master Slides Beginners Tutorial - YouTube](https://www.youtube.com/watch?v=QiVSIvB1xis)
[^ld2nb6]: [JSON Canvas Spec (2024) - Hacker News](https://news.ycombinator.com/item?id=47572288)
[^y2hxc6]: [Obsidian has a JSON "canvas" and a YAML "base" format, which an ...](https://x.com/ZachSDaniel1/status/1977191019117789579)
[^8rvge5]: [Making a Pro Presentation with LaTeX's Beamer! - YouTube](https://www.youtube.com/watch?v=zEjBCQhND2c)
[^l7txl2]: [Build Slides With AI: Full AiPPT Walkthrough for Beginners - YouTube](https://www.youtube.com/watch?v=Q_7hQZ1AYZM)
[^20krm8]: [Announcing JSON Canvas: an open file format for infinite canvas data](https://obsidian.md/blog/json-canvas/)
[^j9oseb]: [Experiences with Beamer presentations? : r/LaTeX - Reddit](https://www.reddit.com/r/LaTeX/comments/oai9wz/experiences_with_beamer_presentations/)
[^6u9yqe]: [AI PowerPoint Generator - Microsoft](https://www.microsoft.com/en-us/microsoft-365/powerpoint/ai-powerpoint-generator)
[^fm9b1b]: [JSON Canvas — An open file format for infinite canvas data.](https://jsoncanvas.org)



## RevealJS

```html
<html>
  <head>
    <link rel="stylesheet" href="dist/reveal.css" />
    <link rel="stylesheet" href="dist/theme/white.css" />
  </head>
  <body>
    <div class="reveal">
      <div class="slides">
        <section>Slide 1</section>
        <section>Slide 2</section>
      </div>
    </div>
    <script src="dist/reveal.js"></script>
    <script>
      Reveal.initialize();
    </script>
  </body>
</html>
```

- [ ] Print PDF

Perfect — this is exactly the kind of domain where agent-fluent formats are proliferating. The analytics/data-viz community has created several powerful text-based specs:

