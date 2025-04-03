---
title: 'Rendering Extended Markdown through AST'
lede: 'An alternative approach to rendering callout blocks by working directly with the AST nodes instead of transforming markdown during the remark phase'
date_authored_initial_draft: 2025-04-02
date_authored_current_draft: 2025-04-02
date_authored_final_draft: null
date_first_published: null
date_last_updated: null
at_semantic_version: '0.0.0.1'
authors: 
  Michael Staton
status: To-Do
augmented_with: 'Windsurf Cascade on Claude 3.5 Sonnet'
category: Prompts
tags:
- Remark
- Astro
- Build-Scripts
- Extended-Markdown
- AST
date_created: 2025-04-02
date_modified: 2025-04-02
---

# Context

## Comparing Two Approaches to Callout Rendering

### Previous Approach (Remark Plugin Transformation)
In [Rendering-Callout-Blocks-with-Classes](/lost-in-public/prompts/render-logic/Rendering-Callout-Blocks-with-Classes.md), we attempted to:

1. Use a remark plugin to transform the markdown during the parsing phase
2. Convert blockquotes with `[!Type]` syntax into HTML nodes in the AST
3. Handle the transformation before the markdown reaches the component layer

This approach faced challenges:
- Complex AST manipulation during the remark phase
- Difficulty maintaining the original markdown structure
- Issues with nested content and formatting
- Potential conflicts with other remark plugins

### Alternative Approach (Component-Level AST Handling)
Inspired by [astro-big-doc](https://github.com/MicroWebStacks/astro-big-doc/tree/main), we can instead:

1. Let the markdown pass through the remark phase untouched
2. Handle the AST nodes directly in our Astro components
3. Transform the content at the component level using mdast utilities

Benefits of this approach:
- Simpler and more direct control over rendering
- Better preservation of markdown structure
- Easier debugging and maintenance
- More flexible styling options
- Reduced plugin complexity

## Constraints:
It has taken us days and days to get what we have working, so please do not make overzealous changes. Do not destroy or change any file that is not directly related to the callout rendering.  

If we need to recreate any files, that would be better than changing something that is working and accidentally breaking it.  

## Objective:

Use the naming of Callouts to render callout blocks with CSS classes and Astro Components using a different approach than in [Rendering-Callout-Blocks-with-Classes](/lost-in-public/prompts/render-logic/Rendering-Callout-Blocks-with-Classes.md).

## Documentation:
Obsidian has documentation on how they handle [Obsidian flavored callouts](https://help.obsidian.md/callouts). 

Our other documentation links are kept in the:
`content/lost-in-public/rag-input/Read-Relevant-Documentation-before-major-edits.md` file.  
Please assure you always reference:
- Astro Collections
- Unified.js
- Remark.js
- Rehype.js

## Example syntax. 

You'll notice the syntax is the use of the following opening line:
`>[!<Callout Class>] <Callout Title>`
The callout then extends as long as the NEXT LINE also begins with a `>`. This `>` character is ALWAYS the FIRST character of the line, there are no exceptions, there is no use of a space before the `>`. 

So, when detecting the callout, we need to:
1. Detect the opening line with the `> [!Type]` pattern
2. Collect all subsequent lines that start with `>`
3. Transform this content into a styled component

# Implementation Steps

## 1. Create the Callout Component

Instead of transforming in remark, we'll create an Astro component that handles the rendering:

```astro
---
// src/components/markdown/Callout.astro
interface Props {
  type: string;
  title?: string;
  content: string;
}

const { type, title = type, content } = Astro.props;
---

<div class={`callout callout-${type.toLowerCase()}`}>
  <div class="callout-title">
    <span class="callout-icon">{type === 'LLM Response' ? '🤖' : '📝'}</span>
    <span class="callout-title-text">{title}</span>
  </div>
  <div class="callout-content">
    <slot />
  </div>
</div>
```

## 2. Create an AST Handler Component

This component will process the markdown AST and detect callout patterns:

```astro
---
// src/components/markdown/AstroMarkdown.astro
import { visit } from 'unist-util-visit';
import Callout from './Callout.astro';

interface Props {
  content: string;
}

const { content } = Astro.props;

// Process content and detect callout patterns
function processCallouts(node) {
  if (node.type !== 'root') return node;
  
  visit(node, 'blockquote', (blockquoteNode) => {
    // Get the first paragraph's first text node
    const firstParagraph = blockquoteNode.children[0];
    if (!firstParagraph || firstParagraph.type !== 'paragraph') return;
    
    const firstTextNode = firstParagraph.children[0];
    if (!firstTextNode || firstTextNode.type !== 'text') return;

    // Check for callout pattern in the text
    const match = firstTextNode.value.match(/^\[!(\w+)\]\s*(.*)$/);
    if (!match) return;

    // Extract callout info
    const [, type, title] = match;
    
    // Get remaining content (all children after the first text node)
    const titleContent = firstParagraph.children.slice(1);
    const content = blockquoteNode.children.slice(1);
    
    // Transform into Callout component
    blockquoteNode.type = 'element';
    blockquoteNode.tagName = 'Callout';
    blockquoteNode.properties = {
      type,
      title: {
        type: 'fragment',
        children: titleContent
      },
      content: {
        type: 'fragment',
        children: content
      }
    };
  });
  
  return node;
}
---

<div class="markdown-content">
  {processCallouts(content)}
</div>
```

## 3. Integration with Astro

Update the page component to use the new AST handler:

```astro
---
// src/pages/[...path].astro
import AstroMarkdown from '../components/markdown/AstroMarkdown.astro';
---

<AstroMarkdown content={content} />
```

This approach:
1. Preserves the original markdown structure
2. Handles transformation at the component level
3. Provides more control over styling and rendering
4. Is easier to debug and maintain

The key difference is that we're not trying to force the transformation during the remark phase, but instead handling it where we have more control - in our Astro components.