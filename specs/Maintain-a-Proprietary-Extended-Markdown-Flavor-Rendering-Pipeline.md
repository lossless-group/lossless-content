---
title: Maintain a Proprietary Extended Markdown Flavor Rendering Pipeline
lede: A comprehensive specification for our custom markdown rendering pipeline, including all extensions and their implementation details
date_authored_initial_draft: 2025-04-16
date_authored_current_draft: 2025-04-16
date_authored_final_draft: null
date_first_published: null
date_last_updated: null
at_semantic_version: 0.0.0.1
publish: true
status: Draft
augmented_with: Windsurf Cascade on Claude 3.5 Sonnet
category: Technical Specifications
date_created: 2025-04-16
date_modified: 2025-05-26
image_prompt: "A pipeline of documents passing through various transformation stages, with icons for custom Markdown features. The scene is innovative and technical, illustrating advanced content processing."
site_uuid: bc4e5951-73e6-4e3c-a64a-d298185c0321
tags: [Render-Logic, Astro, Extended-Markdown, Custom-Rendering, Content-Display]
authors:
  - Michael Staton
banner_image: https://ik.imagekit.io/xvpgfijuw/uploads/lossless/specs/2025-05-05_banner_image_Maintain-a-Proprietary-Extended-Markdown-Flavor-Rendering-Pipeline_969f3519-cb5e-4c9f-b6d1-12903df77cdd_D21OVdfsp.webp
portrait_image: https://ik.imagekit.io/xvpgfijuw/uploads/lossless/specs/2025-05-05_portrait_image_Maintain-a-Proprietary-Extended-Markdown-Flavor-Rendering-Pipeline_2452708e-6281-4093-a212-c8cd5be60543_6oEmSvy4c.webp
---
# Current Tasks:

## Add Internal Embeds:
We will probably need to add `content/visuals` as a collection....  

`content/visuals` contains images and svg files that are sometimes or often used throughout the content.  

The extended markdown is Obsidian flavored, and the internal links are in the form:
`![[Visuals/v2__Data Model Database--In-Action.png]]`

Internal links can come with width and height, like:
`![[Visuals/Engelbart.jpg|100x145]]`

`content/visuals` is the directory in the monorepo, content submodule that is connected to Obsidan through a symbolic link to "Visuals" collection.

These are differentiated from externally hosted images, which are in the form:
`![Engelbart](https://history-computer.com/ModernComputer/Basis/images/Engelbart.jpg)`

## We may have code in the file:
`site/src/utils/markdown/remark-images.ts`

# Extended Markdown Rendering Pipeline Specification

## 1. System Overview

Our extended markdown rendering pipeline is built on top of Astro's markdown processing capabilities, utilizing the Unified ecosystem (Remark for markdown, Rehype for HTML) to handle various custom extensions. The pipeline is designed to be modular, type-safe, and maintainable, with clear separation of concerns between different processing stages.

```mermaid
graph TD
    A[Markdown Content] --> B[Remark Parser]
    B --> C[AST]
    C --> D[Remark Plugins]
    D --> E[Rehype]
    E --> F[Rehype Plugins]
    F --> G[HTML]
    G --> H[Astro Components]
```

### 1.1 Core Technologies

- **Astro**: Primary framework and build system
- **Unified**: Text processing framework
- **Remark**: Markdown processor and plugin system
  - **remark-gfm**: GitHub Flavored Markdown support
    - Tables with alignment
    - Task lists (`- [ ]` and `- [x]`)
    - Strikethrough (`~~text~~`)
    - URL autolinking
    - Footnotes
- **Rehype**: HTML processor and plugin system
- **TypeScript**: Type system and development language

### 1.2 Key Architecture

An example entry point that is working well is:
`site/src/pages/read/essays/[...slug].astro`

```text
site/src/layouts/OneArticle.astro
site/src/components/markdown/AstroMarkdown.astro
```

#### Important Component Files
```text
site/src/components/markdown/TableOfContents.astro
site/src/components/markdown/ImageGallery.astro
site/src/components/markdown/ToolingGallery.astro
```

#### Important Utility Files
```text
site/src/utils/markdown/
├── remark-callout.ts       # Callout block processing
├── remark-citations.ts     # Citation handling
├── remark-images.ts        # Image processing
├── remark-backlinks.ts     # Wiki-link processing
├── remark-codeblocks.ts    # Custom code block handling
├── remark-toc.ts          # Table of contents generation
├── normalizeShellLangs.ts  # Shell language normalization
└── remark-mermaid.ts      # Mermaid diagram support
```

## 2. Custom Markdown Extensions

### 2.1 Callouts
- **Syntax**: `> [!NOTE]` or `> [!WARNING]`
- **Processed by**: `remark-callout.ts`
- **Rendered by**: Custom callout components
- **Features**:
  - Multiple callout types (NOTE, WARNING, TIP, etc.)
  - Nested content support
  - Custom styling per callout type

