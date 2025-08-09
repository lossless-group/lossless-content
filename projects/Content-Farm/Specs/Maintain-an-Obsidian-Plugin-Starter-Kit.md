---
title: Implement an OpenGraph fetcher as an Obsidian Plugin
lede: Open Graph APIs can come in a number of flavors, here we use OpenGraph.io to return the objects.
date_authored_initial_draft: 2025-07-15
date_authored_current_draft: 2025-07-15
date_authored_final_draft: 
date_first_published: 
date_last_updated: 2025-07-15
at_semantic_version: 0.0.0.3
status: Iterating
augmented_with: Windsurf Cascade on SWE-1
category: Content-Management
publish: true
date_created: 2025-03-12
date_modified: 2025-07-20
site_uuid: c4f72e37-bb5b-4f21-b8a7-93c3fc99a89f
tags: [Frontmatter, OpenGraph]
authors:
  - Michael Staton
image_prompt: A robot representing API calls is fishing off a boat. There are several fishing poles that have been cast onto a large representation of a web browser.  The web browser has a web page loaded with headers and images. The fishing lines are hooked into images and text and are pulling copies of them off the web browser page and towards the boat.
banner_image: https://ik.imagekit.io/xvpgfijuw/uploads/lossless/specs/2025-05-05_banner_image_Build-Script-Spec_39259b0d-6bed-4157-baf7-53c35deebb35_rr5hYOulP.webp
portrait_image: https://ik.imagekit.io/xvpgfijuw/uploads/lossless/specs/2025-05-05_portrait_image_Build-Script-Spec_21af46f2-dd20-45e5-86da-c0815542f01e_e1OL2d6mN.webp
---

![](https://i.imgur.com/sO13jFC.png)

# Objective


## Services

1. `currentFileService.ts` - File Operations
	- `listHeaders()` - Extracts all markdown headers from content
	- `addText()` - Adds text at a specified position
	- `deleteText()` - Removes text within a range
	- `extractYamlFrontmatter()` - Extracts YAML frontmatter from content 
	- reorderYamlFrontmatter() - Reorders YAML frontmatter in Alphabetical order.
	- `changeYamlValue()` - Updates key-value pairs in YAML frontmatter.
	- `changeYamlKey()` - Updates the key in a key-value pair in YAML frontmatter.

2. `textProcessingService.ts` - Text Processing Operations
	- `findMatches()` - Finds pattern matches with positions
	- `replaceAll()` - Replaces all instances of a pattern
	- `transformText()` - Transforms text using custom functions
	- `extractAll()` - Extracts all pattern matches
	- `countOccurrences()` - Counts pattern occurrences
	- `removeDuplicateLines()` - Removes duplicate lines
	- `normalizeWhitespace()` - Cleans up whitespace formattingExample text
	- `normalizeHeaderSpacing()` - 

3. selectionService.ts - Selection Processing Operations
•  toUpperCase(), toLowerCase(), toTitleCase() - Text case transformations
•  wrapLines() - Wraps lines with prefix/suffix (e.g., for quotes)
•  removeEmptyLines() - Removes blank lines
•  sortLines() - Sorts lines alphabetically
•  addLineNumbers() - Adds line numbering
•  trimLines() - Trims whitespace from lines
•  processSelection() - Generic selection processor

Key Features:
•  Consistent interfaces with ProcessingResult and SelectionResult types
•  Detailed statistics tracking changes made
•  Error handling and validation
•  Modular design allowing easy extension
•  TypeScript typing for better development experience
•  Singleton exports for easy importing

Summary of the Created Modals

#### CurrentFileModal.ts
This modal allows you to interact with the current file in focus. It includes sections for:
•  **File Operations:*** such as listing headers, adding or deleting text, extracting YAML, and updating YAML values.
•  **Text Processing:** including finding matches, replacing text, and normalizing whitespace.
•  **Selection Operations:** for case transformations, wrapping lines, removing empty lines, sorting lines, and adding line numbers.

#### BatchDirectoryModal.ts
This modal is for batch processing of files within a directory. It includes:
•  **Directory Selection:** to choose and list files within a target directory.
•  **Batch File Operations:** for extracting headers and updating YAML across all files.
•  **Batch Text Processing:** for replacing text patterns, removing duplicates, and normalizing whitespace.
•  **Batch Analysis:** allows counting pattern matches and generating directory statistics.

With these modals, you have full interaction capabilities for both individual files and whole directories, allowing you to perform comprehensive text operations directly within Obsidian.