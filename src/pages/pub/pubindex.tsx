// src/pages/pub/pubindex.tsx
import React, {useState, useRef, useCallback, useMemo} from 'react';
import {useRouter} from 'next/router';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Navigation, Autoplay} from 'swiper/modules';
import type {Swiper as SwiperType} from 'swiper';

import Masonry from '@/components/pub/Masonry/Masonry';
import {getCardData} from '@/components/pub/Card';
import AndMore from '@/components/pub/atoms/Button/AndMore';
import SeeMore from '@/components/pub/atoms/Button/SeeMore';
import MediaChips from '@/components/pub/MediaChips';
import {MediaCard} from '@/components/pub/MediaCard';

/* =========================
   DATA
========================= */

const masonryItems = [
    {
        id: '1',
        img: '/img/home/main-grid-01.jpg',
        url: 'https://example.com/one',
        overlayImage: '/img/home/main-brand-hoppang.png'
    },
    {
        id: '2',
        img: '/img/home/main-grid-02.jpg',
        url: 'https://example.com/two',
        overlayImage: '/img/home/main-brand-cream_bread.png'
    },
    {
        id: '3',
        img: '/img/home/main-grid-03.jpg',
        url: 'https://example.com/three',
        overlayImage: '/img/home/main-brand-hodduck.png'
    },
    {
        id: '4',
        img: '/img/home/main-grid-04.jpg',
        url: 'https://example.com/four',
        overlayImage: '/img/home/main-brand-full_moon.png'
    },
    {
        id: '5',
        img: '/img/home/main-grid-05.jpg',
        url: 'https://example.com/five',
        overlayImage: '/img/home/main-brand-migak.png'
    },
    {
        id: '6',
        img: '/img/home/main-grid-06.jpg',
        url: 'https://example.com/six',
        overlayImage: '/img/home/main-brand-project_h.png'
    },
    {
        id: '7',
        img: '/img/home/main-grid-07.jpg',
        url: 'https://example.com/seven',
        overlayImage: '/img/home/main-brand-hi_noddle.png'
    },
    {
        id: '8',
        img: '/img/home/main-grid-08.jpg',
        url: 'https://example.com/eight',
        overlayImage: '/img/home/main-brand-city_deli.png'
    },
    {
        id: '9',
        img: '/img/home/main-grid-09.jpg',
        url: 'https://example.com/nine',
        overlayImage: '/img/home/main-brand-pig.png'
    },
];

const swiperImages = [
    {
        id: 1,
        src: '/img/home/main_banner_01.jpg',
        srcMo: '/img/home/main_banner_01_mo.jpg',
        alt: '메인 배너',
        link: '/pub/pub/now/story/1',
        title: {line1: '미국 전역을 달달하게 물들인', line2: 'K-치즈케익의 정체'},
    },
    {
        id: 2,
        src: '/img/home/main_banner_03.png',
        srcMo: '/img/home/main_banner_03_mo.jpg',
        alt: '메인 배너',
        link: '/pub/pub/now/pr/1669',
        title: {line1: '원조 국민 호빵의 진화,', line2: '맛의 깊이를 더한 80주년 기념 호빵'},
    },
];

/* =========================
   COMPONENT
========================= */

