import React, {useState, useEffect, useMemo, useRef} from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Navigation} from 'swiper/modules';
import type {Swiper as SwiperType} from 'swiper';
import {Icon} from '@/components/pub/icons';
import 'swiper/css/bundle';

interface HistoryItem {
    id: number;
    date: string;
    image?: string;
    title: string | React.ReactNode;
    description: string | React.ReactNode;
}

type Theme = 'default' | 'cream' | 'boreumdal' | 'yakgwa' | 'romanmeal' | 'migak';

interface BrandHistoryProps {
    data: HistoryItem[];
    theme?: Theme;
}

const useResponsiveChunkSize = () => {
    const [chunkSize, setChunkSize] = useState(4);
    useEffect(() => {
        const handleResize = () => {
            setChunkSize(window.innerWidth < 1024 ? 2 : 4);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    return chunkSize;
};

export const BrandHistory: React.FC<BrandHistoryProps> = ({data = [], theme = 'default'}) => {
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
    const chunkSize = useResponsiveChunkSize();

    const prevRef = useRef<HTMLButtonElement>(null);
    const nextRef = useRef<HTMLButtonElement>(null);

    // 테마별 색상 설정
    const themeColors = {
        default: {
            line: '#A68B8A',
            dot: '#A68B8A',
            text: '#3E0300',
            border: '#500C08',
            button: '#7E5654',
            buttonHover: '#6B1414',
        },
        cream: {
            line: '#F36770',
            dot: '#F36770',
            text: '#820F17',
            border: '#ED1C2A',
            button: '#ED1C2A',
            buttonHover: '#F14A56',
        },
        boreumdal: {
            line: '#F5B3C2',
            dot: '#F5B3C2',
            date: '#E35154',
            text: '#734B4C',
            border: '#500C08',
            button: '#E45356',
            buttonHover: '#E45356',
        },
        yakgwa: {
            line: '#4B2B23',
            dot: '#4B2B23',
            date: '#4B2B23',
            text: '#4B2B23',
            border: '#4B2B23',
            button: '#4B2B23',
            buttonHover: '#4B2B23',
        },
        romanmeal: {
            line: '#917569',
            dot: '#917569',
            date: '#E9D8B7',
            text: '#E9D8B7',
            border: '#E9D8B7',
            button: '#E9D8B7',
            buttonHover: '#E9D8B7',
            arrow: '#3D1909',
        },
        migak: {
            line: '#B0846B',
            dot: '#B0846B',
            date: '#6A4431',
            text: '#6A4431',
            border: '#6A4431',
            button: '#6A4431',
            buttonHover: '#6A4431',
        },
        project_h: {
            line: '#4E0C0D',
            dot: '#4E0C0D',
            date: '#4E0C0D',
            text: '#4E0C0D',
            border: '#4E0C0D',
            button: '#4E0C0D',
            buttonHover: '#4E0C0D',
        },

    };


    const colors = themeColors[theme] as any;
    // text 색상: text가 있으면 사용, 없으면 기본값
    const textColor = colors.text || '#3E0300';
    // date 색상: date가 있으면 date 색상 사용, 없으면 text 색상 사용
    const dateColor = colors.date || textColor;
    // title과 description은 모두 text 색상 사용
    const titleColor = textColor;
    const descriptionColor = textColor;
    // arrow 색상: arrow가 있으면 사용, 없으면 기본값(하얀색)
    const arrowColor = colors.arrow || '#FFFFFF';

    // 데이터 그룹화 (Chunking)
    const chunkedData = useMemo(() => {
        const result = [];
        for (let i = 0; i < data.length; i += chunkSize) {
            result.push(data.slice(i, i + chunkSize));
        }
        return result;
    }, [data, chunkSize]);

    return (
        <section className={`relative ${chunkedData.length > 1 ? 'pb-0' : 'pb-[96px]'} w-full`}>
            <div className="relative w-full">
                {/* 배경 가로선 */}
                <div className={`${theme === 'boreumdal' && "bg-white relative pt-[52px] pb-[68px] lg:px-[50px]"}`}>

                    {/* 보름달 테마일 때: 위 가로선, 아닐 때: 아래 가로선 */}
                    {theme === 'boreumdal' ? (
                        <div className="w-full h-[1px] absolute top-[57px] lg:top-[62px] z-0 lg:left-0"
                             style={{backgroundColor: colors.line}}></div>
                    ) : (
                        <div className="w-full h-[1px] absolute top-[6px] lg:top-[10px] z-0 "
                             style={{backgroundColor: colors.line}}></div>
                    )}
                    {/* 브러시 효과 테두리 - 보름달 테마에만 표시 */}
                    {theme === 'boreumdal' && (
                        <>
                            <div
                                className='absolute left-0 bottom-0 w-[6px] z-10 h-full bg-[#E35154]'
                                style={{
                                    filter: 'url(#brushTexture)',
                                }}
                            />
                            <div
                                className='absolute left-0 bottom-0 w-full h-[6px] bg-[#E35154]'
                                style={{
                                    filter: 'url(#brushTexture)',
                                }}
                            />
                            <div
                                className='absolute right-0 bottom-0 w-[6px] z-10 h-full bg-[#E35154]'
                                style={{
                                    filter: 'url(#brushTexture)',
                                }}
                            />
                            <div
                                className='absolute right-0 top-0 w-full h-[6px] bg-[#E35154]'
                                style={{
                                    filter: 'url(#brushTexture)',
                                }}
                            />
                        </>
                    )}
                    <Swiper
                        modules={[Navigation]}
                        // spaceBetween은 슬라이드(그룹) 간의 간격입니다.
                        // 그룹 내부 간격은 아래 div의 gap으로 조절하므로 여기는 0이어도 됩니다.
                        spaceBetween={0}

                        // ★ 중요: 그룹핑을 했기 때문에 무조건 1개씩 보여줘야 합니다.
                        // breakpoints 설정을 절대 넣지 마세요!
                        slidesPerView={1}

                        navigation={{
                            prevEl: prevRef.current,
                            nextEl: nextRef.current,
                        }}
                        onSwiper={(swiper: SwiperType) => {
                            setTimeout(() => {
                                if (swiper && swiper.params && swiper.params.navigation && typeof swiper.params.navigation !== 'boolean') {
                                    swiper.params.navigation.prevEl = prevRef.current;
                                    swiper.params.navigation.nextEl = nextRef.current;
                                    if (swiper.navigation && swiper.navigation.init) {
                                        swiper.navigation.init();
                                    }
                                    if (swiper.navigation && swiper.navigation.update) {
                                        swiper.navigation.update();
                                    }
                                }
                            }, 100);
                        }}
                        onSlideChange={(swiper: SwiperType) => setCurrentSlideIndex(swiper.activeIndex)}
                        className="brand-history-swiper max-w-[1180px] px-5 mx-auto  overflow-visible"
                    >
                        {chunkedData.map((group, groupIndex) => (
                            <SwiperSlide key={groupIndex}>
                                {/*
                    그룹 내부 레이아웃 (여기가 실제 4개를 배치하는 곳)
                    w-full: 전체 너비 사용
                    grid: 모바일/PC 간격 제어를 위해 flex 대신 grid가 더 안정적일 수 있으나, flex로 유지하며 gap 조절
                    justify-center: 마지막 장 아이템이 적을 때 중앙 정렬
                */}
                                <div
                                    className="flex justify-center items-start w-full gap-4 lg:gap-[60px] overflow-visible ">
                                    {group.map((item) => (
                                        <div
                                            key={item.id}
                                            // width를 고정하거나 flex-1로 균등 분배
                                            className="flex flex-col items-center w-full max-w-[120px] lg:max-w-[240px] z-10 relative mt-0 "
                                        >
                                            {/* 타임라인 점 */}
                                            <div
                                                className="flex overflow-visible relative justify-center items-end w-full h-[10px] lg:h-[30px] top-[1.5px] lg:top-[-10px]">
                                                <div className="size-[10px] lg:size-[20px] z-[1000]"
                                                     style={{backgroundColor: colors.dot}}></div>
                                            </div>

                                            {/* 컨텐츠 */}
                                            <div
                                                className="flex flex-col items-center gap-[12px] w-full pt-[20px] lg:pt-[32px]">
                                                <p className="text-[18px] lg:text-[36px] gt-ultra text-center lg:leading-[1.3]"
                                                   style={{color: dateColor}}>
                                                    {item.date}
                                                </p>

                                                {item.image && (
                                                    <div className="w-full bg-white aspect-square" style={{
                                                        borderColor: colors.border,
                                                        borderWidth: '1px',
                                                        borderStyle: 'solid'
                                                    }}>
                                                        <img
                                                            src={item.image}
                                                            alt={typeof item.title === 'string' ? item.title : 'Brand History'}
                                                            className="object-cover w-full h-full"
                                                        />
                                                    </div>
                                                )}

                                                <div>
                                                    {typeof item.title === 'string' ? (
                                                        <p className="text-[12px] unicode lg:text-[26px] text-center font-bold tracking-[-0.54px] leading-[1.4] mb-[2px] lg:mb-[4px] whitespace-pre-line"
                                                           style={{color: titleColor}}>
                                                            {item.title}
                                                        </p>
                                                    ) : (
                                                        <p className="text-[12px] unicode lg:text-[26px] text-center font-bold tracking-[-0.54px] leading-[1.4] mb-[2px] lg:mb-[4px]"
                                                           style={{color: titleColor}}>
                                                            {item.title}
                                                        </p>
                                                    )}
                                                    {item.description && (
                                                        typeof item.description === 'string' ? (
                                                            <p
                                                                className="text-[10px] lg:text-[15px] text-center"
                                                                style={{color: descriptionColor}}
                                                            >
                                                                {item.description}
                                                            </p>
                                                        ) : (
                                                            <p
                                                                className="text-[10px] lg:text-[15px] text-center"
                                                                style={{color: descriptionColor}}
                                                            >
                                                                {item.description}
                                                            </p>
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                {/* 네비게이션 버튼 */}
                {chunkedData.length > 1 && (
                    <div
                        className={`flex gap-6 lg:gap-[40px] justify-center items-center ${theme === 'boreumdal' ? 'mt-[24px]' : 'mt-[50px]'}`}>
                        <button
                            ref={prevRef}
                            className="brown-custom-btn brown-custom-btn-prev disabled:opacity-50 !p-[9px]"
                            aria-label="이전 슬라이드"
                            disabled={currentSlideIndex === 0}
                            style={{
                                backgroundColor: colors.button,
                            }}
                            onMouseEnter={(e) => {
                                if (currentSlideIndex !== 0) {
                                    e.currentTarget.style.backgroundColor = colors.buttonHover;
                                }
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = colors.button;
                            }}
                        >
                            <div
                                style={{'--arrow-fill': arrowColor} as React.CSSProperties & { '--arrow-fill': string }}
                                className='lg:size-[28px]'>
                                <Icon name="arrowTop" className="-rotate-90 size-full [&_*]:fill-[var(--arrow-fill)]"/>
                            </div>
                        </button>
                        <button
                            ref={nextRef}
                            className="brown-custom-btn brown-custom-btn-next disabled:opacity-50  !p-[9px]"
                            aria-label="다음 슬라이드"
                            disabled={currentSlideIndex === chunkedData.length - 1}
                            style={{
                                backgroundColor: colors.button,
                            }}
                            onMouseEnter={(e) => {
                                if (currentSlideIndex !== chunkedData.length - 1) {
                                    e.currentTarget.style.backgroundColor = colors.buttonHover;
                                }
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = colors.button;
                            }}
                        >
                            <div
                                style={{'--arrow-fill': arrowColor} as React.CSSProperties & { '--arrow-fill': string }}
                                className='lg:size-[28px]'>
                                <Icon name="arrowTop" className="rotate-90 size-full [&_*]:fill-[var(--arrow-fill)]"/>
                            </div>
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
};