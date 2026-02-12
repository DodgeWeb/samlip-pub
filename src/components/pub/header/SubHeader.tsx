import React, {useState, useEffect} from 'react';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {motion, AnimatePresence} from 'framer-motion';
import clsx from 'clsx';
import {MenuItem} from './types';

// 서브 카테고리 래퍼 컴포넌트 (감싸는 용도, sticky용)
interface SubCategoryWrapperProps {
    activeMenu: number | null;
    menuItems: MenuItem[];
    isRecruitPage: boolean;
    isHeaderVisible: boolean;
    isScrollingUp: boolean;
    headerHeight: number;
    isSpecialHeaderPage?: boolean;
    hasTab?: boolean;
    forceShowOnMobile?: boolean;
}

const SubCategoryWrapper: React.FC<SubCategoryWrapperProps> = ({
    activeMenu,
    menuItems,
    isRecruitPage,
    isHeaderVisible,
    isScrollingUp,
    headerHeight,
    isSpecialHeaderPage = false,
    hasTab = false,
    forceShowOnMobile = false,
}) => {
    const router = useRouter();

    // Pages Router: asPath에서 pathname처럼 쓰기 (쿼리/해시 제거)
    const pathname = (router.asPath ?? '').split('?')[0].split('#')[0];

    // activeMenu가 없으면 현재 경로에 맞는 메뉴 찾기
    const findMenuIndexByPath = (): number | null => {
        if (activeMenu !== null) return activeMenu;

        for (let i = 0; i < menuItems.length; i++) {
            const menu = menuItems[i];

            if (menu.subItems) {
                const hasMatchingSubItem = menu.subItems.some((subItem) => {
                    const subPath = subItem.path ?? '';
                    if (!subPath) return false;

                    return (
                        pathname === subPath ||
                        (subPath !== '/' && pathname.startsWith(subPath + '/'))
                    );
                });
                if (hasMatchingSubItem) return i;

                const hasParentPathMatch = menu.subItems.some((subItem) => {
                    const subPath = subItem.path ?? '';
                    if (!subPath || subPath === '/') return false;

                    return pathname.startsWith(subPath) && pathname !== subPath;
                });
                if (hasParentPathMatch) return i;
            }

            if (menu.path) {
                const menuPath = menu.path ?? '';
                if (menuPath && (pathname === menuPath || pathname.startsWith(menuPath))) {
                    return i;
                }
            }
        }

        return null;
    };

    const menuIndex = findMenuIndexByPath();

    // Tab의 sticky 상태 감지
    const [isTabSticky, setIsTabSticky] = useState(false);

    useEffect(() => {
        if (!hasTab) return;

        const checkTabSticky = () => {
            const Tabs = document.querySelectorAll('[class*="bg-grilledMeats"]');
            let foundSticky = false;

            for (const Tab of Tabs) {
                if (Tab.classList.contains('sticky')) {
                    foundSticky = true;
                    break;
                }
            }

            setIsTabSticky(foundSticky);
        };

        const timeoutId = setTimeout(checkTabSticky, 100);

        let ticking = false;
        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    checkTabSticky();
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', handleScroll, {passive: true});

        return () => {
            clearTimeout(timeoutId);
            window.removeEventListener('scroll', handleScroll);
        };
    }, [hasTab]);

    if (menuIndex === null) return null;

    const currentMenu = menuItems[menuIndex];
    if (isRecruitPage || !currentMenu?.subItems) return null;

    const shouldShow = hasTab
        ? !isHeaderVisible
        : isSpecialHeaderPage
            ? (!isHeaderVisible && isScrollingUp)
            : !isHeaderVisible;

    const shouldBeSticky = hasTab && isScrollingUp && isTabSticky;

    const isDefaultPage = !hasTab && !isSpecialHeaderPage;
    const shouldTranslateYZero =
        shouldBeSticky ||
        (isDefaultPage && isScrollingUp) ||
        (isSpecialHeaderPage && isScrollingUp);

    return (
        <AnimatePresence>
            {shouldShow && (
                <motion.header
                    key={`wrapper-${menuIndex}`}
                    className={clsx(
                        forceShowOnMobile
                            ? 'right-0 left-0 top-full w-full border-0 outline-none bg-samlipRed'
                            : 'hidden right-0 left-0 top-full w-full border-0 outline-none bg-samlipRed lg:block',
                        shouldBeSticky ? 'sticky top-0' : 'absolute'
                    )}
                    style={{
                        backgroundColor: '#F40202',
                        opacity: 1,
                        willChange: 'transform, opacity',
                        backfaceVisibility: 'hidden',
                        WebkitBackfaceVisibility: 'hidden',
                        transform: 'translateZ(0)',
                        WebkitFontSmoothing: 'antialiased',
                        MozOsxFontSmoothing: 'grayscale',
                        isolation: 'isolate',
                    }}
                    initial={{opacity: 0, y: -100}}
                    animate={{opacity: 1, y: shouldTranslateYZero ? 0 : -60}}
                    exit={{opacity: 0, y: -100}}
                    transition={{duration: 0.4, ease: [0.4, 0, 0.2, 1]}}
                >
                    <div className="container mx-auto">
                        <nav className="flex justify-center items-center py-[18px]">
                            <div className="flex gap-[48px] z-50">
                                {currentMenu.subItems.map((subItem, subIndex) => {
                                    const subPath = subItem.path ?? '';

                                    const exactMatch = pathname === subPath;

                                    const hasLongerMatch =
                                        currentMenu.subItems?.some((item) => {
                                            const itemPath = item.path ?? '';
                                            if (!itemPath || itemPath === subPath) return false;

                                            return (
                                                itemPath.startsWith(subPath) &&
                                                (pathname === itemPath || pathname.startsWith(itemPath + '/'))
                                            );
                                        }) ?? false;

                                    const isActive =
                                        exactMatch ||
                                        (!hasLongerMatch &&
                                            subPath !== '/' &&
                                            pathname.startsWith(subPath + '/'));

                                    return (
                                        <div key={subIndex}>
                                            <Link
                                                href={subPath || '#'}
                                                className={clsx(
                                                    'text-white transition-all duration-200 text-[15px] transform-gpu',
                                                    isActive
                                                        ? 'font-bold opacity-100'
                                                        : 'font-normal opacity-60 hover:opacity-100 hover:font-bold'
                                                )}
                                            >
                                                {subItem.name}
                                            </Link>
                                        </div>
                                    );
                                })}
                            </div>
                        </nav>
                    </div>
                </motion.header>
            )}
        </AnimatePresence>
    );
};

// 서브 헤더 컴포넌트 (최종 조합)
interface SubHeaderProps {
    activeMenu: number | null;
    menuItems: MenuItem[];
    isRecruitPage: boolean;
    isHeaderVisible: boolean;
    isScrollingUp: boolean;
    headerHeight: number;
    isSpecialHeaderPage?: boolean;
    hasTab?: boolean;
    forceShowOnMobile?: boolean;
}

export const SubHeader: React.FC<SubHeaderProps> = ({
    activeMenu,
    menuItems,
    isRecruitPage,
    isHeaderVisible,
    isScrollingUp,
    headerHeight,
    isSpecialHeaderPage = false,
    hasTab = false,
    forceShowOnMobile = false,
}) => {
    return (
        <SubCategoryWrapper
            activeMenu={activeMenu}
            menuItems={menuItems}
            isRecruitPage={isRecruitPage}
            isHeaderVisible={isHeaderVisible}
            isScrollingUp={isScrollingUp}
            headerHeight={headerHeight}
            isSpecialHeaderPage={isSpecialHeaderPage}
            hasTab={hasTab}
            forceShowOnMobile={forceShowOnMobile}
        />
    );
};