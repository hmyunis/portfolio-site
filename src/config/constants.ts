export const SITE_CONFIG = {
    url: "https://hamdimohammed.dev",
    themeColor: "#ef4444",
    defaultDescription:
        "Hamdi M. Yunis - Cross-Platform Software Engineer. Building scalable, type-safe solutions.",
} as const;

const getAccessKey = (): string => {
    const key = import.meta.env.PUBLIC_WEB3FORMS_ACCESS_KEY;
    if (!key) {
        throw new Error(
            "PUBLIC_WEB3FORMS_ACCESS_KEY is not set. Please create a .env file with your Web3Forms access key. See .env.example for reference."
        );
    }
    return key;
};

export const FORM_CONFIG = {
    apiEndpoint: "https://api.web3forms.com/submit",
    accessKey: getAccessKey(),
    subject: "New Contact Form Submission",
    successMessage: "Message sent successfully! I'll get back to you soon.",
    errorMessage: "Something went wrong. Please try again.",
    successTimeout: 5000,
    copyTimeout: 2000,
} as const;

export const NAVIGATION_LINKS = [
    { href: "/#about", label: "About", ariaLabel: "About section" },
    { href: "/#projects", label: "Work", ariaLabel: "Projects section" },
    { href: "/#achievements", label: "Achievements", ariaLabel: "Achievements section" },
    { href: "/#contact", label: "Contact", ariaLabel: "Contact section" },
] as const;

export const EXTERNAL_LINKS = {
    fonts: {
        google: "https://fonts.googleapis.com",
        googleStatic: "https://fonts.gstatic.com",
        inter: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap",
    },
    api: {
        web3forms: "https://api.web3forms.com",
    },
    social: {
        github: "https://github.com",
        linkedin: "https://www.linkedin.com",
    },
} as const;
