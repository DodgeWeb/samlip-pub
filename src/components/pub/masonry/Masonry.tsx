import React, {useEffect, useLayoutEffect, useMemo, useRef, useState, useCallback} from 'react';
import {gsap} from 'gsap';

const useMeasure = <T extends HTMLElement>() => {
    const ref = useRef<T | null>(null);
    const [width, setWidth] = useState(0);

    useLayoutEffect(() => {
        if (!ref.current) return;
        const ro = new ResizeObserver(([entry]) => {
            setWidth(entry.contentRect.width);
        });
        ro.observe(ref.current);
        return () => ro.disconnect();
    }, []);

    return [ref, {width}] as const;
};

const preloadImages = async (urls: string[]): Promise<void> => {
    await Promise.all(
        urls.map(
            src =>
                new Promise<void>(resolve => {
                    const img = new Image();
                    img.src = src;
                    img.onload = img.onerror = () => resolve();
                })
        )
    );
};

interface Item {
    id: string;
    img: string;
    url: string;
    overlayImage?: string; // 오버레이 이미지 경로
}

interface GridItem extends Item {
    x: number;
    y: number;
    w: number;
    h: number;
}

interface MasonryProps {
    items: Item[];
    ease?: string;
    duration?: number;
    stagger?: number;
    animateFrom?: 'bottom' | 'top' | 'left' | 'right' | 'center' | 'random';
    scaleOnHover?: boolean;
    hoverScale?: number;
    blurToFocus?: boolean;
    overlayImagePath?: string;
}

const Masonry: React.FC<MasonryProps> = ({
    items,
    ease = 'power3.out',
    duration = 0.6,
    stagger = 0.15,
    animateFrom = 'bottom',
    scaleOnHover = true,
    hoverScale = 0.95,
    blurToFocus = true,
    overlayImagePath = '/img/main-brand-01.png'
}) => {
    const columns = 3; // 3x3 그리드로 고정

    const [containerRef, {width}] = useMeasure<HTMLDivElement>();
    const [imagesReady, setImagesReady] = useState(false);
    const [isInView, setIsInView] = useState(false);
    const [hasAnimated, setHasAnimated] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // 모바일 여부 감지
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 1024);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // useCallback으로 메모이제이션하여 의존성 경고 해결
    const getInitialPosition = useCallback((item: GridItem) => {
        const containerRect = containerRef.current?.getBoundingClientRect();
        if (!containerRect) return {x: item.x, y: item.y};

        let direction = animateFrom;
        if (animateFrom === 'random') {
            const dirs = ['top', 'bottom', 'left', 'right'];
            direction = dirs[Math.floor(Math.random() * dirs.length)] as typeof animateFrom;
        }

        switch (direction) {
            case 'top':
                return {x: item.x, y: -300, scale: 0.8};
            case 'bottom':
                return {x: item.x, y: window.innerHeight + 300, scale: 0.8};
            case 'left':
                return {x: -300, y: item.y, scale: 0.8};
            case 'right':
                return {x: window.innerWidth + 300, y: item.y, scale: 0.8};
            case 'center':
                return {
                    x: containerRect.width / 2 - item.w / 2,
                    y: containerRect.height / 2 - item.h / 2,
                    scale: 0.3
                };
            default:
                return {x: item.x, y: item.y + 150, scale: 0.8};
        }
    }, [animateFrom]);

    useEffect(() => {
        preloadImages(items.map(i => i.img)).then(() => setImagesReady(true));
    }, [items]);

    // Intersection Observer로 섹션 진입 감지
    useEffect(() => {
        // cleanup 함수에서 사용할 ref 값을 변수에 복사
        const currentContainer = containerRef.current;
        if (!currentContainer) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !hasAnimated) {
                        setIsInView(true);
                        setHasAnimated(true);
                    }
                });
            },
            {
                threshold: 0.1, // 10% 보일 때 트리거
                rootMargin: '0px 0px -50px 0px' // 하단에서 50px 전에 트리거
            }
        );

        observer.observe(currentContainer);

        return () => {
            // 복사한 변수를 사용하여 cleanup
            if (currentContainer) {
                observer.unobserve(currentContainer);
            }
        };
    }, [hasAnimated]);

    const grid = useMemo<GridItem[]>(() => {
        if (!width) return [];
        const colHeights = new Array(columns).fill(0);
        const gap = isMobile ? 4 : 20; // 모바일: 4px, 데스크탑: 20px
        const totalGaps = (columns - 1) * gap;
        const columnWidth = (width - totalGaps) / columns;

        return items.map(child => {
            const col = colHeights.indexOf(Math.min(...colHeights));
            const x = col * (columnWidth + gap);
            // 정방형으로 만들기 위해 높이를 너비와 같게 설정
            const height = columnWidth;
            const y = colHeights[col];

            colHeights[col] += height + gap;
            return {...child, x, y, w: columnWidth, h: height};
        });
    }, [columns, items, width, isMobile]);

    const hasMounted = useRef(false);

    useLayoutEffect(() => {
        if (!imagesReady || !isInView) return;

        grid.forEach((item, index) => {
            const selector = `[data-key="${item.id}"]`;
            const animProps = {x: item.x, y: item.y, width: item.w, height: item.h};

            if (!hasMounted.current) {
                const start = getInitialPosition(item);
                gsap.fromTo(
                    selector,
                    {
                        opacity: 0,
                        x: start.x,
                        y: start.y,
                        scale: start.scale || 0.8,
                        width: item.w,
                        height: item.h,
                        rotation: animateFrom === 'center' ? 180 : 0,
                        ...(blurToFocus && {filter: 'blur(15px)'})
                    },
                    {
                        opacity: 1,
                        x: item.x,
                        y: item.y,
                        scale: 1,
                        rotation: 0,
                        ...(blurToFocus && {filter: 'blur(0px)'}),
                        duration: 1.2,
                        ease: 'power3.out',
                        delay: index * stagger
                    }
                );
            } else {
                gsap.to(selector, {
                    ...animProps,
                    duration,
                    ease,
                    overwrite: 'auto'
                });
            }
        });

        hasMounted.current = true;
    }, [grid, imagesReady, isInView, stagger, animateFrom, blurToFocus, duration, ease, getInitialPosition]);

    return (
        <div ref={containerRef} className="relative w-full aspect-square">
            {grid.map(item => (
                <div
                    key={item.id}
                    data-key={item.id}
                    className="box-content absolute"
                    style={{
                        willChange: 'transform, width, height, opacity',
                        transform: 'translateZ(0)', // GPU 가속 활성화
                        backfaceVisibility: 'hidden' // 렌더링 최적화
                    }}
                >
                    <div
                        className="relative w-full h-full uppercase bg-center bg-cover"
                        style={{
                            backgroundImage: `url(${item.img})`,
                            transform: 'translateZ(0)', // GPU 가속
                            willChange: 'transform'
                        }}
                    >

                        <img src={item.overlayImage || overlayImagePath}
                             className='absolute max-w-[250px] w-[calc(100%-20px)] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
                             alt=""/>

                    </div>
                </div>
            ))}
        </div>
    );
};

export default Masonry;
