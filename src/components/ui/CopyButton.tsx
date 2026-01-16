import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { copyToClipboard } from '../../utils/clipboard';
import { FORM_CONFIG } from '../../config/constants';
import { STYLES, combineClasses } from '../../utils/styling';

interface CopyButtonProps {
    text: string;
    className?: string;
}

export default function CopyButton({ text, className = '' }: CopyButtonProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        const success = await copyToClipboard(text);
        if (success) {
            setCopied(true);
            setTimeout(() => setCopied(false), FORM_CONFIG.copyTimeout);
        }
    };

    return (
        <button
            onClick={handleCopy}
            className={combineClasses(
                STYLES.button.base,
                STYLES.shadow.tiny,
                STYLES.shadow.hover,
                className
            )}
            aria-label={copied ? 'Copied to clipboard' : 'Copy to clipboard'}
            aria-live="polite"
            type="button"
        >
            {copied ? (
                <>
                    <Check size={16} className="text-accent" aria-hidden="true" />
                    <span className="sr-only">Copied to clipboard</span>
                </>
            ) : (
                <>
                    <Copy size={16} aria-hidden="true" />
                    <span className="sr-only">Copy to clipboard</span>
                </>
            )}
        </button>
    );
}
