import React, { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import PageNumber from '@/components/pub/atoms/Pagination/PageNumber';

export interface NoticeItem {
    id: number;
    title: string;
    date: string;
    viewCount?: number;
}

export const NoticeItems: NoticeItem[] = [
    {
        id: 1,
        title: '홈페이지 리뉴얼 안내',
        date: '2025.01.01',
        viewCount: 124,
    },
    {
        id: 2,
        title: '서비스 점검 안내 (01/20)',
        date: '2025.01.01',
        viewCount: 98,
    },
    {
        id: 3,
        title: '신규 기능 업데이트 안내',
        date: '2025.01.01',
        viewCount: 201,
    },
];

const LIMIT = 4;

const NoticeIndex = () => {
    const router = useRouter();

    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const totalCount = NoticeItems.length;

    const totalPages = useMemo(
        () => Math.max(1, Math.ceil(totalCount / LIMIT)),
        [totalCount]
    );

    const notices = useMemo(() => {
        const start = (currentPage - 1) * LIMIT;
        return NoticeItems.slice(start, start + LIMIT);
    }, [currentPage]);

    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => setLoading(false), 0);
        return () => clearTimeout(timer);
    }, [currentPage]);

    const renderPagination = () => (
        <div className="flex justify-center items-center pt-[20px] pb-[70px] gap-0 lg:pt-[36px] lg:pb-[164px]">
            {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((page) => (
                <PageNumber
                    key={page}
                    page={page}
                    isActive={page === currentPage}
                    onClick={setCurrentPage}
                />
            ))}
        </div>
    );

    return (
        <div className="relative w-full bg-white lg:mt-[60px]">
            <div className="relative w-full">
                {/* 제목 */}
                <div className="pt-[80px] lg:pt-[120px] pb-[40px] lg:pb-[120px]">
                    <h1 className="text-center text-black mo_display pc_h2">
                        공지사항
                    </h1>
                </div>

                {/* 데스크톱 */}
                <div className="hidden w-full lg:block max-w-[1920px] mx-auto">
                    <div className="px-4 lg:px-8 lg:max-w-[1180px] mx-auto">
                        {/* 테이블 헤더 */}
                        <div className="flex border-y-[#000000] border-y-[1.2px]">
                            <div className="flex-1 min-w-0 h-[65px] px-4 lg:px-[32px] py-[12px] flex items-center justify-center">
                                <p className="mo_caption pc_body1">제목</p>
                            </div>
                            <div className="w-[120px] lg:w-[268px] flex-shrink-0 h-[65px] px-4 lg:px-[72px] py-[12px] flex items-center justify-center">
                                <p className="text-[18px] lg:text-[22px] leading-[1.6] text-black tracking-[-0.18px] lg:tracking-[-0.22px]">
                                    등록일
                                </p>
                            </div>
                        </div>

                        {/* 테이블 행 */}
                        {loading ? (
                            <div className="py-10 text-sm text-center text-gray-600">
                                불러오는 중...
                            </div>
                        ) : notices.length === 0 ? (
                            <div className="py-10 text-sm text-center text-gray-600">
                                등록된 공지사항이 없습니다.
                            </div>
                        ) : (
                            notices.map((notice) => (
                                <div
                                    key={notice.id}
                                    className="flex border-b border-gray-200 transition-colors cursor-pointer hover:bg-gray-50"
                                    onClick={() => router.push(`/pub/notice/${notice.id}`)}
                                >
                                    <div className="flex-1 min-w-0 h-[88px] px-4 lg:px-[32px] py-[12px] flex items-center">
                                        <p
                                            className="text-[18px] lg:text-[22px] leading-[1.6] text-black tracking-[-0.18px] lg:tracking-[-0.22px] truncate"
                                            title={notice.title}
                                        >
                                            {notice.title}
                                        </p>
                                    </div>
                                    <div className="w-[120px] lg:w-[268px] flex-shrink-0 h-[88px] px-4 lg:px-[72px] py-[12px] flex items-center justify-center">
                                        <p className="text-[18px] lg:text-[22px] leading-[1.6] text-black whitespace-nowrap">
                                            {notice.date}
                                        </p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* 페이지네이션 */}
                    {renderPagination()}
                </div>

                {/* 모바일 */}
                <div className="block w-full lg:hidden">
                    <div className="flex flex-col gap-[20px] items-center px-5">
                        <div className="flex flex-col items-start w-full">
                            {/* 헤더 */}
                            <div className="border-t border-b border-black border-[1.2px] w-full px-[12px] py-[8px]">
                                <div className="flex gap-[12px] w-full">
                                    <p className="text-[10px] leading-[1.6] flex-1">
                                        제목
                                    </p>
                                    <p className="text-[10px] leading-[1.6] whitespace-nowrap">
                                        등록일
                                    </p>
                                </div>
                            </div>

                            {/* 행 */}
                            {loading ? (
                                <div className="py-6 w-full text-sm text-center text-gray-600">
                                    불러오는 중...
                                </div>
                            ) : notices.length === 0 ? (
                                <div className="py-6 w-full text-sm text-center text-gray-600">
                                    등록된 공지사항이 없습니다.
                                </div>
                            ) : (
                                notices.map((notice) => (
                                    <div
                                        key={notice.id}
                                        className="border-b border-[#d9d9d9] w-full h-[48px] px-[12px] py-[12px] flex items-center cursor-pointer hover:bg-gray-50 transition-colors"
                                        onClick={() => router.push(`/pub/notice/${notice.id}`)}
                                    >
                                        <div className="flex gap-[12px] items-center w-full">
                                            <p
                                                className="text-[12px] leading-[1.6] flex-1 min-w-0 truncate"
                                                title={notice.title}
                                            >
                                                {notice.title}
                                            </p>
                                            <p className="text-[10px] leading-[1.6] text-[#787878] w-[60px] text-right flex-shrink-0">
                                                {notice.date}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* 페이지네이션 */}
                        {renderPagination()}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NoticeIndex;
