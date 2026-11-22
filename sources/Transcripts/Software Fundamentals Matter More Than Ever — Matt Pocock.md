---
title: "\"Software Fundamentals Matter More Than Ever\" — Matt Pocock"
youtube_url: "https://youtu.be/v4F1gFy-hqg?is=4dZ_cV5lnRji50jI"
channel: "AI Engineer"
date_published: "2026-04-23"
duration_seconds: 1106
thumbnail: "https://i.ytimg.com/vi_webp/v4F1gFy-hqg/maxresdefault.webp?v=69fad93b"
platform: "youtube"
language: "en"
transcript_engine: "supadata"
date_transcribed: "2026-11-19T04:36:34.621Z"
date_created: 2026-11-19
date_modified: 2026-11-19
---
[[Sources/People/Influencers/Matt Pocock|Matt Pocock]]

# "Software Fundamentals Matter More Than Ever" — Matt Pocock

> AI coding tools are overhyped and powerful at the same time. Used well, they're extraordinary. Used badly, they'll bury you in spaghetti code faster than any human team could. The difference isn't the tool. It's the process. After 18 months of teaching developers to build with AI agents, Matt Pocock has watched the same patterns emerge: the devs who succeed aren't the ones who delegate everything or nothing. They're the ones who fall back on engineering fundamentals. In this talk, he shares the iterative process his students use to ship high-quality applications with AI agent swarms, and why the principles that make it work (ubiquitous language, vertical slices, TDD, deep modules) are decades-old ideas that didn't break. They got more important.  Speaker info: - https://x.com/mattpocockuk - https://www.linkedin.com/in/mapocock/  ---  Explore this talk's slides, transcript, key takeaways and resources on its official AI Engineer page: https://ai.engineer/talks/v4F1gFy-hqg-software-fundamentals-for-ai-coding  ---

