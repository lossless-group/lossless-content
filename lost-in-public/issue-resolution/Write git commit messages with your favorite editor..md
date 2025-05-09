---
title: Write Git Commit Messages with Your Favorite Editor
lede: How to configure Git to use your preferred editor (like Neovim) for writing multi-line commit messages, plus tips for advanced commit workflows.
date_reported: 2025-03-20
date_resolved: 2025-04-23
date_last_updated: null
at_semantic_version: 0.0.0.1
status: "Resolved"
affects_systems: Continuous-Integration
augmented_with: Warp on Claude Sonnet 3.7
category: Continuous-Integration
date_created: 2025-03-20
date_modified: 2025-04-23
site_uuid: 6763a9f1-61e6-4d8e-8d7c-2cbd3eedf241
tags:
  - Git-Workflow
  - Neovim
  - Developer-Experience
authors:
  - Michael Staton
portrait_image: https://ik.imagekit.io/xvpgfijuw/uploads/lossless/issue-resolutions/2025-05-05_portrait_image_Write-git-commit-messages-with-your-favorite-editor_c751e467-56a7-4abc-a9ee-0ee63783d876_dfRuaVvVD.webp
image_prompt: Terminal window with Git commit message in Neovim, multi-line editing, and configuration icons, in a modern developer setup.
banner_image: https://ik.imagekit.io/xvpgfijuw/uploads/lossless/issue-resolutions/2025-05-05_banner_image_Write-git-commit-messages-with-your-favorite-editor_e2e47810-9b95-451d-925f-b6d047f446d1_ynpchTDln.webp
---
I hate it when I want to add a long message to a git commit and git launches nano.  I just never picked it up. Avoided even having to think about it, really. 

I also never pondered that I could change the default editor for commit messages. That is, until I realized my [[concepts/Explainers for AI/AI Terminal Assistant|AI Terminal Assistant]], [[Tooling/AI-Toolkit/Generative AI/Code Generators/Warp|Warp]] is not just helpful but really really wise (and patient) and the hardcore command line skills that most wanna be app developers, me included, never bother to become hyperfluent in.  

```bash
which nvim
/opt/homebrew/bin/nvim
```

```bash
git commit
git rebase -i HEAD~3
git config --global --edit
```

Now, command's I am confident with:
[[lost-in-public/to-hero/Warp-Objects/neovim]] will open instead of nano. You can edit your message, and then:
•  To save and exit: `:wq`
•  To exit without saving: `:q!`
•  To just save: `:w`

### Assuring multi-line cursors in Git Commits. 
This is helpful because the default commit template is commented out. Part of it is the list of files that changed.  

If you don't have `vim-plug` already (and are wanting to use [[Tooling/Software Development/DevOps/Developer Experience/Neovim|Neovim]]) then 
```bash
curl -fLo "${XDG_DATA_HOME:-$HOME/.local/share}"/nvim/site/autoload/plug.vim --create-dirs \
    https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim
```

So, install a plugin that provides a multi-line cursor. 
From `~/.config` there should be an `nvim/init.lua` file.
```lua
use 'mg979/vim-visual-multi'
```

### Just attach a file to as Git Commit by passing the path as an argument
```bash
git commit -F path/to/your/message.txt

# if you want to review or edit it before it goes out:
git commit -e -F path/to/your/message.txt

# alternately, use the pipe constructor
echo "Your commit message" | git commit -F -