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
publish: true
site_uuid: 8cd0018e-1cda-4956-b7ca-600d5fa213a2
tags: Code-Style,Component-based Architecture,Readability,Component-Management
authors:
  - Michael Staton
portrait_image: https://ik.imagekit.io/xvpgfijuw/uploads/lossless/prompts/code-style/2025-05-04_portraitimage_Move-Functionality-and-Style-to-Specific-Components_271b3981-405e-4b10-ab8b-b3e53026eab7_qiSafVJhh.webp
banner_image: https://ik.imagekit.io/xvpgfijuw/uploads/lossless/prompts/code-style/2025-05-04_bannerimage_Move-Functionality-and-Style-to-Specific-Components_df3c10ac-60ba-453c-aff5-44cfd0fcdd49_BP5zr0GQU.webp
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
