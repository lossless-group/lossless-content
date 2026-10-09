---
aliases:
  - VRAM
tags:
  - Hardware-for-AI
  - Hardware
  - Chip-Designs
date_created: 2026-10-08
date_modified: 2026-10-09
site_uuid: 65529a82-4233-4510-8520-3f9bc9e2f753
publish: true
title: Video Random Access Memory
slug: video-random-access-memory
at_semantic_version: 0.0.0.1
cf_last_run: 2026-10-09T00:48:05.693Z
cf_last_run_model: Perplexity sonar-pro
---

https://youtu.be/uavLRbbfM94?is=pR6XmXxoFgREesKB

[[concepts/Explainers for Tooling/Cloud-Native Architecture and Computing|Cloud-Native Architecture and Computing]]

# Defining and Describing Video Random Access Memory

- ![Diagram of a GPU showing VRAM holding frame buffers, textures, model weights, activations, and KV cache](https://tekmart.co.za/t-blog/wp-content/uploads/2021/10/This-image-shows-the-main-components-of-a-video-card.jpg)
- _In startup and innovation work, Video Random Access Memory (VRAM) means the high-speed memory attached to or closely associated with a graphics processor, whose capacity and bandwidth can determine which visual, simulation, or AI workloads a product can run locally._[1][2][10]
- Historically, VRAM stored pixels and other graphical data for display rendering.[1][5] In contemporary accelerator discussions, the term is also used more broadly for memory available to a GPU or AI accelerator, even when no video is being rendered.[10] Innovation consultants therefore treat VRAM as a product-architecture and adoption constraint: it affects model size, latency, device economics, cloud dependence, and the feasibility of edge or on-premises deployment.[2][10][11]

# Disambiguation

## Primary sense — the innovation-consulting sense

**VRAM is the GPU-accessible memory resource that supplies graphics or AI compute with high-bandwidth working data.**[2][10]

- For AI products, VRAM commonly holds model weights, intermediate activations, and the key-value cache generated during inference.[2][12]
- **Capacity** determines whether a model and its runtime data can remain resident on the accelerator; insufficient capacity can force slower transfers or swapping and can undermine local-inference economics.[11][14]
- **Bandwidth** is distinct from capacity: bandwidth measures how quickly data can feed the GPU’s compute cores, while capacity measures how much data can be held.[2][10]
- VRAM is not synonymous with the GPU itself, compute performance, or system RAM. System RAM serves the broader computer, whereas VRAM is optimized for the graphics processor’s high-throughput workload.[2][8]
- In product strategy, a GPU with more VRAM is not automatically the best choice: the relevant decision also includes model size, quantization, concurrency, latency, power, hardware cost, and whether workloads can be served from the cloud.[2][14]

## Other senses

### 1. Dedicated display memory

**In its original and narrower sense, VRAM is memory reserved for a graphics adapter’s framebuffer and display data.**[1][5]

- The framebuffer stores pixels that are rendered and sent to a monitor; textures and other graphics data may also occupy this memory.[1][5]
- Dedicated graphics memory emerged because standard system memory was inadequate for increasingly demanding graphical interfaces and 3D rendering.[8]
- This sense remains relevant when evaluating games, workstation visualization, digital twins, design tools, and other products whose user experience depends on local rendering.[3][8]

### 2. A family of graphics-memory implementations

**VRAM can also refer informally to the memory technology used by a graphics card, including GDDR-based memory and, in accelerator contexts, HBM.**[3][5]

- Older video memory included dual-ported video RAM; later systems adopted technologies such as SGRAM, GDDR, and HBM.[5]
- GDDR is widely associated with graphics cards, while HBM uses stacked memory and very wide interfaces to provide high bandwidth for advanced accelerators.[3][5]
- Calling every accelerator memory technology “VRAM” can obscure important architectural differences; a hardware roadmap should specify the actual memory type, capacity, bandwidth, and packaging.

# Etymology and Origin

- “Video Random Access Memory” expands the acronym **VRAM** and describes random-access memory dedicated to video or graphics data.[1][5]
- The reported origin of the underlying dedicated-memory design is IBM’s work in 1980 by Frederick Dill, Daniel Ling, and Richard Matick for a high-resolution graphics adapter associated with the RISC Technology Personal Computer.[1]
- IBM’s RT PC is also described as an early use of video DRAM, although the technology was initially expensive and became more broadly adopted later.[9]
- The term subsequently migrated from display hardware into modern GPU and AI-hardware vocabulary, where “VRAM” often denotes accelerator memory even when the workload is model inference rather than video rendering.[10]

# Adjacent Vocabulary

- **Synonyms**:
  - **GPU memory**: the most practical modern synonym; broader and less tied to display output.[10]
  - **Graphics memory**: emphasizes rendering, textures, framebuffers, and gaming or visualization workloads.[3][5]
  - **Accelerator memory**: more suitable for AI and high-performance-computing contexts, especially where the device is not primarily a graphics card.[2][10]
  - **Video memory**: a plain-language equivalent, often used for consumer hardware explanations.[1][8]

- **Antonyms**:
  - **System RAM**: general-purpose main memory used by the CPU and operating system rather than memory dedicated to the graphics processor.[2][8]
  - **CPU-only execution**: a contrasting architecture in which workloads do not rely on a discrete GPU’s dedicated high-bandwidth memory.

- **Adjacent terms**:
  - [[Vocabulary/Graphics Processing Units|GPU]]
  - [[GDDR]]
  - [[High-Bandwidth Memory]]
  - [[Framebuffer]]
  - [[Model Weights]]
  - [[KV Cache|Key-Value Cache]]

# Usage in Practice

- “VRAM is the common name for memory used by a GPU to hold working data.”[10]
- “VRAM … is purpose-built to sit as close as possible to the GPU die and supply it with the working set: model weights, activations, and the key-value cache that inference generates token by token.”[2]
- “VRAM holds model weights, accelerator buffers, and often parts of the runtime cache.”[11]
- “When enough VRAM exists, models can remain resident, and inference runs without slow swapping.”[11]
- “VRAM … is built for high-bandwidth parallelism, continuously feeding thousands of GPU cores.”[4]
- “Video random-access memory … [is] a dedicated computer memory … used to store pixels and other graphical data in a framebuffer.”[5]
- “The simple answer is ‘video random-access memory,’ a type of memory used to store image data for a PC display.”[1]

# Common Misuses

- **“More VRAM always means a faster product.”** Better term: **compute performance** or **end-to-end inference performance**. VRAM capacity can enable a workload, but speed also depends on bandwidth, compute resources, software, power, and workload shape.[2][10]
- **Calling system RAM “VRAM” merely because a program uses it for graphics.** Better term: **shared memory** or **unified memory** when the CPU and GPU access a common pool.
- **Treating VRAM capacity as equivalent to model capacity.** Better term: **deployable model footprint**. Model weights are only one component; KV cache, activations, and framework overhead also consume memory.[12][14]
- **Using “VRAM” for every high-bandwidth memory subsystem without qualification.** Better term: **GDDR memory**, **HBM**, or **accelerator memory**, depending on the actual architecture.[3][5]


***

# Sources

[1]: [What Does 'VRAM' Actually Mean On An Nvidia GPU? - BGR](https://www.bgr.com/2023526/what-nvidia-gpu-graphics-card-vram-means/)
[2]: [VRAM vs RAM 2026: GPU Memory for AI Workloads | Servnet UK](https://www.servnetuk.com/learn/vram-vs-ram-gpu-memory-explained)
[3]: [www.spielemagazin.de · hardware · lexikonVRAM – Der Videospeicher für Spiele und Grafikkarten](https://www.spielemagazin.de/hardware/lexikon/vram-der-videospeicher-fuer-spiele-und-grafikkarten/22424)
[4]: [Unlocking AI Potential with High Bandwidth Memory (HBM) - LinkedIn](https://www.linkedin.com/posts/dr-dinesh-murugan_hbm-aihardware-semiconductors-activity-7421594786287099905-z0Je)
[5]: [Video random-access memory – Wikipedia](https://sv.wikipedia.org/wiki/Video_random-access_memory)
[6]: [Building Scalable AI Applications with Cloud GPUs & B300 Servers](https://cyfuture.com/blog/building-scalable-ai-applications-with-gpu-cloud-infrastructure/)
[7]: [Memòria d'accés aleatori de vídeo - Viquipèdia, l'enciclopèdia lliure](https://ca.wikipedia.org/wiki/Mem%C3%B2ria_d'acc%C3%A9s_aleatori_de_v%C3%ADdeo)
[8]: [What is VRAM? Video RAM Explained for Beginners & Gamers](https://pcbstore.com.bd/glossary/vram)
[9]: [DRAM (r66 판)](https://namu.wiki/w/DRAM?uuid=9f499a3b-8483-4c70-a6c6-41deed527467)
[10]: [www.kovaragrid.com › research › what-is-vramVRAM: GPU memory capacity, bandwidth and sizing | Kovara](https://www.kovaragrid.com/research/what-is-vram)
[11]: [From 32GB VRAM GPUs to 256GB Desktops: The New Local Mini AI Supercomputer Hardware Ladder](https://www.intelligentliving.co/local-mini-ai-supercomputer-hardware/)
[12]: [RAM vs. VRAM: Which Matters for AI Models? - NanoGPT](https://nano-gpt.com/blog/ram-vs-vram-which-matters-ai-models)
[13]: [RAMDAC — Graphics Hardware Codexery](https://codexery.com/graphics-hardware/e/graphics-hardware/ramdac/)
[14]: [GPU Sizing for LLMs (2026): VRAM, Hardware & TCO Guide](https://iternal.ai/hardware-sizing-guide)
[15]: [Video Graphics Array](https://www.encyclo.wiki/index.php/Video_Graphics_Array)
