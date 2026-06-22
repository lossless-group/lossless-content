---
site_uuid: 124f0c8d-09ac-48e3-b68f-ddc48570cd7a
date_modified: 2026-06-17
date_created: 2025-01-30
tags: [AI-Toolkit, Explainers, Best-Practices]
title: Prompt Engineering
slug: prompt-engineering
at_semantic_version: 0.0.0.1
---
<blockquote class="twitter-tweet"><p lang="en" dir="ltr">OpenAI, Anthropic, and Google AI engineers use 10 internal prompting techniques that guarantee near-perfect accuracy…and nobody outside the labs is supposed to know them.<br><br>Here are 10 of them (Save this for later): <a href="https://t.co/clWkf4BbZm">pic.twitter.com/clWkf4BbZm</a></p>&mdash; Alex Prompter (@alex_prompter) <a href="https://twitter.com/alex_prompter/status/2004222951084941600?ref_src=twsrc%5Etfw">December 25, 2025</a> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script></blockquote>

One of the core skill sets of [[Vocabulary/Vibe Coding|Vibe Coding]], involving [[concepts/Explainers for AI/Vibe Planning|Vibe Planning]], and now [[concepts/Explainers for AI/Context Engineering|Context Engineering]]
https://youtu.be/uDIW34h8cmM?si=upMFFu1o3aMG-8_E

https://youtu.be/-5zFZznthw0?si=8DNvtpVgVSZ98W9K/

https://youtu.be/WnBx1Vi7M6w?si=kvFkmwW4GM3svrAs

https://youtu.be/TNwJ1LMiENk?is=kkmdKdO5IcENKnT6


***
> [!info] **Perplexity Query** (2025-12-26T02:17:24.220Z)
> **Question:**
> What is Prompt Engineering?  What are the best practices at this very moment, December 2025?  How has it evolved since the advent of AI Assisted Coding and Vibe Coding?
> 
> **Model:** sonar-pro
> 

**Prompt engineering** is the process of crafting and refining inputs—known as prompts—to guide large language models (LLMs) and generative AI toward producing accurate, relevant, and high-quality outputs. [^zmih6f] [^xaiba8] [^e75puw]

### Best Practices in December 2025
Current best practices emphasize structured techniques, context management, and iterative optimization to maximize AI performance while minimizing errors like hallucinations or biases. Key methods include:

