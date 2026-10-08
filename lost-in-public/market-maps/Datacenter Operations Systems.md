---
date_created: 2026-10-06
date_modified: 2026-10-07
title: "Data Center Operations Intelligence: Market Scan and Entry Options for Cathode.co"
lede: The money chases AI factories. Campus, government, and enterprise data rooms are left behind, and what they lack is verification.
date_authored_initial_draft: 2026-10-04
date_authored_current_draft: 2026-10-06
at_semantic_version: 0.0.0.1
status: AI-Generated-Draft
augmented_with:
  - Claude Desktop on Claude Opus 5.5
category: Market-Opportunities
tags:
  - Market-Maps
  - Datacenter-Operations
  - DCIM
  - Building-Intelligence
  - AI-Factories
  - Measurement-and-Verification
image_prompt: "On the horizon, a gigantic glowing AI factory is surrounded by cranes, money trucks, and crowds of investors. In the foreground, ignored, sit a row of modest server rooms: one in a university, one in a hospital, one in a government building, each with fans straining and a thermometer creeping into the red. A small crew with tablets and thermal cameras walks from room to room, reading the gauges and stamping each door `Verified`."
authors:
  - Michael Staton
publish: true
site_uuid: 04bf1fca-84d9-4826-b456-86f9ace11460
slug: datacenter-operations-systems
for_clients:
  - Cathode-co
  - Edviro
banner_image: https://ik.imagekit.io/xvpgfijuw/Image-Gin/2026-05/Datacenter_Operations_Systems_banner_image_1791324264266_A9KVCqIO4a.webp
portrait_image: https://ik.imagekit.io/xvpgfijuw/Image-Gin/2026-05/Datacenter_Operations_Systems_portrait_image_1791324265293_V9Oe3UFxL.webp
square_image: https://ik.imagekit.io/xvpgfijuw/Image-Gin/2026-05/Datacenter_Operations_Systems_square_image_1791324265794_QSrQxr5IG3.webp
banner_image_taller: https://ik.imagekit.io/xvpgfijuw/Image-Gin/2026-05/Datacenter_Operations_Systems_banner_image_taller_1791324266205_3ciq8sZXw.webp
---

# Data Center Operations Intelligence: Market Scan and Entry Options for Cathode.co

**Prepared:** 4 October 2026
**Scope:** Software that sits on, beside, or above BMS / [[EPMS]] / [[concepts/Market-Categories/Data Center Infrastructure Management Systems|DCIM]] in data centers. Legacy categories, emerging categories, company hitlists, gaps, and entry options for a building-intelligence startup with education and government traction.
**Method:** Web scan of vendor sites, trade press, analyst and consulting publications, 3–4 October 2026. Funding figures are as reported by the cited outlets. Anything marked † comes from background knowledge and was not re-verified in this scan. Vendor performance claims are vendor claims.

---

## 1. Bottom line

1. **The money and the noise are at the AI-factory end. The neglect is everywhere else.** [[content-areas/AI-Factories-Datacenters/Organizations/Phaidra|Phaidra]], [[content-areas/AI-Factories-Datacenters/Organizations/Emerald AI|Emerald AI]], [[Tooling/AI-Toolkit/AI Infrastructure/Niv-AI]], [[content-areas/AI-Factories-Datacenters/Organizations/Hammerhead AI|Hammerhead AI]] and [[organizations/Nvidia|NVIDIA]]'s DSX ecosystem are all chasing hyperscale and [[content-areas/AI-Factories-Datacenters/Concepts/Neocloud Operators]] sites. Enterprise-owned data centers still carry 44% of IT workloads (Uptime 2026), and campus, government, healthcare and mid-market colo rooms are being asked to take 30 kW+ racks with legacy plant and thin staff. Almost nobody funded is building for them.
2. **"Unified DCIM + BMS + EPMS" is already taken, by a better-positioned [[vertical-toolkits/Venture-Capital-Firms/Y Combinator|Y Combinator]] company.** Aravolta ships exactly that, with a hardware node, 25k–42k device templates, SOC 2 Type II, and named colo customers. Cathode.co should not fight for the system-of-record or the single pane of glass.
3. **Autonomous control is where the capital is, and where operator trust is lowest.** Only 31% of operators trust AI to change equipment settings and 16% to make configuration changes (Uptime 2026). Confidence that AI reduces human error fell 11 points in a year. Cathode.co's existing loop of diagnose, human review, dispatch, verify is the shape operators say they will accept.
4. **The clearest open ground is verification.** Capacity claims (how many more kW can this hall take), efficiency claims (did that setpoint change save anything), and flexibility claims (can this site really shed 20% on request) all need an independent, telemetry-backed proof. Lenders, tenants, utilities and insurers are all starting to ask. Cathode.co's measurement-and-verification DNA is the one thing it has that the data-center natives mostly don't.
5. **Recommended posture:** enter as an *augmenting* layer, read-only, on top of whatever BMS/DCIM/[[content-areas/AI-Factories-Datacenters/Organizations/Computerized Maintenance Management Systems|CMMS]] exists. Lead with verified capacity headroom for brownfield and campus sites. Partner for data ingestion rather than build 40,000 device drivers. Treat control as a later-stage option, not the pitch.

