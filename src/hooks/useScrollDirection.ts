import {useState, useEffect, useRef} from 'react';

/**
 * 스크롤 방향을 감지하는 커스텀 훅
 * @param threshold 스크롤 임계값 (기본값: 50px)
 * @returns 위로 스크롤 중인지 여부 (true: 위로, false: 아래로)
 */
export function useScrollDirection(threshold: number = 50): boolean {
    const [isScrollingUp, setIsScrollingUp] = useState(false);
    const lastScrollY = useRef(0);

    useEffect(() => {
        const handleScroll = () => {
            // 탭 클릭으로 인한 스크롤일 때는 방향 감지 무시
            if ((window as any).__isTabScroll === true) {
                // (중요) 감지를 "무시"만 하면 직전 상태(isScrollingUp=true)가 유지되어
                // 탭 클릭(프로그램 스크롤)에서도 서브헤더가 역행처럼 튀어나올 수 있음
                // → 탭 스크롤 중에는 방향을 순행(false)로 리셋하고 기준값도 갱신
                setIsScrollingUp(false);
                lastScrollY.current = window.scrollY;
                return;
            }

            const currentScrollY = window.scrollY;
            const scrollDifference = Math.abs(currentScrollY - lastScrollY.current);

            // 임계값 이상 스크롤했을 때만 방향 변경
            if (scrollDifference >= threshold) {
                if (currentScrollY < lastScrollY.current) {
                    // 위로 스크롤
                    setIsScrollingUp(true);
                } else if (currentScrollY > lastScrollY.current) {
                    // 아래로 스크롤
                    setIsScrollingUp(false);
                }

                lastScrollY.current = currentScrollY;
            }
        };

        window.addEventListener('scroll', handleScroll, {passive: true});

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [threshold]);

    return isScrollingUp;
}




