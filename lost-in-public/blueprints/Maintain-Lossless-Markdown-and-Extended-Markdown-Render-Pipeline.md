---
date_created: 2025-12-10
date_modified: 2025-12-10
publish: true
title: "Maintain an Elegant Markdown and Extended Markdown Render Pipeline"
slug: maintain-extended-markdown-render-pipeline
at_semantic_version: 0.0.0.1
authors:
  - Michael Staton
augmented_with: "Windsurf Cascade on GPT 5.1"
tags: [Markdown, Extended-Markdown, Render-Pipeline]
---

# Blueprint: How Lossless Renders Markdown and Extended Markdown

## 1. Content Locations and Sources

- **Root content monorepo**
  - Primary authoring may or may not happen on 
   -  a directory OUTSIDE the current Astro project, thus needing custom routing.
   -  a directory INSIDE the current Astro project, but not the src/content file. 
   - a git submodule for easier collaborative editing of content. 
   - SOME COMBINATION OF THE ABOVE.

- **Astro content collections wiring**
  - Once defined in `site/src/content.config.ts`.
  - Uses a helper `resolveContentPath(relativePath)` that:
    - Joins `contentBasePath` (from env) with the relative path.
    - Converts the absolute path into a `file://` URL for Astro’s `glob` loader.
  - Collections are defined in the loosest way possible, where almost all metadata is optional and the object is a passthrough.  This is because there are inconsistent behaviors in maintaining consistent YAML frontmatter, but we don't want to site builds to fail. 
  - `paths.blueprints` is mapped to `resolveContentPath('lost-in-public/blueprints')`, so this blueprint is rendered through the same pipeline.

- **Generated markdown content**
  - Some markdown lives under `site/src/generated-content/**` (e.g. generated essays, prompts, blueprints).
  - `resolveContentPath` is aware of this: if a path already starts with `./src/generated-content`, it is left as-is and not re-resolved.

- **MDX pages**
  - A separate `pagesCollection` is defined for `mdx-pages`, but this blueprint focuses on the markdown → MDAST → `AstroMarkdown` pipeline. We have not successfully managed to implement MDX pages but only because we have been focused on Extended Markdown with adding various syntax and mapping it to a new component. 

## 2. Astro Global Markdown Configuration

- **Location**: `site/astro.config.mjs` → `markdown` block.

- **Remark layer (global)**
  - `syntaxHighlight: false` to disable Astro’s built-in Shiki; highlighting is handled separately.
  - `remarkPlugins: []` – all remark processing for articles has been moved to layout-level processing (primarily `OneArticle.astro`).

- **Rehype layer (global)**
  - `rehypeRaw` (must come first):
    - Allows raw HTML inside markdown (`node.type === "html"`), which is later rendered by `AstroMarkdown` or passed through.
  - `rehypeAutolinkHeadings`:
    - Appends `#` anchor links to headings with CSS classes like `header-anchor` / `header-anchor-symbol`.
  - `rehypeMermaid`:
    - Handles mermaid diagrams with an `img-svg` strategy and dark mode.

- **Takeaway**
  - Global markdown config handles **HTML safety**, **heading anchors**, and **mermaid**.
  - **All semantic markdown and extended-markdown behavior is defined in the layout + component pipeline** below.

## 3. Primary Article Rendering Pipeline

### 3.1 Overview

The main “Lossless article” path for markdown is:

1. **Content collections** (from `content.config.ts`) provide a markdown string (`body`) and frontmatter (`data`).
2. A page/route uses `OneArticle.astro` as its layout, passing `content` and `data`.
3. `OneArticle.astro` uses `unified` + remark plugins to produce a transformed **MDAST**.
4. `OneArticleOnPage.astro` receives the transformed MDAST and frontmatter, splits out the table of contents, and passes the rest to `AstroMarkdown.astro`.
5. `AstroMarkdown.astro` recursively renders the MDAST nodes into HTML and Astro components, including all extended markdown features.

### 3.2 OneArticle.astro – Layout-Level Markdown Processing

- **Location**: `site/src/layouts/OneArticle.astro`.

- **Inputs** (props):
  - `Component`: usually `OneArticleOnPage.astro` or compatible article component.
  - `title`: article heading.
  - `data`: frontmatter / content metadata.
  - `content`: raw markdown string.
  - `markdownFile?`: optional path for debugging.

