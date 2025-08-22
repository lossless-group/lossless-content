---
title: Maintain a Dynamic Project Viewer
lede: A dynamic project viewer can handle multiple artifacts, file formats, and make it easier for clients to navigate projects. 
date_authored_initial_draft: 2025-08-21
date_authored_current_draft: 2025-08-21
date_authored_final_draft: 
date_first_published: 
date_last_updated: 
at_semantic_version: 0.0.0.1
generated_with: Windsurf Cascade on Claude SWE-1
category: Content-Displays
date_created: 2025-08-21
date_modified: 2025-08-21
status: In-Progress
tags: [Content-Displays, UI-Design]
authors:
  - Michael Staton
image_prompt: A set of window washers are cleaning a giant jumbotron at a baseball park.  The jumbotron is disiplaying a gantt chart. 
---

# Context

We have been working on a ProjectGallery and ProjectViewer for several days. We have almost what we want, but the code feels like it is a mess. It's hard to understand how to get through the final troubleshooting.

## An Urgent Use Case that is more important than perfect architecture:

One of our clients has two projects we need to publish and show.  We are willing to hard code things, even if it's not the right thing to do.  But if it's hard to make this dynamic system work, we are open to just improvising hardcoded project viewers per project.  

#### Components:

```bash
.
|-- covers
|   |-- AugmentItCover.astro
|   |-- ProjectCover.astro
|   `-- ProjectCoverBase.astro
|-- debug
|   `-- SequentialSectionDebug.astro
|-- project-content-displays
|-- project-section-layouts
|   |-- StoryInlineCTA.astro
|   |-- StorySidebarTree__VariantB.astro
|   |-- StorySidebarTree.astro
|   |-- StorySidebarTreeNode.astro
|   |-- StoryStickyFooterNav.astro
|   `-- StoryTopStepper.astro
|-- ProjectGallery.svelte
|-- ProjectShowcase.astro
|-- Section__Project-Container.astro
|-- WorkflowSteps.astro
`-- WorkflowSteps.svelte
```


#### Pages:
```bash
|-- [...slug].astro
|-- Augment-It
|   |-- data-augmentation-workflow-with-microfrontends.astro
|   `-- Specs
|       |-- apps-microfrontends
|       |   |-- highlight-collector.astro
|       |   |-- prompt-template-manager.astro
|       |   |-- record-collector.astro
|       |   `-- request-reviewer.astro
|       `-- shared-services
|           `-- api-connector-service.astro
|-- augment-it.astro
|-- content-nav-variants.astro
|-- covers
|   `-- [doc].astro
|-- covers.astro
|-- gallery.astro
|-- index.astro
|-- story-variant-inline-cta.astro
|-- story-variant-sidebar-tree-variant-b.astro
|-- story-variant-sidebar-tree.astro
|-- story-variant-sticky-footer.astro
`-- story-variant-top-stepper.astro
```

We have clients for which we've built complex sets of projects. Different projects have different artifacts, file formats, and different ways of representing project progress. 

The Astro SSG is wonderful and we want to default to using SSG, HTML, and CSS.  However, we also want to be able to use dynamic content, and we want to be able to use dynamic content in a way that is easy to maintain and understand. 

Project Managers are also developers, so they do not need project management UI.  They can edit files directly.

## Goal

Enable our project managers to publish content related to the project in a way that is:
1. easy to maintain and reason about by developers.
2. flexible enough for project managers to publish different kinds of content, and specify specific content, and to create navigation UIs for the content. 
3. easy for clients to navigate. 

## Requirements

### ProjectGallery
1. There needs to be a well architected ProjectGallery that allows each project to have a "cover" component, which is like an album cover.  
2. Users can click to expand and launch a ProjectViewer component. 
3. Users can click on a collapse button to collapse the ProjectViewer component, which returns to the Project Gallery.  

### ProjectViewer
1. Project managers can choose a navigation component that works for the project. 
2. Project managers can link navigation items to specific content using paths.
3. 

