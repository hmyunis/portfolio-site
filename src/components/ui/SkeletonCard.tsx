import { STYLES, combineClasses } from '../../utils/styling';

export default function SkeletonCard() {
    return (
        <div className={combineClasses('group block animate-pulse', STYLES.card.base)}>
            <div className="relative aspect-video overflow-hidden bg-surface/50" />
            <div className="p-6 space-y-4">
                <div className="flex justify-between items-start">
                    <div className="space-y-2 flex-1">
                        <div className="h-6 bg-surface/50 rounded w-3/4" />
                        <div className="h-4 bg-surface/50 rounded w-1/2" />
                    </div>
                    <div className="h-5 w-5 bg-surface/50 rounded" />
                </div>
                <div className="flex gap-2">
                    <div className="h-6 bg-surface/50 rounded w-16" />
                    <div className="h-6 bg-surface/50 rounded w-20" />
                    <div className="h-6 bg-surface/50 rounded w-14" />
                </div>
            </div>
        </div>
    );
}
