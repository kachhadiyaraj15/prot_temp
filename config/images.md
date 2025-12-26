---
# Image Configuration
# Define all image paths here and use variables in your markdown files
# Syntax: Use {{VARIABLE_NAME}} in your markdown files

# Project Images
PROJECT1_IMAGE: assets/images/project1.jpg
PROJECT2_IMAGE: assets/images/project2.jpg
PROJECT3_IMAGE: assets/images/project3.jpg
PROJECT_DEFAULT: assets/images/default-project.jpg

# Profile Images
PROFILE_IMAGE: assets/images/profile.jpg
AVATAR_IMAGE: assets/images/avatar.jpg

# Blog Images
BLOG_DEFAULT: assets/images/blog-default.jpg
BLOG_HERO: assets/images/blog-hero.jpg

# Icons and Logos
LOGO_IMAGE: assets/images/logo.png
FAVICON: assets/images/favicon.ico

# Social Media Banners
OG_IMAGE: assets/images/og-image.jpg
TWITTER_CARD: assets/images/twitter-card.jpg

# Background Images
HERO_BG: assets/images/hero-bg.jpg
ABOUT_BG: assets/images/about-bg.jpg

# Technology Icons (if you add them later)
REACT_ICON: assets/images/icons/react.svg
NODE_ICON: assets/images/icons/node.svg
PYTHON_ICON: assets/images/icons/python.svg
DOCKER_ICON: assets/images/icons/docker.svg
---

# Image Configuration Guide

## Usage

In any markdown file (blog posts, projects, about page, home page), use the variable syntax:

```markdown
![My Project]({{PROJECT1_IMAGE}})
```

This will automatically be replaced with:

```markdown
![My Project](assets/images/project1.jpg)
```

## Adding New Images

1. Add your image to the `assets/images/` directory
2. Define a new variable in the frontmatter above
3. Use the variable in your markdown files with `{{VARIABLE_NAME}}`

## Benefits

- **Single Source of Truth**: Change image paths in one place
- **Easy Refactoring**: Rename or move images without updating multiple files
- **Better Organization**: All image references in one location
- **Consistency**: Ensures same images are used across the site

## Examples

### In Project Markdown:
```markdown
---
title: My Project
image: {{PROJECT1_IMAGE}}
---

![Screenshot]({{PROJECT1_IMAGE}})
```

### In Blog Post:
```markdown
![Hero Image]({{BLOG_HERO}})

Check out my project:
![Project Preview]({{PROJECT2_IMAGE}})
```

### In About Page:
```markdown
![Profile Photo]({{PROFILE_IMAGE}})
```
