---
date_created: 2025-03-20
date_modified: 2025-04-24
site_uuid: 641fe031-3da5-4187-bcc5-00d0c379512e
---

## Embed Syntax
Found from [[Tooling/Software Development/DevOps/Documentation Engines/Readme]]

Simple embedded content is written as a Markdown link, with a title of "@embed", like so:

```
[Embed Title](https://youtu.be/8bh238ekw3 "@embed")
```

More robust embedded content is written as a JSX component:

```
<Embed
  html={false}
  url="https://github.com/readmeio/api-explorer/pull/671"
  title="RDMD CSS theming and style adjustments. by rafegoldberg · Pull Request #671 · readmeio/api-explorer"
  favicon="https://github.com/favicon.ico"
  image="https://avatars2.githubusercontent.com/u/6878153?s=400&v=4"
/>
```

##