A candid caution: Cathode.co is a two-founder YC S26 company with 34 live sites, all buildings. Data center buyers will discount school traction heavily. The first three design partners matter more than the category name.

---

## 2. Where Cathode.co stands today

From its site and YC launch post:

- **Positioning:** "AI-powered facilities operations." Signals (alarms, meter anomalies, staff texts) become reviewed work orders, dispatched technicians and verified fixes. Vendor-agnostic across BMS/BAS, utility data, and maintenance logs. Can act as the [[content-areas/AI-Factories-Datacenters/Organizations/Computerized Maintenance Management Systems|CMMS]] or integrate with one.
- **Traction:** 34 live sites, about $400K in identified or verified savings, two named [[K-12 Education]] district logos. Origin story is a utility-bill audit that found roughly $360K in gas overbilling.
- **Data center page (already live):** physics-based thermal model ([[Physics-Based Models]]) calibrated on existing telemetry; answers "how many more racks before cooling is the constraint"; one-pod pilot; explicitly does *not* control the plant.
- **YC framing:** "world model" of a facility that simulates interventions before they are made, with agents coordinating approvals and work orders, and verification against real meter and billing data. Asking for data center design partners with power or cooling constraints.

**Read:** the product already rhymes with the right problem. The data center page is narrower than the YC narrative (thermal headroom only). The work-order and [[content-areas/AI-Factories-Datacenters/Concepts/Measurement and Verification]] machinery, which is the differentiated part, is not yet translated into data center language.

---

## 3. Demand backdrop

| Signal | Figure | Source |
|---|---|---|
| Global data center electricity | 415 TWh in 2024 (about 1.5% of world demand) to about 945 TWh by 2030 | IEA, *Energy and AI* |
| US share of demand growth | Data centers drive almost half of US electricity demand growth to 2030 | IEA |
| Capex required by 2030 | About $6.7T total, $5.2T of it for AI capacity; range $3.7T–$7.9T by scenario | McKinsey |
| AI capacity demand | 156 GW by 2030, 125 GW incremental from 2025 | McKinsey |
| Rack density | Modal average above 11 kW for the first time; nearly a quarter of operators have some racks above 30 kW (19% a year ago) | Uptime 2026 |
| Outages | 47% had an impactful outage in three years (down); 71% say their worst cost $100K+ (up from 57%); power causes 56% | Uptime 2026 |
| Staffing | More than half struggle to hire (46% last year); 28% lost staff to rival operators; electrical specialists and junior ops hardest to fill | Uptime 2026 |
| Capacity forecasting | 76% of management concerned, now a top-tier worry | Uptime 2026 |
| Workload location | Third-party 46%, enterprise-owned 44%; first time third-party leads | Uptime 2026 |
| Trust in AI for ops | 52% think AI improves efficiency (58% last year); 31% trust it to control settings; 16% for config changes | Uptime 2026 |
| DCIM market size | Estimates cluster at $3–5B for 2025–26 (IMARC $4.7B, 360iResearch $3.6B, datacentres.com $3.1B); one outlier at $20B | Various; treat as soft |
| DCIM maturity | Gartner's 2026 Hype Cycle places DCIM tools on the Plateau of Productivity | Gartner via Schneider blog |

**What the numbers say together:** density is rising faster than staff, capacity planning has become a board-level anxiety, outages are rarer but pricier, and operators are getting *more* cautious about handing control to AI. That is a market for decision support with proof, not for autopilot.

---

## 4. The legacy stack: a taxonomy

Data centers run on five or six overlapping systems that were never designed to share a data model. "BEMS" in buildings maps to roughly three separate products here.

