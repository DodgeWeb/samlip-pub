import React, {useEffect, useMemo, useRef, useState} from 'react';
import {useRouter} from 'next/router';
import {Icon} from '@/components/pub/icons';
import BackImgBox from '@/components/pub/BackImgBox';
import Tab from '@/components/pub/tab';

interface AnnouncementItem {
    id: number;
    title: string;
    createdAt: string;
    content: string;
    viewCount?: number;
}

// 더미 데이터
const allAnnouncementItems: AnnouncementItem[] = [
    {
        id: 1,
        title: '57기 결산공고',
        createdAt: '2025-03-26',
        content:
            '<p>SPC삼립 제57기 결산공고 안내입니다.</p>' +
            '<p>본 공고는 샘플 화면 구성용 더미 데이터이며, 실제 공고 내용/첨부파일/공시 링크 등은 운영 환경에 맞춰 연동될 수 있습니다.</p>' +
            '<ul><li>재무제표 및 감사보고서 요약</li><li>승인/확정 일정 안내</li><li>문의처: IR 담당자</li></ul>',
        viewCount: 124,
    },
    {
        id: 2,
        title: '주주총회 소집 공고',
        createdAt: '2025-02-10',
        content:
            '<p>정기 주주총회 소집 공고(샘플)입니다.</p>' +
            '<p>일시: 2025년 02월 28일 10:00</p>' +
            '<p>장소: (가상) 본사 대회의실</p>' +
            '<p>안건: 재무제표 승인, 이사 선임 등</p>',
        viewCount: 98,
    },
    {
        id: 3,
        title: '전자증권 전환 공고',
        createdAt: '2025-01-03',
        content:
            '<p>전자증권 전환 관련 안내(샘플)입니다.</p>' +
            '<p>전자증권 제도 시행에 따라 실물 증권은 효력을 상실하며, 주주께서는 별도 절차 없이 권리가 전자등록됩니다.</p>' +
            '<p>자세한 내용은 한국예탁결제원 안내를 참고해 주세요.</p>',
        viewCount: 55,
    },
];

