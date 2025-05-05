---
title: Maintain a CSS Animation System
lede: A comprehensive guide to the standardized animation and transition system
date_authored_initial_draft: 2025-04-12
date_authored_current_draft: 2025-04-12
date_authored_final_draft: 
date_first_published: 
date_last_updated: 
at_semantic_version: 0.0.1.0
publish: true
status: Implemented
augmented_with: Windsurf Cascade on Claude 3.7 Sonnet
category: Specification
date_created: 2025-04-16
date_modified: 2025-04-30
site_uuid: e2940d5c-3e5a-4a06-bc7d-c5d0c6bf0ccc
tags: 
- CSS-Architecture
- Animation
- Transitions
- Component-Management
- User-Experience
authors:
  - Michael Staton
image_prompt: Colorful, smoothly animated shapes and UI elements in motion, set against a modern web interface. The scene radiates creativity and dynamic energy, highlighting the beauty of CSS-powered transitions and effects.
banner_image: https://ik.imagekit.io/xvpgfijuw/uploads/lossless/specs/2025-05-05_banner_image_Maintain-a-CSS-Animation-System_5106c20b-3175-403b-a0f9-b1e62d71aefc_g-60us6Y3.webp
portrait_image: https://ik.imagekit.io/xvpgfijuw/uploads/lossless/specs/2025-05-05_portrait_image_Maintain-a-CSS-Animation-System_e559e258-efce-4609-baba-cb8e4cc24e24_Ddt-nqJ9i.webp
---
# CSS Animation System

This document outlines the standardized animation and transition system implemented across our component library. The system provides a consistent approach to animations, transitions, and interactive states.

## Table of Contents

