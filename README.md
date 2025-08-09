![Content Repository of The Lossless Group](https://i.imgur.com/KY16xYu.png)

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

As of August 2025, the directory structure is as follows:

<details>
<summary>📁 Directory Structure</summary>

```
├── changelog--code
├── changelog--content
├── changelog--<client1>
├── Citations
├── client-content
│   ├── <client4>
│   │   └── Portfolio
│   ├── Colearn
│   ├── Commando
│   │   └── Portfolio
│   ├── <client6>
│   │   └── Reader
│   ├── <client2>
│   │   └── Portfolio
│   ├── <client1>
│   │   ├── essays
│   │   ├── Findings
│   │   ├── Projects
│   │   ├── Recommendations
│   │   └── Sources
│   ├── Obsidian-Plugin-Community
│   ├── <client5>
│   │   └── Recommendations
│   └── <client7>
│       └── Projects
├── concepts
│   ├── CARBS
│   ├── Explainers for AI
│   │   └── LLM Parameters
│   └── Explainers for Tooling
├── essays
├── lost-in-public
│   ├── blueprints
│   ├── explorations
│   ├── inspiration-cases
│   ├── issue-resolution
│   ├── keeping-up
│   ├── market-maps
│   ├── notes
│   │   └── notes-from-the-rabbit-hole
│   ├── practices
│   ├── prompts
│   │   ├── code-style
│   │   ├── data-integrity
│   │   ├── render-logic
│   │   ├── user-interface
│   │   └── workflow
│   ├── refactors
│   ├── reminders
│   ├── talks
│   ├── to-hero
│   └── up-and-running
├── moc
├── node_modules
│   └── uuid -> .pnpm/uuid@11.1.0/node_modules/uuid
├── organizations
├── projects
│   └── Augment-It
│       ├── Previous-Implementations
│       ├── Prompts
│       └── Specs
├── sessions
├── slides
├── sources
│   ├── Books
│   ├── Brand Content
│   ├── Events
│   ├── Laerdal Entities
│   ├── Lectures
│   ├── Media
│   ├── Meetings
│   ├── People
│   │   ├── Influencers
│   │   └── Laerdal-Team
│   ├── Reports
│   ├── Source Extracts
│   │   └── GitHub Repos
│   └── UGC Communities
├── specs
├── test-files
├── tooling
│   ├── AI-Toolkit
│   │   ├── Agentic AI
│   │   ├── AI Infrastructure
│   │   ├── AI Interfaces
│   │   ├── AI Programming Frameworks
│   │   ├── Data Augmenters
│   │   ├── Generative AI
│   │   ├── Knowledge AI
│   │   ├── Model Producers
│   │   └── Models
│   ├── Creative
│   ├── Data Utilities
│   ├── Enterprise Jobs-to-be-Done
│   │   ├── Content Management Systems
│   │   ├── Integration Platforms
│   │   └── Learning Experience Platforms
│   ├── Hardware
│   ├── Portfolio
│   ├── Productivity
│   │   └── Personal Cloud
│   ├── Products
│   ├── Scouting
│   ├── Software Development
│   │   ├── Cloud Infrastructure
│   │   ├── Databases
│   │   ├── Developer Experience
│   │   ├── Frameworks
│   │   ├── Lego-Kit Engineering Tools
│   │   ├── Product Analytics
│   │   └── Programming Languages
│   ├── Training
│   └── Web Browsers
├── vertical-toolkits
│   └── FinTech
├── visuals
│   ├── ContentDisplays
│   ├── For
│   │   └── Recraft-Generated
│   ├── GIFs
│   ├── Heroes
│   ├── imageOf
│   ├── Screenshots
│   └── Trademarks
└── vocabulary
```

</details>
