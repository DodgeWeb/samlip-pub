import {useState, useEffect, useRef} from 'react';

/**
 * 헤더 가시성과 스크롤 방향을 통합 관리하는 커스텀 훅
 * IntersectionObserver와 스크롤 방향 감지를 하나의 로직으로 통합하여 깜빡임 방지
 *
 * @param headerRef 헤더 요소의 ref
 * @param scrollThreshold 스크롤 방향 감지 임계값 (기본값: 50px)
 * @returns { isHeaderVisible, isScrollingUp, headerHeight }
 */
export function useHeaderVisibility(
    headerRef: React.RefObject<HTMLElement | null>,
    scrollThreshold: number = 50
) {
    const [isHeaderVisible, setIsHeaderVisible] = useState(true);
    const [isScrollingUp, setIsScrollingUp] = useState(false);
    const [headerHeight, setHeaderHeight] = useState(0);

    const lastScrollY = useRef(0);
    const rafId = useRef<number | null>(null);
    const timeoutId = useRef<NodeJS.Timeout | null>(null);
    const lastVisibleState = useRef<boolean>(true);
    const lastScrollDirection = useRef<boolean>(false);

    // 헤더 높이 측정 (초기 및 resize 시에만)
    useEffect(() => {
        const updateHeaderHeight = () => {
            if (headerRef.current) {
                const height = headerRef.current.offsetHeight;
                setHeaderHeight(prevHeight => {
                    // 높이가 실제로 변경된 경우에만 업데이트 (1px 이상 차이)
                    if (Math.abs(height - prevHeight) > 1) {
                        return height;
                    }
                    return prevHeight;
                });
            }
        };

        // 초기 높이 설정
        updateHeaderHeight();

        // ResizeObserver 사용 (더 정확한 높이 감지)
        let resizeObserver: ResizeObserver | null = null;
        if (headerRef.current && typeof ResizeObserver !== 'undefined') {
            resizeObserver = new ResizeObserver(() => {
                updateHeaderHeight();
            });
            resizeObserver.observe(headerRef.current);
        }

        // 폴백: resize 이벤트 리스너
        window.addEventListener('resize', updateHeaderHeight);

        return () => {
            if (resizeObserver && headerRef.current) {
                resizeObserver.unobserve(headerRef.current);
            }
            window.removeEventListener('resize', updateHeaderHeight);
        };
    }, [headerRef]);

    // 통합된 스크롤 및 가시성 감지
    useEffect(() => {
        if (!headerRef.current) return;

        let isTicking = false;
        const headerElement = headerRef.current;

        // IntersectionObserver 설정 (더 안정적인 rootMargin 사용)
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const newVisibleState = entry.isIntersecting;

                    // 상태가 실제로 변경된 경우에만 처리
                    if (newVisibleState !== lastVisibleState.current) {
                        // requestAnimationFrame으로 배치 처리
                        if (rafId.current) {
                            cancelAnimationFrame(rafId.current);
                        }

                        rafId.current = requestAnimationFrame(() => {
                            // 디바운싱: 짧은 시간 내 여러 변경 방지
                            if (timeoutId.current) {
                                clearTimeout(timeoutId.current);
                            }

                            timeoutId.current = setTimeout(() => {
                                setIsHeaderVisible(newVisibleState);
                                lastVisibleState.current = newVisibleState;
                            }, 50); // 50ms 디바운싱
                        });
                    }
                });
            },
            {
                threshold: 0,
                // 헤더가 완전히 사라진 후에 false로 변경 (여유 공간 확보)
                rootMargin: '-10px 0px 0px 0px'
            }
        );

        observer.observe(headerElement);

        // 스크롤 방향 감지 (requestAnimationFrame으로 최적화)
        const handleScroll = () => {
            if (!isTicking) {
                rafId.current = requestAnimationFrame(() => {
                    const currentScrollY = window.scrollY;
                    const scrollDifference = Math.abs(currentScrollY - lastScrollY.current);

                    // 임계값 이상 스크롤했을 때만 방향 변경
                    if (scrollDifference >= scrollThreshold) {
                        const newDirection = currentScrollY < lastScrollY.current;

                        // 방향이 실제로 변경된 경우에만 업데이트
                        if (newDirection !== lastScrollDirection.current) {
                            // 디바운싱 적용
                            if (timeoutId.current) {
                                clearTimeout(timeoutId.current);
                            }

                            timeoutId.current = setTimeout(() => {
                                setIsScrollingUp(newDirection);
                                lastScrollDirection.current = newDirection;
                            }, 100); // 100ms 디바운싱
                        }

                        lastScrollY.current = currentScrollY;
                    }

                    isTicking = false;
                });

                isTicking = true;
            }
        };

        window.addEventListener('scroll', handleScroll, {passive: true});

        return () => {
            observer.unobserve(headerElement);
            window.removeEventListener('scroll', handleScroll);

            if (rafId.current) {
                cancelAnimationFrame(rafId.current);
            }
            if (timeoutId.current) {
                clearTimeout(timeoutId.current);
            }
        };
    }, [headerRef, scrollThreshold]);

    return {isHeaderVisible, isScrollingUp, headerHeight};
}

