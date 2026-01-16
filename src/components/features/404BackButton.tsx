import { ArrowLeft } from 'lucide-react';
import { STYLES, combineClasses } from '../../utils/styling';

export default function BackButton() {
    const handleBack = () => {
        if (window.history.length > 1) {
            window.history.back();
        } else {
            window.location.href = '/';
        }
    };

    return (
        <button
            onClick={handleBack}
            type="button"
            className={combineClasses(
                'flex items-center gap-2',
                STYLES.button.secondary,
                STYLES.shadow.medium,
                STYLES.shadow.hoverLarge
            )}
            aria-label="Go back to previous page"
        >
            <ArrowLeft size={18} aria-hidden="true" />
            Go Back
        </button>
    );
}
