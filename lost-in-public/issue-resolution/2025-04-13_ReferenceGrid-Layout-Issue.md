---
title: ReferenceGrid Layout Issue Resolution (CSS vs Tailwind)
lede: Documenting the troubleshooting process for ReferenceGrid component displaying as a single column instead of a responsive grid on the combined reference page.
date: "2025-04-13T03:58:00-05:00" # Approximate time of resolution
date_authored_initial_draft: 2025-04-13
date_authored_current_draft: 2025-04-13
date_authored_final_draft: 2025-04-13
status: Completed
category: Changelog--Code
tags:
  - Issue-Resolution
  - CSS
  - Tailwind
  - Astro
  - ReferenceGrid
authors:
  - Michael Staton
  - Cascade AI
---

# Issue Resolution: ReferenceGrid Layout Incorrect on Combined Page

## 1. What were we trying to do and why?

We were trying to fix a layout issue with the `ReferenceGrid.astro` component. On the main `/more-about` index page, where both the vocabulary and concepts grids are displayed together, the items were stacking vertically in a single column, regardless of screen size.

This was incorrect because the component was designed to be responsive, showing 1, 2, or 3 columns based on screen width. The correct responsive behavior *was* observed on the individual `/more-about/vocabulary` and `/more-about/concepts` pages, indicating the problem was specific to the combined index page context.

## 2. Incorrect Attempts

*   **Removing `<section>` Wrappers:** We initially hypothesized that the `<section>` tags wrapping each `ReferenceGrid` instance on `/more-about/index.astro` might be interfering. Removing them did not solve the layout issue (items still stacked) and introduced a lint error because we tried adding a `class` prop directly to `ReferenceGrid` before it was configured to accept one. We subsequently added support for the `class` prop, fixing the lint error, but the layout problem remained. The `<section>` tags were restored.
*   **Inspecting CSS:** Using browser developer tools, we confirmed that the `.reference-grid` element had `display: grid` applied correctly. However, the computed style for `grid-template-columns` was always `1fr`, even on wide screens. This pointed to the media queries within the component's `<style>` block not being applied.
*   **Checking CSS Variables:** The media queries used CSS variables (`--breakpoint-md`, `--breakpoint-lg`) with fallbacks (e.g., `var(--breakpoint-md, 768px)`). We checked the imported global CSS files (`global.css`, `structure.css`, `starwind.css`) but could not find definitions for these specific variables.

## 3. The "Aha!" Moment

Although the CSS variables were missing, the media queries included fallback pixel values (`768px`, `1024px`) which *should* have worked. The fact that even the fallbacks weren't triggering the multi-column layout *specifically* on the `/more-about` page, despite working elsewhere, suggested a subtle conflict or issue preventing the media queries in the component's `<style>` block from matching correctly in that specific page context.

Given that the project uses Tailwind CSS (via `starwind.css`), the most robust and idiomatic solution was identified: bypass the custom `<style>` block entirely and leverage Tailwind's built-in responsive utility classes.

## 4. Final Solution

We refactored the `ReferenceGrid.astro` component to remove its internal `<style>` block and instead apply Tailwind's responsive grid classes directly to the root `div` element:

**File:** `/Users/mpstaton/code/lossless-monorepo/site/src/components/reference/ReferenceGrid.astro`

```astro
---
// ... (script setup remains the same, including accepting 'class' prop)
import type { CollectionEntry } from 'astro:content';
import VocabularyPreviewCard from '@components/reference/VocabularyPreviewCard.astro';
import ConceptPreviewCard from '@components/reference/ConceptPreviewCard.astro';
import type { ReferenceItem, ReferenceData } from '@ts/types/content'; // Ensure types are imported

interface Props {
  items: ReferenceItem[];
  class?: string; // Optional class prop for external styling
}

const { items, class: className } = Astro.props; // Destructure class prop

// Helper function remains the same
function formatEntryForCard(item: ReferenceItem): CollectionEntry<'vocabulary' | 'concepts'> & {
  data: ReferenceData;
} {
  // ... (implementation unchanged)
}
---

<div class:list={[
    "grid",           // Apply base grid display
    "grid-cols-1",    // Default: 1 column
    "md:grid-cols-2", // Medium screens: 2 columns
    "lg:grid-cols-3", // Large screens: 3 columns
    "gap-4",          // Apply gap using Tailwind utility (adjust value as needed)
    className         // Include any passed-in class for margins etc.
  ]}>
  {items.map((item) => (
    <div> {/* Container for each card - no specific class needed */}
      {/* Conditional rendering of Vocabulary/Concept cards */}
      {item.collection === 'vocabulary' ? (
        <VocabularyPreviewCard entry={formatEntryForCard(item)} />
      ) : item.collection === 'concepts' ? (
        <ConceptPreviewCard entry={formatEntryForCard(item)} />
      ) : (
        <p>Error: Unknown item type</p>
      )}
    </div>
  ))}
</div>

{/* Removed the entire <style> block that contained the custom CSS and media queries */}
```

This approach utilizes the project's existing Tailwind setup for responsiveness, resolving the layout inconsistency without relying on potentially conflicting or undefined CSS variables and media queries within the component scope.
