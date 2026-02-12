import React from 'react';

import {MotionBox} from '@/components/pub/interAtion/MotionBox';
import {ProductSwiper} from '@/components/pub/ProductSwiper';
import {BrandMedia} from '@/components/pub/brand/BrandMedia';

const ReadyB = () => {

// 브랜드 미디어 이미지
    const brandMediaImages = [
        {
            image: '/img/brand_media/readyb_media_01.jpg',
            link: 'https://www.instagram.com/reel/DJWKkELpbMU/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=='
        },
        {
            image: '/img/brand_media/readyb_media_02.jpg',
            link: 'https://www.instagram.com/reel/DIyDXYyRsuC/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=='
        },
        {
            image: '/img/brand_media/readyb_media_03.jpg',
            link: 'https://www.instagram.com/reel/DIvcobTp2u1/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=='
        },
        {
            image: '/img/brand_media/readyb_media_04.jpg',
            link: 'https://www.instagram.com/reel/C86dV5EvTI5/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=='
        },
    ];

// 프로덕트 스와이퍼 제품
    const products = [
        {id: 1, name: '저온숙성 버터 크로와상 바로생지', image: '/img/brand/readyb/product_01.png'},
        {id: 2, name: '저온숙성 블랙 투톤 크로와상 바로생지', image: '/img/brand/readyb/product_02.png'},
        {id: 3, name: '저당단팥모찌붕어빵', image: '/img/brand/readyb/product_03.png'},
        {id: 4, name: '단팥모찌붕어빵', image: '/img/brand/readyb/product_04.png'},
        {id: 5, name: '슈크림모찌붕어빵', image: '/img/brand/readyb/product_05.png'},
        {id: 6, name: '꿀견과모찌붕어빵', image: '/img/brand/readyb/product_06.png'},
        {id: 7, name: '모찌찹쌀 도너츠', image: '/img/brand/readyb/product_07.png'},
        {id: 8, name: '모찌찹쌀 꽈배기', image: '/img/brand/readyb/product_08.png'},
        {id: 9, name: '플레인 베이글', image: '/img/brand/readyb/product_09.png'},
        {id: 10, name: '어니언 베이글', image: '/img/brand/readyb/product_10.png'},
        {id: 11, name: '블루베리 베이글', image: '/img/brand/readyb/product_11.png'},
    ];


    const highlights = [
        {
            title: '① 파베이크',
            subtitle: '빵 반죽을 80~90% 정도만 구운 뒤 급속 냉동한 것으로 오븐 · 에어프라이어로 5분 정도만 조리하면 갓 구운 빵을 먹을 수 있습니다.',
            description: '',
        },
        {
            title: '② 바로생지',
            subtitle: '\u2018바로 생지\u2019는 해동 후에 바로  굽는 RTB(Ready To Bake) 제품으로 발효, 해동 시간을 줄일 수 있어 번거로운 조리 과정 없이 갓 구운 빵을 즐길 수 있습니다.',
            description: '',
        },
    ];

    return (
        <main className="bg-white">
            {/* 메인 섹션 */}
            <section className='w-full aspect-[1/1] lg:aspect-[12/6] relative overflow-hidden mt-[40px] lg:mt-[60px]'>
                <div className='absolute inset-0 z-10'>
                    {/* 브랜드 로고 */}
                    <img src="/img/brand/readyb/logo.png" alt=""
                         className=" mx-auto w-full max-w-[200px] lg:max-w-[500px] absolute left-[50%] translate-x-[-50%] top-[50%] translate-y-[-50%] z-10"/>
                    <img src="/img/brand/readyb/readyb_banner_object_mo.png" alt=""
                         className="object-cover absolute inset-0 w-full h-full lg:hidden"/>
                    <img src="/img/brand/readyb/readyb_banner_object.png" alt=""
                         className="hidden object-cover absolute inset-0 w-full h-full lg:block"/>
                </div>
            </section>

            {/* 브랜드 스토리 - 레디비 */}
            <section className='bg-[#FDEEE6] relative w-full overflow-hidden py-[40px] lg:py-[80px]'>
                <img src="/img/brand/readyb/back_grab.svg" alt=""
                     className='object-cover scale-[2] lg:scale-[1] mx-auto absolute top-0 left-0 w-full h-full opacity-30'/>
                <div className='px-5 lg:px-0 max-w-[1080px] mx-auto w-full relative z-10'>
                    <div
                        className='flex flex-col gap-[24px] lg:gap-[80px] w-full lg:flex-row items-center lg:items-start'>
                        {/* Brand Story 제목 */}
                        <h2 className='gt-ultra text-[22px] lg:text-[64px] font-bold text-[#4B2B23] tracking-[-0.66px] leading-[1.1] text-center lg:hidden'>Brand
                            Story</h2>
                        <p className='text-[18px] lg:text-[22px] text-[#4B2B23] leading-[1.3] text-center lg:hidden font-bold max-w-[250px] mx-auto'>갓
                            구운 빵을 간편하게, ReadyB</p>
                        {/* 스토리 이미지 */}
                        <MotionBox>
                            <div
                                className='w-full flex-none lg:max-w-[500px] lg:w-[500px] aspect-[32/27] lg:h-auto relative lg:aspect-[5/6]'>
                                <img
                                    src="/img/brand/readyb/story_01.png"
                                    alt="삼립호빵 브랜드 스토리"
                                    className="object-cover w-full h-full"/>
                            </div>
                        </MotionBox>
                        <section className='flex flex-col gap-[24px] lg:gap-[40px] items-center lg:items-start w-full'>
                            <h2 className='gt-ultra text-[22px] lg:text-[64px] font-bold text-[#4B2B23] tracking-[-0.66px] leading-[1.1] hidden lg:block text-center lg:text-left'>Brand
                                Story</h2>
                            {/* 첫 번째 텍스트 섹션 */}
                            <div
                                className='flex flex-col gap-[8px] lg:gap-[12px] items-center  max-w-[320px] lg:max-w-[800px]'>
                                <p className='text-[36px]  text-[#4B2B23] text-left lg:block hidden leading-[1.3] font-bold w-full'>갓
                                    구운 빵을 간편하게, ReadyB</p>
                                <div
                                    className='text-[12px] lg:text-[18px] text-[#4B2B23] text-center lg:text-left leading-[1.6] tracking-[-0.36px]'>
                                    <p className='leading-[1.5]'>
                                        레디비는 베이커리 No.1 삼립이 새롭게 선보이는 홈베이커리 브랜드로, 집에서도 간편하게 갓 구운 빵의 즐거움을 경험할 수 있도록 제안합니다.
                                        <br/>
                                        <br/>
                                        <span className='font-bold'>‘가장 맛있는 빵을 가장 빠르게’</span>
                                        <br/>
                                        <br/>
                                        전문 베이커리 매장이나 레스토랑에서 맛볼 수 있는 수준의 제품을 우리의 시간과 노력을 아껴주고자 집에서도 쉽고 자신있게 만들 수 있도록
                                        개발했습니다.
                                        <br/>
                                        <br/>
                                        가장 맛있는 빵은 갓 구운 빵이라는 믿음을 가지고 베이커리 전문가가 만든 갓 구운 바삭한 식사빵과 맛있는 간식빵을 빠르고 간편하게 즐겨보세요!
                                    </p>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>

            </section>


            {/* 브랜드 하이라이트 */}
            <section className='overflow-hidden relative'>
                <section className="relative w-full px-5 lg:px-0  overflow-hidden bg-[#FDEEE6] ">
                    <div className="max-w-[1180px] mx-auto w-full relative z-10 py-[36px] lg:py-[120px]">
                        <div className="flex flex-col gap-[44px] items-center">
                            {/* Brand Highlights 섹션 */}
                            <div
                                className="flex flex-col gap-[24px] lg:gap-[64px] items-center w-full max-w-[320px] lg:max-w-[792px]">
                                <h2 className="text-[16px] lg:text-[32px]  font-extrabold text-[#612300] text-center tracking-[-0.66px]  leading-[1.3] lg:leading-[1.4]  max-w-[250px] lg:max-w-[640px]">
                                    홈베이커리 브랜드 레디비는 집에서도 간편하게 갓 구운 빵의 즐거움을 경험할 수 있도록 다양한 제품군을 운영 중에 있습니다</h2>
                                <div
                                    className="grid grid-cols-1 lg:grid-cols-2  gap-[8px] lg:gap-[20px] max-w-[253px] lg:max-w-full w-full lg:items-start ">
                                    {highlights.map((highlight, index) => (
                                        <MotionBox
                                            key={index}
                                            delay={index * 0.2}
                                            className="bg-[#E65300] flex flex-col  gap-[10px] lg:gap-[21px] items-center lg:justify-start justify-center px-[21px] lg:px-[48px] py-[24px] lg:py-[40px]  w-full lg:h-full">
                                            <div className="flex flex-col gap-[12px] lg:gap-[21px] items-center w-full">
                                                <h3 className="text-[22px] lg:text-[26px] font-extrabold text-[#FFFFFF] text-center tracking-[-0.66px] lg:tracking-[-1.26px] leading-[1.3]">
                                                    {highlight.title}
                                                </h3>
                                                <div className="w-full h-[1px] bg-[#ffffff]"></div>
                                                <div
                                                    className="flex flex-col gap-[6.632px] lg:gap-[21px] items-center font-bold text-[#ECE6E6] text-center">
                                                    <p className="text-[14px] lg:text-[22px] lg:font-medium font-bold tracking-[-0.42px] lg:tracking-[-0.18px] leading-[1.6] lg:text-[#FFFFFF]">
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
            </section>

            <section className='overflow-hidden relative'>
                <section className='bg-[#fcf0e9]'>
                    <section className="relative w-full lg:px-0 pb-[36px] lg:pb-[60px]">
                        <div className="max-w-[1180px] mx-auto w-full relative z-10">
                            <ProductSwiper products={products} aspectRatio='1/1' theme='readyb'/>
                        </div>
                    </section>
                </section>
                {/* Brand Media 섹션 */}
                <section className='overflow-hidden relative bg-[#F7CAB0] pt-[36px]'>
                    <div className='absolute left-0 top-full z-10 bg-[#F7CAB0] w-full h-[]'>

                    </div>
                    <img src="/img/brand/readyb/readyb_back_01.svg" alt=""
                         className='absolute  top-0 left-0 z-10 w-full lg:w-[1920px] max-w-full lg:max-w-none'/>
                    <div
                        className="relative max-w-[1220px] mx-auto w-full px-5 pb-[48px] lg:pb-[200px] lg:pt-[80px]  z-10">
                        <BrandMedia images={brandMediaImages} theme="readyb"/>
                    </div>
                    {/* <div className='h-[500px] bg-[#f7d2b9] absolute bottom-[0px] w-full hidden lg:block'></div> */}
                </section>
            </section>
        </main>
    );
};

export default ReadyB;