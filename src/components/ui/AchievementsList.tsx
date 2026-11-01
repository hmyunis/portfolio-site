import { useState } from 'react';
import { Eye, Images } from 'lucide-react';
import type { Achievement } from '../../types';
import { STYLES, combineClasses } from '../../utils/styling';
import LoadedImage from './LoadedImage';
import CertificateModal from './CertificateModal';

interface AchievementsListProps {
    achievements: Achievement[];
}

export default function AchievementsList({ achievements }: AchievementsListProps) {
    const [modalAchievement, setModalAchievement] = useState<Achievement | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = (achievement: Achievement) => {
        setModalAchievement(achievement);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setModalAchievement(null);
    };

    return (
        <div className="space-y-8">
            {/* Achievements Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 auto-rows-fr" role="list">
                {achievements.map((item) => {
                    const hasGallery = item.gallery && item.gallery.length > 0;
                    const galleryCount = hasGallery ? item.gallery!.length : 0;

                    return (
                        <article
                            key={item.id}
                            onClick={() => handleOpenModal(item)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault();
                                    handleOpenModal(item);
                                }
                            }}
                            role="button"
                            tabIndex={0}
                            aria-label={`View certificate for ${item.title}`}
                            className={combineClasses(
                                'group flex flex-col h-full w-full overflow-hidden bg-bg transition-all duration-300 cursor-pointer select-none',
                                STYLES.card.base,
                                STYLES.shadow.medium,
                                STYLES.shadow.hoverLarge
                            )}
                        >
                            {/* Certificate Image Container with LoadedImage & Hover Overlay */}
                            <div className="relative aspect-[16/10] w-full overflow-hidden bg-surface shrink-0">
                                <LoadedImage
                                    src={item.image}
                                    alt={item.title}
                                    loading="lazy"
                                    decoding="async"
                                    className="w-full h-full object-cover sm:object-contain bg-surface/50 p-1 sm:p-2 transition-transform duration-500 group-hover:scale-[1.03]"
                                />

                                {/* Hover overlay indicator */}
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2 text-white font-medium text-xs sm:text-sm">
                                    <Eye size={18} />
                                    <span>Click to Inspect Certificate</span>
                                </div>

                                {/* Gallery counter pill if multiple images */}
                                {hasGallery && (
                                    <div className="absolute bottom-3 right-3 flex items-center gap-1.5 px-2 py-1 bg-bg/90 backdrop-blur-sm text-[11px] font-mono text-text border-[1px] border-border shadow-sm">
                                        <Images size={13} />
                                        <span>+{galleryCount} {galleryCount === 1 ? 'document' : 'photos'}</span>
                                    </div>
                                )}
                            </div>

                            {/* Body Information - Uniform Heights */}
                            <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between gap-3">
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between text-xs font-mono text-muted gap-2">
                                        <span className="font-semibold text-text uppercase tracking-wider truncate">
                                            {item.issuer}
                                        </span>
                                        <time className="shrink-0">{item.period}</time>
                                    </div>

                                    <h3 className="text-lg sm:text-xl font-bold group-hover:text-accent transition-colors leading-snug line-clamp-2 min-h-[3.25rem] sm:min-h-[3.5rem] flex items-start">
                                        {item.title}
                                    </h3>
                                </div>

                                <p className="text-sm text-muted leading-relaxed line-clamp-3 min-h-[4rem] sm:min-h-[4.25rem] flex items-start">
                                    {item.description}
                                </p>
                            </div>
                        </article>
                    );
                })}
            </div>

            {/* Modal for full resolution certificate inspection & credential link */}
            <CertificateModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                achievement={modalAchievement}
            />
        </div>
    );
}
