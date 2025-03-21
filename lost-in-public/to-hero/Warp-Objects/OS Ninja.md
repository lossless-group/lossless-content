
Creates a short description of what I have installed through [Homebrew](https://brew.sh/)
```warp-runnable-command
brew list --formula | xargs brew desc > brew-installed-libraries.yaml
```
Another variant opens it with **bat**\:
```warp-runnable-command
brew list --formula | xargs brew desc | bat --language md --style=full > 

```
Autojump\:

## Targetting commands at hidden directories
Need to use grep\:
```warp-runnable-command
tree -a -d -I '[!.]*' #prints out all directories except hidden
tree -d -a --prune #did not return a hidden directory
tree -d -a -P ".*" #includes hidden directory, but prints out all directories
tree -a -d | grep "^[[:space:]]*[|]\{0,1\}--[[:space:]]*\." # prints out only hidden directories but not their contents
find . -name ".*" -type d -exec tree -a {} \; #prints out all directories and their contents. 

find . -type d -name ".*" -not -name "." | xargs tree -a #prints out all nested content of hidden directories. 

 #meets criteria, but only prints one level deep. 


```
# Output to a file with color scheme
```warp-runnable-command
brew install aha

```
```warp-runnable-command
tree -C | aha --black > tree-output.html
```
