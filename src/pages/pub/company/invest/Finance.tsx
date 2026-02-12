import Tab from '@/components/pub/tab';
import { useQueryTab } from '@/hooks/useQueryTab';
import { AnimatePresence, motion } from 'framer-motion';
import { MotionBox } from '@/components/pub/interAtion/MotionBox';
import BackImgBox from '@/components/pub/BackImgBox';
import { useRef } from 'react';

const Finance = () => {
  const tabItems = ['연결손익계산서', '연결재무상태표', '연결현금흐름표'];
  const contentRef = useRef<HTMLDivElement | null>(null);
  
  const [activeTabIndex, setActiveTabIndex] = useQueryTab(tabItems, {
    queryParamKey: 'Tab',
    useIndexAsValue: false,
    defaultIndex: 0,
  });

  const handleTabClick = (index: number) => {
    setActiveTabIndex(index);
  };

  // 연결손익계산서 데이터
  const incomeStatementData = [
    { item: '매출액', '2022': '33,145.5', '2023': '34,333.2', '2024': '34,279.2' },
    { item: '매출총이익', '2022': '5,203.9', '2023': '5,341.9', '2024': '5,420.2' },
    { item: '영업이익', '2022': '895.1', '2023': '917.3', '2024': '949.7' },
    { item: '당기순이익', '2022': '532.4', '2023': '502.3', '2024': '864.9' },
  ];

  // 연결재무상태표 데이터
  const balanceSheetData = [
    { item: '유동자산', '2022': '5,395.2', '2023': '5,859.3', '2024': '5,538.3' },
    { item: '비유동자산', '2022': '7,558.8', '2023': '7,078.0', '2024': '6,869.7' },
    { item: '자산총계', '2022': '12,953.9', '2023': '12,937.3', '2024': '12,407.9' },

    { item: '유동부채', '2022': '6,494.8', '2023': '6,834.7', '2024': '5,253.1' },
    { item: '비유동부채', '2022': '2,568.1', '2023': '1,912.5', '2024': '2,356.5' },
    { item: '부채총계', '2022': '9,062.9', '2023': '8,747.2', '2024': '7,609.7' },

    { item: '자본금', '2022': '431.5', '2023': '431.5', '2024': '431.5' },
    { item: '이익잉여금', '2022': '3,642.6', '2023': '3,962.3', '2024': '4,626.2' },
    { item: '자본총계', '2022': '3,891.1', '2023': '4,190.1', '2024': '4,798.3' },
  ];

  // 연결현금흐름표 데이터
  const cashFlowData = [
    { item: '영업활동현금흐름', '2022': '477.6', '2023': '1,230.4', '2024': '2,578.8' },
    { item: '투자활동현금흐름', '2022': '(354.1)', '2023': '(504.6)', '2024': '(491.8)' },
    { item: '재무활동현금흐름', '2022': '(123.0)', '2023': '(723.4)', '2024': '(1,757.8)' },
    { item: '현금 및 현금성자산의 순증가', '2022': '0.45', '2023': '2.4', '2024': '329.2' },
    { item: '기초 현금 및 현금성자산', '2022': '53.1', '2023': '60.4', '2024': '62.6' },
    { item: '기말 현금 및 현금성자산', '2022': '60.4', '2023': '62.6', '2024': '393.0' },
  ];

  const renderContent = () => {
    switch (activeTabIndex) {
      case 0: // 연결손익계산서
        return (
          <MotionBox>
              <h3 className="mb-5 text-[22px] text-center lg:text-[42px] font-extrabold leading-[1.3] tracking-[-0.66px] lg:tracking-[-1.5px] lg:mb-16">연결손익계산서</h3>
              
              {/* 차트 */}
              <div className="flex flex-col gap-4 mb-8 lg:flex-row lg:mb-16 lg:gap-5">
                
                {/* 매출액 차트 */}
                <div className="w-full  lg:h-[100%] lg:w-1/2 border border-line2 bg-white py-6 px-6 pb-[44px] lg:py-8 lg:px-8 lg:pb-[52px]">
                  <div className="flex gap-2 justify-start items-end mb-[28px]  lg:gap-3 lg:mb-12">
                    <p className="text-[16px] lg:text-[20px] font-bold leading-[1.6] tracking-[-0.45px] lg:tracking-[-0.66px]">
                      매출액
                    </p>
                    <p className="text-[12px] lg:text-[16px] text-gray-500 leading-[1.6] tracking-[-0.39px] lg:tracking-[-0.54px]">
                      (단위 : 억원)
                    </p>
                  </div>
                  
                  {/* Y축 라벨 + 그래프 영역 */}
                  <div className="flex h-[160px] lg:h-[300px]">
                    {/* Y축 라벨 */}
                    <div className="flex flex-col justify-between text-[10px] lg:text-[15px] text-gray-500 mr-3 pt-[30px] lg:pt-[46px]">
                      <span>34,000</span>
                      <span>33,000</span>
                      <span>32,000</span>
                      <span className='text-transparent'>31,000</span>
                    </div>

                    {/* 그래프 영역 */}
                    <div className="flex relative flex-1 items-end">
                      {/* 가로 그리드 라인 */}
                      <div className="flex absolute inset-y-0 right-0 left-0 top-2 bottom-2 flex-col justify-between pointer-events-none pt-[28px] lg:pt-[48px]">
                        <div className="h-px bg-gray-200" />
                        <div className="h-px bg-gray-200" />
                        <div className="h-px bg-gray-200" />
                        <div className="h-px bg-gray-200" />
                      </div>

                      {/* 바 차트 */}
                      <div className="relative z-10 flex w-[75%] h-full justify-between items-end gap-8 mb-[-20px] mx-auto lg:mb-[-28px]">
                        {/* 1번째 막대 */}
                        <div className="flex flex-col gap-3 justify-end w-full h-full lg:gap-3">
                          <div className="w-[30px] lg:w-[60px] mx-auto bg-[#D9D9D9]  h-full max-h-[89px] lg:max-h-[178px]" />
                          <p className="text-center text-[10px] lg:text-[16px]">2022</p>
                        </div>

                        {/* 2번째 막대 */}
                        <div className="flex flex-col gap-3 justify-end w-full h-full lg:gap-3">
                          <div className="w-[30px] lg:w-[60px] mx-auto bg-[#D9D9D9] h-full max-h-[127px] lg:max-h-[255px]" />
                          <p className="text-center text-[10px] lg:text-[16px]">2023</p>
                        </div>

                        {/* 3번째 막대 (현재가, 빨간색) */}
                        <div className="flex flex-col gap-[10px] justify-end w-full h-full lg:gap-3 ">
                          <div className="w-[30px] lg:w-[60px] mx-auto bg-[#F40202] h-full max-h-[124px] lg:max-h-[248px]" />
                          <p className="text-center font-bold text-[12px] lg:text-[16px]">2024</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* 영업이익 차트 */}
                <div className="w-full lg:w-1/2 border border-line2 bg-white py-6 px-6 pb-[44px] lg:py-8 lg:px-8 lg:pb-[52px]">
                  <div className="flex gap-2 justify-start items-end mb-[28px] lg:gap-3 lg:mb-12">
                    <p className="text-[16px] lg:text-[20px] font-bold leading-[1.6] tracking-[-0.45px] lg:tracking-[-0.66px]">
                      영업이익
                    </p>
                    <p className="text-[12px] lg:text-[16px] text-gray-500 leading-[1.6] tracking-[-0.39px] lg:tracking-[-0.54px]">
                      (단위 : 억원)
                    </p>
                  </div>
                  
                  {/* Y축 라벨 + 그래프 영역 */}
                  <div className="flex h-[150px] lg:h-[300px]">
                    {/* Y축 라벨 */}
                    <div className="flex flex-col justify-between text-[10px] lg:text-[15px] text-gray-500 mr-3 pt-[16px] lg:pt-[50px]">
                      <span>950</span>
                      <span>900</span>
                      <span>850</span>
                      <span className='text-transparent'>800</span>
                    </div>

                    {/* 그래프 영역 */}
                    <div className="flex relative flex-1 items-end">
                      {/* 가로 그리드 라인 */}
                      <div className="flex absolute inset-y-0 right-0 left-0 top-2 bottom-2 flex-col justify-between pointer-events-none pt-[14px] lg:pt-[50px]">
                        <div className="h-px bg-gray-200" />
                        <div className="h-px bg-gray-200" />
                        <div className="h-px bg-gray-200" />
                        <div className="h-px bg-gray-200" />
                      </div>

                      {/* 바 차트 */}
                      <div className="relative z-10 flex w-[75%] h-full justify-between items-end gap-8 mb-[-18px] mx-auto lg:mb-[-28px]">
                        {/* 1번째 막대 */}
                        <div className="flex flex-col gap-2 justify-end w-full h-full lg:gap-3">
                          <div className="w-[30px] lg:w-[60px] mx-auto bg-[#D9D9D9] h-full max-h-[70px] lg:max-h-[145px]" />
                          <p className="text-center text-[12px] lg:text-[16px]">2023</p>
                        </div>

                        {/* 2번째 막대 */}
                        <div className="flex flex-col gap-2 justify-end w-full h-full lg:gap-3">
                          <div className="w-[30px] lg:w-[60px] mx-auto bg-[#D9D9D9] h-full max-h-[87px] lg:max-h-[175px]" />
                          <p className="text-center text-[12px] lg:text-[16px]">2023</p>
                        </div>

                        {/* 3번째 막대 (현재가, 빨간색) */}
                        <div className="flex flex-col gap-2 justify-end w-full h-full lg:gap-3">
                          <div className="w-[30px] lg:w-[60px] mx-auto bg-[#F40202] h-full max-h-[116px] lg:max-h-[228px]" />
                          <p className="text-center font-bold text-[12px] lg:text-[16px]">2024</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* 테이블 */}
              <div className="overflow-x-auto">
                <table className="w-full bg-white border border-line2">
                  <thead>
                    <tr className="border-b">
                      <th className="p-2 lg:p-4 text-center text-[11px] lg:text-[18px] font-bold bg-[#930000] text-white">
                        재무항목
                      </th>
                      <th className="p-2 lg:p-4 text-center text-[11px] lg:text-[18px] font-bold bg-[#930000] text-white">
                        2022년
                      </th>
                      <th className="p-2 lg:p-4 text-center text-[11px] lg:text-[18px] font-bold bg-[#930000] text-white">
                        2023년
                      </th>
                      <th className="p-2 lg:p-4 text-center text-[11px] lg:text-[18px] font-bold bg-[#930000] text-white">
                        2024년
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {incomeStatementData.map((row, index) => (
                      <tr key={index} className="border-b *:border-r">
                        <td className="p-2 px-3 lg:p-4 lg:py-9 text-[11px] text-center font-bold lg:text-[18px]">
                          {row.item}
                        </td>
                        <td className="p-2 px-3 lg:p-4 lg:py-9 text-[11px] text-center lg:text-[18px]">
                          {row['2022']}
                        </td>
                        <td className="p-2 px-3 lg:p-4 lg:py-9 text-[11px] text-center lg:text-[18px]">
                          {row['2023']}
                        </td>
                        <td className="p-2 px-3 lg:p-4 lg:py-9 text-[11px] text-center lg:text-[18px]">
                          {row['2024']}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className="text-[11px] text-gray-500 mt-2 pl-1 lg:pr-1 lg:mt-3 lg:text-[16px] lg:text-right">(단위 :억원)</p>
              </div>
          </MotionBox>
        );

      case 1: // 연결재무상태표
        return (
          <MotionBox>
              <h3 className="mb-5 text-[22px] text-center lg:text-[42px] font-extrabold leading-[1.3] tracking-[-0.66px] lg:tracking-[-1.5px] lg:mb-16">연결재무상태표</h3>
              
               {/* 차트 */}
              <div className="flex flex-col gap-4 mb-8 lg:flex-row lg:mb-16 lg:gap-5">
                
                {/* 자산총계 차트 */}
                <div className="w-full h-[100%] lg:w-1/2 border border-line2 bg-white py-6 px-8 pb-[44px] lg:py-8 lg:px-8 lg:pb-[52px]">
                  <div className="flex gap-2 justify-start items-end mb-[20px] lg:gap-3 lg:mb-12">
                    <p className="text-[16px] lg:text-[20px] font-bold leading-[1.6] tracking-[-0.45px] lg:tracking-[-0.66px]">
                      자산총계
                    </p>
                    <p className="text-[12px] lg:text-[16px] text-gray-500 leading-[1.6] tracking-[-0.39px] lg:tracking-[-0.54px]">
                      (단위 : 억원)
                    </p>
                  </div>
                  
                  {/* Y축 라벨 + 그래프 영역 */}
                  <div className="flex lg:h-[300px] h-[150px]">
                    {/* Y축 라벨 */}
                    <div className="flex flex-col justify-between text-[10px] text-gray-500 mr-3 lg:pt-[50px] pt-[14px]">
                      <span>13,500</span>
                      <span>13,000</span>
                      <span>12,500</span>
                      <span className='text-transparent'>12,000</span>
                    </div>

                    {/* 그래프 영역 */}
                    <div className="flex relative flex-1 items-end">
                      {/* 가로 그리드 라인 */}
                      <div className="flex absolute inset-y-0 right-0 left-0 top-2 bottom-2 flex-col justify-between pointer-events-none lg:pt-[50px] pt-[16px]">
                        <div className="h-px bg-gray-200" />
                        <div className="h-px bg-gray-200" />
                        <div className="h-px bg-gray-200" />
                        <div className="h-px bg-gray-200" />
                      </div>

                      {/* 바 차트 */}
                      <div className="relative z-10 flex w-[75%] h-full justify-between items-end gap-8 mb-[-20px] mx-auto lg:mb-[-28px]">
                        {/* 1번째 막대 */}
                        <div className="flex flex-col gap-2 justify-end w-full h-full lg:gap-3">
                          <div className="w-full bg-[#D9D9D9] h-full max-h-[76px] lg:max-h-[145px] mx-auto max-w-[30px] lg:max-w-[60px]" />
                          <p className="text-center text-[14px] lg:text-[16px]">2022</p>
                        </div>

                        {/* 2번째 막대 */}
                        <div className="flex flex-col gap-2 justify-end w-full h-full lg:gap-3">
                          <div className="w-full bg-[#D9D9D9] h-full max-h-[74px] lg:max-h-[175px] mx-auto max-w-[30px] lg:max-w-[60px]" />
                          <p className="text-center text-[14px] lg:text-[16px]">2023</p>
                        </div>

                        {/* 3번째 막대 (현재가, 빨간색) */}
                        <div className="flex flex-col gap-2 justify-end w-full h-full lg:gap-3">
                          <div className="w-full bg-[#F40202] h-full max-h-[36px] lg:max-h-[228px] mx-auto max-w-[30px] lg:max-w-[60px]" />
                          <p className="text-center font-bold text-[14px] lg:text-[16px]">2024</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* 부채비율 차트 */}
                <div className="w-full h-[100%] lg:w-1/2 border border-line2 bg-white py-6 px-6 pb-[44px] lg:py-8 lg:px-8 lg:pb-[52px]">
                  <div className="flex gap-2 justify-start items-end mb-[20px] lg:gap-3 lg:mb-12">
                    <p className="text-[16px] lg:text-[20px] font-bold leading-[1.6] tracking-[-0.45px] lg:tracking-[-0.66px]">부채비율</p>
                    <p className="text-[12px] lg:text-[16px] text-gray-500 leading-[1.6] tracking-[-0.39px] lg:tracking-[-0.54px]">(단위 : %)</p>
                  </div>
                  
                  {/* Y축 라벨 + 그래프 영역 */}
                  <div className="flex lg:h-[300px] h-[150px]">
                    {/* Y축 라벨 */}
                    <div className="flex flex-col justify-between text-[10px] text-gray-500 mr-3 lg:pt-[50px] pt-[16px]">
                      <span>250</span>
                      <span>200</span>
                      <span>150</span>
                      <span className='text-transparent'>100</span>
                    </div>

                    {/* 그래프 영역 */}
                    <div className="flex relative flex-1 items-end">
                      {/* 가로 그리드 라인 */}
                      <div className="flex absolute inset-y-0 right-0 left-0 top-2 bottom-2 flex-col justify-between pointer-events-none lg:pt-[50px] pt-[16px]">
                        <div className="h-px bg-gray-200" />
                        <div className="h-px bg-gray-200" />
                        <div className="h-px bg-gray-200" />
                        <div className="h-px bg-gray-200" />
                      </div>

                      {/* 바 차트 */}
                      <div className="relative z-10 flex w-[75%] h-full justify-between items-end gap-8 mb-[-18px] mx-auto lg:mb-[-28px]">
                        {/* 1번째 막대 */}
                        <div className="flex flex-col gap-2 justify-end w-full h-full lg:gap-3">
                          <div className="w-full bg-[#D9D9D9] h-full max-h-[104px] lg:max-h-[145px] mx-auto max-w-[30px] lg:max-w-[60px]" />
                          <p className="text-center text-[12px] lg:text-[16px]">2022</p>
                        </div>

                        {/* 2번째 막대 */}
                        <div className="flex flex-col gap-2 justify-end w-full h-full lg:gap-3">
                          <div className="w-full bg-[#D9D9D9] h-full max-h-[87px] lg:max-h-[175px] mx-auto max-w-[30px] lg:max-w-[60px]" />
                          <p className="text-center text-[12px] lg:text-[16px]">2023</p>
                        </div>

                        {/* 3번째 막대 (현재가, 빨간색) */}
                        <div className="flex flex-col gap-2 justify-end w-full h-full lg:gap-3">
                          <div className="w-full bg-[#F40202] h-full max-h-[48px] lg:max-h-[228px] mx-auto max-w-[30px] lg:max-w-[60px]" />
                          <p className="text-center font-bold text-[12px] lg:text-[16px]">2024</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              
              <div className="overflow-x-auto">
                <table className="w-full bg-white border border-line2">
                  <thead>
                    <tr className="border-b">
                      <th className="p-2 lg:p-4 text-center text-[11px] lg:text-[18px] font-bold bg-[#930000] text-white">
                        재무항목
                      </th>
                      <th className="p-2 lg:p-4 text-center text-[11px] lg:text-[18px] font-bold bg-[#930000] text-white">
                        2022년
                      </th>
                      <th className="p-2 lg:p-4 text-center text-[11px] lg:text-[18px] font-bold bg-[#930000] text-white">
                        2023년
                      </th>
                      <th className="p-2 lg:p-4 text-center text-[11px] lg:text-[18px] font-bold bg-[#930000] text-white">
                        2024년
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {balanceSheetData.map((row, index) => (
                      <tr key={index} className="border-b *:border-r">
                        <td className="p-2 px-3 lg:p-4 lg:py-9 text-[11px] text-center font-bold lg:text-[18px]">
                          {row.item}
                        </td>
                        <td className="p-2 px-3 lg:p-4 lg:py-9 text-[11px] text-center lg:text-[18px]">
                          {row['2022']}
                        </td>
                        <td className="p-2 px-3 lg:p-4 lg:py-9 text-[11px] text-center lg:text-[18px]">
                          {row['2023']}
                        </td>
                        <td className="p-2 px-3 lg:p-4 lg:py-9 text-[11px] text-center lg:text-[18px]">
                          {row['2024']}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className="text-[11px] text-gray-500 mt-2 pl-1 lg:pr-1 lg:mt-3 lg:text-[16px] lg:text-right">(단위 : 억원, 소숫점 이하 한 자리 반올림)</p>
              </div>
          </MotionBox>
        );

      case 2: // 연결현금흐름표
        return (
          <MotionBox>
            <h3 className="mb-5 text-[22px] text-center lg:text-[42px] font-extrabold leading-[1.3] tracking-[-0.66px] lg:tracking-[-1.5px] lg:mb-16">연결현금흐름표</h3>
            
            {/* 영업활동현금흐름 차트 */}
            <div className="w-full h-[100%] lg:w-1/2 border border-line2 bg-white py-6 px-6 pb-[44px] lg:py-8 lg:px-8 lg:pb-[52px] mx-auto mb-8 lg:mb-16">
              <div className="flex gap-2 justify-start items-end mb-[28px] lg:gap-3 lg:mb-12">
                <p className="text-[16px] lg:text-[20px] font-bold leading-[1.6] tracking-[-0.45px] lg:tracking-[-0.66px]">
                  영업활동현금흐름
                </p>
                <p className="text-[12px] lg:text-[16px] text-gray-500 leading-[1.6] tracking-[-0.39px] lg:tracking-[-0.54px]">
                  (단위 : 억원)
                </p>
              </div>
              
              {/* Y축 라벨 + 그래프 영역 */}
              <div className="flex h-[300px]">
                {/* Y축 라벨 */}
                <div className="flex flex-col justify-between text-[10px] text-gray-500 mr-3 pt-[24px]">
                  <span>2,500</span>
                  <span>2,000</span>
                  <span>1,500</span>
                  <span>1,000</span>
                  <span>500</span>
                </div>

                {/* 그래프 영역 */}
                <div className="flex relative flex-1 items-end">
                  {/* 가로 그리드 라인 */}
                  <div className="flex absolute inset-y-0 right-0 left-0 top-2 bottom-2 flex-col justify-between pointer-events-none pt-[20px]">
                    <div className="h-px bg-gray-200" />
                    <div className="h-px bg-gray-200" />
                    <div className="h-px bg-gray-200" />
                    <div className="h-px bg-gray-200" />
                    <div className="h-px bg-gray-200" />
                  </div>

                  {/* 바 차트 */}
                  <div className="relative z-10 flex w-[75%] h-full justify-between items-end gap-8 mb-[-20px] mx-auto lg:mb-[-28px]">
                    {/* 1번째 막대 */}
                    <div className="flex flex-col gap-2 justify-end w-full h-full lg:gap-3">
                      <div className="w-full bg-gray-300 h-[50%]" />
                      <p className="text-center text-[14px] lg:text-[16px]">2023</p>
                    </div>

                    {/* 2번째 막대 */}
                    <div className="flex flex-col gap-2 justify-end w-full h-full lg:gap-3">
                      <div className="w-full bg-gray-300 h-[80%]" />
                      <p className="text-center text-[14px] lg:text-[16px]">2023</p>
                    </div>

                    {/* 3번째 막대 (현재가, 빨간색) */}
                    <div className="flex flex-col gap-2 justify-end w-full h-full lg:gap-3">
                      <div className="w-full bg-[#F40202] h-full" />
                      <p className="text-center font-bold text-[14px] lg:text-[16px]">2024</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* 테이블 */}
            <div className="overflow-x-auto">
              <table className="w-full bg-white border border-line2">
                <thead>
                  <tr className="border-b">
                    <th className="p-2 lg:p-4 text-center text-[11px] lg:text-[18px] font-bold bg-[#930000] text-white">
                      재무항목
                    </th>
                    <th className="p-2 lg:p-4 text-center text-[11px] lg:text-[18px] font-bold bg-[#930000] text-white">
                      2022년
                    </th>
                    <th className="p-2 lg:p-4 text-center text-[11px] lg:text-[18px] font-bold bg-[#930000] text-white">
                      2023년
                    </th>
                    <th className="p-2 lg:p-4 text-center text-[11px] lg:text-[18px] font-bold bg-[#930000] text-white">
                      2024년
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {cashFlowData.map((row, catIndex) => (
                    <tr key={catIndex} className="border-b *:border-r">
                      <td className="p-2 px-3 lg:p-4 lg:py-9 text-[11px] text-center font-bold lg:text-[18px]">
                        {row.item}
                      </td>
                      <td className="p-2 px-3 lg:p-4 lg:py-9 text-[11px] text-center lg:text-[18px]">
                        {row['2022']}
                      </td>
                      <td className="p-2 px-3 lg:p-4 lg:py-9 text-[11px] text-center lg:text-[18px]">
                        {row['2023']}
                      </td>
                      <td className="p-2 px-3 lg:p-4 lg:py-9 text-[11px] text-center lg:text-[18px]">
                        {row['2024']}
                      </td>
                    </tr>
                  ))}
                  
                  
                </tbody>
                
                
                
              </table>
              <p className="text-[11px] text-gray-500 mt-2 pl-1 lg:pr-1 lg:mt-3 lg:text-[16px] lg:text-right">(단위 : 억원, 소숫점 이하 한 자리 반올림)</p>
            </div>
          </MotionBox>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <BackImgBox
        label="재무정보"
        imageSrc="/img/invest_cover.png"
      />
      <Tab
        items={tabItems}
        activeIndex={activeTabIndex}
        onTabClick={handleTabClick}
        queryParamKey="Tab"
        useIndexAsValue={false}
        className="bg-grilledMeats"
      />

      <div
        ref={contentRef}
        className="px-5 lg:px-0 pt-[40px] lg:pt-[100px] pb-[70px] lg:pb-[200px] max-w-[1180px] w-full mx-auto"
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

export default Finance;
