import { useEffect, useState, useCallback } from 'react';
import { X, ExternalLink, ChevronLeft, ChevronRight, ShieldCheck, Eye } from 'lucide-react';
import type { Achievement } from '../../types';
import { STYLES, combineClasses } from '../../utils/styling';

interface CertificateModalProps {
    isOpen: boolean;
    onClose: () => void;
    achievement: Achievement | null;
    initialImageIndex?: number;
}

export default function CertificateModal({
    isOpen,
    onClose,
    achievement,
    initialImageIndex = 0,
}: CertificateModalProps) {
    const [currentIndex, setCurrentIndex] = useState(initialImageIndex);

    useEffect(() => {
        setCurrentIndex(initialImageIndex);
    }, [initialImageIndex, achievement]);

    const handleKeyDown = useCallback(
        (e: KeyboardEvent) => {
            if (!isOpen || !achievement) return;
            if (e.key === 'Escape') {
                onClose();
            } else if (e.key === 'ArrowLeft') {
                const images = [achievement.image, ...(achievement.gallery || [])];
                setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
            } else if (e.key === 'ArrowRight') {
                const images = [achievement.image, ...(achievement.gallery || [])];
                setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
            }
        },
        [isOpen, achievement, onClose]
    );

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            window.addEventListener('keydown', handleKeyDown);
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, handleKeyDown]);

    if (!isOpen || !achievement) return null;

    const allImages = [achievement.image, ...(achievement.gallery || [])];
    const currentImage = allImages[currentIndex] || achievement.image;

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev > 0 ? prev - 1 : allImages.length - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev < allImages.length - 1 ? prev + 1 : 0));
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-bg/85 backdrop-blur-md animate-in fade-in duration-200"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-achievement-title"
        >
            <div
                className="fixed inset-0"
                onClick={onClose}
                aria-hidden="true"
            />

            <div
                className={combineClasses(
                    'relative z-10 w-full max-w-3xl flex flex-col bg-bg overflow-hidden',
                    STYLES.border.base,
                    STYLES.border.color,
                    STYLES.shadow.large
                )}
            >
                {/* Header - Compact & Mobile Optimized */}
                <div className="flex items-center justify-between px-4 py-3 sm:px-5 sm:py-3.5 border-b-[2px] border-border bg-surface/50 shrink-0">
                    <div className="min-w-0 pr-3">
                        <h3
                            id="modal-achievement-title"
                            className="text-sm sm:text-base md:text-lg font-bold truncate leading-snug"
                        >
                            {achievement.title}
                        </h3>
                        <p className="text-[11px] sm:text-xs text-muted font-mono truncate mt-0.5">
                            {achievement.issuer} &bull; {achievement.period}
                        </p>
                    </div>

                    <button
                        onClick={onClose}
                        className={combineClasses(
                            'p-1.5 sm:p-2 text-muted hover:text-text hover:bg-surface transition-colors shrink-0 cursor-pointer',
                            STYLES.border.base,
                            STYLES.border.color,
                            STYLES.shadow.tiny
                        )}
                        aria-label="Close modal"
                    >
                        <X size={18} />
                    </button>
                </div>

                {/* Main Content (Image Viewer) - Sized with comfortable margins, no scrollbar */}
                <div className="relative min-h-0 flex-1 bg-surface/30 flex items-center justify-center p-3 sm:p-5 overflow-hidden">
                    <img
                        src={currentImage}
                        alt={`${achievement.title} preview`}
                        loading="eager"
                        decoding="async"
                        style={{
                            maxHeight: 'min(48vh, 420px)',
                            maxWidth: '100%',
                            objectFit: 'contain',
                        }}
                        className="w-auto h-auto border-[1px] border-border shadow-sm rounded-xs select-none"
                    />

                    {allImages.length > 1 && (
                        <>
                            <button
                                onClick={handlePrev}
                                className={combineClasses(
                                    'absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 z-10 p-1.5 sm:p-2 bg-bg/90 hover:bg-bg text-text transition-all',
                                    STYLES.border.base,
                                    STYLES.border.color,
                                    STYLES.shadow.small
                                )}
                                aria-label="Previous image"
                            >
                                <ChevronLeft size={18} />
                            </button>
                            <button
                                onClick={handleNext}
                                className={combineClasses(
                                    'absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 z-10 p-1.5 sm:p-2 bg-bg/90 hover:bg-bg text-text transition-all',
                                    STYLES.border.base,
                                    STYLES.border.color,
                                    STYLES.shadow.small
                                )}
                                aria-label="Next image"
                            >
                                <ChevronRight size={18} />
                            </button>
                        </>
                    )}
                </div>

                {/* Gallery Thumbnails if multiple images - Compact */}
                {allImages.length > 1 && (
                    <div className="flex gap-2 px-3 py-2 sm:px-4 sm:py-2.5 bg-surface/60 border-t-[2px] border-border overflow-x-auto shrink-0">
                        {allImages.map((img, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrentIndex(idx)}
                                className={combineClasses(
                                    'relative h-10 w-14 sm:h-12 sm:w-16 shrink-0 overflow-hidden border-[2px] transition-all cursor-pointer',
                                    currentIndex === idx
                                        ? 'border-accent ring-2 ring-accent/30 scale-105'
                                        : 'border-border opacity-70 hover:opacity-100'
                                )}
                                aria-label={`View image ${idx + 1}`}
                            >
                                <img
                                    src={img}
                                    alt={`Thumbnail ${idx + 1}`}
                                    className="w-full h-full object-cover"
                                />
                            </button>
                        ))}
                    </div>
                )}

                {/* Footer with Credential Links - Lean & Mobile Responsive */}
                <div className="px-3 py-2.5 sm:px-5 sm:py-3 border-t-[2px] border-border bg-surface/50 flex flex-wrap items-center justify-end gap-2 shrink-0">
                    {achievement.credentialUrl && (
                        <a
                            href={achievement.credentialUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={combineClasses(
                                'flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 bg-text text-bg text-xs sm:text-sm font-semibold hover:opacity-90 transition-all',
                                STYLES.border.base,
                                STYLES.border.color,
                                STYLES.shadow.small
                            )}
                        >
                            <ShieldCheck size={15} className="text-accent" />
                            <span>{achievement.verificationLabel || 'Verify Credential'}</span>
                            <ExternalLink size={13} />
                        </a>
                    )}

                    {achievement.secondaryUrl && (
                        <a
                            href={achievement.secondaryUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={combineClasses(
                                'flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3.5 sm:py-2 bg-surface hover:bg-bg text-text text-xs sm:text-sm font-semibold transition-all',
                                STYLES.border.base,
                                STYLES.border.color,
                                STYLES.shadow.small
                            )}
                        >
                            <Eye size={13} />
                            <span>{achievement.secondaryLabel || 'View Document'}</span>
                            <ExternalLink size={12} />
                        </a>
                    )}

                    <button
                        onClick={onClose}
                        className={combineClasses(
                            'px-3 py-1.5 sm:px-4 sm:py-2 bg-surface hover:bg-bg text-text text-xs sm:text-sm font-semibold transition-all cursor-pointer',
                            STYLES.border.base,
                            STYLES.border.color,
                            STYLES.shadow.small
                        )}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}
