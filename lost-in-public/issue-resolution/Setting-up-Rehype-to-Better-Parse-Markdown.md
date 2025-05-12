---
title: Setting up Rehype to Better Parse Markdown
lede: Implementing a custom unified pipeline with remark and rehype for Astro Flavored Markdown, solving file reference and plugin integration issues.
date_reported: 2025-03-30
date_resolved: 2025-04-23
date_last_updated: null
at_semantic_version: 0.0.0.1
status: "Resolved"
affected_systems: Markdown-Rendering
augmented_with: Windsurf Cascade on GPT 4.1
category: Markdown-Parsing
date_created: 2025-03-30
date_modified: 2025-04-23
site_uuid: ead8b239-ff5e-4df9-b9a7-70eadf44263a
tags:
  - Markdown-Parsing
  - Astro
  - Remark
  - Rehype
  - TypeScript
authors:
  - Michael Staton
portrait_image: https://ik.imagekit.io/xvpgfijuw/uploads/lossless/issue-resolutions/2025-05-05_portrait_image_Setting-up-Rehype-to-Better-Parse-Markdown_178e47ac-e930-4acc-960e-84ddef36ec7a_HQIJ--Ack.webp
image_prompt: A code pipeline diagram showing markdown flowing through remark and rehype plugins, with Astro and TypeScript icons, in a clean, modern style.
banner_image: https://ik.imagekit.io/xvpgfijuw/uploads/lossless/issue-resolutions/2025-05-05_banner_image_Setting-up-Rehype-to-Better-Parse-Markdown_11ef1788-a0e6-424a-b30d-4608c053f04a_UKTl6w0oU.webp
---
# Setting up Rehype to Better Parse Markdown

## What We Were Trying to Do

We needed to set up a custom remark plugin (`remark-asf.ts`) to process Astro Flavored Markdown using the unified ecosystem. The plugin needed to:
1. Accept markdown content
2. Process it through remark and rehype
3. Handle proper file references for Astro's build process

## Initial Attempts and Issues

### Attempt 1: Direct Plugin Creation

```typescript
export default function remarkAsf() {
  return async function transformer(tree: Root) {
    const result = await unified()
      .use(remarkParse)
      .use(remarkRehype)
      .use(rehypeAstro)
      .process(tree);
    
    return result.value;
  }
}
```

**Issue**: TypeScript errors about incompatible types and missing parameters.

### Attempt 2: Adding Type Definitions

```typescript
export default function remarkAsf(): Plugin<[], Root> {
  return function (tree: Root) {
    return tree;
  }
}
```

**Issue**: Still getting TypeScript errors about transformer function types.

### Attempt 3: Adding markdownFile Parameter

```typescript
export default function remarkAsf(options?: RemarkAsfOptions): Plugin<[RemarkAsfOptions?], Root> {
  if (!options?.markdownFile) {
    throw new Error('markdownFile is required');
  }
  return async function (tree: Root) {
    // ... processing
  }
}
```

**Issue**: TypeScript errors about parameter types not matching.

## The "Aha!" Moment

The solution involved two key insights:

1. **Plugin Structure**: Unified plugins need to be "higher-order functions" - functions that return functions. The outer function configures the plugin, and the inner function does the transformation.

2. **Type Safety with Currying**: We needed to create a properly typed curried function for `rehypeAstro`:

```typescript
const rehypeAstro: (options: { markdownFile: string }) => (tree: Root) => Root = (options) => (tree) => {
  return rehypeAstro({ markdownFile: options.markdownFile })(tree);
};
```

This pattern:
- Properly types the plugin for TypeScript
- Maintains the curried function structure that unified expects
- Correctly passes the `markdownFile` option through the pipeline

## Final Working Solution

The working solution combines:
1. Proper TypeScript types (`Plugin<[], Root, Root>`)
2. Curried function structure
3. Explicit error handling
4. Correct option passing to rehypeAstro

Key takeaway: When working with unified plugins, pay attention to:
- The function structure (higher-order functions)
- Type definitions that match unified's expectations
- Proper option passing through the transformation chain

Let me explain what's happening in this code:

```typescript
const rehypeAstro: (options: { markdownFile: string }) => (tree: Root) => Root = (options) => (tree) => {
  return rehypeAstro({ markdownFile: options.markdownFile })(tree);
};
```
This is a curried function definition that's working around a TypeScript typing issue. Let's break it down:

First, the type signature:
typescript
CopyInsert
(options: { markdownFile: string }) => (tree: Root) => Root
This means:
It's a function that takes options (containing markdownFile)
Which returns another function that takes a tree
Which finally returns a Root

The implementation:
```typescript
(options) => (tree) => {
  return rehypeAstro({ markdownFile: options.markdownFile })(tree);
}
```
First arrow function takes options
Second arrow function takes tree
Inside, it calls the original rehypeAstro with the options and then immediately calls the result with tree
The reason this works is because it's matching the unified plugin pattern where plugins are often "higher-order functions" - functions that return functions. In this case:

The outer function ((options) =>) configures the plugin with options
The inner function ((tree) =>) is the actual transformer that processes the AST
This pattern allows us to:

Properly type the plugin for TypeScript
Keep the curried function structure that unified expects
Pass the markdownFile option through to rehypeAstro correctly
The TypeScript errors went away because we're now explicitly declaring the function signature that matches what unified expects for its plugin system.

# My Implementation with the Annoying Error:

```typescript
import { unified } from 'unified'
import { rehypeAstro } from '@nasa-gcn/remark-rehype-astro'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import type { Root } from 'mdast'
import { toMarkdown } from 'mdast-util-to-markdown'

interface RemarkAsfOptions {
  markdownFile: string;
}

/**
 * Plugin to process Astro Special Format content
 * Converts markdown content to HTML with enhanced Astro features
 */
export default function remarkAsf(options?: RemarkAsfOptions) {
  if (!options?.markdownFile) {
    throw new Error('markdownFile is required for remarkAsf plugin');
  }

  return async function transformer(tree: Root) {
    console.log('\n🚀 Remark ASF Plugin: Starting transformation...\n');
    console.log('Processing markdown file:', options.markdownFile);
    
    try {
      // Convert tree to markdown string
      const markdown = toMarkdown(tree);
      
      // Process the content through the unified pipeline
      const result = await unified()
        .use(remarkParse)
        .use(remarkRehype)
        .use(rehypeAstro, { markdownFile: options.markdownFile })
        .process(markdown);
      
      if (!result) {
        throw new Error('Failed to process content');
      }
      
      return result.value;
    } catch (error) {
      console.error('Error in remarkAsf transformation:', error);
      return tree; // Return original tree if transformation fails
    }
  }
}
