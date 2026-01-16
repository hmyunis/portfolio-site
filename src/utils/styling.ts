export const STYLES = {
    border: {
        base: 'border-[2px]',
        color: 'border-border',
        accent: 'border-accent',
        accentHover: 'border-accent/50',
    },
    shadow: {
        base: 'shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)]',
        medium: 'shadow-[6px_6px_0px_0px_rgba(0,0,0,0.15)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,0.1)]',
        large: 'shadow-[8px_8px_0px_0px_rgba(0,0,0,0.2)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.15)]',
        hover: 'hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,0.15)] dark:hover:shadow-[6px_6px_0px_0px_rgba(255,255,255,0.15)]',
        hoverLarge: 'hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,0.2)] dark:hover:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.15)]',
        small: 'shadow-[2px_2px_0px_0px_rgba(0,0,0,0.1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.1)]',
        tiny: 'shadow-[3px_3px_0px_0px_rgba(0,0,0,0.1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.1)]',
    },
    button: {
        base: 'p-2 border-[2px] border-border hover:bg-surface transition-all text-text',
        primary: 'px-6 py-3 bg-accent text-white font-bold hover:opacity-90 transition-all',
        secondary: 'px-6 py-3 border-[2px] border-border hover:bg-surface transition-all hover:border-accent/50',
    },
    input: {
        base: 'w-full bg-surface border-[2px] border-border p-4 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 placeholder:text-muted placeholder:opacity-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed',
    },
    card: {
        base: 'border-[2px] border-border bg-bg hover:border-accent transition-all duration-300',
    },
} as const;

export function combineClasses(...classes: (string | undefined | false)[]): string {
    return classes.filter(Boolean).join(' ');
}
