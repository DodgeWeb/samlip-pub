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
import Calendar from 'react-calendar';

const Yakgwa = () => {
    const router = useRouter();
    const [brandMediaSwiper, setBrandMediaSwiper] = useState<SwiperType | null>(null);
    const brandMediaPrevRef = useRef<HTMLButtonElement>(null);
    const brandMediaNextRef = useRef<HTMLButtonElement>(null);
    const [currentMediaIndex, setCurrentMediaIndex] = useState(0);

    const brandMediaImages = [
        {
            image: '/img/brand_media/samlip-yakgwa_media_01.jpg',
            link: 'https://www.instagram.com/p/DNNUupLPNfR/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=='
        },
        {
            image: '/img/brand_media/samlip-yakgwa_media_02.jpg',
            link: 'https://www.instagram.com/p/DFKfYIaPFeN/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=='
        },
        {
            image: '/img/brand_media/samlip-yakgwa_media_03.jpg',
            link: 'https://www.instagram.com/reel/C_hzMAaPD65/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=='
        },
        {
            image: '/img/brand_media/samlip-yakgwa_media_04.jpg',
            link: 'https://www.instagram.com/reel/CxIGKqWvhfZ/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=='
        },
    ];

    const brandHistoryData = [
        {
            id: 1,
            date: '2019. 11.',
            image: '/img/brand/yakgwa/history_01.png',
            title: '궁중 꿀약과 미국 코스트코 입점',
            description: '',
        },
        {
            id: 2,
            date: '2023. 03.',
            image: '/img/brand/yakgwa/history_02.png',
            title: '조청모약과 출시',
            description: '차별화된 프리미엄 약과 출시',
        },
        {
            id: 3,
            date: '2023. 05.',
            image: '/img/brand/yakgwa/history_03.png',
            title: '도식화약쿠키',
            description: '카페 \'도식화\'와 협업한 약과쿠키 출시',
        },
        {
            id: 4,
            date: '2023. 09.',
            image: '/img/brand/yakgwa/history_04.png',
            title: (
                <>
                    세계 최대 국제식품박람회 <br/> 아누가 참가
                </>
            ),
            description: '',
        },
        {
            id: 5,
            date: '2023. 10.',
            image: '/img/brand/yakgwa/history_05.png',
            title: '\'케어스 약과\' 아누가 이노베이션 제품 선정',
            description: '',
        },
        {
            id: 6,
            date: '2024. 05.',
            image: '/img/brand/yakgwa/history_06.png',
            title: '약과자 출시',
            description: '약과를 활용한 스낵 과자 시장 확대',
        },
        {
            id: 7,
            date: '2024. 08.',
            image: '/img/brand/yakgwa/history_07.png',
            title: '미니약과 트윈팩 출시',
            description: '',
        },
        {
            id: 8,
            date: '2024. 10.',
            image: '/img/brand/yakgwa/history_08.png',
            title: '삼립약과 미국 코스트코 입점',
            description: '',
        },
        {
            id: 9,
            date: '2024. 10.',
            image: '/img/brand/yakgwa/history_09.png',
            title: (
                <>
                    2025IF어워드 <br/> 브랜딩 분야 선정
                </>
            ),
            description: (

                <p className='w-[150px]'>
                    둥근 외형과 꿀이 맺히는 듯한 질감을 일러스트 디자인으로 개발
                </p>

            ),
        },
    ];

    const products = [
        {id: 1, name: '미니꿀약과', image: '/img/brand/yakgwa/product_01.png'},
        {id: 2, name: '궁중꿀약과', image: '/img/brand/yakgwa/product_02.png'},
        {id: 3, name: '아몬드 쇼콜라 약과', image: '/img/brand/yakgwa/product_03.png'},
    ];

    const historyItems = [
        {year: '1971. 10', title: '호빵 출시', description: '1년 여의 연구개발 끝에 탄생'},
        {year: '1972', title: '찜통 공급', description: '판매처에 공급'},
        {year: '2018. 11', title: '윈터레스팅 캠페인', description: '이모티콘 증정, 비욘드 클로젯과 콜라보한 파자마 증정'},
    ];

    const highlights = [
        {
            title: '6,800,000,000',
            subtitle: '출시이래 68억 개의 판매',
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
            <section className='w-full aspect-[1/1] lg:aspect-[12/6] relative overflow-hidden mt-[40px] lg:mt-[60px] '>
                <div className='absolute inset-0 z-10'>
                    <img src="/img/brand/yakgwa/logo.png" alt=""
                         className="pt-[60px] mx-auto w-full max-w-[100px] lg:max-w-[280px] lg:pt-[120px] relative z-10"/>
                    <img src="/img/brand/yakgwa/yakgwa_banner_object_mo.png" alt=""
                         className="object-cover absolute inset-0 w-full h-full lg:hidden"/>
                    <img src="/img/brand/yakgwa/yakgwa_banner_object.png" alt=""
                         className="hidden object-cover absolute inset-0 w-full h-full lg:block"/>
                </div>
            </section>

            {/* 브랜드 스토리 - 약과 */}
            <section className='bg-[#FFF1D0] relative w-full overflow-hidden'>
                {/* 배경 장식 이미지 */}
                <img src="/img/brand/hotteok/hotteok_story_back.svg" alt=""
                     className="absolute inset-0 -top-[20px] h-full fill-[#fff] w-[100%] scale-[5] opacity-60  "
                     style={
                         {filter: 'brightness(0) saturate(100%) invert(93%) sepia(24%) saturate(220%) hue-rotate(341deg) brightness(107%) contrast(98%)'}
                     }
                />

                <div className='brand-story-section'>
                    <div className='inner'>
                        <div className='contents'>
                            {/* Brand Story 제목 */}
                            <h2 className='title pc_title text-[#4B2B23]'>Brand Story</h2>
                            <span
                                className='mo_h2 text-[#4B2B23] text-center font-extrabold lg:hidden'>한국의 전통과 정성을 <br/> 한입에 담은 삼립약과</span>
                            {/* 스토리 이미지 */}
                            <MotionBox className='max-w-[500px] mx-auto aspect-[320/270] lg:aspect-auto'>
                                <div className='overflow-hidden img_box'>
                                    <img
                                        src="/img/brand/yakgwa/story_01.png"
                                        alt="삼립호빵 브랜드 스토리"
                                        className="object-cover w-full h-full"/>
                                </div>
                            </MotionBox>
                            <section
                                className='flex flex-col gap-[24px] lg:gap-[40px] items-center lg:items-start w-full'>
                                <h2 className='gt-ultra text-[22px] lg:text-[64px] font-bold text-[#4B2B23] tracking-[-0.66px] leading-[1.1] hidden lg:block text-center lg:text-left'>Brand
                                    Story</h2>
                                {/* 첫 번째 텍스트 섹션 */}
                                <div className='description-section'>
                                    <span
                                        className='text-[36px]  text-[#4B2B23] text-left lg:block hidden leading-[1.3] font-bold w-full'>한국의 전통과 정성을 <br/> 한입에 담은 삼립약과</span>
                                    <div className='text-box'>
                                        <p className='text-[#4B2B23] text-center lg:text-left'>
                                            삼립약과는 한국의 전통과 정성을 한입 크기에 그대로 담은 약과 브랜드입니다.
                                            <br/>
                                            <br/>
                                            우리 전통 고유 약과의 맛과 식감을 계승, 발전시켜 현대인의 입맛에 꼭 맞게 만든 삼립약과.
                                            <br/>
                                            <br/>
                                            세련된 꽃 문양에 달콤한 꿀을 한껏 머금은 달콤하면서도 촉촉 바삭한 스낵 타입의 별미 간식입니다.
                                        </p>
                                    </div>
                                </div>

                            </section>
                        </div>
                    </div>
                </div>

            </section>


            {/* 브랜드 히스토리 */}
            <section className='brand_history_section bg-[#FFFEFA]'>
                <h2 className='brand_history_title text-[#500C08]'>Brand History</h2>
                <BrandHistory data={brandHistoryData} theme="yakgwa"/>
            </section>


            {/* 뒤 이미지 때문에 묵음 */}
            <section className='overflow-hidden relative bg-[#FFFEFA]'>
                <img src="/img/brand/yakgwa/yakgwa_back_01.svg" alt=""
                     className='absolute left-1/2 -translate-x-1/2 w-[800px] max-w-none lg:w-full bottom-[0px]'/>

                {/* 브랜드 제품 */}
                <section className="relative w-full lg:px-0 py-[36px] lg:pb-[60px] overflow-hidden">
                    <div className="max-w-[1180px] mx-auto w-full relative z-10">
                        <ProductSwiper products={products} aspectRatio='1/1'/>
                    </div>
                </section>
            </section>

            {/* Brand Media 섹션 */}
            <section className='overflow-hidden relative bg-[#FFF1D0] pt-[36px]'>
                <div
                    className="relative max-w-[1220px] mx-auto w-full px-5 pb-[60px] lg:pb-[170px] lg:pt-[110px]  z-10">
                    <BrandMedia images={brandMediaImages}/>
                </div>
            </section>
        </main>
    );
};

export default Yakgwa;