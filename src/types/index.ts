export interface SocialLink {
    name: string;
    url: string;
    icon: string;
}

export interface Philosophy {
    headline: string;
    text: string;
}

export interface Skill {
    name: string;
    icon?: string;
}

export interface Experience {
    company: string;
    companyUrl?: string;
    role: string;
    period: string;
    desc: string;
}

export interface CryptoDonation {
    name: string;
    address: string;
    icon: string;
    network?: string;
}

export interface Achievement {
    id: string;
    title: string;
    issuer: string;
    issuerUrl?: string;
    period: string;
    badge: string;
    category: 'award' | 'certification' | 'academic' | 'volunteering';
    description: string;
    highlights?: string[];
    credentialUrl?: string;
    verificationLabel?: string;
    secondaryUrl?: string;
    secondaryLabel?: string;
    image: string;
    gallery?: string[];
}

export interface SiteData {
    name: string;
    role: string;
    email: string;
    phone: string;
    location: string;
    resumeUrl: string;
    socials: SocialLink[];
    support?: SocialLink[];
    crypto?: CryptoDonation[];
    philosophy: Philosophy;
    skills: {
        forte: Skill[];
        exposure: string[];
    };
    experience: Experience[];
    achievements?: Achievement[];
}

export interface Project {
    id: string;
    title: string;
    tagline: string;
    description: string;
    fullDescription: string[];
    thumbnail: string;
    demoGif: string;
    tags: string[];
    links: {
        live: string | null;
        repo: string | null;
    };
}

export interface FormState {
    status: 'idle' | 'loading' | 'success' | 'error';
    message: string;
}

export interface NavigationLink {
    href: string;
    label: string;
    ariaLabel: string;
}
