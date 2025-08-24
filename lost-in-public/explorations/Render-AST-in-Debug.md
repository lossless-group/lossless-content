---
title: Render AST in Debug
lede: Exploration of AST structure at each stage of markdown processing to understand how to handle callouts
date_authored_initial_draft: 2025-04-02
date_authored_current_draft: 2025-04-02
date_authored_final_draft: 2025-04-20
date_first_published:
date_last_updated:
at_semantic_version: 0.0.0.1
authors:
  - Michael Staton
status: In-Progress
augmented_with: Windsurf Cascade on Claude 3.5 Sonnet
category: Explorations
tags: [Remark, Astro, AST, Debug]
date_created: 2025-04-02
date_modified: 2025-08-24
site_uuid: 585d8526-ab18-4f94-a626-e2a2f7c2d7e2
publish: true
---

# Objective

Before implementing callout rendering, we need to understand exactly how the AST looks at each stage of processing. This exploration will:

1. Add debug logging to show the AST structure:
   - After initial markdown parsing
   - After each remark plugin
   - After rehype conversion
   - Before final HTML rendering

2. Focus on understanding:
   - How blockquotes are represented in the AST
   - Where callout syntax appears in the node structure
   - What node types we need to work with
   - Best points to intercept for transformation

3. Create a clean baseline without any transformation logic:
   - Remove existing callout handling code
   - Add comprehensive debug output
   - Document the AST structure at each stage

# Implementation Plan

1. Remove existing callout transformation code
2. Add debug logging to [vocabulary].astro
3. Add debug logging to each remark plugin
4. Create test markdown files with various callout patterns
5. Document the AST structure we observe

# Success Criteria

- Clear visibility of AST at each processing stage
- Understanding of where callout syntax appears
- Documentation of node types and structure
- Clean baseline for implementing new transformation approach