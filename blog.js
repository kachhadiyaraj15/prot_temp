// ===========================
// Theme Management Module
// ===========================

class ThemeManager {
    constructor() {
        this.THEME_KEY = 'portfolio-theme';
        this.THEMES = {
            DARK: 'dark',
            LIGHT: 'light'
        };
        this.init();
    }

    init() {
        // Load saved theme or default to dark
        const savedTheme = this.getSavedTheme();
        this.setTheme(savedTheme);
        this.setupToggleButton();
    }

    getSavedTheme() {
        return localStorage.getItem(this.THEME_KEY) || this.THEMES.DARK;
    }

    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem(this.THEME_KEY, theme);
        this.updateToggleButton(theme);
    }

    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === this.THEMES.DARK ? this.THEMES.LIGHT : this.THEMES.DARK;
        this.setTheme(newTheme);
    }

    setupToggleButton() {
        const toggleBtn = document.getElementById('theme-toggle');
        if (toggleBtn) {
            toggleBtn.addEventListener('click', () => this.toggleTheme());
        }
    }

    updateToggleButton(theme) {
        const toggleBtn = document.getElementById('theme-toggle');
        if (toggleBtn) {
            const icon = toggleBtn.querySelector('.theme-icon');
            if (icon) {
                icon.textContent = theme === this.THEMES.DARK ? '☀️' : '🌙';
            }
        }
    }
}

// ===========================
// Filter Panel Module
// ===========================

class FilterPanel {
    constructor() {
        this.panel = null;
        this.overlay = null;
        this.toggleBtn = null;
        this.closeBtn = null;
        this.isOpen = false;
    }

    init() {
        this.panel = document.getElementById('filter-panel');
        this.overlay = document.getElementById('filter-overlay');
        this.toggleBtn = document.getElementById('filter-toggle-btn');
        this.closeBtn = document.getElementById('filter-close-btn');

        if (!this.panel || !this.overlay || !this.toggleBtn || !this.closeBtn) {
            console.warn('Filter panel elements not found');
            return;
        }

        this.setupEventListeners();
    }

    setupEventListeners() {
        // Open panel
        this.toggleBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent immediate close from document click
            this.open();
        });

        // Close panel
        this.closeBtn.addEventListener('click', () => this.close());

        // Close on overlay click
        this.overlay.addEventListener('click', () => this.close());

        // Close on ESC key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.close();
            }
        });

        // Close when clicking outside the panel
        document.addEventListener('click', (e) => {
            if (this.isOpen) {
                // Check if click is outside the panel
                const isClickInsidePanel = this.panel.contains(e.target);
                const isClickOnToggleBtn = this.toggleBtn.contains(e.target);

                // Close if clicked outside panel and not on toggle button
                if (!isClickInsidePanel && !isClickOnToggleBtn) {
                    this.close();
                }
            }
        });

        // Prevent clicks inside panel from closing it
        this.panel.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }

    open() {
        this.panel.classList.add('active');
        this.overlay.classList.add('active');
        this.isOpen = true;

        // Only prevent scrolling on mobile (when overlay is visible)
        if (window.innerWidth < 1200) {
            document.body.style.overflow = 'hidden';
        }
    }

    close() {
        this.panel.classList.remove('active');
        this.overlay.classList.remove('active');
        this.isOpen = false;
        document.body.style.overflow = ''; // Restore scrolling

        // Note: Filter selections are preserved - they remain active even when panel closes
        // The BlogSystem maintains the selected categories and tags state
    }

    toggle() {
        if (this.isOpen) {
            this.close();
        } else {
            this.open();
        }
    }
}

// ===========================
// Table of Contents Module
// ===========================

class TableOfContents {
    constructor() {
        this.tocContainer = null;
        this.headings = [];
        this.activeId = null;
    }

    generate() {
        const blogContent = document.querySelector('.blog-post-content');
        if (!blogContent) return;

        // Get all headings (h2 and h3)
        this.headings = Array.from(blogContent.querySelectorAll('h2, h3'));

        if (this.headings.length === 0) return;

        // Add IDs to headings if they don't have them
        this.headings.forEach((heading, index) => {
            if (!heading.id) {
                heading.id = `heading-${index}`;
            }
        });

        // Create TOC container
        this.createTOCContainer();

        // Build TOC list
        this.buildTOCList();

        // Setup scroll spy
        this.setupScrollSpy();
    }

    createTOCContainer() {
        const blogLayout = document.querySelector('.blog-layout');
        if (!blogLayout) return;

        const tocWrapper = document.createElement('aside');
        tocWrapper.className = 'toc-wrapper';
        tocWrapper.innerHTML = `
            <div class="toc-sticky">
                <nav class="toc">
                    <h3 class="toc-title">On this page</h3>
                    <ul class="toc-list" id="toc-list"></ul>
                </nav>
            </div>
        `;

        blogLayout.appendChild(tocWrapper);
        this.tocContainer = document.getElementById('toc-list');
    }

    buildTOCList() {
        if (!this.tocContainer) return;

        const tocHTML = this.headings.map(heading => {
            const level = heading.tagName.toLowerCase();
            const text = heading.textContent;
            const id = heading.id;

            return `
                <li class="toc-item toc-${level}">
                    <a href="#${id}" class="toc-link" data-target="${id}">
                        ${text}
                    </a>
                </li>
            `;
        }).join('');

        this.tocContainer.innerHTML = tocHTML;

        // Add click handlers
        this.tocContainer.querySelectorAll('.toc-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('data-target');
                this.scrollToHeading(targetId);
            });
        });
    }

    scrollToHeading(id) {
        const element = document.getElementById(id);
        if (element) {
            const offset = 80; // Account for header
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    }

    setupScrollSpy() {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.setActiveLink(entry.target.id);
                    }
                });
            },
            {
                rootMargin: '-100px 0px -66%',
                threshold: 0
            }
        );

        this.headings.forEach(heading => observer.observe(heading));
    }

    setActiveLink(id) {
        if (this.activeId === id) return;

        this.activeId = id;

        // Remove active class from all links
        this.tocContainer.querySelectorAll('.toc-link').forEach(link => {
            link.classList.remove('active');
        });

        // Add active class to current link
        const activeLink = this.tocContainer.querySelector(`[data-target="${id}"]`);
        if (activeLink) {
            activeLink.classList.add('active');

            // Auto-scroll the TOC to make the active link visible
            // Use scrollIntoView with smooth behavior and center alignment
            activeLink.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',      // Scroll only if needed
                inline: 'nearest'
            });
        }
    }
}

