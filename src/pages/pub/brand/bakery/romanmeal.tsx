import React from 'react';

import {MotionBox} from '@/components/pub/MotionBox';
import {ProductSwiper} from '@/components/pub/ProductSwiper';
import {BrandHistory} from '@/components/pub/BrandHistory';
import {BrandMedia} from '@/components/pub/brand/BrandMedia';

const Romanmeal = () => {

    const brandMediaImages = [
        {
            image: '/img/brand_media/roman-meal_media_01.jpg',
            link: 'https://www.instagram.com/reel/Csh-oS8t_I0/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=='
        },
        {
            image: '/img/brand_media/roman-meal_media_02.jpg',
            link: 'https://www.instagram.com/reel/CqusSaZLGKt/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=='
        },
        {
            image: '/img/brand_media/roman-meal_media_03.jpg',
            link: 'https://www.instagram.com/reel/Cp2G4X_MBII/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=='
        },
    ];

    const brandHistoryData = [
        {
            id: 1,
            date: '2016. 03.',
            image: '/img/brand/romanmeal/history_01.png',
            title: '천연효모 로만밀 통밀식빵 출시, 1개월만에 100만봉 판매',
            description: '',
        },
        {
            id: 2,
            date: '2019. 12.',
            image: '/img/brand/romanmeal/history_02.png',
            title: '통밀빵 카테고리 확대',
            description: '',
        },
        {
            id: 3,
            date: '2020. 05.',
            image: '/img/brand/romanmeal/history_03.png',
            title: '로만밀 나쵸 출시',
            description: '',
        },
    ];


    const products = [
        {id: 1, name: '로만밀 통밀식빵', image: '/img/brand/romanmeal/product_01.png'},
        {id: 2, name: '로만밀 곡물식빵', image: '/img/brand/romanmeal/product_02.png'},
        {id: 3, name: '로만밀 샌드위치브레드', image: '/img/brand/romanmeal/product_03.png'},
    ];

    return (
        <main className="bg-white">
            {/* 메인 섹션 */}
            <section className='w-full aspect-[1/1] lg:aspect-[12/6] relative overflow-hidden mt-[40px] lg:mt-[60px]'>
                <div className='absolute inset-0 z-10'>
                    <img src="/img/brand/romanmeal/logo.png" alt=""
                         className="absolute max-w-[200px] lg:max-w-[420px] left-[50%] translate-x-[-50%] top-[50%] lg:top-1/2 translate-y-[-50%] z-10"/>
                    <img src="/img/brand/romanmeal/romanmeal_banner_object_mo.png" alt=""
                         className="object-cover absolute inset-0 w-full h-full lg:hidden"/>
                    <img src="/img/brand/romanmeal/romanmeal_banner_object.png" alt=""
                         className="hidden object-cover absolute inset-0 w-full h-full lg:block"/>
                </div>
            </section>

            <section className='bg-[#4F2C1D] relative'>
                <img src="/img/brand/romanmeal/romanmeal_back.svg" alt=""
                     className='absolute left-1/2 -translate-x-1/2 w-full lg:w-full top-[0px] z-10'/>
                {/* 브랜드 스토리 - 로만밀 */}
                <section className=' relative  w-full py-[40px] lg:py-[80px]'>
                    <div className='px-5 lg:px-0 max-w-[1080px] mx-auto w-full relative z-10'>
                        <div
                            className='flex flex-col gap-[24px] lg:gap-[80px] w-full lg:flex-row items-center lg:items-start'>
                            {/* Brand Story 제목 */}
                            <h2 className='gt-ultra text-[22px] lg:text-[64px] font-bold text-[#F5A800] tracking-[-0.66px] leading-[1.1] text-center lg:hidden'>Brand
                                Story</h2>
                            <p className='text-[18px] lg:text-[22px] text-[#e9d8b7] leading-[1.5] text-center lg:hidden font-bold'>로마병사의
                                식단에서 찾은 건강 비법!</p>
                            {/* 스토리 이미지 */}
                            <MotionBox>
                                <div
                                    className='w-full flex-none lg:max-w-[500px] lg:w-[500px] aspect-[20/17] lg:h-auto relative lg:aspect-[5/6]'>
                                    <img
                                        src="/img/brand/romanmeal/story_01.png"
                                        alt="로만밀 브랜드 스토리"
                                        className="hidden object-cover w-full h-full lg:block"/>
                                    <img
                                        src="/img/brand/romanmeal/story_01_mo.jpg"
                                        alt="로만밀 브랜드 스토리"
                                        className="object-cover w-full h-full lg:hidden"/>
                                </div>
                            </MotionBox>
                            <section
                                className='flex flex-col gap-[24px] lg:gap-[40px] items-center lg:items-start w-full'>
                                <h2 className='gt-ultra text-[22px] lg:text-[64px] font-bold text-[#f5a800] tracking-[-0.66px] leading-[1.1] hidden lg:block text-center lg:text-left'>Brand
                                    Story</h2>
                                {/* 첫 번째 텍스트 섹션 */}
                                <div
                                    className='flex flex-col gap-[8px] lg:gap-[12px] items-center  max-w-[320px] lg:max-w-[800px]'>
                                    <p className='text-[18px] lg:text-[22px] text-[#e9d8b7] text-left lg:block hidden leading-[1.5] font-bold w-full'>로마병사의
                                        식단에서 찾은 건강 비법!</p>
                                    <div
                                        className='text-[12px] lg:text-[18px] text-[#e9d8b7] text-center lg:text-left leading-[1.6] tracking-[-0.36px]'>
                                        <p className='leading-[1.5] mb-4'>
                                            통밀로 채우는 로마병사의 힘, 로만밀 통밀빵
                                        </p>
                                        <p className='leading-[1.5] mb-4'>
                                            '삼립 로만밀 통밀빵'은 80여 년의 제빵 노하우를 가진 SPC삼립과 100여 년 전통을 가진 통곡물 전문 원료사 '로만밀'이 만나
                                            탄생한 맛있고 건강한 '통밀빵 전문 브랜드'로 2016년 런칭했습니다.
                                        </p>
                                        <p className='leading-[1.5] mb-4'>
                                            내과 의사였던 Robert Jackson 박사는 로마 병사의 힘과 건강의 비결이 매일 밀과 호밀 등의 통곡물을 섭취했다는 것에 착안하여
                                            건강한 제빵회사 '로만밀'을 탄생시켰습니다.
                                        </p>
                                        <p className='leading-[1.5] mb-4'>
                                            고단백과 고식이섬유가 함유된 건강한 로만밀에 SPC삼립만의 좋은 맛과 풍미, 식감을 더해 건강하고 맛있는 빵을 선보입니다.
                                        </p>
                                        <p className='leading-[1.5]'>
                                            로마병사가 주는 통밀의 지혜로 든든한 하루를 꽉 채워보세요!
                                        </p>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>

                </section>

                {/* 브랜드 히스토리 */}
                <section className='relative z-10 mx-auto w-full'>
                    <h2 className='text-[22px] gt-ultra text-center lg:text-[64px] font-bold text-[#F5A800] mb-[20px] lg:mb-[60px] pt-[50px]'>Brand
                        History</h2>
                    <BrandHistory data={brandHistoryData} theme="romanmeal"/>
                </section>
            </section>


            {/* 뒤 이미지 때문에 묵음 */}
            <section className='overflow-hidden relative bg-[#4F2C1D]'>
                {/* 브랜드 제품 */}
                <section className="relative w-full lg:px-0 py-[36px] lg:pb-[60px] overflow-hidden">
                    <div className="max-w-[1180px] mx-auto w-full relative z-10">
                        <ProductSwiper products={products} aspectRatio='1/1' theme="romanmeal"/>
                    </div>
                </section>
            </section>

            {/* Brand Media 섹션 */}
            <section className='overflow-hidden relative bg-[#4f2c1d] pt-[36px]'>

                <img src="/img/brand/romanmeal/romanmeal_back_02.svg" alt=""
                     className='absolute lg:w-full w-[1200px] max-w-none lg:max-w-full bottom-0 left-1/2 -translate-x-1/2 lg:bottom-[210px]  z-10'
                />
                <div className='h-[300px] bg-[#3D1909] absolute bottom-[0px] w-full hidden lg:block z-[10]'></div>
                <div
                    className="relative max-w-[1220px] mx-auto w-full px-5 pb-[60px] lg:pb-[170px] lg:pt-[110px]  z-20">
                    <BrandMedia images={brandMediaImages} theme="romanmeal"/>
                </div>
            </section>
        </main>
    );
};

export default Romanmeal;