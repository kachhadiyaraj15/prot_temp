---
# ===========================
# Site Configuration
# ===========================
# This file controls the entire structure of your portfolio website.
# Simply edit these values to customize your site - no coding required!

# Site Metadata
site_name: Your Portfolio
site_tagline: Software Engineer & Creator
site_description: Personal portfolio showcasing projects and blog posts

# Page Modules (Enable/Disable)
# Set to 'true' to enable, 'false' to disable
enable_home: true
enable_about: true
enable_projects: true
enable_blog: true

# Navigation Configuration
# Define which pages appear in the header navigation
# Only enabled pages will be shown
# Format: page|label|url
# Order matters - items will appear in this order
navigation: home|Home|index.html, about|About|about.html, projects|Projects|projects.html, blog|Blog|blog.html

# Feature Flags
# Enable/disable specific features across the site
feature_theme_toggle: true
feature_blog_filters: true
feature_project_tags: true
feature_social_links: true
feature_toc: true

# Social Links
# Leave empty to hide a social link
# Format: URL or email address
social_github: https://github.com/username
social_twitter: https://twitter.com/username
social_linkedin: https://linkedin.com/in/username
social_youtube:
social_email: your@email.com
social_website:

# Home Page Configuration
home_show_bio: true
home_show_social: true
home_show_quick_links: true

# About Page Configuration
about_show_location: true
about_show_social: true

# Projects Page Configuration
projects_show_featured_only: false
projects_grid_columns: 3

# Blog Page Configuration
blog_posts_per_page: 10
blog_show_excerpts: true
blog_show_reading_time: true
blog_show_categories: true
blog_show_tags: true
blog_enable_filters: true

# Footer Configuration
footer_text: © 2024 Your Name. Built with passion.
footer_show_social: true
---

# Site Configuration Guide

This configuration file controls your entire portfolio website. Here's how to customize it:

## Quick Start

1. **Disable a section**: Set `enable_projects: false` to hide projects entirely
2. **Reorder navigation**: Change the order in the `navigation` line
3. **Update social links**: Replace URLs with your own profiles
4. **Toggle features**: Set feature flags to `true` or `false`

## Page Modules

- `enable_home`: Show/hide the home page
- `enable_about`: Show/hide the about page
- `enable_projects`: Show/hide projects section
- `enable_blog`: Show/hide blog section

**Example - Blog-only site:**
```
enable_home: true
enable_about: false
enable_projects: false
enable_blog: true
```

## Navigation

The navigation items are defined as: `page|label|url`

**Example:**
```
navigation: home|Home|index.html, blog|Blog|blog.html
```

This creates a nav with two links: "Home" and "Blog"

## Social Links

Set social platform URLs to display them on your site. Leave blank to hide:

```
social_github: https://github.com/yourusername
social_twitter:
social_email: your@email.com
```

This shows GitHub and Email icons, but hides Twitter.

## Feature Flags

Control specific features:
- `feature_theme_toggle`: Dark/light mode switcher
- `feature_blog_filters`: Category and tag filtering on blog page
- `feature_project_tags`: Technology tags on project cards
- `feature_social_links`: Social media icons
- `feature_toc`: Table of contents on blog posts

## Tips

- Always keep `enable_home: true` - it's your landing page
- Test your changes by refreshing the browser
- Use consistent formatting for social URLs
- Navigation order affects menu appearance

## Need Help?

Check the SETUP_GUIDE.md file for detailed instructions.
