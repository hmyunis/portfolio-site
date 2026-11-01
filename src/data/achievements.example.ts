import type { Achievement } from '../types';

const achievements: Achievement[] = [
    {
        id: 'example-competition-award',
        title: 'Example National Hackathon Winner',
        issuer: 'Tech Innovation Foundation',
        period: 'June 2026',
        badge: 'National Winner',
        category: 'award',
        description:
            '1st place winner in the national hackathon for developing an AI-driven community platform.',
        credentialUrl: 'https://example.com/verify-credential',
        verificationLabel: 'Verify Credential',
        image: 'https://placehold.co/1200x800/0f172a/e2e8f0?text=Certificate+Image',
    },
    {
        id: 'example-global-fellowship',
        title: 'Example Global Leadership Honors',
        issuer: 'Global Leadership Institute',
        period: 'September 2026',
        badge: 'Global Finalist',
        category: 'certification',
        description:
            'Selected global finalist. Completed multi-week executive curriculum in leadership and systems design.',
        credentialUrl: 'https://example.com/verify-certificate',
        verificationLabel: 'Verify Certificate',
        secondaryUrl: 'https://example.com/acknowledgment',
        secondaryLabel: 'Acknowledgment Letter',
        image: 'https://placehold.co/1200x800/1e293b/e2e8f0?text=Fellowship+Certificate',
        gallery: [
            'https://placehold.co/1200x800/1e293b/e2e8f0?text=Letter+Of+Acknowledgment',
        ],
    },
    {
        id: 'example-tech-certification',
        title: 'Example Verified Cloud Specialist',
        issuer: 'Global Tech Academy',
        period: '2025',
        badge: 'Verified Credential',
        category: 'certification',
        description:
            'Completed practical evaluations and simulations covering networking and distributed cloud systems.',
        credentialUrl: 'https://www.credly.com/badges/example',
        verificationLabel: 'Verify on Credly',
        image: 'https://placehold.co/800x800/111827/f9fafb?text=Badge+Icon',
    },
];

export default achievements;
