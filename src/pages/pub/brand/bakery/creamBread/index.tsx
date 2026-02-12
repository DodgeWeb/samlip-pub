import React, {useState, useRef} from 'react';
import {useRouter} from 'next/router';
import type {Swiper as SwiperType} from 'swiper';
import {Icon} from '@/components/pub/icons';
import {MotionBox} from '@/components/pub/interAtion/MotionBox';
import {BrandMedia} from '@/components/pub/brand/BrandMedia';
import CreamHistorySwiper from './CreamHistorySwiper';

const Hotteok = () => {
    const router = useRouter();
    const [brandMediaSwiper, setBrandMediaSwiper] = useState<SwiperType | null>(null);
    const brandMediaPrevRef = useRef<HTMLButtonElement>(null);
    const brandMediaNextRef = useRef<HTMLButtonElement>(null);
    const [currentMediaIndex, setCurrentMediaIndex] = useState(0);

    const brandMediaImages = [
        {
            image: '/img/brand_media/cream-bread_media_01.jpg',
            link: 'https://www.instagram.com/reel/C-FFqfyPEZ2/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=='
        },
        {
            image: '/img/brand_media/cream-bread_media_02.jpg',
            link: 'https://www.instagram.com/p/C8_kh_VsDd0/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=='
        },
        {
            image: '/img/brand_media/cream-bread_media_03.jpg',
            link: 'https://www.instagram.com/p/C8tjt68RWCM/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=='
        },
        {
            image: '/img/brand_media/cream-bread_media_04.jpg',
            link: 'https://www.instagram.com/reel/C8q_PpEvkRm/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=='
        },
    ];


    const products = [
        {id: 1, name: '오리지널 꿀호떡', image: '/img/brand/hotteok/product_01.png'},
        {id: 2, name: '미니 꿀호떡', image: '/img/brand/hotteok/product_02.png'},
        {id: 3, name: '24시간 숙성한 국산 꿀필링 미니 꿀호떡', image: '/img/brand/hotteok/product_03.png'},
        {id: 4, name: '옥수수 꿀호떡', image: '/img/brand/hotteok/product_04.png'},
        {id: 5, name: '달콤 씨앗 꿀호떡', image: '/img/brand/hotteok/product_05.png'},
    ];

    const historyItems = [
        {year: '1971. 10', title: '호빵 출시', description: '1년 여의 연구개발 끝에 탄생'},
        {year: '1972', title: '찜통 공급', description: '판매처에 공급'},
        {year: '2018. 11', title: '윈터레스팅 캠페인', description: '이모티콘 증정, 비욘드 클로젯과 콜라보한 파자마 증정'},
    ];

    const highlights = [
        {
            title: '1,900,000,000',
            subtitle: '출시 이래 19억 개가 팔린 크림빵',
            description: '입안에서 살살 녹는 하얀 크림과 구멍이 송송 뚫려있는 재미있는 모양으로 모든 연령층의 입맛을 사로잡은 크림빵은 출시 이래 현재까지 19억 개가 팔린 국민빵입니다.',
        },
        {
            title: '24시간',
            subtitle: '3개의 생산라인을 풀가동하다',
            description: '60년대 대림동에 위치했던 삼립식품 공장에서 아침이면 크림빵을 사기 위해 사람들이 공장 앞에 줄을 섰고, 이들을 위해 3개의 크림빵 라인을 24시간 풀가동해도 공급이 부족할 정도로 인기를 끌었습니다.',
        },
        {
            title: 'SINCE 1964년',
            subtitle: '크림빵이 사랑받은 기간',
            description: '1964년 최초로 선보인 크림빵은 소비자들의 아낌없는 사랑을 한 몸에 받은 전설적인 히트 상품입니다.',
        },
    ];

    return (
        <main className="bg-white">
            {/* 메인 섹션 */}
            <section className='w-full h-[360px] lg:h-[800px]  relative overflow-hidden mt-[40px] lg:mt-[60px]'>
                <div className='absolute inset-0 z-10 w-full h-full'>
                    <img src="/img/brand/cream_bread/cream_logo.svg" alt=""
                         className="relative pt-[60px] mx-auto w-full max-w-[200px] lg:max-w-[480px] lg:pt-[80px] z-20 "/>
                    <img src="/img/brand/cream_bread/cream_banner_object_mo.png" alt=""
                         className="object-cover absolute inset-0 w-full h-full lg:hidden"/>
                    <img src="/img/brand/cream_bread/cream_banner_object.png" alt=""
                         className="hidden object-cover absolute inset-0 w-full h-full lg:block"/>
                </div>
            </section>

            {/* 크림빵 - 브랜드 스토리 */}
            <section className='bg-[#FCE6E8] brand-story-section'>
                <div className='inner'>
                    <div className='contents'>
                        {/* Brand Story 제목 */}
                        <h2 className='title pc_title text-[#ED1C2A]'>Brand Story</h2>
                        <span className='samlip-cream text-[18px] lg:text-[32px] text-[#ED1C2A] text-center lg:hidden'>추억을 담아 따스한 온기를 전하는 정통 크리ㅁ빵</span>
                        {/* 스토리 이미지 */}
                        <MotionBox>
                            <div className='img_box'>
                                <img
                                    src="/img/brand/cream_bread/story_01.png"
                                    alt="삼립호빵 브랜드 스토리"/>
                            </div>
                        </MotionBox>
                        <section className='description-section'>
                            <h2 className='title text-[#ED1C2A]'>Brand Story</h2>
                            {/* 첫 번째 텍스트 섹션 */}
                            <div className='text-box'>
                                <span
                                    className='samlip-cream text-[36px]  text-[#ED1C2A] text-left lg:block hidden leading-[1.3]'>추억을 담아 따스한 온기를 전하는 정통 크림빵</span>
                                <p className='text-[#ED1C2A]'>
                                    <span className='font-bold'>추억을 담아 따스한 온기를 전하는 정통 크림빵</span>
                                    <span className='block mb-3'></span>
                                    1964년 국내 제빵업계 최초 비닐 포장 제품으로 출시된 크림빵은 구멍 송송 뚫린 빵 속에 입안에서 녹는 부드러운 하얀 크림의 절묘한 조합이 대한민국
                                    남녀노소의 입맛을 사로잡은 헤리티지 제품입니다.
                                    <span className='block mb-3'></span>
                                    출시 당시 아침부터 제품을 사기 위해 공장 앞에 줄을 서고 빵 전용 3개 라인을 24시간 풀가동해도 공급이 부족할 만큼 인기를 끈, 반 세기 지난
                                    지금도 사랑 받는 ‘추억의 빵, 정통 크림빵’
                                    추억을 담은 담백한 그리운 크림으로 따스한 온기를 느끼세요.</p>
                            </div>
                        </section>
                    </div>
                </div>

                {/* 브랜드 히스토리 */}
            </section>

            <section className='brand_history_section'>
                <img src="/img/brand/cream_bread/cream-bread_back.svg" alt=""
                     className='absolute top-0 left-1/2 w-full scale-125 -translate-x-1/2 lg:scale-100'/>
                <div className='relative z-10'>
                    <h2 className='brand_history_title text-[#ED1C2A]'>Brand History</h2>
                    <CreamHistorySwiper/>
                </div>
            </section>


            {/* 브랜드 하이라이트 */}
            <section className="relative w-full px-5 lg:px-0 py-[36px] lg:py-[80px] overflow-hidden">
                {/* 뒷배경 이미지 */}
                <img src="/img/brand/cream_bread/highlight_back.svg" alt=""
                     className='hidden absolute bottom-0 left-0 w-full lg:block'/>
                <img src="/img/brand/cream_bread/highlight_back_mo.svg" alt=""
                     className='absolute bottom-[100px] left-0 w-full lg:hidden'/>
                <div className="lg:max-w-[1180px] mx-auto w-full relative z-10 max-w-[240px]">
                    <div className="flex flex-col gap-[44px] items-center">
                        {/* Brand Highlights 섹션 */}
                        <div className="flex flex-col gap-[24px] items-center w-full max-w-[320px] lg:max-w-full">
                            <h2 className="text-[22px] lg:text-[64px] gt-ultra font-bold text-[#ED1C2A] text-center tracking-[-0.66px] lg:tracking-[-1.92px] leading-[1.3] lg:mb-[68px] lg:mt-[120px]">Brand
                                Highlights</h2>

                            <div
                                className="grid grid-cols-1 lg:grid-cols-3 gap-[8px] w-full lg:flex-row lg:max-w-[1180px] lg:items-start ">
                                {highlights.map((highlight, index) => (
                                    <MotionBox
                                        key={index}
                                        delay={index * 0.2}
                                        className="bg-[#A8141E] flex flex-col  gap-[10px] lg:gap-[21px] items-center lg:justify-start justify-center px-[28px] py-[24px] lg:py-[40px]  w-full lg:h-full"
                                    >
                                        <div className="flex flex-col gap-[12px] lg:gap-[21px] items-center w-full">
                                            <h3 className="text-[22px] lg:text-[42px] font-extrabold text-white text-center tracking-[-0.66px] lg:tracking-[-1.26px] leading-[1.3]">
                                                {highlight.title}
                                            </h3>
                                            <div className="w-full h-[1px] bg-[#FFF5F6] opacity-50"></div>
                                            <div
                                                className="flex flex-col gap-[6.632px] lg:gap-[21px] items-center text-[#FFF5F6] text-center">
                                                <p className="text-[14px] lg:text-[18px] font-bold tracking-[-0.42px] lg:tracking-[-0.18px] leading-[1.6]">
                                                    {highlight.subtitle}
                                                </p>
                                                <p className="text-[12px] lg:text-[18px] leading-[1.6] tracking-[-0.36px] lg:tracking-[-0.18px] max-w-[220px] lg:max-w-[320px]">
                                                    {highlight.description}
                                                </p>
                                            </div>
                                        </div>
                                    </MotionBox>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* 삼립크리미 화이트체 섹션 */}
            <section className='bg-[#FDE8EA] py-[36px] lg:py-[80px]'>
                <div
                    className='flex flex-col gap-[12px] lg:gap-[64px] items-center max-w-[1180px] mx-auto px-5 lg:px-0'>
                    <div className='flex flex-col gap-[4px] lg:gap-[12px] items-center text-center lg:max-w-[800px]'>
                        <h2 className='samlip-cream text-[28px] lg:text-[64px] text-[#ED1C2A] leading-[1.1] tracking-[-0.84px] lg:tracking-[-1.92px]'>
                            삼립크리미 화이트체
                        </h2>
                        <p className='text-[12px] lg:text-[26px] text-[#640C12] leading-[1.6] tracking-[-0.36px] lg:tracking-[-0.18px] max-w-[310px] lg:max-w-[900px]'>
                            정통 크림빵 출시 60주년을 기념하여 한글의 독창적인 아이덴티티를 담고 있는 정통 크림빵 브랜드 폰트를 만나보세요!
                        </p>
                    </div>
                    <button
                        type="button"
                        className='bg-[#ED1C2A] px-[15px] py-[10px] lg:px-[40px] lg:py-[20px] cursor-pointer flex items-center gap-[4px] lg:gap-[16px]'
                        onClick={() => router.push('/pub/brand/bakery/creamBread/typography')}
                    >
                    <span
                        className='text-[12px] lg:text-[28px] font-bold text-white text-center tracking-[-0.36px] lg:tracking-[-0.18px] leading-[1.6]'>
                        삼립크리미 화이트체 자세히 보기
                    </span>
                        <Icon name="arrow_round" className="size-[10px] lg:size-[24px] *:fill-white"/>
                    </button>
                </div>
            </section>


            {/* 뒤 이미지 때문에 묶음 */}
            <section className='overflow-hidden relative bg-[#FFF5F6]'>
                {/* 브랜드 제품 */}
                <section className="relative w-full py-[36px] lg:pb-[60px] overflow-hidden max-w-[1220px] mx-auto px-5">
                    <div className="max-w-[1180px] mx-auto w-full relative z-10">
                        <h2 className="text-[22px] lg:text-[64px] gt-ultra text-center text-[#ED1C2A] tracking-[-0.66px] leading-[1.3] pb-5 lg:pb-[68px]">Products</h2>
                        <img src="/img/brand/cream_bread/product_01.png" alt=""
                             className="w-full max-w-[200px] lg:max-w-[380px] mx-auto"/>
                        <p className='text-[16px] font-bold lg:text-[32px] text-[#ED1C2A] text-center tracking-[-0.07px] leading-[1.4] mt-[8px] lg:mt-[28px]'>정통크림빵</p>
                    </div>
                </section>
            </section>
            {/* Brand Media 섹션 */}
            <section className='overflow-hidden relative bg-[#FFF5F6]'>
                <div
                    className="relative max-w-[1220px] mx-auto w-full px-5 pb-[60px] pt-[36px] lg:pb-[170px] lg:pt-[110px]  z-10">
                    <BrandMedia images={brandMediaImages} theme="cream"/>
                </div>
            </section>
        </main>
    );
};

export default Hotteok;