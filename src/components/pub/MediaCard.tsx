import React from 'react';
import {Icon} from '@/components/pub/icons';
import MediaChips from '@/components/pub/MediaChips';
import {useRouter} from 'next/router';

// 카드 데이터 타입 정의
export interface CardData {
    id: string;
    type: 'image' | 'content' | 'social';
    className?: string; // 추가 클래스명 (선택사항)
    homeClassName?: string; // 홈에서만 덮어쓸 클래스명 (선택사항)
    imageUrl?: string; // 이미지 URL (type이 'image'일 때 사용)
    hasOverlay?: boolean;
    hasArrow?: boolean;
    overlayContent?: {
        description: string;
    };
    content?: {
        title: string;
        subtitle?: string;
        image?: string;
        imageClassName?: string; // content 이미지의 클래스명 (선택사항)
        centerAlign?: boolean; // 콘텐츠 중앙 정렬 여부 (선택사항)
    };
    socialButtons?: Array<{
        name: string;
        icon: string;
        background: string;
        rotation: string;
        position: string;
    }>;
    onClick: () => void;
}

interface CardProps {
    card: CardData;
    className?: string;
    isDesktop?: boolean;
    activeMobileCardId?: string | null;
    setActiveMobileCardId?: (id: string | null) => void;
}

interface MediaCardProps {
    cards?: CardData[];
    isHome?: boolean; // 홈 화면 여부
}

