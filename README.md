![Content Repository of The Lossless Group](https://i.imgur.com/KY16xYu.png)

<div align="center">

<table>
<tr>
<td align="center" width="130">
<h1 style="margin:0; font-size:2.2em;">4,614</h1>
<sub>Markdown Files</sub>
</td>
<td align="center" width="130">
<h1 style="margin:0; font-size:2.2em;">2.9M</h1>
<sub>Words</sub>
</td>
<td align="center" width="130">
<h1 style="margin:0; font-size:2.2em;">21</h1>
<sub>Collections</sub>
</td>
<td align="center" width="130">
<h1 style="margin:0; font-size:2.2em;">1,053</h1>
<sub>Commits</sub>
</td>
<td align="center" width="130">
<h1 style="margin:0; font-size:2.2em;">Mar 2025</h1>
<sub>Active Since</sub>
</td>
</tr>
</table>

<sub>Snapshot as of 2026-07-09 · directory shape lives in <a href="./FILEMAP.md">FILEMAP.md</a></sub>

</div>

<details>
<summary>Regenerate these numbers</summary>

```bash
# Markdown files
find . -name "*.md" -not -path "./node_modules/*" | wc -l

# Word count across markdown
find . -name "*.md" -not -path "./node_modules/*" -print0 | xargs -0 cat | wc -w

# Top-level collections
find . -maxdepth 1 -type d -not -name "." -not -name "node_modules" -not -name ".git" -not -name ".claude" | wc -l

# Commits across all branches
git log --all --oneline | wc -l

# First commit date
git log --reverse --format=%ad --date=short | head -1
```

</details>

### Introduction

This repository contains the content for the Lossless site.  The site can be found as the 'site' directory in the monorepo, or [the Github Repo](https://github.com/lossless-group/lossless-site.git)

### Requirements to Participate
You must use Obsidian.  
Clone the repository, and then create a symlink from the directories you want to edit to the Obsidian vault.  
**Turn On** full paths of backlinks in Obsidian.  

# Context

### Sharing Strategy and Information
We have been trying to serve clients in multiple ways, which created the need to author, generate, organize, publish, curate, and display content.  

One way is "thought leadership" in the form of essays, articles, explainers, etc.  Most of the threads in the content repo look "undeveloped" because the plan 
1. _was_ to run scripts through local LLMs and AI powered Web Scrapers to generate the content.  
2. _is_ to use our Content Farm universe of Obsidian plugins to generate the content using LLMs through various means.  

### Sharing a Universe of Technology Adoption Options and Inspiration
Another way is "consulting" on technology adoption.  This has required hundreds of hours of research and link collection, analysis, and tech influencer mapping.  

### Acting as an R&D lab
Another way is acting as an R&D lab for new approaches or technology stacks, that can operate outside of their internal engineering teams. In some ways, I've been focused on making "Vibe Coding" dance. 

## There is a Vision
We must reduce content and data to Markdown and JSON. Once you know how to reduce and expand content and data into its most basal forms, that it is an unlock for AI to generate, augment, or clean and format content and data. 

### Obsidian as the Content Manager
Part of the infinite loop I have been in is that Astro and Obsidian treat markdown just differently enough to create a lot of pain.

# Focal Points:

### Projects
Projects: `projects`
Augment-It: `projects/Augment-It`

### Vibe Coding & AI Use
Reminders: `lost-in-public/reminders`
Prompts: `lost-in-public/prompts`
Specifications: `specs`
Issue Resolutions: `lost-in-public/issue-resolution`

### Changelogs
Code Changelog: `changelog--code`
Content Changelog: `changelog--content`

### Toolkits, Organizations
The Lossless Toolkit: `tooling`
Vertical Toolkits: `vertical-toolkits`
Organizations: `organizations`

### Sources
Sources: `sources`
Books: `sources/Books`
Events: `sources/Events`
People: `sources/People`
Reports: `sources/Reports`
UGC Communities: `sources/UGC Communities`

### Concepts and Vocabulary
Concepts: `concepts`
Vocabulary: `vocabulary`


# Directory Structure

The directory shape (top-level collections + a curator preface explaining what each one is) lives in [`FILEMAP.md`](./FILEMAP.md), kept current by re-running its regen recipe rather than hand-pasted here where it goes stale.
