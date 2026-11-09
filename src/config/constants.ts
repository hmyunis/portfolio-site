export const SITE_CONFIG = {
    url: "https://hamdi.dev.et",
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

/**
 * Web3Forms' shared hCaptcha site key. On the free plan, Web3Forms only
 * verifies tokens issued for this key, so a personal hCaptcha key won't work.
 */
const WEB3FORMS_HCAPTCHA_SITE_KEY = "50b2fe65-b00b-4b9e-ad62-3ba471098be2";

export const FORM_CONFIG = {
    apiEndpoint: "https://api.web3forms.com/submit",
    clientScript: "https://web3forms.com/client/script.js",
    accessKey: getAccessKey(),
    hcaptchaSiteKey: WEB3FORMS_HCAPTCHA_SITE_KEY,
    subject: "New Contact Form Submission",
    successMessage: "Message sent successfully! I'll get back to you soon.",
    errorMessage: "Something went wrong. Please try again.",
    captchaMessage: "Please complete the captcha before sending.",
    captchaUnavailableMessage: "The captcha didn't load. Please refresh the page or email me directly.",
    tooFastMessage: "That was quick! Please take a moment and try again.",
    /** Submissions faster than this after page load are treated as bots. */
    minFillTimeMs: 3000,
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
