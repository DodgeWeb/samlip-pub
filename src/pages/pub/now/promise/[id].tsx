import React, {useState} from 'react';
import {useRouter} from 'next/router';
import {Icon} from '@/components/pub/icons';
import {PromiseItem} from './index';
import ShareButtons from '@/components/pub/shareButtons';

// 타입 정의
type PromiseSection = {
    htmlContent: React.ReactNode;
};

type PromiseDetailType = PromiseItem & {
    content: string;
    images: string[];
    author: {
        name: string;
        department: string;
        quote: string;
    };
    relatedPromises: PromiseItem[];
    sections: PromiseSection[];
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
const allPromiseDetails: PromiseDetailType[] = [
    {
        id: 1,
        imageUrl: '',
        title: '안전을 향한 변화, ‘삼립의 약속’으로 시작합니다',
        date: '2025년 11월 28일',
        content: '삼립의 약속 시작 안내',
        images: ['/img/now/promise_01.png'],
        author: {
            name: '김삼립',
            department: 'SPC삼립 브랜드마케팅부',
            quote: '"빵으로 전하는 진심"',
        },
        relatedPromises: [
            {
                id: 2,
                imageUrl: '/img/promise/promise_01.png',
                title: '안전을 향한 삼립의 세 가지 약속',
                date: '2025년 11월 28일',
            },
        ],
        sections: [
            {
                htmlContent: (
                    <div className="flex flex-col gap-8">
                        <section className="section_mass">
                            <div className="contents">
                                <p>
                                    SPC삼립은 ‘삼립의 약속’이라는 이름 아래,
                                    안전한 근무환경을 만들기 위한 과정을 투명하게 공유합니다.
                                </p>
                            </div>
                        </section>
                    </div>
                ),
            },
        ],
    },

    {
        id: 2,
        imageUrl: '/img/promise/promise_01.png',
        title: '안전을 향한 삼립의 세 가지 약속을 공유드립니다.',
        date: '2025년 11월 28일',
        content: '안전을 향한 세 가지 약속',
        images: ['/img/promise/promise_01.png'],
        author: {
            name: '이삼립',
            department: 'SPC삼립 안전관리부',
            quote: '"안전은 모든 것의 시작입니다"',
        },
        relatedPromises: [
            {
                id: 1,
                imageUrl: '',
                title: '안전을 위한 삼립의 변화, 새롭게 시작합니다',
                date: '2025년 11월 28일',
            },
        ],
        sections: [
            {
                htmlContent: (
                    <div className="flex flex-col gap-8">
                        <section className="section_mass">
                            <p>안전을 위한 3단계 점검 체계를 구축했습니다.</p>
                        </section>
                    </div>
                ),
            },
        ],
    },
];


const PromiseDetail = () => {
    const router = useRouter();
    const {id} = router.query;

    const [showSocialIcons, setShowSocialIcons] = useState(false);
    const origin = typeof window !== 'undefined' ? window.location.origin : '';

    const numericId = Number(Array.isArray(id) ? id[0] : id) || 1;

    const promise =
        allPromiseDetails.find(item => item.id === numericId) ||
        allPromiseDetails[0];

    // 이전 / 다음 계산
    const currentIndex = allPromiseDetails.findIndex(
        item => item.id === promise.id
    );

    const prevItem =
        currentIndex > 0 ? allPromiseDetails[currentIndex - 1] : null;

    const nextItem =
        currentIndex < allPromiseDetails.length - 1
            ? allPromiseDetails[currentIndex + 1]
            : null;

    const navigateToItem = (itemId: number) => {
        window.scrollTo(0, 0);
        router.push(`/pub/now/promise/${itemId}`);
    };

    // 공유
    const handleShare = async () => {
        if (window.innerWidth >= 1024) {
            setShowSocialIcons(!showSocialIcons);
            return;
        }

        if (navigator.share) {
            await navigator.share({
                title: promise.title,
                text: promise.title,
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
        const text = encodeURIComponent(promise.title);
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
                    title: promise.title,
                    description: promise.content,
                    imageUrl: window.location.origin + promise.imageUrl,
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
            <div className="max-w-[1220px] mx-auto px-5 pt-[56px] lg:pt-[92px]">
                <div className="w-full bg-white lg:pt-[100px]">
                    <button onClick={() => router.push('/pub/now/promise')} className="lg:hidden">
                        <Icon name="arrowTop" size={20} className="-rotate-90 lg:size-5 *:fill-grilledMeats"/>
                    </button>
                    {/* 뒤로가기 버튼 */}
                    <button
                        onClick={() => router.push('/pub/now/promise')}
                        className="group lg:border lg:border-[#930000] hover:lg:border-[#ED1C2A] lg:px-5 lg:py-1 rounded-[65px] lg:rounded-full  items-center gap-[3px] lg:gap-2 size-10 lg:size-auto lg:mb-[68px] hidden lg:flex transition-colors"
                    >
                        <Icon name="arrowTop" size={14}
                              className="-rotate-90 lg:size-5 *:fill-deilcut group-hover:[&_*]:fill-[#ED1C2A]"/>
                        <span
                            className="text-[12px] lg:text-[18px] font-normal text-deilcut group-hover:text-[#ED1C2A] leading-[1.6] tracking-[-0.36px] lg:tracking-[-0.45px] transition-colors">
                            삼립의 약속 목록
                        </span>
                    </button>

                    {/* 헤더 섹션 */}
                    <div className="pb-4 lg:pb-[70px]">
                        <div className="flex flex-col gap-4 items-center lg:gap-5">

                            {/* 제목 및 날짜 */}
                            <div className="flex flex-col gap-[4px] lg:gap-2 items-center text-center">
                                <h1 className="text-[18px] lg:text-[42px] font-extrabold text-[#000] leading-[1.3] tracking-[-0.54px] lg:tracking-0">
                                    {promise.title}
                                </h1>
                                <p className="text-[10px] lg:text-[18px] font-normal text-[#AAA8A2] leading-[1.6] tracking-[-0.3px] lg:tracking-[-0.45px]">
                                    {promise.date}
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
                                    title: promise.title,
                                    description: promise.content,
                                    imageUrl: origin + promise.imageUrl,
                                }}
                            />
                        </div>
                    </div>

                    {/* 본문 */}
                    <div className="pb-[46px] lg:pb-[68px]">
                        <div className="flex flex-col gap-8 lg:gap-[64px] max-w-full mx-auto">
                            {promise.sections.map((section, index) => (
                                <div key={index} className='hard_coding_edit'>
                                    {section.htmlContent}
                                </div>
                            ))}
                        </div>
                        {/* 이전/다음글 네비게이션 */}
                        <div
                            className="pt-[32px] lg:pt-[100px] lg:px-0 flex items-center justify-between lg:justify-center lg:gap-[200px] max-w-full  mx-auto px-[60px] ">
                            <button
                                onClick={() => prevItem && navigateToItem(prevItem.id)}
                                disabled={!prevItem}
                                className={`flex items-center gap-2 lg:gap-6 text-[14px] lg:text-[32px] font-normal leading-[1.7] lg:leading-[1.6] tracking-[-0.42px] lg:tracking-[-0.54px] ${
                                    prevItem ? 'text-[#aaa8a2] cursor-pointer hover:opacity-80' : 'opacity-50'
                                }`}
                            >
                                <div
                                    className={`flex justify-center items-center p-1.5 rounded-full size-6 lg:size-[56px] bg-[#AAA8A2]`}>
                                    <Icon name="arrowTop" size={28} className="-rotate-90"/>
                                </div>
                                <div className="flex flex-col font-bold text-left">
                                    <span>이전글</span>
                                </div>
                            </button>

                            <button
                                onClick={() => nextItem && navigateToItem(nextItem.id)}
                                disabled={!nextItem}
                                className={`flex items-center lg:gap-6 gap-2 text-[14px] lg:text-[32px] font-normal leading-[1.7] lg:leading-[1.6] tracking-[-0.42px] lg:tracking-[-0.54px] text-[#930000] ${
                                    nextItem ? ' cursor-pointer hover:opacity-80' : 'opacity-50'
                                }`}
                            >
                                <div className="flex flex-col font-bold text-right">
                                    <span>다음글</span>
                                </div>
                                <div
                                    className={`flex justify-center items-center p-1.5 rounded-full size-6 lg:size-[56px] bg-deilcut`}>
                                    <Icon name="arrowTop" size={28} className="rotate-90"/>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <section className="bg-[#F8F7F3]">
                <div className="max-w-[1220px] mx-auto px-5 pt-10 lg:pt-[120px] pb-[90px] lg:pb-[200px] flex flex-col gap-6 lg:gap-8">
                    <p className='text-[16px] lg:text-[32px] font-bold  text-[#500c08] text-center lg:text-left '>삼립의 또
                        다른 약속들
                    </p>
                    {/* 연관 콘텐츠 */}
                    <div className="">
                        <ul className='border-t border-[#d9d9d9]'>
                            {allPromiseDetails
                                .filter(item => item.id !== promise.id)
                                .map(item => {
                                    // 날짜 포맷 변환: '2025년 11월 28일' -> '2025.11.28'
                                    const dateMatch = item.date.match(/(\d{4})년\s*(\d{1,2})월\s*(\d{1,2})일/);
                                    const formattedDate = dateMatch
                                        ? `${dateMatch[1]}.${dateMatch[2].padStart(2, '0')}.${dateMatch[3].padStart(2, '0')}`
                                        : item.date;

                                    return (
                                        <li
                                            key={item.id}
                                            className='flex justify-between items-center text-[16px] p-4 lg:py-[26px] border-b border-[#d9d9d9] cursor-pointer hover:bg-gray-50 transition-colors'
                                            onClick={() => {
                                                // 먼저 스크롤을 최상단으로 즉시 이동시킨 뒤 페이지 이동
                                                const lenis = (window as any).lenis;
                                                if (lenis && typeof lenis.scrollTo === 'function') {
                                                    lenis.scrollTo(0, {duration: 0, immediate: true});
                                                } else {
                                                    window.scrollTo({top: 0, behavior: 'auto'});
                                                    document.documentElement.scrollTop = 0;
                                                    document.body.scrollTop = 0;
                                                }
                                                // 스크롤 완료 후 페이지 이동
                                                setTimeout(() => {
                                                    router.push(`/pub/now/promise/${item.id}`);
                                                }, 100);
                                            }}
                                        >
                                            <p className='mo_body1 pc_body1'>{item.title}</p>
                                            <p className='mo_body2 pc_body1'>{formattedDate}</p>
                                        </li>
                                    );
                                })}
                        </ul>
                    </div>
                    {/* 버튼 */}
                    <div className="flex flex-col gap-6 lg:gap-[32px] items-center">
                        <button
                            onClick={() => router.push('/pub/now/promise')}
                            className="border rounded-full border-[#d9d9d9] bg-white flex gap-[2px] lg:gap-[10px] items-center justify-center px-[25px] lg:py-[10px] py-[8px] transition-opacity hover:opacity-80 lg:px-6 lg:mt-5"
                        >
                            <Icon name="menubar" className="size-5 lg:size-6 *:fill-[#1C1B1F]"/>
                            <span className="font-normal text-black text-[14px] lg:text-[22px] tracking-[-0.42px]">
                                전체 목록 보기
                            </span>
                        </button>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default PromiseDetail;