// 기본 미디어 아이템 데이터
const defaultMediaItems: CardData[] = [
    {
        id: '1',
        type: 'image',
        imageUrl: '/img/brand_media/media_01.jpg',
        className: 'aspect-[8/9] lg:aspect-[4/5]  lg:col-span-8',
        hasOverlay: true,
        hasArrow: true,
        overlayContent: {
            description: '【𝗠𝘆 𝗡𝗮𝗺𝗲 𝗶𝘀 #PI···',
        },
        onClick: () => window.open('https://www.instagram.com/p/DSRt16zEYvq/', '_blank'),
    },
    {
        id: '2',
        type: 'image',
        imageUrl: '/img/brand_media/media_02.jpg',
        className: 'aspect-[8/9] lg:aspect-[4/5] lg:col-span-8',
        hasOverlay: true,
        hasArrow: true,
        overlayContent: {
            description: '#광고 겨울 간식 대장 호빵···',
        },
        onClick: () => window.open('https://www.instagram.com/p/DSE00n0EUZL/?img_index=1', '_blank'),
    },
    {
        id: '3',
        type: 'image',
        imageUrl: '/img/brand_media/media_03.jpg',
        className: 'aspect-[8/9] lg:aspect-[4/5] lg:col-span-8 h-full',
        hasOverlay: true,
        hasArrow: true,
        overlayContent: {
            description: '【𝗠𝘆 𝗡𝗮𝗺𝗲 𝗶𝘀 #PI···',
        },
        onClick: () => window.open('https://www.instagram.com/p/DRy2MaWEWUi/?img_index=1', '_blank'),
    },
    {
        id: '4',
        type: 'content',
        className: 'aspect-[8/9] lg:aspect-[4/5] bg-deilcut lg:h-full lg:col-span-9',
        hasOverlay: false,
        hasArrow: true,
        content: {
            title: '원조 국민 호빵의 진화…SPC삼립 80주년 기념 호빵 공개',
            subtitle: '보도 자료',
            image: '/img/back_warp.svg',
        },
        overlayContent: {
            description: '원조 국민 호빵의 진화…SPC삼립 80주년 기념 호빵 공개',
        },
        onClick: () => window.location.href = '/now/pr/1669',
    },
    {
        id: '5',
        type: 'image',
        imageUrl: '/img/brand_media/media_05.jpg',
        className: 'aspect-[2/1] lg:aspect-[3/2] col-span-2 lg:col-span-15 lg:h-full ',
        // 홈에서는 모바일에서 숨기고, 데스크탑에서만 레이아웃 클래스 적용
        homeClassName: '!hidden lg:!block lg:aspect-[3/2] lg:col-span-15 lg:h-full aspect-[9/1]',
        hasOverlay: true,
        hasArrow: true,
        overlayContent: {
            description: '우주인이 건네주는 호빵이 궁금해?🚀',
        },
        onClick: () => window.open('https://www.youtube.com/watch?si=clp2rfgw0J61UACB&v=Tw4sZGKWwpM&feature=youtu.be', '_blank'),
    },
    {
        id: '6',
        type: 'content',
        className: 'aspect-[16/18] lg:aspect-[16/9] bg-scallion h-full row-span-1 lg:col-span-14',
        hasOverlay: false,
        hasArrow: true,
        content: {
            title: 'SPC삼립, 깨먹는 재미 더한 \'피카츄의 초코바나나 몬스터볼 케이크\' 출시',
            subtitle: '보도 자료',
            image: '/img/back_warp_02.svg',
            imageClassName: 'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-30 max-w-[200%] w-[200%] h-[200%]',
        },
        overlayContent: {
            description: 'SPC삼립, 깨먹는 재미 더한 \'피카츄의 초코바나나 몬스터볼 케이크\' 출시',
        },
        onClick: () => window.location.href = '/now/pr/1668',
    },
    {
        id: '7',
        type: 'image',
        imageUrl: '/img/brand_media/media_07.jpg',
        className: 'aspect-[4/5] row-span-2 h-full lg:col-span-10',
        hasOverlay: true,
        hasArrow: true,
        overlayContent: {
            description: '【𝗠𝘆 𝗡𝗮𝗺𝗲 𝗶𝘀 #Pro···',
        },
        onClick: () => window.open('https://www.instagram.com/p/DSHbOnJkV5b/', '_blank'),
    },
    {
        id: '8',
        type: 'image',
        imageUrl: '/img/brand_media/media_08.jpg',
        className: 'aspect-[16/9] h-full col-span-1 lg:col-span-14 row-span-1',
        hasOverlay: true,
        hasArrow: true,
        overlayContent: {
            description: '[시티델리] 시티델리로 함 박꿔보···',
        },
        onClick: () => window.open('https://www.youtube.com/watch?si=bnMGJCDXlxBq1oF0&v=jvVNTgcjyu0&feature=youtu.be', '_blank'),
    },
    {
        id: '9',
        type: 'content',
        className: 'aspect-[8/9] lg:aspect-[7/1] bg-[#FF8A1D] lg:col-span-24 first:lg:*:!py-0',
        hasOverlay: true,
        hasArrow: true,
        content: {
            title: '미국 전역을 달달하게 물들인 k-치즈케익의 정체',
            subtitle: '삼립 스토리',
            image: '/img/now/media/back_dump.svg',
            imageClassName: 'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-30 max-w-[250%] w-[250%] h-[200%] lg:h-[550%]',
            centerAlign: true,
        },
        onClick: () => window.location.href = '/now/story/1',
    },
    {
        id: '10',
        type: 'image',
        imageUrl: '/img/brand_media/media_10.jpg',
        className: 'aspect-[8/9] lg:aspect-[4/5] col-span-1 lg:col-span-8',
        hasOverlay: true,
        hasArrow: true,
        overlayContent: {
            description: '【🍫 𝗛𝗘𝗥𝗦𝗛𝗘𝗬\'𝗦 𝗛𝗼···',
        },
        onClick: () => window.open('https://www.instagram.com/p/DRtvAISEQ6e/', '_blank'),
    },
    {
        id: '11',
        type: 'image',
        imageUrl: '/img/brand_media/media_11.jpg',
        className: 'aspect-[8/9] lg:aspect-[4/5] col-span-1 lg:col-span-8',
        hasOverlay: true,
        hasArrow: true,
        overlayContent: {
            description: '【𝗠𝘆 𝗡𝗮𝗺𝗲 𝗶𝘀 #조청···',
        },
        onClick: () => window.open('https://www.instagram.com/p/DRl7dhykfWx/', '_blank'),
    },
    {
        id: '12',
        type: 'image',
        imageUrl: '/img/brand_media/media_12.jpg',
        className: 'aspect-[8/9] lg:aspect-[4/5] col-span-1 lg:col-span-8',
        hasOverlay: true,
        hasArrow: true,
        overlayContent: {
            description: '【𝗠𝘆 𝗡𝗮𝗺𝗲 𝗶𝘀 #하이···',
        },
        onClick: () => window.open('https://www.instagram.com/p/DRboR7mkbu5/', '_blank'),
    },
];

