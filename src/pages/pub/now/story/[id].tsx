import React, {useState} from 'react';
import {useRouter} from 'next/router';
import {Icon} from '@/components/pub/icons';
import {StoryItem, StoryItemCard} from './index';
import ShareButtons from '@/components/pub/shareButtons';

// 섹션 타입
type StorySection = {
    htmlContent?: React.ReactNode;
};

type StoryDetailType = StoryItem & {
    content: string;
    sections: StorySection[];
    relatedStorys: StoryItem[];
};

const extractText = (node: React.ReactNode): string => {
    if (typeof node === 'string') return node;
    if (Array.isArray(node)) return node.map(extractText).join(' ');
    if (React.isValidElement(node)) {
        return extractText(node.props.children);
    }
    return '';
};

// 더미 데이터
const allStoryDetails: StoryDetailType[] = [
    {
        id: 1,
        imageUrl: '/img/now/cheesecake.png',
        title: '미국 전역을 달달하게 물들인 K-치즈케익의 정체',
        date: '2025년 11월 28일',
        content: '미국 전역을 달달하게 물들인 K-치즈케익의 정체',
        tags: ['제품', '글로벌'],
        sections: [
            {
                htmlContent: (
                    <div className="flex flex-col gap-8 lg:gap-20">
                        <section className="section_mass">
                            <p className="label red">미국 디저트 덕후 사로잡은 K-치즈케익🧀</p>
                            <div className="contents">
                                <p>
                                    K-푸드에 대한 전 세계적인 열풍이 이어지는 가운데...
                                </p>
                                <img
                                    src="/img/now/cheesecake.png"
                                    alt=""
                                    className="w-full max-w-[874px] mx-auto"
                                />
                            </div>
                        </section>
                    </div>
                ),
            },
        ],
        relatedStorys: [
            {
                id: 2,
                imageUrl: '/img/now/hoppang.png',
                title: '겨울 제철코어가 된 삼립호빵, 그 뒤에 숨겨진 치열한 고민',
                date: '2025년 11월 28일',
                tags: ['제품'],
            },
        ],
    },

    {
        id: 2,
        imageUrl: '/img/now/hoppang.png',
        title: '겨울 제철코어가 된 삼립호빵, 그 뒤에 숨겨진 치열한 고민',
        date: '2025년 11월 28일',
        content: '미국 전역을 달달하게 물들인 K-치즈케익의 정체',
        tags: ['제품'],
        sections: [
            {
                htmlContent: (
                    <div className="flex flex-col gap-8 lg:gap-20">
                        <section className="section_mass">
                            <p className="label red">또다시 돌아온 겨울제철 코어 ‘삼립호빵’❄️</p>
                            <div className="contents">
                                <p>
                                    제철코어. 아무리 계절이 빠르게 지나가도...
                                </p>
                            </div>
                        </section>
                    </div>
                ),
            },
        ],
        relatedStorys: [
            {
                id: 1,
                imageUrl: '/img/now/cheesecake.png',
                title: '미국 전역을 달달하게 물들인 K-치즈케익의 정체',
                date: '2025년 11월 28일',
                tags: ['제품', '글로벌'],
            },
        ],
    },
];

