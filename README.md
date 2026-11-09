# Portfolio Website

A modern, performant portfolio website built with Astro, React, and Tailwind CSS. Features a sharp, minimalist design with dark mode support, optimized for speed and accessibility.

## Tech Stack

-   **Framework:** [Astro](https://astro.build/) - Static site generation with island architecture
-   **UI Library:** React 19 - Interactive components
-   **Styling:** Tailwind CSS 4 - Utility-first CSS
-   **Icons:** Lucide React
-   **Language:** TypeScript

## Features

-   🎨 **Sharp Design** - Bold borders, thick shadows, no rounded corners
-   🌓 **Dark Mode** - Theme toggle with system preference detection
-   📱 **Responsive** - Mobile-first design with hamburger menu
-   ⚡ **Performance** - Optimized with lazy loading, code splitting, and prefetching
-   ♿ **Accessible** - ARIA labels, keyboard navigation, skip links
-   📧 **Contact Form** - Web3Forms integration with loading/success/error states
-   📊 **Scroll Progress** - Visual scroll indicator
-   🔍 **SEO** - Meta tags, Open Graph, Twitter Cards, JSON-LD structured data
-   🎯 **404 Page** - Custom error page with navigation

## Getting Started

### Prerequisites

-   Node.js 18+ or Bun
-   Package manager (npm, yarn, pnpm, or bun)

### Installation

```bash
# Install dependencies
npm install
# or
bun install

# Run setup script to create configuration files
# On Linux/Mac:
chmod +x setup.sh && ./setup.sh

# On Windows (PowerShell):
.\setup.ps1

# Or manually copy the example files:
cp .env.example .env
cp src/data/siteData.example.json src/data/siteData.json
cp src/data/projects.example.ts src/data/projects.ts
```

### Development

```bash
npm run dev
# or
bun run dev
```

Visit `http://localhost:4321` to view the site.

### Build

```bash
npm run build
# or
bun run build
```

### Preview

```bash
npm run preview
# or
bun run preview
```

## Project Structure

```
src/
├── components/
│   ├── features/     # Feature-specific components (ContactForm, MobileMenu)
│   ├── sections/     # Page sections (Hero, Experience, Projects, etc.)
│   └── ui/          # Reusable UI components (ThemeToggle, ProjectCard)
├── config/          # Constants and configuration
├── data/            # Data files and templates (siteData.json, projects.ts, *.example.*)
├── layouts/         # Page layouts
├── pages/           # Route pages
├── styles/          # Global CSS
├── types/           # TypeScript type definitions
└── utils/           # Utility functions (theme, form, styling)
```

## Configuration

### Initial Setup

1. **Environment Variables**: Copy `.env.example` to `.env` and add your Web3Forms access key:
   ```bash
   cp .env.example .env
   ```
   Then edit `.env` and replace `your-access-key-here` with your actual Web3Forms access key from [web3forms.com](https://web3forms.com).

   **Spam protection**: the contact form uses a hidden `botcheck` honeypot, a minimum fill-time check, and hCaptcha loaded through the Web3Forms client script. Web3Forms verifies the captcha token on its servers, so no backend is needed. It uses Web3Forms' free shared hCaptcha site key, so no hCaptcha account is needed. To make the captcha mandatory, open your form in the [Web3Forms dashboard](https://app.web3forms.com) and choose hCaptcha as the spam protection.

2. **Personal Data**: Copy the example data files and fill them with your information:
   ```bash
   cp src/data/siteData.example.json src/data/siteData.json
   cp src/data/projects.example.ts src/data/projects.ts
   ```
   Then edit these files with your personal information, projects, and experience.

3. **Site Config**: Modify `src/config/constants.ts` for site-wide settings (URL, theme color, monogram, and the `SHEETS` list that numbers the homepage sections and builds the navbar).

### 404 page

`src/pages/404.astro` builds to `dist/404.html` (marked `noindex`). How unknown URLs reach it depends on the host:

- **Netlify, Vercel, Cloudflare Pages, GitHub Pages**: automatic, no config needed.
- **Plesk** (nginx in front of Apache, so `.htaccess` is not reached for 404s):
  1. `npm run build` also writes `dist-plesk/error_docs/not_found.html` (a copy of the 404 page).
  2. In Plesk: **Websites & Domains → your domain → Hosting & DNS → Hosting** → tick **Custom error documents** → Save.
  3. In **File Manager**, open the **Home directory** (one level above `httpdocs`) → `error_docs/` → upload `not_found.html`, replacing Plesk's file. Keep the exact name.
  4. Re-upload it whenever you rebuild after changing the 404 page, fonts, or styles.
- **Plain Apache / cPanel**: handled by `public/.htaccess` (`ErrorDocument 404 /404.html`), copied into `dist/` on build. It is a hidden file, so make sure your FTP client shows dotfiles.
- **Nginx**: add `error_page 404 /404.html;` to the server block.

### Media

- **Images**: import local images in `projects.ts` / `achievements.ts` (e.g. `thumbnail: skolaThumbnail`, not `.src`). Astro then generates resized WebP variants at build time and serves the smallest one each screen needs. Remote URLs also work, unoptimised.
- **Demo videos**: project demos are MP4, not GIF (about 70% smaller). Put GIFs in `src/assets/works/gifs/` and run `npm run media:videos` (requires [ffmpeg](https://ffmpeg.org/download.html)) to write MP4s to `src/assets/works/videos/`, then reference them with `demoVideo`.
- Homepage cards load a demo video only when hovered; certificate images load only when their dialog opens; cards beyond the first six load only after "Show more".

**Note**: The actual data files (`siteData.json` and `projects.ts`) are gitignored to protect your personal information. Only the example files are tracked in the repository.

## License

MIT
