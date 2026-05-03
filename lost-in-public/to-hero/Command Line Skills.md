---
title: Command Line Skills
lede: Learn how to use the command line effectively.
date_initialized: 2025-03-07
date_authored_current_draft: 2026-04-30
date_authored_final_draft:
date_first_published:
date_last_updated:
at_semantic_version: 0.0.0.2
publish: true
authors:
  - Michael Staton
status: To-Do
augmented_with: Warp Terminal
category: To-Hero
tags: [Command-Line]
date_created: 2025-03-23
date_modified: 2025-11-14
site_uuid: 506da224-92e9-4800-b902-d9a1872537d3
slug: command-line-skills
og_favicon: https://ik.imagekit.io/xvpgfijuw/lossless-content-embeds/iconFor__CommandLine--Dark-Mode.webp?updatedAt=1763136849998
---

Check for ports that are open.
```bash
lsof -i :4321,4322
```

Kill running ports
```bash
lsof -ti:4321-4323 | xargs -r kill
```

Check for node processes in the filesystem observers
```bash
ps aux | grep -i "node.*tidyverse" | grep -v grep
```

Save the output of a command to a file.  In this example, `pnpm build`:
```bash
pnpm build 2>&1 | tee build_output.txt
```

# Find and Act on All Matching Files

A repeatable pattern for **discovering files scattered across a project and doing something to all of them at once** — copy, rename, archive, transform — without breaking a sweat or accidentally committing secrets.

## The Real Scenario

I have a monorepo with ~30 sub-projects, and each one has its own `.env` file holding API keys. I wanted to ship every one of them to a second machine without retyping a single value. The challenge:

- Files are nested 1–4 directories deep
- They all share the same name (`.env`), so a naive copy would clobber 36 of the 37 files
- They contain secrets, so step one is making sure git can never see them

## The How-To

### 1. Make a safe staging dir, and gitignore it *first*

Before you touch a single secret, decide where they're going and tell git to look the other way.

```shell
# Add the staging dir to .gitignore (do this BEFORE creating files in it)
echo "tmp/" >> .gitignore
echo "**/tmp/" >> .gitignore

# Create the dir
mkdir -p tmp/.env-vars
```

Then **prove it works** before you trust it:

```shell
# Drop a test file in and ask git if it sees it
touch tmp/.env-vars/test-file
git check-ignore -v tmp/.env-vars/test-file
# Output: .gitignore:65:**/tmp/  tmp/.env-vars/test-file
#         ^^^^^^^^^^^^^^^^^^^^^ git tells you which rule matched
rm tmp/.env-vars/test-file
```

If `git check-ignore` prints nothing, the file is **not** ignored and you should not proceed.

### 2. Find every matching file

```shell
find /Users/me/code/my-monorepo \
  -maxdepth 5 \
  -type f \
  \( -name ".env" -o -name ".env.*" \) \
  -not -path "*/node_modules/*" \
  -not -path "*/.git/*" \
  -not -path "*/tmp/*"
```

This prints every matching path. Run it first, eyeball the list, **then** start copying.

### 3. Copy each one with a unique, descriptive name

Naming matters because every file is called `.env`. Tag each one with where it came from so you'll know which is which on the other side.

```shell
DEST=tmp/.env-vars

# A small helper so we don't repeat ourselves
copy_env() {
  local src="$1"
  local dest_name="$2"
  cp "$src" "$DEST/$dest_name"
  echo "$dest_name  <-  $src" >> "$DEST/MANIFEST.txt"
}

copy_env "/path/to/repo/ai-labs/.env"               ".env.ai-labs"
copy_env "/path/to/repo/site/.env"                  ".env.site"
copy_env "/path/to/repo/site/.env.example"          ".env.example.site"
# ...one line per file
```

The naming convention is `<original-filename>.<context-suffix>`:

- `.env.ai-labs` — the `.env` from the `ai-labs` directory
- `.env.example.site` — the `.env.example` from the `site` directory
- `.env.test.twenty-server` — the `.env.test` from `twenty-server`

This is reversible: when you land on the new machine, the suffix tells you exactly which directory each file belongs back in.

### 4. Verify git is still clean

```shell
git status --porcelain | grep -E "tmp|env-vars" || echo "CLEAN"
```

If you see `CLEAN`, you're safe to commit unrelated changes. If you see file paths, **stop** and fix your `.gitignore`.

---

## Understanding What Just Happened

### `find` — the workhorse

```shell
find <where> -maxdepth <N> -type f \( -name "X" -o -name "Y" \) -not -path "*/skip/*"
```

| Flag | What it does |
|---|---|
| `-maxdepth 5` | Don't recurse deeper than 5 directories. Huge speed-up in big repos and stops `find` from spelunking into `node_modules`. |
| `-type f` | Only regular files (no directories, no symlinks). |
| `-name ".env"` | Match files literally named `.env`. |
| `-name ".env.*"` | Match `.env.example`, `.env.test`, etc. The `*` is a shell glob, not a regex. |
| `\( ... -o ... \)` | Logical OR. The backslashes are required because `(` and `)` are special to your shell. |
| `-not -path "*/node_modules/*"` | Skip anything under `node_modules`. Stack as many `-not -path` clauses as you like. |

### Why ignore *before* you create

Git's `.gitignore` only stops **untracked** files from being added. If you create a secret-laden file first, then add it to a tracked location, then *later* edit `.gitignore`, you can still accidentally `git add .` it before the rule applies. Order of operations:

1. Edit `.gitignore`
2. Verify with `git check-ignore`
3. Create files

### The manifest trick

```shell
echo "$dest_name  <-  $src" >> "$DEST/MANIFEST.txt"
```

`>>` appends a line to a file (vs `>` which overwrites). After 37 calls you have a plain-text map showing exactly which renamed file came from where. Future-you will thank present-you.

### Bash parameter expansion (bonus nerd points)

If you want to strip a long path prefix from a string:

```shell
src="/Users/me/code/repo/ai-labs/.env"
echo "${src#/Users/me/code/repo/}"
# Output: ai-labs/.env
```

`${var#prefix}` removes `prefix` from the start of `$var`. Use `##` for greedy match, `%` / `%%` to strip from the end. No `sed`, no `cut`, just shell.

---

## Adapting the Pattern

The same shape works for many "find scattered things, do one thing to each" tasks:

```shell
# Find all package.json files and print their "name" field
find . -maxdepth 4 -name "package.json" -not -path "*/node_modules/*" \
  -exec jq -r '.name' {} \;

# Find all README files and copy them into a docs/ folder, prefixed with their dir
find . -maxdepth 3 -name "README.md" -not -path "*/node_modules/*" | \
  while read -r f; do
    dir=$(basename "$(dirname "$f")")
    cp "$f" "docs/README.$dir.md"
  done

# Find every TODO comment in the repo
find . -maxdepth 6 -type f \( -name "*.ts" -o -name "*.js" \) \
  -not -path "*/node_modules/*" \
  -exec grep -Hn "TODO" {} \;
```

The recipe:

1. **Decide the scope** — depth, file types, what to skip
2. **Decide the action** — copy, rename, grep, transform
3. **Dry-run the find first** — never pipe straight into a destructive command without seeing the list
4. **If secrets are involved, gitignore before you touch anything**

That last one has saved me more than once.

