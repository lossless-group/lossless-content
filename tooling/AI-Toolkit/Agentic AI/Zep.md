---
url: "https://www.getzep.com/"
og_title: "Context Engineering & Agent Memory Platform for AI Agents - Zep"
og_description: "Agents fail without the right context. Getting it right is hard. We fixed it. Goes beyond agent memory with unified context graph, Graph RAG, and automated context assembly. Works with any framework. Three lines of code. 200ms retrieval."
og_image: "https://www.getzep.com/og-image.png"
og_favicon: "https://www.getzep.com/zep-logo-icon-gradient-rgb-circle-favicon-32.png"
og_type: website
authors:
  - Zep Software, Inc.
og_last_fetch: "2026-05-17T20:05:12.818Z"
date_created: 2026-05-17
date_modified: 2026-08-15
github_profle_url: "https://github.com/getzep"
tags: [Memory-Layers, Context-Layers, Knowledge-Graphs, Agent-Memory, Must-Have, Solutions-For-Scale, Context-Engineering, Context-Engineering-Kits]
cf_last_run: "2026-08-15T01:43:05.787Z"
cf_last_run_model: "Perplexity sonar-pro"
for_clients:
  - Laerdal
  - Lossless
  - FullStackVC
  - Alpha-JWC
  - Cervin
  - Colearn
  - Reach
  - The-Water-Foundation
site_uuid: b24cc8db-7c15-48ca-be95-e2d293c673dd
publish: true
title: Zep
slug: zep
at_semantic_version: 0.0.0.1
---

# Value Proposition & Features

Zep is a **[[Context Engineering Platforms]] for AI agents** that provides persistent, temporally-aware memory as a managed cloud service built on a temporal **Context Graph** (knowledge graph) architecture. [^d3o7bu] [^r1ze78] [^gl9kme] It targets developers and enterprises building AI agents that need sub-200ms retrieval, governed long‑term memory, and compliance-grade provenance rather than ad‑hoc vector stores. [^k9jjmf] [^r1ze78] [^ear82x] [^gl9kme] Zep’s commercial platform sits on top of its open‑source **Graphiti** engine, delivering enterprise controls, multi-tenant context graphs, and integrations with agent frameworks and MCP-based tools. [^r1ze78] [^s34gjv] [^dnww73]

Core product features:

- Zep’s **Agent Memory** service extracts entities and facts from conversations and business data, stores them in a temporal knowledge graph, and serves relevant context back to agents at request time. [^k9jjmf] [^r1ze78] [^7cee07]
- The **Context Graph / Context Lake** provides bi-temporal edges with validity intervals and fact invalidation, enabling queries like “what was true at time X” versus “what is true now,” and auditing how knowledge evolved over time. [^it7zro] [^s34gjv] [^7cee07] [^ear82x]
- **Graphiti**, the open‑source engine behind Zep, powers hybrid retrieval (embeddings + BM25 + graph traversal) with sub‑200ms reads, and can be used standalone with a bring‑your‑own graph database. [^k9jjmf] [^r1ze78] [^s34gjv] [^4kbl3v]

Priority feature list (5–8 bullets):

- **Temporal Context Graph (bi‑temporal knowledge graph)** — facts stored as edges with event time, ingestion time, and validity intervals, supporting “what used to be true” queries and audit trails. [^it7zro] [^s34gjv] [^7cee07]
- **Hybrid Retrieval (search + graph traversal)** — recall queries run semantic similarity and BM25 search over nodes and edges, fuse results, then traverse subgraphs via BFS and related algorithms to assemble context efficiently. [^k9jjmf] [^s34gjv]
- **Observations & Pattern Detection** — Zep builds cross‑conversation patterns as “Observations,” durable, evidence‑backed summaries of what the graph shows about users or problems rather than just episodic facts. [^85fffn] [^tdli9z] [^19qz3y]
- **Provenance & Lineage Tracking** — every derived fact links back to raw episodes, enabling veracity checks, source attribution for LLM‑synthesized answers, and compliance use cases such as GDPR deletion. [^19qz3y] [^ear82x] [^xbk61n]
- **Managed Cloud Context Graph Engine** — Zep Cloud includes a proprietary graph runtime with SLAs, sub‑200ms retrieval, and no need for a third‑party graph database, unlike Graphiti which requires BYO graph store. [^r1ze78] [^4kbl3v]
- **Agent Framework Integrations & MCP** — integrations and guides for Claude Code, Codex, Cursor, Strands, Eve, and Memory MCP let agents use Zep for long‑term memory with minimal setup. [^5cja6r] [^mscs7u] [^eg3e7p] [^dnww73]
- **Enterprise Governance & Access Control** — attribute‑based access control on graph edges and episodes, user/group policies, and controls for write permissions on MCP connections. [^u5eosb] [^f1avlu] [^dnww73]
- **Strict Ontology & Ingestion Pipeline Support** — strict ontology flags and ingestion guides ensure only configured entity/edge types are added, with batch APIs and data‑prep guides for production pipelines. [^2disjl] [^w73flu]

