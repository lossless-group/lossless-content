---
title: Dynamic Information Page Rendering in Astro
lede: Empower developers to focus on layout and let MDX do the content and interaction
date_authored_initial_draft: 2025-03-24
date_authored_current_draft: 2025-03-24
date_authored_final_draft: 
date_first_published: 
date_last_updated: 
at_semantic_version: 0.0.1.0
status: To-Prompt
augmented_with: Windsurf Cascade on Claude 3.5 Sonnet
category: Prompts
date_created: 2025-04-16
date_modified: 2025-04-19
site_uuid: 6487c56c-2072-4cc6-b6e0-62b7f9929b7a
tags: 
  - Render-Logic
  - Astro
  - Component-Architecture
  - MDX
  - Content-Collections
  - Dynamic-Routing
  - Layout-System
  - Content-Displays
authors:
  - Michael Staton
image_prompt: A page of code on the left, a web page on the right.
portrait_image: https://ik.imagekit.io/xvpgfijuw/uploads/lossless/prompts/render-logic/2025-05-04_portrait_image_Support-Dynamic-Information-Pages_3155a45e-d6db-442b-a53b-09ebd90a3fac_T5Qpsm_mm.webp
banner_image: https://ik.imagekit.io/xvpgfijuw/uploads/lossless/prompts/render-logic/2025-05-04_banner_image_Support-Dynamic-Information-Pages_4964e33b-bebd-4caf-ad71-49eff66548a2_lWs2AOH9V.webp
---
# Dynamic Information Page Rendering in Astro

## Executive Summary

### Problem Statement
Need a flexible system for rendering dynamic information pages that:
1. Separates content from presentation
2. Supports interactive components via MDX
3. Maintains consistent layouts
4. Handles custom components gracefully

### Solution Overview
Implemented a layered architecture using Astro's built-in features:
1. Content Collections for MDX files
2. Dynamic routing through entry points
3. Nested layouts for consistent presentation
4. Component composition for specialized content

## Technical Details

### Component Pipeline

```mermaid
graph TD
    A[about.astro] -->|pageName prop| B[Information.astro]
    B -->|getCollection| C[pages Collection]
    C -->|render| D[Content Component]
    D -->|slots into| E[Layout.astro]
    E -->|renders| F[Final HTML]
```

### Entry Point (`about.astro`)
```astro
---
import Information from '../layouts/Information.astro';
---

about.astro (entry)
  → Information.astro (content fetcher)
    → pages collection (content source)
      → Layout.astro (base layout)
        → Final HTML

<Information pageName="test" />
```
- Simple entry point
- Delegates rendering to Information layout
- Specifies which page to render via `pageName`



### Information Layout (`Information.astro`)
```astro
---
import Layout from './Layout.astro';
import { getCollection } from 'astro:content';

const { pageName } = Astro.props;

// Get the page content from the pages collection
const pages = await getCollection('pages');
const pageContent = pages.find(page => page.slug === pageName);

const { Content } = await pageContent.render();
---

<Layout>
  <div class="information-content">
    <Content />
  </div>
</Layout>
```
- Acts as middleware between entry point and content
- Fetches content from collection
- Wraps content in base layout
- Handles content rendering

### Content Collection Configuration
```typescript
// content.config.ts
const pagesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string()
  }).catchall(z.any()) // Flexible schema for AI-generated content
});
```
- Minimal schema validation
- Supports MDX files
- Allows any additional frontmatter properties

### Base Layout (`Layout.astro`)
```astro
---
import Header from "@basics/Header.astro";
import Footer from "@basics/Footer.astro";
---

<!doctype html>
<html lang="en">
  <head>
    <!-- Standard meta tags and styles -->
  </head>
  <body>
    <Header />
    <main>
      <slot />
    </main>
    <Footer />
  </body>
</html>
```
- Provides consistent page structure
- Includes common components
- Uses slot system for content insertion

## Implementation Status

### Completed
- [x] Basic routing structure
- [x] Content collection setup
- [x] Layout system
- [x] MDX integration
- [x] Custom component support

### Pending
- [ ] Error boundaries
- [ ] Loading states
- [ ] 404 handling
- [ ] Meta tag management

## Design Decisions

1. **Layered Architecture**
   - Entry points are thin
   - Logic lives in layouts
   - Content separate from presentation

2. **Content Collection Usage**
   - Minimal schema validation
   - Flexible frontmatter
   - MDX support for interactivity

3. **Layout Composition**
   - Base layout for consistency
   - Information layout for specific pages
   - Slot system for flexibility

## Future Considerations

1. **Performance**
   - Page transitions
   - Content preloading
   - Component lazy loading

2. **Content Management**
   - Draft system
   - Content versioning
   - Preview mode

3. **Developer Experience**
   - Page templates
   - Component documentation
   - Testing strategies