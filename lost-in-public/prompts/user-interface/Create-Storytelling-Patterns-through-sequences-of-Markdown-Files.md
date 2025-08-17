---
title: Create Storytelling Patterns through sequences of Markdown Files
lede: Using an ordered list of markdown files, create a UI that tells a story of moving from one file to the next through the series.
date_authored_initial_draft: 2025-08-15
date_authored_current_draft: 2025-08-17
date_authored_final_draft: null
date_first_published: null
date_last_updated: null
at_semantic_version: 0.0.0.2
status: To-Do
augmented_with: Windsurf Cascade on Claude 3.5 Sonnet
category: Prompts
date_created: 2025-08-15
date_modified: 2025-08-17
image_prompt: "The scene is a modern rendition of the Wizard of Oz.  Dorathy is skipping down a yellow brick road with a large Monitor, a Smartphone, and a Tablet. All of them are humanoid, with arms and legs.  They are skipping down the yellowbrick road just like the Lion, Tin Man, and Scarecrow."
tags: 
  - User-Interface
  - Components
  - Rendering-Pipeline
authors:
  - Michael Staton
---

# Role:
Curious software developer that wants to be sure they understand the context, blueprint, and prompt.

# Goal:
Our consulting firm needs to convey information to our clients within a sequence of markdown files, and a hierarchy of markdown files. 

We would like to generate several valid UI patterns that can be used to render data from the frontmatter of the markdown files, as well as the first header and paragraph of text. 

These UI patterns should visually show a flow in a way that tells a story "Step by Step" user journey, moving from one file to the next through the series.

# Strawman Data:

Though we want the actual content to come from an MDX file, to start we can use this:

Div with an optional logo, full heading and subheading.
Div with a row of two cards, each card displaying a use case with an optional icon or image. 

```markdown
# Augment-It

### Augment any data by importing records or connecting to data sources. 
1. Use Case: Generate insights about our customers that can be used by our Product Development teams. 
2. Use Case: Generate insights to more fully inform our outside sales teams about customers just-in-time before sales meetings and site visits.
```

`article` tag with a way to represent a sequence or flow between the following steps. 
We can change the backlinks to point the the path of the markdown file.  Use the title of the file, which can be found after the `|` in the backlink syntax. 

```markdown
### (Flow / Journey)
1. Connect a data source or upload a CSV. 
	1. [[projects/Augment-It/Specs/shared-ui-elements/Shared_API-Connector-Src/Shared_Supported-Data-Stores-Widget|Shared Supported Data Stores Widget]]
2. Review records and compute synthetic properties.
	1. [[projects/Augment-It/Specs/apps-microfrontends/RecordCollector|RecordCollector]]
3. Create prompt templates with variables for real data. 
	1. [[projects/Augment-It/Specs/apps-microfrontends/PromptTemplateManager|PromptTemplateManager]]
4. Populate prompt templates with real data, see a meaningful prompt and request.
	1. [[projects/Augment-It/Specs/apps-microfrontends/RequestReviewer|RequestReviewer]]
5. Choose your favorite AI services, or use our recommendations
	1. [[projects/Augment-It/Specs/shared-ui-elements/Shared_API-Connector-Src/Shared_Supported-Models_Widget|Shared Supported Models Widget]]
		1. Perplexity AI Deep Research
		2. Firecrawl
6. Highlight good information and capture variables.
	1. [[projects/Augment-It/Specs/apps-microfrontends/HighlightCollector|HighlightCollector]]
7. Generate insight reports for business use cases, teams, or management.
	1. [[projects/Augment-It/Specs/apps-microfrontends/InsightAssembler|InsightAssembler]]
8. Put robust, up-to-date data back into the data source!
```


# Map of Files:
- `content/projects` contains our Client projects. 
- `/content/projects/ACE-It` is the project in focus for this prompt, though we hope to then use it on `content/projects/Augment-It`.

## ACE-It
ACE stanges for Accelerated Context Engineering. It is a narrative documentation of our established playbook and content assets we use to "Vibe Code" with AI Code Assistants such as yourself. 

# Constraints:
NEVER USE REACT OR TSX/JSX. DO NOT EVEN TRY TO DO SOMETHING CLOSE TO IT.  USE ASTRO PATTERNS.

This is an Astro project. We prefer and almost enforce straight HTML and CSS, with some vanilla JavaScript. 

Because Code Assistants are very proficient with Tailwind, generating first iterations with Tailwind is acceptable. However, be sure to cross-reference the accompying blueprint, the file mentioned, and gain a good understanding of the CSS variables used in the project, including the Tailwind variables.

We have both a custom animations framework as well as Tailwind Animate.  You may use Tailwind animate on initial iterations, but we will migrate them to our custom animations framework.

# Task at Hand

# Acceptance Criteria
 - [ ] AI Code Assistant did not generate any React or TSX/JSX code, stuck to Astro patterns.
 - [ ] There is no need to install any additional libraries.
 - [ ] Running pnpm build and pnpm dev does not throw any errors.
 - [ ] The components can all render in the browser with the data passed to them.
 - [ ] The components all are consistent with the overall design, style, theme, and mode of our site because they used our CSS and/or Tailwind variables.
 - [ ] At least one of the components looks like it solves for the objective, and has a "wow" factor. The story or journey is followable. 
 - [ ] If animations were not applied in the first iterations, we can apply animations to the components.