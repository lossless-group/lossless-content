---
title: Running the Latest and Greatest LLM Locally
lede: Step-by-step guide for installing and configuring local LLMs—including Ollama, LiteLLM, Fabric, and Perplexica—for modern AI workflows and toolchains.
date_authored_initial_draft: 2025-04-18
date_authored_current_draft: 2025-04-23
date_authored_final_draft: null
date_first_published: null
date_last_updated: null
at_semantic_version: 0.0.0.1
status: In-Progress
augmented_with: Windsurf Cascade on GPT 4.1
category: Local-LLM
date_created: 2025-04-18
date_modified: 2025-04-23
site_uuid: 95289ec4-0dc2-4d96-a205-4cb5e64654f0
tags:
  - Local-LLM
  - AI-Toolkit
  - Home-Labs
authors:
  - Michael Staton
portrait_image: ""
image_prompt: A developer workstation with local AI models, terminal windows, and icons for Ollama, LiteLLM, Fabric, and Perplexica, all connected in a modern workflow diagram.
banner_image: ""
---

#### [[MSTY]]


#### [[Tooling/AI-Toolkit/AI Interfaces/OLlama]]
Install [[Tooling/AI-Toolkit/AI Interfaces/OLlama]]

```bash
curl -fsSL https://ollama.com/install.sh | sh
```

Install [[LiteLLM]]

#### [[Fabric]]

#### [[Perplexica]]
Depends on [[Tooling/AI-Toolkit/AI Interfaces/OLlama]] for the [[Local LLM|local gateway]], but also connects to [[Anthropic]], [[Tooling/AI-Toolkit/Model Producers/Groq|Groq]], and 
