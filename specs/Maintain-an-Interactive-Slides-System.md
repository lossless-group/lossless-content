---
title: Create an Interactive Slides System
lede: Make your site more useful by adding a site preview using HTML iFrames and OpenGraph.io
date_authored_initial_draft: 2025-06-06
date_authored_current_draft: 2025-06-06
date_authored_final_draft: null
date_first_published: null
date_last_updated: null
at_semantic_version: 0.0.0.1
status: To-Do
augmented_with: Windsurf Cascade on Claude 3.5 Sonnet
category: Prompts
date_created: 2025-06-06
date_modified: 2025-06-06
image_prompt: "A robot representing AI is presenting a slide deck to a board room of people."
tags:
  - User-Interface
  - Slide-Decks
  - Interactive-Content
authors:
  - Michael Staton
banner_image: https://ik.imagekit.io/xvpgfijuw/uploads/lossless/specs/2025-06-07_banner_image_Maintain-an-Interactive-Slides-System_6a26dec5-8467-42e9-ad5f-10641f1c5421_yy0gvWgec.webp
portrait_image: https://ik.imagekit.io/xvpgfijuw/uploads/lossless/specs/2025-06-07_portrait_image_Maintain-an-Interactive-Slides-System_62aa0a83-e431-4eb7-a546-6aef476ba969_KIbMOQrh8.webp
---

# Slide Deck System

We are a boutique, high-end consultancy that develops and communicates content related to technology adoption, innovation strategy, and business growth. As a result, we develop a lot of content and we are tired of spending so much time making slides in Keynote. 

## Goals:

1. To be able to quickly create, maintain, and manage slides as if they were content. 
2. To develop a system for putting slide content in the appropriate places, in the appropriate format. 
3. To understand the advantages of using Markdown or HTML for Slide content. 
4. To develop components that will make it easy to apply styles, formats, interactivity, and other features to slides.

### Slide Deck Features:
1. To be able to have dynamic four way navigation between slides.
2. To be able to have a PDF export of the slides.
3. To use global theme CSS to stay on brand.
4. To maintain a CSS/JavaScript component library that allows us to easily create or modify components for slides.

## Current Implementation:
The current implementation was just a proof of concept. It has a lot "hard coded" instead of using Astro or Svelte to dynamically generate slideshows based on a content library. However, some features of this proof of concept are desirable. 

The current implementation is in the following files:
`site/src/pages/slides/index.astro`
`site/src/pages/slides/[collection]/[...slug].astro`
`site/src/layouts/OneSlideDeck.astro`
`site/src/pages/slides/pdf.astro`

I want to start developing content for slides WHEN THE CONTENT is in HTML or Svelte or Astro code.
This coded content will be in the following directory:
`site/src/content/slides`

I want to develop Markdown slide content in the content submodule.  However, I may have slide content in unexpected directory structures. For instance, I have a 
`content/client-content` directory that contains content for clients organized by client name. 
So, I need to understand how, using Astro or Svelte, create a **collection-like** system that can actually source content in multiple directories. 
I also need to understand how to allow the user or frontend developer to specify a "list" of slideshow files that will be across directories. 


I want to understand how to best develop the content, as raw HTML files, Astro, or Svelte, and what tradeoffs are between one and another. 

## Immediate Objective:
I need to develop a presentation this weekend for a client, and I put placeholder content in HTML in the following file:
`site/src/content/slides/Tonguc-Story.astro`

---

# Interactive Slides System Specification

## 1. System Overview

### 1.1 Purpose
The Slide Deck System provides a content-first approach to creating, managing, and presenting slides within our Astro-based website, enabling:
- Rapid slide deck creation using Markdown, HTML, or Astro components
- Consistent branding and theming
- Easy content updates without design overhead
- PDF export functionality
- Flexible content organization across multiple directories

### 1.2 Core Principles
1. **Content-First**: Write slides in Markdown or structured HTML
2. **Component-Based**: Use Astro/Svelte components for interactive elements
3. **Themeable**: Apply consistent branding through CSS custom properties
4. **Accessible**: Meet WCAG 2.1 AA standards
5. **Performant**: Optimize for fast loading and smooth transitions

## 2. Architecture

