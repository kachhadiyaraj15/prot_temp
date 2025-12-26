# Projects System Guide

This guide explains how to add and manage projects on your portfolio website using the markdown-based project system.

## Overview

Projects are automatically loaded from markdown files in the `projects/` directory. Each project is defined using frontmatter metadata and markdown content, similar to blog posts.

## Project Structure

```
temp_port/
├── projects/                          # Projects directory
│   ├── _template.md                   # Template for new projects
│   ├── awesome-web-app.md            # Example project
│   ├── machine-learning-platform.md  # Example project
│   └── mobile-fitness-app.md         # Example project
├── projects.html                      # Projects listing page
├── project-detail.html               # Individual project detail page
└── server.py                         # API endpoint: /api/project-files
```

## Adding a New Project

### Step 1: Create a Markdown File

Create a new `.md` file in the `projects/` directory:

```bash
cd projects
cp _template.md my-awesome-project.md
```

### Step 2: Add Frontmatter Metadata

Edit your markdown file and add frontmatter at the top:

```markdown
---
title: My Awesome Project
description: A brief description of your project that appears in the card
image: assets/images/my-project.jpg
technologies: [React, Node.js, MongoDB, Docker]
githubUrl: https://github.com/username/project
liveUrl: https://myproject.com
demoUrl: https://demo.myproject.com
published: true
featured: false
date: 2025-01-20
---

## Your Project Content Here

Write your detailed project description using markdown...
```

### Step 3: Write Your Content

After the frontmatter, write your project details using markdown:

```markdown
## Overview

Describe your project here...

## Key Features

* Feature 1
* Feature 2
* Feature 3

## Technical Details

### Architecture

Explain your architecture...

```javascript
// Code examples
const example = "code";
```

## Challenges & Solutions

### Challenge 1
**Problem**: Description
**Solution**: How you solved it

## Results

* Metric 1
* Metric 2
```

## Frontmatter Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | String | Yes | Project title displayed on cards and detail page |
| `description` | String | Yes | Short description (1-2 sentences) shown on project card |
| `image` | String | No | Path to project image (e.g., `assets/images/project.jpg`) |
| `technologies` | Array | No | List of technologies used: `[React, Node.js, Docker]` |
| `githubUrl` | String | No | GitHub repository URL |
| `liveUrl` | String | No | Live demo/production URL |
| `demoUrl` | String | No | Additional demo URL |
| `published` | Boolean | Yes | Set to `true` to show project, `false` to hide |
| `featured` | Boolean | No | Mark as featured project (for future use) |
| `date` | String | Yes | Project date in YYYY-MM-DD format |

## Publishing Control

**To publish a project:**
```yaml
published: true
```

**To hide a project (draft mode):**
```yaml
published: false
```

Only projects with `published: true` will appear on the projects page.

## Adding Project Images

1. Place your project images in `assets/images/` directory
2. Reference them in frontmatter:

```yaml
image: assets/images/my-project-screenshot.jpg
```

3. You can also use images in the markdown content:

```markdown
![Architecture Diagram](assets/images/architecture.png)
```

## Links Configuration

### GitHub Link
```yaml
githubUrl: https://github.com/username/repo
```
Displays a "GitHub" button on the project card and detail page.

### Live Demo Link
```yaml
liveUrl: https://myproject.com
```
Displays a "Live Demo" button.

### Additional Demo Link
```yaml
demoUrl: https://demo.myproject.com
```
Displays a "Demo" button (use if you have multiple demo environments).

**Note**: All link fields are optional. The project will always show a "View Details" link.

## Technologies Tags

Add technologies as an array:

```yaml
technologies: [React, Node.js, MongoDB, Docker, AWS]
```

These appear as colored tags below the project description.

## Markdown Formatting

### Supported Markdown Features

