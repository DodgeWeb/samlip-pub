import React from 'react';

import {MotionBox} from '@/components/pub/interAtion/MotionBox';
import {ProductSwiper} from '@/components/pub/ProductSwiper';
import {BrandHistory} from '@/components/pub/BrandHistory';
import {BrandMedia} from '@/components/pub/brand/BrandMedia';

const Migak = () => {

    const brandMediaImages = [
        {
            image: '/img/brand_media/meegak_media_01.jpg',
            link: 'https://www.instagram.com/p/DEegZzWR_BX/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=='
        },
        {
            image: '/img/brand_media/meegak_media_02.jpg',
            link: 'https://www.instagram.com/reel/C_c1ZfzPOSH/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=='
        },
        {
            image: '/img/brand_media/meegak_media_03.jpg',
            link: 'https://www.instagram.com/reel/C_NNDhtv6VH/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=='
        },
        {
            image: '/img/brand_media/meegak_media_04.jpg',
            link: 'https://www.instagram.com/p/C76DDyvCcFw/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=='
        },
    ];

    const brandHistoryData = [
        {
            id: 1,
            date: '2019. 05',
            image: '/img/brand/migak/history_01.png',
            title: '프리미엄 베이커리 브랜드 미각제빵소 런칭',
            description: '',
        },
        {
            id: 2,
            date: '2020. 03',
            image: '/img/brand/migak/history_02.png',
            title: "'생(生)식빵' 출시",
            description: '',
        },
        {
            id: 3,
            date: '2020. 05',
            image: '/img/brand/migak/history_03.png',
            title: '런칭 1년 만에 1,600만개 판매',
            description: '',
        },
        {
            id: 4,
            date: '2021. 04',
            image: '/img/brand/migak/history_04.png',
            title: "'스톤밀' 베이커리 신제품 출시",
            description: '',
        },
        {
            id: 5,
            date: '2023. 05',
            image: '/img/brand/migak/history_05.png',
            title: "글로벌 프리미엄 귀리음료 브랜드 '오틀리(OATLY)' 협업 신제품 공개",
            description: '',
        },
        {
            id: 6,
            date: '2023. 05',
            image: '/img/brand/migak/history_06.png',
            title: 'iF 디자인 어워드 패키지 부문 본상 수상',
            description: '',
        },
        {
            id: 7,
            date: '2023. 08',
            image: '/img/brand/migak/history_07.png',
            title: "'가루쌀' 베이커리 출시",
            description: '',
        },
    ];


    const products = [
        {id: 1, name: '초코크림소라빵', image: '/img/brand/migak/product_01.png'},
        {id: 2, name: '더블초코카스테라롤', image: '/img/brand/migak/product_02.png'},
        {id: 3, name: '우유연유카스테라롤', image: '/img/brand/migak/product_03.png'},
        {id: 4, name: '카이막 꿀치즈 케익', image: '/img/brand/migak/product_04.png'},
        {id: 5, name: '버터코코넛 휘낭시에', image: '/img/brand/migak/product_05.png'},
        {id: 6, name: '꾸덕 버터바 파이 황치즈', image: '/img/brand/migak/product_06.png'},

    ];

    return (
        <main className="bg-white">
            {/* 메인 섹션 */}
            <section className='w-full aspect-[1/1] lg:aspect-[12/6] relative overflow-hidden mt-[40px] lg:mt-[60px]'>
                <div className='absolute inset-0 z-10'>
                    <img src="/img/brand/migak/logo.png" alt=""
                         className="absolute w-full max-w-[200px] lg:max-w-[420px] z-20 left-1/2 -translate-x-1/2 top-[56px]"/>
                    <img src="/img/brand/migak/migak_banner_object_mo.png" alt=""
                         className="object-cover absolute inset-0 w-full h-full lg:hidden"/>
                    <img src="/img/brand/migak/migak_banner_object.png" alt=""
                         className="hidden object-cover absolute inset-0 w-full h-full lg:block"/>
                </div>
            </section>


            {/* 브랜드 스토리 - 미각 제빵소 */}
            <section className=' relative bg-[#F4E4C2] w-full overflow-hidden py-[40px] lg:py-[80px]'>
                <img src="/img/brand/migak/migak_story_back.svg" alt=""
                     className='object-cover  lg:scale-[1] absolute top-0 left-0 z-10 size-full'/>
                <div className='px-5 lg:px-0 max-w-[1105px] mx-auto w-full relative z-10'>
                    <div
                        className='flex flex-col gap-[24px] lg:gap-[80px] w-full lg:flex-row items-center lg:items-start'>
                        {/* Brand Story 제목 */}
                        <h2 className='gt-ultra text-[22px] lg:text-[64px] font-bold text-[#6A4431] tracking-[-0.66px] leading-[1.1] text-center lg:hidden'>Brand
                            Story</h2>
                        <p className='text-[18px]  text-[#6A4431] leading-[1.3] text-center lg:hidden font-extrabold tracking-[-0.54px]'>좋은
                            원료, 맛있는 베이커리, 미각제빵소</p>
                        {/* 스토리 이미지 */}
                        <MotionBox>
                            <div
                                className='w-full flex-none lg:max-w-[500px] lg:w-[500px] aspect-[32/27] lg:h-auto relative lg:aspect-[5/6]'>
                                <img
                                    src="/img/brand/migak/story_01.png"
                                    alt="미각제빵소 브랜드 스토리"
                                    className="object-cover w-full h-full"/>
                            </div>
                        </MotionBox>
                        <section className='flex flex-col gap-[24px] lg:gap-[40px] items-center lg:items-start w-full'>
                            <h2 className='gt-ultra text-[22px] lg:text-[64px] font-bold text-[#6A4431] tracking-[-0.66px] leading-[1.1] hidden lg:block text-center lg:text-left'>Brand
                                Story</h2>
                            {/* 첫 번째 텍스트 섹션 */}
                            <div
                                className='flex flex-col gap-[8px] lg:gap-[12px] items-center  max-w-[700px] lg:max-w-[1000px]'>
                                <p className='text-[18px] lg:text-[32px] text-[#6A4431] text-left lg:block hidden leading-[1.3] font-extrabold w-full tracking-[-0.54px]'>좋은
                                    원료, 맛있는 베이커리, 미각제빵소</p>
                                <div
                                    className='text-[12px] lg:text-[18px] text-[#6A4431] text-center lg:text-left leading-[1.6] tracking-[-0.36px]'>
                                    <p className='leading-[1.6] mb-4'>
                                        정통 프리미엄 베이커리 브랜드 미각제빵소는 고민합니다. 어떻게 더 맛있는 빵을 만들어 당신에게 행복을 줄 수 있을지.
                                    </p>
                                    <p className='leading-[1.6] mb-4'>
                                        맛있는 빵을 손에 든 당신의 작지만 큰 행복을 위해 가까운 편의점과 마트에서, 또는 온라인에서 손쉽게 언제 어디에서 보다 맛있는 빵을 만날 수
                                        있게 고민합니다.
                                    </p>
                                    <p className='leading-[1.6] mb-4'>
                                        더 맛있는 빵을 만들기 위한 시도와 노력으로 1등급 밀가루와 리얼 원재료를 담아 가장 적합한 공법으로 고품질의 맛있는, 제대로 만든 빵을
                                        제안합니다.
                                    </p>
                                    <p className='leading-[1.6]'>
                                        좋은 원료로 소비자의 미각을 자극할 '미각제빵소' 좋은 빵을 위한 가장 쉬운 선택, '미각제빵소'입니다.
                                    </p>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </section>

            {/* 브랜드 히스토리 */}
            <section className='relative z-10 mx-auto w-full bg-[#FEFCF9]'>
                <h2 className='text-[22px] gt-ultra text-center lg:text-[64px] font-bold text-[#6A4431] mb-[20px] lg:mb-[60px] pt-[50px]'>Brand
                    History</h2>
                <BrandHistory data={brandHistoryData} theme="migak"/>
            </section>

            {/* 뒤 이미지 때문에 묶음 */}
            <section className='overflow-hidden relative bg-[#FEFCF9]'>
                {/* 브랜드 제품 */}
                <section className="relative w-full lg:px-0 lg:py-[80px] py-[36px] lg:pb-[60px] overflow-hidden">
                    <div className="max-w-[1180px] mx-auto w-full relative z-10">
                        <ProductSwiper products={products} aspectRatio='1/1' theme="migak"/>
                    </div>
                </section>
            </section>

            {/* Brand Media 섹션 */}
            <section className='overflow-hidden relative bg-[#F4E4C2]'>
                <img src="/img/brand/migak/migak_midea_back.svg" alt=""
                     className='hidden absolute top-0 left-0 z-10 lg:block'/>
                <img src="/img/brand/migak/migak_midea_back_mo.svg" alt=""
                     className='absolute top-0 left-0 z-10 lg:hidden'/>
                <div
                    className="relative max-w-[1220px] mx-auto w-full px-5 pb-[48px] pt-[36px] lg:pb-[200px] lg:pt-[80px]  z-20">
                    <BrandMedia images={brandMediaImages} theme="migak"/>
                </div>
            </section>
        </main>
    );
};

export default Migak;