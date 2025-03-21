



1. `git checkout`on the content directory without checking status first \- this could overwrite their local changes
2. `git reset --hard` \- this would discard all uncommitted changes
3. `git clean -fd` \- this would remove untracked files
4. Incorrectly using `git sparse-checkout` commands without first ensuring all content changes are saved
5. `git restore`  on content files without checking what\'s being restored
6. Running `git pull` with rebase without first checking for local changes\.
Always do a 
```warp-runnable-command
git pull [remote] [local-branch]
```
See what files are being worked with in the sparsecheckout file\. Or change it\. 
`.git/info/sparse-checkout`
If you change it you have to write `git sparse-checkout reapply`
```warp-runnable-command
git sparse-checkout disable

```
To turn it back on\:
```warp-runnable-command
git sparse-checkout init
```
Before committing run
```warp-runnable-command
git status

```
Before pushing\:
```warp-runnable-command
git pull origin main


```
```warp-runnable-command
# First command - see all branches sorted by date
git --no-pager for-each-ref --sort=-committerdate refs/heads/ --format='%(refname:short) %(committerdate:relative)'

# Second command - see branches sorted by number of commits
for branch in $(git branch --format="%(refname:short)"); do
    count=$(git rev-list --count $branch)
    echo "$count $branch"
done | sort -rn | head -n 5
```
I can see your sparse\-checkout configuration file is located at \.git\/info\/sparse\-checkout\. The file contains the following pattern rules\:

1. \/\* \- Initially includes all files at the root level
2. \!\/\*\/ \- Excludes all directories
3. \/content\/ \- Explicitly includes the content directory
4. \/site\/ \- Explicitly includes the site directory

This configuration means you\'re only checking out files in the root directory plus the content and site directories\, while excluding everything else\.

You can modify this file directly with a text editor\, or more safely using Git commands\:
•  git sparse\-checkout add \<pattern\> to add new patterns
•  git sparse\-checkout set \<pattern\> to replace all patterns
•  git sparse\-checkout list to view current pattern
# Setup Process
This is the process I went through
From the root of the Monorepo
```warp-runnable-command

ln -s "$(pwd)/content/lost-in-public" "~/content-md/lossless/Lost in Public"

```
```warp-runnable-command
ln -s "$(pwd)/content/organizations" "/Users/mpstaton/content-md/lossless/Organizations"


```
```warp-runnable-command
ln -s "$(pwd)/content/tooling" "/Users/mpstaton/content-md/lossless/Tooling"

```
```warp-runnable-command
ln -s "$(pwd)/content/concepts" "/Users/mpstaton/content-md/lossless/Concepts"


```
```warp-runnable-command
ln -s "$(pwd)/content/vocabulary" "/Users/mpstaton/content-md/lossless/Vocabulary"

```
```warp-runnable-command
ln -s "$(pwd)/content/visuals" "/Users/mpstaton/content-md/lossless/Visuals"

```
```warp-runnable-command
git tag -a v0.0.5.0 -m "Initial version before moving to organization"

git tag -a checkpoint -m "Initial version before moving to organization"


```
```warp-runnable-command
git remote set-url --add monorepo https://github.com/lossless-group/lossless-monorepo.git

```
Now le\'ts set up sparse commit
```warp-runnable-command
brew install git-lfs

git sparse-checkout init
git sparse-checkout set '/*' '!content/*'



```
```warp-runnable-command
git remote add origin https://github.com/lossless-group/lossless-content.git

git remote set-url origin git@github.com:YOUR-ORG-NAME/REPO-NAME.git

```
```warp-runnable-command
git add .

git commit

git push site main --force

git checkout -b development

```
Renamed the new git remote to content
```warp-runnable-command
git remote rename origin content


```
```warp-runnable-command
git submodule add https://github.com/your-content-repo.git content

git submodule update --remote

```
```warp-runnable-command
export const collections = {
    blog: defineCollection({
        type: 'content',
        source: '../../content/*.md'  // Adjust path based on where you added the submodule
    })
};

```
