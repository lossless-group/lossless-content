---
date_modified: 2025-11-21
site_uuid: 144894ec-7557-4d3e-80c7-0f568e022b10
date_created: 2025-04-06
publish: true
title: Benchmarks
slug: benchmarks
at_semantic_version: 0.0.0.1
tags: [Explainers, AI-Models, AI-Model-Training-Kits]
---

Used to measure the performance of [[AI Models]].  They can be found on [[Hugging Face]].
[[essays/The AI Model Wars|The AI Model Wars]]

***
> [!info] **Perplexity Query** (2025-11-21T12:14:22.790Z)
> **Question:**
> What role do benchmarks for performance play in AI model innovation?  
> 
> What are the major benchmarks that are used for the lighthouse LLMs like GPT, Claude, Gemini, DeepSeek, etc.  
> 
> What kind of gains in performance have been made since ChatGPT first launched?
> 
> **Model:** sonar-pro
> 

# AI Model Performance Benchmarks

**Benchmarks for performance play a critical role in AI model innovation by providing standardized, objective measures that drive model development, enable fair comparison, and validate progress in capabilities.** They allow researchers and developers to identify strengths and weaknesses, set targets, and push the field forward by competing on shared tasks. [^s3j99t] [^8kt4xe]

**Major Benchmarks for Lighthouse LLMs:**
The *top benchmarks* used to test and rank leading models such as GPT, Claude, Gemini, DeepSeek, and others include:

- **MMLU/MMLU-Pro:** Measures performance on massive multitask language understanding across subjects (math, medicine, law, etc.).
- **GPQA (Graduate-Level Physics QA):** Evaluates advanced scientific reasoning.
- **AIME:** Assesses mathematical problem-solving, often used for math Olympiad-level questions.
- **SWE-Bench:** Quantifies proficiency in real-world software engineering tasks.
- **LiveBench:** Focuses on robust, contamination-resistant evaluation for coding, reasoning, and multi-step tasks. [^nxzyo6] [^s3j99t] [^8kt4xe] [^gj402g]
- **Chatbot Arena (Elo Scores):** Dynamically ranks models based on head-to-head user engagement and feedback.
- **Other notable benchmarks:** SuperGLUE (natural language understanding), LAMBADA (word prediction), HumanEval (coding), and others for multimodal capabilities. [^8kt4xe] [^i48jo2] [^dtfaf1]

| **Benchmark**  | **Area Tested**          | **Recent Top Scores (2025)**             |
|----------------|--------------------------|------------------------------------------|
| MMLU-Pro       | Language Understanding   | DeepSeek R1: 90.8%, Grok 4: 87%, GPT-4.5: ~85%[^nxzyo6]     |
| GPQA           | Reasoning (Physics)      | Grok 4: 88%, DeepSeek R1: 81%, Gemini 2.5 Pro: 86.4%[^nxzyo6] |
| AIME           | Math Olympiad Level      | Grok 4: 94%, DeepSeek R1: 93.3%, GPT-4.5: ~90%[^nxzyo6] [^0ueat7]   |
| SWE-Bench      | Coding/Software Eng.     | Grok 4: 72–75%, Gemini 2.5 Pro: 63.8%, DeepSeek R1: 57.6%[^nxzyo6] |
| LiveCodeBench  | Live Coding              | DeepSeek R1: 73.3%, Claude 4 Opus: ~74%, GPT-4.5: ~78%[^nxzyo6]   |

