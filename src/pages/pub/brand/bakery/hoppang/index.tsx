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

const Hoppang = () => {
    const router = useRouter();
    const [brandMediaSwiper, setBrandMediaSwiper] = useState<SwiperType | null>(null);
    const brandMediaPrevRef = useRef<HTMLButtonElement>(null);
    const brandMediaNextRef = useRef<HTMLButtonElement>(null);
    const [currentMediaIndex, setCurrentMediaIndex] = useState(0);

    const brandMediaImages = [
        {
            image: '/img/brand_media/samlip-hopang_media_01.jpg',
            link: 'https://www.instagram.com/p/DE4QTP9vkju/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA%3D%3D'
        },
        {
            image: '/img/brand_media/samlip-hopang_media_02.jpg',
            link: 'https://www.instagram.com/reels/DD9yEBtvrXt/'
        },
        {
            image: '/img/brand_media/samlip-hopang_media_03.jpg',
            link: 'https://www.instagram.com/p/DDgHluqzmid/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA%3D%3D'
        },
        {
            image: '/img/brand_media/samlip-hopang_media_04.jpg',
            link: 'https://www.instagram.com/p/DC6Fkg5xgS0/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA%3D%3D'
        },
    ];

    const brandHistoryData = [
        {
            id: 1,
            date: '1971. 10',
            image: '/img/brand/hoppang/hoppang_01.png',
            title: '호빵 출시',
            description: '1년 여의 연구개발 끝에 탄생',
        },
        {
            id: 2,
            date: '1972',
            title: '찜통 공급',
            description: '판매처에 공급',
        },
        {
            id: 3,
            date: '2018. 11',
            image: '/img/brand/hoppang/hoppang_03.png',
            title: '윈터레스팅 캠페인',
            description: '이모티콘 증정, 비욘드 클로젯과 콜라보한 파자마 증정',
        },
        {
            id: 4,
            date: '2019. 10',
            image: '/img/brand/hoppang/hoppang_04.png',
            title: '미니가습기 한정 판매',
            description: '',
        },
        {
            id: 5,
            date: '2019. 11',
            image: '/img/brand/hoppang/hoppang_05.png',
            title: '배민 협업 ㅎㅎ호빵 출시',
            description: '',
        },
        {
            id: 6,
            date: '2020. 10',
            image: '/img/brand/hoppang/hoppang_06.png',
            title: '호찜이 한정 판매',
            description: '',
        },
        {
            id: 7,
            date: '2020. 11',
            //   image: '/img/brand/hoppang/hoppang_07.png',
            title: '놀면뭐하니 환불원정대편 광고 진행',
            description: '',
        },
        {
            id: 8,
            date: '2020. 11',
            image: '/img/brand/hoppang/hoppang_08.png',
            title: '삼립호빵 50년 서체',
            description: '',
        },
        {
            id: 9,
            date: '2020. 12',
            image: '/img/brand/hoppang/hoppang_09.png',
            title: '플리스 호빵 수익금 기부',
            description: '하인드아웃과 플리스 호빵/재킷 판매 빅이슈 판매원들의 주거 난방비, 방한용품 지원',
        },
        {
            id: 10,
            date: '2021. 10',
            image: '/img/brand/hoppang/hoppang_10.png',
            title: '프릳츠콜라보 호찌머그 에디션',
            description: '',
        },
        {
            id: 11,
            date: '2021. 11',
            image: '/img/brand/hoppang/hoppang_11.png',
            title: '삼립호빵 두유/죽 제품 출시',
            description: '',
        },
        {
            id: 12,
            date: '2021. 12',
            image: '/img/brand/hoppang/hoppang_12.png',
            title: '따뜻함은 커진다 캠페인',
            description: '42곳 기관에 삼립호빵 기부',
        },
        {
            id: 13,
            date: '2022. 12',
            image: '/img/brand/hoppang/hoppang_13.png',
            title: '호찜이 법랑 에디션',
            description: '',
        },
        {
            id: 14,
            date: '2023. 01',
            image: '/img/brand/hoppang/hoppang_14.png',
            title: '신년 캠페인',
            description: '떡방아 호빵 내 동봉된 경품 응모권 QR을 통하여 경품 증정',
        },
        {
            id: 15,
            date: '2023. 11',
            image: '/img/brand/hoppang/hoppang_15.png',
            title: '호빵 ℃ 캠페인',
            description: '에너지 소외계층에 1억원 기부',
        },
        {
            id: 16,
            date: '2024. 06',
            image: '/img/brand/hoppang/hoppang_16.png',
            title: '국제식음료품평회 3스타 수상',
            description: '',
        },
        {
            id: 17,
            date: '2024. 10',
            image: '/img/brand/hoppang/hoppang_17.png',
            title: '사무엘스몰즈콜라보 호찜이 출시',
            description: '',
        },
        {
            id: 18,
            date: '2024. 12',
            image: '/img/brand/hoppang/hoppang_18.png',
            title: '중화호빵대전 \'호빵요리사\'',
            description: '임태훈셰프의 고추잡채호빵 정지선셰프의 흑초강정호빵',
        },
        {
            id: 19,
            date: '2025. 01',
            image: '/img/brand/hoppang/hoppang_20.png',
            title: '캐나다 마트 T&T 입점',
            description: '수출 확대',
        },
    ];

    const products = [
        {id: 1, name: '삼립호빵 발효미종 정통단팥', image: '/img/brand/hoppang/product_01.png'},
        {id: 2, name: '삼립호빵 발효미종 생생야채', image: '/img/brand/hoppang/product_02.png'},
        {id: 3, name: '삼립호빵 발효미종 듬뿍피자', image: '/img/brand/hoppang/product_03.png'},
        {id: 4, name: '삼립호빵 발효미종 달콤 꿀고구마', image: '/img/brand/hoppang/product_04.png'},
    ];

    const historyItems = [
        {year: '1971. 10', title: '호빵 출시', description: '1년 여의 연구개발 끝에 탄생'},
        {year: '1972', title: '찜통 공급', description: ''},
        {year: '2018. 11', title: '윈터레스팅 캠페인', description: '이모티콘 증정, 비욘드 클로젯과 콜라보한 파자마 증정'},
    ];

    const highlights = [
        {
            title: '6,800,000,000',
            subtitle: '출시 이래 68억 개의 판매',
            description: '호호 불어 호빵이라는 찜기 속에 뜨끈뜨끈한 호빵을 먹던 추억이 있는 국민 호빵입니다. 국내를 넘어 해외시장을 질주하며 68억 개가 팔린 국민호빵입니다.',
        },
        {
            title: '365일',
            subtitle: '세상에 나오기까지 1년',
            description: '제품시장 조사 후 아이디어를 얻어 최대한의 보안을 유지한 채 1년 여의 실험으로 출시되었습니다.',
        },
        {
            title: 'SINCE 1971년',
            subtitle: '호빵이 사랑받은 기간',
            description: '1971년 선보인 호빵은 출시와 동시에 파죽지세로 인기를 얻은 상품입니다.',
        },
    ];

    return (
        <main className="bg-white">
            {/* 메인 섹션 */}
            <section className='w-full h-[360px] lg:h-[900px] relative overflow-hidden mt-[40px] lg:mt-[60px]'>
                <div className='absolute inset-0 z-10'>
                    <img src="/img/brand/hoppang/hoppang_logo.svg" alt=""
                         className="pt-[40px] mx-auto w-full max-w-[200px] lg:max-w-[400px] lg:pt-[80px]"/>
                    <img src="/img/brand/hoppang/hoppang_banner_object.png" alt=""
                         className="absolute bottom-0 lg:bottom-[-40px]  w-[120%] max-w-[120%] lg:w-[100%] lg:max-w-[1440px] left-1/2 -translate-x-1/2"/>
                </div>
                <img src="/img/brand/hoppang/hoppang_banner_back.png" alt=""
                     className="absolute inset-0 w-full h-full"/>
            </section>

            <section className='bg-[#ECE6E6] relative w-full overflow-hidden'>
                {/* 배경 파도 */}
                <img src="/img/brand/hoppang/logo_back.svg" alt=""
                     className="absolute top-0 left-1/2 -translate-x-1/2"/>

                <div
                    className='px-5  max-w-[1220px] mx-auto w-full relative pt-[27px] pb-[20px] lg:pt-[105px] lg:pb-[130px]'>
                    {/* Brand Logo 제목 */}
                    <h1 className='gt-ultra mb-5 text-[22px] lg:text-[64px] font-bold text-[#3E0300] tracking-[-0.66px] leading-[1.3]  lg:mb-[70px]'>
                        Brand Logo
                    </h1>
                    <MotionBox>
                        <div className='flex relative flex-col items-center'>
                            {/* 상단 선 섹션 모바일 */}
                            <div className='flex flex-col items-center relative top-[6px] lg:hidden'>
                                <p className='text-[12px] lg:text-[14px] font-medium text-[#A68B8A] tracking-[-0.36px] leading-[1.6] relative top-[10px] bg-[#ECE6E6] px-[10px]'>삼립호빵의
                                    심볼&태그라인</p>
                                <div className='w-[180px] h-[38px] border border-b-0 border-[#A68B8A]'></div>
                            </div>

                            {/* 로고 이미지 */}
                            <div className='flex justify-center'>
                                <img
                                    src="/img/brand/hoppang/hoppang_logo.svg"
                                    alt="삼립호빵 로고"
                                    className="w-[220px] h-[116px] lg:w-[500px] lg:h-auto object-contain"
                                />
                            </div>

                            {/* 하단 선 섹션 모바일 */}
                            <div className='flex flex-col items-center mt-[6px] lg:hidden'>
                                <div className='w-[1px] h-[24px] bg-[#A68B8A]'></div>
                                <p className='text-[12px] lg:text-[14px] font-medium text-[#A68B8A] tracking-[-0.36px] leading-[1.6] mt-1'>삼립호빵의
                                    로고타입</p>
                            </div>

                            {/* 데스크탑 오른쪽 설명 */}
                            <div
                                className='hidden lg:flex text-[18px] font-normal text-[#A68B8A] tracking-[-0.54px] leading-[1.6] absolute top-[50px] right-6 flex-col gap-[80px] items-end'>
                                <p className='flex gap-4 items-center'><span
                                    className='w-[126px] h-px bg-[#A68B8A] block'></span> 삼립호빵의 로고타입</p>
                                <p className='flex gap-4 items-center'><span
                                    className='w-[60px] h-px bg-[#A68B8A] block'></span> 삼립호빵의 심볼&태그라인</p>
                            </div>
                        </div>
                    </MotionBox>
                </div>
            </section>

            {/* 호빵 - 브랜드 스토리 */}
            <section className='bg-[#380300] brand-story-section'>
                {/* 배경 장식 이미지 */}
                <img src="/img/brand/hoppang/story_back.svg" alt="" className="absolute inset-0 fill-[#fff] w-[100%] "/>
                <div className='inner'>
                    <div className='contents'>
                        {/* Brand Story 제목 */}
                        <h3 className='title pc_title text-[#ECE6E6]'>Brand Story</h3>
                        {/* 스토리 이미지 */}
                        <MotionBox>
                            <div className='img_box'>
                                <img
                                    src="/img/brand/hoppang/hoppang_story_01.png"
                                    alt="삼립호빵 브랜드 스토리"
                                />
                            </div>
                        </MotionBox>
                        <section className='description-section'>
                            <h3 className='title text-[#ECE6E6]'>Brand Story</h3>

                            <div className='text-box'>
                                <h3 className='sub_title samlip-hopbang !font-normal'>찬바람이 불어오면 생각나는 삼립호빵</h3>
                                <p className='text-[#C3B1B0]'>1971년 첫 출시 후 약 68억 개 이상 누적 판매된 삼립호빵은 1초당 9개 이상 팔릴 정도로 대한민국
                                    국민이라면 안 먹어 본 사람이 없다 해도 과언이 아닌 겨울 대표 간식입니다.
                                    스테디셀러인 단팥, 야채, 피자 호빵을 포함해 겨울 추위와 허기를 달래주던 간식에서 든든한 한 끼 식사와 달콤한 이색 디저트까지 트렌드를 반영한 다양한
                                    맛의 시즌 한정판 제품을 선보이고 있습니다.</p>
                            </div>

                            <div className='text-box'>
                                <h3 className='sub_title samlip-hopbang !font-normal'>호호 불어먹는 호빵</h3>
                                <p className='text-[#C3B1B0]'>이제 삼립호빵은 하나의 대명사로서, 남녀노소 맛있게 즐길 수 있는 라이프스타일 브랜드로 자리하고
                                    있습니다.</p>
                            </div>
                        </section>
                    </div>
                </div>
            </section>

            {/* 브랜드 히스토리 */}
            <section className='brand_history_section bg-[#FAF9F7]'>
                <h2 className='brand_history_title text-[#3E0300]'>Brand History</h2>
                <BrandHistory data={brandHistoryData}/>
            </section>


            {/* 브랜드 하이라이트 */}
            <section className="relative w-full  px-5 lg:px-0 py-[36px] lg:py-[80px] overflow-hidden">
                <img src="/img/brand/hoppang/hoppang_back_02.svg" alt=""
                     className='absolute bottom-[-120px] lg:bottom-0 left-1/2 -translate-x-1/2 w-[860px] lg:w-[1920px] max-w-none'/>
                <div className="max-w-[1180px] mx-auto w-full relative z-10">
                    <div className="flex flex-col gap-[44px] items-center">
                        {/* 상단 텍스트 섹션 */}
                        <div className="flex flex-col gap-[12px] items-center max-w-[320px] lg:max-w-[1084px] lg:px-5">
                            <h2 className="text-[22px] lg:mb-[40px] lg:text-[48px] samlip-hopbang font-normal text-[#3E0300] text-center tracking-[-0.66px] leading-[1.3] lg:leading-[1.2]">
                                뜨거워서 호호 맛이좋아 호호 <br/> 삼립호빵
                            </h2>
                            <div
                                className="flex flex-col gap-[16px] text-[12px] lg:text-[22px] text-[#3E0300] text-center tracking-[-0.36px] leading-[1.6] lg:leading-[1.6]">
                                <p className="mb-0">
                                    1968년 말 당시 제품 시장을 둘러본 후 아이디어를 얻어 탄생한 제품입니다. 호빵은 개발 당시 아무도 접근할 수 없는 곳에서 보안을 유지한 채 1년
                                    여에 걸친 실험 끝에 빛을 보게 되었습니다. <br/><br/>
                                    '호호분다'라는 의미를 지닌 이름, 호빵. 호빵은 1971년 10월 시판을 시작한 이후 최초 가격이 20원으로 당시 5원에 팔리던 다른 빵에 비해 4배
                                    비쌌지만 출시 즉시 파죽지세로 인기 상승 가도를 달렸습니다. 10월 중순부터 이듬해 2월까지 판매액이 전체 매출의 15%를 차지했고, 겨울 3개월
                                    동안에는 호빵 매출이 전체의 절반에 육박했습니다. 86년에는 미국, 중동, 캐나다에 이어 유럽 수출길에도 올라 그 해 수출 목표는 20만불로
                                    책정되었으며, 최고 판매량은 일일 1백 60만 개였습니다. <br/><br/>
                                    제품의 직경은 10cm, 중량 90그램으로 호빵 규격은 옛날이나 지금이나 변함이 없습니다.
                                </p>
                            </div>
                        </div>

                        {/* Brand Highlights 섹션 */}
                        <div className="flex flex-col gap-[24px] items-center w-full max-w-[320px] lg:max-w-full">
                            <h2 className="text-[22px] lg:text-[64px] gt-ultra font-bold text-[#3E0300] text-center tracking-[-0.66px] lg:tracking-[-1.92px] leading-[1.3] lg:mb-[68px] lg:mt-[120px]">
                                Brand Highlights
                            </h2>

                            <div
                                className="grid grid-cols-1 lg:grid-cols-3 gap-[8px] w-full lg:flex-row max-w-[1180px] lg:items-start">
                                {highlights.map((highlight, index) => (
                                    <MotionBox
                                        key={index}
                                        delay={index * 0.2}
                                        className="bg-[#3E0300]  flex flex-col gap-[10px] items-center lg:justify-start justify-center px-[28px] py-[23px] lg:py-[33px] lg:pt-[68px] lg:pb-[48px] w-full lg:h-full"
                                    >
                                        <div className="flex flex-col gap-[12px] items-center w-full">
                                            <h3 className="text-[22px] lg:text-[42px] font-extrabold text-white text-center tracking-[-0.66px] lg:tracking-[-0.96px] leading-[1.3]">
                                                {highlight.title}
                                            </h3>
                                            <div className="w-full h-[1px] bg-[#ECE6E6] opacity-50"></div>
                                            <div
                                                className="flex flex-col gap-[6px] items-center text-[#ECE6E6] text-center">
                                                <p className="text-[14px] lg:text-[22px] font-bold tracking-[-0.42px] lg:tracking-[-0.54px] leading-[1.7]">
                                                    {highlight.subtitle}
                                                </p>
                                                <p className="text-[12px] lg:text-[18px] leading-[1.6] tracking-[-0.36px] lg:tracking-[-0.42px] max-w-[196px] lg:max-w-full">
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
                <section className="brand_product_section bg-[#F2F1E9]">
                    <div className="max-w-[1350px] mx-auto w-full relative z-10">
                        <ProductSwiper products={products} aspectRatio='2/1' theme="hoppang"/>
                    </div>
                </section>


                {/* Sandoll 삼립호빵체 & Brand Media */}
                <section className="relative w-full  px-5 lg:px-0 py-[40px] lg:py-[80px] pb-[48px] bg-[#F8F7F3]">
                    <img src="/img/brand/hoppang/hoppang_back_03.svg" alt=""
                         className='absolute top-[0px] w-full right-0'/>
                    <div className="max-w-[1180px] mx-auto w-full relative z-10">
                        {/* Sandoll 삼립호빵체 섹션 */}
                        <h2 className="text-[22px] mb-[20px] lg:text-[64px] samlip-hopbang font-normal text-[#3E0300] tracking-[-0.66px] lg:tracking-[-1.92px] leading-[1.3] text-center">Sandoll
                            삼립호빵체</h2>
                        <div
                            className="flex flex-col lg:flex-row items-center lg:items-stretch gap-[12px] lg:gap-[68px] lg:mb-[80px] lg:pt-[68px]">
                            {/* 이미지 */}
                            <div className='aspect-square lg:max-w-[680px] w-full bg-white'>
                                <img src="/img/brand/hoppang/hoppang_serif.png" alt="" className="w-full h-auto"/>
                            </div>

                            <div
                                className="lg:max-w-[800px] w-full flex flex-col gap-[28px] lg:items-start items-center lg:justify-between">
                                <div className='flex flex-col gap-[12px] items-start lg:flex-1'>
                                    <p className="text-[24px] max-w-[220px] lg:max-w-[400px] samlip-hopbang text-[#3E0300] tracking-[-0.72px] leading-[1.3] lg:text-[40px]">
                                        ‘삼립호빵’의 모습을 담아 <br/> 대한민국 폰트회사 산돌과 함께 개발한 서체
                                    </p>
                                    <div className="flex flex-col gap-[12px] items-start w-full">
                                        <p className="text-[12px] text-[#3E0300] leading-[1.6] tracking-[-0.36px] lg:text-[15px]">
                                            1971년부터 2020년까지 50년의 헤리티지를 지킴과 동시에 미래의 트렌드를 반영해 변화하는 '삼립호빵'의 모습을 담았습니다.
                                            <br/> <br/>장체 구조의 젊고 캐주얼한 느낌을 가지면서 '호호~ 호빵'이 떠오르는 룩의 이 서체는, 삼립호빵의 기존 BI를
                                            기반으로 호빵의 모습이 더 잘 연상되는 동글동글하고 통통한 느낌을 담은 자소 디자인을 추가하여, 삼립호빵 서체만의 개성이 드러나도록 해
                                            주었습니다. 이러한 곡선적 자음들을 직선적 모음들이 잘 잡아주고, 서로 잘 어우러져 캐주얼한 룩을 줍니다.
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => router.push('/pub/brand/bakery/hoppang/typography')}
                                    className="bg-[#3E0300] px-[34px] py-[16px] flex gap-[10px] items-center justify-center hover:bg-[#500C08] transition-colors"
                                >
                        <span
                            className="text-[14px] lg:text-[24px] font-semibold text-white tracking-[-0.42px]  whitespace-pre">
                            Sandoll 삼립호빵체 자세히 보기
                        </span>
                                    <Icon name="arrow_round" className="w-[11px]   *:fill-white "/>
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </section>
            {/* Brand Media 섹션 */}
            <section className='bg-white'>
                <div className="">
                    <BrandMedia images={brandMediaImages}/>
                </div>
            </section>
        </main>
    );
};

export default Hoppang;