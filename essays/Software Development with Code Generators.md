---
date_created: 2025-01-24
date_modified: 2025-10-14
site_uuid: 0cd90519-55d0-4380-b7b9-d416ff0cb24a
title: Software Development with Code Generators
lede: Code generators are reshaping software development—speeding up delivery while raising new challenges.
date_authored_initial_draft: 2025-01-24
date_authored_current_draft: 2025-04-24
at_semantic_version: 0.0.0.1
status: To-Do
augmented_with: Perplexity AI
category: Best Practices
portrait_image: https://ik.imagekit.io/xvpgfijuw/uploads/lossless/essays/2025-05-04_portraitimage_Software-Development-with-Code-Generators_1634a98f-dcc0-4eef-98b7-e6dd72857344_A3fxcJLs1.jpg
image_prompt: A home is being carefully constructed by bricklayers. Dash from 'The Incredibles' and Flash from the DC Comics franchise are running through the scene, and bricks are flying.
banner_image: https://ik.imagekit.io/xvpgfijuw/uploads/lossless/essays/2025-05-04_bannerimage_Software-Development-with-Code-Generators_7a6137af-e28c-4296-a8d0-a798ed08f58e_-Gkxu5jxw.jpg
tags: [State-Of-The-Art-Practices, Vibe-Coding-Practices, Near-Future-Anticipation]
authors:
  - Michael Staton
publish: true
---
For code generation, in addition to the [[Large Language Models]], or perhaps the [[Model Wrappers]], include [[AppGen]], [[Cursor]], [[AgentFarm]], [[Aider]]. 

[[Acceptance Testing]] with [[Tooling/Software Development/Frameworks/Vitest|Vitest]]



# Limitations of AI Code Assistants and Code Generator AI
***
> [!info] **Perplexity Query** (2025-10-12T19:46:10.518Z)
> **Question:**
> What are some limitations of working with AI Code Assistants?  Why have some professional engineers given up on Vibe Coding?  What is being done about this?
> 
> **Model:** sonar-pro
> 

**AI code assistants have notable limitations: they struggle with contextual understanding, code quality, creativity, handling edge cases, collaboration, and pose security and compliance risks. [^ucph8r] [^9f363s] [^17262x] [^8hy165] [^vk4uhi]** 

Some professional engineers have abandoned "Vibe Coding" due to increased review complexity, higher risk for bugs and vulnerabilities, and frustration with AI choices lacking domain expertise or design sense. [^vk4uhi] [^7rrgpy] Developers and toolmakers are responding by refining AI workflows, focusing on human-in-the-loop practices, improving context feeding, and integrating stronger safeguards for code quality and privacy. [^17262x] [^8hy165] [^vk4uhi]

---

### Key Limitations of AI Code Assistants

