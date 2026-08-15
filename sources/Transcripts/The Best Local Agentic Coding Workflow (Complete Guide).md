---
title: "The Best Local Agentic Coding Workflow (Complete Guide)"
youtube_url: "https://youtu.be/UngVdAsQEiU?si=ElbmdiKIQ5LxqTuZ"
channel: "Web Dev Simplified"
date_published: "2026-05-12"
duration_seconds: 2697
thumbnail: "https://i.ytimg.com/vi_webp/UngVdAsQEiU/maxresdefault.webp"
platform: "youtube"
language: "en"
transcript_engine: "supadata"
date_transcribed: "2026-08-09T04:17:01.058Z"
---

# The Best Local Agentic Coding Workflow (Complete Guide)

> Setting up a local AI model can be intimidating, which is why I created this video. In this video I will show you everything you need to know about setting up local AI models from the basics of how local AI models work, to how to optimize local AI models for your hardware, and even how to use these local AI models in real world agentic environments.   📚 Materials/References:  LM Studio: https://lmstudio.ai/ Hugging Face: https://huggingface.co/ Pi Coding Agent: https://pi.dev/   🌎 Find Me Here:  My Blog: https://blog.webdevsimplified.com/ My Courses: https://courses.webdevsimplified.com/ Patreon: https://www.patreon.com/WebDevSimplified Twitter: https://twitter.com/DevSimplified Discord: https://discord.gg/7StTjnR GitHub: https://github.com/WebDevSimplified CodePen: https://codepen.io/WebDevSimplified   ⏱️ Timestamps:  00:00 - Introduction 01:08 - How Local AI Works 05:33 - Picking Models 11:46 - Configuring Your Model 21:57 - Using Local Models In Your IDE 34:17 - Using Local Models With Copilot 38:17 - Using Local Models With Pi 40:55 - Comparing Local Models to Anthropic Models   #LocalAI #WDS #AgenticCoding

