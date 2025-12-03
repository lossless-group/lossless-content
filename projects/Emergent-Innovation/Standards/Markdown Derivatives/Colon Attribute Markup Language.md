---
github_repo_url: https://github.com/wikibonsai/caml-mkdn
date_created: 2025-04-25
date_modified: 2025-12-02
---
By the person behind [[projects/Emergent-Innovation/Examples/WikiBonsai|WikiBonsai]]

[[projects/Emergent-Innovation/Standards/Markdown|Extended Markdown]]

Syntax example:
```javascript
import * as caml from 'caml-mkdn';

let text = `
:key::value
:another-key::val1,val2,val3
:yet-another-key::
- 1
- 2
- 3

And some content!
`;
let payload = caml.load(text);

console.log(payload.data);
// should produce:
// {
//    key: 'value',
//    another-key: ['val1', 'val2', 'val3'],
//    yet-another-key: [1, 2, 3],
//  }

console.log(payload.content);
// should produce:
// 'And some content!'
```

[[Vocabulary/Comma-Separated Values|Comma-Separated Values]]