## Product Roadmap / Announcements

As of August 15, 2026,

- **2026-08-13** — Documentation updates: Account Owners can configure enterprise SSO without sharing IdP credentials, custom OpenAI base URLs (e.g., regional hosts), new Strands and Eve integration guides, and documentation for the `zep-strands` package for Strands. [^dnww73]
- **2026-08-04** — Memory MCP connections now allow writes by default; administrators can switch to read-only, and connections provisioning users just‑in‑time now recover automatically after user deletion, with improved name display and documentation of how graph search interprets relative calendar phrases. [^f1avlu]
- **2026-08-03** — A “Memory for Agent Frameworks” landing page was added, the Ecosystem section renamed to Agent Frameworks, and the “Evaluate Zep for Your Use Case” guide rewritten to cover evaluation workflows including ingestion, search scopes, and graph inspection. [^6sul99]
- **2026-07-30** — Batch API jobs now send a single completion webhook to avoid duplicate notifications; strict ontology documented for limiting extraction to configured types, and ingestion pipeline guides added. [^2disjl] [^w73flu]
- **2026-07-29** — Graph node and edge lists can be ordered by valid time (`valid_at`), and company email signups receive a credit‑limited 30‑day Enterprise trial before reverting to Free; ABAC constraints are enforced on updates/deletes of graph artifacts. [^u5eosb] [^42qbfq] [^4ecgew]
- **2026-07-18** — New “Implement Zep with agents” page under Developer Tools covering the Build with Zep plugin for Claude Code and Codex, plus onboarding and UI tweaks in the graph dialog. [^eg3e7p] [^bvkq40]
- **2026-07-16** — Blog post detailing benchmarking of NVIDIA Nemotron 3 Embed 1B for agent memory, showing it as Zep’s best‑performing embedding on their production recall workload. [^k9jjmf] [^fphk7u] [^r5rfm9]
- **2026-07-30** — “Build with Zep plugin: Claude Code, Codex, Cursor” announcement: one plugin bundle and MCP documentation server (`zep-docs`) that lets coding agents design Zep implementations via guided steps. [^5cja6r] [^o75lsm] [^mscs7u]

## Recent Developments (last 90 days)

- **Self-host model change (2026-08-07)** — Independent analysis reports that Zep’s Community Edition is deprecated and `getzep/zep` now hosts examples and integrations, making Zep a hosted‑only product; self‑hosting is now limited to building on Graphiti rather than deploying Zep Cloud itself. [^9v5f60] [^97r09g]
- **Graph traversal & FalkorDB local mode (2026-07-27–08-02)** — Graphiti releases add FalkorDB bug fixes and support for fully local operation (embedded FalkorDB, Ollama, no server/cloud LLM), while Zep Cloud exposes context graph traversal APIs for walking neighbors and multi‑hop subgraphs. [^c9u8ih] [^phtu56] [^d3o7bu] [^yv02vx] [^r1ze78]
- **Embedding model upgrade (2026-07-16)** — Zep benchmarks multiple embedding models and concludes Nemotron 3 Embed 1B is the strongest tested on its agent‑memory workload, with statistically significant improvements in Recall@10 and a quantized serving path. [^k9jjmf] [^fphk7u] [^r5rfm9]
- **Plugin & framework integrations (late July–early August)** — Zep ships a unified plugin for Claude Code, Codex, and Cursor and documents Strands and Eve integration guides to add long‑term memory to these agent frameworks. [^5cja6r] [^mscs7u] [^dnww73]
- **Pricing tier for emerging companies (2026-07-21–08-02)** — Zep introduces “Enterprise memory priced for emerging companies” at $13,000 for the first year, targeting companies that have raised $1M–$10M, with more than $40,000 in discounts over a three‑year term. [^9csuah] [^6djpgd] [^zzw4r7] [^g6uj3a]

