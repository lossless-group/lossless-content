---
aliases:
  - Simple Linux Utility for Resource Management
  - Slurm
date_created: 2026-10-06
date_modified: 2026-10-08
wikipedia_url: https://en.wikipedia.org/wiki/Slurm_Workload_Manager
cf_last_run: 2026-10-08T20:17:05.016Z
cf_last_run_model: Perplexity sonar-pro
cf_retrieved_source_count: 6
cf_last_run_retrieval: 2026-10-08T20:17:05.016Z
---

## Retrieved sources

### [^E1] SchedMD LLC — https://schedmd.com/

```yaml
founded_year: "2010"
name: SchedMD LLC
headquarters:
  address: 905 N 100 E, Lehi, UT 84043, US
  city: Lehi
  country: United States
workforce:
  total: 6
financials:
  revenueAnnual: 8173250
```

Open-source workload management and cluster-management software for HPC and AI, focused on scheduling and resource management.

### [^E2] Clusterra.cloud — https://clusterra.cloud/

```yaml
founded_year: "2025"
pricing_model: Unknown from provided text; mentions AWS/NVIDIA credits paying compute, per-job/per-user cost visibility, and quotas suggest usage-based pricing but exact model not specified.
name: Clusterra.cloud
headquarters:
  address: Bengaluru, IN
  city: Bengaluru
  country: India
  workforce:
    total: 2
```

[[Tooling/AI-Toolkit/AI Infrastructure/Clusterra]] A managed Slurm platform for HPC and AI research with OIDC authentication, quotas, cost visibility, spot GPUs, and a unified workflow for scientific workloads.

### [^E3] Bright Computing (Acquired by [[organizations/Nvidia|NVIDIA]]) — https://brightcomputing.com/

```yaml
founded_year: "2009"
funding: "Total Funding: USD 18,647,579"
name: Bright Computing (Acquired by NVIDIA)
```

Bright Cluster Manager provides Linux cluster automation and management for HPC, machine learning, big data, and OpenStack.

### [^E4] [[Saturn Cloud]] — https://saturncloud.io/

```yaml
founded_year: "2018"
funding: "Total funding USD 9,500,000"
name: Saturn Cloud
```

Saturn Cloud provides a white-labeled control plane for GPU clouds, including multi-tenant isolation, day-2 support, billing, and self-service AI infrastructure.

### [[StackHPC]] — 
https://stackhpc.com/ [^E5]

```yaml
founded_year: "2016"
name: StackHPC
```

StackHPC provides OpenStack deployments, support, and open-source infrastructure workflows for research and scientific computing.

### [[Clockwork]] Systems, Inc. — 
https://clockwork.io/ [^E6]

```yaml
founded_year: "2018"
funding: "Total funding USD 41,600,000"
name: Clockwork Systems, Inc.
```

Clockwork.io provides an AI-cluster fabric focused on observability, determinism, resilience, and large-scale model training, deployment, and serving.

# Value Proposition & Features

Slurm Workload Manager is open-source workload-management and cluster-management software for high-performance computing and AI environments. Its core value is centralized allocation, scheduling, execution, monitoring, and accounting of work across shared compute resources.[2] SchedMD describes the product as focused on scheduling and resource management for HPC and AI. [^E1]

Its architecture separates control-plane scheduling from node-level execution: `slurmctld` maintains cluster state and scheduling decisions, while `slurmd` daemons on compute nodes launch and supervise tasks.[2] This model supports large parallel workloads while keeping jobs off the controller itself.[2]

- **Job allocation:** Allocates exclusive or shared access to compute nodes for defined periods.[2]
- **Queue management:** Arbitrates competing requests through a pending-work queue.[2]
- **Parallel execution:** Starts and supervises work across allocated nodes.[2]
- **Resource-aware scheduling:** Considers availability, priority, fairness, and placement when assigning jobs.[5]
- **Monitoring:** Tracks node and job state during execution.[2]
- **Fault tolerance:** Supports continued operation and job handling when nodes fail.[5]
- **Hardware portability:** Is designed for Linux and to be portable across interconnects.[5]
- **Kubernetes integration:** SchedMD’s Slinky project provides a Kubernetes-native route to operating Slurm environments.[3]

