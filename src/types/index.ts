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
    role: string;
    period: string;
    desc: string;
}

export interface CryptoDonation {
    name: string;
    address: string;
    icon: string;
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
}

export interface Project {
    id: string;
    title: string;
    tagline: string;
    description: string;
    fullDescription: string[];
    images: string[];
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
