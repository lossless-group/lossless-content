---
title: 'Implement a Comprehensive Mermaid Chart Rendering System in Astro'
description: 'Create a gorgeous, elegant Mermaid chart rendering system in Astro using Unified.js, Remark, and Rehype.'
date_created: 2025-04-24
date_modified: 2025-04-24
image_prompt: "A developer at a white board drawing a technical diagram, a flow chart with typical flow chart elements. Several robots are seated, looking at the whiteboard as if they were students taking notes and learning."
lede: 'Brief description of the prompt functionality and purpose'
date_authored_initial_draft: 2025-04-24
date_authored_current_draft: 2025-04-24
at_semantic_version: 0.0.0.1
status: To-Prompt
augmented_with: 'Windsurf Cascade on Claude 3.5 Sonnet'
category: Prompts
banner_image: https://ik.imagekit.io/xvpgfijuw/uploads/lossless/prompts/render-logic/2025-05-04_banner_image_Handle-Mermaid-Codeblocks-in-Astro_b23634f5-202d-4014-8c5b-28c4e04b7512_nYIkwXLbq.webp
site_uuid: 04660f3b-4f31-447b-a6b2-6c33add54338
tags: 
  - Render-Logic
  - Extended-Markdown
  - Visual-Engineering
  - Diagramming
authors:
  - Michael Staton
portrait_image: https://ik.imagekit.io/xvpgfijuw/uploads/lossless/prompts/render-logic/2025-05-04_portrait_image_Handle-Mermaid-Codeblocks-in-Astro_111eada5-d50c-411f-a9a4-d8d6932a3c58_kwSDWNMDq.webp
---
# Goals:

Create a flexible, component-based Mermaid chart rendering system for Astro that enhances the default markdown code blocks with the following features:

1. **Breaks Out of the Article column** allowing mermaid charts to CENTER and span the full width of the page.
2. **Extended Styling** through custom a custom CSS file that extends the default styling
3. **Expand and Collapse** functionality for Mermaid charts, enabling the viewer to expand the chart to Full Page, taking up 100% of the viewport width and height.

## Technical Requirements

**CONSTRAINTS**: 
- Do NOT break the current rendering pipeline and Markdown HTML output.
- Do NOT make assumptions about any "library" or additional packages that we may or may not have.  REVIEW OUR DEPENDENCIES at `package.json`.
- Minimize additional packages and dependencies. If there is a way to do it without a popular dependency, do it.
- Take things STEP BY STEP. Do NOT try to write all changes at once across multiple files. 
- Follow all other guidelines and conventions as laid out in various reminders, rulesets, and memories.

### Component Architecture

Use the current rendering pipeline and components:

1. `site/src/layouts/OneArticle.astro` layout.
2. `site/src/components/articles/OneArticleOnPage.astro` component. <-- most of the transformation logic is in here.
3. `site/src/components/articles/AstroMarkdown.astro` component. <-- most of the markdown rendering logic is in here.
4. `site/astro.config.mjs` configuration file.

#### New Components
4. `site/src/components/articles/MermaidChart.astro` component.

### Technical Perspectives:
- Mermaid SVGs are rendered independently of the main Markdown content.
  - This means Mermaid diagrams are always grouped together at the top (or wherever the block is placed), not inline where the codeblock appeared in the original Markdown.
  - The rest of the Markdown is rendered using your normal MDAST → Astro component pipeline, with codeblocks rendered as <BaseCodeblock />.
- rehypeMermaid only works at the HAST (HTML AST) stage.
  - It expects to receive HAST nodes, not MDAST nodes.
  - If you want to replace Mermaid codeblocks inline, you need to let the rehype pipeline run, but also preserve the mapping between original codeblock position and the generated SVG.
- You cannot simply “catch” Mermaid codeblocks in the MDAST and replace them with a component, because the diagram SVG is not available until after rehypeMermaid runs.
  - If you swap in a <MermaidChart /> component at the MDAST stage, you'd have to re-render the diagram on the client (using Mermaid.js in the browser), or re-run the mermaid rendering logic in your component.



## Implementation Details

### Hybrid Approach
At the MDAST stage, tag Mermaid codeblocks for special handling (e.g., add a custom property).
In the HAST pipeline, after rehypeMermaid, walk the HAST and replace placeholder nodes with the generated SVGs.
Pros: Flexible, can support fallback to client-side rendering if server-side fails.

