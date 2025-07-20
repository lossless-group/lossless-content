---
title: Maintain Themes and Modes Across CSS and Tailwind
lede: "Maintain Themes and Modes Across CSS and Tailwind"
date_authored_initial_draft: 2025-05-14
date_authored_current_draft: 2025-05-14
date_authored_final_draft: null
date_first_published: null
date_last_updated: null
at_semantic_version: 0.0.0.1
publish: false
status: To-Implement
augmented_with: Windsurf Cascade on Claude 3.7 Sonnet
category: Frontend-Development
date_created: 2025-05-14
date_modified: 2025-07-20
tags: [CSS, Tailwind, Themes, Modes, Design-Systems, Frontend-Development]
authors:
  - Michael Staton
image_prompt: "A computer monitor showing a website with consistent color themes."
banner_image: https://ik.imagekit.io/xvpgfijuw/uploads/lossless/specs/2025-05-17_banner_image_Maintain-Themes-Mode-Across-CSS-Tailwind_1464152f-bdeb-4523-9bbf-1db31bf14725_xi5kwK2c3.webp
portrait_image: https://ik.imagekit.io/xvpgfijuw/uploads/lossless/specs/2025-05-17_portrait_image_Maintain-Themes-Mode-Across-CSS-Tailwind_66ca10fa-d7b0-4f41-b841-2d8574142af8_NGDBacfLz.webp
---

# Executive Summary
With CSS becoming more feature rich, and Tailwind becoming more market standard, it's important to master both. This requires managing both concurrently and thoughtfully. 

Given our client-services approach, we need to be able to implement a client-specific theme across both light and dark mode. 

Implementing this thoughtfully is more a matter of creating and upholding clear conventions for variable naming and organization. In particular, maintaining system level variables, which are then assigned to values from client-specific variables. 

For instance:

```css
/* Base theme variables (system level) */
:root {
  /* Core colors */
  --sys-color-primary: #4a6cf7;
  --sys-color-secondary: #f97316;
  --sys-color-accent: #00ccff;
  
  /* Semantic colors */
  --sys-color-text-primary: #121212;
  --sys-color-text-secondary: #555555;
  --sys-color-background-primary: #ffffff;
  --sys-color-background-secondary: #f8f9fa;
  
  /* Component-specific variables that reference system colors */
  --comp-button-bg: var(--sys-color-primary);
  --comp-button-text: white;
  --comp-card-bg: var(--sys-color-background-secondary);
}

/* Dark mode overrides at system level */
@media (prefers-color-scheme: dark) {
  :root {
    --sys-color-text-primary: #f1f1f1;
    --sys-color-text-secondary: #cccccc;
    --sys-color-background-primary: #121212;
    --sys-color-background-secondary: #1e1e1e;
  }
}

/* Client-specific themes */
.theme-client1 {
  --sys-color-primary: #e63946;
  --sys-color-secondary: #457b9d;
  --sys-color-accent: #a8dadc;
}

/* Client-specific dark mode overrides */
@media (prefers-color-scheme: dark) {
  .theme-client1 {
    --sys-color-primary: #f48c99;
    --sys-color-secondary: #6fa8c9;
  }
}
```

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: 'var(--sys-color-primary)',
        secondary: 'var(--sys-color-secondary)',
        accent: 'var(--sys-color-accent)',
        'text-primary': 'var(--sys-color-text-primary)',
        'text-secondary': 'var(--sys-color-text-secondary)',
        'bg-primary': 'var(--sys-color-background-primary)',
        'bg-secondary': 'var(--sys-color-background-secondary)',
      },
    },
  },
  plugins: [],
}
```

```css
/* Base theme */
:root {
  --sys-color-primary: #4a6cf7;
}

/* Theme switching with data attributes */
[data-theme="client1"] {
  --sys-color-primary: #e63946;
}

[data-theme="client2"] {
  --sys-color-primary: #2a9d8f;
}

/* Dark mode variations per theme */
@media (prefers-color-scheme: dark) {
  :root {
    --sys-color-primary: #6c8cff;
  }
  
  [data-theme="client1"] {
    --sys-color-primary: #f48c99;
  }
  
  [data-theme="client2"] {
    --sys-color-primary: #4ecdc4;
  }
}
```

```css
@layer base, themes, components;

@layer base {
  :root {
    --sys-color-primary: #4a6cf7;
    /* other base variables */
  }
}

@layer themes {
  .theme-client1 {
    --sys-color-primary: #e63946;
    /* other theme overrides */
  }
  
  .theme-client2 {
    --sys-color-primary: #2a9d8f;
    /* other theme overrides */
  }
}

@layer components {
  .button {
    background-color: var(--sys-color-primary);
    /* other styles */
  }
}
```

```javascript
// Check for saved user preference
const savedTheme = localStorage.getItem('theme');
const savedMode = localStorage.getItem('mode');

// Apply saved theme if it exists
if (savedTheme) {
  document.documentElement.setAttribute('data-theme', savedTheme);
}

// Apply saved mode if it exists
if (savedMode) {
  document.documentElement.setAttribute('data-mode', savedMode);
}

// Function to toggle between light and dark mode
function toggleMode(mode) {
  document.documentElement.setAttribute('data-mode', mode);
  localStorage.setItem('mode', mode);
}
```

