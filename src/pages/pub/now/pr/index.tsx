import React, { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import PaginationComponent from '@/components/pub/Pagenataion';

export interface PrItem {
    id: number;
    imageUrl: string;
    title: string;
    date: string;
    tags: string[];
}

const PrItems: PrItem[] = [
    {
        id: 1,
        imageUrl: '/img/now/pr_01.jpg',
        title: '원조 국민 호빵의 진화…SPC삼립 80주년 기념 호빵 공개',
        date: '2025년 11월 19일',
        tags: ['상미당', '호빵'],
    },
    {
        id: 2,
        imageUrl: '/img/now/pr_02.jpg',
        title: 'SPC삼립, 깨먹는 재미 더한 피카츄의 초코바나나 몬스터볼 케이크 출시',
        date: '2025년 11월 14일',
        tags: ['기술'],
    },
];

export const PrItemCard: React.FC<{
    item: PrItem;
    variant?: 'default' | 'compact';
    onTagClick?: (tag: string) => void;
}> = ({ item, variant = 'default', onTagClick }) => {
    const router = useRouter();

    const mobileHeight = variant === 'compact' ? 'h-[128px]' : 'h-[280px]';
    const desktopHeight = variant === 'compact' ? 'lg:h-auto lg:aspect-square' : 'aspect-square';

    return (
        <div
            onClick={() => router.push(`/pub/now/pr/${item.id}`)}
            className={`
                flex flex-col w-full h-full
                ${variant === 'compact'
                    ? 'lg:flex-col lg:max-w-[380px]'
                    : 'lg:flex-row'
                }
                lg:gap-0 lg:items-stretch
                text-left hover:opacity-90 transition-opacity cursor-pointer
            `}
        >
            {/* 이미지 */}
            <div className={`relative mb-0 w-full lg:max-w-[380px] ${mobileHeight} ${desktopHeight}`}>
                <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover"
                />
            </div>

            {/* 텍스트 */}
            <div className={`flex flex-col justify-between px-6 py-5 w-full bg-white lg:px-6 lg:py-5 lg:p-8 ${variant === 'compact' ? 'lg:h-full' : ''}`}>
                <div className="flex flex-col gap-1 lg:gap-3 mb-8 lg:mb-[32px] flex-1">
                    <h3 className="text-[16px] lg:text-[22px] font-bold text-grilledMeats leading-[1.3] lg:leading-[1.3] tracking-[-0.48px] lg:tracking-[-0.66px]">
                        {item.title}
                    </h3>
                    <p className="text-[12px] lg:text-[14px] font-normal text-grilledMeats leading-[1.6] tracking-[-0.36px] lg:tracking-[-0.42px]">
                        {item.date}
                    </p>
                </div>

                {/* 태그 */}
                <div className="flex flex-wrap gap-1 lg:gap-2">
                    {item.tags.map(tag => (
                        <span
                            key={tag}
                            onClick={(e) => {
                                e.stopPropagation();
                                onTagClick?.(tag);
                            }}
                            className="bg-cream  px-[14px] py-[6px] lg:px-[14px] lg:py-[6px] text-[10px] lg:text-[12px] font-bold text-grilledMeats tracking-[-0.3px] lg:tracking-[-0.36px] cursor-pointer"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

const sortOptions = ['최신순', '오래된순'];

const parseDate = (value: string) => {
    const match = value.match(/(\d{4})년 (\d{2})월 (\d{2})일/);
    if (!match) return 0;
    return new Date(+match[1], +match[2] - 1, +match[3]).getTime();
};

const Pr = () => {
    const router = useRouter();
    const { query, isReady } = router;

    const [selectedSort, setSelectedSort] = useState('최신순');
    const [selectedTag, setSelectedTag] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        if (!isReady) return;
        setSelectedTag(typeof query.tag === 'string' ? query.tag : null);
    }, [isReady, query.tag]);

    /* 필터 + 정렬 */
    const filteredItems = useMemo(() => {
        let list = [...PrItems];

        if (selectedTag) {
            list = list.filter(item => item.tags.includes(selectedTag));
        }

        list.sort((a, b) => {
            const diff = parseDate(a.date) - parseDate(b.date);
            return selectedSort === '최신순' ? -diff : diff;
        });

        return list;
    }, [selectedTag, selectedSort]);

    /* 페이지네이션 */
    const itemsPerPage = 6;
    const totalCount = filteredItems.length;
    const totalPages = Math.max(1, Math.ceil(totalCount / itemsPerPage));

    const paginatedItems = filteredItems.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    /* 태그 클릭 */
    const handleTagClick = (tag: string) => {
        setSelectedTag(tag);
        setCurrentPage(1);

        router.replace(
            {
                pathname: router.pathname,
                query: { tag },
            },
            undefined,
            { shallow: true }
        );
    };

    return (
        <main className='overflow-hidden relative w-full bg-[#F8F7F3] pt-[44px] lg:pt-[90px]'>
            <section className="flex flex-col gap-[40px] lg:gap-[100px] pt-[24px] lg:pt-[160px] relative z-10">
                <div className='max-w-[1200px] w-full mx-auto px-5'>
                    <div className="flex flex-col gap-10 lg:gap-[100px] relative">

                        {/* 제목 */}
                        <div>
                            <h2 className="text-[18px] lg:text-[42px] font-extrabold text-grilledMeats text-center lg:text-center tracking-[-0.54px] lg:tracking-[-1.26px]">
                                보도자료
                            </h2>

                            {/* 선택 태그 */}
                            {selectedTag && (
                                <div className="flex gap-2 justify-center items-center mt-1 lg:mt-3">
                                    <span className="bg-grilledMeats px-3 py-1 lg:px-4 lg:py-[7px] text-[12px] lg:text-[15px] font-bold text-[#fbfae7] leading-[1.6] tracking-[-0.36px] lg:tracking-[-0.45px]">
                                        {selectedTag}
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* 정렬 + 개수 */}
                        <div className="flex justify-between items-center mb-[24px] lg:mb-[60px] flex-row lg:flex-row-reverse">
                            <div className="flex gap-2 lg:gap-[8px] items-center text-[12px] lg:text-[15px] font-normal leading-[1.6] tracking-[-0.36px] ">
                                {sortOptions.map((option, i) => (
                                    <React.Fragment key={option}>
                                        <button
                                            onClick={() => {
                                                setSelectedSort(option);
                                                setCurrentPage(1);
                                            }}
                                            className={selectedSort === option ? 'text-grilledMeats' : 'text-[#aaa8a2]'}
                                        >
                                            {option}
                                        </button>
                                        {i < sortOptions.length - 1 && <span className="text-[#aaa8a2]">|</span>}
                                    </React.Fragment>
                                ))}
                            </div>
                            <div className="text-[12px] lg:text-[18px] font-bold text-grilledMeats leading-[1.6] tracking-[-0.36px]">
                                전체 <span className="font-bold">{totalCount}</span>개
                            </div>
                        </div>
                    </div>

                    {/* 리스트 */}
                    <div className="flex flex-col gap-8 lg:gap-[40px]">
                        {paginatedItems.length === 0 ? (
                            <div className="py-10 text-sm text-center text-gray-600 lg:text-base">
                                등록된 보도자료가 없습니다.
                            </div>
                        ) : (
                            paginatedItems.map(item => (
                                <PrItemCard
                                    key={item.id}
                                    item={item}
                                    onTagClick={handleTagClick}
                                />
                            ))
                        )}
                    </div>
                </div>

                {/* 페이지네이션 */}
                <div className='mb-[80px] lg:mb-[180px]'>
                    <PaginationComponent
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                    />
                </div>
            </section>
        </main>
    );
};

export default Pr;
