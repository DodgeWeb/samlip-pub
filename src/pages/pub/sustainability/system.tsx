import React, {useRef, useState} from 'react';
import {motion, AnimatePresence} from 'framer-motion';
import BackImgBox from '@/components/pub/BackImgBox';
import Tab from '@/components/pub/tab';
import {MotionBox} from '@/components/pub/MotionBox';
import {ClickableImage} from '@/components/pub/imageModal/ClickableImage';
import {useTabScroll} from '@/hooks/useTabScroll';

const System = () => {
    const [activeTabIndex, setActiveTabIndex] = useState(0);
    const tabItems = ['지속가능경영전략', '지속가능경영조직 ', 'ESG'];
    const contentRef = useRef<HTMLDivElement | null>(null);
    const scrollToTabContent = useTabScroll();

    // 더미 데이터 (년도/등급은 추후 여기서만 수정하면 테이블에 반영되도록 구성)
    const esgGradeStatusItems = [
        {year: '2024년', total: 'B', e: 'B', s: 'C', g: 'B'},
        {year: '2023년', total: 'D', e: 'C', s: 'C', g: 'D'},
        {year: '2022년', total: 'B', e: 'C', s: 'B+', g: 'B'},
        {year: '2021년', total: 'B+', e: 'B', s: 'A', g: 'B+'},
        {year: '2020년', total: 'B+', e: 'B', s: 'A', g: 'B'},
    ];
    const handleTabClick = (index: number) => {
        setActiveTabIndex(index);
        requestAnimationFrame(() => {
            window.setTimeout(() => {
                scrollToTabContent(contentRef.current);
            }, 100);
        });
    };

    // 탭에 따른 컨텐츠 렌더링
    const renderContent = () => {
        switch (activeTabIndex) {
            case 0:
                return (
                    <div className="">
                        <h2 className="text-center">지속가능경영 전략</h2>
                        <p className="mt-6 text-center body1">SPC삼립은 고객 접점에서 지속가능성을 실현하기 위한 제품의 기준(Standard)을 마련하고,<br/>
                            그 제품의 가치를 강화(Strengthen)할 수 있는 사업운영 환경을 조성하는 것을 목표로<br/>
                            'Make S'라는 전략 지향점을 설정하였습니다.</p>

                        <section className='max-w-[1180px] w-full mx-auto lg:mt-[54px] mt-[24px] flex'>
                            <MotionBox type="fadeUp">
                                <img src="/img/sustainability_01.png" alt="sustainability_01"
                                     className='w-full h-full'/>
                            </MotionBox>
                        </section>
                    </div>
                );
            case 1:
                return (
                    <div>
                        <h2 className="text-center">지속가능경영 조직</h2>
                        <p className="mt-6 text-center body1">SPC삼립은 임원으로 구성된 지속가능경영 협의체와<br/>
                            실행부서 중심의 지속가능경영 실무 협의체를 통해 지속가능경영 체계를 운영하고 있습니다.</p>
                        <section className='max-w-[1180px] w-full mx-auto lg:mt-[54px] mt-[24px] flex'>
                            <MotionBox type="fadeUp">
                                <ClickableImage src="/img/sustainability/sustainability_02.jpg" alt="sustainability_01"
                                                className='w-full h-full' showButton={true}/>
                            </MotionBox>
                        </section>
                    </div>
                );
            case 2:
                return (
                    <div className="">
                        {/* ESG 주요 목표 */}
                        <h2 className="text-center">ESG 주요 목표</h2>
                        <section className='max-w-[1180px] w-full mx-auto lg:mt-[62px] mt-[24px]'>
                            <div
                                className="*:flex *:gap-1 flex flex-col gap-1 font-normal text-[10px] lg:text-[22px] leading-[160%] tracking-[-0.01em] text-center">
                                {/* 제목들 */}
                                <section>
                                    <h3 className="lg:text-[26px] text-[10px] w-full center-box font-medium leading-[140%] tracking-[-0.5px] text-center lg:h-[69px] h-[27px] bg-deilcut text-white flex-[4]">전략방향</h3>
                                    <h3 className="lg:text-[26px] text-[10px] w-full center-box font-medium leading-[140%] tracking-[-0.5px] text-center lg:h-[69px] h-[27px] bg-deilcut text-white flex-[6]">실행과제</h3>
                                </section>
                                {/* 두번째 */}
                                <section className='flex flex-1 gap-2 w-full'>
                                    <div className='flex gap-1 *:bg-[#F7F7F7] flex-[4]'>
                                        <p className='center-box center-box font-bold leading-[140%] tracking-[-0.5px] w-full flex-[4]'>환경</p>
                                        <p className='w-full center-box flex-[6]'>친환경</p>
                                    </div>

                                    <div className='flex flex-col  *:bg-[#F7F7F7] flex-[6] '>
                                        <p className='center-box leading-[160%] tracking-[-0.5px] w-full text-left border-b border-[#D9D9D9] py-3'>1.에너지
                                            사용량 감축 <br/>2.
                                            폐기물 배출량 감축<br/>3.
                                            폐기물 재활용량 확대<br/>4.
                                            온실가스 배출량 감축<br/>5.
                                            용수 사용량 감축</p>
                                        <p className='py-2 w-full center-box border-b border-[#D9D9D9]'>친환경 매출 실적 개선</p>
                                        <p className='py-2 w-full center-box'>친환경 매출 실적 개선</p>
                                    </div>
                                </section>
                                <section>
                                    <div className='flex gap-1 *:bg-[#F7F7F7] flex-[4]'>
                                        <p className='center-box center-box font-bold leading-[140%] tracking-[-0.5px] w-full flex-[4]'>사회</p>
                                        <div className='*:border-b *:border-[#D9D9D9] w-full *:py-2 flex-[6]'>
                                            <p className='center-box'>임직원</p>
                                            <span className='center-box'>공급망</span>
                                            <span className='center-box'>지역사회 참여</span>
                                            <span className='center-box border-none'>공정운영</span>
                                        </div>
                                    </div>
                                    <div className='flex flex-col  *:bg-[#F7F7F7] flex-[6]'>
                                        <div className='*:border-b *:border-[#D9D9D9] w-full *:py-2 flex-[6]'>
                                            <p className='center-box'>구성원 만족도 개선</p>
                                            <p className='center-box'>협력사 ESG 리스크 완화</p>
                                            <p className='center-box'>생물다양성 보전 및 지역사회 상생 활동 확대</p>
                                            <p className='center-box border-none'>임직원 준법의식 함양</p>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </section>

                        {/* ESG 등급 현황 */}
                        <h2 className="text-center mt-[36px] lg:mt-[120px]">ESG 등급 현황</h2>
                        <section className='mt-[24px] lg:mt-[54px] max-w-[1180px] w-full mx-auto'>
                            <div className="overflow-x-auto">
                                <ul className="flex *:flex-1 py-[6px] lg:text-[22px] lg:font-bold  text-white bg-deilcut font-[400] not-italic text-[10px] leading-[160%] tracking-[-0.03em] text-center lg:py-[14px]">
                                    <li>평가년도</li>
                                    <li>통합등급</li>
                                    <li>환경[E]</li>
                                    <li>사회[S]</li>
                                    <li>지배구조[G]</li>
                                </ul>
                                {esgGradeStatusItems.map((item) => (
                                    <ul
                                        key={item.year}
                                        className="flex lg:text-[26px] *:flex-1 lg:*:py-[23px] *:py-[6px] *:border-l border-b border-[#D9D9D9] *:border-[#D9D9D9] font-[400] not-italic text-[10px] leading-[160%] tracking-[-0.03em] text-center"
                                    >
                                        <li>{item.year}</li>
                                        <li>{item.total}</li>
                                        <li>{item.e}</li>
                                        <li>{item.s}</li>
                                        <li className="border-r border-[#D9D9D9]">{item.g}</li>
                                    </ul>
                                ))}
                            </div>
                        </section>

                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <main>
            <BackImgBox label='지속가능경영체계' imageSrc='/img/sustainability.png'/>
            <Tab
                items={tabItems}
                activeIndex={activeTabIndex}
                onTabClick={handleTabClick}
            />

            {/* 탭 클릭 시 변경되는 컨텐츠 영역 */}
            <div ref={contentRef} className='px-4 pt-[40px] lg:pt-[100px] pb-[70px] lg:pb-[200px]'>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTabIndex}
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        exit={{opacity: 0, y: -20}}
                        transition={{duration: 0.3, ease: 'easeInOut'}}
                    >
                        {renderContent()}
                    </motion.div>
                </AnimatePresence>
            </div>
        </main>
    );
};

export default System;