# History and Origin Story

Zep AI was founded in 2023 and participated in Y Combinator’s Winter 2024 batch, building a temporal knowledge‑graph memory layer for AI agents. [^qcn0hv] [^70mwoi] [^h4oxmk] The founding team centers on Daniel Chalef (founder/CEO), joined by co‑founders including Paul (Pavlo) Paliychuk and Preston Rasmussen, who introduced the project via “Show HN: Zep, Open-Source Graph Memory for AI Apps” alongside the open‑sourcing of Graphiti. [^h4oxmk] [^70mwoi] The company’s origin story is tied to solving “agent context is hard” by publishing the “Zep: A Temporal Knowledge Graph Architecture for Agent Memory” paper and turning its Graphiti engine into widely adopted open‑source infrastructure for agent memory. [^70mwoi] [^ear82x] [^5bgjjp]

## Fundraising History

Markdown table (rounds, dates, amounts, lead investor):

| Round   | Date        | Amount  | Lead investor      |
|---------|------------|---------|--------------------|
| Pre-Seed | 2024-03-05 | $500k   | Y Combinator       | [^83i6as]
| Seed    | No reliable source found | – | – |

**Total funding:** Approximately **$500k** reported pre‑seed funding. [^83i6as]

Investors (alphabetical, from known data):

- [[vertical-toolkits/Venture-Capital-Firms/Y Combinator|Y Combinator]] [^83i6as]

## Notable Team Members

**Daniel Chalef (Founder & CEO)** — Daniel Chalef is the founder and CEO of Zep AI, described as a two‑time founder and former head of ML at SparkPost, and he represents the company publicly in podcasts and conference talks on temporal knowledge graphs and agent memory. [^qcn0hv] [^70mwoi] [^32bvfl] [^wk8cr8] His role includes leading Zep’s build‑in‑public motion, presenting technical work such as provenance for LLM‑built knowledge graphs and the Zep memory architecture. [^h4oxmk] [^3crbe1] [^xbk61n] [^gp33bv]

**Paul (Pavlo) Paliychuk (Co‑founder)** — Systemaic’s teardown cites Paul (Pavlo Paliychuk) as a co‑founder alongside Daniel, part of the founding team that launched Zep’s open‑source and commercial agent‑memory platform. [^h4oxmk]

**Preston Rasmussen (Co‑founder)** — The same teardown notes Preston Rasmussen in the early “Show HN” introduction (“Daniel, Paul, Travis, and Preston from Zep”), indicating his role as a co‑founder involved in engineering and distribution around Graphiti and Zep’s memory layer. [^h4oxmk]

# Market Sizing

## Category, Market Size, and Category Growth

Zep operates in the **AI agent memory systems infrastructure** category and the broader **agentic AI orchestration and memory systems** and **RAG/context tooling** ecosystems. [^7cee07] [^l9cdbw] [^r7ya8y] [^l53w30] One market research report estimates the global AI Agent Memory Systems Infrastructure market at **$1.2 billion in 2025**, projected to reach **$18.9 billion by 2034** at a **62.0% CAGR**. [^r7ya8y] Another report places Agentic AI Orchestration and Memory Systems at **$10.9 billion in 2026**, rising to **$210.5 billion by 2035** with a **38.9% CAGR**, illustrating rapid growth in the stack Zep participates in. [^l53w30] Retrieval‑augmented generation markets are also forecast to grow from around **$1.94 billion in 2025 to $9.86 billion by 2030** (38.4% CAGR), indicating a strong adjacent demand for context and memory tooling. [^80cf63] [^i70qwe] [^yvq5zd]

## Pricing

Zep’s published and reported pricing:

| Tier / Program                | Price / Structure                                  | Notes |
|-------------------------------|----------------------------------------------------|-------|
| Free                         | $0; 10,000 credits/month, no rollover             | Entry tier for small teams. [^bk2yms] |
| Flex                         | $1,250/year (≈$104/month billed annually) with 50,000 monthly credits | Self‑service for individual developers. [^bk2yms] [^4owm04] [^sm5hqw] |
| Flex Plus                    | $3,750/year (≈$312/month billed annually) with 200,000 monthly credits | Higher‑volume self‑service. [^bk2yms] [^4owm04] [^sm5hqw] [^0rno0i] |
| Emerging Companies Program   | $13,000 for first year, >$40,000 in discounts over three‑year term; 12‑month commitment prepaid annually | For companies with $1M–$10M funding, Enterprise controls at lower price. [^9csuah] [^6djpgd] [^yadxl4] [^zzw4r7] |
| Enterprise                   | Custom; usage‑based credits, negotiated rates, deployment options and SLAs | SOC 2 Type II, HIPAA BAA, BYOK and enterprise features. [^4owm04] [^sm5hqw] [^9csuah] |

