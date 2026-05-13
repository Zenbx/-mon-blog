# Zenbx — Personal Blog

Personal blog built with Astro 6, React 19 and Tailwind CSS v4. Deployed on GitHub Pages.

**Live:** https://zenbx.github.io/-mon-blog

---

## Stack

| Layer | Technology |
|-------|-----------|
| Framework | [Astro 6](https://astro.build) |
| UI | [React 19](https://react.dev) (islands only) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com) via `@tailwindcss/vite` |
| Content | MDX via `@astrojs/mdx` |
| Analytics | [Umami](https://umami.is) |
| Comments | [Giscus](https://giscus.app) (GitHub Discussions) |
| Deployment | GitHub Pages via GitHub Actions |

---

## Features

**Static-first architecture**
Every page is pre-rendered at build time. No server, no runtime cost — just plain HTML served instantly from GitHub Pages. React is only loaded for the two components that genuinely need interactivity (progress bar and TOC), keeping the JavaScript bundle as small as possible.

**Islands architecture (Astro)**
Instead of hydrating the entire page like Next.js or Nuxt would, only the components that need client-side behavior are shipped as JavaScript. Everything else — header, footer, article cards — is pure HTML. The result is near-instant load times and a Core Web Vitals score that's hard to beat with a full SPA framework.

**Reading progress bar & table of contents**
Two React islands that enhance the reading experience without affecting the rest of the page. The TOC tracks the active heading on scroll using a reliable scroll-based detection (not IntersectionObserver which can miss fast scrolls), and scrolls with offset to account for the sticky header.

**Dark / light mode with zero flash**
Theme preference is read from `localStorage` in an inline script placed *before* the first paint, so the page always renders in the right mode — no white flash on dark mode reload. The toggle button in the header uses CSS (`dark:hidden` / `dark:block`) rather than JavaScript to switch the icon.

**MDX content collections with Zod validation**
Articles are written in MDX and validated against a Zod schema at build time. If a field is missing or has the wrong type, the build fails immediately rather than silently rendering broken pages. This makes it safe to add new required fields without worrying about old articles slipping through.

**Umami analytics**
Privacy-focused page view tracking — no cookies, no GDPR banner needed, no data sold to third parties. Stats are visible in a personal dashboard at cloud.umami.is. Chosen over Google Analytics specifically to avoid tracking overhead and keep the site fast and respectful of readers.

**Giscus comments & reactions**
Comments and emoji reactions powered by GitHub Discussions — zero backend, zero database, free forever. Authentication goes through GitHub, which keeps spam low. The theme syncs automatically with dark/light mode via a `MutationObserver` on the `<html>` class, so the comment widget never looks out of place.

---

## Project Structure

```
blog-jeff/
├── public/
│   └── ZenbxGhost-logo.png     # Logo used in header, favicon, author card
├── src/
│   ├── components/
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   ├── ArticleCard.astro
│   │   ├── TagBadge.astro
│   │   ├── GiscusComments.astro
│   │   ├── ReadingProgress.jsx  # React island
│   │   └── TableOfContents.jsx  # React island
│   ├── content/
│   │   └── blog/               # MDX articles go here
│   ├── layouts/
│   │   ├── BaseLayout.astro    # HTML shell, Header, Footer, dark mode
│   │   └── ArticleLayout.astro # Article shell, TOC, progress bar
│   ├── pages/
│   │   ├── index.astro         # Homepage
│   │   ├── about/index.astro
│   │   ├── blog/
│   │   │   ├── index.astro     # All articles
│   │   │   └── [...slug].astro # Individual article
│   │   └── tags/
│   │       ├── index.astro     # Tags cloud
│   │       └── [tag].astro     # Filtered by tag
│   ├── styles/
│   │   └── global.css          # Tailwind + article prose styles
│   └── content.config.ts       # Blog collection schema
├── astro.config.mjs
└── package.json
```

---

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server at http://localhost:4321/mon-blog
npm run dev

# Production build
npm run build

# Preview production build locally
npm run preview
```

---

## Writing an Article

Create a `.mdx` file in `src/content/blog/`. The filename becomes the URL slug.

```mdx
---
title: "My Article Title"
description: "One sentence summary shown in cards and SEO."
pubDate: 2026-05-13
tags: ["astro", "web"]
readingTime: 5
featured: false
---

Intro paragraph...

## Section

Content...
```

**Schema fields:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | string | yes | Article title |
| `description` | string | yes | Summary (SEO + card) |
| `pubDate` | date | yes | Format `YYYY-MM-DD` |
| `tags` | string[] | yes | 2–4 tags, lowercase |
| `readingTime` | number | no | Minutes (250 words ≈ 1 min) |
| `featured` | boolean | no | Pins to homepage hero |
| `cover` | string | no | Path to cover image |

> See `GUIDE-REDACTION.md` at the project root for the full formatting guide (headings, code blocks, links, etc.)

---

## Configuration

### Dark mode
Automatic — reads `prefers-color-scheme` on first visit, stored in `localStorage`. Toggle button in header.

### Umami Analytics
Website ID is set in `src/layouts/BaseLayout.astro`:
```html
data-website-id="5ddeb679-d28f-4b38-a344-db6831f4f7fd"
```
Dashboard: https://cloud.umami.is

### Giscus (Comments & Reactions)
Configured in `src/components/GiscusComments.astro`. Requires **GitHub Discussions** enabled on the repo (`Zenbx/-mon-blog` → Settings → Features → Discussions).

Theme syncs automatically with dark/light mode via `MutationObserver`.

---

## Deployment

Deployed automatically on every push to `main` via GitHub Actions (`.github/workflows/deploy.yml`).

```bash
git add .
git commit -m "feat: new article"
git push
```

GitHub Actions builds the site with `npm run build` and publishes the `dist/` folder to GitHub Pages. Takes ~2 minutes.

---

## Commands

| Command | Action |
|---------|--------|
| `npm run dev` | Dev server at `localhost:4321/mon-blog` |
| `npm run build` | Build to `./dist/` |
| `npm run preview` | Preview the build locally |