const StoryDetail = () => {
    const router = useRouter();
    const { id } = router.query;

    const [showSocialIcons, setShowSocialIcons] = useState(false);
    const origin = typeof window !== 'undefined' ? window.location.origin : '';

    const numericId = Number(Array.isArray(id) ? id[0] : id) || 1;

    const story =
        allStoryDetails.find(item => item.id === numericId) ||
        allStoryDetails[0];

    // 이전 / 다음 계산
    const currentIndex = allStoryDetails.findIndex(
        item => item.id === story.id
    );

    const prevStory =
        currentIndex > 0 ? allStoryDetails[currentIndex - 1] : null;

    const nextStory =
        currentIndex < allStoryDetails.length - 1
            ? allStoryDetails[currentIndex + 1]
            : null;

    // 공유
    const handleShare = async () => {
        if (window.innerWidth >= 1024) {
            setShowSocialIcons(!showSocialIcons);
            return;
        }

        if (navigator.share) {
            await navigator.share({
                title: story.title,
                text: story.title,
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
        const text = encodeURIComponent(story.title);
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
                    title: story.title,
                    description: story.content,
                    imageUrl: window.location.origin + story.imageUrl,
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
                        onClick={() => router.push('/pub/now/story')}
                        className="group lg:border lg:border-[#930000] lg:px-5 lg:py-1 rounded-[65px] lg:rounded-full flex items-center gap-[3px] lg:gap-2 size-10 lg:size-auto lg:mb-[68px] hover:border-samlipRed"
                    >
                        <Icon
                            name="arrowTop"
                            size={14}
                            className="-rotate-90 size-6 lg:size-5 *:fill-[#500C08] lg:*:fill-deilcut group-hover:*:fill-samlipRed"
                        />
                        <span
                            className="text-[12px] lg:text-[18px] font-normal text-deilcut leading-[1.6] tracking-[-0.36px] lg:tracking-[-0.45px] hidden lg:block group-hover:text-samlipRed">
                            삼립 스토리 목록
                        </span>
                    </button>

                    {/* 헤더 섹션 */}
                    <div className="pb-4 lg:pb-[70px]">
                        <div className="flex flex-col gap-4 items-center lg:gap-5">
                            <div className="flex gap-[4px] lg:gap-2 items-center justify-center">
                                {story.tags.map((tag, i) => (
                                    <span key={i} className="bg-grilledMeats px-3 py-1 lg:px-4 lg:py-[7px] text-[12px] lg:text-[15px] font-bold text-[#fbfae7] leading-[1.6] tracking-[-0.36px] lg:tracking-[-0.45px]">
                                      {tag}
                                    </span>
                                ))}
                            </div>

                            <div className="flex flex-col gap-[4px] lg:gap-2 items-center text-center">
                                <h1 className="text-[18px] lg:text-[42px] font-extrabold text-[#500c08] leading-[1.3] tracking-[-0.54px] lg:tracking-0">
                                    {story.title}
                                </h1>
                                <p className="text-[10px] lg:text-[18px] font-normal text-[#aaa8a2] leading-[1.6] tracking-[-0.3px] lg:tracking-[-0.45px]">
                                    {story.date}
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
                                    title: story.title,
                                    description: story.content,
                                    imageUrl: origin + story.imageUrl,
                                }}
                            />
                        </div>
                    </div>

                    {/* 본문 */}
                    <div className="pb-[46px] lg:pb-[68px]">
                        {story.sections.map((section, index) => (
                            <div key={index} className="hard_coding_edit">
                                {section.htmlContent}
                            </div>
                        ))}
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
                        <div className="flex flex-col gap-8 justify-center items-stretch lg:flex-row">
                            {story.relatedStorys.map(item => (
                                <button
                                    key={item.id}
                                    onClick={() => router.push(`/pub/now/story/${item.id}`)}
                                    className="flex flex-col text-left transition-opacity cursor-pointer hover:opacity-80 lg:max-w-[384px]"
                                >
                                    <StoryItemCard item={item} variant="compact"/>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* 이전/다음글 네비게이션 */}
                    <div
                        className="pt-[32px] lg:py-[100px] lg:pb-[200px] lg:px-0 flex items-center justify-between max-w-full mx-auto px-[60px] pb-[80px]">
                        {prevStory ? (
                            <button
                                className="flex items-center gap-2 lg:gap-6 text-[#aaa8a2] text-[14px] lg:text-[18px] font-normal leading-[1.7] lg:leading-[1.6] tracking-[-0.42px] lg:tracking-[-0.54px] max-w-[40%]"
                                onClick={() => router.push(`/pub/now/story/${prevStory.id}`)}
                            >
                                <div
                                    className="flex justify-center items-center p-1.5 rounded-full bg-[#AAA8A2] size-7 lg:size-[56px] lg:min-w-[56px]">
                                    <Icon name="arrowTop" size={28} className="-rotate-90"/>
                                </div>

                                <div className="flex flex-col flex-1 min-w-0 text-left">
                                    <span>이전글</span>
                                    <p className="text-[32px] font-bold hidden lg:block leading-[1.3] overflow-hidden text-ellipsis whitespace-nowrap">
                                        {prevStory.title}
                                    </p>
                                </div>
                            </button>

                        ) : (
                            <div/> // 자리 맞추기용 빈 div
                        )}

                        {/* 다음글: 현재가 1번일 때만 노출 */}
                        {nextStory ? (
                            <button
                                className="flex items-center lg:gap-6 gap-2 text-[#930000] text-[14px] lg:text-[22px] font-normal leading-[1.7] lg:leading-[1.6] tracking-[-0.42px] lg:tracking-[-0.54px] max-w-[40%]"
                                onClick={() => router.push(`/pub/now/story/${nextStory.id}`)}
                            >
                                <div className="flex flex-col flex-1 min-w-0 text-right">
                                    <span>다음글</span>
                                    <p className="text-[32px] font-bold hidden lg:block leading-[1.3] overflow-hidden text-ellipsis whitespace-nowrap">
                                        {nextStory.title}
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

export default StoryDetail;
