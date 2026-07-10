---
github_repo_url: https://github.com/google-labs-code/design.md
date_created: 2026-05-01
date_modified: 2026-07-08
cf_last_run: 2026-07-08T01:49:54.761Z
cf_last_run_model: Perplexity sonar-pro
tags:
  - Open-Specifications
  - Agentic-AI
  - Code-Generators
  - Agentic-Engineering
  - Context-Engineering
  - Context-Engineering-Kits
  - Lossless-Toolkit
for_clients:
  - FullStackVC
  - Colearn
  - Lossless
---
[[concepts/Explainers for AI/Agentic Engineering|Agentic Engineering]]
[[concepts/Explainers for AI/Agent Harnesses|Agent Harnesses]]
[[concepts/Open Specifications|Open Specifications]]
[[organizations/Google Labs|Google Labs]]
[[Vocabulary/Front-End|Frontend]]
[[concepts/Explainers for Tooling/Design Tools|Design Tools]]


# Value Proposition & Features

**DESIGN.md** is a format specification for describing a visual identity to coding agents, giving them a persistent, structured understanding of a design system. [^cd6o75] The core value proposition is that developers can encode brand rules once and then have AI tools follow them consistently instead of inventing a fresh look each time. [^cd6o75] [^mbwc4m]

The format centers on a markdown-based design system description that can include machine-readable design tokens such as colors, typography, spacing, and components. [^5y33po] [^mbwc4m] It is intended to guide AI coding agents like Claude, Cursor, or Google Stitch toward on-brand output by combining structured tokens with prose rules about how to apply them. [^5y33po] [^cd6o75]

- **Persistent design source of truth** for AI agents. [^cd6o75]
- **Machine-readable design tokens** for colors, fonts, spacing, and radii. [^5y33po] [^mbwc4m]
- **Markdown prose rules** that explain how to apply the design system. [^5y33po] [^cd6o75]
- **Brand-consistent UI generation** across AI-assisted workflows. [^5y33po] [^cd6o75]
- **Works with coding agents** such as Claude, Cursor, and Google Stitch. [^5y33po]
- **Supports visual identity encoding** for UI components and layout decisions. [^mbwc4m] [^cd6o75]

## Screenshots

No publicly available official screenshots were found in the returned sources.

## Product Roadmap / Announcements

As of Wednesday, July 08, 2026, no reliable public roadmap items or official announcements were found in the returned sources. [^cd6o75]

## Recent Developments

- In a Google Labs Code AI skill description, DESIGN.md was presented as a skill for analyzing Stitch design projects and generating semantic DESIGN.md files as a prompting source of truth. [^t99bnp]
- A GitHub README described DESIGN.md as “a format specification for describing a visual identity to coding agents” and said it gives agents “a persistent, structured understanding of a design system.”[^cd6o75]
- Third-party writeups in 2026 described DESIGN.md as a plain markdown file or open specification that helps AI tools build to a brand instead of guessing at colors and fonts. [^5y33po] [^mbwc4m]

# History and Origin Story

The available sources indicate that DESIGN.md emerged as a Google Labs–associated specification for describing design systems to AI coding agents, but they do not provide a detailed founding narrative or a named founder in the returned results. [^5y33po] [^cd6o75] The clearest inflection point in the sources is its framing as a reusable, structured prompt/source-of-truth format for AI-assisted interface generation. [^t99bnp] [^cd6o75]
# Market Sizing

## Category, Market Size, and Category Growth

DESIGN.md appears to sit in the **AI design-system tooling** and **AI-assisted UI generation** category, specifically as a specification layer for coding agents rather than a standalone app. [^5y33po] [^cd6o75] No reliable market-size or category-growth estimates were found in the returned sources.
# Competitive Landscape

## Who it's for, who it's not for

DESIGN.md is for product teams, designers, and developers who want AI coding agents to reproduce an existing brand system consistently across generated interfaces. [^5y33po] [^cd6o75] It is especially relevant when a team already has a design system and wants to translate that system into an AI-readable format. [^5y33po] [^mbwc4m]

It is not for users who want a no-code website builder without design-system constraints, or for teams with no established brand language to encode. [^5y33po] [^cd6o75] It is also a poor fit when the need is generic UI generation rather than brand-specific, repeatable output. [^5y33po] [^cd6o75]

## Viable Alternatives

- **Figma design systems** — better for human-led design governance, less directly aimed at AI agents. [^zryml8] [^fua79u]
- **Plain design tokens files** — useful for structured branding data, but less expressive than a markdown+rules spec. [^5y33po] [^mbwc4m]
- **Prompt-only style guides** — faster to start, but less persistent and less machine-readable than DESIGN.md. [^cd6o75]
- **Google Stitch reference inputs** — useful for generating interfaces, but they do not necessarily formalize a reusable brand spec. [^t99bnp] [^xedt8h]
- **Custom internal documentation** — flexible for mature teams, but lacks a standardized DESIGN.md format. [^cd6o75]

## Competitor Table

| Competitor | Description |
|---|---|
| [Figma design systems](https://www.figma.com/community/plugin/1637827832055796729/design-md-create-manage) | Human-maintained design-system workflows that can be translated into DESIGN.md-style assets. [^fua79u] |
| [Plain design tokens](https://github.com/google-labs-code/design.md/blob/main/README.md) | Structured token files that capture colors, spacing, typography, and component variables. [^cd6o75] |
| [Prompt-only style guides](https://slidespeak.co/blog/design-md-for-presentations) | Narrative prompt approaches that instruct AI on look-and-feel without a formal spec layer. [^5y33po] |
| [Google Stitch inputs](https://webdeveloper.com/skills/google-labs-code/design-md/) | AI design inputs used to analyze projects and generate semantic DESIGN.md files. [^t99bnp] |


***

# Sources

[^5y33po]: [DESIGN.md for Presentations: Make AI Build On-Brand Slides](https://slidespeak.co/blog/design-md-for-presentations)
[^t99bnp]: [Design MD — Google Labs Code AI Skill - Web Developer](https://webdeveloper.com/skills/google-labs-code/design-md/)
[^xedt8h]: [How to Use Design.md in Google Stitch - YouTube](https://www.youtube.com/watch?v=kYWxlX-qu-M)
[^mbwc4m]: [DESIGN.md download | SourceForge.net](https://sourceforge.net/projects/design-md.mirror/)
[^zryml8]: [AI Agents Follow Design Direction with DESIGN.md Template](https://www.linkedin.com/posts/maryellenschrock_github-flohcreativedesign-md-template-activity-7469805318533758976-fg23)
[6]: [DESIGN.md Best Practices - UX Planet](https://uxplanet.org/design-md-best-practices-c00325e8b23a)
[7]: [I'm a logic-and-code person. Design has always made me sweat. So ...](https://www.facebook.com/groups/developerkaki/posts/2897675060578388/)
[^cd6o75]: [design.md/README.md at main · google-labs-code/design ... - GitHub](https://github.com/google-labs-code/design.md/blob/main/README.md)
[9]: [𝙳𝙴𝚂𝙸𝙶𝙽.𝚖𝚍 is about to be everywhere. 9 tools already doing it ...](https://www.instagram.com/p/DZsDcD9EreA/)
[^fua79u]: [design.md create & manage - Figma](https://www.figma.com/community/plugin/1637827832055796729/design-md-create-manage)
