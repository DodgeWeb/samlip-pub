import React, {useState} from 'react';
import {useRouter} from 'next/router';
import BackImgBox from '@/components/pub/BackImgBox';
import Tab from '@/components/pub/tab';
import { MotionBox } from '@/components/pub/interAtion/MotionBox';

const StockEditor = () => {
  const router = useRouter();
  const [editorData, setEditorData] = useState('여기에 내용을 입력하세요...');
  const tabItems = ['실시간 주가정보', '배당정보', '공고'];
  const [activeTabIndex, setActiveTabIndex] = React.useState(2);

  const handleTabClick = (index: number) => {
    setActiveTabIndex(index);
    const label = tabItems[index];
    if (label === '실시간 주가정보') {
      router.push('/pub/company/invest/stock?Tab=실시간%20주가정보');
    } else if (label === '배당정보') {
      router.push('/pub/company/invest/stock?Tab=배당정보');
    } else if (label === '공고') {
      router.push('/pub/company/invest/stock?Tab=공고');
    }
  };

  const [title, setTitle] = useState('57기 결산공고');
  const [date, setDate] = useState('2025-03-26');

  const handleSave = () => {
    // 가상 저장 - localStorage에 저장 (실제로는 API 호출)
    localStorage.setItem('stockEditorContent', editorData);
    localStorage.setItem('stockEditorTitle', title);
    localStorage.setItem('stockEditorDate', date);
    console.log('저장된 내용:', { title, date, content: editorData });
    // 저장 후 상세 페이지로 이동
    router.push('/pub/company/invest/stock/1');
  };

  return (
    <main>
      <BackImgBox label="주식정보" imageSrc="/img/invest_cover.png" />

      <Tab
        items={tabItems}
        activeIndex={activeTabIndex}
        onTabClick={handleTabClick}
      />

      <section className="px-5 lg:px-0 pt-[28px] lg:pt-[100px] pb-[70px] lg:pb-[200px] max-w-[1180px] mx-auto w-full">
        <MotionBox>
          <div className="flex flex-col gap-4 lg:gap-[50px]">
            {/* 제목 입력 */}
            <div className="flex flex-col gap-4 pb-8 border-b border-line2 lg:flex-row lg:justify-between lg:items-end">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="제목을 입력하세요"
                className="text-[18px] lg:text-[36px] font-extrabold leading-[1.3] tracking-[-0.54px] lg:tracking-[-1.08px] border-none outline-none bg-transparent w-full"
              />
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="text-[11px] lg:text-[18px] text-gray-600 leading-[1.6] tracking-[-0.39px] lg:tracking-[-0.54px] border-none outline-none bg-transparent w-fit"
              />
            </div>

            {/* 에디터 (임시: 의존성 없는 textarea) */}
            <div className="min-h-[500px]">
              <textarea
                value={editorData}
                onChange={(e) => setEditorData(e.target.value)}
                className="w-full min-h-[500px] border border-line2 rounded-lg p-4 outline-none"
              />
            </div>

            {/* 저장 버튼 */}
            <div className="flex gap-4 justify-end">
              <button
                onClick={() => router.push('/pub/company/invest/stock?Tab=공고')}
                className="px-6 py-3 rounded-full border border-line2"
              >
                취소
              </button>
              <button
                onClick={handleSave}
                className="px-6 py-3 text-white rounded-full bg-samlipRed"
              >
                저장
              </button>
            </div>
          </div>
        </MotionBox>
      </section>
    </main>
  );
};

export default StockEditor;