Slurm also fits naturally into the **Datacenter Operations Systems** landscape, alongside Kubernetes and Run:ai, and into **AI Factories** that require advanced scheduling and orchestration.

## Screenshots

No three official publicly available screenshots were identified in the retrieved results.

## Product Roadmap / Announcements

As of October 8, 2026,

- **September 30, 2026:** Slurm versions 26.05.4, 25.11.8, and 25.05.9 were announced with security fixes, including CVE-2026-65107 and related vulnerabilities.[1]
- **September 10, 2026:** A U.S. government procurement notice described planned support for Slurm and Slinky Bridge, including hybrid integration between local computing systems and cloud resources.[13]
- **May 26, 2026:** Slurm 26.05 was reported as available.[6]

## Recent Developments

The retrieved results indicate that SchedMD is now part of NVIDIA, while Slurm is described as continuing as open-source and vendor-neutral software.[6] Slinky is being used to preserve Slurm workflows—including `sbatch`, `srun`, `squeue`, and `sacct`—on Kubernetes GPU clusters.[3]

# History and Origin Story

SchedMD LLC was founded in 2010 and is the organization associated with Slurm’s development, maintenance, and commercial support. [^E1] The project’s current architecture centers on the `slurmctld` controller and `slurmd` node daemons, while recent development has expanded toward Kubernetes integration through Slinky.[2][3]

## Fundraising History

No reliable source found for Slurm or SchedMD venture-funding rounds. SchedMD’s provided profile reports annual revenue but does not provide a fundraising history. [^E1]

| Round | Date | Amount | Lead investor |
|---|---:|---:|---|
| Total reported funding | — | Not disclosed | — |

No reliable investor list found.

## Notable Team Members

No reliable source found in the retrieved results identifying Slurm’s founders or specific current executives. SchedMD is identified as the organization behind Slurm and as its commercial support provider. [^E1][13]

# Market Sizing

## Category, Market Size, and Category Growth

Slurm belongs primarily to the **HPC workload-management, cluster-scheduling, and AI-infrastructure orchestration** categories. Its adjacent market includes Kubernetes GPU scheduling, managed HPC platforms, cluster-management software, and AI-cluster control planes.[2][3][4][6]

No reliable analyst estimate for the specific Slurm workload-manager market was found in the retrieved results. A broader AI-infrastructure market figure would not reliably represent Slurm’s addressable category.

## Pricing

No public pricing for the Slurm software itself was identified in the retrieved results.

| Pricing tier | Price | Notes |
|---|---:|---|
| Slurm Workload Manager | No public pricing | Open-source software; commercial support terms were not provided in the retrieved results. |

## Revenue Trajectory Estimates

SchedMD’s provided profile reports annual revenue of **$8,173,250**. [^E1] No time-series revenue or ARR trajectory was found.

# Competitive Landscape

## Who it's for, who it's not for

Slurm is for organizations operating shared HPC, research, scientific-computing, or AI clusters that need queueing, resource allocation, parallel execution, fairness, monitoring, and accounting.[2][5] It is particularly suited to environments where users submit batch or interactive jobs to centrally managed compute resources.

It is not primarily a turnkey GPU-cloud control plane, a general-purpose cloud billing product, or a standalone Kubernetes platform. Products such as Saturn Cloud focus more directly on multi-tenant GPU-cloud operations and integrated billing. [^E4]

## Viable Alternatives

- **Kubernetes:** A general-purpose container orchestration platform; it is also the platform on which Slinky enables Kubernetes-native Slurm deployments.[3]
- **Run:ai:** An AI workload-orchestration alternative referenced alongside Slurm in AI-factory and datacenter-operations contexts.
- **Bright Cluster Manager:** A commercial cluster-management alternative for HPC, machine learning, big data, and OpenStack environments. [^E3]
- **Saturn Cloud:** A managed, white-labeled GPU-cloud control plane with isolation, support, and billing features. [^E4]
- **Clockwork.io:** An AI-cluster infrastructure alternative emphasizing observability, determinism, resilience, and large-scale model operations. [^E6]

## Competitor Table