id Approach: Tag and Replace
Step 1: Tag Mermaid Codeblocks in MDAST
During the MDAST (Markdown AST) processing stage, traverse the AST.
For each code node with lang: "mermaid", add a custom property (e.g., node.isMermaid = true or node.data = { ...node.data, isMermaid: true }).
Optionally, replace the codeblock with a placeholder node (e.g., a custom mermaidPlaceholder type, or a div with a unique ID).
Example:

js
CopyInsert
visit(tree, 'code', node => {
  if (node.lang === 'mermaid') {
    node.data = { ...(node.data || {}), isMermaid: true, id: generateUniqueId() };
  }
});
Step 2: Pass Through to HAST and rehypeMermaid
Continue the pipeline:
MDAST → remarkRehype → HAST
rehypeMermaid will convert Mermaid codeblocks to <svg> diagrams, but only if they are still codeblocks at this stage.
Step 3: Replace Placeholders with SVGs in HAST
After rehypeMermaid runs, walk the HAST tree:
For each node that matches your placeholder (e.g., a div with a unique ID, or a node with a matching data property), replace it with the corresponding SVG node generated by rehypeMermaid.
This preserves the inline position of each Mermaid diagram.
Example (pseudo-code):

```js
CopyInsert
visit(hast, 'element', node => {
  if (node.properties && node.properties['data-mermaid-id']) {
    // Find the SVG generated for this ID
    const svg = findSvgForId(node.properties['data-mermaid-id']);
    if (svg) {
      Object.assign(node, svg);
    }
  }
});
```

Step 4: Fallback to Client-Side Rendering (Optional)
If the SVG cannot be generated (e.g., server-side error), you can:
Leave the placeholder in the output.
Use a <MermaidChart /> component to render the diagram client-side as a fallback.
Pros of This Approach
Inline diagrams: Mermaid SVGs appear exactly where the original codeblock was.
Server-rendered by default: Good for SEO, print, and static export.
Flexible: You can add debug info, fallback to client-side rendering, or add custom UI (expand/collapse, error states).
Implementation Notes
You’ll need to maintain a mapping between codeblocks (by unique ID or order) and their rendered SVGs.
Use robust AST traversal libraries (unist-util-visit, hast-util-visit) to manipulate trees.
Comment every transformation step and maintain DRY, single-source-of-truth logic for codeblock handling.

### Technical Implementation Plan: Inline Mermaid Rendering (Hybrid Approach)

**Goal:** Render Mermaid diagrams inline, at the exact position of their original codeblock, using a robust, debuggable, and DRY pipeline. Support server-rendered SVGs by default, with client-side fallback if needed.

#### 1. Tag Mermaid Codeblocks in MDAST
- Traverse the Markdown AST (MDAST) after parsing.
- For each `code` node with `lang: "mermaid"`, add a unique identifier and a custom property:
  ```js
  visit(tree, 'code', node => {
    if (node.lang === 'mermaid') {
      node.data = { ...(node.data || {}), isMermaid: true, mermaidId: generateUniqueId() };
    }
  });
  ```
- Optionally, replace the codeblock node with a custom placeholder node (e.g., `type: 'mermaidPlaceholder'`).

#### 2. Convert to HAST and Run rehypeMermaid
- Pass the tagged tree through `remarkRehype` to convert to HAST (HTML AST).
- Run `rehypeMermaid` to convert Mermaid codeblocks to SVGs.
- Ensure that the unique identifier or placeholder is preserved in the resulting HAST nodes.

#### 3. Replace Placeholders with SVGs in HAST
- After `rehypeMermaid`, traverse the HAST tree:
  - For each placeholder or node with the custom identifier, replace it with the corresponding SVG generated by rehypeMermaid.
  - Maintain a mapping between codeblock IDs and SVGs (by order or explicit ID).
  - Example (pseudo-code):
    ```js
    visit(hast, 'element', node => {
      if (node.properties && node.properties['data-mermaid-id']) {
        const svg = findSvgForId(node.properties['data-mermaid-id']);
        if (svg) Object.assign(node, svg);
      }
    });
    ```

#### 4. Fallback to Client-Side Rendering (Optional)
- If a diagram fails to render server-side, leave the placeholder in the output.
- Use a `<MermaidChart code={...} />` component to render the diagram client-side as a fallback.

#### 5. Debugging and Observability
- Add debug output at each stage:
  - Show the tagged MDAST, the HAST before and after SVG injection, and the final HTML.
  - Clearly comment all transformation steps and mappings.
- Ensure toggling debug mode is simple and non-intrusive.

