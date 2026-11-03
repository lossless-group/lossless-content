---
date_created: 2026-10-08
date_modified: 2026-10-16
aliases:
  - drug-discovery
site_uuid: c00aa89f-ba8f-4474-ba6d-df28cfbea5ec
publish: true
title: Drug Discovery
slug: drug-discovery
at_semantic_version: 0.0.0.1
cf_last_run: 2026-10-16T16:06:07.315Z
cf_last_run_model: Perplexity sonar-deep-research
---

[[concepts/Explainers for AI/AI Powered Research|AI Powered Research]]

---
title: Drug Discovery
---

# Snapshot

_The drug-discovery market comprises the tools, platforms, laboratories, and outsourced research services used to turn biological hypotheses into development candidates; its fastest-growing subcategory combines AI, proprietary experimental data, automation, and medicinal chemistry in closed discovery loops. The market is shifting from software that advises scientists toward vertically integrated “techbio” businesses that design molecules, run experiments, and retain economics in resulting drug assets._

> “MarketsandMarkets projects the global AI-in-drug-discovery market to grow from **$5.09 billion in 2026 to $17.56 billion in 2031**, a **28.1% CAGR**.” [5]

This profile captures the category as of **October 2026**, emphasizing AI-enabled discovery while retaining the broader infrastructure and services businesses that enterprise R&D organizations actually buy. The reference card matters now because clinical evidence, large pharmaceutical partnerships, public listings, and billion-dollar-scale financing have begun to test whether computational improvements can translate into better medicines rather than merely faster molecule design.[256][129]

# What is this Market Category?

Drug discovery covers the work from disease understanding and target identification through target validation, hit generation, hit-to-lead work, lead optimization, candidate selection, and preclinical characterization.[5] Products are sold primarily to pharmaceutical companies, biotechnology companies, CROs, academic research groups, and government laboratories as software, data, instruments, reagents, screening services, integrated discovery programs, or milestone-bearing research partnerships.[5][32]

For this profile, the core includes computational chemistry, structural biology, target-discovery platforms, generative molecular design, protein engineering, high-throughput screening, automated wet labs, discovery CROs, and companies using those capabilities to create proprietary therapeutic pipelines. It excludes clinical-trial operations, manufacturing, commercial analytics, diagnostics used only for patient care, and general-purpose healthcare AI unless the offering is explicitly sold into discovery workflows; Mordor Intelligence similarly excludes routine bioinformatics and broad AI-in-healthcare platforms not marketed for drug discovery.[13]

The boundary is disputed at three edges: whether preclinical safety testing belongs inside “discovery” or downstream development; whether AI-native therapeutics companies should be counted as platform vendors or ordinary biotech developers; and whether adjacent protein-engineering, synthetic-biology, precision-medicine, and laboratory-informatics products qualify when drug discovery is only one of several end markets.[1][479]

# Why Now?

- **Protein structure and molecular-interaction prediction crossed a utility threshold.** AlphaFold2 made protein-structure prediction broadly accessible, while AlphaFold3 extended modeling to protein–ligand, protein–nucleic-acid, antibody, and ion interactions; the 2024 Chemistry Nobel formally recognized computational protein design and protein-structure prediction.[292][286] The AlphaFold database now provides open access to more than 200 million predicted structures, converting what had often been a bespoke experimental bottleneck into a standard starting point for discovery programs.[299]

- **Open models lowered the entry barrier.** MIT’s Boltz-1 was released as a fully open-source biomolecular interaction model reporting AlphaFold3-level accuracy, including its training and fine-tuning pipeline; Boltz PBC subsequently formed around an open-model commercial strategy.[303][348] This changes the startup floor: a new entrant can build workflow, proprietary-data, or wet-lab differentiation without first recreating a frontier structure model.

- **AI is being joined to automated experimentation.** Lila Sciences is building “AI Science Factories” in which AI systems design and run experiments through robotic laboratories, while Terray combines generative AI with ultra-high-throughput experimentation, medicinal chemistry, automation, and nanotechnology.[168][317] The strategic shift is from one-shot prediction to closed loops in which experimental results become new training data.

- **Regulators have started defining an adoption path.** The FDA’s 2025 draft guidance introduced a risk-based credibility framework tied to an AI model’s context of use, while the FDA and EMA subsequently published ten joint principles covering human-centric design, data governance, performance assessment, documentation, and lifecycle management.[271][282] These frameworks do not validate AI-discovered molecules automatically, but they give sponsors a clearer vocabulary for using model outputs in regulated submissions.

- **Pharma has moved from pilots to strategic infrastructure commitments.** NVIDIA and Eli Lilly committed up to **$1 billion over five years** to a co-innovation laboratory combining AI, robotics, compute, and pharmaceutical expertise.[226] Isomorphic Labs’ Lilly and Novartis collaborations carry nearly **$3 billion** in potential value, while Chai secured platform relationships with Lilly, Pfizer, and Novartis in 2026.[227][449]

# What's Happening?

## CAGR and TAM

- **MarketsandMarkets, _AI in Drug Discovery Market—Global Forecast to 2031_ (2026):** the market rises from **$3.92 billion in 2025** and **$5.09 billion in 2026** to **$17.56 billion in 2031**, a **28.1% CAGR**. Its global model combines top-down adoption estimates with bottom-up revenue analysis and includes AI software and computational solutions across target identification, validation, hit generation, lead optimization, candidate selection, repurposing, and safety.[5]

