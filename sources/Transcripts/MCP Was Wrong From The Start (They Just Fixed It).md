---
title: "MCP Was Wrong From The Start (They Just Fixed It)"
youtube_url: "https://youtu.be/f4mI3d-nTrI?is=kkIpNiMtv8cL88Og"
channel: "Better Stack"
date_published: "2026-08-08"
duration_seconds: 412
thumbnail: "https://i.ytimg.com/vi_webp/f4mI3d-nTrI/maxresdefault.webp"
platform: "youtube"
language: "en"
transcript_engine: "supadata"
date_transcribed: "2026-08-09T06:00:21.618Z"
date_created: 2026-08-09
date_modified: 2026-08-09
---

# MCP Was Wrong From The Start (They Just Fixed It)

> MCP's 2026-07-28 spec makes the entire protocol stateless, deleting the initialize handshake and the Mcp-Session-Id header that pinned clients to one server. That fixes round robin load balancing, removes the Redis instance holding your sessions, and lets a server scale to zero on Workers or Cloud Run. It also brings new Mcp-Method and Mcp-Name HTTP headers, ttlMs and cacheScope caching hints, elicitation rebuilt as Multi Round-Trip Requests, and Tasks graduating from experimental into an official extension.   🔗 Relevant Links Release blog: https://blog.modelcontextprotocol.io/posts/2026-07-28-release-candidate/  ❤️ More about us Radically better observability stack: https://betterstack.com/ Written tutorials: https://betterstack.com/community/ Example projects: https://github.com/BetterStackHQ  📱 Socials Twitter: https://twitter.com/betterstackhq Instagram: https://www.instagram.com/betterstackhq/ TikTok: https://www.tiktok.com/@betterstack LinkedIn: https://www.linkedin.com/company/betterstack  📌 Chapters: 0:00 - Intro 0:22 - Why Stateful MCP Broke 1:21 - What The New Spec Removes 1:58 - Round Robin And Scale To Zero 2:44 - HTTP Headers And Cache Hints 3:19 - Where The Handshake Info Went 3:43 - Managing State Yourself 4:23 - Multi Round-Trip Requests 5:20 - Long Running Tasks 5:51 - Deprecations And Upgrading 6:22 - Final Thoughts

