import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Project } from '../../types';
import ProjectCard from './ProjectCard';
import { STYLES, combineClasses } from '../../utils/styling';

interface PaginatedProjectsProps {
    projects: Project[];
    itemsPerPage?: number;
}

export default function PaginatedProjects({
    projects,
    itemsPerPage = 6,
}: PaginatedProjectsProps) {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const totalPages = Math.max(1, Math.ceil(projects.length / itemsPerPage));

    useEffect(() => {
        const syncPageFromUrl = () => {
            try {
                const params = new URLSearchParams(window.location.search);
                const pageParam = parseInt(params.get('page') || '1', 10);
                if (!isNaN(pageParam) && pageParam >= 1 && pageParam <= totalPages) {
                    setCurrentPage(pageParam);
                } else {
                    setCurrentPage(1);
                }
            } catch {
                // Ignore fallback
            }
        };

        syncPageFromUrl();
        window.addEventListener('popstate', syncPageFromUrl);
        return () => window.removeEventListener('popstate', syncPageFromUrl);
    }, [totalPages]);

    const handlePageChange = (newPage: number) => {
        if (newPage === currentPage || newPage < 1 || newPage > totalPages) return;
        setCurrentPage(newPage);

        if (typeof window !== 'undefined') {
            try {
                const url = new URL(window.location.href);
                if (newPage === 1) {
                    url.searchParams.delete('page');
                } else {
                    url.searchParams.set('page', newPage.toString());
                }
                window.history.pushState({ page: newPage }, '', url.toString());
            } catch {
                // Ignore history update if restricted
            }

            const section = document.getElementById('projects');
            if (section) {
                const rect = section.getBoundingClientRect();
                // Smoothly scroll to the section top if user has scrolled past it
                if (rect.top < 60) {
                    const headerOffset = 80;
                    const elementPosition = rect.top + window.scrollY;
                    const offsetPosition = elementPosition - headerOffset;
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth',
                    });
                }
            }
        }
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, projects.length);
    const visibleProjects = projects.slice(startIndex, endIndex);
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <div className="space-y-12">
            <div className="grid md:grid-cols-2 gap-8" role="list">
                {visibleProjects.map((project) => (
                    <ProjectCard
                        key={project.id}
                        id={project.id}
                        title={project.title}
                        tagline={project.tagline}
                        thumbnail={project.thumbnail}
                        tags={project.tags}
                    />
                ))}
            </div>

            {totalPages > 1 && (
                <nav
                    aria-label="Works pagination"
                    className="flex items-center justify-center pt-8 border-t-[2px] border-border"
                >
                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            aria-label="Previous page"
                            className={combineClasses(
                                'flex items-center gap-1 px-3 py-2 text-sm font-bold border-[2px] border-border bg-surface text-text transition-all',
                                currentPage === 1
                                    ? 'opacity-30 cursor-not-allowed'
                                    : 'hover:border-accent hover:text-accent hover:bg-surface/80 active:translate-x-0.5 active:translate-y-0.5',
                                STYLES.shadow.small
                            )}
                        >
                            <ChevronLeft size={16} aria-hidden="true" />
                            <span className="hidden sm:inline">Prev</span>
                        </button>

                        <div className="flex items-center gap-1.5" role="group" aria-label="Page selection">
                            {pageNumbers.map((pageNum) => {
                                const isActive = currentPage === pageNum;
                                return (
                                    <button
                                        key={pageNum}
                                        type="button"
                                        onClick={() => handlePageChange(pageNum)}
                                        aria-current={isActive ? 'page' : undefined}
                                        aria-label={`Page ${pageNum}`}
                                        className={combineClasses(
                                            'min-w-10 h-10 px-3 text-sm font-mono font-bold border-[2px] border-border transition-all flex items-center justify-center',
                                            isActive
                                                ? 'bg-accent text-white shadow-[3px_3px_0px_0px_rgba(0,0,0,0.15)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.1)] -translate-y-0.5'
                                                : 'bg-surface text-text hover:border-accent hover:text-accent hover:bg-surface/80',
                                            STYLES.shadow.small
                                        )}
                                    >
                                        {pageNum}
                                    </button>
                                );
                            })}
                        </div>

                        <button
                            type="button"
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            aria-label="Next page"
                            className={combineClasses(
                                'flex items-center gap-1 px-3 py-2 text-sm font-bold border-[2px] border-border bg-surface text-text transition-all',
                                currentPage === totalPages
                                    ? 'opacity-30 cursor-not-allowed'
                                    : 'hover:border-accent hover:text-accent hover:bg-surface/80 active:translate-x-0.5 active:translate-y-0.5',
                                STYLES.shadow.small
                            )}
                        >
                            <span className="hidden sm:inline">Next</span>
                            <ChevronRight size={16} aria-hidden="true" />
                        </button>
                    </div>
                </nav>
            )}
        </div>
    );
}
