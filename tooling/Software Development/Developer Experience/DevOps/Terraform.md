---
date_created: 2025-08-28
date_modified: 2026-08-17
url: https://developer.hashicorp.com/terraform
parent_org: "[[organizations/HashiCorp|HashiCorp]]"
og_title: Terraform | HashiCorp Developer
og_description: Explore Terraform product documentation, tutorials, and examples.
og_image: https://developer.hashicorp.com/og-image/terraform.jpg
og_favicon: https://developer.hashicorp.com/favicon.ico
og_last_fetch: 2025-08-28T18:18:04.354Z
tags:
  - Dev-Ops-Tools
  - Infrastructure-as-Code
site_uuid: 6be87d98-4a1e-46e2-9254-44abb2067c22
publish: true
title: Terraform
slug: terraform
at_semantic_version: 0.0.0.1
cf_last_run: 2026-08-17T17:52:52.144Z
cf_last_run_model: Perplexity sonar-pro
---

[[Vocabulary/Dev Ops|DevOps]]
[[concepts/Infrastructure-as-Code|Infrastructure-as-Code]]

https://youtu.be/Hn-TzyVG2Rg?is=XSkB81OupIKQEYAB

# Value Proposition & Features

Terraform is a **[[organizations/HashiCorp|HashiCorp]] [[concepts/Infrastructure-as-Code|Infrastructure-as-Code]] (IaC) platform** that lets organizations define, provision, and manage cloud, private datacenter, and SaaS infrastructure through declarative configuration files, using a single workflow across environments. [^ythv8y] [^3uzmtj] It standardizes multi-cloud and hybrid provisioning by describing desired state in HashiCorp [[Configuration Languages]] (HCL) and applying changes safely and repeatably. [^6u322x] [^0esons] Terraform’s ecosystem includes the open-source [[Vocabulary/Command-Line Interfaces|CLI]] engine plus **HCP Terraform** (managed SaaS) and **Terraform Enterprise** (self-hosted), giving teams collaboration, governance, and automation at scale. [^3uzmtj] [^j3jjqr]

Core features (each 2–3 sentences):

- **Infrastructure as Code engine (Terraform OSS CLI)**  
  Terraform OSS is the core open-source engine that reads declarative HCL configuration, builds an execution plan (`terraform plan`), and applies changes to match infrastructure to the desired state across thousands of providers. [^6u322x] [^3uzmtj] It maintains a *state file* to track what has been provisioned, enabling repeatable, version-controlled changes and safe updates over time. [^ajb309] [^0esons]

- **Multi-cloud and multi-provider orchestration**  
  Terraform can manage compute, networking, databases, SaaS resources, and more across major clouds including AWS, Azure, Google Cloud, Alibaba Cloud, and Tencent Cloud, as well as many third-party services. [^3uzmtj] [^02z844] This provider-agnostic model lets teams use one workflow and language for heterogeneous estates instead of cloud-specific tools. [^6u322x] [^t5p29w]

- **Plan / Apply workflow and change previews**  
  Terraform’s core workflow is *Write → Plan → Apply*: engineers define resources in `.tf` files, run `terraform plan` to preview exactly what will be created, changed, or destroyed, then run `terraform apply` to execute the changes. [^6u322x] [^ajb309] The plan step surfaces diffs before any change occurs, reducing risk and making infrastructure changes auditable and reviewable. [^ajb309] [^0esons]

- **State management and dependency graph**  
  Terraform tracks existing resources in a state file and uses a dependency graph to determine which changes can be applied in parallel and which must be serialized. [^3uzmtj] [^0esons] This state-driven model lets Terraform compute the minimal set of operations needed to converge reality to the desired configuration. [^ajb309] [^t5p29w]

- **HCP Terraform (formerly Terraform Cloud) managed platform**  
  HCP Terraform is HashiCorp’s SaaS control plane for Terraform, providing remote execution, shared state storage, team access controls, policy enforcement (Sentinel, OPA, and tfpolicy), and a private module registry. [^3uzmtj] [^j3jjqr] It adds features like workspaces and Stacks, registry tagging, project-level run tasks, and recovery workflows such as workspaces and Stacks restore. [^sq73in] [^uc74nv]

