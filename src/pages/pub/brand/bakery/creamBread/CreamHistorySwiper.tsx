import React, {useState, useRef} from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Navigation} from 'swiper/modules';
import type {Swiper as SwiperType} from 'swiper';
import {Icon} from '@/components/pub/icons';
import 'swiper/css/bundle';

// 크림빵 Brand History 전용 하드코딩 데이터
const brandHistoryData = [
    {
        id: 1,
        date: '1964',
        image: '/img/brand/cream_bread/history_01.png',
        title: '크림빵 출시',
        description: '새로운 제빵 기술이 적용됨과 더불어 국내 최초로 비닐 포장해 출시',
    },
    {
        id: 2,
        date: '2023. 09',
        image: '/img/brand/cream_bread/history_02.png',
        title: 'KRI 한국기록원 공식 인증 WRC 미국세계기록위원회',
        description: '정통 크림빵 10년간 3억 2천만개 판매하여 국내 최대 판매 크림빵 인증',
    },
    {
        id: 3,
        date: '2024. 02',
        image: '/img/brand/cream_bread/history_03.png',
        title: '정통 크림빵 출시 60주년 기념 크림대빵 한정 판매',
        description: '',
    },
    {
        id: 4,
        date: '2024. 05',
        image: '/img/brand/cream_bread/history_04.png',
        title: '정통 크림빵 60주년 팝업스토어 크림 아뜰리에 오픈',
        description: '',
    },
    {
        id: 5,
        date: '2024. 07',
        image: '/img/brand/cream_bread/history_05.png',
        title: "정통 크림빵 '크림 아뜰리에' 4종 출시",
        description: '',
    },
    {
        id: 6,
        date: '2024. 09',
        title: '오브젝트 바이 프라이즈 수상',
        description: '베스트 플레이스 부문 수상',
    },
    {
        id: 7,
        date: '2024. 09',
        title: '한국PR대상 통합 캠페인 부문 최우수상',
        description: '',
    },
    {
        id: 8,
        date: '2024. 09',
        title: '한국디지털광고 대상 디지털 마케팅 PR 부문 동상',
        description: '',
    },
    {
        id: 9,
        date: '2024. 09',
        title: '앤어워드 식음료 Winner 부문 수상',
        description: '',
    },
    {
        id: 10,
        date: '2024. 11',
        image: '/img/brand/cream_bread/history_06.png',
        title: '정통 크림빵 2024 한국PR대상 IMC부문 최우수상 수상',
        description: '누적 판매량 19억 개 기록',
    },
    {
        id: 11,
        date: '2025. 03',
        image: '/img/brand/cream_bread/history_07.png',
        title: '2025 IF어워드 타이포그래피 분야에서 크리미 화이트 폰트 수상',
        description: '60주년 기념 개발된 서체',
    },
] as const;

