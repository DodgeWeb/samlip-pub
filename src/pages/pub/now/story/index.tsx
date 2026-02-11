import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css/bundle';
import 'swiper/css/pagination';
import { Icon } from '@/components/pub/icons';
import PaginationComponent from '@/components/pub/Pagenataion';

export interface StoryItem {
    id: number;
    imageUrl: string;
    title: string;
    date: string;
    tags: string[];
    summary?: string;
}

// 정해진 배너 색상 객체 (5가지) - 배경색, 태그색(SVG색과 동일)
const BANNER_COLORS = {
    def: { color: '#F2E3C2', tagColor: '#FBFAE7' },
    orange: { color: '#FF8A1D', tagColor: '#FBC68C' },
    red: { color: '#930000', tagColor: '#500C08' },
    green: { color: '#76CA22', tagColor: '#DAF886' },
    yellow: { color: '#FFE14A', tagColor: '#FFF2AD' },
} as const;

// 색상 키 타입
type BannerColorKey = keyof typeof BANNER_COLORS;

interface MainBanner {
    id: number;
    imageUrl: string;
    title: string;
    summary: string;
    tags: string[];
    colorIndex: BannerColorKey; // BANNER_COLORS 객체의 키
}

const mainBanners: MainBanner[] = [
    {
        id: 1,
        imageUrl: '/img/now/cheesecake.png',
        title: '미국 전역을 달달하게 물들인 K-치즈케익의 정체',
        summary: 'K-푸드에 대한 전 세계적인 열풍이 이어지는 가운데, 지난 9월 미국 디저트 덕후들의 마음을 사로잡은 베이커리가 하나 있습니다. 바로...',
        tags: ['제품', '글로벌'],
        colorIndex: 'orange',
    },
    {
        id: 2,
        imageUrl: '/img/now/hoppang.png',
        title: '겨울 제철코어가 된 삼립호빵, 그 뒤에 숨겨진 치열한 고민',
        summary: '‘제철코어. 특정 트렌드나 스타일을 뜻하는 ‘코어(Core)’와 계절의 즐거움인 ‘제철’이 합쳐진 신조어로, 특정 계절에만 즐길 수 있는 먹거리...',
        tags: ['제품'],
        colorIndex: 'def',
    },
];

const storyItems: StoryItem[] = [
    {
        id: 1,
        imageUrl: '/img/now/cheesecake.png',
        title: '미국 전역을 달달하게 물들인 K-치즈케익의 정체',
        date: '2025년 11월 28일',
        tags: ['제품', '글로벌'],
    },
    {
        id: 2,
        imageUrl: '/img/now/hoppang.png',
        title: '겨울 제철코어가 된 삼립호빵, 그 뒤에 숨겨진 치열한 고민',
        date: '2025년 11월 29일',
        tags: ['제품'],
    },
];

const categories = ['제품', '기술', '글로벌'];
const sortOptions = ['최신순', '오래된순'];

