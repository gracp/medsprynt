# Med Sprynt - AI Automation for Med Tech Ecommerce

This is the official website for Med Sprynt, a specialized AI automation service for Med Tech ecommerce brands. The site is built with 11ty (Eleventy), Tailwind CSS, and Alpine.js.

[![Netlify Status](https://api.netlify.com/api/v1/badges/your-netlify-badge-id/deploy-status)](https://app.netlify.com/sites/medsprynt/deploys)

## 📋 Table of Contents

- [Tech Stack](#-tech-stack)
- [Features](#-features)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Development Guidelines](#-development-guidelines)
- [Deployment](#-deployment)
- [Content Management](#-content-management)
- [Performance Optimization](#-performance-optimization)
- [License](#-license)

## 🛠 Tech Stack

- **Static Site Generator**: [11ty (Eleventy)](https://www.11ty.dev/) - Lightweight SSG with flexible templating
- **CSS Framework**: [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- **JavaScript**: [Alpine.js](https://alpinejs.dev/) - Lightweight JS framework for interactivity
- **Form Processing**: [Netlify Functions](https://www.netlify.com/products/functions/) - Serverless functions for form handling
- **Analytics**: [Simple Analytics](https://simpleanalytics.com/) - Privacy-friendly analytics
- **Deployment**: [Netlify](https://www.netlify.com/) - CI/CD and hosting

## ✨ Features

- Responsive, mobile-first design
- High-conversion landing page following Alex Hormozi principles
- Blog with article collections and tag filtering
- Contact form with serverless handling
- Newsletter subscription integration
- SEO-optimized with proper metadata, structured data, and social sharing
- Performance optimized (90+ Lighthouse scores)
- GDPR-compliant analytics
- Fast page loads with optimized assets

## 🚀 Getting Started

### Prerequisites

- Node.js (version 18.x or higher)
- npm (version 8.x or higher)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/medsprynt-site.git
   cd medsprynt-site
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create environment variables:
   ```bash
   cp .env.example .env
   ```
   Fill in the required API keys and settings in the `.env` file.

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and visit `http://localhost:8080`

## 📂 Project Structure

```
medsprynt-site/
├── .eleventy.js       # 11ty configuration
├── netlify.toml       # Netlify configuration
├── package.json       # Project dependencies
├── netlify/
│   └── functions/     # Serverless functions
├── src/
│   ├── _data/         # Global site data
│   ├── _includes/     # Layout templates and components
│   │   ├── layouts/   # Base layouts
│   │   ├── partials/  # Reusable page parts (header, footer)
│   │   └── sections/  # Page sections (features, testimonials)
│   ├── assets/        # Static assets
│   │   ├── images/    # Image files
│   │   └── fonts/     # Font files
│   ├── blog/          # Blog posts and listings
│   ├── css/           # CSS files
│   ├── js/            # JavaScript files
│   └── index.njk      # Homepage
└── _site/             # Generated site (not committed)
```

## 📐 Development Guidelines

### CSS Conventions

- Follow Tailwind's utility-first approach
- Use the `@apply` directive for repetitive patterns
- Custom components use BEM-like naming (e.g., `.btn`, `.btn-primary`)
- Maintain consistent spacing and color schemes

### JavaScript Guidelines

- Use Alpine.js for interactive components
- Keep Alpine components small and focused
- Prefer declarative approaches over imperative
- Lazy-load non-critical scripts

### Content Guidelines

- Blog posts should be created as Markdown files in `src/blog/`
- Include front matter for metadata
- Optimize images before adding to the repository
- Follow SEO best practices for all content

## 🚢 Deployment

The site is automatically deployed to Netlify when changes are pushed to the main branch.

### Manual Deployment

```bash
# Build the site
npm run build

# Preview the production build
npm run serve

# Deploy to Netlify (requires Netlify CLI)
netlify deploy --prod
```

## 📝 Content Management

### Adding Blog Posts

1. Create a new Markdown file in `src/blog/` with the appropriate slug
2. Include required front matter:
   ```yaml
   ---
   layout: layouts/blog-post.njk
   title: Your Post Title
   description: Brief description for SEO
   date: 2023-08-15
   author: Author Name
   featured_image: /assets/images/blog/your-image.jpg
   tags:
     - tag1
     - tag2
   ---
   ```
3. Write your content in Markdown format
4. Preview with `npm run dev`

### Updating Site Content

- Homepage sections are in `src/_includes/sections/`
- Global data is in `src/_data/`
- Update images in `src/assets/images/`

## 🔍 Performance Optimization

The site is optimized for performance:

- Images are automatically compressed at build time
- CSS is purged of unused styles
- Critical CSS is inlined
- JavaScript is minified and bundled
- Resource hints for faster page loads
- Cache control headers for static assets

## 📄 License

This project is proprietary and confidential. Unauthorized copying, distribution, or use is strictly prohibited.

---

© 2023 Med Sprynt. All rights reserved. 