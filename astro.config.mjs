import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';

export default defineConfig({
    vite: {
        plugins: [tailwindcss()],
        build: {
            cssMinify: 'lightningcss',
        },
    },
    integrations: [react()],
    prefetch: {
        prefetchAll: false,
        defaultStrategy: 'viewport',
    },
    compressHTML: true,
    build: {
        inlineStylesheets: 'auto',
        assets: '_assets',
    },
});
