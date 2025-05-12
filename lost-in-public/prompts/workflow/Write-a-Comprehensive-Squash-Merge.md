---
title: 'Write a Comprehensive Git Squash-Merge'
lede: 'A step-by-step, human-readable workflow for safely squash-merging development into master in a multi-contributor project.'
date_authored_initial_draft: 2025-04-21
date_authored_current_draft: 2025-04-22
date_authored_final_draft: null
date_first_published: null
date_last_updated: null
at_semantic_version: 0.0.1.0
status: Implemented
augmented_with: 'Windsurf Cascade on Claude 3.5 Sonnet'
category: Prompts
date_created: 2025-04-21
date_modified: 2025-04-22
image_prompt: "A visual representation of a Git squash-merge: two tree branches merging into one tree. Code is like leaves, being consolidated, with warnings signs and a checklist pinned on it."
portrait_image: https://ik.imagekit.io/xvpgfijuw/uploads/lossless/prompts/workflow/2025-05-05_portrait_image_Write-a-Comprehensive-Squash-Merge_3aa29eed-4fbf-4faf-a123-2387a302ec79_yzln1khf9.webp
banner_image: https://ik.imagekit.io/xvpgfijuw/uploads/lossless/prompts/workflow/2025-05-05_banner_image_Write-a-Comprehensive-Squash-Merge_c5a78ad6-8e13-480c-ad1c-46d0d6bfd237_YV0093SGZ.webp
site_uuid: 66af63f5-4d05-4b7d-b8de-829503c04fe8
tags: 
  - Git-Workflow
  - Tips-and-Tricks
  - Version-Control
  - Best-Practices
  - Continuous-Integration
  - Documentation
  - Collaboration-Tools
  - Collaborative-Workflow
authors: 
  - Michael Staton
---
```javascript
interface Props {
  code: string;
  lang: string;
}

```