| Layer                        | What it does                                                                                                      | Typical buyer                                | Incumbents                                                                                                                                                                                                                                                                                                                                                         | Known weakness                                                   |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------- | -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------- |
| **BMS / BAS**                | Mechanical plant control: chillers, CRAH/CRAC, pumps, towers                                                      | Facilities / critical ops                    | [[content-areas/AI-Factories-Datacenters/Organizations/Schneider Electric\|Schneider Electric]], Siemens, Honeywell, [[Johnson Controls]], [[content-areas/AI-Factories-Datacenters/Organizations/Trane Technologies\|Trane Technologies]], [[Carrier]] (Automated Logic)                                                                                          | Vendor-locked, rule-based logic, per-point pricing               |
| **EPMS**                     | Electrical monitoring: switchgear, UPS, PDUs, branch circuits                                                     | Electrical engineering                       | Schneider PowerLogic, [[content-areas/AI-Factories-Datacenters/Organizations/Eaton\|Eaton]], Siemens, [[content-areas/AI-Factories-Datacenters/Organizations/ABB Group\|ABB]]†                                                                                                                                                                                     | Siloed from thermal data                                         |
| **SCADA**                    | Supervisory control, especially power paths and generators                                                        | Critical ops                                 | Ignition†, [[content-areas/AI-Factories-Datacenters/Organizations/AVEVA\|AVEVA]]†, vendor HMIs                                                                                                                                                                                                                                                                     | Proprietary hardware and HMIs                                    |
| **DCIM**                     | White-space assets, rack elevations, capacity, power chain                                                        | IT / DC ops                                  | Schneider EcoStruxure IT, [[Tooling/AI-Toolkit/AI Infrastructure/NLyte\|NLyte]] (Carrier), [[content-areas/AI-Factories-Datacenters/Organizations/Sunbird DCIM\|Sunbird]], [[Tooling/AI-Toolkit/AI Infrastructure/Vertiv\|Vertiv]] Environet, [[content-areas/AI-Factories-Datacenters/Organizations/Eaton\|Eaton]] Brightlayer, Hyperview, Device42, FNT, Cormant | Manual data entry; high shelfware rate; weak facility-side depth |
| **CMMS / EAM**               | Work orders, PMs, MOPs/SOPs, rounds, incident records                                                             | Critical facilities management               | MCIM, Corrigo (JLL), IBM Maximo†, [[Tooling/Enterprise Jobs-to-be-Done/ServiceNow\|ServiceNow]]†                                                                                                                                                                                                                                                                   | Disconnected from live telemetry                                 |
| **CFD / design twin**        | [[content-areas/AI-Factories-Datacenters/Concepts/Thermal Management\|Thermal Management]] and airflow simulation | Design engineering                           | Cadence Reality DC, Siemens, [[Dassault]], Jacobs                                                                                                                                                                                                                                                                                                                  | One-off studies that go stale                                    |
| **IT observability / AIOps** | Server, [[Vocabulary/Graphics Processing Units\|GPU]], network, workload telemetry                                | Platform / SRE                               | [[content-areas/AI-Factories-Datacenters/Organizations/Virtana\|Virtana]], [[Tooling/Data Utilities/DataDog\|DataDog]]†, [[content-areas/AI-Factories-Datacenters/Organizations/Dynatrace\|Dynatrace]]†                                                                                                                                                            | Stops at the server chassis                                      |
| **Workload orchestration**   | Job scheduling and placement                                                                                      | [[Vocabulary/Machine Learning\|ML]] platform | [[Slurm Workload Manager]], Kubernetes, Run:ai†                                                                                                                                                                                                                                                                                                                    | Blind to facility constraints                                    |

Two structural facts matter. First, the DCIM vendor field has consolidated under equipment makers: Carrier bought Nlyte, Sunbird came out of Raritan/Legrand, and Schneider, Vertiv and Eaton bundle software with gear. Second, the seams between layers are where incidents and stranded capacity live. A breaker trip is an EPMS event, a thermal event, a tenant SLA event and a work order, in four systems.

---

## 5. The emerging category map

Eight segments are forming above or between the legacy layers. Funding and attention are very uneven.

| #   | Segment                                               | What it sells                                                        | Representative players                                                                                                      | Heat               | Fit for Cathode.co                                       |
| --- | ----------------------------------------------------- | -------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- | ------------------ | -------------------------------------------------------- |
| 1   | **Unified infrastructure platform**                   | BMS + EPMS + DCIM + SCADA in one data model, fast deploy             | [[content-areas/AI-Factories-Datacenters/Organizations/Aravolta\|Aravolta]]                                                 | Warm               | Low. Occupied, driver-library moat                       |
| 2   | **Autonomous plant control**                          | RL or physics-ML agents that write setpoints                         | [[content-areas/AI-Factories-Datacenters/Organizations/Phaidra\|Phaidra]], Etalytics, Vigilent†                             | Hot                | Low near term. Trust and liability barrier               |
| 3   | **Thermal analytics / advisory**                      | Recommendations from existing sensors, human-in-loop                 | Lucend (ex-Coolgradient), EkkoSense                                                                                         | Warm               | Medium. Cathode.co's current DC page lives here; crowded |
| 4   | **Power-compute orchestration**                       | Unlock stranded power by shaping GPU load                            | Niv-AI, [[content-areas/AI-Factories-Datacenters/Organizations/Hammerhead AI\|Hammerhead AI]]                               | Hot                | Low. Needs workload-side integration                     |
| 5   | **Grid flexibility**                                  | Make the site a dispatchable load to win interconnection             | [[content-areas/AI-Factories-Datacenters/Organizations/Emerald AI\|Emerald AI]]                                                             | Very hot           | Low directly; high as a verification partner             |
| 6   | **AI-factory digital twin**                           | Design-to-operate simulation                                         | NVIDIA Omniverse DSX, Cadence, Jacobs, [[Tooling/AI-Toolkit/AI Infrastructure/Vertiv\|Vertiv]], Schneider ETAP, [[Siemens]] | Hot, incumbent-led | Low. Platform war among giants                           |
| 7   | **Full-stack AI observability**                       | GPU to application correlation with power and thermal signals        | [[content-areas/AI-Factories-Datacenters/Organizations/Virtana\|Virtana]]                                                   | Warm               | Low. IT-side buyer                                       |
| 8   | **Critical-facility operations / agentic work layer** | Work orders, procedures, incident follow-through, predictive service | MCIM, Vertiv Next Predict, Salute (services)                                                                                | Cool               | **High.** Closest to Cathode.co's core loop              |
| 9   | **Infrastructure assurance / verification**           | Independent proof of capacity, health, flexibility for third parties | Aravolta's lender product is the only sighting                                                                              | Nascent            | **High.** Maps to M&V heritage                           |

