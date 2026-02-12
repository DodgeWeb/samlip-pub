import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BackImgBox from '@/components/pub/BackImgBox';
import Tab from '@/components/pub/tab';
import { MotionBox } from '@/components/pub/MotionBox';
import { ClickableImage } from '@/components/pub/imageModal/ClickableImage';
import { useTabScroll } from '@/hooks/useTabScroll';

const Environment = () => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const tabItems = ['환경경영방침', '환경경영조직 ', '환경정량데이터'];
  const contentRef = useRef<HTMLDivElement | null>(null);
  const scrollToTabContent = useTabScroll();

  // 더미 데이터
  const envQuantYears = ['2022', '2023', '2024'] as const;
  const envQuantTableItems: {
    id: 'ghg' | 'energy' | 'water';
    rangeText: string;
    headerTitle: string;
    unitHeader?: string;
    rowGroupTitle: string;
    rows: {
      label: string;
      unit: string;
      values: Record<(typeof envQuantYears)[number], string>;
    }[];
  }[] = [
    {
      id: 'ghg',
      rangeText: '데이터 범위: 시화, 청주, 충주, 서천, 세종 사업장',
      headerTitle: '구분',
      unitHeader: '단위',
      rowGroupTitle: '온실가스배출량',
      rows: [
        {
          label: 'Scope 1',
          unit: 'tCO2eq',
          values: { '2022': '25,053', '2023': '25,403', '2024': '25,935' },
        },
        {
          label: 'Scope 2',
          unit: 'tCO2eq',
          values: { '2022': '31,384', '2023': '29,988', '2024': '54,859' },
        },
        {
          label: '합계',
          unit: 'tCO2eq',
          values: { '2022': '56,437', '2023': '55,391', '2024': '80,794' },
        },
        {
          label: '원단위',
          unit: 'tCO2eq/억 원',
          values: { '2022': '5.02', '2023': '4.80', '2024': '5.00' },
        },
      ],
    },
    {
      id: 'energy',
      rangeText: '데이터 범위: 시화, 청주, 충주, 서천, 세종 사업장',
      headerTitle: '구분',
      unitHeader: '단위',
      rowGroupTitle: '에너지 사용량',
      rows: [
        {
          label: '비재생에너지',
          unit: 'MWh',
          values: { '2022': '460,833', '2023': '464,722', '2024': '475,833' },
        },
        {
          label: '재생에너지',
          unit: 'MWh',
          values: { '2022': '-', '2023': '-', '2024': '108' },
        },
        {
          label: '합계',
          unit: 'MWh',
          values: { '2022': '460,833', '2023': '464,722', '2024': '475,941' },
        },
        {
          label: '원단위',
          unit: 'MWh/억 원',
          values: { '2022': '28.37', '2023': '27.62', '2024': '28.90' },
        },
      ],
    },
    {
      id: 'water',
      rangeText: '데이터 범위: 시화, 청주, 충주, 서천, 세종 사업장',
      headerTitle: '구분',
      unitHeader: '단위',
      rowGroupTitle: '용수 사용량',
      rows: [
        {
          label: '상수도',
          unit: 'ton',
          values: { '2022': '693,169', '2023': '702,696', '2024': '725,298' },
        },
        {
          label: '지하도',
          unit: 'ton',
          values: { '2022': '-', '2023': '-', '2024': '-' },
        },
        {
          label: '담수(호수, 강 등)',
          unit: 'ton',
          values: { '2022': '-', '2023': '-', '2024': '-' },
        },
        {
          label: '합계',
          unit: 'ton',
          values: { '2022': '693,169', '2023': '702,696', '2024': '725,298' },
        },
        {
          label: '원단위',
          unit: 'ton/억 원',
          values: { '2022': '42.67', '2023': '41.77', '2024': '44.03' },
        },
      ],
    },
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
                <h2 className="text-center">환경경영방침</h2>
                <p className="mt-6 text-center body1 max-w-[860px] mx-auto tracking-[-1%]" >SPC삼립은 환경경영 성과의 지속적인 향상을 목표로 명확한 환경 방침을 수립하여 전사적으로 운영하고 있으며, 모든 경영 활동에서 환경 관련 법규와 규정을 철저히 준수하고 있습니다. </p>

                <section className='max-w-[1180px] w-full mx-auto lg:mt-[54px] mt-[24px] flex justify-center'>
                    <MotionBox type="fadeUp">
                        <ClickableImage src="/img/environment_01.png" alt="environment_01.png" className='mx-auto w-full h-full lg:w-auto' showButton={true} />
                    </MotionBox>
                </section>
            </div>
            );
        case 1:
            return (
            <div>
              
                <h2 className="text-center">환경경영조직</h2>
                <p className="mt-6 text-center body1  mx-auto tracking-[-1%]" >SPC삼립은 대표이사를 환경경영 관리 조직의 최고 책임자로 하며 환경 · 안전 · 보건 <br className='hidden lg:block' /> 총괄 책임자(CSO)를 두어 환경경영을 체계적으로 관리하고 있습니다. </p>
                <section className='max-w-[1180px] w-full mx-auto lg:mt-[54px] mt-[24px] flex'>
                    <MotionBox type="fadeUp">
                        <ClickableImage src="/img/environment_02_pc.png" alt="sustainability_02" className='hidden w-full h-full lg:block' />
                        {/* <img src="/img/environment_02_mo.png" alt="sustainability_02" className='block w-full h-full lg:hidden' /> */}
                        <ClickableImage src="/img/environment_02_mo.png" alt="sustainability_02" className='block w-full h-full lg:hidden'  />
                    </MotionBox>
                </section>
            </div>
            );
        case 2:
            return (
                <div className='max-w-[1180px] w-full mx-auto'>
                    <h2 className="text-center">환경정량데이터</h2>
                    <p className="px-5 mt-6 text-center body1">SPC삼립은 전사적인 환경 성과 향상을 비전으로 설정하고 친환경 경영을 실천해 나가고 있습니다. <br className='hidden lg:block' /> 온실가스, 에너지, 폐기물, 용수 등 주요 환경 관리 분야별로 사업 활동에 따른 환경 영향을 최소화하고 <br className='hidden lg:block' /> 자원순환 강화를 위해 적극 노력하고 있습니다.</p>
                    
                    <section className='pl-5 mt-[20px] lg:mt-[50px] flex flex-col gap-6 lg:gap-[50px]'>
                    {envQuantTableItems.map((table) => (
                        <MotionBox key={table.id} type="fadeUp">
                            <div>
                                <span className='text-[10px] block lg:text-[18px] text-grayTxt pb-[6px] lg:pb-[12px]'>
                                    {table.rangeText}
                                </span>
                                <div className='overflow-x-auto pr-5 lg:pr-0'>
                                    <table className='px-5 table-container env scrollbar-thin'>
                                        <thead>
                                            <tr>
                                                <th colSpan={2}>{table.headerTitle}</th>
                                                <th>{table.unitHeader ?? '단위'}</th>
                                                {envQuantYears.map((year) => (
                                                    <th key={year}>{year}</th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {table.rows.map((row, rowIndex) => (
                                                <tr key={`${table.id}-${row.label}`}>
                                                    {rowIndex === 0 && (
                                                        <td
                                                            rowSpan={table.rows.length}
                                                            className='!font-bold'
                                                        >
                                                            {table.rowGroupTitle}
                                                        </td>
                                                    )}
                                                    <td>{row.label}</td>
                                                    <td>{row.unit}</td>
                                                    {envQuantYears.map((year) => (
                                                        <td key={year}>{row.values[year]}</td>
                                                    ))}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </MotionBox>
                    ))}
                    </section>
                </div>
            )   ;
        default:
            return null;
    }
  };
    
  return (
    <main>
    <BackImgBox label='환경' imageSrc='/img/environment.png' />
    <Tab 
      items={tabItems}
      activeIndex={activeTabIndex}
      onTabClick={handleTabClick}
    />
    {/* 탭 클릭 시 변경되는 컨텐츠 영역 */}
    <div
      ref={contentRef}
      className={`${activeTabIndex === 2 ? 'px-0' : 'px-4'} pt-[40px] lg:pt-[100px] pb-[70px] lg:pb-[200px]`}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTabIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          {renderContent()}
        </motion.div>
      </AnimatePresence>
    </div>
  </main>
  );
};

export default Environment;
