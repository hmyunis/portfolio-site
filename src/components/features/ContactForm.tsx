import { useState, useRef, type FormEvent } from "react";
import { Send, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { FORM_CONFIG } from "../../config/constants";
import { submitContactForm, createSuccessState, createErrorState, createLoadingState, createIdleState } from "../../utils/form";
import type { FormState } from "../../types";
import { STYLES, combineClasses } from "../../utils/styling";

export default function ContactForm() {
    const formRef = useRef<HTMLFormElement>(null);
    const [formState, setFormState] = useState<FormState>({
        status: "idle",
        message: "",
    });

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFormState(createLoadingState());

        if (!formRef.current) return;
        const formData = new FormData(formRef.current);

        const result = await submitContactForm(formData);

        if (result.success) {
            setFormState(createSuccessState());
            if (formRef.current) {
                formRef.current.reset();
            }
            setTimeout(() => {
                setFormState(createIdleState());
            }, FORM_CONFIG.successTimeout);
        } else {
            setFormState(createErrorState(result.message));
        }
    };

    return (
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-4" aria-label="Contact form">
            <input type="hidden" name="access_key" value={FORM_CONFIG.accessKey} />
            <input type="hidden" name="subject" value={FORM_CONFIG.subject} />

            <div>
                <label htmlFor="name" className="sr-only">
                    Your Name
                </label>
                <input
                    id="name"
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    required
                    disabled={formState.status === "loading"}
                    className={combineClasses(STYLES.input.base, STYLES.shadow.base)}
                    aria-required="true"
                />
            </div>

            <div>
                <label htmlFor="email" className="sr-only">
                    Your Email
                </label>
                <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    required
                    disabled={formState.status === "loading"}
                    className={combineClasses(STYLES.input.base, STYLES.shadow.base)}
                    aria-required="true"
                />
            </div>

            <div>
                <label htmlFor="message" className="sr-only">
                    Message
                </label>
                <textarea
                    id="message"
                    name="message"
                    rows={6}
                    placeholder="Tell me about your project..."
                    required
                    disabled={formState.status === "loading"}
                    className={combineClasses(STYLES.input.base, STYLES.shadow.base, 'resize-none')}
                    aria-required="true"
                />
            </div>

            {formState.message && (
                <div
                    role="alert"
                    className={`form-alert flex items-center gap-2 p-4 border-[2px] ${
                        formState.status === "success"
                            ? "border-green-600 text-green-900 dark:bg-green-950/40 dark:text-green-300 dark:border-green-500"
                            : "border-red-600 text-red-900 dark:bg-red-950/40 dark:text-red-300 dark:border-red-500"
                    }`}
                >
                    {formState.status === "success" ? (
                        <CheckCircle size={20} className="flex-shrink-0" aria-hidden="true" />
                    ) : (
                        <AlertCircle size={20} className="flex-shrink-0" aria-hidden="true" />
                    )}
                    <span className="text-sm font-medium">{formState.message}</span>
                </div>
            )}

            <div
                className={`relative inline-block w-full ${
                    formState.status === "loading" ? "animate-shimmer-button" : ""
                }`}
            >
                <button
                    type="submit"
                    disabled={formState.status === "loading"}
                    className={combineClasses(
                        'w-full flex items-center justify-center gap-2',
                        STYLES.button.primary,
                        STYLES.border.base,
                        STYLES.border.color,
                        STYLES.shadow.medium,
                        STYLES.shadow.hoverLarge,
                        'disabled:opacity-50 disabled:cursor-not-allowed relative z-10'
                    )}
                    aria-busy={formState.status === "loading"}
                >
                    {formState.status === "loading" ? (
                        <>
                            <Loader2 size={18} className="animate-spin" aria-hidden="true" />
                            Sending...
                        </>
                    ) : (
                        <>
                            <Send size={18} aria-hidden="true" />
                            Send Message
                        </>
                    )}
                </button>
            </div>
        </form>
    );
}