- **Terraform Enterprise (self-hosted)**  
  Terraform Enterprise is a self-hosted deployment of the HCP Terraform feature set for organizations that need to run the platform in their own environments. [^3uzmtj] [^j3jjqr] It offers enterprise governance, SSO/SCIM integration, policy controls, and auditability aligned with on-prem or regulated requirements. [^j3jjqr] [^dv3w72]

- **Terraform Registry and ecosystem**  
  The Terraform Registry is the official hub for providers and modules, giving users reusable building blocks for cloud infrastructure and services. [^3uzmtj] [^j3jjqr] It underpins a large ecosystem of community and vendor-maintained modules that accelerate adoption and standardize patterns. [^3uzmtj] [^t5p29w]

- **Policy as code with tfpolicy (Terraform Policy)**  
  HashiCorp introduced **tfpolicy**, a native HCL-based policy-as-code framework built directly into Terraform and available in public beta on HCP Terraform. [^qhvi5t] [^r3d7iw] Terraform Policy lets platform teams define governance rules in HCL and enforce them at each stage of the infrastructure lifecycle, including initialization, with HCP Terraform evaluating these policies during runs. [^ijk4mx] [^me2bxs]

### Key Features (5–8 bullets, priority order)

- **Open-source IaC engine using declarative HCL to define, plan, and apply infrastructure changes with state management and dependency graphs.** [^6u322x] [^3uzmtj]  
- **Multi-cloud, multi-provider orchestration across AWS, Azure, GCP, Alibaba Cloud, Tencent Cloud, and many SaaS platforms through an extensive provider ecosystem.** [^3uzmtj] [^02z844]  
- **Standardized Write/Plan/Apply workflow that previews diffs before changes, enabling safe, auditable modifications.** [^6u322x] [^ajb309]  
- **HCP Terraform managed platform for remote state, team collaboration, policy enforcement (Sentinel, OPA, tfpolicy), workspaces, and Stacks.** [^j3jjqr] [^uc74nv]  
- **Terraform Enterprise self-hosted deployment with enterprise-grade governance, SSO, and compliance capabilities.** [^3uzmtj] [^j3jjqr]  
- **Terraform Registry for providers and modules, enabling reuse and best-practice infrastructure patterns.** [^3uzmtj] [^t5p29w]  
- **Native policy-as-code (tfpolicy / Terraform Policy) in HCL, integrated into HCP Terraform to enforce governance at multiple lifecycle stages.** [^qhvi5t] [^ijk4mx]  
- **Ongoing versioned releases (e.g., Terraform 1.15, 1.16 betas, 1.17 alphas) and active provider updates (AWS, AzureRM, GCP) maintaining modern cloud support.** [^swb2w5] [^we0tck] [^v8p4sl] [^9mqsjj] [^1aw423]

---

## Product Roadmap / Announcements

As of August 17, 2026,

- **2026-08-05 – “HCP Terraform is the control plane for AI-driven infrastructure”**: HashiCorp positions HCP Terraform as the control plane for AI-driven infrastructure, emphasizing modules from Private Module Registry, mandatory policy on every run, scoped identities with RBAC and dynamic credentials, and treating run history as an evidence layer. [^lvj23l] [^uc74nv]  
- **2026-07-28 – AzureRM provider 5.0 GA**: HashiCorp announced general availability of the Terraform AzureRM provider 5.0, a major version with behavior changes and removed deprecated resources, accompanied by a 5.0 upgrade guide. [^9mqsjj] [^5othvl]  
- **2026-07-23 – “Terraform introduces workspaces and Stacks restore, and more”**: New features include workspaces and Stacks restore (GA), monorepo support for Stacks (GA), guided CLI migration from workspaces to Stacks (public beta), registry tagging with project registry view (GA), and enhanced project/workspace policy override permissions in HCP Terraform and Terraform Enterprise 2.0.0. [^sq73in] [^uc74nv]  
- **2026-07-20 – Introducing tfpolicy (Terraform Policy)**: HashiCorp launched tfpolicy in public beta, enabling governance policies written in HCL and integrated into HCP Terraform runs, with documentation available on the developer portal. [^qhvi5t] [^r3d7iw]  
- **2026-05-14 – Delegated policy overrides**: HCP Terraform added delegated policy override permissions so organization owners can grant teams the ability to override failed soft-mandatory policies for specified projects and workspaces. [^emuwn9] [^mpb729]  
- **2026-05-13 – HCP account linking in SSO**: The SSO sign-in flow now links standalone Terraform Cloud accounts to HCP accounts and authorizes the SSO organization in a single step, simplifying identity and org management. [^emuwn9] [^mpb729]

