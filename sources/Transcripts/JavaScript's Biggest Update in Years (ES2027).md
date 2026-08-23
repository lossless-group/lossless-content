---
title: JavaScript's Biggest Update in Years (ES2027)
youtube_url: https://youtu.be/DLT6n3wCkuc?si=iMmnrmLvMeTzeE4G
channel: Better Stack
date_published: 2026-08-22
duration_seconds: 421
thumbnail: https://i.ytimg.com/vi/DLT6n3wCkuc/maxresdefault.jpg
platform: youtube
language: en
transcript_engine: supadata
date_transcribed: 2026-08-23T04:06:12.369Z
date_created: 2026-08-23
date_modified: 2026-08-23
tags:
  - JavaScript
  - JavaScript-Enhancements
  - JavaScript-Ecosystem
---

# JavaScript's Biggest Update in Years (ES2027)

> ES2027 is shaping up to be the biggest JavaScript release since ES2015, and Temporal, the long-awaited replacement for Date, is finally locked in. We break down all four confirmed Stage 4 features, Temporal, the using keyword, Iterator.zip and Atomics.pause, with real code examples including a flight calculation that survives a DST change. Plus the Stage 3 proposals you can already try today, like import defer and Promise.allKeyed, and the Stage 1 Signals proposal that could change how every framework handles reactivity.  🔗 Relevant Links Date Quiz: https://jsdate.wtf/ Temporal: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal Using: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/using Iterator zip: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator/zip Atomics Pause: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Atomics/pause  ❤️ More about us Radically better observability stack: https://betterstack.com/ Written tutorials: https://betterstack.com/community/ Example projects: https://github.com/BetterStackHQ  📱 Socials Twitter: https://twitter.com/betterstackhq Instagram: https://www.instagram.com/betterstackhq/ TikTok: https://www.tiktok.com/@betterstack LinkedIn: https://www.linkedin.com/company/betterstack  📌 Chapters: 0:00 Intro 0:56 Temporal 2:58 Explicit Resource Management (using) 3:43 Iterator.zip 4:40 Atomics.pause 5:39 Import Defer 5:59 Promise.allKeyed 6:11 Decorators 6:19 Signals