- **Headers**: `#`, `##`, `###`
- **Bold**: `**text**`
- **Italic**: `*text*`
- **Code blocks**: Use triple backticks with language
- **Inline code**: Use single backticks
- **Links**: `[text](url)`
- **Images**: `![alt](url)`
- **Lists**: Use `*` or `1.` for bullets/numbered
- **Blockquotes**: Use `>`

### Code Blocks Example

```markdown
\`\`\`javascript
function example() {
  console.log("Hello World");
}
\`\`\`
```

## Example Project Templates

### Web Application Project

```markdown
---
title: Task Management App
description: A collaborative task management tool with real-time sync
image: assets/images/task-app.jpg
technologies: [React, Node.js, MongoDB, Socket.io]
githubUrl: https://github.com/user/task-app
liveUrl: https://taskapp.com
published: true
date: 2025-01-15
---

## Overview
Description here...

## Features
* Feature 1
* Feature 2

## Tech Stack
Details here...
```

### Mobile App Project

```markdown
---
title: Fitness Tracker
description: Cross-platform mobile app for tracking workouts and nutrition
image: assets/images/fitness-app.jpg
technologies: [React Native, Firebase, TensorFlow]
githubUrl: https://github.com/user/fitness-app
published: true
date: 2024-12-20
---

## Introduction
Mobile app details...

## Key Features
App features...
```

### Open Source Project

```markdown
---
title: UI Component Library
description: Open source React component library with 50+ components
image: assets/images/ui-lib.jpg
technologies: [React, TypeScript, Storybook]
githubUrl: https://github.com/user/ui-library
demoUrl: https://storybook.ui-lib.dev
published: true
date: 2024-11-10
---

## About
Library description...

## Components
List of components...
```

## Viewing Your Projects

### Local Development

1. Start the server:
```bash
python3 server.py
```

2. Open your browser:
```
http://localhost:8000/projects.html
```

### Project Listing Page
- Shows all published projects as cards
- Sorted by date (newest first)
- Displays: title, description, technologies, and links

### Project Detail Page
- Full project content with markdown rendering
- Technology tags
- Links to GitHub, live demo, etc.
- "Back to Projects" navigation

## Auto-Discovery

Projects are automatically discovered! No need to manually register them in code. Just:

1. Create a `.md` file in the `projects/` directory
2. Add frontmatter with `published: true`
3. Refresh the page

The system will:
- Automatically detect the new file via API
- Parse the frontmatter and content
- Display it on the projects page

## Best Practices

### 1. Use High-Quality Images
- Recommended size: 1200x630px
- Format: JPG or PNG
- Keep file size under 500KB

### 2. Write Compelling Descriptions
- Keep card descriptions to 1-2 sentences
- Focus on the value/impact
- Use action words

### 3. Organize Content Clearly
- Start with overview
- List key features
- Explain technical implementation
- Share challenges and solutions
- Include results/metrics

### 4. Add Code Examples
- Show interesting code snippets
- Use proper syntax highlighting
- Keep examples concise and relevant

### 5. Update Regularly
- Keep project information current
- Update with new features
- Add lessons learned

## Troubleshooting

### Project Not Showing Up?

1. Check `published: true` in frontmatter
2. Verify frontmatter format (must start and end with `---`)
3. Check console for errors: `Developer Tools > Console`
4. Make sure server is running: `python3 server.py`

### Images Not Loading?

1. Verify image path is correct
2. Check image exists in `assets/images/`
3. Use relative path: `assets/images/image.jpg`

### Frontmatter Parse Error?

1. Ensure proper YAML syntax
2. Use arrays for lists: `[item1, item2]`
3. Strings with special characters should be quoted
4. Check for extra spaces or tabs

## API Endpoint

Projects are served via API:

```
GET /api/project-files
```

Response:
```json
{
  "files": ["project1.md", "project2.md"],
  "count": 2
}
```

## Next Steps

1. Review the example projects in `projects/` directory
2. Use `_template.md` as a starting point
3. Add your own projects
4. Customize the styling in `styles.css` if needed

---

**Need Help?** Check the example projects or refer to the blog guide for similar markdown syntax.