- **Grand View Research, _Artificial Intelligence in Drug Discovery Market, 2033_ (2026):** the market grows from **$2.3 billion in 2025** and **$2.9 billion in 2026** to **$13.8 billion in 2033**, a **24.8% CAGR**.[1] Grand View’s lower starting value reflects a narrower revenue base centered on AI applications, therapeutic areas, and end users; its public methodology cites proprietary databases, executive interviews, regulatory analysis, and internal peer review but does not disclose a top-down/bottom-up reconciliation.[1]

- **Mordor Intelligence, _Artificial Intelligence in Drug Discovery Market Size & Share Analysis_ (2026):** the category grows from **$2.58 billion in 2025** and **$3.25 billion in 2026** to **$10.29 billion in 2031**, a **25.94% CAGR**.[13] Mordor triangulates global R&D spending and AI penetration against revenue roll-ups from 30 sampled vendors, and its narrower boundary excludes routine bioinformatics and general healthcare-AI platforms.[13]

- **The disagreement is definitional, not merely numerical.** Estimates for 2026 range from **$2.9 billion to $5.09 billion**, while the broader drug-discovery market—not just AI software and services—is estimated by Mordor at **$113.24 billion in 2026**, growing to **$152.73 billion by 2031** at a **6.13% CAGR**.[1][5][43] Analysts should therefore avoid presenting “AI drug discovery,” “drug-discovery platforms,” “outsourced discovery,” and the full drug-discovery economy as interchangeable TAMs.

## Category creation events

- **AlphaFold became the reference implementation.** Its structure-prediction breakthrough received the 2024 Nobel Prize in Chemistry, and AlphaFold3 expanded the model from single proteins toward drug-relevant biomolecular complexes.[286][292] The event made computational structural biology legible to pharmaceutical executives, investors, and generalist technology buyers.

- **Exscientia produced the first widely recognized AI-designed clinical candidate.** DSP-1181 entered a Phase I study in Japan in January 2020, establishing a tangible clinical milestone beyond retrospective screening or software demonstrations.[257] Recursion’s **$501.8 million** gross IPO raise in 2021 then demonstrated that public markets would fund an integrated AI-native discovery platform at scale.[241]

- **Recursion’s acquisition of Exscientia consolidated biology-first and chemistry-first platforms.** The combination closed in November 2024, with approximately **$630.1 million** of consideration recorded and Exscientia becoming a wholly owned Recursion subsidiary.[243][253] The combined company reported more than ten internal clinical or preclinical programs, more than ten partnered programs, and over **$450 million** in upfront and realized milestone payments at closing.[243]

- **Rentosertib supplied the first prominent Phase II proof point.** Insilico’s randomized 71-patient Phase IIa study reported a **98.4 mL mean FVC improvement** in the highest-dose arm versus a **20.3 mL decline** on placebo, with results published in _Nature Medicine_ in 2025.[256] The result is encouraging but not category validation: peer-reviewed analysis finds AI-discovered molecules at **80–90% Phase I success** but only about **40% in Phase II**, comparable with historical industry performance and based on a limited sample.[258]

## Capital concentration

- **AI-discovery financing remained unusually concentrated in large rounds.** DealForma counted **348 AI/ML drug-discovery and licensing financings raising $11 billion in 2025**, along with five IPOs raising **$1.3 billion**.[129] McKinsey’s narrower AIDD dataset counted **$8.4 billion** of investor funding in 2025, up from **$4.1 billion in 2023**, implying a 43% two-year CAGR.[18]

- **Growth-stage platforms absorbed the largest checks.** Isomorphic raised a **$600 million** Thrive-led external round in 2025; Chai raised a **$400 million Series C** led by Index Ventures in 2026; Lila’s Series A reached **$350 million**, bringing its total funding to **$550 million**; and Generate had raised nearly **$700 million** before entering the public market.[391][136][166][420]

- **Early-stage capital is concentrating around proprietary data and autonomous experimentation.** Boltz raised a **$28 million seed** around open biomolecular models, Latent Labs raised **$50 million** to build programmable-biology foundation models, and Converge Bio raised a **$25 million Series A** for generative discovery workflows.[348][142][346] By contrast, large platform companies increasingly finance clinical pipelines and partner programs, making their economics resemble biotech portfolio businesses rather than conventional SaaS.

# Market Incumbents

