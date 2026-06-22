---
url: "https://agentskills.io/"
date_created: 2026-01-08
date_modified: 2026-06-19
og_title: "Agent Skills Overview"
og_description: "A standardized way to give AI agents new capabilities and expertise."
og_image: "https://agent-skills.mintlify.app/mintlify-assets/_next/image?url=%2F_mintlify%2Fapi%2Fog%3Fdivision%3DDocumentation%26title%3DAgent%2BSkills%2BOverview%26description%3DA%2Bstandardized%2Bway%2Bto%2Bgive%2BAI%2Bagents%2Bnew%2Bcapabilities%2Band%2Bexpertise.%26primaryColor%3D%25237f7f7f%26lightColor%3D%2523bfbfbf%26darkColor%3D%2523404040%26backgroundLight%3D%2523ffffff%26backgroundDark%3D%25230d0d0f&w=1200&q=100"
og_favicon: "https://agentskills.io/mintlify-assets/_mintlify/favicons/agent-skills/YI_e806pMNwgtBx4/_generated/favicon/favicon-32x32.png"
og_last_fetch: "2026-05-02T07:15:04.054Z"
site_name: "Agent Skills"
maintained_by: "[[Tooling/AI-Toolkit/Model Producers/Anthropic|Anthropic]]"
tags: [Agent-Skills, Agentic-AI, Agent-Orchestration, Agentic-Teamwork]
docs_url: "https://agentskills.io/home"
image_prompt: "A big monitor displays several terminal windows open doing nerdy stuff. The user is working with agents, and work is emitting out of the monitor and into the room.  Humanoid robots representing agents are huddled around the user.  The image style is cartoonish, comic book like, action oriented."
banner_image: "https://ik.imagekit.io/xvpgfijuw/uploads/lossless/2025-dec/Agent_Skills_banner_image_1777834838616_aVz80ORRh.webp"
portrait_image: "https://ik.imagekit.io/xvpgfijuw/uploads/lossless/2025-dec/Agent_Skills_portrait_image_1777834839861_Cul89IbPD.webp"
square_image: "https://ik.imagekit.io/xvpgfijuw/uploads/lossless/2025-dec/Agent_Skills_square_image_1777834840341_fTGOF4-8v.webp"
site_uuid: c8c625c9-bd05-4379-9ed1-628505d9b277
publish: true
title: "Agent Skills"
slug: agent-skills
at_semantic_version: 0.0.0.1
---
https://youtu.be/dtAJ2dOd3ko?is=08f2hUG5qCGsfzGy

An [[concepts/Open Specifications|Open Specification]] for [[Vocabulary/Agentic AI|Agentic AI]] and [[Vocabulary/Agentic AI|Agents]] to perform tasks, authored by [[Tooling/AI-Toolkit/Model Producers/Anthropic|Anthropic]]

:::tool-showcase
- [[Tooling/Software Development/Developer Experience/DevTools/Pi Coding Agent|Pi.dev]]
- [[Tooling/AI-Toolkit/Agentic AI/Hermes Agent|Hermes Agent]]
:::

