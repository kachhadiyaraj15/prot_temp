# Portfolio Website

A clean, universal static portfolio that works on any hosting platform.

## 🚀 Quick Deploy

### Cloudflare Pages (Recommended)
1. Push to GitHub
2. Go to [pages.cloudflare.com](https://pages.cloudflare.com)
3. Connect your repository
4. **Build settings:**
   - Build command: `npm run build`
   - Build output directory: `.` (just a dot)
5. Deploy!

**Note:** If build fails, try:
- Build command: (leave empty)
- Output directory: `.`
- The `api-static/` folder is already pre-built and committed!

### Vercel / Netlify
1. Push to GitHub
2. Connect repository
3. Build command: `npm run build`
4. Deploy!

### GitHub Pages
Add `.github/workflows/deploy.yml`:
```yaml
name: Deploy
on:
  push:
    branches: [ main ]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: .
```

## 📁 Structure

- `*.html` - Your pages
- `blog.js` - Frontend logic
- `styles.css` - Styling
- `generate-content.js` - Build script
- `blog/`, `projects/`, `home/`, `about/` - Your content
- `api-static/` - Auto-generated JSON (already built)

## ✏️ Add Content

1. Add markdown files to `blog/tech/` or `blog/non-tech/`
2. Add projects to `projects/`
3. Edit `home/home.md` and `about/about.md`
4. Run `npm run build` to regenerate JSON
5. Commit and push - auto-deploys!

## 🔧 Local Development

```bash
python server.py
# Visit http://localhost:8000
```

## 🎨 Customize

- Edit `styles.css` for styling
- Edit `config/site.md` for site settings
- Edit `config/images.md` for image URLs

---

**Universal static site - deploy anywhere, zero configuration needed.**