Other third‑party sources mention starting pricing “from $25/mo” or “from ~$125/month,” but these are secondary summaries; the most detailed tier descriptions are from Zep’s docs, Systemaic, and HydraDB. [^bk2yms] [^sm5hqw] [^lz0kr9] [^3aph03] [^1uyakk]

## Revenue Trajectory Estimates

Systemaic’s teardown states that Zep’s **revenue is not publicly disclosed** and offers a qualitative estimate that, given enterprise contracts alongside $104–$312/month self‑serve tiers and a lean team, revenue is “plausibly in the low‑to‑mid six‑figure annual range,” emphasizing this is an estimate, not a confirmed figure. [^bk2yms] Y Combinator’s job listing for Zep notes that the company is seed‑stage with **50% month‑over‑month ARR growth** and **240+ customers including Fortune 500s**, but does not disclose exact ARR. [^70mwoi]

# Competitive Landscape

## Who it’s for, who it’s not for

Zep is for **developers and enterprises building AI agents** that require persistent, temporally-aware memory with strong governance, compliance, and provenance, especially where understanding how facts change over time and across conversations is critical. [^k9jjmf] [^r1ze78] [^7cee07] [^l9cdbw] [^70mwoi] It is particularly suited to production AI agents, copilots, and enterprise applications needing sub‑200ms retrieval, SOC 2/HIPAA controls, attribute‑based access control, and multi‑tenant context graphs served inside VPCs or controlled cloud deployments. [^r1ze78] [^70mwoi] [^9csuah] [^dnww73] [^l9cdbw]

Zep is less suited for teams that require fully self‑hosted managed memory products with no external SaaS component, since independent analysis indicates the Community Edition is deprecated and Zep is now a hosted‑only product, leaving self‑hosting to Graphiti plus custom plumbing. [^9v5f60] [^97r09g] [^4pl8xt] [^1uyakk] It is also not ideal for simple, lightweight memory where a flat key‑value store or basic vector DB suffices, or for teams whose budget or complexity requirements favor lower‑cost, simpler memory APIs without temporal graphs and governance overhead. [^hu5yt4] [^37gaf1] [^kv8ehv] [^0rno0i]

## Viable Alternatives

- **Mem0** — Vector‑centric agent memory with both managed cloud and open‑source self‑host options, suitable for teams prioritizing simple, fast memory integration and hard self‑host/data‑residency requirements. [^9v5f60] [^hu5yt4] [^37gaf1] [^kv8ehv] [^bs8o36] [^1uyakk]
- **Letta (MemGPT)** — Agent runtime with hierarchical memory management, open source and self‑hostable, attractive for teams wanting an agent framework with built‑in tiered memory rather than a separate memory service. [^7cee07] [^jr7g1a] [^kv8ehv] [^37gaf1]
- **Supermemory** — Vector‑graph memory platform emphasizing a simple universal memory API and free local self‑hosting, good for rapid deployment and mixed semantic/keyword retrieval without complex temporal modeling. [^7cee07] [^37gaf1] [^9ppgt9]
- **Cognee** — Knowledge-graph plus embeddings hybrid retrieval, with managed or self‑host deployments, targeting document/data-heavy pipelines rather than conversational memory alone. [^g2ogtg] [^7cee07] [^qfsbk9]
- **HydraDB** — Graph‑native context layer database positioned as an alternative to Mem0 and Zep for production AI agents requiring persistent context and complex state tracking. [^kv8ehv] [^zy7zu8] [^sm5hqw]

## Competitor Table

