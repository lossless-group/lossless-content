---
date_created: 2025-07-01
date_modified: 2026-08-23
tags:
  - Explainers
  - Conceptual-Frameworks
  - Lossless-Thinking
  - Trending-Lingo
site_uuid: 127bc2a9-cfd7-41e6-abcb-0f2a65b3b06d
publish: true
title: Non-Determinism
slug: non-determinism
at_semantic_version: 0.0.0.1
for_clients:
  - Laerdal
  - Param
  - FullStackVC
  - Lossless
cf_last_run: 2026-08-23T08:06:30.507Z
cf_last_run_model: Perplexity sonar-pro
---


https://youtu.be/_590TxMwvWM?is=1eVqpBcNIsnryjQ1

https://youtu.be/OSJJYWaxkKQ?is=nYGDqtZTjcjKmxwP

[[Tooling/AI-Toolkit/Model Producers/Thinking Machines|Thinking Machines]]
[[concepts/Explainers for AI/Slop|AI Slop]]
[[concepts/Explainers for AI/AI Hallucinations|AI Hallucinations]]

_“Non-determinism” in LLMs usually means the same prompt can yield different outputs across runs, but the term often bundles together several distinct causes._ In practice, people use it to describe variation from sampling, floating-point and hardware effects, batching, and other implementation details rather than a single mathematical property of the model itself. [^q55qr1] [^zo5kip] [^vi95p7]

# Defining and Describing Non-Determinism (in LLMs, AI)