```svelte
<script lang="ts">
  export let type: 'markdown' | 'canvas' | 'image';
  export let source: string;
  
  let isLoading = true;
  let error: string | null = null;
  let content: any = null;
  
  onMount(async () => {
    try {
      // Load content based on type
      const response = await fetch(source);
      if (!response.ok) throw new Error('Failed to load content');
      
      content = await response.json();
    } catch (e) {
      error = e.message;
    } finally {
      isLoading = false;
    }
  });
</script>

{#if isLoading}
  <div class="loading">Loading...</div>
{:else if error}
  <div class="error">Error: {error}</div>
{:else if type === 'canvas' && content}
  <JSONCanvasRenderer {content} />
{:else if type === 'markdown' && content}
  <MarkdownRenderer {content} />
{:else}
  <div>Unsupported content type: {type}</div>
{/if}
```

# Analyzing Spaghetti

## Component Analysis

### Core Gallery & Viewer Components
- **`ProjectGallery.svelte`** (27KB) - Main interactive gallery with expand/collapse functionality
- **`ProjectShowcase.astro`** - Static showcase component
- **`Section__Project-Container.astro`** - Container wrapper for project sections

### Cover Components (Project "Album Covers")
- **`ProjectCoverBase.astro`** (10KB) - Main reusable cover component with:
  - Logo support
  - Title/subtitle
  - Use cases display
  - CTA buttons (collapsed/expanded states)
  - Slot for content injection
- **`ProjectCover.astro`** - Simplified cover variant
- **`AugmentItCover.astro`** - Project-specific cover

### Navigation/Layout Components
- **`StorySidebarTree.astro`** & **`StorySidebarTree__VariantB.astro`** - Sidebar navigation with tree structure
- **`StorySidebarTreeNode.astro`** - Individual tree nodes
- **`StoryTopStepper.astro`** - Step-by-step navigation at top
- **`StoryStickyFooterNav.astro`** - Bottom navigation
- **`StoryInlineCTA.astro`** - Inline call-to-action blocks

### Workflow Components
- **`WorkflowSteps.astro`** & **`WorkflowSteps.svelte`** - Step visualization (both static and interactive)

### Debug/Development
- **`SequentialSectionDebug.astro`** - Debug component for development
- **`project-content-displays/`** - Empty directory (potential for content renderers)

## Architecture Strengths
1. **Modular Cover System** - Well-structured project covers with consistent interface
2. **Multiple Navigation Patterns** - Various layout options for different project types
3. **Hybrid Astro/Svelte** - Static generation with interactive islands
4. **Expandable Gallery** - Full-screen project viewer capability

## Gaps for Dynamic Project Viewer
1. **Content Type Handlers** - Missing renderers for markdown, canvas, images
2. **Dynamic Content Loading** - No fetch/load mechanism for different content types
3. **Unified Project Viewer** - Components are scattered, need orchestration
4. **Content Registry** - No centralized way to map content types to renderers

We the UI patterns and navigation components. You need to add the content loading and rendering layer to complete the dynamic project viewer system.

## Pages - Rendering Architecture Analysis

### **Page Types & Patterns**

#### 1. **Dynamic Collection Routes**
- **`[...slug].astro`** - Catch-all route for content collection entries
  - Uses `getStaticPaths()` to generate routes from projects collection
  - Renders with `OneArticle` + `OneArticleOnPage` components
  - Handles published content filtering

#### 2. **Hardcoded Project Pages**
- **`augment-it.astro`** - Specific project landing page
  - Imports multiple markdown files with `?raw`
  - Uses `AugmentItCover` + `ContentSection_SidebarTreeVariantB`
  - Defines demo steps and navigation structure

#### 3. **Gallery & Showcase Pages**
- **`gallery.astro`** - Main project gallery
  - Imports `ProjectGallery.svelte` for interactive functionality
  - Processes markdown with unified/remark pipeline
  - Handles multiple content types (markdown, canvas references)

#### 4. **Story Variant Demos**
- **`story-variant-*.astro`** - Layout pattern demonstrations
  - `sidebar-tree`, `inline-cta`, `sticky-footer`, `top-stepper`
  - Each shows different navigation/layout approaches
  - Hardcoded demo content and navigation structures

#### 5. **Cover System**
- **`covers.astro`** & **`covers/[doc].astro`** - Cover component showcases

