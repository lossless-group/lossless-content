---
date_created: 2025-01-03
date_modified: 2026-05-22
aliases:
  - Reduced Instruction Set Computing
  - RISC
site_uuid: a7f23526-1e73-479d-847b-5d87b323ffbd
publish: true
title: RISC V
slug: risc-v
at_semantic_version: 0.0.0.1
tags:
  - Open-Specifications
  - Open-Innovation
  - Hardware
---
[[Vocabulary/Computer Architecture|Computer Architecture]], [[concepts/Open Specifications|Open Specifications]], [[concepts/Emergent Innovation|Emergent Innovation]] [[concepts/Open Innovation|Open Innovation]]

https://youtu.be/8whPlw3FJ4A?si=hhusrcOJcmb4rYvX

Here's a good overview on [[YouTube]] of a laptop built on RISC-V: [RISC-V is here! Framework 13 news!](https://youtu.be/98OwCIpLgjw?si=MZa2KVnny44ogBO4) [[organizations/Framework|Framework]]

https://youtu.be/z-GoLDQHYsE?si=PdXnZR3KDtF2vLYO

[Why RISC-V matters](https://youtu.be/4TmHSsIU1ns?si=uPH2f1XsdYpCZWq5)


<iframe 
  style="aspect-ratio:16/9;width:100%;height:auto" 
  src="https://www.youtube.com/embed/1Y82U450zcI?si=wRIVjKRK-BDF13VZ" 
  title="YouTube video player" 
  frameborder="0" 
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
  referrerpolicy="strict-origin-when-cross-origin" 
  allowfullscreen
></iframe>
> 2024, July 10. [Linus Torvalds: RISC-V Repeating the Mistakes of Its Predecessors](https://youtu.be/1Y82U450zcI?si=wRIVjKRK-BDF13VZ). Mastery Learning. [^vag3c8]

https://youtube.com/playlist?list=PL2m2YvnrOYxIs_scO0Fcp9Kye6PdIstOU&si=mgUqTK2bu0pCfFNj



***
> [!info] **Perplexity Query** (2026-05-22T05:16:02.312Z)
> **Question:**
> What is RISC-V?  How is it transformational from the prior spec?  What kind of breakthroughs are we seeing in computing?  Why has adoption or release of RISC-V hardware been a bit slow?
> 
> **Model:** sonar-pro
> 

RISC‑V is an open, modular instruction set architecture (ISA) that anyone can use and implement without paying licensing fees or getting permission. [^1ug4dk] [^wk0nev] [^scnd50] It was originally developed at UC Berkeley around 2010 as the “fifth” generation of RISC designs from that group. [^1ug4dk] [^3cgsj8] [^rev7cq] [^20op0o] RISC‑V is now maintained as an open standard by RISC‑V International, a Swiss‑based standards body. [^g4to83] [^rev7cq] [^wk0nev]

![Relevant diagram or illustration related to the topic](https://cdn.xingosoftware.com/elektor/images/fetch/dpr_1,w_800,h_460,c_fit/https%3A%2F%2Fwww.elektormagazine.com%2Fassets%2Fupload%2Fimages%2F42%2F20210405185017_210223-001-94-ORIGINAL-BOOM-COreevolution.png)

---

## 1. What RISC‑V is (in plain terms)

An ISA is the “language” that software uses to talk to a CPU: which instructions exist, how they are encoded, how registers and memory are addressed, etc. [^3cgsj8] RISC‑V defines that language but does **not** define one particular chip; many different CPUs can implement the same ISA.

Key characteristics:

- **Open standard**: The spec is public; anyone can implement it free of charge. [^g4to83] [^wk0nev] [^scnd50]  
- **RISC‑style**: It follows reduced instruction set computer principles: relatively simple, fixed‑length instructions designed for efficient implementation. [^1ug4dk] [^3cgsj8] [^rev7cq] [^20op0o]  
- **Modular and extensible**: There’s a small mandatory base ISA (e.g., RV32I, RV64I) plus standard extensions (for integer multiply/divide, atomics, floating point, vector, etc.), and room for vendor‑specific extensions. [^3cgsj8] [^20op0o] [^scnd50]  

This combination of openness + modularity is what makes it different from x86 and Arm, which are closed, licensed ISAs. [^g4to83] [^rev7cq] [^n3ws11] [^wk0nev] [^scnd50]

---

## 2. How it’s transformational vs prior mainstream ISAs

### 2.1 Open vs closed

- **x86**: Only [[organizations/Intel|Intel]] and [[organizations/AMD|AMD]] can make full x86 CPUs; everyone else must license or use their chips. [^rev7cq]  
- **Arm**: Any company can license the ISA and buy CPU cores or design their own, but only under commercial license terms and export control. [^g4to83] [^rev7cq]  
- **RISC‑V**: Anyone can design, implement, and sell a RISC‑V CPU without paying ISA license fees or needing permission. [^g4to83] [^rev7cq] [^wk0nev] [^scnd50]

This open nature:

- Removes a long‑standing chokepoint (no single company or country controls the base ISA). [^g4to83] [^rev7cq]  
- Lowers barriers to entry for startups, universities, and smaller countries to build their own chips. [^rev7cq] [^wk0nev] [^scnd50]  
- Changes geopolitics: many policymakers worry it lets countries like China build advanced CPUs while bypassing some Western export‑control leverage that depended on proprietary IP. [^g4to83]

![Practical example or use case visualization](https://cdn-blog.adafruit.com/uploads/2019/08/risc-v.jpg)

### 2.2 Clean, modern, and modular spec

Compared with legacy ISAs:

- **Minimal base**: A very small core instruction set that’s easy to implement and formally reason about. [^1ug4dk] [^3cgsj8] [^20op0o]  
- **Standard extensions**: Integer multiply/divide (M), atomic ops (A), compressed instructions (C), floating point (F/D/Q), vector (V), hypervisor (H), etc., are separate, so you only implement what you need. [^3cgsj8] [^20op0o]  
- **Custom extensions**: Reserved opcode space for vendor‑specific instructions, without breaking compatibility with the base standard. [^3cgsj8] [^20op0o] [^scnd50]

This modularity is transformational because it lets you tailor CPUs tightly to a domain: microcontrollers, AI accelerators, HPC, storage, networking, etc., while still speaking a common “base” language.

### 2.3 Strong focus on formalization and long‑term stability

RISC‑V was designed with:

- Clean encoding and predictable behavior intended to ease verification and formal methods.  
- A governance model aiming for long‑term stability: once an extension is ratified, it’s intended to remain compatible. [^wk0nev] [^20op0o]

That makes it appealing to safety‑critical (automotive, aerospace) and long‑lifecycle industrial systems, where you want an ISA that will still be valid in 20+ years.

### 2.4 Ecosystem‑level transformation

The real “spec vs spec” transformation is less about any single instruction and more about who gets to participate:

- Open ISA standards support broader global collaboration—companies, universities, individuals can contribute designs, cores, and tools. [^rev7cq] [^wk0nev] [^scnd50]  
- It shifts innovation from “inside one company (Intel/Arm)” to “a shared ecosystem around a common open spec,” similar to what Linux did in operating systems.

![Additional supporting visual content](https://dfimg.dfrobot.com/enshop/image/cache3/Blog/13465/1.png)

---

## 3. What breakthroughs we’re seeing

RISC‑V itself doesn’t magically break physics, but the open ISA is enabling several important shifts.

### 3.1 Huge proliferation in embedded and microcontroller space

RISC‑V has already shipped in **billions** of cores, particularly in embedded and microcontroller markets. [^rev7cq] [^20op0o] Many MCU vendors now ship RISC‑V based controllers, often replacing Arm Cortex‑M in some product lines.

Impacts:

- Lower cost microcontrollers (no ISA royalties).  
- Easier for small teams to build custom SoCs with soft RISC‑V cores in FPGAs or ASICs.  
- Growing open‑source core ecosystem (e.g., small cores for IoT, sensors, controllers).

### 3.2 Domain‑specific and custom accelerators

Because you can add your own instructions without negotiating with a central ISA owner, we’re seeing:

- **AI/ML accelerators**: Custom vector or tensor instructions integrated into general‑purpose RISC‑V cores, or RISC‑V used as the control core next to specialized AI engines.  
- **Storage, networking, security**: Companies build tiny, tailored cores for controllers and offload engines, tuned to exactly the operations they need.  
- **Academic and startup innovation**: New architectural ideas can be implemented on RISC‑V without legal friction, accelerating research and commercialization.

This is where the “modular, extensible” nature becomes a genuine architectural advantage. [^3cgsj8] [^scnd50]

### 3.3 Vector and HPC developments

The RISC‑V vector extension (RVV) is designed as a scalable vector ISA, where vector length is not fixed in the ISA. [^20op0o] That:

- Allows one binary to scale across different vector widths (e.g., from edge to HPC) with the same code.  
- Aligns well with modern HPC and AI workloads, which are data‑parallel and benefit from flexible vectorization.

Several projects are exploring RISC‑V for supercomputing or large‑scale data centers, trying to pair open ISA with open software stacks.

### 3.4 Geopolitical and industrial “breakthrough”

From a policy and industry structure standpoint:

- RISC‑V is seen as a way for countries to reduce dependence on proprietary Western IP and potential export control leverage. [^g4to83]  
- There’s rapid investment in RISC‑V ecosystems in China, Europe, India, and elsewhere, with national‑level initiatives to build domestic CPU capability.

This isn’t a “computational breakthrough” in the technical sense, but it is a major shift in who can build and own CPU technology.

---

## 4. Why adoption of RISC‑V hardware at the high end feels slow

You already see broad usage in microcontrollers and embedded devices, but laptops, phones, and servers are slower to arrive. The reasons are mostly practical, not conceptual.

### 4.1 Incumbent lock‑in and ecosystem inertia

- **Software ecosystem**: x86 and Arm have decades of OS, compilers, libraries, applications, and proprietary toolchains. Porting and validating all of that to RISC‑V takes time.  
- **Binaries and legacy**: Enterprises depend on large bodies of closed‑source x86/Arm software; binary compatibility is a huge barrier to switching.  
- **Ecosystem support**: Full‑featured boards, firmware, drivers, and vendor support for RISC‑V are still maturing, especially for end‑user devices.

Even if RISC‑V is technically ready, hardware vendors won’t ship mass‑market PCs or phones until they’re confident software and support won’t frustrate users.

### 4.2 Performance and feature parity at the high end

- Building a **competitive, high‑performance out‑of‑order core with big caches, robust speculative execution, and advanced power management** is extremely expensive and takes years.  
- x86 and Arm high‑end cores have had decades of iteration; matching them requires a long investment cycle and deep engineering teams.  
- RISC‑V designs are catching up quickly, but many are just now reaching performance and power levels that make them viable for premium laptops and servers, and those must then go through design, tape‑out, and manufacturing cycles.

This is one reason analysts expect RISC‑V to become a credible competitor to Arm and x86 in some end‑user and server segments only over a span of a few years, not instantly. [^rev7cq]

### 4.3 Tooling, verification, and ecosystem maturity

- An ISA spec is just the start. You need production‑quality compilers (GCC/LLVM), debuggers, profilers, JITs (e.g., for Java, JavaScript), virt stacks, etc.  
- Much of this exists, but **industrial‑grade polishing and validation** takes time.  
- Large OEMs and cloud providers need extensive validation around reliability, security, and long‑term support before betting big on a new architecture.

### 4.4 Business model and risk

- OEMs already have stable relationships and roadmaps with Intel, AMD, and Arm ecosystem vendors. Moving to RISC‑V means supply‑chain and risk changes.  
- For phone makers or PC brands, a misstep (e.g., poor app compatibility or driver issues) can hurt brand reputation, so they are cautious.  
- Many companies are starting with RISC‑V in **lower‑risk domains** (controllers, IoT, internal accelerators), then gradually moving up the stack.

---

## 5. Summary

- **What is RISC‑V?** An open, modular RISC instruction set architecture that anyone can implement without license fees or permission, governed by RISC‑V International. [^1ug4dk] [^3cgsj8] [^g4to83] [^rev7cq] [^wk0nev] [^scnd50]  
- **How is it transformational?** It decouples CPU design from proprietary ISA ownership, enables wide collaboration, and allows highly customized yet compatible designs, changing both the technology and the power structure of the CPU industry.  
- **What breakthroughs are we seeing?** Rapid spread in embedded and microcontrollers, growth of custom/domain‑specific accelerators, scalable vector/HPC efforts, and significant geopolitical/industrial shifts as more actors can build their own CPUs. [^g4to83] [^rev7cq] [^20op0o] [^scnd50]  
- **Why does high‑end adoption seem slow?** Entrenched software ecosystems, the difficulty of matching mature x86/Arm performance and platform polish, and cautious business risk management all lengthen the timeline, even though the underlying ISA is solid and rapidly advancing. [^g4to83] [^rev7cq] [^20op0o]

If you’d like, I can next map out the current RISC‑V software stack (OS support, compilers, key projects) or compare RISC‑V, Arm, and x86 for a specific use case (e.g., edge AI, data center, or embedded).

# Sources
***
[^vag3c8]: 2024, July 10. [Linus Torvalds: RISC-V Repeating the Mistakes of Its Predecessors](https://youtu.be/1Y82U450zcI?si=wRIVjKRK-BDF13VZ). Mastery Learning.

[^7bh32q]: 2024, April 1. "[Transformers (how LLMs work) explained visually | DL5](https://youtu.be/wjZofJX0v4M?si=yPc-sl9j6Wp5V7RB)" 

[^9]: 2025, February 21. "[RISC-V was supposed to change everything—How's it going?](https://youtu.be/1565YYsFmd4?si=rnQ7GucS2F3RxkP9)"

[^1ug4dk]: 2026, May 21. [What is RISC-V? – How Does it Work? | Synopsys](https://www.synopsys.com/glossary/what-is-risc-v.html). Published: 2026-02-04 | Updated: 2026-05-22

[^3cgsj8]: 2026, May 16. [What Is RISC-V? - Wind River](https://www.windriver.com/solutions/learning/risc-v). Updated: 2026-05-17

[^g4to83]: 2026, May 20. [RISC-V: What it is and Why it Matters - CSET](https://cset.georgetown.edu/article/risc-v-what-it-is-and-why-it-matters/). Published: 2024-01-22 | Updated: 2026-05-21

[^rev7cq]: 2026, Feb 19. [Why RISC-V Matters - YouTube](https://www.youtube.com/watch?v=4TmHSsIU1ns). Published: 2025-01-26 | Updated: 2026-02-20

[^n3ws11]: 2023, Sep 07. [What is RISC-V, and why we're unlocking its potential | Qualcomm](https://www.qualcomm.com/news/onq/2023/09/what-is-risc-v-and-why-were-unlocking-its-potential). Published: 2023-09-08

[^wk0nev]: 2026, Apr 21. [Home - RISC-V International](https://riscv.org). Published: 2026-04-08 | Updated: 2026-04-22

[^20op0o]: 2026, May 20. [RISC-V - Wikipedia](https://en.wikipedia.org/wiki/RISC-V). Published: 2014-08-25 | Updated: 2026-05-21

[^scnd50]: 2026, May 20. [RISC-V Processors: The Comprehensive Guide (2026) - Stromasys](https://www.stromasys.com/resources/all-about-the-risc-v-processors/). Published: 2026-05-21 | Updated: 2026-05-21



***
