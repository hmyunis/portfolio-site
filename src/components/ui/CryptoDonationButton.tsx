import { useState } from "react";
import { Check } from "lucide-react";
import { copyToClipboard } from "../../utils/clipboard";
import { FORM_CONFIG } from "../../config/constants";
import { STYLES, combineClasses } from "../../utils/styling";

interface CryptoDonationButtonProps {
    address: string;
    name: string;
    icon: string;
    className?: string;
}

export default function CryptoDonationButton({
    address,
    name,
    icon,
    className = "",
}: CryptoDonationButtonProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        const success = await copyToClipboard(address);
        if (success) {
            setCopied(true);
            setTimeout(() => setCopied(false), FORM_CONFIG.copyTimeout);
        }
    };

    return (
        <div className="relative">
            <button
                onClick={handleCopy}
                title={name}
                className={combineClasses(
                    "p-3 bg-surface border-[2px] border-border hover:border-accent/50 hover:bg-surface/80 transition-all",
                    STYLES.shadow.base,
                    STYLES.shadow.hover,
                    className
                )}
                aria-label={`Copy ${name} address to clipboard`}
                aria-live="polite"
                type="button"
            >
                <div
                    className="text-accent"
                    dangerouslySetInnerHTML={{ __html: icon }}
                    aria-hidden="true"
                />
            </button>
            {copied && (
                <div
                    className="absolute -top-12 left-1/2 transform -translate-x-1/2 px-3 py-1.5 bg-text text-bg text-xs font-medium border-[2px] border-border shadow-[4px_4px_0px_0px_rgba(0,0,0,0.15)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)] z-10 whitespace-nowrap animate-in fade-in slide-in-from-top-2 duration-200"
                    role="alert"
                >
                    <div className="flex items-center gap-1.5">
                        <Check size={12} aria-hidden="true" />
                        Copied!
                    </div>
                </div>
            )}
        </div>
    );
}
