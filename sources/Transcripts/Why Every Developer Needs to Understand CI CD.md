---
title: "Why Every Developer Needs to Understand CI/CD"
youtube_url: "https://youtu.be/omB2JkC4QfA?si=zjhGo4-ffjuRBJz3"
channel: "Nova Designs"
date_published: "2026-06-21"
duration_seconds: 822
thumbnail: "https://i.ytimg.com/vi_webp/omB2JkC4QfA/maxresdefault.webp"
platform: "youtube"
language: "en"
transcript_engine: "supadata"
date_transcribed: "2026-08-09T04:42:34.209Z"
date_created: 2026-08-09
date_modified: 2026-08-09
---

# Why Every Developer Needs to Understand CI/CD

> ❤️ Free CI/CD Cheatsheet: https://ko-fi.com/s/abbb1b6ce2  💻 Code Snippets: https://www.codeslides.app/share/f1648e9e3c397ad83eccf478a2fd78d9  💬 Join our Discord Community: https://discord.gg/wvwtHx3hCV  📬 Get more free cheatsheets and exclusive playbooks by joining our newsletter: https://newsletter.novadesigns.dev  ✉️ Business Inquiries: novadesignscontact@gmail.com  Learn CI/CD in an easy way! In this video, you'll build a simple Continuous Integration (CI) pipeline using YAML and GitHub Actions.  We'll cover:  * Setting up workflow triggers * Checking out your code * Installing Node.js and dependencies * Running tests automatically * Creating a reliable development workflow  Understanding CI/CD early in your software engineering journey helps you catch bugs faster and automate repetitive tasks, making your projects more reliable and production-ready.  If you enjoyed this tutorial, subscribe for more software engineering content and let us know in the comments if you'd like to see a video on Continuous Deployment (CD) next.  Tools Used: VS Code Pexels (Videos) Pixabay (Sound Effects) GIPHY (GIFs) Flaticon (Icons) CodeSlides (Code Animations)  #cicd #githubactions #devops #webdevelopment #webdev #javascript #nodejs #softwareengineering #tutorial