[Watch or listen at the source](https://youtu.be/f4mI3d-nTrI?is=kkIpNiMtv8cL88Og)

:::transcript
[00:00] MCP just shipped its biggest change since it launched and the headline is the entire protocol is now stateless as it probably should have been from the start. There's no more handshakes, no

[00:08] more session IDs. Everything just got way simpler except for upgrading because there's been a lot of deprecations and breaking changes in here. So, let's jump in and see what's changed. [music]

[00:21] I'll start by giving you some context on the old version of MCP, the stateful version, and why this caused so much pain. The old flow went like this. The client posts initialize to your MCP

[00:31] endpoint and your server would then m a session ID and send that back. Every follow-up request would then have to carry that session ID and that meant the session ID pins the client to whichever

[00:40] server instance issued it and that is the part that caused all of the issues. Say you had a load balancer and you scaled your [[concepts/Explainers for AI/Model Context Protocol|MCP]] server up to three instances. The next request that comes

[00:49] in gets routed to a different instance than the one that ran initialize and that instance had never heard of the session before. You would end up with a 400 session not found error. The same

[00:58] thing could happen if one of those pods went down. The session state would simply be lost and every request after would fail. Now, obviously, there were workarounds for this. You could use

[01:06] sticky sessions so the client always hits the same instance or you could have a shared Reddit instance so every session can be looked up. But those just added unnecessary complexity and also

[01:14] latency and costs. Something that doesn't cost you anything is subscribing if you want to stay up to date with developer and AI news. It really helps us out. So, those were the problems with

[01:22] stateful MCP. And this is what the new spec has fixed. The spec is called 2026728 because MCP versions are actually dates and it has two key proposals in it. SCP 2575 removes the initialize and

[01:34] initialized handshake and SCP 2567 removes the MCP session ID header and the protocol level session that came with it. This means that the handshake is gone and from a protocol level every single request is completely

[01:45] independent. Now these changes make the code for an MCP tool call go from something like this with initialize and session headers to this a single self-contained request. It is much much

[01:55] simpler and it also solves all of our earlier pain points. We can now use standard roundrobin routing because any container can now handle any request. So we can use a completely traditional load

[02:04] balancer and we don't need a Reddit instance sat there holding our sessions. So if a server does crash or gets restarted, the load balancer can just send the request to the next working

[02:13] instance and the client never notices. But the best advantage for me is in deployment. On something like Cloudflare Workers or Google Cloud Run, the server doesn't need to be up 24/7 anymore since

[02:22] there's no connections to hold open. So, it can scale down to zero when no one's using it, which should save you a bit of money and also just give you way more deployment options. On Cloudflare's own

[02:31] post about this, they say that MCP no longer requires durable objects to speak the protocol. So, everything is getting way simpler and the new spec is basically just MCP built on top of normal HTTP infrastructure, which

[02:42] everyone already knows how to deal with. In fact, talking about HTTP, there's also two other changes that have been inspired by it. Previously, all of the MCP information lived inside the JSON

[02:51] body of a request. But now, there's two new HTTP headers, MCP method and MCP name. And this means that gateway rate limiter or firewall can make decisions using those headers without having to

[03:02] pass the JSON. So, it should help reduce some latency. They also added time to live and cache scope hints to tool prompt and resource list calls. Again, modeled on HTTP caching. So now a client

[03:12] should know exactly how long a tool list is fresh for and whether it's safe to share across users. Doesn't need a persistent connection to stay up to date anymore. Now you might be wondering

[03:20] where all of that handshake information actually went as it wasn't useless information. The server might still need to know what protocol version you're on and what your client can do. But this

[03:29] information now just rides along on a meta field within the JSON of a single request. So the server can simply read that to understand what the client can do. And if a client wants to know what a

[03:38] server can do, there is now a new optional method called server discover that returns that information. So far then we've seen a lot of simplification, but you still might have two questions.

[03:48] First, what if we actually wanted state? And second, if there's no persistent connection, how does the server ask the client something like a follow-up question? Well, I'll start with question

[03:56] one. What if you actually wanted some state? And guess what? You just do this the same way that HTTP APIs have done it for as long as they've existed. You could have a tool mint an explicit

[04:05] handle, something like basket ID or browser ID, and then the model just passes this back as an ordinary argument on the later tool calls. So now it's completely up to you how you manage this

[04:14] state and not the protocol, which is a way more flexible approach. And it's worth knowing authorization still works, and they've actually done a lot of work hardening it in this update as well. As

[04:23] for the second question, what if the server wants to send a follow-up question like, "Are you sure?" Well, the old way needed a constant open stream to send that message down to the client.

[04:32] This actually meant that the user could be prompted out of nowhere without having asked for anything, which is a pretty bad experience and also a possible security problem. So, in this

[04:40] new spec, they've completely rebuilt the workflow as a multi-round trip request. So, say I had a tool that deleted a file on some cloud provider and I called it. Instead of pushing a follow-up question

[04:49] to me, the server actually returns an input required result and attached to that is a request state payload, which is all of the context for that call serialized. This input required result

[04:58] can actually be something as simple as are you sure typed as a boolean. And this will prompt the client to ask me. And when I answer, the client then reissues that original call, but this

[05:06] time with my input responses attached. And it also echoes that request state back. That request state actually contains all of the context needed to resume this work. Which means that any instance on my load balancer can

[05:16] actually pick this up and retry it. And it doesn't have to be the one that initially requested the answer. But what about a tool call that takes a long time? You don't want it to be holding

[05:23] that connection open and blocking the entire conversation. Well, this is why they graduated tasks from experimental to an official extension. Let's say we have a tool for processing a refund. And

[05:31] this is a task that takes a while. You'd simply write that task state into a database somewhere as working and kick off the async job and then immediately return a response for that tool call

[05:41] telling the agent and the user that it's running. From here, the client can then pull that tool call with task/get or subscribe with subscription/isonen to track its progress and pull in the final

[05:50] result when it's done. So those are the key changes that make MCP stateless. Now, and as I mentioned in the intro, this comes with a lot of breaking changes and deprecations. They have said

[05:58] though that all of these features will have a minimum of 12 months in deprecation before they're officially removed. So there is still some time to update your servers. And talking of

[06:06] updating, all of the SDKs now support this spec with most of them having a major version bump up to version two. And if you use TypeScript like me, they've actually replaced the monolithic

[06:14] SDK package with modular libraries, one for the server and one for the client. And they also made a code mod that handles the standard API renames for you. Obviously though, we have seen a

[06:23] lot of changes in this update. So, it's not going to be a simple update the package and leave. But all of these changes are genuinely worth making as it feels like a great reset for MCP, doing

[06:32] things the way they should have been done from the start. And I'm pretty excited to see how much further MCP goes. What do you think? Let me know in the comments down below. While you're

[06:39] there, subscribe. And as always, see you in the next one.
:::
