---
title: Running the Latest and Greatest LLM Locally
lede: Step-by-step guide for installing and configuring local LLMs—including Ollama, LiteLLM, Fabric, and Perplexica—for modern AI workflows and toolchains.
date_reported: 2025-04-18
date_resolved: 2025-04-23
date_last_updated: null
at_semantic_version: 0.0.0.1
status: "Open"
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
portrait_image: https://ik.imagekit.io/xvpgfijuw/uploads/lossless/issue-resolutions/2025-05-05_portrait_image_Running-the-latest-and-greatest-LLM-locally_b333d0ad-a426-4126-b4fc-8f910e904ba4_NrzwH0BoE.webp
image_prompt: A developer workstation with local AI models, terminal windows, and icons for Ollama, LiteLLM, Fabric, and Perplexica, all connected in a modern workflow diagram.
banner_image: https://ik.imagekit.io/xvpgfijuw/uploads/lossless/issue-resolutions/2025-05-05_banner_image_Running-the-latest-and-greatest-LLM-locally_fcaf7568-f5f3-4301-af51-034848fbfab1_JneCH1LUv.webp
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
