import React from 'react';

interface BackImgBoxProps {
    label?: string;
    titLabel?: string;
    subTitLabel?: string | React.ReactNode;
    subLabel?: string | React.ReactNode;
    imageSrc?: string;
    className?: string;
    imageClassName?: string; // 이미지 포지션 클래스
}

const BackImgBox: React.FC<BackImgBoxProps> = ({
    label,
    titLabel,
    subTitLabel,
    subLabel,
    imageSrc = '/img/back_img.png',
    className = '',
    imageClassName = ''
}) => {
    const renderWithBreaks = (node: string | React.ReactNode) => {
        if (typeof node === 'string') {
            const parts = node.split('\n');
            return parts.map((part, idx) => (
                <React.Fragment key={idx}>
                    {part}
                    {idx !== parts.length - 1 && <br/>}
                </React.Fragment>
            ));
        }
        return node;
    };

    const hasAnySub = !!subLabel;

    return (
        <div className={`overflow-hidden relative w-full lg:h-[580px] h-[495px] lg:mt-[60px] ${className}`}>
            <img
                src={imageSrc}
                alt={label || 'background image'}
                className={`object-cover w-full h-full scale-[1.01] absolute inset-0 ${imageClassName}`}
            />
            <div className='absolute inset-0 scale-[1.01]'></div>
            {(label || hasAnySub) && (
                <div
                    className='flex absolute inset-0 z-10 flex-col gap-2 justify-center items-center px-4 w-full text-center text-cream lg:gap-6'>
                    {label && (
                        <p className='text-[28px] lg:text-6xl font-extrabold leading-[1.3] tracking-[-0.03em]'>
                            {label}
                        </p>
                    )}
                    {/* 타이틀 줄바꿈 처리 */}
                    {titLabel && (
                        <p className='text-[28px] lg:text-6xl font-extrabold leading-[1.3] tracking-[-0.03em] mt-[-8px] lg:mt-[-4px]'>
                            {titLabel}
                        </p>
                    )}
                    {/* 타이틀 줄바꿈 처리 */}
                    {subTitLabel && (
                        <p className='text-[28px] lg:text-6xl font-extrabold leading-[1.3] tracking-[-0.03em] mt-[-8px] lg:mt-[-4px]'>
                            {subTitLabel}
                        </p>
                    )}
                    {subLabel && (
                        <p className='text-[14px] lg:text-[22px] font-normal leading-[1.6] tracking-[-0.42px] lg:tracking-[-0.66px] '>
                            {renderWithBreaks(subLabel)}
                        </p>
                    )}
                </div>
            )}
        </div>
    );
};

export default BackImgBox;