### 2.2 Citations
- **Syntax**: `[^1]` or `[^citation-key]`
- **Processed by**: `remark-citations.ts`
- **Rendered as**: Interactive footnotes with backlinks
- **Features**:
  - Automatic numbering
  - Reference list generation
  - Backlink support

### 2.3 iFrames
- **Processed by**: Custom iframe handling
- **Features**:
  - Responsive embeds
  - Lazy loading
  - Custom aspect ratios

### 2.4 Wiki-Links
- **Syntax**: `[[Page Name]]` or `[[Display Text|Page Name]]`
- **Processed by**: `remark-backlinks.ts`
- **Features**:
  - Automatic path resolution
  - Backlink generation
  - Custom display text support

### 2.5 Custom Code Blocks
- **Processed by**: `remark-codeblocks.ts`
- **Features**:
  - Syntax highlighting
  - Line numbers
  - Copy-to-clipboard
  - Special handling for:
    - Mermaid diagrams
    - Image galleries
    - Tooling galleries



## 2. Extension Types and Processing Order

### 2.1 Processing Pipeline Order

1. **Container Elements** (First Pass)
   - Callouts
   - Alert blocks
   - Custom containers

2. **Inline Elements** (Second Pass)
   - Wiki-links (backlinks)
   - Citations
   - Custom inline syntax

3. **Rich Content** (Third Pass)
   - iFrames
   - Images
   - Code blocks

4. **Final Processing** (Fourth Pass)
   - HTML generation
   - Component mapping
   - Style application

### 2.2 Supported Extensions

1. **Callouts**
   - Syntax: `> [!NOTE]` or similar
   - Types: NOTE, WARNING, INFO, etc.
   - Nested content support
   - Citation compatibility

2. **Citations**
   - Inline: `[1]`, `[2]`, etc.
   - Section: `Citations:` header
   - URL support
   - Automatic collection and rendering

3. **iFrames**
   - Raw HTML support
   - YouTube/Loom optimizations
   - Responsive containers
   - Attribute preservation

4. **Wiki-Links**
   - Double bracket syntax: `[[page]]`
   - Title support: `[[page|title]]`
   - Automatic backlink generation
   - Path resolution

5. **Custom Code Blocks**
   - Language-specific highlighting
   - Custom block types
   - Metadata support
   - Component mapping

#### Custom Codeblocks in Production
`imageGallery`
`toolingGallery`

#### Ideas for Custom Codeblocks
Much Smaller Tooling Gallery
ImageGrid



## 3. Implementation Details

### 3.1 AST Processing Strategy

1. **Detection Phase**
   ```typescript
   // Example for callouts
   visit(tree, 'blockquote', (node, index, parent) => {
     if (isCallout(node)) {
       const calloutNode = transformToCallout(node);
       replaceNode(parent, index, calloutNode);
     }
   });
   ```

2. **Transformation Phase**
   ```typescript
   // Common node transformation pattern
   interface TransformedNode extends Parent {
     type: string;
     data: {
       hName: string;
       hProperties: Record<string, unknown>;
     };
   }
   ```

3. **Component Mapping**
   ```typescript
   // In AstroMarkdown.astro
   const HANDLED_TYPES = {
     callout: ArticleCallout,
     citation: ArticleCitations,
     html: Fragment,
     // ... other mappings
   };
   ```

### 3.2 Type Safety

1. **Node Type Definitions**
   ```typescript
   // In site/src/types/mdast.d.ts
   declare module 'mdast' {
     interface StaticPhrasingContent {
       type: string;
       value?: string;
       data?: {
         hName?: string;
         hProperties?: Record<string, unknown>;
       };
     }
   }
   ```

2. **Plugin Options**
   ```typescript
   interface PluginOptions {
     debug?: boolean;
     preserveOriginal?: boolean;
     // Extension-specific options
   }
   ```

### 3.3 Error Handling

1. **Graceful Degradation**
   ```typescript
   try {
     // Process extension
     return transformedNode;
   } catch (error) {
     console.error(`Error processing ${type}:`, error);
     return originalNode; // Preserve original content
   }
   ```

2. **Debug Output**
   ```typescript
   if (options.debug) {
     astDebugger.writeDebugFile(
       `${phase}-${type}`,
       JSON.stringify(node, null, 2)
     );
   }
   ```

## 4. Component Architecture

### 4.1 Base Components

1. **AstroMarkdown**
   - Entry point for rendering
   - Node type routing
   - Error boundary

2. **Extension Components**
   - Specialized rendering
   - Prop validation
   - Style encapsulation

### 4.2 Style Management

