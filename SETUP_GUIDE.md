# 🚀 Portfolio Template - Setup Guide

Welcome! This is a **fully customizable portfolio template** that you can configure without writing any code. Everything is controlled through simple configuration files.

## 📋 Table of Contents

1. [Quick Start](#quick-start)
2. [Configuration Files](#configuration-files)
3. [Customization Guide](#customization-guide)
4. [Common Use Cases](#common-use-cases)
5. [Troubleshooting](#troubleshooting)
6. [Advanced Features](#advanced-features)

---

## 🎯 Quick Start

### Prerequisites

- Python 3.x installed
- A text editor (VS Code, Sublime, Notepad++, etc.)

### Installation

1. **Clone or download this repository**
   ```bash
   cd portfolio-template
   ```

2. **Start the development server**
   ```bash
   python3 server.py
   ```

3. **Open your browser**
   - Navigate to: `http://localhost:8000`
   - Your portfolio is now running!

### First Steps

1. Edit `config/site.md` to configure your portfolio
2. Edit `config/images.md` to update image paths
3. Edit content in `home/home.md`, `about/about.md`
4. Add your projects in `projects/` directory
5. Add your blog posts in `blog/` directory

---

## 📁 Configuration Files

### 1. Site Configuration (`config/site.md`)

**Controls:** Site structure, navigation, features, and metadata

**Location:** `config/site.md`

**Key Settings:**

```yaml
# Enable/Disable Sections
enable_home: true
enable_about: true
enable_projects: true
enable_blog: true

# Navigation (appears in header)
navigation: home|Home|index.html, about|About|about.html, projects|Projects|projects.html, blog|Blog|blog.html

# Feature Flags
feature_theme_toggle: true
feature_blog_filters: true
feature_project_tags: true

# Social Links
social_github: https://github.com/username
social_email: your@email.com
```

### 2. Image Configuration (`config/images.md`)

**Controls:** Centralized image path management

**Location:** `config/images.md`

**How it works:**
- Define image paths once
- Use `{{VARIABLE_NAME}}` in markdown files
- Change the path in one place, updates everywhere

**Example:**
```yaml
# In config/images.md
PROJECT1_IMAGE: assets/images/project1.jpg

# In projects/my-project.md
image: {{PROJECT1_IMAGE}}
```

### 3. Home Page (`home/home.md`)

**Controls:** Landing page content

**Format:**
```markdown
---
name: Your Name
title: Your Title
bio: Your bio text
github: https://github.com/username
twitter: https://twitter.com/username
linkedin: https://linkedin.com/in/username
email: your@email.com
---

# Your markdown content here
This appears on the home page below your name and bio.
```

### 4. About Page (`about/about.md`)

**Controls:** About page content

**Format:**
```markdown
---
name: Your Name
tagline: Your tagline
location: Your Location
github: https://github.com/username
email: your@email.com
---

# About Me
Your about content in markdown format...
```

---

## 🎨 Customization Guide

### Scenario 1: Remove Projects Section

**Goal:** Hide projects entirely (blog-focused site)

**Steps:**

1. Open `config/site.md`
2. Change: `enable_projects: false`
3. Update navigation: `navigation: home|Home|index.html, blog|Blog|blog.html`
4. Save and refresh browser

**Result:** Projects link disappears from navigation, projects page is inaccessible

### Scenario 2: Change Navigation Order

**Goal:** Move Blog before About

**Steps:**

1. Open `config/site.md`
2. Edit navigation line:
   ```yaml
   navigation: home|Home|index.html, blog|Blog|blog.html, about|About|about.html, projects|Projects|projects.html
   ```
3. Save and refresh

**Result:** Navigation order changes to: Home → Blog → About → Projects

### Scenario 3: Disable Theme Toggle

**Goal:** Lock theme to dark mode

**Steps:**

1. Open `config/site.md`
2. Change: `feature_theme_toggle: false`
3. Save and refresh

**Result:** Theme toggle button disappears

### Scenario 4: Update Social Links

**Goal:** Add your social profiles

**Steps:**

1. Open `config/site.md`
2. Update social links:
   ```yaml
   social_github: https://github.com/yourusername
   social_twitter: https://twitter.com/yourusername
   social_linkedin: https://linkedin.com/in/yourusername
   social_email: you@example.com
   ```
3. Leave blank to hide: `social_youtube:`
4. Save and refresh

**Result:** Your social links appear in footer and social sections

### Scenario 5: Change Site Name

**Goal:** Update site title and branding

**Steps:**

1. Open `config/site.md`
2. Change:
   ```yaml
   site_name: Your Name's Portfolio
   site_tagline: Full Stack Developer
   site_description: Portfolio showcasing my work
   ```
3. Also update `home/home.md`:
   ```markdown
   ---
   name: Your Name
   title: Full Stack Developer
   ---
   ```
4. Save and refresh

---

## 💼 Common Use Cases

### Use Case 1: Minimal Portfolio (Home + About Only)

**Configuration:**
```yaml
enable_home: true
enable_about: true
enable_projects: false
enable_blog: false

navigation: home|Home|index.html, about|About|about.html
```

**Perfect for:**
- Simple personal websites
- Resume sites
- Landing pages

### Use Case 2: Blog-Only Site

**Configuration:**
```yaml
enable_home: true
enable_about: false
enable_projects: false
enable_blog: true

navigation: home|Home|index.html, blog|Blog|blog.html

feature_blog_filters: true
```

**Perfect for:**
- Personal blogs
- Tech blogs
- Writing portfolios

### Use Case 3: Full Portfolio

**Configuration:**
```yaml
enable_home: true
enable_about: true
enable_projects: true
enable_blog: true

navigation: home|Home|index.html, about|About|about.html, projects|Projects|projects.html, blog|Blog|blog.html
```

**Perfect for:**
- Software developers
- Designers
- Freelancers
- Job seekers

### Use Case 4: Project Showcase

**Configuration:**
```yaml
enable_home: true
enable_about: true
enable_projects: true
enable_blog: false

navigation: home|Home|index.html, projects|Projects|projects.html, about|About|about.html

feature_project_tags: true
projects_show_featured_only: false
```

**Perfect for:**
- Showcasing work
- Design portfolios
- Developer portfolios

---

## 📝 Adding Content

### Adding a Blog Post

1. **Create a markdown file** in `blog/tech/` or `blog/non-tech/`
   - Example: `blog/tech/my-first-post.md`

2. **Add frontmatter:**
   ```markdown
   ---
   title: My First Blog Post
   date: 2024-01-15
   excerpt: This is a short description of my post
   tags: [JavaScript, React, Tutorial]
   readingTime: 5 min read
   published: true
   ---

   # Your Content Here

   Write your blog post content in markdown...
   ```

3. **Save and refresh** - Your post appears automatically!

### Adding a Project

1. **Create a markdown file** in `projects/`
   - Example: `projects/my-awesome-app.md`

2. **Add frontmatter:**
   ```markdown
   ---
   title: My Awesome App
   description: A brief description of your project
   image: {{PROJECT1_IMAGE}}
   technologies: [React, Node.js, MongoDB]
   githubUrl: https://github.com/username/project
   liveUrl: https://myproject.com
   published: true
   date: 2024-01-15
   featured: true
   ---

   # Project Details

   Detailed description of your project...
   ```

3. **Save and refresh** - Project appears on projects page!

---

## 🔧 Troubleshooting

### Problem: Navigation not showing

**Solution:**
1. Check `config/site.md` exists
2. Verify `navigation` line is properly formatted: `page|label|url, page|label|url`
3. Check browser console for errors (F12)
4. Ensure server is running

### Problem: Page shows blank/empty

**Solution:**
1. Check content file exists (e.g., `home/home.md`)
2. Verify frontmatter starts with `---`
3. Check server console for file read errors
4. Ensure file has frontmatter AND content

### Problem: Images not loading

**Solution:**
1. Check image path in `config/images.md`
2. Verify image file exists in `assets/images/`
3. Use browser DevTools (F12) → Network tab to check 404 errors
4. Check image variable syntax: `{{VARIABLE_NAME}}`

### Problem: Projects/Blog not showing

**Solution:**
1. Check `published: true` in frontmatter
2. Verify file is in correct directory
3. Check `enable_projects` or `enable_blog` is `true`
4. Restart server: Ctrl+C, then `python3 server.py`

### Problem: Changes not appearing

**Solution:**
1. Hard refresh browser: Ctrl+F5 (Windows) or Cmd+Shift+R (Mac)
2. Clear browser cache
3. Restart server
4. Check for JavaScript errors in console

---

## 🎓 Advanced Features

### Custom Navigation

**Format:** `page|label|url`

**Examples:**
```yaml
# Standard
navigation: home|Home|index.html, blog|Blog|blog.html

# Custom labels
navigation: home|🏠 Home|index.html, blog|📝 Writing|blog.html

# External links (keep all sections, add external link manually in HTML)
# Note: For external links, you need to modify the HTML directly
```

### Feature Flags Reference

| Flag | Description | Default |
|------|-------------|---------|
| `feature_theme_toggle` | Show/hide dark/light mode toggle | `true` |
| `feature_blog_filters` | Enable blog category/tag filters | `true` |
| `feature_project_tags` | Show technology tags on projects | `true` |
| `feature_social_links` | Display social media icons | `true` |
| `feature_toc` | Table of contents on blog posts | `true` |

### Image Variables

**Built-in Variables:**
- `PROJECT1_IMAGE`, `PROJECT2_IMAGE`, `PROJECT3_IMAGE`
- `PROFILE_IMAGE`, `AVATAR_IMAGE`
- `BLOG_DEFAULT`, `BLOG_HERO`
- `LOGO_IMAGE`, `FAVICON`

**Add Your Own:**
```yaml
# In config/images.md
MY_CUSTOM_IMAGE: assets/images/my-image.jpg

# Use in any markdown file
image: {{MY_CUSTOM_IMAGE}}
```

### Blog Post Categories

**Directories:**
- `blog/tech/` - Technical posts (programming, tutorials)
- `blog/non-tech/` - Non-technical posts (life, thoughts)

**Usage:**
Just place your markdown file in the appropriate directory. The system automatically categorizes it.

---

## 🚀 Deployment

### GitHub Pages

1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/username/portfolio.git
   git push -u origin main
   ```

2. **Enable GitHub Pages:**
   - Go to repository Settings → Pages
   - Source: Deploy from branch → `main` → `/ (root)`
   - Save

3. **Note:** GitHub Pages serves static files directly. You'll need to:
   - Pre-generate JSON files for blog posts and projects
   - Or use GitHub Actions to run the Python server

### Netlify

1. **Create `netlify.toml`:**
   ```toml
   [build]
   command = "python3 server.py"
   publish = "."
   ```

2. **Deploy:**
   - Connect GitHub repo to Netlify
   - Deploy settings: Auto-detect
   - Deploy!

### Vercel

Similar to Netlify - connect your repository and deploy.

---

## 📖 File Structure

```
portfolio/
├── config/
│   ├── site.md           # Site configuration
│   └── images.md         # Image paths
├── home/
│   └── home.md           # Home page content
├── about/
│   └── about.md          # About page content
├── blog/
│   ├── tech/             # Technical blog posts
│   └── non-tech/         # Non-technical posts
├── projects/
│   └── *.md              # Project files
├── assets/
│   └── images/           # All images
├── *.html                # HTML pages
├── styles.css            # Styles
├── blog.js               # JavaScript
└── server.py             # Development server
```

---

## 💡 Tips & Best Practices

### Content Tips

1. **Images:** Use consistent sizes (recommended: 800x400px for projects)
2. **Excerpts:** Keep to 2-3 sentences (120-150 characters)
3. **Tags:** Use 3-5 relevant tags per post
4. **Titles:** Clear and descriptive (under 60 characters)

### Configuration Tips

1. **Test changes:** Make one change at a time, test, then move on
2. **Backup:** Keep backups of your config files
3. **Version control:** Use Git to track changes
4. **Comments:** Add comments in config files for future reference

### Performance Tips

1. **Images:** Compress images (use TinyPNG or similar)
2. **Markdown:** Keep post lengths reasonable (< 5000 words)
3. **Tags:** Don't overuse tags (limit to 5-10 unique tags total)

---

## 🤝 Getting Help

### Resources

- **Documentation:** Check markdown files in project root
- **Examples:** Look at existing blog posts and projects as templates
- **Console:** Use browser DevTools (F12) to check for errors

### Common Questions

**Q: Can I add custom pages?**
A: Yes! Create new HTML files and add them to navigation config.

**Q: Can I change the design/colors?**
A: Yes! Edit `styles.css` - CSS variables are at the top.

**Q: Can I use this commercially?**
A: Check the LICENSE file. Usually, yes!

**Q: How do I add analytics?**
A: Add Google Analytics or similar scripts to HTML files.

---

## 🎉 You're Ready!

Your portfolio template is now fully configured. Here's a quick checklist:

- [ ] Updated `config/site.md` with your info
- [ ] Updated `config/images.md` with your image paths
- [ ] Edited `home/home.md` with your details
- [ ] Edited `about/about.md` with your story
- [ ] Added your projects to `projects/`
- [ ] Added blog posts to `blog/tech/` or `blog/non-tech/`
- [ ] Replaced placeholder images in `assets/images/`
- [ ] Tested all pages in browser
- [ ] Customized colors in `styles.css` (optional)

**Next Steps:**
1. Share your portfolio link!
2. Keep adding content regularly
3. Update your projects and blog
4. Connect with your audience

---

## 📚 Additional Documentation

- [Image Configuration Guide](IMAGE_CONFIGURATION_GUIDE.md)
- [Filter Panel Guide](FILTER_PANEL_GUIDE.md)
- [Click Outside Feature](CLICK_OUTSIDE_FEATURE.md)
- [Filter Panel Update](FILTER_PANEL_UPDATE.md)

---

**Happy coding! 🚀**

If you found this template helpful, consider:
- ⭐ Starring the repository
- 🔄 Sharing with others
- 📝 Contributing improvements
- ☕ Buying me a coffee (if applicable)
