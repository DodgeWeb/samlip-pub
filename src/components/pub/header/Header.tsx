import React, {useState, useRef, useEffect} from 'react';
import {useRouter} from 'next/router';
import {motion} from 'framer-motion';
import clsx from 'clsx';

import {MainHeader} from './MainHeader';
import {SubHeader} from './SubHeader';
import {MenuItem, HeaderProps} from './types';

import {useScrollDirection} from '@/hooks/useScrollDirection';
import Tab from '@/components/pub/tab/Tab';
import type {TabItem} from '@/components/pub/tab/Tab.types';

const Header = ({
    menuItems = [
        {
            name: '회사소개',
            subItems: [
                {name: 'Identity', path: '/pub/company/identity'},
                {name: '연혁', path: '/pub/company/history'},
                {name: 'CI/BI', path: '/pub/company/ci-bi'},
                {name: '사업소개', path: '/pub/company/business'},
                {name: '삼립의 기술', path: '/pub/company/technology'},
                {name: '투자 정보', path: '/pub/company/invest'},
                {name: '위치', path: '/pub/company/location'}
            ]
        },
        {
            name: '지속가능경영',
            subItems: [
                {name: '지속가능경영체계', path: '/pub/sustainability/system'},
                {name: '환경', path: '/pub/sustainability/environment'},
                {name: '사회', path: '/pub/sustainability/social'},
                {name: '지배구조', path: '/pub/sustainability/governance'},
                {name: '보고서 및 정책', path: '/pub/sustainability/report-policy'},
                {name: '윤리경영', path: '/pub/sustainability/ethics'},
                {name: '사회공헌', path: '/pub/sustainability/contribution'}
            ]
        },
        {
            name: '브랜드',
            path: '/pub/brand',
            subItems: [
                {name: '삼립', path: '/pub/brand/home'},
                {name: '베이커리', path: '/pub/brand/bakery'},
                {name: '푸드', path: '/pub/brand/food'},
                {name: 'Store/온라인', path: '/pub/brand/store'}
            ]
        },
        {
            name: '삼립 NOW',
            subItems: [
                {name: '삼립 스토리', path: '/pub/now/story'},
                {name: '미디어', path: '/pub/now/media'},
                {name: '삼립의 약속', path: '/pub/now/promise'},
                {name: '보도자료', path: '/pub/now/pr'}
            ]
        }
    ]
}: HeaderProps) => {
    const router = useRouter();

    const pathname = router.asPath.split('?')[0];

    const isHomePage =
        pathname === '/' ||
        pathname === '/pub' ||
        pathname === '/pub/pubindex';


    const isInvestIndex = pathname.startsWith('/pub/company/invest');
    const isCibiIndex = pathname.startsWith('/pub/company/ci-bi');
    const isHistoryIndex = pathname.startsWith('/pub/company/history');
    const isBakeryIndex = pathname === '/pub/brand/bakery';
    const isFoodIndex = pathname === '/pub/brand/food';

    const [activeMenu, setActiveMenu] = useState<number | null>(null);
    const [homeActiveMenu, setHomeActiveMenu] = useState<number | null>(null);
    const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
    const [hoveredRecruitItem, setHoveredRecruitItem] = useState<number | null>(null);

    const [headerHeight, setHeaderHeight] = useState(0);
    const [mainHeaderHeight, setMainHeaderHeight] = useState(0);
    const [scrollY, setScrollY] = useState(0);

    const [isCiBiMainHeaderHidden, setIsCiBiMainHeaderHidden] = useState(false);
    const [isCiBiScrollingUp, setIsCiBiScrollingUp] = useState(false);

    const [isBakeryMainHeaderHidden, setIsBakeryMainHeaderHidden] = useState(false);
    const [isBakeryScrollingUp, setIsBakeryScrollingUp] = useState(false);

    const [isFoodMainHeaderHidden, setIsFoodMainHeaderHidden] = useState(false);
    const [isFoodScrollingUp, setIsFoodScrollingUp] = useState(false);

    const [isHistoryHeaderOutOfView, setIsHistoryHeaderOutOfView] = useState(false);
    const [isHistoryScrollingUp, setIsHistoryScrollingUp] = useState(false);

    const historyScrollDirTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const menuTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const headerRef = useRef<HTMLElement | null>(null);
    const headerWrapperRef = useRef<HTMLDivElement | null>(null);

    /* ---------- Tab ---------- */
    const subTabRoutes = [
        '/pub/service',
        '/pub/company/business',
        '/pub/brand/store',
        '/pub/sustainability/social',
        '/pub/sustainability/system',
        '/pub/sustainability/report-policy',
        '/pub/sustainability/governance',
        '/pub/sustainability/environment',
        '/pub/company/invest/stock',
        '/pub/company/invest/finance',
        '/pub/company/invest/disclosure'
    ];

    const hasSubTab = subTabRoutes.some(
        (route) => pathname === route || pathname.startsWith(route)
    );

    const isScrollingUp = useScrollDirection(hasSubTab ? 140 : 50);

    const isHeaderVisible = scrollY < mainHeaderHeight;

    const effectiveIsHeaderVisible = isCibiIndex
        ? !isCiBiMainHeaderHidden
        : isBakeryIndex
            ? !isBakeryMainHeaderHidden
            : isFoodIndex
                ? !isFoodMainHeaderHidden
                : isHistoryIndex
                    ? !isHistoryHeaderOutOfView
                    : isHeaderVisible;

    const effectiveIsScrollingUp = isCibiIndex
        ? isCiBiScrollingUp
        : isBakeryIndex
            ? isBakeryScrollingUp
            : isFoodIndex
                ? isFoodScrollingUp
                : isHistoryIndex
                    ? isHistoryScrollingUp
                    : isScrollingUp;

    const isRecruitPage = pathname.startsWith('/pub/recruit');

    const isBakeryBrandDetail =
        pathname.startsWith('/pub/brand/bakery/') && pathname !== '/pub/brand/bakery';
    const isFoodBrandDetail =
        pathname.startsWith('/pub/brand/food/') && pathname !== '/pub/brand/food';

    const isBrandDetailPage = isBakeryBrandDetail || isFoodBrandDetail;

    const bakeryBrandSubTabs: TabItem[] = [
        {label: '삼립호빵', path: '/pub/brand/bakery/hoppang'},
        {label: '삼립호떡', path: '/pub/brand/bakery/hotteok'},
        {label: '삼립약과', path: '/pub/brand/bakery/yakgwa'},
        {label: '크림빵', path: '/pub/brand/bakery/cream-bread'},
        {label: '보름달', path: '/pub/brand/bakery/boreumdal'},
        {label: '미각제빵소', path: '/pub/brand/bakery/migak'},
        {label: '로만밀', path: '/pub/brand/bakery/romanmeal'},
        {label: '누네띠네', path: '/pub/brand/bakery/nunettine'},
        {label: '프로젝트H', path: '/pub/brand/bakery/project-h'},
        {label: '레디비', path: '/pub/brand/bakery/readyb'}
    ];

    const foodBrandSubTabs: TabItem[] = [
        {label: '하이면', path: '/pub/brand/food/hi-m'},
        {label: '그릭슈바인', path: '/pub/brand/food/grill-schwein'},
        {label: '피그인더가든', path: '/pub/brand/food/pig-in-the-garden'},
        {label: '시티델리', path: '/pub/brand/food/citydeli'}
    ];

    const brandTabItems = isBakeryBrandDetail
        ? bakeryBrandSubTabs
        : foodBrandSubTabs;

    const brandActiveIndex = Math.max(
        0,
        brandTabItems.findIndex((it) => pathname.startsWith(it.path ?? ''))
    );

    /* ---------- util ---------- */
    const navigateTo = (path: string) => {
        router.push(path);
    };

    const toggleSideMenu = () => setIsSideMenuOpen((v) => !v);
    const closeSideMenu = () => setIsSideMenuOpen(false);

    /* ---------- scroll ---------- */
    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };
        handleScroll();
        window.addEventListener('scroll', handleScroll, {passive: true});
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const updateMainHeaderHeight = () => {
            if (headerRef.current) {
                setMainHeaderHeight(headerRef.current.offsetHeight);
            }
        };
        updateMainHeaderHeight();
        window.addEventListener('resize', updateMainHeaderHeight);
        return () => window.removeEventListener('resize', updateMainHeaderHeight);
    }, []);

    useEffect(() => {
        const updateHeaderHeight = () => {
            if (headerWrapperRef.current) {
                setHeaderHeight(headerWrapperRef.current.offsetHeight);
            }
        };
        updateHeaderHeight();
        window.addEventListener('resize', updateHeaderHeight);
        return () => window.removeEventListener('resize', updateHeaderHeight);
    }, []);

    const isFixed = !effectiveIsHeaderVisible;

    const getHeaderY = () => {
        if (isHomePage) return 0;
        if (!isFixed) return 0;
        if (!effectiveIsScrollingUp) return -headerHeight;
        return -mainHeaderHeight;
    };

    /* ---------- render ---------- */
    return (
        <>
            {pathname !== '/' && (
                <motion.div
                    ref={headerWrapperRef}
                    className="w-full z-[1000] fixed top-0 left-0"
                    animate={{y: getHeaderY()}}
                    transition={{duration: 0.4, ease: [0.4, 0, 0.2, 1]}}
                >
                    <MainHeader
                        headerRef={headerRef}
                        isStaticPosition={false}
                        isScrollingUp={effectiveIsScrollingUp}
                        isHeaderVisible={effectiveIsHeaderVisible}
                        headerHeight={headerHeight}
                        isRecruitPage={isRecruitPage}
                        recruitMenuItems={[]}
                        menuItems={menuItems}
                        activeMenu={activeMenu}
                        hoveredRecruitItem={hoveredRecruitItem}
                        pathname={pathname}
                        isInvestIndex={isInvestIndex}
                        isCibiIndex={isCibiIndex}
                        setActiveMenuHandler={(index) => {
                            setActiveMenu((prev) => (prev === index ? null : index));
                        }}
                        setActiveMenu={setActiveMenu}
                        setHoveredRecruitItem={setHoveredRecruitItem}
                        toggleSideMenu={toggleSideMenu}
                        navigateTo={navigateTo}
                        menuTimeoutRef={menuTimeoutRef}
                        closeSideMenu={closeSideMenu}
                        isSideMenuOpen={isSideMenuOpen}
                        isHomePage={isHomePage}
                    />

                    <SubHeader
                        activeMenu={activeMenu}
                        menuItems={menuItems}
                        isRecruitPage={isRecruitPage}
                        isHeaderVisible={effectiveIsHeaderVisible}
                        isScrollingUp={effectiveIsScrollingUp}
                        headerHeight={headerHeight}
                        isSpecialHeaderPage={false}
                        hasSubTab={hasSubTab}
                    />
                </motion.div>
            )}

            {isBrandDetailPage && (
                <Tab
                    items={brandTabItems}
                    activeIndex={brandActiveIndex}
                    disableQuerySync
                    stickyTopOverride={effectiveIsHeaderVisible ? mainHeaderHeight : 0}
                    onTabClick={(_, item) => item.path && navigateTo(item.path)}
                    headerType="brand"
                />
            )}
        </>
    );
}

export default Header;