[Watch or listen at the source](https://youtu.be/omB2JkC4QfA?si=zjhGo4-ffjuRBJz3)

:::transcript
[00:00] If I could give one piece of advice to every developer who's just finished building their first project, it wouldn't be learn Docker or pick up Kubernetes. It would be to understand CI/CD [music]

[00:09] early because it changes the way you think about shipping software entirely. [music] So, let me just get straight into it. When I first heard the term CI/CD, I thought it was some fancy DevOps thing

[00:20] that only big companies with big teams needed to worry about. So, I ignored it. What I didn't realize is that CI/CD or continuous [music] integration and continuous deployment is about continuously validating changes and

[00:32] keeping software in a state where it can be shipped safely and reliably. But, what exactly do integration and delivery mean? Continuous integration means every time you push code, [music] it gets

[00:42] automatically tested and verified against the rest of the code base. Continuous delivery means after those tests pass, your code is always in a state where it's ready to be released.

[00:51] You can deploy it whenever you choose, often with just a single click. Some teams go one step further with continuous deployment where every change that passes all the tests is automatically released without any

[01:02] manual approval. But, all of those are really built around one simple idea. Instead of thinking, [music] "I'll test and deploy when I'm done." you start thinking, "Every change I make

[01:11] should be small, tested, and ready to go." That's it. Everything else, [music] the pipelines, the YAML files, the runners, those are just tools that enforce that habit. And this is where a

[01:20] lot of beginners get stuck. [music] The moment they see a [[concepts/Continuous Integration and Continuous Delivery|CI/CD]] pipeline with YAML files, GitHub Actions workflows, and environment variables, they assume it's too advanced and that they need to

[01:32] become good enough before touching it. But, that's the wrong mindset. You don't need to understand every line of a pipeline configuration on day one. You just need to understand what it's doing

[01:41] at a high level. A pipeline is really just an automated checklist. It might say, "Install the [music] dependencies, run the tests, and if everything passes, deploy the application." That's it. The

[01:53] syntax may look intimidating, but the logic behind it is something you already understand. [music] Think of it like a car wash. Every car follows the same path. First it gets sprayed with water,

[02:03] then scrubbed with soap, then rinsed, then dried. No car skips a step and no one has to remember what comes next. A pipeline works the same way. Every time you push your code, it automatically goes through the same

[02:15] steps in the same order. Once you see it that way, CI/CD becomes a lot less mysterious. It's not magic >> [music] >> and it's not some complicated system only big companies use. It's simply a

[02:26] repeatable process that makes sure the same checks happen every [music] single time. And here's the best part. If you're already using GitHub, you don't need to install any extra CI software on

[02:35] your computer. Your repository already has access to GitHub Actions, GitHub's built-in CI/CD platform. So let's set it up from scratch step-by-step. For this example, let's say you have a simple

[02:46] node project on GitHub. It has a package.json file and a few tests written using Jest. If you don't have tests yet, that's fine. We'll get to that part, too. Right now, the goal [music] is just to

[02:57] understand the structure and how everything fits together. Inside your project, create this exact folder path. It starts with a folder named .github, then inside it create a folder called

[03:07] workflows. That leading dot is important because GitHub only recognizes that exact folder name. You can think of it like a hidden control room inside your project. >> [music] >> Anything you place inside that workflows

[03:19] folder becomes instructions that GitHub can automatically run whenever something happens in your repo. Inside that folder, create a file called ci.yml. >> [music] >> The name itself doesn't really matter.

[03:31] You can name it anything that makes sense to you. What actually matters is the YAML extension. YAML is just a way of writing configuration in a structured format. You can think of it like a clean

[03:41] to-do list that the machine can understand. Each line is basically an instruction written in a simple format, so GitHub can read it and know exactly what to do step-by-step. Now let's build

[03:53] this file one piece at a time. Let's start with this. We'll write name and then CI pipeline. That's the first line. This is just a label. It's what shows up in the GitHub Actions tab when you open

[04:03] your repo on GitHub. It has no effect on how the pipeline runs. Name it whatever you want. Think of it as a title written on the top of that to-do list. Then, below that, let's type on and inside it

[04:15] are the push and pull request events and inside those, let's write branches and then the branch name, which is main. Now, what's going on here? First is the on block. The on block tells GitHub when

[04:28] to run your workflow. Think of it like a switch that listens for specific things to happen in your project, which are called events like the ones you see here. But, what exactly is an event? An

[04:38] event is simply something that happens in your repository. It's a signal that tells GitHub something changed. Examples of events include pushing new code, opening a pull request, creating a

[04:48] release, and many others. The on block is where you specify which events should trigger your workflow. In other words, the workflow only starts when one of the events you define actually happens. In

[05:00] this example, there are two events. First, the push event on the main branch. This means the workflow runs whenever someone pushes new code directly to the main version of the project. Second, the pull request event

[05:13] targeting main. This means the workflow runs whenever someone opens a pull request that wants to merge changes into the main branch. So, instead of running all the time, GitHub waits for one of

[05:23] these events to happen. When it does, the workflow automatically starts and runs the checks you've defined. This keeps everything automated while ensuring the pipeline only runs when it

[05:32] actually matters. Now, before we start adding steps to this workflow, let's make sure everything runs on the same machine. To do that, we first need to define a new section called the jobs block. A job

[05:43] is a major unit of work inside a GitHub Actions workflow. We all know that a workflow acts like a checklist that GitHub follows whenever an event occurs. That checklist can be broken into

[05:54] separate sections, and each section is called a job. For example, you might have a test job that runs your automated tests, a build job that creates a production version of your application,

[06:05] or a deploy job that publishes your application to a server. Each job is responsible for a specific task and runs on its own virtual machine. Inside a job, you'll later define a series of

[06:17] steps. These steps are the actual instructions GitHub will execute, such as installing dependencies, running tests, or building your project. Now, for this example, since we want to automate our test, let's create a job

[06:30] called test. Inside that job, we'll add a configuration option called runs on and set it to Ubuntu latest. Earlier, we mentioned that whenever a job runs, GitHub spins up its own virtual machine,

[06:42] a fresh computer that exists only for the duration of the job. In our case, we want GitHub to create a new Ubuntu Linux machine, which is why we set runs on to Ubuntu latest. This means every time our

[06:54] tests run, they start in a clean, predictable environment. We don't have to worry about leftover files, installed packages, or configuration changes from previous runs because GitHub gives us a

[07:04] brand new machine every single time. And by the way, runs on is just one of many configuration options that can be added to a job. As we continue building this workflow, you'll see many more options

[07:15] that allow us to control things like permissions dependencies environment variables, timeouts, and much more. For now though, all we need to do is tell GitHub what machine to use. Once that's

[07:27] in place, we can move on to the most important part of the job, the steps. >> [music] >> These are the actual instructions that tell GitHub what to do on that machine. To do that, let's declare a steps block.

[07:38] Inside the steps block, let's create our first step. A step typically contains a few properties, but for this one, we'll start with two. Name and uses. The name property is simply a human-readable label for the

[07:49] step. It helps us understand what the step is doing when we look at the workflow logs. GitHub doesn't use it for execution. It's mainly there for us. The uses property is where things get

[08:02] more interesting. It tells GitHub to use an existing GitHub action that someone has already created. Instead of writing everything from scratch, we can reuse actions built by GitHub or the

[08:12] community. Think of an action as a reusable piece of automation that performs a specific task for us. [music] In our case, we'll use the actions/checkout action. This action's job is to download a copy of our

[08:24] repository onto the virtual machine so that the workflow can access our code. Without this step, the virtual machine would be empty and wouldn't know anything about our project. So, before

[08:35] we can run tests, install dependencies, or build our application, we first need to check out the code. There are many other pre-built actions available from GitHub and the community. I've included

[08:45] a link in the description below if you'd like to explore them. Now, let's add the next step. In the previous step, we used actions/checkout to download our project onto the virtual machine.

[08:56] At this point, GitHub has access to our code, but the machine is still brand new and doesn't have Node.js configured for our project yet. To fix that, we'll add another step using the actions/setup-node action. Just like

[09:07] actions/checkout, this is also a pre-built GitHub action. Its job is to install and configure Node.js on the virtual machine so we can run commands like npm install and npm test. You might

[09:19] also notice a new keyword here, with. The with block is how we pass options to a pre-built action. Think of it as providing settings or configuration for that action. In this case [music]

[09:31] we're telling the setup-node action which version of Node to install. We'll set Node version to 22, which means GitHub will install node 22 before moving on to the next step. But, why

[09:42] specify a version at all? By explicitly setting the version, we're making sure that every workflow run uses the exact same node environment. [music] That makes the pipeline more predictable and

[09:52] easier to trust. Now, let's add the install step. At this point, the virtual machine has a copy of our code, and it also has node installed. However, our project's dependencies still aren't

[10:04] there. Remember, most JavaScript projects rely on external packages listed in package.json. Those packages need to be downloaded and installed before our application can run or our test can execute. To do that,

[10:17] we'll add another step and use the command npm ci. You might notice that this step uses run instead of uses. The difference is simple. Run tells GitHub to execute a command directly on the

[10:29] virtual machine, just like you would in your own terminal. So, when we write run this command, GitHub literally opens on the virtual machine and executes that command. Now, let's add the final step.

[10:40] This is the step we've been building toward the entire time. The previous steps prepared the environment for us. Now, it's finally time to run the test. Just like the install step, we'll use

[10:50] run because we want GitHub to execute a command directly on the virtual machine. In this case, the command is npm test. >> [music] >> And that's it. Once this step executes, GitHub will wait for the test results.

[11:03] If all the tests pass, the workflow is marked as successful. >> [music] >> If even one test fails, the workflow is marked as failed, giving you immediate feedback that something is wrong before

[11:12] the code gets merged or deployed. Now that our workflow is complete, let's save the file, commit the changes, and push them to GitHub. As soon as you push the workflow file, GitHub automatically detects it and

[11:23] starts the pipeline for you. There's [music] no need to manually run anything. To see it in action, go to your repository on GitHub and click the Actions tab. There, you'll see your workflow running in real time. You can

[11:36] click [music] into the workflow run and watch each step execute one by one. GitHub will show you exactly which [music] step is currently running, how long it took, and whether it passed or

[11:47] failed. If a step fails, don't panic. Simply click on the failed step to view its logs. The logs contain the output generated by that step, which often points directly to the problem.

[11:58] Sometimes the issue is obvious, such as a failing test or a missing dependency. Other times, you'll need to do a bit of investigation to understand what went wrong. Once you fix the issue locally,

[12:09] commit your changes and push again. Because our workflow is triggered by pushes and pull requests, [music] GitHub will automatically start a new pipeline run for the updated code. This creates a

[12:18] feedback loop. Write code, push changes, review the results, fix issues if necessary, and push again. Over time, this becomes a natural part of the development process and helps catch problems long before they reach

[12:31] production. And of course, this is just the basics of CI/CD. There's a lot more to learn once you get comfortable with the fundamentals. Things like deployment pipelines, security scanning,

[12:41] infrastructure automation, preview environments, and much more. We also have a lot of experienced developers and senior engineers in our community, so if you have additional tips, best

[12:51] practices, or things beginners should know about CI/CD, leave a comment below. Share your experience and help teach the community. And if you'd like to continue the conversation, join our Discord

[13:01] community. The link is in the description below. Whether you're just getting started or you've been building software for years, we'd love to have you there. Plus, we made a free PDF

[13:11] version of everything we talked about. You can find tips and tricks inside it. You can check it out in the description below. And if you'd love to see more of this, subscribe to stay tuned. Well,

[13:21] that's it for now, Novas. I'm Jason from the Nova Designs team. Thank you for watching. >> [music] [music] [music]
:::
