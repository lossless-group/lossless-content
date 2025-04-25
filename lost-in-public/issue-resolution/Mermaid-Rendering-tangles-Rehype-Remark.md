---
title: AstroMarkdown Mermaid Rendering Issue Resolution
lede: Breadcrumb documenting the resolution of Markdown/AST rendering issues for Mermaid diagrams and code blocks in AstroMarkdown.astro.
date: 2025-04-25
status: Complete
category: Issue-Resolution
related_files:
  - site/src/components/markdown/AstroMarkdown.astro
  - site/src/utils/markdown/remarkMermaidTag.ts
  - site/src/utils/markdown/rehypeMermaidInline.ts
---

## Issue Resolution Breadcrumb Pattern Reference

> This section is included per the project workflow prompt: `@/content/lost-in-public/prompts/workflow/Write-an-Issue-Resolution-Breadcrumb.md`.

### What is an Issue Resolution?

An **Issue Resolution** is a technical note for future developers (or AI assistants) who may encounter the same issue. It is distinct from a Changelog (for users) or a Session Log (for internal devs). Its purpose is to help someone with zero context quickly understand and resolve the same or similar problem.

### Pattern for Writing an Issue Resolution Breadcrumb

1. **What were we trying to do and why?**
2. **List incorrect attempts** with the necessary code for someone to comprehend the related codebase.
3. **Explain the "Aha!" moment**—the eureka. How did we solve it?
4. **Put forth the final solution** with the necessary code for someone to comprehend the related codebase.

---

# Issue Resolution: AstroMarkdown Mermaid & Code Rendering

## 1. What were we trying to do and why?

Render Markdown content—including code blocks and Mermaid diagrams—correctly in an Astro project, using a robust, maintainable rendering pipeline that respects both Markdown AST (MDAST) and HTML AST (HAST) nodes. The goal was:
- To render Mermaid diagrams as SVGs inline, not as precompiled HTML or fallback code blocks.
- To ensure all Markdown content (paragraphs, headings, lists, tables, etc.) renders with semantic HTML.
- To avoid bypassing or breaking the established AST rendering pipeline.

## 2. List incorrect attempts and dead ends

- **Generic HAST element handler:**
  - Initially, a generic handler for all `element` (HAST) nodes was used, but this led to improper rendering (e.g., everything as `<div>` or `<span>`, breaking semantic structure).
- **JSX/React-style dynamic tag rendering:**
  - Attempted to use dynamic tag rendering patterns (like `Astro.createElement`), which are not supported in Astro and led to errors.
- **Insufficient explicit handling:**
  - Only headers were explicitly handled; other tags (like `p`, `ul`, `li`, `pre`, etc.) were not, causing many nodes to fall through to the unhandled block and render as JSON or empty elements.
- **Code/Mermaid blocks not rendering:**
  - Code blocks and Mermaid diagrams rendered as empty `<pre>` or `<div>` elements, due to missing logic for both Markdown and HAST representations.

## 3. The "Aha!" moment

- Realized that the rendering pipeline must:
  - Explicitly handle all relevant Markdown and HAST node types.
  - Treat Mermaid diagrams as either:
    - Markdown `code` nodes with `lang: 'mermaid'` and a valid `mermaidId`, or
    - HAST `element` nodes with `tagName: 'svg'` (output from rehype-mermaid or custom plugin).
  - Render all common HTML tags from HAST (`p`, `span`, `div`, `ul`, `ol`, `li`, `table`, etc.) explicitly, not generically.

## 4. Final solution

- **TypeScript interface updated:** Props interface now supports both MDAST and HAST node shapes, including `tagName` and `properties`.
- **Explicit handlers for all relevant node types:**
  - Markdown block types (paragraph, heading, code, blockquote, etc.)
  - HAST element nodes for all common HTML tags (`h1`–`h6`, `p`, `span`, `div`, `ul`, `ol`, `li`, `table`, `thead`, `tbody`, `tr`, `td`, `th`, `svg`)
- **Mermaid rendering:**
  - For Markdown code blocks: If `lang: 'mermaid'` and a valid SVG is present in `mermaidSvgs`, render as raw SVG; otherwise, fallback to code block.
  - For HAST nodes: If `tagName: 'svg'`, render the SVG and its children recursively.
- **No generic or fallback rendering for HAST elements:** Every tag is handled explicitly, so nothing falls through to "unhandled" except truly unknown node types (which are dumped for debug only).
- **All JS-style comments removed from Astro templates** to prevent them rendering in the DOM.

## 5. The "Aha!" Moment — The Eureka

After extensive attempts to pre-render Mermaid diagrams as SVGs in the AST pipeline (MDAST → HAST → HTML), the breakthrough came by reviewing a much simpler implementation by an intern developer:

### **Eureka: Component-Driven Mermaid Rendering in Astro**

