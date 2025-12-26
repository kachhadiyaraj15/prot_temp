# Configuration Reference Guide

Quick reference for all configuration options in `config/site.md`

## 📋 Site Metadata

| Setting | Type | Default | Description |
|---------|------|---------|-------------|
| `site_name` | String | "Your Portfolio" | Site title shown in browser |
| `site_tagline` | String | "Software Engineer & Creator" | Subtitle/tagline |
| `site_description` | String | "Personal portfolio..." | SEO meta description |

**Example:**
```yaml
site_name: John Doe's Portfolio
site_tagline: Full Stack Developer
site_description: Portfolio showcasing my web development projects
```

---

## 🎯 Page Modules

Enable or disable entire sections of your site.

| Setting | Type | Default | Description |
|---------|------|---------|-------------|
| `enable_home` | Boolean | `true` | Enable home page (recommended: always true) |
| `enable_about` | Boolean | `true` | Enable about page |
| `enable_projects` | Boolean | `true` | Enable projects section |
| `enable_blog` | Boolean | `true` | Enable blog section |

**Example - Blog-only site:**
```yaml
enable_home: true
enable_about: false
enable_projects: false
enable_blog: true
```

**What happens when disabled:**
- Page link removed from navigation
- Direct access redirects to home
- Related features automatically disabled

---

## 🧭 Navigation Configuration

Define which pages appear in the header navigation and their order.

| Setting | Type | Format | Description |
|---------|------|--------|-------------|
| `navigation` | String | `page\|label\|url, ...` | Navigation items |

**Format Explanation:**
- Each item: `page|label|url`
- Separated by commas
- Page name must match `enable_*` setting
- Label is what users see
- URL is the file path

**Examples:**

**Default navigation:**
```yaml
navigation: home|Home|index.html, about|About|about.html, projects|Projects|projects.html, blog|Blog|blog.html
```

**Reordered navigation:**
```yaml
navigation: home|Home|index.html, blog|Blog|blog.html, projects|Projects|projects.html, about|About|about.html
```

**Custom labels:**
```yaml
navigation: home|🏠 Home|index.html, blog|📝 Writing|blog.html, projects|💻 Work|projects.html
```

**Minimal navigation:**
```yaml
navigation: home|Home|index.html, blog|Blog|blog.html
```

---

## 🎨 Feature Flags

Enable/disable specific features across the site.

| Setting | Type | Default | Description |
|---------|------|---------|-------------|
| `feature_theme_toggle` | Boolean | `true` | Dark/light mode switcher in header |
| `feature_blog_filters` | Boolean | `true` | Category and tag filtering on blog page |
| `feature_project_tags` | Boolean | `true` | Technology tags on project cards |
| `feature_social_links` | Boolean | `true` | Social media icons in footer/pages |
| `feature_toc` | Boolean | `true` | Table of contents on blog posts |

**Example - Minimal features:**
```yaml
feature_theme_toggle: true
feature_blog_filters: false
feature_project_tags: false
feature_social_links: true
feature_toc: false
```

**Effects:**
- `feature_theme_toggle: false` → Theme toggle button hidden, locked to dark mode
- `feature_blog_filters: false` → Filter button hidden on blog page
- `feature_project_tags: false` → Technology tags not shown on project cards
- `feature_social_links: false` → Social icons hidden everywhere
- `feature_toc: false` → Table of contents not generated for blog posts

---

## 🔗 Social Links

Configure your social media profiles. Leave blank to hide.

| Setting | Type | Example | Description |
|---------|------|---------|-------------|
| `social_github` | String (URL) | `https://github.com/username` | GitHub profile |
| `social_twitter` | String (URL) | `https://twitter.com/username` | Twitter/X profile |
| `social_linkedin` | String (URL) | `https://linkedin.com/in/username` | LinkedIn profile |
| `social_youtube` | String (URL) | `https://youtube.com/@username` | YouTube channel |
| `social_email` | String (Email) | `you@example.com` | Email address |
| `social_website` | String (URL) | `https://example.com` | Personal website |

**Example:**
```yaml
social_github: https://github.com/johndoe
social_twitter: https://twitter.com/johndoe
social_linkedin: https://linkedin.com/in/johndoe
social_youtube:
social_email: john@example.com
social_website: https://johndoe.com
```

