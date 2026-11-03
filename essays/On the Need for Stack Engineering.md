---
date_created: 2024-09-27
date_modified: 2026-11-02
title: On the Need for Stack Engineering
lede: AI made code cheap. Nobody owns how all the tools fit together, and that is where the time goes now.
date_authored_initial_draft: 2024-09-27
date_authored_current_draft: 2026-11-02
at_semantic_version: 0.0.1.0
status: Draft
augmented_with: Claude Code on Claude Opus 5.5 (1M context)
category: Full-Body Commitments
image_prompt: An engineer standing inside a vast machine built from many mismatched tools, tightening the joints between them with a wrench while a glowing map of the whole system hangs overhead. The mood is practical, unglamorous and quietly heroic.
tags: [JAM-Stack, Developer-Experience, Developer-Tools, Management-Strategies]
authors:
  - Michael Staton
site_uuid: cbc0f581-79d6-4567-937d-50cae2ad0f4f
publish: true
slug: on-the-need-for-stack-engineering
---

Ask a company who owns its stack and you will usually get a pause, then a name, then a correction.

The backend lead owns the backend. Someone in IT owns the licenses. Finance owns the renewals. A designer picked the design tool, a marketer picked the CRM, and a developer connected them with a webhook one Friday and has since left the company. Every tool was a reasonable decision. Nobody decided on the whole.

That used to be survivable. It isn't anymore.

## AI Moved the Bottleneck

In [[lost-in-public/talks/How investors evaluate startups during the Gold Rush of AI|my talk on how investors evaluate startups]] I made a simple point: the challenge isn't using AI, it's all the other stuff. Good data. Empowered teams. Agreement on what the organization is even for.

Atlassian's 2025 developer survey of 3,500 developers and managers shows the shape of it. 68% of developers said AI saved them more than 10 hours a week. 50% said they lost more than 10 hours a week to non-coding inefficiencies. [^ycrcwq] Atlassian's own summary is that developers are right back where they started.

When writing code gets cheap, everything around the code becomes the constraint. Whether the tools talk to each other. Whether the data in one means the same thing in the next. Whether anybody can find out why something broke when the failure crosses three vendors.

Faster code generation also adds to the pile. Every generated project arrives with its own dependencies, its own services and its own opinions. [[essays/AI is first a Trojan Horse|AI is first a Trojan Horse]]: the demo is magic, and the reconfiguration comes afterward.

## What a Stack Engineer Actually Does

A [[concepts/Stack Engineering|Stack Engineer]] treats the stack itself as the thing being engineered. Not any one tool. The fit between them.

In practice that means owning a few unglamorous things:

- **The map.** A [[concepts/CARBS/Stack Maps|Stack Map]] shows what's in use, by whom, for what, who owns it and how to get access. Most organizations can't produce one, and you can't engineer what you can't see.
- **The compatibility decisions.** [[concepts/Stack Compatibility|Stack Compatibility]] is where a lot of productivity quietly comes from. Choosing tools that plug into the same market standards removes friction you would otherwise pay for on every project.
- **The defaults.** An [[concepts/Internal Standard Developer Stack|Internal Standard Developer Stack]] means a new project starts from a decision that's already been made, whether a person or a code generator starts it.
- **The seams.** When something fails between two systems, the logfiles are where the truth is, and they rarely live in one place. Someone has to know how to read across them, then fix the seam so it doesn't fail that way twice.
- **The subtractions.** Adding a tool takes a credit card. Removing one takes a person who knows what depends on it.

None of this is new work. It's been done badly, part time, by whoever cared most. There's a long tradition behind it: the [[concepts/Cognitive, Collaborative Tooling|tooling engineer]] in a factory designs the jigs and fixtures that make everyone else's work consistent. The difference now is that the factory is made of SaaS subscriptions, APIs and agents.

## The Job Title Is Coming

Here's my prediction: positions will be created to hire Stack Engineers instead of junior developers, though the people filling them will be roughly the same people.

That sounds like bad news for junior developers. I think it's the opposite. The old entry-level job was writing the straightforward code, which is exactly what got cheap. The new one is understanding how a real system hangs together, and that's the part that turns a junior developer into a senior one anyway.

This doesn't replace senior engineers. [[essays/Opinionated Engineering|Opinionated engineers]] still set the taste and make the hard architecture calls. A Stack Engineer is what makes those opinions hold across a company instead of inside one repo.

## Start Before the Title Exists

You don't need a new hire to begin. Three questions will tell you how much you need one:

1. Can you list every tool your team depends on, with an owner next to each one?
2. When a new project starts, is the stack decided or debated?
3. The last time something broke across two systems, how long did it take to find out where?

If those answers embarrass you, you already have a stack engineering problem. You just don't have anyone assigned to it yet.

***
### Citations

[^ycrcwq]: 2025. [Atlassian research: AI adoption is rising, but friction persists](https://www.atlassian.com/blog/bitbucket/developer-experience-report-2025). Atlassian.