---

## Recent Developments (past 90 days)

- **Security patches for Terraform MCP Server**: HashiCorp patched three vulnerabilities in the Terraform MCP Server (which connects AI assistants to Terraform via Model Context Protocol), including CVE-2026-16498 with a CVSS score of 10.0, fixed in version 1.1.0 and further improved in 1.2.0. [^lvq3wl] [^64a37b]  
- **Terraform core releases**: Terraform 1.15 reached GA earlier in 2026, with 1.15.8 as the latest patch, while 1.16.0 builds on the downloads page are alpha or beta and not yet recommended for production; 1.16.0-beta1 (published July 23, 2026) adds features such as a `destroy = false` lifecycle enhancement. [^b64i73] [^ty2gdp] [^we0tck] [^v8p4sl]  
- **Terraform 1.16 release candidate**: On August 12, 2026, HashiCorp shipped Terraform 1.16 as a release candidate, enabling import blocks inside modules and introducing a `store` block on `terraform_data` for preserving ephemeral and sensitive values across plan/apply cycles. [^0z104h] [^my2la7]  
- **Terraform 1.17 alpha**: Terraform v1.17.0-alpha20260812 includes updates such as improved diagnostics for renewing ephemeral resources and a new `format_version` field in JSON output to support safer format evolution. [^qk5xkw] [^we0tck]  
- **Provider ecosystem updates**: The Terraform AWS provider (hashicorp/terraform-provider-aws) continues frequent releases through 2026 with weekly to biweekly cadence (e.g., v6.50.0 through v6.58.0), indicating active maintenance; AzureRM 5.0.0 is a major release, and GCP provider updates also continue. [^1aw423] [^9mqsjj] [^swb2w5]  
- **HCP Terraform enhancements in changelog**: The HCP Terraform changelog records ongoing updates such as project-level run tasks, improved workspace tagging filters, and token expiration notifications, reflecting continuous platform improvements. [^mpb729] [^emuwn9]

---

# History and Origin Story

Terraform is the leading open-source Infrastructure as Code tool created by HashiCorp, first released as Terraform v0.1 in 2014 to provide declarative, multi-cloud infrastructure provisioning via HCL. [^02z844] [^3uzmtj] HashiCorp itself was founded by Mitchell Hashimoto (later joined by Armon Dadgar as co-founder) after they met at the University of Washington and moved to San Francisco, focusing on infrastructure automation tools including Vagrant, Consul, Vault, and Terraform. [^78es31] [^431h8y] [^9w9sgc] Key Terraform milestones include the introduction of Terraform Cloud (now HCP Terraform) in 2018, HashiCorp’s IPO in 2021, a license change from MPL to BSL in 2023 that led to the [[OpenTofu]] fork, and IBM’s acquisition of HashiCorp for approximately $6.4–6.4 billion in 2024–2025, making Terraform central to IBM’s hybrid-cloud strategy. [^02z844] [^is83ok] [^j3jjqr] [^pe0zn8]

---

## Fundraising History

(HashiCorp funding, as it relates to Terraform; rounds are at the HashiCorp level.)

| Round       | Date                                                 | Amount                                                                                                                        | Lead investor                                                                   |
| ----------- | ---------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| Series A    | ~2012–2013 (approx., not precisely dated in sources) | Not disclosed in cited sources                                                                                                | Notable Capital (participated; investor narrative describes leading Series A)   |
| Series B–E  | Over “next decade” (five rounds A–E)                 | Not disclosed individually; company scaled from zero revenue to >$600M annualized                                             | Not specified in available source; investors include Notable Capital and others |
| IPO         | Dec 2021                                             | Amount not detailed in the narrative; successful NASDAQ IPO                                                                   | Public markets (NASDAQ)                                                         |
| Acquisition | Feb 27, 2025 (deal closed)                           | Approximately $6.4 billion enterprise value                                                                                   | IBM                                                                             |
| **Total**   | 2012–2025                                            | Precise venture funding total not provided; company scaled to >$600M annualized revenue pre-IPO and exited to IBM for ~$6.4B. | —                                                                               |
Sources for Table: [^6usoy9] [^02z844] [^pe0zn8] [^j3jjqr] [^431h8y]