| Entity |
|---|
| [Thermo Fisher Scientific](https://www.thermofisher.com/) — Supplies instruments, reagents, compound libraries, assays, profiling, CRO/CDMO services, and discovery workflows; its Maybridge collection includes more than 51,000 screening molecules and 30,000 fragments.[376][386] |
| [Charles River Laboratories](https://www.criver.com/) — A global discovery and safety-assessment CRO whose DSA segment represented 59.8% of 2025 revenue and employed approximately 11,760 people.[76] |
| [Eurofins Scientific](https://www.eurofins.com/) — Operates a global bioanalytical and biopharma-services network spanning discovery, genomics, pharmacology, and laboratory testing; group revenue reached €7.296 billion in 2025.[83][84] |
| [NVIDIA](https://www.nvidia.com/en-us/clara/bionemo/) — Provides BioNeMo models, inference services, accelerated computing, and agent tooling for molecular design and lab-in-the-loop discovery, including the $1 billion co-innovation commitment with Lilly.[61][226] |
| [Alphabet / Isomorphic Labs](https://www.isomorphiclabs.com/) — Commercializes DeepMind-derived structural biology through an integrated drug-design engine and milestone-bearing partnerships with Lilly, Novartis, and Johnson & Johnson.[227][389] |
| [Dassault Systèmes BIOVIA](https://www.3ds.com/products/biovia) — Supplies molecular modeling, scientific informatics, laboratory data management, and virtual-twin software to life-sciences R&D organizations.[64] |
| [Schrödinger](https://www.schrodinger.com/) — Combines a physics-plus-AI molecular-discovery software business with collaborative and proprietary drug programs; 2025 software and discovery revenue were $199.5 million and $56.4 million respectively.[50] |

### Incumbent cards

#### [Thermo Fisher Scientific](https://www.thermofisher.com/)
**Stage**: public (NYSE: TMO).[361]  
**Funding**: Market capitalization was approximately **$257.5 billion on October 15, 2026**; 2025 revenue was **$44.56 billion**, up 3.9% year over year.[366]  
**Footprint**: Thermo Fisher employed approximately **125,000 people** in 2025 and serves discovery through commercialization through brands including Thermo Scientific, Applied Biosystems, Invitrogen, Gibco, Fisher Scientific, Patheon, PPD, and Unity Lab Services.[88][388] Its geographic revenue mix was approximately 52% North America, 26% Europe, 18% Asia-Pacific, and 4% rest of world.[380]  
**Why they're in this category**: Thermo Fisher sells the physical and service layer beneath discovery—assays, cells, reagents, CRISPR tools, analytical instruments, compound libraries, screening, ADME/Tox, and lead-optimization services—rather than relying on a single AI platform.[376][383]  
**Coverage**: [Thermo Fisher, Drug Discovery & Development](https://www.thermofisher.com/us/en/home/industrial/pharma-biopharma/drug-discovery-development.html); [Thermo Fisher, 2025 Annual Report](https://ir.thermofisher.com/investors/financials/annual-reports/default.aspx).[376][387]

#### [NVIDIA](https://www.nvidia.com/)
**Stage**: public (NASDAQ: NVDA).[70]  
**Funding**: NVIDIA’s market capitalization was approximately **$5.24 trillion** in October 2026, while revenue for the fiscal year ending January 2026 was reported at **$215.9 billion**.[70][73]  
**Footprint**: BioNeMo is an open development platform for biological foundation models and lab-in-the-loop workflows; its direct monetization primarily flows through NVIDIA AI Enterprise licenses, cloud consumption, and GPU infrastructure rather than a separately reported BioNeMo revenue line.[61][68]  
**Why they're in this category**: NVIDIA provides the compute, optimized model stack, inference layer, and agent tooling on which pharmaceutical companies and AI-native biotechs train and deploy molecular models; the Lilly lab moves it further into co-developed discovery infrastructure.[226]  
**Coverage**: [Reuters, Pharma sector doubles down on AI to slash costs, timelines](https://www.reuters.com/business/healthcare-pharmaceuticals/pharma-sector-doubles-down-ai-amid-hopes-slashing-costs-timelines-2026-09-16/); [NVIDIA, NVIDIA and Lilly Announce Co-Innovation AI Lab](https://investor.nvidia.com/news/press-release-details/2026/NVIDIA-and-Lilly-Announce-Co-Innovation-AI-Lab-to-Reinvent-Drug-Discovery-in-the-Age-of-AI/default.aspx).[58][226]

#### [Alphabet / Isomorphic Labs](https://www.isomorphiclabs.com/)
**Stage**: Alphabet is public (NASDAQ: GOOGL/GOOG); Isomorphic Labs is its independently operated, late-stage private drug-design subsidiary.[63][362]  
**Funding**: Alphabet’s market capitalization was approximately **$4.25 trillion on October 15, 2026**, with **$402.84 billion** of 2025 revenue.[362] Isomorphic’s first external round was **$600 million**, led by Thrive Capital with GV and Alphabet participation in March 2025; reporting in 2026 described a subsequent **$2.1 billion** Thrive-led round.[391][394]  
**Footprint**: Isomorphic reported approximately **350 employees** before its 2026 financing and has collaborations with Lilly, Novartis, and Johnson & Johnson; the original Lilly and Novartis agreements carried nearly **$3 billion** in potential value before royalties.[400][227]  
**Why they're in this category**: IsoDDE integrates structure, binding-affinity, and molecular-design prediction into a drug-design system that Isomorphic says progresses beyond AlphaFold3, pairing Alphabet-scale research and compute with internal and partnered therapeutic programs.[389]  
**Coverage**: [Reuters, Google-backed AI drug discovery startup raises $600 million](https://www.reuters.com/technology/artificial-intelligence/google-backed-ai-drug-discovery-startup-raises-600-million-2025-03-31/); [CNBC, Inside Isomorphic Labs, Google DeepMind’s AI life-sciences spinoff](https://www.cnbc.com/2025/04/09/inside-isomorphic-labs-google-deepminds-ai-life-sciences-spinoff.html).[402][398]

# Market Challengers

| Entity |
|---|
| [Recursion](https://www.recursion.com/) — Public techbio platform integrating phenomics, automated biology, chemistry, and the acquired Exscientia stack; it ended 2025 with $753.9 million in cash.[404] |
| [Insilico Medicine](https://insilico.com/) — Recently public, generative-AI drug developer with a Phase II lead asset, eight clinical programs in 2025, and software relationships with 13 of the top 20 pharmaceutical companies.[434] |
| [Chai Discovery](https://www.chaidiscovery.com/) — Molecular-design foundation-model company valued at $3.8 billion after a $400 million Series C and adopted by Lilly, Pfizer, Novartis, and GSK.[136][449][458] |
| [Generate:Biomedicines](https://generatebiomedicines.com/) — Generative-protein therapeutics company whose Series C financed 17 internal programs and approximately ten planned annual program starts.[419] |
| [XtalPi](https://www.xtalpi.com/) — Hong Kong-listed AI, quantum-physics, and robotics platform whose drug-discovery-solutions revenue reached RMB537.9 million in 2025, up 418.9%.[130] |
| [Iambic Therapeutics](https://www.iambic.ai/) — Physics-informed AI and automated discovery company with a clinical HER2 program and more than $346 million raised by early 2026.[100] |
| [Genesis Therapeutics](https://genesistherapeutics.ai/) — AI small-molecule developer whose $200 million Series B brought total disclosed funding to more than $280 million.[102] |
| [Owkin](https://www.owkin.com/) — Uses multimodal patient data, federated learning, and generative models for target discovery and precision therapeutics; disclosed funding totals $304.1 million.[133] |

### Challenger cards

#### [Recursion](https://www.recursion.com/)
**Stage**: public scale-up (NASDAQ: RXRX), listed in 2021.[241]  
**Funding**: Recursion raised **$501.8 million gross** in its IPO; its market capitalization was approximately **$2.23 billion on October 16, 2026**.[241][406] The company ended 2025 with **$753.9 million** in cash, equivalents, and restricted cash.[404]  
**Footprint**: Recursion reported **$74.7 million** of 2025 collaboration revenue and approximately **600 employees**.[404][409] Its completed Exscientia combination brought chemistry-first design together with Recursion’s phenomics and automated-biology platform.[244]  
**Why they're in this category**: Recursion’s differentiator is a vertically integrated discovery loop connecting industrialized cell imaging, machine learning, automated experimentation, medicinal chemistry, and a proprietary/partnered clinical pipeline rather than selling standalone software.[243]  
**Coverage**: [Recursion, Full-Year 2025 Results](https://ir.recursion.com/news-releases/news-release-details/recursion-reports-fourth-quarter-and-full-year-2025-financial); [SEC, Recursion–Exscientia Combination](https://www.sec.gov/Archives/edgar/data/1601830/000160183024000217/exhibit993-closingprexai_r.htm).[404][243]

#### [Insilico Medicine](https://insilico.com/)
**Stage**: recently public (HKEX: 3696), listed December 30, 2025.[435]  
**Funding**: The IPO raised **HK$2.277 billion**, following a **$123 million Series E** completed in 2025; its market capitalization was approximately **HK$22.02 billion** in October 2026.[435][120][436]  
**Footprint**: Insilico generated **$56.24 million** of 2025 revenue, held **$393.3 million** of cash and bank balances at year-end, served 13 of the top 20 global pharma companies through its software business, and advanced eight clinical programs.[434] It reported 333 employees and consultants at June 30, 2026.[119]  
**Why they're in this category**: Insilico connects target discovery, generative chemistry, automated laboratories, software licensing, and an owned pipeline; rentosertib’s Phase IIa data make it one of the category’s most important clinical tests.[256][261] Its new listing and scale-up behavior place it among challengers despite having operated since 2014.  
**Coverage**: [Insilico Medicine, 2025 Annual Results](https://insilico.com/news/ohz9ozx0t1-insilico-medicine-announces-2025-annual); [Forbes, AI Drug Discovery Unicorn Insilico Medicine Jumps in Hong Kong Debut](https://www.forbes.com/sites/zinnialee/2025/12/30/ai-drug-discovery-unicorn-insilico-medicine-jumps-in-hong-kong-debut/).[434][437]

#### [Chai Discovery](https://www.chaidiscovery.com/)
**Stage**: Series C scale-up (July 2026).[136]  
**Funding**: Chai raised **$400 million** at a **$3.8 billion valuation** in a round led by Index Ventures with Kleiner Perkins, Sequoia, and Dimension; total funding exceeded **$600 million** across its first three institutional rounds.[136][146]  
**Footprint**: Chai signed 2026 platform relationships with Lilly, Pfizer, Novartis, and GSK, moving from model releases into paid pharmaceutical deployment and wet-lab evaluation.[449][458]  
**Why they're in this category**: Chai is building a “CAD for molecules” stack for structure prediction and de novo biologic design, with custom models trained on partner data; its financial stage is unmistakably challenger even though it was founded only in 2024.[138][143]  
**Coverage**: [The New York Times, Chai Discovery, an A.I. Drug Start-Up, Raises $400 Million](https://www.nytimes.com/2026/07/14/business/dealbook/chai-discovery-ai-drug-development.html); [Fierce Biotech, Chai brews up $400M Series C](https://www.fiercebiotech.com/biotech/chai-brews-400m-series-c-fuel-ai-used-lilly-novartis-and-pfizer).[136][454]

# Market Innovators

| Entity |
|---|
| [Lila Sciences](https://www.lila.ai/) — Builds AI-controlled “Science Factories” that autonomously propose, execute, and learn from experiments across biology, chemistry, and materials.[168] |
| [Latent Labs](https://www.latentlabs.com/) — Develops generative foundation models intended to make protein and biological design programmable.[142] |
| [Profluent](https://www.profluent.bio/) — Uses protein language models for de novo genome-editor, antibody, and enzyme design; its latest financing remains Series B.[152][155] |
| [Cradle](https://www.cradle.bio/) — Provides AI-assisted protein engineering to scientists in pharmaceuticals and other bioindustrial markets, supported by an expanding wet lab.[151][160] |
| [Boltz PBC](https://boltz.com/) — Commercializes open biomolecular structure, affinity, and generative-design models through an open public-benefit-company model.[348] |
| [Tamarind Bio](https://www.tamarind.bio/) — Offers no-code and API access to more than 200 molecular AI and simulation models without requiring customers to manage ML infrastructure.[347][349] |
| [Converge Bio](https://converge-bio.com/) — Builds generative-AI workflows for biotech and pharmaceutical discovery teams, funded through a $25 million Series A.[346] |
| [Terray Therapeutics](https://www.terraytx.com/) — Integrates a high-throughput experimental dataset with generative AI and medicinal chemistry to create small-molecule programs.[317] |

### Innovator cards

#### [Lila Sciences](https://www.lila.ai/)
**Stage**: Series A (closed October 2025).[166]  
**Funding**: Lila closed a **$350 million Series A**, bringing total funding to **$550 million** and its reported valuation above **$1.3 billion**; the round was co-led by Braidwell and Collective Global, with participation including Flagship Pioneering, NVentures, General Catalyst, March Capital, and ADIA-related capital.[168][169]  
**Footprint**: Founded in 2023, Lila is building robotic AI Science Factories designed to run thousands of parallel experiments across life and physical sciences.[168][169]  
**Why they're in this category**: Lila’s contrarian bet is that the defensible system is not a molecule-prediction model alone but an autonomous experimental engine that generates hypotheses, performs experiments, and produces proprietary training data.[179] Its Series A stage keeps it in Innovators despite unicorn valuation and unusually large capitalization.  
**Coverage**: [Reuters, AI lab Lila Sciences tops $1.3 billion valuation](https://www.reuters.com/business/ai-lab-lila-sciences-tops-13-billion-valuation-with-new-nvidia-backing-2025-10-14/); [Fierce Biotech, Flagship’s Lila Sciences lands $235M](https://www.fiercebiotech.com/biotech/flagships-lila-sciences-lands-235m-expand-ai-powered-autonomous-research-labs).[168][177]

#### [Latent Labs](https://www.latentlabs.com/)
**Stage**: Series A (February 2025).[142]  
**Funding**: Latent emerged from stealth with **$50 million total funding**, comprising a **$40 million Series A** co-led by Radical Ventures and Sofinnova Partners plus prior seed capital from 8VC, Kindred Capital, and Pillar VC.[142]  
**Footprint**: The company operates from London and San Francisco and is pursuing partnerships around foundation models for programmable biology.[142]  
**Why they're in this category**: Latent’s bet is that generative biological models can let researchers specify desired protein properties and design new biology, shifting discovery from database search toward controllable generation.[139]  
**Coverage**: [Latent Labs, Latent Labs secures $50M](https://www.latentlabs.com/press-release/latent-labs-secures-50m-funding/); [Latent Labs, Launch Archive](https://www.latentlabs.com/press-category/launch/).[142][139]

#### [Boltz PBC](https://boltz.com/)
**Stage**: Seed (January 2026).[348]  
**Funding**: Boltz raised a **$28 million seed round** from Zetta Venture Partners, Amplify Partners, Andreessen Horowitz, Obvious Ventures, Factorial Capital, and strategic angels.[348]  
**Footprint**: The company was formed around the Boltz open-model ecosystem, which covers biomolecular structure prediction, binding-affinity estimation, generative design, and hosted scientific agents.[350]  
**Why they're in this category**: Boltz is a direct challenge to closed frontier-model economics: it publishes commercially usable biomolecular models and seeks to monetize hosting, tooling, agents, and deployment rather than exclusive access to model weights.[303][348]  
**Coverage**: [MIT Jameel Clinic, Introducing Boltz-1](https://jclinic.mit.edu/boltz-1/); [Boltz, Announcing Boltz PBC](https://boltz.com/launch).[304][348]

# Industry Coverage and Market Data

## Market Reports

| Report | Firm | Signature finding and methodology |
|---|---|---|
| **[AI in Drug Discovery Market—Global Forecast to 2031, 2026](https://www.marketsandmarkets.com/Market-Reports/ai-in-drug-discovery-market-151193446.html)** | MarketsandMarkets | Forecasts $5.09 billion in 2026 to $17.56 billion in 2031 at 28.1%; combines bottom-up vendor revenue analysis, top-down adoption estimates, primary interviews, and data triangulation across five global regions.[5] |
| **[Artificial Intelligence in Drug Discovery Market Report, 2033](https://www.grandviewresearch.com/industry-analysis/artificial-intelligence-drug-discovery-market)** | Grand View Research | Forecasts $2.9 billion in 2026 to $13.8 billion in 2033 at 24.8%; covers application, therapeutic area, end use, and geography using proprietary databases, interviews, and regulatory analysis.[1] |
| **[Artificial Intelligence in Drug Discovery Market Size & Share Analysis, 2026](https://www.mordorintelligence.com/industry-reports/artificial-intelligence-in-drug-discovery-market)** | Mordor Intelligence | Forecasts $3.25 billion in 2026 to $10.29 billion in 2031 at 25.94%; combines top-down global R&D spending and AI penetration with bottom-up checks from 30 vendors and contract values.[13] |
| **[Drug Discovery Platforms Market Size, Growth Report, 2026–2033](https://www.grandviewresearch.com/industry-analysis/drug-discovery-platforms-market-report)** | Grand View Research | Sizes the broader platforms market at $3.4 billion in 2025 and $10.5 billion in 2033, a 15.1% CAGR, demonstrating the difference between dedicated platform revenue and the full discovery economy.[32] |
| **[Reigniting Biopharma’s Research Engine, 2025](https://www.bcg.com/publications/2025/reigniting-biopharmas-research-engine)** | Boston Consulting Group | Models AI-enabled workflows as reducing time to preclinical candidate by 30–50% and costs by up to 50%, while highlighting early Phase I evidence.[16] |
| **[AI Drug Discovery: Focusing on What Matters Most, 2026](https://www.mckinsey.com/industries/life-sciences/our-insights/ai-drug-discovery-focusing-on-what-matters-most)** | McKinsey | Reports $8.4 billion of AIDD investor funding in 2025, up from $4.1 billion in 2023, and focuses on workflow choices and value capture rather than headline model performance.[18] |

## Industry Articles

| Article | Outlet / author | Angle |
|---|---|---|
| **[The AI Drug Revolution Needs a Revolution](https://www.nature.com/articles/s44386-025-00013-6)** | _npj Drug Discovery_ | Argues that AI has improved speed and safety but not yet clinical efficacy because most platforms optimize targets and molecules without adequately modeling human physiology and variability.[479] |
| **[When Can AI Deliver the Drug Discovery Hits?](https://www.nature.com/articles/d41573-024-00036-0)** | _Nature Reviews Drug Discovery_ | Warns that commercial teams disclose too little validation data while academic groups often lack resources for rigorous confirmation: “The hype drowns out the hits.”[487] |
| **[How Successful Are AI-Discovered Drugs in Clinical Trials?](https://pubmed.ncbi.nlm.nih.gov/38692505/)** | _Drug Discovery Today_ / Madura K.P. Jayatunga et al. | First pipeline analysis reporting 80–90% Phase I success but approximately 40% Phase II success on a limited sample.[258] |
| **[AlphaFold in Drug Discovery: What Protein Structure Prediction Has—and Hasn’t—Changed](https://www.drugdiscoverynews.com/alphafold-in-drug-discovery-what-protein-structure-prediction-has-and-hasn-t-changed-17348)** | _Drug Discovery News_ | Separates AlphaFold’s genuine structural-biology impact from claims that structure prediction alone solves binding, efficacy, toxicity, or disease biology.[298] |
| **[Rethinking Drug Design in the Artificial Intelligence Era](https://www.nature.com/articles/s41573-019-0050-3)** | _Nature Reviews Drug Discovery_ | Frames the field between maximalist claims and skepticism and identifies grand challenges in AI-enabled small-molecule discovery.[482] |
| **[The Continuing Importance of Chemical Intuition for the Medicinal Chemist](https://www.tandfonline.com/doi/full/10.1080/17460441.2025.2450785)** | _Expert Opinion on Drug Discovery_ | Argues that AI remains constrained by domain applicability, explainability, and access to large, relevant positive and negative datasets.[491] |

## Financial News Sources

| Financial news source | Outlet | What it reports |
|---|---|---|
| **[Google-backed AI drug discovery startup raises $600 million](https://www.reuters.com/technology/artificial-intelligence/google-backed-ai-drug-discovery-startup-raises-600-million-2025-03-31/)** | Reuters | Isomorphic’s first external round, led by Thrive with GV and Alphabet participation.[464] |
| **[Chai Discovery, an A.I. Drug Start-Up, Raises $400 Million](https://www.nytimes.com/2026/07/14/business/dealbook/chai-discovery-ai-drug-development.html)** | _The New York Times_ | Chai’s $400 million financing, $3.8 billion valuation, and investor syndicate.[136] |
| **[AI-based drug developer Basecamp valued at $800 million after $140 million funding](https://www.reuters.com/legal/litigation/ai-based-drug-developer-basecamp-valued-800-million-after-140-million-funding-2026-09-23/)** | Reuters | Basecamp’s Series C and its progression from a $60 million Series B into pipeline development.[202] |
| **[Crunchbase Sector Snapshot: Funding to AI-Related Healthcare Startups Rises](https://news.crunchbase.com/health-wellness-biotech/ai-healthcare-funding-rises-2025/)** | Crunchbase News | Estimates $10.7 billion of 2025 seed-to-growth financing across AI health categories and identifies Isomorphic as the year’s largest related round at publication.[466] |
| **[Nvidia-backed AI startup SandboxAQ creates new data to speed up drug discovery](https://www.reuters.com/business/healthcare-pharmaceuticals/nvidia-backed-ai-startup-sandboxaq-creates-new-data-speed-up-drug-discovery-2025-06-18/)** | Reuters | Examines the proprietary synthetic-data strategy behind a company that had raised nearly $1 billion.[469] |
| **[AI lab Lila Sciences tops $1.3 billion valuation with new Nvidia backing](https://www.reuters.com/business/ai-lab-lila-sciences-tops-13-billion-valuation-with-new-nvidia-backing-2025-10-14/)** | Reuters | Reports Lila’s $350 million Series A, $550 million total financing, valuation, and autonomous-lab strategy.[168] |

# Frontier and Open Questions

| Open question | Likely drivers of resolution |
|---|---|
| **Will higher Phase I success translate into better Phase II and Phase III efficacy?** | Challengers with clinical pipelines—especially Insilico, Recursion, Iambic, and Generate—will resolve this; current evidence shows 80–90% Phase I success but only about 40% in Phase II on a small sample.[258] |
| **Does the durable moat sit in frontier models, proprietary experimental data, or the closed loop joining the two?** | Incumbents such as Alphabet/Isomorphic and NVIDIA will test compute and model advantages, while Lila, Terray, Recursion, and Basecamp test whether proprietary data-generation systems compound more defensibly.[168][207][317] |
| **Will open models commoditize structure prediction and molecular design?** | Innovators Boltz and Tamarind are the clearest tests of an open-model and workflow-infrastructure thesis, while Isomorphic and Chai represent heavily capitalized proprietary alternatives.[303][347][389] |
| **Should AI-native drug developers be valued as software platforms or as biotech portfolios?** | Recursion, Insilico, XtalPi, Generate, and Iambic will drive the answer because their economics combine platform partnerships, milestones, licensing, and balance-sheet-funded clinical assets.[404][434][126] |
| **Will autonomous laboratories improve reproducibility or merely automate noisy biology?** | Lila, Terray, Charles River, Thermo Fisher, and pharmaceutical partners will determine whether robotics plus model-directed experimentation can generate cleaner data and materially improve decision quality.[168][317][378] |
| **Should the category expand through preclinical safety and translational biology, or contract around target and molecule design?** | The dispute will be settled by clinical outcomes: critics argue that fewer than 24% of AI companies focus on interrogating human health and disease during preclinical development, leaving efficacy failures largely untouched.[479] |

# Adjacent Concepts and Categories

| Concept | How it adjoins Drug Discovery |
|---|---|
| **TechBio** | The operating model in which software, data, automation, and biological R&D are integrated into a therapeutics company rather than sold only as tools. |
| **Computational Chemistry** | Physics- and data-driven prediction of molecular properties, binding, conformations, and reaction pathways. |
| **Generative Biology** | Use of foundation and generative models to design proteins, antibodies, nucleic acids, enzymes, and biological systems. |
| **Laboratory Automation** | Robotics, scheduling, sample handling, and instrumentation that convert model recommendations into repeatable experiments. |
| **Self-Driving Labs** | Closed-loop systems in which AI proposes experiments, robotic laboratories execute them, and resulting data update the model. |
| **Precision Medicine** | Patient stratification and multimodal clinical data can inform target selection, biomarkers, and indication choice upstream of trials. |
| **Drug-Discovery CROs** | Outsourced chemistry, biology, screening, pharmacology, and safety services that overlap with platform-company offerings. |
| **Translational Biology** | The discipline connecting targets and preclinical models to human physiology—the principal boundary where AI-discovery optimism is now being tested. |


***

# Sources

[1]: [Artificial Intelligence In Drug Discovery Market Report, 2033](https://www.grandviewresearch.com/industry-analysis/artificial-intelligence-drug-discovery-market)
[2]: [Artificial Intelligence In Drug Discovery Market To Reach $13.7Bn By ...](https://www.grandviewresearch.com/press-release/global-artificial-intelligence-drug-discovery-market)
[3]: [NVIDIA Corporation (US) and Schrödinger, Inc. (US) are ...](https://www.marketsandmarkets.com/ResearchInsight/ai-in-drug-discovery-market.asp)
[4]: [AI in Drug Discovery Market Size to Worth USD 17.56 Billion by 2031, at a CAGR of 28.1% – MarketsandMarkets™](https://www.globenewswire.com/news-release/2026/10/16/3382680/0/en/ai-in-drug-discovery-market-size-to-worth-usd-17-56-billion-by-2031-at-a-cagr-of-28-1-marketsandmarkets.html)
[5]: [AI in Drug Discovery Market Report 2026-2031, By Process ...](https://www.marketsandmarkets.com/Market-Reports/ai-in-drug-discovery-market-151193446.html)
[6]: [Global Artificial Intelligence In Drug Discovery Market Size & Outlook](https://www.grandviewresearch.com/horizon/outlook/artificial-intelligence-in-drug-discovery-ai-market-size/global)
[7]: [north-america Artificial Intelligence in Drug Discovery Market Size, Share,Trends, Growth Analysis Report, 2029](https://www.marketsandmarkets.com/Market-Reports/geography/ai-in-drug-discovery-market/north-america)
[8]: [AI in Drug Discovery Market worth $17.56 billion by 2031](https://finance.yahoo.com/healthcare/articles/ai-drug-discovery-market-worth-143000937.html)
[9]: [latin-america Artificial Intelligence in Drug Discovery ...](https://www.marketsandmarkets.com/Market-Reports/geography/ai-in-drug-discovery-market/latin-america)
[10]: [Drug Discovery Platforms Market Size, Growth Report, 2026-2033](https://www.grandviewresearch.com/industry-analysis/drug-discovery-platforms-market-report)
[11]: [The Growth of AI in Drug Discovery: Market Size, Share, ...](https://www.marketsandmarkets.com/ResearchInsight/ai-in-drug-discovery-market-size-and-share.asp)
[12]: [AI in Life Science Market Report 2026-2031, By Offering, Application, and Geo](https://www.marketsandmarkets.com/Market-Reports/ai-in-life-science-market-45756262.html)
[13]: [AI in Drug Discovery Market Size, Growth & Drivers ...](https://www.mordorintelligence.com/industry-reports/artificial-intelligence-in-drug-discovery-market)
[14]: [rest-of-asia-pacific Artificial Intelligence in Drug Discovery Market Size, Share,Trends, Growth Analysis Report, 2029](https://www.marketsandmarkets.com/Market-Reports/geography/ai-in-drug-discovery-market/rest-of-asia-pacific)
[15]: [china Artificial Intelligence in Drug Discovery Market Size, Share,Trends, Growth Analysis Report, 2029](https://www.marketsandmarkets.com/Market-Reports/geography/ai-in-drug-discovery-market/china)
[16]: [Country Insights](https://www.grandviewresearch.com/industry-analysis/us-drug-discovery-outsourcing-market-report)
[17]: [Drug Discovery Services Market Size Forecast Report 2026-2030](https://www.thebusinessresearchcompany.com/report/drug-discovery-services-global-market-report)
[18]: [Drug Discovery Outsourcing Market Size Report, 2026-2033](https://www.grandviewresearch.com/industry-analysis/drug-discovery-outsourcing-market)
[19]: [Global Drug Discovery Market Projected to Surpass USD 174.92 Billion by 2035 – SNS Insider](https://www.globenewswire.com/news-release/2026/05/28/3303074/0/en/global-drug-discovery-market-projected-to-surpass-usd-174-92-billion-by-2035-sns-insider.html)
[20]: [Startup Funding & Investment...](https://www.delveinsight.com/report-store/drug-discovery-market)
[21]: [Drug Discovery Outsourcing Market To Reach $17.11Bn By 2033](https://www.grandviewresearch.com/press-release/global-drug-discovery-outsourcing-market)
[22]: [Drug Discovery Services Market worth $27.23 billion in 2030](https://www.marketsandmarkets.com/PressReleases/drug-discovery-services.asp)
[23]: [Drug Discovery Services Market Report 2025-2030, By Process, Type, and Geo](https://www.marketsandmarkets.com/Market-Reports/drug-discovery-services-market-138732129.html)
[24]: [Drug Discovery Services Market Size, Share | Forecast [2034]](https://www.fortunebusinessinsights.com/drug-discovery-services-market-117651)
[25]: [Drug Discovery Market Size To Exceed $174.92 Billion By 2035](https://www.snsinsider.com/press-release/global-drug-discovery-market)
[26]: [Drug Discovery Services Market Size, Forecasts Report 2026-2035](https://www.gminsights.com/industry-analysis/drug-discovery-services-market)
[27]: [www.mordorintelligence.com › drug-discovery-marketDrug Discovery Market Size, Growth, Opportunities, Drivers &...](https://www.mordorintelligence.com/industry-reports/drug-discovery-market)
[28]: [Drug Discovery Services Companies, Top ... - MarketsandMarkets](https://www.marketsandmarkets.com/ResearchInsight/drug-discovery-services-market.asp)
[29]: [Global Drug Discovery Services Market – Industry Trends and ...](https://www.databridgemarketresearch.com/reports/global-drug-discovery-services-market)
[30]: [Reigniting Biopharma's Research Engine](https://www.bcg.com/publications/2025/reigniting-biopharmas-research-engine)
[31]: [Generative AI in the pharmaceutical industry: Moving from hype to reality](https://www.mckinsey.com/industries/life-sciences/our-insights/generative-ai-in-the-pharmaceutical-industry-moving-from-hype-to-reality)
[32]: [AI drug discovery: Focusing on what matters most | McKinsey](https://www.mckinsey.com/industries/life-sciences/our-insights/ai-drug-discovery-focusing-on-what-matters-most)
[33]: [Biopharma Trends: Focus on Innovation Amid Complexity](https://www.bcg.com/publications/2025/biopharma-trends)
[34]: [Economic potential of generative AI](https://www.mckinsey.com/capabilities/tech-and-ai/our-insights/the-economic-potential-of-generative-ai-the-next-productivity-frontier)
[35]: [Companies have reversed the decline in the returns from ...](https://www.deloitte.com/uk/en/Industries/life-sciences-health-care/research/companies-have-reversed-the-decline-in-the-returns-from-pharma-r-and-d.html)
[36]: [media-publications.bcg.com · The-Stairway-to-GenAI-Impact-inThe Stairway to GenAI Impact in the Health Care Industry](https://media-publications.bcg.com/The-Stairway-to-GenAI-Impact-in-the-Health-Care-Industry-2025.pdf)
[37]: [The next innovation revolution—powered by AI](https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-next-innovation-revolution-powered-by-ai)
[38]: [Future-proofing pharma R&D labs | Deloitte Insights](https://www.deloitte.com/us/en/insights/industry/health-care/future-proofing-pharma-rnd-labs.html)
[39]: [Agentic AI in Biopharma: Game-changing Efficiency](https://www.bcg.com/publications/2025/agentic-ai-in-biopharma-game-changing-efficiency)
[40]: [How artificial intelligence can power clinical development](https://www.mckinsey.com/industries/life-sciences/our-insights/how-artificial-intelligence-can-power-clinical-development)
[41]: [The economic potential of generative AI: The next productivity frontier](https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-economic-potential-of-generative-ai-the-next-productivity-frontier)
[42]: [Deloitte Tech Trends 2025: A life sciences & healthcare ...](https://www.deloitte.com/uk/en/blogs/thoughts-from-the-centre/deloitte-tech-trends-2025-a-life-sciences-healthcare-perspective.html)
[43]: [June 2023](https://www.mckinsey.com/~/media/mckinsey/business%20functions/mckinsey%20digital/our%20insights/the%20economic%20potential%20of%20generative%20ai%20the%20next%20productivity%20frontier/the-economic-potential-of-generative-ai-the-next-productivity-frontier.pdf)
[44]: [Life Sciences & Healthcare Tech Trends 2025 - Deloitte](https://www.deloitte.com/ch/en/Industries/life-sciences-health-care/perspectives/tech-trends-2025.html)
[45]: [crl-20251227 - SEC.gov](https://www.sec.gov/Archives/edgar/data/1100682/000110068226000022/crl-20251227.htm)
[46]: [Charles River Laboratories Announces Fourth-Quarter and Full ...](https://ir.criver.com/news-releases/news-release-details/charles-river-laboratories-announces-fourth-quarter-and-full-14/)
[47]: [[PDF] CRL 4Q25 Earnings Release - Charles River investor relations](https://ir.criver.com/static-files/d914273e-33e6-44c5-9608-158534a64ce6)
[48]: [Charles River Labs details 2025 operations and strategy](https://www.stocktitan.net/sec-filings/CRL/10-k-charles-river-laboratories-international-inc-files-annual-report-429b3d5c115c.html)
[49]: [Charles River Laboratories Announces Third-Quarter 2025 ...](https://ir.criver.com/news-releases/news-release-details/charles-river-laboratories-announces-third-quarter-2025-results)
[50]: [4.0% organic revenue growth in 9M 2025](https://www.eurofins.com/en/media-centre/press-releases/2025-10-21/)
