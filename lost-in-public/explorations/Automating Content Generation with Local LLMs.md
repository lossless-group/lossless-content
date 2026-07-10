---
date_initiated: 2025-03-05
dependencies:
  - Docker
  - OLlama
  - LiteLLM
  - MSTY
date_created: 2025-03-06
date_modified: 2025-08-22
site_uuid: c77ac06a-4b4d-4930-9310-63d4434b5e56
title: "Automating Content Generation With Local LLMs"
slug: automating-content-generation-with-local-llms
at_semantic_version: 0.0.0.1
publish: true
authors:
  - Michael Staton
image_prompt: "on the left and right side of the image, robots are at desks in rows typing on a typewriter furiously.  The desks are facing each other.  The typewriters are writing on one continuous roll of paper, so there is a scramble of paper all over the floor.  On the extreme right and left a `line foreman` is coaching and motivating the typists."
banner_image: "https://ik.imagekit.io/xvpgfijuw/uploads/lossless/july/Automating_Content_Generation_with_Local_LLMs_banner_image_1755821371868_K90JM3Oj7.webp"
portrait_image: "https://ik.imagekit.io/xvpgfijuw/uploads/lossless/july/Automating_Content_Generation_with_Local_LLMs_portrait_image_1755821378694_gl4AH_-6Z.webp"
square_image: "https://ik.imagekit.io/xvpgfijuw/uploads/lossless/july/Automating_Content_Generation_with_Local_LLMs_square_image_1755821393655_UXM-IdCEu.webp"
---


``
## [[Fabric]] for [[YouTube]] consumption and output.
Fabric allows you to frontload a lot of [[concepts/Explainers for AI/Prompt Engineering|Prompt Engineering]] in an [[Opinionated]] fashion.  It then allows users to run "patterns" (think a set of inputs and a prompt, like an ephemeral [[concepts/Explainers for AI/Fine Tuning|Fine Tuning]] operation). 

