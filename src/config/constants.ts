export const SITE_CONFIG = {
    url: "https://hamdimohammed.dev",
    themeColor: "#ef4444",
    /** Logo text in the navbar. */
    monogram: "HMY",
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

/**
 * The homepage reads as a numbered set of drawing sheets. This list drives the
 * section numbers, the navbar, the hero's "next sheet" link, and the footer.
 */
export const SHEETS = [
    { id: "about", label: "Index", nav: false },
    { id: "experience", label: "Experience", nav: true },
    { id: "skills", label: "Toolkit", nav: true },
    { id: "projects", label: "Work", nav: true },
    { id: "achievements", label: "Honors", nav: true },
    { id: "contact", label: "Contact", nav: true },
] as const;

export type SheetId = (typeof SHEETS)[number]["id"];

export function sheetNumber(id: SheetId): string {
    return String(SHEETS.findIndex((sheet) => sheet.id === id) + 1).padStart(2, "0");
}

export const SHEET_TOTAL = String(SHEETS.length).padStart(2, "0");

export const NAVIGATION_LINKS = SHEETS.filter((sheet) => sheet.nav).map((sheet) => ({
    id: sheet.id,
    href: `/#${sheet.id}`,
    label: sheet.label,
    number: sheetNumber(sheet.id),
}));

export const EXTERNAL_LINKS = {
    api: {
        web3forms: "https://api.web3forms.com",
    },
    social: {
        github: "https://github.com",
        linkedin: "https://www.linkedin.com",
    },
} as const;
