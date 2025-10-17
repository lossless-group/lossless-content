---
date_created: 2025-03-21
date_modified: 2025-10-14
site_uuid: dc99c733-0a2e-4261-93a6-146650d3f664
publish: true
title: "Mastering Git"
slug: mastering-git
at_semantic_version: 0.0.1.1
---

```bash
echo ".DS_Store" >> ~/.gitignore_global

# Tell Git to use this file 
git config --global core.excludesfile ~/.gitignore_global
```

The command `git config --global core.excludesfile ~/.gitignore_global` sets up a global Git ignore file that will apply to all your Git repositories on your machine. Let me break down what this does:

1. `git config --global` - This tells Git you want to make a change to your global Git configuration, which affects all repositories on your system.
    
2. `core.excludesfile` - This is the Git configuration setting that specifies a file containing patterns of files that Git should ignore across all repositories.
    
3. `~/.gitignore_global` - This is the path to the global ignore file. The `~` represents your home directory.
    

When you run this command, you're telling Git: "For all repositories on this computer, also ignore any files that match patterns listed in the `~/.gitignore_global` file."

This is particularly useful for ignoring system-specific files like `.DS_Store` (macOS), `.Thumbs.db` (Windows), or editor-specific files like `.vscode/` or `.idea/` that you never want to commit to any repository.

The benefit of using a global ignore file is that:

1. You don't need to add these patterns to each repository's individual `.gitignore` file
2. You don't risk accidentally committing these files if you forget to add them to a project's `.gitignore`
3. It keeps your project-specific `.gitignore` files focused on project-related patterns

In your case, since you've already added `.DS_Store` to this global file, Git will now ignore all `.DS_Store` files in all your repositories automatically, without you having to add this pattern to each repository's individual `.gitignore` file.

Feedback submitted

```bash
git log -1 --stat
```

```bash
git log -1 --patch
```

Generating...

```bash
brew install git-filter-repo
```

```bash
git filter-branch --index-filter 'git rm --cached --ignore-unmatch {{file_path}}' {{commit_hash}}^..{{commit_hash}}
```

```bash
git rm --cached "lost-in-public/to-hero/Warp-Objects/Model API Keys.env"
```

```bash
git commit --amend -CHEAD
```

```bash
git push --force-with-lease origin development
```


```bash
git filter-branch --index-filter 'git rm --cached --ignore-unmatch {{lost-in-public/to-hero/Warp-Objects/Model API Keys.env}}' {{d68603c4d554cd397fd4db64e6c2a875fb33bc0f}}^..{{d68603c4d554cd397fd4db64e6c2a875fb33bc0f}}
```

```
WARNING: git-filter-branch has a glut of gotchas generating mangled history
	 rewrites.  Hit Ctrl-C before proceeding to abort, then use an
	 alternative filtering tool such as 'git filter-repo'
	 (https://github.com/newren/git-filter-repo/) instead.  See the
	 filter-branch manual page for more details; to squelch this warning,
	 set FILTER_BRANCH_SQUELCH_WARNING=1.
Proceeding with filter-branch...
```

```
# First, install git-filter-repo if you haven't already
brew install git-filter-repo

# Then run the command to remove the sensitive file
git filter-repo --invert-paths --path 'lost-in-public/to-hero/Warp-Objects/Model API Keys.env' --refs d68603c4d554cd397fd4db64e6c2a875fb33bc0f^..d68603c4d554cd397fd4db64e6c2a875fb33bc0f
```

```bash
git rm -rf --cached temp_old_repo
```

```bash
 git rm --cached -r packages
```

Need to put your current code at the HEAD of another branch? 

```bash
git switch -C development
```

If you have staged changes with `git add` but have not commited, and want to reverse:
```bash
git reset
```

```bash
git checkout master
git merge -X theirs --squash development
git commit -m "feat(content): comprehensive update from development branch"
```

If you want to patch your last commit with no edit to last message
```bash
git commit --amend --no-edit
```

If you already pushed, you need to override the remote commit with a new commit hash:
```bash
git push --force-with-lease origin development
```

```bash
git show --name-only 751a182
```

```bash
git -C /Users/mpstaton/code/lossless-monorepo/site log -n 3 --pretty=format:"%h - %s (%cr)" development
```

```bash
git diff --name-only
```

```bash
git show
```

```bash
git submodule update --remote
```

```bash
git diff master..development -- .
git diff --stat development..origin/master
git log --graph --oneline --decorate development origin/master
```

