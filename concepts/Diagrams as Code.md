---
site_uuid: d0d2bca8-f3a9-42dc-ba42-ec6862f75b5c
date_created: 2025-08-02
date_modified: 2026-05-03
publish: true
title: "Diagrams As Code"
slug: diagrams-as-code
at_semantic_version: 0.0.0.1
---
[[essays/We need better Charts]]
[[Tooling/Software Development/Frameworks/Web Frameworks/Mermaid.js|Mermaid.js]]
[[Tooling/Enterprise Jobs-to-be-Done/MermaidChart|MermaidChart]]
[[Tooling/Software Development/Structurizr|Structurizr]]


***
> [!info] **Perplexity Query** (2025-08-11T20:13:02.571Z)
> **Question:**
> Write a comprehensive one-page article about "Diagrams as Code". 
> 
> **Model:** sonar-pro
> 
> ### **Response from sonar-pro**:

Diagrams as Code is the practice of defining a diagram’s content and structure in text-based source files and rendering it via tooling, rather than drawing it manually in a GUI editor. [^tjpo2w] It matters because it brings the rigor of software development—version control, reviews, automation—to visual documentation, keeping diagrams accurate and easy to maintain alongside code. [^tjpo2w] [^anzw40]

![Diagrams as Code concept diagram or illustration](https://miro.medium.com/v2/resize:fit:1400/1*zgzH4BrYAQOLYVSrm8AwMA.png)

Introduction
- Diagrams as Code turns visual models into code, letting teams describe nodes, relationships, and layout through declarative or programmatic syntax that a renderer converts into images. [^tjpo2w] By aligning with “docs as code,” it improves traceability, collaboration, and accessibility for technical documentation. [^tjpo2w]

Main Content
- The core idea is to write diagrams in human-readable text (e.g., Markdown-adjacent DSLs, YAML/JSON, or general-purpose languages like Python) and use a tool to generate SVG/PNG on demand. [^tjpo2w] This shifts effort from pixel-perfect editing to expressing intent—what components exist and how they connect—while the tool handles spacing, alignment, and styling. [^anzw40] Because the source is text, changes are diffable and reviewable in pull requests, enabling the same CI/CD workflows used for code. [^tjpo2w]

- Practical examples span software architecture, cloud/network topologies, data flows, and onboarding docs. For instance, engineers can script cloud architectures—VPCs, load balancers, databases—and regenerate diagrams as infrastructure evolves, avoiding stale visuals. [^934ur2] Teams often embed these generated images in READMEs so contributors see up-to-date architecture at a glance while the code lives in the repo for easy edits. [^fkjo1n] Python-based libraries can define AWS/Azure/GCP components in a few lines and render architecture views programmatically. [^jm27zz]

- Benefits include speed for developers who think in code, consistency across diagrams, and focus on content rather than styling minutiae. [^anzw40] Version history, change control, and automated rebuilds ensure diagrams stay aligned with reality, improving reliability of documentation in fast-moving DevOps environments. [^tjpo2w] [^934ur2] Accessibility improves as the text source can be read by assistive technologies or linked from the image for more inclusive documentation. [^tjpo2w]

- Considerations include learning curve for non-developers, limits of auto-layout for complex visuals, and the need to choose tools that fit governance and security requirements. Large, dense diagrams may require iterative refinement or layering into multiple views to remain readable, and teams should establish conventions (naming, icon sets, folder structure) to keep outputs coherent across repositories. [^anzw40] [^tjpo2w]

![Diagrams as Code practical example or use case](https://images.ctfassets.net/w6r2i5d8q73s/6O9tn7x5Bvh7ECEhdEWSJZ/a881b352d2e1d1e9198299ba0c4deb10/diagramming_uml_diagram_product_image_EN_standard_3_2-2.png)

Current State and Trends
- Adoption is growing among software, platform, and data teams that already practice “as code” workflows, particularly where architectures change frequently and manual diagrams fall out of date. [^934ur2] [^tjpo2w] Organizations report improved reviewability and maintainability when diagrams live with the codebase and participate in CI pipelines. [^tjpo2w] [^fkjo1n]

- Key players and technologies include general approaches endorsed by digital government standards, plus toolchains that script diagrams using Python or DSLs for cloud and systems architecture. [^tjpo2w] [^jm27zz] Recent developments emphasize automating generation from live infrastructure descriptions so that visuals update as environments change, reducing drift between docs and production. [^934ur2] [^jm27zz]

Future Outlook
- Diagrams as Code is likely to deepen integration with IaC and observability, auto-generating context-specific views from source-of-truth systems and embedding them in developer portals and runbooks. [^934ur2] Expect richer interactivity, policy checks on diagram changes, and standardized taxonomies that make multi-cloud and hybrid architectures clearer and auditable at scale. [^934ur2] [^jm27zz]



Conclusion
- Diagrams as Code brings code-like discipline to visuals, making architecture diagrams faster to create, easier to review, and less likely to rot. [^tjpo2w] [^anzw40] As automation and integrations advance, expect diagrams to become living assets that mirror systems in near real time. [^934ur2]

***


### Citations

[^anzw40]: 2025, Apr 07. [Understanding Diagrams as Code From Idea to Implementation - Gliffy](https://www.gliffy.com/blog/diagrams-as-code). Published: 2024-02-16 | Updated: 2025-04-08

[^jm27zz]: 2025, Jun 15. [Diagram-as-Code: Creating Dynamic and Interactive Documentation ...](https://dev.to/r0mymendez/diagram-as-code-creating-dynamic-and-interactive-documentation-for-visual-content-2p93). Published: 2024-11-19 | Updated: 2025-06-16

[^934ur2]: 2025, Jun 15. [Diagram as Code: Automate Diagrams for DevOps & Cloud - Draft1.ai](https://www.draft1.ai/blog/diagram-as-code-automating-architecture-diagrams-for-devops-and-cloud-engineers). Published: 2024-12-03 | Updated: 2025-06-16

[^tjpo2w]: 2025, Jan 29. [Diagrams as code - The GDS Way](https://gds-way.digital.cabinet-office.gov.uk/standards/diagrams-as-code.html). Published: 2017-08-25 | Updated: 2025-01-30

[^fkjo1n]: 2021, Oct 06. [Diagrams As Code In Your Repo's README - Zus Health](https://zushealth.com/diagrams-as-code-in-your-repos-readme). Published: 2021-10-07



Based on agent training and emerging infrastructure-as-code patterns, agents have strong fluency with several formats beyond the basics you mentioned. Here are the most promising ones: [^5vm02s] [^hsw9sd]

## Infrastructure Configuration Languages

**HCL (HashiCorp Configuration Language)** is the declarative syntax powering Terraform and other HashiCorp tools. Agents readily read, understand, and write HCL because it balances human readability with machine parsability through its block-based structure, supports interpolation and functions, and is provider-agnostic. For users, it serves as a bridge between infrastructure intent and cloud provisioning—you describe what resources you want, and the tooling handles how to create them. [^hsw9sd] [^t8q5bh] [^lycgb1]

**CUE (Configure, Unify, Execute)** takes configuration further by unifying data validation, templating, and policy enforcement in a single language. Agents trained on modern infrastructure tooling understand CUE's type-safe constraints and compositional approach. It helps users define complex system configurations with built-in validation, reducing the cognitive load of managing JSON Schema separately. CUE can import from and export to JSON, YAML, Protobuf, and OpenAPI. [^0sbdno] [^5ujobp]

**Dhall** is a programmable configuration language designed for security-conscious environments with guaranteed termination and no side effects. Its strong type system ensures configurations never fail at runtime if they type-check. For users, Dhall provides the power of computation in configs without the risks of arbitrary code execution. [^3uggqx]

## Visual-to-Text Formats

**DOT (Graphviz)** uses simple text syntax to describe nodes, edges, and graph layouts. Agents fluently generate DOT because it's pure declarative structure—you specify elements and relationships, and rendering engines handle visualization. Users can quickly communicate architectural diagrams, state machines, or dependency graphs through text that agents can both create and modify. [^gq6t38] [^tnpbn3]

**PlantUML** converts plain text descriptions into UML diagrams using an intuitive keyword-based syntax [^ofo6uk] [^j9mivu]. Agents understand the `@startuml`/`@enduml` blocks and relationship operators like `--|>` for inheritance [^ofo6uk]. This lets users collaborate with agents on software architecture, sequence diagrams, and component relationships without touching a mouse [^j9mivu].

**Excalidraw JSON** stores whiteboard-style diagrams in a structured JSON schema with element arrays and application state. While more complex than PlantUML, agents can parse and generate `.excalidraw` files programmatically. Users get the benefit of hand-drawn aesthetic diagrams that are still machine-readable and version-controllable. [^4qhw0v] [^r0rtt7]

## Why These Work

The pattern across all these formats is **declarative structure with clear semantics**. They describe desired end-states rather than procedural steps, making them easier for agents to reason about. They're text-based for version control, have formal grammars agents can parse reliably, and serve specific domains (infrastructure, diagrams, data validation) where the mapping from syntax to intent is unambiguous. [^5vm02s] [^hsw9sd]

Unlike SVG where agents must manipulate low-level rendering primitives, these formats operate at the conceptual level where both humans and agents naturally think—resources, relationships, constraints, and visual elements.

Sources
[^5vm02s]: [Reflections on Declarative Configuration | by Brian Grant - ITNEXT](https://itnext.io/reflections-on-declarative-configuration-c2fe1c1e50d5)
[^hsw9sd]: [What is Infrastructure as Code with Terraform? - HashiCorp Developer](https://developer.hashicorp.com/terraform/tutorials/aws-get-started/infrastructure-as-code)
[^t8q5bh]: [Syntax - Configuration Language | Terraform - HashiCorp Developer](https://developer.hashicorp.com/terraform/language/syntax/configuration)
[^lycgb1]: [What is Terraform Configuration Language (HCL) - GeeksforGeeks](https://www.geeksforgeeks.org/devops/what-is-terraform-configuration-language-hcl/)
[^0sbdno]: [CUE is an exciting configuration language - Bitfield Consulting](https://bitfieldconsulting.com/posts/cuelang-exciting)
[^5ujobp]: [CUE - CUE (Confìgure, Understand, Execute) is a data configuration...](https://geordy.ai/formats/cue)
[^3uggqx]: [Safety Guarantees — Dhall documentation](https://docs.dhall-lang.org/discussions/Safety-guarantees.html)
[^gq6t38]: [DOT Language - Graphviz](https://graphviz.org/doc/info/lang.html)
[^tnpbn3]: [ReportServer Admin Guide 6.0 - 14. Graphviz DOT](https://reportserver.net/de/guides/admin/chapters/Graphviz-DOT.php)
[^ofo6uk]: [Quick Guide to PlantUML: Diagrams, Syntax & Best Practices | Miro](https://miro.com/diagramming/what-is-plantuml/)
[^j9mivu]: [Create UML Diagrams using PlantUML | The .NET Tools Blog](https://blog.jetbrains.com/dotnet/2020/10/06/create-uml-diagrams-using-plantuml/)
[^4qhw0v]: [JSON Schema - Excalidraw developer docs](https://docs.excalidraw.com/docs/codebase/json-schema)
[^r0rtt7]: [How to use Excalidraw files in excalidraw.org? - Obsidian Forum](https://forum.obsidian.md/t/how-to-use-excalidraw-files-in-excalidraw-org/74626)
[^4llztu]: [How to Use Structured Data for AI Crawlers 2026 | AEO Strategy](https://www.sotaventomedios.com/how-to-use-structured-data-for-ai-crawlers/)
[^w49w5w]: [Top 11 AI Agent Frameworks to Consider in 2026](https://highpeaksw.com/top-11-ai-agent-frameworks-to-consider-in-2026/)
[^e29mep]: [The Best Open Source Frameworks For Building AI Agents in 2026](https://www.firecrawl.dev/blog/best-open-source-agent-frameworks)
[^ur492l]: [Agentic AI Frameworks: Top 10 Options in 2026 - NetApp Instaclustr](https://www.instaclustr.com/education/agentic-ai/agentic-ai-frameworks-top-10-options-in-2026/)
[^nlo2ek]: [Structured data and AI in 2026 - YouTube](https://www.youtube.com/watch?v=T1YToIpdyCY)
[^6mzwev]: [Illuminating LLM Coding Agents: Visual Analytics for Deeper ... - arXiv](https://arxiv.org/html/2508.12555v1)
[^dk1ck5]: [9 Best AI Agent Frameworks For 2026: A Developer's Guide](https://sthenostechnologies.com/blogs/best-ai-agent-frameworks/)
[^i8pxpi]: [A Visual Guide to LLM Agents - by Maarten Grootendorst](https://newsletter.maartengrootendorst.com/p/a-visual-guide-to-llm-agents)
[^e7lnq5]: [Making your content AI-friendly in 2026 | Strategic Nerds](https://www.strategicnerds.com/blog/making-your-content-ai-friendly-in-2026)
[^tevx1o]: [Declarative infrastructure for beginners - Stride Consulting](https://www.stride.build/blog/declarative-infrastructure-for-beginners)
[^wl7nds]: [Visual Agents at CVPR 2025 - Voxel51](https://voxel51.com/blog/visual-agents-at-cvpr-2025)
[^rq455w]: [Top 14 Frameworks for Building AI Agents in 2026 - Bright Data](https://brightdata.com/blog/ai/best-ai-agent-frameworks)
[^z8qs4l]: [Bringing declarative infrastructure to developers - DEV Community](https://dev.to/rsiv/bringing-declarative-infrastructure-to-developers-3380)
[^4b4ekm]: [Configuration Language | Terraform - HashiCorp Developer](https://developer.hashicorp.com/terraform/language)
[^eamwk5]: [HCL Language Guide: Syntax, Expressions & Patterns for ... - Scalr](https://scalr.com/learning-center/the-developers-guide-to-hcl-part-1-introduction/)
[^e9857y]: [Mastering HashiCorp Configuration Language for Terraform](https://www.youtube.com/watch?v=y_26H8old3k)
[^mcydr0]: [Dhall configuration language as another way to write manifests for ...](https://palark.com/blog/dhall-language-for-kubernetes-manifests/)
[^3g4g0f]: [Creating Terraform-like configuration languages with HCL and Go](https://rotemtam.com/2022/08/06/configuration-languages-with-hcl/)
[^m5986y]: [HCL is the HashiCorp configuration language. - GitHub](https://github.com/hashicorp/hcl)
[^58rvgn]: [Introduction - CUE](https://cuelang.org/docs/introduction/)
[^l0ftjl]: [Dhall – A Distributed, Safe Configuration Language : r/programming](https://www.reddit.com/r/programming/comments/8yrw3u/dhall_a_distributed_safe_configuration_language/)
[^ls8dd9]: [Syntax Overview - Configuration Language | Terraform](https://developer.hashicorp.com/terraform/language/syntax)
[^7w3cid]: [FOSDEM 2022 - A practical guide to CUE: patterns for everyday use](https://www.youtube.com/watch?v=e4v1_2bSeGI)
[^hm7f0f]: [dot | Graphviz](https://graphviz.org/docs/layouts/dot/)
[^fmx19k]: [User Guide — graphviz 0.22.dev0 documentation](https://graphviz.readthedocs.io/en/latest/manual.html)
[^vk57iv]: [Graph Attributes - Graphviz](https://graphviz.org/docs/graph/)
[^f4pp02]: [PlantUML Text Encoding](https://plantuml.com/text-encoding)
[^sckjg5]: [Graphviz syntax shortcuts - Stack Overflow](https://stackoverflow.com/questions/28531575/graphviz-syntax-shortcuts)
[^yfm1n7]: [DOT (graph description language) - Wikipedia](https://en.wikipedia.org/wiki/DOT_(graph_description_language) )
[^vujfi5]: [PlantUML](https://plantuml.com)
[^hzkj95]: [Utils | Excalidraw developer docs](https://docs.excalidraw.com/docs/@excalidraw/excalidraw/api/utils)
[^83vxob]: [Graphviz tutorial - YouTube](https://www.youtube.com/watch?v=YL260-A5r2U)
