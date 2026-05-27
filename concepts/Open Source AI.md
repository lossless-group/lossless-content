---
cf_last_run: 2026-05-26T21:44:50.657Z
cf_last_run_model: Perplexity sonar-pro
date_created: 2026-05-26
date_modified: 2026-05-26
---

# Defining and Describing Open Source AI

![Concept diagram showing three components of an open‑source AI system—code, data, and model weights—with arrows indicating access, reuse, and modification by a diverse set of users](https://cdn.sanity.io/images/k7elabj6/production/f211414364a584dd7baa176fcb043bb54d351706-1536x1024.png)

_“Open source AI” describes AI systems whose core components are publicly accessible under licenses that allow people to use, study, modify, and redistribute them._

Open source AI borrows its philosophy from open source software, extending the idea of shared, modifiable code to AI artefacts such as models, training data documentation, and parameter weights.[1][7] It typically applies when organizations or communities release AI models or full stacks in a way that grants developers the ability to inspect how they work, adapt them to new tasks, and run them on their own infrastructure.[1][7][8] This matters because open source AI can reduce costs, avoid vendor lock‑in, increase transparency and auditability, and enable a broader ecosystem of innovation beyond a few large providers.[2][5][6][7][8]

```mermaid
flowchart LR
    A[Open Source AI System] --> B[Code<br/>(training & inference)]
    A --> C[Model<br/>(architecture & weights)]
    A --> D[Data Layer<br/& data documentation]
    B --> E[Use]
    B --> F[Study]
    C --> G[Modify]
    C --> H[Fine‑tune]
    D --> I[Replicate & Audit]
    E & F & G & H & I --> J[Community Reuse & Innovation]
```

# Uses in Context

- In policy and ethics debates, “open-source AI” is used as a *loaded term* that “borrows language from open-source software (OSS) to convey the idea of an AI artefact that can be shared, modified and reproduced with little restrictions on users.”[1]

- Governance researchers use the term to discuss how far “the ‘four freedoms’ associated with open source” (use, study, modify, share) can and should be applied to AI systems’ data, code, and models, as in the proposed **Open Source AI Definition (OSAID)**.[1]

- Engineering guides define **open source AI models** as “downloadable ML models with open weights and code” that you can “run, fine-tune, and deploy…on your own infra, no vendor lock-in or usage caps.”[8]

- Developer platforms explain that an **open source AI approach** lets developers “study how systems work, reuse components, contribute improvements, and shape models to fit their needs.”[7]

- Industry and policy essays use “open source AI” or “open models” to contrast with closed models, arguing that “open models have benefits” such as lower inference cost and comparable performance, yet are under‑adopted relative to closed systems.[5][6]

# History of Use

## Origins

- The *concept* of applying open source principles to AI builds on the 1998 Open Source Definition (OSD), which codified the “four freedoms” (use, study, modify, share) for software and later inspired attempts to extend these freedoms to AI artefacts.[1]

- As AI systems became more complex and model‑centric, researchers and civil‑society organizations began to distinguish “open-source AI” from traditional open-source software, emphasizing that AI involves at least three artefacts: **data, code, and model**.[1]

- The Ada Lovelace Institute’s discussion of an **Open Source AI Definition (OSAID)** is one early systematic attempt to define what counts as open in AI by specifying requirements for information about training data, openness of code, and release of models and parameter values under standard open‑source licenses.[1]

*(Public discourse around “open source AI” is relatively recent and emerged organically; scholarship and policy reports, rather than big‑tech marketing, have led the definitional work.)*

## Evolution

- **Late 2010s–early 2020s – From “open code” to “open weights”:** As deep learning models grew, many AI projects released code but not model weights or detailed training data, prompting debates about whether these projects truly qualified as “open source AI” and catalyzing the distinction between open‑source code, “open‑weight” models, and fully open AI systems.[1][8]

- **Early–mid 2020s – Formalization attempts (OSAID and related work):** Governance and research organizations proposed criteria such as the **Open Source AI Definition (OSAID)** to operationalize openness across *data documentation*, *code licensing*, and *model / parameter release*, explicitly adapting the four freedoms to AI.[1]

- **2020s – Open models vs. closed models economics:** Empirical work on “AI open models” showed that open models can achieve about **90% of the performance of closed models at release**, quickly closing the gap, while costing **87% less for inference**, reframing open source AI as an economic and strategic alternative in industry.[5]

# Best Real-World Examples

- **[Llama 3 (Meta)](url)** – A family of large language models whose weights are released under a permissive license that allows developers to download, run, and fine‑tune them, widely treated as a flagship open‑weight large language model in the 2020s.[8][5]

- **[Mistral 7B / Mixtral](url)** – Open‑weight language models from European startup Mistral AI, released with weights and code for local deployment and customization, often benchmarked as competitive with larger proprietary models while remaining developer‑friendly.[5][8]

- **[Ollama](url)** – A tooling stack and runtime from a small company that “manages the open source AI models for you on your local computer,” enabling users to download and run multiple open models and integrate them into local agents.[2]

- **[LangGraph](url)** – An “open source first” agent‑orchestration framework that supports building complex AI agents around open‑source models, emphasizing local/self‑hosted deployments.[2][3]

- **[The Agency](url)** – A free and open‑source project providing AI agent templates for startup‑style roles (front‑end developer, security engineer, growth hacker, etc.), showcasing how open models plus open orchestration code can be combined into reusable work systems.[3]

- **[[Tooling/AI-Toolkit/Agentic AI/OpenViking]]** – An open‑source database designed specifically for AI agents that organizes agents’ memory, resources, and skills in a filesystem‑like structure, showing how infrastructure tailored to open agents can be shared and improved by the community.[3]

- **[Open source AI platforms (e.g., Kubeflow, MLflow, Ray Serve)](url)** – Community‑driven platforms for building and deploying AI models that are themselves open source and commonly used as the backbone for open‑source AI workflows.[9]

# Case Studies

## Case Study 1: Open Models as a Cheaper Alternative to Closed AI

Research by Neil Thompson, Seth Benzell, and co‑authors on “AI open models” compared open models (with accessible weights) to closed proprietary APIs across performance and cost.[5] They found that when open models are released, they typically achieve about **90% of the performance of closed models**, but can quickly catch up as the open community fine‑tunes and improves them.[5] Crucially, they estimated that the *average* cost of running inference on closed models is about **$1.86 per million tokens**, compared with **$0.23 per million tokens** for open models, meaning closed models are roughly **87% more expensive** to run.[5] Using observed usage data from the OpenRouter marketplace, they calculated that an “optimal reallocation of demand from closed to open models” could reduce overall AI spending by more than **70%**, potentially saving the global AI economy around **$25 billion annually** given a market size estimate of over $35 billion.[5] This case illustrates that open source AI is not just a philosophical or governance preference: under realistic conditions, open models can deliver similar accuracy at far lower cost, incentivizing startups and independent developers to adopt open approaches rather than depend on proprietary APIs.[5][6]

## Case Study 2: Governance and the Open Source AI Definition (OSAID)

The Ada Lovelace Institute examined how “open” current AI systems really are and proposed the **Open Source AI Definition (OSAID)** as a way to adapt the Open Source Definition to AI.[1] Their analysis notes that open source AI is often invoked loosely to imply an AI artefact “can be shared, modified and reproduced with little restrictions,” but that in practice AI systems consist of at least **three primary artefacts: data, code and model.**[1] The OSAID draws on the four freedoms (use, study, modify, share) and sets criteria for each artefact: for **data**, it requires a “complete description of all data used for training — including non-shareable data — disclosing its provenance, scope and characteristics… and data processing and filtering methodologies,” plus listings of public and third‑party data sources, although it notably does **not** require publishing the raw training data itself.[1] For **code**, it expects training, inference, and evaluation code to be released under standard open‑source licenses; for the **model**, it requires releasing the model artefact and its parameter values under open‑source licenses.[1] By showing that many self‑described “open source AI” systems fail to meet these criteria—often by withholding weights or meaningful data documentation—this case demonstrates how rigorous definitions can prevent open‑washing and make it clearer which AI systems truly support community audit, modification, and reuse.[1][7][8]

## Case Study 3: Local Agents with Open Source AI Tooling

Developer tutorials on open source AI agents describe a practical stack for building local AI agents by combining open‑source models with open‑source orchestration software.[2][3] One walkthrough explains how a user can download **Ollama** to manage multiple open‑source models on a local machine and pair it with **NA10**, an open‑source agent framework that provides memory, tools, and orchestration for building agents that can perform tasks like booking flights or managing calendars.[2] In this pattern, the model (e.g., an open LLM), the agent‑orchestration framework, and often supporting components like databases or evaluation tools are all open source, allowing developers to inspect and customize every piece.[2][3] The same tutorial highlights that “components of an AI agent” such as models, tools, knowledge and memory, audio/speech, guardrails, and orchestration can all be supplied by open‑source projects, and notes that frameworks like LangGraph are “open source first agent infrastructure.”[2][3] This case shows how open source AI enables fully local, auditable AI agents without dependence on proprietary APIs, aligning with concerns around privacy, vendor lock‑in, and the need for domain‑specific customization.[2][7][8]

![Screenshot-style illustration of a local developer machine running an open model via Ollama alongside an open-source agent framework dashboard orchestrating tools and memory](https://smartdev.com/wp-content/uploads/2025/01/open-source-proprietary-ai.png)


***

# Sources

[1]: [How 'open' is open-source AI? | Ada Lovelace Institute](https://www.adalovelaceinstitute.org/blog/how-open-is-open-source-ai/)
[2]: [Open Source AI In 17 Minutes - YouTube](https://www.youtube.com/watch?v=1uCE0uoKXL8)
[3]: [7 new open source AI tools you need right now… - YouTube](https://www.youtube.com/watch?v=Xn-gtHDsaPY)
[4]: [Accelerating open source development with AI - Red Hat](https://www.redhat.com/en/blog/accelerating-open-source-development-ai)
[5]: [AI open models have benefits. So why aren't they more widely used?](https://mitsloan.mit.edu/ideas-made-to-matter/ai-open-models-have-benefits-so-why-arent-they-more-widely-used)
[6]: [Asserting American Leadership in Open Source AI](https://a16z.com/asserting-american-leadership-in-open-source-ai/)
[7]: [What is open source AI? - GitHub](https://github.com/resources/articles/what-is-open-source-ai)
[8]: [An engineer's guide to open source AI models | Blog - Northflank](https://northflank.com/blog/an-engineers-guide-to-open-source-ai-models)
[9]: [Open Source AI Platforms: What You Need to Know - Anaconda](https://www.anaconda.com/guides/open-source-ai-platforms)
[10]: [10 Open Source AI Code Review Tools Tested on a 450K-File ...](https://www.augmentcode.com/tools/open-source-ai-code-review-tools-worth-trying)
