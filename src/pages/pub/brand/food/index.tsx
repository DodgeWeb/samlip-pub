import React, {useEffect, useRef, useState} from 'react';
import {useRouter} from 'next/router';
import {Icon} from '@/components/pub/icons';
import {motion, useReducedMotion} from 'framer-motion';
import {
    FoodSplitSnapSections,
    type FoodSplitSnapSectionsHandle
} from '@/components/pub/brand/food/FoodSplitSnapSection';

import {Footer} from '@/components/pub/footer/Footer';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Autoplay, Navigation} from 'swiper/modules';
import type {Swiper as SwiperType} from 'swiper';
import 'swiper/css/bundle';
import SeeMore from '@/components/pub/atoms/Button/SeeMore';

export const foodSwiperSections = [
    {
        id: 1,
        backgroundImage: '/img/brand/food/convenience_food_big_01.jpg',
        backgroundImageNew: '/img/brand/food/swiper_01_brand.png',
        brandPath: '/pub/brand/food/hiM',
    },
    {
        id: 2,
        backgroundImage: '/img/brand/food/convenience_food_big_02.jpg',
        backgroundImageNew: '/img/brand/food/swiper_02_brand.png',
        brandPath: '/pub/brand/food/pigInTheGarden',
    },
    {
        id: 3,
        backgroundImage: '/img/brand/food/wellness_food_big_01.jpg',
        backgroundImageNew: '/img/brand/food/swiper_03_brand.png',
        brandPath: '/pub/brand/food/cityDeli',
    },
    {
        id: 4,
        backgroundImage: '/img/brand/food/happiness_food_big_01.jpg',
        backgroundImageNew: '/img/brand/food/swiper_04_brand.png',
        brandPath: '/pub/brand/food/grillSchwein',
    },
] as const;

// Swiper가 loop를 안정적으로 돌리려면 슬라이드 수가 충분해야 함.
// 현재는 원본이 4개뿐이라(PC: slidesPerView 4.9) loop에서 버그가 나므로,
// 1,2,3,4를 여러 번 반복해서 "항상 순서대로" 충분한 개수를 확보한다.
type FoodSwiperSection = (typeof foodSwiperSections)[number];
type FoodSwiperRenderSection = FoodSwiperSection & { __key: string };
const SWIPER_REPEAT_COUNT = 3; // 1,2,3,4를 2번 더 반복(총 3세트=12장)
const SWIPER_INITIAL_INDEX = foodSwiperSections.length; // 가운데 세트(2번째)부터 시작
const foodSwiperRenderSections: FoodSwiperRenderSection[] = Array.from({length: SWIPER_REPEAT_COUNT}).flatMap((_, rep) =>
    foodSwiperSections.map((s) => ({...s, __key: `rep-${rep}-${s.id}`}))
);

