import React from 'react';
import {useRouter} from 'next/router';
import {Icon} from '@/components/pub/icons';
import MediaChips, {getHomeChips} from './MediaChips';

/* =====================
   타입 정의
===================== */

export interface CardData {
    id: string;
    type: 'image' | 'content' | 'social';
    className?: string;
    hasOverlay?: boolean;
    hasArrow?: boolean;
    overlayContent?: {
        description: string;
    };
    content?: {
        title: string;
        subtitle?: string;
        date?: string;
        image?: string;
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
}

interface CardListProps {
    cards: CardData[];
}

/* =====================
   CardList
===================== */

export const CardList: React.FC<CardListProps> = ({cards}) => {
    return (
        <ul className="grid grid-cols-2 lg:grid-cols-3 max-w-[1020px] mx-auto *:w-full">
            {cards.map((card) => (
                <Card
                    key={card.id}
                    card={card}
                    className={
                        card.id === '3'
                            ? 'lg:order-none order-4'
                            : card.id === '4'
                                ? 'lg:order-none order-3'
                                : ''
                    }
                />
            ))}
        </ul>
    );
};

/* =====================
   Card
===================== */

export const Card: React.FC<CardProps> = ({card, className}) => {
    const router = useRouter();

    const getImageSrc = () => {
        switch (card.id) {
            case '1':
                return '/img/main-bottom-01.png';
            case '2':
                return '/img/main-bottom-02.png';
            case '3':
                return '/img/main-bottom-03.png';
            case '7':
                return '/img/main-bottom-04.png';
            case '8':
                return '/img/main-bottom-05.png';
            default:
                return '';
        }
    };

    /* ---------- IMAGE ---------- */
    if (card.type === 'image') {
        return (
            <li
                className={`relative cursor-pointer card-hover ${card.className ?? ''} ${className ?? ''}`.trim()}
                onClick={card.onClick}
            >
                <img src={getImageSrc()} alt="brand_icon" className="object-cover w-full h-full"/>

                {card.hasOverlay && card.overlayContent && (
                    <div className="card-overlay">
                        <p className="lg:text-[24px] text-[14px] font-bold text-white leading-[1.4] text-center whitespace-pre-line">
                            {card.overlayContent.description}
                        </p>
                    </div>
                )}

                {card.hasArrow && (
                    <div className="card-arrow">
                        <Icon name="arrowMore" className="*:fill-cream w-[43px] h-[22px] lg:w-[72px] lg:h-[36px]"/>
                    </div>
                )}
            </li>
        );
    }

    /* ---------- CONTENT ---------- */
    if (card.type === 'content') {
        const textColor = card.className?.includes('bg-deilcut')
            ? 'text-strawberry'
            : 'text-cucumber';

        const imageClass =
            card.id === '6'
                ? 'absolute left-0 top-1/2 -translate-y-1/2 opacity-30 w-[120%]'
                : 'absolute left-[-20%] top-1/2 -translate-y-1/2 opacity-30 size-[160%]';

        return (
            <li
                className={`relative cursor-pointer card-hover ${card.className ?? ''} ${className ?? ''}`.trim()}
                onClick={card.onClick}
            >
                <div
                    className="relative z-10 flex flex-col justify-between h-full lg:px-10 p-3 lg:py-[43px] overflow-hidden">
                    <p className={`${textColor} lg:text-[32px] text-[14px] font-bold leading-[140%]`}>
                        {card.content?.title}
                    </p>

                    <div className="flex flex-col gap-1">
                        {card.content?.subtitle && (
                            <p className={`${textColor} lg:text-[15px] text-[10px]`}>
                                {card.content.subtitle}
                            </p>
                        )}
                        {card.content?.date && (
                            <p className={`${textColor} lg:text-[15px] text-[10px]`}>
                                {card.content.date}
                            </p>
                        )}
                    </div>

                    {card.content?.image && (
                        <img src={card.content.image} alt="" className={imageClass}/>
                    )}
                </div>

                {card.hasArrow && (
                    <div className="card-arrow">
                        <Icon name="arrowMore" className="*:fill-cream w-[43px] h-[22px] lg:w-[72px] lg:h-[36px]"/>
                    </div>
                )}
            </li>
        );
    }

    /* ---------- SOCIAL ---------- */
    if (card.type === 'social') {
        return (
            <li className={`flex justify-center items-center ${card.className ?? ''} ${className ?? ''}`.trim()}>
                <div className="relative py-7">
                    <div
                        className="hidden lg:flex gt-ultra text-center text-[120px] leading-[84px] text-cream flex-col gap-[52px]">
                        <p>The</p>
                        <p>Sweetest</p>
                        <p>Treats</p>
                    </div>

                    <MediaChips
                        chips={getHomeChips(router)}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                    />
                </div>
            </li>
        );
    }

    return null;
};

/* =====================
   Card Data
===================== */

export const getCardData = (handleCardClick: (url: string) => void): CardData[] => [
    {
        id: '1',
        type: 'image',
        className: 'aspect-[8/9] lg:aspect-[4/5]',
        hasOverlay: true,
        hasArrow: true,
        overlayContent: {description: "삼립호떡 '꿀잼'의\n대변신 🍯✨"},
        onClick: () => handleCardClick('https://example.com/one'),
    },
    {
        id: '2',
        type: 'image',
        className: 'aspect-[8/9] lg:aspect-[4/5]',
        hasOverlay: true,
        hasArrow: true,
        overlayContent: {description: '영양가 높은 식품으로 건강한 하루를 시작하세요.'},
        onClick: () => handleCardClick('https://example.com/two'),
    },
    {
        id: '3',
        type: 'image',
        className: 'aspect-[8/9] lg:aspect-[4/5]',
        hasOverlay: true,
        hasArrow: true,
        overlayContent: {description: '소중한 사람들과 함께하는 특별한 순간'},
        onClick: () => handleCardClick('https://example.com/three'),
    },
];

export default Card;