// 칼럼 아이템 카드 컴포넌트
export const StoryItemCard: React.FC<{ item: StoryItem; variant?: 'default' | 'compact' }> = ({ item, variant = 'default' }) => {
    const router = useRouter();

    const mobileHeight = variant === 'compact' ? 'h-[128px]' : 'h-[280px] lg:h-auto';
    const desktopHeight = variant === 'compact' ? 'lg:h-auto lg:aspect-square' : 'aspect-square';

    return (
        <div
            className="flex flex-col flex-1 items-stretch w-full cursor-pointer"
            onClick={() => router.push(`/pub/now/story/${item.id}`)}
        >
            <div className={`relative mb-0 w-full ${mobileHeight} ${desktopHeight}`}>
                <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="object-cover absolute inset-0 w-full h-full"
                />
            </div>
            <div className="flex flex-col flex-1 justify-between px-6 py-5 w-full bg-white lg:px-6 lg:py-5 lg:p-8">
                <div className="flex flex-col gap-1 lg:gap-3 mb-8 lg:mb-[40px] flex-1">
                    <h3 className="text-[16px] lg:text-[24px] font-bold text-grilledMeats leading-[1.3] tracking-[-0.48px]">
                        {item.title}
                    </h3>
                    <p className="text-[12px] lg:text-[14px] font-normal text-grilledMeats leading-[1.6] tracking-[-0.36px] lg:tracking-[-0.42px]">
                        {item.date}
                    </p>
                </div>
                <div className="flex flex-wrap gap-1 lg:gap-2">
                    {item.tags.map((tag, index) => (
                        <span
                            key={index}
                            className="bg-cream  px-[14px] py-[6px] lg:px-[14px] lg:py-[6px] text-[10px] lg:text-[12px] font-bold text-grilledMeats tracking-[-0.3px] lg:tracking-[-0.36px]"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

const Story = () => {
    const router = useRouter();
    const navigate = (to: string) => router.push(to);
    const [selectedCategory, setSelectedCategory] = useState<string>('전체');
    const [selectedSort, setSelectedSort] = useState<string>('최신순');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [currentBannerIndex, setCurrentBannerIndex] = useState<number>(0);
    const [swiperRef, setSwiperRef] = useState<SwiperType | null>(null);
    const [isMobile, setIsMobile] = useState<boolean>(() => {
        if (typeof window === 'undefined') return false;
        return window.innerWidth < 1024;
    });

    // 화면 크기 감지
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 1024);
        };

        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const goToSlide = (index: number) => {
        if (swiperRef) {
            swiperRef.slideTo(index);
        }
    };

    // 카테고리 변경 시 페이지를 1로 리셋
    const onSelectCategory = (category: string) => {
        setSelectedCategory(category);
        setCurrentPage(1);
    };

    const filteredItems = storyItems.filter((item) => {
        if (selectedCategory === '전체') return true;
        return item.tags.includes(selectedCategory);
    });

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

    const sortedItems = [...filteredItems].sort((a, b) => {
        const dateA = parseKoreanDate(a.date).getTime();
        const dateB = parseKoreanDate(b.date).getTime();

        if (selectedSort === '최신순') {
            return dateB - dateA;
        }
        return dateA - dateB;
    });

    // 페이지당 아이템 수: 모바일 3개, PC 9개
    const itemsPerPage = isMobile ? 3 : 9;
    const totalPages = Math.ceil(sortedItems.length / itemsPerPage);

    // 현재 페이지에 표시할 아이템만 필터링
    const paginatedItems = sortedItems.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const totalItems = filteredItems.length;

    return (
        <div className="min-h-screen">
            <section>
                {/* 스와이퍼 */}
                <section className="w-full max-w-[1220px] mx-auto px-5 ">
                    {/* 제목 */}
                    <h1 className="text-[18px] lg:text-[42px] font-extrabold text-grilledMeats text-center tracking-[-0.54px] lg:tracking-0 pt-[60px] lg:pt-[200px] pb-8 lg:pb-[64px]">삼립 스토리</h1>

                    {/* 메인 배너 - Swiper */}
                    <div className="flex flex-col gap-8 lg:gap-[32px] items-center mb-[28px] lg:mb-[64px]">
                        <Swiper
                            modules={[Pagination, Autoplay]}
                            spaceBetween={0}
                            slidesPerView={1}
                            onSwiper={setSwiperRef}
                            onSlideChange={(swiper: SwiperType) => setCurrentBannerIndex(swiper.activeIndex)}
                            autoplay={{
                                delay: 5000000,
                                disableOnInteraction: false,
                            }}
                            loop={mainBanners.length > 1}
                            pagination={{clickable: true}}
                            className="w-full lg:max-w-full story-swiper"
                        >
                            {mainBanners.map((banner) => (
                                <SwiperSlide key={banner.id} className="overflow-hidden lg:h-full">
                                    <div
                                        onClick={() => navigate(`/pub/now/story/${banner.id}`)}
                                        className="flex flex-col items-stretch w-full lg:items-stretch lg:flex-row lg:grid lg:grid-cols-[800px_1fr]  flex-1 lg:auto-rows-fr cursor-pointer hover:opacity-95 transition-opacity"
                                    >
                                        <div className="relative w-full lg:max-w-[800px] mb-0 lg:aspect-[8/6] aspect-[1/1] z-40 lg:h-full lg:row-span-1">
                                            <img
                                                src={banner.imageUrl}
                                                alt={banner.title}
                                                className="object-cover absolute inset-0 w-full h-full"
                                            />
                                        </div>
                                        {/* 배너 내용 */}
                                        <div className="flex relative flex-1 p-5 w-full lg:p-8 lg:h-full lg:flex-1 lg:flex lg:flex-col" style={{ backgroundColor: BANNER_COLORS[banner.colorIndex]?.color }}>
                                            <div
                                                className='absolute bottom-[70px]  -translate-x-1/2   w-full scale-[1.25]  left-[calc(50%-5px)] lg:top-[50px] lg:bottom-auto lg:scale-[2.5] lg:left-[calc(50%-100px)]'
                                                style={{ '--icon-fill-color': BANNER_COLORS[banner.colorIndex]?.tagColor } as React.CSSProperties}
                                            >
                                                <Icon
                                                    name="back_wave"
                                                    className="w-full h-full [&_*]:fill-[var(--icon-fill-color)]"
                                                />
                                            </div>
                                            <div className="flex flex-col flex-1 justify-between w-full gap-[36px] lg:gap-[20px] z-50 relative lg:justify-between lg:h-full lg:flex-1">
                                                <div className="flex flex-col gap-1 lg:gap-[4px]">
                                                    <h2
                                                        className="text-[16px] lg:text-[28px] font-bold leading-[1.3] lg:leading-[1.4] tracking-[-0.48px] lg:tracking-[-0.66px] mb-1 lg:mb-3 line-clamp-2"
                                                        style={{ color: banner.colorIndex === 'red' ? '#FFFFFF' : '#500C08' }}
                                                    >
                                                        {banner.title}
                                                    </h2>
                                                    <p
                                                        className="text-[12px] lg:text-[15px] font-normal leading-[1.6] tracking-[-0.36px] lg:tracking-[-0.48px] line-clamp-3"
                                                        style={{ color: banner.colorIndex === 'red' ? '#FFFFFF' : '#500C08' }}
                                                    >
                                                        {banner.summary}
                                                    </p>
                                                </div>
                                                <div className="flex flex-wrap gap-1 lg:gap-2">
                                                    {banner.tags.map((tag, index) => (
                                                        <span
                                                            key={index}
                                                            className="px-2 py-1 lg:px-[14px] lg:py-[6px] text-[10px] lg:text-[12px] font-bold tracking-[-0.3px] lg:tracking-[-0.36px]"
                                                            style={{
                                                                backgroundColor: BANNER_COLORS[banner.colorIndex]?.tagColor,
                                                                color: banner.colorIndex === 'red' ? '#FFFFFF' : '#500C08'
                                                            }}
                                                        >
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>

                    </div>
                </section>


                {/* 필터 및 정렬 */}
                <section className="flex flex-col gap-[40px] lg:gap-[100px]  pt-[32px] bg-[#F8F7F3]">
                    <div className='max-w-[1220px] w-full mx-auto px-5 '>
                        <div className="flex flex-col gap-5 lg:gap-[90px] relative">
                            {/* 카테고리 필터 */}
                            <div className="flex gap-2 lg:gap-[8px] flex-wrap ">
                                {categories.map((category) => (
                                    <button
                                        key={category}
                                        onClick={() => onSelectCategory(category)}
                                        className={`border border-[#aaa8a2] font-bold px-4 py-1 lg:px-[16px] lg:py-[4px] text-[14px] lg:text-[15px] leading-[1.7] tracking-[-0.42px] whitespace-pre ${
                                            selectedCategory === category
                                                ? 'bg-[#AAA8A2] border-transparent  text-white '
                                                : 'bg-white text-[#aaa8a2]'
                                        }`}
                                    >
                                        {category}
                                    </button>
                                ))}
                            </div>

                            {/* 정렬 및 개수 */}
                            <div className="flex justify-between items-center mb-[24px]">
                                <div className="text-[12px] lg:text-[18px] font-bold text-grilledMeats leading-[1.6] tracking-[-0.36px]">
                                    전체 <span className="font-bold">{totalItems}</span>개
                                </div>
                                <div className="flex gap-2 lg:gap-[8px] items-center text-[12px] lg:text-[15px] font-normal leading-[1.6] tracking-[-0.36px] lg:absolute lg:top-2 lg:right-0">
                                    {sortOptions.map((option, index) => (
                                        <React.Fragment key={option}>
                                            <button
                                                onClick={() => setSelectedSort(option)}
                                                className={selectedSort === option ? 'text-grilledMeats' : 'text-[#aaa8a2]'}
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

                        {/* 칼럼 리스트 */}
                        <div className="flex flex-col gap-8 lg:gap-x-[20px] lg:gap-y-[40px] lg:grid lg:grid-cols-3 cursor-pointer">
                            {paginatedItems.map((item) => (
                                <StoryItemCard key={item.id} item={item} />
                            ))}
                        </div>
                    </div>
                    <div className='mb-[80px]  lg:mb-[180px]'>
                        <PaginationComponent
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={setCurrentPage}
                        />
                    </div>
                </section>
            </section>
        </div>
    );
};
export default Story;
