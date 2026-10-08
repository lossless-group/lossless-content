---
date_created: 2026-10-06
date_modified: 2026-10-08
site_uuid: af4c63f2-2744-41c3-aaba-476ab215b598
publish: true
title: Physics-Based Models
slug: physics-based-models
at_semantic_version: 0.0.0.1
tags:
  - Small-Models
  - Computing-Paradigms
cf_last_run: 2026-10-08T19:07:14.383Z
cf_last_run_model: Perplexity sonar-pro
---



[[Physical AI]]
[[content-areas/AI-Factories-Datacenters/Concepts/Datacenter Operations|Datacenter Operations]]
[[lost-in-public/market-maps/Datacenter Operations Systems|Datacenter Operations Systems]]

# Defining and Describing Physics-Based Models

- ![Schematic showing governing physical laws, system parameters, numerical solver, and predicted system behavior](https://ars.els-cdn.com/content/image/1-s2.0-S0166361514001821-gr8.jpg)

_Physics-based models turn knowledge of how the world works into equations that can predict how a system behaves._

A **physics-based model** is a mathematical or computational representation of a real physical system necessary for [[Physical AI]], built from governing principles such as conservation laws, constitutive relations, and differential equations. Scientific models are intended to explain or understand a target system or phenomenon and to represent patterns in the behavior of physical systems.[13] They are used when mechanistic understanding, extrapolation beyond observed data, safety, or interpretability matters.

Physics-based models may operate alone—for example, a computational fluid-dynamics simulation—or be combined with observations and machine learning. A related hybrid approach, the **physics-informed neural network**, incorporates governing physical laws into the learning process rather than relying only on data.[1][14]

```mermaid
flowchart LR
A["Physical system"] --> B["Governing laws"]
B --> C["Mathematical equations"]
C --> D["Numerical solver"]
D --> E["Predicted behavior"]
E --> F["Validation with observations"]
F --> B
```

# Uses in Context

- In engineering, “physics-based modeling” commonly describes simulations that predict system behavior from mechanics, thermodynamics, fluid dynamics, electromagnetism, or other established laws rather than from statistical correlations alone.[13]
- In scientific machine learning, “physics-informed” describes neural networks whose training is constrained by physical laws; this approach is used for forward simulation and inverse problems involving nonlinear partial differential equations.[1][4]
- In digital-twin research, physics-informed models are used to connect computational representations of engineered systems with sensor data and operational behavior.[2]
- In education, model-based reasoning treats a model as a representation of a real-world system designed to support explanation, understanding, prediction, or investigation.[13]
- In product and design work, the term can signal that a virtual prototype is intended to preserve physically meaningful relationships, rather than merely imitate observed outputs.[13]

# History of Use

## Origins

- The underlying practice predates the modern label: scientific modeling developed as a way to represent physical systems through theories, mathematical relationships, and idealizations. One account defines a scientific model as a conceptual system mapped onto the structure or behavior of physical systems so that it can reliably represent a relevant pattern and serve a purpose.[13]
- In computational science, physics-based modeling became associated with numerical solutions of governing equations, including partial differential equations used to represent fields, flows, structures, and other continuously varying systems.[4]
- The modern machine-learning expression **physics-informed neural networks** was introduced by Maziar Raissi, Paris Perdikaris, and George Em Karniadakis in a 2019 *Journal of Computational Physics* paper titled “Physics-informed neural networks: A deep learning framework for solving forward and inverse problems involving nonlinear partial differential equations.”[1][4]

## Evolution

- **Before the 2010s — equation-based simulation:** Physics-based models were primarily constructed from mechanistic equations and solved with numerical methods. Their principal strengths were interpretability and physical consistency, while their limitations included computational cost and dependence on accurate parameters and boundary conditions.[13]
- **2019 — physics-informed learning:** Raissi, Perdikaris, and Karniadakis formalized a neural-network framework that embeds physical laws into learning and applies it to forward and inverse nonlinear partial-differential-equation problems.[1][4]
- **2020s — hybrid models and digital twins:** Research increasingly combined physics-based representations with neural networks, sensor data, and digital-twin architectures. Recent literature describes physics-informed neural methods as a route for engineering digital twins and computational mechanics.[2][9]

# Best Real-World Examples

- [Physics-informed neural networks](https://doi.org/10.1016/j.jcp.2018.10.045) — neural networks constrained by governing equations for forward simulation and inverse discovery.[1][4]
- [Model-Based Reasoning in the Upper-Division Physics Laboratory](https://arxiv.org/abs/1410.0881) — an educational example of using models to explain, understand, and predict physical phenomena.[13]
- [Physics-informed digital twins](https://link.springer.com/) — hybrid engineering systems that combine physical models with neural networks and operational data.[2]
- [Physics-informed computational mechanics](https://link.springer.com/) — applications of physics-informed methods to mechanics problems involving fields, forces, and material behavior.[9]
- [Physics-driven convolutional operators](https://www.nature.com/) — research exploring neural architectures designed around physical structure rather than treating physics solely as an external training constraint.[11]
- [Physics-informed field reconstruction](https://link.springer.com/) — reconstruction of unobserved physical fields by combining measurements with physical constraints.[10]

# Case Studies

**Raissi, Perdikaris, and Karniadakis’s PINN framework.** In 2019, the three researchers proposed physics-informed neural networks as a deep-learning framework for solving forward and inverse problems governed by nonlinear partial differential equations.[1][4] The approach places physical residuals—how far a candidate neural-network solution deviates from the governing equations—inside the learning objective, allowing sparse observations and known laws to work together. The paper demonstrated applications involving classical problems in areas including fluid dynamics and quantum mechanics.[4] The case shows how a physics-based model can become a constraint or source of inductive bias inside a learned model, rather than existing only as a standalone simulator.

**Physics-informed [[Digital Twins]].** Recent digital-twin research applies physics-informed neural methods to engineering systems in which the computational model must remain connected to physical behavior and incoming operational data.[2] Such systems aim to combine the generalization and speed of learned surrogates with the structural discipline of governing equations. The case illustrates why physics-based models remain important even as machine learning becomes more prominent: they can supply constraints and interpretable relationships when measurements are sparse, noisy, or unavailable in every operating condition.[2][14]

**Model-based reasoning in physics education.** Research on upper-division physics laboratories frames scientific models as representations directed at explaining or understanding real-world systems, not merely as formulas for producing numerical answers.[13] Students use models to connect observations with theoretical structures and to test whether a representation captures the relevant behavior of a physical system.[13] This case demonstrates that physics-based modeling is also a reasoning practice: its value lies in selecting assumptions, identifying mechanisms, comparing predictions with evidence, and revising the model when it fails.


***

# Sources

[1]: [Electronics and information technologies / Електроніка та ...](https://publications.lnu.edu.ua/collections/index.php/electronics/article/view/4944)
[2]: [link.springer.com › article › 10Digital Twin Engineering with Physics-Informed Neural ...](https://link.springer.com/article/10.1007/s11831-026-10758-6?error=cookies_not_supported&code=f4e5b9b9-8d2c-4a8c-8f3a-62be0ed9b1e9)
[3]: [Physics-Informed Neural Networks for Solving Stochastic Differential ...](https://ejournal.yasin-alsys.org/mikailalsys/article/view/10240)
[4]: [Journal of Computational Physics: M. Raissi, P. Perdikaris ...](https://www.scribd.com/document/970580149/Physics-Informed-Neural-Networks-a-Deep-Learning-Framework-for-Solving-Forward-and-Inverse-Problems-Involving-Nonlinear-Partial-Differential-Equations)
[5]: [物理情報ニューラルネットワークの進化最適化：Evo-PINNの ...](https://www.alphaxiv.org/ja/abs/2501.06572)
[6]: [Physics-Informed Neural Networks (Raissi et al., 2019) ...](https://github.com/rescience/submissions/issues/103)
[7]: [A physics-based machine learning neural network approach ...](https://link.springer.com/article/10.1007/s40435-026-02206-x?error=cookies_not_supported&code=3385d593-de73-48b4-a871-881a06c6951a)
[8]: [Digital Twin Engineering with Physics-Informed Neural ...](https://link.springer.com/article/10.1007/s11831-026-10758-6?error=cookies_not_supported&code=54c2c915-7a32-464f-baed-c99ab409bb3b)
[9]: [Physics-Informed Neural Networks in Computational Mechanics ...](https://link.springer.com/article/10.1007/s11831-026-10747-9?error=cookies_not_supported&code=fa392ff8-9a5a-48ab-9d24-d7f4148d6036)
[10]: [Reconstruction of fields based on physics-informed neural networks ...](https://link.springer.com/article/10.1007/s10409-025-25195-x?error=cookies_not_supported&code=864ff9a4-6100-48d6-969e-7eedc9a59113)
[11]: [Attaining physics-driven convolutional operators by architecture design](https://www.nature.com/articles/s42005-026-02613-8)
[12]: [PHYSICS-INFORMED NEURAL NETWORK (PINN ...](https://vestnik.kbtu.edu.kz/jour/article/view/2290/0?locale=en_US)
[13]: [Model-Based Reasoning in the Upper-Division Physics Laboratory](https://arxiv.org/html/1410.0881v3)
[14]: [Data-Driven and Physics-Informed Neural Networks for ...](https://journal.ugm.ac.id/v3/JCEF/article/view/24173)
[15]: [物理信息驱动神经网络和神经算子的特征交互建模](https://www.alphaxiv.org/zh/abs/2607.28762)