![Relevant diagram or illustration related to the topic](https://www.sentisight.ai/wp-content/uploads/2025/08/ai-china-vs-us.jpeg)

**Performance Gains Since ChatGPT's Launch:**
- Since the debut of [[Tooling/AI-Toolkit/AI Interfaces/Chat GPT|Chat GPT]] (based on GPT-3.5), **benchmark scores have surged**:
    - On benchmarks like MMMU, GPQA, and SWE-Bench, scores rose by 18–67 percentage points within a year. [^s3j99t]
    - **Inference costs for GPT-3.5–level performance dropped more than 280-fold; hardware costs and energy use decreased by 30–40% per year**. [^s3j99t]
    - Model scale (number of parameters and training compute) continues to double every few months, yet **the performance gap between top models has shrunk from 12% to just 0.7%**, making the frontier highly competitive. [^s3j99t]
    - Models now outperform humans in some programming and reasoning tasks with time constraints, and *open models have nearly rivaled closed models on certain benchmarks*. [^s3j99t]

![Practical example or use case visualization](https://media.nature.com/lw767/magazine-assets/d41586-025-01033-y/d41586-025-01033-y_50831832.jpg)

- Current state-of-the-art models such as **[[Tooling/AI-Toolkit/Model Producers/DeepSeek|DeepSeek]] R1, [[Tooling/AI-Toolkit/Models/Grok|Grok]] 4, GPT-4.5, [[Tooling/AI-Toolkit/Models/Gemini|Gemini]] 2.5 Pro, and [[Tooling/AI-Toolkit/Models/Claude|Claude]] 4 Opus** consistently achieve scores above 85%—and in some cases above 90%—on historically challenging tasks, reflecting dramatic advances in reasoning, coding, multilinguality, and robustness even compared to GPT-4. [^nxzyo6] [^sab6tu] [^i48jo2] [^0ueat7]

**Additional Insights:**
- **Open-source models (e.g., DeepSeek, [[Tooling/AI-Toolkit/Models/LLaMA|LLaMA]], [[Tooling/AI-Toolkit/Models/Qwen|Qwen]])** have not only become more efficient (requiring less compute per output), but have closed most of the quality gap with proprietary models. [^s3j99t] [^sab6tu]
- Benchmarks themselves are evolving rapidly (e.g., LiveBench, MMLU-Pro), specifically *to detect and discourage training data leakage and saturation*, further driving genuine innovation. [^s3j99t] [^gj402g]

![Additional supporting visual content](https://champaignmagazine.com/wp-content/uploads/2025/07/img_1589.jpg?w=1024)

In summary, **benchmarks are a primary engine of AI progress**—shaping architectures, guiding research priorities, and enabling transparent comparison among LLMs, with recent years witnessing exponential gains in reasoning, coding, and cost-efficiency across the leading platforms.

### Citations

[^nxzyo6]: 2025, Sep 10. [AI by AI: Top 5 Large Language Models (July 2025)](https://champaignmagazine.com/2025/07/11/ai-by-ai-top-5-large-language-models-july-2025/). Published: 2025-07-11 | Updated: 2025-09-10

[^s3j99t]: 2025, Nov 21. [The 2025 AI Index Report | Stanford HAI](https://hai.stanford.edu/ai-index/2025-ai-index-report). Published: 2024-09-10 | Updated: 2025-11-21

[^sab6tu]: 2025, Nov 20. [Top 9 Large Language Models as of November 2025 | Shakudo](https://www.shakudo.io/blog/top-9-large-language-models). Published: 2025-10-05 | Updated: 2025-11-20

[^8kt4xe]: 2025, Nov 21. [25 AI benchmarks: examples of AI models evaluation - Evidently AI](https://www.evidentlyai.com/blog/ai-benchmarks). Published: 2025-10-21 | Updated: 2025-11-21

[^i48jo2]: 2025, Nov 21. [LLM Leaderboard 2025 - Vellum AI](https://www.vellum.ai/llm-leaderboard). Published: 2025-11-19 | Updated: 2025-11-21

[^gj402g]: [LiveBench](https://livebench.ai).

[^dtfaf1]: 2025, Nov 21. [Data on AI Benchmarking - Epoch AI](https://epoch.ai/benchmarks). Published: 2024-11-27 | Updated: 2025-11-21

[8]: 2025, Oct 14. [Comparison of AI Models across Intelligence, Performance, Price](https://artificialanalysis.ai/models). Published: 2023-12-06 | Updated: 2025-10-14

[^0ueat7]: 2025, Nov 21. [10 Best LLMs of November 2025: Performance, Pricing & Use Cases](https://azumo.com/artificial-intelligence/ai-insights/top-10-llms-0625). Published: 2025-10-31 | Updated: 2025-11-21



***
