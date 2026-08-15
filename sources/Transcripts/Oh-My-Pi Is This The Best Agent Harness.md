---
title: "Oh-My-Pi: Is This The Best Agent Harness?!"
youtube_url: https://youtu.be/jcCPUcS4yzs?si=QKay5Ecoo24e6eNi
channel: NeuralNine
date_published: 2026-08-03
duration_seconds: 1193
thumbnail: https://i.ytimg.com/vi/jcCPUcS4yzs/maxresdefault.jpg
platform: youtube
tags:
language: en
transcript_engine: supadata
date_transcribed: 2026-08-09T04:04:28.093Z
date_created: 2026-08-09
date_modified: 2026-08-09
---

# Oh-My-Pi: Is This The Best Agent Harness?!

> 💻️ Need some help with a project or some consulting? Contact me here: https://www.neuralnine.com/services  🐍 The Python Bible Book: https://www.neuralnine.com/books/ 💻 The Algorithm Bible Book: https://www.neuralnine.com/books/  Timestamps: (0:00) Intro (1:16) Philosophy & Installation (3:10) Basic Settings (6:18) Hashline Edit & LSP (10:30) Built-In Debugger (13:14) Collaboration & Remote Control (14:10) Voice Modes (16:20) Browser Tool (17:03) Additional Features (18:21) Pi Plugins (19:08) Outro

