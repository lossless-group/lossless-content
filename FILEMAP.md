# Filemap · content

> **What is this file?** A living snapshot of this repo's directory shape — top-level dirs annotated for purpose, plus an auto-generated tree. Maintained per the [`maintain-filemap`](../context-v/skills/maintain-filemap/SKILL.md) loop, with one override: this repo is content-heavy (thousands of `.md` files), so the tree below is **directories only** (`tree -d`) rather than the generic script's file-inclusive depth-3 dump — a file-inclusive tree here runs to 3,500+ lines and stops being a map. Regenerate via:
>
> ```bash
> tree -L 3 -d -I 'node_modules|.git|.astro|dist|.vercel|.output|cache|*.lock|.DS_Store|.next|.turbo|target|build|coverage|tmp|.cache|*.tsbuildinfo' --noreport --dirsfirst .
> ```
>
> then splice the output between the sentinels below by hand (or re-run this recipe through an agent).

## Top-level directories

| Path | What it is |
|---|---|
| `essays` | Long-form thought-leadership essays |
| `concepts` | Concept/vocabulary explainers, incl. `Explainers for AI`, `Explainers for Tooling`, `Explainers for OSS`, `Market-Categories`, `CARBS` |
| `vocabulary` | Term definitions (largest single collection, 500+ files) |
| `organizations` | Company/org profiles |
| `sources` | Research sources — Books, Events, People, Reports, Media, Journals, Lectures, UGC Communities, Standards-and-Specs |
| `Citations` | Hex-code-keyed citation records + the Citation Viewer |
| `tooling` | The Lossless Toolkit — individual tool profiles by category (AI-Toolkit, Software Development, Productivity, etc.) |
| `vertical-toolkits` | Industry-vertical toolkit collections (FinTech, HealthTech, EdTech, CleanTech, etc.) |
| `content-areas` | Domain-specific content areas (Blue-Economy, Finance, Health, general) |
| `client-content` | Per-client work product, one subdir per client (Laerdal, Hypernova, Param, Water-Foundation, etc.) |
| `projects` | Internal and client projects (Augment-It, MemoPop, Content-Farm, Context-Vigilance, Lossless-Flavored-Markdown, etc.) |
| `specs` | Specifications |
| `lost-in-public` | Vibe-coding & AI-use working notes — reminders, prompts, blueprints, explorations, issue-resolution, practices, refactors, market-maps, keeping-up, talks, to-hero, up-and-running |
| `moc` | Maps of Content — index/hub pages, largely per client |
| `tag-mocs` | Tag-scoped maps of content |
| `sessions` | Dated session logs |
| `slides` | Slide-deck sources (`.astro` + `.md`) |
| `visuals` | Visual assets and diagrams |
| `changelog--content` | Content changelog (dated entries) |
| `changelog--code` | Code changelog (dated entries) |
| `changelog--laerdal` | Laerdal-client-specific changelog |

## Tree (directories, depth 3, auto-generated)

