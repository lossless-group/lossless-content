---
date_created: 2025-07-29
date_modified: 2025-07-29
site_uuid: 96c29b79-db06-4564-a324-56605045c1aa
publish: true
title: Maintain Directives In Extended Markdown Render Pipeline
lede: "Directives bring MDX like component rendering using special extended markdown syntax. "
slug: maintain-directives-in-extended-markdown-render-pipeline
at_semantic_version: 0.0.0.1
authors:
  - Michael Staton
augmented_with: Claude Code on Claude Sonnet 4
---

# Maintain Directives as part of our Extended Markdown

## Overview

To enhance our Extended Markdown capabilities, we will integrate a custom `remark-directive` to render custom components using the directive syntax to parse relevant data.

The current custom component of concern is `Figma-Object--Display.astro`, which can render Figma objects specified in Markdown using a unique link (with authorization credentials stored in the .env variables.)

## Installation and Setup

1. - [x] **Install the Lossless Group's `remark-directive` Package:**
   Install the custom fork directly from the GitHub repository using pnpm. This approach is more practical for most use cases as it treats the fork as a dependency rather than requiring local development setup.
   
   ```bash
   pnpm add https://github.com/lossless-group/remark-directive.git
   ```
   
   This will install the package and maintain the connection to the remote repository for updates.

   a. - [ ] **Alternative: Fork and Clone for Development:**
      Only use this approach if you need to make changes to the `remark-directive` package itself:

      ```bash
      git clone https://github.com/lossless-group/remark-directive.git
      cd remark-directive
      npm install
      ```

## Directive Syntax
2. - [x] **Agree on directive syntax in markdown files**
   
   **Simple Example with no additional arguments**
   ```markdown
   ::figma-embed{src="https://www.figma.com/object-link"}
   ```

   **Example with additional arguments**

```markdown
   ::figma-embed{
   src="https://www.figma.com/design/abc123/My-Design"
   auth-user="mpstaton"
   width="800"
   height="600"
   }
```

## Agree on Conventions for Defining Directives and mapping to Components
2. - [x] **Agree on conventions for defining directives and mapping to components**

   While right now we are only focused on a Figma object renderer, we should agree on a convention for defining directives and mapping to components. This will make it easier to add new components in the future, which we will want to do almost immediately.

   ### Directive Naming Convention:
   - Use kebab-case for directive names
   - Include the service/tool name as prefix: `::figma-embed`, `::miro-board`, `::notion-page`
   - Use descriptive suffixes for different render types: `-embed`, `-display`, `-preview`

   ### Component File Convention:
   - Components should follow the pattern: `{Service}-{Type}--{Action}.astro`
   - Examples: `Figma-Object--Display.astro`, `Miro-Board--Embed.astro`, `Notion-Page--Preview.astro`
   - Use PascalCase for component files to match Astro conventions

   ### Directive-to-Component Mapping:
   Following the existing pattern for markdown utilities, create the configuration at `src/utils/markdown/remark-directives.ts`:

   ```typescript
   // src/utils/markdown/remark-directives.ts
   export const directiveComponentMap: Record<string, string> = {
     'figma-embed': 'Figma-Object--Display.astro',
     'miro-board': 'Miro-Board--Embed.astro',
     'notion-page': 'Notion-Page--Preview.astro'
   };
   ```

   This can then be imported in your remark plugin or Astro config:
   ```typescript
   // In your remark plugin or astro.config.mjs
   import { directiveComponentMap } from './src/utils/markdown/remark-directives.js';
   ```

   ### Required Props Convention:
   - `src` or `url`: The primary resource URL (required)
   - `auth-user`: User identifier for authorization (optional, falls back to default)
   - `width`/`height`: Dimensions (optional, component provides defaults)
   - Component-specific props as needed

   ### Authentication Pattern:
   - Environment variables: `{SERVICE}_{USER}_TOKEN` (e.g., `FIGMA_MPSTATON_TOKEN`)
   - Default user fallback: `{SERVICE}_DEFAULT_TOKEN`
   - Components should handle missing auth gracefully

   ### Error Handling Convention:
   - Components should render fallback content when authentication fails
   - Display helpful error messages in development mode
   - Log authentication issues for debugging


## Configuration

3. - [x] **Configure astro.config.mjs:**
   Add the remark-directive plugin to your Astro configuration. Import the plugin at the top of `astro.config.mjs`:

   ```javascript
   // Add this import near the top with other imports
   import remarkDirective from 'remark-directive';
   import { directiveComponentMap } from './src/utils/markdown/remark-directives.js';
   ```

   Then add it to the remarkPlugins array:

   ```javascript
   remarkPlugins: [
     /** @type {any} */ (normalizeShellLangs),
     /** @type {any} */ (remarkTableOfContents),
     /** @type {any} */ (remarkDirective), // Add this line
   ],
   ```

   Note: You may need to create a custom remark plugin that uses the `directiveComponentMap` to transform directives into Astro components, or handle this transformation in your `AstroMarkdown.astro` component as mentioned in the existing comment.

## Custom Component
4. - [x] **Create Custom Component:**
   Develop a new Astro component named `Figma-Object--Display.astro` that will be responsible for rendering the Figma objects.

   - Ensure the component can handle the unique link format associated with Figma objects.
   - Design the component to integrate seamlessly with existing Markdown rendering workflows.

3. - [ ] **Extend `remark-directive`:**
   Modify the `remark-directive` package to recognize the custom Figma link and associate it with `Figma-Object--Display.astro`.

   - Update the directive parsing logic to detect the unique Figma link.
   - Ensure the directive properly translates the link into a renderable component instance.

4. - [ ] **Testing:**
   The user will test by trying to render Figma components. Focus on parsing the Figma link and rendering the corresponding component.

5. - [ ] **Document the Changes:**
   Update any relevant documentation, including API references, to reflect the changes made. Ensure that users understand how to utilize the new directive in their Markdown files.

   a. - [ ] Create a Code Changelog 

## Usage

To use the new directive, you can include a Figma link in your Markdown as follows:

```markdown
::figma-object{src="https://www.figma.com/object-link"}
```

This will automatically render the Figma object using the `Figma-Object--Display.astro` component during the Markdown to HTML conversion process.

## Maintenance

- **Regular Updates:**
  Keep the `remark-directive` package and its dependencies updated to ensure compatibility with future Markdown rendering enhancements.

- **Feedback and Iterations:**
  Continuously gather feedback from users regarding the directive's functionality and make necessary improvements or extensions.

This document will serve as a guideline for integrating and maintaining the Figma object rendering functionality as part of our Extended Markdown capabilities.

## Future Work

- [ ] Add support for directives in the Obsidian native markdown editor, which requires a different way of handling styles for the custom components and will not be in Astro.

