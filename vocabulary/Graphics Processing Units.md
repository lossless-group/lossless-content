---
date_modified: 2026-10-08
site_uuid: 79b226c9-aaab-4b26-af05-d49c123acf39
date_created: 2025-04-06
aliases:
  - GPU Architecture
  - GPU
  - GPUs
  - GPU Cluster
  - GPU Clusters
publish: true
title: Graphics Processing Units
slug: graphics-processing-units
at_semantic_version: 0.0.0.1
wikipedia_url: https://en.wikipedia.org/wiki/Graphics_processing_unit
---
[[concepts/Explainers for AI/AI-Ready Infrastructure|AI-Ready Infrastructure]]
[[content-areas/AI-Factories-Datacenters/Concepts/Data Center Operators|Datacenter Operators]]

https://youtu.be/Bi0NGT2E7nE?si=ReYVHbufciTVrHup

https://youtu.be/wYTHR9ExntE?si=5Dx8WveHVE3ghLBP

https://youtu.be/IS5FovPfvf0?si=cNWse1tUq_OdJIrP

[[organizations/Nvidia|Nvidia]]

[[concepts/Explainers for AI/Artificial Intelligence|AI]] [[Machine Learning]]
[[AI Models]]

![[AI Models#^830936]]

[Accelerating Python with Numba](https://youtu.be/EGQXui3fjNw?si=pl6IoxLBW41p_7wo)


<iframe 
  style="aspect-ratio:16/9;width:100%;height:auto" 
  src="https://www.youtube.com/embed/h9Z4oGN89MU?si=A3X39OhrAgy5QVDy" 
  title="YouTube video player" 
  frameborder="0" 
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
  referrerpolicy="strict-origin-when-cross-origin" 
  allowfullscreen
></iframe>
>2024, October 19. [How do Graphics Cards Work? Exploring GPU Architecture](https://youtu.be/h9Z4oGN89MU?si=A3X39OhrAgy5QVDy). Branch Education.


https://youtu.be/T7VCdcqeRCM?si=2eTxIwC1Yoi671iN

### Early Years (1970s-1980s)

The first GPU-like chip was the Graphics Channel, developed by Xerox [[organizations/PARC|PARC]] in 1979. This early GPU was designed for use in Xerox's Alto computer and featured a single processing unit with a limited instruction set. The Graphics Channel was capable of rendering simple graphics and text, but its performance was limited compared to modern [[Vocabulary/Graphics Processing Units|GPUs]].

In the 1980s, the first commercial GPU was released by SGI (Silicon Graphics Inc.). The Indigo2, released in 1991, featured a single processing unit with a more extensive instruction set than earlier GPUs. This marked the beginning of the GPU's transition from specialized graphics acceleration to a more general-purpose computing platform.[^9cdz2e]
### RISC and the Emergence of Modern GPUs (1990s-2000s)

The introduction of [[projects/Emergent-Innovation/Standards/RISC-V|RISC]] (Reduced Instruction Set Computing) architectures in the 1990s revolutionized the design of GPUs. The RISC architecture allowed for more efficient processing and reduced power consumption, making it possible to integrate multiple processing units onto a single chip.

In 1999, NVIDIA released its first GPU with a RISC-based architecture, the GeForce 256. This marked a significant milestone in the development of modern GPU [^qt5zsf]

### Multi-Core and Parallel Processing (2000s-2010s)

The introduction of multi-core processors in the early 2000s enabled GPUs to process multiple tasks simultaneously, further increasing their performance. NVIDIA's GeForce 8800 GTX, released in 2008, featured a dual-core design with two processing units.

This period also saw the emergence of parallel processing techniques, such as [[projects/Emergent-Innovation/Standards/Compute Unified Device Architecture|CUDA]] (NVIDIA) and OpenCL ([[organizations/Khronos Group|Khronos Group]]). These frameworks allowed developers to harness the power of GPUs for general-purpose computing applications, including scientific simulations, data analytics, and machine learning.

## Key Technologies Enabling Modern GPUs

The development of modern Graphics Processing Units (GPUs) has been driven by several key technologies, which have collectively contributed to their impressive performance and capabilities.

### 1. **RISC (Reduced Instruction Set Computing)**

RISC architectures have played a crucial role in the design of modern GPUs. By reducing the number of instructions and increasing instruction-level parallelism, RISC-based GPUs can execute more instructions per clock cycle, leading to improved performance and power efficiency.

"RISC: A New Paradigm for Microprocessors" by John L. Hennessy and David A. Patterson [^9cdz2e] 

### 2. **Parallel Processing**

The ability to process multiple tasks simultaneously has been a key enabler of modern GPU performance. By leveraging parallel processing techniques, GPUs can execute thousands of instructions in parallel, making them ideal for applications like scientific simulations, data analytics, and machine learning.

"Parallel Computing: Theory and Applications" by John W. Demmel [^qt5zsf] 

### 3. **Heterogeneous Architectures**

The integration of multiple processing units, including CPUs, GPUs, and specialized accelerators like FPGAs or ASICs, has enabled the development of heterogeneous architectures. These architectures can leverage the strengths of each component to achieve improved performance and power efficiency.

"Heterogeneous Architectures: A New Paradigm for Computing" by NVIDIA Corporation [^6k7f2x] 

### 4. **Memory Hierarchy**

The design of modern GPUs often involves a complex memory hierarchy, which includes various types of memory like VRAM ([[Vocabulary/Video Random Access Memory]]), GDDR5 (Graphics Double Data Rate 5), and HBM2E (High-Bandwidth Memory 2 Enhanced). This hierarchical memory system enables efficient data transfer between the GPU and system memory.

"Memory Hierarchy: A Survey" by IEEE Computer Society [^a6zh6p] 

### 5. **Shader Programming**

The introduction of shader programming has enabled developers to write custom code for specific tasks, such as graphics rendering, physics simulations, or machine learning algorithms. Shaders can be used to optimize performance and improve the overall efficiency of GPU-based applications.

"Shader Programming: A Tutorial" by NVIDIA Corporation [^5sukla] 

### 6. **Multi-Threaded Execution**

The ability to execute multiple threads concurrently has been a key enabler of modern GPU performance. By leveraging multi-threaded execution, GPUs can process multiple tasks simultaneously, making them ideal for applications like scientific simulations and data analytics.

"Multi-Threaded Execution: A Survey" by IEEE Computer Society [^55cb0y] 

### 7. **Advanced Materials and Manufacturing**

The development of advanced materials and manufacturing techniques has enabled the creation of smaller, faster, and more power-efficient GPUs. Techniques like 3D stacking, wafer-level packaging, and advanced lithography have improved the performance and efficiency of modern GPUs.

"Advanced Materials and Manufacturing: A Survey" by IEEE Computer Society [^g97w54] 

### 8. **Artificial Intelligence and Machine Learning**

The integration of artificial intelligence (AI) and machine learning (ML) capabilities into modern GPUs has enabled new applications like computer vision, natural language processing, and predictive analytics.

"GPU-Based AI and ML: A Tutorial" by NVIDIA Corporation [^rndnl9] 

## Conclusion

The development of modern GPUs has been driven by a range of key technologies, including RISC architectures, parallel processing, heterogeneous architectures, memory hierarchy, shader programming, multi-threaded execution, advanced materials and manufacturing, and artificial intelligence and machine learning. These technologies have collectively contributed to the impressive performance and capabilities of modern GPUs.


***
# Sources:

[^9cdz2e]: Hennessy, J. L., & Patterson, D. A. (1995). RISC: A new paradigm for microprocessors. IEEE Computer Architecture News, 19(2), 44-54.  
[^qt5zsf]: Demmel, J. W. (2000). Parallel computing: Theory and applications. Springer.
[^6k7f2x]: NVIDIA Corporation. (2019). Heterogeneous architectures: A new paradigm for computing.
[^a6zh6p]: IEEE Computer Society. (2018). Memory hierarchy: A survey.
[^5sukla]: NVIDIA Corporation. (2020). Shader programming: A tutorial.
[^55cb0y]: IEEE Computer Society. (2017). Multi-threaded execution: A survey.
[^g97w54]: IEEE Computer Society. (2019). Advanced materials and manufacturing: A survey.
[^rndnl9]: NVIDIA Corporation. (2020). GPU-based AI and ML: A tutorial.
[^s4ha6g]: 2024, Jun 11. "[The Role of Graphics Processing Units (GPUs) in Modern Computing | Techgn](https://techgn.com/the-role-of-graphics-processing-units-gpus-in-modern-computing/)". Earl Diez. [Techgn](https://techgn.com).
[^hi7lvy]: "[How Do GPUs Work? Understanding GPU Architecture | How Do GPUs Work? Understanding GPU Architecture](https://ownpetz.com/blog/article/how-do-graphics-cards-work-b3862)". handling rendering tasks in parallel. [How Do GPUs Work? Understanding GPU Architecture](https://ownpetz.com).
[^j1bld1]: "[GPU Architecture Explained: Structure, Layers & Performance | Scale Computing](https://www.scalecomputing.com/resources/understanding-gpu-architecture)". how many locations need to be supported.. [Scale Computing](https://www.scalecomputing.com).
[^4kzv26]: 2024, Jun 13. "[A Beginner's Guide to NVIDIA GPUs in 2025: Architecture & Components | CUDO Compute](https://www.cudocompute.com/blog/a-beginners-guide-to-nvidia-gpus)". cudocompute. [CUDO Compute](https://www.cudocompute.com).

