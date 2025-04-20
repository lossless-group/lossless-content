---
title: Create a Variant of an Existing Component
lede: The component we have is great, but we need a variant of it.
date_authored_initial_draft: 2025-04-19
date_authored_current_draft: 2025-04-19
date_authored_final_draft: null
date_first_published: null
date_last_updated: 2025-04-19
at_semantic_version: 0.0.0.1
status: To-Do
augmented_with: Windsurf Cascade on GPT 4.1
category: Prompts
date_created: 2025-04-16
date_modified: 2025-04-16
image_prompt: "A component icon with many variant icons in a grid pattern."
tags:
  - Render-Logic
  - Component-based-Architecture
  - UI-Design
authors:
  - Michael Staton
---

## Context

We have a component that is great, but we need a variant of it.

### Why this matters:

Without a variant of the component, we can't acheive the aesthetic and user-interface goals we have in mind.

Given we already have a working component, we can use it as a starting point. And given we want consistency, we should use the code patterns and connectivity to other definitions, components, and pages.

#### Audience

Developers, remote and contract developers, and AI Code Assistants who continue to build out our content-driven application.

#### Affected Parties:

Designers and developers who work on our code base.

# Task at Hand:

Create a variant of:

`site/src/components/articles/PostCard.astro`

### Variant Name:

`site/src/components/articles/ArticleListWide.astro`

Should be rendered in 
`site/src/components/articles/ArticleListColumn.astro`

## Aesthetic Goals:

Instead of it mimicking a "Card" it should resemble a "News Article" preview rendered on mobile, with the image on the left and the title and lede on the right.

Instead of having a border with four sides, it should have no border, but may be "separated" by a separator where it is listed.

---

## Prompt: Create a Variant of an Existing Article List Component

### Objective

Create a new variant of the article list component for our Astro site that presents articles in a "news preview" style for mobile, distinct from the current card-based design.

### Background

- The current component, `ArticleListWide.astro`, displays articles in a card format.
- The new variant will be rendered within `ArticleListColumn.astro`.
- The goal is to better mimic a mobile news article preview, improving scan-ability and visual hierarchy.

### Requirements

#### 1. **Layout & Structure**
- Each article preview should have:
  - The article image on the **left** (fixed width, responsive height).
  - The title and lede (summary) on the **right**, vertically stacked.
- The layout must be fully responsive, optimized for mobile screens (≤600px), but should not break desktop layouts.

#### 2. **Visual Design**
- **No card border:** Remove any border or box-shadow typically used for cards.
- **Separation:** Use a simple separator (e.g., a thin horizontal line or subtle background color shift) between articles.
- **Image:** 
  - Should mainly retain aspect ratio, but may be "overflow hidden" to fit the layout.
  - Should have a fallback if no image is present.
- **Typography:** 
  - Title should be prominent (larger font, bold).
  - Lede should be secondary (smaller, lighter font).
- **Spacing:** Adequate padding between image and text, and between stacked articles.

#### 3. **Accessibility**
- All images may used the "image_prompt" value from the yaml frontmatter for meaningful `alt` text.
- The component must be keyboard navigable and screen-reader friendly.

#### 4. **Props & Data**
- Accepts the same data shape as `ArticleListWide.astro` (array of article objects).
- Must gracefully handle missing or incomplete data (e.g., missing image, missing lede).

#### 5. **Integration**
- The new variant should be implemented as a new component (e.g., `ArticleListNewsPreview.astro`).
- `ArticleListColumn.astro` is an "Abstraction" -- part of our efforts to reuse components and patterns.  Therefore, developers should study how different pages or layouts pass "Components" as component names, and props as a single, undefined object to be destructured at the point of render.
- Ensure all styling is modular and does not leak to other components.
- Ensure all styles are responsive and will render well on both mobile and desktop, as well as users who resize browsers on the fly.

### Deliverables

- `site/src/components/articles/ArticleListNewsPreview.astro` (new component)
- Updated `ArticleListColumn.astro` to support rendering the new variant
- Brief documentation in the component file (only comment in the frontmatter of an Astro component. NEVER USE JSX COMMENT SYNTAX IN THE HTML PART OF THE COMPONENT)

### References

#### Study an existing layout, and follow the render pipeline all the way down
- `site/src/layouts/ChangelogLayout.astro` 
Note: we do not want the same styles as the Changelog layout.

### Our Components
- [Current ArticleListWide.astro implementation](../ArticleListWide.astro)
- [Current ArticleListColumn.astro implementation](../ArticleListColumn.astro)

### References
- [Astro component docs](https://docs.astro.build/en/core-concepts/astro-components/)

### Acceptance Criteria

- The new component matches the design and layout requirements.
- All articles render correctly with/without images and ledes.
- Mobile and desktop layouts are visually consistent and accessible.
- No regressions to existing article list components.

---

**If you need clarification or have suggestions for improvement, please comment directly in this prompt before implementation.**