**Notes:**
- Empty values (like `social_youtube:` above) hide that social link
- Email creates a `mailto:` link
- All other links open in new tab
- Icons appear in footer and on home/about pages (if `feature_social_links: true`)

---

## 🏠 Home Page Configuration

Control what appears on the home/landing page.

| Setting | Type | Default | Description |
|---------|------|---------|-------------|
| `home_show_bio` | Boolean | `true` | Show bio section |
| `home_show_social` | Boolean | `true` | Show social links |
| `home_show_quick_links` | Boolean | `true` | Show quick navigation links |

**Example - Minimal home:**
```yaml
home_show_bio: true
home_show_social: false
home_show_quick_links: false
```

---

## 👤 About Page Configuration

Control what appears on the about page.

| Setting | Type | Default | Description |
|---------|------|---------|-------------|
| `about_show_location` | Boolean | `true` | Show location (from about.md frontmatter) |
| `about_show_social` | Boolean | `true` | Show social links on about page |

**Example:**
```yaml
about_show_location: true
about_show_social: true
```

---

## 💼 Projects Page Configuration

Control projects page display and behavior.

| Setting | Type | Default | Description |
|---------|------|---------|-------------|
| `projects_show_featured_only` | Boolean | `false` | Only show projects with `featured: true` |
| `projects_grid_columns` | Number | `3` | Number of columns in project grid |

**Examples:**

**Show only featured projects:**
```yaml
projects_show_featured_only: true
```

**2-column layout:**
```yaml
projects_grid_columns: 2
```

**Notes:**
- `projects_show_featured_only: true` → Only projects with `featured: true` in frontmatter are shown
- `projects_grid_columns` affects desktop layout only (mobile is always 1 column)

---

## 📝 Blog Page Configuration

Control blog page display and behavior.

| Setting | Type | Default | Description |
|---------|------|---------|-------------|
| `blog_posts_per_page` | Number | `10` | Number of posts to show (pagination, if implemented) |
| `blog_show_excerpts` | Boolean | `true` | Show post excerpts on blog page |
| `blog_show_reading_time` | Boolean | `true` | Show estimated reading time |
| `blog_show_categories` | Boolean | `true` | Show category badges (Tech/Non-Tech) |
| `blog_show_tags` | Boolean | `true` | Show tags on blog cards |
| `blog_enable_filters` | Boolean | `true` | Enable filter panel (categories + tags) |

**Example - Simple blog:**
```yaml
blog_posts_per_page: 5
blog_show_excerpts: true
blog_show_reading_time: true
blog_show_categories: true
blog_show_tags: false
blog_enable_filters: false
```

**Notes:**
- These settings affect the main blog listing page
- Individual blog post pages always show full content
- `blog_enable_filters: false` hides the filter button and panel

---

## 🎬 Footer Configuration

Control footer content.

| Setting | Type | Default | Description |
|---------|------|---------|-------------|
| `footer_text` | String | "© 2024 Your Name..." | Footer copyright text |
| `footer_show_social` | Boolean | `true` | Show social icons in footer |

**Example:**
```yaml
footer_text: © 2024 John Doe. Built with ❤️ and code.
footer_show_social: true
```

---

## 🔍 Complete Example Configurations

### Example 1: Full-Featured Portfolio

```yaml
---
# Site Metadata
site_name: Jane Developer
site_tagline: Full Stack Engineer & Open Source Contributor
site_description: Portfolio showcasing web development projects and technical blog

# Page Modules
enable_home: true
enable_about: true
enable_projects: true
enable_blog: true

# Navigation
navigation: home|Home|index.html, about|About|about.html, projects|Projects|projects.html, blog|Blog|blog.html

# Feature Flags
feature_theme_toggle: true
feature_blog_filters: true
feature_project_tags: true
feature_social_links: true
feature_toc: true

# Social Links
social_github: https://github.com/janedev
social_twitter: https://twitter.com/janedev
social_linkedin: https://linkedin.com/in/janedev
social_youtube:
social_email: jane@example.com
social_website:

# Home Page
home_show_bio: true
home_show_social: true
home_show_quick_links: true

# About Page
about_show_location: true
about_show_social: true

# Projects
projects_show_featured_only: false
projects_grid_columns: 3

# Blog
blog_posts_per_page: 10
blog_show_excerpts: true
blog_show_reading_time: true
blog_show_categories: true
blog_show_tags: true
blog_enable_filters: true

# Footer
footer_text: © 2024 Jane Developer. Built with passion.
footer_show_social: true
---
```

