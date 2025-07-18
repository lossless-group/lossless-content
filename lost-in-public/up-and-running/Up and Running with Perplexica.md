---
date_created: 2025-06-07
date_modified: 2025-06-07
---
[[Tooling/AI-Toolkit/Models/Perplexica|Perplexica]] is an [[concepts/Open Source Alternatives|Open Source Alternative]] to [[organizations/Perplexity AI|Perplexity AI]] using the [[Searxng]] search API, which is an open source alternative to Google or other [[Search Engines]].

```bash
# Build the Docker image 
docker compose build 
# Start the container in detached mode 
docker compose up -d 
# View the logs to ensure everything starts correctly 
docker compose logs -f
```

```bash
docker-compose up
```

For me, I wanted to modify the default port, as some of the development I do defaults to port 3000.  So, my docker-compose fired up Perplexica on port 3030.
http://localhost:3030


![](https://i.imgur.com/WIeJSAJ.png)
## Using it via API

```json
{
  "chatModel": {
    "provider": "openai",
    "name": "gpt-4o-mini"
  },
  "embeddingModel": {
    "provider": "openai",
    "name": "text-embedding-3-large"
  },
  "optimizationMode": "speed",
  "focusMode": "webSearch",
  "query": "What is Perplexica",
  "history": [
    ["human", "Hi, how are you?"],
    ["assistant", "I am doing well, how can I help you today?"]
  ],
  "systemInstructions": "Focus on providing technical details about Perplexica's architecture.",
  "stream": false
}
```

## Install LM Studio
```bash
lms server start
```