### **Content Processing Patterns**

#### **Markdown Pipeline** (in gallery.astro)
```javascript
// Unified processor with multiple plugins
remarkParse → remarkGfm → remarkDirective → 
remarkImages → remarkBacklinks → remarkCitations → remarkTableOfContents
```

#### **Import Strategies**
1. **Raw imports**: `import md from 'file.md?raw'`
2. **Collection queries**: `getCollection('projects')`
3. **Static generation**: `getStaticPaths()`

### **Rendering Gaps**

1. **Inconsistent Content Loading**
   - Some pages use raw imports, others use collections
   - No unified content resolution strategy

2. **Hardcoded Navigation**
   - Demo steps manually defined in each page
   - No dynamic navigation generation from content structure

3. **Scattered Layout Logic**
   - Layout selection hardcoded per page
   - No content-driven layout selection

4. **No Content Type Registry**
   - Canvas, markdown, images handled ad-hoc
   - Missing unified content type system

### **Strengths**
- Multiple proven layout patterns
- Robust markdown processing pipeline
- Flexible component architecture
- Both static and dynamic rendering capabilities

The rendering side shows you have the **building blocks** but need **orchestration** - a unified system to dynamically select layouts, load content, and generate navigation based on project configuration rather than hardcoded page definitions.

Based on your spec and urgent client need, I recommend a pragmatic hybrid approach that gets you working quickly while setting up for future scalability.

Immediate Recommendation: Enhanced Hardcoded Approach
Since you need to deliver for your client quickly and you already have solid foundations, let's enhance your existing 
augment-it.astro
 pattern:

Recommended Approach: Pragmatic Enhancement
Given your urgent client need and existing solid foundations, here's my recommendation:

Phase 1: Quick Win (1-2 days)
1. Create a Unified ProjectViewer.svelte

svelte
<!-- src/components/projects/ProjectViewer.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import JSONCanvasRenderer from '../jsoncanvas/JSONCanvasRenderer.svelte';
  import OneArticleOnPage from '../articles/OneArticleOnPage.astro';
  
  export let project: {
    id: string;
    title: string;
    contentItems: Array<{
      type: 'markdown' | 'canvas' | 'image';
      source: string;
      title: string;
    }>;
    navigationLayout: 'sidebar-tree' | 'top-stepper' | 'sticky-footer';
  };
  
  let currentContent = project.contentItems[0];
  let isLoading = false;
</script>
2. Create ProjectNav.yaml Configuration Files
Instead of cluttering project markdown frontmatter, create dedicated navigation files:

**File Structure:**
```
content/projects/Augment-It/
├── ProjectNav.yaml          # Navigation configuration
├── Specs/
│   ├── workflow.md
│   ├── Augment-It.canvas
│   └── ...
└── augment-it.md           # Main project content (minimal frontmatter)
```

**ProjectNav.yaml:**
```yaml
# content/projects/Augment-It/ProjectNav.yaml
project_id: "augment-it"
navigation_layout: "sidebar-tree-variant-b"
cover_component: "AugmentItCover"

content_items:
  # Orientation - Overview and introduction
  - type: "markdown"
    source: "./Specs/workflow.md"
    title: "Data Augmentation Workflow"
    role: "orientation"
    nav_order: 1
  - type: "canvas"
    source: "./Specs/Augment-It.canvas"
    title: "Architecture Canvas"
    role: "orientation"
    nav_order: 2
  
  # Sequence - Step-by-step workflow
  - type: "markdown"
    source: "./Specs/record-collector.md"
    title: "Step 1: Load Data"
    role: "sequence"
    step: 1
    nav_order: 3
  - type: "markdown"
    source: "./Specs/review-enrich.md"
    title: "Step 2: Review & Enrich Records"
    role: "sequence"
    step: 2
    nav_order: 4
  - type: "markdown"
    source: "./Specs/prompt-templates.md"
    title: "Step 3: Author Prompt Templates"
    role: "sequence"
    step: 3
    nav_order: 5
  
  # Enrichment - Supporting materials and deep dives
  - type: "figma"
    source: "https://www.figma.com/embed?embed_host=share&url=..."
    title: "UI Mockups"
    role: "enrichment"
    nav_order: 6
  - type: "video_youtube"
    source: "dQw4w9WgXcQ"
    title: "Demo Video"
    role: "enrichment"
    nav_order: 7
  
  # Reference - Technical documentation
  - type: "markdown"
    source: "./Specs/api-reference.md"
    title: "API Reference"
    role: "reference"
    nav_order: 8
```

