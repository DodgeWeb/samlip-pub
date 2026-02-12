import React, {useState, useRef} from 'react';
import {useRouter} from 'next/router';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Navigation} from 'swiper/modules';
import type {Swiper as SwiperType} from 'swiper';
import {Icon} from '@/components/pub/icons';
import {MotionBox} from '@/components/pub/interAtion/MotionBox';
import {ProductSwiper} from '@/components/pub/ProductSwiper';
import {BrandHistory} from '@/components/pub/BrandHistory';
import 'swiper/css/bundle';
import {BrandMedia} from '@/components/pub/brand/BrandMedia';

const Hotteok = () => {
    const router = useRouter();
    const [brandMediaSwiper, setBrandMediaSwiper] = useState<SwiperType | null>(null);
    const brandMediaPrevRef = useRef<HTMLButtonElement>(null);
    const brandMediaNextRef = useRef<HTMLButtonElement>(null);
    const [currentMediaIndex, setCurrentMediaIndex] = useState(0);

    const brandMediaImages = [
        {
            image: '/img/brand_media/honey-pancake_media_01.jpg',
            link: 'https://www.instagram.com/p/DH5X-dORuxk/'
        },
        {
            image: '/img/brand_media/honey-pancake_media_02.jpg',
            link: 'https://www.instagram.com/p/C_6kvnlJhT8/'
        },
        {
            image: '/img/brand_media/honey-pancake_media_03.jpg',
            link: 'https://www.instagram.com/reel/C-cxyGjPC3T/'
        },
        {
            image: '/img/brand_media/honey-pancake_media_04.jpg',
            link: 'https://www.instagram.com/p/C-RSB5RTj0r/'
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
            title: '일일 12,000상자',
            subtitle: '70개들이 상자 판매량',
            description: '인기 장수 상품인 꿀호떡은 74년과 75년 최고 판매량을 기록했는데 일일 70개들이 상자가 12,000개가 판매되기도 한 인기 제품입니다.',
        },
        {
            title: '4개월',
            subtitle: '거리의 호떡을 삼립호떡으로',
            description: '길거리에서 판매하는 호떡을 제품화한 것으로 4개월간의 개발 기간을 거쳐 제품화하는 데 성공하였습니다.',
        },
        {
            title: 'SINCE 1974년',
            subtitle: '삼립호떡이 사랑받은 기간',
            description: '1974년 가리봉 공장에서 생산된 삼립호떡은 현재도 꾸준히 판매되고 있는 상품입니다.',
        },
    ];

    return (
        <main className="bg-white">
            {/* 메인 섹션 */}
            <section
                className='w-full h-[400px] lg:h-[800px] bg-[#FDF2D9] relative overflow-hidden mt-[40px] lg:mt-[60px]'>
                <div className='absolute inset-0 z-10 w-full'>
                    <img src="/img/brand/hotteok/hotteok_logo.svg" alt=""
                         className="pt-[40px] mx-auto w-full max-w-[200px] lg:max-w-[480px] lg:pt-[80px]"/>
                    <img src="/img/brand/hotteok/hotteok_banner_object.png" alt=""
                         className=" max-w-none object-cover lg:w-full lg:left-1/2 w-[800px] bottom-[-20px] absolute scale-125 left-[calc(60%-900px)] translate-x-1/2 lg:translate-x-[-50%]  lg:scale-100 lg:bottom-[calc(50%-100px)] lg:translate-y-[50%]"/>
                </div>
            </section>

            {/* 호떡 - 브랜드 스토리 */}
            <section className='bg-[#930000] relative w-full overflow-hidden py-[40px] lg:py-[80px]'>
                {/* 배경 장식 이미지 */}
                <img src="/img/brand/hotteok/hotteok_story_back.svg" alt=""
                     className="absolute inset-0 -top-[20px] h-full fill-[#fff] w-[100%] scale-[5] opacity-60  "/>
                <div className='px-5 lg:px-0 max-w-[1080px] mx-auto w-full relative z-10'>
                    <div
                        className='flex flex-col gap-[24px] lg:gap-[80px] w-full lg:flex-row items-center lg:items-start'>
                        {/* Brand Story 제목 */}
                        <h2 className='gt-ultra text-[22px] lg:text-[64px] font-bold text-[#ECE6E6] tracking-[-0.66px] leading-[1.1] text-center lg:hidden'>Brand
                            Story</h2>
                        {/* 스토리 이미지 */}
                        <MotionBox>
                            <div
                                className='w-full flex-none lg:max-w-[500px] lg:w-[500px] h-[272px] lg:h-auto relative lg:aspect-[5/6]'>
                                <img
                                    src="/img/brand/hotteok/hotteok_story_01.png"
                                    alt="삼립호빵 브랜드 스토리"
                                    className="object-cover w-full h-full"
                                />
                            </div>
                        </MotionBox>
                        <section className='flex flex-col gap-[24px] lg:gap-[40px] items-center lg:items-start w-full'>
                            <h2 className='gt-ultra text-[22px] lg:text-[64px] font-bold text-[#ECE6E6] tracking-[-0.66px] leading-[1.1] hidden lg:block text-center lg:text-left'>
                                Brand Story
                            </h2>
                            {/* 첫 번째 텍스트 섹션 */}
                            <div className='flex flex-col gap-[8px] items-center  max-w-[320px] lg:max-w-[800px]'>

                                <div
                                    className='text-[12px] lg:text-[18px] text-[#FFFFFF] text-center lg:text-left leading-[1.6] tracking-[-0.36px]'>
                                    <p className='mb-[16px]'>
                                        겨울철 길거리에서 팔던 호떡을 오븐에 구워 국내 최초로 집에서도 간편하게 즐기게 한 삼립호떡은 ‘호떡’과는 또 다른 매력을 선사합니다.
                                        <br/><br/>
                                        삼립호떡은 1974년부터 지금까지 언제 어디서나 가장 간편하게 그리고 남녀노소 누구에게나 맛있는 즐거움을 주는 국민 간식의 대명사로
                                        자리잡았습니다.
                                        <br/><br/>
                                        간편하지만 다채로운 즐거움 시간으로 빚어진 국내산 꿀잼의 노하우- 삼립호떡은 가장 맛있고 가장 가까이에서 가장 간편하게 꿀맛 가득한 즐거움으로
                                        당신의 입안을 다채롭게 채워갑니다.
                                    </p>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>

            </section>


            {/* 브랜드 히스토리 */}
            <section
                className='relative z-10 mx-auto w-full bg-[#fdf2d9] px-5 lg:px-0 py-[36px] lg:py-0 overflow-hidden'>
                <div className="max-w-[1180px] mx-auto w-full">
                    <h2 className='text-[22px] lg:text-[64px] gt-ultra text-center font-bold text-[#77140c] mb-[24px] lg:mb-0 pt-0 lg:pt-[60px] tracking-[-0.66px] lg:tracking-[-1.92px] leading-[1.3]'>Brand
                        History</h2>

                    <div
                        className="flex flex-col lg:flex-row gap-[8px] items-start lg:items-stretch w-full lg:mt-[68px] lg:gap-[20px]">
                        {/* 1974년 카드 */}
                        <div className="flex flex-col w-full lg:w-[580px]">
                            <div
                                className="bg-[#F2E3C2] h-[70px] lg:h-[172px] flex items-center justify-center relative overflow-hidden">
                                <img src="/img/brand/hotteok/hotteok_story_back.svg" alt=""
                                     className="absolute top-0 left-0 w-full h-full scale-[5] lg:scale-[3]"
                                     style={
                                         {filter: 'brightness(0) saturate(100%) invert(84%) sepia(2%) saturate(2939%) hue-rotate(349deg) brightness(115%) contrast(98%)'}
                                     }
                                />
                                <p className="z-10 relative text-[28px] lg:text-[100px] font-extrabold lg:font-black text-[#77140c] tracking-[-0.84px] lg:tracking-[-3px] leading-[1.3]">
                                    1974
                                </p>
                            </div>
                            <div
                                className="bg-white  flex items-center justify-center px-[43px] py-[20px] lg:py-0 lg:h-[342px]">
                                <p className="text-[12px] lg:text-[22px] text-black text-center leading-[1.6] tracking-[-0.36px] lg:tracking-[-0.22px] w-full lg:w-[500px]">
                                    1974년 가리봉 공장에서 처음 생산된 삼립호떡은 길거리에서 판매하는 호떡을 3-4개월 간의 실험을 거쳐 제품화한 것으로 삼립의 대표 장수 상품 중
                                    하나입니다. 74년과 75년에 최고 판매량을 기록했는데 당시 일일 70개들이 상자가 12,000개가 나갔습니다.
                                </p>
                            </div>
                        </div>

                        {/* 2024년 카드 */}
                        <div className="flex flex-col w-full lg:w-[580px]">
                            <div
                                className="bg-[#77140c] h-[70px] lg:h-[172px] flex items-center justify-center relative overflow-hidden ">
                                <img src="/img/brand/hotteok/hotteok_story_back.svg" alt=""
                                     className="absolute top-0 left-0 w-full h-full scale-[5] lg:scale-[3]"
                                     style={

                                         {filter: 'brightness(0) saturate(100%) invert(21%) sepia(70%) saturate(1816%) hue-rotate(338deg) brightness(97%) contrast(87%)'}
                                     }
                                />
                                <p className=" z-10 relative text-[28px] lg:text-[100px] font-extrabold lg:font-black text-[#fdf2d9] tracking-[-0.84px] lg:tracking-[-3px] leading-[1.3]">
                                    2024
                                </p>
                            </div>
                            <div
                                className="bg-white  flex items-center justify-center px-[43px] py-[20px] lg:py-0 lg:h-[342px]">
                                <p className="text-[12px] lg:text-[22px]  text-black text-center leading-[1.6] tracking-[-0.36px] lg:tracking-[-0.22px] w-full lg:w-[500px]">
                                    글로벌도 반한 '삼립호떡'은 출시 50주년을 맞이해 tvN &lt;서진이네2&gt; PPL을 통하여 다양한 호떡 레시피를 선보였으며, 이 레시피를
                                    모티브로 한 신제품은 역대 최고 매출을 달성했습니다.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            {/* 브랜드 하이라이트 */}
            <section
                className="relative w-full px-5 lg:px-0 py-[36px] lg:py-[80px] lg:pt-[89px] lg:pb-[56px] overflow-hidden bg-[#fdf2d9]">
                <div className="max-w-[1180px] mx-auto w-full relative z-10">
                    <div className="flex flex-col gap-[44px] items-center">
                        {/* Brand Highlights 섹션 */}
                        <div
                            className="flex flex-col gap-[24px] lg:gap-[68px] items-center w-full max-w-[320px] lg:max-w-full">
                            <h2 className="text-[22px] lg:text-[64px] gt-ultra font-bold text-[#77140c] text-center tracking-[-0.66px] lg:tracking-[-1.92px] leading-[1.3]">
                                Brand Highlights
                            </h2>

                            <div
                                className="grid grid-cols-1 lg:grid-cols-3 gap-[8px] w-full lg:flex-row lg:max-w-[1180px] lg:items-start ">
                                {highlights.map((highlight, index) => (
                                    <MotionBox
                                        key={index}
                                        delay={index * 0.2}
                                        className="bg-[#77140C] flex flex-col  gap-[10px] lg:gap-[21px] items-center lg:justify-start justify-center px-[28px] py-[24px] lg:py-[40px]  w-full lg:h-full"
                                    >
                                        <div className="flex flex-col gap-[12px] lg:gap-[21px] items-center w-full">
                                            <h3 className="text-[22px] lg:text-[42px] font-extrabold text-white text-center tracking-[-0.66px] lg:tracking-[-1.26px] leading-[1.3]">
                                                {highlight.title}
                                            </h3>
                                            <div className="w-full h-[1px] bg-[#ECE6E6] opacity-50"></div>
                                            <div
                                                className="flex flex-col gap-[6.632px] lg:gap-[21px] items-center text-[#fbfae7] text-center">
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

            {/* 뒤 이미지 때문에 묶음 */}
            <section className='overflow-hidden relative'>
                {/* 브랜드 제품 */}
                <section className="relative w-full lg:px-0 py-[36px] lg:pb-[60px] overflow-hidden">
                    <div className="max-w-[1180px] mx-auto w-full relative z-10">
                        <ProductSwiper products={products} aspectRatio="1/1" theme="hotteok"/>
                    </div>
                </section>
            </section>
            {/* Brand Media 섹션 */}
            <section className='overflow-hidden relative pt-[36px]'>
                <img src="/img/brand/hotteok/hotteok_back_01.svg" alt=""
                     className='absolute w-[1200px] max-w-none bottom-0 lg:top-[20px] left-0 lg:w-full'/>
                <div
                    className="relative max-w-[1220px] mx-auto w-full px-5 pb-[60px] lg:pb-[170px] lg:pt-[110px]  z-10">
                    <BrandMedia images={brandMediaImages} theme="hotteok"/>
                </div>
            </section>
        </main>
    );
};

export default Hotteok;