- **Unified pipeline**
  - Builds a remark processor:
    - `remarkParse` – parse markdown into MDAST.
    - `remarkGfm` – GitHub-flavored markdown support (tables, task lists, etc.).
    - `remarkBacklinks` – custom plugin to handle Obsidian-style backlinks and internal links.
    - `remarkImages` – custom plugin for image normalization and path handling.
    - `remarkDirective` – parses directive syntax, creating `leafDirective`, `containerDirective`, `textDirective` nodes.
    - `remarkDirectiveToComponent` – Lossless plugin that:
      - Validates directive names.
      - Preserves directive nodes in the MDAST for downstream handling (no immediate HTML transform).
    - `remarkCitations` – citations and references processing.
    - `remarkTableOfContents` – injects a `tableOfContents` node into the MDAST.
  
  - **Directive node types (how remarkDirective shapes the AST)**
    - `textDirective`
      - Inline, used inside paragraphs or headings.
      - Example: `This is a :badge[New] inline directive`.
      - Becomes a `textDirective` node with `name`, `attributes`, and inline `children`.
    - `leafDirective`
      - Block-level, no nested markdown content (self-contained block).
      - Typical for single-line component-style directives.
      - Example: `::figma-embed{src="https://www.figma.com/..." width="800"}`.
      - Becomes a `leafDirective` node with `name` and `attributes`, usually an empty `children` array.
    - `containerDirective`
      - Block-level, with nested markdown children (lists, paragraphs, etc.).
      - Used for directives that wrap other markdown, like tool galleries or slides.
      - Example:
        ```markdown
        :::tool-showcase
        - [[Tooling/AI-Toolkit/Tool Name|Display Name]]
        - [[vertical-toolkits/Category/Another Tool|Another Tool]]
        :::
        ```
      - Becomes a `containerDirective` node whose `children` contain lists / listItems / paragraphs.
    
    In the Lossless pipeline, `remarkDirective` and `remarkDirectiveToComponent` are responsible for **creating and preserving** these directive nodes in the MDAST. `AstroMarkdown.astro` then inspects `node.type` (`textDirective`, `leafDirective`, `containerDirective`) and `node.name` (e.g. `figma-embed`, `tool-showcase`, `tooling-gallery`, `image-gallery`, `slides`) to decide which Astro component to render and how to interpret `attributes` and `children`.
  - Flow:
    - `mdast = processor.parse(content)`
    - `transformedMdast = await processor.run(mdast)`

- **Output**
  - Passes `transformedMdast` and normalized `data` into the `Component` (usually `OneArticleOnPage`).

### 3.3 OneArticleOnPage.astro – Layout + TOC + Info Sidebar

- **Location**: `site/src/components/articles/OneArticleOnPage.astro`.

- **Responsibilities**
  - Layout for a single article including:
    - Main content (`AstroMarkdown`).
    - Optional `InfoSidebar` (metadata, tags, authors, dates, semantic version, augmented_with, etc.).
    - Table of contents (desktop and mobile).
  - Calculates `effectiveHeading` from `articleHeading` or `data.title` and displays it as the main rendered `<h1>` with a `CopyLinkButton`.
  - Normalizes `data` before passing it down:
    - Ensures `authors` is an array.
    - Formats dates.
    - Prepares `dataForMarkdown` passed into `AstroMarkdown`, optionally stripping `title` to avoid duplicate titles.

- **TOC management**
  - Accepts `content: Root` (MDAST root) from `OneArticle.astro`.
  - Computes:
    - `safeContent`: always a valid `root` with `children`.
    - `children`: `safeContent.children` (defensive check).
    - `hProperties`: from `safeContent.data.hProperties || {}`.
  - Derives `tocNode` by searching for `child.type === 'tableOfContents'`.
  - Passes `tocNode.data.map` to `TableOfContents.astro`.
  - For main content:
    - Calls `AstroMarkdown` with a synthetic `root`:
      - `type: 'root'`.
      - `children: children.filter(child => child?.type !== 'tableOfContents')`.
      - `data: { hProperties }`.

### 3.4 AstroMarkdown.astro – Core Extended Markdown Renderer

- **Location**: `site/src/components/markdown/AstroMarkdown.astro`.

- **Inputs** (props):
  - `node`: any MDAST node (root, heading, paragraph, link, directive, etc.).
  - `data`: includes `path`, `id`, and propagated frontmatter fields.

