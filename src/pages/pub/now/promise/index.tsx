import React, {useState, useEffect} from 'react';
import {useRouter} from 'next/router';
import PaginationComponent from '@/components/pub/Pagenataion';

// Promise 페이지 전용 아이템 인터페이스
export interface PromiseItem {
    id: number;
    imageUrl: string;
    title: string;
    date: string;
}

// Promise 전용 카드 컴포넌트 (PC: 이미지 왼쪽, 텍스트 오른쪽 세로 배치)
export const PromiseItemCard: React.FC<{ item: PromiseItem }> = ({item}) => {
    const router = useRouter();

    return (
        <div
            onClick={() => router.push(`/pub/now/promise/detail?id=${item.id}`)}
            className="
        flex flex-col gap-0 w-full lg:grid grid-cols-[380px_1fr] lg:gap-0 lg:items-stretch
        cursor-pointer hover:opacity-90 transition-opacity
    "
        >
            {/* 이미지 */}
            <div className="relative w-full aspect-[380/240] lg:aspect-auto lg:w-[380px] lg:h-[240px] bg-white">
                {item.imageUrl ? (
                    <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="object-cover absolute inset-0 w-full h-full"
                    />
                ) : (
                    /* 이미지가 없는 경우 (로고만 표시) */
                    <div className="flex absolute inset-0 justify-center items-center w-full h-full bg-white">
                        <div className="w-[120px] h-[120px] lg:w-[180px] lg:h-[180px]">
                            <img src="/img/logo.png" alt="samlip logo"
                                 className="size-[82px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"/>
                        </div>
                    </div>
                )}
            </div>

            {/* 텍스트 영역 */}
            <div
                className="flex flex-col lg:justify-between bg-white px-6 py-5 lg:px-[38px] lg:py-[40px] lg:h-full w-full">
                <div className="flex flex-col gap-[32px] flex-1 min-w-0">
                    <div className="flex flex-col gap-1 lg:gap-[4px] lg:flex-1 min-w-0">
                        <h3
                            className="
                text-[16px] lg:text-[24px] font-bold text-grilledMeats 
                leading-[1.3] tracking-[-0.48px]
                line-clamp-2
                flex-1
            "
                        >
                            {item.title.length > 43 ? item.title.slice(0, 43) + '…' : item.title}
                        </h3>
                        <p className="text-[12px] lg:text-[15px] font-normal text-grilledMeats leading-[1.6] tracking-[-0.36px] lg:opacity-50">
                            {item.date}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

// 약속 아이템 데이터
const promiseItems: PromiseItem[] = [
    {
        id: 1,
        imageUrl: '',
        title: '안전을 위한 삼립의 변화, 새롭게 시작합니다',
        date: '2025년 11월 28일',
    },

    {
        id: 2,
        imageUrl: '/img/promise/promise_01.png',
        title: '안전을 향한 삼립의 세 가지 약속을 공유드립니다.',
        date: '2025년 11월 29일',
    },

    {
        id: 3,
        imageUrl: '/img/promise/promise_02.png',
        title: '안전 설비 도입 및 시스템 강화 활동을 진행했습니다',
        date: '2025년 11월 30일',
    },

];

const sortOptions = ['최신순', '오래된순'];

const Promise = () => {
    const [selectedSort, setSelectedSort] = useState<string>('최신순');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [isMobile, setIsMobile] = useState<boolean>(false);

    // 화면 크기 감지
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 1024); // lg 기준
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // 정렬 처리
    const parseKoreanDate = (dateStr: string) => {
        const match = dateStr.match(/(\d{4})년\s*(\d{1,2})월\s*(\d{1,2})일/);
        if (!match) return new Date(0);

        const [, year, month, day] = match;
        return new Date(
            Number(year),
            Number(month) - 1,
            Number(day)
        );
    };

    const sortedItems = [...promiseItems].sort((a, b) => {
        const dateA = parseKoreanDate(a.date).getTime();
        const dateB = parseKoreanDate(b.date).getTime();

        if (selectedSort === '최신순') {
            return dateB - dateA;
        } else {
            return dateA - dateB;
        }
    });

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedSort]);

    // 페이지당 아이템 수
    const itemsPerPage = isMobile ? 3 : 9;

    // 전체 페이지 수
    const totalPages = Math.ceil(sortedItems.length / itemsPerPage);

    // 현재 페이지 아이템
    const paginatedItems = sortedItems.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <main className="overflow-hidden relative w-full bg-[#F8F7F3] pt-[44px] lg:pt-[90px] min-h-dvh   ">
            <section className="flex flex-col gap-[40px] lg:gap-[100px] pt-[24px] lg:pt-[160px] relative z-10">
                <div className="max-w-[1200px] w-full mx-auto px-5">
                    <div className="flex flex-col gap-5 lg:gap-[90px] relative">
                        {/* 제목 */}
                        <h2 className="text-[18px] lg:text-[42px] font-extrabold text-grilledMeats text-center tracking-[-0.54px] lg:tracking-[-1.26px]">
                            삼립의 약속
                        </h2>

                        {/* 정렬 및 개수 */}
                        <div
                            className="flex justify-between items-center mb-[24px] lg:mb-[60px] flex-row lg:flex-row-reverse">
                            <div className="text-[12px] lg:text-[15px] text-grilledMeats">
                                전체 <span className="font-bold">{sortedItems.length}</span>개
                            </div>

                            <div className="flex gap-2 lg:gap-[8px] items-center text-[12px] lg:text-[15px]">
                                {sortOptions.map((option, index) => (
                                    <React.Fragment key={option}>
                                        <button
                                            onClick={() => setSelectedSort(option)}
                                            className={
                                                selectedSort === option ? 'text-grilledMeats' : 'text-[#aaa8a2]'
                                            }
                                        >
                                            {option}
                                        </button>
                                        {index < sortOptions.length - 1 && (
                                            <span className="text-[#aaa8a2]">|</span>
                                        )}
                                    </React.Fragment>
                                ))}
                            </div>

                        </div>
                    </div>

                    {/* 아이템 리스트 */}
                    <div className="flex flex-col gap-8 lg:gap-[40px]">
                        {paginatedItems.map((item) => (
                            <PromiseItemCard key={item.id} item={item}/>
                        ))}
                    </div>
                </div>

                {/* 페이지네이션 */}
                <div className="mb-[80px] lg:mb-[180px]">
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

export default Promise;
