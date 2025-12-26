# 🎨 Dynamic Portfolio Template

A **fully customizable portfolio website** that you can configure without writing any code. Perfect for developers, designers, writers, and anyone wanting a professional online presence.

Built with vanilla HTML, CSS, and JavaScript. Features a markdown-based blog system with clean design and modern aesthetics.

## ✨ Key Features

- 🎯 **Zero Code Configuration** - Edit simple config files, no programming needed
- 🔧 **Modular Design** - Enable/disable entire sections (Projects, Blog, About)
- 🎨 **Dark/Light Theme** - Beautiful themes with smooth transitions
- 📝 **Markdown-Powered** - Write content in simple markdown format
- 🖼️ **Centralized Image Management** - Change image paths in one place
- 🏷️ **Dynamic Blog Filters** - Category and tag filtering
- 📱 **Fully Responsive** - Works perfectly on all devices
- ⚡ **Fast & Lightweight** - No heavy frameworks, pure vanilla JavaScript
- 🎭 **Dynamic Navigation** - Auto-generated from configuration
- 📑 **Table of Contents** - Auto-generated TOC for blog posts with scroll spy

## 📁 Project Structure

```
temp_port/
├── index.html              # Homepage
├── blog.html              # Blog listing page
├── blog-post.html         # Individual blog post page
├── projects.html          # Projects showcase
├── about.html             # About page
├── styles.css             # Main stylesheet with design system
├── blog.js                # Blog system and markdown parser
├── blog/                  # Markdown blog posts
│   ├── getting-started-with-web-development.md
│   ├── understanding-async-javascript.md
│   └── building-scalable-apis.md
└── assets/
    └── images/            # Project images and assets
        ├── project1.jpg
        ├── project2.jpg
        └── project3.jpg
```

## 🚀 Quick Start

### 1. Prerequisites

- Python 3.x
- A text editor
- A web browser

### 2. Get Started

```bash
# Clone or download this repository
cd portfolio-template

# Start the development server
python3 server.py

# Open in browser
# Navigate to: http://localhost:8000
```

### 3. Customize

**Edit configuration files:**
```bash
config/site.md       # Site structure, navigation, features
config/images.md     # Image paths
home/home.md         # Home page content
about/about.md       # About page content
```

**Add your content:**
```bash
blog/tech/my-post.md           # Add blog posts
blog/non-tech/my-thoughts.md   # Add non-technical posts
projects/my-project.md         # Add projects
```

## 📖 Complete Documentation

- **[Setup Guide](SETUP_GUIDE.md)** - Complete guide to setup and customization
- **[Configuration Reference](CONFIGURATION_REFERENCE.md)** - All configuration options explained
- **[Image Configuration Guide](IMAGE_CONFIGURATION_GUIDE.md)** - Managing images centrally
- **[Filter Panel Guide](FILTER_PANEL_GUIDE.md)** - Blog filtering system

## 🎯 Configuration Examples

### Remove Projects Section
```yaml
# In config/site.md
enable_projects: false
navigation: home|Home|index.html, blog|Blog|blog.html
```

### Blog-Only Site
```yaml
enable_home: true
enable_blog: true
enable_about: false
enable_projects: false
navigation: home|Home|index.html, blog|Blog|blog.html
```

### Change Navigation Order
```yaml
navigation: home|Home|index.html, blog|Blog|blog.html, projects|Projects|projects.html
```

### Disable Blog Filters
```yaml
feature_blog_filters: false
```

### Update Social Links
```yaml
social_github: https://github.com/yourusername
social_email: you@example.com
```

## 📝 Adding Blog Posts

### 1. Create a Markdown File

Create a new `.md` file in the `blog/` directory:

```bash
touch blog/my-new-post.md
```

### 2. Write Your Content

Use standard markdown syntax:

```markdown
# My Blog Post Title

Introduction paragraph...

## Section Heading

Content with **bold** and *italic* text.

### Subsection

- Bullet point 1
- Bullet point 2

```javascript
// Code example
function hello() {
    console.log("Hello, World!");
}
```

![Image description](../assets/images/my-image.jpg)
```

### 3. Register the Post

Add your post to the `blogPosts` array in `blog.js`:

```javascript
const blogPosts = [
    {
        id: 'my-new-post',                    // URL-friendly ID
        title: 'My New Blog Post',            // Display title
        date: '2025-01-20',                   // Publication date (YYYY-MM-DD)
        readingTime: '5 min read',            // Estimated reading time
        excerpt: 'A brief description...',    // Short summary
        tags: ['Tag1', 'Tag2'],              // Categories/tags
        file: 'blog/my-new-post.md'          // Path to markdown file
    },
    // ... other posts
];
```

