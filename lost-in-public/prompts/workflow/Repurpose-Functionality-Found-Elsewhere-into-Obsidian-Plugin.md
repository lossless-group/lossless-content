---
title: Repurpose Functionality Found Elsewhere into an Obsidian Plugin
lede: When you've built functionality several times it can feel like a slog to rewrite.  Let AI Code Generators do it Step by Step.
date_authored_initial_draft: 2025-07-20
date_authored_current_draft: 2025-07-20
date_authored_final_draft: 
date_first_published: 
date_last_updated: 2025-07-20
date_first_run: 2025-07-20
at_semantic_version: 0.0.0.1
status: To-Prompt
augmented_with: Windsurf Cascade on SWE-1
category: Prompts
date_modified: 2025-07-20
date_created: 2025-04-21
image_prompt: An AI assistant and user collaboratively editing a prompt, surrounded by evolving prompt bubbles, code suggestions, and feedback loops. Visuals include arrows showing iteration and a sense of creative, continuous improvement.
portrait_image: https://ik.imagekit.io/xvpgfijuw/uploads/lossless/prompts/workflow/2025-05-05_portrait_image_Reintroduce-something-that-Worked_9b6e5c06-4079-4459-bd20-a994afc3c0fc_BCHJiKG-P.webp
banner_image: https://ik.imagekit.io/xvpgfijuw/uploads/lossless/prompts/workflow/2025-05-05_banner_image_Reintroduce-something-that-Worked_34504b8a-22d0-4c58-beac-8f6f9d46f35a_bYGzgrAME.webp
site_uuid: cfac0a85-2718-45cb-9e8b-99b7e6327e11
tags: [Prompt-Engineering, Code-Generators, AI-Human-Workflow, Model-Context-Protocols, Refactoring]
authors:
  - Michael Staton
---
# Objective
We are implementing the specification [[specs/Maintain-an-Image-Generator-Obsidian-Plugin|Maintain-an-Image-Generator-Obsidian-Plugin]] phase by phase and step by step. 

# Immediate Task at Hand

### Tasks:  
3. **Phase 3: Iterate on Modal**
	- [ ] Assure proper YAML extraction and `image_prompt:` value extraction using the `yamlFrontmatter.ts` utility.
	- [ ] Load settings from data.json that display in the modal.
		- [ ] Request Portrait?
		- [ ] Request Banner?
		- [ ] Request Square?
		- [ ] Confirm style?
		- [ ] Use Custom Styles?
	- [ ] Create a button to submit the `image_prompt` value to the Recraft API as part of the curl based request JSON object.
		- [ ] Add progress indicators using the OpenGraphFetcher example
		- [ ] Successfully send the `image_prompt` value to the Recraft API and receive a response, updating the progress bar.
	- [ ] Audit the implementation of proper Obsidian classes through Obsidian Class Variables
	- [ ] Implement error handling and recovery. Errors need to be sent through Obsidian notifications. 
	- [ ] Update the Code Changelog file. 

### Expected Deliverables for Task at Hand

1. `src/modals/CurrentFileModal.ts` file implementing:
   - [ ] `CurrentFileModal` class extending `Modal`
	- [ ] uses `yamlFrontmatter.ts` from utils to extract `image_prompt` from frontmatter.
	- [ ] displays a form with a text input for the `image_prompt` value, allowing the user to edit the `image_prompt` value.
	- [ ] if no `image_prompt` is found, a form is displayed to the user to enter an `image_prompt`
	- [ ] a setting checkbox is displayed to the user, defaults to selected, that the `imgage_prompt` value will be written to the frontmatter
   - [ ] `onOpen` method to display modal content
   - [ ] `onClose` method to clean up modal content

2. `main.ts` updates:
   - [ ] Load and save settings in `onload()`
   - [ ] Register command "Generate Images for Current File"

3. Documentation:
   - [ ] Update README.md with setup instructions
   - [ ] Add settings description in CHANGELOG.md

### Technical Implementation Notes:
- Use the `fileService.ts` for all file operations
- Follow the architecture defined in the specification
- Refer to how the other projects manage error handling.

# Constraints
Do not blindly copy old code.  Instead, review the older codebase to _identify, discuss and document_ the parts that are specific to this ask.  

Do not bring in functionality with dependencies, references to imports that do not exist, or other parts of the code that will cause problems.  

Instead, analyze both 
1) the old code that was required to make it work, and 
2) the new code AS A WHOLE (including related and connected files) to identify how similar functionality in the old code could be implemented in the new code. 