// ===========================
// Blog System Module
// ===========================

class BlogSystem {
    constructor(configManager = null) {
        this.posts = [];
        this.configManager = configManager;
        this.markdownParser = new MarkdownParser(configManager);
        this.apiEndpoint = '/api-static/blog-files.json';
        this.selectedCategories = new Set(); // tech, non-tech
        this.selectedTags = new Set(); // individual tags
        this.allTags = new Map(); // Map<tag, Set<category>> to track which category has which tags
    }

    /**
     * Fetch all markdown files from the blog directory via API
     * Automatically discovers all .md files (excluding templates starting with _)
     */
    async fetchBlogFiles() {
        try {
            const response = await fetch(this.apiEndpoint);
            if (!response.ok) {
                throw new Error('Failed to fetch blog files');
            }
            const data = await response.json();
            return data.files;
        } catch (error) {
            console.error('Error fetching blog files:', error);
            return [];
        }
    }

    async loadPostsFromFiles() {
        const loadedPosts = [];

        // Fetch blog files from API (auto-discovery)
        const blogFiles = await this.fetchBlogFiles();



        for (const fileInfo of blogFiles) {
            try {
                // fileInfo is now an object: {file: 'tech/post.md', category: 'tech'}
                const filename = fileInfo.file || fileInfo; // backward compatibility
                const category = fileInfo.category || 'general';

                const response = await fetch(`blog/${filename}`);
                const content = await response.text();

                const post = this.parseFrontmatter(content, filename, category);



                // Only include published posts
                if (post && post.published) {
                    loadedPosts.push(post);

                    // Collect all tags for filtering
                    if (post.tags && post.tags.length > 0) {
                        post.tags.forEach(tag => {
                            if (!this.allTags.has(tag)) {
                                this.allTags.set(tag, new Set());
                            }
                            this.allTags.get(tag).add(post.category);
                        });
                    }
                }
            } catch (error) {
                console.error('Error loading file:', error);
            }
        }



        this.posts = loadedPosts;
        return this.posts;
    }

    parseFrontmatter(content, filename, category) {
        // Check if content starts with frontmatter (---)
        if (!content.startsWith('---')) {
            return null;
        }

        // Extract frontmatter
        const parts = content.split('---');
        if (parts.length < 3) {
            return null;
        }

        const frontmatterText = parts[1].trim();
        const markdownContent = parts.slice(2).join('---');

        // Parse frontmatter (simple YAML parser)
        const frontmatter = {};
        const lines = frontmatterText.split('\n');

        for (const line of lines) {
            const colonIndex = line.indexOf(':');
            if (colonIndex === -1) continue;

            const key = line.substring(0, colonIndex).trim();
            let value = line.substring(colonIndex + 1).trim();

            // Parse arrays [item1, item2]
            if (value.startsWith('[') && value.endsWith(']')) {
                value = value.slice(1, -1).split(',').map(item => item.trim());
            }
            // Parse booleans
            else if (value === 'true') value = true;
            else if (value === 'false') value = false;

            frontmatter[key] = value;
        }

        // Create post object
        // Extract just the filename without path
        const filenameParts = filename.split('/');
        const id = filenameParts[filenameParts.length - 1].replace('.md', '');

        return {
            id,
            title: frontmatter.title || 'Untitled',
            date: frontmatter.date || new Date().toISOString().split('T')[0],
            readingTime: frontmatter.readingTime || '5 min read',
            excerpt: frontmatter.excerpt || '',
            tags: frontmatter.tags || [],
            published: frontmatter.published || false,
            category: category, // tech, non-tech, or general
            file: `blog/${filename}`,
            content: markdownContent
        };
    }

    async loadBlogList() {
        const blogListContainer = document.getElementById('blog-list');
        if (!blogListContainer) return;

        // Load posts from markdown files
        await this.loadPostsFromFiles();

        // Setup filters
        this.setupCategoryFilters();
        this.setupTagFilters();

        // Initialize tag filters display
        this.updateTagFilters();

        // Initial render
        this.renderFilteredPosts();
    }

