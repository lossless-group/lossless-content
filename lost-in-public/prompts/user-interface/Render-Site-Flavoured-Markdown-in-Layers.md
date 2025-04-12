---
title: Render Site Flavored Markdown
lede: Render site flavored Markdown in layers with Marked Extensions
date_authored_initial_draft: 2025-03-27
date_authored_current_draft: 2025-03-29
date_authored_final_draft: null
date_first_published: null
date_last_updated: null
at_semantic_version: 0.0.0.1
status: To-Do
augmented_with: Windsurf Cascade on Claude 3.5 Sonnet
category: Prompts
date_created: 2025-03-22
date_modified: 2025-04-12
tags:
  - User-Interface
  - Component-Architecture
  - Content-Collections
  - UI-Design
  - Astro
  - Rendering-Pipeline
authors:
  - Michael Staton
---

# Goals

Let's just start with one: 
Render backlinks with marked-base-url

Example of a backlink:
```markdown   
[[lost-in-public/prompts/user-interface/Create-a-Changelog-UI.md]]
```

`log/2025-03-26_01`

We need to use the "hooks", and probably do it "post-process" because we have had trouble with HTML rendering when we tried to transform the backlinks before sending it to Astro's built-in `<Content />` component.

`postprocess(html: string): string`

## Implementation Steps
1. Configure 'remark'
2. Create backlink regex pattern
3. Create image embed regex pattern
4. Have an html configure area for the User. 

## Configuration
Location: site/src/utils/markdown/remark-config.ts
Usage: Import in ChangelogEntryPage.astro

Content is in the `content` directory at root. It is a git submodule.

Each collection will end up having its own custom route that will be set in the `remark-config.ts` file that you will make.

Because we use Obsidian to manage the Markdown, and our content team likes to capitalize directory titles and use the space character, we need to transform the backlink with the following:
- ONLY THE DIRECTORY part of the path from any case it is in to using `kebab-case` -- the content folders in the `content` directory are all in `kebab-case`, yet the backlinks are not. 
- The file name case should be the same as the file name in the backlink, however we should replace spaces with dashes given url slug conventions. 

## Backlink Examples
#### Input:

`[[content/Lost-in-Public/prompts/render-logic/Support-Dynamic-Information-Pages.md]]`
`[[Lost in Public/prompts/user-interface/Create-a-Changelog-UI.md]]`

#### Expected Output:
If the `content` dir is present in the backlink, remove it from the link as all collections are pointing within the content directory.
`<a href="/lost-in-public/prompts/render-logic/Support-Dynamic-Information-Pages" class="backlink">Support Dynamic Information Pages</a>`

`<a href="/lost-in-public/prompts/user-interface/Create-a-Changelog-UI" class="backlink">Create a Changelog UI</a>`

#### Edge Cases:
Do not render backlinks in frontmatter unless configured by the User. 


## Image Embed Examples
#### Input:
 `![[Screenshot 2025-02-01 at 5.30.15 PM_Granola—Feature.jpg]]`

 `![[Screenshot 2025-02-01 at 9.58.42 PM_Expo—Hero.png]]`

 `![](https://i.imgur.com/ueZ058L.png)`

#### Expected Output:
`<img src="/content/Visuals/Screenshots/Screenshot 2025-02-01 at 5.30.15 PM_Granola—Feature.jpg" alt="Granola—Feature JPG" />`

**Note:** We have two kinds of images, Heroes and Screenshots.  If the image has the word 'Hero' in it, it should reference the Heroes directory.  If it does not have Hero, it would be found in the Screenshots folder.  ALL images INCLUDE 'Screenshot' in the name, so you can't use that to determine the directory. 
`<img src="/content/Visuals/Heroes/Screenshot 2025-02-01 at 9.58.42 PM_Expo—Hero.png" alt="Expo—Hero PNG" />`

**Note:** If the image is a URL, it should be rendered as is.
`<img src="https://i.imgur.com/ueZ058L.png" alt="Image from URL" />`

#### Edge Cases:
Do not render image embeds in frontmatter unless configured by the User. 

## Custom Codeblocks

### Litegal
Litegal is a way to put images in a gallery slider in Obsidian.  It is a plugin.  

Many Obsidian plugins work by rendering within a codeblock that poses as a code language. But it's not. It simply calls the expected behavior.  Here's a real example:

``` litegal
[[Screenshot From 2025-02-19 07-00-02_Cursor--Hero.png]]
[[Screenshot 2025-02-22 at 9.34.28 PM_Windsurf-IDE--Hero.png]]
```

#### Expected Output:
```html
<div class="gallery litegal">
   <img src="/content/Visuals/Heroes/Screenshot 2025-02-19 at 07-00-02_Cursor--Hero.png" alt="Cursor Hero PNG" />
   <img src="/content/Visuals/Heroes/Screenshot 2025-02-22 at 9.34.28 PM_Windsurf-IDE--Hero.png" alt="Windsurf-IDE Hero PNG" />
</div>
<script> 
   // Add Litegal gallery functionality
   const gallery = document.querySelector('.gallery.litegal');
   if (gallery) {
      const images = gallery.querySelectorAll('img');
      images.forEach(img => {
         img.classList.add('gallery-image');
      });
   }
</script>   
```

### Dataview

## Error Handling
- Missing files
- Invalid paths
- Malformed syntax

## Test Cases
1. Basic backlink
2. Nested path
3. Invalid path
4. Special characters

## Read the Documentation:


### Example from the Marked documentation for convenience: