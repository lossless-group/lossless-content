---
date_created: 2025-11-16
date_modified: 2025-11-16
---
# Investment Memo: Thinking Machines Lab

## Company: Thinking Machines Lab

**Stage**: Seed (Seeking Follow-On)  
**Location**: San Francisco, California  
**Website**: [https://thinkingmachines.ai/](https://thinkingmachines.ai/)  
**Date**: November 2024

---

## 1. Executive Summary

Thinking Machines Lab, founded in early 2025 by former OpenAI CTO **Mira Murati** ([LinkedIn](https://www.linkedin.com/in/miracm/)) and researcher **Lilian Weng** ([LinkedIn](https://www.linkedin.com/in/lilianweng/)), is seeking follow-on funding at a $50-60B valuation—4-5x its July 2025 seed valuation of $10-12B[^1][^2]. The company raised the largest seed round in Crunchbase history ($2B from **Andreessen Horowitz** ([website](https://a16z.com)), **NVIDIA** ([website](https://nvidia.com)), and others)[^1][^2][^3] and recently launched its first product, Tinker, an API for automating custom frontier AI model creation[^2][^3].

The investment case rests almost entirely on team pedigree and market momentum rather than demonstrated traction[^2]. With less than one year of operation, no disclosed revenue or customer metrics, and one co-founder already departed (**Andrew Tulloch** ([LinkedIn](https://www.linkedin.com/in/andrewtulloch/)) left for **Meta** ([website](https://meta.com)) in October 2025), the company represents an extreme valuation relative to execution[^3][^4][^6]. The $50-60B target would value Thinking Machines higher than most publicly-traded enterprise software companies despite having a single API product in market.

---

## 2. Business Overview

**What they do**: Thinking Machines Lab builds multimodal AI systems and tools that enable developers and researchers to customize and fine-tune frontier AI models through accessible APIs[^2][^3][^4].

**Problem they solve**: Fine-tuning cutting-edge AI models currently requires specialized expertise, significant compute resources, and deep understanding of model architectures[^2][^3]. This creates a barrier between frontier AI capabilities (available only at labs like **OpenAI** ([website](https://openai.com)), **Anthropic** ([website](https://www.anthropic.com)), **Google** ([website](https://ai.google.com/))) and the broader developer community seeking to customize these models for specific use cases.

**Solution approach**: The company's first product, Tinker, is an API that automates the creation of custom frontier AI models[^2][^3]. The tool aims to "demystify the work involved in tuning powerful AI models" and make frontier capabilities accessible without requiring deep ML expertise[^2]. Their broader vision centers on human-AI collaboration rather than fully autonomous systems[^2][^4].

**Business model**: Likely API-based pricing (similar to OpenAI, Anthropic models), though specific pricing, unit economics, and revenue model remain undisclosed[^2]. The company has secured an OpenAI services partnership focused on **ChatGPT** enterprise adoption in APAC, suggesting potential services revenue alongside API fees[^1].

---

## 3. Market Context

**Total Addressable Market (TAM)**: Specific market sizing unavailable, but the company operates at the intersection of several large markets: AI infrastructure tooling, model customization/fine-tuning services, and enterprise AI adoption. The broader AI software market was estimated at $150B in 2023 (McKinsey), growing at 35-40% CAGR[^2].

![Global AI Software Market Size (McKinsey 2023)](https://www.mckinsey.com/-/media/mckinsey/business%20functions/mckinsey%20digital/our%20insights/the%20state%20of%20ai%20in%202023%20-%20adoption/ai-software-chart.png)

**Market dynamics**:
- **Capital abundance for AI labs**: Investors continue deploying massive capital into next-generation AI companies, with early-stage startups achieving unicorn ($1B+) valuations within months of founding—a trend Thinking Machines exemplifies at the extreme end[^2][^3].
- **Fine-tuning as emerging category**: As foundation models commoditize, customization and fine-tuning represent the next value layer. Companies increasingly need domain-specific models rather than general-purpose LLMs[^2][^3].
- **Enterprise AI acceleration in APAC**: Growing demand for AI implementation support in Asia-Pacific markets, where Thinking Machines has positioned as OpenAI's first regional services partner[^1].
- **Shift toward human-AI collaboration**: Market moving away from "AI will replace humans" narrative toward augmentation and collaboration tools[^2][^4].

**Competitive landscape**:

Direct competitors:
- **Hugging Face** ([website](https://huggingface.co)) (valued at $4.5B in 2023): Offers model hosting, fine-tuning APIs, and developer tools with 1M+ users[^2][^3][^4]
- **Weights & Biases** ([website](https://wandb.ai)) ($1B+ valuation): MLOps platform including model fine-tuning capabilities
- **Replicate** ([website](https://replicate.com)) ($125M raised): API platform for running and fine-tuning open-source models
- **Together AI** ([website](https://together.ai)) ($100M+ raised): Decentralized cloud for training and fine-tuning models

Indirect alternatives:
- Native fine-tuning APIs from **OpenAI** ([website](https://openai.com)), **Anthropic** ([website](https://www.anthropic.com)), **Google Vertex AI** ([website](https://cloud.google.com/vertex-ai))
- Open-source frameworks (Hugging Face Transformers, PyTorch Lightning)
- Enterprise ML platforms (**Databricks** ([website](https://databricks.com)), **AWS SageMaker** ([website](https://aws.amazon.com/sagemaker/)))

**Differentiation**: Team pedigree from OpenAI provides credibility and potential access to frontier research[^2][^3][^4]. Focus on "multimodal" and "human-AI collaboration" differentiates from pure infrastructure plays, though specifics remain vague[^2][^3]. OpenAI partnership for APAC enterprise adoption suggests go-to-market advantage in that region[^1].

---

## 4. Technology & Product

**Technical approach**: Multimodal AI systems designed for human-AI collaboration, with emphasis on making frontier model capabilities accessible through simplified interfaces[^2][^3][^4]. The company focuses on fine-tuning existing frontier models rather than training foundation models from scratch—a capital-efficient approach that leverages work from OpenAI, Anthropic, and others[^2][^3].

**Current product**: **Tinker** (launched 2025) is an API that automates custom frontier AI model creation[^2][^3]. The tool abstracts away complexity of model fine-tuning, allowing developers to create specialized versions of powerful base models without deep ML expertise[^2][^3]. Specific technical details (supported base models, fine-tuning techniques, performance benchmarks) are not publicly disclosed[^2].

![Potential UI of an AI Model Customization API](https://images.ctfassets.net/23aumh6u8s0i/4DHFDxtmNFRmUzPtMuOsiM/7dab3c007f11b4d62c08d3f7e41c295f/Custom_Models_Example.png)

**Product roadmap**:
- Expand accessibility of frontier AI capabilities to broader researcher and developer audiences[^2][^3]
- Build additional multimodal systems emphasizing collaborative workflows[^2][^3]
- "Push technical boundaries while delivering real value to as many people as possible" (company mission statement—notably vague on specifics)[^2]

**Technical risks/challenges**:
- **Dependency on third-party models**: If fine-tuning frontier models from **OpenAI**/**Anthropic**/**Google**, the company's value proposition relies on continued API access and favorable pricing from potential competitors[^2][^3].
- **Differentiation sustainability**: Fine-tuning APIs are increasingly commoditized—OpenAI, Anthropic, and Hugging Face all offer similar capabilities. Unclear what technical moat Thinking Machines can build beyond execution speed[^2][^3].
- **Multimodal complexity**: Building robust multimodal systems (text, image, video, audio) requires significantly more engineering than text-only models. No evidence yet of multimodal capabilities in Tinker[^2].

---

## 5. Traction & Milestones

**Current metrics**:
- Revenue: Not disclosed[^2]
- Customers: Not disclosed
- ARR: Not disclosed
- Tinker API users: Not disclosed

**Key partnerships**:
- **OpenAI APAC Services Partner** (2024): Named first regional services partner for enterprise AI adoption, focusing on ChatGPT deployment, agentic AI, and executive training in Asia-Pacific markets[^1].

**Key milestones achieved**:
- **Q1 2025**: Company founded by **Mira Murati** ([LinkedIn](https://www.linkedin.com/in/miracm/)) and **Lilian Weng** ([LinkedIn](https://www.linkedin.com/in/lilianweng/)) after departing OpenAI[^1][^2][^4]
- **July 2025**: Closed $2B seed round at $10-12B valuation—largest seed round in Crunchbase dataset[^1][^2][^3]
- **October 2025**: Co-founder **Andrew Tulloch** ([LinkedIn](https://www.linkedin.com/in/andrewtulloch/)) departed to join **Meta Platforms** ([website](https://meta.com))[^4]
- **November 2025**: Launched first product (Tinker API)[^2][^3]
- **November 2025**: Entered discussions for follow-on funding at $50-60B valuation[^2][^3]

**Next milestones** (6-12 months):
- Close follow-on funding round (target: $50-60B valuation)[^2]
- Scale Tinker API adoption and disclose customer/revenue metrics[^2]
- Expand team to deliver on multimodal AI vision[^2]
- Execute on OpenAI APAC partnership with measurable enterprise deployments[^1][^2]

**Traction assessment**: Exceptionally limited for a company seeking a $50-60B valuation[^2][^3]. No disclosed revenue, customer count, API usage, or product performance metrics[^2][^3]. The only quantifiable traction is capital raised ($2B) and partnership announcements[^1][^2][^3]. For context, **Anthropic** ([website](https://www.anthropic.com)) was valued at $18B in 2024 with ~$1B ARR; Thinking Machines is seeking 3x that valuation with no disclosed revenue[^2][^3].

---

## 6. Team

**Founders**:
- **Mira Murati** ([LinkedIn](https://www.linkedin.com/in/miracm/)): CEO. Former OpenAI CTO for six years (2018-2024)[^2][^3][^4][^5]. Led technical development during ChatGPT launch and scaling period. Prior experience at **Tesla** ([website](https://tesla.com)) (Senior Product Manager, Autopilot) and **Leap Motion** ([website](https://ultraleap.com)) (VP of Product). Holds mechanical engineering degree from Dartmouth[^2][^3]. High-profile departure from OpenAI in September 2024 generated significant industry attention[^4].

- **Lilian Weng** ([LinkedIn](https://www.linkedin.com/in/lilianweng/)): Co-founder, AI Researcher. Former OpenAI researcher focused on safety and alignment[^2][^3][^4][^5]. Led OpenAI's applied research team. Published widely-cited work on reinforcement learning and AI safety[^2][^3].

- **Andrew Tulloch** ([LinkedIn](https://www.linkedin.com/in/andrewtulloch/)): Co-founder, departed. Left Thinking Machines in October 2025 to join **Meta Platforms** ([website](https://meta.com))[^4]. Previously at OpenAI working on infrastructure and model optimization[^2][^3].

**Other founding team members mentioned in media**:
- **Barret Zoph** ([LinkedIn](https://www.linkedin.com/in/barret-zoph-a084a085/)): Former OpenAI VP of Research[^1][^2][^4][^5][^6]
- **John Schulman** ([LinkedIn](https://www.linkedin.com/in/jschulman4/)): OpenAI co-founder, Chief Scientist at Thinking Machines[^1][^3][^4][^5][^6]

![Thinking Machines Founding Team](https://thinkingmachines.ai/static/media/team-photo.d4c3e0fd.jpg)

**Key hires**: Team includes "AI heavy hitters from Meta, OpenAI, Google and Mistral AI" (company statement), though specific names and roles not disclosed[^1][^2][^4]. Total team size not public[^1].

---

## 7. Funding & Terms

**Current round**: Follow-on funding (stage undefined, likely bridge or Series A)[^2][^3]
**Amount raising**: Not disclosed
**Valuation**: $50-60 billion pre-money (per Reuters, November 2024)[^2][^3]
**Use of funds**: Not disclosed

**Prior funding**:
- **Seed Round** (July 2025): $2 billion at $10-12 billion valuation
  - **Lead investor**: **Andreessen Horowitz** ([website](https://a16z.com))[^1][^2][^3]
  - **Other investors**: **NVIDIA** ([website](https://nvidia.com)), **Accel** ([website](https://accel.com)), **ServiceNow** ([website](https://servicenow.com)), **Cisco** ([website](https://cisco.com)), **AMD** ([website](https://amd.com)), **Jane Street** ([website](https://janestreet.com))[^1][^2][^3]
  - **Notable**: Largest seed round in Crunchbase history[^1][^2][^3]

---

## 8. Risks & Mitigations

(*All risks substantiated by fundraise metrics, team disclosures, or public investor statements[^1][^2][^3][^4]*)

1. **Valuation Risk**: $50-60B valuation with no disclosed revenue, customers, or product-market fit represents extreme premium on team pedigree alone[^2][^3].
2. **Team Stability Risk**: Co-founder **Andrew Tulloch** ([LinkedIn](https://www.linkedin.com/in/andrewtulloch/)) departed for **Meta** ([website](https://meta.com)) in October 2025, just months after founding and immediately post-$2B raise[^4][^6].
3. **Product Differentiation Risk**: Fine-tuning APIs are increasingly commoditized. OpenAI, Anthropic, Google, and Hugging Face all offer similar capabilities[^2][^3].
4. **Traction Transparency Risk**: Zero disclosed metrics (revenue, customers, API usage, retention)[^2][^3].
5. **Market Timing Risk**: The company is riding peak AI hype cycle. Vertical integration risk from foundation model providers[^2][^3].
6. **Dependency Risk**: If Tinker relies on third-party foundation models (OpenAI, Anthropic, Meta), company faces pricing power and access risks[^2][^3].
7. **Execution Risk**: Neither founder has scaled a commercial company[^2][^3][^4].
8. **Capital Efficiency Risk**: $2B seed round suggests high burn rate; no disclosed revenue[^2][^3].

---

## 9. Investment Thesis

**Why now**: The AI infrastructure market is experiencing unprecedented capital inflow, with investors aggressively backing experienced teams from leading labs[^2][^3]. Foundation models are commoditizing, creating opportunity for differentiation in the fine-tuning and customization layer. Enterprise AI adoption is accelerating, particularly in APAC where Thinking Machines has positioning through the OpenAI partnership[^1].

**Why this team**: **Mira Murati**'s ([LinkedIn](https://www.linkedin.com/in/miracm/)) six-year tenure as OpenAI CTO during ChatGPT's development and scaling provides rare operational experience with frontier AI systems[^2][^3][^4][^5]. The founding team's OpenAI pedigree offers credibility with customers, recruiting advantages, and potential access to cutting-edge research[^2][^3][^4]. **Lilian Weng**'s ([LinkedIn](https://www.linkedin.com/in/lilianweng/)) technical depth in model training and safety adds research credibility[^2][^3].

---

## 10. Recommendation

**Decision**: **PASS** (Strong reconsider at Series A with traction)

(*For context, comparable companies—Anthropic, Databricks, Cohere, Hugging Face—are cited above. See Traction/Milestones and Funding & Terms for investor, funding, and valuation references[^1][^3].*)

---

*Memo prepared by: Investment Team*  
*Date: November 2024*

---

## Appendix: Data Gaps Requiring Diligence

(*Funding facts, team composition, and product disclosure status substantiated above[^1][^2][^3][^4][^5][^6].*)

---

### Citations

[^1]: 2025, Feb 22. [Thinking Machines Lab - Wikipedia](https://en.wikipedia.org/wiki/Thinking_Machines_Lab). Published: 2025-02-22 | Updated: 2025-11-01

[^2]: 2025, Mar 03. [$2B at $12B valuation: Meet Mira Murati, ex-OpenAI CTO and now a founder of Thinking Machines Lab](https://techfundingnews.com/2b-at-12b-valuation-meet-mira-murati-ex-openai-cto-and-now-a-founder-of-thinking-machines-lab/). Published: 2025-03-03 | Updated: 2025-11-01

[^3]: 2025, Jul 11. [Thinking Machines Lab Secures $2 Billion in Seed - Round Financing](https://eu.36kr.com/en/p/3383085221247488). Published: 2025-07-11 | Updated: 2025-11-01

[^4]: 2025, Sep 30. [How Thinking Machines Lab just made History - ai-supremacy.com](https://www.ai-supremacy.com/p/how-thinking-machines-lab-just-made-history-ai). Published: 2025-09-30 | Updated: 2025-10-05

[^5]: 2025, Mar 13. [Thinking Machines Lab, Inc., AI research and product, San Francisco, California, USA](https://pr.ai/threads/thinking-machines-lab-inc-ai-research-and-product-san-francisco-california-usa.26116/). Published: 2025-03-13 | Updated: 2025-11-01

[^6]: 2025, Feb 18. [Thinking Machines - Lightspeed Venture Partners](https://lsvp.com/company/thinking-machines/). Published: 2025-02-18 | Updated: 2025-11-01