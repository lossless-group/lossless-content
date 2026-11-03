---
date_created: 2026-10-07
date_modified: 2026-10-07
title: The Craft Suite — AI-Built Rust Clones of Adobe and Microsoft Apps
slug: the-craft-suite-ai-built-rust-clones-of-adobe-and-microsoft-apps
tags: [AI-Generated-Code, Model-Context-Protocol, Agent-Infrastructure, Rust, Open-Source, Creative-Tools, Homebrew]
homepage: https://getartcraft.com/apps
github_repo_url: https://github.com/storytold
brew_page: https://formulae.brew.sh/cask/photocraft
install: brew install --cask photocraft
---

https://getartcraft.com/apps

## Why This Matters

In about five weeks, one GitHub organization published open-source Rust apps modeled on Photoshop, Premiere, Lightroom, Word, Excel and PowerPoint, among others. [Phoronix](https://www.phoronix.com/news/Photocraft-Filmcraft-AI) reported that they appear to rely predominantly on AI agents. The project's own label is "clean-room reimplementation."

The speed gets the headlines, but the design is more interesting: every app is meant to be driven by an agent. We haven't installed or run any of them.

## What Landed

The suite comes from `storytold`, the GitHub home of ArtCraft, an AI image and video studio. [OMG! Ubuntu](https://www.omgubuntu.co.uk/2026/10/artcraft-free-photoshop-ai-clone) names Brandon Thomas, formerly CEO of storyteller.ai, as project lead. The core repos date from September 30. Homebrew's first commits, as of November 3, 2026:

| Date | Package |
|---|---|
| Oct 6 | `photocraft` |
| Oct 8 | `artcraft`, `vectorcraft`, `filmcraft`, `lightcraft` |
| Oct 10 | `pdfcraft`, `wordcraft`, `designcraft`, `effectcraft`, `gridcraft`, `soundcraft`, `deckcraft`, `cadcraft` |
| Oct 12 to 14 | `photocraft-cli`, `pdfcraft-cli`, `figcraft` |
| Oct 18 to 23 | `artcraft-launcher`, `filmcraft-cli` |
| Nov 2 to 3 | `wordcraft-cli`, `gridcraft-cli`, `lightcraft-cli`, `vectorcraft-cli`, `designcraft-cli` |

Those are Homebrew commit dates, and merges can trail by a few days. PhotoCraft merged on October 7. Versions sit between 0.15 and 0.21. The [apps page](https://getartcraft.com/apps) now claims sixteen, adding TextureCraft, MaterialCraft and Craft Anything, which we didn't find as casks. PhotoCraft, PdfCraft, FigCraft and Craft Anything are marked "early alpha," the rest "in development." The READMEs we read offer MIT or Apache-2.0, excluding the ArtCraft brand, and the paid product is the separate ArtCraft studio.

## What's Novel: The Agent Surface

PhotoCraft's README says every menu item, tool and dialog runs a command from one registry. The UI, the CLI, a JSON control channel and an MCP server all call the same commands, "so anything you can click, a script or an AI agent can do too."

That differs from an agent moving a mouse over screenshots, or a plugin bolted onto a legacy app. The agent interface is the app's own command system.

[Jacar](https://jacar.es/en/artcraft-crafting-apps-open-source-rust/) tested this on October 13 and gives the best independent account we found. On Linux arm64, `photocraft-cli` 0.8.2 listed 892 commands and its [[A New Standard for Chaining AI Operations called Model Context Protocol|MCP]] server exposed 25 tools, while `pdfcraft-cli` 0.7.1 exposed 161. Calls like `doc_open`, `command_run` and `doc_export` worked, and flags limit which folders an agent can read and write. Those numbers are three weeks old.

## Read "Clean-Room" Carefully

Classically, clean-room work separates two groups: one studies the original and writes a specification, and another, who never saw the original, implements it. The separation and its paper trail are the point.

PhotoCraft's `AGENTS.md` says something narrower: "We studied Photoshop and other proprietary editors for *behaviour and look only*. Never copy their code, shaders, profiles or assets." It points to public specs, papers and observation. That's a sensible rule, but from what we read, the same instructions cover both studying the target and implementing against it. The repo also keeps a checklist of every Photoshop menu item and guidance on matching its look.

AI adds a question that a project rule can't settle. A model's training data isn't visible to the people directing it, so "the agent didn't look at the source" doesn't establish what it had already absorbed. Jacar notes that nobody outside has audited the claim. We have no evidence that any code was copied. The claim is simply a stated policy rather than a verified fact.

The label also has limits. It speaks to code, not to whatever rights attach to a product's look, and the suite advertises being "familiar by design." We aren't lawyers, and a limited search turned up no public statement from Adobe or Microsoft. Craft Anything stretches the term further, since it "studies the original" with inspection tools, has an agent build your own version of any website, app or game, and still calls itself a clean-room engine.

## Read the Stars Carefully

PhotoCraft had 76,549 stars and 13,557 forks on November 3. OMG! Ubuntu reported 17k around October 8, and Jacar counted 54,261 on October 13. That's extraordinary for early-alpha software.

We can't tell you how organic it is. GitHub's stargazer API returned nothing for us on any repo we tried, including unrelated controls, so we couldn't sample accounts or timing. Heavy press and a free Photoshop pitch could explain a lot, and we have no evidence of manipulation. Other signals show real activity: GitHub search finds about 5,600 pull requests and 2,600 open issues on the repo, though in a project like this some could be agent-driven. Treat the stars as a measure of attention, not quality or adoption.

## How Good Is It?

The project's own [parity document](https://github.com/storytold/photocraft/blob/main/docs/target-app-parity.md) is the most candid source. Its October 10 estimate for PhotoCraft 0.6.0 put feature breadth at about 76% and "ready for real work" at about 45%. It also calls an earlier figure "far too optimistic" and estimates 1,100 to 1,800 agent-hours to beta. The README says it's "not yet a Photoshop replacement for daily professional work."

Testers split accordingly. OMG! Ubuntu, trying 0.3.0, thought it came closer in UI and UX than earlier GIMP makeovers. A [Hacker News thread](https://news.ycombinator.com/item?id=49958850), flagged at 180 points, has commenters calling it "very broken." Jacar's headless CLI and MCP runs worked but hit alpha problems, including a blank WebGPU canvas without a GPU. All of that can be true at once: a headless pipeline can work while a painter's brush doesn't.

## Where It Fits in Our Workflow

Not as a replacement for anything. The bounded possibility is headless: `pdfcraft-cli` around source decks for `remake-deck`, or `photocraft-cli batch` alongside `prep-images-for-embed` and `generate-consistent-og-images`, the second of which uses `sips` today. If we try that, we'd pin a version, since these change almost daily, and use the folder limits. 

The lasting lesson is about the registry. Making one command list drive both the UI and the agent is a pattern we could weigh for surfaces like `augment-it`'s apps, without trusting a single line of this suite.

Sources: <https://getartcraft.com/apps> · <https://github.com/storytold/photocraft>