**Simplified Project Markdown:**
```yaml
# content/projects/Augment-It/augment-it.md
---
title: "Augment-It Project"
publish: true
has_project_nav: true  # Indicates ProjectNav.yaml exists
---

# Project overview content goes here...
```
3. Update ProjectGallery.svelte Modify your existing 27KB ProjectGallery to use the new ProjectViewer component instead of injecting content directly.

Phase 2: Content Renderers
4. Create Content Type Handlers

```typescript
// src/utils/contentRenderers.ts
export const contentRenderers = {
  markdown: (content: string) => processMarkdownWithUnified(content),
  canvas: (path: string) => loadCanvasData(path),
  image: (path: string) => ({ type: 'image', src: path })
};
```

5. Build Navigation Components Use your existing 
StorySidebarTree__VariantB.astro
 and others, but make them data-driven instead of hardcoded.

Why This Approach Works
✅ Leverages your existing components - No throwing away 27KB of working code
✅ Astro + Svelte hybrid - Matches your preferred stack
✅ Incremental enhancement - Can ship client work immediately
✅ Configuration-driven - Project managers can edit frontmatter
✅ Scalable foundation - Sets up for future dynamic system

Implementation Order
Start with ProjectViewer.svelte - This gives you the content switching logic
Create one client project config - Test the configuration approach
Update ProjectGallery integration - Connect the pieces
Add content renderers - Handle different content types
Test with client projects - Validate the approach works
This gets your client deliverable working quickly while building toward the dynamic system you want long-term. The hardcoded parts are isolated to configuration files that project managers can easily edit.

### Content Renderers

```typescript
// src/utils/contentRenderers.ts
export const contentRenderers = {
  // Local content
  markdown: (content: string) => processMarkdownWithUnified(content),
  canvas: (path: string) => loadCanvasData(path),
  
  // Images
  image_local: (path: string) => ({ type: 'image', src: path, loading: 'lazy' }),
  image_remote: (url: string) => ({ 
    type: 'image', 
    src: url, 
    loading: 'lazy',
    crossorigin: 'anonymous',
    referrerpolicy: 'no-referrer'
  }),
  
  // Embeds
  figma: (url: string) => ({
    type: 'figma_embed',
    src: url,
    allowfullscreen: true,
    sandbox: 'allow-scripts allow-same-origin'
  }),
  
  video_youtube: (videoId: string) => ({
    type: 'youtube_embed',
    src: `https://www.youtube.com/embed/${videoId}`,
    allowfullscreen: true,
    sandbox: 'allow-scripts allow-same-origin allow-presentation'
  }),
  
  video_vimeo: (videoId: string) => ({
    type: 'vimeo_embed', 
    src: `https://player.vimeo.com/video/${videoId}`,
    allowfullscreen: true
  })
};
```

```svelte
<!-- ProjectViewer.svelte content switching -->
{#if content.type === 'image'}
  <img src={content.src} alt={currentContent.title} loading={content.loading} />

{:else if content.type === 'figma_embed'}
  <iframe 
    src={content.src} 
    width="100%" 
    height="600"
    allowfullscreen={content.allowfullscreen}
    sandbox={content.sandbox}
    title="Figma Design"
  ></iframe>

{:else if content.type === 'youtube_embed'}
  <iframe 
    src={content.src}
    width="100%" 
    height="400"
    allowfullscreen={content.allowfullscreen}
    sandbox={content.sandbox}
    title="YouTube Video"
  ></iframe>

{:else if content.type === 'video_local'}
  <video 
    src={content.src} 
    controls={content.controls}
    preload={content.preload}
    width="100%"
  >
    Your browser doesn't support video playback.
  </video>
{/if}
```