### 2.1 Directory Structure
```
site/src/
├── components/
│   ├── slides/
│   │   ├── Slide.astro          # Base slide component
│   │   ├── Deck.astro           # Deck container with navigation
│   │   ├── controls/            # Navigation controls
│   │   └── layouts/             # Predefined slide layouts
│   └── ui/                      # Shared UI components
├── content/
│   └── slides/                  # Default slide content
│       └── [decks]/             # Organized by deck
│           └── [slides].md/astro
├── layouts/
│   └── SlideDeck.astro          # Main layout for presentations
└── pages/
    └── slides/
        ├── [deck].astro         # Dynamic route for presentations
        └── [deck]/[slide].astro # Individual slide view
```

### 2.2 Content Types

#### 2.2.1 Markdown Slides
```markdown
---
title: "Presentation Title"
author: "Presenter Name"
date: "2025-06-06"
theme: "default"
transition: "slide"
---

# Slide 1
Content for slide 1

---

# Slide 2
- Bullet point 1
- Bullet point 2

![Image](path/to/image.jpg)
```

#### 2.2.2 Astro Component Slides
```astro
---
// src/content/slides/my-deck/intro.astro
import { Slide } from '@/components/slides/Slide.astro';
---

<Slide 
  title="Introduction" 
  layout="two-column"
  background="gradient"
>
  <div slot="left">
    <h1>Welcome</h1>
    <p>Introduction content</p>
  </div>
  <div slot="right">
    <img src="/images/welcome.svg" alt="Welcome" />
  </div>
</Slide>
```

## 3. Features

### 3.1 Core Features

1. **Navigation**
   - Keyboard shortcuts (arrows, space, home/end)
   - Touch gestures (swipe)
   - On-screen controls
   - Table of contents overlay
   - Assume the client will be accessing it from a link sent to a mobile device, and will be viewing it in landscape mode on their mobile device.

2. **Theming**
for Markdown content presentations, try to use our markdown rendering pipeline and features already in our system.

   - CSS custom properties for colors, fonts, and spacing
   - Ability to switch themes and framework for understanding how to do it (we will have themes for each client, and use their brand colors, etc.)
   - Custom theme support

3. **Layouts**
   - Title slide
   - Two-column
   - Three-column (for use of 1/3 and 2/3 content)
   - Embedded Videos
   - Full-bleed image
   - Background Image (full page) with a brand color overlay and opacity settings. 
   - Custom component slots

  4. **Content Components**
   - Code block (use the same code block component from the global component library) in our Markdown rendering pipeline.
   - Quote
   - Backlinks

4. **Interactive Elements**
   - Embedded demos
   - Live code examples
   - Interactive diagrams
   - Speaker notes
   - Tooltips

### 3.2 Advanced Features

1. **Content Sourcing**
   - Multiple content directories
   - Dynamic content loading
   - Remote content support

2. **Export Options**
   - PDF generation
   - Image generation (as JPEG or PNG)
   - Speaker notes

3. **Accessibility**
   - Keyboard navigation
   - Screen reader support
   - Reduced motion preferences
   - High contrast mode

## 4. Implementation Details

### 4.1 Component API

#### Slide.astro
```typescript
interface SlideProps {
  title?: string;
  layout?: 'default' | 'two-column' | 'full-bleed' | 'quote' | 'code';
  background?: 'light' | 'dark' | 'gradient' | 'image';
  transition?: 'none' | 'fade' | 'slide' | 'zoom' | 'page-flip';
  // Additional props
}
```

#### Deck.astro
```typescript
interface DeckProps {
  slides: string[]; // Paths to slide content
  theme?: string;
  showProgress?: boolean;
  showControls?: boolean;
  // Additional props
}
```

### 4.2 Content Collection

```typescript
// src/content/config.ts
import { defineCollection } from 'astro:content';

export const collections = {
  slides: defineCollection({
    type: 'slides-content',
    schema: ({ image }) => ({
      title: z.string(),
      lede: z.string().optional(),
      date_created: z.date().optional(),
      date_modified: z.date().optional(),
      authors: z.array(z.string()).optional(),
      for_client: z.string().optional(),
      for_persons: z.array(z.string()).optional(),
      password: z.string().optional(),
      tags: z.array(z.string()).optional(),
      theme: z.string().default('default'),
      layout: z.string().default('default'),
      status: z.string().default('draft').optional(),
      published: z.boolean().default(true).optional(),
      // Additional fields
    }),
  }),
};
```

## 5. Integration Points