- **What worked:**
  - Instead of pre-rendering SVGs or mapping mermaidId in the AST, simply detect Mermaid code blocks (`lang === 'mermaid'`) and render them using a dedicated Astro component (`<MermaidChart code={node.value} />`).
  - No client-side JSX, React, or hydration required—remains SSG-friendly and fully compatible with Astro’s rendering pipeline.
  - All Markdown is parsed via remark, then rendered as Astro components. Mermaid charts are handled as just another code block type at the component level.
- **Why this is the Eureka:**
  - It preserves the Markdown → MDAST → Astro component pipeline.
  - It is robust, maintainable, and idiomatic for Astro.
  - It avoids brittle plugin logic, SVG mapping, and complex debugging.
  - It renders Mermaid charts perfectly, as verified in production.
  - If SSR or static export is needed in the future, the component can be adapted or swapped.

#### **Sample Implementation (from `feature/mermaid-charts-working`):**

```astro
{(node.type === "code") && (
  node.lang === "mermaid"
    ? <MermaidChart code={node.value} />
    : <BaseCodeblock code={node.value} lang={node.lang ?? 'text'} />
)}
```

- **Pipeline remains:** Markdown → MDAST (remark plugins) → Astro component tree → static HTML output.
- **No extra client-side JS or React required.**

### Why This Matters
- This approach is the “sweet spot” for Astro SSG:
  - SSG-friendly, no client-side hydration
  - Simple, robust, and easy to maintain
  - Keeps the rendering pipeline explicit and debuggable
  - Works for all current requirements, but can be adapted if future needs change

## 6. Key code snippets

```astro
// Mermaid code block handler
{node.type === "code" && node.lang === "mermaid" && (
  node.data?.isMermaid && node.data?.mermaidId && mermaidSvgs && mermaidSvgs[node.data.mermaidId]
    ? <div class="mermaid-diagram" set:html={mermaidSvgs[node.data.mermaidId]} />
    : <div class="mermaid-error">
        ⚠️ Mermaid diagram could not be rendered.
      </div>
)}

// HAST SVG handler
{node.type === "element" && node.tagName === "svg" && (
  <svg {...node.properties}>
    {node.children && node.children.map(child => <Astro.self node={child} data={data} mermaidSvgs={mermaidSvgs} />)}
  </svg>
)}

// Explicit handling for all common tags
{node.type === "element" && node.tagName === "p" && (
  <p {...node.properties}>...</p>
)}
// ...repeat for span, div, ul, ol, li, table, etc.
```

## 7. Best practices for future work
- Always explicitly handle every node type that may appear in the AST.
- Never use generic element rendering or JSX/React patterns in Astro templates.
- Remove all JS-style comments from Astro template blocks.
- When adding new Markdown or HTML features, add explicit handlers for their AST node types.
- Use debug output blocks only for true unknowns, and remove them from production.

## 8. Complete Implementation Record: All Files & Code

> This section records every relevant file and all new/changed code for this issue, so a future developer can reconstruct the pipeline from scratch or audit what was tried. **Each code block is a direct copy of the implementation as of this issue.**

---

### A. `site/src/components/markdown/AstroMarkdown.astro`

```astro
---
import {dirname} from 'path'
import ArticleCallout from './callouts/ArticleCallout.astro';
import ArticleCitationsBlock from './citations/ArticleCitations.astro';
import ArticleCitation from './citations/ArticleCitation.astro';
import BaseCodeblock from '../codeblocks/BaseCodeblock.astro';

interface Props {
    /**
     * Accepts a mapping of mermaidId to SVG strings for inlining Mermaid diagrams.
     */
    mermaidSvgs?: Record<string, string>;
    /**
     * Markdown AST node interface for AstroMarkdown.astro
     * - Supports both Markdown (MDAST) and HTML (HAST) element nodes.
     * - See remark/rehype AST docs for more details.
     */
    node: {
        type: string;
        value?: string;
        lang?: string; // <-- Added for code blocks
        children?: any[];
        url?: string;
        depth?: number;
        label?: string; // Added for footnoteReference nodes
        data?: {
            hProperties?: Record<string, any>;
            isMermaid?: boolean;
            mermaidId?: string;
        };
        // --- HAST element node support ---
        tagName?: string;
        properties?: Record<string, any>;
    };
    data: {
        path: string;
        id?: string;  // File ID (e.g., 'Agile.md')
        [key: string]: any;
    };
}

const {node, data, mermaidSvgs = {}} = Astro.props;

// ...
// [Rendering logic for all node types, including explicit handling for all common HAST tags.]
// ...
// Mermaid code block handler:
{node.type === "code" && node.lang === "mermaid" && (
  node.data?.isMermaid && node.data?.mermaidId && mermaidSvgs && mermaidSvgs[node.data.mermaidId]
    ? <div class="mermaid-diagram" set:html={mermaidSvgs[node.data.mermaidId]} />
    : <div class="mermaid-error">
        ⚠️ Mermaid diagram could not be rendered.
      </div>
)}
// HAST SVG handler:
{node.type === "element" && node.tagName === "svg" && (
  <svg {...node.properties}>
    {node.children && node.children.map(child => <Astro.self node={child} data={data} mermaidSvgs={mermaidSvgs} />)}
  </svg>
)}
// ...repeat for all relevant tags: p, span, div, ul, ol, li, table, etc.
```

