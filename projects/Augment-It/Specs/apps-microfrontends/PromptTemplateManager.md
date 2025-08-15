---
date_created: 2025-02-24
date_modified: 2025-08-09
tags: [Specifications, Prompt-Engineering, Best-Practices]
site_uuid: a9719dbc-fac9-4ae4-8694-45c4b2cf5392
publish: true
title: PromptTemplateManager
slug: prompt-template-manager
at_semantic_version: 0.0.1.3
status: Active
category: Microfrontend
project: Data Augmenter
---

# Purpose

## Context in Monorepo

The [[projects/Augment-It/Specs/apps-microfrontends/PromptTemplateManager|PromptTemplateManager]] will be the second available module in the set and sequence of [[projects/Augment-It/Specs/Data Augmentation Workflow with Microfrontends|Data Augmentation Workflow with Microfrontends]]. 

The goal of the [[projects/Augment-It/Specs/Augment-It Monorepo Vision Specification|Augment-It Monorepo]] is to transform and augment a set of records by using various AI services.  For instance, [[concepts/Explainers for AI/AI-Powered Search|AI-Powered Search]] models, [[concepts/Explainers for AI/AI Powered Data Capture|AI Powered Data Capture]] techniques, such as [[concepts/Explainers for AI/AI Web Crawlers|AI Web Crawlers]] and [[Vocabulary/Web Scraping|Web Scrapers]] through their respective APIs. 

By properly integrating the [[projects/Augment-It/Specs/apps-microfrontends/PromptTemplateManager|PromptTemplateManager]] with the [[projects/Augment-It/Specs/apps-microfrontends/RecordCollector|RecordCollector]], we better ensure prompts well leverage AI capabilities and augment specific customer data effectively.


```mermaid
graph TD
    subgraph "PromptTemplateManager"
        A[UI Layer] -->|Manages| B[Template Editor]
        A -->|Manages| C[Variable Mapper]
        A -->|Manages| D[Template Library]
        B -->|Uses| E[MDX Editor]
        C -->|Pulls from| F[RecordCollector API]
        D -->|Stores| G[Template Storage]
    end
    
    subgraph "External Systems"
        F -->|Provides| H[Customer Data]
        I[AI Services] -->|Receives| J[Populated Templates]
    end
    
    C -->|Maps variables to| B
    B -->|Saves to| D
    D -->|Loads to| B
    D -->|Sends populated templates to| I
    F -->|Syncs with| H
```


## Functionality of PromptTemplateManager

The [[projects/Augment-It/Specs/apps-microfrontends/PromptTemplateManager|PromptTemplateManager]] will provide functionalities to allow users to upload prompts, author new ones, and insert _managed variables_ called from the records made available from the [[projects/Augment-It/Specs/apps-microfrontends/RecordCollector|RecordCollector]]. 

> The **_initial use case_** is using the [[projects/Augment-It/Specs/apps-microfrontends/RecordCollector|RecordCollector]] to pull records from the CRM system about customers.  

This data may be mediated through [[Tooling/Data Utilities/DataBricks|DataBricks]] (or another data aggregator service).

The [[projects/Augment-It/Specs/apps-microfrontends/PromptTemplateManager|PromptTemplateManager]] shall be the tool that empowers users to select,  generate, and iterate on _meaningful_ prompts likely to have the best results.  These prompts will specifically make easy the addition of  _fields as variables_ to allow the generation of customer specific prompts from a template. 

The [[projects/Augment-It/Specs/apps-microfrontends/PromptTemplateManager|PromptTemplateManager]] will enable the users to select the most appropriate prompt to send to the [[projects/Augment-It/Specs/apps-microfrontends/RequestReviewer|RequestReviewer]], which may or may not be the one they were just creating, working on, or saved to disk. 

**APIs:**
        - AI Search Model: An API endpoint (REST or WebSocket) to send prompts and receive search results.
        - Web Crawler Service: An API endpoint for triggering web crawls based on provided parameters (e.g., target URLs, variables).

