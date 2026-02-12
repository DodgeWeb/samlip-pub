import React, {useState, useRef, useMemo, useEffect} from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import type {Swiper as SwiperType} from 'swiper';
import {Icon} from '@/components/pub/icons';
import 'swiper/css/bundle';

import {MotionBox} from './interAtion/MotionBox';

const useResponsiveChunkSize = () => {
    const [chunkSize, setChunkSize] = useState(4);
    useEffect(() => {
        const handleResize = () => {
            setChunkSize(window.innerWidth < 1024 ? 2 : 4);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    return chunkSize;
};

interface Product {
    id: number;
    name: string;
    image: string;
    description?: string;
}

interface Season {
    id: number;
    badge: string;
    title: string;
    description: string;
    image?: string;
    products: Product[];
}

interface ProjectHProductSwiperProps {
    seasons: Season[];
}

export const ProjectHProductSwiper: React.FC<ProjectHProductSwiperProps> = ({seasons}) => {
    const chunkSize = useResponsiveChunkSize();
    const [currentSlideIndices, setCurrentSlideIndices] = useState<{ [key: number]: number }>({});
    const productSwiperRef = useRef<{ [key: number]: SwiperType | null }>({});

    // 각 시즌의 제품을 그룹화
    const chunkedProductsBySeason = useMemo(() => {
        const result: { [key: number]: Product[][] } = {};
        seasons.forEach((season) => {
            const chunked: Product[][] = [];
            for (let i = 0; i < season.products.length; i += chunkSize) {
                chunked.push(season.products.slice(i, i + chunkSize));
            }
            // 모바일에서 마지막 그룹이 1개만 있을 때 더미 카드 추가
            if (chunkSize === 2 && chunked.length > 0) {
                const lastGroup = chunked[chunked.length - 1];
                if (lastGroup.length === 1) {
                    const dummyProduct: Product = {
                        id: -1,
                        name: '',
                        image: '',
                    };
                    lastGroup.push(dummyProduct);
                }
            }
            result[season.id] = chunked;
        });
        return result;
    }, [seasons, chunkSize]);

    return (
        <div className="py-[36px] lg:py-[90px] px-5 w-full max-w-[1220px] mx-auto">
            <h2 className="text-[22px] lg:text-[64px] gt-ultra text-center tracking-[-0.66px] leading-[1.3] pb-5 lg:pb-[68px] text-[#4e0c0d]">Products</h2>

            <div className="flex flex-col gap-[40px] lg:gap-[120px] items-center">
                {seasons.map((season, seasonIdx) => (

                    <div key={season.id} className="inline-flex flex-col justify-center items-center mx-auto w-full">
                        {/* 시즌 정보 섹션 */}
                        <section
                            className={`flex flex-col justify-center items-center  lg:gap-5 w-full lg:flex-row ${seasonIdx === 1 ? 'lg:flex-row-reverse' : ''}`}>
                            <div
                                className="flex flex-col justify-center items-center w-full lg:justify-start lg:items-start">
                                {/* 배지 */}
                                <div
                                    className="bg-[#4e0c0d] flex items-center justify-center px-[16px] py-[4px] rounded-[8px] mb-[8px] lg:mb-[20px] flex-auto w-auto">
                                    <p className="text-[14px] lg:text-[22px] font-normal text-[#fbfae7] tracking-[-0.22px] leading-[1.6]">{season.badge}</p>
                                </div>
                                {/* 제목 */}
                                <h3 className="text-[20px] lg:text-[32px] font-bold text-[#4e0c0d] tracking-[-0.16px] leading-[1.4] mb-[12px] lg:mb-[20px]">{season.title}</h3>
                                <p className="text-[12px] hidden lg:block  lg:text-[22px] font-normal text-[#4e0c0d] tracking-[-0.22px] leading-[1.6] w-full lg:w-[550px]">{season.description}</p>
                            </div>
                            <MotionBox>
                                {/* 이미지 영역 */}
                                {season.image && (
                                    <div className="relative w-full lg:w-[580px] aspect-square mb-[12px]">
                                        <img
                                            src={season.image}
                                            alt={season.badge}
                                            className="object-cover w-full h-full"
                                        />
                                    </div>

                                )}
                            </MotionBox>
                            {/* 설명 */}
                            <p className="text-[12px] block lg:hidden text-center lg:text-[22px] font-normal text-[#4e0c0d] tracking-[-0.22px] leading-[1.6] w-full lg:w-[550px]">
                                {season.description}
                            </p>
                        </section>

                        {/* 제품 카드 그리드 */}
                        <div className="w-full mt-[24px]">
                            {(() => {
                                const chunkedProducts = chunkedProductsBySeason[season.id] || [];
                                const currentSlideIndex = currentSlideIndices[season.id] || 0;
                                return (
                                    <>
                                        <Swiper
                                            spaceBetween={8}
                                            slidesPerView={1}
                                            loop={chunkedProducts.length > 1}
                                            onSwiper={(swiper: SwiperType) => {
                                                productSwiperRef.current[season.id] = swiper;
                                                setCurrentSlideIndices((prev) => ({
                                                    ...prev,
                                                    [season.id]: swiper.realIndex,
                                                }));
                                            }}
                                            onSlideChange={(swiper: SwiperType) => {
                                                setCurrentSlideIndices((prev) => ({
                                                    ...prev,
                                                    [season.id]: swiper.realIndex,
                                                }));
                                            }}
                                            className="w-full h-full brand-history-swiper project-h-swiper"
                                        >
                                            {chunkedProducts.map((group, groupIdx) => (
                                                <SwiperSlide key={groupIdx} className='flex items-stretch'>
                                                    <div
                                                        className="flex flex-1 items-stretch w-full gap-[8px] lg:gap-[20px] justify-center">
                                                        {group.map((product) => {
                                                            const isDummy = product.id === -1;
                                                            return (
                                                                <div key={product.id}
                                                                     className={`flex flex-col w-full max-w-[280px] flex-1 ${isDummy ? 'block opacity-0 lg:hidden' : ''}`}>
                                                                    {!isDummy ? (
                                                                        <>
                                                                            {/* 이미지 영역 */}
                                                                            <div
                                                                                className="border aspect-square border-[#d9d9d9] border-solid relative w-full overflow-hidden flex-shrink-0">
                                                                                <img
                                                                                    src={product.image}
                                                                                    alt={product.name}
                                                                                    className="object-cover absolute inset-0 w-full h-full"
                                                                                />
                                                                            </div>
                                                                            {/* 텍스트 영역 */}
                                                                            <div
                                                                                className="bg-[#f7f7f7] border-[#d9d9d9] border-b border-x border-solid box-border flex flex-col gap-[10px] items-center justify-start px-[8px] py-[16px] text-[#4e0c0d] text-center w-full flex-1 min-h-0 lg:px-[12px]">
                                                                                <p className="text-[14px] lg:text-[22px] font-bold tracking-[-0.22px] leading-[1.6]">
                                                                                    {product.name}
                                                                                </p>
                                                                                {product.description && (
                                                                                    <p className="text-[12px] lg:text-[15px] font-normal tracking-[-0.15px] leading-[1.6]">
                                                                                        {product.description}
                                                                                    </p>
                                                                                )}
                                                                            </div>
                                                                        </>
                                                                    ) : (
                                                                        <>
                                                                            {/* 더미 이미지 영역 */}
                                                                            <div
                                                                                className="border aspect-square border-[#d9d9d9] border-solid relative w-full overflow-hidden flex-shrink-0 bg-transparent"
                                                                                aria-hidden="true"/>
                                                                            {/* 더미 텍스트 영역 */}
                                                                            <div
                                                                                className="bg-[#f7f7f7] border-[#d9d9d9] border-b border-x border-solid box-border flex flex-col gap-[10px] items-center justify-start px-[8px] py-[16px] text-[#4e0c0d] text-center w-full flex-1 min-h-0 lg:px-[12px]"
                                                                                aria-hidden="true"/>
                                                                        </>
                                                                    )}
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                </SwiperSlide>
                                            ))}
                                        </Swiper>

                                        {/* 네비게이션 버튼 */}
                                        {chunkedProducts.length > 1 && (
                                            <div
                                                className="flex gap-[12px] items-center justify-center lg:mt-[40px] mt-[20px]">
                                                <button
                                                    className="bg-[#4e0c0d] rounded-[500px] size-[36px] lg:size-[60px] flex items-center justify-center"
                                                    aria-label="이전 제품"
                                                    onClick={() => {
                                                        const swiper = productSwiperRef.current[season.id];
                                                        if (swiper) {
                                                            swiper.slidePrev();
                                                        }
                                                    }}
                                                >
                                                    <Icon
                                                        name="arrowTop"
                                                        className="-rotate-90 size-[20px]"
                                                        style={{color: '#fbfae7'}}
                                                    />
                                                </button>
                                                <span
                                                    className="text-[28px] lg:text-[64px] gt-ultra text-center leading-[1.1] text-[#4e0c0d]">
                          {currentSlideIndex + 1}/{chunkedProducts.length}
                        </span>
                                                <button
                                                    className="bg-[#4e0c0d] rounded-[500px] size-[36px] lg:size-[60px] flex items-center justify-center"
                                                    aria-label="다음 제품"
                                                    onClick={() => {
                                                        const swiper = productSwiperRef.current[season.id];
                                                        if (swiper) {
                                                            swiper.slideNext();
                                                        }
                                                    }}
                                                >
                                                    <Icon
                                                        name="arrowTop"
                                                        className="rotate-90 size-[20px]"
                                                        style={{color: '#fbfae7'}}
                                                    />
                                                </button>
                                            </div>
                                        )}
                                    </>
                                );
                            })()}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