Notes on the hot segments:

- **Phaidra** raised a $50M+ Series B in October 2025 led by [[Collaborative Fund]] with NVIDIA participating, and in March 2026 announced work with NVIDIA, [[Tooling/AI-Toolkit/AI Infrastructure/CoreWeave|CoreWeave]] and [[Tooling/AI-Toolkit/Applied Compute|Applied Compute]] Digital. It is expanding from cooling into electrical distribution and workload scheduling.
- **Emerald AI** raised $150M at a $1.05B valuation in August 2026 (Energize, DCVC; NVIDIA in every round). Its model depends on utilities granting faster or larger interconnection in exchange for *verified, dispatchable* flexibility.
- **NVIDIA's Omniverse DSX Blueprint** went GA in March 2026. [[content-areas/AI-Factories-Datacenters/Organizations/Cadence|Cadence]], Dassault, Eaton, Jacobs, Phaidra, Procore, PTC, Schneider, Siemens, Switch, Trane and Vertiv are contributing; Emerald, GE Vernova, Hitachi and Siemens Energy are on the grid side. This is the gravitational center for greenfield AI factories. A startup either plugs into it or stays out of that segment.
- **Etalytics** took an M12-led extension (Series A now €16M) to expand in North America. **Lucend** raised a $3.3M seed in January 2026, names [[content-areas/AI-Factories-Datacenters/Organizations/Digital Realty|Digital Realty]], Global Switch and T5 as operators it has worked with, and markets explainable, operator-approved recommendations.

---

## 6. Hitlists

### 6a. Incumbent platforms (compete, integrate, or sell through)

| Company | Relevant products | Angle for Cathode.co |
|---|---|---|
| Schneider Electric | EcoStruxure IT, PowerLogic, ETAP, BMS | Data source; channel is hard; DSX partner |
| Vertiv | Environet, Next Predict (AI predictive maintenance managed service, Jan 2026), SmartRun, OneCore | Next Predict covers Vertiv gear only. Multi-vendor gap is real |
| Siemens | BMS, DSX contributor, investor in Emerald | Data source |
| Eaton | Brightlayer, EPMS, DSX contributor | Electrical OEM partnership candidate |
| Carrier | Nlyte DCIM, Automated Logic BMS | Nlyte is strong in government and large enterprise, where Cathode.co wants to be |
| Trane | Chillers, controls, DSX contributor; BrainBox AI† | Mechanical OEM partnership candidate |
| Honeywell, Johnson Controls | BMS, autonomous control features | Data sources |
| Sunbird, Hyperview, Device42, FNT, Cormant, EkkoSense | Independent DCIM and thermal | Integration targets |

### 6b. Venture-backed and independent specialists

| Company                          | Segment                     | Stage / funding (as reported)          | Note                                               |
| -------------------------------- | --------------------------- | -------------------------------------- | -------------------------------------------------- |
| Aravolta                         | Unified platform            | Seed, $5.1M (Dec 2025); YC Spring 2025 | Colo, modular/edge, lenders. Closest neighbor      |
| Phaidra                          | Autonomous control          | Series B, $50M+ (Oct 2025)             | NVIDIA-aligned; DeepMind lineage                   |
| Emerald AI                       | Grid flexibility            | Series A, $150M at $1.05B (Aug 2026)   | Needs verified flexibility                         |
| Etalytics                        | Cooling optimization        | Series A, €16M total                   | Physics + ML digital twin                          |
| Lucend                           | Thermal advisory            | Seed, $3.3M (Jan 2026)                 | Human-in-loop, brownfield colo                     |
| EkkoSense                        | Thermal analytics + sensors | PE-backed                              | Mature, enterprise footprint                       |
| Niv-AI                           | Power orchestration         | Seed, $12M (Mar 2026)                  | High-frequency power sensing                       |
| Hammerhead AI                    | Power orchestration         | Seed, $10M                             | RL controllers, "ORCA"                             |
| Virtana                          | AI factory observability    | Late-stage private                     | Dell, HPE, Nutanix, AWS integrations in 2026       |
| MCIM (ex-Fulcrum Collaborations) | Critical-facility CMMS      | Private; rebranded Jan 2026            | Claims 1M+ assets, 7 GW managed                    |
| [[Claros]]                       | Power electronics           | Seed, $30M                             | Hardware, not software; ecosystem signal           |
| Fortiv                           | Business continuity         | Early                                  | Adjacent buyer (resilience), not a facilities tool |

### 6c. Partner candidates