const FoodIndex = () => {
    const router = useRouter();
    const scrollContainerRef = useRef<HTMLDivElement | null>(null);
    const sectionRefs = useRef<Array<HTMLElement | null>>([]);
    const splitSectionsRef = useRef<FoodSplitSnapSectionsHandle | null>(null);
    const isSnappingRef = useRef(false);
    const unlockTimerRef = useRef<number | null>(null);
    const prefersReducedMotion = useReducedMotion();
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const check = () => {
            setIsMobile(window.innerWidth < 1024);
        };
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);
    const [activeSection, setActiveSection] = useState<number>(0);
    const swiperPrevRef = useRef<HTMLButtonElement>(null);
    const swiperNextRef = useRef<HTMLButtonElement>(null);
    const swiperRef = useRef<SwiperType | null>(null);
    // 마지막 섹션(스와이퍼+푸터) 내부 스크롤 컨테이너
    const lastSectionScrollRef = useRef<HTMLDivElement | null>(null);
    // 인트로(첫 섹션) 스텝: 0=기본, 1=텍스트 등장 완료
    // PC/모바일 동일: 첫 스크롤 "의도"에서만 introStep=1로 전환
    const [introStep, setIntroStep] = useState<0 | 1>(0);
    const introStepRef = useRef<0 | 1>(0);
    // 내부 스크롤 기준 역행/순행 상태 (모바일에서 "역행으로 최상단 복귀" 시 메인헤더를 다시 노출하기 위함)
    const [isInternalScrollingUp, setIsInternalScrollingUp] = useState(false);
    // 내부 스크롤 컨테이너가 실제 최상단인지(프로그램 스크롤 포함) 추적
    const [isAtTop, setIsAtTop] = useState(true);
    // 인트로(1번 이벤트) 역행 애니메이션이 끝나기 전까지 메인헤더 노출을 지연
    const [isIntroReverseTransitioning, setIsIntroReverseTransitioning] = useState(false);
    // 섹션0에서 다음 섹션으로 "이탈"이 시작되면 인트로를 즉시 사라지게 처리(브랜드 인덱스 패턴)
    const [isIntroLeaving, setIsIntroLeaving] = useState(false);
    // 인터렉션/스냅 진행 중(락)에는 역행 이벤트를 발동시키지 않기 위함
    const [isInteractionLocked, setIsInteractionLocked] = useState(false);
    // 실제로 "의도"가 확정된 입력 방향(매직마우스 미세 흔들림 방지)
    const [lastIntentDirection, setLastIntentDirection] = useState<'forward' | 'reverse' | null>(null);
    // TOP 버튼 등 외부 트리거로 split 섹션 상태까지 포함해 초기화하기 위한 리마운트 키
    const [resetNonce, setResetNonce] = useState(0);

    useEffect(() => {
        const mq = window.matchMedia('(max-width: 1023px)');
        const onChange = () => setIsMobile(mq.matches);
        onChange();
        if (typeof mq.addEventListener === 'function') {
            mq.addEventListener('change', onChange);
            return () => mq.removeEventListener('change', onChange);
        }
        // Safari 구버전 대응
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (mq as any).addListener(onChange);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return () => (mq as any).removeListener(onChange);
    }, []);

    // CIBI 페이지처럼: 휠/스와이프 "의도"를 감지해서 다음 섹션으로 부드럽게 넘기는 스냅
    useEffect(() => {
        const root = scrollContainerRef.current;
        const sections = sectionRefs.current.filter(Boolean) as HTMLElement[];
        if (!root || sections.length === 0) return;

        const behavior: ScrollBehavior = prefersReducedMotion ? 'auto' : 'smooth';
        // 휠 vs 트랙패드(매직마우스 포함)는 입력 특성이 달라서 임계값을 분리한다.
        // - 휠: 이벤트 수는 적고 delta가 큼 → "미세하게" 굴려도 반응하도록 민감
        // - 트랙패드/매직마우스: 작은 delta가 연속(관성)으로 들어옴 → 천천히 넘어가도록 둔감
        const WHEEL_PROFILE = {
            wheel: {deltaClamp: 140, intentThreshold: 4, minEvents: 1, resetMs: 260},
            trackpad: {deltaClamp: 18, intentThreshold: 160, minEvents: 8, resetMs: 140},
        } as const;
        // 터치는 wheel과 성격이 달라 별도 임계값 유지
        const TOUCH_THRESHOLD = 28; // 모바일 스와이프 민감도(조금 더 짧게)
        // iOS(iPadOS 포함) 감지: iPadOS는 UA가 Macintosh로 나오는 케이스가 있어 maxTouchPoints로 보강
        const isIOS =
            /iPad|iPhone|iPod/i.test(navigator.userAgent) ||
            (navigator.platform === 'MacIntel' && (navigator.maxTouchPoints ?? 0) > 1);

        // 스와이퍼 버튼 클릭 등 "스크롤이 아닌 인터랙션"으로 인해 scrollTop이 2~몇 px 흔들릴 때,
        // onScroll 백업 로직이 이를 의도로 오인해 윗 섹션으로 튀는 현상을 방지한다.
        let suppressScrollIntentUntil = 0;
        const SUPPRESS_SCROLL_INTENT_MS = 650;
        const suppressScrollIntentForMs = (ms: number) => {
            const now = typeof performance !== 'undefined' ? performance.now() : Date.now();
            suppressScrollIntentUntil = Math.max(suppressScrollIntentUntil, now + ms);
        };
        const suppressScrollIntentFromTarget = (target: EventTarget | null) => {
            const el = target as HTMLElement | null;
            if (!el) return;
            if (!el.closest('[data-snap-intent="ignore"]')) return;
            const now = typeof performance !== 'undefined' ? performance.now() : Date.now();
            suppressScrollIntentUntil = now + SUPPRESS_SCROLL_INTENT_MS;
        };
        const onPointerDownCapture = (e: PointerEvent) => {
            suppressScrollIntentFromTarget(e.target);
        };

        // iOS에서 섹션 전환(smooth) 중 터치가 먹히면 스크롤이 캔슬되며 "걸침"이 생길 수 있어
        // 목표 지점에 도착할 때까지 락을 유지(타이머 락이 중간에 풀리지 않게)한다.
        let settleRaf: number | null = null;
        let settleTargetTop: number | null = null;
        let settleLastTop = 0;
        let settleStableFrames = 0;
        let settleStuckFrames = 0;
        let settleKickCount = 0;
        let settleStartTs = 0;
        const stopSettleLock = () => {
            if (settleRaf !== null) window.cancelAnimationFrame(settleRaf);
            settleRaf = null;
            settleTargetTop = null;
            settleStableFrames = 0;
            settleStuckFrames = 0;
            settleKickCount = 0;
        };

        const lock = (ms: number) => {
            isSnappingRef.current = true;
            setIsInteractionLocked(true);
            if (unlockTimerRef.current) window.clearTimeout(unlockTimerRef.current);
            unlockTimerRef.current = window.setTimeout(() => {
                unlockTimerRef.current = null;
                // iOS에서는 "도착 기반 락"이 켜져 있으면 타이머로 락을 풀지 않는다.
                if (isIOS && settleTargetTop !== null) return;
                isSnappingRef.current = false;
                setIsInteractionLocked(false);
            }, ms);
        };

        const revealIntroStep = () => {
            if (introStepRef.current === 1) return false;
            introStepRef.current = 1;
            setIntroStep(1);
            // 인트로 순행 액션(텍스트 등장)을 시작하는 순간,
            // 직전 역행 제스처로 남아있을 수 있는 방향 상태를 순행으로 확정해
            // "역행 복귀" effect가 중간에 introStep을 다시 0으로 되감지 않게 한다.
            setIsInternalScrollingUp(false);
            setLastIntentDirection('forward');
            return true;
        };

        const getActiveIndex = () => {
            const y = root.scrollTop + root.clientHeight / 2;
            let bestIdx = 0;
            let bestDist = Number.POSITIVE_INFINITY;
            sections.forEach((s, idx) => {
                const d = Math.abs(s.offsetTop + s.clientHeight / 2 - y);
                if (d < bestDist) {
                    bestDist = d;
                    bestIdx = idx;
                }
            });
            return bestIdx;
        };

        // 마지막 섹션(스와이퍼+푸터) 내부 스크롤을 위해 snap을 잠깐 끄고/켜는 헬퍼
        const disableSnapTemporarily = () => {
            if (root.style.scrollSnapType !== 'none') root.style.scrollSnapType = 'none';
        };
        const restoreSnap = () => {
            // className의 snap-y snap-mandatory로 복구
            if (root.style.scrollSnapType === 'none') root.style.scrollSnapType = '';
        };

        // 마지막 섹션(푸터 포함)에서 위로 역행할 때, 네이티브 관성 스크롤이 "상단 경계"를 그냥 통과하면
        // 스냅/스플릿 역행 액션이 개입할 기회를 잃어버릴 수 있습니다.
        // → 상단 근처에서는 네이티브 내부 스크롤을 끊고 스냅 의도로 전환합니다.
        const LAST_SECTION_EXIT_THRESHOLD = 48; // px
        // 마지막 섹션 내부 스크롤을 위해 스냅을 끄는 로직이 있으므로,
        // "마지막 섹션 밖"으로 나온 뒤에도 스냅이 꺼진 채로 남지 않게 안전장치를 둔다.
        const ensureSnapOutsideLastSection = () => {
            const lastIdx = sections.length - 1;
            const lastTop = sections[lastIdx]?.offsetTop ?? 0;
            const isInLastSection = root.scrollTop >= lastTop - 2;
            // 프로그램 스크롤/도착락 중에는 건드리지 않음(전환 안정성)
            if (isSnappingRef.current) return;
            if (isIOS && settleTargetTop !== null) return;
            if (!isInLastSection) restoreSnap();
        };

        const startSettleLock = (targetTop: number, opts: { restoreSnapAfter: boolean }) => {
            if (!isIOS) return;
            // 기존 타이머 락이 있으면 해제하고 "도착" 기준으로 전환
            if (unlockTimerRef.current) {
                window.clearTimeout(unlockTimerRef.current);
                unlockTimerRef.current = null;
            }
            isSnappingRef.current = true;
            setIsInteractionLocked(true);
            settleTargetTop = targetTop;
            settleLastTop = root.scrollTop;
            settleStableFrames = 0;
            settleStuckFrames = 0;
            settleKickCount = 0;
            settleStartTs = typeof performance !== 'undefined' ? performance.now() : Date.now();

            if (settleRaf !== null) window.cancelAnimationFrame(settleRaf);
            const tick = () => {
                if (settleTargetTop === null) {
                    settleRaf = null;
                    return;
                }
                const now = typeof performance !== 'undefined' ? performance.now() : Date.now();
                const currentTop = root.scrollTop;
                const dist = Math.abs(currentTop - settleTargetTop);
                const moved = Math.abs(currentTop - settleLastTop);
                settleLastTop = currentTop;

                if (dist <= 1 && moved <= 0.5) settleStableFrames += 1;
                else settleStableFrames = 0;

                // iOS에서 smooth 스크롤이 "터치/입력"에 의해 중간에서 캔슬되면
                // dist는 남아있는데 moved가 거의 0으로 멈춰버림 → 같은 목표로 smooth를 1~2번만 재시동
                if (dist > 2 && moved <= 0.5) settleStuckFrames += 1;
                else settleStuckFrames = 0;
                if (settleStuckFrames >= 3 && settleKickCount < 2) {
                    settleKickCount += 1;
                    settleStuckFrames = 0;
                    settleStartTs = now; // 타임아웃 리셋
                    root.scrollTo({top: settleTargetTop, behavior});
                }

                const timedOut = now - settleStartTs > (prefersReducedMotion ? 0 : 3500);
                if (settleStableFrames >= 3 || timedOut) {
                    if (opts.restoreSnapAfter) restoreSnap();
                    stopSettleLock();
                    isSnappingRef.current = false;
                    setIsInteractionLocked(false);
                    return;
                }
                settleRaf = window.requestAnimationFrame(tick);
            };
            settleRaf = window.requestAnimationFrame(tick);
        };

        const scrollToIndex = (
            idx: number,
            opts?: {
                // 스플릿 스텝 소비처럼 "섹션 이동"이 아닌 경우 settle lock을 타지 않음
                settle?: boolean;
                behavior?: ScrollBehavior;
            }
        ) => {
            const target = sections[idx];
            if (!target) return;
            const top = target.offsetTop;
            const lastIdx = sections.length - 1;
            const settle = opts?.settle ?? true;
            const behaviorToUse = opts?.behavior ?? behavior;

            // "섹션 이동" 케이스만 iOS settle lock(도착 기반 락)을 사용한다.
            // 스플릿 스텝 소비/역행 복귀처럼 현재 섹션에 붙이는 목적이면 settle lock을 타면
            // 타이머 락이 지워져(=startSettleLock 내부) 애니메이션이 끝나기 전에 다음 액션이 가능해질 수 있음.
            if (settle) {
                // 섹션 전환 중 오버슈트 방지: 스냅 잠깐 해제
                disableSnapTemporarily();
                root.scrollTo({top, behavior: behaviorToUse});

                // 마지막 섹션은 내부 스크롤을 위해 스냅을 계속 끄는 편이 안정적
                if (isIOS) {
                    startSettleLock(top, {restoreSnapAfter: idx !== lastIdx});
                } else if (idx !== lastIdx) {
                    window.setTimeout(() => restoreSnap(), prefersReducedMotion ? 0 : 450);
                }
                return;
            }

            // 핀 고정(정렬) 목적: settle lock 없이 즉시 붙이기
            root.scrollTo({top, behavior: behaviorToUse});
            // 마지막 섹션이 아니면 스냅은 복구해둔다.
            if (idx !== lastIdx) restoreSnap();
        };

        // 모바일(특히 iOS)에서는 touch 이벤트가 안정적으로 인터셉트되지 않는 경우가 있어,
        // 실제 스크롤 발생(scroll 이벤트)을 "의도"로 간주해 동일 로직으로 처리하는 백업 경로를 둡니다.
        const handleIntentFromScroll = (deltaY: number) => {
            if (isSnappingRef.current) return;
            const activeIdx = getActiveIndex();
            const lastIdx = sections.length - 1;
            const lastTop = sections[lastIdx]?.offsetTop ?? 0;

            // 섹션0(인트로)에서 introStep(1번 이벤트)을 이미 소비한 상태면,
            // 역행 입력 시 최상단(step0) 상태로 복원해야 함
            if (deltaY < 0 && activeIdx === 0 && introStepRef.current === 1) {
                introStepRef.current = 0;
                setIntroStep(0);
                setIsIntroLeaving(false);
                lock(prefersReducedMotion ? 0 : 340);
                scrollToIndex(0);
                return;
            }

            // split 섹션(1..): 역행 시에는 "섹션 이동"보다 먼저 섹션 내부 스텝을 되돌려야 함
            if (deltaY < 0 && activeIdx > 0) {
                const reversed = splitSectionsRef.current?.tryReverseStepAt(activeIdx - 1) ?? false;
                if (reversed) {
                    // 역행(되감기) 애니메이션이 완전히 끝날 때까지 섹션 이동 금지
                    lock(prefersReducedMotion ? 0 : 1250);
                    // 현재 섹션에 고정(이전 섹션으로 넘어가지 않게) - settle lock 금지(타이머 락 보존)
                    scrollToIndex(activeIdx, {settle: false, behavior: 'auto'});
                    return;
                }
            }

            if (deltaY > 0) {
                // 섹션0: 인트로 스텝(텍스트 등장)을 먼저 소비
                if (activeIdx === 0) {
                    const revealed = revealIntroStep();
                    if (revealed) {
                        lock(prefersReducedMotion ? 0 : 2000);
                        // 사용자가 조금이라도 내려갔으면 섹션0 위치로 다시 붙여줌
                        scrollToIndex(0);
                        return;
                    }
                } else {
                    // split 섹션(1..): 각 섹션 내부 스텝을 먼저 소비
                    const consumed = splitSectionsRef.current?.tryForwardStepAt(activeIdx - 1) ?? false;
                    if (consumed) {
                        // 순행(확장) 애니메이션이 완전히 끝날 때까지 섹션 이동 금지
                        lock(prefersReducedMotion ? 0 : 1400);
                        // 현재 섹션에 고정(다음 섹션으로 넘어가지 않게) - settle lock 금지(타이머 락 보존)
                        scrollToIndex(activeIdx, {settle: false, behavior: 'auto'});
                        return;
                    }
                }
            }

            if (deltaY > 0 && activeIdx < sections.length - 1) {
                // 인트로(섹션0)에서 다음 섹션으로 넘어가는 첫 스크롤부터 인트로는 사라져야 함
                if (activeIdx === 0) setIsIntroLeaving(true);
                lock(prefersReducedMotion ? 0 : 720);
                scrollToIndex(activeIdx + 1);
                return;
            }
            if (deltaY < 0 && activeIdx > 0) {
                // 마지막 섹션(스와이퍼+푸터) 내부에서 위로 스크롤 중이면 섹션 이동보다 내부 스크롤이 우선
                // 단, 상단 근처(임계값)에서는 "섹션 역행 스냅"이 먼저 먹어야 한다.
                if (activeIdx === lastIdx && root.scrollTop > lastTop + LAST_SECTION_EXIT_THRESHOLD) return;
                // 마지막 섹션을 벗어나면 스냅 복구
                if (activeIdx === lastIdx && root.scrollTop <= lastTop + LAST_SECTION_EXIT_THRESHOLD) restoreSnap();
                // 섹션0(인트로)로 "복귀"하는 역행에서는, 순행 때 했던 이탈 액션을 반대로 되감아야 한다.
                // - isIntroLeaving=true 상태면 인트로가 계속 숨겨져 보일 수 있으므로 복구
                // - introStep도 초기(0)로 되돌려 안내/문구가 원래 상태로 돌아오게 처리
                if (activeIdx - 1 === 0) {
                    setIsIntroLeaving(false);
                    setIsIntroReverseTransitioning(false);
                    introStepRef.current = 0;
                    setIntroStep(0);
                    // 역행 방향 상태가 남아있으면 다음 순행 때 인트로가 중간에 다시 되감길 수 있어 초기화
                    setIsInternalScrollingUp(false);
                    setLastIntentDirection(null);
                }
                lock(prefersReducedMotion ? 0 : 720);
                scrollToIndex(activeIdx - 1);
            }
        };

        const handleIntent = (deltaY: number, preventDefault: () => void) => {
            if (isSnappingRef.current) {
                preventDefault();
                return;
            }

            const activeIdx = getActiveIndex();
            const lastIdx = sections.length - 1;
            const lastTop = sections[lastIdx]?.offsetTop ?? 0;

            // 섹션0(인트로)에서 introStep(1번 이벤트)을 이미 소비한 상태면,
            // 역행 입력 시 최상단(step0) 상태로 복원해야 함
            if (deltaY < 0 && activeIdx === 0 && introStepRef.current === 1) {
                preventDefault();
                introStepRef.current = 0;
                setIntroStep(0);
                setIsIntroLeaving(false);
                lock(prefersReducedMotion ? 0 : 340);
                scrollToIndex(0);
                return;
            }

            // split 섹션(1..): 역행 시에는 "섹션 이동"보다 먼저 섹션 내부 스텝을 되돌려야 함
            if (deltaY < 0 && activeIdx > 0) {
                const reversed = splitSectionsRef.current?.tryReverseStepAt(activeIdx - 1) ?? false;
                if (reversed) {
                    preventDefault();
                    // 역행(되감기) 애니메이션이 완전히 끝날 때까지 섹션 이동 금지
                    lock(prefersReducedMotion ? 0 : 1250);
                    // 현재 섹션에 고정(이전 섹션으로 넘어가지 않게) - settle lock 금지(타이머 락 보존)
                    scrollToIndex(activeIdx, {settle: false, behavior: 'auto'});
                    return;
                }
            }

            if (deltaY > 0) {
                // 섹션0: 인트로 스텝(텍스트 등장)을 먼저 소비
                if (activeIdx === 0) {
                    const revealed = revealIntroStep();
                    if (revealed) {
                        preventDefault();
                        lock(prefersReducedMotion ? 0 : 2000);
                        return;
                    }
                } else {
                    // split 섹션(1..): 각 섹션 내부 스텝을 먼저 소비
                    const consumed = splitSectionsRef.current?.tryForwardStepAt(activeIdx - 1) ?? false;
                    if (consumed) {
                        preventDefault();
                        // 순행(확장) 애니메이션이 완전히 끝날 때까지 섹션 이동 금지
                        lock(prefersReducedMotion ? 0 : 1400);
                        return;
                    }
                }
            }

            if (deltaY > 0 && activeIdx < sections.length - 1) {
                preventDefault();
                // 인트로(섹션0)에서 다음 섹션으로 넘어가는 첫 스크롤부터 인트로는 사라져야 함
                if (activeIdx === 0) setIsIntroLeaving(true);
                lock(prefersReducedMotion ? 0 : 720);
                scrollToIndex(activeIdx + 1);
                return;
            }
            if (deltaY < 0 && activeIdx > 0) {
                preventDefault();
                // 마지막 섹션(스와이퍼+푸터) 내부에서 위로 스크롤 중이면 섹션 이동보다 내부 스크롤이 우선
                // 단, 상단 근처(임계값)에서는 "섹션 역행 스냅"이 먼저 먹어야 한다.
                if (activeIdx === lastIdx && root.scrollTop > lastTop + LAST_SECTION_EXIT_THRESHOLD) return;
                if (activeIdx === lastIdx && root.scrollTop <= lastTop + LAST_SECTION_EXIT_THRESHOLD) restoreSnap();
                // 섹션0(인트로)로 "복귀"하는 역행에서는, 순행 때 했던 이탈 액션을 반대로 되감아야 한다.
                if (activeIdx - 1 === 0) {
                    setIsIntroLeaving(false);
                    setIsIntroReverseTransitioning(false);
                    introStepRef.current = 0;
                    setIntroStep(0);
                    // 역행 방향 상태가 남아있으면 다음 순행 때 인트로가 중간에 다시 되감길 수 있어 초기화
                    setIsInternalScrollingUp(false);
                    setLastIntentDirection(null);
                }
                lock(prefersReducedMotion ? 0 : 720);
                scrollToIndex(activeIdx - 1);
            }
        };

        // 휠 입력 누적(매직마우스 대응)
        let wheelAccum = 0;
        let wheelEventCount = 0;
        let wheelLastSign: -1 | 1 | 0 = 0;
        let wheelAccumResetTimer: number | null = null;
        let wheelLastTs = 0;
        let wheelProfile: 'wheel' | 'trackpad' = 'wheel';

        const onWheel = (e: WheelEvent) => {
            // 가로 스크롤/줌 등은 무시
            if (Math.abs(e.deltaY) < Math.abs(e.deltaX)) return;

            // 마지막 섹션(스와이퍼+푸터)에서는 섹션 내부로 내려가서 Footer까지 스크롤 가능해야 함
            const lastIdx = sections.length - 1;
            const lastTop = sections[lastIdx]?.offsetTop ?? 0;
            const isInLastSection = root.scrollTop >= lastTop - 2;
            // 마지막 섹션은 "중첩 스크롤 컨테이너"에서만 내부 스크롤을 처리한다.
            // outer(스냅 컨테이너)는 스냅을 유지해야 iOS에서 관성으로 여러 섹션을 통과하는 버그가 사라진다.
            if (isInLastSection) {
                const inner = lastSectionScrollRef.current;
                const targetEl = e.target as HTMLElement | null;
                const withinInner = !!(inner && targetEl && inner.contains(targetEl));
                if (inner && withinInner) {
                    const maxInnerTop = inner.scrollHeight - inner.clientHeight;
                    const canScrollInner =
                        (e.deltaY > 0 && inner.scrollTop < maxInnerTop - 2) ||
                        (e.deltaY < 0 && inner.scrollTop > 2);
                    if (canScrollInner) return; // 네이티브 내부 스크롤
                }
            }

            // 중요: 마지막 섹션 내부 스크롤을 허용하는 경우가 아니라면,
            // 락(스냅 진행) 중의 관성 입력도 네이티브 스크롤로 새지 않게 먼저 막는다.
            if (e.cancelable) e.preventDefault();

            // 순행/스냅/인터렉션 진행 중에는 역행 이벤트(방향 상태 포함)를 발동시키지 않는다.
            if (isSnappingRef.current) return;

            // 현재 입력이 "휠"인지 "트랙패드/매직마우스"인지 대략 판별
            // - 트랙패드/매직마우스는 작은 delta + 매우 짧은 간격으로 연속 입력되는 패턴이 많다.
            const now = typeof performance !== 'undefined' ? performance.now() : Date.now();
            const dt = wheelLastTs ? now - wheelLastTs : 999;
            wheelLastTs = now;
            const absY = Math.abs(e.deltaY);
            const looksTrackpad = e.deltaMode === 0 && (dt < 35 || (dt < 80 && absY < 12));
            const nextProfile: 'wheel' | 'trackpad' = looksTrackpad ? 'trackpad' : 'wheel';
            if (wheelProfile !== nextProfile) {
                wheelProfile = nextProfile;
                wheelAccum = 0;
                wheelEventCount = 0;
                wheelLastSign = 0;
            }
            const profile = WHEEL_PROFILE[wheelProfile];

            const sign: -1 | 1 = e.deltaY < 0 ? -1 : 1;
            if (wheelLastSign !== 0 && sign !== wheelLastSign) {
                wheelAccum = 0;
                wheelEventCount = 0;
            }
            wheelLastSign = sign;
            // 이벤트당 delta를 클램프해서 누적(관성/노이즈 완화)
            const clamped = Math.max(-profile.deltaClamp, Math.min(profile.deltaClamp, e.deltaY));
            wheelAccum += clamped;
            wheelEventCount += 1;

            // 일정 시간 입력이 끊기면 누적 리셋
            if (wheelAccumResetTimer) window.clearTimeout(wheelAccumResetTimer);
            wheelAccumResetTimer = window.setTimeout(() => {
                wheelAccum = 0;
                wheelEventCount = 0;
                wheelLastSign = 0;
                wheelAccumResetTimer = null;
            }, profile.resetMs);

            // Header에 내부 스크롤 기준 역행/순행 전달 (Food 페이지 전용)
            // 프로필별 임계값을 넘겼을 때만 "의도"로 처리
            if (wheelEventCount < profile.minEvents) return;
            if (Math.abs(wheelAccum) < profile.intentThreshold) return;

            const intentDelta = wheelAccum;
            wheelAccum = 0;
            wheelEventCount = 0;
            wheelLastSign = 0;
            // 임계값을 넘은 "의도"만 방향으로 인정
            setIsInternalScrollingUp(sign < 0);
            setLastIntentDirection(sign < 0 ? 'reverse' : 'forward');
            window.dispatchEvent(
                new CustomEvent('food:scrollDirection', {detail: {isScrollingUp: sign < 0}})
            );
            handleIntent(intentDelta, () => {
                // 이미 preventDefault 했지만, 스텝 소비/락 상태에서는 한 번 더 보장
                if (e.cancelable) e.preventDefault();
            });
        };

        let touchStartY = 0;
        let touchLastY = 0;
        let touchStartX = 0;
        let touchLastX = 0;
        // 스와이퍼 영역에서 시작한 제스처는 "대각선"도 가로로 더 관대하게 판정(역행 스냅 오인 방지)
        let touchStartedInSwiper = false;
        // 스와이퍼에서 시작한 제스처의 의도를 1회 판정해서(가로/세로) touchend에서 스냅 오인을 차단
        let touchSwipeIntent: 'unknown' | 'swiper' | 'page' = 'unknown';
        // iOS에서 touchend는 preventDefault 영향이 약해서, 스와이프 난사 시 네이티브 스크롤이 먼저 진행되며
        // 스냅이 "반쯤 걸쳐" 멈추는 케이스가 있음 → touchmove(=preventDefault 가능한 구간)에서 1회만 의도를 소비
        let touchConsumed = false;
        let touchStartActiveIdx = 0;
        // PC 휠처럼 "한 번의 스와이프 = 한 번의 액션"으로 만들기 위해
        // 작은 이동에서도 네이티브 스크롤(관성)을 먼저 막아버리는 캡처 임계값을 둡니다.
        const TOUCH_CAPTURE_THRESHOLD = 8; // CIBI와 동일
        const onTouchStart = (e: TouchEvent) => {
            if (e.touches.length !== 1) return;
            touchStartY = e.touches[0]?.clientY ?? 0;
            touchLastY = touchStartY;
            touchStartX = e.touches[0]?.clientX ?? 0;
            touchLastX = touchStartX;
            // 시작 지점이 스와이퍼 내부인지 저장(드래그 도중 target이 바뀌어도 유지)
            touchStartedInSwiper = !!(e.target instanceof HTMLElement && e.target.closest('.brand-swiper, .swiper'));
            touchSwipeIntent = 'unknown';
            // 스와이퍼 제스처 중 scrollTop 흔들림을 onScroll 백업 로직이 역행 의도로 오인하는 케이스 방지
            if (touchStartedInSwiper) suppressScrollIntentForMs(1200);
            // iOS에서 섹션 전환(smooth) 중 터치가 먹히면 스크롤이 캔슬되며 "걸침"이 생길 수 있어
            // 전환 중에는 제스처를 '무시'하되, 상태는 초기화해서 touchend가 꼬이지 않게 한다.
            const blockedBySnap = isIOS && isSnappingRef.current;
            touchConsumed = blockedBySnap;
            touchStartActiveIdx = getActiveIndex();
            if (blockedBySnap && e.cancelable) {
                e.preventDefault();
            }
        };
        const onTouchMove = (e: TouchEvent) => {
            if (e.touches.length !== 1) return;

            // NOTE(iOS): 스와이퍼 영역에서 터치가 시작되면 Swiper가 터치를 잡아
            // 세로(역행) 스크롤이 막히는 케이스가 있어, "가로 제스처"일 때만 스킵한다.
            // (세로 제스처는 기존 로직대로 스냅/내부스크롤로 처리)
            const target = e.target as HTMLElement | null;

            const currentY = e.touches[0]?.clientY ?? 0;
            const currentX = e.touches[0]?.clientX ?? 0;
            touchLastY = currentY;
            touchLastX = currentX;

            // 가로 스와이프는 무시 (탭/슬라이더 등과 충돌 방지) - CIBI와 동일
            const dx = Math.abs(currentX - touchStartX);
            const dy = Math.abs(currentY - touchStartY);
            // 스와이퍼에서 "살짝 대각선"으로 움직이는 경우,
            // touchend에서 페이지 스냅으로 오인되는 것을 막기 위해 의도를 1회 판정해서 고정한다.
            if (touchStartedInSwiper && touchSwipeIntent === 'unknown' && dx + dy >= 6) {
                const ratio = dx / Math.max(1, dy);
                if (dx >= 8 && ratio >= 0.55) touchSwipeIntent = 'swiper';
                else if (dy >= dx * 1.35) touchSwipeIntent = 'page';
            }
            if (touchSwipeIntent === 'swiper') {
                touchConsumed = true;
                return;
            }
            if (dx > dy) return;

            // 역행/순행 방향을 전달
            const delta = touchStartY - currentY; // +면 아래로(순행), -면 위로(역행)
            if (Math.abs(delta) > 8) {
                window.dispatchEvent(
                    new CustomEvent('food:scrollDirection', {detail: {isScrollingUp: delta < 0}})
                );
                // FOOD는 인트로 역행 복귀 로직이 방향 상태를 참조하므로, 터치에서도 상태를 동기화한다.
                setIsInternalScrollingUp(delta < 0);
                setLastIntentDirection(delta < 0 ? 'reverse' : 'forward');
            }

            // 마지막 섹션(스와이퍼+푸터)에서는 섹션 내부로 내려가서 Footer까지 스크롤 가능해야 함
            const lastIdx = sections.length - 1;
            const lastTop = sections[lastIdx]?.offsetTop ?? 0;
            const isInLastSection = root.scrollTop >= lastTop - 2;
            // 마지막 섹션 내부는 중첩 스크롤 컨테이너가 담당.
            // inner에서 스크롤이 가능한 경우에는 여기서 preventDefault/의도 소비를 하면 안 된다.
            if (isInLastSection) {
                const inner = lastSectionScrollRef.current;
                const withinInner = !!(inner && target && inner.contains(target));
                if (inner && withinInner) {
                    const maxInnerTop = inner.scrollHeight - inner.clientHeight;
                    const canScrollInner =
                        (delta > 0 && inner.scrollTop < maxInnerTop - 2) ||
                        (delta < 0 && inner.scrollTop > 2);
                    if (canScrollInner) return;
                }
            }

            // 락/스냅 중에는 방향 이벤트/의도 처리를 발동시키지 않음
            if (isSnappingRef.current) {
                if (e.cancelable) e.preventDefault();
                // 손을 떼지 않고 계속 드래그하는 케이스에서,
                // 한 번 소비된 touchConsumed가 계속 true로 남아 다음 액션이 안 먹는 문제가 생길 수 있다.
                // 스냅(락) 중에는 기준점을 갱신하고 consumed를 풀어, 락 해제 후 새 제스처처럼 다시 잡히게 한다.
                touchStartY = currentY;
                touchLastY = currentY;
                touchStartX = currentX;
                touchConsumed = false;
                touchStartActiveIdx = getActiveIndex();
                return;
            }

            // 조금이라도 움직였으면 스크롤 방지 (내용이 실제로 밀려 내려가는 것 방지) - CIBI와 동일
            if (dy > TOUCH_CAPTURE_THRESHOLD && e.cancelable) {
                e.preventDefault();
            }

            // iOS 전용: 임계값을 넘는 순간 1회만 의도를 소비(네이티브 스크롤 선행 방지)
            if (!isIOS) return;
            if (touchConsumed) return;
            if (Math.abs(delta) < TOUCH_THRESHOLD) return;
            const activeIdx = touchStartActiveIdx;
            const lastIdxForCheck = sections.length - 1;
            const lastTopForCheck = sections[lastIdxForCheck]?.offsetTop ?? 0;
            // 마지막 섹션(푸터/스와이퍼 영역)에서 너무 깊은 구간에서는 "의도 소비"를 하면 안 된다.
            // 하지만 상단 근처에서는 손을 떼지 않아도(=touchmove) 섹션 역행 스냅이 발동되어야 한다.
            if (activeIdx === lastIdxForCheck && root.scrollTop > lastTopForCheck + 2 + LAST_SECTION_EXIT_THRESHOLD) return;

            touchConsumed = true;
            if (e.cancelable) e.preventDefault();

            handleIntent(delta, () => {
                if (e.cancelable) e.preventDefault();
            });
        };
        const onTouchEnd = (e: TouchEvent) => {
            if (isIOS && touchConsumed) return;
            const startedInSwiper = touchStartedInSwiper;
            const swipeIntent = touchSwipeIntent;
            // 제스처 종료 시 플래그 리셋(다음 터치에 영향 없게)
            touchStartedInSwiper = false;
            touchSwipeIntent = 'unknown';
            const delta = touchStartY - touchLastY; // +면 아래로(순행), -면 위로(역행)
            // 스와이퍼에서 시작된 제스처가 가로(대각 포함)로 판정되면, touchend에서도 페이지 스냅을 막는다.
            if (startedInSwiper) {
                const dx = Math.abs(touchLastX - touchStartX);
                const dy = Math.abs(touchLastY - touchStartY);
                const ratio = dx / Math.max(1, dy);
                if (swipeIntent === 'swiper' || (dx >= 8 && ratio >= 0.55)) return;
            }

            // 마지막 섹션(스와이퍼+푸터) 내부 스크롤은 touchend에서 처리하지 않되,
            // "상단에 붙어있는 상태에서 위로(역행) 스와이프"는 이전 섹션으로 스냅 복귀가 필요하다.
            const lastIdx = sections.length - 1;
            const lastTop = sections[lastIdx]?.offsetTop ?? 0;
            const isInLastSection = root.scrollTop >= lastTop - 2;
            if (isInLastSection) {
                const inner = lastSectionScrollRef.current;
                const isInnerAtTop = !inner || inner.scrollTop <= 2;
                // last 섹션 내부에서는 inner를 먼저 위로 올리고, inner가 top일 때만 섹션 역행을 허용한다.
                if (!(delta < 0 && isInnerAtTop)) return;
            }

            // 임계값을 넘었을 때만 처리 - CIBI와 동일
            if (Math.abs(delta) < TOUCH_THRESHOLD) return;

            // 락 중에는 처리하지 않음
            if (isSnappingRef.current) return;

            setIsInternalScrollingUp(delta < 0);
            setLastIntentDirection(delta < 0 ? 'reverse' : 'forward');

            handleIntent(delta, () => {
                // touchend는 preventDefault 영향이 적어서, move에서 주로 막음. (여기서는 로직 통일용)
            });
        };

        // scroll 기반 백업(모바일 대응)
        let lastScrollTop = root.scrollTop;
        let rafId: number | null = null;
        // iOS에서 가끔 "딱 10~12px 정도" 덜 가고 스냅 사이에 걸리는 케이스가 있어,
        // 스크롤이 멈춘 뒤에만 가장 가까운 섹션으로 부드럽게 정렬한다.
        let scrollEndTimer: number | null = null;
        let lastAutoAlignTop: number | null = null;
        let lastAutoAlignAt = 0;
        const scheduleAutoAlign = () => {
            if (!isIOS) return;
            if (scrollEndTimer) window.clearTimeout(scrollEndTimer);
            scrollEndTimer = window.setTimeout(() => {
                scrollEndTimer = null;
                if (isSnappingRef.current) return;
                // iOS에서 경계(섹션 사이) 근처에서는 "중앙 기준" 인덱스가 튀며
                // 역행 시 한 번 더 스냅되는 현상이 생길 수 있어, 현재 scrollTop 기준으로 가장 가까운 섹션을 선택한다.
                let bestIdx = 0;
                let bestDist = Number.POSITIVE_INFINITY;
                for (let i = 0; i < sections.length; i += 1) {
                    const s = sections[i];
                    const d = Math.abs((s?.offsetTop ?? 0) - root.scrollTop);
                    if (d < bestDist) {
                        bestDist = d;
                        bestIdx = i;
                    }
                }
                const target = sections[bestIdx];
                if (!target) return;
                const lastIdx = sections.length - 1;
                const lastTop = sections[lastIdx]?.offsetTop ?? 0;
                // 마지막 섹션에서 푸터로 내부 스크롤 중이면 정렬하지 않음
                if (root.scrollTop >= lastTop - 2 && root.scrollTop > lastTop + 2) return;

                const top = target.offsetTop;
                const dist = Math.abs(root.scrollTop - top);
                if (dist <= 2) return;

                const now = typeof performance !== 'undefined' ? performance.now() : Date.now();
                if (lastAutoAlignTop === top && now - lastAutoAlignAt < 600) return;
                lastAutoAlignTop = top;
                lastAutoAlignAt = now;

                root.scrollTo({top, behavior: prefersReducedMotion ? 'auto' : 'smooth'});
            }, 140);
        };
        const onScroll = () => {
            if (rafId !== null) return;
            rafId = window.requestAnimationFrame(() => {
                rafId = null;
                const current = root.scrollTop;
                const delta = current - lastScrollTop;
                lastScrollTop = current;
                const now = typeof performance !== 'undefined' ? performance.now() : Date.now();
                // iOS 전용: 마지막 섹션(푸터)에서 스냅을 꺼둔 상태(scrollSnapType:none)로 내부 스크롤을 허용할 때,
                // 강한 역행 플릭(관성)으로 lastTop(푸터 섹션 시작)을 "네이티브 스크롤"이 통과하면
                // 여러 섹션을 한 번에 훑고 올라갔다가(=확확 넘어감) 나중에 복귀하는 현상이 생길 수 있다.
                // → 통과를 감지하면 즉시 관성을 끊고(=lastTop으로 되돌려 모멘텀 캔슬) 이전 섹션으로 1회 스냅 이동한다.
                if (isIOS && sections.length >= 2 && root.style.scrollSnapType === 'none') {
                    const lastIdx = sections.length - 1;
                    const lastTop = sections[lastIdx]?.offsetTop ?? 0;
                    const crossedLastTop = root.scrollTop < lastTop - 1 && delta < -1;
                    if (crossedLastTop && !isSnappingRef.current) {
                        // 모멘텀을 먼저 끊어서 "한 번에 다 올라가는" 네이티브 관성을 차단
                        root.scrollTo({top: lastTop, behavior: 'auto'});
                        lastScrollTop = lastTop;
                        restoreSnap();
                        lock(prefersReducedMotion ? 0 : 720);
                        scrollToIndex(lastIdx - 1);
                        return;
                    }
                    // 스냅이 꺼진 동안에는 scroll 기반 백업 의도 처리(handleIntentFromScroll)가 섞이면 불안정해질 수 있어 차단
                    // (푸터 내부 스크롤은 네이티브로 진행)
                    return;
                }

                // 역행/순행 과정에서 스냅이 꺼진 채로 남으면 "액션 없이 그냥 넘어감"이 발생할 수 있어 복구
                ensureSnapOutsideLastSection();
                // 스냅/프로그램 스크롤로 "실제 최상단 도착"을 감지(헤더 노출 조건에 사용)
                setIsAtTop(current <= 2);
                // 클릭/포커스 등으로 인한 미세 스크롤 흔들림은 의도로 처리하지 않음
                if (now < suppressScrollIntentUntil) return;
                scheduleAutoAlign();

                // 너무 미세한 흔들림은 무시
                if (Math.abs(delta) < 2) return;

                // 락/순행 중에는 역행 이벤트를 발동시키지 않음(관성/스냅 중 흔들림 방지)
                if (isSnappingRef.current) return;

                window.dispatchEvent(
                    new CustomEvent('food:scrollDirection', {detail: {isScrollingUp: delta < 0}})
                );
                setIsInternalScrollingUp(delta < 0);
                setLastIntentDirection(delta < 0 ? 'reverse' : 'forward');
                handleIntentFromScroll(delta);
            });
        };

        root.addEventListener('wheel', onWheel, {passive: false});
        // 스와이퍼 버튼 등 클릭으로 발생하는 "의도 오인" 방지 (캡처로 가장 먼저 감지)
        root.addEventListener('pointerdown', onPointerDownCapture, {passive: true, capture: true});
        // iOS에서 전환 중 터치 캔슬을 막기 위해 preventDefault가 필요하므로 passive:false
        root.addEventListener('touchstart', onTouchStart, {passive: false});
        root.addEventListener('touchmove', onTouchMove, {passive: false});
        root.addEventListener('touchend', onTouchEnd, {passive: true});
        root.addEventListener('scroll', onScroll, {passive: true});
        // 초기값 설정
        setIsAtTop(root.scrollTop <= 2);

        return () => {
            root.removeEventListener('wheel', onWheel);
            root.removeEventListener('pointerdown', onPointerDownCapture, true);
            root.removeEventListener('touchstart', onTouchStart);
            root.removeEventListener('touchmove', onTouchMove);
            root.removeEventListener('touchend', onTouchEnd);
            root.removeEventListener('scroll', onScroll);
            if (rafId !== null) window.cancelAnimationFrame(rafId);
            if (unlockTimerRef.current) window.clearTimeout(unlockTimerRef.current);
            unlockTimerRef.current = null;
            isSnappingRef.current = false;
            if (wheelAccumResetTimer) window.clearTimeout(wheelAccumResetTimer);
            if (scrollEndTimer) window.clearTimeout(scrollEndTimer);
            stopSettleLock();
        };
    }, [prefersReducedMotion]);

    // 활성 섹션 감지 (CIBI처럼 IntersectionObserver를 root=내부 스크롤 컨테이너로 사용)
    useEffect(() => {
        const root = scrollContainerRef.current;
        const sections = sectionRefs.current.filter(Boolean) as HTMLElement[];
        if (!root || sections.length === 0) return;

        const io = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (!entry.isIntersecting) continue;
                    const idx = sections.indexOf(entry.target as HTMLElement);
                    if (idx >= 0) setActiveSection(idx);
                }
            },
            {root, threshold: 0.6}
        );

        sections.forEach((s) => io.observe(s));
        return () => io.disconnect();
    }, []);

    // Food 페이지에서만: step 진행이 시작되면 메인헤더 숨김 (CIBI 패턴 동일)
    useEffect(() => {
        // 베이커리 인트로는 "첫 순행"에서 introStep이 1로 바뀌고도 섹션0 위치에 머무를 수 있음.
        // 이때는 메인헤더를 숨기되, 역행으로 인트로 복귀 애니메이션이 "완료된 뒤"에만 메인헤더를 다시 노출한다.
        const isHeaderVisible =
            activeSection === 0 &&
            isAtTop &&
            introStep === 0 &&
            !isIntroReverseTransitioning;
        const hide = !isHeaderVisible;
        window.dispatchEvent(new CustomEvent('food:mainHeader', {detail: {hide}}));
    }, [activeSection, introStep, isAtTop, isIntroReverseTransitioning]);

    // 인트로 스텝(1번 이벤트)을 이미 소비한 상태(introStep=1)에서
    // 역행 입력이 들어오면 최상단(step0) 상태로 복원해야 함
    // (메인헤더/스크롤 안내 등 최상단 UI 정상화)
    useEffect(() => {
        if (activeSection !== 0) return;
        // 순행 중에는 역행 이벤트 발동 금지, 모든 인터렉션이 끝난 뒤에만 역행 동작 허용
        if (isInteractionLocked) return;
        if (!isInternalScrollingUp) return;
        if (lastIntentDirection !== 'reverse') return;
        if (introStepRef.current !== 1) return;

        // 역행 복귀 애니메이션 시작: 완료되기 전까지 메인헤더 노출 금지
        setIsIntroReverseTransitioning(true);
        // 인트로 복귀 중에는 "이탈" 상태 해제
        setIsIntroLeaving(false);
        introStepRef.current = 0;
        setIntroStep(0);
        // 역행 시점에 내부 스크롤을 최상단으로 붙여 "최상단" 상태를 확실히 만든다
        const root = scrollContainerRef.current;
        if (root) {
            root.scrollTo({top: 0, behavior: 'auto'});
        }
    }, [activeSection, isInternalScrollingUp, isInteractionLocked, lastIntentDirection]);

    // 페이지 이탈 시에는 헤더 상태를 기본값으로 복구
    useEffect(() => {
        // 초기값 리셋
        window.dispatchEvent(new CustomEvent('food:scrollDirection', {detail: {isScrollingUp: false}}));
        return () => {
            window.dispatchEvent(new CustomEvent('food:scrollDirection', {detail: {isScrollingUp: false}}));
            window.dispatchEvent(new CustomEvent('food:mainHeader', {detail: {hide: false}}));
            setIsInternalScrollingUp(false);
            setIsAtTop(true);
            setIsIntroReverseTransitioning(false);
            setIsIntroLeaving(false);
        };
    }, []);

    // 이 페이지에서만: 외부(TOP 버튼 등)에서 "첫 번째 섹션 + 초기 step"으로 강제 리셋
    useEffect(() => {
        const handler = (e: Event) => {
            const detail = (e as CustomEvent<{ behavior?: ScrollBehavior }>).detail;
            const behavior: ScrollBehavior = detail?.behavior ?? (prefersReducedMotion ? 'auto' : 'smooth');

            // step/락 상태 리셋
            introStepRef.current = 0;
            setIntroStep(0);
            setActiveSection(0);
            setResetNonce((v) => v + 1);
            setIsIntroLeaving(false);

            isSnappingRef.current = false;
            if (unlockTimerRef.current) window.clearTimeout(unlockTimerRef.current);
            unlockTimerRef.current = null;

            // 헤더 상태도 초기값으로 정리
            window.dispatchEvent(new CustomEvent('food:mainHeader', {detail: {hide: false}}));
            window.dispatchEvent(new CustomEvent('food:scrollDirection', {detail: {isScrollingUp: false}}));

            // 내부 스크롤 컨테이너를 최상단으로
            const root = scrollContainerRef.current;
            if (root) {
                root.scrollTo({top: 0, behavior});
            } else {
                window.scrollTo({top: 0, behavior});
            }
        };
        window.addEventListener('food:reset', handler as EventListener);
        return () => window.removeEventListener('food:reset', handler as EventListener);
    }, [prefersReducedMotion]);

    return (
        <main className="w-full h-dvh overflow-hidden overscroll-none">
            {/* 상단 3개 히어로 구간: 스크롤 스냅(세로) */}
            <div
                ref={scrollContainerRef}
                className="overflow-y-auto overscroll-none relative w-full h-dvh snap-y snap-mandatory scroll-smooth [&::-webkit-scrollbar]:hidden"
                style={{WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none', msOverflowStyle: 'none'}}
            >
                <section
                    ref={(el) => {
                        sectionRefs.current[0] = el;
                    }}

                    className='overflow-hidden relative w-full h-dvh bg-deilcut snap-start snap-always'
                >
                    <div className="overflow-hidden absolute size-[calc(100%+2px)] lg:pt-[90px]">
                        <img src="/img/brand/food_home_back_pc.svg" alt=""
                             className="hidden object-cover w-full h-full lg:block"/>
                        <img src="/img/brand/food_home_back_mo.svg" alt=""
                             className="block object-cover w-full h-full lg:hidden"/>
                    </div>
                    <motion.div
                        // 모바일에서는 첫 진입 시 FOOD/문구를 숨겨두었다가
                        // 첫 스텝(introStep=1)에서 등장/상승 애니메이션이 시작되도록 처리
                        // 요청: 모바일에서도 FOOD 타이틀은 최초부터 노출
                        initial={{opacity: 1, y: 0}}
                        // (1) 문장 등장 타이밍에 맞춰 FOOD도 같이 천천히 위로 이동
                        // (2) 섹션0에서 다음 스크롤이 시작되면(섹션 이탈) 인트로는 즉시 사라짐
                        animate={
                            (() => {
                                const liftY = isMobile ? -140 : -260;
                                const leaveY = isMobile ? -240 : -380;
                                // 모바일은 "없다가 생김" 느낌을 위해 약간 아래에서 시작
                                const baseY = isMobile ? 12 : 0;
                                // 3줄 문구가 순차로 등장/완료되는 타이밍에 맞춰 3번에 나눠 리프트 후 마지막은 홀드
                                const liftKeyframes = [
                                    baseY,
                                    baseY + Math.round(liftY * 0.33),
                                    baseY + Math.round(liftY * 0.66),
                                    baseY + liftY,
                                    baseY + liftY,
                                ];
                                if (isIntroLeaving || activeSection !== 0) return {opacity: 0, y: leaveY};
                                // 모바일: introStep 0에서는 타이틀은 노출(문구는 별도 motion.p에서 introStep=1에만 등장)
                                if (isMobile && introStep === 0) return {opacity: 1, y: 0};
                                if (introStep === 1) return {opacity: 1, y: liftKeyframes};
                                return {opacity: 1, y: 0};
                            })()
                        }
                        transition={{
                            duration: prefersReducedMotion
                                ? 0
                                : isIntroLeaving || activeSection !== 0
                                    ? 0.35
                                    : isMobile && introStep === 0
                                        ? 0.45
                                        : 2.0,
                            // 문구 등장 타이밍과 타이틀 리프트 시작을 동기화
                            delay: prefersReducedMotion ? 0 : (introStep === 1 ? 0.2 : 0),
                            // 문구 3줄이 끝나는 시점(≈1.95s)에 맞춰 리프트 키프레임을 배치
                            times: introStep === 1 ? [0, 0.275, 0.575, 0.875, 1] : undefined,
                            ease: [0.22, 1, 0.36, 1],
                        }}
                        className='flex absolute inset-0 flex-col justify-center items-center font-extrabold text-cream'
                        style={{pointerEvents: isIntroLeaving || activeSection !== 0 ? 'none' : 'auto'}}
                    >
                        {/* 문장들이 opacity 0이어도 레이아웃 공간을 차지해서 FOOD가 위로 떠 보이는 문제 방지 */}
                        <div className="flex relative flex-col items-center w-full">
                            <h1 className='text-[72px] lg:text-[220px] gt-ultra leading-[0.95]'>FOOD</h1>

                            {/* 아래 문장들은 absolute로 띄워서 FOOD 중앙정렬에 영향 없게 처리 */}
                            <div
                                className="flex absolute top-full left-1/2 flex-col items-center mt-3 w-full -translate-x-1/2 lg:mt-8">
                                <motion.p
                                    initial={{y: 200, opacity: 0}}
                                    animate={introStep === 1 ? {y: 0, opacity: 1} : {y: 200, opacity: 0}}
                                    transition={{
                                        duration: prefersReducedMotion ? 0 : 0.55,
                                        // 순행(노출)만 딜레이, 역행(숨김)에는 딜레이 없이 바로 시작
                                        delay: prefersReducedMotion ? 0 : (introStep === 1 ? 0.2 : 0),
                                        ease: [0.22, 1, 0.36, 1],
                                    }}
                                    className='text-[22px] lg:text-[64px] mb-3'
                                >
                                    혁신적인 푸드 솔루션을 제공하며,
                                </motion.p>
                                <motion.p
                                    initial={{y: 200, opacity: 0}}
                                    animate={introStep === 1 ? {y: 0, opacity: 1} : {y: 200, opacity: 0}}
                                    transition={{
                                        duration: prefersReducedMotion ? 0 : 0.55,
                                        // 순행(노출)만 딜레이, 역행(숨김)에는 딜레이 없이 바로 시작
                                        delay: prefersReducedMotion ? 0 : (introStep === 1 ? 0.8 : 0),
                                        ease: [0.22, 1, 0.36, 1],
                                    }}
                                    className='text-[22px] lg:text-[64px] mb-3'
                                >
                                    일상의 새로운 가치와
                                </motion.p>
                                <motion.p
                                    initial={{y: 200, opacity: 0}}
                                    animate={introStep === 1 ? {y: 0, opacity: 1} : {y: 200, opacity: 0}}
                                    transition={{
                                        duration: prefersReducedMotion ? 0 : 0.55,
                                        // 순행(노출)만 딜레이, 3번째 문장은 2번째 다음에 차례로
                                        delay: prefersReducedMotion ? 0 : (introStep === 1 ? 1.4 : 0),
                                        ease: [0.22, 1, 0.36, 1],
                                    }}
                                    className='text-[22px] lg:text-[64px]'
                                    onAnimationComplete={() => {
                                        // 역행(인트로 복귀) 애니메이션이 끝난 뒤에만 메인해더 노출
                                        if (introStep === 0 && isIntroReverseTransitioning) {
                                            setIsIntroReverseTransitioning(false);
                                        }
                                    }}
                                >
                                    즐거움을 선사하는 푸드 브랜드
                                </motion.p>
                            </div>
                        </div>
                    </motion.div>
                    {/* 스크롤 안내: 첫 스텝 시작과 동시에 투명도 0으로 사라짐 */}
                    <motion.div
                        initial={{opacity: 1}}
                        animate={introStep === 1 ? {opacity: 0} : {opacity: 1}}
                        transition={{duration: prefersReducedMotion ? 0 : 0.3, ease: [0.22, 1, 0.36, 1]}}
                        className="absolute bottom-[40px] flex flex-col items-center gap-2 w-full"
                        style={{pointerEvents: introStep === 1 ? 'none' : 'auto'}}
                    >
                        <p className='text-cream'>스크롤해서 내용을 확인해 보세요!</p>
                        <Icon name="doubleArrow" className="*:*:fill-cream size-[24px]"/>
                    </motion.div>
                </section>

                {/* split 섹션 3개: 데이터 + map 렌더링은 컴포넌트 내부에서 처리 */}
                <FoodSplitSnapSections
                    key={resetNonce}
                    ref={splitSectionsRef}
                    prefersReducedMotion={Boolean(prefersReducedMotion)}
                    setSectionElAt={(i: number, el: HTMLElement | null) => {
                        sectionRefs.current[i + 1] = el;
                    }}
                />

                <section
                    ref={(el) => {
                        // 0: 인트로, 1~3: split 섹션 3개, 4: 하단 스와이퍼
                        // 0: 인트로, 1~4: split 섹션 4개, 5: 하단 스와이퍼
                        sectionRefs.current[5] = el;
                    }}
                    // 마지막 섹션: 스냅은 고정, 내부에서만 스크롤(푸터까지 도달)
                    className="relative w-full h-dvh snap-start snap-always overflow-hidden"
                >
                    <div
                        ref={lastSectionScrollRef}
                        className="w-full h-full overflow-y-auto overscroll-contain [&::-webkit-scrollbar]:hidden"
                        style={{WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none', msOverflowStyle: 'none'}}
                    >
                        <div className="flex relative flex-col justify-center items-center pt-[60px] lg:pt-[100px]">
                            <div className="w-full">
                                <h1 className=" text-[22px] leading-[130%] lg:text-[63px] lg:leading-[1.3] tracking-[-3%] text-center mb-6 text-[#4E0C0D] font-extrabold">
                                    삼립의 다양한 푸드,<br/>
                                    지금 바로 만나보세요
                                </h1>
                                <div className="flex gap-6 justify-center items-center pb-12">
                                    {/* 커스텀 네이게이션 버튼 */}
                                    <button
                                        ref={swiperPrevRef}
                                        data-snap-intent="ignore"
                                        className="size-9 lg:size-[60px] rounded-full p-2 lg:p-5 transition-all bg-[#500C08] flex items-center justify-center hover:bg-[#6B1414] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                                        aria-label="이전 슬라이드"
                                    >
                                        <Icon name="arrowTop" className="size-full *:fill-white -rotate-90"/>
                                    </button>
                                    <button
                                        ref={swiperNextRef}
                                        data-snap-intent="ignore"
                                        className="size-9 lg:size-[60px] rounded-full p-2 lg:p-5  transition-all bg-[#500C08] flex items-center justify-center hover:bg-[#6B1414] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                                        aria-label="다음 슬라이드"
                                    >
                                        <Icon name="arrowTop" className="size-full *:fill-white rotate-90"/>
                                    </button>
                                </div>
                            </div>
                            <div className="w-full pb-[100px] lg:pb-[200px]">
                                <Swiper
                                    modules={[Navigation, Autoplay]}
                                    navigation={{
                                        prevEl: swiperPrevRef.current,
                                        nextEl: swiperNextRef.current,
                                    }}
                                    // iOS에서 Swiper가 세로 스크롤을 막는 케이스 방지(세로 pan 허용)
                                    style={{touchAction: 'pan-y'}}
                                    // 대각선 스와이프를 더 가로로 인정해서(역행 스냅 오인 방지) Swiper가 제스처를 가져가게 한다.
                                    touchAngle={70}
                                    threshold={8}
                                    touchMoveStopPropagation={true}
                                    onSwiper={(swiper: SwiperType) => {
                                        swiperRef.current = swiper;
                                        // Swiper 인스턴스가 준비되면 네이게이션 업데이트
                                        setTimeout(() => {
                                            try {
                                                if (
                                                    swiper &&
                                                    swiper.params &&
                                                    swiper.params.navigation &&
                                                    typeof swiper.params.navigation !== 'boolean' &&
                                                    swiper.navigation &&
                                                    swiperPrevRef.current &&
                                                    swiperNextRef.current
                                                ) {
                                                    swiper.params.navigation.prevEl = swiperPrevRef.current;
                                                    swiper.params.navigation.nextEl = swiperNextRef.current;
                                                    if (swiper.navigation.init) {
                                                        swiper.navigation.init();
                                                    }
                                                    if (swiper.navigation.update) {
                                                        swiper.navigation.update();
                                                    }
                                                }
                                            } catch (error) {
                                                console.warn('Swiper navigation initialization error:', error);
                                            }
                                        }, 100);
                                    }}
                                    spaceBetween={8}
                                    slidesPerView={2.5}
                                    breakpoints={{
                                        0: {
                                            slidesPerView: 2.5,
                                        },
                                        1024: {
                                            slidesPerView: 4.9,
                                        },
                                    }}
                                    centeredSlides={true}
                                    allowTouchMove={true}
                                    loop={true}
                                    initialSlide={SWIPER_INITIAL_INDEX}
                                    autoplay={{
                                        delay: 2000,
                                        disableOnInteraction: false,
                                    }}
                                    className='brand-swiper'
                                >
                                    {foodSwiperRenderSections.map((section) => (
                                        <SwiperSlide key={section.__key}>
                                            <div
                                                className='relative aspect-[3/4] cursor-pointer'
                                                onClick={() => {
                                                    // 스와이퍼 슬라이드 클릭 시 해당 브랜드 페이지로 이동
                                                    if (section.brandPath) {
                                                        router.push(section.brandPath);
                                                    }
                                                }}
                                            >
                                                <img
                                                    src={section.backgroundImage}
                                                    alt=""
                                                    className='object-cover size-full'
                                                />
                                                <div
                                                    className='absolute inset-0 size-full bg-[#FBFAE7] flex items-center lg:pb-12 pb-4 active justify-between flex-col gap-2'>
                                                    <div className='flex-1 center-box'>
                                                        <img
                                                            src={section.backgroundImageNew}
                                                            alt=""
                                                            className='w-full'
                                                        />
                                                    </div>
                                                    <SeeMore onClick={() => {
                                                        if (section.brandPath) {
                                                            router.push(section.brandPath);
                                                        }
                                                    }}
                                                             className='!border-2 !text-[12px] py-2   max-w-[120px] lg:max-w-[170px] lg:!text-[16px] !px-0 !w-full lg:!py-[12px]'
                                                    />

                                                </div>
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>
                            <div className="w-full bg-white">
                                <Footer/>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

        </main>
    );
};

export default FoodIndex;
