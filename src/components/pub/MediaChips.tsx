import React from 'react';
import {useRouter} from 'next/router';
import type {NextRouter} from 'next/router';
import {Icon} from '@/components/pub/icons';

/* =========================
   TYPES
========================= */

export interface MediaChip {
    name: string;
    iconName: string;
    bgColor: string;
    position: {
        top?: string;
        bottom?: string;
        left?: string;
        right?: string;
    };
    rotation: string;
    onClick?: () => void;
    className?: string;
    padding?: string;
    height?: string;
    textSize?: string;
}

interface MediaChipsProps {
    className?: string;
    chips?: MediaChip[];
    variant?: 'home' | 'media';
    textSize?: string;
}

/* =========================
   CLICK HANDLERS
========================= */

const getChipClickHandlers = (router: NextRouter) => ({
    pr: () => router.push('/now/pr'),
    facebook: () =>
        window.open('https://www.facebook.com/samlipgf/?locale=ko_KR', '_blank'),
    youtube: () =>
        window.open('https://www.youtube.com/channel/UC88W-nkd_7G9S7u-2xlX4DQ', '_blank'),
    instagram: () =>
        window.open('https://www.instagram.com/samlip.official/', '_blank'),
});

/* =========================
   CHIP DATA
========================= */

export const getMediaChips = (
    router: NextRouter,
    textSize?: string
): MediaChip[] => {
    const onClick = getChipClickHandlers(router);
    const size = textSize || 'text-[12px] lg:text-[34px]';

    return [
        {
            name: 'PR',
            iconName: 'pr',
            bgColor: 'bg-[#500c08]',
            position: {top: 'top-4 lg:top-[20px]', left: 'left-8 lg:left-[120px]'},
            rotation: 'rotate-[-13deg]',
            onClick: onClick.pr,
            textSize: size,
        },
        {
            name: 'Facebook',
            iconName: 'facebook',
            bgColor: 'bg-[#54C7DE]',
            position: {top: 'top-[40px] lg:top-[100px]', right: 'right-0'},
            rotation: 'rotate-[10deg]',
            onClick: onClick.facebook,
            textSize: size,
        },
        {
            name: 'Youtube',
            iconName: 'youtube',
            bgColor: 'bg-[#ed1c2a]',
            position: {bottom: 'bottom-6 lg:bottom-[120px]', left: 'left-0'},
            rotation: 'rotate-[-5deg]',
            onClick: onClick.youtube,
            textSize: size,
        },
        {
            name: 'Instagram',
            iconName: 'instagram',
            bgColor: 'bg-black',
            position: {bottom: 'bottom-0 lg:bottom-[20px]', right: 'right-4 lg:right-[80px]'},
            rotation: 'rotate-[-8deg]',
            onClick: onClick.instagram,
            textSize: size,
        },
    ];
};

export const getHomeChips = (
    router: NextRouter,
    textSize?: string
): MediaChip[] => {
    const onClick = getChipClickHandlers(router);
    const size = textSize || 'text-[12px] lg:text-[30px]';

    return [
        {
            name: 'PR',
            iconName: 'pr',
            bgColor: 'bg-[#500c08]',
            position: {top: 'top-4 lg:top-[20px]', left: 'left-8 lg:left-[80px]'},
            rotation: 'rotate-[-13deg]',
            onClick: onClick.pr,
            padding: 'px-5 py-1.5 lg:px-[50px]',
            height: 'h-[36px] lg:h-[89px]',
            textSize: size,
        },
        {
            name: 'Facebook',
            iconName: 'facebook',
            bgColor: 'bg-[#3BB4E5]',
            position: {top: 'top-[40px] lg:top-[100px]', right: 'right-0'},
            rotation: 'rotate-[10deg]',
            onClick: onClick.facebook,
            padding: 'px-3 py-1.5 lg:px-10 lg:py-4',
            height: 'h-[36px] lg:h-[89px]',
            textSize: size,
        },
        {
            name: 'Youtube',
            iconName: 'youtube',
            bgColor: 'bg-[#ed1c2a]',
            position: {bottom: 'bottom-7 lg:bottom-[100px]', left: 'left-2'},
            rotation: 'rotate-[-6deg]',
            onClick: onClick.youtube,
            padding: 'px-4 py-1.5 lg:px-10 lg:py-4',
            height: 'h-[36px] lg:h-[89px]',
            textSize: size,
        },
        {
            name: 'Instagram',
            iconName: 'instagram',
            bgColor: 'bg-black',
            position: {bottom: 'bottom-0 lg:bottom-[20px]', right: 'right-4 lg:right-[80px]'},
            rotation: 'rotate-[-8deg]',
            onClick: onClick.instagram,
            padding: 'px-4 py-1.5 lg:px-[50px] lg:py-4',
            height: 'h-[36px] lg:h-[89px]',
            textSize: size,
        },
    ];
};

/* =========================
   COMPONENT
========================= */

const MediaChips: React.FC<MediaChipsProps> = ({
    className,
    chips,
    variant = 'media',
    textSize,
}) => {
    const router = useRouter();

    const defaultChips =
        variant === 'home'
            ? getHomeChips(router, textSize)
            : getMediaChips(router, textSize);

    const displayChips = chips || defaultChips;

    return (
        <div className={`absolute w-full h-[120px] lg:h-[400px] ${className ?? ''}`}>
            {displayChips.map((chip) => (
                <div
                    key={chip.name}
                    className={`absolute ${chip.position.top ?? ''} ${chip.position.bottom ?? ''} ${chip.position.left ?? ''} ${chip.position.right ?? ''} ${chip.rotation}`}
                >
                    <button
                        onClick={chip.onClick}
                        className={`${chip.bgColor} ${chip.padding ?? 'px-4 py-2'} ${chip.height ?? ''} rounded-full flex items-center gap-2`}
                    >
                        <Icon name={chip.iconName as any} className="*:fill-[#fbf7e9]"/>
                        <span className={`text-[#fbf7e9] ${chip.textSize} font-extrabold`}>
              {chip.name}
            </span>
                    </button>
                </div>
            ))}
        </div>
    );
};

export default MediaChips;
