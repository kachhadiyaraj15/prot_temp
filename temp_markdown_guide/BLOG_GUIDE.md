# Blog System - Frontmatter Guide

## How to Add a New Blog Post

### Quick Start (2 Steps):

1. **Create a new `.md` file** in the `blog/` folder (e.g., `my-awesome-post.md`)

2. **Add frontmatter** at the top with `published: true`:

```markdown
---
title: Your Blog Post Title
date: 2025-01-20
published: true
tags: [JavaScript, Tutorial, Web Development]
excerpt: A brief description that appears in the blog list
readingTime: 5 min read
---

## Your Content Starts Here

Write your blog post content using Markdown...
```

That's it! The blog system **automatically discovers** all `.md` files in the `blog/` folder. Just drop your file in and it will appear on your blog (if `published: true`).

### Template Files

Files starting with `_` (like `_template.md`) are automatically ignored and won't appear in the blog list.

## Frontmatter Fields

| Field         | Required | Type    | Description                                      |
|---------------|----------|---------|--------------------------------------------------|
| `title`       | Yes      | String  | The blog post title (becomes the H1)             |
| `date`        | Yes      | String  | Publication date (YYYY-MM-DD format)             |
| `published`   | Yes      | Boolean | `true` to show, `false` to hide                  |
| `tags`        | Yes      | Array   | List of tags: `[Tag1, Tag2, Tag3]`               |
| `excerpt`     | Yes      | String  | Short description for the blog list              |
| `readingTime` | Yes      | String  | Estimated reading time (e.g., "5 min read")      |

## Publishing Control

- Set `published: true` to make the post visible on your blog
- Set `published: false` to hide it (useful for drafts)
- Only published posts will appear in the blog list

## Writing Tips

1. **Don't use H1 (`#`) in your content** - the title from frontmatter becomes the H1
2. **Start with H2 (`##`)** for main sections
3. **Use H3 (`###`)** for subsections
4. **Use the template** at `blog/_template.md` as a starting point

## Example Post

See `blog/_template.md` for a complete example with all frontmatter fields.
