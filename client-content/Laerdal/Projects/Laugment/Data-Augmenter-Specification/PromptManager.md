---
date_created: 2025-02-24
date_modified: 2025-07-24
tags: [Specifications]
site_uuid: a9719dbc-fac9-4ae4-8694-45c4b2cf5392
publish: true
title: PromptManager
slug: prompt-manager
at_semantic_version: 0.0.0.1
---

## Purpose
The [[client-content/Laerdal/Projects/Laugment/Data-Augmenter-Specification/PromptManager|PromptManager]] gives users the tools to 
1) Create prompts _with variables_ from the current set of records loaded in the [[client-content/Laerdal/Projects/Laugment/Data-Augmenter-Specification/RecordCollector|RecordCollector]]
	1)  use a [[Tooling/Software Development/Frameworks/Web Frameworks/MDX|MDX]] editor to generate prompts. 
	2) upload markdown or mdx files, or 
2) Search, filter, and select saved prompts. 

## Components
[[client-content/Laerdal/Projects/Laugment/Data-Augmenter-Specification/PromptManagerSrc/ListItem--Prompt|ListItem--Prompt]]


### Shared Components
[[SearchContainer]]
[[FilterContainer]]
[[FilterDropdown]]
[[PromptEditor]]
	[[MdxEditor]]
	[[JsonEditor]]
[[List]]
[[ListRow]]