1. [Overview](#overview)
2. [CSS Custom Properties](#css-custom-properties)
3. [Utility Classes](#utility-classes)
4. [Component-Specific Mixins](#component-specific-mixins)
5. [State Management](#state-management)
6. [Starwind Integration](#starwind-integration)
7. [Accessibility](#accessibility)
8. [Migration Guide](#migration-guide)
9. [Examples](#examples)

## Overview

The animation system is designed to provide:

- **Consistency**: Standardized timing and easing functions across components
- **Maintainability**: Centralized animation properties for easier updates
- **Performance**: Specific property transitions instead of `transition: all`
- **Flexibility**: Component-specific customizations through utility classes
- **Accessibility**: Respect for user preferences like reduced motion

All animation styles are defined in `/site/src/styles/animations.css`.

## CSS Custom Properties

The system defines the following CSS custom properties (variables) for consistent animation parameters:

### Timing Durations

```css
--transition-duration-fast: 0.1s;
--transition-duration-standard: 0.2s;  /* Most common in our codebase */
--transition-duration-slow: 0.3s;
--transition-duration-slower: 0.5s;
```

### Timing Functions

```css
--transition-timing-standard: ease-in-out;  /* Most common in our codebase */
--transition-timing-smooth: cubic-bezier(0.4, 0, 0.2, 1);
--transition-timing-bounce: cubic-bezier(0.175, 0.885, 0.32, 1.275);
--transition-timing-sharp: cubic-bezier(0.4, 0, 0.6, 1);
```

### Transform Values

```css
--transform-elevation-small: translateY(-2px);
--transform-elevation-medium: translateY(-4px);
--transform-elevation-large: translateY(-8px);
```

### Color Mix Values

```css
--color-mix-hover-light: 20%;  /* Standard lightening amount */
--color-mix-hover-medium: 40%;
--color-mix-hover-strong: 60%;
```

## Utility Classes

The system provides utility classes for common transition patterns:

### Transition Property Classes

- `.transition-all`: Transitions all properties (use sparingly for performance)
- `.transition-colors`: Transitions color-related properties
- `.transition-transform`: Transitions transform properties
- `.transition-borders`: Transitions border-related properties
- `.transition-opacity`: Transitions opacity
- `.transition-shadow`: Transitions box-shadow

### Duration Modifiers

- `.transition-fast`: Uses fast duration
- `.transition-slow`: Uses slow duration
- `.transition-slower`: Uses slower duration

### Timing Function Modifiers

- `.transition-smooth`: Uses smooth timing function
- `.transition-bounce`: Uses bounce timing function
- `.transition-sharp`: Uses sharp timing function

### Hover Effect Classes

- `.hover-elevate`: Standard elevation on hover
- `.hover-lighten`: Standard background lightening on hover

## Component-Specific Mixins

The system includes pre-defined mixins for common component patterns:

### Card Hover Effect

```css
.card-hover-effect {
  transition-property: transform, background-color;
  transition-duration: var(--transition-duration-standard);
  transition-timing-function: var(--transition-timing-standard);
}

.card-hover-effect:hover {
  transform: var(--transform-elevation-small);
  background: color-mix(
    in oklab,
    var(--clr-lossless-primary-glass),
    var(--clr-lossless-primary-dark) var(--color-mix-hover-light)
  );
}
```

### Link Hover Effect

```css
.link-hover-effect {
  transition-property: color;
  transition-duration: var(--transition-duration-standard);
  transition-timing-function: var(--transition-timing-smooth);
}

.link-hover-effect:hover {
  color: var(--clr-lossless-accent--brightest);
}
```

### Internal Link Hover Effect

```css
.internal-link-hover-effect {
  border-bottom: 1px dashed var(--clr-lossless-accent--brightest);
  transition-property: border-bottom-style;
  transition-duration: var(--transition-duration-standard);
  transition-timing-function: var(--transition-timing-smooth);
}

.internal-link-hover-effect:hover {
  border-bottom-style: solid;
}
```

## State Management

The system supports state-based animations using data attributes:

```css
[data-state] {
  transition-property: color, background-color, border-color, transform, opacity;
  transition-duration: var(--transition-duration-standard);
  transition-timing-function: var(--transition-timing-standard);
}

[data-state="active"] {
  opacity: 1;
}

[data-state="hover"] {
  opacity: 0.9;
  cursor: pointer;
}

[data-state="focus"] {
  outline: 2px solid var(--clr-lossless-accent--brightest);
  outline-offset: 2px;
}
```

## Starwind Integration

The system integrates with Starwind components through compatibility classes:

```css
/* Compatibility variables */
--default-transition-duration: var(--transition-duration-standard);
--default-transition-timing-function: var(--transition-timing-standard);

/* Compatibility classes */
.starwind-transition {
  transition-property: color, background-color, border-color, transform, opacity;
  transition-duration: var(--transition-duration-standard);
  transition-timing-function: var(--transition-timing-standard);
}

.starwind-transition-colors {
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke,
    --tw-gradient-from, --tw-gradient-via, --tw-gradient-to;
  transition-timing-function: var(--transition-timing-standard);
  transition-duration: var(--transition-duration-standard);
}
```

## Accessibility

The system respects user preferences for reduced motion:

```css
@media (prefers-reduced-motion: reduce) {
  /* All transition classes */
  .transition-all,
  .transition-colors,
  /* ... other classes ... */ {
    transition-duration: 0.1s !important;
    transition-property: color, background-color !important;
    transform: none !important;
  }
}
```

## Migration Guide

To migrate existing components to the new animation system:

1. **Replace hardcoded transitions** with utility classes:

   **Before:**
   ```css
   .tool-card {
     transition: all 0.2s ease-in-out;
   }
   ```

   **After:**
   ```css
   .tool-card {
     /* Apply utility classes */
     transition-property: transform, background-color;
     transition-duration: var(--transition-duration-standard);
     transition-timing-function: var(--transition-timing-standard);
   }
   ```

   **Or even better:**
   ```css
   .tool-card {
     /* Use component-specific mixin */
     @apply card-hover-effect;
   }
   ```

2. **Replace hardcoded hover effects** with utility classes:

   **Before:**
   ```css
   .tool-card:hover {
     background: color-mix(
       in oklab,
       var(--clr-lossless-primary-glass),
       var(--clr-lossless-primary-dark) 20%
     );
     transform: translateY(-2px);
   }
   ```

   **After:**
   ```html
   <div class="tool-card card-hover-effect">
     <!-- Content -->
   </div>
   ```

3. **For components with multiple transitions**, combine utility classes:

   ```html
   <div class="tool-card transition-transform transition-colors hover-elevate hover-lighten">
     <!-- Content -->
   </div>
   ```

## Examples

### Card Component

```html
<div class="tool-card card-hover-effect">
  <!-- Card content -->
</div>
```

### Link Component

```html
<a href="/path" class="link-hover-effect">Link text</a>
```

### Tag Component

```html
<a href="/tag" class="tool-tag transition-colors hover-lighten">Tag name</a>
```

### Starwind Component

```html
<button class="starwind-transition-colors" data-state="inactive">
  <!-- Button content -->
</button>
```

## Conclusion

By using this standardized animation system, we ensure consistent, performant, and accessible animations across our component library. The system is designed to be flexible enough to accommodate component-specific needs while maintaining a cohesive user experience.
