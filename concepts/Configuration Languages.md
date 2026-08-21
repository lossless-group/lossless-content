---
date_created: 2026-08-17
date_modified: 2026-08-20
cf_last_run: 2026-08-20T08:16:47.977Z
cf_last_run_model: Perplexity sonar-pro
tags:
  - State-Of-The-Art-Practices
  - Dev-Ops-Tools
  - Solutions-For-Scale
  - Large-Codebase-AI
site_uuid: fb080957-4762-4270-8534-f8500d422e01
publish: true
title: Configuration Languages
slug: configuration-languages
at_semantic_version: 0.0.1.1
for_clients:
  - Laerdal
---

_Configuration languages are the “small, readable languages” software uses to describe settings and behavior, not to run full programs._  

Configuration languages are a family of domain-specific languages used to define software, system, or infrastructure settings in a form that is meant to be human-readable and machine-parseable. [^az6s8f] [^wyog7e] [^w31ker] They matter because they sit between rigid data formats and general-purpose programming languages: they are expressive enough to describe structure, values, and sometimes limited logic, but constrained enough to keep configuration deterministic and safer to consume. [^lu5c92] [^w31ker]

# Defining and Describing Configuration Languages


Configuration languages are typically invoked when developers need to specify application preferences, deployment settings, infrastructure, build metadata, or policy-like parameters in text files. [^az6s8f] [^wyog7e] [^w31ker] In that usage, the term emphasizes a language whose primary job is to *configure* another system, rather than to compute arbitrary results. [^lu5c92] [^w31ker] A concise way to frame the idea is that these languages are “designed to define and manage the settings, parameters, and operational behavior” of software or infrastructure. [^az6s8f]

# Uses in Context

- Configuration languages are used for **application settings**, where a program reads a file to determine ports, paths, feature flags, or runtime options. [^az6s8f] [^w31ker]
- They are used in **infrastructure-as-code**, where tools like Terraform consume configuration to define cloud resources and dependencies. [^wyog7e] [^o1qetn]
- They are used in **DevOps and server tooling**, where human-editable configuration needs to be both readable and predictable for automation. [^wyog7e] [^scasx7]
- They are used in **project metadata and build configuration**, especially where teams want a compact format that is easier to edit than raw JSON. [^2q48id] [^9sgwqm]
- They are used in **schema-like, typed configuration**, where a language offers explicit types and a strict data model to reduce ambiguity. [^9sgwqm] [^scasx7]
- They are used as a **DSL niche** for cases where “enough expressiveness to avoid repetition” is needed, but “no infinite loops, no side effects, deterministic output” are still desired. [^lu5c92]

# History of Use

## Origins

Configuration languages emerged from the broader tradition of domain-specific languages, especially as software systems needed text-based ways to describe settings apart from source code. [^az6s8f] [^lu5c92] One early practical lineage is the INI-style configuration file, which a later review describes as emerging in the early 1980s with MS-DOS and early Windows as a flat, human-editable key-value format with sections. [^9csipq] Another important origin story is Lua: a historical account describes Lua as being born in 1993 at PUC-Rio’s Tecgraf laboratory to replace earlier configuration prototypes, and explicitly says, “Lua was not born as a scripting language. It was born as a configuration language.” [^ieh9gw]

A second origin stream comes from the formalization of modern configuration-focused DSLs. HCL is described as a toolkit for “creating structured configuration languages” that are “human- and machine-friendly,” and its purpose is contrasted with general data serialization formats like JSON and YAML. [^7vij7r] [^scasx7] TOML was introduced by Tom Preston-Werner in 2013 as a configuration file format, with sources emphasizing that it was designed to be obvious, minimal, and unambiguous for humans and machines alike. [^2q48id] [^9sgwqm] [^7953ru]

## Evolution

- **Early 1980s:** INI-style files established the baseline pattern for simple configuration: sections, key-value pairs, comments, and direct human editing. [^9csipq]
- **1993:** Lua was created at PUC-Rio’s Tecgraf laboratory as a configuration-oriented language for practical software deployment needs, later expanding beyond configuration into a general scripting language. [^ieh9gw]
- **2001–2013:** YAML and TOML responded to the limits of prior formats; YAML emphasized indentation-based readability and expressive serialization, while TOML positioned itself as a more formal, “standardized INI” with explicit typing and clear semantics. [^9csipq] [^9sgwqm] [^7953ru]

# Best Real-World Examples

