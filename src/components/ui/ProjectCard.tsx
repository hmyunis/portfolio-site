import { useState } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { STYLES, combineClasses } from '../../utils/styling';

interface ProjectProps {
    id: string;
    title: string;
    tagline: string;
    images: string[];
    tags: string[];
}

export default function ProjectCard({ id, title, tagline, images, tags }: ProjectProps) {
    const [currentImg, setCurrentImg] = useState(0);

    const nextImg = (e: React.MouseEvent) => {
        e.preventDefault();
        setCurrentImg((prev) => (prev + 1) % images.length);
    };

    const prevImg = (e: React.MouseEvent) => {
        e.preventDefault();
        setCurrentImg((prev) => (prev - 1 + images.length) % images.length);
    };

    return (
        <a
            href={`/projects/${id}`}
            className={combineClasses(
                'group block',
                STYLES.card.base,
                STYLES.shadow.medium,
                STYLES.shadow.hoverLarge
            )}
            aria-label={`View project: ${title}`}
        >
            <div className="relative aspect-video overflow-hidden bg-surface">
                <img
                    src={images[currentImg]}
                    alt={title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {images.length > 1 && (
                    <div className="absolute inset-0 flex items-center justify-between p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                            onClick={prevImg}
                            className="p-2 bg-black/80 text-white border-[2px] border-white hover:bg-accent/80 shadow-[3px_3px_0px_0px_rgba(255,255,255,0.3)]"
                            type="button"
                            aria-label="Previous image"
                        >
                            <ChevronLeft size={20} aria-hidden="true" />
                        </button>
                        <button
                            onClick={nextImg}
                            className="p-2 bg-black/80 text-white border-[2px] border-white hover:bg-accent/80 shadow-[3px_3px_0px_0px_rgba(255,255,255,0.3)]"
                            type="button"
                            aria-label="Next image"
                        >
                            <ChevronRight size={20} aria-hidden="true" />
                        </button>
                    </div>
                )}
            </div>

            <div className="p-6">
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="text-xl font-bold group-hover:text-accent transition-colors">
                            {title}
                        </h3>
                        <p className="text-sm text-muted mt-1">{tagline}</p>
                    </div>
                    <ArrowRight
                        className="text-muted group-hover:text-accent group-hover:translate-x-1 transition-all"
                        size={20}
                        aria-hidden="true"
                    />
                </div>

                <div className="flex flex-wrap gap-2 mt-4">
                    {tags.slice(0, 3).map((tag) => (
                        <span
                            key={tag}
                            className={combineClasses(
                                'text-xs font-mono py-1 px-2 bg-surface text-muted',
                                STYLES.border.base,
                                STYLES.border.color,
                                STYLES.shadow.small
                            )}
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </a>
    );
}