### 5.1 With Existing Systems

1. **Content Management**
   - Integrates with Astro Content Collections
      - Supports custom "lists" of paths to slides, which may not be in the default directory.
   - Supports MDX for interactive components
   - Works with existing asset pipeline


## 6. Development Roadmap

### Phase 1: Markdown Rendering System Integration
- [x] Review and document our Markdown rendering system (see [[specs/Maintain-a-Proprietary-Extended-Markdown-Flavor-Rendering-Pipeline.md|Markdown Rendering Pipeline Spec]])
- [x] Review Astro components for Extended Syntax (documented in spec)
- [x] Document relevant files and patterns (see spec)
- [x] Review if we need to develop a dynamic variant of each Markdown extension component for slides.
- [ ] Define slide-specific Markdown extensions (see below)
- [ ] Plan integration points with existing pipeline

### Phase 2: Just get a single slideshow working from a different directory using the existing page rendering pipeline.



#### 1.1 Slide Separators
```markdown
---
<!-- Regular horizontal rule becomes a slide break (both --- and *** are supported) -->
***

<!-- With slide attributes (both formats supported) -->
---?theme=dark&transition=slide
***?theme=dark&transition=slide

<!-- Vertical slide (both formats supported) -->
----
****

<!-- Recommendation: Use *** when working with frontmatter to avoid conflicts -->
```

#### 1.2 Slide Layouts
```markdown
<!-- Center layout (default) -->
::: center
# Centered Content
:::

<!-- Two-column layout -->
::: cols
# Left Column
---
# Right Column
:::

<!-- Full-bleed background -->
::: full-bleed background="url('image.jpg')
# Overlay Content
:::
```

#### 1.3 Speaker Notes
```markdown
::: notes
These are speaker notes
Only visible in presenter mode
:::
```

#### 1.4 Slide-Specific Metadata
```markdown
---
layout: center
background: /images/bg.jpg
theme: dark
transition: fade
---
```

### 2. Implementation Plan

1. **Create `remark-slides` Plugin**
   - Parse slide separators and metadata
   - Handle vertical slides (nested slides)
   - Process slide-specific directives

2. **Extend AstroMarkdown Component**
   - Add slide-specific component mapping
   - Handle slide transitions
   - Support presenter mode

3. **Create Slide Layout Components**
   - `Slide.astro` - Base slide component
   - `SlideLayout.astro` - Handles different layouts
   - `SlideNotes.astro` - Speaker notes component

4. **Update Build Pipeline**
   - Add slide processing to content collections
   - Support both `.md` and `.astro` slide files
   - Generate slide navigation

### 3. File Structure
```
site/src/
  components/
    slides/
      Slide.astro
      SlideLayout.astro
      SlideNotes.astro
      Navigation.astro
  utils/
    markdown/
      remark-slides.ts
      rehype-slides.ts
  content/
    slides/
      _config.ts
      index.json.ts
```

### Phase 1

### 4. Integration Points
1. Extend `astro.config.mjs` to include slide processing
2. Update content collections to recognize slide files
3. Add slide-specific styles to Tailwind config
4. Create slide-specific components that work with existing Markdown components

### Phase 2: Core Functionality
- [ ] Semantic HTML
- [ ] Basic slide rendering
- [ ] Tailwind and CSS support
- [ ] Navigation controls
- [ ] PDF export
- [ ] Existing markdown render pipeline either directly applies or is extended for slides. 

### Phase 2: Enhanced Features
- [ ] Interactive components
- [ ] Remote content support
- [ ] Advanced animations

### Phase 3: Performance Considerations

1. **Bundle Size**
   - Lazy loading of assets
   - Optimized build output

2. **Rendering**
   - Virtualized slide rendering
   - Efficient DOM updates
   - Optimized animations

### Phase 4: Accessibility

1. **Keyboard Navigation**
   - Full keyboard support
   - Skip links
   - Focus management

2. **Screen Reader Support**
   - ARIA attributes
   - Live regions
   - Semantic HTML

### Next Steps

1. Would you like me to elaborate on any specific section of this specification?
2. Should we prioritize any particular feature for the initial implementation?
3. Would you like me to create a proof-of-concept implementation for any component?

This specification provides a solid foundation for developing the Interactive Slides System while maintaining flexibility for future enhancements. Let me know how you'd like to proceed with the implementation.