    setupCategoryFilters() {
        const categoryCheckboxes = document.querySelectorAll('.category-filter');
        categoryCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                const category = e.target.dataset.category;
                if (e.target.checked) {
                    this.selectedCategories.add(category);
                } else {
                    this.selectedCategories.delete(category);
                }
                this.updateTagFilters();
                this.renderFilteredPosts();
            });
        });
    }

    setupTagFilters() {
        // This will be called after rendering tag filters
        const updateTagListeners = () => {
            const tagButtons = document.querySelectorAll('.tag-filter-btn');
            tagButtons.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const tag = e.target.dataset.tag;
                    if (this.selectedTags.has(tag)) {
                        this.selectedTags.delete(tag);
                        e.target.classList.remove('active');
                    } else {
                        this.selectedTags.add(tag);
                        e.target.classList.add('active');
                    }
                    this.renderFilteredPosts();
                });
            });
        };

        // Clear all button
        const clearBtn = document.getElementById('clear-tags-btn');
        if (clearBtn) {
            clearBtn.addEventListener('click', () => {
                this.selectedTags.clear();
                document.querySelectorAll('.tag-filter-btn').forEach(btn => {
                    btn.classList.remove('active');
                });
                this.renderFilteredPosts();
            });
        }

        // Initial setup
        updateTagListeners();

        // Store for later use
        this.updateTagListeners = updateTagListeners;
    }

    updateTagFilters() {
        const tagFiltersContainer = document.getElementById('tag-filters');
        if (!tagFiltersContainer) return;

        // Determine which tags to show based on selected categories
        let tagsToShow = [];

        if (this.selectedCategories.size === 0) {
            // No category selected - show all tags
            tagsToShow = Array.from(this.allTags.keys());
        } else {
            // Show only tags from selected categories
            this.allTags.forEach((categories, tag) => {
                for (let selectedCat of this.selectedCategories) {
                    if (categories.has(selectedCat)) {
                        tagsToShow.push(tag);
                        break;
                    }
                }
            });
        }

        // Sort tags alphabetically
        tagsToShow.sort();

        // Render tag filter buttons
        if (tagsToShow.length === 0) {
            tagFiltersContainer.innerHTML = '<p style="color: var(--text-secondary); font-size: 0.9rem;">No tags available</p>';
        } else {
            tagFiltersContainer.innerHTML = tagsToShow.map(tag => {
                const isActive = this.selectedTags.has(tag);
                return `<button class="tag-filter-btn ${isActive ? 'active' : ''}" data-tag="${tag}">${tag}</button>`;
            }).join('');

            // Reattach event listeners
            if (this.updateTagListeners) {
                this.updateTagListeners();
            }
        }
    }

    getFilteredPosts() {
        let filtered = [...this.posts];

        // Filter by category (if any selected)
        if (this.selectedCategories.size > 0) {
            filtered = filtered.filter(post =>
                this.selectedCategories.has(post.category)
            );
        }

        // Filter by tags (if any selected) - show posts with ANY of the selected tags
        if (this.selectedTags.size > 0) {
            filtered = filtered.filter(post =>
                post.tags.some(tag => this.selectedTags.has(tag))
            );
        }

        // Sort by date (newest first)
        filtered.sort((a, b) => new Date(b.date) - new Date(a.date));

        return filtered;
    }

    renderFilteredPosts() {
        const container = document.getElementById('blog-list');
        if (!container) return;

        container.innerHTML = '';

        const filtered = this.getFilteredPosts();

        // Update count
        const countElement = document.getElementById('posts-count');
        if (countElement) {
            countElement.textContent = `Showing ${filtered.length} post${filtered.length !== 1 ? 's' : ''}`;
        }

        if (filtered.length === 0) {
            container.innerHTML = `
                <div style="text-align: center; padding: var(--spacing-xl); color: var(--text-secondary);">
                    <p>No posts found matching your filters.</p>
                    <p style="margin-top: var(--spacing-md); font-size: 0.9rem;">Try selecting different categories or tags.</p>
                </div>
            `;
            return;
        }

        filtered.forEach(post => {
            const blogCard = this.createBlogCard(post);
            container.appendChild(blogCard);
        });
    }

    createBlogCard(post) {
        const card = document.createElement('article');
        card.className = 'blog-card';
        card.onclick = () => window.location.href = `blog-post.html?id=${post.id}`;

        // Category badge
        const categoryBadge = this.getCategoryBadge(post.category);

        card.innerHTML = `
            <div class="blog-card-header">
                ${categoryBadge}
                <h2 class="blog-card-title">
                    <a href="blog-post.html?id=${post.id}">${post.title}</a>
                </h2>
                <div class="blog-card-meta">
                    <span class="blog-card-date">
                        📅 ${this.formatDate(post.date)}
                    </span>
                    <span class="blog-card-reading-time">
                        ⏱️ ${post.readingTime}
                    </span>
                </div>
            </div>
            <p class="blog-card-excerpt">${post.excerpt}</p>
            <div class="blog-card-tags">
                ${post.tags.map(tag => `<span class="blog-tag">${tag}</span>`).join('')}
            </div>
        `;

        return card;
    }

    getCategoryBadge(category) {
        const badges = {
            'tech': '<span class="category-badge tech">TECH</span>',
            'non-tech': '<span class="category-badge non-tech">NON-TECH</span>',
            'general': '<span class="category-badge general">GENERAL</span>'
        };
        return badges[category] || '';
    }

    async loadBlogPost() {
        const urlParams = new URLSearchParams(window.location.search);
        const postId = urlParams.get('id');

        if (!postId) {
            window.location.href = 'blog.html';
            return;
        }

        // Load posts from markdown files first
        await this.loadPostsFromFiles();

        const post = this.posts.find(p => p.id === postId);
        if (!post) {
            window.location.href = 'blog.html';
            return;
        }

        this.updatePageMeta(post);

        try {
            // Use the content from frontmatter parsing (already stripped of frontmatter)
            const html = this.markdownParser.parse(post.content);

            this.renderBlogPost(post, html);

            // Generate TOC after content is rendered
            setTimeout(() => {
                const toc = new TableOfContents();
                toc.generate();
            }, 100);

        } catch (error) {
            console.error('Error loading blog post:', error);
            this.renderError();
        }
    }

    updatePageMeta(post) {
        document.title = `${post.title} - Your Name`;

        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.content = post.excerpt;
        }
    }

    renderBlogPost(post, html) {
        const container = document.getElementById('blog-post-container');
        if (!container) return;

        container.innerHTML = `
            <article class="blog-post">
                <header class="blog-post-header">
                    <h1 class="blog-post-title">${post.title}</h1>
                    <div class="blog-post-meta">
                        <span>📅 ${this.formatDate(post.date)}</span>
                        <span>⏱️ ${post.readingTime}</span>
                    </div>
                    <div class="blog-card-tags">
                        ${post.tags.map(tag => `<span class="blog-tag">${tag}</span>`).join('')}
                    </div>
                </header>
                <div class="blog-post-content">
                    ${html}
                </div>
                ${this.renderBlogNavigation(post)}
            </article>
        `;
    }

    renderBlogNavigation(currentPost) {
        // Sort posts by date (newest first)
        const sortedPosts = [...this.posts].sort((a, b) =>
            new Date(b.date) - new Date(a.date)
        );

        // Find current post index
        const currentIndex = sortedPosts.findIndex(p => p.id === currentPost.id);

        if (currentIndex === -1) return '';

        // Get previous and next posts
        const nextPost = currentIndex > 0 ? sortedPosts[currentIndex - 1] : null; // Newer post
        const prevPost = currentIndex < sortedPosts.length - 1 ? sortedPosts[currentIndex + 1] : null; // Older post

        // If no navigation needed
        if (!prevPost && !nextPost) return '';

        let navigationHTML = '<nav class="blog-post-navigation">';

        // Previous (older) post
        if (prevPost) {
            navigationHTML += `
                <a href="blog-post.html?id=${prevPost.id}" class="blog-nav-link prev">
                    <span class="blog-nav-icon">←</span>
                    <div class="blog-nav-content">
                        <span class="blog-nav-label">Previous</span>
                        <span class="blog-nav-title">${prevPost.title}</span>
                    </div>
                </a>
            `;
        }

        // Next (newer) post
        if (nextPost) {
            navigationHTML += `
                <a href="blog-post.html?id=${nextPost.id}" class="blog-nav-link next">
                    <div class="blog-nav-content">
                        <span class="blog-nav-label">Next</span>
                        <span class="blog-nav-title">${nextPost.title}</span>
                    </div>
                    <span class="blog-nav-icon">→</span>
                </a>
            `;
        }

        navigationHTML += '</nav>';
        return navigationHTML;
    }

    renderError() {
        const container = document.getElementById('blog-post-container');
        if (!container) return;

        container.innerHTML = `
            <div style="text-align: center; padding: var(--spacing-xl);">
                <h2>Post not found</h2>
                <p style="color: var(--text-secondary); margin-top: var(--spacing-md);">
                    The blog post you're looking for doesn't exist or couldn't be loaded.
                </p>
                <a href="blog.html" class="inline-link" style="margin-top: var(--spacing-md); display: inline-block;">
                    ← Back to blog
                </a>
            </div>
        `;
    }

    formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    }
}