<!-- TREE-START -->
```
.
├── changelog--code
├── changelog--content
├── changelog--laerdal
├── Citations
├── client-content
│   ├── Avalanche
│   │   └── Portfolio
│   ├── Colearn
│   ├── Commando
│   │   └── Portfolio
│   ├── Dark-Matter
│   ├── Flourish
│   │   └── Reader
│   ├── Hypernova
│   │   ├── Files
│   │   └── Proposals
│   ├── Laerdal
│   │   ├── Findings
│   │   ├── Projects
│   │   ├── Recommendations
│   │   └── Sources
│   ├── Obsidian-Plugin-Community
│   ├── Param
│   │   └── Recommendations
│   ├── Parselee
│   │   └── Projects
│   ├── Tonguc
│   │   └── Projects
│   └── Water-Foundation
├── concepts
│   ├── CARBS
│   ├── Explainers for AI
│   │   └── LLM Parameters
│   ├── Explainers for OSS
│   │   └── Licenses
│   ├── Explainers for Tooling
│   └── Market-Categories
├── content-areas
│   ├── Blue-Economy
│   │   ├── Concepts
│   │   ├── Issues
│   │   ├── Organizations
│   │   ├── Sources
│   │   ├── Topics
│   │   └── Vocabulary
│   ├── Finance
│   │   └── Private-Markets
│   ├── general
│   │   ├── concepts
│   │   ├── issues
│   │   ├── organizations
│   │   ├── topics
│   │   └── vocabulary
│   └── Health
├── essays
├── lost-in-public
│   ├── agendas
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
├── organizations
│   └── Acquired
├── projects
│   ├── Astro-Knots
│   │   └── Specs
│   ├── Augment-It
│   │   ├── Changelog
│   │   ├── High-Level-Architecture
│   │   ├── Previous-Implementations
│   │   ├── Prompts
│   │   └── Specs
│   ├── Content-Farm
│   │   └── Specs
│   ├── Context-Vigilance
│   │   ├── Docs-Kit
│   │   ├── Models
│   │   ├── Philosophy
│   │   ├── Safety
│   │   └── UseCases
│   ├── Data-Modeling-Kit
│   ├── Democratizing-Data
│   ├── Emergent-Innovation
│   │   ├── Examples
│   │   ├── Laerdal Challenges
│   │   ├── MediHacks
│   │   ├── Policy-&-Regulation
│   │   └── Standards
│   ├── Lossless-Flavored-Markdown
│   ├── MemoPop
│   │   └── Meeting-Notes
│   └── Water-Template-CE
│       └── Specs
├── sessions
├── slides
├── sources
│   ├── Books
│   ├── Brand Content
│   ├── Events
│   ├── Journals
│   ├── Lectures
│   ├── Media
│   ├── Meetings
│   ├── People
│   │   └── Influencers
│   ├── Reports
│   ├── Source Extracts
│   │   └── GitHub Repos
│   ├── Standards-and-Specs
│   └── UGC Communities
├── specs
├── tag-mocs
├── tooling
│   ├── AI-Toolkit
│   │   ├── Agentic AI
│   │   ├── AI Infrastructure
│   │   ├── AI Interfaces
│   │   ├── AI Programming Frameworks
│   │   ├── Data Augmenters
│   │   ├── Explainers
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
│   │   ├── Advanced Documents
│   │   ├── Advanced Spreadsheets
│   │   ├── Async Communication
│   │   ├── Personal Cloud
│   │   ├── Research Tools
│   │   ├── Web Meetings
│   │   └── Workflow Management
│   ├── Products
│   ├── Scouting
│   ├── Software Development
│   │   ├── Backend-as-a-Service
│   │   ├── Cloud Infrastructure
│   │   ├── Databases
│   │   ├── Design
│   │   ├── Developer Experience
│   │   ├── DevOps
│   │   ├── Frameworks
│   │   ├── Lego-Kit Engineering Tools
│   │   ├── Product Analytics
│   │   └── Programming Languages
│   ├── Training
│   └── Web Browsers
├── vertical-toolkits
│   ├── CleanTech
│   ├── DroneTech
│   ├── EdTech
│   ├── FinTech
│   ├── Growth-Equity-Firms
│   ├── HealthTech
│   ├── OceanTech
│   ├── RegTech
│   └── Venture-Capital-Firms
├── visuals
│   ├── ContentDisplays
│   ├── For
│   ├── GIFs
│   ├── Heroes
│   ├── ImageGin
│   ├── imageOf
│   ├── Screenshots
│   └── Trademarks
└── vocabulary
```
<!-- TREE-END -->

## See also

- [`context-v/skills/maintain-filemap/SKILL.md`](../context-v/skills/maintain-filemap/SKILL.md) — the general discipline this file follows (with the directories-only override noted above)
- `README.md` — the stats block there tracks file counts / word counts; this file tracks shape
