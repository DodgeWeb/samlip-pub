import React, {useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import {Icon} from '@/components/pub/icons';
import {PrItem, PrItemCard} from './index';
import ShareButtons from '@/components/pub/ShareButtons';

// 섹션 타입
type PrSection = {
    label?: string;
    content?: string;
    mobileContent?: string;
    pcContent?: string;
    htmlContent?: React.ReactNode; // JSX 콘텐츠
    images?: {
        src: string;
        caption?: string;
        className?: string;
    }[];
};

const extractText = (node: React.ReactNode): string => {
    if (typeof node === 'string') return node;
    if (Array.isArray(node)) return node.map(extractText).join(' ');
    if (React.isValidElement(node)) {
        return extractText(node.props.children);
    }
    return '';
};

// 전체 칼럼 메타 (이전글/다음글, 연관콘텐츠 계산용)
const allPrsMeta: PrItem[] = [
    {
        id: 1,
        imageUrl: '/img/now/pr_01.jpg',
        title: '원조 국민 호빵의 진화…SPC삼립 80주년 기념 호빵 공개',
        date: '2025년 11월 19일',
        tags: ['상미당', '호빵'],
    },
    {
        id: 2,
        imageUrl: '/img/now/pr_02.jpg',
        title: 'SPC삼립, 깨먹는 재미 더한 피카츄의 초코바나나 몬스터볼 케이크 출시',
        date: '2025년 11월 14일',
        tags: ['기술'],
    },
];

// 샘플 데이터
const samplePrDetail: PrItem & {
    sections: PrSection[];
    relatedPrs: PrItem[];
} = {
    id: 1,
    imageUrl: '/img/now/pr_01.jpg',
    title: '원조 국민 호빵의 진화…SPC삼립 80주년 기념 호빵 공개',
    date: '2025년 11월 19일',
    tags: ['상미당', '호빵'],
    sections: [
        {
            htmlContent: (
                <>
                    <div className='flex flex-col gap-8 lg:gap-20'>
                        <section className='section_mass'>
                            <p className='label red'>원조 국민 호빵의 진화…SPC삼립 80주년 기념 호빵 공개</p>
                        </section>
                    </div>
                </>
            ),
        },
    ],
    relatedPrs: [
        allPrsMeta[1],
    ],
};

const PrDetail = () => {
    const router = useRouter();
    const {id} = router.query;
    const [showSocialIcons, setShowSocialIcons] = React.useState<boolean>(false);

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 1024);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    const numericId = React.useMemo(() => {
        if (!id) return 1;
        if (Array.isArray(id)) return parseInt(id[0], 10);
        return parseInt(id, 10);
    }, [id]);

    // 현재 글 데이터 구성
    const pr =
        numericId === 2
            ? {
                ...samplePrDetail,
                ...allPrsMeta[1], // id, title, imageUrl, date, tags 덮어쓰기
                sections: [
                    {
                        htmlContent: (
                            <div className='flex flex-col gap-8 lg:gap-20'>
                                <section className='section_mass'>
                                    <p className='label red'>SPC삼립, 깨먹는 재미 더한 피카츄의 초코바나나 몬스터볼 케이크 출시️</p>
                                </section>
                            </div>
                        ),
                    },
                ],
                relatedPrs: [allPrsMeta[0]],
            }
            : samplePrDetail;

    const currentIndex = allPrsMeta.findIndex(item => item.id === numericId);

    const prevPr = allPrsMeta[currentIndex - 1] ?? null;
    const nextPr = allPrsMeta[currentIndex + 1] ?? null;

    const handleShare = async () => {
        if (window.innerWidth >= 1024) {
            setShowSocialIcons(!showSocialIcons);
            return;
        }

        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'SPC삼립 뉴스',
                    text: pr.title,
                    url: window.location.href,
                });
                console.log('✅ 공유 완료!');
            } catch (err) {
                console.error('❌ 공유 취소 또는 오류:', err);
            }
        } else {
            alert('이 브라우저에서는 공유 기능이 지원되지 않습니다.');
        }
    };

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            alert('링크가 클립보드에 복사되었습니다.');
        } catch (err) {
            console.error('❌ 복사 오류:', err);
            alert('링크 복사에 실패했습니다.');
        }
    };

    const handleFacebookShare = () => {
        const url = encodeURIComponent(window.location.href);
        const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        window.open(shareUrl, '_blank', 'width=600,height=400');
    };

    const handleTwitterShare = () => {
        const url = encodeURIComponent(window.location.href);
        const text = encodeURIComponent(pr.title);
        const shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
        window.open(shareUrl, '_blank', 'width=600,height=400');
    };

    const [origin, setOrigin] = useState<string>('');

    return (
        <main>
            <div className="max-w-[1220px] mx-auto px-5 pt-[56px]  lg:pt-[92px]">
                <div className="w-full bg-white lg:pt-[100px]">
                    {/* 뒤로가기 버튼 */}
                    <button
                        onClick={() => router.push('/pub/now/pr')}
                        className="group lg:border lg:border-[#930000] lg:px-5 lg:py-1 rounded-[65px] lg:rounded-full flex items-center gap-[3px] lg:gap-2 size-10 lg:size-auto lg:mb-[68px] hover:border-samlipRed"
                    >
                        <Icon
                            name="arrowTop"
                            size={14}
                            className="-rotate-90 size-6 lg:size-5 *:fill-[#500C08] lg:*:fill-deilcut group-hover:*:fill-samlipRed"
                        />
                        <span
                            className="text-[12px] lg:text-[18px] font-normal text-deilcut leading-[1.6] tracking-[-0.36px] lg:tracking-[-0.45px] hidden lg:block group-hover:text-samlipRed">
                            보도자료 목록
                        </span>
                    </button>

                    {/* 헤더 섹션 */}
                    <div className="pb-4 lg:pb-[70px]">
                        <div className="flex flex-col gap-4 items-center lg:gap-5">
                            <div className="flex gap-[4px] lg:gap-2 items-center justify-center">
                                {pr.tags.map((tag: string, index: number) => (
                                    <span
                                        key={index}
                                        className="bg-grilledMeats px-3 py-1 lg:px-4 lg:py-[7px] text-[12px] lg:text-[15px] font-bold text-[#fbfae7] leading-[1.6] tracking-[-0.36px] lg:tracking-[-0.45px]"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            <div className="flex flex-col gap-[4px] lg:gap-2 items-center text-center">
                                <h1 className="text-[18px] lg:text-[42px] font-extrabold text-[#500c08] leading-[1.3] tracking-[-0.54px] lg:tracking-0">
                                    {pr.title}
                                </h1>
                                <p className="text-[10px] lg:text-[18px] font-normal text-[#aaa8a2] leading-[1.6] tracking-[-0.3px] lg:tracking-[-0.45px]">
                                    {pr.date}
                                </p>
                            </div>

                            {/* SNS 공유 버튼 */}
                            <ShareButtons
                                showSocialIcons={showSocialIcons}
                                onCopy={handleCopy}
                                onShare={handleShare}
                                onFacebookShare={handleFacebookShare}
                                onTwitterShare={handleTwitterShare}
                                kakaoShareData={{
                                    title: pr.title,
                                    description: pr.sections
                                        .map((s: PrSection) => {
                                            if (s.htmlContent) return extractText(s.htmlContent);
                                            return s.content ?? s.mobileContent ?? s.pcContent ?? '';
                                        })
                                        .join(' ')
                                        .substring(0, 200) + '...',
                                    imageUrl: origin + pr.imageUrl,
                                }}
                            />
                        </div>
                    </div>

                    {/* 본문 */}
                    <div className="pb-[46px] lg:pb-[68px]">
                        {pr.sections.map((section, index) => {
                            return (
                                <div key={index} className="hard_coding_edit">
                                    {section.htmlContent}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            <section className="bg-[#F8F7F3]">
                <div className="max-w-[1220px] mx-auto px-5 ">
                    {/* 연관 콘텐츠 */}
                    <div className="pt-[54px] lg:pt-[100px]">
                        <h2 className="text-[16px] lg:text-[42px] font-semibold lg:font-extrabold text-[#500c08] text-center mb-6 lg:mb-[64px] leading-[1.3] tracking-[-0.48px] lg:tracking-0">
                            연관 콘텐츠
                        </h2>
                        <div className="grid grid-cols-1 gap-8 justify-center lg:gap-5 lg:grid-cols-3">
                            {pr.relatedPrs.map((item: PrItem) => (
                                <button
                                    key={item.id}
                                    onClick={() => router.push(`/pub/now/pr/${item.id}`)}
                                    className="w-full h-full text-left transition-opacity cursor-pointer hover:opacity-80"
                                >
                                    <PrItemCard
                                        item={item}
                                        variant="compact"
                                        onTagClick={(tag: string, e?: React.MouseEvent) => {
                                            e?.stopPropagation();
                                            router.push({
                                                pathname: '/pub/now/pr',
                                                query: { tag },
                                            });
                                        }}
                                    />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* 이전/다음글 네비게이션 */}
                    <div
                        className="pt-[32px] lg:py-[100px] lg:pb-[200px] lg:px-0 flex items-center justify-between max-w-full mx-auto px-[60px] pb-[80px]">
                        {/* 이전글: 현재가 2번일 때만 노출 */}
                        {prevPr ? (
                            <button
                                className="flex items-center gap-2 lg:gap-6 text-[#aaa8a2] text-[14px] lg:text-[18px] font-normal leading-[1.7] lg:leading-[1.6] tracking-[-0.42px] lg:tracking-[-0.54px] max-w-[40%]"
                                onClick={() => router.push(`/pub/now/pr/${prevPr.id}`)}
                            >
                                <div
                                    className="flex justify-center items-center p-1.5 rounded-full bg-[#AAA8A2] size-7 lg:size-[56px] lg:min-w-[56px]">
                                    <Icon name="arrowTop" size={28} className="-rotate-90"/>
                                </div>

                                <div className="flex flex-col flex-1 min-w-0 text-left">
                                    <span>이전글</span>
                                    <p className="text-[32px] font-bold hidden lg:block leading-[1.3] overflow-hidden text-ellipsis whitespace-nowrap">
                                        {prevPr.title}
                                    </p>
                                </div>
                            </button>

                        ) : (
                            <div/> // 자리 맞추기용 빈 div
                        )}

                        {/* 다음글: 현재가 1번일 때만 노출 */}
                        {nextPr ? (
                            <button
                                className="flex items-center lg:gap-6 gap-2 text-[#930000] text-[14px] lg:text-[22px] font-normal leading-[1.7] lg:leading-[1.6] tracking-[-0.42px] lg:tracking-[-0.54px] max-w-[40%]"
                                onClick={() => router.push(`/pub/now/pr/${nextPr.id}`)}
                            >
                                <div className="flex flex-col flex-1 min-w-0 text-right">
                                    <span>다음글</span>
                                    <p className="text-[32px] font-bold hidden lg:block leading-[1.3] overflow-hidden text-ellipsis whitespace-nowrap">
                                        {nextPr.title}
                                    </p>
                                </div>

                                <div
                                    className="flex justify-center items-center p-1.5 rounded-full bg-deilcut size-7 lg:size-[56px] lg:min-w-[56px]">
                                    <Icon name="arrowTop" size={28} className="rotate-90"/>
                                </div>
                            </button>
                        ) : (
                            <div/>
                        )}
                    </div>
                </div>
            </section>
        </main>
    );
};

export default PrDetail;
