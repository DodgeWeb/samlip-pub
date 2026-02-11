import React from 'react';
import {Icon} from '@/components/pub/icons';

interface PaginationProps {
    currentPage: number;
    totalPages?: number;
    onPageChange: (page: number) => void;
    onPrev?: () => void;
    onNext?: () => void;
}

const MAX_VISIBLE = 5;

const Pagination: React.FC<PaginationProps> = ({
    currentPage,
    totalPages = 0,
    onPageChange,
    onPrev,
    onNext,
}) => {
    const hasPages = totalPages > 0;

    const currentSet = hasPages ? Math.ceil(currentPage / MAX_VISIBLE) : 1;
    const totalSets = hasPages ? Math.ceil(totalPages / MAX_VISIBLE) : 1;

    const isFirstSet = !hasPages || currentSet === 1;
    const isLastSet = !hasPages || currentSet === totalSets;

    const getVisiblePages = (): number[] => {
        if (!hasPages) return [];

        if (totalPages <= MAX_VISIBLE) {
            return Array.from({length: totalPages}, (_, i) => i + 1);
        }

        const start = (currentSet - 1) * MAX_VISIBLE + 1;
        const end = Math.min(start + MAX_VISIBLE - 1, totalPages);

        return Array.from({length: end - start + 1}, (_, i) => start + i);
    };

    const visiblePages = getVisiblePages();

    const handlePrev = () => {
        if (!hasPages) return;

        if (onPrev) {
            onPrev();
            return;
        }

        if (!isFirstSet) {
            const prevSetStart = (currentSet - 2) * MAX_VISIBLE + 1;
            onPageChange(prevSetStart);
        }
    };

    const handleNext = () => {
        if (!hasPages) return;

        if (onNext) {
            onNext();
            return;
        }

        if (!isLastSet) {
            const nextSetStart = currentSet * MAX_VISIBLE + 1;
            onPageChange(nextSetStart);
        }
    };

    return (
        <div className="flex gap-4 lg:gap-[40px] items-center justify-center">
            {/* 이전 */}
            <button
                type="button"
                onClick={handlePrev}
                disabled={isFirstSet}
                className="size-[32px] lg:size-[60px] flex items-center justify-center
                   bg-grilledMeats rounded-full
                   disabled:opacity-10
                   hover:bg-samlipRed disabled:hover:bg-grilledMeats"
            >
                <Icon
                    name="arrowTop"
                    size={12}
                    color="white"
                    className="-rotate-90 lg:size-[28px]"
                />
            </button>

            {/* 페이지 숫자 */}
            {hasPages &&
                visiblePages.map((page) => (
                    <button
                        key={page}
                        type="button"
                        onClick={() => onPageChange(page)}
                        className={`text-[24px] lg:text-[64px] font-black leading-[1.1] gt-ultra
              hover:text-samlipRed hover:opacity-100 ${
                            currentPage === page
                                ? 'text-grilledMeats opacity-100'
                                : 'text-grilledMeats opacity-10'
                        }`}
                    >
                        {page}
                    </button>
                ))}

            {/* 다음 */}
            <button
                type="button"
                onClick={handleNext}
                disabled={isLastSet}
                className="size-[32px] lg:size-[60px] flex items-center justify-center
                   bg-grilledMeats rounded-full
                   disabled:opacity-10
                   hover:bg-samlipRed disabled:hover:bg-grilledMeats"
            >
                <Icon
                    name="arrowTop"
                    size={12}
                    color="white"
                    className="rotate-90 lg:size-[28px]"
                />
            </button>
        </div>
    );
};

export default Pagination;
