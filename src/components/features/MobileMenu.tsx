import { useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { NAVIGATION_LINKS } from '../../config/constants';
import { STYLES, combineClasses } from '../../utils/styling';

interface MobileMenuProps {
    isOpen: boolean;
    onToggle: () => void;
}

export default function MobileMenu({ isOpen, onToggle }: MobileMenuProps) {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    return (
        <>
            <button
                onClick={onToggle}
                className={combineClasses(
                    'md:hidden',
                    STYLES.button.base,
                    'transition-colors',
                    STYLES.shadow.tiny
                )}
                aria-label={isOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isOpen}
                aria-controls="mobile-menu"
            >
                {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            {isOpen && (
                <>
                    <div
                        className="fixed inset-0 bg-bg/80 backdrop-blur-sm z-40 md:hidden"
                        onClick={onToggle}
                        aria-hidden="true"
                    />
                    <nav
                        id="mobile-menu"
                        className={combineClasses(
                            'fixed top-16 left-0 right-0 bg-bg',
                            STYLES.border.base,
                            STYLES.border.color,
                            'border-b-[2px] shadow-[0_4px_0px_0px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_0px_0px_rgba(255,255,255,0.1)] z-50 md:hidden'
                        )}
                        aria-label="Mobile navigation"
                    >
                        <div className="max-w-4xl mx-auto px-6 py-4 space-y-2">
                            {NAVIGATION_LINKS.map((link) => (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    onClick={onToggle}
                                    className="block px-4 py-3 text-muted hover:text-text hover:bg-surface transition-colors font-medium border-[2px] border-transparent hover:border-border"
                                >
                                    {link.label}
                                </a>
                            ))}
                        </div>
                    </nav>
                </>
            )}
        </>
    );
}