1. **CSS Modules**
   ```css
   /* Extension-specific styles */
   .extension-container {
     width: 100%;
     box-sizing: border-box;
   }

   .text-wrapper {
     display: inline-block;
     width: 100%;
     word-wrap: break-word;
     word-break: break-word;
     overflow-wrap: break-word;
     hyphens: auto;
   }
   ```

2. **Responsive Design**
   ```css
   /* Common responsive patterns */
   .responsive-container {
     position: relative;
     padding-bottom: 56.25%;
     height: 0;
   }

   .responsive-iframe {
     position: absolute;
     top: 0;
     left: 0;
     width: 100%;
     height: 100%;
   }
   ```

## 5. Configuration

### 5.1 Astro Config

```javascript
// astro.config.mjs
export default defineConfig({
  markdown: {
    remarkPlugins: [
      remarkGfm, // GitHub Flavored Markdown support
      remarkCalloutHandler,
      remarkBacklinks,
      remarkImages,
      remarkCitations
    ],
    remarkRehype: {
      allowDangerousHtml: true,
      handlers: defListHastHandlers
    },
    rehypePlugins: [
      rehypeRaw
    ]
  }
});
```

### 5.2 Plugin Registration

```typescript
// Plugin registration pattern
export default function remarkExtension(options: Options = {}) {
  return (tree: Root) => {
    // 1. Detection
    const nodes = detectNodes(tree);
    
    // 2. Transformation
    const transformed = transformNodes(nodes);
    
    // 3. Insertion
    return insertNodes(tree, transformed);
  };
}
```

## 6. Testing and Validation

### 6.1 Test Files

1. **Basic Features**
   - `content/vocabulary/agile.md`
   - Tests common extensions

2. **Complex Cases**
   - Nested extensions
   - Mixed content types
   - Edge cases

### 6.2 Debug Process

1. **AST Inspection**
   - Debug files per phase
   - Node structure validation
   - Type checking

2. **Visual Validation**
   - Component rendering
   - Style application
   - Responsive behavior

## 7. References

1. [[lost-in-public/prompts/render-logic/Handle-iFrames-with-our-AST-Rendering-Pipeline.md|Handle iFrames with our AST Rendering Pipeline]]
2. [[/lost-in-public/prompts/render-logic/Rendering-Extended-Markdown-through-AST.md|Rendering Extended Markdown through AST]]
3. [[lost-in-public/prompts/render-logic/Handle-Custom-Codeblocks-in-Astro.md|Handle Custom Codeblocks in Astro]]
4. [[lost-in-public/prompts/render-logic/Handle-Citations-in-Markdown-Content.md|Handle Citations in Markdown Content]]
5. [[lost-in-public/prompts/render-logic/Handle-Callouts-in-Markdown-Content.md|Handle Callouts in Markdown Content]]
6. [[lost-in-public/prompts/render-logic/Remark-Plugin-Implementation.md|Remark Plugin Implementation]]
7. [[lost-in-public/prompts/render-logic/Rendering-Extended-Markdown-like-Astro-Big-Doc.md|Rendering Extended Markdown like Astro Big Doc]]

## File Structure of Working Code

### Core Processing
```text
site/src/utils/markdown/
├── debug/
│   └── markdown-debugger.ts      # AST debugging utilities
├── plugins/
│   ├── remark-callout.ts        # Callout processing
│   ├── remark-backlinks.ts      # Wiki-link handling
│   ├── remark-citations.ts      # Citation processing
│   └── remark-images.ts         # Image handling
└── types/
    ├── mdast.d.ts              # Core AST types
    ├── mdast-callout.d.ts      # Callout types
    └── mdast-citation.d.ts     # Citation types
```

### Component Structure
```text
site/src/components/markdown/
├── AstroMarkdown.astro         # Main renderer
├── callouts/
│   └── ArticleCallout.astro    # Callout component
├── citations/
│   └── ArticleCitations.astro  # Citations component
└── common/
    └── ResponsiveContainer.astro # Shared components
```

## Image Handling

#### Wiki-Style Image Syntax

While we initially attempted to support wiki-style image syntax (e.g. `![[image.png]]`) using custom remark plugins and AST transformations, we encountered several challenges:

1. Complex path normalization between assets/ and visuals/ directories
2. AST transformation issues with maintaining proper node types
3. Performance concerns with local image serving
4. Lack of image optimization capabilities

**Decision**: Instead of maintaining a complex local image handling pipeline, we will transition to using a remote image hosting service (e.g. ImageKit). This will provide:

- Simplified markdown processing
- CDN-based image delivery
- Built-in image optimization
- Automatic format conversion
- Responsive images support

The wiki-style image syntax implementation will be revisited after establishing a robust remote image hosting workflow.

This specification serves as a living document for our extended markdown rendering pipeline. It should be updated as new extensions are added or existing ones are modified.