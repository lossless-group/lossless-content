---
url: https://dust.tt/
date_created: 2025-08-04
date_modified: 2026-09-13
og_title: Accelerate your entire organization with custom AI agents
og_description: The way we work is changing. Break down knowledge silos and amplify team performance with data-augmented, customizable and secure AI agents.
og_image: https://dust.tt/static/og_image.png
og_favicon: https://dust.tt/static/favicon.png
og_last_fetch: 2025-08-08T11:52:42.106Z
tags:
  - Agentic-Workspaces
  - Enterprise-AI
  - Agentic-AI
  - Data-Agents
  - AI-Toolkit
cf_last_run: 2026-09-13T02:45:20.822Z
cf_last_run_model: Perplexity sonar-pro
cf_retrieved_source_count: 1
cf_last_run_retrieval: 2026-09-13T02:45:20.822Z
for_clients:
  - Laerdal
  - Param
---

[[concepts/Explainers for AI/Agentic Workspaces|Agentic Workspaces]]

Dust.tt (Dust) is a **multiplayer, enterprise AI platform** for building and deploying secure, data-augmented AI agents that work alongside teams inside a shared workspace. [^E1] [^zmqus9] It connects company knowledge, tools, and multiple language models so organizations can create custom agents without code, embed them in daily workflows, and govern their use at scale. [^E1] [^s2ixfe] [^xb77h0] Dust targets companies that want **agentic workspaces** rather than one-off chatbots, closely aligning with tools categorized under [[concepts/Explainers for AI/Agentic Workspaces|Agentic Workspaces]] in your vault. [^hozv6l] [^b8agjc]

## Value Proposition & Features

### Value proposition (2–3 sentences)

Dust provides a **collaborative AI workspace** where people and agents share context, conversations, and tools, enabling teams to build, run, and continuously refine AI agents grounded in internal company data. [^E1] [^kls2el] [^b8agjc] It emphasizes “**multiplayer AI for human‑agent collaboration**,” replacing isolated assistants with shared agents that operate across CRM, helpdesk, analytics, and other systems to automate workflows and surface insights. [^E1] [^zmqus9] [^58op01] The platform is built for enterprise governance—SOC 2 Type II, EU/US data residency, and fine-grained credit and usage controls—so AI can be deployed safely across large organizations. [^h8ev19] [^pqp7ys] [^rpwo2r]

### Core product features (2–3 sentences each)

**1. Custom AI agents connected to company data**  
Dust lets teams build agents that read from internal sources like Slack, Notion, Google Drive, GitHub, Salesforce, and Zendesk, plus arbitrary tools via MCP servers and APIs. [^E1] [^zmqus9] [^3y9h1a] Agents are configured declaratively—teams describe what the agent should do and attach knowledge and tools—without writing execution code. [^n4xlmc] [^zdtt8r] These agents can then be shared across departments and accessed from the web app, Slack, and other integrations. [^E1] [^zmqus9] [^s2ixfe]

**2. Multiplayer workspaces and Pods**  
Dust workspaces host shared agents, conversations, files, and tasks so teams and agents collaborate from the same context. [^kls2el] [^b8agjc] Pods act as multiplayer project workspaces where people and agents co‑work on documents, automations, and files, with features like Pod tabs and shared memory. [^ds9j1v] [^kls2el] Pods and spaces also encode governance (connectors limits, MCP servers, credit pools) at the workspace level. [^8i6ja7] [^dq849u]

**3. Multi‑model orchestration and AI orchestration tools**  
Dust exposes more than 20 frontier and open‑source models (GPT, Claude, Gemini, Mistral, DeepSeek, etc.) behind one interface, with orchestration across models and tools. [^3y9h1a] [^zmqus9] [^ds9j1v] Teams can choose specific models (e.g., GPT‑5.6 Sol/Terra/Luna, GPT6 Astra, DeepSeek V4.1 Flash) or use automatic tiers like Basic/Standard/Premium that adapt cost–performance per message. [^ds9j1v] [^i7cdka] Dust’s AI orchestration patterns let custom agents hand tasks to each other in multi‑step workflows, grounded in company knowledge. [^58op01] [^g6jpkh]

