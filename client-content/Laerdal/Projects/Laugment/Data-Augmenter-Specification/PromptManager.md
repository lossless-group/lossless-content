---
date_created: 2025-02-24
date_modified: 2025-07-24
tags: [Specifications, Prompt-Engineering, Best-Practices]
site_uuid: a9719dbc-fac9-4ae4-8694-45c4b2cf5392
publish: true
title: PromptManager
slug: prompt-manager
at_semantic_version: 0.0.0.1
---

## Purpose
The [[client-content/Laerdal/Projects/Laugment/Data-Augmenter-Specification/PromptManager|PromptManager]] will provide functionalities to allow users to upload prompts, author new ones, and insert _managed variables_ called from the records made available from the [[client-content/Laerdal/Projects/Laugment/Data-Augmenter-Specification/RecordCollector|RecordCollector]]. 

> The **_initial use case_** is using the [[client-content/Laerdal/Projects/Laugment/Data-Augmenter-Specification/RecordCollector|RecordCollector]] to pull records from the CRM system about customers.  

This data may be mediated through [[Tooling/Data Utilities/DataBricks|DataBricks]] (or another data aggregator service).

The [[client-content/Laerdal/Projects/Laugment/Data-Augmenter-Specification/PromptManager|PromptManager]] shall be the tool that empowers users to select,  generate, and iterate on _meaningful_ prompts likely to have the best results.  These prompts will specifically make easy the addition of  _fields as variables_ to allow the generation of customer specific prompts from a template. 

The Prompt Manager will be enable the users to select the most appropriate prompt to send to the [[client-content/Laerdal/Projects/Laugment/Data-Augmenter-Specification/RequestReviewer|RequestReviewer]]. 

interact with existing services like [[concepts/Explainers for AI/AI-Powered Search|AI-Powered Search]] models and [[concepts/Explainers for AI/AI Powered Data Capture|AI Powered Data Capture]] techniques, such as using [[AI Web Crawlers]] and [[Vocabulary/Web Scraping|Web Scrapers]] through their respective APIs. This integration ensures that the prompt execution can leverage realtime search capabilities and augment customer data effectively.

**APIs:**
        - AI Search Model: An API endpoint (REST or WebSocket) to send prompts and receive search results.
        - Web Crawler Service: An API endpoint for triggering web crawls based on provided parameters (e.g., target URLs, variables).

The [[client-content/Laerdal/Projects/Laugment/Data-Augmenter-Specification/PromptManager|PromptManager]] gives users the tools to 
1) Create prompts _with variables_ from the current set of records loaded in the [[client-content/Laerdal/Projects/Laugment/Data-Augmenter-Specification/RecordCollector|RecordCollector]]
	1) See available variables from the [[client-content/Laerdal/Projects/Laugment/Data-Augmenter-Specification/RecordCollector|RecordCollector]], available via API.  
	2) Enter a [[Vocabulary/WYSIWYG]] editor for crafting custom prompts with syntax highlighting and auto-completion for supported languages (like Python, JavaScript). a [[Tooling/Software Development/Frameworks/Web Frameworks/MDX|MDX]] editor to write prompts. 
		1) Variable Management: Interface to map variables from records available from the [[client-content/Laerdal/Projects/Laugment/Data-Augmenter-Specification/RecordCollector|RecordCollector]] into the prompt template, possibly using a _drag-and-drop_ or _input field-based_ system.
	3) Upload markdown or mdx files.
	4) Save prompt templates that have valid variable syntax. 
2) Search, filter, and select saved prompts. 

**Prompt Validation:** Ensure prompts are syntactically correct and adhere to security guidelines.
**Variable Mapping:** Map variables from CRM records into the prompt templates before execution.


**Error Collection:** Collects errors associated with a specific prompt. 
## Components
[[client-content/Laerdal/Projects/Laugment/Data-Augmenter-Specification/PromptManagerSrc/ListColumn--Prompts|ListColumn--Prompts]]
[[client-content/Laerdal/Projects/Laugment/Data-Augmenter-Specification/PromptManagerSrc/ListItem--Prompt|ListItem--Prompt]]



### Shared Components
[[SharedSearchContainer]]
[[FilterContainer]]
[[FilterDropdown]]
[[PromptEditor]]
	[[MdxEditor]]
	[[JsonEditor]]
[[List]]
[[ListRow]]



