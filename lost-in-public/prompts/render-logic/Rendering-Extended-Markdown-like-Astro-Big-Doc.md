---
title: 'Rendering Extended Markdown like Astro-Big-Doc'
lede: 'A simplified approach to rendering callout blocks by following astro-big-doc pattern of component-based AST handling'
date_authored_initial_draft: 2025-04-02
date_authored_current_draft: 2025-04-02
date_authored_final_draft: null
date_first_published: null
date_last_updated: null
at_semantic_version: '0.0.0.1'
authors: 
  Michael Staton
status: Implementation
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

# Implementation Details

After analyzing astro-big-doc's approach, I've implemented a simpler component-based system for handling extended markdown features. Here's the complete implementation:

## File Structure

```
site/src/
├── components/markdown/
│   ├── AstroMarkdownNew.astro    - Main AST traversal component
│   ├── Blockquote.astro         - Callout block handling
│   ├── Paragraph.astro          - Text content with styling
│   ├── Link.astro              - Regular link handling
│   └── Backlink.astro          - Wiki-style link handling
├── types/
│   └── mdast-extended.d.ts      - Custom node type definitions
└── pages/more-about/
    └── [vocabulary].astro       - Entry point for vocabulary pages
```

## Core Components

### 1. AstroMarkdownNew.astro
Main component that handles AST traversal and node delegation:

```typescript
---
import type {Root, RootContent} from 'mdast'
import Blockquote from './Blockquote.astro'
import Paragraph from './Paragraph.astro'
import Link from './Link.astro'
import Backlink from './Backlink.astro'
import {toHtml} from 'hast-util-to-html'
import {dirname} from 'path'

export interface Props {
    node: Root | RootContent;
    data: {
        path: string;
        [key: string]: any;
    };
}

const {node, data} = Astro.props;

const handled_types = [
    "root",
    "paragraph",
    "blockquote",
    "text",
    "link",
    "backlink"
];

const other_type = !handled_types.includes(node.type)
data.dirpath = dirname(data.path)
---

{(node.type === "root") && 
    <>
        {node.children.map((child) => (
            <Astro.self node={child} data={data} />
        ))}
    </>
}

{(node.type === "paragraph") && 
    <Paragraph node={node} data={data} />
}

{(node.type === "blockquote") && 
    <Blockquote node={node} data={data} />
}

{(node.type === "text") && 
    <Fragment set:html={node.value} />
}

{(node.type === "link") && 
    <Link node={node} data={data} />
}

{(node.type === "backlink") && 
    <Backlink node={node} data={data} />
}

{other_type && 
    <Fragment set:html={toHtml(node)} />
}
```

### 2. Blockquote.astro
Handles callout blocks with automatic type detection:

```typescript
---
import type { BlockContent } from 'mdast'
import AstroMarkdownNew from './AstroMarkdownNew.astro'

export interface Props {
    node: {
        type: 'blockquote';
        children: BlockContent[];
    };
    data: {
        path: string;
        [key: string]: any;
    };
}

const { node, data } = Astro.props;

// Check if this is a callout by looking at first text content
const firstParagraph = node.children.find(child => child.type === 'paragraph');
const firstText = firstParagraph?.children.find(child => child.type === 'text');
const calloutMatch = firstText?.value.match(/^\[!(\w+)\](?:\s+(.+))?/);

let calloutType = '';
let calloutTitle = '';
let remainingContent = node.children;

if (calloutMatch) {
    calloutType = calloutMatch[1].toLowerCase();
    calloutTitle = calloutMatch[2] || calloutType.charAt(0).toUpperCase() + calloutType.slice(1);
    
    // Remove the [!TYPE] line from content
    const newFirstParagraph = {
        ...firstParagraph!,
        children: firstParagraph!.children.map(child => {
            if (child.type === 'text') {
                return {
                    ...child,
                    value: child.value.replace(/^\[!(\w+)\](?:\s+(.+))?/, '')
                };
            }
            return child;
        })
    };
    
    remainingContent = [
        ...node.children.slice(0, node.children.indexOf(firstParagraph!)),
        newFirstParagraph,
        ...node.children.slice(node.children.indexOf(firstParagraph!) + 1)
    ];
}

// Map callout types to icons
const icons = {
    note: '📝',
    info: 'ℹ️',
    tip: '💡',
    warning: '⚠️',
    danger: '🚫',
    example: '📋',
    quote: '💭',
    default: '📌'
};

const icon = icons[calloutType as keyof typeof icons] || icons.default;
---

{calloutMatch ? (
    <div class={`callout callout-${calloutType}`}>
        <div class="callout-header">
            <span class="callout-icon">{icon}</span>
            <span class="callout-title">{calloutTitle}</span>
        </div>
        <div class="callout-content">
            {remainingContent.map(child => (
                <AstroMarkdownNew node={child} data={data} />
            ))}
        </div>
    </div>
) : (
    <blockquote>
        {node.children.map(child => (
            <AstroMarkdownNew node={child} data={data} />
        ))}
    </blockquote>
)}
```

### 3. Custom Node Type Definition
In `mdast-extended.d.ts`:

```typescript
// Extend mdast types to include our custom nodes
import type { Parent, Literal, PhrasingContent } from 'mdast';

declare module 'mdast' {
    interface BacklinkNode extends Parent {
        type: 'backlink';
        target: string;
        displayText?: string;
        children: PhrasingContent[];
    }

    interface RootContentMap {
        backlink: BacklinkNode;
    }
}
```

### 4. Integration in [vocabulary].astro
Updated to use the new component system:

```typescript
// Process markdown through minimal plugin chain
const processedAST = await unified()
  .use(remarkAsf, { markdownFile: entry.id })
  .use(remarkBacklinks)
  .use(remarkImages, {
    renderInFrontmatter: false,
    defaultAltText: 'Vocabulary Entry Image'
  })
  .run(markdownAST);

// Render using our component system
<OneArticle
  Component={OneArticleOnPage}
  data={{
    title: entry.data.title || entry.data.slug,
    content: <AstroMarkdownNew 
      node={processedAST} 
      data={{
        path: entry.id,
        title: entry.data.title,
        slug: entry.data.slug
      }} 
    />
  }}
/>
```

## Key Benefits

1. **Simplified Processing**
   - No HTML conversion step
   - Direct AST to component mapping
   - Clear separation of concerns

2. **Maintainable Components**
   - Each component handles one node type
   - Easy to add new node types
   - TypeScript support for custom nodes

3. **Flexible Rendering**
   - Components can be styled independently
   - Easy to customize output
   - Natural component composition

4. **Better Performance**
   - Minimal transformation overhead
   - No unnecessary HTML parsing
   - Efficient component updates

## Testing

Test the implementation with a vocabulary entry containing:
1. Basic callout: `[!NOTE]`
2. Callout with title: `[!WARNING] Important Message`
3. Wiki-style links: `[[Page]]` and `[[Page|Display Text]]`
4. Nested content within callouts

## Next Steps

1. Add CSS styling for callouts
2. Implement additional node types as needed
3. Add support for more callout variants
4. Create comprehensive test cases