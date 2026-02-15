import type { Project } from '../types';

const projects: Project[] = [
    {
        id: 'example-saas-dashboard',
        title: 'Example SaaS Dashboard',
        tagline: 'Analytics-focused admin experience for modern teams',
        description:
            'A sample project showing how to structure portfolio entries with a thumbnail, demo media, tags, and external links.',
        fullDescription: [
            'Built role-based dashboard pages for admins and team members.',
            'Added charts and KPI cards for traffic, conversions, and retention.',
            'Implemented reusable UI blocks to keep styling and spacing consistent.',
        ],
        thumbnail: 'https://placehold.co/1200x800/0f172a/e2e8f0?text=Thumbnail+Image',
        demoGif: 'https://placehold.co/1200x800/1e293b/e2e8f0?text=Demo+Media',
        tags: ['React', 'TypeScript', 'Analytics'],
        links: {
            live: 'https://example.com',
            repo: 'https://github.com/yourusername/example-saas-dashboard',
        },
    },
    {
        id: 'example-mobile-app',
        title: 'Example Mobile App',
        tagline: 'Cross-platform app with offline-first data sync',
        description:
            'A second sample project for contributors, demonstrating the same data model used by the Selected Works section.',
        fullDescription: [
            'Created feature modules for auth, profile, and content feeds.',
            'Added background sync to queue writes and retry when online.',
            'Used typed APIs and shared models for predictable data handling.',
        ],
        thumbnail: 'https://placehold.co/1200x800/1f2937/f9fafb?text=Thumbnail+Image',
        demoGif: 'https://placehold.co/1200x800/111827/f9fafb?text=Demo+Media',
        tags: ['Flutter', 'Offline-First', 'DX'],
        links: {
            live: null,
            repo: 'https://github.com/yourusername/example-mobile-app',
        },
    },
];

export default projects;