### Example 2: Minimal Blog

```yaml
---
# Site Metadata
site_name: My Writing
site_tagline: Thoughts on code and life
site_description: Personal blog about programming and technology

# Page Modules
enable_home: true
enable_about: false
enable_projects: false
enable_blog: true

# Navigation
navigation: home|Home|index.html, blog|Posts|blog.html

# Feature Flags
feature_theme_toggle: true
feature_blog_filters: true
feature_project_tags: false
feature_social_links: false
feature_toc: true

# Social Links (all hidden)
social_github:
social_twitter:
social_linkedin:
social_youtube:
social_email:
social_website:

# Home Page
home_show_bio: true
home_show_social: false
home_show_quick_links: false

# Blog
blog_posts_per_page: 15
blog_show_excerpts: true
blog_show_reading_time: true
blog_show_categories: false
blog_show_tags: true
blog_enable_filters: true

# Footer
footer_text: © 2024 My Writing
footer_show_social: false
---
```

### Example 3: Project Showcase

```yaml
---
# Site Metadata
site_name: Design Portfolio
site_tagline: UI/UX Designer
site_description: Showcasing my best design work

# Page Modules
enable_home: true
enable_about: true
enable_projects: true
enable_blog: false

# Navigation
navigation: home|Home|index.html, projects|Work|projects.html, about|About|about.html

# Feature Flags
feature_theme_toggle: true
feature_blog_filters: false
feature_project_tags: true
feature_social_links: true
feature_toc: false

# Social Links
social_github:
social_twitter: https://twitter.com/designer
social_linkedin: https://linkedin.com/in/designer
social_youtube:
social_email: hello@designer.com
social_website: https://designer.com

# Home Page
home_show_bio: true
home_show_social: true
home_show_quick_links: true

# About Page
about_show_location: true
about_show_social: true

# Projects
projects_show_featured_only: true
projects_grid_columns: 2

# Footer
footer_text: © 2024 Designer. All rights reserved.
footer_show_social: true
---
```

---

## 💡 Tips & Best Practices

### Configuration Tips

1. **Start Simple:** Enable only what you need initially
2. **Test Changes:** Make one change at a time and test
3. **Backup Config:** Keep a copy of your working configuration
4. **Use Comments:** Add `#` comments to remember your choices

### Navigation Tips

1. **Order Matters:** Put most important pages first
2. **Keep It Short:** 3-5 navigation items is ideal
3. **Clear Labels:** Use simple, descriptive labels
4. **Consistency:** Match labels to page titles

### Feature Flag Strategy

1. **Start with defaults:** Most features enabled by default work well
2. **Disable gradually:** Remove features you don't need
3. **Consider users:** Some features improve user experience significantly
4. **Performance:** Disabling unused features can improve load times

### Social Links

1. **Quality over quantity:** Only include active profiles
2. **Keep updated:** Remove old/inactive profiles
3. **Professional:** Use professional profiles for portfolios
4. **Contact method:** Always provide at least one contact method

---

## 🔄 Making Changes

### Step-by-Step Process

1. **Edit config file:**
   - Open `config/site.md`
   - Make your changes
   - Save the file

2. **Test changes:**
   - Hard refresh browser (Ctrl+F5 or Cmd+Shift+R)
   - Check all affected pages
   - Look for errors in console (F12)

3. **Verify:**
   - Navigation updated correctly?
   - Features enabled/disabled as expected?
   - Pages accessible/inaccessible as intended?

4. **Commit:**
   - If using Git, commit your changes
   - Add a descriptive message

### Troubleshooting Changes

**Config not loading?**
- Check YAML syntax (colons, spacing)
- Ensure no typos in setting names
- Restart server if needed

**Navigation broken?**
- Check pipe format: `page|label|url`
- Ensure commas separate items
- Verify page names match `enable_*` settings

**Features not working?**
- Check boolean values: `true` or `false` (lowercase)
- Verify feature is supported
- Check browser console for errors

---

## 📖 Related Documentation

- [Setup Guide](SETUP_GUIDE.md) - Complete setup and customization guide
- [Image Configuration](IMAGE_CONFIGURATION_GUIDE.md) - Managing images
- [Filter Panel Guide](FILTER_PANEL_GUIDE.md) - Blog filtering system

---

**Last Updated:** 2024
**Version:** 1.0
