import React, {useRef, useMemo} from 'react';
import BackImgBox from '@/components/pub/BackImgBox';
import Tab from '@/components/pub/tab';
import {motion, AnimatePresence} from 'framer-motion';
import {useQueryTab} from '@/hooks/useQueryTab';
import ProductImprovement from './ProductImprovement';
import CustomerFeedback from './CustomerFeedback';
import FAQ from './FAQ';

const ServiceIndex = () => {
    const tabItems = useMemo(
        () => ['자주묻는질문', '고객의견', '제품개선사례'],
        []
    );

    const tabComponents = useMemo(
        () => [
            <FAQ key="faq"/>,
            <CustomerFeedback key="feedback"/>,
            <ProductImprovement key="improvement"/>
        ],
        []
    );

    const contentRef = useRef<HTMLDivElement | null>(null);

    const [activeTabIndex, setActiveTabIndex] = useQueryTab(tabItems, {
        queryParamKey: 'tab',
        useIndexAsValue: false,
        defaultIndex: 0, // 기본: 자주묻는질문
    });

    const handleTabClick = (index: number) => {
        setActiveTabIndex(index);
    };

    return (
        <main>
            <BackImgBox
                label="고객 서비스"
                imageSrc="/img/cover/service_cover.png"
            />

            <Tab
                items={tabItems}
                activeIndex={activeTabIndex}
                onTabClick={handleTabClick}
                queryParamKey="tab"
                useIndexAsValue={false}
            />

            {/* 탭 변경 컨텐츠 영역 */}
            <div
                ref={contentRef}
                className="mx-auto w-full pt-[40px] lg:pt-[100px] pb-[70px] lg:pb-[200px]"
            >
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTabIndex}
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        exit={{opacity: 0, y: -20}}
                        transition={{duration: 0.3, ease: 'easeInOut'}}
                    >
                        {tabComponents[activeTabIndex]}
                    </motion.div>
                </AnimatePresence>
            </div>
        </main>
    );
};

export default ServiceIndex;
