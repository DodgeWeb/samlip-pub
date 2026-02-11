import React, {useEffect, useRef, useState} from 'react';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {motion, AnimatePresence} from 'framer-motion';
import {createPortal} from 'react-dom';
import Button from '@/components/pub/atoms/Button/Button';
import {Icon} from '@/components/pub/icons';
import clsx from 'clsx';
import {MenuItem} from './types';
import {SearchInput} from '@/components/pub/SearchInput';

/** 경로 일치: 같거나, itemPath가 접두사이고 그 다음이 끝 또는 '/'일 때만 true (예: /now/pr가 /now/promise와 겹치지 않도록) */
function isSubPathActive(currentPath: string, itemPath: string): boolean {
    if (currentPath === itemPath) return true;
    if (itemPath === '/' || !currentPath.startsWith(itemPath)) return false;
    const next = currentPath[itemPath.length];
    return next === undefined || next === '/';
}

function safeStartsWith(pathname?: string, target?: string) {
    if (!pathname || !target) return false;
    if (pathname === target) return true;
    if (target === '/') return false;
    if (!pathname.startsWith(target)) return false;
    const next = pathname[target.length];
    return next === undefined || next === '/';
}

// 서브 카테고리 컴포넌트 (호버용)
interface SubCategoryProps {
    activeMenu: number | null;
    menuItems: MenuItem[];
    isRecruitPage: boolean;
    isHomePage?: boolean;
    menuTimeoutRef: React.MutableRefObject<NodeJS.Timeout | null>;
    setActiveMenu: (menu: number | null) => void;
    closeSideMenu: () => void;
    pathname?: string;
}

const SubCategory: React.FC<SubCategoryProps> = ({
    activeMenu,
    menuItems,
    isRecruitPage,
    isHomePage = false,
    menuTimeoutRef,
    setActiveMenu,
    closeSideMenu,
    pathname,
}) => {
    const shouldShow =
        !isRecruitPage &&
        activeMenu !== null &&
        menuItems[activeMenu]?.subItems;

    if (!shouldShow) return null;

    return (
        <AnimatePresence mode="wait">
            <motion.header
                key={activeMenu}
                className="absolute right-0 left-0 top-full z-[1000] bg-samlipRed hidden lg:block"
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                exit={{opacity: 0}}
                transition={{duration: 0.15, ease: 'easeOut'}}
                onMouseEnter={() => {
                    if (menuTimeoutRef.current) {
                        clearTimeout(menuTimeoutRef.current);
                        menuTimeoutRef.current = null;
                    }
                    setActiveMenu(activeMenu);
                }}
                onMouseLeave={() => {
                    if (menuTimeoutRef.current) {
                        clearTimeout(menuTimeoutRef.current);
                    }
                    menuTimeoutRef.current = setTimeout(() => {
                        setActiveMenu(null);
                        menuTimeoutRef.current = null;
                    }, 150);
                }}
            >
                <div className="container mx-auto">
                    <nav className="flex justify-center items-center py-[29.25px]">
                        <div className="flex gap-[90px] z-50">
                            {menuItems[activeMenu].subItems?.map((sub, i) => {
                                const href = typeof sub.path === 'string' ? sub.path : '';
                                const hasHref = href.length > 0;

                                const isActive = hasHref ? safeStartsWith(pathname, href) : false;

                                const itemClassName = clsx(
                                    'text-white text-[21px] transition-all duration-200',
                                    isActive
                                        ? 'font-bold opacity-100'
                                        : 'opacity-60 hover:opacity-100 hover:font-bold'
                                );

                                if (!hasHref) {
                                    return (
                                        <span key={i} className={itemClassName}>
                                            {sub.name}
                                        </span>
                                    );
                                }

                                return (
                                    <Link
                                        key={i}
                                        href={href}
                                        className={itemClassName}
                                        onClick={closeSideMenu}
                                    >
                                        {sub.name}
                                    </Link>
                                );
                            })}
                        </div>
                    </nav>
                </div>
            </motion.header>
        </AnimatePresence>
    );
};