Share your analysis first, we need to agree on an implementation plan. 

### Refer to the Docs Often, Do not Make Assumptions
Always refer back to appropriate documentation, we waste so much time when [[Vocabulary/Large Language Models|LLM]] [[concepts/Explainers for AI/Code Generators|Code Generators]] simply follow their own intuition and probabilistic chain of thought.  This is an [Obsidian](https://obsidian.md/) Plugin, and they have decent docs at [Obsidian Developer Documentation](https://docs.obsidian.md/Home) as well as an exhaustive list of every API call that can be made through their [TypeScript API](https://docs.obsidian.md/Reference/TypeScript+API/AbstractInputSuggest/(constructor)).

### Refer to our Working Projects Often, Do not Invent Patterns

Refer to our working projects that are in production for:
- Architecture, Code Organization Patterns
- [[Naming Conventions]]
- Styles
#### Open Graph Fetcher
- [Open Graph Fetcher on GitHub](https://github.com/lossless-group/open-graph-fetcher)
- on my local: `/Users/mpstaton/code/lossless-monorepo/open-graph-fetcher`

#### Cite Wide
- [Cite Wide on GitHub](https://github.com/lossless-group/cite-wide/tree/master)
- on my local: `/Users/mpstaton/code/lossless-monorepo/cite-wide`

## Nuances of Obsidian Plugins

1. Obsidian comes with its own Style kit, we don't have to make a lot of normal CSS decisions. Refer to the [CSS Variables on the Obsidian Developer Docs](https://docs.obsidian.md/Reference/CSS+variables/Components/**Button**)
2. Our goal is to release it as a production Obsidian Community Plugin on the [Obsidian Community Plugin Marketplace](https://obsidian.md/plugins).
3. The Obsidian Plugin Marketplace is curated, so the submission has to pass through automated tests and then be reviewed by the plugin marketplace maintainers. The automated dependabot does not like generalized TypeScript hacks.  So, be rigorous about declaring and maintaining types. 
4. Our goal is to _keep this project Open Source_, and to _attract other Open Source Contributors_. So, thoroughly commenting in code to explain what is happening in the code is extremely valuable.  

## Create a Memory from these Constraints
Please create a memory and/or other ways of holding these constraints in your memory. 

# Further Context

## Inputs: Old Code
`ai-labs/apis/recraft/generate-banner-and-portrait-images-recraft.py`
`ai-labs/apis/imagekit/convertImageToImagkitUrl.cjs`

## Desired Functionality for v1:

1) Single File Image Generation
	1) A Command for "Generate Images for Current File" opens a CurrentFileModal
	2) Current file modal can:
		1) Send an `image_prompt` value to the [[Tooling/AI-Toolkit/Generative AI/Recraft|Recraft]] API to generate either or both:
			1) `banner_image` (user can change the default dimensions)
			2) `portrait_image` (user can change the default dimensions)


# Further Development

## Desired Functionality for Future Versions
1) Single File Image Generation
	1) A Command for "Generate Images for Current File" opens a CurrentFileModal
	2) Current file modal can:
		1) Send an `image_prompt` value to the [[Tooling/AI-Toolkit/Generative AI/Recraft|Recraft]] API to generate either or both:
			1) `banner_image` (user can change the default dimensions)
			2) `portrait_image` (user can change the default dimensions)
		2) Download selected urls pointing to images on remote servers to a target directory.
			1) Store the downloaded image or images locally where downloaded. 
			2) Move the downloaded image or images to another directory according to a path set in the modal.
			3) Use the download only as a temporary file to send to an image delivery service
		3) Upload the image that was generated and downloaded to an image delivery service via API, write the image 
			1) If writing into YAML, uses the user settings or the modal input and the write gets the yaml correct syntax and DOES NOT RUIN ANY OTHER YAML PROPERTIES.
			2) If writing into the content, uses Obsidian embed syntax, `![Descriptive Text or Image Name](<image_delivery_unique_url>)`
		4) Scan the file for image embeds stored locally, send them to an image delivery service, and replace the local image embed with a remote image embed, using the appropriate sytnax changes: 
			1) from `![[Visuals/Screenshots/Screenshot 2025-01-20 at 1.46.38 PM_Airtable-Copilot.png]]` 
			2) to `![Screenshot 2025-01-20 at 1.46.38 PM of Airtable Copilot](<remote_image_delivery_unique_url>)`
