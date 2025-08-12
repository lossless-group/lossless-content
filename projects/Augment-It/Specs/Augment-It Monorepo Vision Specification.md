---
date_created: 2025-02-24
date_modified: 2025-08-10
site_uuid: bcb620da-8fa4-4eab-b0b8-09b9634dfab2
publish: true
title: Augment-It Monorepo
slug: augment-it-vision
at_semantic_version: 0.0.0.1
aliases: [Augment-It, Augment It]
tags: [Monorepos]
---

![Augment-It Working Banner Image](https://i.imgur.com/JFdSlQt.png)

# Vision

To use [[concepts/Explainers for AI/AI Web Research|AI Web Research]] , [[Vocabulary/Large Language Models|Large Language Models]], and [[concepts/Explainers for AI/AI Powered Data Capture|AI Powered Data Capture]] to augment basic data sets.  These augmentations will need a workflow that involves a set of tools, each with their own purpose as part of the multi-step workflow.  

## Microservices and Microfrontends Architecture

Each one of the steps of the data augmentation workflow can be thought of as its own application, as it should. 

We need to use [[Tooling/Software Development/Developer Experience/DevOps/Docker|Docker]] and [[Vocabulary/Module Federation|Module Federation]], and because [[Tooling/Software Development/Frameworks/Web Frameworks/React|React]] goes with [[Tooling/Software Development/Frameworks/Web Frameworks/NEXT.js|NEXT.js]], and [[Tooling/Software Development/Frameworks/Web Frameworks/NEXT.js|NEXT.js]] needs [[Tooling/Software Development/Developer Experience/DevTools/Vite|Vite]], 

![[projects/Augment-It/Specs/Augment-It_Visual-Specification.canvas|Augment-It_Visual-Specification]]
### Tech Stack Considerations
TypeScript, WebSockets or REST APIs for communication with microfrontend and other services, and a suitable database (like PostgreSQL or MongoDB) for storage.

1. **Module Federation**
    
    We will use [[Vocabulary/Module Federation|Module Federation]] to share components and logic between the main app and the [[Vocabulary/Microfrontend Architecture|Microfrontends]]. This approach allows us to maintain a modular architecture while enabling seamless interaction between parts of the system.
    
    - **Key Implementation Details:**
	    - Likely going with [[Tooling/Software Development/Developer Experience/DevTools/Turborepo|Turborepo]] by [[Tooling/Software Development/Cloud Infrastructure/Vercel|Vercel]] since we are hosting on Vercel and 
        - Define shared providers (like AI search model, web crawler, or CRM data access) that can be consumed by both the main application and the Prompt Manager microfrontend.
        - Implement communication patterns (e.g., using Events or Remote Procedure Calls) to facilitate interaction between federation providers.

# Version 1
1. [[projects/Augment-It/Specs/host-shell-ui/MainContainerUI|MainContainerUI]]
	1. [[projects/Augment-It/Specs/apps/RecordCollector|RecordCollector]]
	2. [[projects/Augment-It/Specs/apps/PromptTemplateManager|PromptTemplateManager]]
	3. [[projects/Augment-It/Specs/apps/RequestReviewer|RequestReviewer]]
	4. [[projects/Augment-It/Specs/apps/ResponseReviewer|ResponseReviewer]]
	5. [[projects/Augment-It/Specs/apps/HighlightCollector|HighlightCollector]]
	6. [[projects/Augment-It/Specs/apps/InsightAssembler|InsightAssembler]]

The [[projects/Augment-It/Specs/host-shell-ui/MainContainerUI|MainContainerUI]] is a [[Vocabulary/Front-End|Front-End]] that enables users to work through various [[Vocabulary/Microfrontend Architecture|Microfrontends]]  as part of a [[concepts/Data Augmentation Workflow|Data Augmentation Workflow]].

# Open Questions
How to share API Keys and other secure info.

[[Vocabulary/Loosely Coupled Monolith|Loosely Coupled Monolith]]
[[Vocabulary/Islands Architecture|Islands Architecture]]
# Fully Built Out Specification
