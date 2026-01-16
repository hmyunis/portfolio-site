import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { getInitialTheme, applyTheme, toggleTheme as toggleThemeUtil } from '../../utils/theme';
import type { Theme } from '../../utils/theme';
import { STYLES, combineClasses } from '../../utils/styling';

export default function ThemeToggle() {
    const [theme, setTheme] = useState<Theme>('light');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const initialTheme = getInitialTheme();
        applyTheme(initialTheme);
        setTheme(initialTheme);
    }, []);

    const handleToggle = () => {
        const newTheme = toggleThemeUtil(theme);
        setTheme(newTheme);
    };

    if (!mounted) {
        return (
            <button
                className={combineClasses(
                    STYLES.button.base,
                    'transition-colors',
                    STYLES.shadow.tiny,
                    STYLES.shadow.hover
                )}
                aria-label="Toggle Dark Mode"
                type="button"
                suppressHydrationWarning
            >
                <Moon size={20} aria-hidden="true" />
            </button>
        );
    }

    return (
        <button
            onClick={handleToggle}
            className={combineClasses(
                STYLES.button.base,
                'transition-colors',
                STYLES.shadow.tiny,
                STYLES.shadow.hover
            )}
            aria-label="Toggle Dark Mode"
            type="button"
        >
            {theme === 'light' ? <Moon size={20} aria-hidden="true" /> : <Sun size={20} aria-hidden="true" />}
        </button>
    );
}