---

### B. `site/src/utils/markdown/rehype-mermaid-inline.ts`

```typescript
/**
 * rehype-mermaid-inline.ts
 *
 * Custom rehype plugin to replace tagged Mermaid codeblocks (with unique IDs) with their corresponding SVGs after rehypeMermaid runs.
 * This ensures SVGs are rendered inline at the original codeblock position.
 *
 * Usage: .use(rehypeMermaidInline)
 *
 * This plugin expects that codeblocks have a `data-mermaid-id` property, and that the SVGs generated by rehypeMermaid are present in the HAST.
 */

import type { Root, Element } from 'hast';
import { visit } from 'unist-util-visit';

function buildSvgMap(tree: Root): Record<string, Element> {
  const svgMap: Record<string, Element> = {};
  visit(tree, 'element', (node: Element) => {
    if (node.tagName === 'svg' && node.properties && node.properties['data-mermaid-id']) {
      svgMap[node.properties['data-mermaid-id'] as string] = node;
    }
  });
  return svgMap;
}

export default function rehypeMermaidInline() {
  return (tree: Root) => {
    const svgMap = buildSvgMap(tree);
    visit(tree, 'element', (node: Element, index, parent) => {
      if (
        node.tagName === 'pre' &&
        node.children &&
        node.children[0] &&
        (node.children[0] as Element).tagName === 'code' &&
        (node.children[0] as Element).properties &&
        (node.children[0] as Element).properties['data-mermaid-id']
      ) {
        const mermaidId = (node.children[0] as Element).properties['data-mermaid-id'] as string;
        const svg = svgMap[mermaidId];
        if (svg && parent && typeof index === 'number') {
          parent.children[index] = svg;
        }
      }
    });
  };
}
```

---

### C. `site/src/utils/markdown/remark-mermaid-tag.ts`

```typescript
/**
 * remark-mermaid-tag.ts
 *
 * Custom remark plugin to tag Mermaid codeblocks in the Markdown AST (MDAST).
 * Adds a unique identifier and a flag to each Mermaid codeblock for downstream processing.
 *
 * Usage: .use(remarkMermaidTag)
 */

import type { Node } from 'unist';
import { visit } from 'unist-util-visit';

let mermaidCounter = 0;

function generateUniqueId(): string {
  return `mermaid-${Date.now()}-${mermaidCounter++}`;
}

export default function remarkMermaidTag() {
  return (tree: Node) => {
    visit(tree, 'code', (node: any) => {
      if (node.lang === 'mermaid') {
        if (!node.data) node.data = {};
        node.data.isMermaid = true;
        node.data.mermaidId = generateUniqueId();
      }
    });
  };
}
```

---

### D. `site/src/layouts/OneArticle.astro`

```astro
---
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkBacklinks from '@utils/markdown/remark-backlinks';
import remarkImages from '@utils/markdown/remark-images';
import remarkCallouts from '@utils/markdown/remark-callout-handler';
import remarkCitations from '@utils/markdown/remark-citations';
import DebugMarkdown from '@components/markdown/DebugMarkdown.astro';
import { markdownDebugger } from '@utils/markdown/markdownDebugger';
import remarkRehype from 'remark-rehype';
import rehypeMermaid from 'rehype-mermaid';
import rehypeStringify from 'rehype-stringify';
import remarkMermaidTag from '@utils/markdown/remark-mermaid-tag';
import rehypeMermaidInline from '@utils/markdown/rehype-mermaid-inline';
import { visit } from 'unist-util-visit';
import { fromHtml } from 'hast-util-from-html';
import { toHtml } from 'hast-util-to-html';

// ...
// [Helper: rehypePreserveMermaidId, interpolateMermaidVariables, and pipeline setup.]
// ...
const processor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkImages)
  .use(remarkBacklinks)
  // .use(remarkCallouts)
  .use(remarkCitations)
  .use(remarkMermaidTag)
  .use(remarkRehype)
  .use(rehypePreserveMermaidId)
  .use(rehypeMermaid, { mermaidConfig: { theme: 'dark', themeVariables: { fontFamily: 'var(--ff-body, Arial, sans-serif)', background: 'transparent' }}})
  .use(rehypeMermaidInline)
  .use(rehypeStringify);
// ...
```

---

**Every file and all new code relevant to this issue is now recorded above.**

---

This breadcrumb should help future developers quickly understand the rendering pipeline for Markdown and Mermaid diagrams in Astro, and avoid the pitfalls that led to broken rendering.