### 4. View Your Post

Navigate to `blog.html` to see your new post in the listing!

## 🎨 Customization

### Changing Colors

Edit the CSS variables in `styles.css`:

```css
:root {
    --bg-primary: #0a0a0a;           /* Main background */
    --bg-secondary: #111111;         /* Card backgrounds */
    --text-primary: #e8e8e8;         /* Main text */
    --text-secondary: #a0a0a0;       /* Secondary text */
    --accent-primary: #3b82f6;       /* Primary accent color */
    --accent-hover: #60a5fa;         /* Hover state */
    --border-color: #222222;         /* Border color */
}
```

### Updating Personal Information

1. **Homepage** (`index.html`): Update name, bio, and links
2. **About Page** (`about.html`): Add your background and skills
3. **Projects** (`projects.html`): Showcase your work
4. **Footer**: Update copyright and social links

### Adding Images

1. Place images in `assets/images/`
2. Reference them in your markdown or HTML:

```markdown
![Alt text](../assets/images/your-image.jpg)
```

```html
<img src="assets/images/your-image.jpg" alt="Description">
```

## 🎯 Design System

The website uses a comprehensive design system with:

- **Typography**: Inter font family with 5 weight variations
- **Spacing**: Consistent spacing scale (xs, sm, md, lg, xl, 2xl)
- **Colors**: Carefully chosen dark theme palette
- **Animations**: Smooth fade-in animations
- **Responsive**: Mobile-first approach with breakpoints at 768px and 480px

## 📱 Responsive Design

The website is fully responsive with breakpoints:

- **Desktop**: > 768px (default)
- **Tablet**: 481px - 768px
- **Mobile**: ≤ 480px

## 🔧 Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Modern features (Grid, Flexbox, Custom Properties)
- **JavaScript (ES6+)**: Vanilla JS, no frameworks
- **Markdown**: For blog content

## 📊 Features Breakdown

### Blog System

- ✅ Markdown parsing
- ✅ Syntax highlighting for code blocks
- ✅ Reading time estimation
- ✅ Tags/categories
- ✅ Date formatting
- ✅ Responsive cards
- ✅ Pagination support (in code)

### Design Features

- ✅ Dark theme
- ✅ Smooth animations
- ✅ Hover effects
- ✅ Gradient text
- ✅ Card-based layout
- ✅ Consistent spacing
- ✅ Typography hierarchy

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📈 Performance

- **No external dependencies**: Everything runs locally
- **Minimal JavaScript**: Only loads what's needed
- **Optimized CSS**: Uses modern features efficiently
- **Fast load times**: Lightweight assets

## 🛠️ Extending the Website

### Adding New Pages

1. Create a new HTML file (e.g., `contact.html`)
2. Copy the header/footer structure from existing pages
3. Add navigation link in all pages
4. Style using existing CSS classes

### Custom Markdown Features

Extend the `MarkdownParser` class in `blog.js` to add:

- Tables
- Footnotes
- Custom components
- Syntax highlighting

### Adding Analytics

Add your analytics code before the closing `</body>` tag:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=YOUR-ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'YOUR-ID');
</script>
```

## 📝 Best Practices Implemented

- ✅ Semantic HTML5 elements
- ✅ Accessible markup (ARIA labels where needed)
- ✅ SEO optimization (meta tags, proper headings)
- ✅ Mobile-first responsive design
- ✅ Clean, maintainable code
- ✅ Consistent naming conventions
- ✅ Modular CSS architecture
- ✅ Performance optimization

## 🚀 Deployment

### GitHub Pages

1. Push to GitHub repository
2. Go to Settings → Pages
3. Select main branch
4. Your site will be live at `https://username.github.io/repo-name`

### Netlify

1. Drag and drop the folder to Netlify
2. Or connect your GitHub repository
3. Automatic deployments on push

### Vercel

```bash
npm i -g vercel
vercel
```

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Feel free to fork this project and customize it for your own use!

## 💡 Tips

1. **Keep it simple**: The beauty is in the minimalism
2. **Write regularly**: Add new blog posts consistently
3. **Update projects**: Showcase your latest work
4. **Optimize images**: Compress images before adding them
5. **Test responsiveness**: Check on multiple devices
6. **Proofread**: Always review your markdown content

## 📞 Support

If you have questions or need help:

1. Check the code comments
2. Review the existing examples
3. Modify and experiment!

---

**Built with ❤️ using vanilla HTML, CSS, and JavaScript**

*No frameworks. No build tools. Just clean, simple code.*
