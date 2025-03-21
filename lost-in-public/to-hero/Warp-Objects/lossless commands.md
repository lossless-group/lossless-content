
```warp-runnable-command
warp-ai notebook add "Regular Expression for Tags Pattern" "Regular expression to match tags array format:

^tags: \[\"[^\"]+(?:\", \"[^\"]+\")*\"\]

Breakdown:
- ^          - Matches start of line
- tags: \[\" - Matches literally 'tags: [\"'
- [^\"]+     - Matches one or more non-quote characters (first tag)
- (?:\", \"[^\"]+\")* - Matches additional tags
- \"\]       - Matches closing '\"]'

Examples that will match:
- tags: [\"database\"]
- tags: [\"database\", \"Software-Development\"]
- tags: [\"database\", \"Software-Development\", \"Databases\"]"

```
```warp-runnable-command
rg --line-number '^tags: \["[^"]+(?:", "[^"]+").*"\]' | fzf --preview 'echo {}' --preview-window 'up:3'

```
```warp-runnable-command
rg '^tags: \["[^"]+(?:", "[^"]+").*"\]' | fzf
```
```warp-runnable-command
rg '^tags: \["[^"]+(?:", "[^"]+").*"\]' src/content/tooling | fzf
```
