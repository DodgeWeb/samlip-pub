import React, {useState, useRef} from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Navigation, Autoplay} from 'swiper/modules';
import type {Swiper as SwiperType} from 'swiper';
import {Icon} from '@/components/pub/icons';
import 'swiper/css/bundle';
import '@/assets/style/Swiper.scss';

interface Product {
    id: number;
    name: string;
    image: string;
}

type Theme =
    | 'default'
    | 'hoppang'
    | 'cream'
    | 'boreumdal'
    | 'hotteok'
    | 'yakgwa'
    | 'nunettine'
    | 'readyb'
    | 'romanmeal'
    | 'migak'
    | 'him'
    | 'cityDeli'
    | 'grill'
    | 'pigin'
    | 'storeCityDeli'
    | 'storeBakery'
    ;

interface ProductSwiperProps {
    products: Product[];
    aspectRatio?: string;
    fontFamily?: string;
    theme?: Theme;
}

// ▼ 부족한 슬라이드 자동 복제
const createVirtualSlides = (items: Product[], minCount = 6): Product[] => {
    if (items.length >= minCount) return items;

    const setsNeeded = Math.ceil(minCount / items.length);
    const result: Product[] = [];

    for (let i = 0; i < setsNeeded; i++) {
        result.push(...items);
    }

    return result;
};

// ▼ 테마 색 타입
interface ThemeColorSet {
    title: string;
    text: string;
    button: string;
    buttonHover: string;
    buttonText?: string;
    arrow?: string;
}

