---
date_created: 2025-02-24
date_modified: 2025-07-24
site_uuid: bcb620da-8fa4-4eab-b0b8-09b9634dfab2
publish: true
title: Laugment Monorepo
slug: laugment-monorepo-vision
at_semantic_version: 0.0.0.1
---
# Version 1
1. [[client-content/Laerdal/Projects/Laugment/Data-Augmenter-Specification/MainContainerUI|MainContainerUI]]
	1. [[client-content/Laerdal/Projects/Laugment/Data-Augmenter-Specification/RecordCollector|RecordCollector]]
	2. [[client-content/Laerdal/Projects/Laugment/Data-Augmenter-Specification/PromptManager|PromptManager]]
	3. [[client-content/Laerdal/Projects/Laugment/Data-Augmenter-Specification/RequestReviewer|RequestReviewer]]

# Ultimate Vision

To use [[AI Web Research]], [[Vocabulary/Large Language Models|Large Language Models]], and [[concepts/Explainers for AI/AI Powered Data Capture|AI Powered Data Capture]] to augment basic data sets.  These augmentations will need a workflow that involves a set of tools, each with their own purpose as part of the multi-step workflow.  

## Microservices and Microfrontends Architecture

Each one of the steps of the data augmentation workflow can be thought of as its own application, as it should. 