- [HCL](https://developer.hashicorp.com/terraform/language) — [[HCL]] — a structured configuration language used by Terraform and related HashiCorp tools for infrastructure definitions. [^7vij7r] [^wyog7e] [^o1qetn]
- [TOML](https://toml.io/en/) — [[TOML]] — a configuration format designed to be easy for humans to read and unambiguous for machines to parse. [^2q48id] [^9sgwqm]
- [YAML](https://yaml.org/) — [[projects/Emergent-Innovation/Standards/YAML|YAML]] — a human-readable serialization language widely used for configuration files and structured deployment manifests. [^x7kfpk] [^9r85io] [^9csipq]
- [INI](https://en.wikipedia.org/wiki/INI_file) — the classic sectioned configuration format that influenced later simple config syntaxes. [^9csipq]
- [Lua](https://www.lua.org/) — [[Tooling/Software Development/Programming Languages/Lua|Lua]] — originally created as a configuration language at Tecgraf before becoming a general-purpose scripting language. [^ieh9gw]
- [JSON](https://www.json.org/) — [[projects/Emergent-Innovation/Standards/JSON|JSON]] — not a configuration language by origin, but widely repurposed for configuration because of its simplicity and ubiquity. [^9csipq] [^trf2t4]
- [Dhall](https://dhall-lang.org/) — [[Dhall]] — a typed configuration language often discussed in the same DSL family as HCL and Jsonnet. [^lu5c92]

# Case Studies

Lua is a strong case study because it shows a configuration language evolving into a broader programming language without losing its original design intuition. [^ieh9gw] In 1993, engineers at PUC-Rio’s Tecgraf lab were dealing with configuration files for software used across diverse machines, and they combined earlier prototypes into Lua to handle that need. [^ieh9gw] The later scripting ecosystem around Lua demonstrates what happens when a configuration language becomes powerful enough to absorb application logic, not just settings. [^ieh9gw] That history shows the conceptual border between “configuration language” and “programming language” is real but porous. [^ieh9gw]

TOML illustrates the opposite move: it narrowed the problem back down to a cleaner, more disciplined configuration format. [^2q48id] [^9sgwqm] [^7953ru] Tom Preston-Werner introduced it in 2013 as a human-readable alternative that aimed for obvious syntax, explicit types, and fewer semantic surprises than YAML-like formats. [^2q48id] [^9sgwqm] [^7953ru] The case shows that configuration languages often arise as reactions to complexity in earlier formats, and that one of their main design goals is reducing ambiguity for people who edit files by hand. [^9csipq] [^9sgwqm]

HCL shows how configuration languages can be specialized for infrastructure tooling rather than general software settings. [^7vij7r] [^wyog7e] [^o1qetn] HashiCorp describes HCL as a toolkit for building structured configuration languages, and commentary around it emphasizes blocks, attributes, and predictable structure for declarative infrastructure definitions. [^7vij7r] [^scasx7] Terraform then popularized HCL in the infrastructure-as-code workflow, making configuration language design a central part of cloud operations practice. [^wyog7e] [^o1qetn] This case shows that the most successful configuration languages are often shaped by the specific domain they serve, not by a desire to replace programming languages wholesale. [^lu5c92] [^o1qetn]

# Images

![Image 1](https://www.cs.hmc.edu/~fleck/envision/scheme48/module/img2.gif)
_Source: https://www.cs.hmc.edu/~fleck/envision/scheme48/module/node2.html_

![Image 2](https://www.cs.kent.ac.uk/people/staff/pfl/presentations/uksim/img007.gif)
_Source: https://www.cs.kent.ac.uk/people/staff/pfl/presentations/uksim/sld007.htm_

![Image 3](https://miro.medium.com/v2/resize:fit:1400/1*H_4diRd7XtPuBYiVTMLc7w.png)
_Source: https://itnext.io/can-configuration-languages-dsls-solve-configuration-complexity-eee8f124e13a_

![Image 4](https://www.codemag.com/Article/Image/0607051/Figure%201.gif)
_Source: https://www.codemag.com/article/0607051/Introducing-Domain-Specific-Languages_

![Image 5](https://www.kcl-lang.io/assets/images/01-declarative-config-51ae2a21d367db31feb7268107ee18c8.png)
_Source: https://www.kcl-lang.io/blog/2022-declarative-config-overview_


***

# Sources

[1]: [What is Terraform Configuration Language (HCL)](https://www.geeksforgeeks.org/devops/what-is-terraform-configuration-language-hcl/)
[2]: [What Are HCL and HOCON? Complete Beginner Guide](https://abacktools.com/blog/what-are-hcl-and-hocon)
[^2q48id]: [What is TOML? A practical guide to the config format](https://www.datamatastudios.com/blog/what-is-toml-config-format)
[^9sgwqm]: [What is TOML? — A practical reference | tomlkit.org](https://tomlkit.org/what-is-toml)
[^7vij7r]: [hcl](https://upd.dev/hashicorp/hcl)
[6]: [HCL: The HashiCorp Configuration Language Guide 2026](https://khimananda.com/blog/hcl-the-hashicorp-configuration-language)
[^7953ru]: [TOML Explained: Why It Beats YAML for Configuration Files](https://www.toml-tools.com/blog/toml-explained/)
[^x7kfpk]: [YAML Tutorial : A Complete Language Guide with Examples](https://spacelift.io/blog/yaml)
[9]: [HCL](https://langindex.dev/languages/hcl/)
[10]: [YAML](https://asdlc.io/concepts/yaml/)
[^9r85io]: [TOML vs YAML vs JSON: Choosing the Right Config Format](https://www.devtools.tools/blog/toml-config-explained)
[12]: [TOML Configuration: Syntax Guide, Validation & Best Practices [2026]](https://snaputils.tools/articles/toml-guide)
[13]: [TOML Specification | toml-lang/toml | DeepWiki](https://deepwiki.com/toml-lang/toml/2-toml-specification)
[14]: [Terraform Tutorial — HCL Syntax](https://timesofcloud.com/hashicorp/terraform/hcl-syntax/)
[15]: [HCL Guide: Syntax, Expressions & Patterns for Terraform](https://scalr.com/learning-center/the-developers-guide-to-hcl-part-1-introduction)
[16]: [YAML (Yet Another Markup Language) | Web Development Glossary](https://codedesign.ai/glossary/yaml-yet-another-markup-language)
[^9csipq]: [In Defense of YAML](https://opensource.posit.co/blog/2026-05-21_in-defense-of-yaml/)
[^ieh9gw]: [Lua Tables: The Configuration Format That Admits What It Is](https://vivianvoss.net/blog/lua-tables-config)
[19]: [Build software better, together](https://ithub.global.ssl.fastly.net/topics/yaml-alternative)
[20]: [Podlite comes to Perl: a lightweight block-based markup ...](https://www.perl.com/article/podlite-comes-to-perl-a-lightweight-block-based-markup-language-for-everyday-use/)
[21]: [markdown,.json, yml, and xml – what is the best content format for ...](https://blog.tech4teaching.net/markdown-json-yml-and-xml-what-is-the-best-content-format-for-both-human-and-ai/)
[22]: [VLESS Gaming Config - AI Prompt - DocsBot AI](https://docsbot.ai/prompts/technical/vless-gaming-config)
[23]: [SilverBullet Config 1.1.4 - AI Prompt - DocsBot AI](https://docsbot.ai/prompts/technical/silverbullet-config-114)
[24]: [What enables human language? A biocultural framework](https://www.science.org/doi/10.1126/science.adq8303)
[25]: [YAML (YAML Markup Language) 25 Mark Answer Guide](https://www.studocu.com/in/document/anna-university/devops/yaml-yaml-markup-language-25-mark-answer-guide/162353443?origin=related-document)
[26]: [Mapping the language-in-identity configuration in Hong ...](https://www.tandfonline.com/doi/full/10.1080/14790718.2025.2559184)
[27]: [ConfigLang: A Lightweight Configuration Language for Modern Applications](https://dev.to/hejhdiss/configlang-a-lightweight-configuration-language-for-modern-applications-3lgk)
[28]: [The Role of XML in modern configuration files (e.g., pom.xml, web.config)-XML/RSS Tutorial-php.cn](https://global.php.cn/faq/1796979679.html)
[29]: [Why YAML is the Best for Configuration Files | Megha Mishra posted ...](https://www.linkedin.com/posts/megha-mishra-b74a6b169_yaml-json-xml-activity-7381019083514830848-vqKl)
[30]: [What Goes Into Designing a Recipe Markup Language](https://cooklang.org/blog/37-designing-a-recipe-markup-language/)
[^az6s8f]: [configuration language](https://en.wiktionary.org/wiki/configuration_language)
[^wyog7e]: [kindatechnical () - Configuration Languages: HCL, Dhall, and ...](https://kindatechnical.com/compiler-design/configuration-languages-hcl-dhall-and-jsonnet.html)
[^lu5c92]: [Config DSLs: are we there yet?](https://samlaf.github.io/programming/config-dsls.html)
[^trf2t4]: [Introduction | KCL programming language.](https://www.kcl-lang.io/docs/user_docs/getting-started/intro)
[^w31ker]: [Dostosowywanie i rozszerzanie języka specyficznego dla domeny](https://learn.microsoft.com/pl-pl/visualstudio/modeling/customizing-and-extending-a-domain-specific-language?view=visualstudio)
[^o1qetn]: [The Config Language That Was Already There: A Ballistics ...](https://tinycomputers.io/posts/the-config-language-that-was-already-there.html)
[^scasx7]: [Getting Started with Domain-Specific Languages](https://learn.microsoft.com/en-us/visualstudio/modeling/getting-started-with-domain-specific-languages?view=visualstudio)
[38]: [Defining and Scoping a Feasible Domain-Specific Language Project ...](https://dev.to/serbyte/defining-and-scoping-a-feasible-domain-specific-language-project-for-bachelors-thesis-5a4f)
[39]: [Terraform HCL - HashiCorp Configuration Language Overview](https://phoenixnap.com/kb/terraform-hcl)
[40]: [Understanding Domain-Specific Languages - Isaac Olanrewaju](https://www.isaacolanrewaju.com/blog/understanding-domain-specific-languages/)
[41]: [Creating a Domain Specific Language with Roslyn](https://www.themacaque.com/2026/01/17/dsl-with-roslyn.html)
[42]: [Creare una soluzione per un linguaggio specifico di dominio](https://learn.microsoft.com/it-it/visualstudio/modeling/how-to-create-a-domain-specific-language-solution?view=visualstudio)
