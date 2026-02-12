import React, {useState, useRef, useEffect} from 'react';
import {motion, AnimatePresence} from 'framer-motion';
import {useRouter} from 'next/router';
import {Icon} from '@/components/pub/icons';
import type {TabItem, TabProps} from './Tab.types';

const Tab: React.FC<TabProps> = ({
    items,
    activeIndex: externalActiveIndex,
    onTabClick,
    className = '',
    headerType = 'default',
    buttonClassName = '',
    activeButtonClassName = '',
    inactiveButtonClassName = '',
    queryParamKey = 'tab',
    useIndexAsValue = true,
    clearParamsOnChange = [],
    disableQuerySync = false,
    stickyTopOverride,
    topTransitionDuration,
}) => {
    const router = useRouter();

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const TabRef = useRef<HTMLDivElement>(null);

    const [subHeaderHeight, setSubHeaderHeight] = useState(0);
    const [isSubHeaderSticky, setIsSubHeaderSticky] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [mainHeaderHeight, setMainHeaderHeight] = useState(0);
    const [isMainHeaderVisible, setIsMainHeaderVisible] = useState(false);

    // useRouter()가 처음에는 query가 빈 객체일 수 있으므로 isReady를 확인하거나 기본값을 처리해야 할 수 있음
    const { query, isReady } = router;

    /** 문자열 → TabItem 정규화 */
    const normalizedItems: TabItem[] = items.map((item) =>
        typeof item === 'string' ? {label: item} : item
    );

    /** activeIndex 계산 */
    const getActiveIndexFromQuery = (): number => {
        if (disableQuerySync) return externalActiveIndex ?? 0;
        if (!isReady) return externalActiveIndex ?? 0;

        const tabValue = query[queryParamKey];
        if (!tabValue) return externalActiveIndex ?? 0;

        const tabValueStr = Array.isArray(tabValue) ? tabValue[0] : tabValue;

        if (useIndexAsValue) {
            const index = parseInt(tabValueStr, 10);
            return isNaN(index) ? 0 : Math.min(index, normalizedItems.length - 1);
        }

        const index = normalizedItems.findIndex((item) => item.label === tabValueStr);
        return index >= 0 ? index : 0;
    };

    const activeIndex = getActiveIndexFromQuery();
    const activeItem = normalizedItems[activeIndex];

    /** 탭 클릭 */
    const handleTabClick = (index: number, item: TabItem) => {
        if (!disableQuerySync) {
            // query가 null인 경우를 대비해 빈 객체 기본값 설정
            const nextQuery = { ...(query || {}) };

            if (useIndexAsValue) {
                nextQuery[queryParamKey] = index.toString();
            } else {
                nextQuery[queryParamKey] = item.label;
            }

            clearParamsOnChange.forEach((key) => delete nextQuery[key]);

            router.replace({
                pathname: router.pathname,
                query: nextQuery,
            }, undefined, { scroll: false });
        }

        onTabClick?.(index, item);
        setIsDropdownOpen(false);
    };

    /** 드롭다운 외부 클릭 */
    useEffect(() => {
        if (!isDropdownOpen) return;

        const handleClickOutside = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isDropdownOpen]);

    /** 헤더 / 모바일 상태 감지 */
    useEffect(() => {
        const update = () => {
            if (typeof window === 'undefined') return;

            setIsMobile(window.innerWidth < 1024);

            const subHeader = document.querySelector('header.bg-samlipRed') as HTMLElement;
            if (subHeader) {
                setSubHeaderHeight(subHeader.offsetHeight);
                setIsSubHeaderSticky(subHeader.classList.contains('sticky'));
            }

            const mainHeader = document.querySelector('header:not(.bg-samlipRed)') as HTMLElement;
            if (mainHeader) {
                setMainHeaderHeight(mainHeader.offsetHeight);
                const rect = mainHeader.getBoundingClientRect();
                setIsMainHeaderVisible(rect.top >= 0 && rect.height > 0);
            }
        };

        update();
        window.addEventListener('scroll', update, {passive: true});
        window.addEventListener('resize', update);

        return () => {
            window.removeEventListener('scroll', update);
            window.removeEventListener('resize', update);
        };
    }, []);

    const computedStickyTop =
        !isMobile && isSubHeaderSticky
            ? 60
            : isMobile && isMainHeaderVisible
                ? mainHeaderHeight
                : 0;

    const stickyTop =
        typeof stickyTopOverride === 'number'
            ? stickyTopOverride
            : computedStickyTop;

    return (
        <motion.div
            ref={TabRef}
            data-Tab
            className={`flex sticky w-full bg-grilledMeats z-[999] ${className}`}
            style={{
                top: stickyTop,
                boxShadow:
                    headerType === 'brand'
                        ? 'none'
                        : '0 -2px 0 0 rgba(80,12,8,1)',
            }}
            animate={{top: stickyTop}}
            transition={{
                top: {
                    duration: topTransitionDuration ?? 0.3,
                    ease: [0.4, 0, 0.2, 1],
                },
            }}
        >
            {/* 데스크톱 */}
            <div
                className={`hidden lg:flex ${
                    headerType === 'brand' ? 'gap-0 h-[60px]' : 'gap-0 h-[60px]'
                } justify-center items-center  w-full`}
            >
                {normalizedItems.map((item, index) => {
                    const isActive = activeIndex === index || item.isActive;
                    return (
                        <button
                            key={index}
                            onClick={() => handleTabClick(index, item)}
                            className={`
                                flex items-center justify-center gap-2.5
                                px-[24px] py-5 rounded-full
                                text-[15px] leading-[0.67em] text-center
                                transition-all duration-200
                                h-[41px]
                                ${
                                isActive
                                    ? 'bg-cream text-[#500C08] !font-extrabold'
                                    : 'bg-transparent text-cream opacity-60 hover:opacity-80'
                            }
                                ${buttonClassName}
                                ${isActive ? activeButtonClassName : inactiveButtonClassName}
                            `}
                        >
                            {item.label}
                        </button>
                    );
                })}
            </div>

            {/* 모바일 */}
            <div className="flex flex-col relative justify-center items-center lg:hidden *:text-[#ffffff] w-full" ref={dropdownRef}>
                <button
                    onClick={() => setIsDropdownOpen((v) => !v)}
                    className="w-full h-[44px] flex items-center justify-center px-4 text-[14px] font-bold bg-grilledMeats"
                >
                    <span className="text-[14px]  leading-[0.67em]">{activeItem?.label || '선택하세요'}</span>
                    <Icon
                        name="arrowDown"
                        size={20}
                        className={`transition-transform duration-200 *:fill-[#ffffff] ${isDropdownOpen ? 'rotate-180' : ''}`}
                    />
                </button>

                {/* 드롭다운 메뉴 */}
                <AnimatePresence>
                    {isDropdownOpen && (
                        <motion.div
                            // 모바일 드롭다운은 "밀어내기(레이아웃 높이 차지)"를 유지해야 함
                            // - absolute로 띄우지 않고, 레이아웃 흐름 안에서 아래 컨텐츠를 밀어내도록 처리
                            // - overflow-hidden + maxHeight 애니메이션으로 위에서 아래로 펼쳐지는 느낌 구현
                            className="overflow-hidden w-full z-50 shadow-lg bg-[#740000] gap-0.5"
                            // 닫히는 애니메이션 중에도 DOM에 잠깐 남아있어서 "보이지 않는 레이어"가 클릭을 먹는 이슈 방지
                            initial={{ maxHeight: 0, opacity: 0, pointerEvents: 'none' }}
                            animate={{ maxHeight: 800, opacity: 1, pointerEvents: 'auto' }}
                            exit={{ maxHeight: 0, opacity: 0, pointerEvents: 'none' }}
                            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                        >
                            {/* 나머지 탭들 (현재 활성화된 탭 제외) */}
                            {normalizedItems
                                .map((item, index) => ({ item, index }))
                                .filter(({ index }) => activeIndex !== index && !normalizedItems[index].isActive)
                                .map(({ item, index }, filteredIndex) => (
                                    <motion.button
                                        key={index}
                                        onClick={() => handleTabClick(index, item)}

                                        transition={{
                                            duration: 0.2,
                                            delay: filteredIndex * 0.05,
                                            ease: 'easeOut'
                                        }}
                                        className={`
                                            w-full px-4 h-[44px] text-left
                                            text-[14px] leading-[0.67em]
                                            transition-all duration-200
                                            flex items-center justify-center
                                            border-b border-white/30 last:border-b-0 gap-0.5
                                        `}
                                    >
                                        <span className="opacity-60 text-cream">
                                            {item.label}
                                        </span>
                                    </motion.button>
                                ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
};

export default Tab;