- **Core behaviors**
  - Maintains an explicit list `handled_types` including:
    - Standard nodes: `root`, `paragraph`, `text`, `heading`, `image`, `list`, `listItem`, `code`, `inlineCode`, `table*`, `strong`, `emphasis`, `break`, `html`, etc.
    - Extended nodes: `citation`, `citations`, `citationReference`, `footnote*`, `tableOfContents`, `imageGallery`, `toolingGallery`, `thematicBreak`.
    - Directive nodes: `leafDirective`, `containerDirective`, `textDirective`.
  - Uses **recursive self-calls** (`<Astro.self node={child} data={data} />`) to walk the MDAST tree.
  - Enriches `data.dirpath = dirname(data.path)` for image/gallery helpers.

- **Major node handling** (high level)
  - `root`: renders all children via recursion.
  - `heading`: uses `extractAllText` + `slugify` to produce stable `id`s for headings and wraps them with `CopyLinkButton`.
  - `list` / `listItem`: renders ordered/unordered lists with a `.custom-li` class and nested spacing rules.
  - `table`, `tableRow`, `tableCell`: renders semantic tables with a scrollable wrapper.
  - `link`:
    - Detects YouTube videos / playlists / Shorts by URL patterns and renders:
      - `YouTubeEmbed`, `YouTubePlaylistEmbed`, or `YouTubeShortsEmbed`.
    - Falls back to a normal `<a>` with `hProperties` for standard links.
  - `code`:
    - Handles **legacy extended syntaxes** using code block languages/meta:
      - `toolingGallery` and `yaml toolingGallery` → renders `ToolingGallery` and shows a **deprecation warning**, encouraging `:::tooling-gallery` directives instead.
      - `imageGallery` and `yaml imageGallery` → renders `ImageGallery` with a **deprecation warning**, encouraging `:::image-gallery` directives.
      - `slides` → parses an inline config + backlink list and renders `SlidesEmbed`.
    - For all other languages:
      - Delegates to `BaseCodeblock` using `getLanguageRoutingStrategy` and `isSpecialRendererLanguage` from `shikiHighlighter`.
  - `inlineCode`: styles inline code tokens.
  - `html`: injects raw HTML via `set:html`, relying on `rehypeRaw` from `astro.config.mjs`.
  - `blockquote`: uses `ArticleCallout` for styled callouts.
  - `citations` / `citation`: uses `ArticleCitationsBlock` and `ArticleCitation` components.

- **Directive handling (extended markdown)**

  There are two primary patterns for directives in the Lossless pipeline:

  1. **Remark-time mapping and preservation** (in `remark-directives.ts`):
     - Directives are validated and preserved as directive nodes.
     - `remarkDirectiveToComponent` leaves them for `AstroMarkdown` to inspect.

  2. **Render-time interpretation in `AstroMarkdown`**:
     - `AstroMarkdown` interprets `leafDirective` and `containerDirective` nodes and renders the appropriate components.

  Key directive types handled in `AstroMarkdown`:

  - `figma-embed` (leaf and container):
    - Uses props like `src`/`url`, `width`, `height`, and `auth-user`.
    - Renders a Figma embed iframe with a footer link.
    - Full architecture and Figma-specific behavior are documented in the existing blueprint
      **“Maintain Directives in Extended Markdown Render Pipeline”**.

  - `tool-showcase` (container):
    - Parses markdown list items inside the directive.
    - Extracts backlink patterns `[[path/to/tool|Display Name]]` using helper functions.
    - Resolves tools via `getCollection('tooling')` and `ToolShowcaseIsland.astro`.
    - Renders an interactive tool carousel.

  - `tooling-gallery` (container):
    - New directive-based replacement for the YAML `toolingGallery` code block.
    - Parses list items for backlinks and tag filters.
    - Uses `getCollection('tooling')` and `resolveToolId` from `toolUtils`.
    - Renders `ToolingGallery.astro` with an optional `small` variant and tag filters.

  - `portfolio-gallery` (container):
    - Similar to `tooling-gallery`, but for `client-portfolios` collection.
    - Parses list items for backlinks and `tag:` filters.
    - Uses `getCollection('client-portfolios')` and `resolvePortfolioId`.
    - Renders `PortfolioGallery.astro` with normalized portfolio data.

  - `image-gallery` (container):
    - Parses list items for links or plain text URLs.
    - Builds a mini YAML-like code string and passes it to `ImageGallery.astro`.
    - New directive-based replacement for `imageGallery` YAML code blocks.

  - `slides` (planned + partially implemented):
    - Under the **directory & directive** blueprints, a `slides` directive is planned to use the same slide-selection model as the `slides` code block and `SlidesEmbed.astro`.
    - `SlidesEmbed.astro` builds an embed URL that targets the `/slides/embed/[...slug].astro` route, which renders Reveal.js-based markdown decks.

  All directive behavior is designed to be **lossless** across the pipeline:

  - Micromark (via `remark-parse`) parses the directive syntax.
  - `remark-directive` converts it into MDAST directive nodes.
  - `remarkDirectiveToComponent` validates and preserves the nodes.
  - `AstroMarkdown` inspects directive names and attributes, and renders appropriate components.

