---
date_created: 2025-04-20
date_modified: 2026-11-02
site_uuid: ed6eb7d8-ea07-4ff4-9907-e0f132746aa6
publish: true
title: Why Vertical Wrappers Have Better Odds For Investors
at_semantic_version: 0.0.1.0
slug: why-vertical-wrappers-have-better-odds-for-investors
image_prompt: A man and a robot (representing AI) are standing beyond the door to a tornado shelter that's underground, the door is a hatch coming out of the ground at an angle. It's an image similar to the Wizard of Oz. The storm shelter has two swinging doors, and one door is shut. Someone is holding the other door open.  All three are looking at a giant storm coming, with many tornadoes touching down.
banner_image: https://ik.imagekit.io/xvpgfijuw/uploads/lossless/july/Venture_Investing_in_the_Gold_Rush_of_AI_banner_image_1753051394047_lv-lOjqfC.webp
portrait_image: https://ik.imagekit.io/xvpgfijuw/uploads/lossless/july/Venture_Investing_in_the_Gold_Rush_of_AI_portrait_image_1753051396444__7lmo3iCs.webp
square_image: https://ik.imagekit.io/xvpgfijuw/uploads/lossless/july/Venture_Investing_in_the_Gold_Rush_of_AI_square_image_1753051398446_xfkQIKS0I.webp
lede: Models keep getting cheaper and easier to swap. That makes the products built on top the better bet for most investors.
category: Near-Future-Anticipation
tags: [Vertical-Wrappers, Investment-Categories, AI-Models]
date_authored_initial_draft: 2025-04-20
authors:
  - Michael Staton
date_authored_current_draft: 2026-11-02
status: Draft
augmented_with: Claude Code on Claude Opus 5.5 (1M context)
---

[[essays/The AI Model Wars|The AI Model Wars]] have created an immensely competitive field of organizations training models.  If you use a [[concepts/Explainers for AI/Model API|Model API]] in a project, you will start to notice that the model itself is very fungible, there is almost no switching cost.

That's a wonderful thing if you're building a product, and a terrifying thing if you funded a model.

Think of the picture at the top of this essay. The tornadoes are the model wars: mindbending sums of money, leadership panics and new contenders touching down every few months. A [[concepts/Explainers for Tooling/Vertical Wrappers|Vertical Wrapper]] is the storm shelter. It's a product built around one customer's specific work, in one industry or job, using whichever model is best this month. As the storm rages, the people inside keep getting better tools for free.

I said this in [[lost-in-public/talks/How investors evaluate startups during the Gold Rush of AI|my talk on how investors evaluate startups]]: long-term value capture will go to the Vertical Wrappers. Here's why I think the odds favor them, and where I could be wrong.

## The Model Layer Is Getting Cheaper for Everyone Else

Stanford's 2025 AI Index found that the inference cost of a system performing at GPT-3.5's level fell more than 280-fold between November 2022 and October 2024. [^yb26us] That's brutal if you sell intelligence by the token. For someone who buys tokens and sells an outcome, it's a falling cost of goods.

A wrapper also gets to treat the model as a replaceable part. [[Tooling/AI-Toolkit/AI Interfaces/AI Workspaces/Vertical Wrappers/Harvey AI|Harvey]] may be the best illustration. According to Sacra, it dropped its own custom legal model after frontier reasoning models began outperforming it on Harvey's own benchmark. [^5rz3xz] It moved to a multi-model strategy across OpenAI, Anthropic and Google. [^ksfy5x] When a better model shows up, Harvey's customers get an upgrade. They don't have to replace anything.

## What Better Odds Actually Means

I'm not saying no one will make money on models. The biggest winners there have been enormous. By early 2026, OpenAI and Anthropic were together valued at more than $1 trillion. [^mj9x22]

But odds are about what's available to the investor in front of you, and from that seat the math favors wrappers:

- **The entry price.** Most investors can't get into a frontier lab's round, and at those valuations they would need another miracle to get venture returns. A wrapper can be funded at a price where the outcome still matters to the fund.
- **The number of shots.** A frontier lab takes billions to find out whether it works. The same capital can back many wrappers, and each one finds out from paying customers quickly. The toolkit on this site already tracks about 60 products in this category, including [[Tooling/AI-Toolkit/AI Interfaces/AI Workspaces/Vertical Wrappers/Granola|Granola]] and [[Tooling/AI-Toolkit/AI Interfaces/AI Workspaces/Vertical Wrappers/Jasper|Jasper]].
- **The direction of demand.** Menlo Ventures estimates that of the $37 billion enterprises spent on generative AI in 2025, $19 billion went to applications, and 76% of AI solutions were bought rather than built. [^wod97h] Menlo is an active AI investor, so read that with appropriate salt. Note too that the strictly vertical slice was still $3.5 billion. It's early, and that's the opportunity.
- **The size of the outcome.** Harvey's CEO said it reached $190 million in ARR by the end of 2025, and the company announced a $15.5 billion valuation in September 2026. [^5rz3xz] [^la8110] "Just a wrapper" is no longer a dismissal. It's a category with its own giants.

## Not All Shelters Hold

The word "wrapper" began as an insult, and for plenty of products it's still deserved. A nice interface on top of an API is not a storm shelter. It's a tent.

What separates the two is mostly what remains when you take the model away:

- **Workflow depth.** Does the product do the customer's job from start to finish, or does it answer questions about the job?
- **Integrations.** Is it wired into the systems where the work already lives?
- **Domain trust.** Has it earned the security reviews, compliance sign-offs and reputation that a regulated buyer demands?
- **Learning from use.** The art of [[concepts/Explainers for AI/Fine Tuning|Fine Tuning]] and retrieval against proprietary context can compound. A generic model can't start where a customer's data has already taken you.
- **Model indifference.** If a better model launches tomorrow, is that good news for this company? It should be the best news of the month.

If a founder can't get through that list, the company is one model feature away from being a footnote.

## How I Could Be Wrong

The real threat isn't that wrappers fail to find customers. It's that the labs come down the stack and take them.

This is already happening. In April 2026, Freshfields signed a multi-year direct partnership with Anthropic, deploying Claude across 5,700 employees and co-developing legal applications. Writers at Harvard's Center on the Legal Profession called it the first Magic Circle firm to choose a foundation-model partner over a vertical legal-AI vendor at scale. Their conclusion is hard to dismiss: for firms that can do their own AI engineering, the intermediary is increasingly optional. [^ksfy5x]

I take that seriously. So a good question to ask is who the customer really is. A firm with thousands of people and an engineering budget can go direct. The much longer tail of mid-market companies and specialist practices can't, and they don't want to. They want the problem solved.

The storm isn't going to pass any time soon. I'd still rather be holding the shelter door than chasing the tornado.

***
### Citations

[^yb26us]: 2025. [The 2025 AI Index Report](https://hai.stanford.edu/ai-index/2025-ai-index-report). Stanford HAI.
[^5rz3xz]: [Harvey revenue, valuation & funding](https://sacra.com/c/harvey/). Sacra. Accessed 2026-11-02.
[^ksfy5x]: 2026, Mar. Updated May 2026. [Harvey's strategic evolution](https://clp.law.harvard.edu/ai-and-the-legal-profession/essays/harveys-strategic-evolution.html). AI & the Legal Profession, Harvard Law School Center on the Legal Profession.
[^mj9x22]: 2026, Mar 25. [Legal AI startup Harvey raises $200 million at $11 billion valuation](https://www.cnbc.com/2026/03/25/legal-ai-startup-harvey-raises-200-million-at-11-billion-valuation.html). CNBC.
[^wod97h]: 2025, Dec 9. [2025: The State of Generative AI in the Enterprise](https://menlovc.com/perspective/2025-the-state-of-generative-ai-in-the-enterprise/). Menlo Ventures.
[^la8110]: 2026, Sep 9. [Harvey Raises $550M at a $15.5B Valuation to Help Legal Teams Own Their Intelligence](https://www.harvey.ai/blog/harvey-raises-dollar550m-at-a-dollar155b-valuation-to-help-legal-teams-own-their-intelligence). Harvey.