[Watch or listen at the source](https://youtu.be/DLT6n3wCkuc?si=iMmnrmLvMeTzeE4G)

:::transcript
[00:00] If you think you know [[Tooling/Software Development/Programming Languages/JavaScript|JavaScript]], try and answer these questions. What does new Date with the string zero get you? Did you think it was Unix epoch time? Well, you'd be wrong because JavaScript

[00:11] sees the string zero as the year 2000 because vibes. Okay, what if it was the number zero though? Well, at least this one makes sense. It's January 1st, 1970. And knowing that, if we did date.parse on both these

[00:25] zeros, we know they're not the same. So, if we compared them, this should be false. Except that's wrong. Date.parse only works on strings, so it coerces the number zero into a string. So, both of

[00:34] these are the year 2000 again. This is only question three of 28 in this quiz, and I am annoyed already. Thankfully though, Temporal is here to fix this, and that is just one of the four

[00:43] confirmed features for JavaScript 2027. So, there's a few really interesting proposals that are close to confirmed, including one that could change how every framework works. Let's start with the big one, Temporal.

[00:58] This is the new date API that's been in the works for nine long years, but in March it finally reached stage four, meaning it's ready to go. If you don't know why this makes every JavaScript

[01:06] developer happy, I urge you to take that quiz. It is no surprise that most people use libraries like moment, Luxon, or date functions. And I've actually covered Temporal in full in a previous

[01:14] video. So, subscribe to stay up to date with this kind of stuff. The TLDR of Temporal is instead of one messy date object that does every job poorly, you get separate types that each do one job

[01:24] properly. Temporal plain date is just a calendar date with no times or time zones to deal with. Plain time is just a wall clock time with no dates to deal with. Instant represents a unique point

[01:33] in time, aka the nanoseconds since the Unix epoch, without any time zone or calendar system. Zone date time is a full date in a real time zone, and it understands daylight saving time. And

[01:42] there's duration, which gives you real date math. So, there's no more adding milliseconds or other random math scattered around your code base. As an example of all of these working

[01:49] together, let's say I had a flight from New York to London that leaves at 8:00 p.m. New York time on Sunday the 24th October, and the flight takes 7 hours. London is 5 hours ahead, so 8:00 p.m.

[01:59] plus a 7-hour flight means 3:00 a.m. New York time, which means I should land at 8:00 a.m. in London. Except, Temporal here is saying 7:00 a.m. And it would be right. This flight actually happens on

[02:08] the night that the clocks go back in London, and Temporal knows that and is handling it for me. And if you don't believe that the clocks change mid-flight, you don't actually have to guess this. You can just use get time

[02:16] zone transition, which tells me the change was at 1:00 a.m. London time. As another example, if I had an 11:00 a.m. meeting I want to push back 1 day, but overnight the clocks change, I don't

[02:24] suddenly want that meeting to be at 10:00 a.m. And with Temporal, it doesn't have to be. It knows that I'm working in days here and not hours. The other big advantage of Temporal is that everything

[02:33] is immutable now, so every operation returns a brand new object. So, you don't have to guess anymore if your original date has been changed somewhere in your code. And if all of that wasn't

[02:40] good enough, it also makes sorting dates easier, working out days until easier, rounding dates, and months also start at zero. That is pretty groundbreaking stuff. It's just so much better than the

[02:50] JavaScript date object, and the good news is you don't have to wait to try this one. Firefox, Chrome, [[Tooling/Software Development/Developer Experience/DevTools/Node.js|Node.js]], [[Tooling/Software Development/Developer Experience/Deno|Deno]] already have this. [[Tooling/Software Development/Developer Experience/Bun|Bun]] is coming soon, and Safari needs to catch up. Moving on

[02:59] to feature number two, we have explicit resource management, aka the using keyword. This one went stage four in May. Anytime you grab something that needs cleaning up, like a file handle,

[03:07] database connection, or a stream, you're supposed to release that when you're done. This typically meant try finally blocks everywhere, or you would just forget, and now you have a resource

[03:15] leak. Now, although the using keyword ensures that when a variable goes out of scope, whether that's because it's the end of the block, an early return, or an exception, JavaScript automatically

[03:23] calls the object symbol.dispose On top of that, there's also a way using for async cleanup with async dispose, and a disposable stack for composing several resources, so they tear down in reverse

[03:33] order. This is just one of those nice-to-have helpers that should help clean up some of our code with those try finally blocks. And the good news is it's been in Firefox, Chrome, Node, Bun,

[03:40] and Deno for quite some time now, so you may have already used this one. Next up for feature number three, we have a more niche one, which is joint iteration, aka iterator.zip. Let's say I had three

[03:49] arrays, names, ages, cities, and I want to combine these into one? Well, iterator.zip can do this as it lets us iterate over multiple iterables in parallel and gives us an array containing the next value for each

[03:59] input. There's also zip keyed that does the exact same thing but gives you named objects instead. And both of them also have options for what happens when the input iterables are different lengths.

[04:07] So, mode can be shortest, which means stop as soon as the shortest iterable runs out. This is the default. Longest will keep going until the longest iterable finishes. And strict will throw

[04:15] a type error if the inputs are different lengths. With longest as well, you can actually provide padding values for what happens when there's an entry. These features seem like a continuation of the

[04:23] work that's been done on iterators over recent years. ES2025 gave us the helpers like map, filter, take, and drop. And there's currently some stage three proposals like iterator chunking,

[04:32] iterator includes, and iterator join. Basically, just more and more features that remove the need for lodash. You can actually only use zip in Firefox today, but hopefully the other ones catch up.

[04:40] Moving on to our fourth confirmed feature, this one's a pretty low-level one, atomics.pause. And I'll be quick with this one because unless you're writing multi-threaded code with a

[04:48] shared array buffer, you're probably not going to come across it. If we create four bytes of memory that can be shared across threads or workers, and then we use those bytes as a one integer lock,

[04:56] then in a while loop we use atomics.compareExchange to say if this value is unlocked, lock it. And if the value is locked, keep looping because someone else is using it, and we want to wait until they're

[05:05] done. This is called spinning or busy waiting, and the problem is that a tight loop like this can hammer the CPU. So, atomics.pause is used to tell the runtime or the CPU, "I'm intentionally

[05:15] spinning here. I'm waiting for something to change." And then the CPU can handle the spin loop a lot more efficiently. As you can see, that's a very low-level feature, so it's mostly used by library

[05:23] authors or performance-sensitive code. And it's supported in most browsers, Bun, Deno, and even worked for me in Node even though MDN said it shouldn't. So, those are our four locked-in

[05:31] features, all in stage four and expected to be part of ES2027. But now let's talk about stage three because some of these are available now. First, we have import defer. When used on an import, the module gets loaded but

[05:42] none of its code actually runs until the first time you use it. So, you get lazy execution. This is different from what dynamic imports give you, which give you lazy loading. So, it waits to download

[05:52] the module, but it doesn't stop the top-level code running once it's been fetched. This should help with some of the startup time of apps with really large dependency graphs. Second, there's

[06:00] Promise.allSettled. Instead of Promise.all handing you an array that you destructure by position, you pass an object and you get named results back. This one is a pretty small feature, but

[06:08] it made a lot of people very happy when it was announced. Next up, we have decorators. These have been stage three since 2022, but Bun shipped standard decorators in February, and I do wonder

[06:17] when this will ever get to stage four. Finally, there's one proposal that I think is really exciting, but it's stage one, so it might take some time to appear, but that is signals. This would

[06:25] add a built-in reactive state primitive to JavaScript with writable values, computed values, and automatic dependency tracking. And the goal is to give frameworks like Angular, Vue, Svelte, and Solid a common low-level

[06:34] foundation for their reactivity, so they can all use a standardized core instead of their current independent implementations. There we go. That is what TC39 is expected to give us in

[06:43] ES2027. What's your favorite feature, and have you used it already? Let me know in the comments down below. While you're there, subscribe, and as always, see you in the next one.
:::