- ![Diagram showing deterministic model output versus stochastic decoding and implementation variability in LLM inference](https://substackcdn.com/image/fetch/$s_!Vjqd!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F2d3afdb6-e13f-443d-834e-8cb51c662dff_1460x800.png)
- **Non-determinism** in this context is the property that a system can produce different outputs from the same input under identical or near-identical conditions. [^fz2zhz] [^2r9nlr]
- In LLM discussions, the word is often used more loosely to mean that “the same question twice” may not return the same answer, even when the user sees no obvious change in the prompt. [^1v7a49] [^wzw5yv]
- The concept matters because reproducibility, debugging, evaluation, and safety all depend on whether a model’s output can be made stable across runs. [^q55qr1] [^zo5kip] [^wey4yn]

# Uses in Context

- In AI engineering, “non-determinism” often refers to *run-to-run nondeterminism*, where executing the same inference path twice yields different results. [^q55qr1]
- In generative AI writing, the term is used to explain why an LLM can answer differently on repeated prompts, especially when sampling is involved. [^1v7a49] [^wzw5yv]
- In enterprise AI discussions, writers distinguish the model’s probabilistic behavior from the broader system property of non-determinism, arguing that the latter is a design and infrastructure issue, not just a model trait. [^2r9nlr]
- In technical analysis, researchers and practitioners use the phrase to describe divergence that can appear even at nominal temperature \(T=0\), suggesting implementation-dependent variation beyond explicit sampling. [^7xc14e]
- In product and workflow design, “non-deterministic” is often contrasted with *controlled stochasticity*: some randomness is tolerated for creativity, but predictability is required for business-critical steps. [^lsit0f] [^wey4yn]

# History of Use

## Origins

- The broader term **non-deterministic** long predates LLMs and comes from computer science and formal methods, where a nondeterministic machine or algorithm is defined in contrast to a deterministic one that always produces the same output for the same input. [^q55qr1] [^n9a6xz]
- In the LLM era, the phrase became common in practitioner writing to describe inference variability; one technical post defines it as the case where “the same kernel twice” with the same inputs gives a different result, calling this “run-to-run nondeterminism.” [^q55qr1]
- Another practitioner source frames the relevant meaning as the relationship between inputs and outputs, stating that a non-deterministic system “produces different outputs when given the same inputs.” [^2r9nlr]

## Evolution

- **2025-09** — Technical writing on LLM inference began emphasizing that the apparent randomness is often a mix of sampling and numerical behavior, not merely the model “thinking differently” each time. [^q55qr1] [^zo5kip] [^vi95p7]
- **2025-10** — A research note on “background temperature” argued that even at temperature \(T=0\), identical inputs can still diverge, formalizing the idea that implementation-dependent perturbations can induce effective randomness. [^7xc14e]
- **2026-02 to 2026-05** — Practitioner explanations increasingly separated *model-level determinism*, *decision-level determinism*, and *action-level determinism*, especially in agentic or enterprise systems where only some layers need to be reproducible. [^2r9nlr] [^wey4yn]

# Best Real-World Examples

- [Thinking Machines Lab](https://thinkingmachines.ai/blog/defeating-nondeterminism-in-llm-inference/) — a technical explainer that discusses “run-to-run nondeterminism” in LLM inference. [^q55qr1]
- [Zenodo preprint on background temperature](https://zenodo.org/records/17279584) — documents divergence at nominal \(T=0\) and introduces the idea of “background temperature.” [^7xc14e]
- [Durgam Vahia](https://durgamvahia.com/non-determinism-ai.html) — distinguishes system-level non-determinism from statistical or probabilistic behavior in enterprise AI. [^2r9nlr]
- [The Turing Machine](https://theturingmachine.net/generative-ai-and-non-determinism) — argues that LLMs are probabilistic rather than truly non-deterministic in the formal CS sense. [^n9a6xz]
- [Guild AI glossary](https://www.guild.ai/glossary/non-deterministic-systems) — gives a concise systems definition: same input, different outputs across runs. [^fz2zhz]
- [Arctic DBA](https://www.arcticdba.se/posts/nondeterminism-part-1/) — uses the phrase “controlled stochasticity” to frame the practical engineering tradeoff. [^lsit0f]
- [XMPro](https://xmpro.com/the-myth-of-non-determinism-why-agentic-operations-can-be-predictable-governed-and-safe/) — separates model, decision, and action determinism in agentic operations. [^wey4yn]

# Case Studies

A key case study in the LLM literature is the distinction between *sampling randomness* and *inference nondeterminism*. Thinking Machines Lab describes run-to-run nondeterminism as the situation where “you execute the same kernel twice with exactly the same inputs and you get a different result out,” which shifts the focus from prompt wording to the execution stack itself. [^q55qr1] This framing matters because it means stability problems may persist even when users fix prompts, seeds, or temperatures, if lower-level numerical operations still vary. [^q55qr1] [^zo5kip] [^7xc14e]

A second case study is the claim that identical inputs can diverge even at \(T=0\). The Zenodo preprint on background temperature reports that “even when decoding with temperature T=0, large language models (LLMs) can produce divergent outputs for identical inputs,” and proposes an “effective temperature” induced by implementation-dependent perturbations. [^7xc14e] This shows why “deterministic settings” in user interfaces do not always guarantee exact replay at the system level. [^7xc14e]

A third case study comes from enterprise AI framing, where Durgam Vahia argues that non-determinism is not the same thing as being statistical or probabilistic, but rather concerns “the relationship between inputs and outputs” in deployed systems. [^2r9nlr] XMPro extends that idea by splitting behavior into model-level, decision-level, and action-level determinism, which is useful in agentic workflows where the model may remain probabilistic while the surrounding control system is made auditable and reproducible. [^wey4yn]


***

# Sources

[^fz2zhz]: [Non-Deterministic Systems](https://www.guild.ai/glossary/non-deterministic-systems)
[^q55qr1]: [Defeating Nondeterminism in LLM Inference](https://thinkingmachines.ai/blog/defeating-nondeterminism-in-llm-inference/)
[^2r9nlr]: [Non-Determinism in Enterprise AI - Durgam Vahia](https://durgamvahia.com/non-determinism-ai.html)
[^n9a6xz]: [Generative AI and Non-Determinism - The Turing Machine](https://theturingmachine.net/generative-ai-and-non-determinism)
[^1v7a49]: [Non-Determinism: Why it is a Feature, not a Bug, in LLMs. ...](https://www.linkedin.com/pulse/non-determinism-why-its-feature-bug-llms-plus-what-thinking-koirala-rjvue)
[6]: [Understanding Nondeterminism in AI Language Models](https://rajat-bhatheja.medium.com/understanding-nondeterminism-in-ai-language-models-a-simple-explanation-5cbfc76ff392)
[^wzw5yv]: [LLM on AWS with Bedrock and Understanding Non ...](https://dev.to/aws-builders/llm-on-aws-with-bedrock-and-understanding-non-determinism-in-generative-models-1nm1)
[^zo5kip]: [Deterministic vs. Nondeterministic AI: Training, Inference ...](https://medium.com/@gdceccarini/deterministic-vs-nondeterministic-ai-training-inference-and-llms-6e2ae5c1b294)
[^vi95p7]: [Beyond "Non-Deterministic": Deconstructing the Illusion of ...](https://subramanya.ai/2025/09/09/beyond-non-deterministic-deconstructing-the-illusion-of-randomness-in-llms/)
[10]: [Non Determinism in LLMs - by Yashwanth Sai](https://medium.com/@theyashwanthsai/non-determinism-in-llms-245b6f7e5e21)
[11]: [What does non-deterministic mean for LLMs? | Brian Kiefel posted ...](https://www.linkedin.com/posts/brian-kiefel-5800251a_pareidolia-wikipedia-activity-7372966634422059008-k02D)
[^7xc14e]: [Introducing Background Temperature to Characterise ...](https://zenodo.org/records/17279584)
[^lsit0f]: [The Randomness You Didn't Ask For - Alexander Arvidsson](https://www.arcticdba.se/posts/nondeterminism-part-1/)
[14]: [AI Is Non-Deterministic - And That Matters](https://www.axian.com/2025/10/07/ai-is-non-deterministic-and-that-matters/)
[^wey4yn]: [The Myth of Non-Determinism: Why Agentic Operations ...](https://xmpro.com/the-myth-of-non-determinism-why-agentic-operations-can-be-predictable-governed-and-safe/)