| Competitor | Description |
|---|---|
| [Kubernetes](https://kubernetes.io/) | General-purpose container orchestration platform that can be combined with Slurm through Slinky.[3] |
| [Run:ai](https://run.ai/) | AI-oriented scheduling and orchestration platform referenced as an alternative in AI-infrastructure contexts. |
| [Bright Cluster Manager](https://brightcomputing.com/) | Commercial Linux cluster-management software for HPC, machine learning, big data, and OpenStack. [^E3] |
| [Saturn Cloud](https://saturncloud.io/) | White-labeled GPU-cloud control plane offering tenant isolation, support, billing, and self-service AI infrastructure. [^E4] |
| [Clockwork.io](https://clockwork.io/) | AI-cluster fabric focused on observability, deterministic operation, resilience, and model workloads. [^E6] |


***

# Sources

[1]: [- slurm-users - lists.schedmd.com](https://lists.schedmd.com/mailman3/hyperkitty/list/slurm-users@lists.schedmd.com/latest?count=200&count=%2527&page=1)
[2]: [Slurm Workload Manager: What It Does and Its Limits](https://hysenlabs.com/en/projects/schedmd-slurm)
[3]: [New in Verda's Instant clusters: Slurm on Kubernetes, Audit ...](https://verda.com/blog/instant-clusters-h1-2026)
[4]: [SchedMD/slurm - 项目详情 - TrendForge](https://trendforge.devlive.org/project/SchedMD/slurm)
[5]: [SchedMD/slurm — GitHub Star History & Stats](https://gittrend.io/repo/SchedMD/slurm)
[6]: [AI Rack Golden-Image Compliance Platforms Market Size, Share, Trends 2036](https://www.futuremarketinsights.com/reports/ai-rack-golden-image-compliance-platforms-market)
[7]: [NVQLink: Quandela, NVIDIA Draw Photonic QPU Control ...](https://www.supercomputing.news/quantum/quandela-nvidia-nvqlink-white-paper-photonic-qpu-september-2026)
[8]: [Build software better, together](https://github.mosekj.com/topics/slurm)
[9]: [Slurm Tenant Isolation: How to Give Each HPC Customer ...](https://www.vcluster.com/blog/slurm-tenant-isolation)
[10]: [SemiAnalysis on X: "Ever since NVIDIA acquired SLURM/SchedMD ...](https://x.com/SemiAnalysis_/status/2106942597532963194)
[11]: [Fractional Gpu Vs Mig: What...](https://www.beri.net/article/runai-vs-kueue-vs-slurm-kubernetes-gpu-scheduling-2026)
[12]: [Merge branch 'github-pr-224' into 'master' · SchedMD/slurm@ca536ca](https://github.com/SchedMD/slurm/commit/ca536cae6ab1270210e61c1b6e99ca75b5e2d56d)
[13]: [Notice of Intent for… — HEALTH AND HUMAN SERVICES, DEPARTMENT OF — PCA-NCATS-06792 | FedSift](https://app.fedsift.app/solicitations/6b844c2264c84e8b9c78c35c987fcf1e)
[14]: [SemiAnalysis (@SemiAnalysis_) on X](https://x.com/SemiAnalysis_/status/2106942597532963194/photo/1)
[15]: [How to Run Isolated Slurm Clusters for Every Tenant](https://www.vcluster.com/blog/tenant-isolated-slurm-clusters-kubernetes)

## Sources (retrieved)

[^E1]: [Exa.ai](https://exa.ai) API response for data on [SchedMD LLC](https://schedmd.com/)
[^E2]: [Exa.ai](https://exa.ai) API response for data on [Clusterra.cloud](https://clusterra.cloud/)
[^E3]: [Exa.ai](https://exa.ai) API response for data on [Bright Computing (Acquired by NVIDIA)](https://brightcomputing.com/)
[^E4]: [Exa.ai](https://exa.ai) API response for data on [Saturn Cloud](https://saturncloud.io/)
[^E5]: [Exa.ai](https://exa.ai) API response for data on [StackHPC](https://stackhpc.com/)
[^E6]: [Exa.ai](https://exa.ai) API response for data on [Clockwork Systems, Inc.](https://clockwork.io/)