- **Data plumbing:** Aravolta (it exposes a full REST API and says it works alongside existing systems), Sunbird, Hyperview. Buying or borrowing ingestion beats rebuilding it.
- **Equipment makers without strong software:** CDU and liquid-cooling vendors (CoolIT, GRC, Motivair†), generator and switchgear makers, BESS integrators. Liquid cooling creates new failure modes (leaks, coolant quality, flow) and a skills gap that the OEMs themselves describe.
- **Operations service firms:** Salute, JLL, CBRE†. They staff the sites and carry the human-error liability.
- **Flexibility and finance:** Emerald AI, utilities running flexible-load programs, GPU-collateral lenders. All need a neutral verifier.

### 6d. Customer segments, ranked by fit

| Segment | Why it fits | Why it's hard |
|---|---|---|
| **University and research computing** | Existing edu relationships; campus rooms are hitting power limits with GPUs sitting idle (Seoul National is a public example); Duke is building an on-campus GPU center tied to its chilled water plant | Small budgets, slow procurement |
| **Government and public-sector enterprise DCs** | Existing gov relationships; M&V and audit trails are valued; legacy plant | Security accreditation; Nlyte entrenched |
| **Mid-market colocation** | Selling capacity is the business; headroom equals revenue | Aravolta, Lucend, EkkoSense already calling |
| **Healthcare and enterprise on-prem** | Already an Cathode.co vertical; mixed building + DC estate under one facilities team | DC is a small part of their problem |
| **Neocloud / AI factory** | Biggest budgets | Phaidra, NVIDIA ecosystem; uptime stakes; credibility gap |
| **Hyperscale** | None | Build in-house |

---

## 7. Reading the four suggested comparables

| Company | What it actually is | Usefulness as a comp |
|---|---|---|
| **Aravolta** | Unified BMS/EPMS/SCADA/DCIM/NOC for colo, modular and lenders. Hardware node as "virtual PLC," gated control writes, tenant billing, AI assistant | **Direct.** Shows the consolidation play is funded and shipping. Also a likely integration partner |
| **Virtana** | Hybrid infrastructure observability extended to "AI Factory Observability" across GPUs, storage, network, with power and thermal signals | **Adjacent.** IT-side buyer. Useful as proof that the IT and facility data models are converging from the top down |
| **Fortiv** | AI-native business continuity management: BIA collection by voice agent, tabletop exercises, incident response | **Analog, not competitor.** Demonstrates an agentic wedge into a process-heavy, audit-driven function. The MOP/SOP/incident side of data center ops has the same texture |
| **SailPoint** | Identity security and governance | **Weak comp.** Not scanned in depth. The useful analogy is governance: who or what is allowed to change a setpoint, with an audit trail. Access governance for agents acting on OT systems is an unbuilt product |

---

## 8. Gaps and unsolved problems

Ranked by how well they match what Cathode.co already does.

1. **Verified capacity headroom for brownfield sites.** Operators are guessing how much density existing cooling and power can take. CFD studies go stale. Cathode.co's "calibrate on a live pod, predict, verify against measured inlet temps" pitch is right. The gap in the pitch is electrical: headroom is constrained by power chain and redundancy as often as by cooling.
2. **Closing the loop from alarm to verified fix.** BMS and DCIM raise alarms; CMMS holds work orders; nothing confirms from telemetry that the fix worked. MCIM owns the work record but is not telemetry-native. Vertiv Next Predict is telemetry-native but Vertiv-only. This is Cathode.co's core loop, untranslated.
3. **Independent [[content-areas/AI-Factories-Datacenters/Concepts/Measurement and Verification|M&V]] for optimization and flexibility.** Every cooling-AI vendor reports its own savings. Emerald's commercial model, and the utility programs around it, turn on verified dispatchable flexibility. Aravolta already sells telemetry verification to a GPU lender. A neutral measurement layer has buyers on four sides: operator, tenant, utility, financier.
4. **Human error and procedure execution.** Outages are fewer but costlier, and junior ops staff are the hardest hire. Agent-drafted MOPs, pre-change simulation ("what happens to redundancy if I take this unit out"), and post-change verification are unbuilt at most sites.
5. **Mixed estates.** Universities, hospitals, agencies and enterprises run buildings *and* data rooms under one facilities org with separate tools. Nobody sells one operating layer across both. Cathode.co is one of very few companies that could credibly claim it.
6. **Liquid-cooling operations.** CDU health, coolant chemistry, leak response and the IT/facility handoff are new work with no established software owner. Sunbird and Nlyte only added CDU monitoring profiles in 2026.
7. **Cross-domain root cause.** Virtana's own survey says most enterprises can't automatically find root cause across infrastructure domains when an AI workload alert fires. The facility half of that correlation is missing from IT tools.
8. **[[concepts/Explainers for AI/AI Governance|AI Governance]] of agent actions on OT.** Only 16% of operators accept automated config changes. Approval chains, scoped permissions and audit trails for AI-proposed changes are a product, not a feature.

---

## 9. Strategic options

### Option A: Augment entrenched systems (recommended start)
Read-only overlay on existing BMS, EPMS, DCIM and CMMS. Sell a specific outcome: verified headroom, then verified fixes.
- **For:** matches buyer behavior (augment, not switch), matches trust data, shortest path to a pilot, no control liability.
- **Against:** integration grind; value must be proven fast or it becomes another dashboard.
- **Make it work by:** pricing per verified kW unlocked or per pod, not per seat. Borrowing ingestion from a platform partner.

