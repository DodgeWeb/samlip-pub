import React, {useState, useRef} from 'react';
import {useRouter} from 'next/router';
import {Icon} from '@/components/pub/icons';
import {MotionBox} from '@/components/pub/interAtion/MotionBox';
import {motion, AnimatePresence} from 'framer-motion';

const CreamBreadTypography = () => {
    const router = useRouter();
    const [isLicenseExpanded, setIsLicenseExpanded] = useState(false);
    const downloadSectionRef = useRef<HTMLDivElement>(null);

    // 라이선스 사용범위 표 데이터
    const licenseTableData = [
        {category: '인쇄', usage: '브로슈어, 카탈로그, DM, 전단지, 포스터, 패키지, 캘린더 등 인쇄물', available: true},
        {category: '인쇄', usage: '책, 만화책, 잡지, 정기간행물, 신문 등 출판물', available: true},
        {category: '인쇄', usage: '간판, 현수막, 판넬 등 제작물', available: true},
        {category: '인쇄', usage: '신문광고, 잡지광고, 차량광고 등 광고물', available: true},
        {category: '인쇄', usage: '신문 제목 및 텍스트', available: true},
        {category: '인쇄', usage: '인쇄 및 문서 공유를 위한 PDF 파일 제작', available: true},
        {category: 'CI/BI', usage: '회사명, 브랜드명, 상품명, 로고, 마크, 슬로건, 캐치프레이즈', available: true},
        {category: '웹사이트', usage: '웹페이지, 광고배너, 메일, 웹툰, E-카달로그', available: true},
        {category: '웹사이트', usage: '웹서버용 폰트', available: true},
        {category: '영상', usage: '방송 및 영상물 자막', available: true},
        {category: '영상', usage: 'TV-CF, 온라인 영상광고', available: true},
        {category: '영상', usage: '영화(DVD/비디오), 오프닝, 엔딩크레딧 자막', available: true},
        {category: 'E-book', usage: 'E-Book 기기 내 UI 제작, 폰트탑재', available: true},
        {category: 'E-book', usage: '도서 및 잡지 등을 E-Book 콘텐츠(ePUB, PDF)로 변환 서비스', available: true},
        {category: '디바이스', usage: '모바일, MP3, PMP, 내비게이션, 셋탑박스, 게임기 등 디바이스 내 탑재', available: true},
        {category: '디바이스', usage: '어플리케이션 GUI디자인 등', available: true},
        {category: '디바이스', usage: '전광판 및 안내시스템, ATM기기 등', available: true},
        {category: '서버', usage: '서버 탑재 후 웹서비스 및 프로그램 내 서비스 (게임 등)', available: true},
        {category: '임베이딩', usage: '폰트파일 임베이딩 서비스', available: true},
        {category: '기타', usage: '직접 판매 목적의 이미지 제작 (2차 제작결과물)', available: true},
        {category: '기타', usage: '스탬프, T셔츠 등 서체 디자인이 직접 활용된 상품 제작', available: true},
        {category: '기타', usage: '개인 UCC 및 홍보물', available: true},
        {category: '기타', usage: 'E-Learning 콘텐츠, 온라인 동영상강좌, 플래시 강좌 등', available: true},
    ];

    // 제작과정 데이터
    const processSteps = [
        {
            id: 1,
            number: '01',
            title: '스케치',
            image: '/img/brand/cream_bread/process_01.png',
            textPosition: 'top' as const,
        },
        {
            id: 2,
            number: '02',
            title: '디지털 작업',
            image: '/img/brand/cream_bread/process_02.png',
            textPosition: 'bottom' as const,
        },
        {
            id: 3,
            number: '03',
            title: '검수',
            image: '/img/brand/cream_bread/process_03.png',
            textPosition: 'bottom' as const,
        },
    ];

    return (
        <main className="relative w-full min-h-screen">
            {/* 헤더 섹션 */}
            <section
                className='w-full bg-[#FDE8EA] pb-[48px] relative  pt-[63px] lg:pt-[80px] overflow-hidden mt-[40px] lg:mt-[60px]'>
                {/* 배경 장식 이미지 */}
                <img src="/img/brand/cream_bread/typo_back.svg" alt=""
                     className=" absolute top-[5%] w-full scale-[1.4] h-full lg:hidden"/>
                <img src="/img/brand/cream_bread/typo_back_pc.svg" alt=""
                     className=" absolute top-[5%] w-full scale-[1] h-full hidden lg:block "/>

                <div className='relative w-full h-full'>
                    <section className="relative z-10 px-5 lg:px-0 w-full max-w-[1220px] mx-auto">
                        <div className="flex flex-col gap-[46px] items-start">
                            {/* 뒤로가기 버튼 */}
                            <button
                                onClick={() => router.push('/pub/brand/bakery/creamBread')}
                                className="border border-[#ED1C2A] rounded-[65px] px-[13px] lg:px-[20px] lg:py-[4px] py-[3px] flex items-center gap-[2.6px]"
                            >
                                <Icon name="arrowTop"
                                      className="w-[16px] h-[16px] lg:w-[20px] lg:h-[20px] *:fill-[#ED1C2A] -rotate-90"/>
                                <span
                                    className="text-[12px] lg:text-[18px] text-[#ED1C2A] tracking-[-0.36px] lg:leading-[1.6]">크림빵</span>
                            </button>

                            {/* 메인 콘텐츠 */}
                            <div className="flex flex-col gap-[24px] lg:gap-[40px] items-center  w-full">
                                {/* 타이틀 섹션 */}
                                <div
                                    className="flex flex-col gap-[8px] lg:gap-[32px] items-center  w-[313px] lg:w-auto samlip-cream ">
                                    <h2 className="text-[32px] lg:text-[64px] samlip-cream  text-[#ED1C2A] leading-[1.3] tracking-[-0.96px] lg:tracking-[-1.92px] text-center lg:text-left">
                                        삼립크리미 화이트체
                                    </h2>
                                    <p className='text-[18px] lg:text-[28px] text-[#640C12] leading-[1.3] tracking-[-0.54px] lg:tracking-[-0.72px] text-center  w-[280px] lg:w-[440px]'>
                                        반세기 지난 지금도 사랑받는 정통 크림빵을 서체로 만나보세요!
                                    </p>
                                </div>

                                {/* 다운로드 버튼 */}
                                <div className="flex flex-col gap-[10px] items-start">
                                    <button
                                        onClick={() => {
                                            if (downloadSectionRef.current) {
                                                const rect = downloadSectionRef.current.getBoundingClientRect();
                                                const offset = 100; // 헤더 높이 + 여유값
                                                const y = window.scrollY + rect.top - offset;

                                                // Lenis 인스턴스 확인
                                                const lenis = (window as any).lenis;
                                                if (lenis && typeof lenis.scrollTo === 'function') {
                                                    lenis.scrollTo(y, {duration: 1.2});
                                                } else {
                                                    window.scrollTo({top: y, behavior: 'smooth'});
                                                }
                                            }
                                        }}
                                        className="bg-[#ED1C2A] px-[20px] py-[10px] lg:px-[67px] lg:py-[30px] flex items-center gap-[4px] justify-center w-[296px] lg:w-auto cursor-pointer hover:opacity-80 transition-opacity"
                                    >
                                        <Icon name="down2"
                                              className="w-[18px] h-[18px] lg:w-[36px] lg:h-[36px] *:fill-white"/>
                                        <span
                                            className="text-[14px] lg:text-[26px] text-white tracking-[-0.42px] lg:tracking-[-0.6px] font-bold leading-[1.6]">
                                    디자인210 삼립크리미 화이트체 다운로드
                                </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </section>

            {/* 본문 섹션 */}
            <section className="overflow-hidden relative w-full">
                <div className="lg:py-[90px] bg-[#FDF8EB] relative">
                    <img src="/img/brand/cream_bread/typo_back_01.svg" alt=""
                         className='absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] max-w-none lg:w-full '/>
                    <aside className='flex flex-col items-center gap-[28px]  py-[28px] max-w-[1220px] px-5 mx-auto'>
                        {/* 서체 소개 섹션 */}
                        <div className="flex flex-col items-start w-full">
                            {/* 서체 특징 이미지 섹션 */}
                            <div className="relative mx-auto w-full">
                                <MotionBox>
                                    <img src="/img/brand/cream_bread/symbol.svg" alt=""
                                         className="max-w-[180px] lg:max-w-[400px] w-full mx-auto"/>
                                </MotionBox>

                                <div
                                    className="flex flex-col gap-[11px] lg:gap-[32px] items-center text-center mt-8 lg:mt-[56px] mx-auto">
                                    {/* 제목 */}
                                    <p className="samlip-hopbang text-[28px] lg:text-[46px] text-[#ED1C2A] leading-[1.3] tracking-[-0.66px] text-center samlip-cream">
                                        삼립 크림빵!
                                    </p>

                                    {/* 본문 */}
                                    <p className="text-[14px] lg:text-[22px] text-[#640C12] leading-[1.7] tracking-[-0.42px] lg:max-w-[800px]">
                                        ‘삼립 크리미 화이트 서체’는 ‘정통 크림빵’ 출시 60주년을 기념하여 개발한 서체입니다.
                                        <br/>
                                        <br/>
                                        장지의 로고타입 한글의 구조와 조형의 특징을 분석하고 이를 바탕으로 추가 제작되어야 할 모음, 자음을 설계 및 모듈화하고 캐릭터를 입혀 한글
                                        2350자 영문 94자를 제작하였습니다.
                                        <br/>
                                        <br/>
                                        ‘정통 크림빵’이 지난 60년간 변함없이 남녀노소 누구에게나 사랑받았듯 앞으로도 모두에게 사랑받는 재미있는 서체로 기억되길 바랍니다.
                                    </p>
                                </div>

                                <div
                                    className="flex flex-col gap-[11px] lg:gap-[22px] items-center text-center mt-8 lg:mt-[160px] mx-auto max-w-[800px]">
                                    {/* 제목 */}
                                    <p className="samlip-hopbang text-[28px] lg:text-[46px] text-[#ED1C2A] leading-[1.3] tracking-[-0.66px] text-center samlip-cream">
                                        컨셉
                                    </p>
                                    {/* 본문 */}
                                    <p className="text-[14px] lg:text-[22px] text-[#640C12] leading-[1.7] tracking-[-0.42px] whitespace-pre pre-line"
                                       style={{whiteSpace: 'pre-wrap'}}>
                                        1964년 국내 최초로 비닐 포장 제품을 출시한 크림빵의 포장지에 사용된 한글의 독창적인 아이덴티티를 유지하며 현대적인 BI로 변경된 로고타입을
                                        기반으로 한글의 초성, 중성, 종성을 모아쓰기 방식이 아닌 가로 풀어쓰기 형태로 서체 제작을 진행하였습니다.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </aside>
                    {/* 크림빵 발전 */}
                    <div className='relative pt-[48px] pb-[80px]'>

                        <div className='flex flex-col items-center w-full *:w-full'>
                            <div className='flex flex-col gap-[12px] items-center'>
                                <p className='text-[16px] font-semibold lg:text-[26px] text-[#96694C] leading-[1.7] tracking-[-0.42px] whitespace-pre pre-line'>1964년</p>
                                <img src="/img/brand/cream_bread/cream_logo_02.png" alt=""
                                     className="w-full max-w-[200px] lg:max-w-[500px] mx-auto"/>
                            </div>
                            <div className='flex flex-col gap-[12px] items-center'>
                                <div className='relative h-[40px] lg:h-[67px]'>
                                    <span
                                        className='size-[6px] lg:size-[10px] bg-[#ED1C2A] block absolute bottom-0 left-1/2 -translate-x-1/2 rounded-full'></span>
                                    <span
                                        className='w-px lg:w-0.5 h-full bg-[#ED1C2A] block absolute top-0 left-[50%] -translate-x-1/2'></span>
                                </div>
                                <img src="/img/brand/cream_bread/cream_logo.svg" alt=""
                                     className="w-full max-w-[200px] lg:max-w-[500px] mx-auto"/>
                            </div>
                            <div className='flex flex-col items-center gap-[12px]'>
                                <div className='relative h-[40px] lg:h-[200px]'>
                                    <span
                                        className='size-[6px] lg:size-[10px] bg-[#ED1C2A] block absolute bottom-0 left-1/2 -translate-x-1/2 rounded-full'></span>
                                    <span
                                        className='w-px lg:w-0.5 h-full bg-[#ED1C2A] block absolute top-0 left-[50%] -translate-x-1/2'></span>
                                </div>
                                <p className='text-[16px] font-semibold lg:text-[26px] text-[#ED1C2A] leading-[1.7] tracking-[-0.42px] whitespace-pre pre-line'>2024년</p>
                                <img src="/img/brand/cream_bread/cream_logo.svg" alt=""
                                     className="w-full max-w-[280px] lg:max-w-[820px] mx-auto"/>
                            </div>
                        </div>
                    </div>
                </div>


                <div className='overflow-hidden relative'>
                    {/* 한글 섹션 */}
                    <div className=" w-full py-[34px] pb-[80px] px-5 lg:pt-[90px] lg:pb-[230px]">
                        <div className="flex flex-col gap-[48px] lg:gap-[64px] items-center max-w-[1220px] mx-auto">
                            <div
                                className="flex flex-col gap-[48px] lg:gap-[60px] items-start w-full max-w-[320px] lg:max-w-[955px]">
                                <h3 className="text-[22px] lg:text-[32px] font-extrabold text-[#640C12] tracking-[-0.66px] lg:tracking-[-1.44px] leading-[1.3] w-full text-center">한글
                                    2,780자</h3>
                                <ul className="flex flex-col gap-[46px] lg:gap-[64px] items-center w-full *:flex-row *:lg:gap-[80px]">
                                    {/* 첫 번째 특징 */}
                                    <li className="flex !flex-col lg:!flex-row gap-[32px] lg:gap-[40px] items-center w-full">
                                        <img src="/img/brand/cream_bread/hoppang_serif_01.png" alt="한글 첫 번째 특징"
                                             className="object-cover w-full max-w-[260px] lg:max-w-[350px]"/>
                                        <div className="flex flex-col gap-[12px] items-start w-full lg:max-w-[530px]">
                                            <div
                                                className="bg-[#ED1C2A] px-[8px] py-[4px] flex items-center justify-center">
                                                <span
                                                    className="text-[12px] lg:text-[14px] font-bold text-white tracking-[-0.36px] lg:tracking-[-0.42px] leading-[1.6]">첫 번째 특징</span>
                                            </div>
                                            <div
                                                className="flex flex-col gap-[4px] items-start w-full lg:max-w-[530px]">
                                                <h4 className="text-[14px] lg:text-[20px] font-bold text-[#640C12] leading-[1.7] tracking-[-0.42px] lg:tracking-[-0.6px] w-full">
                                                    한글의 초성, 중성, 종성을 가로 풀어쓰기 형태로 제작
                                                </h4>
                                                <p className="text-[12px] lg:text-[16px] text-[#640C12] leading-[1.6] tracking-[-0.36px] lg:tracking-[-0.48px] w-full ">
                                                    기존 삼립 크림빵의 아이덴티티를 유지하며, 변경된 로고타입을 기반으로 풀어쓰기 형태로 서체 제작을 진행하였습니다.
                                                </p>
                                            </div>
                                        </div>
                                    </li>

                                    {/* 두 번째 특징 */}
                                    <li className="flex !flex-col lg:!flex-row gap-[32px] lg:gap-[40px] items-center w-full">
                                        <img src="/img/brand/cream_bread/hoppang_serif_02.png" alt="한글 두 번째 특징"
                                             className="object-cover w-full max-w-[260px] lg:max-w-[350px] px-[30px]"/>
                                        <div className="flex flex-col gap-[12px] items-start w-full lg:max-w-[530px]">
                                            <div
                                                className="bg-[#ED1C2A] px-[8px] py-[4px] flex items-center justify-center">
                                                <span
                                                    className="text-[12px] lg:text-[14px] font-bold text-white tracking-[-0.36px] lg:tracking-[-0.42px] leading-[1.6]">두 번째 특징</span>
                                            </div>
                                            <div className="flex flex-col gap-[4px] items-start w-full">
                                                <h4 className="text-[14px] lg:text-[20px] font-bold text-[#640C12] leading-[1.7] tracking-[-0.42px] lg:tracking-[-0.6px] w-full">
                                                    크림을 쭈욱 짠듯한 형태의 세리프
                                                </h4>
                                                <p className="text-[12px] lg:text-[16px] text-[#640C12] leading-[1.6] tracking-[-0.36px] lg:tracking-[-0.48px] w-full">
                                                    기존 로고타입의 세리프 형태를 서체 디자인에도 적용하여 통일감을 유지시켰습니다.
                                                </p>
                                            </div>
                                        </div>
                                    </li>

                                    {/* 세 번째 특징 */}
                                    <li className="flex !flex-col lg:!flex-row gap-[32px] lg:gap-[40px] items-center w-full">
                                        <img src="/img/brand/cream_bread/hoppang_serif_03.png" alt="한글 세 번째 특징"
                                             className="object-cover w-full max-w-[280px] lg:max-w-[350px] px-[30px]"/>
                                        <div className="flex flex-col gap-[12px] items-start w-full">
                                            <div
                                                className="bg-[#ED1C2A] px-[8px] py-[4px] flex items-center justify-center">
                                                <span
                                                    className="text-[12px] lg:text-[14px] font-bold text-white tracking-[-0.36px] lg:tracking-[-0.42px] leading-[1.6]">세 번째 특징</span>
                                            </div>
                                            <div className="flex flex-col gap-[4px] items-start w-full">
                                                <h4 className="text-[14px] lg:text-[20px] font-bold text-[#640C12] leading-[1.7] tracking-[-0.42px] lg:tracking-[-0.6px] w-full">
                                                    꽃 모양의 캐릭터를 담은 ㅇ의 디자인
                                                </h4>
                                                <p className="text-[12px] lg:text-[16px] text-[#640C12] leading-[1.6] tracking-[-0.36px] lg:tracking-[-0.48px] w-full">
                                                    크림빵 포장지에 쓰인 꽃 모양의 캐릭터를 서체를 담아 삼립크리미 화이트만의 위트를 표현합니다.
                                                </p>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>

                            {/* 한글 전체 이미지 */}
                            <div className="relative w-full max-w-[1180px] mt-[60px] lg:mt-[160px]">
                                <img src="/img/brand/cream_bread/hoppang_serif_04.png" alt="한글 서체 전체 예시"
                                     className="object-contain w-full h-auto scale-[1.3] lg:max-w-[1180px] mx-auto lg:scale-[1]"/>
                            </div>
                        </div>
                    </div>

                    {/* 라틴 섹션 */}
                    <div className="bg-[#fffcf5] w-full py-[28px] px-5 lg:pt-[90px] lg:pb-[110px]">
                        <div className="flex flex-col  items-center mx-auto max-w-[1220px]">
                            <div className="flex flex-col gap-[4px] lg:gap-[12px] items-center text-center w-full">
                                <h3 className="text-[22px] lg:text-[48px] font-extrabold text-[#640C12] tracking-[-0.66px] lg:tracking-[-1.44px] leading-[1.3]">Lain
                                    94자</h3>
                                <p className="text-[10px] lg:text-[16px] text-[#640C12] leading-[1.6] tracking-[-0.3px] lg:tracking-[-0.48px] w-full max-w-[226px] lg:max-w-full">
                                    라틴문자에서도 특징적인 세리프와 꽃 모양의 캐릭터를 적용하여 한글과의 통일성을 유지했습니다.
                                </p>
                            </div>
                            <div className="relative w-full max-w-[384px] lg:max-w-[800px] mt-[37px] lg:mt-[60px]">
                                <img src="/img/brand/cream_bread/hoppang_serif_latin.png" alt="라틴 서체 예시"
                                     className="object-contain w-full h-auto"/>
                            </div>
                        </div>
                    </div>

                    {/* Dingbat & Symbol 섹션 */}
                    <div className="bg-white w-full py-[28px] px-5 lg:pb-[135px] lg:pt-[90px] relative">
                        <img src="/img/brand/cream_bread/number_symbol_back.svg" alt=""
                             className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 lg:translate-y-[-10%]'/>
                        <div
                            className="flex flex-col gap-[64px] lg:gap-[130px] items-center mx-auto max-w-[1220px] relative z-10">
                            <div className="flex flex-col gap-[24px] items-center w-full">
                                <div className="flex flex-col gap-[4px] items-center text-center w-full">
                                    <h3 className="text-[22px] lg:text-[48px] font-extrabold text-[#640C12] tracking-[-0.66px] lg:tracking-[-1.44px] leading-[1.3]">Numbers
                                        & Symbols</h3>
                                    <p className="text-[10px] lg:text-[16px] text-[#640C12] leading-[1.6] tracking-[-0.3px] lg:tracking-[-0.48px] w-full max-w-[239px] lg:max-w-[600px]">
                                        특징적인 세리프를 적용한 숫자와 꽃 모양의 캐릭터 특징을 살린 약물로 포함되어있습니다.
                                    </p>
                                </div>
                                <div className="relative w-full max-w-[384px] lg:max-w-[800px]">
                                    <img src="/img/brand/cream_bread/hoppang_serif_symbols.png" alt="숫자 및 기호 예시"
                                         className="object-contain w-full h-auto lg:mb-0"/>
                                </div>
                            </div>

                            {/* Regular 버전 예시 */}
                            <div className="flex flex-col gap-[12px] lg:gap-[64px] items-center w-full lg:pb-[210px]">
                                <p className="text-[14px] lg:text-[20px] font-bold text-[#640C12] leading-[1.7] tracking-[-0.42px] lg:tracking-[-0.6px]">Regular</p>
                                <div
                                    className="flex flex-col gap-[8px] lg:gap-[40px] items-center justify-center samlip-cream text-[#ED1C2A] text-center w-full">
                                    <p className="text-[30px] lg:text-[60px] leading-[1.3] tracking-[-0.9px] lg:tracking-[-1.8px] w-full max-w-[331px] lg:max-w-[800px]">
                                        구멍 송송 뚫린 빵 부드러운 하얀 크림
                                    </p>
                                    <p className="text-[20px] lg:text-[40px] leading-[1.2] tracking-[-0.1px] lg:tracking-[-0.2px] w-full max-w-[210px] lg:max-w-[600px]">
                                        정통 크림빵 출시 60주년 기념 한정판 크림대빵!
                                    </p>
                                    <p className="text-[12px] lg:text-[24px] leading-[1.2] tracking-[-0.06px] lg:tracking-[-0.12px] w-full max-w-[259px] lg:max-w-[700px]">
                                        부드럽고 달콤하게 입 안에서 녹는 크림
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 제작과정 섹션 */}
                <div className="w-full py-[35px] relative overflow-hidden  lg:pb-[150px]">
                    <div className="flex flex-col gap-[24px] lg:gap-[68px] items-center px-[20px] relative z-10">
                        <h2 className="text-[16px] font-semibold text-[#640C12] text-center tracking-[-0.48px] leading-[1.3] lg:text-[26px]">제작과정</h2>
                        <div className="flex gap-[10px] items-center lg:gap-[32px]">
                            {processSteps.map((step) => (
                                <MotionBox
                                    key={step.id}
                                    delay={step.id * 0.2}>
                                    <div
                                        className="flex relative flex-col justify-center items-center gap-[8px] lg:gap-[12px]">
                                        <div className="flex flex-col justify-center items-center">
                                            {/* 제목 */}
                                            <p className="text-[10px] lg:text-[15px] text-[#640C12]">{step.title}</p>
                                        </div>


                                        <div
                                            className="size-[100px] lg:size-[310px] rounded-full overflow-hidden relative">
                                            <img
                                                src={step.image}
                                                alt={step.title}
                                                className="object-cover w-full h-full"
                                            />
                                        </div>
                                    </div>
                                </MotionBox>
                            ))}
                        </div>
                    </div>
                </div>

                <section>
                    <img src="/img/brand/cream_bread/cream_bottom_01.png" alt="" className="w-full h-auto"/>
                    <img src="/img/brand/cream_bread/cream_bottom_02.png" alt="" className="w-full h-auto"/>
                </section>

                {/* 다운로드 및 라이선스 섹션 */}
                <div ref={downloadSectionRef}
                     className="flex overflow-hidden relative flex-col items-center w-full lg:px-0">
                    {/* 배경 장식 */}
                    <section
                        className="w-full lg:py-[114px] flex flex-col gap-[20px] lg:gap-[68px] items-center z-10 bg-[#ED1C2A] py-[38px] px-5 relative ">
                        <div className="overflow-hidden absolute inset-0 translate-y-[10%] lg:hidden">
                            <img
                                src="/img/brand/cream_bread/download_back_mo.svg"
                                alt=""
                                className="w-full h-full scale-125 lg:scale-100"
                            />
                        </div>
                        <img src="/img/brand/cream_bread/download_back.svg" alt=""
                             className=" absolute top-[10%] w-full scale-[1] h-full hidden lg:block "
                        />
                        <div className='flex flex-col gap-[4px] items-center w-full z-10 relative'>
                            <h2 className="samlip-cream text-[22px] lg:text-[54px] font-normal text-[#ECE6E6] text-center leading-[1.3] tracking-[-0.66px] lg:tracking-[-1.62px] w-full max-w-[309px] lg:max-w-full">
                                삼립크리미 화이트체 다운로드
                            </h2>
                            <p className="text-[10px] lg:text-[15px] text-[#ECE6E6] text-center leading-[1.6] tracking-[-0.3px] lg:tracking-[-0.15px] w-full max-w-[320px] lg:max-w-[600px]">
                                서체를 무료로 다운로드 받으실 수 있습니다
                            </p>
                        </div>
                        <div className="flex flex-col gap-[8px] lg:gap-[20px] items-center w-full">
                            <div
                                className="flex gap-[8px] lg:gap-[20px] justify-center items-center w-full relative z-10">
                                <button
                                    onClick={async () => {
                                        const isMobile = window.innerWidth < 1024;
                                        const otfPath = '/img/brand/cream_bread/samlip-creamy-white.otf';

                                        if (isMobile) {
                                            // 모바일에서는 새 탭에서 열리도록 처리
                                            const link = document.createElement('a');
                                            link.href = otfPath;
                                            link.target = '_blank';
                                            link.rel = 'noopener noreferrer';
                                            document.body.appendChild(link);
                                            link.click();
                                            document.body.removeChild(link);
                                        } else {
                                            // 데스크탑에서는 Blob 방식으로 다운로드
                                            try {
                                                const response = await fetch(otfPath);
                                                const blob = await response.blob();
                                                const url = window.URL.createObjectURL(blob);
                                                const link = document.createElement('a');
                                                link.href = url;
                                                link.download = 'samlip-creamy-white.otf';
                                                document.body.appendChild(link);
                                                link.click();
                                                document.body.removeChild(link);
                                                window.URL.revokeObjectURL(url);
                                            } catch (error) {
                                                console.error('다운로드 실패:', error);
                                                // 폴백: 직접 링크로 다운로드 시도
                                                const link = document.createElement('a');
                                                link.href = otfPath;
                                                link.download = 'samlip-creamy-white.otf';
                                                link.target = '_blank';
                                                document.body.appendChild(link);
                                                link.click();
                                                document.body.removeChild(link);
                                            }
                                        }
                                    }}
                                    className="bg-white px-[27px] py-[12px] lg:px-[67px] lg:py-[30px] flex items-center gap-[4px] justify-center flex-1 lg:flex-none"
                                >
                                    <Icon name="down2" className="size-[14.75px] lg:size-[36px] *:fill-[#640C12]"/>
                                    <span
                                        className="text-[12px] lg:text-[26px] font-bold text-[#640C12] tracking-[-0.36px] lg:tracking-[-0.13px] leading-[1.6] whitespace-nowrap">
                                OTF 다운로드
                            </span>
                                </button>
                                <button
                                    onClick={async () => {
                                        const isMobile = window.innerWidth < 1024;
                                        const ttfPath = '/img/brand/cream_bread/samlip-creamy-white.ttf';

                                        if (isMobile) {
                                            // 모바일에서는 새 탭에서 열리도록 처리
                                            const link = document.createElement('a');
                                            link.href = ttfPath;
                                            link.target = '_blank';
                                            link.rel = 'noopener noreferrer';
                                            document.body.appendChild(link);
                                            link.click();
                                            document.body.removeChild(link);
                                        } else {
                                            // 데스크탑에서는 Blob 방식으로 다운로드
                                            try {
                                                const response = await fetch(ttfPath);
                                                const blob = await response.blob();
                                                const url = window.URL.createObjectURL(blob);
                                                const link = document.createElement('a');
                                                link.href = url;
                                                link.download = 'samlip-creamy-white.ttf';
                                                document.body.appendChild(link);
                                                link.click();
                                                document.body.removeChild(link);
                                                window.URL.revokeObjectURL(url);
                                            } catch (error) {
                                                console.error('다운로드 실패:', error);
                                                // 폴백: 직접 링크로 다운로드 시도
                                                const link = document.createElement('a');
                                                link.href = ttfPath;
                                                link.download = 'samlip-creamy-white.ttf';
                                                link.target = '_blank';
                                                document.body.appendChild(link);
                                                link.click();
                                                document.body.removeChild(link);
                                            }
                                        }
                                    }}
                                    className="bg-white px-[27px] py-[12px] lg:px-[67px] lg:py-[30px] flex items-center gap-[4px] justify-center flex-1 lg:flex-none"
                                >
                                    <Icon name="down2" className="size-[14.75px] lg:size-[36px] *:fill-[#640C12]"/>
                                    <span
                                        className="text-[12px] lg:text-[26px] font-bold text-[#640C12] tracking-[-0.36px] lg:tracking-[-0.13px] leading-[1.6]">
                                TTF 다운로드
                            </span>
                                </button>
                            </div>
                            <p className="text-[10px] lg:text-[15px] text-[#ECE6E6] text-center tracking-[-0.3px] lg:tracking-[-0.15px] w-full">
                                *PC에서 다운로드 받으시면 더 다양하게 활용 가능합니다.
                            </p>
                        </div>
                    </section>

                    <section
                        className="w-full  flex flex-col gap-[20px] lg:gap-[68px] items-center z-10 bg-[#F7979D] py-[38px]  relative lg:pb-[135px] lg:pt-[80px]">
                        {/* 라이선스 섹션 */}
                        <div
                            className="flex flex-col gap-[4px] lg:gap-[12px] items-center text-[#640C12] bg-[#F7979D] text-center px-5 lg:px-0 relative z-10 w-full max-w-[320px] lg:max-w-[600px]">
                            <h3 className="text-[14px] lg:text-[26px] font-bold tracking-[-0.42px] lg:tracking-[-0.13px] leading-[1.7] lg:leading-[1.4]">
                                삼립 크리미 화이트체 라이선스 표기
                            </h3>
                            <p className="text-[10px] lg:text-[15px] leading-[1.6] tracking-[-0.3px] lg:tracking-[-0.15px] whitespace-pre-wrap">
                                삼립 크리미 화이트체는 개인 및 기업 사용자를 포함한 모든 사용자에게 무료로 제공되며 자유롭게 수정하고 재배포하실 수 있습니다. 단, 글꼴 자체를 유료로
                                판매하는 것을 금지하며, 아래 저작권 안내와 라이선스 전문을 포함해서 다른 소프트웨어와 번들하거나 재배포 또는 판매가 가능합니다. 라이선스 전문을 포함하기
                                어려울 경우, 삼립 크리미 화이트체의 출처 표기를 권장합니다. 예) 이 페이지는 ㈜SPC삼립에서 제공한 삼립 크리미 화이트체가 사용되어 있습니다.
                            </p>
                        </div>

                        {/* 사용범위 보기 */}
                        <div
                            className="flex flex-col gap-[12px] items-center w-full  lg:max-w-[830px] relative z-10 bg-[#F7979D]">
                            <button
                                onClick={() => setIsLicenseExpanded(!isLicenseExpanded)}
                                className="flex items-center gap-[4px] justify-center"
                            >
                    <span
                        className="text-[10px] lg:text-[18px] text-[#640C12] underline text-center tracking-[-0.3px] lg:tracking-[-0.18px] font-bold">
                        삼립 크리미 화이트체 사용범위 보기
                    </span>
                                <Icon
                                    name="arrow_round"
                                    className={`w-[8px] h-[8px] lg:w-[12px] lg:h-[12px] *:fill-[#640C12] transition-transform ${isLicenseExpanded ? '-rotate-90' : 'rotate-90'}`}/>
                            </button>

                            <AnimatePresence>
                                {isLicenseExpanded && (
                                    <motion.div
                                        initial={{height: 0, opacity: 0}}
                                        animate={{height: 'auto', opacity: 1}}
                                        exit={{height: 0, opacity: 0}}
                                        transition={{duration: 0.3, ease: 'easeInOut'}}
                                        style={{overflow: 'hidden'}}
                                        className="w-full"
                                    >
                                        <div className="pl-5 w-full">
                                            {/* 라이선스 사용범위 표 */}
                                            <div className="overflow-x-auto px-5 w-full lg:px-0">
                                                <table className="pr-5 w-full whitespace-nowrap lg:pr-0">
                                                    <thead>
                                                    <tr>
                                                        <th className="border-t-2 border-b border-r border-[#640C12] border-solid bg-transparent px-[32px] py-[12px] h-[65px] text-[10px] lg:text-[15px] font-bold text-[#640C12] text-center tracking-[-0.15px] whitespace-nowrap">
                                                            카테고리
                                                        </th>
                                                        <th className="border-t-2 border-b border-r border-[#640C12] border-solid bg-transparent px-[32px] py-[12px] h-[65px] text-[10px] lg:text-[15px] font-bold text-[#640C12] text-center tracking-[-0.15px] whitespace-nowrap">
                                                            사용범위
                                                        </th>
                                                        <th className="border-t-2 border-b border-[#640C12] border-solid bg-transparent px-[32px] py-[12px] h-[65px] text-[10px] lg:text-[15px] font-bold text-[#640C12] text-center tracking-[-0.15px] whitespace-nowrap">
                                                            사용가능 여부
                                                        </th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    {licenseTableData.map((row, index) => {
                                                        // 같은 카테고리의 첫 번째 행인지 확인
                                                        const isFirstInCategory = index === 0 || licenseTableData[index - 1].category !== row.category;
                                                        // 같은 카테고리의 행 개수 계산
                                                        const categoryRowCount = licenseTableData.filter(item => item.category === row.category).length;

                                                        return (
                                                            <tr key={index}>
                                                                {isFirstInCategory && (
                                                                    <td
                                                                        className="border-r border-b border-[#640C12] border-solid bg-transparent px-[32px] py-[12px] text-[10px] lg:text-[15px] font-bold text-[#640C12] text-center tracking-[-0.15px] align-top whitespace-nowrap"
                                                                        rowSpan={categoryRowCount}
                                                                    >
                                                                        {row.category}
                                                                    </td>
                                                                )}
                                                                <td className="border-r border-b border-[#640C12] border-solid bg-transparent px-[32px] py-[12px] text-[10px] lg:text-[15px] text-[#640C12] text-center tracking-[-0.15px] whitespace-nowrap">
                                                                    {row.usage}
                                                                </td>
                                                                <td className="border-b border-[#640C12] border-solid bg-transparent px-[32px] py-[12px] text-[10px] lg:text-[15px] text-[#640C12] text-center tracking-[-0.15px] whitespace-nowrap">
                                                                    {row.available ? '○' : ''}
                                                                </td>
                                                            </tr>
                                                        );
                                                    })}
                                                    </tbody>
                                                </table>
                                            </div>
                                            {/* <div className="text-[10px] lg:text-[15px] text-[#640C12] leading-[1.6] tracking-[-0.3px] lg:tracking-[-0.15px] mt-[12px]">
                            <p className="mb-0">
                            <span>This Font Software is licensed under the SIL </span>
                            <a 
                                href="https://opensource.org/license/ofl-1-1" 
                                className="underline"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Open Font License
                            </a>
                            , Version1.1.
                            </p>
                            <p>삼립 크리미 화이트체의 저작권은 ㈜SPC삼립과 ㈜산돌이 공동 소유하고 있습니다.</p>
                        </div> */}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </section>
                </div>
            </section>
        </main>
    );
};

export default CreamBreadTypography;