**4. Agent memory and personalization**  
Dust’s **Agent Memory** feature lets agents remember user‑specific information (preferences, ongoing work context) across conversations to deliver more personalized, continuous assistance. [^4q82sc] [^1za99r] Memory can be wired into workflows so agents keep answers and context up to date when called from Slack and other surfaces. [^4q82sc] [^9bsuft]

**5. Automations, triggers, and scheduling**  
Dust supports scheduled agents and triggers that run workflows automatically, with admins choosing whether automations draw from workspace credit pools or programmatic pools. [^5ld7rj] [^i7cdka] Automations are monitored via usage and consumption analytics screens that show credit spend and model usage over time. [^ta71nk] [^c8mw7r] This makes it suitable for recurring processes like outbound sales, support triage, and EPM maintenance. [^tx0nru] [^6z2p54]

**6. Browser extension and Chrome capture**  
A Chrome extension lets users capture web page content, screenshots, and selected text into conversations or Pods, effectively turning the browser into an input surface for company knowledge. [^lmsha1] [^2dqnej] The extension integrates with the Dust API and workspace to store captured content and trigger agents against it. [^lmsha1] [^g6jpkh]

**7. Governance, security, and observability**  
Dust offers SOC 2 Type II compliance, GDPR‑aligned EU region (eu.dust.tt) with EU inference where possible, and workspace‑level governance including SCIM, audit logs, and custom retention. [^pqp7ys] [^8i6ja7] Enterprise plans add single‑tenant deployment, pooled credits, and custom legal terms (MSA, DPA, SLA). [^8i6ja7] [^1js3xb] Usage management and analytics pages give admins visibility into seat allocation, credit usage, and programmatic consumption. [^dq849u] [^ta71nk] [^k6zldj]

**8. Platform extensibility: MCP, API, SDKs**  
Dust exposes a public API, CLI, JavaScript SDK, and [[concepts/Explainers for AI/Model Context Protocol|MCP]] integrations so engineering teams can treat agents as platform components embedded in other products. [^n4xlmc] [^zmqus9] [^00bxl6] It also ships GitHub Actions and Chrome/extension tooling to integrate agents with CI workflows and the browser. [^ds9j1v] [^lmsha1]

### Feature bullets (5–8, priority order)

- **Multiplayer AI workspace** where people and agents share conversations, files, and tasks (Pods, spaces, shared agents). [^kls2el] [^b8agjc]  
- **No‑code agent builder** for defining agents with connected knowledge bases and tools, callable from the web app, Slack, and API. [^n4xlmc] [^3y9h1a]  
- **Data connectors & MCP tools**: 70+ connectors (Slack, Notion, Google Drive, GitHub, Salesforce, Zendesk, etc.) plus remote MCP servers. [^zmqus9] [^3y9h1a]  
- **Multi‑model support** with 20+ frontier and OSS models, including GPT‑5.6 family, GPT6 Astra, DeepSeek V4.1 Flash, and Claude/Gemini/Mistral. [^ds9j1v] [^3y9h1a]  
- **Agent Memory** for user‑specific, long‑lived context across conversations and workflows. [^4q82sc] [^1za99r]  
- **Automations & scheduling** with triggers, scheduled agents, and credit‑pool selection (workspace vs programmatic). [^5ld7rj] [^i7cdka]  
- **Enterprise governance**: SOC 2 Type II, EU/US data residency, SCIM, audit logs, single‑tenant option, custom retention. [^pqp7ys] [^8i6ja7]  
- **Chrome extension & APIs** to capture browser content into Pods and embed Dust in other apps and CI flows. [^lmsha1] [^ds9j1v]

## Screenshots

Publicly linked UI assets exist in the Dust codebase but not as clearly labeled marketing “screenshots”; no reliable, end‑user screenshots URLs are exposed in the sources (only internal static asset paths). [^yus98y] [^hf7c2x] No reliable source found.

## Product Roadmap / Announcements

As of September 13, 2026,

