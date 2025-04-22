---
title: Move functionality and style of Concepts and Vocabulary into specific components
lede: We should use astro components as best we can, and try to keep styles managably within their own components
date_authored_initial_draft: 2025-04-12
date_authored_current_draft: 2025-04-12
date_authored_final_draft: null
date_first_published: null
date_last_updated: null
at_semantic_version: 0.0.0.1
status: To-Prompt
augmented_with: Windsurf Cascade on Claude 3.5 Sonnet
category: Prompted
date_created: 2025-04-16
date_modified: 2025-04-19
image_prompt: "Abstract representation of modular UI components, each with distinct styles and icons, being assembled like building blocks in a developer's workspace."
portrait_image: "https://img.recraft.ai/pS5J-7kmyrAjAR3El1QGwkcmZgnQ7MC0WOBNV4hJUcU/rs:fit:1024:1820:0/raw:1/plain/abs://external/images/f8b4675d-9f3b-4033-9c2e-be797aad7121"
publish: true
site_uuid: 8cd0018e-1cda-4956-b7ca-600d5fa213a2
tags: [Code-Style, Component-based Architecture, Readability, Component-Management]
authors:
  - Michael Staton
---

# Context

I have moved the @components/vocabulary/VocabularyEntry.astro component to @components/reference/VocabularyEntry.astro.

(Let's make sure that doesn't blow up anything.)

### Objective:

Move the functionality and style of both Concepts and Vocabulary currently in  
`@site/src/pages/more-about/index.astro`

into two components:

1. @components/reference/ConceptPreviewCard.astro
2. @components/reference/VocabularyPreviewCard.astro

into the @components/reference directory.
