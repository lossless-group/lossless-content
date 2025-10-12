---
date_created: 2025-04-20
date_modified: 2025-09-05
site_uuid: 3d4d52ca-96d3-4912-a742-f003b7d7d8ec
publish: true
title: Up And Running With Python
slug: up-and-running-with-python
at_semantic_version: 0.0.0.1
authors:
  - Michael Staton
tags: [Python-Ecosystem, Programming-Languages]
og_favicon: https://ik.imagekit.io/xvpgfijuw/lossless-content-embeds/appIcon__Python-Lang.png?updatedAt=1757078339370
---


```bash
brew install pyenv
```

```bash
echo 'export PYENV_ROOT="$HOME/.pyenv"' >> ~/.zshrc && echo 'command -v pyenv >/dev/null || export PATH="$PYENV_ROOT/bin:$PATH"' >> ~/.zshrc && echo 'eval "$(pyenv init -)"' >> ~/.zshrc
```

```bash
 cd /Users/mpstaton/code/lossless-monorepo/ai-labs && pyenv local 3.9.22
```
Python does not automatically load environment variables from the `.env` file. We need to install `direnv` to load environment variables from the `.env` file.

```bash
brew install direnv
```
- Add to `~/.zshrc` : `eval "$(direnv hook zsh)"`
- In repo root, create `.envrc` with: `dotenv .env`
- Run `direnv allow` in the repo directory

```bash
direnv allow
```

If that still doesnt work, run directly in command line:

```bash
set -a; source .env; set +a; printf 'NEO_PROVIDER=%s\n' "${NEO_PROVIDER:-<unset>}"; printf 'NEO_MODEL=%s\n' "${NEO_MODEL:-<unset>}"; env | grep -E '^(ANTHROPIC_API_KEY|OPENAI_API_KEY|GOOGLE_API_KEY|JINA_API_KEY)=' | sed 's/=.*/=<set>/' || true 
```