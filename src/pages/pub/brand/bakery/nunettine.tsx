import React from 'react';

import {MotionBox} from '@/components/pub/interAtion/MotionBox';
import {ProductSwiper} from '@/components/pub/ProductSwiper';
import {BrandMedia} from '@/components/pub/brand/BrandMedia';

const Nunettine = () => {

// 브랜드 미디어 이미지
    const brandMediaImages = [
        {
            image: '/img/brand_media/nunettine_media_01.jpg',
            link: 'https://www.instagram.com/p/DJJMlX1P2V1/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=='
        },
        {
            image: '/img/brand_media/nunettine_media_02.jpg',
            link: 'https://www.instagram.com/p/DF4yn6wz0GJ/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=='
        },
        {
            image: '/img/brand_media/nunettine_media_03.jpg',
            link: 'https://www.instagram.com/p/Ci9oSq_vpvb/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=='
        },
        {
            image: '/img/brand_media/nunettine_media_04.jpg',
            link: 'https://www.instagram.com/p/CYQsc2fP-Y7/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=='
        },
    ];

// 프로덕트 스와이퍼 제품
    const products = [
        {id: 1, name: '롱스틱 누네띠네', image: '/img/brand/nunettine/product_01.png'},
        {id: 2, name: '미니 누네띠네', image: '/img/brand/nunettine/product_02.png'},
        {id: 3, name: '누네띠네 오리지널', image: '/img/brand/nunettine/product_03.png'},
    ];


    const highlights = [
        {
            title: '일일 8,000상자',
            subtitle: '92년과 93년 판매량',
            description: '고급 이탈리안 파이 개발에 성공하여 파이시장을 강타한 누네띠네는 92년 93년도 일일 8천 상자라는 가장 많은 판매량을 보였습니다.',
        },
        {
            title: '최고의 스타 최수종',
            subtitle: '안방극장 스타의 스낵',
            description: '당시 최고의 안방극장 스타인 최수종을 전속CF 모델로 기용할 정도의 인기를 끌었으며 스낵 시장 진입에 성공하였습니다.',
        },
        {
            title: 'SINCE 1992년',
            subtitle: '대표 스낵류의 출시',
            description: '바삭하면서도 달콤한 맛으로 많은 사랑을 받은 누네띠네는 92년 8월에 생산된 대표적인 스낵류 입니다.',
        },
    ];

    return (
        <main className="bg-white">
            {/* 메인 섹션 */}
            <section className='w-full aspect-[1/1] lg:aspect-[12/6] relative overflow-hidden mt-[40px] lg:mt-[60px]'>
                <div className='absolute inset-0 z-10'>
                    <img src="/img/brand/nunettine/logo.png" alt=""
                         className="pt-[60px] mx-auto w-full max-w-[190px] lg:max-w-[280px] lg:pt-[120px] relative z-10"/>
                    <img src="/img/brand/nunettine/nunettine_banner_object_mo.png" alt=""
                         className="object-cover absolute inset-0 w-full h-full lg:hidden"/>
                    <img src="/img/brand/nunettine/nunettine_banner_object.png" alt=""
                         className="hidden object-cover absolute inset-0 w-full h-full lg:block"/>
                </div>
            </section>

            {/* 브랜드 스토리 - 누네띠네 */}
            <section className='bg-[#FFF8E3] relative w-full overflow-hidden py-[36px] lg:py-[80px]'>
                <div className='px-5 lg:px-0 max-w-[1080px] mx-auto w-full relative z-10'>
                    <div
                        className='flex flex-col gap-[24px] lg:gap-[80px] w-full lg:flex-row items-center lg:items-start'>
                        {/* Brand Story 제목 */}
                        <h2 className='gt-ultra text-[22px] lg:text-[64px] font-bold text-[#ED7100] tracking-[-0.66px] leading-[1.1] text-center lg:hidden'>Brand
                            Story</h2>
                        <p className='text-[18px] lg:text-[22px] text-[#77140C] leading-[1.3] text-center lg:hidden font-bold max-w-[250px] mx-auto'>겹겹이
                            고소하고 맛있는 이탈리안 스타일 스낵, 누네띠네</p>
                        {/* 스토리 이미지 */}
                        <MotionBox>
                            <div
                                className='w-full flex-none lg:max-w-[500px] lg:w-[500px] aspect-[32/27] lg:h-auto relative lg:aspect-[5/6]'>
                                <img
                                    src="/img/brand/nunettine/story_01.png"
                                    alt="삼립호빵 브랜드 스토리"
                                    className="object-cover w-full h-full"/>
                            </div>
                        </MotionBox>
                        <section
                            className='w-full flex flex-col gap-[24px] lg:gap-[40px] items-center lg:items-start w-full'>
                            <h2 className='gt-ultra text-[22px] lg:text-[64px] font-bold text-[#ED7100] tracking-[-0.66px] leading-[1.1] hidden lg:block text-center lg:text-left'>Brand
                                Story</h2>
                            {/* 첫 번째 텍스트 섹션 */}
                            <div
                                className='flex flex-col gap-[8px] lg:gap-[12px] items-center  max-w-[320px] lg:max-w-[800px]'>
                                <p className='text-[36px]  text-[#77140C] text-left lg:block hidden leading-[1.3] font-bold w-full'>겹겹이
                                    고소하고 맛있는 이탈리안 스타일 스낵, 누네띠네</p>
                                <div
                                    className='text-[12px] lg:text-[18px] text-[#77140C] text-center lg:text-left leading-[1.6] tracking-[-0.36px]'>
                                    <p className='leading-[1.5]'>
                                        1992년에 출시한 누네띠네는 이탈리아 대표적인 고급 간식 ‘스폴리아띠네 글라사떼’의 맛과 모양을 그대로 재현한 삼립의 대표 스낵 제품입니다.
                                        <br/>
                                        <br/>
                                        겹겹이 쌓인 바삭한 파이에 얇게 덮인 머랭과 격자무늬 살구 시럽의 달콤한 맛의 조화로 단연 눈에 띄는 누네띠네.
                                        <br/>
                                        <br/>
                                        오랜 시간 동안 친근하면서도 때로는 고급스러운 스낵으로 많은 사랑을 받아 온 누네띠네입니다.
                                    </p>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>

            </section>

            {/* 브랜드 히스토리 */}
            <section className='relative z-10 mx-auto w-full bg-[#FFEDB4] overflow-hidden pb-[52px]'>
                <h2 className='text-[22px] gt-ultra text-center lg:text-[64px] font-bold text-[#ED7100] mb-[20px] pt-[50px]'>Brand
                    History</h2>
                <div className='relative max-w-[380px] lg:max-w-[1080px] mx-auto w-full  z-10'>
                    <img src="/img/brand/nunettine/history_01.png" alt="" className='hidden w-full h-full lg:block'/>
                    <img src="/img/brand/nunettine/history_01_mo.png" alt=""
                         className='block w-full h-full lg:hidden max-w-[300px] mx-auto'/>
                    <div
                        className='absolute inset-0  max-w-[200px] lg:max-w-[630px] mx-auto h-full flex flex-col justify-center items-center'>
                        <h2 className='text-[22px] text-center lg:text-[100px] lg:font-extrabold font-extrabold  text-[#77140C] mb-[4px]'>1992</h2>
                        <p className='text-[12px] lg:text-[22px]  text-center  leading-[1.6] tracking-[-0.36px]'>
                            1992년 8월 처음 생산된 SPC삼립의 대표적인 스낵류 제품 입니다. 고급 이탈리안 파이 개발에 성공한 SPC삼립은 당시 안방극장 스타인 최수종을 CF전속 모델로
                            기용해 적극적인 제품 런칭을 시도, 스낵 시장 진입에 성공했습니다. 누네띠네는 파이 시장을 강타한 빅 히트 제품으로 92년과 93년 가장 많은 판매량을 보였는데 당시
                            최고 판매량은 1일 8,000 상자 였습니다.</p>
                    </div>
                    <img
                        src="/img/brand/nunettine/nunettine_object.png"
                        alt=""
                        className='absolute left-[calc(50%+10px)] -translate-x-1/2 translate-y-1/2  bottom-[20px] w-[150px] lg:translate-x-0 lg:-translate-y-0  lg:w-[400px] lg:bottom-[-5%] lg:right-[-8%] lg:left-auto'
                    />
                </div>
                {/* <img src="/img/brand/nunettine/history_back.svg" alt="" className='lg:block object-cover bottom-[0px] w-full' /> */}

                <img src="/img/brand/nunettine/history_back.svg" alt=""
                     className='hidden object-cover absolute w-[1920px] max-w-none bottom-0 left-1/2 -translate-x-1/2 lg:block'/>
                <div className='absolute h-[240px] lg:h-[430px] bottom-0  overflow-hidden w-full'>
                    <img src="/img/brand/nunettine/history_back_mo.png" alt=""
                         className='block lg:hidden absolute top-0 left-[calc(50%-266px)]  mx-auto  max-w-[300%] w-[651px]'/>
                </div>
            </section>

            {/* 브랜드 하이라이트 */}

            <section className='overflow-hidden relative'>
                {/* 배경 장식 이미지 */}
                <img src="/img/brand/nunettine/highlight_back.svg" alt=""
                     className='absolute left-1/2 -translate-x-1/2 w-full max-w-none lg:w-full top-[0px] z-10'/>
                <section className="relative w-full bg-[#FFF8E3] ">
                    <div className="max-w-[1180px] mx-auto w-full relative z-10 py-[36px] lg:py-[80px]">
                        <div className="flex flex-col gap-[44px] items-center">
                            {/* Brand Highlights 섹션 */}
                            <div
                                className="flex flex-col gap-[24px] lg:gap-[68px] items-center w-full max-w-[320px] lg:max-w-full relative">
                                <h2 className="text-[22px] lg:text-[64px] gt-ultra font-bold text-[#ED7100] text-center tracking-[-0.66px] lg:tracking-[-1.92px] leading-[1.3] ">
                                    Brand Highlights</h2>
                                <div
                                    className="grid grid-cols-1 lg:grid-cols-3 gap-[8px] w-full lg:flex-row lg:max-w-[1180px] lg:items-start ">
                                    {highlights.map((highlight, index) => (
                                        <MotionBox
                                            key={index}
                                            delay={index * 0.2}
                                            className="bg-[#77140C] flex flex-col  gap-[10px] lg:gap-[21px] items-center lg:justify-start justify-center px-[28px] py-[24px] lg:py-[40px]  w-full lg:h-full">
                                            <div className="flex flex-col gap-[12px] lg:gap-[21px] items-center w-full">
                                                <h3 className="text-[22px] lg:text-[42px] font-extrabold text-[#FEE9B0] text-center tracking-[-0.66px] lg:tracking-[-1.26px] leading-[1.3]">
                                                    {highlight.title}
                                                </h3>
                                                <div className="w-full h-[1px] bg-[#FEE9B0] opacity-50"></div>
                                                <div
                                                    className="flex flex-col gap-[6.632px] lg:gap-[21px] items-center text-[#FEE9B0] text-center">
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
                    {/* 뒤 이미지 때문에 묵음 */}
                    <section className=' relative bg-[#FFF8E3]'>
                        {/* 브랜드 제품 */}
                        <section className="relative w-full lg:px-0 py-[36px] lg:py-[80px]">
                            <div className="max-w-[1180px] mx-auto w-full relative z-10">
                                <ProductSwiper products={products} aspectRatio='1/1' theme='nunettine'/>
                            </div>
                        </section>
                    </section>
                </section>
            </section>


            {/* Brand Media 섹션 */}
            <section className='overflow-hidden relative bg-[#FEE9B0] pt-[36px]'>
                <img src="/img/brand/nunettine/brand_media_back.svg" alt=""
                     className='absolute left-1/2 -translate-x-1/2 w-[1000px] max-w-none lg:w-full lg:top-[0px] bottom-[-10px] rotate-180 lg:rotate-0'/>

                <div
                    className="relative max-w-[1220px] mx-auto w-full px-5 pb-[48px] lg:pb-[170px] lg:pt-[110px]  z-10">
                    <BrandMedia images={brandMediaImages} theme="nunettine"/>
                </div>
                <div className='h-[300px] bg-[#fcebb6] absolute bottom-[0px] w-full hidden lg:block'></div>
            </section>
        </main>
    );
};

export default Nunettine;