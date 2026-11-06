---
date_created: 2026-11-06
date_modified: 2026-11-06
title: Perplexity Sonar Pro Images, Deprecated Without an Error
slug: perplexity-sonar-pro-images-deprecated
tags: [Perplexity, API-Changes, Deprecation, Image-Search, Obsidian-Plugins, Perplexed]
homepage: https://docs.perplexity.ai/docs/agent-api/migrate-from-sonar/overview
---

https://docs.perplexity.ai/docs/agent-api/migrate-from-sonar/overview

## Why This Matters

For as long as [[organizations/Perplexity AI|Perplexity]] has had an API, you could add `return_images: true` to a Sonar request and get an `images` array back next to the answer. Our [[client-content/Obsidian-Plugin-Community/Perplexed-(Obsidian-Community-Plugin)|Perplexed]] plugin was built on that: the model writes `[IMAGE 1: …]` markers into its prose, and the plugin swaps each marker for a real image from the array.

That stopped working, and nothing told us. Requests still return 200 and the text and citations still arrive. The `images` field is simply gone.

## What Changed

Perplexity is replacing Sonar Chat Completions with a new **Agent API**. The [migration guide](https://docs.perplexity.ai/docs/agent-api/migrate-from-sonar/overview) puts it plainly:

> "Sonar Chat Completions support ended on September 27, 2026. Synchronous and streaming requests keep working: they are being reformulated as Agent API requests, rolling out gradually by model. Asynchronous Sonar requests are not reformulated and are no longer supported; move them to background mode."

So old requests aren't rejected. Perplexity quietly converts them into Agent API requests. Any Sonar parameter without an Agent API equivalent gets lost in the conversion, and `return_images` is one of them. The [how-to page](https://docs.perplexity.ai/docs/agent-api/migrate-from-sonar/how-to) maps it to a new tool:

> "`return_images` — Add the `image_search` tool. The model decides when to call it unless you set `tool_choice: {"type": "image_search"}`."

We confirmed it on November 5, 2026. A paid key sent `return_images: true` to both `sonar` and `sonar-pro`, with prompts as image-friendly as "Show me photos of the Eiffel Tower". Every response came back with `choices`, `citations`, and `search_results`, and with no `images` field at all. That isn't an empty array. The field isn't there, which is why it took a while to notice.

The changelog has no entry naming `return_images` or the September 27 date. A July 2026 entry says only "Sonar Chat Completions is now Agent API."

## Images Still Exist, as a Separate Tool

Perplexity hasn't dropped images. They moved to a tool, [`image_search`](https://docs.perplexity.ai/docs/agent-api/tools/image-search), which launched in October 2026:

```json
{
  "effort": "fast",
  "input": "Matroid computer vision platform (matroid.com) product screenshots",
  "tools": [{ "type": "image_search", "max_results": 4 }],
  "tool_choice": { "type": "image_search" }
}
```

Results come back as an `image_search_results` item in `output`, where each entry has `image_url`, `origin_url`, `width`, `height`, and an optional `title`. Two changes matter:

- **The model decides.** Our first test listed `web_search` and `image_search` together and got no images: the model answered from web search alone. Only forcing the tool with `tool_choice` returned four product images from matroid.com.
- **It's billed per call**, at "$2.50 per 1,000 tool invocations."

The rest of the old parameters map over as well: `num_images` becomes `max_results`, `image_domain_filter` becomes `filters.domain_filter`, and `image_format_filter` becomes `filters.format_filter`.

## The Rest of the Migration

Images are only the first thing to break visibly. Under the Agent API:

- **Models become effort levels.** `sonar` and `sonar-pro` both map to `fast`, `sonar-reasoning-pro` to `low`, and `sonar-deep-research` to `high`. The docs suggest `xhigh` for "state-of-the-art deep research."
- **Citations change format.** `fast` keeps numbered `[1]` markers. `low` and above use source-typed markers such as `[web:1]`. Sources now arrive in a `search_results` output item instead of the top-level `citations` and `search_results` fields.
- **Streaming changes.** Answer text arrives in `response.output_text.delta` events. Tool calls and reasoning arrive as separate `response.output_item.*` and `response.reasoning.*` events.
- **Some features have no replacement.** `search_mode: "academic"` has no direct equivalent, and neither does `return_related_questions`.

Anything still sending Sonar requests depends on Perplexity's conversion layer. That layer kept the text and dropped the images, and it may not be the last thing it drops.

## What We Did in Perplexed

For now, a stopgap. When a template or dialog asks for images, Perplexed makes one forced `image_search` call alongside the normal generation request, then feeds the results to the existing `[IMAGE N: …]` code. If the search fails, the note still gets its text. The real fix is moving Perplexed onto the Agent API outright: effort levels, the new citation format, and typed streaming events. That's next.

## Our Take

Image results were a defining feature of Perplexity's API, and they've worked the same way since the beginning. Retiring an API is fair, and moving images to a tool lets you filter them by domain and format. But turning a working parameter into a field that silently disappears, with no error, warning header, or changelog line, is the wrong way to do it. Anyone with an integration that "used to embed images" should check whether it still does.