// ===========================
// Project System Module
// ===========================

class ProjectSystem {
    constructor(configManager = null) {
        this.projects = [];
        this.configManager = configManager;
        this.markdownParser = new MarkdownParser(configManager);
        this.apiEndpoint = '/api-static/project-files.json';
    }

    /**
     * Fetch all markdown files from the projects directory via API
     * Automatically discovers all .md files (excluding templates starting with _)
     */
    async fetchProjectFiles() {
        try {
            const response = await fetch(this.apiEndpoint);
            if (!response.ok) {
                throw new Error('Failed to fetch project files');
            }
            const data = await response.json();
            return data.files;
        } catch (error) {
            console.error('Error fetching project files:', error);
            return [];
        }
    }

    async loadProjectsFromFiles() {
        const loadedProjects = [];

        // Fetch project files from API (auto-discovery)
        const projectFiles = await this.fetchProjectFiles();



        for (const filename of projectFiles) {
            try {
                const response = await fetch(`projects/${filename}`);
                const content = await response.text();

                const project = this.parseFrontmatter(content, filename);



                // Only include published projects
                if (project && project.published) {
                    loadedProjects.push(project);
                }
            } catch (error) {
                console.error('Error loading project:', error);
            }
        }



        this.projects = loadedProjects;
        return this.projects;
    }

    parseFrontmatter(content, filename) {
        // Check if content starts with frontmatter (---)
        if (!content.startsWith('---')) {
            return null;
        }

        // Extract frontmatter
        const parts = content.split('---');
        if (parts.length < 3) {
            return null;
        }

        const frontmatterText = parts[1].trim();
        const markdownContent = parts.slice(2).join('---');

        // Parse frontmatter (simple YAML parser)
        const frontmatter = {};
        const lines = frontmatterText.split('\n');

        for (const line of lines) {
            const colonIndex = line.indexOf(':');
            if (colonIndex === -1) continue;

            const key = line.substring(0, colonIndex).trim();
            let value = line.substring(colonIndex + 1).trim();

            // Parse arrays [item1, item2]
            if (value.startsWith('[') && value.endsWith(']')) {
                value = value.slice(1, -1).split(',').map(item => item.trim());
            }
            // Parse booleans
            else if (value === 'true') value = true;
            else if (value === 'false') value = false;

            frontmatter[key] = value;
        }

        // Create project object
        const id = filename.replace('.md', '');

        // Replace image variables in frontmatter values if config manager is available
        let imageValue = frontmatter.image || 'assets/images/default-project.jpg';
        if (this.configManager && this.configManager.imageConfigLoaded) {
            imageValue = this.configManager.replaceVariables(imageValue);
        }

        return {
            id,
            title: frontmatter.title || 'Untitled',
            description: frontmatter.description || '',
            image: imageValue,
            technologies: frontmatter.technologies || [],
            githubUrl: frontmatter.githubUrl || '',
            liveUrl: frontmatter.liveUrl || '',
            demoUrl: frontmatter.demoUrl || '',
            published: frontmatter.published || false,
            featured: frontmatter.featured || false,
            date: frontmatter.date || new Date().toISOString().split('T')[0],
            file: `projects/${filename}`,
            content: markdownContent
        };
    }

    async loadProjectsList() {
        const projectsContainer = document.getElementById('projects-grid');
        if (!projectsContainer) return;

        // Load projects from markdown files
        await this.loadProjectsFromFiles();

        if (this.projects.length === 0) {
            projectsContainer.innerHTML = '<p style="color: var(--text-secondary);">No published projects yet.</p>';
            return;
        }

        // Initialize filter state
        this.selectedTags = new Set();

        // Setup filter panel
        this.setupProjectFilterPanel();

        // Setup tag filters
        this.setupProjectTagFilters();

        // Render filtered projects
        this.renderFilteredProjects();
    }