Investors (alphabetical, based on cited sources):

- IBM (acquirer). [^pe0zn8] [^j3jjqr]  
- [[Notable Capital]] (venture investor backing HashiCorp across multiple rounds). [^6usoy9]  

---

## Notable Team Members

- **Mitchell Hashimoto (Creator of Terraform, HashiCorp co-founder)**  
  Mitchell Hashimoto co-founded HashiCorp with Armon Dadgar and created multiple tools including Vagrant, Packer, Consul, Terraform, Vault, and Nomad; he served as CEO, CTO, and later an individual contributor before HashiCorp’s IPO and subsequent acquisition by IBM. [^431h8y] [^tw3sns] [^9w9sgc] He is widely recognized as the original creator of Terraform and other HashiCorp infrastructure tooling. [^ta8xqi] [^zhv2vs] [^tmhs4g]

- **Armon Dadgar (HashiCorp co-founder)**  
  Armon Dadgar met Mitchell Hashimoto at the University of Washington in 2008, joined him as co-founder of HashiCorp, and has been a key technical and leadership figure across the company’s products, including Terraform. [^78es31] [^431h8y] Their work started from making emerging public cloud technologies accessible to researchers and evolved into a full commercial platform for infrastructure automation. [^78es31] [^8ry4ig]

- **Dave McJannet (HashiCorp CEO)**  
  Dave McJannet is the CEO of HashiCorp, with more than 20 years of experience in open-source and infrastructure software, overseeing the commercial evolution of products like Terraform, Vault, and Consul, including the path to IPO and the IBM acquisition. [^9t2pwe] [^6usoy9]  

---

# Market Sizing

## Category, Market Size, and Category Growth

Terraform sits in the **Infrastructure as Code (IaC)** and broader **DevOps / infrastructure automation tools** categories. [^631oul] [^3uzmtj] Analyst estimates place the global Infrastructure as Code market at about **USD 1.6 billion in 2026**, projected to reach **USD 8.8 billion by 2035** at a **21% CAGR**. [^6fqb6h] Within the broader Infrastructure Automation market (USD 13.92 billion in 2025, projected USD 42.47 billion by 2035), IaC accounts for roughly **31%** of the market share, underscoring the importance of tools like Terraform. [^7wz0sv] [^25fd74] DevOps market estimates vary, but multiple sources characterize DevOps tools as a multi-billion-dollar segment with double-digit CAGR (often >20%), suggesting sustained growth for Terraform’s category. [^6rj9dy] [^0castr] [^pnru0b] [^631oul]

---

## Pricing

Terraform consists of a free open-source CLI plus paid HCP Terraform / Terraform Enterprise pricing based mainly on **Resources Under Management (RUM)**.

### Terraform OSS / CLI

- **Terraform CLI**: Free, open-source core IaC capability. [^6h0vje] [^3uzmtj]  

### HCP Terraform (SaaS platform – resource-based pricing)

| Tier      | Pricing (list)                            | Notes |
|-----------|-------------------------------------------|-------|
| Free      | Up to **500 managed resources**, 1 concurrent run, unlimited users. | Usage-based Free tier; legacy user-based Free plan ended March 31, 2026. |
| Essentials | Starting at **$0.10 per resource per month** (~$0.00013/hour). | First paid tier; includes a $500 trial credit in some offers. |
| Standard  | Starting at **$0.47 per resource per month** (~$0.00064/hour). | Adds governance features such as audit logs and drift detection. |
| Premium   | Starting at **$0.99 per resource per month** (~$0.00135/hour). | Top SaaS tier with advanced governance and private environment features. |
| Enterprise (self-hosted) | Quoted; marketplace indications around **$15,000/year** for limited workspace packages. | Pricing varies; generally enterprise-negotiated. |

Sources for Table: [^9faabc] [^6e1r1t] [^kcpk33] [^bku4qm] [^4aeta2] [^mcx34x] [^1fm35i] [^2ngv94] [^8mez68]

Additional notes:

- HashiCorp migrated HCP Terraform from per-seat pricing to **RUM** in 2023 and retired the legacy user-based Free plan on March 31, 2026, automatically migrating organizations to the enhanced Free tier capped at 500 managed resources. [^2ngv94] [^6e1r1t] [^bku4qm]  
- Some secondary sources still list older user-based tiers (Cloud Free, Team at $20/user/month, Business at $70/user/month), but current official pricing is resource-based according to HashiCorp’s own pricing page and recent analyses. [^4aeta2] [^cuz98o] [^hrr0k6] [^bku4qm]

