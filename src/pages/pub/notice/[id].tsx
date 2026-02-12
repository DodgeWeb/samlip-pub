import React, { useMemo } from 'react';
import { useRouter } from 'next/router';
import { Icon } from '@/components/pub/icons';

// 타입 정의
interface NoticeItem {
    id: number;
    title: string;
    date: string;
    content: React.ReactNode;
    viewCount?: number;
}

// 더미 데이터
const allNoticeItems: NoticeItem[] = [
    {
        id: 1,
        title: '홈페이지 리뉴얼 안내',
        date: '2025년 01월 12일',
        content: (
            <>
                <p>홈페이지 리뉴얼이 완료되었습니다.</p>
                <p>
                    더 나은 서비스를 제공하기 위해 UI/UX를 전면 개선하였으며,
                    모바일 및 접근성 환경을 강화했습니다.
                </p>
            </>
        ),
        viewCount: 124,
    },
    {
        id: 2,
        title: '서비스 점검 안내 (01/20)',
        date: '2025년 01월 08일',
        content: (
            <>
                <p>안정적인 서비스 제공을 위해 시스템 점검이 진행됩니다.</p>
                <p>일시: 2025년 01월 20일 (월) 02:00 ~ 06:00</p>
            </>
        ),
        viewCount: 98,
    },
    {
        id: 3,
        title: '신규 기능 업데이트 안내',
        date: '2025년 01월 03일',
        content: (
            <>
                <p>공지사항 관리 기능이 새롭게 추가되었습니다.</p>
                <p>상세 페이지 내 이전/다음글 이동이 가능해졌습니다.</p>
            </>
        ),
        viewCount: 55,
    },
];

const NoticeDetail = () => {
    const router = useRouter();
    const { id } = router.query;

    const numericId = useMemo(() => {
        if (!id) return 1;
        if (Array.isArray(id)) return Number(id[0]);
        return Number(id);
    }, [id]);

    const notice =
        allNoticeItems.find(item => item.id === numericId) ||
        allNoticeItems[0];

    // 이전 / 다음 계산
    const currentIndex = allNoticeItems.findIndex(
        item => item.id === notice.id
    );

    const prevNotice =
        currentIndex > 0 ? allNoticeItems[currentIndex - 1] : null;

    const nextNotice =
        currentIndex < allNoticeItems.length - 1
            ? allNoticeItems[currentIndex + 1]
            : null;

    const handleBackClick = () => {
        router.push('/pub/notice');
    };

    return (
        <div className="relative w-full min-h-screen bg-white pt-[44px] lg:pt-[88px]">
            {/* 뒤로가기 */}
            <div className="flex lg:justify-start px-0 lg:px-4 mx-auto lg:max-w-[1180px] pt-0 lg:pt-[88px]">
                {/* 모바일 */}
                <button
                    onClick={handleBackClick}
                    className="flex items-center h-[40px] px-[8px] lg:hidden"
                >
                    <Icon
                        name="arrowTop"
                        className="size-5 rotate-[-90deg] *:fill-[#1C1B1F]"
                    />
                </button>

                {/* PC */}
                <button
                    onClick={handleBackClick}
                    className="hidden lg:flex border border-deilcut rounded-[99px] px-[20px] py-[4px] items-center gap-[4px]"
                >
                    <Icon
                        name="arrowTop"
                        className="size-5 rotate-[-90deg] *:fill-deilcut"
                    />
                    <p className="text-[18px] text-deilcut whitespace-nowrap">
                        공지사항 목록
                    </p>
                </button>
            </div>

            {/* 제목 / 날짜 */}
            <div className="px-[67px] lg:px-4 pt-[56px] pb-[40px]">
                <div className="flex flex-col lg:flex-row gap-[12px] items-center justify-between max-w-[1180px] mx-auto">
                    <h1 className="font-bold text-[18px] lg:text-[42px] tracking-[-0.54px]">
                        {notice.title}
                    </h1>
                    <p className="mo_caption pc_body1 text-grayTxt">
                        {notice?.date}
                    </p>
                </div>
            </div>

            <div className="w-[calc(100%-40px)] h-[1px] bg-line2 mx-auto max-w-[1180px]" />

            {/* 본문 */}
            <div className="px-5 pt-[36px] lg:pt-20 min-h-[500px]">
                <div className="lg:max-w-[1180px] mx-auto text-[14px] lg:text-[22px] leading-[1.7] tracking-[-0.42px]">
                    {notice?.content ?? (
                        <div className="text-center text-gray-600">
                            내용이 없습니다.
                        </div>
                    )}
                </div>
            </div>

            {/* 다른 소식 */}
            <div className="bg-[#fbfbfb] mt-[36px] lg:mt-[200px] px-[20px] py-[32px] lg:pt-[111px] lg:pb-[200px]">
                <div className="lg:max-w-[1180px] mx-auto">
                    <p className="mo_subtitle  lg:!text-[32px] leading-[1.5]  text-black text-center w-full mb-[24px] lg:mb-[32px] font-semibold lg:text-left">
                        다른 소식
                    </p>

                    <div className="mb-[32px] lg:mb-[60px]">
                        {allNoticeItems
                            .filter(item => item.id !== notice.id)
                            .slice(0, 2)
                            .map((item, index) => (
                            <div
                                key={item.id}
                                onClick={() => router.push(`/pub/notice/${item.id}`)}
                                className={`flex items-center cursor-pointer hover:bg-gray-50 transition-colors
                                    ${index === 0 ? 'border-t border-b' : 'border-b'}
                                    border-[#d9d9d9] h-[52px] lg:h-[88px]`}
                            >
                                <div className="flex-1 min-w-0 px-[12px] lg:px-[32px]">
                                    <p className="truncate text-[14px] lg:text-[22px]">
                                        {item.title}
                                    </p>
                                </div>
                                <div className="w-[120px] lg:w-[236px] text-center">
                                    <p className="text-[12px] lg:text-[22px]">
                                        {item.date}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* 전체 목록 */}
                    <button
                        onClick={() => router.push('/pub/notice')}
                        className="border border-[#d9d9d9] rounded-[99px] px-[18px] lg:px-[32px] h-[44px] lg:h-[54px] flex items-center gap-[10px] mx-auto bg-white"
                    >
                        <Icon name="menubar" className="size-5 *:fill-[#1C1B1F]" />
                        <p className="text-[14px] lg:text-[22px]">
                            전체 목록 보기
                        </p>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NoticeDetail;
