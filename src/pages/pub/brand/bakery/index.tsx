import React, {useEffect, useRef, useState} from 'react';
import {useRouter} from 'next/router';
import {Icon} from '@/components/pub/icons';
import {motion, useReducedMotion} from 'framer-motion';
import {BakerySplitSnapSections} from '@/components/pub/brand/bakery/BakerySplitSnapSection';
import type {BakerySplitSnapSectionsHandle} from '@/components/pub/brand/bakery/BakerySplitSnapSection';
import {Footer} from '@/components/pub/footer/Footer';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Autoplay, Navigation} from 'swiper/modules';
import type {Swiper as SwiperType} from 'swiper';
import 'swiper/css/bundle';
import SeeMore from '@/components/pub/atoms/Button/SeeMore';

export const bakerySwiperSections = [
    {
        id: 1,
        backgroundImage: '/img/brand/swiper_01.png',
        backgroundImageNew: '/img/brand/swiper_01_brand.png',
        brandPath: '/pub/brand/bakery/hoppang',
    },
    {
        id: 2,
        backgroundImage: '/img/brand/swiper_02.png',
        backgroundImageNew: '/img/brand/swiper_02_brand.png',
        brandPath: '/pub/brand/bakery/projectH',
    },
    {
        id: 3,
        backgroundImage: '/img/brand/swiper_03.png',
        backgroundImageNew: '/img/brand/swiper_03_brand.png',
        brandPath: '/pub/brand/bakery/readyB',
    },
    {
        id: 4,
        backgroundImage: '/img/brand/swiper_04.png',
        backgroundImageNew: '/img/brand/swiper_04_brand.png',
        brandPath: '/pub/brand/bakery/yakgwa',
    },
    {
        id: 5,
        backgroundImage: '/img/brand/swiper_05.png',
        backgroundImageNew: '/img/brand/swiper_05_brand.png',
        brandPath: '/pub/brand/bakery/creamBread',
    },
    {
        id: 6,
        backgroundImage: '/img/brand/swiper_06.png',
        backgroundImageNew: '/img/brand/swiper_06_brand.png',
        brandPath: '/pub/brand/bakery/migak',
    },
    {
        id: 7,
        backgroundImage: '/img/brand/swiper_07.png',
        backgroundImageNew: '/img/brand/swiper_07_brand.png',
        brandPath: '/pub/brand/bakery/boreumdal',
    },
    {
        id: 8,
        backgroundImage: '/img/brand/swiper_08.png',
        backgroundImageNew: '/img/brand/swiper_08_brand.png',
        brandPath: '/pub/brand/bakery/romanmeal',
    },
    {
        id: 9,
        backgroundImage: '/img/brand/swiper_09.png',
        backgroundImageNew: '/img/brand/swiper_09_brand.png',
        brandPath: '/pub/brand/bakery/nunettine',
    },
    {
        id: 10,
        backgroundImage: '/img/brand/swiper_10.png',
        backgroundImageNew: '/img/brand/swiper_10_brand.png',
        brandPath: '/pub/brand/bakery/hotteok',
    },
] as const;