---

## Revenue Trajectory Estimates

- An investor narrative reports HashiCorp scaling from **zero revenue to more than $600M annualized** over roughly a decade leading up to the IPO. [^6usoy9]  
- Separate commentary notes HashiCorp’s annual revenue “reported above 1 billion USD” in recent investor updates, reflecting growth in platform tools including Terraform. [^l9ij43] [^dlqo6b]  
- IBM’s filings and coverage highlight HashiCorp as a software asset contributing to recurring software revenue in IBM’s portfolio post-acquisition, reinforcing Terraform’s commercial significance, but do not break out Terraform-specific ARR. [^dlqo6b] [^5cge2x] [^l9tp6x]

---

# Competitive Landscape

## Who it’s for, who it’s not for

Terraform is primarily for **DevOps, cloud, platform, and SRE teams** that need a standardized, declarative, multi-cloud infrastructure provisioning workflow with strong state management, modularity, and enterprise governance options via HCP Terraform or Terraform Enterprise. [^3uzmtj] [^t4flmg] [^bqi814] It fits organizations ranging from startups to large enterprises that manage complex cloud or hybrid estates and want infrastructure as code integrated with CI/CD, compliance-as-code, and multi-team collaboration. [^t4flmg] [^7fadnw] [^d97adv]

Terraform is less suited for very small teams with simple, single-cloud stacks that prefer cloud-native templates or higher-level managed services, or for organizations that must avoid HashiCorp’s BSL licensing model and prefer fully open-source alternatives like OpenTofu. [^is83ok] [^bku4qm] [^c0nph9] It may also be a heavier solution than necessary for purely on-prem infrastructure without API-driven provisioning, or for teams that favor imperative configuration tools (e.g., Ansible alone) rather than declarative IaC. [^631oul] [^0cfho7] [^t5p29w]

---

## Viable Alternatives