##### Could it be the Model Context length?
update::2025-03-19T18:59:03.914Z
After working extensively on a few "patterns", I found that the kind of output did not change and the AI did not follow the prompt.  I was unsure if it was my error, a Fabric unexpected behavior, or [[DeepSeek]] [[r1]] unexpected behavior.  I posted an issue on the public [[concepts/Public Repository]] on [[GitHub]]: [[Question]: What to do if the model isn't following the pattern prompts? #1346](https://github.com/danielmiessler/fabric/issues/1346)

>Are you running the DeepSeek R1 model with ollama or some other local system? I recently struggled with a very similar issue and found that ollama uses a default context window size of about 2048 tokens so that my system prompt never even gets to the model. Using fabric command line option --modelContextLength= helped.


## [[Tooling/AI-Toolkit/Models/Vane]] for Search Results with Sources
[[Tooling/AI-Toolkit/Models/Vane]] has installation instructions on the [Perplexica GitHub Repo](https://github.com/ItzCrazyKns/Perplexica/tree/master).  As of March 20, 2025, it's 1 GB in size and here are the steps I am walking through:

Open the terminal or [[concepts/Explainers for Tooling/Terminal Emulators|Terminal Emulator]]. (I use [[Ghostty]] when I know what I am doing, and [[Warp]] when I need an [[concepts/Explainers for AI/AI Terminal Assistant|AI Terminal Assistant]].)

Figure out where you want to install it.  Given my [[Dev Machine]] is on [[Ubuntu]], I chose:
`/home/mps/Applications`

Clone the repository to a target directory:
```bash
git clone https://github.com/ItzCrazyKns/Perplexica.git
```

Here's the directory tree of was just cloned:


```bash
mps@sys76:~/Applications/Perplexica$ tree
.
├── CONTRIBUTING.md
├── LICENSE
├── README.md
├── app.dockerfile
├── backend.dockerfile
├── config.toml
├── data
├── docker-compose.yaml
├── docs
│   ├── API
│   │   └── SEARCH.md
│   ├── architecture
│   │   ├── README.md
│   │   └── WORKING.md
│   └── installation
│       ├── NETWORKING.md
│       └── UPDATING.md
├── drizzle.config.ts
├── package.json
├── searxng
│   ├── limiter.toml
│   ├── settings.yml
│   └── uwsgi.ini
├── src
│   ├── app.ts
│   ├── chains
│   │   ├── imageSearchAgent.ts
│   │   ├── suggestionGeneratorAgent.ts
│   │   └── videoSearchAgent.ts
│   ├── config.ts
│   ├── db
│   │   ├── index.ts
│   │   └── schema.ts
│   ├── lib
│   │   ├── huggingfaceTransformer.ts
│   │   ├── outputParsers
│   │   │   ├── lineOutputParser.ts
│   │   │   └── listLineOutputParser.ts
│   │   ├── providers
│   │   │   ├── anthropic.ts
│   │   │   ├── gemini.ts
│   │   │   ├── groq.ts
│   │   │   ├── index.ts
│   │   │   ├── ollama.ts
│   │   │   ├── openai.ts
│   │   │   └── transformers.ts
│   │   └── searxng.ts
│   ├── prompts
│   │   ├── academicSearch.ts
│   │   ├── index.ts
│   │   ├── redditSearch.ts
│   │   ├── webSearch.ts
│   │   ├── wolframAlpha.ts
│   │   ├── writingAssistant.ts
│   │   └── youtubeSearch.ts
│   ├── routes
│   │   ├── chats.ts
│   │   ├── config.ts
│   │   ├── discover.ts
│   │   ├── images.ts
│   │   ├── index.ts
│   │   ├── models.ts
│   │   ├── search.ts
│   │   ├── suggestions.ts
│   │   ├── uploads.ts
│   │   └── videos.ts
│   ├── search
│   │   └── metaSearchAgent.ts
│   ├── utils
│   │   ├── computeSimilarity.ts
│   │   ├── documents.ts
│   │   ├── files.ts
│   │   ├── formatHistory.ts
│   │   └── logger.ts
│   └── websocket
│       ├── connectionManager.ts
│       ├── index.ts
│       ├── messageHandler.ts
│       └── websocketServer.ts
├── tsconfig.json
├── ui
│   ├── app
│   │   ├── c
│   │   │   └── [chatId]
│   │   │       └── page.tsx
│   │   ├── discover
│   │   │   └── page.tsx
│   │   ├── favicon.ico
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── library
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   ├── page.tsx
│   │   └── settings
│   │       └── page.tsx
│   ├── components
│   │   ├── Chat.tsx
│   │   ├── ChatWindow.tsx
│   │   ├── DeleteChat.tsx
│   │   ├── EmptyChat.tsx
│   │   ├── EmptyChatMessageInput.tsx
│   │   ├── Layout.tsx
│   │   ├── MessageActions
│   │   │   ├── Copy.tsx
│   │   │   └── Rewrite.tsx
│   │   ├── MessageBox.tsx
│   │   ├── MessageBoxLoading.tsx
│   │   ├── MessageInput.tsx
│   │   ├── MessageInputActions
│   │   │   ├── Attach.tsx
│   │   │   ├── AttachSmall.tsx
│   │   │   ├── Copilot.tsx
│   │   │   ├── Focus.tsx
│   │   │   └── Optimization.tsx
│   │   ├── MessageSources.tsx
│   │   ├── Navbar.tsx
│   │   ├── SearchImages.tsx
│   │   ├── SearchVideos.tsx
│   │   ├── Sidebar.tsx
│   │   ├── theme
│   │   │   ├── Provider.tsx
│   │   │   └── Switcher.tsx
│   │   └── ui
│   │       └── Select.tsx
│   ├── lib
│   │   ├── actions.ts
│   │   └── utils.ts
│   ├── next.config.mjs
│   ├── package.json
│   ├── postcss.config.js
│   ├── public
│   │   ├── next.svg
│   │   └── vercel.svg
│   ├── tailwind.config.ts
│   ├── tsconfig.json
│   └── yarn.lock
├── uploads
└── yarn.lock
```

Rename the `sample.config.toml` file to `config.toml` and fill out the variable values, which are generally [[Vocabulary/API Authentication|API Authentication]] variables and Ports. 

I used [[1Password]] to grab me API Keys for [[Gemini]], [[OpenAI]], [[Tooling/AI-Toolkit/Model Producers/Groq|Groq]], and [[Anthropic]]. 

I had to make sure [[Tooling/AI-Toolkit/AI Interfaces/OLlama]] was running locally. If you don't have it installed, you'll need it. 

Then, initiate Perplexica using [[Tooling/Software Development/DevOps/Docker]]. If you don't have it installed, you'll need it. I actually had an issue, so I had to do a clean install, you can find it [[lost-in-public/up-and-running/Up and Running with Docker]]

```bash
# -d is the argument for detached mode
sudo docker compose up -d
```

> [!LLM Response] [[Warp]] summarizes the docker compose results.
> The docker-compose up -d command has successfully executed. All containers have been started in detached mode (-d flag). Here's what happened:
> 
> 1. Three images were pulled:
> •  perplexica-frontend
> •  searxng
> •  perplexica-backend
> 2. The following resources were created:
> •  Network: perplexica_perplexica-network
> •  Volumes: 
> ◦  perplexica_backend-dbstore
> ◦  perplexica_uploads
> 3. Three containers were started:
> •  perplexica-searxng-1
> •  perplexica-perplexica-backend-1
> •  perplexica-perplexica-frontend-1
> 
> All containers are now running in the background. You can use docker-compose ps to check their status or docker-compose logs to view their logs.

**Note**: After the [[Containers]] are built, you can start [[Tooling/AI-Toolkit/Models/Vane]] directly from Docker without having to open a terminal.

Now, Perplexica's UI in [[NEXT.js]] should be running on http://localhost:3000 unless you have specified another port. 
![](https://i.imgur.com/w6T14iG.png)

#### Accessing [[Tooling/AI-Toolkit/Models/Vane]] in your own application development via local API endpoint

```json
{
  "chatModel": {
    "provider": "openai",
    "model": "gpt-4o-mini"
  },
  "embeddingModel": {
    "provider": "openai",
    "model": "text-embedding-3-large"
  },
  "optimizationMode": "speed",
  "focusMode": "webSearch",
  "query": "What is Perplexica",
  "history": [
    ["human", "Hi, how are you?"],
    ["assistant", "I am doing well, how can I help you today?"]
  ]
}
```


Though, in our case, we will be using the [[Local LLM|Local LLMs]] installed through [[Tooling/AI-Toolkit/AI Interfaces/OLlama]]:
```json
```json
{
  "chatModel": {
    "provider": "ollama",
    "model": "gpt-4o-mini"
  },
  "embeddingModel": {
    "provider": "openai",
    "model": "text-embedding-3-large"
  },
  "optimizationMode": "speed",
  "focusMode": "webSearch",
  "query": "What is Perplexica",
  "history": [
    ["human", "Hi, how are you?"],
    ["assistant", "I am doing well, how can I help you today?"]
  ]
}
```

**POST** `http://localhost:3001/api/search`

**`chatModel`** (object, optional): Defines the chat model to be used for the query. For model details you can send a GET request at `http://localhost:3001/api/models`. Make sure to use the key value (For example "gpt-4o-mini" instead of the display name "GPT 4 omni mini").

```json
{
  "message": "Perplexica is an innovative, open-source AI-powered search engine designed to enhance the way users search for information online. Here are some key features and characteristics of Perplexica:\n\n- **AI-Powered Technology**: It utilizes advanced machine learning algorithms to not only retrieve information but also to understand the context and intent behind user queries, providing more relevant results [1][5].\n\n- **Open-Source**: Being open-source, Perplexica offers flexibility and transparency, allowing users to explore its functionalities without the constraints of proprietary software [3][10].",
  "sources": [
    {
      "pageContent": "Perplexica is an innovative, open-source AI-powered search engine designed to enhance the way users search for information online.",
      "metadata": {
        "title": "What is Perplexica, and how does it function as an AI-powered search ...",
        "url": "https://askai.glarity.app/search/What-is-Perplexica--and-how-does-it-function-as-an-AI-powered-search-engine"
      }
    },
    {
      "pageContent": "Perplexica is an open-source AI-powered search tool that dives deep into the internet to find precise answers.",
      "metadata": {
        "title": "Sahar Mor's Post",
        "url": "https://www.linkedin.com/posts/sahar-mor_a-new-open-source-project-called-perplexica-activity-7204489745668694016-ncja"
      }
    }
        ....
  ]
}
```