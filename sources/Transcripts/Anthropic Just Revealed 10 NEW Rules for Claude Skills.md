---
title: "Anthropic Just Revealed 10 NEW Rules for Claude Skills"
youtube_url: "https://youtu.be/VQyYzLJ6xos?si=byCBh7uAVLXqVRRO"
channel: "Jay E | RoboNuggets"
date_published: "2026-10-05"
duration_seconds: 735
thumbnail: "https://i.ytimg.com/vi_webp/VQyYzLJ6xos/maxresdefault.webp"
platform: "youtube"
language: "en"
transcript_engine: "supadata"
date_transcribed: "2026-10-05T20:34:57.751Z"
---

# Anthropic Just Revealed 10 NEW Rules for Claude Skills

## Summary: 10 New Rules for Agent Skills

> [!note] Secondhand source
> This is a YouTuber's (RoboNuggets) reading of Anthropic's updated skills guide, published alongside the Claude 5.5 models. Specific claims, especially the "first 100 lines" preview behavior, should be checked against Anthropic's guide itself before we build on them.

**The premise:** the 5.5 models are smarter and more creative, so skills written for older models are often too prescriptive and make output worse. At the same time, long or deeply nested skills may only be partly read.

1. **Progressive disclosure, one level deep.** Keep `SKILL.md` under 500 lines and treat it as a contents page that links straight to supporting files (pricing, clients, scripts). Claude opens a file only at the step that needs it. Avoid chains (`SKILL.md` → file B → file C): with nested references, Claude may only *preview* the deeper file, reading roughly its first 100 lines.
2. **Content lists on long files.** Any file over 100 lines gets a short table of contents at the top, so even a partial read tells Claude what's further down and where to jump.
3. **Set the degrees of freedom per step.** *High*: plain instructions, for open tasks like brainstorming. *Medium*: a template with some settings, for shaped output like a weekly report. *Low*: an exact script, for risky work like invoices or tax documents. One skill can mix all three: write the email freely, generate the invoice by script.
4. **Test on the models you'll actually use.** One question per tier. **Haiku:** is there enough guidance? **Sonnet:** is it clear and efficient? **Opus and Fable:** does it avoid over-explaining? Old skills may need *less* instruction now, and a prescriptive skill may run fine on a cheaper model. Testing everywhere is expensive, so prioritize the skills you rely on most and the ones where mistakes cost the most.
5. **Write only what Claude can't work out.** Anthropic calls the context window a public good. Skip explaining what an invoice is; include your prices, terms, and internal rules. Write the `description` in **third person** ("Creates client invoices and sends payment reminders", not "I can help you with…"), since that's the text Claude reads when choosing a skill.
6. **Workflows and checklists.** For multi-step jobs, give an explicit checklist Claude copies into its reply and ticks off as it goes. 5.5 models have been seen skipping steps. Add **go-back lines** ("if any total doesn't match the job list, go back to step 2") so a ticked box can't wave through a wrong result.
7. **Feedback loops.** Run, check, fix, and repeat until the output passes. This isn't only for code. Anthropic's example is a style guide: draft, review against a short checklist (consistent terminology, examples in the standard format, required sections present), note each failure against the rule it breaks, revise, and finish only when everything passes.
8. **Three patterns for defined output.** **Templates**, either strict or a sensible default the model can adapt. **Examples**, as input → output pairs, which show style and detail better than description does. **Conditional workflows**, a fork that tells Claude which steps to follow under which conditions.
9. **Build to be shared.** Don't assume a teammate has your tools installed. Name the exact packages the skill uses, and include install steps for when they're missing.
10. **Move must-never-break rules into hooks.** A rule in capital letters is followed *most* of the time. A hook is code that runs at a set moment (before a command, before sending) whether or not Claude follows the skill. A hook can be declared inside the skill itself: Anthropic's example is a "secure operations" skill whose hook runs a security check before every command, and stays active for the rest of the session once the skill is used. Pick the few rules where one mistake would really cost you, and check whether each can become a hook.

