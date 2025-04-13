---
title: Move functionality and style of Concepts and Vocabulary into specific components
lede: "We should use astro components as best we can, and try to keep styles managably within their own components"
date_authored_initial_draft: 2025-04-12
date_authored_current_draft: 2025-04-12
date_authored_final_draft: null
date_first_published: null
date_last_updated: null
at_semantic_version: 0.0.0.1
status: To-Prompt
augmented_with: Windsurf Cascade on Claude 3.5 Sonnet
category: Prompts
date_created: 2025-04-12
date_modified: 2025-04-12
tags:
  - Code-Style
  - Component-based Architecture
  - Readability
  - Component-Management
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

