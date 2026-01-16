export type Theme = 'light' | 'dark';

export function getInitialTheme(): Theme {
    if (typeof window === 'undefined') return 'light';
    
    if (
        localStorage.theme === 'dark' ||
        (!('theme' in localStorage) &&
            window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
        return 'dark';
    }
    return 'light';
}

export function applyTheme(theme: Theme): void {
    if (typeof document === 'undefined') return;
    
    if (theme === 'dark') {
        document.documentElement.classList.add('dark');
        localStorage.theme = 'dark';
    } else {
        document.documentElement.classList.remove('dark');
        localStorage.theme = 'light';
    }
}

export function toggleTheme(currentTheme: Theme): Theme {
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    applyTheme(newTheme);
    return newTheme;
}
