---
title: Move styles from Tailwind to CSS using our styles
lede: We use Tailwind for speed and compact readability, but as we move to Astro, we should use CSS and try to maintain our CSS architecture
date_authored_initial_draft: 2025-04-12
date_authored_current_draft: 2025-04-12
date_authored_final_draft: null
date_first_published: null
date_last_updated: null
at_semantic_version: 0.0.0.1
status: Prompted
augmented_with: Windsurf Cascade on Claude 3.5 Sonnet
category: Prompts
date_created: 2025-04-16
date_modified: 2025-04-19
image_prompt: "A split-screen showing Tailwind utility classes transforming into organized CSS files, with a modern interface and visual cues for maintainability and style."
portrait_image: "https://img.recraft.ai/vrGplHqRSAYwblHd-1SyePMK0Bom5oTNmDHkIQmZsDU/rs:fit:1024:1820:0/raw:1/plain/abs://external/images/e0e6fbe0-96b3-4393-a958-76ac30188cfb"
publish: true
site_uuid: f08a64f3-f771-472a-8845-b400d7db9ab7
tags: [Code-Style, Component-based Architecture, Readability, Component-Management]
authors:
  - Michael Staton
---

# Context

As our codebase grows, we're moving away from inline Tailwind CSS classes toward a more maintainable CSS architecture using component-specific stylesheets. This transition helps improve code readability, reduces duplication, and creates a more consistent design system.

# Objective

Refactor components to move Tailwind CSS classes into dedicated component-level CSS files following our established styling patterns and variable naming conventions.

# Implementation Guidelines

## 1. Create Component-Specific CSS Files

For each component that needs styling, create a corresponding CSS file in the same directory:

```
/components/reference/VocabularyPreviewCard.astro
/components/reference/VocabularyPreviewCard.css
```

## 2. Use Project CSS Variables

Leverage our existing CSS variables defined in `global.css` and other base stylesheets:

- Color variables like `--clr-lossless-primary-dark`, `--clr-lossless-accent--brightest`
- Gradient variables like `--grd--lossless-eastern-crimson`
- Opacity variants like `--white--pure--20p`

## 3. Naming Convention for CSS Classes

Follow our established naming pattern:

- Use component name as prefix: `.vocabulary-preview-card`
- Use BEM-like modifiers for variants: `.vocabulary-preview-card__title`
- Maintain semantic naming: `.vocabulary-preview-card__alias-list`

## 4. Import CSS in Component

At the top of each Astro component file, import the corresponding CSS:

```astro
---
// Component logic here
---

<style>
  @import './ComponentName.css';
</style>

<!-- Component markup -->
```

## 5. Example Refactoring

### Before (Tailwind):

```astro
<div class="bg-gray-800 p-4 rounded-lg">
  <h3 class="text-sm font-bold mb-2">
    <a href={url} class="text-blue-400 hover:underline">
      {entry.data.title}
    </a>
  </h3>
  <p class="text-xs text-gray-400 mb-2">
    Also known as: {entry.data.aliases.join(', ')}
  </p>
</div>
```

### After (Component CSS):

```astro
<div class="vocabulary-card">
  <h3 class="vocabulary-card__title">
    <a href={url} class="vocabulary-card__link">
      {entry.data.title}
    </a>
  </h3>
  <p class="vocabulary-card__aliases">
    Also known as: {entry.data.aliases.join(', ')}
  </p>
</div>
```

With corresponding CSS:

```css
.vocabulary-card {
  background-color: var(--clr-lossless-primary-dark);
  padding: 1rem;
  border-radius: 0.5rem;
}

.vocabulary-card__title {
  font-size: 0.875rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.vocabulary-card__link {
  color: var(--clr-lossless-accent--brightest);
}

.vocabulary-card__link:hover {
  text-decoration: underline;
}

.vocabulary-card__aliases {
  font-size: 0.75rem;
  color: var(--white--pure--70p);
  margin-bottom: 0.5rem;
}
```

## 6. Continuous Refactoring Strategy

- Start with the most frequently used components
- Refactor one component at a time
- Update all instances where the component is used
- Add comprehensive comments explaining the styling choices
- Document any new CSS variables in a central location

## 7. Benefits of This Approach

- **Improved readability**: Class names are semantic and self-documenting
- **Better maintainability**: Style changes can be made in one place
- **Reduced duplication**: Common styles are centralized
- **Stronger typing**: CSS classes can be documented with TypeScript interfaces
- **Better performance**: Reduced CSS payload in production builds

## 8. Testing After Refactoring

- Verify visual consistency across all screen sizes
- Check for any unintended style inheritance
- Ensure proper dark/light mode support
- Validate accessibility (contrast, focus states, etc.)

# Example Components to Refactor

1. VocabularyPreviewCard
2. ConceptPreviewCard
3. Navigation tabs in more-about pages
4. Section headers and containers

# Resources

- [Project CSS Variables](/site/src/styles/global.css)
- [CSS Architecture Documentation](/content/specs/css-architecture.md)
- [Component Design System](/content/specs/component-design-system.md)
