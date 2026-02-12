import React, {useState, useRef} from 'react';
import {useRouter} from 'next/router';
import {Icon} from '@/components/pub/icons';
import {MotionBox} from '@/components/pub/interAtion/MotionBox';
import {motion, AnimatePresence} from 'framer-motion';

const HoppangTypography = () => {
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
            image: '/img/brand/hoppang/process_01.png',
            textPosition: 'top' as const,
        },
        {
            id: 2,
            number: '02',
            title: '디지털 제작',
            image: '/img/brand/hoppang/process_02.png',
            textPosition: 'bottom' as const,
        },
        {
            id: 3,
            number: '03',
            title: '검수',
            image: '/img/brand/hoppang/process_03.png',
            textPosition: 'bottom' as const,
        },
    ];

    return (
        <main className="relative w-full min-h-screen">
            {/* 헤더 섹션 */}
            <section className='w-full bg-[#3E0300] h-[480px] relative lg:h-[620px] '>
                <div className=''>
                    <section className="overflow-hidden  pt-[60px] w-full max-w-[1220px] px-5 mx-auto lg:mt-[60px]">
                        <div className='absolute size-full flex left-[0px] gap-10 overflow-hidden top-0'>
                            <img src="/img/brand/hoppang/typo_back.png" alt="" className="object-cover"/>
                            <img src="/img/brand/hoppang/typo_back.png" alt=""
                                 className="object-cover relative -top-40"/>
                            <img src="/img/brand/hoppang/typo_back.png" alt="" className="object-cover"/>
                            <img src="/img/brand/hoppang/typo_back.png" alt="" className="object-cover"/>
                            <img src="/img/brand/hoppang/typo_back.png" alt=""
                                 className="object-cover relative -top-40"/>
                            <img src="/img/brand/hoppang/typo_back.png" alt=""
                                 className="object-cover relative -top-40"/>

                        </div>
                        {/* 뒤로가기 버튼 */}
                        <button
                            onClick={() => router.push('/pub/brand/bakery/hoppang')}
                            className=" border border-[#f40202] rounded-[65px] px-[13px] py-[3px] flex items-center gap-[2.6px] z-[20] relative"
                        >
                            <Icon name="arrowTop" className="w-[16px] h-[16px] *:fill-[#f40202] -rotate-90"/>
                            <span className="text-[12px] lg:text-[18px] text-[#f40202] tracking-[-0.36px]">삼립호빵</span>
                        </button>

                        {/* 메인 콘텐츠 */}
                        <div className=" w-full  mx-auto flex flex-col gap-[100px]">
                            {/* 타이틀 섹션 */}
                            <div className="flex flex-col gap-[8px] mt-6 lg:max-w-[600px]">
                                <h2 className="text-[32px] font-normal text-[#ECE6E6] samlip-hopbang lg:text-[64px]">Sandoll
                                    삼립호빵체</h2>
                                <p className='text-[18px] lg:text-[36px] font-normal samlip-hopbang text-[#ECE6E6] leading-[1.3] tracking-[-0.36px] max-w-[228px] lg:max-w-full'>찬바람이
                                    불어오면 생각나는 대한민국 대표 겨울간식 ‘삼립호빵’을 서체로 만나보세요</p>
                            </div>

                            {/* 설명 섹션 */}
                            <div className="flex flex-col gap-[16px] lg:flex-row lg:justify-between">
                                <p className="text-[12px] lg:text-[18px] text-[#c3b1b0] leading-[1.6] tracking-[-0.36px] w-full max-w-[282px] lg:max-w-[450px]">
                                    1971년부터 현재까지 50년의 헤리티지를 지킴과 동시에 매 해의 트렌드를 반영해 변화하는 '삼립호빵'의 모습을 담아 대한민국 폰트회사 (주)산돌과
                                    함께 개발한 서체입니다.
                                </p>

                                {/* 다운로드 버튼 */}
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
                                    className="bg-white px-[26px] py-[10px] flex items-center gap-[4px] lg:gap-[8px] justify-center w-[240px] lg:w-[500px] relative z-[100] cursor-pointer"
                                >
                                    <Icon name="down2"
                                          className="w-[18px] h-[18px] lg:w-[36px] lg:h-[36px] *:fill-[#3e0300]"/>
                                    <span
                                        className="text-[14px] lg:text-[26px] text-[#3e0300] tracking-[-0.42px] lg:leading-[1.4] font-bold">
                            Sandoll 삼립호빵체 다운로드
                            </span>
                                </button>
                            </div>
                        </div>
                    </section>
                </div>
            </section>

            {/* 본문 섹션 */}
            <section className="overflow-hidden relative w-full">
                <div className="bg-[#EFEDE4] lg:py-[90px]">
                    <aside
                        className='flex flex-col items-center gap-[28px]  py-[28px] pt-[40px] max-w-[1220px] px-5 mx-auto'>
                        <img src="/img/brand/hoppang/typo_back.svg" alt=""
                             className='absolute top-0 left-1/2 w-full -translate-x-1/2'/>
                        {/* 서체 소개 섹션 */}
                        <div className="flex flex-col items-start w-full">
                            {/* 서체 특징 이미지 섹션 */}
                            <div className="relative mx-auto w-full">
                                <MotionBox>
                                    <img src="/img/brand/hoppang/hoppang_symbol.svg" alt=""
                                         className="max-w-[158px] lg:max-w-[240px] w-full mx-auto"/>
                                </MotionBox>

                                <div
                                    className="flex flex-col gap-[11px] lg:gap-[22px] items-center text-center mt-8 mx-auto">
                                    {/* 제목 */}
                                    <p className="samlip-hopbang text-[22px] lg:text-[46px] text-[#3e0300] leading-[1.3] tracking-[-0.66px] ">
                                        찬바람이 싸늘하게 두 뺨을 스치면, <br/> 따스하던 삼립호빵 몹시도 그리웁구나~
                                    </p>

                                    {/* 본문 */}
                                    <p className="text-[14px] lg:text-[22px] text-[#653533] leading-[1.7] tracking-[-0.42px] ">
                                        장체 구조의 젊고 캐주얼한 느낌을 가지면서 '호호~ 호빵'이 떠오르는 룩의 이 서체는, 삼립호빵의 기존 BI를 기반으로 호빵의 모습이 더 잘
                                        연상되는 동글동글하고 통통한 느낌을 담은 자소 디자인을 추가하여, 삼립호빵 서체만의 개성이 드러나도록 해주었습니다. 이러한 곡선적 자음들을
                                        직선적 모음들이 잘 잡아주고, 서로 잘 어우러져 캐주얼한 룩을 줍니다.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>

                <div className='overflow-hidden relative'>
                    {/* 한글 섹션 */}
                    <div className="bg-[#fdfdfc] w-full py-[34px]  lg:pt-[90px] lg:pb-[170px]">
                        <div className="flex flex-col gap-[24px] max-w-[1220px] px-5 mx-auto">
                            <div className="flex flex-col gap-[24px] lg:gap-[40px]">
                                <h3 className="text-[22px] lg:text-[48px] font-normal text-[#3e0300] samlip-hopbang">한글
                                    2,780자</h3>

                                <ul className="flex flex-col gap-[16px] lg:gap-[40px]">
                                    {/* 첫 번째 특징 */}
                                    <li className="flex flex-col gap-[4px]">
                                        <h4 className="text-[16px] lg:text-[40px] font-normal text-[#3e0300] samlip-hopbang">첫
                                            번째 특징, 왼쪽 세로 획과 오른쪽 획의 비대칭 균형</h4>
                                        <p className="text-[12px] lg:text-[18px] text-[#3e0300] leading-[1.6] tracking-[-0.36px] w-full">
                                            왼쪽 세로획의 둥근 자소 디자인에 반해 윗쪽과 오른쪽의 획은 직선으로 잡혀있는 모습을 특히 ㄴ, ㄷ, ㄹ, ㅁ, ㅂ 자음에서 더 잘 찾을
                                            수 있는데, 이런 특징들이 호빵의 시각적 이미지를 표현해내면서도 좋은 가독성을 줍니다.
                                        </p>
                                    </li>

                                    {/* 두 번째 특징 */}
                                    <li className="flex flex-col gap-[4px]">
                                        <h4 className="text-[16px] lg:text-[40px] font-normal text-[#3e0300] samlip-hopbang">두
                                            번째 특징, 호빵의 모습을 꼭 닮은 ㅇ의 디자인</h4>
                                        <p className="text-[12px] lg:text-[18px] text-[#3e0300] leading-[1.6] tracking-[-0.36px] w-full">
                                            'ㅇ'의 위쪽은 살짝 볼록하게, ㅇ의 아래쪽은 상대적으로 플랫하게 디자인되어 호빵의 귀여운 모습과 유사한 아이덴티티를 보입니다.
                                        </p>
                                    </li>

                                    {/* 세 번째 특징 */}
                                    <li className="flex flex-col gap-[4px]">
                                        <h4 className="text-[16px] lg:text-[40px] font-normal text-[#3e0300] samlip-hopbang">세
                                            번째 특징, 호마크를 닮은 ㅎ, ㅊ의 꼭지 조형</h4>
                                    </li>
                                </ul>
                            </div>

                            {/* 한글 이미지 */}
                            <div className="relative w-full max-w-[1220px] lg:px-5">
                                <div
                                    className="overflow-visible relative inset-0 w-full group aspect-[3.5/1] lg:mt-[110px] hidden lg:block">
                                    <img
                                        src="/img/brand/hoppang/typo_01.png"
                                        alt="한글 서체 예시"
                                        className="object-cover absolute top-0 left-0 w-full h-full transition-opacity duration-200 group-hover:opacity-0"
                                    />
                                    <img
                                        src="/img/brand/hoppang/typo_01_active.png"
                                        alt="한글 서체 예시 활성화"
                                        className="object-cover absolute top-0 left-0 w-full h-full opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                                    />
                                    <img src="/img/brand/hoppang/typo_main.png" alt=""
                                         className="object-cover w-full h-full"/>
                                </div>
                                <img src="/img/brand/hoppang/typo_01_mo.png" alt=""
                                     className="object-cover w-full lg:hidden"/>
                            </div>
                        </div>
                    </div>

                    {/* 라틴 섹션 */}
                    <div className="bg-[#f4f3ed] w-full py-[28px] px-[20px] lg:pt-[90px] lg:pb-[110px]">
                        <div className="flex flex-col gap-[28px] items-center mx-auto max-w-[1220px]">
                            <div className="flex flex-col gap-[4px] items-start w-full">
                                <h3 className="text-[22px] lg:text-[48px] font-normal text-[#3e0300] samlip-hopbang">Latin
                                    95자</h3>
                                <p className="text-[12px] lg:text-[18px] text-[#3e0300] leading-[1.6] tracking-[-0.36px] w-full">기존의
                                    한글의 획과 맞게 손글씨의 맛을 살린 휴머니스트 스타일의 라틴으로 디자인을 진행하였습니다.</p>
                            </div>
                            <div
                                className="overflow-visible relative inset-0 w-full max-w-[1020px] mx-auto group aspect-[2.3/1] lg:mt-[40px] hidden lg:block">
                                <img
                                    src="/img/brand/hoppang/typo_02.png"
                                    alt="한글 서체 예시"
                                    className="object-cover absolute top-0 left-0 w-full h-full transition-opacity duration-200 group-hover:opacity-0"
                                />
                                <img
                                    src="/img/brand/hoppang/typo_02_active.png"
                                    alt="한글 서체 예시 활성화"
                                    className="object-cover absolute top-0 left-0 w-full h-full opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                                />
                                <img src="/img/brand/hoppang/typo_main_02.png" alt=""
                                     className="object-cover w-full h-full"/>
                            </div>
                            <img src="/img/brand/hoppang/typo_02_mo.png" alt=""
                                 className="object-cover w-full lg:hidden"/>
                        </div>
                    </div>

                    {/* Dingbat & Symbol 섹션 */}
                    <div className="bg-white w-full py-[28px] px-[20px] lg:pb-[135px] lg:pt-[90px] ">
                        <div className="flex flex-col gap-[28px] items-center mx-auto">
                            <div className="flex flex-col gap-[4px] items-start w-full max-w-[1220px] ">
                                <h3 className="text-[22px] font-normal text-[#3e0300] samlip-hopbang lg:text-[48px]">Dingbat
                                    & Symbol</h3>
                                <p className="text-[12px] lg:text-[18px] text-[#3e0300] leading-[1.6] tracking-[-0.36px] w-full ">
                                    호빵을 닮은 온점의 디자인처럼, 서체의 룩에 맞춰 제작된 기본 문장부호와 통화기호, 저작권 마크, 즐겨쓰는 특수문자 등이 포함되어 있습니다. 딩벳은 총
                                    14가지로 호마크, 호빵, 찜기 등 삼립호빵하면 생각하는 아이콘들로 구성되어 있습니다.
                                </p>
                            </div>
                            <div
                                className="overflow-visible relative inset-0 w-full max-w-[1020px] mx-auto group aspect-[2.5/1] hidden lg:block">
                                <img
                                    src="/img/brand/hoppang/typo_03.png"
                                    alt="한글 서체 예시"
                                    className="object-cover absolute top-0 left-0 w-full h-full transition-opacity duration-200 group-hover:opacity-0"
                                />
                                <img
                                    src="/img/brand/hoppang/typo_03_active.png"
                                    alt="한글 서체 예시 활성화"
                                    className="object-cover absolute top-0 left-0 w-full h-full opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                                />
                                <img src="/img/brand/hoppang/typo_main_03.png" alt=""
                                     className="object-cover w-full h-full"/>
                            </div>
                            <img src="/img/brand/hoppang/typo_03_mo.png" alt=""
                                 className="object-cover w-full lg:hidden"/>
                        </div>
                        {/* 서체 2가지 버전  */}
                        <div
                            className="flex gap-[20px] items-center px-5 justify-center pt-[46px] lg:gap-[120px] lg:pt-[90px]">
                            {/* Basic Ver. */}
                            <div className="flex flex-col gap-[8px] items-center text-center">
                                <p className="samlip-hopbang text-[14px] lg:text-[32px] text-[#3e0300] leading-[1.6] tracking-[-0.42px] whitespace-pre">
                                    Basic Ver.
                                </p>
                                <div
                                    className="samlip-hopbang text-[21px] lg:text-[60px] text-[#1a0100] leading-[1.2] tracking-[-0.105px] whitespace-pre">
                                    <p className="mb-0">50주년 삼립호빵</p>
                                    <p>토종효모 야채피자</p>
                                </div>
                                <div
                                    className="samlip-hopbang text-[14px] lg:text-[36px] text-[#1a0100] leading-[1.2] tracking-[-0.07px]">
                                    <p className="mb-0">야채호빵 50주년</p>
                                    <p>삼립 토종효모피자</p>
                                </div>
                                <p className="samlip-hopbang text-[10px] lg:text-[24px] text-[#1a0100] leading-[1.2] tracking-[-0.05px]">
                                    삼립호빵 50주년 토종효모 야채피자
                                </p>
                            </div>

                            {/* Outline Ver. */}
                            <div className="flex flex-col gap-[8px] items-center text-center samlip-hopbang-outline">
                                <p className=" text-[14px] lg:text-[32px] text-[#3e0300] leading-[1.6] tracking-[-0.42px] whitespace-pre">
                                    Outline Ver.
                                </p>
                                <div
                                    className="text-[21px] lg:text-[60px] text-[#1a0100] leading-[1.2] tracking-[-0.105px] whitespace-pre">
                                    <p className="mb-0">50주년 삼립호빵</p>
                                    <p>토종효모 야채피자</p>
                                </div>
                                <div
                                    className="text-[14px] lg:text-[36px] text-[#1a0100] leading-[1.2] tracking-[-0.07px]">
                                    <p className="mb-0">야채호빵 50주년</p>
                                    <p>삼립 토종효모피자</p>
                                </div>
                                <p className="text-[10px] lg:text-[24px] text-[#1a0100] leading-[1.2] tracking-[-0.05px]">
                                    삼립호빵 50주년 토종효모 야채피자
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 제작과정 섹션 */}
                <div className="w-full py-[35px] relative overflow-hidden lg:pt-[210px] lg:pb-[135px] bg-[#F8F7F3]">
                    <img src="/img/brand/hoppang/process_back.svg" alt=""
                         className='absolute top-0 left-1/2 -translate-x-1/2'/>
                    <div className='absolute bottom-[-70%] w-full h-full bg-[#FBF6ED] lg:bottom-[-80%]'></div>
                    <div className="flex flex-col gap-[24px] items-center px-[20px] relative z-10">
                        <h2 className="text-[16px] font-semibold text-[#1a0100] text-center tracking-[-0.48px] leading-[1.3] samlip-hopbang lg:text-[26px]">제작과정</h2>
                        <div className="flex gap-[10px] items-center lg:gap-[32px] lg:mt-[40px]">
                            {processSteps.map((step) => (
                                <MotionBox
                                    key={step.id}
                                    delay={step.id * 0.2}>
                                    <div
                                        className="flex relative flex-col justify-center items-center gap-[8px] lg:gap-[20px]">
                                        <div className="flex flex-col justify-center items-center">
                                            {/* 숫자 */}
                                            <p className="text-[10px] lg:text-[15px] font-bold text-[#1a0100] mb-0">{step.number}</p>
                                            {/* 제목 */}
                                            <p className="text-[10px] lg:text-[15px] text-[#1a0100]">{step.title}</p>
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

                {/* 다운로드 및 라이선스 섹션 */}
                <div ref={downloadSectionRef}
                     className="bg-[#3e0300] w-full py-[38px]  lg:py-[114px] lg:px-0 flex flex-col gap-[40px] lg:gap-[68px] items-center lg:pb-[135px]">
                    <section className="w-full lg:w-[781px] flex flex-col gap-0 lg:gap-[68px] items-center">
                        <div className='flex flex-col gap-0 items-center w-full lg:w-full lg:gap-6'>
                            <h2 className="text-[16px] lg:text-[54px] font-bold text-[#ece6e6] samlip-hopbang text-center leading-[1.1]">Sandoll
                                삼립호빵체 다운로드</h2>
                            <p className="mb-0 text-[10px] lg:text-[18px] text-[#ece6e6] text-center leading-[1.6] tracking-[-0.3px] lg:tracking-[-0.18px] mt-0 lg:mt-0 w-full lg:w-[547px]">
                                서체를 무료로 다운로드 받으실 수 있습니다. <br className="lg:hidden"/>
                                <span className="lg:block lg:mt-0">(Sandoll 삼립호빵체는 2020년 11월 15일부터 다운로드하실 수 있습니다)</span>
                            </p>
                        </div>
                        <div>
                            <div
                                className="flex gap-[8px] lg:gap-[20px] justify-center items-center w-full  mb-2 lg:mb-0 mt-6 lg:mt-0">
                                <button
                                    onClick={() => {
                                        const link = document.createElement('a');
                                        link.href = '/img/brand/hoppang/samlip-hoppang/samlip-hoppang-otf.zip';
                                        link.download = 'samlip-hoppang-otf.zip';
                                        document.body.appendChild(link);
                                        link.click();
                                        document.body.removeChild(link);
                                    }}
                                    className="bg-white px-[27px] py-[12px] lg:px-[67px] lg:py-[30px] flex items-center gap-[4px] justify-center flex-1 lg:flex-none"
                                >
                                    <Icon name="down2" className="size-[14px] lg:size-[36px] *:fill-[#3e0300]"/>
                                    <span
                                        className="text-[12px] lg:text-[26px] font-bold text-[#3e0300] tracking-[-0.36px] lg:tracking-[-0.13px] leading-[1.4] whitespace-nowrap">
                            OTF 다운로드
                        </span>
                                </button>
                                <button
                                    onClick={() => {
                                        const link = document.createElement('a');
                                        link.href = '/img/brand/hoppang/samlip-hoppang/samlip-hoppang-ttf.zip';
                                        link.download = 'samlip-hoppang-ttf.zip';
                                        document.body.appendChild(link);
                                        link.click();
                                        document.body.removeChild(link);
                                    }}
                                    className="bg-white px-[27px] py-[12px] lg:px-[67px] lg:py-[30px] flex items-center gap-[4px] justify-center flex-1 lg:flex-none"
                                >
                                    <Icon name="down2" className="size-[14px] lg:size-[36px] *:fill-[#3e0300]"/>
                                    <span
                                        className="text-[12px] lg:text-[26px] font-bold text-[#3e0300] tracking-[-0.36px] lg:tracking-[-0.13px] leading-[1.4]">
                            TTF 다운로드
                        </span>
                                </button>
                            </div>
                            <p className="text-[10px] mt-5 lg:mt-6 lg:text-[15px] text-[#ece6e6] text-center tracking-[-0.3px] lg:tracking-[-0.15px] w-full lg:w-full">*PC에서
                                다운로드 받으시면 더 다양하게 활용 가능합니다.</p>
                        </div>
                    </section>

                    {/* 구분선 */}
                    <div className="w-full h-px bg-[#ece6e6] opacity-20"/>

                    <div className="w-full">
                        {/* 라이선스 섹션 */}
                        <div
                            className="flex flex-col gap-[4px] lg:gap-[12px] items-center text-[#ece6e6] text-center px-5 lg:px-0">
                            <h3 className="text-[14px] lg:text-[26px] font-bold tracking-[-0.42px] lg:tracking-[-0.13px] leading-[1.7] lg:leading-[1.4] samlip-hopbang ">
                                Sandoll 삼립호빵체 라이선스 표기
                            </h3>
                            <p className="text-[10px] lg:text-[15px] leading-[1.6] tracking-[-0.3px] lg:tracking-[-0.15px] max-w-[280px] lg:max-w-[900px]">
                                Sandoll 삼립호빵체는 개인 및 기업 사용자를 포함한 모든 사용자에게 무료로 제공되며 자유롭게 수정하고 재배포하실 수 있습니다. 단, 글꼴 자체를 유료로
                                판매하는 것은 금지하며, Sandoll 삼립호빵체는 본 저작권 안내와 라이선스 전문을 포함해서 다른 소프트웨어와 번들하거나 재배포 또는 판매가 가능합니다.
                                라이선스 전문을 포함하기 어려울 경우, Sandoll 삼립호빵체의 출처 표기를 권장합니다. 예) 이 페이지는 ㈜SPC삼립에서 제공한 Sandoll 삼립호빵체가
                                사용되어 있습니다.
                            </p>
                        </div>
                    </div>

                    {/* 사용범위 보기 */}
                    <div className="flex flex-col gap-[12px] lg:gap-[20px] items-center w-full">
                        <button
                            onClick={() => setIsLicenseExpanded(!isLicenseExpanded)}
                            className="flex items-center gap-[8px] lg:gap-[8px] justify-center">
                            <span
                                className="text-[10px] lg:text-[18px] text-[#ece6e6] underline text-center tracking-[-0.3px] lg:tracking-[-0.18px] font-bold justify-center">Sandoll 삼립호빵체 사용범위 보기</span>
                            <Icon
                                name="arrow_round"
                                className={`w-[8px] h-[8px] lg:w-[12px] lg:h-[12px] *:fill-[#ece6e6] transition-transform ${isLicenseExpanded ? '-rotate-90' : 'rotate-90'}`}/>
                        </button>

                        <AnimatePresence>
                            {isLicenseExpanded && (
                                <motion.div
                                    initial={{height: 0, opacity: 0}}
                                    animate={{height: 'auto', opacity: 1}}
                                    exit={{height: 0, opacity: 0}}
                                    transition={{duration: 0.3, ease: 'easeInOut'}}
                                    className='w-full'
                                >
                                    <div className='overflow-x-auto px-5 w-full lg:px-0'>
                                        {/* 라이선스 사용범위 표 */}

                                        <table className="license-table max-w-[823px] mx-auto">
                                            <thead>
                                            <tr>
                                                <th className="category">
                                                    카테고리
                                                </th>
                                                <th>
                                                    사용범위
                                                </th>
                                                <th className="available">
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
                                                                className="category"
                                                                rowSpan={categoryRowCount}
                                                            >
                                                                {row.category}
                                                            </td>
                                                        )}
                                                        <td>
                                                            {row.usage}
                                                        </td>
                                                        <td>
                                                            {row.available ? '○' : ''}
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                            </tbody>
                                        </table>
                                        <div
                                            className="text-[10px] max-w-[834px] mx-auto lg:text-[15px] text-[#ece6e6] leading-[1.6] tracking-[-0.3px] lg:tracking-[-0.15px] mt-[12px]">
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
                                            <p>Sandoll 삼립호빵체의 저작권은 ㈜SPC삼립과 ㈜산돌이 공동 소유하고 있습니다.</p>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default HoppangTypography;
