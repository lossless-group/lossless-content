---
date_created: 2025-07-24
date_modified: 2025-08-09
site_uuid: 07334b50-5946-4d05-9771-3f48cba2f0e9
publish: true
title: sharedPromptService
slug: shared-prompt-service
at_semantic_version: 0.0.0.1
tags: [Microservices, Shared-Services]
---


## API

- API Endpoints:
    - POST /prompts: Upload a new prompt file.
    - GET /prompts/{id}: Retrieve a specific prompt.
    - PUT /prompts/{id}: Update an existing prompt.
    - SAVE /prompts/{id}: Save this version of an existing prompt.
    - DELETE /prompts/{id}: Delete a prompt.
    - POST /prompts/execute: Execute a prompt against the data from the [[projects/Augment-It/Specs/apps-microfrontends/RecordCollector|RecordCollector]], utilizing [[Vocabulary/Module Federation|Module Federation]] on to access AI search model and web crawler services.