### Option B: Partner with equipment or power manufacturers
Become the multi-vendor intelligence layer an OEM lacks. CDU makers, modular builders, BESS and switchgear vendors are candidates.
- **For:** distribution and credibility Cathode.co can't build alone; OEM predictive services are single-vendor by design.
- **Against:** long sales cycles, risk of being a feature; large OEMs are aligning with NVIDIA DSX and their own stacks.
- **Best target:** second-tier and newer liquid-cooling and modular vendors that need a software story.

### Option C: Create a category
Two candidates with real white space:
- **"Infrastructure assurance"** or **"capacity M&V"**: independent verification of capacity, efficiency and flexibility. Buyers include lenders and utilities, not just operators.
- **"Facility operations agents"**: the agentic work layer for critical facilities.
- **For:** defensible framing; avoids head-on fights with Aravolta and Phaidra.
- **Against:** category creation costs money and time; a two-person team should earn it with three reference customers first.

### Option D: Replace (unified platform)
Not recommended. Aravolta is ahead, operators aren't asking to switch, and incumbents bundle.

### Suggested sequence
1. **Now:** two or three design partners in university research computing or government enterprise DCs, where the relationships exist and the neocloud-focused startups aren't selling. Deliver a verified headroom study that includes the electrical chain.
2. **Next:** attach the work loop. Every finding becomes a reviewed, dispatched, verified work order. Integrate with MCIM, ServiceNow or Maximo instead of displacing them.
3. **Then:** take the same verification engine to mid-market colo, and to a flexibility or financing partner as the neutral measurer.
4. **Later, if earned:** supervised control on low-risk loops.

---

## 10. Risks and what would change this view

- **Credibility.** School logos do not transfer. A named data center operator, a critical-facilities hire or advisor, and SOC 2 are table stakes. Aravolta has SOC 2 Type II, ISO 27001 and on-prem/air-gapped deployment.
- **Thermal-only is a crowded lane.** Lucend, EkkoSense, Etalytics, Cadence and Phaidra all model cooling. Without the electrical side and the work loop, Cathode.co is a late entrant with less data.
- **Incumbent bundling.** Gartner now treats DCIM as mature. Schneider, Vertiv and Carrier will add agents to what they already sell.
- **Platform gravity.** If DSX becomes the default operating twin for new builds, independent models matter less in greenfield. That pushes Cathode.co further toward brownfield, which is where the recommendation already points.
- **Focus.** The website now lists five industries. A 34-site company adding data centers, healthcare, CRE and construction at once is spreading thin. Investors pushing data centers should be asked which existing vertical gets paused.
- **Would change the view:** evidence that operator trust in AI control is rebounding (favors Option C-control); Aravolta or MCIM shipping telemetry-verified work loops (closes gap 2); a utility or lender mandating a specific verification standard (accelerates gap 3).

---

## 11. Questions worth answering next

1. What does Cathode.co's "government campus" traction actually include? Any server rooms or data halls already under contract are the cheapest first pilot.
2. Which telemetry sources can it ingest today without custom work: BACnet, Modbus, SNMP, Redfish?
3. Can the thermal model be extended to power chain and redundancy state, or is that a rebuild?
4. Would Aravolta treat Cathode.co as a partner (analytics on its API) or a competitor (it has an AI assistant and planning tools)?
5. Who signs the check: critical facilities, IT infrastructure, or energy/sustainability? In mixed estates this decides the whole motion.
6. Is there a utility or lender willing to name Cathode.co as an accepted verifier in a pilot?

---

## 12. Source library