`git log --graph --oneline --decorate development origin/master` produces the following:
![](https://i.imgur.com/l59Ng3S.png)

`git diff --stat development..origin/master` produces the following:
![](https://i.imgur.com/YpgDMoH.png)

```bash
git --no-pager branch -a
git rev-parse --is-inside-worktree
git fetch [site|content] 
```

```bash
git fetch --all --recurse-submodules=yes
git submodule update --init --recursive --remote --force
```

## When Images crash your Site

I added `visuals/Screenshots` to `.gitignore`
```zsh
git lfs migrate import --include="*.png" --everything

migrate: Sorting commits: ..., done.                                                                      
migrate: Rewriting commits: 100% (282/282), done.                                                         
  backup/20250607       2fee863d05f7ce225a8db7719526f78c5c48b934 -> c0cc50aebbc9cd019b2e08701992737dbc9afdde
  dev-squash            47aa6ed8d994ce664ae5ae5ca6ead8042d155fd6 -> 9aa6a2f82a6976591b9e8c0ed4165881cb240ef3
  dev-squash-tmp        aa02bd24993d9ba86d167f3f90a5ca2237a7bc63 -> 3e74adf4b97c7a64c1ec076a7013ab10e58a9e57
  development           6140c39ad667a67bd4543848496a23027a73d66b -> 2b8eda0fba9907fb8607db890ee0e2c7fa0b8770
  master                746551349161a41f64108221232df0b06f44f2f7 -> 82f181f5a60a65bbc772cb76b101b29b606d6120
  merge-temp            c2c3627182a07f6e609e6f52527cd4753f21ab01 -> 9007cf441e58507866d3249ac5f4bac772650638
  save-b725101          4a46493d2c9c3ecf6bedf1ef247224fa19ed6fa5 -> 7f28274a9ef4f9ebe7070f350c12fa0e3352f3f3
  save/20250715         5749c69674a9ebb3c6aa147e0df21d6f6e1125cb -> 24ff5436f12edebeb3dd39283bef55cc03b118dd
  squash-temp           eefe9340a52ec52aa88a54b18ee7386cff39dab6 -> b9b2b2af8db6a8204bb03203f9d401dcad9a1579
  temp-branch           5a46520cbec7633a36cdb54f4e919028828f825c -> c280c967b25922eb67dd7d291b7836fea02112c5
  temp-clean-branch     a4654bf52143c8d079c4e1eb66ce57a944fcf5d1 -> 34d0cc0346df43edc10bf9762baf7e261fd2d0ec
migrate: Updating refs: ..., done.                                                                        
migrate: checkout: ..., done.  
```


Then to remove the cache
```zsh
git filter-branch --force --index-filter 'git rm --cached --ignore-unmatch -r visuals/Screenshots/' --
prune-empty --tag-name-filter cat -- --all
```

# Starting from a Clone
```zsh
git remote rename origin upstream
```

# Git LFS
Git LFS (Large File Storage) is a Git extension that helps manage large files in your Git repositories. Here's a quick overview:

### What Git LFS Does:

1. **Handles Large Files**: Git isn't efficient with large files (like binaries, datasets, media files). LFS stores these files on a separate server while keeping only pointers in your Git repository.
    
2. **How It Works**:
    
    - When you add a large file, Git LFS replaces it with a small text pointer file.
    - The actual file content is stored in the LFS store.
    - When you clone or checkout, Git LFS downloads the correct version of the large file based on the pointer.
3. **Common Uses**:
    
    - Binary files (like .psd, .zip, .dll)
    - Media files (images, audio, video)
    - Large datasets
    - Game assets
    - Database dumps
```bash
git lfs install           # Set up Git LFS in your repository
git lfs track "*.psd"     # Start tracking a file type
git lfs ls-files          # Show currently tracked files
git lfs pull              # Download LFS files for current commit
git lfs push              # Upload LFS files to remote
```

# Git Stash
```zsh
git stash list
```

```zsh
git stash show -p stash@{n}  # Replace n with stash number
```

```zsh
git stash show stash@{n}  # Shows file changes
```

```zsh
git stash apply stash@{n}
```

```zsh
git stash pop stash@{n}
```

```zsh
git stash branch new-branch-name stash@{n}
```

```zsh
git stash clear
```

```zsh
git stash save "WIP: working on feature X"
```

```bash
git ls-tree -r temp/path-aliases-attempt assistant-context --name-only
```

