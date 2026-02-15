import { ArrowRight } from 'lucide-react';
import { STYLES, combineClasses } from '../../utils/styling';

interface ProjectProps {
    id: string;
    title: string;
    tagline: string;
    thumbnail: string;
    tags: string[];
}

export default function ProjectCard({ id, title, tagline, thumbnail, tags }: ProjectProps) {
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
                    src={thumbnail}
                    alt={title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-fill transition-transform duration-500 group-hover:scale-105"
                />
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
