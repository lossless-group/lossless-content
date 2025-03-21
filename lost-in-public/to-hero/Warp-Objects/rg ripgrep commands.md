```warp-runnable-command
rg 
^[a-z]+(-[a-z]+)*:

```
```warp-runnable-command
\bwikipedia-\b

```
```warp-runnable-command
rg '^[a-z]+(-[a-z]+)*:' --no-heading --with-filename -n --only-matching | awk -F':' '{printf "\"%s\",\"%s\",\"%s\"\n", $1, $2, $3}' > yaml_matches.csv

```
```warp-runnable-command
rg '^[a-z]+(-[a-z]+)+:' --no-heading --with-filename -n --only-matching | sed 's/:/,/g' > yaml_matches.csv

```
```warp-runnable-command
rg -n ^[a-z]+(?:-[a-z]


```
```warp-runnable-command
/[a-z$:/
/[a-z](?=-)[a-z](?=:)/

    /[a-z]\b-\b(?:-[a-z]
[a-z]*\b-\b[a-z]*(?=:)[\ ][http]
(([a-z]+(-[a-z]+)+:)+)
(?=(^---\n*))(?s)(.*)(?=(^---\n*))
^[a-z]+-+[a-z]+

```
```warp-runnable-command
(?=(^---))()(?s)(.*^[a-z]+-+[a-z])(?=(^---))

(^[\w]+(-[\w]+)*:)

(.*?(-{3}))

^---\s*([^---]*?)([a-z]+(-[a-z]+*)\s*:) 
```