### Tier 1: analyst, consulting, agency
| Source | What it supports | Link |
|---|---|---|
| Uptime Institute, *Global Data Center Survey 2026* (16th annual) | Density, outages, staffing, AI trust, workload split | https://uptimeinstitute.com/resources/research-and-reports/uptime-institute-global-data-center-survey-results-2026 |
| Uptime Intelligence keynote report 209 (July 2026) | Key points summary | https://intelligence.uptimeinstitute.com/resource/uptime-institute-global-data-center-survey-2026 |
| McKinsey, "The cost of compute: A $7 trillion race to scale data centers" | Capex and GW scenarios | https://www.mckinsey.com/industries/technology-media-and-telecommunications/our-insights/the-cost-of-compute-a-7-trillion-dollar-race-to-scale-data-centers |
| IEA, *Energy and AI* (executive summary) | TWh baseline and 2030 projection | https://www.iea.org/reports/energy-and-ai/executive-summary |
| IEA press release on *Energy and AI* | US demand-growth share | https://www.iea.org/news/ai-is-set-to-drive-surging-electricity-demand-from-data-centres-while-offering-the-potential-to-transform-how-the-energy-sector-works |
| Gartner, *Hype Cycle for Data Center Infrastructure Technologies, 2026* (as summarized by Schneider Electric) | DCIM on Plateau of Productivity | https://blog.se.com/datacenter/2026/08/26/2026-gartner-hype-cycle-dcim-tools-enter-the-plateau-of-productivity/ |
| Gartner Peer Insights, DCIM alternatives pages | Vendor set as buyers see it | https://www.gartner.com/reviews/product/nlyte/alternatives |
| MarketsandMarkets, DCIM market (2021 base; $3.2B by 2026) | Historical sizing | https://www.marketsandmarketsblog.com/industry/data-center-infrastructure-management-market |
| IMARC, DCIM market report 2026–2034 | $4.7B in 2025, 11.7% CAGR | https://www.imarcgroup.com/report/en/data-center-infrastructure-management-market |
| 360iResearch (via GII), DCIM forecast 2026–2032 | $3.62B in 2026 | https://www.giiresearch.com/report/ires2085425-data-center-infrastructure-management-market-by.html |
| ResearchAndMarkets, DCIM software strategic report | $3.7B by 2030 | https://www.businesswire.com/news/home/20250718223502/en |
| Guidehouse Research, DCIM 2025–2034 | Segment forecast by facility type | https://cn.gii.tw/report/nav1867293-data-center-infrastructure-management.html |
| Future Market Insights, AI rack lifecycle asset intelligence platforms | 2026 product moves by Sunbird, Nlyte, Vertiv, Schneider | https://www.futuremarketinsights.com/reports/ai-rack-lifecycle-asset-intelligence-platforms-market/companies |
| CB Insights profiles (EkkoSense, Lucend, Nlyte) | Category definitions, funding | https://www.cbinsights.com/company/ekkosense-1 |
| Sacra, Phaidra profile | Competitive framing, expansion plans | https://sacra.com/c/phaidra |
| Mercom Capital, Emerald AI and smart-grid funding | Round details, 1H 2026 sector funding | https://mercomcapital.com/?p=15998 |
| JLL, data center FM best practices | CMMS landscape (MCIM, Corrigo) | https://www.jll.com/en-ae/guides/top-five-data-center-facilities-management-best-practices |

### Tier 2: journalism and trade press
| Source | What it supports | Link |
|---|---|---|
| Network World, Uptime 2026 survey coverage | Detailed survey statistics | https://www.networkworld.com/article/4203054/most-corporate-it-is-off-premises-ai-is-reshaping-infrastructure-uptime-reports.html |
| IT Brew, McKinsey $7T coverage | Scenario ranges | https://www.itbrew.com/stories/2025/05/09/is-usd7-trillion-really-the-magic-number-to-get-ai-data-centers-up-to-speed-by-2030 |
| Scientific American / Nature, IEA coverage | Independent read of IEA figures | https://scientificamerican.com/article/ai-will-drive-doubling-of-data-center-energy-demand-by-2030 |
| GeekWire, Phaidra $50M | Round, strategy | https://www.geekwire.com/2025/phaidra-raises-50m-to-help-ai-data-centers-run-smarter-not-just-harder-by-boosting-energy-efficiency/ |
| The Next Web, Emerald AI $150M | Investors, model, NYT reference | https://thenextweb.com/news/emerald-ai-150m-funding-data-centre-grid-flexibility |
| Dealroom, Emerald AI | Business model, round context | https://dealroom.co/news/146819-emerald-ai-raises-150m-series-a-at-1-05b-to-tame-data-center-power-deman/ |
| ESG Today, Emerald AI | Round and deployment detail | https://esgtoday.com/data-center-power-solutions-startup-emerald-ai-raises-150-million-at-unicorn-valuation |
| Data Center Dynamics, Niv-AI seed | Stranded power thesis | https://www.datacenterdynamics.com/en/news/data-center-energy-efficiency-startup-niv-ai-emerges-from-stealth-with-12m-fundraise/ |
| Data Center Dynamics, Hammerhead AI seed | Stranded power thesis | https://www.datacenterdynamics.com/en/news/hammerhead-ai-emerges-from-stealth-with-10m-raise-aims-to-unlock-stranded-power-from-gpus/ |
| Calcalist, Niv-AI | Founder and investor detail | https://www.calcalistech.com/ctechnews/article/bk4zmc8cbe |
| Data Center Dynamics, top DCIM vendors | Vendor histories | https://www.datacenterdynamics.com/en/opinions/top-10-dcim-vendors/ |
| Data Center Knowledge, MCIM / Fulcrum profile | CMMS-for-critical-facilities category | https://www.datacenterknowledge.com/management/using-data-science-to-spot-data-center-failure-before-it-happens |
| Datacentres.com, DCIM Buyer's Guide 2026 | Shelfware claim, vendor positioning | https://www.datacentres.com/news/dcim-buyer-s-guide-2026-why-60-of-deployments-still-end-up-as-shelfware-in-a-3-1-slot3-2026-08-31 |
| Implicator, Etalytics / M12 | Round, approach | https://www.implicator.ai/microsoft-backs-german-ai-firm-etalytics-as-datacenter-power-costs-bite/ |
| Pulse 2.0, Lucend seed | Round, customers | https://pulse2.com/lucend-3-3-million-funding/amp/ |
| EE Power, Phaidra | Cooling share of energy, earlier funding | https://eepower.com/news/keeping-cool-boosting-data-center-efficiency-with-ai/ |
| HPCwire, NVIDIA DSX GA | Partner list, date | https://www.hpcwire.com/off-the-wire/nvidia-releases-vera-rubin-dsx-ai-factory-reference-design-and-omniverse-dsx-digital-twin-blueprint/ |
| Converge Digest, DSX | Tokens-per-watt framing | https://convergedigest.com/nvidia-dsx-architecture-targets-token-per-watt-optimization/?amp=1 |
| IT Brief, Virtana HPE support | 2026 integration cadence | https://itbrief.com.au/story/virtana-adds-hpe-ai-factory-support-for-observability |
| GovTech / News & Observer, Duke GPU center | Campus AI data centers | https://www.govtech.com/education/higher-ed/north-carolinians-question-duke-universitys-planned-data-center |
| Korea JoongAng Daily, Seoul National University | GPUs idle at campus power limit | https://www.koreajoongangdaily.com/korea/snu-wants-to-harness-the-power-of-ai-but-energy-limits-mean-lights-out-for-many-labs/12847122 |
| TechCrunch, 2026 unicorn list | AI-infrastructure hardware funding context | https://techcrunch.com/2026/07/05/almost-40-new-unicorns-have-been-minted-so-far-this-year-here-they-are/ |