**Also mentioned:** an audit prompt that checks every skill against these rules (in the creator's paywalled PDF), and his "skill-creator-plus". He notes Anthropic's bundled `skill-creator` skill was last updated in March 2026.

## Transcript

> Get the 10 Skill Rules PDF guide + skill-creator-plus for free ➡ https://www.skool.com/robonuggets-free/classroom/750914f0?md=66ba31d1700544a8842eefa1f670caa1 search for n80 Learn how to build AI businesses 🚀https://www.skool.com/robonuggets  Get RUBRIC - The Command Centre for AI Agents: https://www.getrubric.app/  ***   Our AI Partner Tools (affiliate revenue go to community perks): 🥚 Free trial of Blotato: https://blotato.com/?ref=robonuggets 🥚 Free trial of n8n: https://n8n.partnerlinks.io/o3jqtj032c02 🥚 Free trial of Make https://www.make.com/en/register?pc=robonuggets 🥚 Free trial of ElevenLabs: https://try.elevenlabs.io/m5mn2jkv5rzk 🥚 Free credits at Apify:  https://www.apify.com?fpr=sffv1  --- About Me 👋🏻  Hey thanks for watching! I'm Jay - spent my career in data and brand building, founded the ROBO Group to help forward-looking businesses grow with AI, and now teaching what I know through this channel and the RoboNuggets community.  If you learned something new and want to see more, support the channel by subscribing: https://www.youtube.com/@RoboNuggets  Follow on other platforms 🔻 ➗ Instagram: https://www.instagram.com/robonuggets ➖ Tiktok: https://www.tiktok.com/@robonuggets ✖️ Twitter/X:  https://www.twitter.com/robonuggets ➕ LinkedIn: https://www.linkedin.com/in/j-enri/  For business, reach out at https://robolabs.so  Leave me a comment if you have a specific request! Thanks. - Jay  ---  Timestamps 00:00 - Intro 00:49 - Rule 1 02:08 - Free guide: audit every skill 02:55 - Rule 2 03:37 - Rule 3 05:02 - Rule 4 06:13 - Rule 5 07:01 - Rule 6 07:48 - Rule 7 08:34 - Rule 8 09:31 - Rule 9 10:21 - Rule 10 11:27 - Wrap up  #ClaudeCode #ClaudeSkills #Anthropic #Claude #AgentSkills #AIAgents #AgenticAI #AIAutomation #ContextEngineering #PromptEngineering #AITools #AIWorkflow #AutonomousAgents #VibeCoding #ClaudeAI

[Watch or listen at the source](https://youtu.be/VQyYzLJ6xos?si=byCBh7uAVLXqVRRO)

:::transcript
[00:00] Claude's 5.5 models are here and the way we build and use skills apparently need to change with them because Entropic just updated their official comprehensive guide for skills and it

[00:10] seems like a lot of what worked before is now either slowing you down or costing you more. For example, did you know that if you have a long skill file, Claude may only read the first 100 lines

[00:19] of that file depending on how you structure it. So if your most important guidelines are sitting further down in that skill, as far as Claude's concerned, they may as well not exist.

[00:28] So, I read through Entropic's new skills guide fully, and today we'll go through every new rule along with several examples. And I'll also share with you a prompt that audits all of your skills

[00:36] against these rules and improves them in one go. And if you're new, my name is Jay. I spent over a decade working with brands you probably know, have been in AI since my masters in data science, and

[00:45] now I'm leading our AI business and one of the largest AI communities globally. The first one is around new rules for progressive disclosure. As per entropic's guide, it is best practice to

[00:55] keep your main skill.md file under 500 lines and everything else gets split into its own files which are linked straight from your skill.md. Entropic calls this progressive disclosure which

[01:07] basically means that claude only loads what it needs when it needs it. So the main skill.md works like a contents page and claude only opens the other files at the step that actually needs them. So

[01:18] take a skill for invoices for example. The main file has the steps and next to it we've got a pricing file, a client's file, and a scripts folder. When Claude is raising an invoice, it opens only the

[01:30] pricing file and the scripts file would never get loaded, saving you some tokens. Now, here's the catch. If the main file points to a second file, and that second file points to a third, so

[01:40] multiple nested references, basically, Cloud might actually only preview the third one, specifically just the first 100 lines. Entropic themselves mentioned this as a behavior that the new cloud

[01:50] models have. So what you should do as best practice is to just have your skills only be one level deep if you can. And if you do need to have multiple nested references, then that's something

[02:00] we'll go through in rule number two. But if you do want to do a simple audit of your mostus skills as per this rule, here's a prompt that can get you started. And by the way, I put every one

[02:09] of these resources and prompts into a free PDF guide, which you can just send straight to your AI agent, and it will audit all of your skills against every rule and tell you what it would change

[02:18] before it does it. You can just grab that in the description below if you need it. And by the way, if you want to learn how to build and sell AI systems that businesses actually pay for, then

[02:26] that's pretty much all we do over at the Robbernuggets community, where not only do you get access to the Claude Living Master Class, which we update every week and takes you from zero to mastery with

[02:35] the latest on AI, but you also get access to our agents as a service course, which walks you through how to actually get paid for all these AI skills that you are learning. You also get to be part of a genuinely great

[02:45] community of AI builders. In fact, you can see just some of the recent wins our members are getting from the program right here. So if you want to start earning from AI then check that just in

[02:53] the pin comment below. Now back to the video. Rule number two are content lists. So any file over 100 lines would need a short content list at the very top of it which is sort of like a table

[03:04] of contents that tells the agent what's inside before it spends your tokens reading the whole thing. And this is related to the previous point where for some files only the first 100 lines get

[03:15] read. And so for these instances even when it's only previewing it, it can actually jump to the section it needs. if you have table of contents up at the top. So, for example, here's that

[03:24] pricing file that we were viewing once again. And at the very top, it lists the contents of what's within. Once Claude sees that, it now knows that the information for discounts, for example,

[03:34] is down at the bottom, even if it only previewed the first 100 lines. Rule three is around degrees of freedom. The principle for this rule is basically where a step or a task is risky, you

[03:44] will need to give more detail in guardrails. But if it's not as consequential, you can be less rigid and let the model be creative in solving the problem. Entropic calls this setting the degrees of freedom and there are

[03:56] actually three levels that they are mentioning. High freedom is basically plain instructions. So you just tell it what you need. Like if you just starting to brainstorm on ways to automate your

[04:05] business processes because there are a lot of good ways to do that. Medium freedom is a template with a few settings. Like for example, in a weekly report where you want a certain shape,

[04:14] but a bit of variation is fine. So, you do still want the model to adhere to the template that you've set, but you don't want it to be so rigid that you miss critical new information that would have

[04:24] been included if you gave the model more freedom. And low freedom is basically an exact script like raising an invoice or maybe you're creating tax documents where being rigid and strict and

[04:35] detailed to a tea is required. And having the right degree of freedom is important because Claude's 5.5 models are now so intelligent and often quite creative now compared to their older

[04:44] counterparts. So if your skills are too rigid, you may be hamstringing their outputs. But the thing is, one skill can mix all three of these degrees of freedom. So in an invoicing skill,

[04:54] writing the email can be wide open while the step that creates the invoice can be the one that has a lower degree of freedom and is locked down to a script. Rule number four is testing skills on

[05:04] the models you use. A skill is usually only as good as the model that's running it. As per entropic, you should test your skills on every model that you actually plan to use them with. And they

[05:14] also give you one question to check on each for Haiku, which is cheaper but less intelligent, does the skill give enough guidance for the model? For Sonnet, which is a good middle tier, is

[05:24] the skill clear with some guidelines and is efficient? And for Opus and Fable, which are their smartest models, does the skill avoid overexplaining so that the model has more creative freedom? And

[05:34] this matters more now because Entropic says skills written for older models are often too prescriptive for the newest models and can actually make the output worse. So if you got skills you built a

[05:45] while back, it's worth testing them with less guidelines. This also works on the flip side. You may have skills that you keep running on the smartest models, but if they're already prescriptive enough,

[05:55] maybe a haiku model is actually enough. Just note that testing every skill on every model can get expensive. Obviously, Entropic would recommend this and would love for you to do that because that would burn through your

[06:05] tokens, but just a caveat that for this rule, you should probably just do it for the skills you rely on the most and the ones where a mistake is consequential. Rule five is optimizing your skill

[06:15] writing. So, this is a quick one, but if your skill opens with a paragraph explaining to a model what an invoice is, that's basically space and tokens you're wasting because Claude already

[06:25] knows what an invoice is. Entropic actually calls the context window a public good. So a better way is to keep only what Claude can't work out on its own like specific company stuff like

[06:35] your prices, your terms or your internal rules. I also found they had a good tip around the description of the skill and that's to write it in the third person. So, for example, the description should

[06:45] say that this skill creates client invoices and sends payment reminders and not I can help you with invoices and payment reminders because this is the description the claude reads when it

[06:55] decides which skill to use and writing it in first person can just confuse it, especially for the lower models. Rule number six are workflows and checklists. So for jobs with a lot of steps,

[07:05] Entropic recommends laying the steps out clearly and giving Claude an actual checklist that it copies into his reply and takes off as it goes. According to Entropic, clear steps are stopping

[07:16] Claude from skipping something critical, which is sometimes observed, especially with the 5.5 models. So here's what that could look like for the invoicing skill that we are setting as an example. And

[07:26] the part here that I wanted to highlight is what we call the go back line. So under that check step, you can add something like if any total doesn't match the job list, then go back to step

[07:37] two. That's a pretty simple example, but Entropic uses that same idea in their own instances as well. And in this instance, it can actually stop a wrong invoice from going out just because a

[07:47] box got ticked. Rule seven is a related one, which are feedback loops. So what's a feedback loop? Well, it's basically your skill checking its own work. As per entropic, the pattern is to run a skill,

[07:58] fix whatever fails, and then repeat until it passes. And they say this greatly improves the quality of the output. And these days, the verification and feedback loop doesn't have to be related to code. Entropic's first

[08:09] example here is actually a style guide. So they had Claude draft the content following the guide. Then if it's important to follow the style guide, they have it review it against a short checklist like is the terminology

[08:20] consistent? Do the examples follow the standard format that we've set? and are all the required sections there. If anything fails, Claude then notes each issue with a part of the guide it

[08:29] breaks, revises it, and checks again and only finishes the task when everything has passed. Rule number eight are common patterns. There's actually three common patterns that Entropic recommends when

[08:40] it comes to skills where you need a more defined output. The first is a template format where you can also choose how strict the model needs to be. either always using the exact structure of the

[08:50] template or giving a sensible default and just having the model use their best judgment. The second are examples which are basically pairs of an input and the output that you want. So this way you

[09:00] give the model an idea of the prompts that you would send which are the inputs and the examples that you would expect as the output. In this case, examples show the style and the level of detail

[09:11] more clearly than a description does. And the third one is a conditional workflow which is basically a fork in the road. So Claude knows which set of steps to follow depending on the conditions of the task. So if you're

[09:22] finding that the output that your skills are giving you should be more defined, then have a think around these three common patterns and see which would apply to the task at hand. Rule number

[09:32] nine is to build for sharability. Now you likely start creating your skills customized for your workspace. But at some point, especially as agentic AI becomes more prominent, you will probably need to share a skill to a

[09:43] co-orker or to your team. So this rule is about building with sharability in mind and its principle is about not assuming that the tools and plugins that your skill needs are already installed

[09:53] on that other person's device. As per entropic, you should just not write to use the PDF library, but instead you can actually include some installation instructions in the skill itself and

[10:04] also list the exact packages you usually use in the skill. And then you can just add a note to install this if in case it is not yet set up in the person's computer. Otherwise, our invoicing

[10:15] skill, for example, might work on your machine, but the first time that a teammate runs it, it won't be able to use it effectively. Number 10 is pretty underutilized, but is probably one of

[10:23] the most important ones here, and it is about hooks. Now, let's say there's one rule in our invoicing skill that can never be broken. Like, for example, never send an invoice above $10,000

[10:34] without a person sign off. Now, you can write that in the skill in capital letters, and most of the time Claude will follow it. But for something as important as this, most of the time probably won't cut it. That is what

[10:45] hooks are for. A hook is a bit of code that Claude code runs on its own at a set moment. Like for example, right before Claude sends something or runs a command and it runs whether or not

[10:55] Claude is following the skill. And according to Entropics docs, if you're finding sometimes that Claude is skipping a rule that must hold every time, a better way is to move that rule

[11:04] from the skill into a hook. You can even put the hook inside the skill itself. Their example is a skill called secure operations with this hook in its settings that runs a security check

[11:14] before every command. And when they use it, cloud code keeps it running for the rest of the session once the skill is used. So, pick the few rules where one mistake would really cost you or your

[11:24] business. And make sure to check if those can be converted to hooks. So, there you go. That's all 10 rules. And remember, the resources and the promise I mentioned are all just in the PDF. And

[11:33] also that includes this skill I made called skill creator plus which is personally what I use now to make sure my skills are adherent to the latest in best practice because entropic does have

[11:43] actually this skill creator skill that comes default with cloud code. But when I check apparently that was last updated in March of this year for some reason. So no reason not to have our own. So I'm

[11:54] just sharing mine down below. As usual, thanks for watching till the end and I hope that was useful. And if it is, then consider tapping subscribe down below because that also helps me a lot to put

[12:02] out more educational stuff like this. And I'll see you all next time. Cheers.
:::