- **2026‑09‑11 – Files as Pod tabs and DeepSeek V4.1 Flash**: Dust added support for “Files as Pod tabs” so Pod editors can attach almost any file as a tab, and made DeepSeek V4.1 Flash available as a selectable model. [^ds9j1v]  
- **2026‑09‑05 – GPT6 Astra availability**: Dust added GPT6 Astra as an available model for agents and conversations, configurable per agent. [^ds9j1v]  
- **2026‑07‑10 – GPT‑5.6 Sol/Terra/Luna**: OpenAI’s GPT‑5.6 Sol, Terra, and Luna models were added to Dust, each optimized for different speed/cost/capability trade‑offs. [^ds9j1v]  
- **2026‑04‑08 – GitHub Action GA**: Dust released a GitHub Action to run agents in CI/CD, marking it as generally available and production‑ready. [^ds9j1v]  
- **2026‑08‑19 – Platform repositioning**: Monitoring identified a site update positioning Dust as “Multiplayer AI for human‑agent collaboration” and surfacing new MCP integrations, a Dust API, Chrome extension, and observability features. [^00bxl6]

## Recent Developments (past 90 days)

- **UK expansion and new London office**: Dust leased office space at the Fora Building in King’s Cross, its first formal UK office, joining Paris and San Francisco as physical locations and signaling a focus on UK fintech customers. [^z0wsak] [^w0aw1k]  
- **Series B coverage and growth metrics**: Multiple sources report Dust’s $40M Series B in May 2026 led by Sequoia and Abstract Ventures, bringing total funding above $60M, with ~3,000 organizations, 300,000+ agents deployed, and >$20M ARR. [^E1] [^23v4wr] [^a6ojbf] [^vfh3tu]  
- **Customer stories and rollouts**: DataValue Strategy’s 42‑person EPM consulting team is onboarding Dust as a standard tool from September 2026, including expert solution and maintenance agents. [^tx0nru] [^hrxo6z]  
- **Community and product feedback**: Dust’s community space is active, with product feedback sessions on a new agent builder and discussions about scheduling agents and webhooks. [^qlg0ch] [^m08zbs] [^5ld7rj]  
- **Benchmark and alternatives coverage**: Recent comparison pieces and alternatives lists place Dust among leading enterprise AI agent and orchestration platforms, emphasizing its fit for internal knowledge assistants. [^4ggh70] [^6056oc]

## History and Origin Story

Dust was founded in **Paris in early 2023** by **Gabriel Hubert** and **Stanislas Polu**, second‑time founders who previously built and sold the data/marketing analytics company TOTEMS to Stripe. [^E1] [^cy5vop] [^bm2aiu] [^d3ixit] They met at Stanford, later joined Stripe as early employees, and Polu subsequently worked as a research/software engineer at OpenAI while Hubert led product at French healthtech unicorn Alan before starting Dust to pursue multi‑model, agentic AI for enterprise workspaces. [^bm2aiu] [^byo2ja] [^w0aw1k] The company established a San Francisco presence in 2024 and in 2026 expanded with a UK office in London’s King’s Cross. [^w0aw1k] [^z0wsak]

## Fundraising History

### Rounds table

| Round     | Date       |      Amount | Lead investor                                                           |
| --------- | ---------- | ----------: | ----------------------------------------------------------------------- |
| Seed      | 2023-06-27 |       $5.5M | Sequoia Capital (w/ [[Seedcamp]], [[Connect Ventures]]) [^E1] [^vibr5m] [^bm2aiu] |
| Series A  | 2024-06-27 |      $16.1M | Sequoia Capital [^E1] [^vibr5m] [^jz3f61]                                         |
| Series B  | 2026-05-01 |      $40.0M | [[Sequoia Capital]] & [[Abstract Ventures]] [^E1] [^23v4wr] [^a6ojbf] [^n8n1we]        |
| **Total** | —          | **$61.5M+** | — [^E1] [^23v4wr] [^a6ojbf] [^wpuy9i]                                                  |

### Investors (alphabetical, one per line)

- Abstract Ventures [^a6ojbf] [^23v4wr]  
- Datadog (strategic participant) [^E1] [^23v4wr]  
- Connect Ventures [^vibr5m] [^bm2aiu]  
- Seedcamp [^vibr5m] [^a77n62]  
- Sequoia Capital [^E1] [^cy5vop] [^a6ojbf]  
- [[Snowflake Ventures]] (strategic participant) [^E1] [^a6ojbf]  

