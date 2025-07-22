---
date_created: 2025-03-24
date_modified: 2025-07-22
tags: [Model-APIs, LLM-Gateways, API-based-Services]
site_uuid: 38562a36-1195-4b00-acbf-37b67d6f3ced
publish: true
title: "Successfully Connecting To AI Model Vendors"
lede: "Connect to AI Model vendors via API"
slug: successfully-connecting-to-ai-model-vendors
at_semantic_version: 0.0.0.1
---

Made connection example for [[Tooling/AI-Toolkit/Model Producers/Groq|Groq]] with sample response object. 

Installed the [[Tooling/AI-Toolkit/Model Producers/OpenAI|OpenAI]] [[Vocabulary/SDK|SDK]] from [the SDK page in Open AI's documentation](https://platform.openai.com/docs/libraries).
```bash
pnpm install openai
```

They give a model request:
```javascript
import OpenAI from "openai";
const client = new OpenAI();

const completion = await client.chat.completions.create({
    model: "gpt-4o",
    messages: [
        {
            role: "user",
            content: "Write a one-sentence bedtime story about a unicorn.",
        },
    ],
});

console.log(completion.choices[0].message.content);
```

Logged [[organizations/Perplexity AI|Perplexity AI]] call and response. 