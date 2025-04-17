---
title: Maintaining Markdown Conventions
lede: Standardized syntax patterns for enhanced Markdown functionality beyond traditional frontmatter
date_authored_initial_draft: 2025-03-19
date_authored_current_draft: 2025-03-19
date_authored_final_draft: null
date_first_published: null
date_last_updated: null
at_semantic_version: 0.0.0.1
publish: false
status: Iterating
augmented_with: Windsurf Cascade on Claude 3.5 Sonnet
category: Specification
date_created: 2025-04-16
date_modified: 2025-04-16
site_uuid: bbbc80ed-bb0d-41ab-87db-71093acb5727
tags:
  - Markdown
  - Conventions
  - Dataview
  - Syntax
  - Content-Management
authors:
  - Michael Staton
---

## Dataview Syntax
`session-close::'2025-03-19T04:51:05.362Z'`
`kebab-case` immediately followed by two colons followed by a value is Dataview Syntax. 

Rendered components should automagically hide Dataview Syntax. Dataview Syntax originates from the popular Dataview plugin for Obsidian. 

This syntax declares a key::value pair that can be used in code. 

For instance:
`session-close::'2025-03-19T04:51:05.362Z'`
is intended to give the ability for the Markdown rendering to display the time the author finished writing that particular draft. 

While YAML is useful, it cannot demarcate multiple start and end points within one Markdown file dynamically. 

There may be more use cases to come.

## Litegal Syntax

## JSON Canvas Syntax