const StockAnnouncementDetail = () => {
    const router = useRouter();
    const {id} = router.query;

    const tabItems = ['주가정보', '배당정보', '공고'];
    const handleTabClick = (index: number) => {
        const label = tabItems[index];
        if (label === '주가정보') {
            router.push('/pub/company/invest/stock?Tab=주가정보');
        } else if (label === '배당정보') {
            router.push('/pub/company/invest/stock?Tab=배당정보');
        } else {
            router.push('/pub/company/invest/stock?Tab=공고');
        }
    };

    const numericId = useMemo(() => {
        if (!id) return allAnnouncementItems[0]?.id ?? 1;
        if (Array.isArray(id)) return Number(id[0]);
        return Number(id);
    }, [id]);

    const [loading, setLoading] = useState(false);
    const [detailData, setDetailData] = useState<{
        id: number;
        title: string;
        date: string;
        content: string;
    }>({
        id: numericId,
        title: '',
        date: '',
        content: '',
    });

    const [relatedNews, setRelatedNews] = useState<
        { id: number; title: string; date: string; views: number }[]
    >([]);

    const hasIncrementedRef = useRef<number | null>(null);
    const VIEW_TTL_MS = 60 * 60 * 1000; // 1시간
    const shouldIncrementView = (announcementId: number) => {
        const key = `announcement_viewed_${announcementId}`;
        const last = Number(localStorage.getItem(key) || '0');
        const now = Date.now();
        if (now - last < VIEW_TTL_MS) return false;
        localStorage.setItem(key, String(now));
        return true;
    };

    useEffect(() => {
        let mounted = true;
        const fetchDetail = async () => {
            if (!numericId) return;
            setLoading(true);
            try {
                // 프론트 단독: API 제거, 더미 데이터로 상세 구성
                const fallback =
                    allAnnouncementItems.find(item => item.id === numericId) ||
                    allAnnouncementItems[0];

                if (!mounted || !fallback) return;

                // 에디터 저장분(localStorage)이 있으면 1번 상세에서만 노출 (기존 작업 유지)
                const editorTitle = localStorage.getItem('stockEditorTitle') || '';
                const editorDate = localStorage.getItem('stockEditorDate') || '';
                const editorContent = localStorage.getItem('stockEditorContent') || '';

                const title = numericId === 1 && editorTitle ? editorTitle : fallback.title;
                const date = numericId === 1 && editorDate ? editorDate : fallback.createdAt;
                const content = numericId === 1 && editorContent ? editorContent : fallback.content;

                // 조회수 증가: API 대신 localStorage에 누적 저장
                if (hasIncrementedRef.current !== numericId) {
                    hasIncrementedRef.current = numericId;
                    if (shouldIncrementView(numericId)) {
                        const viewKey = `announcement_view_count_${numericId}`;
                        const current = Number(localStorage.getItem(viewKey) || String(fallback.viewCount ?? 0));
                        localStorage.setItem(viewKey, String(current + 1));
                    }
                }

                const getViews = (announcementId: number, base?: number) => {
                    const viewKey = `announcement_view_count_${announcementId}`;
                    const stored = localStorage.getItem(viewKey);
                    if (stored == null) return base ?? 0;
                    const parsed = Number(stored);
                    return Number.isFinite(parsed) ? parsed : (base ?? 0);
                };

                setDetailData({
                    id: fallback.id,
                    title,
                    date,
                    content,
                });

                setRelatedNews(
                    allAnnouncementItems.filter(item => item.id !== fallback.id)
                        .slice(0, 2)
                        .map(item => ({
                            id: item.id,
                            title: item.title,
                            date: item.createdAt,
                            views: getViews(item.id, item.viewCount),
                        }))
                );
            } finally {
                if (mounted) setLoading(false);
            }
        };

        fetchDetail();
        return () => {
            mounted = false;
        };
    }, [numericId]);

    const handleBackClick = () => {
        router.push('/pub/company/invest/stock?Tab=공고');
    };

    const otherNews = useMemo(() => {
        if (relatedNews.length > 0) return relatedNews.slice(0, 2);
        return allAnnouncementItems.filter(item => item.id !== detailData.id)
            .slice(0, 2)
            .map(item => ({
                id: item.id,
                title: item.title,
                date: item.createdAt,
                views: item.viewCount ?? 0,
            }));
    }, [relatedNews, detailData.id]);

    return (
        <main>
            <BackImgBox label="주식정보" imageSrc="/img/invest_cover.png" />
            <Tab items={tabItems} activeIndex={2} onTabClick={handleTabClick} />

            <div className="relative w-full min-h-screen bg-white">
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
                        공고 목록
                    </p>
                </button>
            </div>

            {/* 제목 / 날짜 */}
            <div className="px-[67px] lg:px-4 pt-[56px] pb-[40px]">
                <div
                    className="flex flex-col lg:flex-row gap-[12px] items-center justify-between max-w-[1180px] mx-auto">
                    <h1 className="font-bold text-[18px] lg:text-[42px] tracking-[-0.54px]">
                        {loading ? '불러오는 중...' : detailData.title}
                    </h1>
                    <p className="mo_caption pc_body1 text-grayTxt">
                        {detailData?.date}
                    </p>
                </div>
            </div>

            <div className="w-[calc(100%-40px)] h-[1px] bg-line2 mx-auto max-w-[1180px]"/>

            {/* 본문 */}
            <div className="px-5 pt-[36px] lg:pt-20 min-h-[500px]">
                <div className="lg:max-w-[1180px] mx-auto text-[14px] lg:text-[22px] leading-[1.7] tracking-[-0.42px]">
                    {detailData.content ? (
                        <div
                            className="migration"
                            dangerouslySetInnerHTML={{__html: detailData.content}}
                        />
                    ) : (
                        <div className="text-center text-gray-600">
                            내용이 없습니다.
                        </div>
                    )}
                </div>
            </div>

            {/* 다른 소식 */}
            <div className="bg-[#fbfbfb] mt-[36px] lg:mt-[200px] px-[20px] py-[32px] lg:pt-[111px] lg:pb-[145px]">
                <div className="lg:max-w-[1180px] mx-auto">
                    <p className="mo_subtitle  lg:!text-[32px] leading-[1.5]  text-black text-center w-full mb-[24px] lg:mb-[32px] font-semibold lg:text-left">
                        다른 소식
                    </p>

                    <div className="mb-[32px] lg:mb-[60px]">
                        {otherNews.length === 0 ? (
                            <div className="py-6 text-sm text-center text-gray-600 lg:text-base">
                                다른 소식이 없습니다.
                            </div>
                        ) : (
                            otherNews.map((item, index) => (
                                <div
                                    key={item.id}
                                    onClick={() => router.push(`/pub/company/invest/stock/${item.id}`)}
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
                            ))
                        )}
                    </div>

                    {/* 전체 목록 */}
                    <button
                        onClick={handleBackClick}
                        className="border border-[#d9d9d9] rounded-[99px] px-[18px] lg:px-[32px] h-[44px] lg:h-[54px] flex items-center gap-[10px] mx-auto bg-white"
                    >
                        <Icon name="menubar" className="size-5 *:fill-[#1C1B1F]"/>
                        <p className="text-[14px] lg:text-[22px]">
                            전체 목록 보기
                        </p>
                    </button>
                </div>
            </div>
            </div>
        </main>
    );
};

export default StockAnnouncementDetail;