    setupProjectFilterPanel() {
        const filterPanel = document.getElementById('project-filter-panel');
        const filterOverlay = document.getElementById('project-filter-overlay');
        const toggleBtn = document.getElementById('project-filter-toggle-btn');
        const closeBtn = document.getElementById('project-filter-close-btn');

        if (!filterPanel || !toggleBtn) return;

        // Toggle filter panel
        toggleBtn.addEventListener('click', () => {
            filterPanel.classList.toggle('active');
            if (filterOverlay) filterOverlay.classList.toggle('active');
        });

        // Close filter panel
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                filterPanel.classList.remove('active');
                if (filterOverlay) filterOverlay.classList.remove('active');
            });
        }

        // Close on overlay click
        if (filterOverlay) {
            filterOverlay.addEventListener('click', () => {
                filterPanel.classList.remove('active');
                filterOverlay.classList.remove('active');
            });
        }

        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && filterPanel.classList.contains('active')) {
                filterPanel.classList.remove('active');
                if (filterOverlay) filterOverlay.classList.remove('active');
            }
        });
    }

    setupProjectTagFilters() {
        // Collect all unique tags from all projects
        const allTags = new Set();
        this.projects.forEach(project => {
            if (project.technologies && Array.isArray(project.technologies)) {
                project.technologies.forEach(tag => allTags.add(tag));
            }
        });

        const tagFiltersContainer = document.getElementById('project-tag-filters');
        if (!tagFiltersContainer) return;

        // Sort tags alphabetically
        const sortedTags = Array.from(allTags).sort();

        // Create tag filter buttons
        tagFiltersContainer.innerHTML = sortedTags.map(tag =>
            `<button class="tag-filter-btn" data-tag="${tag}">${tag}</button>`
        ).join('');

        // Add click listeners to tag buttons
        const tagButtons = tagFiltersContainer.querySelectorAll('.tag-filter-btn');
        tagButtons.forEach(button => {
            button.addEventListener('click', () => {
                const tag = button.dataset.tag;

                if (this.selectedTags.has(tag)) {
                    this.selectedTags.delete(tag);
                    button.classList.remove('active');
                } else {
                    this.selectedTags.add(tag);
                    button.classList.add('active');
                }

                this.renderFilteredProjects();
            });
        });

        // Clear tags button
        const clearTagsBtn = document.getElementById('clear-project-tags-btn');
        if (clearTagsBtn) {
            clearTagsBtn.addEventListener('click', () => {
                this.selectedTags.clear();
                tagButtons.forEach(btn => btn.classList.remove('active'));
                this.renderFilteredProjects();
            });
        }
    }

    getFilteredProjects() {
        let filtered = [...this.projects];

        // Filter by tags (technologies)
        if (this.selectedTags.size > 0) {
            filtered = filtered.filter(project => {
                if (!project.technologies || !Array.isArray(project.technologies)) {
                    return false;
                }
                // Project must have at least one of the selected tags
                return project.technologies.some(tag => this.selectedTags.has(tag));
            });
        }

        // Sort by date (newest first)
        filtered.sort((a, b) => new Date(b.date) - new Date(a.date));

        return filtered;
    }

    renderFilteredProjects() {
        const projectsContainer = document.getElementById('projects-grid');
        if (!projectsContainer) return;

        const filteredProjects = this.getFilteredProjects();

        // Update projects count
        const countElement = document.getElementById('projects-count');
        if (countElement) {
            const totalCount = this.projects.length;
            const filteredCount = filteredProjects.length;

            if (this.selectedTags.size > 0) {
                countElement.textContent = `Showing ${filteredCount} of ${totalCount} projects`;
            } else {
                countElement.textContent = `${totalCount} ${totalCount === 1 ? 'project' : 'projects'}`;
            }
        }

        // Clear and render projects
        projectsContainer.innerHTML = '';

        if (filteredProjects.length === 0) {
            projectsContainer.innerHTML = '<p style="color: var(--text-secondary);">No projects match the selected filters.</p>';
            return;
        }

        filteredProjects.forEach(project => {
            const projectCard = this.createProjectCard(project);
            projectsContainer.appendChild(projectCard);
        });
    }

    createProjectCard(project) {
        const card = document.createElement('article');
        card.className = 'project-card';

        // Create links HTML
        let linksHTML = '<div class="project-links">';
        if (project.githubUrl) {
            linksHTML += `<a href="${project.githubUrl}" class="project-link" target="_blank" rel="noopener noreferrer">GitHub</a>`;
        }
        if (project.liveUrl) {
            linksHTML += `<a href="${project.liveUrl}" class="project-link" target="_blank" rel="noopener noreferrer">Live Demo</a>`;
        }
        if (project.demoUrl) {
            linksHTML += `<a href="${project.demoUrl}" class="project-link" target="_blank" rel="noopener noreferrer">Demo</a>`;
        }
        // Always add "View Details" link
        linksHTML += `<a href="project-detail.html?id=${project.id}" class="project-link">View Details</a>`;
        linksHTML += '</div>';

        // Create technologies tags
        const techHTML = project.technologies.length > 0
            ? `<div class="project-tech">${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}</div>`
            : '';

        card.innerHTML = `
            ${project.image ? `<img src="${project.image}" alt="${project.title}" class="project-image">` : ''}
            <div class="project-content">
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
                ${techHTML}
                ${linksHTML}
            </div>
        `;

        return card;
    }

    async loadProjectDetail() {
        const urlParams = new URLSearchParams(window.location.search);
        const projectId = urlParams.get('id');

        if (!projectId) {
            window.location.href = 'projects.html';
            return;
        }

        // Load projects from markdown files first
        await this.loadProjectsFromFiles();

        const project = this.projects.find(p => p.id === projectId);
        if (!project) {
            window.location.href = 'projects.html';
            return;
        }

        this.updatePageMeta(project);

        try {
            // Use the content from frontmatter parsing (already stripped of frontmatter)
            const html = this.markdownParser.parse(project.content);

            this.renderProjectDetail(project, html);

        } catch (error) {
            console.error('Error loading project detail:', error);
            this.renderError();
        }
    }

    updatePageMeta(project) {
        document.title = `${project.title} - Your Name`;

        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.content = project.description;
        }
    }

    renderProjectDetail(project, html) {
        const container = document.getElementById('project-detail-container');
        if (!container) return;

        // Create links HTML
        let linksHTML = '<div class="project-detail-links">';
        if (project.githubUrl) {
            linksHTML += `<a href="${project.githubUrl}" class="project-detail-link" target="_blank" rel="noopener noreferrer">
                <svg class="link-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                GitHub
            </a>`;
        }
        if (project.liveUrl) {
            linksHTML += `<a href="${project.liveUrl}" class="project-detail-link" target="_blank" rel="noopener noreferrer">
                <svg class="link-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-1 17h-2v-2h2v2zm2-6v2h-2v-2c0-.55-.45-1-1-1s-1 .45-1 1h-2c0-1.66 1.34-3 3-3s3 1.34 3 3c0 1.11-.6 2.08-1.5 2.6-.72.39-1.5 1.16-1.5 2.4v.5h2v-.5c0-.55.45-1 1-1 .83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5-1.5.67-1.5 1.5z"/>
                </svg>
                Live Demo
            </a>`;
        }
        linksHTML += '</div>';

        const techHTML = project.technologies.length > 0
            ? `<div class="project-detail-tech">
                <h3>Technologies Used:</h3>
                <div class="tech-tags">${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}</div>
            </div>`
            : '';

        container.innerHTML = `
            <article class="project-detail">
                <header class="project-detail-header">
                    ${project.image ? `<img src="${project.image}" alt="${project.title}" class="project-detail-image">` : ''}
                    <h1 class="project-detail-title">${project.title}</h1>
                    <p class="project-detail-description">${project.description}</p>
                    ${linksHTML}
                    ${techHTML}
                </header>
                <div class="project-detail-content">
                    ${html}
                </div>
                <footer class="project-detail-footer">
                    <a href="projects.html" class="back-link">← Back to Projects</a>
                </footer>
            </article>
        `;
    }

    renderError() {
        const container = document.getElementById('project-detail-container');
        if (!container) return;

        container.innerHTML = `
            <div style="text-align: center; padding: var(--spacing-xl);">
                <h2>Project not found</h2>
                <p style="color: var(--text-secondary); margin-top: var(--spacing-md);">
                    The project you're looking for doesn't exist or couldn't be loaded.
                </p>
                <a href="projects.html" class="inline-link" style="margin-top: var(--spacing-md); display: inline-block;">
                    ← Back to projects
                </a>
            </div>
        `;
    }
}

