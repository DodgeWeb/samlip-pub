import React, {useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import {Icon} from '@/components/pub/icons';
import {PrItem, PrItemCard} from './index';
import ShareButtons from '@/components/pub/shareButtons';

// 타입 정의
type PrSection = {
    htmlContent?: React.ReactNode;
};

type PrDetailType = PrItem & {
    content: string;
    sections: PrSection[];
    relatedPrs: PrItem[];
};

const extractText = (node: React.ReactNode): string => {
    if (typeof node === 'string') return node;
    if (Array.isArray(node)) return node.map(extractText).join(' ');
    if (React.isValidElement(node)) {
        return extractText(node.props.children);
    }
    return '';
};

// 전체 메타 데이터
const allPrDetails: PrDetailType[] = [
    {
        id: 1,
        imageUrl: '/img/now/pr_01.jpg',
        title: '원조 국민 호빵의 진화…SPC삼립 80주년 기념 호빵 공개',
        date: '2025년 11월 19일',
        content: 'SPC삼립 80주년 기념 호빵 출시 소식',
        tags: ['상미당', '호빵'],
        sections: [
            {
                htmlContent: (
                    <div className="flex flex-col gap-8 lg:gap-20">
                        <section className="section_mass">
                            <p className="label red">
                                원조 국민 호빵의 진화…SPC삼립 80주년 기념 호빵 공개
                            </p>
                        </section>
                    </div>
                ),
            },
        ],
        relatedPrs: [
            {
                id: 2,
                imageUrl: '/img/now/pr_02.jpg',
                title: 'SPC삼립, 깨먹는 재미 더한 피카츄의 초코바나나 몬스터볼 케이크 출시',
                date: '2025년 11월 14일',
                tags: ['기술'],
            },
        ],
    },
    {
        id: 2,
        imageUrl: '/img/now/pr_02.jpg',
        title: 'SPC삼립, 깨먹는 재미 더한 피카츄의 초코바나나 몬스터볼 케이크 출시',
        date: '2025년 11월 14일',
        content: '피카츄 초코바나나 몬스터볼 케이크 출시 소식',
        tags: ['기술'],
        sections: [
            {
                htmlContent: (
                    <div className="flex flex-col gap-8 lg:gap-20">
                        <section className="section_mass">
                            <p className="label red">
                                SPC삼립, 깨먹는 재미 더한 피카츄의 초코바나나 몬스터볼 케이크 출시
                            </p>
                        </section>
                    </div>
                ),
            },
        ],
        relatedPrs: [
            {
                id: 1,
                imageUrl: '/img/now/pr_01.jpg',
                title: '원조 국민 호빵의 진화…SPC삼립 80주년 기념 호빵 공개',
                date: '2025년 11월 19일',
                tags: ['상미당', '호빵'],
            },
        ],
    },
];

const PrDetail = () => {
    const router = useRouter();
    const { id } = router.query;

    const [showSocialIcons, setShowSocialIcons] = useState(false);

    const origin = typeof window !== 'undefined' ? window.location.origin : '';

    const numericId = Number(Array.isArray(id) ? id[0] : id) || 1;

    const pr =
        allPrDetails.find(item => item.id === numericId) ||
        allPrDetails[0];

    // 이전 / 다음 계산
    const currentIndex = allPrDetails.findIndex(
        item => item.id === pr.id
    );

    const prevPr =
        currentIndex > 0 ? allPrDetails[currentIndex - 1] : null;

    const nextPr =
        currentIndex < allPrDetails.length - 1
            ? allPrDetails[currentIndex + 1]
            : null;

    // 공유
    const handleShare = async () => {
        if (window.innerWidth >= 1024) {
            setShowSocialIcons(!showSocialIcons);
            return;
        }

        if (navigator.share) {
            await navigator.share({
                title: pr.title,
                text: pr.title,
                url: window.location.href,
            });
        }
    };

    const handleCopy = async () => {
        await navigator.clipboard.writeText(window.location.href);
        alert('링크가 복사되었습니다.');
    };

    const handleFacebookShare = () => {
        const url = encodeURIComponent(window.location.href);
        window.open(
            `https://www.facebook.com/sharer/sharer.php?u=${url}`,
            '_blank'
        );
    };

    const handleTwitterShare = () => {
        const url = encodeURIComponent(window.location.href);
        const text = encodeURIComponent(pr.title);
        window.open(
            `https://twitter.com/intent/tweet?url=${url}&text=${text}`,
            '_blank'
        );
    };

    const handleKakaoShare = () => {
        const kakaoKey = process.env.NEXT_PUBLIC_KAKAO_JS_KEY;

        if (!kakaoKey) {
            alert('NEXT_PUBLIC_KAKAO_JS_KEY 환경변수가 필요합니다.');
            return;
        }

        const script = document.createElement('script');
        script.src = 'https://developers.kakao.com/sdk/js/kakao.js';
        script.async = true;

        script.onload = () => {
            const Kakao = (window as any).Kakao;
            if (!Kakao.isInitialized()) Kakao.init(kakaoKey);

            Kakao.Share.sendDefault({
                objectType: 'feed',
                content: {
                    title: pr.title,
                    description: pr.content,
                    imageUrl: window.location.origin + pr.imageUrl,
                    link: {
                        mobileWebUrl: window.location.href,
                        webUrl: window.location.href,
                    },
                },
            });
        };

        document.head.appendChild(script);
    };

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
                                    description: pr.content,
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
