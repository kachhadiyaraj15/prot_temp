# Image Configuration System - Complete Guide

## 🎯 Overview

Your portfolio now has a **centralized image configuration system**! Define all image paths in one place (`config/images.md`) and use variables throughout your markdown files.

## 📁 Structure

```
config/
└── images.md          # Single source of truth for all image paths
```

## 🚀 How It Works

1. **Server** reads `config/images.md` via `/api/config/images` endpoint
2. **JavaScript** loads image variables on page load
3. **Variables** are replaced in markdown files before rendering
4. **One change** updates the image everywhere it's used

---

## ✏️ Defining Image Variables

Edit `config/images.md`:

```markdown
---
# Project Images
PROJECT1_IMAGE: assets/images/project1.jpg
PROJECT2_IMAGE: assets/images/project2.jpg
PROJECT3_IMAGE: assets/images/project3.jpg

# Profile Images
PROFILE_IMAGE: assets/images/profile.jpg

# Blog Images
BLOG_HERO: assets/images/blog-hero.jpg
---
```

---

## 💡 Using Image Variables

### In Markdown Files

Use the `{{VARIABLE_NAME}}` syntax anywhere:

```markdown
![My Project]({{PROJECT1_IMAGE}})
```

### In Frontmatter

Works in YAML frontmatter too:

```markdown
---
title: My Awesome Project
image: {{PROJECT1_IMAGE}}
---
```

### Example: Project File

**Before (hardcoded):**
```markdown
---
title: Web App
image: assets/images/project1.jpg
---

## Screenshots
![Screenshot 1](assets/images/project1.jpg)
![Screenshot 2](assets/images/project1.jpg)
```

**After (with variables):**
```markdown
---
title: Web App
image: {{PROJECT1_IMAGE}}
---

## Screenshots
![Screenshot 1]({{PROJECT1_IMAGE}})
![Screenshot 2]({{PROJECT1_IMAGE}})
```

**Benefits:**
- Change image path once in `config/images.md`
- Automatically updates everywhere

---

## 🎨 Common Use Cases

### 1. Update Project Image

**Old way:** Edit 3 project files individually

**New way:**
1. Edit `config/images.md`
2. Change `PROJECT1_IMAGE: assets/images/project1.jpg` to `PROJECT1_IMAGE: assets/images/new-project1.jpg`
3. Done! Updates everywhere

### 2. Move Images to CDN

**Scenario:** Moving images from local to CDN

**In `config/images.md`:**
```markdown
---
# Before
PROJECT1_IMAGE: assets/images/project1.jpg

# After
PROJECT1_IMAGE: https://cdn.example.com/images/project1.jpg
---
```

All references automatically update!

### 3. Add New Image Variable

**In `config/images.md`:**
```markdown
---
# Add new variable
NEW_FEATURE_IMAGE: assets/images/feature.jpg
---
```

**In your markdown:**
```markdown
![New Feature]({{NEW_FEATURE_IMAGE}})
```

---

## 📋 Current Image Variables

Your portfolio comes with these pre-defined variables:

| Variable | Default Path | Usage |
|----------|-------------|--------|
| `PROJECT1_IMAGE` | `assets/images/project1.jpg` | First project |
| `PROJECT2_IMAGE` | `assets/images/project2.jpg` | Second project |
| `PROJECT3_IMAGE` | `assets/images/project3.jpg` | Third project |
| `PROJECT_DEFAULT` | `assets/images/default-project.jpg` | Fallback for projects |
| `PROFILE_IMAGE` | `assets/images/profile.jpg` | Your profile photo |
| `AVATAR_IMAGE` | `assets/images/avatar.jpg` | Small avatar |
| `BLOG_DEFAULT` | `assets/images/blog-default.jpg` | Default blog image |
| `BLOG_HERO` | `assets/images/blog-hero.jpg` | Blog hero section |
| `LOGO_IMAGE` | `assets/images/logo.png` | Site logo |
| `FAVICON` | `assets/images/favicon.ico` | Browser favicon |
| `OG_IMAGE` | `assets/images/og-image.jpg` | Social media preview |
| `TWITTER_CARD` | `assets/images/twitter-card.jpg` | Twitter card image |
| `HERO_BG` | `assets/images/hero-bg.jpg` | Homepage hero background |
| `ABOUT_BG` | `assets/images/about-bg.jpg` | About page background |
| `REACT_ICON` | `assets/images/icons/react.svg` | React technology icon |
| `NODE_ICON` | `assets/images/icons/node.svg` | Node.js icon |
| `PYTHON_ICON` | `assets/images/icons/python.svg` | Python icon |
| `DOCKER_ICON` | `assets/images/icons/docker.svg` | Docker icon |

---

## 🔧 Adding New Variables

### Step 1: Add to config/images.md

```markdown
---
# Your new variable
MY_CUSTOM_IMAGE: assets/images/custom.jpg
---
```

### Step 2: Use in markdown files

```markdown
![Custom Image]({{MY_CUSTOM_IMAGE}})
```

### Step 3: That's it!

No code changes needed. The system automatically:
- Loads the new variable
- Replaces it in markdown
- Works everywhere immediately

---

## 🌟 Where Variables Work

Variables work in:

✅ **Project markdown files** (`projects/*.md`)
- Frontmatter `image:` field
- Content (descriptions, screenshots)

✅ **Blog posts** (`blog/tech/*.md`, `blog/non-tech/*.md`)
- Post content
- Inline images

✅ **About page** (`about/about.md`)
- Profile photos
- Any images in content