## Notable Team Members

**Gabriel Hubert (Co‑founder & CEO)**  
Gabriel Hubert is Co‑founder and CEO of Dust, based in Paris, with prior experience leading product at healthtech unicorn Alan and co‑founding TOTEMS before its acquisition by Stripe. [^kzu5o5] [^bm2aiu] [^w0aw1k] Multiple profiles and revenue trackers list him as Dust’s CEO and founding leader, and he frequently represents the company in media and investor conversations. [^b7rff3] [^z0wsak] [^jz3f61]

**Stanislas Polu (Co‑founder & CTO)**  
Stanislas Polu is Dust’s Co‑founder and CTO, a former OpenAI engineer and previous co‑founder of TOTEMS, now focused on secure generative AI in enterprise production through Dust. [^byo2ja] [^bm2aiu] [^w0aw1k] He regularly appears in technical AMAs and podcasts discussing multi‑model orchestration and agentic AI, and is cited as the technical lead for platform scaling. [^s0m0eq] [^byo2ja] [^jz3f61]

**Other notable leaders & roles**  
Dust has regional leads such as **Faateh Dhillon**, the UK Lead, who speaks publicly on multiplayer AI and the shift from isolated prompt boxes to collaborative agents. [^1eme94] It also hires “Founding AI Deployment Strategists” and partner/CS roles (e.g., Zach Friedland, founding AI deployment strategist in the US) to help enterprises roll out agents. [^kb8dop] Job postings emphasize a team originating from Stripe, OpenAI, and Stanford, backed by Sequoia. [^jz3f61] [^evh1i5]

## Market Sizing

### Category, Market Size, and Category Growth

Dust sits in the **enterprise agentic AI / AI agent platforms / agentic workspaces** category: platforms that let organizations build, govern, and deploy AI agents on internal data. [^zmqus9] [^kls2el] [^cra6h2] Estimates for the broader **enterprise agentic AI** and **AI agents** markets in 2026 range roughly **$5.9–$19.3B**, with CAGRs around **40–47%** toward 2030–2034. [^xhi8an] [^t8w8qs] [^nis6o6] Analysts synthesize major firms’ estimates to place agentic AI/agents around **$9–15B in 2026**, growing at 43–49% annually—consistent with Dust operating in a rapidly expanding, high‑growth segment. [^vv72sp] [^v44efm] [^2s5k8e]

### Pricing

| Tier                     | Price (monthly, list)                         | Key inclusions                                             |
|--------------------------|-----------------------------------------------|------------------------------------------------------------|
| Business – Free seat     | **$0**, 500 lifetime credits (one‑off)        | Access to 20+ models, create custom agents; credits never reset, meant for trial/occasional use. [^8i6ja7] [^9cuchd] [^zv5sgn] |
| Business – Pro seat      | **$30/seat/month**, or **$24 billed yearly**, 8,000 credits/seat/month. [^u8yvgj] [^shu0v8] [^eiz6qw] | Up to 3 data connectors, 5 Spaces, 5 remote MCP servers; 20+ models; multi‑agent workflows; SSO from 5 seats; US/EU data residency; SOC 2 Type II. [^8i6ja7] [^s2x367] |
| Business – Max seat      | **$150/seat/month**, or **$120 billed yearly**, 40,000 credits/seat/month. [^u8yvgj] [^shu0v8] [^eiz6qw] | Same features as Pro with higher credit volume for power users and heavy automation/deep research. [^8i6ja7] [^s2x367] |
| Enterprise               | **Custom pricing**                            | Unlimited connectors and MCP servers; pooled workspace credits and volume pricing; SCIM, audit logs, custom retention; single‑tenant deployment; dedicated CSM and SLA. [^8i6ja7] [^1js3xb] [^9cuchd] |

Credits do not roll over month to month, and the free tier’s 500 credits never reset, so sustained usage typically starts on Pro or Max. [^pqp7ys] [^pgd93j] [^hgzj0p]

