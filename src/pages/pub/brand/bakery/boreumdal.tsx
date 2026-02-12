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

const Boreumdal = () => {
    const router = useRouter();
    const [brandMediaSwiper, setBrandMediaSwiper] = useState<SwiperType | null>(null);
    const brandMediaPrevRef = useRef<HTMLButtonElement>(null);
    const brandMediaNextRef = useRef<HTMLButtonElement>(null);
    const [currentMediaIndex, setCurrentMediaIndex] = useState(0);

    const brandHistoryData = [
        {
            id: 1,
            date: '1976. 09',
            image: '/img/brand/boreumdal/history_01.png',
            title: '보름달 출시',
            description: '',
        },
        {
            id: 2,
            date: '2007',
            image: '/img/brand/boreumdal/history_02.png',
            title: '',
            description: '',
        },
        {
            id: 3,
            date: '2012',
            image: '/img/brand/boreumdal/history_03.png',
            title: '',
            description: '',
        },
        {
            id: 4,
            date: '2019',
            image: '/img/brand/boreumdal/history_04.png',
            title: '',
            description: '',
        },
        {
            id: 5,
            date: '2023',
            image: '/img/brand/boreumdal/history_05.png',
            title: '',
            description: '',
        },
        {
            id: 6,
            date: '2023. 02',
            image: '/img/brand/boreumdal/history_06.png',
            title: '보름이 캐릭터 리뉴얼, 신제품 출시',
            description: '',
        },
        {
            id: 7,
            date: '2023. 02',
            image: '/img/brand/boreumdal/history_07.png',
            title: '보름달 브랜드 영상 제작',
            description: '',
        },
        {
            id: 8,
            date: '2023. 03',
            image: '/img/brand/boreumdal/history_08.png',
            title: '리뉴얼 출시 50일 만에 600만개 판매 돌파',
            description: '',
        },
        {
            id: 9,
            date: '2024. 01',
            image: '/img/brand/boreumdal/history_09.png',
            title: '럭키치즈 보름달 출시 신년 프로모션 진행',
            description: '띠부씰 인증 이벤트',
        },
        {
            id: 10,
            date: '2024. 08',
            image: '/img/brand/boreumdal/history_10.png',
            title: '대보름달 출시 및 이벤트',
            description: '',
        },
    ];

    const brandMediaImages = [
        {
            image: '/img/brand_media/full-moon-cake_media_01.jpg',
            link: 'https://www.instagram.com/p/C5Npw8csbJl/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=='
        },
        {
            image: '/img/brand_media/full-moon-cake_media_02.jpg',
            link: 'https://www.instagram.com/p/C2ZSp8BNM6e/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=='
        },
        {
            image: '/img/brand_media/full-moon-cake_media_03.jpg',
            link: 'https://www.instagram.com/p/C1oEDKnxM_S/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=='
        },
        {
            image: '/img/brand_media/full-moon-cake_media_04.jpg',
            link: 'https://www.instagram.com/p/Cy2w_YDvtmB/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=='
        },
    ];


    const products = [
        {id: 1, name: '정통 보름달', image: '/img/brand/boreumdal/product_01.png'},
        {id: 2, name: '생크림 보름달', image: '/img/brand/boreumdal/product_02.png'},
        {id: 3, name: '초코 보름달', image: '/img/brand/boreumdal/product_03.png'},
        {id: 4, name: '꼬마 보름달', image: '/img/brand/boreumdal/product_04.png'},
    ];

    const historyItems = [
        {year: '1971. 10', title: '호빵 출시', description: '1년 여의 연구개발 끝에 탄생'},
        {year: '1972', title: '찜통 공급', description: '판매처에 공급'},
        {year: '2018. 11', title: '윈터레스팅 캠페인', description: '이모티콘 증정, 비욘드 클로젯과 콜라보한 파자마 증정'},
    ];

    const highlights = [
        {
            title: '일일 10,000상자',
            subtitle: '77년과 78년 판매량',
            description: '동그란 빵 모양과 달나라 토끼가 방아를 찧고 있는 패키지 디자인이 인상적인 보름달은 일일 1만 상자의 판매량을 기록하며 최고의 인기를 누린 제품입니다.',
            bgColor: '#86cbc0',
            cardBgColor: '#bae3f8',
            borderColor: '#00a3ab',
        },
        {
            title: '24시간',
            subtitle: '엄청난 인기로 생산라인 풀가동',
            description: '출시와 동시에 예상치를 뛰어넘는 주문이 몰리며 생산라인이 24시간 풀가동될 만큼 큰 사랑을 받았습니다. 지금도 꾸준히 사랑받는 삼립의 대표 스테디셀러로, \'국민 간식\'으로 자리매김했습니다.',
            bgColor: '#aed7f3',
            cardBgColor: '#f5fafe',
            borderColor: '#49abe2',
        },
        {
            title: 'SINCE 1976년',
            subtitle: '보름달이 사랑받은 기간',
            description: '1976년에 출시하여 현재도 판매하고 있는 맛과 추억의 제품입니다. 세월이 흘러도 변함없는 포근한 정서로, 남녀노소 누구에게나 어린 시절의 추억을 떠올리게 하는 제품입니다.',
            bgColor: '#f5b3c2',
            cardBgColor: '#f9d2d5',
            borderColor: '#e1425d',
        },
    ];

    return (
        <main className="bg-white">
            {/* 메인 섹션 */}
            <section className='w-full aspect-[1/1] lg:aspect-[12/5]  relative overflow-hidden mt-[40px] lg:mt-[60px]'>
                <div className='absolute inset-0 z-10 w-full h-full'>
                    <img src="/img/brand/boreumdal/logo.svg" alt=""
                         className="absolute left-[50%] translate-x-[-50%] top-[50%] translate-y-[-50%] mx-auto w-full max-w-[250px] lg:max-w-[480px] z-20 "/>
                    <img src="/img/brand/boreumdal/banner_object_mo.png" alt=""
                         className="object-cover absolute inset-0 w-full h-full lg:hidden"/>
                    <img src="/img/brand/boreumdal/banner_object.png" alt=""
                         className="hidden object-cover absolute inset-0 w-full h-full lg:block"/>
                </div>
            </section>

            {/* 호떡 - 브랜드 스토리 */}
            <section className='relative w-full  py-[36px] lg:py-[91px] overflow-hidden bg-[#FFFDDB] lg:bg-white'>
                <img src="/img/brand/boreumdal/brand_stroy_back_pc.svg" alt=""
                     className="hidden object-cover absolute top-0 left-1/2 w-full h-full scale-125 -translate-x-1/2 lg:block"/>
                <img src="/img/brand/boreumdal/brand_stroy_back_mo.svg" alt=""
                     className="object-cover absolute top-0 left-1/2 w-full h-full -translate-x-1/2 lg:hidden"/>
                <div className='px-5 lg:px-0 max-w-[1080px] mx-auto w-full relative z-10'>
                    <div
                        className='flex flex-col gap-[24px] lg:gap-[80px] w-full lg:flex-row items-center lg:items-start'>
                        {/* Brand Story 제목 */}
                        <h2 className='gt-ultra text-[22px] lg:text-[64px] font-bold text-[#4A3135] tracking-[-0.66px] leading-[1.1] text-center lg:hidden'>Brand
                            Story</h2>
                        <p className='text-[18px] lg:text-[22px] text-[#4A3135] text-center lg:hidden font-bold'>일상 속
                            행운을 담은 보름달</p>
                        {/* 스토리 이미지 */}
                        <MotionBox>
                            <div
                                className='w-full flex-none lg:max-w-[500px] lg:w-[500px] aspect-[32/27] lg:h-auto relative lg:aspect-[5/6]'>
                                <img
                                    src="/img/brand/boreumdal/story_01.png"
                                    alt="삼립호빵 브랜드 스토리"
                                    className="object-cover w-full h-full"/>
                            </div>
                        </MotionBox>
                        <section className='flex flex-col gap-[24px] lg:gap-[40px] items-center lg:items-start w-full'>
                            <h2 className='gt-ultra text-[22px] lg:text-[64px] font-bold text-[#4A3135] tracking-[-0.66px] leading-[1.1] hidden lg:block text-center lg:text-left'>Brand
                                Story</h2>
                            {/* 첫 번째 텍스트 섹션 */}
                            <div
                                className='flex flex-col gap-[8px] lg:gap-[12px] items-center  max-w-[320px] lg:max-w-[800px]'>
                                <p className='text-[36px]  text-[#4A3135] text-left lg:block hidden leading-[1.3] font-bold w-full'>일상
                                    속 행운을 담은 보름달 </p>
                                <div
                                    className='text-[12px] lg:text-[18px] text-[#4A3135] text-center lg:text-left leading-[1.6] tracking-[-0.36px]'>
                                    <p className='leading-[1.5]'>
                                        크고 둥근 보름달 모양의 폭신폭신한 케이크 사이에 상큼 달콤한 크림 가득!
                                        <br/>
                                        <br/>
                                        1976년 출시한 보름달은 방아를 찧는 달토끼가 눈을 사로잡는 헤리티지 케이크류 제품입니다.
                                        <br/>
                                        <br/>
                                        우유 한 잔에 곁들이면 입안 가득 퍼지는 풍성함. 그 때 그 시절 맛과 추억을 새록새록 불러일으키는 보름달. 40여 년 넘는 세월 동안 변함없는
                                        맛, 보름달을 즐기세요.


                                    </p>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </section>

            {/* 브랜드 히스토리 */}
            <section className='relative z-10 mx-auto w-full bg-[#FFFDDB] overflow-hidden py-[36px]'>
                {/* SVG 필터 정의 */}
                <svg className="absolute w-0 h-0">
                    <defs>
                        <filter id="brushTexture">
                            <feTurbulence
                                type="fractalNoise"
                                baseFrequency="0.9"
                                numOctaves="4"
                                result="noise"
                            />
                            <feDisplacementMap
                                in="SourceGraphic"
                                in2="noise"
                                scale="3"
                                result="displacement"
                            />
                            <feGaussianBlur
                                in="displacement"
                                stdDeviation="1"
                                result="blur"
                            />
                        </filter>
                    </defs>
                </svg>

                {/* 배경 장식 이미지 */}
                <h2 className='text-[22px] gt-ultra text-center lg:text-[64px] font-bold text-[#E45356] mb-[24px] z-10 relative'>Brand
                    History</h2>
                <img src="/img/brand/boreumdal/heart_back.png" alt=""
                     className='object-cover absolute top-0 left-0 w-full h-full'/>
                <div className='mx-5 max-w-[1180px] lg:mx-auto'>
                    <BrandHistory data={brandHistoryData} theme="boreumdal"/>
                </div>
            </section>


            {/* 브랜드 하이라이트 */}
            <section className="relative w-full px-5 lg:px-0 py-[36px] lg:py-[80px] overflow-hidden bg-white">
                {/* SVG 필터 정의 */}
                <svg className="absolute w-0 h-0">
                    <defs>
                        <filter id="brushTextureHighlights">
                            <feTurbulence
                                type="fractalNoise"
                                baseFrequency="0.9"
                                numOctaves="4"
                                result="noise"
                            />
                            <feDisplacementMap
                                in="SourceGraphic"
                                in2="noise"
                                scale="3"
                                result="displacement"
                            />
                            <feGaussianBlur
                                in="displacement"
                                stdDeviation="1"
                                result="blur"
                            />
                        </filter>
                    </defs>
                </svg>

                <div className="max-w-[1180px] mx-auto w-full relative z-10">
                    <div className="flex flex-col gap-[44px] items-center">
                        {/* Brand Highlights 섹션 */}
                        <div
                            className="flex flex-col gap-[24px] lg:gap-[68px] items-center w-full max-w-[320px] lg:max-w-full">
                            <h2 className="text-[22px] lg:text-[64px] gt-ultra font-bold text-[#E45356] text-center tracking-[-0.66px] lg:tracking-[-1.92px] leading-[1.3]">Brand
                                Highlights</h2>

                            <div
                                className="grid grid-cols-1 lg:grid-cols-3 gap-[8px] lg:gap-[20px] w-full lg:max-w-[1180px] lg:items-start ">
                                {highlights.map((highlight, index) => (
                                    <MotionBox
                                        key={index}
                                        delay={index * 0.2}
                                        className="flex relative justify-center items-center w-full h-full"
                                    >
                                        <div
                                            className="relative flex flex-col gap-[8px] items-center p-3 lg:p-4 w-full h-full"
                                            style={{
                                                backgroundColor: highlight.bgColor,
                                            }}
                                        >
                                            {/* 콘텐츠 (필터 없음) */}
                                            <div
                                                className="relative flex flex-col gap-[8px] lg:gap-[12px] items-center px-3 lg:px-5 py-[24px] lg:pt-[36px] lg:pb-[52px] w-full z-10 h-full"
                                                style={{
                                                    backgroundColor: highlight.cardBgColor,
                                                }}
                                            >
                                                {/* 브러시 효과 테두리 */}
                                                <div
                                                    className="absolute inset-0 pointer-events-none"
                                                    style={{
                                                        borderColor: highlight.borderColor,
                                                        borderWidth: '5.34px',
                                                        borderStyle: 'solid',
                                                        filter: 'url(#brushTextureHighlights)',
                                                    }}
                                                />
                                                <h3 className="text-[22px] lg:text-[42px] font-extrabold text-[#4a3135] text-center tracking-[-0.66px] lg:tracking-[-1.26px] leading-[1.3] whitespace-pre">
                                                    {highlight.title}
                                                </h3>
                                                <div className="w-full h-[1px] bg-[#4a3135] relative"></div>
                                                <div
                                                    className="flex flex-col gap-[8px] items-center text-[#4a3135] text-center">
                                                    <p className="text-[14px] lg:text-[18px] font-bold tracking-[-0.42px] lg:tracking-[-0.18px] leading-[1.6]">
                                                        {highlight.subtitle}
                                                    </p>
                                                    <p className="text-[12px] lg:text-[15px] leading-[1.6] tracking-[-0.36px] lg:tracking-[-0.18px] w-[200px] lg:w-full">
                                                        {highlight.description}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </MotionBox>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 보름이 섹션 */}
            <section className="relative w-full  py-[36px] lg:py-[0px]  bg-[#F5B3C2] lg:pb-[60px]">
                <div className='flex flex-col gap-[12px] lg:gap-[0px] items-center max-w-[1180px] mx-auto px-5 lg:px-0'>
                    <h2 className="text-[22px] lg:text-[64px] gt-ultra font-bold text-[#FFFDDB] text-center tracking-[-0.66px] lg:tracking-[-1.92px] leading-[1.3] lg:mb-[68px] lg:mt-[120px] lg:hidden">Character</h2>
                    <div className='w-full'>
                        {/* 모바일 로고 */}
                        <img src="/img/brand/boreumdal/logo_boreme.png" alt=""
                             className="w-full max-w-[220px] lg:max-w-[380px] mx-auto lg:hidden relative "/>

                        <div className='relative mt-[-36px] lg:mt-[-120px]  lg:top-[0px]'>
                            <div className='flex items-center gap-[54px]'>
                                <img src="/img/brand/boreumdal/boreme.png" alt=""
                                     className="w-full lg:max-w-[620px] relative lg:top-[77px] top-[50px] max-w-[220px] mx-auto lg:mx-0 "/>
                                <div className='hidden lg:flex flex-col gap-[40px] pt-[80px]'>
                                    <h2 className="text-[22px] lg:text-[64px] gt-ultra font-bold text-[#FFFDDB] text-center tracking-[-0.66px] lg:tracking-[-1.92px] leading-[1.3]]">Character</h2>
                                    <img src="/img/brand/boreumdal/logo_boreme.png" alt=""
                                         className="w-full max-w-[80%] lg:max-w-[380px] mx-auto "/>
                                </div>
                            </div>
                            <div className='relative bg-[#FFFDDB] z-10 w-full'>
                                <div
                                    className="absolute inset-0 pointer-events-none"
                                    style={{
                                        borderColor: '#E35154',
                                        borderWidth: '6px',
                                        borderStyle: 'solid',
                                        filter: 'url(#brushTextureHighlights)',
                                    }}
                                />

                                <p className='text-[12px] lg:text-[18px] lg:max-w-[540px] lg:mx-auto leading-[1.6] tracking-[-0.36px] lg:tracking-[-0.18px] text-center py-10 lg:py-[53px] px-5'>지구인들의
                                    소원을 이루어주는 보름달 제빵사 보름이 귀여운 하트 꼬리가 빤짝반짝 빛이 나며 보름달 빵에 행운을 담아냅니다. <br/><br/>
                                    보름달이 차오르는 날이면 행운을 전하기 위해 보름달을 가득 담아 두둥실 크림을 타고 지구인들에게 날아갑니다.<br/><br/>
                                    사람들이 자는 사이, 베개 옆에 보름달을 몰래 두고 가면 보름달을 먹는 지구인의 소원이 이루어진다는 속설이 있습니다.<br/><br/>
                                    보름달이 떠오르는 날, 보름이에게 소원을 빌어보세요!<br/></p>
                            </div>
                            <img src="/img/brand/boreumdal/heart.png" alt=""
                                 className="absolute bottom-[-25px] left-[-2px] z-10 w-[65px] lg:w-[100px] rotate-[-26deg] lg:left-auto lg:rotate-[30deg] lg:right-[-25px] lg:bottom-[-20px]"/>
                        </div>
                    </div>
                </div>
            </section>


            {/* 뒤 이미지 때문에 묶음 */}
            <section className='overflow-hidden relative'>
                {/* 브랜드 제품 */}
                <section className="relative w-full lg:px-0 py-[36px] lg:pb-[60px] overflow-hidden">
                    <div className="max-w-[1180px] mx-auto w-full relative z-10">
                        <ProductSwiper products={products} aspectRatio="1/1" fontFamily="gothic"/>
                    </div>
                </section>
            </section>
            {/* Brand Media 섹션 */}
            <section className='overflow-hidden relative'>
                <img src="/img/brand/boreumdal/brand_media_back_pc.svg" alt=""
                     className='absolute w-[1000px] max-w-none bottom-0 left-1/2 lg:w-full -translate-x-1/2 lg:top-0'/>
                <div
                    className="relative max-w-[1220px] mx-auto w-full px-5 pb-[60px] pt-[36px] lg:pb-[170px] lg:pt-[110px]  z-10">
                    <BrandMedia images={brandMediaImages} theme="boreumdal"/>
                </div>
            </section>
        </main>
    );
};

export default Boreumdal;