export const ProductSwiper: React.FC<ProductSwiperProps> = ({
    products,
    aspectRatio = '1/1',
    fontFamily = 'gothic',
    theme = 'default',
}) => {
    const [currentProductIndex, setCurrentProductIndex] = useState(0);
    const productsPrevRef = useRef<HTMLButtonElement>(null);
    const productsNextRef = useRef<HTMLButtonElement>(null);

    // ▼ 테마 색 정의
    const themeColors: Record<Theme, ThemeColorSet> = {
        // 기본 테마(중립 계열)
        default: {
            title: '#3E0300',
            text: '#3E0300',
            button: '#3E0300',
            buttonHover: '#500C08',
        },
        // 호빵 전용 테마
        hoppang: {
            title: '#3E0300',
            text: '#3E0300',
            button: '#3E0300',
            buttonHover: '#500C08',
        },
        hotteok: {
            title: '#77140C',
            text: '#77140C',
            button: '#77140C',
            buttonHover: '#77140C',
        },
        cream: {
            title: '#ED1C2A',
            text: '#ED1C2A',
            button: '#ED1C2A',
            buttonHover: '#F14A56',
        },
        boreumdal: {
            title: '#51312D',
            text: '#51312D',
            button: '#51312D',
            buttonHover: '#734B4C',
        },
        yakgwa: {
            title: '#4B2B23',
            text: '#4B2B23',
            button: '#4B2B23',
            buttonHover: '#6B3D2F',
        },
        nunettine: {
            title: '#ED7100',
            text: '#ED7100',
            button: '#ED7100',
            buttonHover: '#ED7100',
        },
        readyb: {
            title: '#4B2B23',
            text: '#E65300',
            buttonText: '#612300',
            button: '#612300',
            buttonHover: '#612300',
        },
        romanmeal: {
            title: '#F5A800',
            text: '#E9D8B7',
            button: '#E9D8B7',
            buttonHover: '#F5A800',
            buttonText: '#E9D8B7',
            arrow: '#3D1909',
        },
        migak: {
            title: '#6A4431',
            text: '#6A4431',
            button: '#6A4431',
            buttonHover: '#6A4431',
        },
        him: {
            title: '#523C2C',
            text: '#523C2C',
            button: '#C39069',
            buttonHover: '#C39069',
            buttonText: '#C39069',
        },
        cityDeli: {
            title: '#285C0F',
            text: '#285C0F',
            button: '#285C0F',
            buttonHover: '#285C0F',
        },
        grill: {
            title: '#F18E15',
            text: '#FFFFFF',
            button: '#F18E15',
            buttonHover: '#F18E15',
            buttonText: '#F18E15',
        },
        pigin: {
            title: '#005348',
            text: '#005348',
            button: '#005348',
            buttonHover: '#005348',
        },
        storeCityDeli: {
            title: '#000000',
            text: '#000000',
            button: '#39B54A',
            buttonHover: '#39B54A',
            buttonText: '#39B54A',
        },
        storeBakery: {
            title: '#A59B92',
            text: '#61554E',
            button: '#A49084',
            buttonHover: '#A59B92',
            buttonText: '#A49084',
        },
    };

    const colors = themeColors[theme] as any;
    // arrow 색상: arrow가 있으면 사용, 없으면 기본값(하얀색)
    const arrowColor = colors.arrow || '#FFFFFF';


//   const colors = themeColors[theme];
    const buttonTextColor = colors.buttonText ?? colors.text;

    const virtualSlides = createVirtualSlides(products, 6);

    return (
        <div>
            <h2
                className="text-[22px] lg:text-[64px] gt-ultra text-center tracking-[-0.66px] leading-[1.3] pb-5 lg:pb-[68px]"
                style={{color: colors.title}}>Products</h2>
            <Swiper
                modules={[Navigation, Autoplay]}
                spaceBetween={8}
                slidesPerView={2}
                centeredSlides={true}
                loop={true}
                autoHeight={false}
                autoplay={{
                    delay: 2000000,
                    disableOnInteraction: false
                }}
                breakpoints={{
                    768: {slidesPerView: 2},
                    1024: {slidesPerView: 3},
                }}
                navigation={{
                    prevEl: productsPrevRef.current,
                    nextEl: productsNextRef.current,
                }}
                onSwiper={(swiper: SwiperType) => {
                    setCurrentProductIndex(swiper.realIndex % products.length);
                    setTimeout(() => {
                        if (
                            swiper?.params?.navigation &&
                            typeof swiper.params.navigation !== 'boolean' &&
                            swiper.navigation
                        ) {
                            swiper.params.navigation.prevEl = productsPrevRef.current;
                            swiper.params.navigation.nextEl = productsNextRef.current;
                            swiper.navigation.init();
                            swiper.navigation.update();
                        }
                    }, 0);
                }}
                onSlideChange={(swiper: SwiperType) => {
                    setCurrentProductIndex(swiper.realIndex % products.length);
                }}
                className="w-full products-swiper"
            >
                {virtualSlides.map((product, index) => {
                    const realProductIndex = index % products.length;
                    const isActive = realProductIndex === currentProductIndex;

                    return (
                        <SwiperSlide key={`${product.id}-${index}`}>
                            <div className="w-full h-full">
                                <div className="flex relative justify-center items-end !size-full img-box lg:!h-428px">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className={`object-cover w-full aspect-[${aspectRatio}]`}
                                    />
                                    <img
                                        src={product.image}
                                        className="absolute inset-0 !w-full !h-full opacity-0"
                                    />
                                </div>

                                {/* 활성/비활성에 따라 글자만 숨기고, 높이는 고정해서 슬라이더 높이 튐 방지 */}
                                <div className="mt-[8px] lg:mt-[28px] min-h-[24px] lg:min-h-[45px]">
                                    <p
                                        className={`text-[16px] lg:text-[32px] text-center tracking-[-0.07px] leading-[1.4] transition-opacity duration-200 ${
                                            theme === 'hoppang'
                                                ? 'samlip-hopbang font-normal'
                                                : 'font-bold'
                                        } ${isActive ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
                                        style={{
                                            color: colors.text,
                                        }}
                                    >
                                        {product.name}
                                    </p>
                                </div>
                            </div>
                        </SwiperSlide>
                    );
                })}
            </Swiper>

            <div className="flex gap-[12px] lg:gap-[40px] items-center justify-center mt-[20px] lg:mt-[68px]">
                <button
                    ref={productsPrevRef}
                    className="brown-custom-btn brown-custom-btn-prev"
                    aria-label="이전 제품"
                    style={{
                        backgroundColor: colors.button,
                        color: buttonTextColor,
                    }}
                    onMouseEnter={(e) =>
                        (e.currentTarget.style.backgroundColor = colors.buttonHover)
                    }
                    onMouseLeave={(e) =>
                        (e.currentTarget.style.backgroundColor = colors.button)
                    }
                >
                    <div style={{'--arrow-fill': arrowColor} as React.CSSProperties & { '--arrow-fill': string }}>
                        <Icon
                            name="arrowTop"
                            className="-rotate-90 size-full [&_*]:fill-[var(--arrow-fill)] lg:size-[28px]"
                        />
                    </div>
                </button>

                <span
                    className="text-[28px] lg:text-[64px] gt-ultra text-center leading-[1.1] min-w-[60px]"
                    style={{color: buttonTextColor}}   // ← 요기만 변경
                >
            {currentProductIndex + 1}/{products.length}
            </span>

                <button
                    ref={productsNextRef}
                    className="brown-custom-btn brown-custom-btn-next"
                    aria-label="다음 제품"
                    style={{
                        backgroundColor: colors.button,
                        color: buttonTextColor,
                    }}
                    onMouseEnter={(e) =>
                        (e.currentTarget.style.backgroundColor = colors.buttonHover)
                    }
                    onMouseLeave={(e) =>
                        (e.currentTarget.style.backgroundColor = colors.button)
                    }
                >
                    <div style={{'--arrow-fill': arrowColor} as React.CSSProperties & { '--arrow-fill': string }}>
                        <Icon name="arrowTop"
                              className="rotate-90 size-full [&_*]:fill-[var(--arrow-fill)] lg:size-[28px]"/>
                    </div>
                </button>
            </div>
        </div>
    );
};