✅ **Home page** (`home/home.md`)
- Hero images
- Content images

✅ **All markdown content**
- Works in all `.md` files
- Frontmatter and content
- Multiple occurrences

---

## 🔄 How Variable Replacement Works

### Technical Flow

1. **Page loads** → JavaScript fetches `/api/config/images`
2. **Config loads** → All variables cached in memory
3. **Markdown loads** → Content fetched from server
4. **Variables replaced** → `{{VARIABLE}}` → actual path
5. **Markdown parsed** → Converted to HTML
6. **Page renders** → Images display with correct paths

### Example Transformation

**Input (markdown):**
```markdown
![Project]({{PROJECT1_IMAGE}})
```

**After variable replacement:**
```markdown
![Project](assets/images/project1.jpg)
```

**After markdown parsing:**
```html
<img src="assets/images/project1.jpg" alt="Project">
```

---

## 💪 Advanced Usage

### Conditional Images (Future Enhancement)

Currently, you can have environment-specific images:

```markdown
---
# Development
PROJECT1_IMAGE: assets/images/project1-dev.jpg

# Production (comment out dev, uncomment prod)
# PROJECT1_IMAGE: https://cdn.example.com/project1.jpg
---
```

### Multiple Environments

Create separate config files (requires code modification):
- `config/images.md` - Default
- `config/images-dev.md` - Development
- `config/images-prod.md` - Production

### Grouped Variables

Organize by category:

```markdown
---
# === PROJECTS ===
PROJECT1_IMAGE: assets/images/project1.jpg
PROJECT2_IMAGE: assets/images/project2.jpg

# === BLOG ===
BLOG_HERO: assets/images/blog-hero.jpg
BLOG_THUMBNAIL: assets/images/blog-thumb.jpg

# === ICONS ===
GITHUB_ICON: assets/images/icons/github.svg
TWITTER_ICON: assets/images/icons/twitter.svg
---
```

---

## 🧪 Testing Your Configuration

### 1. Check API Endpoint

```bash
curl http://localhost:8000/api/config/images | python3 -m json.tool
```

**Expected output:**
```json
{
  "variables": {
    "PROJECT1_IMAGE": "assets/images/project1.jpg",
    ...
  },
  "exists": true
}
```

### 2. Check Browser Console

Open browser DevTools and look for:
```
📸 Image configuration loaded: 18 variables
```

### 3. Verify Images Load

1. Visit projects page: http://localhost:8000/projects.html
2. Check that project images display
3. Right-click image → "Inspect"
4. Verify `src` attribute has correct path

---

## 🐛 Troubleshooting

### Problem: Images not loading

**Solution:**
1. Check variable name matches exactly (case-sensitive)
2. Verify image file exists at the path
3. Check browser console for errors

### Problem: Variable not replaced

**Solution:**
1. Ensure syntax is `{{VARIABLE}}` (double curly braces)
2. Check variable is defined in `config/images.md`
3. Restart server after changing config

### Problem: New variable not working

**Solution:**
1. Check for typos in `config/images.md`
2. Ensure proper YAML format (no extra spaces)
3. Hard refresh browser (Cmd+Shift+R / Ctrl+Shift+R)

### Problem: 404 on config endpoint

**Solution:**
1. Ensure `config/` directory exists
2. Ensure `config/images.md` file exists
3. Restart server

---

## 📝 Best Practices

### ✅ Do's

- **Use descriptive names**: `HERO_BACKGROUND` not `IMG1`
- **Group related variables**: Keep projects together, blogs together
- **Add comments**: Document what each variable is for
- **Use consistent naming**: All caps with underscores
- **Version control**: Commit `config/images.md` to git

### ❌ Don'ts

- **Don't use spaces in names**: `PROJECT IMAGE` ❌ → `PROJECT_IMAGE` ✅
- **Don't use special characters**: `PROJECT-1` ❌ → `PROJECT1` ✅
- **Don't hardcode paths**: Always use variables when possible
- **Don't delete variables**: Others might be using them

---

## 🚀 Migration Guide

### Converting Existing Files

**Before:**
```markdown
image: assets/images/project1.jpg
![Screenshot](assets/images/project1.jpg)
```

**After:**
```markdown
image: {{PROJECT1_IMAGE}}
![Screenshot]({{PROJECT1_IMAGE}})
```

### Bulk Find & Replace

1. Find: `assets/images/project1.jpg`
2. Replace: `{{PROJECT1_IMAGE}}`
3. Repeat for each image

---

## 🎯 Quick Reference

| Task | Action |
|------|--------|
| Add new variable | Edit `config/images.md` frontmatter |
| Use variable | `{{VARIABLE_NAME}}` in markdown |
| Change image path | Update path in `config/images.md` |
| Check variables | `curl localhost:8000/api/config/images` |
| View in browser | Open DevTools console |
| Restart after changes | Kill server, run `python3 server.py` |

---

## 🎉 You're All Set!

Your portfolio now has a powerful, maintainable image management system:

✅ **Single source of truth** for all image paths
✅ **Easy updates** - change once, updates everywhere
✅ **Clean markdown** - readable variable names
✅ **Flexible** - works with local files or CDN URLs
✅ **Automatic** - no manual find/replace needed

**Next Steps:**
1. ✏️ Customize variables in `config/images.md`
2. 🖼️ Update your actual images
3. 📝 Use variables in your markdown files
4. 🚀 Deploy with confidence!

---

**Happy coding! 🎨**
