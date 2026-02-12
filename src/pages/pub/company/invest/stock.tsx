import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {useRouter} from 'next/router';
import { AnimatePresence, motion } from 'framer-motion';
import BackImgBox from '@/components/pub/BackImgBox';
import { Icon } from '@/components/pub/icons';
import { MotionBox } from '@/components/pub/interAtion/MotionBox';
import Tab from '@/components/pub/tab';
import { useQueryTab } from '@/hooks/useQueryTab';

const Stock = () => {
  const router = useRouter();
  const tabItems = ['주가정보', '배당정보', '공고'];
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [stockData, setStockData] = useState<{
    code: string;
    currentPrice: string;
    change: string;
    changePercent: string;
    date: string;
    open: string;
    high: string;
    low: string;
    volume: string;
    trend: 'up' | 'down' | 'flat';
  } | null>(null);
  const [stockLoading, setStockLoading] = useState(false);
  const [announcements, setAnnouncements] = useState<
    { id: number; title: string; createdAt: string; viewCount: number }[]
  >([]);
  const [announcementPage, setAnnouncementPage] = useState(1);
  const [announcementTotalCount, setAnnouncementTotalCount] = useState(0);
  const [announcementLoading, setAnnouncementLoading] = useState(false);
  const announcementLimit = 8; // backend limit

  // 프론트 단독 작업용 더미 데이터 (API 실패 시 fallback)
  const dummyStockData = useMemo(() => {
    const clpr = 62000;
    const vs = 1200;
    const fltRt = 1.97;

    return {
      code: 'SPC삼립 (005610 코스피)',
      currentPrice: clpr.toLocaleString(),
      change: `+${vs.toLocaleString()}`,
      changePercent: `(+${fltRt.toFixed(2)}%)`,
      date: '2025.03.26',
      open: '61,500',
      high: '62,400',
      low: '60,800',
      volume: '2,345백만',
      trend: 'up' as const,
    };
  }, []);

  const dummyAnnouncements = useMemo(
    () =>
      [
        {
          id: 1,
          title: '57기 결산공고',
          createdAt: '2025-03-26',
          viewCount: 124,
        },
        {
          id: 2,
          title: '주주총회 소집 공고',
          createdAt: '2025-02-10',
          viewCount: 98,
        },
        {
          id: 3,
          title: '전자증권 전환 공고',
          createdAt: '2025-01-03',
          viewCount: 55,
        },
      ],
    []
  );
  
  const [activeTabIndex, setActiveTabIndex] = useQueryTab(tabItems, {
    queryParamKey: 'Tab',
    useIndexAsValue: false,
    defaultIndex: 0,
  });

  const handleTabClick = (index: number) => {
    setActiveTabIndex(index);
  };

  const fetchAnnouncements = useCallback((pageNum: number = 1) => {
    setAnnouncementLoading(true);

    // 프론트 단독: 더미 데이터만 사용
    setAnnouncements(dummyAnnouncements);
    setAnnouncementTotalCount(dummyAnnouncements.length);
    setAnnouncementPage(pageNum);

    setAnnouncementLoading(false);
  }, [dummyAnnouncements]);

  const fetchStockInfo = useCallback(() => {
    setStockLoading(true);

    // 프론트 단독: 더미 데이터만 사용
    setStockData(dummyStockData);

    setStockLoading(false);
  }, [dummyStockData]);

  useEffect(() => {
    fetchStockInfo();
    if (activeTabIndex === 2) {
      fetchAnnouncements(1);
    }
  }, [activeTabIndex, fetchAnnouncements, fetchStockInfo]);

  const announcementTotalPages = useMemo(
    () => Math.max(1, Math.ceil(announcementTotalCount / announcementLimit)),
    [announcementTotalCount, announcementLimit]
  );
  const announcementPaginationPages = useMemo(() => {
    const start = Math.max(1, announcementPage - 2);
    const end = Math.min(announcementTotalPages, start + 4);
    return Array.from({ length: end - start + 1 }, (_, idx) => start + idx);
  }, [announcementPage, announcementTotalPages]);

  // 배당정보 데이터
  const dividendData = [
    {
      year: '2020',
      totalAmount: '14,589',
      type: '현금배당',
      majorShareholder: { perShare: '1,800', yield: '3.6%' },
      minorShareholder: { perShare: '1,800', yield: '3.6%' },
      payoutRatio: '16.9%',
    },
    {
      year: '2021',
      totalAmount: '13,779',
      type: '현금배당',
      majorShareholder: { perShare: '1,700', yield: '2.7%' },
      minorShareholder: { perShare: '1,700', yield: '2.7%' },
      payoutRatio: '27.4%',
    },
    {
      year: '2022',
      totalAmount: '13,770',
      type: '현금배당',
      majorShareholder: { perShare: '1,700', yield: '2.3%' },
      minorShareholder: { perShare: '1,700', yield: '2.3%' },
      payoutRatio: '25.9%',
    },
    {
      year: '2023',
      totalAmount: '8,983',
      type: '현금배당',
      majorShareholder: { perShare: '1,000', yield: '1.4%' },
      minorShareholder: { perShare: '1,500', yield: '2.1%' },
      payoutRatio: '22.2%',
    },
    {
      year: '2024',
      totalAmount: '5,900',
      type: '현금배당',
      majorShareholder: { perShare: '624', yield: '0.9%' },
      minorShareholder: { perShare: '1,104', yield: '1.6%' },
      payoutRatio: '-47.7%',
    },
  ];

  const renderContent = () => {
    switch (activeTabIndex) {
      case 0: // 실시간 주가정보
        return (
          <div>
            <MotionBox>
                <h3 className="mb-5 text-[22px] text-center lg:text-[42px] font-extrabold leading-[1.3] tracking-[-0.66px] lg:tracking-[-1.5px] lg:mb-16">주가정보</h3>
                
                {stockLoading ? (
                  <div className="py-6 text-sm text-center text-gray-600">불러오는 중...</div>
                ) : !stockData ? (
                  <div className="py-6 text-sm text-center text-gray-600">주가 정보를 불러오지 못했습니다.</div>
                ) : (
                  <>
                    {/* card */}
                    <div className="flex flex-col gap-1 border border-gray-200 py-5 px-8 mb-2 *:text-center *:lg:text-left lg:p-14 lg:gap-4 lg:mb-5">
                      <p className="text-[16px] lg:text-[36px] font-extrabold leading-[1.6] tracking-[-0.45px] lg:tracking-[-0.66px]">
                        {stockData.code}
                      </p>
                      <div className="flex gap-1 justify-center items-center lg:gap-7 lg:justify-start">
                     
                            <p className="text-[14px] lg:text-[22px] leading-[1.6] tracking-[-0.45px] lg:tracking-[-0.66px]">
                            전일대비
                            </p>
                            <div className="flex gap-0.5 lg:gap-2 items-center">
                            <Icon
                            name="arrowUpdown"
                            size={16}
                            className={`lg:size-6 *:fill-current mt-1 ${
                                stockData.trend === 'down' ? 'rotate-180 text-[#0066cc]' : stockData.trend === 'up' ? 'text-samlipRed' : 'text-gray-500'
                            }`}
                            />
                        <p
                          className={`text-[14px] lg:text-[22px] font-semibold leading-[1.6] tracking-[-0.45px] lg:tracking-[-0.66px] ${
                            stockData.trend === 'down'
                              ? 'text-[#0066cc]'
                              : stockData.trend === 'up'
                                ? 'text-samlipRed'
                                : 'text-samlipRed'
                          }`}
                        >
                          {stockData.change}
                        </p>
                        <p
                          className={`text-[14px] lg:text-[22px] font-semibold leading-[1.6] tracking-[-0.45px] lg:tracking-[-0.66px] ${
                            stockData.trend === 'down'
                              ? 'text-[#0066cc]'
                              : stockData.trend === 'up'
                                ? 'text-samlipRed'
                                : 'text-samlipRed'
                          }`}
                        >
                          {stockData.changePercent}
                        </p>
                        </div>
                      </div>
                      
                      <div className="flex-row-reverse justify-between items-end lg:flex lg:mt-20">
                        <p
                          className={`text-[56px] my-3 font-[900] lg:text-[130px] lg:my-0  leading-[1.1] tracking-[-0.96px] lg:tracking-[-3.9px] ${
                            stockData.trend === 'down'
                              ? 'text-[#0066cc]'
                              : stockData.trend === 'up'
                                ? 'text-samlipRed'
                                : 'text-samlipRed'
                          }`}
                        >
                          {stockData.currentPrice}
                        </p>
                        
                        <p className="text-gray-600 text-[12px] lg:text-[16px] leading-[1.6] tracking-[-0.39px] lg:tracking-[-0.54px] lg:mb-3">
                          {stockData.date}
                        </p>
                      </div>
                    </div>
                
                    {/* 시가/저가/고가/거래대금 */}
                    <div className="grid grid-cols-2 gap-2 lg:gap-2 *:text-center">
                      <div className="flex flex-col gap-1 p-3 bg-[#F7F7F7] lg:p-11 lg:flex-row lg:justify-between items-center">
                        <p className="text-gray-500 text-[14px] lg:text-[22px] leading-[1.6] tracking-[-0.39px] lg:tracking-[-0.54px] lg:min-w-[80px] lg:text-left">
                          시가
                        </p>
                        <p className="text-[18px] lg:text-[36px] font-extrabold leading-[1.6] tracking-[-0.45px] lg:tracking-[-0.66px] lg:w-full">
                          {stockData.open}
                        </p>
                      </div>
                      
                      <div className="flex flex-col gap-1 p-3 bg-[#F7F7F7] lg:p-11 lg:flex-row lg:justify-between items-center">
                        <p className="text-gray-500 text-[14px] lg:text-[22px] leading-[1.6] tracking-[-0.39px] lg:tracking-[-0.54px] lg:min-w-[80px] lg:text-left">
                          저가
                        </p>
                        <p className="text-[18px] lg:text-[36px] font-extrabold leading-[1.6] tracking-[-0.45px] lg:tracking-[-0.66px] lg:w-full">
                          {stockData.low}
                        </p>
                      </div>
                      
                      <div className="flex flex-col gap-1 p-3 bg-[#F7F7F7] lg:p-11 lg:flex-row lg:justify-between items-center">
                        <p className="text-gray-500 text-[14px] lg:text-[22px] leading-[1.6] tracking-[-0.39px] lg:tracking-[-0.54px] lg:min-w-[80px] lg:text-left">
                          고가
                        </p>
                        <p className="text-[18px] lg:text-[36px] font-extrabold leading-[1.6] tracking-[-0.45px] lg:tracking-[-0.66px] lg:w-full">
                          {stockData.high}
                        </p>
                      </div>
                      
                      <div className="flex flex-col gap-1 p-3 bg-[#F7F7F7] lg:p-11 lg:flex-row lg:justify-between items-center">
                        <p className="text-gray-500 text-[14px] lg:text-[22px] leading-[1.6] tracking-[-0.39px] lg:tracking-[-0.54px] lg:min-w-[80px] lg:text-left">
                          거래대금
                        </p>
                        <p className="text-[18px] lg:text-[36px] font-extrabold leading-[1.6] tracking-[-0.45px] lg:tracking-[-0.66px] lg:w-full">
                          {stockData.volume}
                        </p>
                      </div>
                    
                    </div>
                  </>
                )}
            </MotionBox>
          </div>
        );

      case 1: // 배당정보
        return (
          <MotionBox>
              <h3 className="mb-5 text-[22px] text-center lg:text-[42px] font-extrabold leading-[1.3] tracking-[-0.66px] lg:tracking-[-1.5px] lg:mb-16 px-5">배당정보</h3>
                
              <div className="overflow-x-auto pr-5 lg:pr-0 scrollbar-thin scrollbar-color-gray-500-transparent">
                <table className="pr-5 w-full border border-gray-200">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="p-2 lg:p-4 text-center text-[11px] lg:text-[18px] font-bold bg-[#930000] text-white">
                        구분
                      </th>
                      {dividendData.map((item) => (
                        <th key={item.year} className="p-2 px-6 lg:p-4 text-center text-[11px] lg:text-[18px] font-bold bg-[#930000] text-white">
                          {item.year}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="*:whitespace-nowrap">
                    <tr className="border-b border-gray-200">
                      <td className="p-2 px-10 lg:p-4 lg:py-9 text-[11px] font-bold  text-center lg:text-[18px]">
                        배당총액(백만원)
                      </td>
                      {dividendData.map((item) => (
                        <td key={item.year} className="p-2 border-l border-gray-200 lg:p-4 lg:py-9 text-center text-[11px] lg:text-[18px]">
                          {item.totalAmount}
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="p-2 lg:p-4 lg:py-9 text-[11px] font-bold  text-center lg:text-[18px]">
                        배당종류
                      </td>
                      {dividendData.map((item) => (
                        <td key={item.year} className="p-2 border-l border-gray-200 lg:p-4 lg:py-9 text-center text-[11px] lg:text-[18px]">
                          {item.type}
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="p-2 lg:p-4 lg:py-9 text-[11px] font-bold  text-center lg:text-[18px] whitespace-nowrap">
                        주당 배당금_대주주(원)
                      </td>
                      {dividendData.map((item) => (
                        <td key={item.year} className="p-2 border-l border-gray-200 lg:p-4 lg:py-9 text-center text-[11px] lg:text-[18px] ">
                          {item.majorShareholder.perShare}
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="p-2 lg:p-4 lg:py-9 text-[11px] font-bold text-center lg:text-[18px]">
                        주당 배당금_소액주주(원)
                      </td>
                      {dividendData.map((item) => (
                        <td key={item.year} className="p-2 border-l border-gray-200 lg:p-4 lg:py-9 text-center text-[11px] lg:text-[18px]">
                          {item.minorShareholder?.perShare || '-'}
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="p-2 lg:p-4 lg:py-9 text-[11px] font-bold text-center lg:text-[18px]">
                        배당성향
                      </td>
                      {dividendData.map((item) => (
                        <td key={item.year} className="p-2 border-l border-gray-200 lg:p-4 lg:py-9 text-center text-[11px] lg:text-[18px]">
                          {item.payoutRatio}
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="p-2 lg:p-4 lg:py-9 text-[11px] font-bold  text-center lg:text-[18px]">
                        배당수익률_대주주(%)
                      </td>
                      {dividendData.map((item) => (
                        <td key={item.year} className="p-2 border-l border-gray-200 lg:p-4 lg:py-9 text-center text-[11px] lg:text-[18px]">
                          {item.majorShareholder.yield}
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="p-2 lg:p-4 lg:py-9 text-[11px] font-bold text-center lg:text-[18px]">
                        배당수익률_소액주주(%)
                      </td>
                      {dividendData.map((item) => (
                        <td key={item.year} className="p-2 border-l border-gray-200 lg:p-4 lg:py-9 text-center text-[11px] lg:text-[18px]">
                          {item.minorShareholder?.yield || '-'}
                        </td>
                      ))}
                    </tr>
                    
                  </tbody>
                </table>
              </div>
          </MotionBox>
        );

      case 2: // 공고자료
        return (
          <MotionBox>
              <h3 className="mb-5 text-[22px] text-center lg:text-[42px] font-extrabold leading-[1.3] tracking-[-0.66px] lg:tracking-[-1.5px] lg:mb-16">공고</h3>
              {/* 테이블 */}
              <div className="grid grid-cols-[1fr_100px_80px] lg:grid-cols-[1fr_196px_198px] border-t-gray-900 border-t border-b border-b-gray-900">
                <div className="py-2 px-4 text-[11px] font-semibold lg:px-6 lg:py-4 lg:text-[18px]">제목</div>
                <div className="py-2 px-4 text-[11px] font-semibold lg:px-6 lg:py-4 lg:text-[18px] text-center">등록일</div>
                <div className="py-2 px-4 text-[11px] font-semibold lg:px-6 lg:py-4 lg:text-[18px] text-center">조회수</div>
              </div>
              {announcementLoading ? (
                <div className="py-6 text-sm text-center text-gray-600 lg:text-base">불러오는 중...</div>
              ) : announcements.length === 0 ? (
                <div className="py-6 text-sm text-center text-gray-600 lg:text-base">등록된 공고가 없습니다.</div>
              ) : (
                <>
                  {announcements.map((announcement) => (
                    <div
                      key={announcement.id}
                      className="grid grid-cols-[1fr_100px_80px] lg:grid-cols-[1fr_196px_198px] border-b border-gray-200 *:cursor-pointer hover:bg-lightCream transition-colors"
                      onClick={() => router.push(`/pub/company/invest/stock/${announcement.id}`)}
                    >
                      <div className="py-3 px-4 text-[11px] text-ellipsis overflow-hidden whitespace-nowrap lg:px-6 lg:py-6 lg:text-[18px]">
                        {announcement.title}
                      </div>
                      <div className="py-3 px-4 text-[11px] lg:px-6 lg:py-6 lg:text-[18px] text-center">
                        {announcement.createdAt}
                      </div>
                      <div className="py-3 px-4 text-[11px] lg:px-6 lg:py-6 lg:text-[18px] text-center">
                        {announcement.viewCount ?? 0}
                      </div>
                    </div>
                  ))}

                  <div className="flex justify-center mt-4 lg:mt-8">
                    <div className="flex gap-2 items-center lg:gap-4">
                      <button
                        className="w-6 h-6 text-sm font-semibold transition-colors lg:text-lg lg:w-8 lg:h-8 disabled:opacity-40 hover:bg-samlipRed hover:text-white"
                        disabled={announcementPage === 1}
                        onClick={() => fetchAnnouncements(announcementPage - 1)}
                      >
                        {'<'}
                      </button>
                      {announcementPaginationPages.map((pageNum) => (
                        <button
                          key={pageNum}
                          className={`w-6 h-6 text-sm lg:text-lg lg:w-8 lg:h-8 font-semibold transition-colors ${
                            pageNum === announcementPage
                              ? 'bg-samlipRed text-white'
                              : 'hover:bg-samlipRed hover:text-white'
                          }`}
                          onClick={() => fetchAnnouncements(pageNum)}
                        >
                          {pageNum}
                        </button>
                      ))}
                      <button
                        className="w-6 h-6 text-sm font-semibold transition-colors lg:text-lg lg:w-8 lg:h-8 disabled:opacity-40 hover:bg-samlipRed hover:text-white"
                        disabled={announcementPage === announcementTotalPages}
                        onClick={() => fetchAnnouncements(announcementPage + 1)}
                      >
                        {'>'}
                      </button>
                    </div>
                  </div>
                </>
              )}
          </MotionBox>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <BackImgBox
        label="주식정보"
        imageSrc="/img/invest_cover.png"
      />
      <Tab 
        items={tabItems}
        activeIndex={activeTabIndex}
        onTabClick={handleTabClick}
        queryParamKey="tab"
        useIndexAsValue={false}
        />
      <div
        ref={contentRef}
        className="mx-auto w-full max-w-[1180px] lg:px-0 pt-[40px] lg:pt-[100px] pb-[70px] lg:pb-[200px]"
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
      
    </>
  );
};

export default Stock;
