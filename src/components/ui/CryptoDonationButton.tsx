import { useState } from "react";
import { Check } from "lucide-react";
import { copyToClipboard } from "../../utils/clipboard";
import { FORM_CONFIG } from "../../config/constants";
import { STYLES, combineClasses } from "../../utils/styling";

interface CryptoDonationButtonProps {
    address: string;
    name: string;
    icon: string;
    network?: string;
    className?: string;
}

export default function CryptoDonationButton({
    address,
    name,
    icon,
    network,
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

    const label = network ? `${name} (${network})` : name;

    return (
        <div className="relative group">
            <button
                onClick={handleCopy}
                title={label}
                className={combineClasses(
                    "p-3 bg-surface border-[2px] border-border hover:border-accent/50 hover:bg-surface/80 transition-all",
                    STYLES.shadow.base,
                    STYLES.shadow.hover,
                    className
                )}
                aria-label={`Copy ${label} address to clipboard`}
                aria-live="polite"
                type="button"
            >
                <div
                    className="text-accent"
                    dangerouslySetInnerHTML={{ __html: icon }}
                    aria-hidden="true"
                />
            </button>
            {!copied && (
                <span
                    role="tooltip"
                    className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 -translate-x-1/2 whitespace-nowrap bg-text text-bg text-xs px-2.5 py-1 font-medium border-2 border-border opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.15)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)]"
                >
                    {label}
                </span>
            )}
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
