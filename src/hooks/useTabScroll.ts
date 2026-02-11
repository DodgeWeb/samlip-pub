import {useCallback} from 'react';

/**
 * Tab 클릭 시 "콘텐츠 영역"으로 스크롤을 맞춰주는 공통 헬퍼
 * - 초기 진입 시에는 절대 자동 스크롤을 하지 않음(각 페이지에서 호출하지 않으면 됨)
 * - 탭 클릭으로 인한 스크롤임을 표시해서( __isTabScroll ) 스크롤 방향 감지가 튀지 않게 함
 */
export const useTabScroll = () => {
    return useCallback((targetEl: HTMLElement | null, opts?: { offsetTop?: number }) => {
        if (!targetEl) return;

        // 기본 offsetTop(기존 동작 유지) + 서브탭/헤더 sticky 상태를 고려한 동적 보정
        // - 서브헤더가 내려와 있거나(SubHeader 노출) SubTab이 sticky로 내려와 있으면
        //   상단 고정 영역(헤더+서브탭)의 실제 높이만큼 빼줘야 "공백"이 남지 않는다.
        const fallbackOffsetTop = 55;
        const getDynamicOffsetTop = () => {
            // 명시적으로 offsetTop을 주면 그 값을 그대로 사용
            if (typeof opts?.offsetTop === 'number') return opts.offsetTop;

            const subTabEl = document.querySelector('[data-tab]') as HTMLElement | null;
            if (!subTabEl) return fallbackOffsetTop;

            const rect = subTabEl.getBoundingClientRect();
            // 화면에 보이는 sticky subTab의 "아래 끝" 위치(px) = 고정 영역 높이
            // (상단 헤더 높이 + subTab 높이가 포함된 값)
            const bottom = Math.round(rect.bottom);
            // 안전장치: 비정상 값이면 fallback
            if (!Number.isFinite(bottom) || bottom <= 0) return fallbackOffsetTop;
            return bottom;
        };

        const scrollToTop = (top: number) => {
            const lenis = (window as any).lenis;
            if (lenis && typeof lenis.scrollTo === 'function') {
                lenis.scrollTo(top, {duration: 0, immediate: true});
            } else {
                window.scrollTo({top, behavior: 'auto'});
                document.documentElement.scrollTop = top;
                document.body.scrollTop = top;
            }
        };

        // 탭 클릭으로 인한 스크롤임을 표시 (서브헤더 유지/스크롤 방향 감지 무시용)
        (window as any).__isTabScroll = true;

        // 탭 클릭 직후 헤더/서브탭(top)이 motion으로 이동 중인 동안은 offset이 계속 바뀐다.
        // 한 번만 맞추면 "여백이 남았다가, 한 번 더 클릭하면 정상" 현상이 생길 수 있어서
        // offset이 안정될 때까지(rAF 몇 프레임) 최종 위치로 계속 보정한다.
        const startedAt = Date.now();
        let rafId: number | null = null;
        let stableFrames = 0;
        let lastOffset = -1;

        const tick = () => {
            const offset = getDynamicOffsetTop();
            const desiredTop = targetEl.getBoundingClientRect().top + window.scrollY - offset;
            const delta = desiredTop - window.scrollY;

            // offset이 거의 변하지 않고, 목표 위치와 현재 위치가 거의 같으면 안정으로 간주
            const offsetStable = Math.abs(offset - lastOffset) <= 1;
            const positionStable = Math.abs(delta) <= 1;
            if (offsetStable && positionStable) stableFrames += 1;
            else stableFrames = 0;
            lastOffset = offset;

            // 안정되기 전이면 계속 보정
            if (!positionStable) {
                scrollToTop(desiredTop);
            }

            // 2프레임 연속 안정이면 종료(또는 최대 900ms에서 강제 종료)
            if (stableFrames >= 2 || Date.now() - startedAt > 900) {
                rafId = null;
                return;
            }
            rafId = window.requestAnimationFrame(tick);
        };

        rafId = window.requestAnimationFrame(tick);

        // 스크롤 완료 후 플래그 제거
        window.setTimeout(() => {
            (window as any).__isTabScroll = false;
            if (rafId) window.cancelAnimationFrame(rafId);
        }, 1000);
    }, []);
};

