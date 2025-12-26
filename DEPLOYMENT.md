# 🚀 Deploying to Vercel

This guide will help you deploy your portfolio to Vercel for public access.

## 📋 Prerequisites

1. **GitHub Account** - Your code should be in a GitHub repository
2. **Vercel Account** - Sign up at [vercel.com](https://vercel.com) (free tier is sufficient)

## 🔧 What's Been Modified

Your application has been configured for Vercel deployment:

### ✅ Files Added:
- `vercel.json` - Vercel configuration
- `api/` folder - Serverless functions replacing `server.py`
  - `api/blog-files.py`
  - `api/project-files.py`
  - `api/home.py`
  - `api/about.py`
  - `api/config/images.py`
  - `api/config/site.py`
- `.vercelignore` - Files to exclude from deployment

### ℹ️ What Changed:
- Your Python `server.py` is replaced by serverless functions in the `api/` folder
- Each API endpoint is now a separate serverless function
- The frontend (HTML/CSS/JS) remains unchanged

## 📤 Deployment Steps

### Method 1: Deploy via Vercel Dashboard (Easiest)

1. **Push your code to GitHub:**
   ```bash
   git add .
   git commit -m "Add Vercel deployment configuration"
   git push
   ```

2. **Go to Vercel:**
   - Visit [vercel.com](https://vercel.com)
   - Click "Sign Up" or "Login" (use GitHub to sign in)

3. **Import Your Repository:**
   - Click "Add New..." → "Project"
   - Select your GitHub repository (`prot_temp`)
   - Click "Import"

4. **Configure Project:**
   - **Framework Preset:** Other
   - **Root Directory:** `./` (leave as default)
   - **Build Command:** Leave empty
   - **Output Directory:** `./` (leave as default)
   - Click "Deploy"

5. **Wait for Deployment:**
   - Vercel will build and deploy your site
   - You'll get a URL like: `https://your-project.vercel.app`

### Method 2: Deploy via Vercel CLI

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Deploy:**
   ```bash
   vercel
   ```

4. **Follow the prompts:**
   - Set up and deploy? `Y`
   - Which scope? (Select your account)
   - Link to existing project? `N`
   - Project name? (Press Enter for default)
   - In which directory? `./` (Press Enter)
   - Want to override settings? `N`

5. **Deploy to Production:**
   ```bash
   vercel --prod
   ```

## 🔍 Testing Your Deployment

After deployment, test these URLs:

- **Home:** `https://your-project.vercel.app/`
- **Blog:** `https://your-project.vercel.app/blog.html`
- **Projects:** `https://your-project.vercel.app/projects.html`
- **About:** `https://your-project.vercel.app/about.html`
- **API Test:** `https://your-project.vercel.app/api/blog-files`

## 🐛 Troubleshooting

### Issue: API endpoints not working

**Solution:** Check that all files in the `api/` folder are committed to GitHub:
```bash
git add api/
git commit -m "Add API serverless functions"
git push
```

### Issue: 404 errors on page refresh

**Solution:** This is already handled by `vercel.json` routing configuration.

### Issue: Images not loading

**Solution:** Make sure all image paths in your markdown files are relative and the images are in the repository.

## 🎨 Custom Domain (Optional)

1. Go to your project in Vercel Dashboard
2. Click "Settings" → "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions

## 🔄 Automatic Deployments

Vercel automatically deploys when you push to GitHub:

```bash
# Make changes to your code
git add .
git commit -m "Update content"
git push
```

Vercel will automatically rebuild and redeploy! 🎉

## 📊 Environment Variables (If Needed)

If you need to add environment variables:

1. Go to Vercel Dashboard → Your Project
2. Click "Settings" → "Environment Variables"
3. Add your variables
4. Redeploy

## 💡 Tips

- **Preview Deployments:** Every branch gets a preview URL
- **Analytics:** Enable Vercel Analytics in project settings
- **Performance:** Vercel automatically optimizes your site
- **Free Tier:** Includes:
  - Unlimited deployments
  - Automatic HTTPS
  - Global CDN
  - 100GB bandwidth/month

## 🆘 Need Help?

- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Support](https://vercel.com/support)

---

**Your portfolio is now ready for deployment! 🚀**