## 4. Simple Markdown Renderer (Non-Article Use)

- **Location**: `site/src/utils/simpleMarkdownRenderer.ts`.

- **Purpose**
  - Provide a simple way to render markdown to HTML + plain text, primarily for:
    - Previews.
    - Email bodies.
    - Tooling that does not use the full article layout.

- **Pipeline**
  - Uses the **same remark stack** as `OneArticle.astro`:
    - `remarkParse`, `remarkGfm`, `remarkBacklinks`, `remarkImages`,
      `remarkDirective`, `remarkDirectiveToComponent`, `remarkCitations`, `remarkTableOfContents`.
  - Then:
    - `remarkRehype` → `rehypeStringify`.
  - Returns:
    - `html` – full rendered HTML string.
    - `plainText` – string with all HTML tags stripped.

- **Important note**
  - The simple renderer does **not** run through `AstroMarkdown.astro`, so directive nodes will not become rich components here; they will be treated as transformed HTML according to how the plugins behave.
  - For full extended markdown behavior (directives, galleries, Figma, etc.), use the **OneArticle + AstroMarkdown** pipeline.

## 5. Debugging and Introspection

- **Markdown debugger**
  - `site/src/utils/markdown/markdownDebugger.ts` exposes a `markdownDebugger` singleton used by layout-level code.
  - Controlled via environment variables:
    - `DEBUG_MARKDOWN` – enable/disable logging.
    - `DEBUG_MARKDOWN_VERBOSE` – enable detailed logs.
    - `DEBUG_AST` – allow writing debug files via `astDebugger`.
  - Also supports URL query parameters:
    - `?debug-markdown` and `?debug-markdown-verbose`.

- **DebugMarkdown component**
  - `OneArticle.astro` can render `DebugMarkdown.astro` when `markdownFile` is provided.
  - Shows raw markdown and debugging aids for a specific source file.

- **Recommended debugging flow**
  - Enable `DEBUG_MARKDOWN` and optionally `DEBUG_AST`.
  - Inspect `transformedMdast` structure to confirm:
    - Directives are present as `leafDirective` / `containerDirective`.
    - `tableOfContents` node is correctly injected.
    - Custom nodes like `citations`, `imageGallery`, etc. are present.

## 6. How to Safely Extend the Pipeline

When adding new extended markdown features:

- **1. Start at the directive & AST layer**
  - Decide on a directive syntax (leaf vs container) or a code block language.
  - Add validator / preservation logic in `remark-directives.ts` if needed.

- **2. Add render-time handling in AstroMarkdown**
  - Extend the `handled_types` list if introducing a new node type.
  - In `AstroMarkdown.astro`, add a new branch for your directive:
    - Parse attributes / inner markdown content.
    - Render an Astro component or island.

- **3. Keep layout responsibilities separate**
  - `OneArticle.astro` remains the place for defining **remark pipeline order**.
  - `OneArticleOnPage.astro` must continue to:
    - Extract `tableOfContents` into a separate component.
    - Pass a clean `root` node into `AstroMarkdown`.

- **4. Respect content locations**
  - Add new collections in `src/content.config.ts` using `resolveContentPath`.
  - Keep authoring under the root `/content` directory unless there is a clear reason to use `site/src/generated-content`.

- **5. Document changes**
  - For any substantial new extended markdown feature, create:
    - A **blueprint** under `content/lost-in-public/blueprints`.
    - Optionally, a **spec** under `content/specs` for deeper implementation details.

This blueprint ties together the Lossless site’s markdown and extended-markdown pipeline—across content locations, the Astro config, the unified/remark stack, and the `AstroMarkdown` renderer—so future work can extend it without breaking existing behavior.