// 메인 헤더 컴포넌트
interface MainHeaderProps {
    headerRef: React.RefObject<HTMLElement>;
    isStaticPosition: boolean;
    isScrollingUp: boolean;
    isHeaderVisible: boolean;
    headerHeight: number;
    isRecruitPage: boolean;
    isHomePage?: boolean;
    recruitMenuItems: Array<{ name: string; path: string; isExternal?: boolean }>;
    menuItems: MenuItem[];
    activeMenu: number | null;
    hoveredRecruitItem: number | null;
    isInvestIndex: boolean;
    isCibiIndex: boolean;
    setActiveMenuHandler: (index: number) => void;
    setActiveMenu: (menu: number | null) => void;
    setHoveredRecruitItem: (index: number | null) => void;
    toggleSideMenu: () => void;
    navigateTo: (path: string) => void;
    menuTimeoutRef: React.MutableRefObject<NodeJS.Timeout | null>;
    closeSideMenu: () => void;
    isMainHeaderTouchingSubTab?: boolean;
    isSideMenuOpen?: boolean;
    pathname?: string;
}

export const MainHeader: React.FC<MainHeaderProps> = ({
    headerRef,
    isStaticPosition,
    isScrollingUp,
    isHeaderVisible,
    headerHeight,
    isRecruitPage,
    isHomePage = false,
    recruitMenuItems,
    menuItems,
    activeMenu,
    hoveredRecruitItem,
    isInvestIndex,
    isCibiIndex,
    setActiveMenuHandler,
    setActiveMenu,
    setHoveredRecruitItem,
    toggleSideMenu,
    navigateTo,
    menuTimeoutRef,
    closeSideMenu,
    isMainHeaderTouchingSubTab = false,
    isSideMenuOpen = false,
    pathname,
}) => {
    const router = useRouter();
    const currentPath = (pathname ?? router.asPath ?? '').split('?')[0].split('#')[0];
    // 모바일 메뉴용 별도 activeMenu 상태
    const [mobileActiveMenu, setMobileActiveMenu] = useState<number | null>(null);
    // 검색 영역 열림 상태
    const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
    // 검색어 상태
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [resultCount] = useState<number>(999);
    // 헤더 실제 위치 (Portal용)
    const [headerTop, setHeaderTop] = useState<number>(0);
    // 스크롤 위치 추적
    const [scrollY, setScrollY] = useState<number>(0);

    // 사이드 메뉴가 닫힐 때 모바일 activeMenu 초기화
    useEffect(() => {
        if (!isSideMenuOpen) {
            setMobileActiveMenu(null);
        }
    }, [isSideMenuOpen]);

    // 스크롤 위치 추적
    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };
        window.addEventListener('scroll', handleScroll, {passive: true});
        handleScroll(); // 초기값 설정
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // 검색 영역이 열렸을 때 body 스크롤 방지
    useEffect(() => {
        if (isSearchOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [isSearchOpen]);

    // 햄버거 색상 매핑
    const brownPrefixes = [
        '/pub/company/history',
        '/pub/company/ci-bi',
        '/pub/brand/home',
        '/pub/brand/bakery/hoppang',
        '/pub/brand/bakery/hotteok',
        '/pub/brand/bakery/creambread',
        '/pub/brand/bakery/nunettine',
        '/pub/brand/bakery/readyb',
        '/pub/brand/bakery/migak',
        '/pub/brand/bakery/projecth',
        '/pub/brand/bakery/yakgwa',
        '/pub/brand/bakery/boreumdal',
        '/pub/brand/bakery/creamBread', // 대비: 대문자 경로
        '/pub/brand/bakery/creamBread/Typography',
        '/pub/brand/food/piginthegarden',
        '/pub/brand/food/hi-m',
        '/pub/brand/food/grillschwein',
        '/pub/brand/food/citydeli',
        '/pub/now/story',
        '/pub/now/promise',
        '/pub/now/press', // 보도자료 등
        '/pub/now/pr',
        '/pub/sustainability/ethics',
        '/pub/notice',
        '/pub/privacy',
        '/pub/company/invest',
    ];

    // 특정 브랜드 상세 라우트에서는 "최상단 잠깐 투명"을 쓰지 않고,
    // 역행 기준 동작 + 흰 배경 + 검정 아이콘으로 고정한다.
    const forceWhiteHeaderPrefixes = [
        '/pub/brand/bakery/hoppang',
        '/pub/brand/bakery/hotteok',
        '/pub/brand/bakery/creambread',
        '/pub/brand/bakery/nunettine',
        '/pub/brand/bakery/readyb',
        '/pub/brand/bakery/migak',
        '/pub/brand/bakery/projecth',
        '/pub/brand/bakery/yakgwa',
        '/pub/brand/bakery/boreumdal',
        '/pub/brand/bakery/cream-bread/typography',
        '/pub/brand/bakery/cream-bread',
        '/pub/brand/bakery/creamBread/Typography',
        '/pub/brand/food/piginthegarden',
        '/pub/brand/food/pig-in-the-garden',
        '/pub/brand/food/hi-m',
        '/pub/brand/food/grillschwein',
        '/pub/brand/food/grill-schwein',
        '/pub/brand/food/citydeli',
    ];
    const pathLowerForHeader = currentPath.toLowerCase();
    const isForceWhiteHeaderRoute = forceWhiteHeaderPrefixes.some((prefix) =>
        pathLowerForHeader.startsWith(prefix.toLowerCase())
    );

    const getIconColor = () => {
        if (shouldShowWhiteBg) return isForceWhiteHeaderRoute ? '#000000' : '#500C08';
        const pathLower = currentPath.toLowerCase();
        const isBrown = brownPrefixes.some(prefix => pathLower.startsWith(prefix.toLowerCase()));
        return isBrown ? '#500C08' : '#FBFAE7';
    };

    // 모바일 여부 확인
    const [isMobile, setIsMobile] = React.useState(false);

    React.useEffect(() => {
        const update = () => setIsMobile(window.innerWidth < 1024);
        update(); // 마운트 직후 1회
        window.addEventListener('resize', update);
        return () => window.removeEventListener('resize', update);
    }, []);

    // 모바일에서 SubTab에 닿거나 역행 스크롤 시 흰 배경, 검색 영역이 열렸을 때도 흰 배경, 검색 페이지일 때도 흰 배경
    // 홈 페이지일 때만 스크롤 최상단이 아니면 흰 배경
    const shouldShowWhiteBg =
        isSearchOpen ||
        currentPath === '/search' ||
        isMainHeaderTouchingSubTab ||
        // 요청 라우트: 최상단에서도 투명 금지 + 역행(위로 스크롤) 시 흰 배경 유지
        (isMobile && isForceWhiteHeaderRoute && (scrollY === 0 || isScrollingUp)) ||
        // 기존: 모바일에서 헤더가 숨겨진 상태에서 역행 시 흰 배경
        (isMobile && isScrollingUp && !isHeaderVisible) ||
        // 홈 페이지: 최상단이 아니면 흰 배경
        (isMobile && isHomePage && scrollY > 0);

    return (
        <motion.header
            ref={headerRef}
            className="flex flex-col w-full"
        >
            {/* 하단 메인 헤더 */}
            <motion.section
                className={clsx(
                    "z-10 pb-0 w-full lg:pb-0",
                    "lg:!bg-surface-0"
                )}
                animate={{
                    backgroundColor: isMobile && shouldShowWhiteBg
                        ? "rgba(255, 255, 255, 1)"
                        : isMobile
                            ? "rgba(255, 255, 255, 0)"
                            : undefined
                }}
                transition={{
                    duration: 0.3,
                    ease: [0.4, 0, 0.2, 1]
                }}
            >
                <div
                    className="flex md:justify-between   items-center pl-5 mx-auto w-full lg:pb-3 lg:px-10 pr-[7px] pb-1">
                    {/* 로고 */}
                    <div className="w-full cursor-pointer lg:w-auto"
                         onClick={() => navigateTo(isRecruitPage ? '/pub/recruit' : '/pub/pubindex/')}>
                        <img src='/img/logo.png' alt="logo" className="lg:size-[78px] size-[40px]"/>
                    </div>

                    {/* 네비게이션 메뉴 */}
                    <nav className="hidden flex-1 justify-between items-center pt-3 lg:flex">
                        {isRecruitPage ? (
                            // 인재채용 전용 메뉴
                            <div className="flex flex-1 items-center justify-center gap-[90px] pl-5">
                                {recruitMenuItems.map((item, index) => {
                                    const isActive = currentPath === item.path;
                                    const isExternal = item.isExternal || item.path.startsWith('http');

                                    if (isExternal) {
                                        return (
                                            <a
                                                key={index}
                                                href={item.path}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={clsx(
                                                    "flex gap-1 justify-center items-center transition-all duration-200 cursor-pointer text-[21px]",
                                                    "font-normal text-grilledMeats font-variation-settings:'wght_400'"
                                                )}
                                                onMouseEnter={() => setHoveredRecruitItem(index)}
                                                onMouseLeave={() => setHoveredRecruitItem(null)}
                                            >
                                                <span className="flex-none text-center">
                                                    {item.name}
                                                </span>
                                                {item.name === '채용공고' && (
                                                    <Icon
                                                        name="arrowOutward"
                                                        className="*:fill-grilledMeats size-[12px]"
                                                    />
                                                )}
                                            </a>
                                        );
                                    }

                                    return (
                                        <Link
                                            key={index}
                                            href={item.path}
                                            className={clsx(
                                                "flex gap-1 justify-center items-center transition-all duration-200 cursor-pointer text-[21px]",
                                                isActive
                                                    ? "font-bold text-samlipRed font-variation-settings:'wght_700'" : "font-normal text-grilledMeats font-variation-settings:'wght_400'"
                                            )}
                                            onMouseEnter={() => setHoveredRecruitItem(index)}
                                            onMouseLeave={() => setHoveredRecruitItem(null)}
                                        >
                                            <span className="flex-none text-center">
                                                {item.name}
                                            </span>
                                        </Link>
                                    );
                                })}
                            </div>
                        ) : (
                            // 일반 메뉴
                            <div
                                className="flex flex-1 items-center lg:px-10 xl:gap-[90px] justify-between xl:justify-center pl-5">
                                {menuItems.map((menu, index) => {
                                    // 현재 경로가 이 메뉴의 서브아이템 중 하나와 일치하는지 확인 (접두사 겹침 방지: /now/pr ↔ /now/promise)
                                    const isActiveRoute = menu.subItems?.some(subItem => isSubPathActive(currentPath, subItem.path))
                                        || (menu.path ? isSubPathActive(currentPath, menu.path) : false);

                                    const isActive = activeMenu === index || isActiveRoute;

                                    return (
                                        <div
                                            key={index}
                                            className={clsx(
                                                "flex justify-center items-center transition-all duration-200 cursor-pointer",
                                                isActive
                                                    ? "font-bold text-samlipRed"
                                                    : "font-normal text-secondary-600"
                                            )}
                                            onClick={() => setActiveMenuHandler(index)}
                                            onMouseEnter={() => {
                                                // 서브메뉴가 있는 경우에만 호버로 활성화
                                                if (menu.subItems && menu.subItems.length > 0) {
                                                    // 기존 타이머가 있으면 즉시 취소
                                                    if (menuTimeoutRef.current) {
                                                        clearTimeout(menuTimeoutRef.current);
                                                        menuTimeoutRef.current = null;
                                                    }
                                                    setActiveMenu(index);
                                                }
                                            }}
                                            onMouseLeave={() => {
                                                // 서브메뉴가 있는 경우에만 호버로 비활성화
                                                if (menu.subItems && menu.subItems.length > 0) {
                                                    // 기존 타이머가 있으면 취소
                                                    if (menuTimeoutRef.current) {
                                                        clearTimeout(menuTimeoutRef.current);
                                                    }
                                                    // 지연 시간을 늘려서 서브메뉴로 이동할 충분한 시간 제공
                                                    menuTimeoutRef.current = setTimeout(() => {
                                                        setActiveMenu(null);
                                                        menuTimeoutRef.current = null;
                                                    }, 300);
                                                }
                                            }}
                                        >
                                            <span className="text-[21px] text-center flex-none">
                                                {menu.name}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        )}


                        {isRecruitPage ? (
                            <Button intent="secondary" rounded='full'
                                    className='flex gap-1 justify-center items-center transition-all duration-200 hover:bg-samlipRed hover:text-white'
                                    onClick={() => navigateTo('/')}>
                                <span className="text-[15px] leading-[15px]">삼립 홈페이지</span>
                                <Icon name="arrowOutward" size={10} className=''/>
                            </Button>
                        ) : (
                            <div className="pl-5 gap-[5px] flex">
                                <Button intent="secondary" rounded='full'
                                        className='flex gap-1 justify-center items-center transition-all duration-200 hover:bg-samlipRed hover:text-white'
                                        onClick={() => navigateTo('/recruit')}>
                                    <span className="text-[15px] leading-[15px]">인재채용</span>
                                    <Icon name="arrowOutward" size={10} className='*:fill-white'/>
                                </Button>
                                <Button intent="secondary" text rounded='full'
                                        className='flex gap-1 justify-center items-center'
                                        onClick={() => window.open('https://brand.naver.com/samlip', '_blank', 'noopener,noreferrer')}>
                                    <span className="text-[15px] leading-[15px]">삼립몰</span>
                                    <Icon name="arrowOutward" size={10} className='*:fill-secondary-600'/>
                                </Button>
                                <Button intent="secondary" text rounded='full'
                                        className='flex gap-1 justify-center items-center'
                                        onClick={() => navigateTo('/service')}>
                                    <span className="text-[15px] leading-[15px]">고객서비스</span>
                                </Button>
                                <button onClick={() => setIsSearchOpen(!isSearchOpen)}>
                                    <Icon name="search" size={32} className="*:fill-secondary-600"/>
                                </button>
                                <button>
                                    <Icon name="language" size={32} className="*:fill-secondary-600"/>
                                </button>
                            </div>
                        )}
                    </nav>

                    <nav className="flex items-center lg:hidden">
                        <button
                            className="flex relative justify-center items-center w-10 h-10 pt-[4px]"
                            onClick={() => setIsSearchOpen(!isSearchOpen)}>
                            {isSearchOpen ? (
                                <Icon name="close" size={36} className="*:*:fill-samlipRed"/>
                            ) : (
                                <Icon name="search" size={36} className="*:*:!fill-current"
                                      style={{color: getIconColor()}}/>
                            )}
                        </button>

                        <button
                            className="flex relative justify-center items-center w-10 h-10 pt-[4px]"
                            onClick={toggleSideMenu}
                        >
                            <Icon
                                name="menubar"
                                size={24}
                                className="text-current *:fill-current"
                                style={{color: getIconColor()}}
                            />
                        </button>
                    </nav>
                </div>
            </motion.section>

            {/* 서브 카테고리 (호버용) */}
            <SubCategory
                activeMenu={activeMenu}
                menuItems={menuItems}
                isRecruitPage={isRecruitPage}
                isHomePage={isHomePage}
                menuTimeoutRef={menuTimeoutRef}
                setActiveMenu={setActiveMenu}
                closeSideMenu={closeSideMenu}
                pathname={currentPath}
            />
            {/* 햄버거 메뉴 (모바일) */}
            {typeof document !== 'undefined' && createPortal(
                <AnimatePresence>
                    {isSideMenuOpen && (
                        <motion.article
                            className="fixed inset-0 z-[9999] bg-cream overflow-y-auto lg:hidden "
                            initial={{opacity: 0, x: '100%'}}
                            animate={{opacity: 1, x: 0}}
                            exit={{opacity: 0, x: '100%'}}
                            transition={{duration: 0.3, ease: [0.4, 0, 0.2, 1]}}
                            onClick={(e) => {
                                // 메뉴가 열릴 때 모바일 activeMenu 초기화
                                if (e.target === e.currentTarget) {
                                    setMobileActiveMenu(null);
                                }
                            }}>
                            {/* 상단 헤더 */}
                            <div className="flex justify-between items-center pr-2 pb-4 pl-5"
                                 onClick={(e) => e.stopPropagation()}>
                                {/* 로고 */}
                                <div className="cursor-pointer" onClick={() => {
                                    navigateTo('/pub/pubindex');
                                    closeSideMenu();
                                    setMobileActiveMenu(null);
                                }}>
                                    <img src='/img/logo.png' alt="logo" className="size-[40px]"/>
                                </div>

                                {/* 언어 선택기 및 닫기 버튼 */}
                                <div className="flex gap-4 items-center">
                                    {/* 언어 선택기 */}
                                    <div className="flex items-center gap-2 text-[14px]">
                                        <span className="font-bold text-samlipRed">KR</span>
                                        <span className="text-gray-400">|</span>
                                        <span className="text-gray-400">EN</span>
                                    </div>

                                    {/* 닫기 버튼 */}
                                    <button
                                        onClick={() => {
                                            closeSideMenu();
                                            setMobileActiveMenu(null);
                                        }}
                                        className="flex justify-center items-center w-10 h-10 text-[28px] font-light leading-none"
                                        aria-label="메뉴 닫기"
                                    >
                                        <Icon name="close" size={24} className="fill-black"/>
                                    </button>
                                </div>
                            </div>
                            <section className='flex flex-col min-h-[calc(100vh-56px)]'>
                                {/* 메인 네비게이션 */}
                                <nav className="pt-0 mt-[70px]" onClick={(e) => e.stopPropagation()}>
                                    {!isRecruitPage ? (
                                        <>
                                            {menuItems.map((menu, index) => {
                                                const hasSubItems = menu.subItems && menu.subItems.length > 0;
                                                const isExpanded = mobileActiveMenu === index;
                                                const currentPath = (pathname ?? router.asPath ?? '');

                                                // 현재 경로가 이 메뉴의 서브아이템과 일치하는지 확인 (접두사 겹침 방지: /now/pr ↔ /now/promise)
                                                const isActiveRoute = menu.subItems?.some(subItem => isSubPathActive(currentPath, subItem.path))
                                                    || (menu.path ? isSubPathActive(currentPath, menu.path) : false);

                                                return (
                                                    <div key={index} className="">
                                                        {hasSubItems ? (
                                                            <>
                                                                {/* 확장 가능한 메뉴 */}
                                                                <button
                                                                    className="flex justify-between items-center px-5 py-4 w-full text-left"
                                                                    onClick={() => {
                                                                        if (isExpanded) {
                                                                            setMobileActiveMenu(null);
                                                                        } else {
                                                                            setMobileActiveMenu(index);
                                                                        }
                                                                    }}
                                                                >
                                                                <span className={clsx(
                                                                    "font-bold text-[18px]",
                                                                    isActiveRoute ? "text-samlipRed" : "text-gray-900"
                                                                )}>
                                                                    {menu.name}
                                                                </span>
                                                                    <Icon
                                                                        name="arrowDown"
                                                                        size={24}
                                                                        className={clsx(
                                                                            "transition-transform duration-200",
                                                                            isExpanded && "rotate-180"
                                                                        )}
                                                                        style={{color: '#000'}}
                                                                    />
                                                                </button>

                                                                {/* 서브 메뉴 */}
                                                                <AnimatePresence>
                                                                    {isExpanded && (
                                                                        <motion.div
                                                                            initial={{height: 0, opacity: 0}}
                                                                            animate={{height: 'auto', opacity: 1}}
                                                                            exit={{height: 0, opacity: 0}}
                                                                            transition={{duration: 0.2}}
                                                                            className="overflow-hidden bg-[#F9F4DA] border-t border-[#E8DBBD]"
                                                                        >
                                                                            <div className="pl-[32px]">
                                                                                {menu.subItems?.map((subItem, subIndex) => {
                                                                                    const isActive = isSubPathActive(currentPath, subItem.path);
                                                                                    return (
                                                                                        <Link
                                                                                            key={subIndex}
                                                                                            href={subItem.path}
                                                                                            onClick={() => {
                                                                                                closeSideMenu();
                                                                                                setMobileActiveMenu(null);
                                                                                            }}
                                                                                            className={clsx(
                                                                                                "block transition-colors py-[12px] text-[14px]",
                                                                                                isActive
                                                                                                    ? "font-bold text-samlipRed"
                                                                                                    : "font-medium text-black"
                                                                                            )}
                                                                                        >
                                                                                            {subItem.name}
                                                                                        </Link>
                                                                                    );
                                                                                })}
                                                                            </div>
                                                                        </motion.div>
                                                                    )}
                                                                </AnimatePresence>
                                                            </>
                                                        ) : (
                                                            /* 직접 링크 메뉴 */
                                                            <Link
                                                                href={menu.path || '#'}
                                                                onClick={() => {
                                                                    closeSideMenu();
                                                                    setMobileActiveMenu(null);
                                                                }}
                                                                className={clsx(
                                                                    "flex justify-between items-center py-4 w-full font-bold text-[18px]",
                                                                    isActiveRoute ? "text-samlipRed" : "text-gray-900"
                                                                )}
                                                            >
                                                                {menu.name}
                                                            </Link>
                                                        )}
                                                    </div>
                                                );
                                            })}

                                            {/* 고객서비스 메뉴 */}
                                            <div className="">
                                                <Link
                                                    href="/service"
                                                    onClick={() => {
                                                        closeSideMenu();
                                                        setMobileActiveMenu(null);
                                                    }}
                                                    className={clsx(
                                                        "flex justify-between items-center w-full py-4 text-[18px] font-bold px-5",
                                                        location.pathname === '/service' ? "text-samlipRed" : "text-gray-900"
                                                    )}
                                                >
                                                    고객서비스
                                                </Link>
                                            </div>
                                        </>
                                    ) : (
                                        /* 인재 채용 메뉴 */
                                        <div className="px-5 pt-4 pb-4 bg-cream">
                                            {recruitMenuItems.map((item, index) => {
                                                const isExternal = item.isExternal || item.path.startsWith('http');
                                                const isActive = currentPath === item.path ||
                                                    (item.path !== '/' && currentPath.startsWith(item.path));

                                                if (isExternal) {
                                                    return (
                                                        <a
                                                            key={index}
                                                            href={item.path}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            onClick={() => {
                                                                closeSideMenu();
                                                                setMobileActiveMenu(null);
                                                            }}
                                                            className={clsx(
                                                                "flex justify-start items-center py-3 font-bold text-[16px]",
                                                                isActive ? "text-samlipRed" : "text-gray-900"
                                                            )}
                                                        >
                                                            <span>{item.name}</span>
                                                            <Icon name="arrowOutward" className={clsx(
                                                                isActive ? "*:fill-samlipRed" : "*:fill-gray-900",
                                                                "size-[13px] ml-1"
                                                            )}/>
                                                        </a>
                                                    );
                                                } else {
                                                    return (
                                                        <Link
                                                            key={index}
                                                            href={item.path}
                                                            onClick={() => {
                                                                closeSideMenu();
                                                                setMobileActiveMenu(null);
                                                            }}
                                                            className={clsx(
                                                                "block py-3 font-bold text-[16px]",
                                                                isActive ? "text-samlipRed" : "text-gray-900"
                                                            )}
                                                        >
                                                            {item.name}
                                                        </Link>
                                                    );
                                                }
                                            })}
                                        </div>
                                    )}
                                </nav>

                                {/* 하단 링크 */}
                                <div
                                    className="flex-1 px-5 pt-4 pb-8 bg-white"
                                    onClick={e => e.stopPropagation()}
                                >
                                    {/* 인재 채용 페이지일 때만 삼립 홈페이지 링크 표시 */}
                                    {isRecruitPage && (
                                        <a
                                            onClick={(e) => {
                                                e.preventDefault();
                                                navigateTo('/');
                                                closeSideMenu();
                                                setMobileActiveMenu(null);
                                            }}
                                            className="flex items-center py-3 font-bold text-[16px] text-[#930000] gap-[5px]"
                                        >
                                            <span>삼립 홈페이지</span>
                                            <Icon name="arrowOutward" className="*:fill-[#930000] size-[13px]"/>
                                        </a>
                                    )}
                                    {!isRecruitPage && (
                                        <>
                                            <a
                                                href="/src/pages"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    navigateTo('/pub/recruit');
                                                    closeSideMenu();
                                                    setMobileActiveMenu(null);
                                                }}
                                                className="flex items-center py-3 font-bold text-[16px] text-[#930000]"
                                            >
                                                <span>인재채용</span>
                                                <Icon name="arrowOutward" size={22}
                                                      className="*:fill-[#930000] h-[10px]"/>
                                            </a>
                                            <button
                                                onClick={() => {
                                                    window.open('https://brand.naver.com/samlip', '_blank', 'noopener,noreferrer');
                                                    closeSideMenu();
                                                    setMobileActiveMenu(null);
                                                }}
                                                className="flex items-center  py-3 font-bold text-[16px] text-[#930000] w-full text-left"
                                            >
                                                <span>삼립몰</span>
                                                <Icon name="arrowOutward" size={22}
                                                      className="*:fill-[#930000] h-[10px]"/>
                                            </button>
                                            <Link
                                                href="/notice"
                                                onClick={() => {
                                                    closeSideMenu();
                                                    setMobileActiveMenu(null);
                                                }}
                                                className="flex items-center  py-3 font-bold text-[16px]"
                                            >
                                                <span>공지사항</span>
                                            </Link>
                                        </>
                                    )}
                                </div>
                            </section>
                        </motion.article>
                    )}
                </AnimatePresence>,
                document.body
            )}

            {/* 검색 영역 - Portal로 body에 렌더링하여 헤더 애니메이션 영향 없음 */}
            {typeof window !== 'undefined' && createPortal(
                <AnimatePresence>
                    {isSearchOpen && (
                        <>
                            {/* 딤 배경 */}
                            <motion.div
                                initial={{opacity: 0}}
                                animate={{opacity: 1}}
                                exit={{opacity: 0}}
                                transition={{duration: 0.2}}
                                className="fixed inset-0 bg-black/50 z-[101] "
                                onClick={() => {
                                    setIsSearchOpen(false);
                                    setSearchQuery('');
                                }}
                            />

                            {/* 검색 영역 */}
                            <motion.section
                                initial={{opacity: 0, y: -10}}
                                animate={{opacity: 1, y: 0}}
                                exit={{opacity: 0, y: -10}}
                                transition={{duration: 0.25, ease: [0.25, 0.1, 0.25, 1]}}
                                className="fixed left-0 right-0 bg-[#fbfae7] border-t border-[#e8dbbd] w-full z-[1001] top-[44px] lg:top-[90px] overflow-hidden"
                            >
                                <motion.div
                                    initial={{height: 0}}
                                    animate={{height: 'auto'}}
                                    exit={{height: 0}}
                                    transition={{duration: 0.3, ease: [0.4, 0, 0.2, 1]}}
                                    className="overflow-hidden"
                                >
                                    <motion.div
                                        initial={{opacity: 0}}
                                        animate={{opacity: 1}}
                                        exit={{opacity: 0}}
                                        transition={{duration: 0.2, delay: 0.1}}
                                        className="px-5 py-6 lg:px-10 lg:py-20"
                                    >
                                        <SearchInput
                                            searchQuery={searchQuery}
                                            onSearchQueryChange={setSearchQuery}
                                            onSearch={() => {
                                                if (searchQuery.trim()) {
                                                    router.push(`/pub/search?q=${encodeURIComponent(searchQuery)}`);
                                                    setIsSearchOpen(false);
                                                    setSearchQuery('');
                                                }
                                            }}
                                            onClear={() => setSearchQuery('')}
                                            resultCount={resultCount}
                                            showResultCount={false}
                                            onClose={() => {
                                                setIsSearchOpen(false);
                                                setSearchQuery('');
                                            }}
                                        />
                                    </motion.div>
                                </motion.div>
                            </motion.section>
                        </>
                    )}
                </AnimatePresence>,
                document.body
            )}
        </motion.header>
    );
};
