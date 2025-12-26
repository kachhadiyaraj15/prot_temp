#!/usr/bin/env node

/**
 * Static Site Generator for Portfolio
 * Generates JSON files from markdown content for static deployment
 * Works on: Vercel, Cloudflare Pages, Netlify, GitHub Pages, etc.
 */

const fs = require('fs');
const path = require('path');

// Configuration
const BLOG_DIR = 'blog';
const PROJECTS_DIR = 'projects';
const HOME_DIR = 'home';
const ABOUT_DIR = 'about';
const CONFIG_DIR = 'config';
const OUTPUT_DIR = 'api-static';

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

/**
 * Get all markdown files from a directory
 */
function getMarkdownFiles(dir, category = null) {
    const files = [];

    if (!fs.existsSync(dir)) {
        console.warn(`⚠️  Directory not found: ${dir}`);
        return files;
    }

    const items = fs.readdirSync(dir, { withFileTypes: true });

    for (const item of items) {
        if (item.isDirectory()) {
            // Recursively scan subdirectories
            const subCategory = category || item.name;
            const subFiles = getMarkdownFiles(
                path.join(dir, item.name),
                subCategory
            );
            files.push(...subFiles);
        } else if (item.isFile() && item.name.endsWith('.md') && !item.name.startsWith('_')) {
            const relativePath = category
                ? `${category}/${item.name}`
                : item.name;

            files.push({
                file: relativePath,
                category: category || 'general'
            });
        }
    }

    return files;
}

/**
 * Read file content
 */
function readFileContent(filePath) {
    try {
        return fs.readFileSync(filePath, 'utf-8');
    } catch (error) {
        console.error(`❌ Error reading ${filePath}:`, error.message);
        return '';
    }
}

/**
 * Parse frontmatter from markdown
 */
function parseFrontmatter(content) {
    if (!content.startsWith('---')) {
        return {};
    }

    const parts = content.split('---');
    if (parts.length < 3) {
        return {};
    }

    const frontmatterText = parts[1].trim();
    const config = {};
    const lines = frontmatterText.split('\n');

    for (const line of lines) {
        const colonIndex = line.indexOf(':');
        if (colonIndex === -1) continue;

        const key = line.substring(0, colonIndex).trim();
        let value = line.substring(colonIndex + 1).trim();

        // Parse booleans
        if (value.toLowerCase() === 'true') value = true;
        else if (value.toLowerCase() === 'false') value = false;
        // Parse numbers
        else if (!isNaN(value) && value !== '') value = Number(value);

        config[key] = value;
    }

    return config;
}

/**
 * Generate blog files list
 */
function generateBlogFiles() {
    console.log('  📝 Blog posts...');

    const blogFiles = getMarkdownFiles(BLOG_DIR);

    const output = {
        files: blogFiles,
        count: blogFiles.length,
        generated: new Date().toISOString()
    };

    fs.writeFileSync(
        path.join(OUTPUT_DIR, 'blog-files.json'),
        JSON.stringify(output, null, 2)
    );

    console.log(`     ✓ Found ${blogFiles.length} posts`);
}

/**
 * Generate project files list
 */
function generateProjectFiles() {
    console.log('  🚀 Projects...');

    const projectFiles = [];

    if (fs.existsSync(PROJECTS_DIR)) {
        const items = fs.readdirSync(PROJECTS_DIR);
        for (const item of items) {
            if (item.endsWith('.md') && !item.startsWith('_')) {
                projectFiles.push(item);
            }
        }
    }

    projectFiles.sort();

    const output = {
        files: projectFiles,
        count: projectFiles.length,
        generated: new Date().toISOString()
    };

    fs.writeFileSync(
        path.join(OUTPUT_DIR, 'project-files.json'),
        JSON.stringify(output, null, 2)
    );

    console.log(`     ✓ Found ${projectFiles.length} projects`);
}

/**
 * Generate home content
 */
function generateHomeContent() {
    console.log('  🏠 Home page...');

    const homePath = path.join(HOME_DIR, 'home.md');
    const content = fs.existsSync(homePath) ? readFileContent(homePath) : '';

    const output = {
        content: content,
        exists: content.length > 0,
        generated: new Date().toISOString()
    };

    fs.writeFileSync(
        path.join(OUTPUT_DIR, 'home.json'),
        JSON.stringify(output, null, 2)
    );

    console.log(`     ✓ ${output.exists ? 'Generated' : 'Not found'}`);
}

/**
 * Generate about content
 */
function generateAboutContent() {
    console.log('  👤 About page...');

    const aboutPath = path.join(ABOUT_DIR, 'about.md');
    const content = fs.existsSync(aboutPath) ? readFileContent(aboutPath) : '';

    const output = {
        content: content,
        exists: content.length > 0,
        generated: new Date().toISOString()
    };

    fs.writeFileSync(
        path.join(OUTPUT_DIR, 'about.json'),
        JSON.stringify(output, null, 2)
    );

    console.log(`     ✓ ${output.exists ? 'Generated' : 'Not found'}`);
}

/**
 * Generate image config
 */
function generateImageConfig() {
    console.log('  🖼️  Config (images)...');

    const configPath = path.join(CONFIG_DIR, 'images.md');
    const content = fs.existsSync(configPath) ? readFileContent(configPath) : '';
    const variables = parseFrontmatter(content);

    const output = {
        variables: variables,
        exists: Object.keys(variables).length > 0,
        generated: new Date().toISOString()
    };

    // Create config subdirectory
    const configOutputDir = path.join(OUTPUT_DIR, 'config');
    if (!fs.existsSync(configOutputDir)) {
        fs.mkdirSync(configOutputDir, { recursive: true });
    }

    fs.writeFileSync(
        path.join(configOutputDir, 'images.json'),
        JSON.stringify(output, null, 2)
    );

    console.log(`     ✓ ${output.exists ? 'Generated' : 'Not found'}`);
}

/**
 * Generate site config
 */
function generateSiteConfig() {
    console.log('  ⚙️  Config (site)...');

    const configPath = path.join(CONFIG_DIR, 'site.md');
    const content = fs.existsSync(configPath) ? readFileContent(configPath) : '';
    const config = parseFrontmatter(content);

    const output = {
        config: config,
        exists: Object.keys(config).length > 0,
        generated: new Date().toISOString()
    };

    const configOutputDir = path.join(OUTPUT_DIR, 'config');
    if (!fs.existsSync(configOutputDir)) {
        fs.mkdirSync(configOutputDir, { recursive: true });
    }

    fs.writeFileSync(
        path.join(configOutputDir, 'site.json'),
        JSON.stringify(output, null, 2)
    );

    console.log(`     ✓ ${output.exists ? 'Generated' : 'Not found'}`);
}

/**
 * Main execution
 */
function main() {
    console.log('🔨 Building static content...\n');

    try {
        generateBlogFiles();
        generateProjectFiles();
        generateHomeContent();
        generateAboutContent();
        generateImageConfig();
        generateSiteConfig();

        console.log('\n✅ Build complete! Site ready for deployment.\n');

    } catch (error) {
        console.error('\n❌ Build failed:', error.message);
        process.exit(1);
    }
}

// Run if called directly
if (require.main === module) {
    main();
}

module.exports = { main };