### Tier 3: primary and vendor sources
| Source | What it supports | Link |
|---|---|---|
| Cathode.co home page | Positioning, traction | https://edviroenergy.com/ |
| Cathode.co data centers page | Thermal headroom offer | https://edviroenergy.com/solutions/data-centers/ |
| Y Combinator, Cathode.co profile and launch | World-model framing, team, asks | https://www.ycombinator.com/companies/edviro |
| Aravolta site | Product scope, comparison claims | https://www.aravolta.com/ |
| Y Combinator, Aravolta profile | Batch, team | https://ycombinator.com/companies/aravolta |
| VCBacked, Aravolta funding | $5.1M seed, investors | https://www.vcbacked.co/company/aravolta |
| Virtana, Dell AI Factory release | AIFO scope, survey stat | https://www.virtana.com/?p=11922 |
| Business Wire, Virtana HPE | AIFO scope | https://www.businesswire.com/news/home/20260714283525/en/Virtana-Extends-AI-Factory-Observability-to-the-HPE-AI-Factory |
| Fortiv site | Product scope | https://www.fortiv.io/ |
| NVIDIA blog, Omniverse DSX Blueprint | Ecosystem, agent training in twin | https://blogs.nvidia.com/blog/omniverse-dsx-blueprint |
| NVIDIA IR, Vera Rubin DSX release | GA and partners | https://investor.nvidia.com/news/press-release-details/2026/NVIDIA-Releases-Vera-Rubin-DSX-AI-Factory-Reference-Design-and-Omniverse-DSX-Digital-Twin-Blueprint-With-Broad-Industry-Support/default.aspx |
| Vertiv, Next Predict release | Predictive maintenance managed service | https://www.vertiv.com/en-us/about/news-and-insights/corporate-news/vertiv-announces-new-ai-powered-predictive-maintenance-service-for-modern-data-centers-and-ai-factories/ |
| Vertiv, liquid cooling operational challenges | Skills and ops gaps | https://www.vertiv.com/en-us/about/news-and-insights/articles/educational-articles/keeping-cool-under-pressure-five-operational-challenges-in-liquid-cooled-data-centers/ |
| PR Newswire, Phaidra Series B | Investors | https://www.vcaonline.com/news/2025100106/collaborative-fund-leads-phaidra-s-50m-series-b-to-build-the-ai-factories-of-the-future/ |
| MCIM profile (Yespress) | Rebrand, scale claims | https://yespress.io/mcim.md |
| Capterra, MCIM | Category placement | https://capterra.com/p/161993/MCIM/ |
| Equinix, university research infrastructure brief | Campus constraint framing (vendor view) | https://www.equinix.com/resources/solution-briefs/university-research-infrastructure |
| NEXTDC, AI infrastructure gap in universities | Campus constraint framing (vendor view) | https://www.nextdc.com/blog/ai-infrastructure-gap-universities |
| Reliamag, best DCIM 2026 | Vendor roundup | https://reliamag.com/guides/best-dcim-software/ |
| Virima, best DCIM 2026 | Notes Vertiv Trellis was discontinued | https://virima.com/blog/best-dcim-software |

### Source caveats
- DCIM market-size estimates differ by a factor of six across research houses. Use $3–5B as the working range and do not build a TAM on any single figure.
- One trade source lists Vertiv Trellis as an active platform; another reports it was discontinued in 2021. The second is more consistent with other reporting.
- "30% of contracted power unused," "GPUs at 30–50% of potential," "20–40% cooling savings" and similar are vendor claims.
- Not located in this scan and worth pulling directly: Gartner's full 2026 Hype Cycle, the New York Times piece on Emerald AI, PitchBook data on data center software deal flow, and any Accenture or Deloitte work on data center operations.