- **OpenTofu** – Open-source fork of Terraform under the Linux Foundation, positioned as a drop-in, MPL-2.0 alternative that preserves HCL and ecosystem compatibility while avoiding HashiCorp’s BSL license. [^l37z87] [^nytx2m] [^ezvp84] [^meirl8]  
- **Pulumi** – IaC platform using general-purpose languages (TypeScript, Python, Go, C#) instead of HCL, often chosen by teams that want infrastructure definitions in “real” programming languages. [^7jvik3] [^l37z87] [^nytx2m]  
- **AWS CloudFormation / AWS CDK** – AWS-native IaC tools for teams “all-in on one cloud,” deeply integrated with AWS services and tooling. [^l37z87] [^7jvik3]  
- **Azure Bicep** – Microsoft’s declarative template language for Azure, a good fit for Azure-centric estates wanting first-party tooling. [^7jvik3] [^l37z87]  
- **Crossplane** – Kubernetes-native control plane that uses declarative configuration to manage cloud resources via CRDs, appealing to platform engineering teams building internal platforms. [^nytx2m] [^l37z87]

---

## Competitor Table

| Competitor | Description |
|------------|-------------|
| [OpenTofu](https://opentofu.org) | Open-source Terraform fork under the Linux Foundation, designed as a drop-in alternative that keeps HCL and the Terraform ecosystem while replacing the BSL license with MPL 2.0. |
| [Pulumi](https://www.pulumi.com) | IaC platform that uses general-purpose programming languages (TypeScript, Python, Go, C#, etc.) instead of HCL, targeting developers who prefer infrastructure definitions in familiar languages. |
| [AWS CloudFormation](https://aws.amazon.com/cloudformation) | AWS-native IaC service using JSON/YAML templates for resource provisioning, often chosen by teams fully invested in AWS and wanting tight integration with AWS tooling. |
| [AWS CDK](https://aws.amazon.com/cdk) | Cloud Development Kit that lets developers define AWS infrastructure using high-level constructs in languages like TypeScript and Python, layering abstractions over CloudFormation. |
| [Azure Bicep](https://learn.microsoft.com/azure/azure-resource-manager/bicep) | Domain-specific language for deploying Azure resources, offering a more ergonomic alternative to raw ARM templates for Azure-centric environments. |
| [Crossplane](https://crossplane.io) | Kubernetes-native infrastructure control plane that manages cloud resources via Kubernetes CRDs, suited to teams building internal platforms with GitOps and continuous reconciliation. |

Sources for Table: [^l37z87] [^nytx2m] [^ezvp84] [^meirl8] [^7jvik3] [^iildt7]

*(Links are descriptive only; they are not clickable URLs in this output as requested.)*


***

# Sources

[1]: [Best Infrastructure as Code Tools | Terraform Alternatives](https://www.envzero.com/blog/best-infrastructure-as-code-tools-and-terraform-alternatives)
[^7jvik3]: [Best Terraform Alternatives in 2026](https://www.pulumi.com/blog/best-terraform-alternatives/)
[3]: [Best Terraform Cloud Alternative in 2026 [Free Tier Ended]](https://www.envzero.com/blog/terraform-cloud-alternative)
[4]: [Best Terraform Cloud Alternatives in 2026](https://www.envzero.com/frameworks/best-terraform-cloud-alternatives-in-2026)
[^nytx2m]: [Best Infrastructure as Code Tools in 2026: Terraform, OpenTofu, Pulumi and Crossplane Compared](https://devtoollab.com/blog/best-infrastructure-as-code-tools)
[^l37z87]: [7 Best Terraform Alternatives (2026), Compared Honestly](https://terraform.alternative.to/)
[7]: [open source terraform alternatives](https://devtoollab.com/blog/tags/open-source-terraform-alternatives)
[^ezvp84]: [Best Alternatives to Terraform for Infrastructure Management](https://www.patchhog.dev/blog/best-alternatives-to-terraform-for-infrastructure-management)
[9]: [Terraform Alternatives 2026: OpenTofu vs Pulumi vs Spacelift vs env0](https://futurepicker.com/en/terraform-alternatives-opentofu-pulumi-spacelift-env0-crossplane-2026-en-2/)
[^c0nph9]: [Best Infrastructure-as-Code Tools in 2026 - DevOpsNess](https://www.devopsness.com/blog/best-iac-tools)
[11]: [7 Best Spacelift Alternatives (2026), Compared](https://pacelift.alternative.to/)
[^iildt7]: [Terraform Alternatives in 2026: OpenTofu, Pulumi, Spacelift, env0 ...](https://futurepicker.com/en/terraform-alternatives-opentofu-pulumi-spacelift-env0-crossplane-2026-en/)
[13]: [Who ChatGPT and Gemini recommend for infrastructure as code tools](https://glotier.com/guides/who-ai-recommends/infrastructure-as-code-tools)
[^meirl8]: [best infrastructure as code tools 2026](https://devtoollab.com/blog/tags/best-infrastructure-as-code-tools-2026)
[15]: [terraform vs opentofu comparison](https://devtoollab.com/blog/tags/terraform-vs-opentofu-comparison)
[16]: [IPO and investment rounds](https://skycliff.pro/calendar-ipo)
[^6usoy9]: [Backing Mitchell Hashimoto Again, 12 Years Later](https://www.notablecap.com/blog/backing-mitchell-hashimoto-again-12-years-later)
[18]: [Find Your Seed Funding: 15 Active VC Firms](https://www.rho.co/blog/seed-stage-vc)
[19]: [AI Funding Tracker: $100M+ Rounds & Valuations](https://sqmagazine.co.uk/ai-funding-tracker/)
[20]: [River Markets - Funding Rounds - CryptoRank](https://cryptorank.io/ico/river-markets)
[21]: [HA Sustainable Infrastructure Capital (HASI) Earnings Date ...](https://www.marketbeat.com/stocks/NYSE/HASI/earnings/)
[22]: [Turbopuffer IPO Timeline and Financing Details](https://forgeglobal.com/turbopuffer_ipo/)
[23]: [TOF Ventures: Funding Rounds and Investments](https://cryptorank.io/funds/tof-ventures/rounds)
[24]: [Israeli startups raise USD1.5b in July as AI infrastructure draws capital](https://israeldesks.com/israeli-startups-raise-usd1-5b-in-july-as-ai-infrastructure-draws-capital/)
[25]: [IBM Stock Could Be In 'Holding Pattern' After Huge Sell-Off](https://www.investors.com/news/technology/ibm-stock-q2-2026-ai-capex-holding-pattern/)
[26]: [Venture Archives](https://news.crunchbase.com/sections/venture/)
[27]: [CB Insights Reports Q2 2026 Digital Health Funding Decline as AI ...](https://hlth.com/insights/news/cb-insights-reports-q2-2026-digital-health-funding-decline-as-ai-mega-rounds-drive-larger-deal-sizes)
[28]: [Eightco Holdings: Funding Rounds and Investments](https://cryptorank.io/funds/eightco-holdings/rounds)
[29]: [Shiprocket raises Rs 727 crore from anchor investors ahead of IPO launch - The Economic Times](https://economictimes.indiatimes.com/tech/technology/shiprocket-raises-rs-727-crore-from-anchor-investors-ahead-of-ipo-launch/articleshow/133159527.cms)
[30]: [Moonshot AI opens pre-IPO funding round for US$50b ...](https://www.thestandard.com.hk/innovation/article/339128/Moonshot-AI-opens-pre-IPO-funding-round-for-US50b-valuation)
[^tmhs4g]: [Terraform Company Overview | Infrastructure as Code · HashiCorp](https://www.16idc.com/en-us/coporation-detail/terraform)
[^78es31]: [HashiCorp Origin Story](https://www.hashicorp.com/zh/about/origin-story)
[^ta8xqi]: [An announcement from Superlogical | Jeff Goldschrafe](https://www.linkedin.com/posts/jgoldschrafe_an-announcement-from-superlogical-activity-7488418830440873984-6rY4)
[^tw3sns]: [Mitchell Hashimoto on X](https://x.com/mitchellh/status/2082500729361887525)
[^431h8y]: [Mitchell Hashimoto starts Superlogical to build durable ...](https://runtimewire.com/article/mitchell-hashimoto-superlogical-terminal-multiplexer)
[36]: [Mitchell Hashimoto on X: "@rcoacci @superlogical Yes." / X](https://x.com/mitchellh/status/2082504764865290646)
[^zhv2vs]: [Vercel Appoints Amit Agarwal, Standard Template Labs CEO and ...](https://www.cityam.com/vercel-appoints-amit-agarwal-standard-template-labs-ceo-and-former-datadog-president-to-board-of-directors/)
[^9w9sgc]: [Mitchell Hashimoto built a terminal used ...](https://x.com/the_vc_intern/status/2082846024230703246)
[39]: [IAM Architect / Technical Lead – HashiCorp Onboarding - Jobs](https://haystackapp.io/jobs/10eb1e92-9593-4ad7-8067-0dfacd4e124e)
[^9t2pwe]: [The Stack by HashiCorp](https://www.hashicorp.com/zh/blog/authors/dave-mcjannet)
[41]: [Mitchell Hashimoto on X: "@progrium Hi Jeff! Still a big fan of yours, not sure ...](https://x.com/mitchellh/status/2082962503978606915)
[^dv3w72]: [HashiCorp Terraform | Infrastructure as code provisioning](https://www.hashicorp.com/ar/products/terraform)
[43]: [HCP Terraform is the control plane for AI-driven infrastructure](https://www.hashicorp.com/de/blog/hcp-terraform-is-the-control-plane-for-ai-driven-infrastructure)
[44]: [Harshit-nema](https://myteam.exceeds.ai/profile/harshit-nema)
[45]: [Gaurang Chandrakant's Post](https://www.linkedin.com/posts/gaurang-chandrakant-bba6027a_the-general-availability-of-the-terraform-activity-7488279899586174976-vzBs)
[^6fqb6h]: [Infrastructure as Code Market Size & Forecast 2026-2035](https://dimensionmarketresearch.com/report/infrastructure-as-code-market/)
[47]: [North America Infrastructure As Code (IaC) Tool Market ...](https://www.linkedin.com/pulse/north-america-infrastructure-code-iac-tool-market-lbnvf)
[^25fd74]: [Infrastructure Automation Market Size to Hit $42.47 Billion ...](https://finance.yahoo.com/technology/articles/infrastructure-automation-market-size-hit-140000272.html)
[49]: [DevOps Tool Market Report by Product Type, End Use ...](https://www.linkedin.com/pulse/devops-tool-market-report-product-type-end-use-application-region-nagne)
[^0castr]: [DevOps Statistics 2026: Market Size & DORA Metrics - Panto AI](https://www.getpanto.ai/blog/devops-statistics)