// ===========================
// Home System Module
// ===========================

class HomeSystem {
    constructor(configManager = null) {
        this.homeData = null;
        this.configManager = configManager;
        this.markdownParser = new MarkdownParser(configManager);
        this.apiEndpoint = '/api-static/home.json';
    }

    async fetchHomeContent() {
        try {
            const response = await fetch(this.apiEndpoint);
            if (!response.ok) {
                throw new Error('Failed to fetch home content');
            }
            const data = await response.json();

            return data;
        } catch (error) {
            console.error('Error fetching home content:', error);
            return { content: '', exists: false };
        }
    }

    parseFrontmatter(content) {
        if (!content.startsWith('---')) {
            return { frontmatter: {}, markdownContent: content };
        }

        const parts = content.split('---');
        if (parts.length < 3) {
            return { frontmatter: {}, markdownContent: content };
        }

        const frontmatterText = parts[1].trim();
        const markdownContent = parts.slice(2).join('---');

        const frontmatter = {};
        const lines = frontmatterText.split('\n');

        for (const line of lines) {
            const colonIndex = line.indexOf(':');
            if (colonIndex === -1) continue;

            const key = line.substring(0, colonIndex).trim();
            let value = line.substring(colonIndex + 1).trim();

            frontmatter[key] = value;
        }

        return { frontmatter, markdownContent };
    }

    async loadHomePage() {
        const container = document.getElementById('home-content-container');
        if (!container) return;

        try {
            const data = await this.fetchHomeContent();

            if (!data.exists || !data.content) {
                this.renderError(container);
                return;
            }

            const { frontmatter, markdownContent } = this.parseFrontmatter(data.content);
            this.homeData = { ...frontmatter, content: markdownContent };

            this.renderHomePage(container, this.homeData);

        } catch (error) {
            console.error('Error loading home page:', error);
            this.renderError(container);
        }
    }