export const MediaCard: React.FC<MediaCardProps> = ({cards, isHome = false}) => {
    // lg(1024px) 이상이면 PC 로직 유지
    const [isDesktop, setIsDesktop] = React.useState(() => {
        if (typeof window === 'undefined') return true;
        return window.matchMedia('(min-width: 1024px)').matches;
    });
    React.useEffect(() => {
        const mql = window.matchMedia('(min-width: 1024px)');
        const onChange = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
        // Safari 호환 (구형 브라우저는 addListener/removeListener 사용)
        if (typeof mql.addEventListener === 'function') {
            mql.addEventListener('change', onChange);
        } else {
            (mql as unknown as MediaQueryList).addListener(onChange);
        }
        return () => {
            if (typeof mql.removeEventListener === 'function') {
                mql.removeEventListener('change', onChange);
            } else {
                (mql as unknown as MediaQueryList).removeListener(onChange);
            }
        };
    }, []);

    // 모바일에서 "첫 탭=호버처럼 표시 / 두 번째 탭=이동"을 위한 활성 카드
    const [activeMobileCardId, setActiveMobileCardId] = React.useState<string | null>(null);
    React.useEffect(() => {
        // PC로 전환되면 모바일 활성 상태는 리셋
        if (isDesktop) setActiveMobileCardId(null);
    }, [isDesktop]);

    const baseCards = cards || defaultMediaItems;
    // 홈 화면일 때 id가 '9', '10', '11', '12'인 카드 제외
    const displayCards = isHome
        ? baseCards.filter(card => !['9', '10', '11', '12'].includes(card.id))
        : baseCards;
    return (
        <ul className={`grid grid-cols-2 lg:grid-cols-[repeat(24,minmax(0,1fr))] max-w-[1020px] mx-auto *:w-full ${isHome ? 'relative px-5 py-10 lg:py-20 lg:px-0 pb-0 lg:pb-[96px]' : ''}`}>
            {displayCards.map((card, index) => {
                // 홈 화면이고 다섯 번째 카드(index 4)일 때 MediaChips 렌더링
                if (isHome && index === 4) {
                    // 홈에서는 이 타일이 카드(id=5) 대신 노출되므로, 홈 전용 클래스(homeClassName)를 여기서 적용해야 함
                    const mediaChipsClassName = card.homeClassName
                        ? card.homeClassName
                        : `${card.className || 'aspect-[8/9] lg:aspect-[4/5] bg-deilcut lg:h-full lg:col-span-9'} hidden lg:block`;
                    return (
                        <li
                            key={`media-chips-${index}`}
                            className={mediaChipsClassName}
                        >
                            <div
                                className='gt-ultra relative  h-full  w-full text-center text-[44px] lg:text-[120px]   text-cream flex flex-col gap-[8px] lg:gap-[52px] lg:leading-[80px] items-center lg:pt-0 justify-center'>
                                <p>The</p>
                                <p className='text-cream text-[44px] lg:text-[120px]  '>Sweetest</p>
                                <p className='text-cream text-[44px] lg:text-[120px]  '>Treats</p>

                                <MediaChips variant="home" className='max-w-[230px] lg:!max-w-[530px]
                                max-h-[120px] lg:!max-h-[320px]'/>

                            </div>
                        </li>
                    );
                }
                // 홈이면 homeClassName으로 className을 교체(덮어쓰기)
                const effectiveCard = (isHome && card.homeClassName)
                    ? {...card, className: card.homeClassName}
                    : card;
                return (
                    <Card
                        key={card.id}
                        card={effectiveCard}
                        isDesktop={isDesktop}
                        activeMobileCardId={activeMobileCardId}
                        setActiveMobileCardId={setActiveMobileCardId}
                    />
                );
            })}
        </ul>
    );
};

