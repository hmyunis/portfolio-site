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

2. **Personal Data**: Copy the example data files and fill them with your information:
   ```bash
   cp src/data/siteData.example.json src/data/siteData.json
   cp src/data/projects.example.ts src/data/projects.ts
   ```
   Then edit these files with your personal information, projects, and experience.

3. **Site Config**: Modify `src/config/constants.ts` for site-wide settings (URL, theme color, etc.).

**Note**: The actual data files (`siteData.json` and `projects.ts`) are gitignored to protect your personal information. Only the example files are tracked in the repository.

## License

MIT