    renderHomePage(container, data) {
        // Parse markdown content
        const htmlContent = this.markdownParser.parse(data.content);

        // Build social links HTML
        let socialLinksHTML = '<div class="home-social-links">';

        const socialPlatforms = [
            { key: 'twitter', icon: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z', label: 'Twitter' },
            { key: 'github', icon: 'M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z', label: 'GitHub' },
            { key: 'linkedin', icon: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z', label: 'LinkedIn' },
            { key: 'youtube', icon: 'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z', label: 'YouTube' },
            { key: 'email', icon: 'M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z', label: 'Email', isEmail: true },
            { key: 'website', icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z', label: 'Website' }
        ];

        socialPlatforms.forEach(platform => {
            if (data[platform.key]) {
                const href = platform.isEmail ? `mailto:${data[platform.key]}` : data[platform.key];
                socialLinksHTML += `
                    <a href="${href}" class="home-social-btn" target="${platform.isEmail ? '_self' : '_blank'}" rel="noopener noreferrer" title="${platform.label}">
                        <svg class="social-icon" viewBox="0 0 24 24" fill="currentColor">
                            <path d="${platform.icon}"/>
                        </svg>
                        ${platform.label}
                    </a>
                `;
            }
        });

        socialLinksHTML += '</div>';

        container.innerHTML = `
            <section class="home-hero">
                <h1 class="home-name">${data.name || 'Your Name'}</h1>
                <p class="home-title">${data.title || '(long games >> short games)'}</p>
            </section>

            ${data.bio ? `<section class="home-bio"><p>${data.bio}</p></section>` : ''}

            ${socialLinksHTML}

            <section class="home-content">
                ${htmlContent}
            </section>
        `;
    }

    renderError(container) {
        container.innerHTML = `
            <div style="text-align: center; padding: var(--spacing-xl);">
                <h2>Home content not found</h2>
                <p style="color: var(--text-secondary); margin-top: var(--spacing-md);">
                    Unable to load home page content. Please check that home/home.md exists.
                </p>
            </div>
        `;
    }
}

// ===========================
// About System Module
// ===========================

class AboutSystem {
    constructor(configManager = null) {
        this.aboutData = null;
        this.configManager = configManager;
        this.markdownParser = new MarkdownParser(configManager);
        this.apiEndpoint = '/api-static/about.json';
    }

    async fetchAboutContent() {
        try {
            const response = await fetch(this.apiEndpoint);
            if (!response.ok) {
                throw new Error('Failed to fetch about content');
            }
            const data = await response.json();

            return data;
        } catch (error) {
            console.error('Error fetching about content:', error);
            return { content: '', exists: false };
        }
    }

    parseFrontmatter(content) {
        if (!content.startsWith('---')) {
            return { frontmatter: {}, markdownContent: content };
        }

        const parts = content.split('---');
        if (parts.length < 3) {
            return { frontmatter: {}, markdownContent: content };
        }

        const frontmatterText = parts[1].trim();
        const markdownContent = parts.slice(2).join('---');

        const frontmatter = {};
        const lines = frontmatterText.split('\n');

        for (const line of lines) {
            const colonIndex = line.indexOf(':');
            if (colonIndex === -1) continue;

            const key = line.substring(0, colonIndex).trim();
            let value = line.substring(colonIndex + 1).trim();

            frontmatter[key] = value;
        }

        return { frontmatter, markdownContent };
    }

    async loadAboutPage() {
        const container = document.getElementById('about-content-container');
        if (!container) return;

        try {
            const data = await this.fetchAboutContent();

            if (!data.exists || !data.content) {
                this.renderError(container);
                return;
            }

            const { frontmatter, markdownContent } = this.parseFrontmatter(data.content);
            this.aboutData = { ...frontmatter, content: markdownContent };

            this.renderAboutPage(container, this.aboutData);

        } catch (error) {
            console.error('Error loading about page:', error);
            this.renderError(container);
        }
    }

    renderAboutPage(container, data) {
        // Parse markdown content
        const htmlContent = this.markdownParser.parse(data.content);

        // Build social links
        let socialLinksHTML = '';
        if (data.email || data.twitter || data.github || data.linkedin || data.website) {
            socialLinksHTML = '<div class="about-social-links">';

            if (data.email) {
                socialLinksHTML += `<a href="mailto:${data.email}" class="about-social-link" target="_blank" rel="noopener noreferrer">
                    <svg class="social-icon" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                    </svg>
                    Email
                </a>`;
            }

            if (data.twitter) {
                socialLinksHTML += `<a href="${data.twitter}" class="about-social-link" target="_blank" rel="noopener noreferrer">
                    <svg class="social-icon" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                    Twitter
                </a>`;
            }

            if (data.github) {
                socialLinksHTML += `<a href="${data.github}" class="about-social-link" target="_blank" rel="noopener noreferrer">
                    <svg class="social-icon" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    GitHub
                </a>`;
            }

            if (data.linkedin) {
                socialLinksHTML += `<a href="${data.linkedin}" class="about-social-link" target="_blank" rel="noopener noreferrer">
                    <svg class="social-icon" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    LinkedIn
                </a>`;
            }

            if (data.website) {
                socialLinksHTML += `<a href="${data.website}" class="about-social-link" target="_blank" rel="noopener noreferrer">
                    <svg class="social-icon" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                    </svg>
                    Website
                </a>`;
            }

            socialLinksHTML += '</div>';
        }

        container.innerHTML = `
            <article class="about-content">
                <header class="about-header">
                    <h1 class="about-name">${data.name || 'About Me'}</h1>
                    ${data.tagline ? `<p class="about-tagline">${data.tagline}</p>` : ''}
                    ${data.location ? `<p class="about-location">📍 ${data.location}</p>` : ''}
                    ${socialLinksHTML}
                </header>
                <div class="about-body">
                    ${htmlContent}
                </div>
            </article>
        `;
    }

    renderError(container) {
        container.innerHTML = `
            <div style="text-align: center; padding: var(--spacing-xl);">
                <h2>About content not found</h2>
                <p style="color: var(--text-secondary); margin-top: var(--spacing-md);">
                    Unable to load about page content. Please check that about/about.md exists.
                </p>
            </div>
        `;
    }
}

// ===========================
// Config Manager Module
// ===========================

class ConfigManager {
    constructor() {
        this.imageVariables = {};
        this.siteConfig = {};
        this.imageConfigLoaded = false;
        this.siteConfigLoaded = false;
        this.imageApiEndpoint = '/api-static/config/images.json';
        this.siteApiEndpoint = '/api-static/config/site.json';
    }

    async loadImageConfig() {
        if (this.imageConfigLoaded) {
            return this.imageVariables;
        }

        try {
            const response = await fetch(this.imageApiEndpoint);
            if (!response.ok) {
                throw new Error('Failed to fetch image configuration');
            }
            const data = await response.json();

            if (data.exists && data.variables) {
                this.imageVariables = data.variables;
                this.imageConfigLoaded = true;

            }
        } catch (error) {
            console.error('Error loading image configuration:', error);
        }

        return this.imageVariables;
    }

    async loadSiteConfig() {
        if (this.siteConfigLoaded) {
            return this.siteConfig;
        }

        try {
            const response = await fetch(this.siteApiEndpoint);
            if (!response.ok) {
                throw new Error('Failed to fetch site configuration');
            }
            const data = await response.json();

            if (data.exists && data.config) {
                this.siteConfig = data.config;
                this.siteConfigLoaded = true;

            }
        } catch (error) {
            console.error('Error loading site configuration:', error);
        }

        return this.siteConfig;
    }

    async loadAllConfigs() {
        await Promise.all([
            this.loadImageConfig(),
            this.loadSiteConfig()
        ]);
    }

    replaceVariables(text) {
        if (!text) return text;

        let result = text;

        // Replace all {{VARIABLE_NAME}} patterns with actual values
        for (const [key, value] of Object.entries(this.imageVariables)) {
            const pattern = new RegExp(`\\{\\{${key}\\}\\}`, 'g');
            result = result.replace(pattern, value);
        }

        return result;
    }

    getVariable(name) {
        return this.imageVariables[name] || null;
    }

    getAllVariables() {
        return { ...this.imageVariables };
    }

    getSiteConfig(key) {
        return this.siteConfig[key];
    }

    getAllSiteConfig() {
        return { ...this.siteConfig };
    }

    // Check if a page is enabled
    isPageEnabled(pageName) {
        const key = `enable_${pageName}`;
        return this.siteConfig[key] !== false; // Default to true if not set
    }

    // Check if a feature is enabled
    isFeatureEnabled(featureName) {
        const key = `feature_${featureName}`;
        return this.siteConfig[key] !== false; // Default to true if not set
    }
}

// ===========================
// Markdown Parser Module
// ===========================

class MarkdownParser {
    constructor(configManager = null) {
        this.configManager = configManager;
    }

    parse(markdown) {
        // Replace image variables before parsing if config manager is available
        if (this.configManager && this.configManager.imageConfigLoaded) {
            markdown = this.configManager.replaceVariables(markdown);
        }
        let html = markdown;

        // Headers
        html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
        html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
        html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');

        // Bold
        html = html.replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>');

        // Italic
        html = html.replace(/\*(.*?)\*/gim, '<em>$1</em>');

        // Code blocks
        html = html.replace(/```([\s\S]*?)```/gim, '<pre><code>$1</code></pre>');

        // Inline code
        html = html.replace(/`([^`]+)`/gim, '<code>$1</code>');

        // Links
        html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/gim, '<a href="$2">$1</a>');

        // Images
        html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/gim, '<img src="$2" alt="$1">');

        // Unordered lists
        html = html.replace(/^\* (.*$)/gim, '<li>$1</li>');
        html = html.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');

        // Ordered lists
        html = html.replace(/^\d+\. (.*$)/gim, '<li>$1</li>');

        // Blockquotes
        html = html.replace(/^> (.*$)/gim, '<blockquote>$1</blockquote>');

        // Paragraphs
        html = html.replace(/\n\n/g, '</p><p>');
        html = '<p>' + html + '</p>';

        // Clean up
        html = html.replace(/<p><h/g, '<h');
        html = html.replace(/<\/h([1-6])><\/p>/g, '</h$1>');
        html = html.replace(/<p><ul>/g, '<ul>');
        html = html.replace(/<\/ul><\/p>/g, '</ul>');
        html = html.replace(/<p><pre>/g, '<pre>');
        html = html.replace(/<\/pre><\/p>/g, '</pre>');
        html = html.replace(/<p><blockquote>/g, '<blockquote>');
        html = html.replace(/<\/blockquote><\/p>/g, '</blockquote>');
        html = html.replace(/<p><\/p>/g, '');

        return html;
    }
}

// ===========================
// Navigation Manager Module
// ===========================

class NavigationManager {
    constructor(configManager = null) {
        this.configManager = configManager;
        this.navigationContainer = null;
    }

    /**
     * Initialize dynamic navigation across all pages
     */
    init() {
        this.navigationContainer = document.querySelector('.nav');
        if (!this.navigationContainer) {
            console.warn('Navigation container not found');
            return;
        }

        this.renderNavigation();
    }

    /**
     * Parse navigation configuration string
     * Format: "page|label|url, page|label|url, ..."
     */
    parseNavigationConfig(navString) {
        if (!navString) return [];

        return navString.split(',').map(item => {
            const [page, label, url] = item.split('|').map(s => s.trim());
            return { page, label, url };
        }).filter(item => item.page && item.label && item.url);
    }

    /**
     * Render navigation based on site configuration
     */
    renderNavigation() {
        if (!this.configManager || !this.configManager.siteConfigLoaded) {
            console.warn('Site configuration not loaded, using default navigation');
            return;
        }

        const navString = this.configManager.getSiteConfig('navigation');
        if (!navString) {
            console.warn('No navigation configuration found');
            return;
        }

        const navItems = this.parseNavigationConfig(navString);

        // Filter out disabled pages
        const enabledNavItems = navItems.filter(item => {
            return this.configManager.isPageEnabled(item.page);
        });

        if (enabledNavItems.length === 0) {
            console.warn('No enabled navigation items found');
            return;
        }

        // Get current page to mark as active
        const currentPath = window.location.pathname;

        // Build navigation HTML
        const navHTML = enabledNavItems.map(item => {
            const isActive = currentPath.includes(item.url) ||
                (currentPath === '/' && item.url === 'index.html') ||
                (currentPath.endsWith('/') && item.url === 'index.html');

            return `<a href="${item.url}" class="nav-link ${isActive ? 'active' : ''}">${item.label}</a>`;
        }).join('');

        // Update navigation
        this.navigationContainer.innerHTML = navHTML;


    }

    /**
     * Check if a page should be accessible
     */
    isPageAccessible(pageName) {
        if (!this.configManager || !this.configManager.siteConfigLoaded) {
            return true; // Default to accessible if config not loaded
        }
        return this.configManager.isPageEnabled(pageName);
    }

    /**
     * Redirect if current page is disabled
     */
    checkPageAccess() {
        const path = window.location.pathname;
        let currentPage = null;

        // Determine current page
        if (path.includes('blog.html') || path.includes('blog-post.html')) {
            currentPage = 'blog';
        } else if (path.includes('projects.html') || path.includes('project-detail.html')) {
            currentPage = 'projects';
        } else if (path.includes('about.html')) {
            currentPage = 'about';
        } else if (path.includes('index.html') || path === '/' || path.endsWith('/')) {
            currentPage = 'home';
        }

        // Check if current page is accessible
        if (currentPage && !this.isPageAccessible(currentPage)) {
            console.warn(`Page "${currentPage}" is disabled, redirecting to home`);
            window.location.href = 'index.html';
        }
    }
}

// ===========================
// Application Initialization
// ===========================

class App {
    constructor() {
        this.themeManager = new ThemeManager();
        this.configManager = new ConfigManager();
        this.navigationManager = new NavigationManager(this.configManager);
        this.blogSystem = new BlogSystem(this.configManager);
        this.projectSystem = new ProjectSystem(this.configManager);
        this.aboutSystem = new AboutSystem(this.configManager);
        this.homeSystem = new HomeSystem(this.configManager);
    }

    async init() {
        document.addEventListener('DOMContentLoaded', async () => {
            // Load all configurations first (images + site config)
            await this.configManager.loadAllConfigs();

            // Initialize navigation manager
            this.navigationManager.init();

            // Check if current page is accessible
            this.navigationManager.checkPageAccess();

            // Then initialize the current page
            this.initializeCurrentPage();
        });
    }

    initializeCurrentPage() {
        const path = window.location.pathname;
        const href = window.location.href;

        // Robust path matching for all deployment environments
        if (path.includes('blog.html') || href.includes('blog.html')) {
            if (this.configManager.isFeatureEnabled('blog_filters')) {
                const filterPanel = new FilterPanel();
                filterPanel.init();
            } else {
                const filterToggle = document.getElementById('filter-toggle-btn');
                if (filterToggle) {
                    filterToggle.style.display = 'none';
                }
            }
            this.blogSystem.loadBlogList();
        } else if (path.includes('blog-post.html') || href.includes('blog-post.html')) {
            this.blogSystem.loadBlogPost();
        } else if (path.includes('projects.html') || href.includes('projects.html')) {
            this.projectSystem.loadProjectsList();
        } else if (path.includes('project-detail.html') || href.includes('project-detail.html')) {
            this.projectSystem.loadProjectDetail();
        } else if (path.includes('about.html') || href.includes('about.html')) {
            this.aboutSystem.loadAboutPage();
        } else if (path.includes('index.html') || path.endsWith('/') || path === '' || href.includes('index.html')) {
            this.homeSystem.loadHomePage();
        } else {
            this.homeSystem.loadHomePage();
        }
    }
}

// Initialize the application
const app = new App();
app.init();