#### 6. DRY and Maintainability
- Centralize all codeblock tagging, mapping, and replacement logic in utility functions or plugins.
- Document the full pipeline and all custom node properties.

***

**This plan ensures:**
- Diagrams render inline, not grouped or detached.
- Server-rendered SVGs by default, with a robust fallback.
- Debuggable, maintainable, and DRY code throughout the pipeline.

## How to Identify and Extract Mermaid Codeblocks in the Markdown AST

### 1. Markdown Codeblock Structure
- Mermaid charts are written as fenced code blocks with the language identifier `mermaid`:
  
  ```
  ```mermaid
  graph TD;
    A-->B;
    B-->C;
  ```
  ```

### 2. How This Appears in the Markdown AST
- Most Markdown parsers (remark, mdast, unified) parse code blocks into AST nodes of type `code`.
- Mermaid blocks are identified by:
  - `type: "code"`
  - `lang: "mermaid"`
  - `value`: the Mermaid code as a string.

**Example node:**
```json
{
  "type": "code",
  "lang": "mermaid",
  "value": "graph TD;\nA-->B;\nB-->C;"
}
```

### 3. Extraction Approach
- Traverse the AST (using a visitor pattern or loop).
- For each node:
  - If `node.type === "code" && node.lang === "mermaid"`, extract `node.value`.

### 4. Sample AST Traversal (remark/unist-util-visit)
```js
import { visit } from 'unist-util-visit';

/**
 * Extracts all Mermaid codeblocks from a Markdown AST.
 * @param {object} tree - The Markdown AST.
 * @returns {Array<string>} Array of Mermaid code strings.
 */
function extractMermaidCodeblocks(tree) {
  const mermaidBlocks = [];
  visit(tree, 'code', (node) => {
    if (node.lang === 'mermaid') {
      mermaidBlocks.push(node.value);
    }
  });
  return mermaidBlocks;
}
```

### 5. Integration
- In your Astro pipeline (e.g. AstroMarkdown.astro or a remark/rehype plugin):
  - Traverse the AST as above.
  - Replace each Mermaid codeblock node with your custom `<MermaidChart code={node.value} />` component.


## Troubleshooting:
hat Needs to Change
Stop using compiledContent as a shortcut for the whole markdown render.
Always walk the AST (content={transformedMdast}) in AstroMarkdown.astro.
When a code block is detected:
If it’s a mermaid block (e.g. node.data.isMermaid and node.data.mermaidId), render the SVG for that ID.
Else, use <BaseCodeblock />.
How to get the SVGs?
The SVGs are generated and inlined by rehypeMermaidInline in the HAST, but you need a way to pass a mapping of mermaidId → SVG to the AST walker.
This mapping must be extracted during processing in OneArticle.astro and passed as a prop to AstroMarkdown.astro.
Action Plan
In OneArticle.astro:
After running the processor and before calling <Component ...>, extract the mapping { [mermaidId]: svgString } from the HAST (after rehypeMermaidInline).
Pass this as a prop: mermaidSvgs={svgMap}.
In AstroMarkdown.astro:
Accept a mermaidSvgs prop.
When rendering a code block node, if it’s a mermaid block, render the SVG from mermaidSvgs[node.data.mermaidId] as raw HTML.
Otherwise, use <BaseCodeblock />.
Next Steps
I will implement these changes in both files, with full comments and respecting your code style and architectural rules.
Summary:
You will get a pipeline that always walks the AST, renders all code blocks through your custom logic, and inlines mermaid SVGs at the right place—no more short-circuiting to compiledContent.




***

**References:**
- [remarkjs/remark: Syntax tree](https://github.com/remarkjs/remark/blob/main/doc/structure.md#code)
- [unified AST Explorer](https://astexplorer.net/#/gist/1c1c1b3e9e8b6e6e3e3e3e3e3e3e3e/0)

# Success Criteria:
- [ ] 1. The current DEBUG architecture is working, and we can ENABLE the DEBUG mode. This will allow us to examine the markdown transformation pipeline along each stage.
- [ ] 2. The current Mermaid rendering code is rendering for MULTIPLE mermaid codeblocks in the same markdown file.
- [ ] 3. The Mermaid code is refactored into a new `MermaidChart.astro` component.
- [ ] 4. The specification `content/specs/Filesystem-Observer-for-Consistent-Metadata-in-Markdown-files.md` is rendered through the page: `site/src/pages/vibe-with/[collection]/[...slug].astro`
