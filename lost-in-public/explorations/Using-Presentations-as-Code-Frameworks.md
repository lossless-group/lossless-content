---
title: "Using Presentations-as-Code Frameworks"
lede: "Presentations-as-Code frameworks can be used to create dynamic presentations."
date_authored_initial_draft: 2025-05-15
date_authored_current_draft: 2025-05-15
date_authored_final_draft: null
date_first_published: null
date_last_updated: null
at_semantic_version: 0.0.0.1
publish: true
status: To-Implement
augmented_with: "Windsurf Cascade on Claude 3.7 Sonnet"
category: Frontend-Development
date_created: 2025-05-15
date_modified: 2025-07-22
tags: [Astro, Islands-Architeture, Frontend-Development, Svelte]
authors:
  - Michael Staton
image_prompt: "An young alien astronaut is in front of a human business boardroom. The astronaut is giving a presentation."
site_uuid: 84df9380-2722-4ea7-b01b-f7f08b223553
slug: using-presentations-as-code-frameworks
---

## RevealJS

```html
<html>
  <head>
    <link rel="stylesheet" href="dist/reveal.css" />
    <link rel="stylesheet" href="dist/theme/white.css" />
  </head>
  <body>
    <div class="reveal">
      <div class="slides">
        <section>Slide 1</section>
        <section>Slide 2</section>
      </div>
    </div>
    <script src="dist/reveal.js"></script>
    <script>
      Reveal.initialize();
    </script>
  </body>
</html>
```

- [ ] Print PDF