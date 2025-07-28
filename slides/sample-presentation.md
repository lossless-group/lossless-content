---
title: Sample Markdown Presentation
description: A demo of markdown-based slides
slug: sample-presentation
---

# Sample Markdown Presentation

Welcome to markdown-based slides!

---

## Why Markdown?

- **Simple** - Just write text
- **Fast** - No complex formatting
- **Portable** - Works everywhere
- **Version Control** - Git-friendly

---

## Slide Separators

Use `---` (three dashes) to separate slides

```markdown
# Slide 1

Content here

---

# Slide 2

More content
```

---

## Vertical Slides

Use `--` (two dashes) for vertical slides

Press ↓ to go down

--

### I'm a vertical slide!

You can navigate up and down within a section

--

### Another vertical slide

Use these for related sub-topics

---

## Code Examples

```javascript
// JavaScript example
const greet = (name) => {
  console.log(`Hello, ${name}!`);
};

greet('World');
```

```python
# Python example
def greet(name):
    print(f"Hello, {name}!")

greet("World")
```

---

## Images and Media

![Demo Image](https://via.placeholder.com/600x400/0078ff/ffffff?text=RevealJS+Markdown)

*Images work just like in regular markdown*

---

## Tables

| Feature | Markdown | HTML |
|---------|----------|------|
| Easy to write | ✅ | ❌ |
| Easy to read | ✅ | ❌ |
| Version control | ✅ | ⚠️ |
| Styling | ⚠️ | ✅ |

---

## Lists and Fragments

1. First item
2. Second item
3. Third item

- Unordered item
- Another item
  - Nested item
  - Another nested

---

## Speaker Notes

Add speaker notes with HTML comments:

```html
<!-- .notes: These are speaker notes -->
```

<!-- .notes: Press 'S' to open speaker view -->

---

# Thank You!

[Back to all presentations](/slides/)

---

## Tips

- Press `F` for fullscreen
- Press `S` for speaker notes
- Press `ESC` for overview
- Press `?` for help