**![Relevant diagram or illustration related to the topic](https://allthingsopen.org/wp-content/uploads/2025/02/limitations.png)**
*A diagram depicting key limitation categories: Context, Creativity, Complexity, Security, Collaboration, and Compliance.*

- **Poor Contextual Awareness**: AI models excel at pattern recognition and syntax, but miss deeper project or business rules—leading to code that "looks right" but misses the real requirements. [^ucph8r] [^9f363s] [^17262x] [^8hy165]
- **Training Data Issues**: Their knowledge comes from public codebases, so they may suggest outdated methods, insecure practices, or infringe on licenses unless carefully audited. [^ucph8r] [^9f363s] [^vk4uhi]
- **Limited Creativity and Design Thinking**: AI can't innovate or strategize; for open-ended tasks or complex algorithm design, its suggestions lack originality and critical insight. [^ucph8r] [^9f363s] [^8hy165]
- **Handling Edge Cases**: Rare scenarios, multi-step error handling, and intricate algorithms often stump AI, resulting in incorrect or suboptimal code that requires manual correction. [^9f363s]
- **Collaboration Breakdown**: AI-generated code discourages peer learning and team discussion, sometimes causing confusion about intent or logic. [^ucph8r]
- **Increased Dependency Risks**: Overreliance can erode skills and discourage developers from deeply engaging with the codebase. [^ucph8r]
- **Security and Compliance**: AI-generated code has been shown to leak secrets, bypass reviews, and increase critical vulnerabilities, with additional risks when handling sensitive data and compliance mandates. [^vk4uhi]

---

### Why Some Engineers Are Giving Up on Vibe Coding

**![Practical example or use case visualization](https://allthingsopen.org/wp-content/uploads/2025/02/ai_changes_software-dev.jpg)**
*A split image: professional engineers reviewing an AI-generated pull request filled with questionable code, side-by-side with increased security flags and reviewer comments.*

- **Review Overload**: Apiiro's 2024 research found pull requests with AI code required 60% more review comments—especially on security issues—creating review fatigue and slowing delivery. [^vk4uhi]
- **Higher Vulnerability Rates**: Projects using AI assistants saw a 2.5x increase in critical vulnerabilities, faster code merges (often bypassing human checks), and a 40% jump in secrets exposure. [^vk4uhi]
- **Productivity Paradox**: Contrary to claims, recent studies show experienced developers took about 19% longer to finish issues when using AI tools—the time lost to fixing, checking, or refactoring AI-generated code often outweighs purported efficiency gains. [^7rrgpy]
- **Decreased Trust and Frustration**: Engineers reported frustration with superficial tests, hallucinated logic (code that "compiles but collapses in production"), and AI failing to respect proprietary conventions or nuanced requirements. [^17262x] [^8hy165] [^7rrgpy]

---

### Ongoing Responses and Mitigation Strategies

**![Additional supporting visual content](https://allthingsopen.org/wp-content/uploads/2025/02/market-growth.png)**
*A flowchart showing improved human-in-the-loop code workflows, robust context feeding, integrated security scan, and manual code review checkpoints.*

- **Enhanced Context Feeding**: Teams are developing practices to give AI assistants more explicit instruction and business context, so outputs fit real requirements rather than generic templates. [^17262x] [^8hy165]
- **Human-in-the-Loop Review**: Critical code is subjected to deeper manual review, particularly for security, compliance, and architecture decisions. [^17262x] [^vk4uhi]
- **Tool Improvements**: Vendors are building better feedback loops, transparency features (allowing the AI to indicate confidence or request confirmation), and improved static analysis integration to catch hallucinations and vulnerabilities earlier. [^17262x]
- **Security-First Defaults**: Organizations are closing AI integration gaps by masking secrets, enforcing compliance, and running security scanners on all AI-generated code before deployment. [^vk4uhi]
- **Workforce Development**: There is renewed emphasis on retaining manual coding skills and fostering collaborative environments where AI is a support—never a replacement—for real engineering insight. [^ucph8r] [^8hy165]

---

**In summary, while AI code assistants offer advantages for routine tasks, their current limitations have led some professionals to step back from "Vibe Coding"—and the response has been a shift to smarter, safer, human-centered development workflows.**

### Citations

[^ucph8r]: 2025, Oct 12. [6 limitations of AI code assistants and why developers should be ...](https://allthingsopen.org/articles/ai-code-assistants-limitations). Published: 2025-02-19 | Updated: 2025-10-12

[^9f363s]: 2025, Oct 09. [Limitations of AI Coding Assistants: What You Need to Know](https://zencoder.ai/blog/limitations-of-ai-coding-assistants). Published: 2025-09-22 | Updated: 2025-10-09

[^17262x]: 2025, Oct 12. [Can AI really code? Study maps the roadblocks to ... - MIT News](https://news.mit.edu/2025/can-ai-really-code-study-maps-roadblocks-to-autonomous-software-engineering-0716). Published: 2025-07-16 | Updated: 2025-10-12

[^8hy165]: 2025, Oct 12. [Why Your AI Coding Assistant Keeps Doing It Wrong, and How To ...](https://blog.thepete.net/blog/2025/05/22/why-your-ai-coding-assistant-keeps-doing-it-wrong-and-how-to-fix-it/). Published: 2025-05-22 | Updated: 2025-10-12

[^vk4uhi]: 2025, Oct 12. [The Productivity Paradox of AI Coding Assistants | Cerbos](https://www.cerbos.dev/blog/productivity-paradox-of-ai-coding-assistants). Published: 2025-09-12 | Updated: 2025-10-12

[^7rrgpy]: 2025, Oct 12. [Measuring the Impact of Early-2025 AI on Experienced ... - METR](https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/). Published: 2025-07-10 | Updated: 2025-10-12

[^a7gd38]: 2025, Oct 11. [The Essential Guide to AI Coding: What Actually Works in 2025](https://www.openarc.net/the-essential-guide-to-ai-coding-what-actually-works-in-2025/). Published: 2025-04-10 | Updated: 2025-10-11

[8]: 2025, Oct 12. [Test Drive Before You Buy: Your Guide to AI Code Assistant Trials in ...](https://dev.to/bekahhw/test-drive-before-you-buy-your-guide-to-ai-code-assistant-trials-in-2025-14pk). Published: 2025-06-23 | Updated: 2025-10-12



***
