---
date_created: 2025-03-08
date_modified: 2025-09-05
tags: [Version-Control, Continuous-Integration, Desktop-App, Text-Editors]
site_uuid: 3f364d68-984f-4244-8895-742e1e2c5af7
publish: true
authors: [Michael Staton]
title: "Up And Running With Nova As The Default Diff Tool."
slug: up-and-running-with-nova-as-the-default-diff-tool
at_semantic_version: 0.0.0.1
og_favicon: https://ik.imagekit.io/xvpgfijuw/lossless-content-embeds/appIcon__Nova.png?updatedAt=1757077269779
---


[[Tooling/Software Development/DevOps/Developer Experience/Nova|Nova]] is a beautiful [[concepts/Explainers for Tooling/Text Editors or IDEs|Text Editor]] if you're on a [[organizations/Apple|Apple]] machine, and you don't need all the functionality of a hardy, possibly bloated [[concepts/Explainers for Tooling/Text Editors or IDEs|IDE]].

However, where it's really mindblowing is how it visualizes [[Vocabulary/Diffs]].  It's hands down the easiest way to work through the merge or pull request process. And it's so beautiful and elegant and smooth and, frankly, stylish that it turns what was once a painful task to something to look forward to.  

## Set up [[Tooling/Software Development/DevOps/Developer Experience/Nova|Nova]] as your default [[Vocabulary/Diffs]] tools using the command line:

```bash
ls -l "/Applications/Nova.app/Contents/SharedSupport/nova"
```

```bash
git config --global diff.tool nova
git config --global difftool.nova.cmd '"/Applications/Nova.app/Contents/SharedSupport/nova" "$LOCAL" "$REMOTE"'
git config --global difftool.prompt false

```

Instead of using  `git diff` to resolve conflicts, you use `git difftool`
```bash
git difftool  # Shows all changes
git difftool path/to/file  # Shows changes for specific file
```

•  Nova will automatically open when you use git difftool
•  The prompt asking to launch the diff tool is disabled
•  The configuration is global, so it works in all your Git repositories