[Watch or listen at the source](https://youtu.be/jcCPUcS4yzs?si=QKay5Ecoo24e6eNi)

:::transcript
[00:00] Today, we're going to take a look at OMy Pi, which is a coding agent or agent harness built on top of the Pi harness, which I also recently made a video about, but this one follows an entirely

[00:09] different design philosophy. [[Tooling/Software Development/Developer Experience/DevTools/Pi Coding Agent|Pi]] basically comes with nothing similar to something like Arch Linux or Neovim. You have to set it up from scratch. You have to install extensions. You have to

[00:17] configure it so it meets your needs, but it's basically super lightweight and minimal without a lot of functionality. OMy Pi is the complete opposite. It comes complete out of the box with tons

[00:28] of features, tons of tools, and approaches which make your agent more efficient, accurate, faster. You have features like collaboration, different types of voice inputs. You have an LSP

[00:36] built in. You have a debugger built in. This is the complete opposite of being minimal, but it's a full-fledged coding agent with an IDE wired in as the website likes to phrase it. So, what I

[00:46] want to do in this video today is I just want to briefly take a look at it. I want to explore some of the most important and most interesting features. We're not going to be able to cover all

[00:54] of them. It's just too much that this tool is capable of. I want to highlight the stuff that I personally think is the most interesting, and then you can decide if you want to give it a try or

[01:01] not. Now, if you get value out of this video and if you like it, let me know by hitting a like button and subscribing. And now, let us get right into it. >> It's not a game, it's a lifestyle. >> [music]

[01:16] >> All right, so we're going to take a look at OMy Pi in this video today, the coding agent with the IDE wired in. When you scroll through the page, you will see this is an extremely feature-rich,

[01:25] batteries-included out-of-the-box complete coding agent or agent harness, the complete opposite of the thing that it's actually based on, which is Pi, the minimal agent harness. So, I also made a

[01:35] video about this recently. I like Pi a lot, but this design philosophy is completely different. Pi comes with almost nothing out of the box. It's completely minimal. You have to set it

[01:43] up yourself. You have to install plugins for almost everything, and it's not opinionated at all. Now, OMy Pi is based on that, so you can also access the same plugin ecosystem. You have the best of

[01:54] both worlds, so to say, but it comes completely opinionated out of the box with a ton of features. We're not going to cover all of those today, and in addition to that, it's also bench max.

[02:04] Now, there's certain things here, certain optimizations that lead to better token efficiency, uh more speed, or better accuracy when it comes to editing. And one of those is the hash line edit. We're going to take

[02:15] a look at this as well, but the basic idea is when you do edits, you don't do that by matching strings and by doing substitutions. We do that by targeting certain hashes that represent line

[02:25] numbers. But this is more a theory thing that happens behind the scenes. What I want to do in this video today is I want to show you the most interesting things, in my opinion. Now, I'm not going to

[02:34] cover all of it. For example, I'm not going to go into sub agents. Know that they exist. If you're interested in that, you can scroll through the page here. You're going to see all the

[02:41] different features. What I want to do is I want to focus on the things that I think are most interesting, and then you can explore it yourself. But this is, keep in mind, a completely different

[02:50] approach to the minimal pie. This is the complete opposite. Now, let us get started with the installation. What you can do here is you can run the curl command if you want to run a shell

[02:59] script. You can install it using bun, which is what I did. Theoretically, you do also have an AUR package, but for me, somehow, this produced some problems, so I just went with the bun install. And

[03:09] once you have the package installed on your system, navigate to a directory when you want to try it. In my case, it's a tutorial directory. And then you can just run the command OMP, for Oh My Posh.

[03:19] And the first time you do this, you probably want to log in, so you do something like {slash} login to choose a provider, and you can choose one of the many that are available here. In my

[03:28] case, I connected myself to my chat GPT plus, which is my codex subscription, and also to open code go, which is what I use to run stuff like GLM or Kimmy K3. Uh as you can see right now, I'm using

[03:41] GLM 5.2. So, once you log in, you can do {slash} model, and you can pick your provider. In my case here now, as I said, I have uh I also have Ollama connected theoretically, but you can go

[03:51] into the list of models, you can go with GLM 5.2 for example, then I can pick default, then I can pick um max as the setting. This is the the effort level that I like to work with, and then I

[04:03] have GLM 5.2 selected. Now, one thing you will notice is first of all, the UI is very nice. I think it looks very good, but also it has a ton of settings. If you do {slash} settings, if you go

[04:13] into the settings, you will see a ton of settings. So, this is way too much to process the first time you see it. So, don't try to understand everything here. Not everything is super important. The

[04:23] thing that I would configure here, this is important, is in the interaction tab, I would go to the tool approval, and I would go to always ask. Now, the default is yellow, which means it does whatever

[04:32] it wants uh without asking you for approval. I would set this to always ask, so you can always have a say when it comes to actually running stuff or doing right edits. So, what's cool about

[04:43] OMP when you run it for the first time is that it picks up on the already existing configs and already existing files that are related to cursor, to Claude, to Codex, and so on. So, let me

[04:53] show you an example. If I go to my uh {dot} Claude directory, I can create here a file called Claude MD, and this is going to be like a system prompt, basically. So, I can say here one instruction or let's say one

[05:10] important rule. Every message no matter what it is about should always start with Okay, Florian. That's my name. I just want this to be always the start of every message. I'm going to put this in

[05:27] quotations here, {comma}. That is now a Claude MD file in the Claude directory. So, not really related to OMP. I can also run Claude now, and I can say uh what does the LS command do? So, just

[05:40] a basic question. This should pick up on the rule now in Claude code. As you can see, Okay, Florian. And now, if I do that here as well in OMP, if I say what is the LS command for {question mark},

[05:53] then it's going to pick up on this cloud MD file and it's going to say, "Okay, Florian." and answer the question because it can also use the already existing stuff. So, it seems like it's a

[06:04] little bit stuck. Let's try to ask again. And there you go, "Okay, Florian." And you can also see here every message must start with okay Florian because it read this file. So, basically if you have an already

[06:13] existing setup, you can just start this tool and it will pick up on the existing files. Now, the first thing I want to talk about when it comes to oh my pie is editing code. For this, one of the

[06:22] things we're going to take a look at is the setting for the edit mode, which I already briefly touched upon. In files here, you can set the edit mode to something else. The default is hash line

[06:32] and this is the editing that or this is the edit mode that is responsible for the benchmark sync that we saw on the website. This is a more robust way of editing files. The idea is instead of

[06:42] replacing one string with another string where just a single token, just a single uh space can mess up the entire edit and then it has to retry or has to fix the mistake and try again. What we do here

[06:53] is every line gets a certain hash, a unique identifier, and the editing targets this specific hash instead of targeting a string match. Now, this is not something that we can really demonstrate here because this is just

[07:05] what happens behind the scene, makes the editing more robust. What we can get into though is or what we can show is the LSP. So, LSP stands for language server protocol. The idea is that it

[07:16] doesn't consider just strings. When I say replace a variable or change the name of a function, change the name of a file, it doesn't just do that in terms of string changes. It does that also in

[07:26] a holistic way where it understands on a workspace level, "Okay, this file is a module. It's being imported somewhere else. I need to replace all the occurrences on a workspace level." and

[07:35] you can do that with an LSP. And for this, I have a very trivial example here that I can show you. Very minimal just to illustrate the concept. LSP demo. We have two Python files here. One is

[07:44] called math_utils.py which just has a single function here sum_prices and the other one is app.py which imports from that file the function sum_prices and uses it. Now, for this we don't need an

[07:56] LSP. We can just rename easily by scanning two files with the agent. Just scan the two files and replace whatever you want to replace. But think of this to be a complicated a complex large

[08:06] workspace with thousands or hundreds of thousands millions of lines of code many files. Then if you do a change if you rename a file if you rename a function you want to also rename properly

[08:17] refactor all the occurrences. You want to rename all the occurrences and we can do that with the LSP tool. Again, this is a very trivial example here. But I just want to illustrate the concept. Now

[08:26] one thing that you need to have on your system for this to work is a language server depending on the programming language you're going to use a different server. In my case here with Python I'm

[08:34] going to use Pyright or to be precise I'm going to use based Pyright. And how you get it onto your system is up to you. You can use pip, you can use uvtool. So uvtool install based Pyright is what I did. There's

[08:47] also an AUR package if you're on Arch. But you need to have this on your system as binary that you can use and then we can start OMP and we can ask it to do a basic refactoring a basic rename here

[08:59] with the LSP tool. So I can say here rename the math_utils.py file to math tools.py using the LSP tool. So you don't have to usually be that explicit. I'm doing it right now to force the tool call because

[09:17] otherwise it will see that there's only two files no need to use the LSP. I can just make the edit simply. But we can do that like this to force the tool use so you can see that this tool exists. You

[09:27] can see it query the LSP status here and it has based Pyright and PyLSP available. And here you can see now it uses the LSP tool with the action rename file on math_utils.py. I can approve

[09:38] this. Now, in this particular case, it also checked manually if there are other imports, but it wasn't necessary. Now, it recognized that there's another import, but the LSP, as it says here,

[09:47] should rename should update that automatically. So, as you can see, the first time it made a mistake in the tool call, it timed out, and now it renamed that properly, renamed mathutils to

[09:57] mathtools.py, and also base pi right here applied one edit to app.py. So, this happened using the LSP. I didn't have to approve the actual string edits, the actual hash line edits. And if I go

[10:09] now into app.py, you can see from math tools, and the file's also named math tools. This is super trivial, but you get the idea. You can do that on a workspace level whenever you want to

[10:19] rename something, whenever you say, "Hey, change this variable name, change this function name, change this model module name, rename this file." It's going to use the LSP to find all

[10:28] occurrences and to refactor the entire code base. Now, another very interesting and useful thing about o my pi is that it has a real debugger. And by debugger, I don't mean that it runs shell

[10:38] commands, and it prints stuff, and it tries the application and figures out what's wrong. It actually injects the process and uses a proper debugger. So, the package that's actually used here is

[10:47] debugpy, and if you don't have it, you should install it on your system either by saying pip install debugpy, or if you're on Arch, you can do sudo pacman -s, and then I think python-debugpy

[11:00] is what you need. But, you need to have this package on your system. It will use that debugger. And for this, I also have a simple example here. We can go to my debug demo. It's very, very simple. Just

[11:10] a script that divides a number by a random number, and sometimes this number is going to be zero, and if it's zero, it's going to fail. And my question is, why does this script fail? Use the debug

[11:21] tool to do that. Now, of course, it will also be able to do that by just reading the code. So, now I'm again going to explicitly say, "Use the debug tool." Otherwise, it's going to maybe just look

[11:30] at the code and tell me exactly what the problem is, but I want to show you that this works. Now, in case if this is not set by default in your installation, you can go to tools and then debug. Make

[11:41] sure that this is true. So, we're going to say, "Sometimes my Python script here crashes randomly. Do not look at the code. Use only the debug tool to figure out what's wrong." Again, just making

[11:50] this prompt to show you that it's going to use the debug tool and it will actually run this and inject the process. There you go. So, you can see now it uses the debug tool. It doesn't

[11:59] read the code to figure out the error in the code itself in the logic. It actually runs this and launches the debugger, which can then do things like setting breakpoints, continuing, making

[12:09] a step, and so on. You can see exactly what it does here. It launches. It takes a look at the stack trace. It has an automatic pause here in the first line. It asks me if it's okay to continue. I

[12:20] can approve this. Then it realized that after continue, it just terminated and crashed. So, now it's going to work with breakpoints. So, here you can see a custom request set exception breakpoints

[12:30] raised and uncaught. And now it runs the program until it crashes and then it's going to catch the exception and it figured out that there is a problem. Number one is 20, number two is zero.

[12:40] So, probably here, there you go, zero division error. It understood that there is a division by zero and that's the problem. And it tells me here, "Diagnosis complete using only the debug

[12:50] tool. I never opened the source file. It crashes with a zero division error." And yeah, it also gives me the variables here and tells me what's wrong and how to fix it. So, this is again very

[13:00] trivial example, but it has a real debugger that can take actions and troubleshoot the program as it's going, not just look at the code, not just print stuff, actually inject itself into the process and then work with

[13:12] breakpoints, continue steps, and so on. Now, another very cool feature of omy pi is that we can collaborate very easily. I can just type {slash} collab and this is going to create a QR code and also a

[13:24] link that I can use in the browser, which means I can also use it on my phone. So, what I can do now is I can just take my phone, open the camera. I don't need a special app for this. I can

[13:32] scan this QR code. I can go to the link. And right now I'm in this session with my phone. So, I can uh say thank you, for example, and get an answer from the AI. I type this from my phone. I can do

[13:44] the same thing on my laptop. This is just super super convenient if you want to work with people on the same session, if you want to work across multiple devices. So, you can basically use this

[13:53] as a remote feature if you're in the kitchen or if you're taking a walk and you still want to be coding or if you're on the subway. Or you can use this as a collaboration feature, send this link to

[14:01] a friend and vibe code together. For whatever reason you would want to do that. I don't think that's a very useful use case. But for the remote feature, this is very very convenient. Then

[14:10] another thing I want to show you is voice input or voice mode. There's two different ways to do that here. One is to connect to your Codex subscription and to then press control L. This is

[14:19] going to start a real-time interactive voice mode. I don't have desktop sound recorded right now, so you're not going to hear the responses. But the AI is actually answering back with with voice.

[14:31] So, I'm going to turn down the volume for myself here. But basically, if I say control L, this is going to connect to Codex. And now I can speak to the AI. Can you hear me? Hello. What's going on?

[14:46] There you go. So, I actually heard that now through my headphones. You didn't hear that in the video, but this was not just text. This was actually a real-time conversation. So, I'm talking, it's

[14:54] talking back, and we can still run commands, right? So, I can show you that again. Go ahead and create a simple Python script that shows hello world on screen. So, while this is happening here, while

[15:09] I'm talking to it, um it actually does the actions, actually takes the actions here. So, this is very convenient if you want to do some real-time back and forth with the agent or with with the AI.

[15:19] Another way to do that is to just have voice input. So, to actually just use your voice uh with the space bar to with the space bar to formulate your messages. For this, what you need to do

[15:29] is you need to set up everything. So, you need to say OMP setup and speech. This is basically just speech to text and it will ask you to download a model. This is a state-of-the-art Nvidia model

[15:40] here locally 0.6 billion parameters should run on most systems. You can just choose that. It's going to download it. Then you have Kokoro here for the actual text to speech. Um and that's basically

[15:51] it. What we can do now is we can go into OMP, make sure that text to speech is enabled. So, speech here or speech to text actually speech to text needs to be enabled. There you go, true. And now

[16:02] what I can do is I can hold the space bar and say stuff. Create a hello world Python script, please. Okay, didn't get the please, but this is also something that we can do. I need to say this is

[16:12] not as uh good as the cloud code voice input. So, I would say that cloud code is superior when it comes to that, but it's a nice thing and this is how you can set it up. And then maybe the last

[16:21] thing I want to show you here as a feature is that OMP can actually use a browser to actually browse the web, not just web search as a tool call, but actually using a browser. So, I can say open uh web browser,

[16:34] go to Google and tell me what the current slogan is. Doesn't make a lot of sense, but this is going to force it to use the browser tool and you can see now allow tool browser open tab main approve and this

[16:50] is going to open it in a browser. Now, this is running in headless mode, so it's running behind the scenes, but this means that it's actually using a real browser instance and it can actually

[16:58] scrape the web and actually serve the web, not just retrieve information using a web search tool. So, these are basically the couple of features I wanted to show you myself. Of course, there's much more if you go to the

[17:08] website, you can scroll through the most important ones. As I mentioned, you do have sub agent support. You also have something called time traveling uh stream rules, which basically the idea

[17:18] here is you define a rule, there's a regex that waits for certain triggers, and the rule doesn't have to stay in context. So, you don't have to tell the agent, "Hey, every time something

[17:26] happens, do XYZ." And then the agent has to keep it in context. What happens is that this rule is triggered in a delayed way. So, when something triggers, when a regex matches, this rule is going to be

[17:37] loaded into context and applied directly without having to stay in context all the time, without wasting the context window. Uh we also have second models that we can run like an an advisor rule.

[17:48] So, one model that controls the other model or checks the other model. What's also cool is that all the binaries used for stuff like rip grep are in the process itself. So, in like rip grep,

[17:57] grep, find, they don't have to be running as shell commands. They're tools built into OMP, which means that it can use them natively even on Windows. So, we don't have to run these shell

[18:06] commands. They're part of the binary. They're part of OMP itself. And of course, much, much more. You can just scroll through everything. You can see all the latest additions. There's an

[18:15] update almost every day. You can do OMP OMP update, which I have to do here to update it. And also, maybe one thing that I didn't cover, as I said, you can install plugins. So, you can basically

[18:26] say OMP install, and then NPM and then pi What was it? permission system. And then it will install the plugin. You can also, of course, say OMP plugin uninstall pi permission system or NPM pi permission system.

[18:47] And then it will uninstall that. But this is just super convenient to have a fully fledged environment here out of the box complete, batteries included, feature rich, and you're still running

[18:57] the pi harness behind the scenes. So, you still have the whole ecosystem. This is for those of you who want an opinionated ready-to-go feature-rich IDE-like coding agent or agent harness.

[19:08] So, that's it for this video today. I hope you enjoyed it and hope you learned something. If so, let me know by hitting a like button and leaving a comment in the comment section down below. Also, in

[19:15] case you're interested on my website, you will find a services tab and a tutoring tab. There you can contact me via email or LinkedIn at the bottom of both pages if you need help from a

[19:23] freelancer, if you need a consultant, if you need help with a project, you can reach me there. Besides that, don't forget to subscribe to this channel and hit the notification bell to not miss a

[19:31] single future video for free. Other than that, thank you very much for watching. See you in the next video and bye.
:::
- Transcript: [[Sources/Transcripts/The Best Local Agentic Coding Workflow (Complete Guide)]] — source: https://youtu.be/UngVdAsQEiU?si=ElbmdiKIQ5LxqTuZ