![Chat bot set of infographic compositions with flat images of people robots algorithms charts and text vector illustration](http://img.b2bpic.net/free-vector/chat-bot-set-infographic-compositions-with-flat-images-people-robots-algorithms-charts-text-vector-illustration_1284-80649.jpg)


> [!QUOTE] [[Pi.dev]] responding to me on what skills I should give it
> 
> # Skills you could give me
> 
>  Skills are on-demand capability packages — markdown files (with optional helper scripts/assets) that I load only when relevant. They're great for codifying workflows you do repeatedly, or giving me access to APIs/tools I don't have built in.
> 
>  Skill ideas tailored to your setup
> 
>  Looking at your workspace (lossless-monorepo/ai-labs/context-v/explorations/), here are skills that would likely pay off:
> 
>  ### 📝 Knowledge & content workflows
> 
>  - exploration-writer — standardize how new files in explorations/ get structured (frontmatter,
>  sections, naming conventions like When-X-and-When-Y.md).
>  - context-curator — rules for what belongs in context-v/ vs other dirs; how to summarize, link, and cross-reference.
>  - lossless-style — your house writing style (voice, formatting, citation conventions) so output
>  matches your docs.
> 
>  ### 🔧 Repo / monorepo helpers
> 
>  - monorepo-nav — quick map of lossless-monorepo packages, where things live, common commands.
>  - commit-and-pr — your preferred commit message style, branch naming, PR template.
>  - changelog-update — how to update CHANGELOG when shipping changes.
> 
>  ### 🔬 AI-labs specific
> 
>  - prompt-eval — a repeatable harness for evaluating prompts/models (define inputs, run, log results to a folder).
>  - model-compare — structured side-by-side comparison doc generator (like the pi-vs-Claude-Code doc we just made).
>  - research-digest — given a paper/blog URL, extract key claims → notes → exploration file in your standard format.
> 
>  ### 🌐 External integrations (need helper scripts)
> 
>  - brave-search or web-fetch — give me real web search/fetching.
>  - obsidian-sync if you use Obsidian — read/write to your vault with the right frontmatter.
>  - hugging-face-share — wrap pi-share-hf for one-command session publishing.
> 
>  # How we'd build one together
> 
>  The workflow is collaborative and iterative:
> 
>  1. You describe the workflow in plain English — "every time I do X, I want Y to happen, following
>  these conventions."
>  2. I draft SKILL.md with frontmatter (name, description) + instructions + any helper scripts.
>  3. We pick a location:
>      - `~/.pi/agent/skills/<name>/` → available in every project
>      - `.pi/skills/<name>/` in this repo → project-scoped
>      - `.agents/skills/<name>/` → shared across pi and Claude Code / Codex
>      -  You run /reload in pi, then test with `/skill:<name>`.
>  4. We iterate — tighten the description (it controls when I auto-load it), add reference docs in
>  references/, add scripts in scripts/.
>  5. (Optional) bundle into a pi-package so you can share via npm/git.
> 
>  # Want to start?
> 
>  Pick one and I'll draft it right now. My suggestion for highest leverage given what I've seen:



***
> [!info] **Perplexity Query** (2026-05-04T08:24:55.081Z)
> **Question:**
> What are Agent Skills?  ai-skills the Open Spec authored by Anthropic.  When did it come out?  How has adoption been?  Has anything changed?  Other than it coming from anthropic, is there anything about it specifically clever relative to other possible specs or conventions?
> 
> **Model:** sonar-pro
> 

**Agent Skills** is an open specification for AI agent capabilities, originally developed by Anthropic as a portable format for "procedural knowledge"—specialized, step-by-step instructions enabling AI agents to handle complex tasks like code generation, data analysis, or workflows. [^8adsdn] [^bi2kwq] [^ippek6] Released on **December 18, 2025** by [[Tooling/AI-Toolkit/Model Producers/Anthropic|Anthropic]], it standardizes skills as self-contained filesystem directories with progressive levels of engagement, donated to the Agentic AI Foundation for broad interoperability. [^8adsdn] [^ippek6]

### Key Features and Structure
Skills extend general-purpose agents into specialists via folders containing:
- **Level 1**: Lightweight metadata "hooks" for recognition. [^8adsdn]
- **Level 2**: Dynamic loading of `SKILL.md` ([[projects/Emergent-Innovation/Standards/YAML|YAML]] metadata + [[projects/Emergent-Innovation/Standards/Markdown|Markdown]] instructions). [^8adsdn] [^bi2kwq]
- **Level 3**: Sandboxed execution of Python/JavaScript scripts, referencing external resources only as needed. [^8adsdn]

![Relevant diagram or illustration related to the topic](https://www.how2shout.com/wp-content/uploads/2025/12/Anthropic-Releases-Agent-Skills-Open-Standard-Enterprise-Tools-860x478.webp) (depicts the three-level progressive disclosure structure).

This differs from prior "Custom GPT" or plugin systems by using portable, platform-agnostic formats without opaque backends, allowing "build once, deploy anywhere" across Claude, ChatGPT, or Copilot. [^8adsdn]

### Adoption and Usage
Adoption has grown rapidly since launch, with integration into multiple agent products and an open-contribution model via agentskills.io. [^ippek6] DeepLearning.AI offers a short course (with Anthropic) teaching skill creation for workflows like marketing analysis using pre-built Excel/PowerPoint skills on Claude.ai. [^bi2kwq] ![Practical example or use case visualization](https://d15shllkswkct0.cloudfront.net/wp-content/blogs.dir/1/files/2025/12/Screenshot-from-2025-12-19-06-24-54.png) 
(shows a marketing campaign workflow combining skills with subagents).

Enterprise benefits include commoditizing the skills layer, challenging "walled gardens" from Microsoft or Google, and pairing with standards like Model Context Protocol (MCP). [^8adsdn]

### Changes and Updates (as of May 2026)
Recent enhancements include skills referencing `${CLAUDE_EFFORT}` for effort-aware content, plus broader [[Tooling/AI-Toolkit/Models/Claude|Claude]] ecosystem improvements like [[Memory for Managed Agents]] (public beta, April 2026). [^xe24xg] The GitHub repo (anthropics/skills) hosts Anthropic's Claude implementation, distinct from the general standard. [^7lef3z] No major spec overhauls reported. [^xe24xg]

### Clever Aspects Relative to Other Specs
Beyond Anthropic's origin, its **progressive disclosure** (loading only needed components to manage context/token limits) and **sandboxed, filesystem-based portability** stand out versus rigid plugins or model-specific conventions—enabling true cross-platform determinism without rewriting. [^8adsdn] [^bi2kwq] Hailed as the "Android moment" for [[Vocabulary/Agentic AI|Agentic AI]], it shifts value to modular procedural knowledge over proprietary models. [^8adsdn]

![Additional supporting visual content](https://substackcdn.com/image/fetch/$s_!lOIa!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F5aa2003b-a9c8-4747-94a9-17a69bc5ff0d_3382x2020.png) (illustrates interoperability across AI platforms).

# Citations

[^8adsdn]: 2026, Apr 20. [Anthropic Shatters AI Walled Gardens with Launch of 'Agent Skills ...](https://markets.financialcontent.com/wral/article/tokenring-2025-12-31-anthropic-shatters-ai-walled-gardens-with-launch-of-agent-skills-open-standard). Published: 2025-12-31 | Updated: 2026-04-21

[^bi2kwq]: 2026, Apr 20. [Agent Skills with Anthropic - DeepLearning.AI](https://www.deeplearning.ai/short-courses/agent-skills-with-anthropic/). Published: 2026-01-26 | Updated: 2026-04-21

[^ippek6]: 2026, May 03. [Agent Skills Overview - Agent Skills](https://agentskills.io/home). Published: 2026-04-22 | Updated: 2026-05-04

[^xe24xg]: 2026, May 01. [Anthropic Release Notes - May 2026 Latest Updates - Releasebot](https://releasebot.io/updates/anthropic). Published: 2026-05-02 | Updated: 2026-05-02

[5]: 2026, Jan 12. [Introducing Labs - Anthropic](https://anthropic.com/news/introducing-anthropic-labs). Published: 2026-01-13

[^7lef3z]: 2026, Apr 16. [anthropics/skills: Public repository for Agent Skills - GitHub](https://github.com/anthropics/skills). Published: 2025-09-22 | Updated: 2026-04-17