- **Zero-shot prompting**: Provide direct instructions without examples for simple tasks. [^xb41nl]
- **Few-shot prompting**: Include a few examples to guide outputs for more complex scenarios. [^xb41nl]
- **Chain-of-thought (CoT) prompting**: Break down reasoning into step-by-step intermediates to improve accuracy on logic-heavy tasks. [^xaiba8] [^xb41nl] ![Relevant diagram or illustration related to the topic](https://promptengineering.org/content/images/2023/09/What-is-Prompt-Engineering.png)
- **Prompt chaining**: Split complex tasks into subtasks, using outputs sequentially for reliability. [^xb41nl]
- **Complexity-based prompting**: Run multiple [[Vocabulary/Chain of Thought|CoT]] rollouts, favoring longest chains that converge on common conclusions. [^xaiba8]
- **Generated knowledge prompting**: First generate relevant facts, then use them to complete the task for higher quality. [^xaiba8]
- Advanced operational practices: Token budgeting, provenance tags, context versioning, logging, and regression tests to treat the context window as an engineered surface. [^e75puw]

![Practical example or use case visualization](https://colaninfotech.com/wp-content/uploads/2025/05/element-of-prompt-engineering.jpg) For instance, in a chatbot, wrap vague user input like "Where to purchase a shirt" in a detailed prompt specifying role, location, and response format to yield precise results. [^xaiba8]

Prompt engineers build reusable libraries through trial-and-error, enhancing user experience, flexibility, and domain expertise (e.g., medical diagnostics). [^xaiba8]

### Evolution Since AI-Assisted Coding and Vibe Coding
Prompt engineering emerged with early LLMs around 2022, focusing on basic natural language instructions as a "soft skill" alternative to traditional coding. [^zmih6f] AI-assisted coding (e.g., [[Tooling/AI-Toolkit/Generative AI/Code Generators/GitHub Copilot|GitHub Copilot]], post-2021) integrated prompts into code generation, evolving it toward structured templates for developers. [^xaiba8]

By mid-2025, "[[Vocabulary/Vibe Coding|Vibe Coding]]"—an informal shift toward intuitive, high-level "vibe-based" prompts (e.g., "make it feel modern and efficient") enabled by advanced models—reduced rigid syntax needs, prioritizing creativity over precision. [^e75puw] This led to **context engineering**, a matured form per a July 2025 survey: systematic retrieval/generation/processing/management of context, with observability to prevent regressions. [^e75puw]

![Additional supporting visual content](https://images.ctfassets.net/lzny33ho1g45/7CNpHEDpS10XH6Vj0VF4u5/c9f8303b813b64145a55858eeb4dfa16/Group_12494.jpg) Overall, it has shifted from trial-and-error artistry to a rigorous engineering discipline, bridging human intent and AI via reusable, scalable systems amid rising demand for prompt engineer roles. [^xaiba8] [^e75puw]



![[IMG_1923.png]]

https://youtu.be/_2fu56Vqk6M?si=z9q4V8jk3-KXD2o_

https://youtu.be/7P_qVERMNP4?si=ngtilassUvhwwkQw

https://youtu.be/EWvNQjAaOHw?si=BmAuLTFAn4SOsvq8

https://youtu.be/KvSZE4V6ID4?si=FOChIAFxefkGRzMs

https://youtu.be/5ChkQKUzDCs?si=NNj4Mvd4Y0lvKN0i

https://youtu.be/yk8DvWjFOKg?si=VRvItAwxk2EWWotH

https://youtu.be/hh1nOX14TyY?si=fuWGNXR6i1I2Jmcm

https://youtu.be/ZlQHPt86h6s?si=y3JjRoTsuR-jAfK_

### Q&A Strategy Prompt
https://youtu.be/5ChkQKUzDCs?si=NNj4Mvd4Y0lvKN0i

### Pros & Cons Prompt


### Stepwise Chain of Thought Prompt


### Role Prompt



### Citations

[^zmih6f]: 2025, Dec 25. [The Ultimate Guide to Prompt Engineering in 2025 - Lakera](https://www.lakera.ai/blog/prompt-engineering-guide). Published: 2025-12-18 | Updated: 2025-12-25

[^xaiba8]: 2025, Dec 25. [What is Prompt Engineering? - AWS](https://aws.amazon.com/what-is/prompt-engineering/). Published: 2025-12-18 | Updated: 2025-12-25

[^xb41nl]: 2025, Dec 25. [What Is Prompt Engineering? Definition and Examples - Coursera](https://www.coursera.org/articles/what-is-prompt-engineering). Published: 2025-06-25 | Updated: 2025-12-25

[^e75puw]: 2025, Dec 21. [Prompt engineering - Wikipedia](https://en.wikipedia.org/wiki/Prompt_engineering). Published: 2021-10-20 | Updated: 2025-12-21

[5]: 2025, Dec 25. [Prompt Engineering for AI Guide | Google Cloud](https://cloud.google.com/discover/what-is-prompt-engineering). Published: 2025-12-22 | Updated: 2025-12-25

[6]: 2025, Dec 25. [What Is Prompt Engineering in Design? — updated 2025 | IxDF](https://www.interaction-design.org/literature/topics/prompt-engineering). Published: 2023-12-15 | Updated: 2025-12-25

[7]: 2025, Dec 15. [What Is Prompt Engineering? | IBM](https://www.ibm.com/think/topics/prompt-engineering). Published: 2025-07-24 | Updated: 2025-12-15

[8]: 2025, Dec 25. [Prompt Engineering: The Art of Getting What You Need From ...](https://iac.gatech.edu/featured-news/2024/02/AI-prompt-engineering-ChatGPT). Published: 2025-02-01 | Updated: 2025-12-25

[9]: 2025, Dec 23. [Effective Prompts for AI: The Essentials](https://mitsloanedtech.mit.edu/ai/basics/effective-prompts/). Published: 2025-05-30 | Updated: 2025-12-23



***
