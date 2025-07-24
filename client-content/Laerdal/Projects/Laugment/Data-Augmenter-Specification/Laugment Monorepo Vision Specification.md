---
date_created: 2025-02-24
date_modified: 2025-07-24
site_uuid: bcb620da-8fa4-4eab-b0b8-09b9634dfab2
publish: true
title: Laugment Monorepo
slug: laugment-monorepo-vision
at_semantic_version: 0.0.0.1
aliases: [Laugment Monorepo, Laugment, Data Augmenter]
---
How to share API Keys and other secure info.

# Vision

To use [[concepts/Explainers for AI/AI Web Research]], [[Vocabulary/Large Language Models|Large Language Models]], and [[concepts/Explainers for AI/AI Powered Data Capture|AI Powered Data Capture]] to augment basic data sets.  These augmentations will need a workflow that involves a set of tools, each with their own purpose as part of the multi-step workflow.  

## Microservices and Microfrontends Architecture

Each one of the steps of the data augmentation workflow can be thought of as its own application, as it should. 

We need to use [[Tooling/Software Development/Developer Experience/DevOps/Docker|Docker]] and [[Vocabulary/Module Federation|Module Federation]], and because [[Tooling/Software Development/Frameworks/Web Frameworks/React|React]] goes with [[Tooling/Software Development/Frameworks/Web Frameworks/NEXT.js|NEXT.js]], and [[Tooling/Software Development/Frameworks/Web Frameworks/NEXT.js|NEXT.js]] needs [[Tooling/Software Development/Developer Experience/DevTools/Vite|Vite]], 

### Tech Stack Considerations
TypeScript, WebSockets or REST APIs for communication with microfrontend and other services, and a suitable database (like PostgreSQL or MongoDB) for storage.

1. **Module Federation**
    
    We will use [[Vocabulary/Module Federation|Module Federation]] to share components and logic between the main app and the [[Vocabulary/Microfrontend Architecture|Microfrontends]]. This approach allows us to maintain a modular architecture while enabling seamless interaction between parts of the system.
    
    - **Key Implementation Details:**
        - Use the [[Tooling/Software Development/Programming Languages/Libraries/Webpack]] 5 Module Federation Plugin for sharing components, services, and state management between apps or feature modules.
        - Define shared providers (like AI search model, web crawler, or CRM data access) that can be consumed by both the main application and the Prompt Manager microfrontend.
        - Implement communication patterns (e.g., using Events or Remote Procedure Calls) to facilitate interaction between federation providers.

# Version 1
1. [[client-content/Laerdal/Projects/Laugment/Data-Augmenter-Specification/MainContainerUI|MainContainerUI]]
	1. [[client-content/Laerdal/Projects/Laugment/Data-Augmenter-Specification/RecordCollector|RecordCollector]]
	2. [[client-content/Laerdal/Projects/Laugment/Data-Augmenter-Specification/PromptTemplateManager|PromptTemplateManager]]
	3. [[client-content/Laerdal/Projects/Laugment/Data-Augmenter-Specification/RequestReviewer|RequestReviewer]]
	4. [[client-content/Laerdal/Projects/Laugment/Data-Augmenter-Specification/ResponseReviewer|ResponseReviewer]]
	5. [[client-content/Laerdal/Projects/Laugment/Data-Augmenter-Specification/HighlightCollector|HighlightCollector]]
	6. [[client-content/Laerdal/Projects/Laugment/Data-Augmenter-Specification/InsightManager|InsightManager]]

The [[client-content/Laerdal/Projects/Laugment/Data-Augmenter-Specification/MainContainerUI|MainContainerUI]] is a [[Vocabulary/Front-End|Front-End]] that enables users to work through various [[Vocabulary/Microfrontend Architecture|Microfrontends]]  as part of a [[concepts/Data Augmentation Workflow|Data Augmentation Workflow]].

# Fully Built Out Specification