const PubIndex = () => {
    const router = useRouter();

    // 상태 관리
    const [activeIndex, setActiveIndex] = useState(0);
    const swiperRef = useRef<SwiperType | null>(null);
    const [hoveredCard, setHoveredCard] = useState<string | null>(null);

    // ✅ 컴포넌트 안: useCallback으로 메모이제이션 (자식 컴포넌트에 전달할 함수)
    // - 의존성이 없으므로 한 번만 생성되고 재사용됨
    const handleCardClick = useCallback((url: string) => {
        // 외부 링크인 경우 (http:// 또는 https://로 시작)
        if (url.startsWith('http://') || url.startsWith('https://')) {
            window.location.href = url;
        } else {
            // 내부 라우트인 경우
            router.push(url);
        }
    }, [router]);

    // ✅ 컴포넌트 안: useMemo로 메모이제이션 (계산 비용이 있는 경우)
    // - handleCardClick이 변경될 때만 재계산
    const cardData = useMemo(() => getCardData(handleCardClick), [handleCardClick]);

    // ✅ 컴포넌트 안: useCallback으로 메모이제이션
    // - swiperRef가 변경될 때만 재생성 (실제로는 거의 변경되지 않음)
    const handleSlideChange = useCallback((swiper: SwiperType) => {
        setActiveIndex(swiper.realIndex);
    }, []);

    // ✅ 컴포넌트 안: useCallback으로 메모이제이션
    const goToSlide = useCallback((index: number) => {
        if (swiperRef.current) {
            // 루프 모드에서는 slideToLoop를 사용해야 정확하게 작동합니다
            swiperRef.current.slideToLoop(index);
        }
    }, []);

    return (
        <main className='bg-cream lg:pt-[90px]'>
            {/* 스와이퍼 섹션 */}
            <section className='relative'>
                <Swiper
                    modules={[Navigation, Autoplay]}
                    spaceBetween={0}
                    slidesPerView={1}
                    onSwiper={(swiper: SwiperType) => {
                        swiperRef.current = swiper;
                    }}
                    onSlideChange={handleSlideChange}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                    loop={true}
                    className="swiper-custom h-[500px] lg:h-[calc(100dvh-90px)] "
                >
                    {swiperImages.map((image, index) => (
                        <SwiperSlide key={image.id}>
                            <div
                                className={`flex relative justify-center items-center bg-gray-100 rounded-lg w-full h-full ${image.link ? 'cursor-pointer' : ''}`}
                                onClick={() => {
                                    if (image.link) {
                                        // 외부 링크인 경우 (http:// 또는 https://로 시작)
                                        if (image.link.startsWith('http://') || image.link.startsWith('https://')) {
                                            window.open(image.link, '_blank');
                                        } else {
                                            // 내부 라우트인 경우
                                            router.push(image.link);
                                        }
                                    }
                                }}
                            >
                                {/* 모바일: srcMo 있으면 사용, 없으면 src */}
                                <img
                                    src={image.srcMo ?? image.src}
                                    alt={image.alt}
                                    className="block object-cover w-full h-full lg:hidden"
                                />
                                {/* PC: 항상 src */}
                                <img
                                    src={image.src}
                                    alt={image.alt}
                                    className="hidden object-cover w-full h-full lg:block"
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
                {/* 커스텀 페이지네이션 */}
                <div
                    className='absolute bottom-0 left-0 w-full z-[100] flex flex-col items-start lg:pb-[136px] lg:px-5 p-6'>
                    <div className='max-w-[1200px] w-full mx-auto flex flex-col items-start lg:gap-6 gap-3'>
                        <div className="custom-pagination ivory">
                            {swiperImages.map((_, index) => (
                                <button
                                    key={index}
                                    className={`pagination-bullet ${activeIndex === index ? 'active' : ''}`}
                                    onClick={() => goToSlide(index)}
                                />
                            ))}
                        </div>
                        {swiperImages[activeIndex]?.title && (
                            <h2 className='text-[22px] lg:text-[40px] font-bold text-cream leading-[1.4] flex flex-col'>
                                {/* 첫번째 줄 */}
                                <span>{swiperImages[activeIndex].title.line1}</span>
                                {/* 두번째 줄 */}
                                <span>{swiperImages[activeIndex].title.line2}</span>
                            </h2>
                        )}
                    </div>
                </div>
            </section>

            <section className='pt-[30px] lg:pt-[105px] bg-cream'>
                <p className='text-[40px] lg:text-[120px] font-bold text-samlipRed lg:leading-[1.1] leading-[0.95] text-center gt-ultra px-5'>GOOD
                    FOOD<br/>
                    HAPPY LIFE</p>

                {/* Masonry 갤러리 */}
                <div
                    className='max-w-[1014px] px-5 pt-[28px]  mx-auto flex flex-col items-center lg:gap-[83px] gap-[32px]'>
                    <Masonry
                        items={masonryItems}
                        ease="power3.out"
                        duration={0.6}
                        stagger={0.05}
                        animateFrom="bottom"
                        scaleOnHover={true}
                        hoverScale={0.95}
                        blurToFocus={true}
                        // colorShiftOnHover={false}
                        overlayImagePath="/img/main-brand-01.png"
                    />
                    <AndMore onClick={() => router.push('/pub/brand/home')}/>
                </div>
            </section>
            <section className='relative pt-[100px] lg:pt-[180px] overflow-hidden'>
                <div className='relative *:relative *:z-[12] bg-[#fbfae7]'>
                    <h2 className='text-[40px] mb-[12px] lg:text-[100px] text-deilcut leading-[1.1] gt-ultra text-center'>HAPPY
                        LIFE <br/> BRAND</h2>
                    <p className='lg:text-[36px] text-[15px] gt-bold text-deilcut leading-[1.1] relative z-10 text-center'>Since
                        1945</p>
                    <p className="text-center justify-center text-grain lg:text-[42px] text-[18px] font-bold leading-[1.4] lg:pt-[88px] pt-[24px] ">음식을
                        통한<br/>일상의 행복을 만듭니다</p>
                </div>
                <img src="/img/wave_mask.svg" alt="mask_icon"
                     className='w-[150%] absolute -bottom-1 left-1/2 -translate-x-1/2 max-w-[150%] z-10'/>
            </section>
            <section className='relative  py-10 lg:py-20 lg:px-0 pt-0 bg-darkcream lg:pb-[96px]'>
                <MediaCard isHome={true}/>
                <div className={`lg:hidden flex justify-center items-center h-full`.trim()}>
                    <div
                        className='gt-ultra relative w-full text-center text-[44px] lg:text-[120px] leading-[31px] lg:leading-[84px] lg:text-cream flex flex-col gap-[8px] lg:gap-[34px] items-center pt-10 lg:pt-0 justify-center text-transparent'>
                        <p>The</p>
                        <p>Sweetest</p>
                        <p>Treats</p>
                        <div
                            className='absolute *:absolute  w-full max-w-[204px] lg:w-full h-full text-cream gt-ultra text-[25px] leading-[28px]'>
                            <MediaChips variant="home" className='max-w-full h-[123px] lg:!max-w-[530px]'/>
                        </div>
                    </div>
                </div>
                <SeeMore className='mx-auto mt-8 lg:mt-1' onClick={() => handleCardClick('/pub/now/media')}/>
            </section>

            <section className='relative bg-deilcut lg:h-[334px] py-[50px] flex flex-col items-center justify-center'>
                <div className='flex relative z-10 flex-col gap-3 justify-center items-center lg:gap-6'>
                    <p className='lg:text-[28px] text-base  font-semibold text-cream  text-center'>고객님의 다양한 의견을
                        기다립니다</p>
                    <button
                        className='bg-cream lg:text-[21px] px-5 py-2.5 text-[12px]  font-bold  text-grilledMeats rounded-full tracking-[-2%] lg:px-[66px] lg:py-[18px]'
                        onClick={() => router.push('/pub/service')}
                    >고객서비스 바로가기
                    </button>
                </div>
                <img src="/img/back_warp.svg" alt=""
                     className='object-cover absolute top-0 left-0 w-full h-full opacity-30'/>
            </section>
        </main>
    );
};
export default PubIndex;