[Watch or listen at the source](https://youtu.be/UngVdAsQEiU?si=ElbmdiKIQ5LxqTuZ)

:::transcript
[00:00] AI pricing is outrageous. Nearly all the monthly plans are completely gutted, which means you're stuck paying outrageous API pricing, which is why I decided to go down the rabbit hole of

[00:09] what it would look like to set up a local AI that runs entirely on my system, completely private, incredibly fast, and it's going to do everything, not just chat. It's going to have full autocomplete, so it's going to

[00:19] autocomplete anything that I want. And it has full agent mode where I can set up inside of VS Code my own agents I want to work with. And I can even use tools like the PI command line tool or

[00:28] any other open code style agent to run with this. And in this video, I'm going to show you how to set all of this up. And I'm not just going to show you how to set it up by telling you what to do.

[00:36] I'm actually going to be explaining how every single concept works. So it doesn't matter when you watch this video. If you watch it right when it comes out or a year from now, I'm going

[00:43] to teach you the concepts you need to understand. So it doesn't matter what model you work with and what type of provider you work with, you can know how to set everything up perfectly for your

[00:51] exact situation and your exact hardware. And this will actually work no matter how powerful or weak your hardware is. I'm going to show you all the different things you can configure. This is

[00:58] essentially a local AI master class. [music] Welcome back to WebDev Simplified. My name is Kyle and my job is to simplify the web for you. And before we start diving into setting up our local AI

[01:11] models and finding which models we want to use, we first need to understand how these models actually run so we know how we can set them up most efficiently on our system. So a model is mostly

[01:21] composed of a few different things that we need to keep in mind for when we're setting it up. We have this model and almost every model if you look at them is going to have a some number of

[01:29] parameters. You can see this is 862 billion parameters. This is 1 billion parameters and this has 128 billion parameters. So different models have more or less parameters. So that's one

[01:39] thing we care about. And another thing that we're going to be caring about for our models is going to be the context size. So we have parameters and we have our context. And the context is just

[01:49] essentially how much information can you fit inside your model at one time. Newer and newer models tend to have larger and larger maximum context windows, which means they can hold more information in

[01:59] them, which means they forget things less frequently and are overall better at larger running tasks. So when you decide to get a model, you need to first find out how many parameters that model

[02:07] has and what type of context you want to put inside that model because that will determine how large the model is. For example, this model with 862 billion parameters, that is a absolutely massive

[02:18] model that you are not going to be able to run anywhere on your local hardware. It's just way, way too big. You need to have a much smaller model than that to run it on your hardware properly. Now,

[02:27] all of these models, they're going to be running on your GPU, your graphics card inside your computer. So, let's just say that we have this box right here. And this box represents our GPU. And our GPU

[02:36] has a lots of different statistics inside of it, like how fast it runs and so on. But the most important statistic for you to take account of is the VRAM. That is the video RAM or the RAM that's

[02:46] inside your graphics card is essentially how much memory your graphics card has dedicated to it. Now, if you're on a Mac computer, they have what's called unified memory on their newer models.

[02:55] And that means that they share the same memory between their graphics card and their processor and all the rest of the computer. So, that means you can often get higher RAM numbers while a cheaper

[03:05] price. While with a dedicated machine where you have a dedicated graphics card and dedicated RAM, you're generally going to have a smaller amount of VRAM to work with because it's dedicated just

[03:13] to the graphics card, but it'll often be slightly faster. But for the most part, the most important thing is how much RAM you have. Because when you take a model and you try to load that model on your

[03:22] computer, what it does is it takes this entire model, all the parameters and everything, and it tries to shove it directly into your graphics card on your computer inside of that RAM. So, let's

[03:30] say that you have a GPU that has 16 GB of RAM inside of it. That means that you can only fit a model that can fit within this 16 GB of RAM. And that includes all the additional context and everything

[03:40] that model needs to run based on your codebase or whatever else you're trying to do. Now, let's say, for example, that you have some model that you're loading and it actually is larger than 16 GB. It

[03:49] goes past your GPU's limit. What happens is it'll fill your GPU as much as possible. So, it'll fill that 16 GB and then it's going to go off to the rest of your computer where you have your normal

[04:00] default RAM and it's going to fill in the overflow inside this section as well. So, it's going to take all that extra overflow and put it directly inside your RAM here. And this is why we

[04:10] have really expensive graphics cards and RAM right now because all the AI processes, they need graphics cards and they need RAM. So essentially, it's being raised up in price because all the

[04:19] AI model producers are trying to get as much graphics cards and RAM as they can to support their models because the bigger models need bigger graphics card RAM and they need bigger computer RAM to

[04:29] be able to store all of that really complex information. So really the key takeaway is when you're trying to look at what model is going to work for you, you need to take into account how much

[04:36] RAM your graphics card has as well as how much RAM your computer overall has. These are the two different things that you really need to focus on. And again, if you're on a system with unified RAM,

[04:45] like a Mac computer, that's going to be the same number. You're going to not have this computer RAM over here. Everything is going to be RAM that can be used for the graphics card. So, it's

[04:52] most likely going to mean that you have more space on your graphics card, but it's shared between your computer. So, once you hit the limit, there's no overflow. That's just the maximum you

[05:00] can do. Now, if you're on a Windows machine and you're unsure how much RAM you have inside your graphics card, you can just pull up the task manager, go to this performance section, and where it

[05:07] says dedicated GPU memory. You can see mine has 16 GB of memory. I have a quite new graphics card that's a little bit higherend. Yours would say whatever number it is. And then you have your

[05:16] actual memory here. This is your system computer where all that overflow space is going to go. And I have some pretty high-end specs cuz I use my computer for video editing. So it needs some

[05:24] higherend specs. But I'll show you how this will work on lower-end specs as well. So now let's figure out how do we get this set up now that we understand kind of how this model works on our

[05:32] computer. The best and easiest way to get started at first I recommend is going to be LM Studio because it has a really good user interface that makes it really easy to understand all these more

[05:41] complex things about RAM and so on. Everything is explained really well inside of here. So I would recommend downloading LM Studio. And once you have that downloaded, a really good place to

[05:50] find models is going to be HuggingFace. But the nice thing about LM Studio is they have their own model browser inside of it. Now when you first download LM Studio, it's probably going to look

[05:58] something like this on your screen. And you're not going to be able to do anything. when you try to click this up here to select a model. Yours is going to be blank because you don't have any

[06:04] models at all loaded on your computer. So, what you need to do is you need to go to this tab over here on the left where it's the actual model tab right here. If you click on that, it's going

[06:11] to open up a search for you where you can search for all the different models that you possibly could want. Now, if you know what model is a good fit for you, you can just immediately search for

[06:18] it here. So, for example, I know Quinn has relatively good coding related models. So, I can search for Quen and I can see kind of the most recent Quen models that are available right now. And

[06:27] you can see it tells me what the model name is. And that 27B, that's how many parameters there are. This one's 35B for 35 billion. And this one's 9B for 9 billion. And if you look over here on

[06:36] the right hand side, it actually tells me an estimate of how much space that's going to take up in my RAM of my actual graphics card. So you can see here, this Quen 3.6 model with 27 billion

[06:46] parameters is estimated to take up about 17.48 GB of RAM on my computer. Now, my graphics card doesn't have that much RAM, so it would have to overflow onto my normal system RAM. If you had more

[06:58] RAM than 17 whatever gigabytes, you could load the entire model. But if you take a look, we also have a 9 billion parameter version of a Quinn 3.5 model. And you can see that one is significantly smaller. It only takes

[07:09] 6.55 GB, which means I can load the entire thing on my graphics card, no problem. And generally the smaller the model, the less good it's going to be at just general task that you give it, but

[07:19] the faster it's going to run because you can load the entire thing in your graphics card. Ideally, if you can load the entire model on your graphics card, it is going to be way, way, way faster.

[07:28] But later in this video, I'm going to show you how you can get around that with certain models that are available. Another thing that's really important to understand is you'll notice there's

[07:34] multiple types of this model with this like Q4, Q6, Q8, and so on. This stands for quantization. Essentially what that means is they've taken the full large size of this model and they've

[07:45] essentially paired it down to be smaller by essentially rounding certain numbers that would normally be longer. They've rounded them to like whole numbers or smaller decimal place numbers.

[07:53] Essentially shrinking the size of the model. That does slightly decrease the performance that you get out of the model. But the benefit is you can see the size drastically decreases. You can

[08:02] see from Q8 to Q4 that's essentially having the size of the model. And a really good place to start is going to be models that are labeled as Q4. That's essentially four levels of quantization.

[08:12] 16 is like the base level. So four, that's 16 divided by four, that's essentially four levels of quantization from that base level 16 model. Now, another thing that's important when you're looking at models to try to

[08:23] download is to figure out what capabilities that model has. And these are going to be listed right here. If you're in LM Studio, you can see that this model has vision, tool use, and

[08:30] reasoning capability. Vision just means that it can process images. You can give it an image, and it can read that image and look at it. Tool use just means that it can call tools properly inside of

[08:39] like agentic coding workflows. And reasoning means that the model is a thinking model. And this generally means that it'll spend time thinking and working through things. Generally, it'll

[08:47] be a little bit slower, but it'll generally give you better output. And if you're doing agentic coding, you definitely want to make sure that tool use is enabled in your model. And

[08:54] generally, you want to have reasoning as well cuz it's going to give you much better output because it'll spend time thinking through what needs to be done, which is great for more complicated

[09:02] tasks. Unfortunately, these reasoning models generally tend to be larger, but that is okay because I can actually show you how you can get this to work a little quicker. So, essentially, once

[09:09] you found a model you want inside of LM Studio, you can just click on that model and you can click download and that's going to download that model in the background. And once you've done that,

[09:17] then you can go over to this third panel right here, which is where all of your different models are. And you can see all the models you have downloaded. Now, I have quite a few different models

[09:24] downloaded from various different testing purposes. But the ideal thing is to try to find a model that's going to be best suited for what you want to do inside your coding workflow and then try

[09:33] to find one that's small enough to fit within what you're trying to do. And if you don't see the models that you want inside this list right here, you can actually go to hugging face to find a

[09:41] much larger list of models. So here I am on the hugging face site. And one really nice thing that you can do is you can sort by trending. That'll generally give you some of the more popular models at

[09:49] the top. And if you want to make sure it has reasoning, you can just toggle this inference available and that'll only show you models that have that reasoning capability inside them. You can also

[09:57] fine-tune like how many parameters the model has. So you can hopefully get one that fits within your graphics card. But from here, this can help you find some of the more popular models or just

[10:05] googling and asking like, hey, what are some popular models for coding agents that are open source and local that'll give you really good ideas. Once you find a model that you want to work with,

[10:13] you're going to click on that model. And you can see over here where it says use this model. Click on that. And if you scroll down, you'll see the section at the very bottom that says browse

[10:20] quantizations. This is going to give you the smaller versions of those models because these are way too large to work with locally. So when you click on that, it's then going to give you a massive

[10:28] list of all the quantizations. Now, Unslo is really great at creating high performance quantizations that are small yet still quite powerful. So I generally recommend going with them. But really,

[10:38] whichever one is going to be at the top here is probably the best bet if you're sorting by trending. So if we click on that now if we scroll down you can see there's a massive list over here that

[10:46] essentially tells you the exact size of this model and how much quantization is done. So you can see here 16 bit that's just the raw as is no changes made at all. That's the full model. 8 bit is

[10:56] essentially half the size of the full model cuz we've done like one level of quantization and generally 4bit is kind of a good happy sweet spot. That's essentially that four levels of

[11:05] quantization that I talked about where it can shrink your model down drastically. But you can even sometimes get away with three bit or even two bit quantization for some of these larger

[11:13] models to make sure that they properly fit on your graphics card. Now let's say for example that I wanted to download this three-bit model. I could just click on this model and again there's this use

[11:20] this model button. Scroll down and you can find hopefully if you click view all maybe here it is LM Studio. Click on that and just say you want to open this in LM Studio and essentially what that's

[11:30] going to do is open up your LM Studio and it's going to give you a link to download that exact model. So let's just try that out. We'll click on that open LM Studio and you can see here

[11:38] immediately it's brought me to the page where I can click download and it'll download that model. So this is how you can fine-tune exactly what models you get access to inside your system. So

[11:46] then once you have a list of all your different models that you want available on here, that means they're downloaded on your computer, but they're currently not loaded up and able to be used. So

[11:54] let's talk about how we can make that model usable. We can just go into this chat window here and you can see at the top it says select a model to load. And from here I can choose any model I want.

[12:03] Now, I 100% recommend at the bottom here where it says manually choose model load parameters, toggle that on because that's going to allow you to fine-tune exactly the parameters of your model

[12:12] that you're choosing to be able to use. So, let's say that I wanted to use this model, GPT OSS 20 billion. This is a model that is quite large. It's got that 20 billion parameters. As you can see

[12:21] here, it's around 11 GB for the quantization that I have downloaded. And since I have 16 GB of RAM in my graphics card, I should be able to fit this entire model on my graphics card. So,

[12:31] when I click on this, you'll see I get a massive list of all these different options. This is what I talked about when I said that you wanted to have that enable advanced options. That's what

[12:39] gives you access to all these options. For the most part, I wouldn't worry about very many of them. Just make sure that this GPU offload, if you can fit the entire model on your graphics card,

[12:48] max this out to the very top. That just makes sure that the entire model loads on your graphics card and not on your CPU or system RAM. This is going to give you the most amount of speed possible.

[12:58] Next, you can modify your context lengths. And you'll notice as I increase this context length, this model up here for the total amount of space it takes up is going to increase as you can see.

[13:07] Now, this isn't 100% accurate. If I max out this context length, it's probably going to take up more space than I have on my graphics card. So, I'd recommend trying to set this in a good middle

[13:15] ground. Now, if you're just doing basic chat, you don't really need that big of a context. So, we can just leave it down here somewhere at like maybe 5 or 10,000. And then I can click that I want

[13:23] to load this model. So, just make sure that GPU offload is maxed out if you can fit it. And then set the context to somewhere that works for you. And you can play around with this however you

[13:31] need to make sure it fits within your computer. So when I click load model, that's going to load up the model. You can see that it's giving me that bar saying that the model is loading. And

[13:38] once it's finished loading, I can actually chat with this model. For example, I can come in here and say, "Hi, who are you?" And now it's going to hopefully respond to me. Of course, it doesn't look like it's responding.

[13:47] That's cuz sometimes when you start a new chat, you need to choose what model you want for that chat. So let's choose that one that we've already loaded. And now I can click this, send it along, and

[13:55] you can see it's responding incredibly quickly. 124 tokens per second. And that's because this entire model fits directly inside my graphics card. If I actually pull this over and I show you

[14:03] the stats for this, you can see this dedicated GPU memory. It's nearly maxed out. I essentially have as much model as I can loaded into my graphics card, but there's nothing spilling out. You can

[14:13] see, like I said, it's pretty much maxed out, which is kind of where you want to be. You want to be generally towards the top, but not entirely maxed out. Otherwise, as your context fills up,

[14:21] it'll spill over into your system memory, and that's going to slow you down drastically. So, with everything fitting in my graphics card, we have an incredibly quick model that's working

[14:29] and able to do whatever we want with it. And since this is a reasoning model with thinking capabilities, I can modify, for example, how much thinking I want the model to do for various responses. And

[14:37] you can see down here I get my full how much of my context is being used. Now, I want to show you what would happen if, for example, you load too much of a model that you can't actually fit on

[14:46] your entire graphics card. So, let's come back here. We can click this eject button that essentially unloads that model. And if we take a look at my system memory, you can see it's dropped

[14:54] back down to a normal level cuz this isn't being loaded at all. And now let's go ahead. We're going to select that exact same model, but I'm going to max out the context as large as possible.

[15:02] This is most likely going to overflow how much space I have available. So if we take a look at this chart, you'll see as it's loading, it's slowly increasing, and as it loads more, it's probably

[15:10] going to max me out. You can see here, I'm essentially maxed out. And my system memory, you can see, has made a huge spike because it's having to put a lot of additional information in that system

[15:19] memory. This is going to slow down the actual model. So if we say give me some more information, this is probably going to be much slower response. As you can see, it took longer to think. And you can see that the

[15:30] amount of tokens coming out are at a much much slower rate. And if I finally let this finish, you're going to see that the tokens per second is probably going to be somewhere like 20 or 30

[15:38] tokens per second instead of that 100 plus that we were getting on this one. So that's kind of the big difference between if you can fit it all in your graphics card or not. Ideally, you want

[15:46] to fit as much into your graphics card as you can because otherwise you're going to get rather slow responses. You can see this is still responding. I'll come back to you once it's done. So, as

[15:54] you can see, we got here about 24 tokens per second as opposed to that 120 plus tokens per second. So, a massive decrease in speed, about a six times decrease just because a small amount of

[16:05] the model had to go over to my system memory as opposed to directly on my graphics card. Now, this is a bit of a downside because it means we can only run smaller models and smaller models

[16:14] are not nearly as smart as the large massive models that you get with like Claude or Chat GPT. But I'm going to show you a little bit of a trick that we can do to load these larger models while

[16:23] still having relatively good performance and offloading a lot of it to our system RAM in our computer. So, what you want to do is you want to find a model that supports what's called MOE.

[16:34] Just stands for mixture of experts. And essentially, it's kind of a fancy way of saying that you have a really big model, but only parts of that model are going to be working at a particular time, and

[16:43] other parts are maybe not going to be working at a time. So that means that you can kind of put the really hardworking stuff on your graphics card and the less hardworking stuff on your

[16:51] system RAM. That's kind of a very highle overview, not 100% accurate, but that's kind of how you can think about it. And most of the time with these models, if we take a look at our models, they're

[16:59] going to be labeled something along the lines of whatever the model name is with the parameters. Actually, it's probably going to be easier to see from here. So you can see this model right here. It

[17:07] says 35 billion parameters and then it's got a second number A3B. That means there are three billion active parameters. So you're going to see these naming conventions where it's like a

[17:16] plus another number or it's going to be like 35x and then 25 or something. So the first number is how big the model is and the second number is going to be how many active parameters are. You can see

[17:27] some of the other models may have naming conventions like that. And this is very common something you're going to see inside of that hugging face model. And a way that you're going to know if you

[17:34] have this mixture of element or of experts model is when you choose one of those types of models in LM Studio, you'll actually see some options at the very bottom. And this option called

[17:43] number of layers for which to force weights onto the CPU. This essentially pushes those weights that are less important over to your normal computer. And it's going to keep the much more

[17:53] important stuff on your actual graphics card. For example, this model is quite large. You can see if I max out the context window of this, which I've done here. And if I try to keep the entire

[18:02] thing on my GPU by maxing out that GPU offload, you can see that this model is 26.63 GB. That's the estimated amount of space it's going to take up. Now, this is not nearly 100% accurate, but you can

[18:12] see it's going to take up a lot of space on my GPU because this is a very large model. But what I've done if I said that essentially I want to take 30 of those 40 layers that are these layers and I

[18:22] want to move them to the CPU. This means that I can use this model by keeping the really fast stuff loaded in my GPU while keeping the slower stuff loaded on the CPU. So if you're working with one of

[18:31] these models, what you want to do if possible is max out this GPU offload as much as possible. Set your context wherever you want. I've maxed mine out because this is like my agent coding

[18:41] workflow. So I want to have a larger context. But max out that GPU offload and then experiment with this number right here. See how low you can get it while still having good performance.

[18:50] Obviously, the lower the better because that means it's going to load all of it into your graphics card. But if your graphics card doesn't have enough space, slowly increase this until you find a

[18:58] good balance. And for me, that balance was about 3 to four. So 30 out of 40 was exactly what I want. And when I click load on this model, and if we take a look as that model is loading, you can

[19:07] see that it's bumping up. And while it said it was going to take like 20 something gigabytes, you can see instead it's actually just pretty much touching the maximum amount of space that I have

[19:14] inside my graphics card. I may even have it pushed a little bit too far. But you can see it's essentially touching that maximum point inside my graphics card. And this is going to give you the best

[19:23] performance possible while using these larger models. So let's go ahead and actually try to create a chat with this. So we're just going to create a chat that says, "Hi, who are you?" Click

[19:32] enter on that. And you can see it's not super super fast. It's still quite a bit slower, but this is light years faster than what we would get if we were to run this model directly all on the graphics

[19:42] card without this stuff. So, you can see here we got about 43 tokens per second, which like I said isn't blazing fast, but it's still quite good. If we were to now take this exact same model, let's

[19:52] just eject it to unload it. And now we try to reload that particular model. And what I want to do is I want to come down here and we're just going to change this. Bring it all the way down to zero.

[20:00] Essentially just running this and loading as much as possible into our graphics card. You'll probably immediately notice as this loads, my video is going to start lagging really bad because I'm maxing out my graphics

[20:09] card space as much as possible. You can see here it's touching the very very tippy top and it's just going to put more and more stuff in my system memory cuz it can't fit it all on my graphics

[20:18] card. And once this is loaded, we'll see that it is way way slower than what we had before. So, it's still trying to load because there's so much stuff that it's having a hard time fitting it on my

[20:26] computer. And let's just get our message typed out. give me a brief sentence of what this is about. Let's actually change that to paragraph. There we go. And now it just finished loading. And you can see it's going to

[20:41] be much much slower. So it's processing the prompt. And you can see here like it is painfully slow. I mean this is maybe like one token per second generously. So very very very slow. And that's the

[20:52] difference between that. Essentially, we're taking the less important stuff, offloading it off the graphics card, and keeping the really important stuff on the graphics card. That's the entire

[21:00] thing behind that section. Let's just stop this as this is taking forever. And I'm going to unload this so that my graphics card doesn't have to work so hard. So, that's everything related to

[21:09] setting up essentially the chat portion of our models and loading the models on our computer, which is going to be really useful for when we want to set up autocomplete and agentic workflows.

[21:17] These models are the best possible models for trying to get the most amount of power out of the least amount of hardware. And you don't need super super powerful hardware to run all these

[21:26] models. The ones I've been showing you right now have been some of the larger models. But you can see like this model right here only takes up 1 GBTE of space for your VRAM. And any graphics card,

[21:35] even incredibly old ones, are going to be able to run a model like this one. So if you have more limited hardware, you just have to scale down what particular models you choose. But if you have

[21:44] access to some of these models at a high quantization, which again reduces the size while also slightly reducing the quality of the model, that means you can actually run some decently large models

[21:54] on even relatively lackluster hardware. Now, most often you're probably not going to be interacting in a chatbased way. If you are, everything works pretty easily. But what you want to do is you

[22:03] want to set up autocomplete and you want to set up agent decoding. Those are the things that you care about the most. So to do that, if you see this little developer button right here, this is

[22:10] where we can actually load up models to use directly inside of other programs on our computer. And if you don't see this developer tab, that means that you needed to make sure when you installed

[22:19] LM Studio, you clicked like the show developer settings. So if you don't see this, just go down to your settings here and where it says developer, just make sure to toggle that developer mode on.

[22:27] So you should be able to see all these different developer settings. Now, this is where we can actually load multiple models onto our computer. Right now, there are no models being loaded, but if

[22:34] I wanted to load a model, I could just click load model here. I could choose one of those models, like that 3.6 model that we were just looking at. Again, make sure everything is set up like I

[22:43] want it to be. And I can just again make sure it's all set up. I have this remember settings. So, it's just saving exactly what I used for all my other times. I can click load model, and

[22:51] that's going to load that entire model directly onto my computer, but it's not being used for anything yet, but it is taking up space on my computer. And I can actually load multiple models if I

[22:59] want. I'm going to be loading a second model, which is this very small model right here. This 940 megabyte model. I'm going to be loading that one as well. Again, keeping all these default

[23:08] settings that I have, making sure that it's all on my GPU. So, there we go. And give that a quick load button right there. So, that's going to load up that full model as well. Now, if we take a

[23:18] look, that's essentially maxed out my entire GPU memory. And that's mostly because I'm also recording video. You may also see some stuttering in the video because I'm trying to record video

[23:26] and do all this AI stuff. So, what I'm actually going to do is I'm going to take this Gwen model right here, this larger one. I'm just going to scale back this context pretty heavily. So, let's

[23:34] say that we want our context to be 71,000 instead. I can use that scroll bar on the side over here. And if I just hide my camera real quick so you can see the button below, I can just click this

[23:43] button called reload. That's going to reload my model with all these new configurations set inside of it. So, now it's going to have a smaller context window, which should hopefully mean that

[23:51] it's going to be able to take up less space on my GPU, which means that my video hopefully won't be so laggy for you. Again, that's because I'm doing video editing or video recording at the

[23:59] same time I'm trying to do this. And generally, you obviously wouldn't be doing that. So, you would get even better results that I'm getting if you have the exact same or similar hardware.

[24:06] And again, just to show that working, if we come over here, you can see that again the amount of GPU memory is much lower than it was before because of the fact that I reduced that context size.

[24:14] So, the larger your context is, the more memory it takes up. And sometimes it can drastically increase the size of your model. Sometimes even doubling what the size of your model is just by increasing

[24:22] that context too far. Now, the only last thing that we need to do is just make sure up here where it says status running, make sure that's checked. If this is unchecked, it means your server

[24:29] is not running. So, just make sure your server is running. So, the other programs you want to interact with are able to actually reach this particular program. And you want to make sure you

[24:36] have this URL handy right here. This is the URL that this is going to connect to. And if we actually look down here, you can see we have all the different like OpenAI compatible endpoints, which

[24:44] means anything that works with OpenAI is going to work perfectly fine with LM Studio. And everything I'm going to show you works perfectly with LM Studio and these API endpoints right here. Now, I'm

[24:53] going to show you how to set this up inside of VS Code for the autocomplete as well as the agentic mode. And then I'm also going to show you how to set this up in the terminal with PI as well.

[25:01] And the nice thing is is once you understand how all this connects, it doesn't matter what you decide to hook up. It's all going to work pretty much exactly the same way. It just might have

[25:09] slightly different configuration names, but all the important data is going to be the same. So, continue is an extension inside of VS Code. Just make sure that you install this extension,

[25:17] and it's going to allow you to use AI agents inside of VS Code. And I'm also going to show you how to use the built-in GitHub copilot portion of a this to use your AI as well. But if you

[25:26] want autocomplete, continue is the only way to get that. There are other extensions that do the same, but I found that this one works quite well. Then what you want to do is you want to click

[25:34] on this section that says continue in your sidebar. And you can see here we now have access to all of our model stuff. Mine is already configured, but I'm going to show you how to configure

[25:41] it yourself. So you can see this settings icon right here. That's going to open up your settings section. And this is where you can toggle around and play around with some default settings.

[25:49] So you can scroll through all your different user settings for like font size and so on. For the most part, I don't want to mess around with this too much, but I'm going to show you the

[25:56] things that are the most important to set up with your autocomplete. So the first thing when it comes to autocomplete, I would recommend making this autocomplete timeout quite a bit

[26:03] longer than the default. I have mine set to 1,000 milliseconds, which is 1 second. This is just because sometimes there's a little bit of a delay between your autocomplete finishing and when it

[26:10] gets to continue. It's not actually going to be super delayed, like a whole second. It'll still be relatively instantaneous, but this just makes sure that it most of the time works properly.

[26:18] Also, this debounce you can set to whatever you want. Essentially, that means that after you stop typing, it's going to wait 100 milliseconds before it tries to do anything. You can change it

[26:26] to 50 or you can change it higher depending on what you want for your particular use case. This is just how quickly that autocomplete kicks in. Once you have that, the next thing that we

[26:34] need to make sure we have set up, this is going to be more for agentic use cases, but I want to mention it because we're in the settings, is in this tools section. Make sure that all the tools

[26:41] you want your agent to be able to use are set to automatic. For example, reading a file, creating a file, these things should pretty much all be set to automatic. You can see there's very few

[26:49] things I have set to ask first. So, for example, running a terminal command, I have that set to ask first because I don't want it to do that automatically. Creating rules, I have set to excluded.

[26:57] Fetching URLs, I have set to ask first. request rule I set to excluded, but everything else is set to automatic. That just means that it's going to work properly. By default, things like edit

[27:06] and create file is set to ask first, and if you want to work in an agentic workflow, that just doesn't work well. So, setting it to automatic is a great way to do that. Now, next, you can see

[27:14] this model section. Yours is probably going to have some default models or it's going to have some blank stuff inside of here that's just going to say like, hey, set up this particular model.

[27:22] Mine's already set up, but I'm going to show you how you can go through the setup process. First, you can just click on this plus icon right here to add a new model. Click on the provider that

[27:29] you want. In our case, we're using LM Studio. So, we'll just search for LM Studio. There we go. You can click on that and then it's going to make sure that you install it. And then here is

[27:37] where we can select what model we have. Now, unfortunately, it's not going to work super great with some of the models you download like Hugging Face and so on. For example, if I try to search for Quen 3.6,

[27:50] you can see there's nothing that even shows up for this Quen 3.6. So, it's just not working super great. But the nice thing is you can just choose a model. Doesn't matter what it is. So,

[27:57] let's say we're going to choose this Quinn one right here. You can click connect and then it's going to open up your configuration file for you to actually work with. So, let's zoom this

[28:04] out so it's a little bit easier to see. It's going to give you all this default configuration and yours is going to include that one model that you just created. But what we want to do is we

[28:12] want to be able to add all of our own. So, you can see down here that's the model that was automatically created. And all these other ones are ones that I have set up myself. We'll just comment

[28:19] them out for now so we can show you how to set them up. So, the first thing that you want to do is you want to set up autocomplete. So, to do that, we can come into here. We can specify the name

[28:26] of our model. And the name of your model is whatever you want. This is just the name you give it. So you can just call it autocomplete if you want. And it's as simple as that. Next, what we want to do

[28:34] is we want to specify the provider. The provider is going to be LM Studio. You can see that's what it is here. That's just because that's where it's coming from. We're coming from LM Studio. So

[28:42] that's where we set the provider. Our model. That is the name of our model directly from LM Studio. So if we open LM Studio up, you can see where our model is. You can see it has a name right here. If we click this copy

[28:53] button, it'll actually copy the name of our model. And we're using this Quen 2.5 coder 1.5 billion model for our autocomplete. And that's because generally you want a very small model

[29:02] for your autocomplete. You can see this one's only 1 GB. And that's because the smaller the model, the quicker it's going to work. And we want an incredibly quick model for autocomplete. Otherwise,

[29:10] it just won't feel great. And this is a great option. Again, if you have a more powerful computer, you can use a larger model for this because your computer is going to be able to handle it better.

[29:17] But I wanted a relatively small model while my agentic model is taking up most of my GPU. So again, copy over whatever that model name is directly. Don't modify it at all. And then finally, we

[29:27] have the API base. Again, if we go back into here, you can see our URL right here. And all of these are at the /v1 URL. So we can just copy over that exact URL, add /v1 to the end of it, and

[29:40] that's going to give us the exact model URLs that we want. And now we can use this model anywhere that we want. But to make sure it works with autocomplete, we need to set the role. So here we can

[29:49] specify our roles as an array. This is just a YAML file. And if you come in here with autocomplete all one word, that's going to set this model up as your autocomplete model. So now what we

[29:58] can do is go back into that continue extension. And you can see here in this autocomplete section, that's the model right there we labeled as having autocomplete capabilities. It's just

[30:07] matching this name right here, whatever we set there. Now you can see it's showing up right here as our autocomplete list. And now if we try to modify some code, we should hopefully be

[30:14] able to get some autocomplete responses. So if we come into here and let's just say I type in some random code, you can see it doesn't quite look like it's working. To give it a little bit of a

[30:24] nudge, we can hold down Ctrl Alt Space and that's going to force it to do autocomplete. You can see now we finally got an autocomplete. Sometimes it's a little bit buggy where it doesn't quite

[30:32] show up right away, but other times it works pretty much right away exactly like you would want it to. So let's just try to come down here and see what the autocomplete gives us. You can see it's

[30:40] starting to give us different information. And if we start typing, you can see it's giving us more information as well. We can also see this working inside of our LM Studio as well. So,

[30:47] I've just gone ahead and put LM Studio over here. And if we clear out our developer logs, we can actually see these being directly called to our API. So, if we just start typing something

[30:55] out, you can see immediately it's giving calls out to here. It's generating all that information as quickly as possible and it's sending it over to VS Code where it's being used. And again, you

[31:03] can see that I'm getting that exact information. I can click tab to autocomplete this and it's going to fill out all that information. So, this is really useful that it has this ability. And if you don't have it working

[31:12] properly, you can always check these developer logs and see if there's any errors or anything going on inside of there because that's going to tell you if something's going on. Also, if we

[31:19] expand this, so the logs are a little easier to see. You can actually see exactly how long things are taking. So, here the total time was 259 milliseconds. If this is taking like 2 3 seconds, that may be why it's not

[31:30] showing up because your timeout is set to 1,000 milliseconds and your total time is taking 3,000 milliseconds, it's never going to show up. So you most likely in that case need to choose a

[31:39] smaller model that's going to be able to run quicker on your computer because again you want autocomplete to be relatively quick. Now that we have autocomplete set up, the next thing that

[31:46] I want to focus on is how do we actually set up the chat mode as well as the mode for our different agentic coding that we want to work on. So in that exact same configuration file, we can modify what

[31:56] we want to do up here. So in our case, I'm just going to copy what I had before and show you exactly what it looks like. And then I'll just tell you what every single line of it means because that'll

[32:05] be a little bit easier than just watching me manually type it out. So again, name doesn't matter what you call it. It is whatever you want. Provider is going to be LM Studio. This model name

[32:14] again comes directly from LM Studio. Just copy that over. API base is exactly the same for all of them. The only thing you need to do for the one that is going to be handling all of your different

[32:23] agentic workflow is to make sure that if it has toolbased usage, set the capabilities to tool use. And if it has vision so it can see things, set the capabilities to image input. Now,

[32:33] there's other configurations you can do. If I actually pull over the documentation, you can see there's other things that I configure inside of here, and you can modify those as you want.

[32:41] But this is kind of the base level to get you started with working with this. And just make sure where you have chat that it's going to be using this exact model that you set up. So, make sure I

[32:49] save that. And now inside of here, I can select that for chat as well as for edit. I'm going to come down here where it says apply and select that model as well. Now, that original default model

[32:58] that it gave us, we can delete that so it doesn't accidentally use that model for anything. And now we've set up essentially our autocomplete model and our agent/ chatbased model. With that

[33:06] done, we've essentially set up continue exactly like we want. Now, if we go back here, you can see we can choose our model that we want to use. And since this one doesn't have a chatbased role,

[33:14] it doesn't even show up in the list. And now, I can do whatever I want. For example, if I'm in agent mode, it's going to be able to use all of my different tools that are associated with

[33:22] it. Chat mode can't use any tools at all. But if I wanted, I could just come into chat mode, click hi, and it's going to generate this data for me. It's going to go through think on everything that

[33:30] it needs to do. You can see here it's doing a bunch of different stuff based on different system prompts that I have set up, and it's giving me back a response. Or I can change into agent

[33:37] mode and I can make it do something inside of my project. For example, let's make it do something really simple. I can say create a file called test.ts that just has console.log test in it. There we go. Let's just go

[33:52] ahead and see if it can do that. And again, if we looked at our LM Studio, we would see that inside of there, it's showing all the different API outputs that are being given to this. So, you

[34:01] can make sure that everything is working exactly as you expect. And there we go. You can see that this test file has been created. If I come over here, you can see there's that test.ts file and it's

[34:09] given me everything that I want inside of it. So, it is working and hooked up and able to modify and edit the code inside my project. Now, I find that this continue section for doing the agentic

[34:17] coding is fine, but it seems to be a little bit buggier and not always work like I want it to. So instead, I'm going to show you how to set up inside of GitHub Copilot as well. But to do that,

[34:25] you need to make sure you have the insider version of VS Code installed. Essentially, that's like the beta version. And then I can show you how to set it up in here cuz it's currently

[34:33] only available in the beta version. By the time this video comes out, it may be available on all the different versions, but right now it's only inside the beta version. So let's just expand this over.

[34:41] This is that chat window for Copilot. You don't even need a Copilot subscription to use this because what we can do is we can set up a local model. So, this model drop down right here,

[34:50] this is where you want to select that. And right here, there's going to be this gear icon. Click on that and it's going to open up a section where you can configure your models. You can see

[34:57] here's all the ones that are inside of Copilot that I have included with my subscription, but you can also see here are some that I set up. And to set these up, you click add models and choose Open

[35:05] AI compatible. Then you can call this whatever you want. We're just going to call this LM Studio. Doesn't matter. And then from here, enter a value for your API key. Put whatever you want. It

[35:14] doesn't matter. I'm just going to put key because there is no API key since this is a free model on my computer. And then what that's going to do is it's going to open up right here, if I just

[35:22] close all this out, a section that's going to have a name, whatever we called it, LM Studio. The vendor is going to be automatically set up for us. API key is again something we don't care about. It

[35:31] doesn't matter. Doesn't really care. And then finally, we have a section for all of our different models right here. And this is where we configure what our models look like. Now, I have already

[35:39] set this up myself. So, you can see here is an example of some of the different models I've set up. The ID that is whatever comes directly from your LM Studio. So you copy that from LM Studio

[35:48] just like we did before. Name is whatever you want it to be. This is your human readable name that shows up. The URL right here is just going to be your exact URL just like this. No other

[35:58] changes needed. And then you can specify what this thing has for capabilities. So if it can call tools set tool true. If it has vision set that to true. And then you can specify your maximum input

[36:07] tokens and your maximum output tokens. Now, for the maximum input tokens, copy that directly from LM Studio. So, inside of LM Studio, there's the URL up here that we talked about. But if you wanted

[36:17] to get those tokens, all you need to do is click on your model and over here, wherever your context length is, make sure you just copy whatever you have that set to and then paste that down

[36:25] directly into here for your model. So, in our case, I'm going to copy this entire thing. I'm going to paste this model down right here because this is the model we're using. This is the exact

[36:34] name from here. This is the name I'm giving it as like an extra name. We'll just call this Quen 3.6 six for testing purposes. And you can see here that maximum input tokens is exactly that

[36:43] input token from my page. That way it knows how many different tokens and so on it has inside the context. Now once you have that all set up, you now can use your model directly inside of your

[36:53] agent. So we can click on this and now from this dropown I can just go to other models or you can see it's actually listed right here. I can click actually is that the right one? No, that's not

[37:01] the right one. The correct one actually the correct one is not showing up. That's because when you change that model file, you just need to make sure that you developer reload window. So

[37:09] that's going to reload your window. You could also just close VS Code, reopen it. And now when I open this up and I click on other models, I should at the very bottom see all my models. And the

[37:17] one I just added was this 3.6 name. Just like that. So when I click on this, that's going to give me all of my model information. And I can do whatever I want. For example, I could just type in

[37:26] hi, click enter, and that's going to go through and do some thinking related stuff. Oftent times these agentic tasks are going to take quite a bit longer because they send along a very long

[37:35] system prompt. So it takes a long time to process that system prompt which gets added to the front of essentially every single request you can make. So that's why you can see that this took a little

[37:43] bit longer to get started. But you can see it's using Gwen 3.6 as my model which is that local model that I set up. Now this I find is a much better experience for the most part than that

[37:52] continue extension. But the downside, at least currently the way that this is set up is that you cannot actually use this model without being connected to the internet because it still communicates

[38:01] with GitHub when you use anything through their GitHub copilot related stuff. So that's why I want to show you how you can set this up with something like Pi or you could do like Open Code

[38:09] or things like that with these agent harnesses that are going to be much better for running your code in a terminal based interface which I think actually works really well for this type

[38:17] of coding. So to get started with Pi, you can just go to pi.dev, dev. Scroll down and you're going to see a command that you can copy and that's going to install this pi command for you. It's

[38:25] going to work perfectly. And then what we can do inside of your terminal, you can just run pi just like that. And that's going to open up your pi command just like this. Now, if you have like

[38:33] certain skills and stuff installed, those are going to show up. But what you care about is models. So, if you type in /model just like this, this is going to be where you can select all of your

[38:40] different models that you want to be able to use. But in our case, we won't have any. Like when you first install this, this list is going to be completely blank for you. even though mine has some because I've already

[38:49] installed them. Now, in order to modify what our models are going to look like, we need to go to the file where they are stored. And if we look inside of the page here for the documentation of PI,

[38:57] you can see that they are stored at this particular location. It may be slightly different depending on what your operating system is, but this is the location where our models file is going

[39:05] to be stored. And then what we can do is we can just open up that models file by searching for that here in VS Code. And now you can see here I have all my different model related stuff. Now, in

[39:14] our case, to set up our very first model, you can see the key here is going to be whatever we want to be the name of our model. In our case, this is LM Studio where everything's coming from.

[39:21] So, we're going to specify LM Studio as our provider. Our base URL is that exact same URL we've used for everything. Just make sure it has /v1 at the end of it. And for the API, set it to open AI

[39:32] completions. That's going to be the one that's going to work for your agentbased mode. Again, that's all coming from LM Studio. API key could be anything you want because it doesn't actually need

[39:40] one. And then finally here we have an array with all of our different models that we want to use. Now in our case, let's take a look at the models in depth. You can see ID. This is just

[39:48] going to be the ID copied directly from LM Studio. Your context window is going to be again directly from LM Studio. Copy that over and paste it in. And then if you have a model that is a reasoning

[39:58] model, set reasoning to true. And if it can take in images, make sure your input is set to text and image just like this. That's going to make sure that it can do reasoning as well as text and image

[40:08] based manipulation. And you can set up as many different models as you want. For example, this one does not have reasoning capabilities. And this one down here, I have nothing else set up

[40:15] because it's just a very small model. But for the most part, this is the model that I'm going to be using for all my agentic workflows. Once you have that set up, you can ask it to do whatever

[40:23] you want. For example, you can say describe this codebase. And now it's going to go through and it's going to do all of that for me. Down here, you can see my exact context window that's being used and

[40:33] everything else. And this since we're using a larger model on a system that's a little bit underpowered for some of these larger models, it's not going to be blazingly fast. For example, if I

[40:41] were to use like Cloud Sonnet, it's going to be faster than it's going to be if I use this local model. And the Cloud model is probably going to be slightly better, but this is going to be much

[40:50] better at running locally completely for free offline. It's got a lot of benefits to it. Just to give a little bit of a comparison here, this is actually a Suduku app that I had it generate

[40:59] entirely vibecoded. And if we just pull over what the Suduku app actually looks like, you can see this is the output that came from that Quen 3.6 model that we loaded up. I just gave it a quick

[41:07] prompt that said, "Hey, create me a Suduku app that has pencil marking inside of it, easy, medium, and hard, as well as a solution checker for me." And you can see here it has all of that. I

[41:16] have the ability to do different pencil marking in the corners. I have the ability to type in whatever number that I want. And it's going to do error checking. So, if I were to like put a

[41:23] six here, you can see it's showing me all of my different errors. And I can even just click show solution to see the solution. or I can just press the hint button a bunch of times to give me a

[41:30] hint for what the next numbers need to be. So, this is a great essentially example of what can be done with a single oneshot prompt. And to generate this, it took about 9 minutes on my

[41:39] hardware. Now, if you have more powerful hardware, it'll be much quicker. If you have less powerful, it'll be much slower. But this is essentially 9 minutes of work. And I gave the exact

[41:47] same prompt to the Sonnet 4.6 model. And it also took around 9 minutes to do the exact same thing. And I'm going to show you the output from that one. Now, here is the exact one that Sonnet produced.

[41:57] So you can see here very similar. It's got kind of the same features. For example, it's got some different error checking and so on. Like if I click check, it's going to tell me where my

[42:04] different errors are. I can generate easy, medium, and hard. And this one actually did like center pencil marking, which is something I asked for that the other one didn't give me. But you can

[42:12] see the results are relatively comparable. And this Claude sonnet version also took the exact same time to generate as the coin version just because it did more thinking. So it spent more time thinking, but overall it

[42:22] gave me the exact same time for the actual output. Now, when I tested these models inside of a codebase for doing bug fixes, that's when you notice the biggest time difference between them.

[42:31] Now, here's an example of the app that I had to fix a bug in. So, this is a really simple video editor that I vibe coded for editing shorts a lot quicker because I just want to like cut out the

[42:40] beginning and ends of video clips. But, you can see inside of this one, I essentially have the ability to kind of drag around where this is going to be cropped and so on. And I have the

[42:47] ability to play the audio that's the full audio. So, it includes all the stuff that's cropped out or just the cropped out section. And there was a bug in my code where this very first scene,

[42:55] didn't matter what I toggled on this button, it would play the full audio clip from the beginning no matter what. I gave the exact same prompt to both the Claude Sonnet 4.6 model and the local

[43:05] Quinn model and I said to fix this bug. They both fixed it in exactly the same way. The code was literally identical between the two cuz it was a relatively small change that needed to be made. But

[43:13] it's a large codebase. I mean, this is a full video editor. It's a rather large codebase to do all this code, but it took a little bit longer in the Quen model than the Sonnet model. Sonnet

[43:21] model took about 45 seconds to fix the bug while the Quen model took about 2 and 1/2 minutes. So a pretty significant difference in time, but that was because it spent a lot of time reading through

[43:30] all the code. And that's where the slower model is going to struggle more versus the larger model that can read through that much quicker. Now again, it doesn't matter what type of hardware

[43:38] you're using. Whether you're using incredibly fast hardware or you're using relatively older and slower hardware, you're going to be able to find a model that you can use on your own. And based

[43:45] on the different parameters and things that I talked about, you can fine-tune that model to fit exactly in the parameters that you have for your hardware. Now, with how expensive these

[43:52] different cloud models are, it's going to be more and more important that you actually understand how to set up your own local models, which is what this video is about. So, you don't need to

[43:59] constantly watch a new tutorial every month when a new model comes out. You know, the skills to be able to set this up on your own. And if you're worried about the cost of actually getting into

[44:07] this, again, a lot of this with these smaller lower-end models will work on your lower-end hardware. And if you already are subscribed to maybe a Claude plan for $100 or $200 a month, you could

[44:16] just cancel that plan for a couple months and have enough money to buy some really beefy hardware that's better than what I'm currently using cuz my hardware is meant for video editing and not for

[44:24] AI. So you can buy AI focused hardware, which is much more powerful for much, much less money than what I pay for my hardware. Now, I really hope you enjoyed this AI focused video. If you want to

[44:33] see more AI videos from me, please let me know down in the comments what kind of AI topics you want me to cover, cuz I don't just want to be talking about like new models and things like that. I

[44:41] actually want to give you tutorials with real knowledge that are actually going to help you as a developer and not just hype up random different AI related things. So, please let me know in the

[44:48] comments what kind of AI related stuff you'd want to see or even non AI related stuff. I just want to know what you would want to see from me. With that said, thank you very much for watching and have a good
:::
- Transcript: [[My COMPLETE Agentic Coding Workflow to Build Anything (No Fluff or Overengineering)]] — source: https://youtu.be/goOZSXmrYQ4?si=Y76KHbJyFjkYGcAh