const BakeryIndex = () => {
    const router = useRouter();
    const scrollContainerRef = useRef<HTMLDivElement | null>(null);
    const sectionRefs = useRef<Array<HTMLElement | null>>([]);
    const splitSectionsRef = useRef<BakerySplitSnapSectionsHandle | null>(null);
    const introCopyRef = useRef<HTMLDivElement | null>(null);
    const isSnappingRef = useRef(false);
    const unlockTimerRef = useRef<number | null>(null);
    const prefersReducedMotion = useReducedMotion();
    const [activeSection, setActiveSection] = useState<number>(0);
    const swiperPrevRef = useRef<HTMLButtonElement>(null);
    const swiperNextRef = useRef<HTMLButtonElement>(null);
    const swiperRef = useRef<SwiperType | null>(null);
    // 마지막 섹션(스와이퍼+푸터) 내부 스크롤 컨테이너
    const lastSectionScrollRef = useRef<HTMLDivElement | null>(null);
    // 인트로(첫 섹션) 스텝: 0=기본, 1=텍스트 등장 완료
    const [introStep, setIntroStep] = useState<0 | 1>(0);
    const introStepRef = useRef<0 | 1>(0);
    // 섹션0에서 다음 섹션으로 "이탈"이 시작되면 인트로를 즉시 사라지게 처리(FOOD와 동일)
    const [isIntroLeaving, setIsIntroLeaving] = useState(false);
    // TOP 버튼 등 외부 트리거로 split 섹션 상태까지 포함해 초기화하기 위한 리마운트 키
    const [resetNonce, setResetNonce] = useState(0);
    // 모바일에서 "너무 많이 올라감" 방지: 아래 문구(2줄) 실제 높이만큼만 타이틀을 리프트
    const [introLiftY, setIntroLiftY] = useState<number>(-173);

    // 아래 문구 블록(absolute)의 실제 높이(+margin-top)를 측정해 리프트 값을 동기화
    useEffect(() => {
        const el = introCopyRef.current;
        if (!el) return;

        const measure = () => {
            const rect = el.getBoundingClientRect();
            const style = window.getComputedStyle(el);
            const mt = Number.parseFloat(style.marginTop || '0') || 0;
            // 문구가 "올라온 만큼" 타이틀이 위로 이동해야 해서, 문구 높이(+상단 여백)만큼 리프트
            const next = -(Math.round(rect.height + mt));
            // 0 또는 NaN 방지(초기 레이아웃 준비 전)
            if (Number.isFinite(next) && next !== 0) setIntroLiftY(next);
        };

        measure();
        window.addEventListener('resize', measure);
        let ro: ResizeObserver | null = null;
        if (typeof ResizeObserver !== 'undefined') {
            ro = new ResizeObserver(() => measure());
            ro.observe(el);
        }
        return () => {
            window.removeEventListener('resize', measure);
            ro?.disconnect();
        };
    }, [resetNonce]);

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
            // 요청: 휠 스냅을 좀 더 민감하게(작은 휠 입력에도 넘어가도록) 임계값 하향
            wheel: {deltaClamp: 140, intentThreshold: 4, minEvents: 1, resetMs: 260},
            trackpad: {deltaClamp: 18, intentThreshold: 160, minEvents: 8, resetMs: 140},
        } as const;
        // 안드로이드 감지 (갤럭시 등)
        const isAndroid = /Android/i.test(navigator.userAgent);
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
        // 터치는 wheel과 성격이 달라 별도 임계값 유지
        // 안드로이드에서는 더 큰 임계값 사용하여 중간 스크롤 허용
        const TOUCH_THRESHOLD = isAndroid ? 50 : 28;

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
            if (unlockTimerRef.current) window.clearTimeout(unlockTimerRef.current);
            unlockTimerRef.current = window.setTimeout(() => {
                unlockTimerRef.current = null;
                // iOS에서는 "도착 기반 락"이 켜져 있으면 타이머로 락을 풀지 않는다.
                if (isIOS && settleTargetTop !== null) return;
                isSnappingRef.current = false;
            }, ms);
        };

        const revealIntroStep = () => {
            if (introStepRef.current === 1) return false;
            introStepRef.current = 1;
            setIntroStep(1);
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
                // 섹션 전환 중 오버슈트/중간정착 방지
                if (isIOS) disableSnapTemporarily();
                // 마지막 섹션에 Footer가 포함되어 "섹션 내부 스크롤"이 필요하므로, 진입은 항상 start로 맞춘다.
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

                // "도착 + 정지" 판정(연속 프레임)
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
                    return;
                }
                settleRaf = window.requestAnimationFrame(tick);
            };
            settleRaf = window.requestAnimationFrame(tick);
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
                        // FOOD와 동일하게: 인트로 애니메이션이 충분히 재생되도록 락 시간을 길게 유지
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
                // 인트로(섹션0)에서 다음 섹션으로 넘어가는 첫 스크롤부터 인트로는 사라져야 함(FOOD 동일)
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
                    introStepRef.current = 0;
                    setIntroStep(0);
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
                        // FOOD와 동일하게: 인트로 애니메이션이 충분히 재생되도록 락 시간을 길게 유지
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
                // 인트로(섹션0)에서 다음 섹션으로 넘어가는 첫 스크롤부터 인트로는 사라져야 함(FOOD 동일)
                if (activeIdx === 0) setIsIntroLeaving(true);
                lock(prefersReducedMotion ? 0 : 720);
                scrollToIndex(activeIdx + 1);
                return;
            }
            if (deltaY < 0 && activeIdx > 0) {
                preventDefault();
                // 마지막 섹션(스와이퍼+푸터) 내부에서 위로 스크롤 중이면 섹션 이동보다 내부 스크롤이 우선
                const lastIdx = sections.length - 1;
                const lastTop = sections[lastIdx]?.offsetTop ?? 0;
                // 단, 상단 근처(임계값)에서는 "섹션 역행 스냅"이 먼저 먹어야 한다.
                if (activeIdx === lastIdx && root.scrollTop > lastTop + LAST_SECTION_EXIT_THRESHOLD) return;
                if (activeIdx === lastIdx && root.scrollTop <= lastTop + LAST_SECTION_EXIT_THRESHOLD) restoreSnap();
                // 섹션0(인트로)로 "복귀"하는 역행에서는, 순행 때 했던 이탈 액션을 반대로 되감아야 한다.
                if (activeIdx - 1 === 0) {
                    setIsIntroLeaving(false);
                    introStepRef.current = 0;
                    setIntroStep(0);
                }
                lock(prefersReducedMotion ? 0 : 720);
                scrollToIndex(activeIdx - 1);
            }
        };

        // 휠 입력 누적(휠/트랙패드 분리 대응)
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

            // 중요: 락(스냅 진행) 중의 관성 입력도 네이티브 스크롤로 새지 않게 먼저 막는다.
            if (e.cancelable) e.preventDefault();

            // FOOD와 동일: 스냅/락 중에는 휠 누적 자체를 진행하지 않음(방향 흔들림/연속 트리거 방지)
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

            // 프로필별 임계값을 넘겼을 때만 "의도"로 처리
            if (wheelEventCount < profile.minEvents) return;
            if (Math.abs(wheelAccum) < profile.intentThreshold) return;

            const intentDelta = wheelAccum;
            wheelAccum = 0;
            wheelEventCount = 0;
            wheelLastSign = 0;
            // 임계값을 넘은 "의도"만 방향으로 인정(FOOD 동일)
            window.dispatchEvent(
                new CustomEvent('bakery:scrollDirection', {detail: {isScrollingUp: sign < 0}})
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

            // NOTE(iOS): Swiper 영역이라도 "세로 제스처"는 스냅/스크롤로 처리해야 함.
            // 가로 제스처(dx > dy)일 때만 스킵한다.
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
                // 스와이퍼 제스처로 판정되면 페이지 스냅 로직은 끝까지 관여하지 않음
                touchConsumed = true;
                return;
            }
            if (dx > dy) return;

            // 역행/순행 방향을 전달
            const delta = touchStartY - currentY; // +면 아래로(순행), -면 위로(역행)
            if (Math.abs(delta) > 8) {
                window.dispatchEvent(
                    new CustomEvent('bakery:scrollDirection', {detail: {isScrollingUp: delta < 0}})
                );
            }

            // 마지막 섹션(스와이퍼+푸터)은 "중첩 스크롤 컨테이너"에서만 내부 스크롤을 처리한다.
            const lastIdx = sections.length - 1;
            const lastTop = sections[lastIdx]?.offsetTop ?? 0;
            const isInLastSection = root.scrollTop >= lastTop - 2;
            if (isInLastSection) {
                const inner = lastSectionScrollRef.current;
                const target = e.target as HTMLElement | null;
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
            // 스와이프를 시작한 섹션 기준(네이티브 스크롤로 인덱스가 튀는 것 방지)
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
                if (!(delta < 0 && isInnerAtTop)) return;
            }

            // 임계값을 넘었을 때만 처리 - CIBI와 동일
            if (Math.abs(delta) < TOUCH_THRESHOLD) return;

            // 락 중에는 처리하지 않음
            if (isSnappingRef.current) return;

            handleIntent(delta, () => {
                // touchend는 preventDefault 영향이 적어서, move에서 주로 막음. (여기서는 로직 통일용)
            });
        };

        // scroll 기반 백업(모바일 대응)
        let lastScrollTop = root.scrollTop;
        let rafId: number | null = null;
        // iOS에서 가끔 "딱 10~12px 정도" 덜 가고 스냅 사이에 걸리는 케이스가 있어,
        // 스크롤이 멈춘 뒤에만(연타 중엔 아님) 가장 가까운 섹션으로 부드럽게 정렬한다.
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
                if (dist <= 2) return; // 2px 이내면 그대로(자연스러움 유지)

                const now = typeof performance !== 'undefined' ? performance.now() : Date.now();
                if (lastAutoAlignTop === top && now - lastAutoAlignAt < 600) return;
                lastAutoAlignTop = top;
                lastAutoAlignAt = now;

                // 부드러운 정렬(뚝 점프 없음)
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
                // 클릭/포커스 등으로 인한 미세 스크롤 흔들림은 의도로 처리하지 않음
                if (now < suppressScrollIntentUntil) return;
                scheduleAutoAlign();

                // 너무 미세한 흔들림은 무시
                // 안드로이드에서 첫 번째 섹션에서는 더 큰 delta 필요 (인트로 애니메이션 보호)
                const activeIdx = getActiveIndex();
                const minDelta = (isAndroid && activeIdx === 0) ? 8 : 2;
                if (Math.abs(delta) < minDelta) return;

                // 락/스냅 중에는 방향 이벤트/의도 처리를 발동시키지 않음(FOOD 동일)
                if (isSnappingRef.current) return;

                window.dispatchEvent(
                    new CustomEvent('bakery:scrollDirection', {detail: {isScrollingUp: delta < 0}})
                );
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
    }, [prefersReducedMotion, resetNonce]);

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
    }, [resetNonce]);

    // Bakery 페이지에서만: step 진행이 시작되면 메인헤더 숨김 (CIBI 패턴 동일)
    useEffect(() => {
        const root = scrollContainerRef.current;
        let rafId: number | null = null;

        const sync = () => {
            const atTop = !root || root.scrollTop <= 2;
            const isHeaderVisible = activeSection === 0 && introStep === 0 && atTop;
            const hide = !isHeaderVisible;
            window.dispatchEvent(new CustomEvent('bakery:mainHeader', {detail: {hide}}));
        };

        const onScroll = () => {
            if (!root) return;
            if (rafId !== null) return;
            rafId = window.requestAnimationFrame(() => {
                rafId = null;
                sync();
            });
        };

        // 초기/상태 변경 즉시 동기화
        sync();
        // TOP 버튼의 smooth scroll처럼 "scrollTop 변화"만으로 상태가 바뀌는 케이스도 반영
        root?.addEventListener('scroll', onScroll, {passive: true});

        return () => {
            if (rafId !== null) window.cancelAnimationFrame(rafId);
            root?.removeEventListener('scroll', onScroll);
        };
    }, [activeSection, introStep, resetNonce]);

    // 페이지 이탈 시에는 헤더 상태를 기본값으로 복구
    useEffect(() => {
        // 초기값 리셋
        window.dispatchEvent(new CustomEvent('bakery:scrollDirection', {detail: {isScrollingUp: false}}));
        return () => {
            window.dispatchEvent(new CustomEvent('bakery:scrollDirection', {detail: {isScrollingUp: false}}));
            window.dispatchEvent(new CustomEvent('bakery:mainHeader', {detail: {hide: false}}));
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

            // TOP 버튼으로 "프로그램 스크롤"이 발생할 때,
            // scroll 백업 로직(handleIntentFromScroll)이 이를 사용자 의도로 오인해서 중간에 스냅/락을 걸면
            // PC에서 "한 섹션만 올라가고 멈춤" 문제가 발생할 수 있음.
            // → 리셋 직후 잠깐 스냅 로직을 강제 락해서 최상단(0)까지 방해 없이 도달하게 한다.
            isSnappingRef.current = true;
            if (unlockTimerRef.current) window.clearTimeout(unlockTimerRef.current);
            const RESET_LOCK_MS = prefersReducedMotion ? 0 : 900;
            unlockTimerRef.current = window.setTimeout(() => {
                isSnappingRef.current = false;
                unlockTimerRef.current = null;
            }, RESET_LOCK_MS);

            // 헤더 상태도 초기값으로 정리
            window.dispatchEvent(new CustomEvent('bakery:mainHeader', {detail: {hide: false}}));
            window.dispatchEvent(new CustomEvent('bakery:scrollDirection', {detail: {isScrollingUp: false}}));

            // 내부 스크롤 컨테이너를 최상단으로
            const root = scrollContainerRef.current;
            if (root) {
                // TOP 버튼은 "한 섹션씩"이 아니라 무조건 최상단(0)으로 가야 함.
                // PC에서 scroll-snap/scroll-behavior(smooth) 조합이 중간 스냅 포인트에 걸리며
                // 단계적으로 멈추는 케이스가 있어, 리셋 순간에만 스냅/스무스를 잠깐 끄고 강제 점프 후 즉시 복구한다.
                const prevSnap = root.style.scrollSnapType;
                const prevBehavior = root.style.scrollBehavior;
                root.style.scrollSnapType = 'none';
                root.style.scrollBehavior = 'auto';
                root.scrollTo({top: 0, behavior: 'auto'});
                window.requestAnimationFrame(() => {
                    root.style.scrollSnapType = prevSnap;
                    root.style.scrollBehavior = prevBehavior;
                });
            } else {
                window.scrollTo({top: 0, behavior});
            }
        };
        window.addEventListener('bakery:reset', handler as EventListener);
        return () => window.removeEventListener('bakery:reset', handler as EventListener);
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
                    <div className="absolute scale-[1.5] size-full overflow-hidden">
                        <img src="/img/brand/bakery_home_back.svg" alt="" className="object-cover w-full h-full"/>
                    </div>
                    {/* FOOD 인트로와 동일한 구조/스피드: 타이틀 리프트 + 문구 absolute 등장 */}
                    <motion.div
                        // 요청: PC와 동일한 동작을 모든 해상도에서 유지
                        initial={{opacity: 1, y: 0}}
                        // (1) 문구 등장 타이밍에 맞춰 BAKERY도 같이 천천히 위로 이동
                        // (2) 섹션0에서 다음 스크롤이 시작되면(섹션 이탈) 인트로는 즉시 사라짐
                        animate={(() => {
                            // 문구(2줄) 실제 높이만큼만 리프트(모바일에서 과도 상승 방지)
                            const liftY = introLiftY;
                            const leaveY = -380;
                            const baseY = 0;
                            // 요청: "2번만" 올라가게(=2구간) 키프레임을 3개로 제한
                            // - 1차 상승: 1줄 문장 애니메이션 종료 시점
                            // - 2차 상승: 2줄 문장 애니메이션 종료 시점
                            const liftKeyframes = [baseY, baseY + Math.round(liftY * 0.5), baseY + liftY];
                            if (isIntroLeaving || activeSection !== 0) return {opacity: 0, y: leaveY};
                            if (introStep === 1) return {opacity: 1, y: liftKeyframes};
                            return {opacity: 1, y: 0};
                        })()}
                        transition={{
                            duration: prefersReducedMotion
                                ? 0
                                : isIntroLeaving || activeSection !== 0
                                    ? 0.35
                                    : introStep === 0
                                        ? 0.55
                                        : 2.0,
                            // 문장(0.35/1.35s 딜레이 + 1s duration) 종료 시점(=2.35s)에 맞춰 타이틀도 같이 리프트
                            delay: prefersReducedMotion ? 0 : (introStep === 1 ? 0.35 : 0),
                            // 2줄 문구 타이밍에 맞춰 1차(1.0s) / 2차(2.0s)로 리프트 진행
                            times: introStep === 1 ? [0, 0.5, 1] : undefined,
                            ease: [0.22, 1, 0.36, 1],
                        }}
                        className='flex absolute inset-0 flex-col justify-center items-center font-extrabold text-cream'
                        style={{pointerEvents: isIntroLeaving || activeSection !== 0 ? 'none' : 'auto'}}
                    >
                        {/* 문장들이 opacity 0이어도 레이아웃 공간을 차지해서 BAKERY가 위로 떠 보이는 문제 방지 */}
                        <div className="flex relative flex-col items-center w-full">
                            <h1 className='text-[72px] lg:text-[220px] gt-ultra leading-[0.95]'>BAKERY</h1>

                            {/* 아래 문장들은 absolute로 띄워서 BAKERY 중앙정렬에 영향 없게 처리 */}
                            <div
                                ref={introCopyRef}
                                className="flex absolute top-full left-1/2 flex-col items-center mt-3 w-full -translate-x-1/2 lg:mt-8"
                            >
                                <motion.p
                                    initial={{y: 200, opacity: 0}}
                                    animate={introStep === 1 ? {y: 0, opacity: 1} : {y: 200, opacity: 0}}
                                    transition={{
                                        duration: prefersReducedMotion ? 0 : 0.9,
                                        // 순행(노출)만 딜레이, 역행(숨김)에는 딜레이 없이 바로 시작
                                        delay: prefersReducedMotion ? 0 : (introStep === 1 ? 0.35 : 0),
                                        ease: [0.22, 1, 0.36, 1],
                                    }}
                                    className='text-[22px] lg:text-[64px] mb-3 text-center'
                                >
                                    다양한 맛과 경험을 선사하는
                                </motion.p>
                                <motion.p
                                    initial={{y: 200, opacity: 0}}
                                    animate={introStep === 1 ? {y: 0, opacity: 1} : {y: 200, opacity: 0}}
                                    transition={{
                                        duration: prefersReducedMotion ? 0 : 0.9,
                                        delay: prefersReducedMotion ? 0 : (introStep === 1 ? 1.35 : 0),
                                        ease: [0.22, 1, 0.36, 1],
                                    }}
                                    className='text-[22px] lg:text-[64px] text-center'
                                >
                                    No.1 베이커리 브랜드
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
                <BakerySplitSnapSections
                    key={resetNonce}
                    ref={splitSectionsRef}
                    prefersReducedMotion={Boolean(prefersReducedMotion)}
                    setSectionElAt={(i, el) => {
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
                        <div className="flex relative flex-col justify-center items-center pb-0">
                            <div className="w-full pt-[60px] lg:pt-[100px]">
                                <h1 className=' text-[22px] leading-[130%] lg:text-[63px] lg:leading-[1.3] tracking-[-3%] text-center mb-6 text-[#4E0C0D] font-extrabold'>
                                    삼립의 다양한 베이커리,<br/>
                                    지금 바로 만나보세요
                                </h1>
                                <div className='flex gap-6 justify-center items-center pb-12'>
                                    {/* 커스텀 네이게이션 버튼 */}
                                    <button
                                        ref={swiperPrevRef}
                                        data-snap-intent="ignore"
                                        className='size-9 lg:size-[60px] rounded-full p-2 lg:p-5 transition-all bg-[#500C08] flex items-center justify-center hover:bg-[#6B1414] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed'
                                        aria-label="이전 슬라이드"
                                    >
                                        <Icon name="arrowTop" className="size-full *:fill-white -rotate-90"/>
                                    </button>
                                    <button
                                        ref={swiperNextRef}
                                        data-snap-intent="ignore"
                                        className='size-9 lg:size-[60px] rounded-full p-2 lg:p-5  transition-all bg-[#500C08] flex items-center justify-center hover:bg-[#6B1414] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed'
                                        aria-label="다음 슬라이드"
                                    >
                                        <Icon name="arrowTop" className="size-full *:fill-white rotate-90"/>
                                    </button>
                                </div>
                            </div>
                            <div className='w-full pb-[60px] lg:pb-[200px]'>
                                <Swiper
                                    modules={[Navigation, Autoplay]}
                                    navigation={{
                                        prevEl: swiperPrevRef.current,
                                        nextEl: swiperNextRef.current,
                                    }}
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
                                    autoplay={{
                                        delay: 2000,
                                        disableOnInteraction: false,
                                    }}
                                    className='brand-swiper'
                                >
                                    {bakerySwiperSections.map((section) => (
                                        <SwiperSlide key={section.id}>
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
                            {/* Footer는 같은 섹션(내부 스크롤) 안에서 도달 */}
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

export default BakeryIndex;
