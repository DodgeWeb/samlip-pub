import {MotionBox} from '@/components/pub/MotionBox';
import {ProductSwiper} from '@/components/pub/ProductSwiper';
import 'swiper/css/bundle';
import {BrandMedia} from '@/components/pub/brand/BrandMedia';

const HiM = () => {

    const brandMediaImages = [
        {
            image: '/img/brand_media/hi-myeon_media_01.jpg',
            link: 'https://www.instagram.com/reel/DNHXVCNP6Lm/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=='
        },
        {
            image: '/img/brand_media/hi-myeon_media_02.jpg',
            link: 'https://www.instagram.com/p/DJi80zYx-zy/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=='
        },
        {
            image: '/img/brand_media/hi-myeon_media_03.jpg',
            link: 'https://www.instagram.com/reel/DE1rl7zvwAr/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=='
        },
        {
            image: '/img/brand_media/hi-myeon_media_04.jpg',
            link: 'https://www.instagram.com/reel/DBiiXFHvUPn/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=='
        },
    ];


    const products = [
        {id: 1, name: '장 수제비', image: '/img/brand/hi-m/hi-m_product_01.png'},
        {id: 2, name: '명인 우동', image: '/img/brand/hi-m/hi-m_product_02.png'},
        {id: 3, name: '장 칼국수', image: '/img/brand/hi-m/hi-m_product_03.png'},
        {id: 4, name: '얼큰 우동', image: '/img/brand/hi-m/hi-m_product_04.png'},
        {id: 5, name: '담백 우동', image: '/img/brand/hi-m/hi-m_product_05.png'},
        {id: 6, name: '홍 비빔냉면', image: '/img/brand/hi-m/hi-m_product_06.png'},
        {id: 7, name: '홍 물냉면', image: '/img/brand/hi-m/hi-m_product_07.png'},
        {id: 8, name: '동치미 물냉면', image: '/img/brand/hi-m/hi-m_product_08.png'},
        {id: 9, name: '홍 쫄면', image: '/img/brand/hi-m/hi-m_product_09.png'},
    ];

    const highlights = [
        {
            title: '일일 7,000상자',
            subtitle: '40개들이 상자 판매량',
            description: '79년과 81년 가장 많이 사랑받은 하이면은 최고 판매량을 기록했는데 일일 40개들이 상자가 7,000개가 판매되기도 하였습니다.',
        },
        {
            title: '송해 ‘하이면 끓여요’',
            subtitle: '광고카피마저 사랑받는 면',
            description: '인기 방송인 송해가 낳은 유행어는 “전국~노래자랑”말고도 또 있다. 바로 “하이면 끓여요”. 1978년 방영되었던 하이면의 광고 카피는 제품 인기만큼이나 대단했다.',
        },
        {
            title: 'SINCE 1974년',
            subtitle: '우리나라 최초의 습면',
            description: '처음 생산된 우동습면 제품으로 출시 당시 ‘소비자가 뽑은 우량상품 콘테스트’에서 인기금상을 수상하기도 했습니다.',
        },
    ];

    return (
        <main className="bg-white">
            {/* 메인 섹션 */}
            <section className='w-full h-[360px] lg:h-[900px] relative overflow-hidden lg:mt-[60px]'>
                <div className='absolute inset-0 z-10 w-full'>
                    <img src="/img/brand/hi-m/hi-m_logo.svg" alt=""
                         className="pt-[52px] mx-auto w-full max-w-[140px] lg:max-w-[420px] lg:pt-[80px]  z-20 absolute left-1/2 -translate-x-1/2"/>
                    <img src="/img/brand/hi-m/hi-m_banner_object.png" alt=""
                         className="hidden lg:block max-w-none object-cover lg:h-full lg:w-full lg:left-1/2 w-[800px] bottom-[-20px] absolute scale-[1.25] left-[calc(60%-800px)] translate-x-1/2 lg:translate-x-[-50%] "/>
                    <img src="/img/brand/hi-m/hi-m_banner_object_mo.png" alt=""
                         className="block object-cover w-full h-full lg:hidden"/>
                </div>
            </section>

            {/* 하이면 - 브랜드 스토리 */}
            <section className='bg-[#ECDDD1] relative w-full overflow-hidden py-9 lg:py-[120px]'>
                {/* 배경 장식 이미지 */}
                <img src="/img/brand/hi-m/hi-m_story_back.svg" alt=""
                     className="absolute inset-0  h-full fill-[#fff] w-[700px] max-w-none lg:w-[100%] object-cover "/>
                <div className='px-5 lg:px-0 max-w-[1080px] mx-auto w-full relative z-10'>
                    <div
                        className='flex flex-col gap-[24px] lg:gap-[80px] w-full lg:flex-row items-center lg:items-start'>
                        {/* Brand Story 제목 */}
                        <h2 className='gt-ultra text-[22px] lg:text-[64px] font-bold text-[#523C2C] tracking-[-0.66px] leading-[1.1] text-center lg:hidden'>Brand
                            Story</h2>
                        {/* 스토리 이미지 */}
                        <MotionBox>
                            <div
                                className='w-full flex-none lg:max-w-[500px] lg:w-[500px] h-[272px] lg:h-auto relative lg:aspect-[5/6]'>
                                <img
                                    src="/img/brand/hi-m/hi-m_story_01.png"
                                    alt="하이면 브랜드 스토리"
                                    className="object-cover w-full h-full"
                                />
                            </div>
                        </MotionBox>

                        <section className='flex flex-col gap-[24px] lg:gap-[40px] items-center lg:items-start w-full'>
                            <h2 className='gt-ultra text-[22px] lg:text-[64px] font-bold text-[#523C2C] tracking-[-0.66px] leading-[1.1] hidden lg:block text-center lg:text-left'>
                                Brand Story
                            </h2>
                            {/* 첫 번째 텍스트 섹션 */}
                            <div className='flex flex-col gap-[8px] items-center  max-w-[320px] lg:max-w-[800px]'>

                                <div
                                    className='text-[12px] lg:text-[18px] text-[#523C2C] text-center lg:text-left leading-[1.6] tracking-[-0.36px]'>
                                    <p className='mb-[16px]'>
                                        하이면은 한국인 입맛에 가장 잘 맞는 대한민국 대표 미식면을 만듭니다.
                                        <br/><br/>
                                        50년 이상 제면 노하우로 만든 튀기지 않아 건강한 면, 전국 진미 특산물을 더해 만든 원재료, 한식 전문가의 비법이 담긴 육수와 장류까지.
                                        <br/><br/>
                                        전국의 미식면을 원하는 장소, 원하는 때에 언제나 쉽게 먹을 수 있도록 한국인의 미식면, 하이면과 함께 전국 팔도 면식여행을 떠나보세요!
                                    </p>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>

            </section>


            {/* 브랜드 히스토리 */}
            <section
                className='relative z-10 mx-auto w-full bg-[#F9F4F0] py-9 lg:py-[120px] lg:pb-[140px] px-5  overflow-hidden'>
                <div className="max-w-[1180px] mx-auto w-full">
                    <h2 className='text-[16px] lg:text-[42px] text-center font-extrabold text-[#523C2C] mb-[24px] lg:mb-[40px] tracking-[-0.66px] lg:tracking-[-1.92px] leading-[1.3]'>하이면<br/>끓여요
                    </h2>

                    <p className="text-center max-w-[280px] lg:max-w-[900px] mx-auto text-[12px] lg:text-[22px] leading-[1.6] lg:leading-9 text-[#523C2C] ">
                        1974년에 처음 생산된 삶은 우동 제품입니다.<br/><br/>
                        1979년에서 1961년 사이에 가장 사랑 받아 최고 판매량은 40개들이 7,000상자까지 판매되었습니다. 74년 출시 당시 월간 ‘소비자’사가 주최하는 ‘소비자가 뽑은
                        우량상품 콘테스트’에서 인기 금상을 차지할 정도로 소비자의 사랑을 받아온 제품입니다. 우리나라 최초로, 습면으로 80년대에는 인기방송 진행자 송해의 “하이면 끓여요”라는
                        광고 카피가 덩달아 유행하기도 했습니다.<br/><br/>
                        현재는 김맛 우동, 해물맛 우동, 어묵 우동 등이 생산되고 있습니다.
                    </p>
                </div>
            </section>


            {/* 브랜드 하이라이트 */}
            <section
                className="relative w-full px-5 lg:px-0 py-[36px] lg:py-[0px] lg:pb-[120px] overflow-hidden bg-[#F9F4F0]">
                <img src="/img/brand/hi-m/hi-m_back_wave.svg" alt=""
                     className='hidden absolute left-0 w-full lg:bottom-0 lg:block'/>
                <img src="/img/brand/hi-m/hi-m_back_wave_mo.svg" alt=""
                     className='absolute bottom-0 left-0 w-full lg:hidden'/>


                <div className="max-w-[1180px] mx-auto w-full relative z-10">
                    <div className="flex flex-col gap-[44px] items-center">
                        {/* Brand Highlights 섹션 */}
                        <div
                            className="flex flex-col gap-[24px] lg:gap-[68px] items-center w-full max-w-[320px] lg:max-w-full">
                            <h2 className="text-[22px] lg:text-[64px] gt-ultra font-bold text-[#523C2C] text-center tracking-[-0.66px] lg:tracking-[-1.92px] leading-[1.3]">
                                Brand Highlights
                            </h2>

                            <div
                                className="grid grid-cols-1 lg:grid-cols-3 gap-[8px] w-full lg:flex-row lg:max-w-[1180px] lg:items-start ">
                                {highlights.map((highlight, index) => (
                                    <MotionBox
                                        key={index}
                                        delay={index * 0.2}
                                        className="bg-[#523C2C] flex flex-col  gap-[10px] ㄴ items-center lg:justify-start justify-center px-[28px] py-[24px] lg:py-[40px]  w-full lg:h-full"
                                    >
                                        <div className="flex flex-col gap-[12px] lg:gap-[21px] items-center w-full">
                                            <h3 className="text-[22px] lg:text-[42px] font-extrabold text-[#F9F4F0] text-center tracking-[-0.66px] lg:tracking-[-1.2px] leading-[1.3] lg:whitespace-nowrap ">
                                                {highlight.title}
                                            </h3>
                                            <div className="w-full h-[1px] bg-[#ECE6E6] opacity-50"></div>
                                            <div
                                                className="flex flex-col gap-[6.632px] lg:gap-[21px] items-center text-[#F9F4F0] text-center">
                                                <p className="text-[14px] lg:text-[18px] font-bold tracking-[-0.42px] lg:tracking-[-0.18px] leading-[1.6]">
                                                    {highlight.subtitle}
                                                </p>
                                                <p className="text-[12px] lg:text-[18px] leading-[1.6] tracking-[-0.36px] lg:tracking-[-0.18px] max-w-[220px] lg:max-w-[320px] text-[#ECDDD1]">
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

            {/* 뒤 이미지 때문에 묵음 */}
            <section className='overflow-hidden relative'>
                {/* 브랜드 제품 */}
                <section className="relative w-full lg:px-0 py-[36px] lg:py-[80px] overflow-hidden bg-[#F5EDE7]">
                    <div className="max-w-[800px] mx-auto w-full relative z-10">
                        <ProductSwiper products={products} aspectRatio="1/2" theme="him"/>
                    </div>
                </section>
            </section>
            {/* Brand Media 섹션 */}
            <section
                className='relative w-full px-5 lg:px-0 py-[36px] lg:py-[80px] overflow-hidden bg-[#F5EDE7]'>
                <div className="relative max-w-[1220px] mx-auto w-full z-10">
                    <BrandMedia images={brandMediaImages} theme="him"/>
                </div>
            </section>
        </main>
    );
};

export default HiM;