```markdown
release(content): squash merge development into master



Summary:

This release merges all changes from the development branch into master, consolidating weeks of content, metadata, prompt, and YAML automation improvements. The following is a chronological summary of all commits included in this squash, preserving the intent and traceability of every feature, fix, and refactor.

Changelog:

- Major prompt, reminder, and documentation restructuring
- YAML property, metadata, and automation improvements
- Banner and portrait image standardization
- New and improved issue resolution documentation
- Expanded and standardized changelogs, specs, and session logs
- Content, concepts, and prompt architecture enhancements
- Tooling, vocabulary, and UI documentation updates

For details on any specific change, see the commit summaries above or refer to the development branch history.

Included Commits:

47aa6ed improve(prompts): add banner_image with wide dimensions to prompts
957613b new(issue-resolution): new issue resolution on change key script
9c5084e fix(yaml): fix yaml property in prompts from banner_image to portrait image
53126af assert(yaml), new(issue-resolution, tool): assured banner images and new issue resolution + tool
54dde52 format(thread): format yaml for new Reminders thread
2a82a96 patch(files): modified files
d18361b refactor(content): canonicalize reminders, update image key, and restructure content threads
156e8ee prompts-updates, reminders-updates, changelog, visuals, specs, tools, concepts, up-and-running, organizations  major content restructuring, new docs, reminders, and assets
4425d4f new(prompts): add various UI prompts
c372b7c new(prompts): new prompts, more changelog
22a6e82 new(images): generate new banner images for specifications content
df61f36 new(prompt): new prompt to "Help with copywriting" in YAML properties
6f8b4a4 fix(yaml): fix yaml
6014b72 chore(yaml): improved naming conventions and yaml
6b81ee4 Added tanuj as Author
14f803d changelog 4/18
524e26d changelog 4/18
f1ded27 changelog 4/18
a4654bf chore(content): changelog, prompt, and report updates
1963359 updates(prompts): YAML automation, reporting, and content integrity overhaul
0165738 new(changelog): new changelog files
00890bc fix(yaml): fix YAML for changelog--code
94b5de3 tools-updates update metadata, add new tools, revise browser entries
e6fe219 update(yaml): touch up yaml for bettercards in tooling
36c9404 updates(metadata): update metadata
b96bfc9 updates(opengraph): add opengraph data
b5d3dbc updates(metadata): updates to metadata plus changelog
db380c9 content, concepts, lost-in-public, specs: update prompt, exploration, issue resolution, and observer specs
afa5c18 content(tooling,vocabulary): add new hardware/software/enterprise docs and update data/AI vocabularies
006ac9a content(tooling,vocabulary): add new hardware/software/enterprise docs and update data/AI vocabularies
210dd7c content(lost-in-public): add and update prompts, issue resolutions, and reporting standards
9bae991 update(backlinks): changed casing of directories in Obsidian
8c9576c feat(content): Deep micromark/remark-gfm technical docs, explicit extension prompt, and changelog
34e91dc prerun(script): save state prior to running citation-script
d234db0 feat(content): Improve prompt clarity, metadata integrity, and documentation across content submodule
d78b1d7 updates(logs): add and update session logs
edc7bb7 new(specs, changelog), updates(specs): new and updated specifications
1ba7742 prerun(specs): ask AI Assistant to create new specs
ecc1f7e content, tooling, specs: Major content updates across AI tools and dev documentation
b00eb77 updates(content): general updates to content
c86e8e6 mv(dir): move Explainers for AI
28eb568 mv(dir), add(url): re-add url properties from previous content state, move AI Explainers into Concepts
313c140 mv(dir): move sessions to prevent Obsidian from snagging
7231882 restore(yaml): restore url property from previous glitch
5c2031b feat(content): integrate banner images, add prompts, docs, visuals
fc20de8 workflow(new): prompts, changelog, sessions
3ab7669 updates(metadata): update metadata
34d10bb attempt(citations): attempt observer on citations
83477ed prerun(observer): save state of files before running filesystem observer
44ee6c5 fix(yaml): fix yaml for specifications
2d3e995 docs, specs: add CSS animation system documentation and standardization
2776f4e new(prompts): add prompts for integrate collection and refactor component architecture
0253e3c chore: remove .DS_Store files from Git tracking and add .gitignore
7d71925 new(stream): add stream "keeping up" for developments in tooling such as releases, etc
ec93e43 new(stream): add new content stream "Essays"
9832269 add(prompt): add prompt and then also touch up tooling
e37fbf5 patch(ntsh): don't worry
5acfcb9 tweak(vocab): tweak vocab files
50745ce new(content): new prompts, issue resolutions
dfd6499 improve(tooling): tweak metadata per my insights
5b7ccc1 new(changelog): add new code and content changelog
7ad0932 fixes(yaml): fixed all timestamps where unnecessary
f7dbe96 clean(dates): cleaned timestamps off of dates in vocabulary
6d5d29a fix(frontmatter): standardize authors list format and fix formatting issues
3233a9f assure(yaml): assure yaml frontmatter across prompts  Changes to be committed:  new file:   lost-in-public/prompts/data-integrity/Enhanced-Filesystem-Observer-with-Prompts-Support.md  modified:   lost-in-public/prompts/data-integrity/Fix-one-YAML-Issue-at-a-Time--alt.md  modified:   lost-in-public/prompts/data-integrity/Integrate-Citations-Format-Hex-into-Observer.md       modified:   lost-in-public/prompts/data-integrity/Return-only-files-with-valid-Frontmatter..md  modified:   lost-in-public/prompts/data-integrity/Use-Filesystem-Observer-to-Assert-Frontmatter-Updated.md      new file:   lost-in-public/sessions/2025-04-11_01.md
2c4318f assure(yaml): assure consistent Prompt yaml for workflow subdir
6e3916f fix(content): standardize frontmatter in user-interface prompts
1fd30e4 fix(content): standardize frontmatter in render-logic prompts
1a46197 fix(content): standardize frontmatter format across prompt files
31b1a48 assert(yaml): assert YAML consistency
99bb727 mods(minor): change metdata for tooling
486ffb4 new(changelog): changelogs detailing today's progress
55a2148 update(metadata): assure screenshots from opengraph api
ecd0276 updates(metadata): used observer to update metadata for all files
68b6225 docs(content): add citation documentation and update AST rendering docs
89d29cf docs(changelog): update content changelog with citation documentation
c5617f5 new(sys): add prompts, logs, etc.
9906330 prebuild(render): save content related to context for Cadence prior to new AST transform
  

**This squash merge preserves a clean master history while retaining the full detail of all development work.**

***

# CRITICAL WARNING: NEVER OVERRIDE MASTER HISTORY WITH DEVELOPMENT HISTORY

## Absolute Rules for Safe, Clean Squash-Merges

- **NEVER** use `git reset --hard development` or any command that points `master` to the full development branch history. This will ERASE all unique master commits and destroy the curated master timeline. This is IRREVERSIBLE unless you have a backup.
- **ALWAYS** preserve the unique commit history of master. Only changes since the LAST merge from development to master should be squashed and merged.
- **NEVER** fast-forward or force-push master to development unless you are 100% certain there are no unique master commits to preserve. This is almost never the case in a real project.

## Proper, DRY, and Human-Readable Squash-Merge Workflow

### 1. Identify the Last Merge Commit
- Find the last commit where development was merged into master. Use:
  ```bash
  git log --oneline --graph --decorate master
  ```
- Note the commit hash of the last merge (call this `<last-merge>`).

### 2. Review Changes Since Last Merge
- See what will be included in the squash:
  ```bash
  git log <last-merge>..development --oneline
  ```
- Review for any files or changes that should NOT be included.

### 3. Create a Temporary Branch for the Squash
- This is a safety step:
  ```bash
  git checkout master
  git pull origin master
  git checkout -b squash-temp
  ```

### 4. Squash-Merge Changes from Development
- This will stage all changes since `<last-merge>` as one commit:
  ```bash
  git merge --squash development
  ```
- If you only want changes since `<last-merge>`, use an interactive rebase or cherry-pick as needed.

### 5. Write a Comprehensive Commit Message
- List all included features, fixes, and improvements.
- Reference all relevant issues, PRs, and documentation.
- Example:
  ```
  squash: merge all changes from development since <last-merge>
  
  - Feature: ...
  - Fix: ...
  - Refactor: ...
  See commits: <git log <last-merge>..development --oneline>
  ```

### 6. Commit and Test
  ```bash
  git commit -m "<comprehensive message>"
  # Test your build, run all checks
  ```

### 7. Merge or Fast-Forward Master (if safe)
- If master has not diverged, you can fast-forward:
  ```bash
  git checkout master
  git merge squash-temp
  git push origin master
  ```
- If master has diverged, resolve conflicts and only force-push if you are certain.

### 8. Clean Up
- Delete temporary branches after confirming success.

***

# DO NOT EVER:
- DO NOT reset master to development
- DO NOT merge development into master without squashing
- DO NOT force-push master unless you have a backup and are certain

***

# Troubleshooting and Recovery
- If you accidentally overwrite master, use `git reflog` immediately to find the previous commit and restore it.
- Always create a backup branch before destructive operations:
  ```bash
  git branch master-backup
  ```

***

# Summary

- Always preserve master’s unique history.
- Only squash-merge changes since the last merge.
- Never, ever override master with development’s full history.
- Document every squash-merge with a detailed, human-readable commit message.

***

# Example Command Sequence

```bash
git checkout master
git pull origin master
git checkout -b squash-temp
git merge --squash development
# git merge-base master development  # Find <last-merge>
# git log <last-merge>..development --oneline   # Review changes
git checkout master
git merge squash-temp
git checkout --theirs . # prefers the squash-temp branch if conflicts
git add .
# Ask AI Code Assistant to write comprenehsive squash commit message, using this prompt
git commit
git push origin master
```

***

# NEVER OVERRIDE MASTER HISTORY. SQUASH ONLY WHAT’S NEEDED. ALWAYS DOCUMENT.