[Watch or listen at the source](https://youtu.be/v4F1gFy-hqg?is=4dZ_cV5lnRji50jI)

:::transcript
[00:07] [music] >> Hello everyone. Having a good conference so far? Yeah. Are you having a good conference so far? Yeah. Good. Wonderful. I have a message for you that I hope will be um a comforting message for

[00:27] folks who believe that uh their skill set is no longer worth anything in this new age, which is I believe that software fundamentals matter now more than they actually ever have. And I'm a teacher,

[00:42] and I've been recently teaching a course called Clojure Code for Real Engineers. Nice and provocative. And in the process of kind of working on this course, I had to come up with a curriculum about

[00:54] AI coding, which is a bit of a nightmare because things are changing all the time, right? AI is a whole new paradigm. We need to chuck out all of the old rules, surely, so that we can bring in the new stuff. And there's

[01:09] a kind of movement that has come up around this, which is the specs-to-code movement. And the specs-to-code movement says that, "Okay, you can write a specification about how an application

[01:19] is supposed to work. Then you can use AI to turn it into code. If there's a problem with the application, you then go back to the spec. You don't really look at the code. You just change the

[01:29] spec, you run the compiler again, and you end up with more code." Raise your hand if you've heard of that. Keep your hand raised if you've tried it. Okay, I've tried it, too. You can put your hands down.

[01:42] And what I noticed was I would run it, and I would try not to look at the code, but I would look at the code, and I realized I would get code out, first of all, and then I would run it, I would

[01:53] get worse code. And I did it again, I got even worse code. I got it again, I kept running the compiler, kept running the compiler, and I would just end up with garbage. You know, raise your hand if that's

[02:04] happened to you. Yes. I don't think this works. The idea that we can just ignore the code and just have the code let it manage itself is just sort of vibe coding by another name. And I didn't believe that back then. I

[02:18] thought, "Okay, how do I fix the compiler? How do I make it so that it doesn't produce bad code each time, or worse code?" And so I thought, "Okay, I need to explain to the LLM in English what a

[02:30] good code base looks like." Let me dig out one of my old favorite books, which is a Philosophy of Software Design by John Osterhout. Go on Amazon, get it. Um and he has a definition for what bad code looks like.

[02:45] He calls it complex code. Complexity is anything related to the structure of a software system that makes it hard to understand and modify the system, right? So a a bad code base is a code base

[02:55] that's hard to change. If you can't change a code base without causing bugs, then it's a bad code base. Good code bases are easy to change. So I thought, "Ooh, that was good. Let's try another book. Let's try The

[03:06] [[Sources/Books/The Pragmatic Programmer|The Pragmatic Programmer]]." Go on Amazon, get it. They have a whole chapter on something called software entropy. And this is exactly what I was seeing. Entropy is the idea that things tend towards um

[03:19] disaster and uh floating away from each other and collapse. And this is exactly how most software systems behave, too, is that every time you make a change to a code base, if you're only thinking

[03:28] about that change and not thinking about the design of the whole system, your code base is going to get worse and worse and worse. And that's what I was seeing. Everything inside the specs-to-code idea

[03:39] that you just run the compiler again and again was making worse code. Now, there's an idea that sort of drives the specs-to-code movement, which is that code is cheap. Raise your hand if you've heard that phrase before,

[03:51] that code is cheap. Yeah. Well, I don't think this is right. I think code is not cheap. In fact, bad code is the most expensive it's ever been. Because if you have a code base that's

[04:04] hard to change, you're not able to take all of the bounty that AI can offer, cuz AI in a good code base actually does really, really well. And this means good code bases matter more than ever, which means software

[04:18] fundamentals matter more than ever. That's the thesis of this talk. So let's actually get into practical stuff. I'm going to talk about different failure modes that you may have experienced, or you may not have

[04:28] experienced yet with AI, and how you can avoid them by just going back to old books and looking at good software practices. Sound good? So the first one is that the AI didn't do what I wanted.

[04:40] You know, I I thought I had a good idea in my head, and the AI just did something totally different, or it did some uh like specs that I, you know, it just made something I didn't want. Raise

[04:49] your hand if you've hit this mode. Cool. Okay. Well, this is what they say in The Pragmatic Programmer, is that no one knows exactly what they want. It's that you and the AI, there is a communication barrier there right?

[05:04] And so when you're talking to the AI, that's kind of like the AI doing its requirements gathering. It's basically working out from you what it is that you need. And I realized that there was another book,

[05:16] Frederick P. Brooks' The Design of Design, and it talks about this idea called the design concept. It's that when you have more than one person designing something together, you have this idea sort of floating between

[05:28] you, this ephemeral idea of the thing that you're building. And that thing that you're building, or the idea of it, is called the design concept. It's not an asset, it's not something you can put

[05:37] in a markdown file, it is the invisible sort of theory of what you're building. And so I thought, "Okay, that's what's going on. Me and the AI don't share a design concept." So I came up with a skill.

[05:51] The skill is very, very simple. It's called Grill Me, and it looks like this. "Interview me relentlessly about every aspect of this plan until we reach a shared understanding. Walk down each

[06:03] branch of the design tree, which is another thing from Frederick P. Brooks, resolving dependencies between decisions one by one." This skill is like uh the repo containing this skill has like 13,000

[06:14] stars or something. Like, it just went nuts, went viral. People love this thing. It These couple of lines means the AI asks you like 40 questions, 60 questions. I've had it ask uh people 100

[06:25] questions before it's satisfied they've reached a shared understanding. And it means it turns the AI into a kind of adversary, where it's just continually pinging you ideas and trying to reach a shared understanding.

[06:38] And that means that the conversation that you then generate, you can take that and turn it into a product requirements document or something. Or if it's a small change, you can just uh do uh turn it directly into issues.

[06:52] And then your AFK agent will then pick it up. And don't at me on this, but I personally believe this is better than the default plan mode in uh the tool that I use, which is Clojure Code.

[07:04] Plan mode is extremely eager to create an asset. It really wants to uh just create a plan and start working. Whereas I think it's a lot nicer to reach a shared design concept first. So that's tip number one.

[07:21] Now, failure mode number two is that the AI is just way too verbose. It's like you're almost talking at cross-purposes with the AI. Raise your hand if you uh feel this. If you've ever experienced that failure mode. Yeah.

[07:33] It's kind of like the AI is like talking just using too many words to try to communicate what it's doing. It's not like you're talking uh using the same language. And this to me felt very, very familiar,

[07:44] right? If you've ever been a developer for a long time, and you've worked with, let's say, domain experts, someone building an application, um let's say the domain expert wants you to build something on uh I don't know,

[07:54] microchips. You have no idea what microchips are. You need to establish some kind of shared language, right? Cuz otherwise, they're going to be using terms you don't understand. You're going to be

[08:02] translating that into code that maybe you don't even understand, and certainly the domain expert won't. And so there's this kind of language gap between you and the domain I went back to domain-driven design, DDD.

[08:17] This is something I'm still kind of on the edge of exploring, but everything I'm reading about DDD is just music to my ears. I freaking love it. And DDD has a concept of a ubiquitous language. With a ubiquitous language,

[08:32] conversations among developers, and expressions of the code, and conversations with domain experts are all derived from the same domain model. It's essentially a markdown file full of

[08:41] a list of terms that you and the AI have in common. And you really focus on those terms, and you really make sure that they're aligned with what it actually means, and you use them all the time in

[08:51] the code, when you're talking about the code, when you're talking to domain experts, or in our case, when you're talking with AI. So I made a skill. This skill is the ubiquitous language

[09:01] skill. Basically just scans your code base, looks for terminology, and then um creates a markdown file. Creates the ubiquitous language markdown file, a bunch of markdown tables with all of the terminology.

[09:14] And this, then I pass it to the AI, and I'm able to read it, too. And I actually have it open all the time when I'm grilling with the AI and planning and that. What I noticed by reading the

[09:24] thinking traces of the AI, it not only improves the planning, but it allows the AI to think in a less verbose way, and actually means that the implementation is more aligned with what you actually

[09:36] planned. So this has absolutely been a powerhouse. It's been unbelievably good. So that's tip number two. Create a shared language with the AI. So okay, let's imagine that you've aligned with the AI. You know what it is

[09:49] you're supposed to be building. The AI has built the right thing, but it doesn't work. Raise your hands if that's happened to you. Yeah, just doesn't work. Well, there's an obvious thing that we

[10:01] can do to make that better, which is we can use feedback loops. We can use um static types, you know, if you're not using TypeScript, uh that's crazy. Uh if you're not using uh if you're building a front-end app and

[10:13] you're not giving it the LLM access to the browser so it can look around, absolutely needs that. And you obviously also need automated tests. And one sort of thing I notice here is that even with

[10:28] these feedback loops, the LLM doesn't use them very well. It doesn't kind of like get the most out of its feedback loops in the way that a veteran developer would. And so it does what it

[10:38] tends to do is just does way too much at once. It will produce like a huge amounts of code and then think, "Oh, I should probably type check that actually." Or I should uh you know, maybe check a test on that or maybe do

[10:48] something like that. And this in the Pragmatic Programmer they describe as outrunning your headlights. It's essentially driving too fast because the rate of feedback is your speed limit.

[11:02] The rate of feedback is your speed limit, which means that you should be testing as you go, taking small deliberate steps. And the AI by default is really not very good at that. So, skill number three is TDD.

[11:14] You should be using test-driven development because TDD forces the LLM to really take small steps. You create a test first, you make that test pass, and then you refactor the code to make it

[11:29] nicer and consider the design. The issue here is that testing is really hard. Testing has always been hard. And the reason for that is there are a ton of different decisions you need to make when you write a test.

[11:46] You need to figure out how big a unit do you want to test? You need to figure out what to mock. You need to figure out what behaviors do you even want to test in the first place? And all of these decisions are

[11:56] dependent. So, if you are testing a really big unit like an entire uh massive application, then it might be quite flaky. You might not want to test that many behaviors. You know, if you

[12:06] only test this unit, you need to mock this unit, you know. It's all interlinked. And I've been thinking about this for years, for my entire development career. And what we notice is that good

[12:17] codebases are easy codebases to test. Right? So, here we're starting to get back to the idea of code being important. It's that the better your codebase is, the better your feedback loops are because you're able to um

[12:31] give better feedback to the LLM, it produces better code. And so I thought, what does a good codebase, what does a testable codebase look like? Again, we go to John Ousterhout. [clears throat]

[12:42] He talks about having deep modules in your codebase. Not shallow modules, not lots of modules that expose type kind of um lots of functions. They should be relatively few large deep modules with simple interfaces.

[12:57] Let's compare them quickly. Deep modules, lots of functionality hidden behind a simple interface. Hiding the complexity. You can look inside the deep module if you want to, but you don't need to. You

[13:08] can just use the interface. Shallow modules, not much functionality, complex interface. And I'll just wait for you to take the photos. Shallow modules in a codebase kind of look like this, where you have a ton of

[13:22] different tiny little blobs that the AI has to walk through and navigate. And this is really hard for the AI to explore actually. And so often what you'll see is if you have a codebase like this, which AI is

[13:33] really good at creating codebases like this, is that you'll have a situation where AI doesn't understand what your code is doing. It will attempt to explore the code, but because it's poorly laid out,

[13:45] filled with shallow modules, it doesn't maybe get to the right module in time or doesn't understand all the dependencies, all that stuff. It doesn't understand your code. And so what does a

[13:54] codebase full of deep modules look like? Well, it looks like this. Where it's the same code, but it's just structured inside boundaries, where you have these interfaces on the top. And these interfaces, you should

[14:10] probably have a lot of control over them and design them really well. Otherwise, you know, AI might mess up the design. But the implementation, you can kind of leave that to the AI bit.

[14:20] So, how do you turn a codebase that looks like this into a codebase that looks like that? Well, I've got a skill for that. Improve codebase architecture. Turns out this is not It's it's quite complicated to do

[14:35] this, but it's a like a set of steps that you can reusably do again and again. You just sort of explore the codebase, look for opportunities where there's code that's kind of look um

[14:45] related, and wrap all of that in a deep module. And this is a testable codebase because the boundaries around this code are so so simple. You test at the interface, you verify using that interface,

[14:59] and you're good to go. And so this is a codebase that rewards TDD. But how about failure mode number six? Which is your Okay, let's say your feedback loops are working. Let's say that things are kicking into gear.

[15:11] You're able to ship more code than you ever have before, but your brain can't keep up. Right? Uh raise your hand if you've felt more tired than you have ever before in your development career.

[15:22] Yeah, me too. It's knackering. And I think that this is a codebase that actually makes it harder for your brain because you, as well as the AI, need to keep all of that information in your head.

[15:34] Whereas this, not only is it simpler for you to read and understand, it also means you can kind of treat these modules, or these deep modules, as gray boxes. You can kind of say, "Okay,

[15:50] I'm going to just design the interface, but I'm not going to worry too much or not review the implementation too much." You can do this obviously with uh things that are less critical in your

[15:59] application. Can't do this with uh you know, various things like finance or whatever, but in many many modules in your app, you don't need to think about the implementation too much as long as

[16:09] you have a testable boundary outside the module, and as long as you understand its purpose and can design it from the outside. I have found this has really saved my brain because I can just go,

[16:19] "Okay, the AI, I'll let you handle what's inside the big blob. I'm just going to test from the outside and verify it." So, that's tip number five. Design the interface, delegate the implementation.

[16:32] But this means that whenever we're touching the code, whenever we're planning stuff, we need to think about and be aware of the modules in our application. We need to know that map really well. It needs to be part of our

[16:43] ubiquitous language. We need to build it into our planning skills as well. So, my write a PRD, inside the PRD I'm specific about the module changes and the interfaces inside those modules, how

[16:54] they're being modified. I'm thinking about them all the time. And this comes from Kent Beck. Invest in the design of the system every day. And this is the core of it, right? Because specs to code, we are not

[17:06] investing in the design of the system. We are divesting from it. We're getting rid of that. Whereas this, I think, is absolutely key. And so code is not cheap. That's the message I want you to take away. Code is

[17:21] important. And if we think about AI as a really great on-the-ground programmer, a kind of tactical programmer, a sergeant on the ground making the code changes, you need someone above that.

[17:35] You need someone thinking on the strategic level. And that's you. And that requires software fundamental skills that we've been using for 20 years, for longer. Now, if you were interested in any of

[17:48] the skills I put up here, it's in the GitHub repo macpocockskills. And if you're interested in the training that I do or any free stuff, I'm on YouTube, I'm on Twitter, but I'm also at

[17:57] aihero.dev, where I have a newsletter you can check out. Thank you so much. I hope that this gives you confidence in this new AI age that you can actually make a good impact. Thank you. >> [music] [applause] [music]

[18:21] [music]
:::
