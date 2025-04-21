---
title: Astro nuances that throw AI Code Assistants
lede: Astro, while gaining in popularity, has some nuances that throw AI Code Assistants. AI Code Assistants think everything is React.
date_authored_initial_draft: 2025-03-24
date_authored_final_draft: null
date_first_published: null
date_last_updated: null
at_semantic_version: 0.0.0.1
status: To-Do
authors:
  - Michael Staton
augmented_with: Windsurf on Claude 3.7 Sonnet
category: Framework-Specifics
tags:
  - Workflow-Management
  - Web-Frameworks
  - Astro
  - Code-Generators
date_created: 2025-03-24
date_modified: 2025-04-21
---

# Astro does not Use JSX or React by default

Do not use JSX, React syntax when writing components.  They don't work.  

DO NOT USE JSX STYLE COMMENTING IN THE COMPONENTS OUTSIDE OF THE FRONTMATTER. IT CAUSES ERRORS THAT ARE HARD TO DEBUG, ONLY BECAUSE WHY WOULD THERE BE JSX STYLE COMMENTS IN AN HTML COMPONENT?