### Revenue Trajectory Estimates

One analyst profile reports Dust at **$20M+ ARR** by 2026, with 240% net revenue retention in 2025 and more than 3,000 organizations using the platform. [^6z2p54] Another tracker estimates Dust’s 2025 revenue at **$7.3M ARR**, illustrating steep growth between 2025 and the 2026 figures cited in funding coverage. [^9lu4mo] [^6z2p54] Commentary in adjacent “company brain” analyses reinforces Dust as a validated category leader with $60M+ raised and $20M+ ARR. [^gf8nw5] [^wpuy9i]

## Competitive Landscape

### Who it’s for, who it’s not for

Dust is for **mid‑market and enterprise teams** that want shared, secure AI agents grounded in internal knowledge, with strong governance and multi‑model flexibility—e.g., customers like Datadog, 1Password, Vanta, Mirakl, Spendesk, and Pennylane. [^E1] [^be22v9] [^eqfa1z] It fits organizations with many knowledge workers across GTM, support, operations, and engineering who need structured agents to answer internal questions, orchestrate workflows, and be centrally managed. [^6056oc] [^kls2el]

Dust is **not** optimized for very small teams seeking simple task automation without internal data complexity, or highly regulated enterprises that require deterministic, on‑prem workflows and heavy compliance beyond SaaS (where platforms like Jinba or Rasa are emphasised instead). [^5q5mip] [^7p6t9n] For companies whose main constraint is deep integration into specific ecosystems (e.g., Salesforce, Microsoft 365, or on‑prem RPA), native platforms like Agentforce or Copilot Studio can be a better fit. [^atlz63] [^4u4p00] [^9uqqda]

### Viable Alternatives (3–5)

- **Relevance AI** – Focused on multi‑agent “workforces” that act across business systems; better for external task automation than Dust’s internal knowledge emphasis. [^qbk9qm] [^6056oc]  
- **Glean** – Enterprise search and AI agents tailored to knowledge‑heavy organizations, strong for search‑first “company brain” scenarios. [^qbk9qm] [^4ggh70]  
- **Microsoft Copilot Studio** – Best for Microsoft 365‑centric estates needing low‑code agent building plus deep governance integrated into existing identity and data. [^atlz63] [^9uqqda]  
- **Salesforce Agentforce** – Native Salesforce agents grounded in CRM and Data Cloud, ideal for sales/service workflows where Salesforce is the system of record. [^atlz63] [^4u4p00]  
- **Jinba** – On‑prem, deterministic agent platform for regulated industries (banks, insurers, legal, healthcare) needing audit‑ready, rule‑based workflows. [^5q5mip]

### Competitor Table