const CreamHistorySwiper: React.FC = () => {
    // PC 네비게이션
    const historyPrevRef = useRef<HTMLButtonElement>(null);
    const historyNextRef = useRef<HTMLButtonElement>(null);
    const [currentHistoryIndex, setCurrentHistoryIndex] = useState(0);

    // 모바일 네비게이션
    const historyPrevRefMo = useRef<HTMLButtonElement>(null);
    const historyNextRefMo = useRef<HTMLButtonElement>(null);
    const [currentHistoryIndexMo, setCurrentHistoryIndexMo] = useState(0);

    return (
        <div className="cream-history-wrap">
            <div className="cream-history-line"/>

            {/* PC: 기존 레이아웃 유지 */}
            <div className="hidden lg:block">
                <Swiper
                    modules={[Navigation]}
                    spaceBetween={0}
                    slidesPerView={1}
                    loop={false}
                    navigation={{
                        prevEl: historyPrevRef.current,
                        nextEl: historyNextRef.current,
                    }}
                    onSwiper={(swiper: SwiperType) => {
                        setTimeout(() => {
                            if (
                                swiper?.params?.navigation &&
                                typeof swiper.params.navigation !== 'boolean' &&
                                swiper.navigation
                            ) {
                                swiper.params.navigation.prevEl = historyPrevRef.current;
                                swiper.params.navigation.nextEl = historyNextRef.current;
                                swiper.navigation.init();
                                swiper.navigation.update();
                            }
                        }, 0);
                    }}
                    onSlideChange={(swiper: SwiperType) => setCurrentHistoryIndex(swiper.activeIndex)}
                    className="cream-history-swiper"
                >
                    {/* 슬라이드 1: 1964 ~ 2024.05 */}
                    <SwiperSlide>
                        <div className="cream-history-slide">
                            {/* 1964 */}
                            <div className="cream-history-item marker">
                                <div className="cream-history-dot"/>
                                <p className="cream-history-date">{brandHistoryData[0].date}</p>
                                <div className="cream-history-image">
                                    <img src={brandHistoryData[0].image!} alt={brandHistoryData[0].title}/>
                                </div>
                                <p className="cream-history-title">{brandHistoryData[0].title}</p>
                                {brandHistoryData[0].description ? (
                                    <p className="cream-history-desc">{brandHistoryData[0].description}</p>
                                ) : null}
                            </div>

                            {/* 2023.09 */}
                            <div className="cream-history-item">
                                <div className="cream-history-dot"/>
                                <p className="cream-history-date">{brandHistoryData[1].date}</p>
                                <div className="cream-history-image">
                                    <img src={brandHistoryData[1].image!} alt={brandHistoryData[1].title}/>
                                </div>
                                <p className="cream-history-title">{brandHistoryData[1].title}</p>
                                {brandHistoryData[1].description ? (
                                    <p className="cream-history-desc">{brandHistoryData[1].description}</p>
                                ) : null}
                            </div>

                            {/* 2024.02 */}
                            <div className="cream-history-item">
                                <div className="cream-history-dot"/>
                                <p className="cream-history-date">{brandHistoryData[2].date}</p>
                                <div className="cream-history-image">
                                    <img src={brandHistoryData[2].image!} alt={brandHistoryData[2].title}/>
                                </div>
                                <p className="cream-history-title">{brandHistoryData[2].title}</p>
                            </div>

                            {/* 2024.05 */}
                            <div className="cream-history-item">
                                <div className="cream-history-dot"/>
                                <p className="cream-history-date">{brandHistoryData[3].date}</p>
                                <div className="cream-history-image">
                                    <img src={brandHistoryData[3].image!} alt={brandHistoryData[3].title}/>
                                </div>
                                <p className="cream-history-title">{brandHistoryData[3].title}</p>
                            </div>
                        </div>
                    </SwiperSlide>

                    {/* 슬라이드 2: 2024.07 + 2024.09(한 박스 4열) */}
                    <SwiperSlide>
                        <div className="cream-history-slide">
                            {/* 2024.07 */}
                            <div className="cream-history-item">
                                <div className="cream-history-dot"/>
                                <p className="cream-history-date">{brandHistoryData[4].date}</p>
                                <div className="cream-history-image">
                                    <img src={brandHistoryData[4].image!} alt={brandHistoryData[4].title}/>
                                </div>
                                <p className="cream-history-title">{brandHistoryData[4].title}</p>
                            </div>

                            {/* 2024.09 통합 박스 */}
                            <div className="cream-history-awards-wrap">
                                <div className="cream-history-dot"/>
                                <p className="cream-history-date">2024. 09</p>
                                <div className="cream-history-awards-box">
                                    <div className="cream-history-awards-grid">
                                        <div className="cream-history-award">
                                            <div className="cream-history-award-dot"/>
                                            <p className="cream-history-award-title">{brandHistoryData[5].title}</p>
                                            {brandHistoryData[5].description ? (
                                                <p className="cream-history-award-desc">{brandHistoryData[5].description}</p>
                                            ) : null}
                                        </div>
                                        <div className="cream-history-award">
                                            <div className="cream-history-award-dot"/>
                                            <p className="cream-history-award-title">{brandHistoryData[6].title}</p>
                                        </div>
                                        <div className="cream-history-award">
                                            <div className="cream-history-award-dot"/>
                                            <p className="cream-history-award-title">{brandHistoryData[7].title}</p>
                                        </div>
                                        <div className="cream-history-award">
                                            <div className="cream-history-award-dot"/>
                                            <p className="cream-history-award-title">{brandHistoryData[8].title}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>

                    {/* 슬라이드 3: 2024.11 ~ 2025.03 */}
                    <SwiperSlide>
                        <div className="cream-history-slide">
                            {/* 2024.11 */}
                            <div className="cream-history-item">
                                <div className="cream-history-dot"/>
                                <p className="cream-history-date">{brandHistoryData[9].date}</p>
                                <div className="cream-history-image">
                                    <img src={brandHistoryData[9].image!} alt={brandHistoryData[9].title}/>
                                </div>
                                <p className="cream-history-title">{brandHistoryData[9].title}</p>
                                {brandHistoryData[9].description ? (
                                    <p className="cream-history-desc">{brandHistoryData[9].description}</p>
                                ) : null}
                            </div>

                            {/* 2025.03 */}
                            <div className="cream-history-item">
                                <div className="cream-history-dot"/>
                                <p className="cream-history-date">{brandHistoryData[10].date}</p>
                                <div className="cream-history-image">
                                    <img src={brandHistoryData[10].image!} alt={brandHistoryData[10].title}/>
                                </div>
                                <p className="cream-history-title">{brandHistoryData[10].title}</p>
                                {brandHistoryData[10].description ? (
                                    <p className="cream-history-desc">{brandHistoryData[10].description}</p>
                                ) : null}
                            </div>
                        </div>
                    </SwiperSlide>
                </Swiper>

                {/* 네비게이션 */}
                <div className="cream-history-nav">
                    <button
                        ref={historyPrevRef}
                        type="button"
                        aria-label="이전 히스토리"
                        className="cream-history-nav-btn"
                        disabled={currentHistoryIndex === 0}
                    >
                        <Icon name="arrowTop" className="-rotate-90 size-[20px] lg:size-[28px] [&_*]:fill-white"/>
                    </button>
                    <button
                        ref={historyNextRef}
                        type="button"
                        aria-label="다음 히스토리"
                        className="cream-history-nav-btn"
                        disabled={currentHistoryIndex === 2}
                    >
                        <Icon name="arrowTop" className="rotate-90 size-[20px] lg:size-[28px] [&_*]:fill-white"/>
                    </button>
                </div>
            </div>

            {/* Mobile: 2개씩 보여주기 + (특정 구간) 이어지게 */}
            <div className="block lg:hidden">
                <Swiper
                    modules={[Navigation]}
                    spaceBetween={0}
                    slidesPerView={1}
                    loop={false}
                    navigation={{
                        prevEl: historyPrevRefMo.current,
                        nextEl: historyNextRefMo.current,
                    }}
                    onSwiper={(swiper: SwiperType) => {
                        setTimeout(() => {
                            if (
                                swiper?.params?.navigation &&
                                typeof swiper.params.navigation !== 'boolean' &&
                                swiper.navigation
                            ) {
                                swiper.params.navigation.prevEl = historyPrevRefMo.current;
                                swiper.params.navigation.nextEl = historyNextRefMo.current;
                                swiper.navigation.init();
                                swiper.navigation.update();
                            }
                        }, 0);
                    }}
                    onSlideChange={(swiper: SwiperType) => setCurrentHistoryIndexMo(swiper.activeIndex)}
                    className="cream-history-swiper"
                >
                    {/* MO 슬라이드 1: 1964 + 2023.09 */}
                    <SwiperSlide>
                        <div className="!mr-auto cream-history-slide cream-history-slide--mo">
                            <div className="!items-end cream-history-item cream-history-item--mo">
                                <div className="flex flex-col items-center max-w-[120px] ">
                                    <div className="cream-history-dot"/>
                                    <p className="cream-history-date">{brandHistoryData[0].date}</p>
                                    <div className="cream-history-image">
                                        <img src={brandHistoryData[0].image!} alt={brandHistoryData[0].title}/>
                                    </div>
                                    <p className="cream-history-title">{brandHistoryData[0].title}</p>
                                    {brandHistoryData[0].description ? (
                                        <p className="cream-history-desc">{brandHistoryData[0].description}</p>
                                    ) : null}
                                </div>
                            </div>

                            <div className="!items-start cream-history-item cream-history-item--mo">
                                <div className="flex flex-col items-center max-w-[120px]">
                                    <div className="cream-history-dot"/>
                                    <p className="cream-history-date">{brandHistoryData[1].date}</p>
                                    <div className="cream-history-image">
                                        <img src={brandHistoryData[1].image!} alt={brandHistoryData[1].title}/>
                                    </div>
                                    <p className="cream-history-title">{brandHistoryData[1].title}</p>
                                    {brandHistoryData[1].description ? (
                                        <p className="cream-history-desc">{brandHistoryData[1].description}</p>
                                    ) : null}
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>

                    {/* MO 슬라이드 2: 2024.02 + 2024.05 */}
                    <SwiperSlide>
                        <div className="cream-history-slide cream-history-slide--mo">
                            <div className="!items-end cream-history-item cream-history-item--mo">
                                <div className="flex flex-col items-center max-w-[120px]">
                                    <div className="cream-history-dot"/>
                                    <p className="cream-history-date">{brandHistoryData[2].date}</p>
                                    <div className="cream-history-image">
                                        <img src={brandHistoryData[2].image!} alt={brandHistoryData[2].title}/>
                                    </div>
                                    <p className="cream-history-title">{brandHistoryData[2].title}</p>
                                </div>
                            </div>
                            <div className="!items-start cream-history-item cream-history-item--mo">
                                <div className="flex flex-col items-center max-w-[120px]">
                                    <div className="cream-history-dot"/>
                                    <p className="cream-history-date">{brandHistoryData[3].date}</p>
                                    <div className="cream-history-image">
                                        <img src={brandHistoryData[3].image!} alt={brandHistoryData[3].title}/>
                                    </div>
                                    <p className="cream-history-title">{brandHistoryData[3].title}</p>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>

                    {/* MO 슬라이드 3: 2024.07 + 2024.09(1) */}
                    <SwiperSlide>
                        <div className="cream-history-slide cream-history-slide--mo">
                            <div className="!items-end cream-history-item cream-history-item--mo">
                                <div className="flex flex-col items-center max-w-[120px]">
                                    <div className="cream-history-dot"/>
                                    <p className="cream-history-date">{brandHistoryData[4].date}</p>
                                    <div className="cream-history-image">
                                        <img src={brandHistoryData[4].image!} alt={brandHistoryData[4].title}/>
                                    </div>
                                    <p className="cream-history-title">{brandHistoryData[4].title}</p>
                                </div>
                            </div>

                            <div className="!items-start cream-history-item cream-history-item--mo">
                                <div className="flex flex-col items-center w-full">
                                    <div className="cream-history-dot"/>
                                    <p className="cream-history-date">{brandHistoryData[5].date}</p>
                                    <div className='bg-[#820F17] pl-[10px] py-[16px] w-full !h-[120px]'>
                                        <div className='relative'>
                                            <div className='bg-[#F36770] size-[7px]'></div>
                                            <div
                                                className="w-full h-[1px] absolute top-[50%] left-0 translate-y-[-50%]"
                                                style={{
                                                    background: 'linear-gradient(90deg, rgba(243, 103, 112, 0) 0%, rgba(243, 103, 112, 0.25) 100%)',
                                                }}
                                            ></div>
                                        </div>
                                        <p className="!text-white !text-left cream-history-title !mt-[6px] max-w-[90px] text-[12px]">{brandHistoryData[5].title}</p>
                                        <p className="!text-white !text-left cream-history-desc max-w-[90px]">{brandHistoryData[5].description}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>

                    {/* MO 슬라이드 4: 2024.09(2) + 2024.09(3) */}
                    <SwiperSlide className='relative'>
                        <div className="cream-history-slide cream-history-slide--mo !gap-0">
                            <div className="!items-start cream-history-item cream-history-item--mo">
                                <div className="flex flex-col items-center w-full">
                                    <div className="cream-history-dot"/>
                                    <p className="!text-transparent cream-history-date">{brandHistoryData[6].date}</p>
                                    <div
                                        className='bg-[#820F17] pl-[10px] py-[16px] w-full flex flex-col items-end !h-[120px] relative'>
                                        <div
                                            className="w-full h-[1px] absolute top-[19px] left-0 translate-y-[-50%]"
                                            style={{
                                                background: 'linear-gradient(90deg, rgba(243, 103, 112, 0.25) 0%, rgba(243, 103, 112, 0.5) 100%)',
                                            }}
                                        ></div>
                                        <div>
                                            <div className='bg-[#F36770] size-[7px]'></div>
                                            <div className='flex justify-start items-strat'>
                                                <div className='max-w-[90px]'>
                                                    <p className="!text-white !text-left cream-history-title !mt-[6px] max-w-[90px] text-[12px]">{brandHistoryData[6].title}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="!items-start cream-history-item cream-history-item--mo">
                                <div className="flex flex-col items-center w-full">
                                    <div className="cream-history-dot"/>
                                    <p className="absolute left-[50%] translate-x-[-50%] top-[10px] cream-history-date">{brandHistoryData[7].date}</p>
                                    <p className="!text-transparent cream-history-date">{brandHistoryData[7].date}</p>
                                    <div
                                        className='bg-[#820F17] pl-[10px] py-[16px] w-full flex flex-col items-start !h-[120px] relative'>

                                        <div
                                            className="w-full h-[1px] absolute top-[19px] left-0 translate-y-[-50%]"
                                            style={{
                                                background: 'linear-gradient(90deg, rgba(243, 103, 112, 0.5) 0%, rgba(243, 103, 112, 0.75) 100%)',
                                            }}
                                        ></div>

                                        <div className='w-full'>
                                            <div className='bg-[#F36770] size-[7px]'></div>
                                            <div className='flex justify-start items-strat'>
                                                <div className='max-w-[110px]'>
                                                    <p className="!text-white !text-left cream-history-title !mt-[6px] text-[12px]">{brandHistoryData[7].title}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>

                    {/* MO 슬라이드 5: 2024.09(4) + 2024.11 */}
                    <SwiperSlide>
                        <div className="cream-history-slide cream-history-slide--mo">
                            <div className="!items-start cream-history-item cream-history-item--mo">
                                <div className="flex flex-col items-center w-full">
                                    <div className="cream-history-dot"/>
                                    <p className="t cream-history-date">{brandHistoryData[8].date}</p>
                                    <div
                                        className='bg-[#820F17] pr-[20px] py-[16px] w-full flex flex-col items-end !h-[120px] relative'>
                                        <div
                                            className="w-full h-[1px] absolute top-[19px] left-0 translate-y-[-50%]"
                                            style={{
                                                background: 'linear-gradient(90deg, rgba(243, 103, 112, 0.5) 0%, rgba(243, 103, 112, 0.75) 100%)',
                                            }}
                                        ></div>
                                        <div>
                                            <div className='bg-[#F36770] size-[7px]'></div>

                                            <p className="!text-white !text-left cream-history-title !mt-[6px] max-w-[90px] text-[12px]">{brandHistoryData[8].title}</p>
                                            <p className="!text-white !text-left cream-history-desc max-w-[90px]">{brandHistoryData[8].description}</p>

                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="!items-start cream-history-item cream-history-item--mo">
                                <div className="flex flex-col items-center max-w-[120px]">
                                    <div className="cream-history-dot"/>
                                    <p className="cream-history-date">{brandHistoryData[9].date}</p>
                                    <div className="cream-history-image">
                                        <img src={brandHistoryData[9].image!} alt={brandHistoryData[9].title}/>
                                    </div>
                                    <p className="cream-history-title">{brandHistoryData[9].title}</p>
                                    {brandHistoryData[9].description ? (
                                        <p className="cream-history-desc">{brandHistoryData[9].description}</p>
                                    ) : null}
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>

                    {/* MO 슬라이드 6: 2025.03 + (빈칸) */}
                    <SwiperSlide>
                        <div className="cream-history-slide cream-history-slide--mo">
                            <div className="!items-center cream-history-item cream-history-item--mo col-span-2">
                                <div className="flex flex-col items-center max-w-[120px]">
                                    <div className="cream-history-dot"/>
                                    <p className="cream-history-date">{brandHistoryData[10].date}</p>
                                    <div className="cream-history-image">
                                        <img src={brandHistoryData[10].image!} alt={brandHistoryData[10].title}/>
                                    </div>
                                    <p className="cream-history-title">{brandHistoryData[10].title}</p>
                                    {brandHistoryData[10].description ? (
                                        <p className="cream-history-desc">{brandHistoryData[10].description}</p>
                                    ) : null}
                                </div>
                            </div>

                            {/* 2개씩 보이기 유지용 빈칸 */}
                            <div className="cream-history-item cream-history-item--mo" aria-hidden="true"/>
                        </div>
                    </SwiperSlide>
                </Swiper>

                <div className="cream-history-nav">
                    <button
                        ref={historyPrevRefMo}
                        type="button"
                        aria-label="이전 히스토리(모바일)"
                        className="cream-history-nav-btn"
                        disabled={currentHistoryIndexMo === 0}
                    >
                        <Icon name="arrowTop" className="-rotate-90 size-[20px] lg:size-[32px] [&_*]:fill-white"/>
                    </button>
                    <button
                        ref={historyNextRefMo}
                        type="button"
                        aria-label="다음 히스토리(모바일)"
                        className="cream-history-nav-btn"
                        disabled={currentHistoryIndexMo === 5}
                    >
                        <Icon name="arrowTop" className="rotate-90 size-[20px] lg:size-[32px] [&_*]:fill-white"/>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreamHistorySwiper;
