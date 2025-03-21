
The temporary state is actually held in a JSON file\, where I found an active query\:
In \`\.\/obsidian\/workspace\.json
```json
          {
            "id": "ed6bb4f3bf3e8b99",
            "type": "leaf",
            "state": {
              "type": "search",
              "state": {
                "query": "/(^[\\w]+([\\w]+)*:)/",
                "matchingCase": false,
                "explainSearch": false,
                "collapseAll": true,
                "extraContext": false,
                "sortOrder": "byModifiedTime"
              },
              "icon": "lucide-search",
              "title": "Search"
            }
          },

```
However\, prior to that\, I had uninstalled and reinstalled and figured to clean the areas where MacOS stores temp state
```warp-runnable-command
mkdir ~/obsidian_backup
mv ~/Library/Application\ Support/obsidian ~/obsidian_backup/
mv ~/Library/Caches/obsidian ~/obsidian_backup/ 2>/dev/null
mv ~/Library/Preferences/obsidian* ~/obsidian_backup/ 2>/dev/null
mv ~/Library/Saved\ Application\ State/md.obsidian.savedState ~/obsidian_backup/ 2>/dev/null

rm -rf ~/Library/Application\ Support/obsidian
rm -rf ~/Library/Caches/obsidian
rm -rf ~/Library/Preferences/obsidian*
rm -rf ~/Library/Saved\ Application\ State/md.obsidian.savedState
```