The [[projects/Augment-It/Specs/apps-microfrontends/PromptTemplateManager|PromptTemplateManager]] gives users the tools to 
1) Create prompts templates _with variables_ from the current set of records loaded in the [[projects/Augment-It/Specs/apps-microfrontends/RecordCollector|RecordCollector]] through **Variable Mapping:** mapping variables from current systems into the prompt templates before execution.
	1) See available variables from the [[projects/Augment-It/Specs/apps-microfrontends/RecordCollector|RecordCollector]], available via API.  
	2) Enter a [[Vocabulary/WYSIWYG]] editor for crafting custom prompts with syntax highlighting and auto-completion for supported languages (like Python, JavaScript). a [[Tooling/Software Development/Frameworks/Web Frameworks/MDX|MDX]] editor to write prompts. 
		1) Variable Management: Interface to map variables from records available from the [[projects/Augment-It/Specs/apps-microfrontends/RecordCollector|RecordCollector]] into the prompt template, possibly using a _drag-and-drop_ or _input field-based_ system.
	3) Upload markdown or mdx files.
	4) Save prompt templates that have valid variable syntax. 
2) Search, filter, and select saved prompts. 
3) **Prompt Validation:** Ensure prompts are syntactically correct and adhere to security guidelines.


# 3. Goals & Non-Goals  
### Goals  
- PromptTemplateManager uses a standard templating syntax to apply data from the [[projects/Augment-It/Specs/apps-microfrontends/RecordCollector|RecordCollector]] to a PromptTemplate, resulting in a filled out template on a per-record basis. 
- Users can create, delete, and update PromptTemplates
  
### Non-Goals  
- Does not send to AI Model APIs, nor evaluate responses. 


# Technical Design
 
Front-end Framework: [[Tooling/Software Development/Frameworks/Web Frameworks/React|React]]
Back-end Framework: [[Tooling/Software Development/Frameworks/Web Frameworks/NEXT.js|NEXT.js]]
Container system: [[Tooling/Software Development/Developer Experience/DevOps/Docker|Docker]]

Pulls data from: [[projects/Augment-It/Specs/apps-microfrontends/RecordCollector|RecordCollector]]
Makes prompts available for [[projects/Augment-It/Specs/apps-microfrontends/RequestReviewer|RequestReviewer]]

Window to [[projects/Augment-It/Specs/apps-microfrontends/PromptTemplateManager|PromptTemplateManager]] available in [[projects/Augment-It/Specs/host-shell-ui/MainContainerUI|MainContainerUI]]


```mermaid
sequenceDiagram
    participant User
    participant UI as PromptTemplateManager UI
    participant BE as Backend Service
    participant RC as RecordCollector
    participant DB as Template Database
    
    User->>UI: Create/Edit Template
    UI->>RC: Request Available Variables
    RC-->>UI: Return Variable List
    UI->>User: Show Variable Palette
    User->>UI: Design Template with Variables
    UI->>BE: Save Template
    BE->>DB: Store Template
    DB-->>BE: Confirm Save
    BE-->>UI: Save Confirmation
    
    User->>UI: Select Template & Record
    UI->>RC: Request Record Data
    RC-->>UI: Return Record Data
    UI->>BE: Request Template Population
    BE->>BE: Merge Variables
    BE-->>UI: Return Populated Template
    UI->>User: Show Preview
```


## Components
[[projects/Augment-It/Specs/2_PromptTemplate-Manager-Src/ListColumn--Prompts|ListColumn--Prompts]]
[[projects/Augment-It/Specs/2_PromptTemplate-Manager-Src/ListItem--Prompt|ListItem--Prompt]]

### Shared Components
[[projects/Augment-It/Specs/shared-ui-elements/Shared_Multi-Search-Filter-Src/Shared_Search-Container]]
[[projects/Augment-It/Specs/shared-ui-elements/Shared_Multi-Search-Filter-Src/Shared_Filter-Container]]
[[projects/Augment-It/Specs/shared-ui-elements/Shared_Multi-Search-Filter-Src/Shared_Filter-Dropdown]]
[[projects/Augment-It/Specs/shared-ui-elements/Shared_Content-Editors/Shared_Prompt-Template-Editor]]
	[[projects/Augment-It/Specs/shared-ui-elements/Shared_Content-Editors/Shared_MDX-Editor]]
	[[SharedJsonEditor]]
[[projects/Augment-It/Specs/shared-ui-elements/Shared_Single-Column-Layout/Shared_List-Column_Layout|Shared_List-Column_Layout]]
[[projects/Augment-It/Specs/shared-ui-elements/Shared_Single-Column-Layout/Shared_List-Row|Shared_List-Row]]

# Open Questions
How will we handle saving? 

# Comprehensive Wish List

Attribution of prompts to User Accounts.  Filter prompts by team.  Limit prompts to being visible and usable by team, lists of other users, and the organization (verified by email).

[[concepts/Version Control|Source Control Management]], [[concepts/Version Control|Version Control]]

**Error Collection:** Collects errors associated with a specific prompt. 