export const Card: React.FC<CardProps> = ({
    card,
    className,
    isDesktop = true,
    activeMobileCardId = null,
    setActiveMobileCardId,
}) => {
    // 모바일: 첫 탭은 호버처럼 활성화, 두 번째 탭에서 실제 이동
    const isActive = !isDesktop && activeMobileCardId === card.id;
    const handleCardClick = () => {
        // PC 로직은 기존 그대로 유지
        if (isDesktop) {
            card.onClick();
            return;
        }

        // 모바일에서 상태 관리 함수가 없으면 기존처럼 바로 이동
        if (!setActiveMobileCardId) {
            card.onClick();
            return;
        }

        // 첫 탭: 오버레이/화살표 표시
        if (activeMobileCardId !== card.id) {
            setActiveMobileCardId(card.id);
            return;
        }

        // 두 번째 탭: 이동
        card.onClick();
    };

    if (card.type === "image") {
        return (
            <li
                className={`relative cursor-pointer card-hover ${isActive ? 'is-active' : ''} ${card.className || ''} ${className || ''}`.trim()}
                onClick={handleCardClick}
            >
                <img src={card.imageUrl || "/img/now/media/media_01.png"} alt="brand_icon"
                     className='object-cover w-full h-full'/>
                {card.hasOverlay && card.overlayContent && (
                    <div className='card-overlay'>
                        <div className='text-center text-white'>
                            <p className='lg:text-[24px] text-[14px] leading-[1.4]'>{card.overlayContent.description}</p>
                        </div>
                    </div>
                )}
                {card.hasArrow && (
                    <div className='card-arrow'>
                        <Icon name="arrowMore" className='*:fill-cream w-[37px] h-[20px] lg:w-[77px] lg:h-[40px]'/>
                    </div>
                )}
            </li>
        );
    }

    if (card.type === "content") {
        let textColor = "text-cucumber"; // 기본값
        if (card.className?.includes("bg-deilcut")) {
            textColor = "text-strawberry";
        } else if (card.className?.includes("bg-[#FF8A1D]")) {
            textColor = "text-hazelnut";
        }
        const defaultImageClass = "absolute left-[-20%] top-1/2 -translate-y-1/2 opacity-30 max-w-[200%] size-[160%]";
        const imageClass = card.content?.imageClassName || defaultImageClass;

        return (
            <li
                className={`relative cursor-pointer card-hover ${isActive ? 'is-active' : ''} h-full ${card.className || ''} ${className || ''}`.trim()}
                onClick={handleCardClick}
            >
                <div
                    className={`flex relative z-10  flex-col h-full ${card.content?.centerAlign ? 'justify-between lg:justify-center lg:items-center lg:text-center gap-[8px]' : 'justify-between'} h-full px-5 py-[20px] lg:px-10 lg:py-[43px] overflow-hidden`}>
                    <p className={`${textColor} lg:text-[32px] text-[14px] font-bold leading-[140%] tracking-[-0.5px] relative z-10 line-clamp-3`}>
                        {card.content?.title}
                    </p>
                    <p className={`lg:text-[15px] text-[10px] leading-[130%] ${textColor} tracking-[-0.5px] relative z-10`}>
                        {card.content?.subtitle}
                    </p>
                    {card.content?.image && (
                        <img
                            src={card.content.image}
                            alt=""
                            className={imageClass}
                        />
                    )}
                </div>
                {card.hasOverlay && card.overlayContent && (
                    <div className='card-overlay'>
                        <div className='text-center text-white'>
                        </div>
                    </div>
                )}
                {card.hasArrow && (
                    <div className='card-arrow py-[6px] lg:!py-[12px]'>
                        <Icon name="arrowMore" className='*:fill-cream w-[37px] h-[20px] lg:w-[77px] lg:h-[40px]'/>
                    </div>
                )}
            </li>
        );
    }

    if (card.type === "social") {
        return (
            <li
                className={`hidden lg:flex justify-center items-center h-full  ${card.className || ''} ${className || ''}`.trim()}
            >
                <div
                    className='gt-ultra relative w-full text-center text-[44px] lg:text-[120px] leading-[31px] lg:leading-[84px] text-cream flex flex-col gap-[8px] lg:gap-[34px] items-center pt-10 lg:pt-0 justify-center'>
                    <p>The</p>
                    <p>Sweetest</p>
                    <p>Treats</p>
                    <div
                        className='absolute *:absolute  w-full max-w-[230px] lg:w-full h-full text-cream gt-ultra text-[25px] leading-[28px]'>
                        {card.socialButtons?.map((button, index) => (
                            <button
                                key={index}
                                className={`flex leading-[14px] lg:leading-[28px] text-[13px] lg:text-[25px] py-[8px] px-[12px] lg:py-[46px] lg:px-[31px] w-auto items-center gap-[5px] rounded-full ${button.background} ${button.position} ${button.rotation}`}
                            >
                                <img src={button.icon} alt={`${button.name}-icon`}
                                     className='size-[10px] lg:size-[23px] flex-none'/>
                                <span className='font-medium'>{button.name}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </li>
        );
    }

    return null;
};

export default Card;