| Competitor | Description |
|------------|-------------|
| [Mem0](https://mem0.ai) | Agent memory platform offering a free managed tier and Apache‑licensed self‑hostable package, focusing on vector-based memory and simple integration, widely adopted and integrated into major clouds. [^37gaf1] [^hu5yt4] [^wcb315] [^1uyakk] |
| [Letta (MemGPT)](https://letta.ai) | Open‑source agent framework with OS‑style tiered memory, enabling hierarchical, agent‑managed context without a separate memory SaaS; strong fit for self‑hosters. [^jr7g1a] [^7cee07] [^37gaf1] |
| [Supermemory](https://supermemory.ai) | Hosted and self‑hostable vector‑graph memory API emphasizing ease of use and fast universal ingest, positioned as a straightforward hosted memory layer. [^7cee07] [^37gaf1] [^9ppgt9] |
| [Cognee](https://cognee.ai) | Agent memory/knowledge‑graph system combining graphs and embeddings, suitable for multi‑agent and data‑heavy knowledge pipelines with configurable storage backends. [^g2ogtg] [^7cee07] [^qfsbk9] |
| [HydraDB](https://hydradb.com) | Graph‑native context layer and AI graph database marketed as an alternative to Mem0 and Zep, designed for production AI agents and enterprise applications requiring complex state tracking. [^kv8ehv] [^zy7zu8] [^sm5hqw] |


***

# Sources

[^g2ogtg]: [AI Agent Infrastructure Platforms Compared (2026) | Naboo](https://www.naboo.ai/alternatives/)
[^37gaf1]: [Best AI Agent Memory Systems in 2026: A Developer's ...](https://memnexus.ai/blog/2026-07-23-best-ai-agent-memory-systems)
[^qfsbk9]: [Best AI Agent Memory Tools 2026 - Context Studios](https://www.contextstudios.ai/guides/best-ai-agent-memory-tools-2026)
[^jr7g1a]: [Best Open-Source Agent Memory Systems (Self-Hosted, ...](https://www.linkedin.com/pulse/best-open-source-agent-memory-systems-self-hosted-2026-vectorizeio-2lfhc)
[^hu5yt4]: [Agent Memory Layer Comparison 2026: Déjà Vu vs Mem0 vs Zep vs ...](https://baeseokjae.github.io/posts/agent-memory-comparison-2026/)
[^zy7zu8]: [Best Databases for AI Agent Memory in 2026](https://hydradb.com/blog/databases-ai-agent-memory)
[^kv8ehv]: [Best Mem0 and Zep Alternatives for AI Agent Memory (2026 Guide) - HydraDB](https://hydradb.com/blog/mem0-zep-alternatives-2026?trk=article-ssr-frontend-pulse_little-text-block)
[^9ppgt9]: [The best Mem0 alternatives for cross-tool AI memory (2026)](https://xtrace.ai/compare/mem0-alternatives)
[9]: [# I benchmarked AI agent memory in 2026 — and the ...](https://dev.to/everest_an/-i-benchmarked-ai-agent-memory-in-2026-and-the-numbers-tell-a-different-story-than-the-marketing-2ae4)
[10]: [Top 5 Open-Source Agentic AI Frameworks in 2026](https://aimultiple.com/agentic-frameworks)
[11]: [Agentic Context Engineering for Hierarchical GraphRAG](https://arxiv.org/abs/2608.01269)
[^7cee07]: [Best AI agent memory tools in 2026 - Articles - Braintrust](https://www.braintrust.dev/articles/best-ai-agent-memory-tools-2026)
[^l9cdbw]: [AI Agent Memory Systems Infrastructure Market Research Report 2034](https://marketintelo.com/report/ai-agent-memory-systems-infrastructure-market)
[14]: [Best databases for AI agent memory: a 2026 comparison](https://redis.io/blog/best-databases-for-agent-memory/)
[15]: [The Frameworks](https://www.codebridge.tech/articles/best-ai-memory-frameworks)
[16]: [Zep AI revenue, ad spend and growth channels](https://www.systemaic.com/teardowns/zep-ai)
[17]: [Daniel Chalef - Co-founder and CEO](https://www.startuphub.ai/people/daniel-chalef)
[18]: [July 29, 2026 | Zep Documentation](https://help.getzep.com/changelog/2026/7/29)
[^qcn0hv]: [Knowledge Graphs as Agentic Memory with Daniel Chalef](https://softwareengineeringdaily.com/podcasts/knowledge-graphs-as-agentic-memory-with-daniel-chalef/)
[^70mwoi]: [Marketing Engineer at Zep AI](https://www.ycombinator.com/companies/zep-ai/jobs/ir0JRMr-marketing-engineer)
[21]: [Zep changes & pricing history - AI Devtools Radar](https://devtoolsradar.com/tools/zep/)
[22]: [getzep/zep Review & Score · A-Tier - Agentiquette](https://agentiquette.com/index/repos/zep)
[^4kbl3v]: [REST Service API | getzep/graphiti | DeepWiki](https://deepwiki.com/getzep/graphiti/8.3-rest-service-api)
[^4pl8xt]: [Mem0 vs Zep vs Letta, August 2026: The Self-Host Question ...](https://www.dreaming.press/posts/mem0-vs-zep-vs-letta-self-host-august-2026.html)
[25]: [Enterprise memory priced for emerging companies. - Zep](https://www.getzep.com/emerging/)
[26]: [July 18, 2026 | Zep Documentation](https://help.getzep.com/changelog/2026/7/18)
[27]: [Avi Chawla](https://x.com/_avichawla/status/2084909858386792674)
[28]: [Graphiti：為AI Agents 即時建構知識圖譜的開源工具](https://www.techritual.com/2026/08/04/529100/)
[29]: [Zepp Health Corporation (ZEPP) Company Profile & Facts](https://finance.yahoo.com/quote/ZEPP/profile/)
[^5bgjjp]: [Agent Memory and MCP: Knowledge Graphs for AI Agents](https://tesseract.academy/courses/ontology-training-knowledge-graphs-complete-course/lessons/agent-memory-and-mcp-knowledge-graphs-for-ai-agents/)
[^d3o7bu]: [Changelog - graph - Zep Documentation](https://help.getzep.com/v3/changelog?filter=graph)
[^k9jjmf]: [Evaluating Nemotron 3 Embed for agent memory - Zep](https://blog.getzep.com/evaluating-nemotron-3-embed-for-agent-memory/)
[^it7zro]: [Glossary | getzep/graphiti | DeepWiki](https://deepwiki.com/getzep/graphiti/13-glossary)
[34]: [July 30, 2026 | Zep Documentation - help.getzep.com](https://help.getzep.com/changelog/2026/7/30)
[^5cja6r]: [Build with Zep plugin: Claude Code, Codex, Cursor](https://blog.getzep.com/coding-agents-can-design-your-zep-implementation/)
[^85fffn]: [Your memory shouldn't wait for queries. Every agent ...](https://x.com/akshay_pachaar/status/2087209715965313367)
[^mscs7u]: [Zep now ships one plugin for Claude Code, Codex, and Cursor ...](https://x.com/zep_ai/status/2082945147600310616)
[^s34gjv]: [Synthetic Facts in LLMs: Managing Lineage and Source ...](https://www.linkedin.com/posts/zep-ai_agent-memory-is-synthesized-an-llm-reads-activity-7483174793769365505-eFWP)
[^19qz3y]: [Graphiti – Temporal Context Graphs for AI Agents](https://runany.dev/blog/zep-graphiti-agent-memory/)
[^42qbfq]: [August 4, 2026 | Zep Documentation - help.getzep.com](https://help.getzep.com/changelog/2026/8/4)
[^r1ze78]: [Zep Bridges Memory Gap in Agentic Systems](https://www.linkedin.com/posts/hafshari_github-getzepgraphiti-build-real-time-activity-7490712894247063552-8XbV)
[^bvkq40]: [Agent 记忆5 个方案对比：接入不踩坑](https://juejin.cn/post/7662660243382403112)
[43]: [Zep Documentation — agent memory at enterprise scale](https://help.getzep.com/changelog/2026/8/3)
[^tdli9z]: [Mem0 vs Zep vs Letta, August 2026: The Self-Host Question Just Changed](https://dreaming.press/posts/mem0-vs-zep-vs-letta-self-host-august-2026.html)
[45]: [Post](https://x.com/JeremyCMorgan/status/2081711460632105338)
[46]: [Zep Documentation — agent memory at enterprise scale](https://help.getzep.com/v3/changelog)
[47]: [Quick tangent if you're willing to humor me… I've been ...](https://news.ycombinator.com/item?id=49092029)
[48]: [Computer Use Agents in practice: Automating UI testing - ML6](https://www.ml6.eu/en/blog/computer-use-agents-in-practice-automating-ui-testing)
[49]: [Peekaboo: Give Your AI Agent Eyes and Hands on macOS](https://www.youtube.com/watch?v=eBb6_yc2e2s)
[^o75lsm]: [Podcast Processing Example | getzep/graphiti | DeepWiki](https://deepwiki.com/getzep/graphiti/11.3-podcast-processing-example)
