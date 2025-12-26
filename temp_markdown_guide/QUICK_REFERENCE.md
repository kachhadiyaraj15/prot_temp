# Quick Reference Card

## 🚀 Get Started in 3 Steps

```bash
# 1. Start server
python3 server.py

# 2. Edit config
vim config/site.md

# 3. Open browser
http://localhost:8000
```

---

## 📝 Common Tasks

### Disable a Section
```yaml
# config/site.md
enable_projects: false
```

### Change Navigation
```yaml
# config/site.md
navigation: home|Home|index.html, blog|Blog|blog.html
```

### Update Social Links
```yaml
# config/site.md
social_github: https://github.com/username
social_email: you@email.com
```

### Add Blog Post
```bash
# 1. Create file
blog/tech/my-post.md

# 2. Add frontmatter
---
title: My Post
date: 2024-01-15
published: true
tags: [JavaScript]
excerpt: Short description
---

# Content here...
```

### Add Project
```bash
# 1. Create file
projects/my-project.md

# 2. Add frontmatter
---
title: My Project
description: What it does
image: {{PROJECT1_IMAGE}}
technologies: [React, Node.js]
published: true
---

# Details here...
```

### Change Image Path
```yaml
# config/images.md
PROJECT1_IMAGE: assets/images/new-image.jpg

# Use in projects
image: {{PROJECT1_IMAGE}}
```

---

## 🎯 Configuration Quick Ref

### Pages
- `enable_home: true/false`
- `enable_about: true/false`
- `enable_projects: true/false`
- `enable_blog: true/false`

### Features
- `feature_theme_toggle: true/false`
- `feature_blog_filters: true/false`
- `feature_project_tags: true/false`
- `feature_social_links: true/false`

### Navigation Format
```yaml
navigation: page|Label|url.html, page|Label|url.html
```

---

## 🐛 Troubleshooting

### Changes not showing?
```bash
# Hard refresh: Ctrl+F5 (Windows) or Cmd+Shift+R (Mac)
# Or restart server:
Ctrl+C
python3 server.py
```

### Navigation broken?
```yaml
# Check format:
navigation: home|Home|index.html, blog|Blog|blog.html
# Note: page|label|url with pipes, comma separated
```

### Images not loading?
1. Check `config/images.md` has the path
2. Verify file exists in `assets/images/`
3. Check variable syntax: `{{VARIABLE_NAME}}`
4. Check browser console (F12) for 404 errors

### Page not accessible?
1. Check `enable_*: true` in config
2. Verify navigation includes the page
3. Hard refresh browser

---

## 📁 File Locations

```
config/
├── site.md          # ⚙️ Main configuration
└── images.md        # 🖼️ Image paths

home/home.md         # 🏠 Home page
about/about.md       # 👤 About page

blog/
├── tech/            # 💻 Tech posts
└── non-tech/        # ✍️ Other posts

projects/            # 🚀 Projects

assets/images/       # 🎨 Images
```

---

## 📖 Full Documentation

- [Setup Guide](SETUP_GUIDE.md) - Complete setup
- [Configuration Reference](CONFIGURATION_REFERENCE.md) - All options
- [Image Configuration](IMAGE_CONFIGURATION_GUIDE.md) - Images
- [Filter Panel](FILTER_PANEL_GUIDE.md) - Blog filters

---

## 💡 Pro Tips

1. **One change at a time** - Test each change before making another
2. **Backup configs** - Copy working config before big changes
3. **Use Git** - Track all changes with version control
4. **Check console** - Press F12 to see errors
5. **Read docs** - All answers are in the guides

---

## 🎨 Use Case Templates

### Developer Portfolio
```yaml
enable_home: true
enable_about: true
enable_projects: true
enable_blog: true
navigation: home|Home|index.html, about|About|about.html, projects|Projects|projects.html, blog|Blog|blog.html
```

### Blog Only
```yaml
enable_home: true
enable_about: false
enable_projects: false
enable_blog: true
navigation: home|Home|index.html, blog|Posts|blog.html
```

### Project Showcase
```yaml
enable_home: true
enable_about: true
enable_projects: true
enable_blog: false
navigation: home|Home|index.html, projects|Work|projects.html, about|About|about.html
```

### Minimal
```yaml
enable_home: true
enable_about: true
enable_projects: false
enable_blog: false
navigation: home|Home|index.html, about|About|about.html
```

---

## 🚀 Quick Commands

```bash
# Start server
python3 server.py

# Stop server
Ctrl+C

# Check server running
curl http://localhost:8000

# Test config API
curl http://localhost:8000/api/config/site

# View logs (if running in background)
tail -f /tmp/server.log
```

---

## 🔥 Hot Keys

- `F12` - Open DevTools
- `Ctrl+Shift+R` (Mac: `Cmd+Shift+R`) - Hard refresh
- `Ctrl+F5` - Hard refresh (Windows)
- Browser Console - Check for errors

---

**Need more help?** Check the [Setup Guide](SETUP_GUIDE.md)!
