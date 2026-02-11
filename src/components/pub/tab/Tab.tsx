import React, {useState, useRef, useEffect} from 'react';
import {motion, AnimatePresence} from 'framer-motion';
import {useSearchParams, useRouter} from 'next/navigation';
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
    const searchParams = useSearchParams();

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const subTabRef = useRef<HTMLDivElement>(null);

    const [subHeaderHeight, setSubHeaderHeight] = useState(0);
    const [isSubHeaderSticky, setIsSubHeaderSticky] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [mainHeaderHeight, setMainHeaderHeight] = useState(0);
    const [isMainHeaderVisible, setIsMainHeaderVisible] = useState(false);

    /** 문자열 → TabItem 정규화 */
    const normalizedItems: TabItem[] = items.map((item) =>
        typeof item === 'string' ? {label: item} : item
    );

    /** activeIndex 계산 */
    const getActiveIndexFromQuery = (): number => {
        if (disableQuerySync) return externalActiveIndex ?? 0;

        const tabValue = searchParams?.get(queryParamKey);
        if (!tabValue) return externalActiveIndex ?? 0;

        if (useIndexAsValue) {
            const index = parseInt(tabValue, 10);
            return isNaN(index) ? 0 : Math.min(index, normalizedItems.length - 1);
        }

        const index = normalizedItems.findIndex((item) => item.label === tabValue);
        return index >= 0 ? index : 0;
    };

    const activeIndex = getActiveIndexFromQuery();
    const activeItem = normalizedItems[activeIndex];

    /** 탭 클릭 */
    const handleTabClick = (index: number, item: TabItem) => {
        if (!disableQuerySync) {
            const params = new URLSearchParams();

            if (useIndexAsValue) {
                params.set(queryParamKey, index.toString());
            } else {
                params.set(queryParamKey, item.label);
            }

            clearParamsOnChange.forEach((key) => params.delete(key));

            router.replace(`?${params.toString()}`, {scroll: false});
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
            ? 90
            : isMobile && isMainHeaderVisible
                ? mainHeaderHeight
                : 0;

    const stickyTop =
        typeof stickyTopOverride === 'number'
            ? stickyTopOverride
            : computedStickyTop;

    return (
        <motion.div
            ref={subTabRef}
            data-subtab
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
            <div className="hidden lg:flex justify-center w-full h-[70px] gap-9">
                {normalizedItems.map((item, index) => {
                    const isActive = index === activeIndex || item.isActive;
                    return (
                        <button
                            key={index}
                            onClick={() => handleTabClick(index, item)}
                            className={`
                                px-[34px] py-5 rounded-full text-[16px]
                                ${isActive
                                ? 'bg-cream text-[#500C08] font-extrabold'
                                : 'text-cream opacity-60'}
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
            <div ref={dropdownRef} className="lg:hidden w-full">
                <button
                    onClick={() => setIsDropdownOpen((v) => !v)}
                    className="w-full h-[44px] flex justify-center items-center gap-2 text-white"
                >
                    {activeItem?.label}
                    <Icon
                        name="arrowDown"
                        size={20}
                        className={`transition-transform ${
                            isDropdownOpen ? 'rotate-180' : ''
                        }`}
                    />
                </button>

                <AnimatePresence>
                    {isDropdownOpen && (
                        <motion.div
                            initial={{maxHeight: 0, opacity: 0}}
                            animate={{maxHeight: 800, opacity: 1}}
                            exit={{maxHeight: 0, opacity: 0}}
                            className="overflow-hidden bg-[#740000]"
                        >
                            {normalizedItems.map((item, index) => {
                                if (index === activeIndex) return null;
                                return (
                                    <button
                                        key={index}
                                        onClick={() => handleTabClick(index, item)}
                                        className="w-full h-[44px] text-white opacity-60"
                                    >
                                        {item.label}
                                    </button>
                                );
                            })}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
};

export default Tab;