| Competitor                                      | Description |
|-------------------------------------------------|------------|
| [Relevance AI](https://dashpup.ai/alternatives/dust/) | Low‑code platform for building autonomous multi‑agent “workforces” with schedules, evaluations, and orchestrated actions across business systems. [^qbk9qm] [^6056oc] |
| [Glean](https://gumloop.com/blog/ai-agent-orchestration-platform) | Enterprise AI search and agent platform focused on unified knowledge retrieval and workplace search, often positioned alongside Dust for internal knowledge use cases. [^qbk9qm] [^4ggh70] |
| [Microsoft Copilot Studio](https://wecallshotgun.com/blog/enterprise-ai-agents-benchmark-2026) | Microsoft’s low‑code agent builder and orchestration suite for organizations standardized on Microsoft 365 and Azure, with deep governance and identity integration. [^atlz63] [^9uqqda] |
| [Salesforce Agentforce](https://wecallshotgun.com/blog/enterprise-ai-agents-benchmark-2026) | Salesforce’s agent platform that runs sales and service agents directly on CRM and Data Cloud, optimized for Salesforce‑centric sales/service teams. [^atlz63] [^0t16ob] |
| [Jinba](https://jinba.io/blog/dust-ai-alternative-enterprise) | Enterprise AI agent platform designed for regulated sectors, emphasizing on‑prem deployment, deterministic workflows, and audit‑friendly automation. [^5q5mip] |
| [CrewAI](https://gumloop.com/blog/ai-agent-orchestration-platform) | Developer‑oriented framework for multi‑agent orchestration, used by teams wanting code‑first control over collaborative agent workflows. [^zrn1fh] [^4ggh70] |


***

# Sources

[1]: [Dust.tt — обзор платформы AI-агентов и RAG](https://comrad404.com/tools/dust-tt/)
[2]: [dust-tt/dust - DeepWiki](https://deepwiki.com/dust-tt/dust)
[^s2ixfe]: [Dust TT Review: Agent Building for Teams - FindyourAI](https://findyourai.com/automation/dust-tt/)
[4]: [Dust | Vergleich KI](https://www.vergleich-ki.de/en/tool/dust-tt)
[^xb77h0]: [Dust: 4.6/5 from 8 verified reviews](https://www.softatlas.io/dust)
[^zmqus9]: [Dust Alternatives for Done-For-You AI | Singular](https://www.singular-innovation.com/comparisons/dust-vs-singular-innovation)
[^b8agjc]: [How Dust.tt Functions as a Multiplayer AI Platform for Modern ...](https://learn.oreateai.com/learn/how-dusttt-functions-as-a-multiplayer-ai-platform-for-modern-teams)
[8]: [Dust Pros & Cons [2026] (dust tt pros cons) | aitoolsatlas.ai](https://aitoolsatlas.ai/tools/dust-tt/pros-cons)
[^hozv6l]: [Dust bets enterprise AI is multiplayer; $16M Series A then $40M Series B, 300k agents](https://startups.center/w/dust-2024-multiplayer-ai-agent-bet)
[^58op01]: [What is AI orchestration? When you need it and how it works - Dust](https://dust.tt/blog/what-is-ai-orchestration)
[11]: [How DataValue Strategy delivers EPM projects 20% faster ...](https://dust.tt/customers/how-datavalue-strategy-delivers-epm-projects-20-faster-with-dust)
[^4q82sc]: [What is AI agent memory and how it works | Dust Blog](https://dust.tt/blog/ai-agent-memory)
[^kls2el]: [Dust AI: Agents, Company Data & Pricing](https://www.therundown.ai/tools/dust)
[14]: [Build your AI Outbound Cockpit - a Hands-On London Workshop](https://community.dust.tt/events/zsb2rm7agk5b/build-your-ai-outbound-cockpit-a-hands-on-lon)
[^h8ev19]: [Langdock vs Dust (2026): seat prices, credits, EU hosting](https://www.sokosumi.com/compare/langdock-vs-dust)
[^qbk9qm]: [6 Dust Alternatives for Enterprise AI Agents in 2026 - Dash](https://dashpup.ai/alternatives/dust/)
[^atlz63]: [Enterprise AI Agents: 2026 Benchmark & Buyer's Guide](https://wecallshotgun.com/blog/enterprise-ai-agents-benchmark-2026)
[^zrn1fh]: [Enterprise AI Agents: 15 Platforms Compared for 2025](https://monday.com/blog/ai-agents/enterprise-ai-agents/)
[19]: [Enterprise AI Agent Platforms Compared (2026)](https://nicchin.com/blog/enterprise-ai-agent-platforms)
[20]: ["Best Enterprise AI Agent Platforms in 2026: 15 Platforms for Procurement and Security Review"](https://resources.rework.com/tools/ai-agents/best-enterprise-ai-agent-platforms-2026)
[^4u4p00]: [Best Enterprise AI Agent Platforms in 2026: OpenAI ...](https://replacehumans.ai/best-enterprise-ai-agent-platforms/)
[22]: [8 best Lyzr AI alternatives I've tested in 2026](https://www.gumloop.com/blog/lyzr-ai-alternatives)
[^5q5mip]: [Best Dust AI Alternatives for Regulated Enterprises ...](https://jinba.io/blog/dust-ai-alternative-enterprise)
[^0t16ob]: [Best Enterprise AI Agent Platforms in 2026: Ranked & Compared](https://www.outrightcrm.com/blog/ai-agent-platforms/)
[25]: [Best AI agent platform in 2026: Enterprise and no-code solutions ...](https://xpander.ai/blog/best-ai-agent-platform)
[^7p6t9n]: [Best Enterprise Agentic Platforms for 2026: An Evidence-Based Evaluation | Boost.space](https://boost.space/blog/best-enterprise-agentic-platforms-2026)
[^9uqqda]: [Best Agent Management Platforms Compared (2026 Buyer's Guide)](https://www.mintmcp.com/blog/agent-management-platforms-compared)
[^4ggh70]: [10 best AI agent orchestration platforms and tools in 2026 - Gumloop](https://www.gumloop.com/blog/ai-agent-orchestration-platform)
[29]: [Best Agentic AI Tools, Platforms, and Frameworks in 2026](https://www.analyticsinsight.net/amp/story/ai-tools/best-agentic-ai-tools-platforms-and-frameworks-in-2026)
[30]: [Best integration platforms for enterprise AI agents in 2026 - LinkedIn](https://www.linkedin.com/pulse/best-integration-platforms-enterprise-ai-agents-2026-orchestration-tjose)
[^vibr5m]: [Dust alternatives and details | European Alternative](https://europeanalternative.com/products/dust)
[^a6ojbf]: [Paris AI Company Dust Raises $60m, Hits 3,000 Orgs with AI Agents](https://www.linkedin.com/posts/kevin-ampeh-7ab2a876_ai-europeantech-europeanai-activity-7498635724070604801-wFmC)
[33]: [Best French Startups to Watch in 2026](https://startupstash.com/french-startups/)
[34]: [Best Company Brain Tools in 2026 - (sento)](https://www.sentohq.com/posts/best-company-brain-tools-2026)
[35]: [Dust](https://sequoiacap.com/companies/dust)
[36]: [Changelog - Multiplayer AI](https://docs.dust.tt/docs/changelog)
[37]: [Dust Changelog & Updates [2026] (dust tt changelog) | aitoolsatlas.ai](https://aitoolsatlas.ai/tools/dust-tt/changelog)
[38]: [8 Best Relevance AI Alternatives in 2026 - Gamut](https://www.gamut.so/blog/relevance-ai-alternatives)
[39]: [60 Best AI Startups in Europe To Watch in 2026 [List] - OMNIUS](https://www.omnius.so/blog/ai-startups-in-europe)
[^6056oc]: [Dust, la plateforme française d'agents IA en entreprise](https://promptfacile.fr/outils/dust/)
[^cra6h2]: [Boletín de septiembre 2026 - ¡Todas las novedades del verano!](https://pivotalskills.ai/es/actualites/newsletter-septembre-2026-toutes-les-nouveautes-de-l-ete)
[42]: [Filip Stanev](https://community.dust.tt/members/81b81b35-db17-47f2-a0a7-2274ef52cb04)
[43]: [Windsurf’s rename turns Devin Desktop into a migration decision](https://agentic.ai/insider/2026-08-19)
[44]: [Dust Community](https://community.dust.tt/)
[45]: [Dust on X: "Dust v0.4.0 is live. What's new: ( Product Update ...](https://x.com/DustLabsX/status/2096293099064430685)
[^ds9j1v]: [Tung Vu thanh](https://community.dust.tt/members/8200b252-d9ed-4d88-aeb5-c5b6d8d46221)
[47]: [Moveworks Extends AI Agent Platform to IT HR Finance ...](https://www.linkedin.com/posts/anas-azeem-653b17289_agenticai-ai-artificialintelligence-activity-7494680780430819328-UBJn)
[^i7cdka]: [Adrien (Dust)](https://community.dust.tt/members/2f6e1044-43d7-47c6-a3e4-b1e4ca868a6d)
[^tx0nru]: [Paul Cothenet](https://community.dust.tt/members/1e14fca0-f7ea-42b4-a0d6-399aef4b1e28)
[^m08zbs]: [Faateh Dhillon, Dust's UK Lead, is speaking at TechBBQ He'll be ...](https://www.linkedin.com/posts/dust-tt_faateh-dhillon-dusts-uk-lead-is-speaking-activity-7495753494650548225-sOCi)

## Sources (retrieved)

[^E1]: [Exa.ai](https://exa.ai) API response for data on [Dust](https://dust.tt/)
