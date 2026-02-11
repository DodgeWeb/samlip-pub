import React, {useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import {Icon} from '@/components/pub/icons';
import {StoryItem, StoryItemCard} from './index';
import ShareButtons from '@/components/pub/ShareButtons';

// 섹션 타입
type StorySection = {
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
const allStorysMeta: StoryItem[] = [
    {
        id: 1,
        imageUrl: '/img/now/cheesecake.png',
        title: '미국 전역을 달달하게 물들인 K-치즈케익의 정체',
        date: '2025년 11월 28일',
        tags: ['제품', '글로벌'],
    },
    {
        id: 2,
        imageUrl: '/img/now/hoppang.png',
        title: '겨울 제철코어가 된 삼립호빵, 그 뒤에 숨겨진 치열한 고민',
        date: '2025년 11월 28일',
        tags: ['제품'],
    },
];

// 샘플 데이터
const sampleStoryDetail: StoryItem & {
    sections: StorySection[];
    relatedStorys: StoryItem[];
} = {
    id: 1,
    imageUrl: '/img/now/cheesecake.png',
    title: '미국 전역을 달달하게 물들인 K-치즈케익의 정체',
    date: '2025년 11월 28일',
    tags: ['제품', '글로벌'],
    sections: [
        {
            htmlContent: (
                <>
                    <div className='flex flex-col gap-8 lg:gap-20'>
                        <section className='section_mass'>
                            <p className='label red'>미국 디저트 덕후 사로잡은 K-치즈케익🧀</p>
                            <div className='contents'>
                                <p>K-푸드에 대한 전 세계적인 열풍이 이어지는 가운데, 작년 9월 미국 디저트 덕후들을 사로잡은 베이커리가 하나 있습니다. 바로 삼립 치즈케익인데요. 한국
                                    베이커리로는 최초로 미국 코스트코에 입점에 성공했습니다.</p>
                                <img
                                    src="/img/now/cheesecake.png"
                                    alt="한국 베이커리로는 최초로 미국 코스트코에 입점한 삼립 치즈케익"
                                    className="w-full max-w-[874px] mx-auto"
                                />
                                <p>사실 치즈케익은 어디서나 쉽게 만날 수 있는 친숙한 베이커리입니다. 부드러운 식감과 치즈의 풍미가 매력적인 간식으로 일상 속에 자리잡고 있죠. 우리에게는
                                    너무도 익숙한 치즈케익이 동남아시아를 넘어 미국의 까다로운 소비자들까지 매료시킨 힘은 무엇일까요?</p>
                            </div>
                        </section>

                        <section className='section_mass'>
                            <p className='label red'>동서양의 조화로 탄생한 먹음직스러운 K-베이커리 🌏</p>
                            <div className='contents'>
                                <p>삼립 치즈케익은 25년 9월말부터 샌프란시스코·LA·샌디에이고 등 미국 서부 지역 코스트코 100여개 매장에서 판매를 시작했습니다. 일부 매장에서는
                                    소비자들과 직접 만나는 시식 행사도 진행하면서, 직접 맛을 경험할 수 있도록 했어요.
                                    이렇게 미국 메인스트림 시장에서 존재감을 드러낸 삼립 치즈케익은 1차 물량이 완판되며, 현재는 1차 물량에 9배에 달하는 물량을 추가로 판매
                                    시작했습니다. 미국 서부지역 코스트코에서만 판매하던 제품을 이제는 미국 전역 코스트코 매장으로 확대해 더 많은 현지 고객들에게 소개되고
                                    있어요.
                                    현지인들의 사랑을 받을 수 있던 이유에는 동양과 서양의 제조공법의 조화로 탄생한 독자적인 비법이 숨겨져 있습니다. 동서양의 기술과 맛, 그리고 식감이
                                    교차된 독자적인 레시피가 미국 시장에서도 강력한 경쟁력으로 작용했다고 볼 수 있죠!</p>
                            </div>
                        </section>

                        <section className='section_mass'>
                            <p className='label red'>단맛 중심의 미국에서 독자적인 매력으로 살아남다✨</p>
                            <div className='contents'>
                                <p>미국 여행을 떠나보신 분들이라면 느끼셨겠지만, 미국은 달고 묵직한 베이커리가 주류로 자리잡고 있어요. 삼립 치즈케익은 바로 이 공백을 정확하게 채우는
                                    제품이었는데요. 부드러운 식감과 은은한 단맛으로 미국 베이커리 시장에 새로운 선택지를 제공했습니다. 한국식 베이커리만이 가진 ‘절제된 단맛의 풍미‘를
                                    잘 구현한 치즈케익은 현지 소비자들에게 부담스럽지 않게 맛있게 즐길 수 있는 선택지가 된 것입니다.</p>
                                <img
                                    src="/img/now/now_01_02.png"
                                    alt="한국 베이커리로는 최초로 미국 코스트코에 입점한 삼립 치즈케익"
                                    className="mx-auto w-full"
                                />
                                <p>이미 현지 인플루언서들에게는 긍정적인 반응을 얻고 있어요. “은은한 치즈의 단맛이 매력적이다”, “촉촉한 식감이 중독성있다” 등 다양한 반응이 이어지고
                                    있죠. 현지 소비자들의 입맛을 단단히 사로잡은 치즈케익은 사실 이전부터 글로벌 진출을 활발이 이어나가고 있었습니다.</p>
                            </div>
                        </section>

                        <section className='section_mass'>
                            <p className='label red'>이미 증명된 K-베이커리의 위력</p>
                            <div className='contents'>
                                <p>사실 미국 코스트코 입점 이전부터 삼립 치즈케익은 이미 해외 시장에서 많은 사랑을 받고 있던 제품입니다. 현재 베트남과 중동을 포함한 15개 국가에
                                    수출이 이뤄지고 있고, 2025년 상반기 기준 전년도 매출이 20% 이상 증가하며 매출 상승세도 가파른데요.</p>
                                <img
                                    src="/img/now/now_01_03.png"
                                    alt="한국 베이커리로는 최초로 미국 코스트코에 입점한 삼립 치즈케익"
                                    className="mx-auto w-full max-w-[626px]"
                                />
                                <p>특히 베트남은 윈마트, 서클케이 등 주요 유통 채널을 통해 현지 소비자들에게 큰 인기를 끌고 있고, 중동 지역에서도 카르푸, 루루 하이퍼마켓, 모노프리
                                    등에서 꾸준히 판매되고 있죠.</p>
                            </div>
                        </section>

                        <section className='section_mass'>
                            <p className='label red'>K-베이커리의 저력을 보여주다💪</p>
                            <div className='contents'>
                                <p>글로벌 시장조사 기관 ‘테크사이 리서치(Techsi Research)’에 따르면, 글로벌 디저트 시장 규모는 2024년 1,436억 달러로 추정되며,
                                    2030년까지 연 평균 5.16%씩 성장해 1,935달러 규모에 이를 전망이라고 해요. 한국의 냉동 디저트 시장 역시 2023년 6,300억 원(약
                                    4.9억 달러) 규모에서 2030년 약 9,800억 원으로 확대될 것으로 보이는데요.</p>
                                <p>이 가운데 한국 디저트의 수출 성장세도 단연 눈에 띄게 성장하고 있어요. 삼립 치즈케익은 이 흐름 속에서 ‘한국식 디저트의 매력은 세계에서도 통한다’는
                                    것을 직접 보여준 사례입니다. K-디저트의 상승세 위에서, 삼립은 글로벌 시장에서 더욱 탄탄한 입지를 확보해가고 있고, 앞으로도 다양한 제품을 세계
                                    시장에 소개하는 K-베이커리 외교관의 역할을 톡톡히 해나갈 계획입니다!</p>
                            </div>
                        </section>
                    </div>
                </>
            ),
        },
    ],
    relatedStorys: [
        allStorysMeta[1],
    ],
};

const StoryDetail = () => {
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
    const story =
        numericId === 2
            ? {
                ...sampleStoryDetail,
                ...allStorysMeta[1], // id, title, imageUrl, date, tags 덮어쓰기
                sections: [
                    {
                        htmlContent: (
                            <div className='flex flex-col gap-8 lg:gap-20'>
                                <section className='section_mass'>
                                    <p className='label red'>또다시 돌아온 겨울제철 코어 ‘삼립호빵’️️❄️</p>
                                    <div className='contents'>
                                        <p>제철코어. 아무리 계절이 빠르게 지나가도, 꼭 즐겨야 할 음식은 놓치지 않는 요즘 소비자들의 라이프스타일을 엿볼 수 있는 말인데요. 세대를
                                            아우르며 사랑받아온 삼립호빵도 겨울 제철코어하면 절대 빠질 수 없는 국민 대표 간식입니다!
                                            51년이 넘는 시간 동안 전 국민적인 사랑을 받아온 호빵이지만, 삼립은 늘 ‘어떻게 하면 호빵이 더 많은 세대와 소통할 수 있을까?’를
                                            고민해왔는데요. 이에 2025-2026 시즌에는 소비자 곁으로 한 걸음 더 가까이 다가가는 선택을 했어요.</p>
                                    </div>
                                </section>

                                <section className='section_mass'>
                                    <p className='label red'>왜 ‘1 입 호빵’이었을까? 😋</p>
                                    <div className='contents'>
                                        <p>이번 시즌 삼립호빵이 가장 먼저 주목한 변화는 1인 가구의 증가였어요. 혼자 먹는 한 끼, 한 번에 하나만 즐기는 간편한 식사가 점점 자연스러운
                                            선택이 된 지금의 소비 흐름에 주목한 건데요. 삼립호빵의 스테디셀러 제품인 단팥·야채·피자 호빵을 최초로 ‘1입 포장’으로 출시했습니다.</p>
                                        <img src="/img/now/now_02_01.png" alt=""/>
                                        <p>사실 이는 여러모로 도전적인 일이었어요. 오랜 시간 유지해온 판매 구조를 흔들어야 했기 때문인데요. 그럼에도 불구하고 삼립은 지금의 소비자들의
                                            소비 방식이 달라지고 있다는 변화를 감지하고 조금은 용기가 필요한 시도에 도전해보았습니다.
                                            처음 선보이는 시도였지만 결과는 놀라웠어요! 우려했던 바와 달리, 1입 호빵은 많은 소비자분들의 긍정적인 반응을 얻으며 시장에 성공적으로
                                            데뷔했습니다. 가볍게 하나만 사고 싶거나, 낭비 없이 즐기고 싶은 소비자들에게 강한 공감을 얻으며 소비자 곁에 자연스럽게 안착했어요.</p>
                                        <img src="/img/now/now_02_02.png" alt=""/>
                                        <p>전자레인지에 딱 30초만 데우면 촉촉하고 부드럽게 바로 즐길 수 있는 ‘호찜팩’ 기술도 적용돼, 편의점에서 구매 즉시 바로 맛있게 즐길 수 있도록
                                            기술적인 부분도 강화됐습니다.</p>
                                        <div className='text-center box'>
                                            <p>“이번에 호빵을 준비하면서 소비자들이 더 쉽고 편하게 드실 수 있는 호빵의 형태에 대해 정말 많이 고민했습니다. 변화하는 소비자들의
                                                라이프스타일 트렌드를 잘 짚어낸 제품이었기 때문에 소비자들의 사랑을 받을 수 있었던 것이라 생각합니다”</p>
                                            <p className='cation'>- 삼립 Happy Bread팀 송재열 담당자 -</p>
                                        </div>
                                    </div>
                                </section>

                                <section className='section_mass'>
                                    <p className='label red'>단맛 중심의 미국에서 독자적인 매력으로 살아남다✨</p>
                                    <div className='contents'>
                                        <p>역사가 오래된 헤리티지 브랜드가 갖고 있는 고민 중 하나는, ‘우리 부모님이 좋아하던 브랜드’를 ‘젊은 소비자들이 스스로 선택하고 사랑하는
                                            브랜드’로 바꾸는 일입니다. 긴 세월을 지나온 브랜드가 가진 파워는 그 무엇과도 바꾸기 어려울 만큼 값진 자산이지만, 반대로 젊은 세대들에게는
                                            자칫 올드한 브랜드로 느껴질 수 있다는 아쉬움이 존재하기 마련이죠.</p>
                                        <img
                                            src="/img/now/now_02_03.png"
                                            alt=""
                                            className="mx-auto w-full max-w-[626px]"
                                        />
                                        <p>삼립호빵 역시 젊은 세대들에게 친숙하고 흥미롭게 다가가기 위해 새로운 접근이 필요했습니다. 삼립은 그 해답을 ‘레시피’에서 찾았어요. 이제
                                            사람들은 더 이상 기업이 제공하는 레시피를 그대로 따라 하며 만족하지 않습니다. 전혀 어울리지 않을 것 같은 식재료를 과감하게 섞어 보기도
                                            하고, 집에 있는 재료만으로 새로운 조합을 만들기도 하는데요. 이렇게 탄생한 자신만의 레시피를 인스타그램, 틱톡, 유튜브 등 자신만의 공간에
                                            올려 나의 취향과 감각을 드러내곤 하죠.</p>
                                        <img
                                            src="/img/now/now_02_04.png"
                                            alt=""
                                            className="mx-auto w-full max-w-[626px]"
                                        />
                                        <p>삼립호빵은 바로 이 지점에 주목해, 호빵을 즐기는 나만의 방법을 공유하는 ‘호마이레시피’ 이벤트를 진행했습니다. 그러자 흥미롭게도, 내부
                                            담당자들도 상상하지 못했던 재미있는 레시피가 쏟아져 나왔습니다. ‘츄러스호빵’, ‘밤꿀치즈호빵’, ‘김치호빵샌드위치’ 등 상상했던 것보다 훨씬
                                            더 흥미로운 레시피들이 공유가 됐죠. 이렇게 세대 간 간극을 자연스럽게 좁히고 새로운 방식의 브랜드 경험을 만들어낼 수 있었어요.</p>
                                    </div>
                                </section>

                                <section className='section_mass'>
                                    <p className='label red'>광화문에서 우주인이 호빵을 나눠준다면?🛸</p>
                                    <div className='contents'>
                                        <p>‘광화문에서 우주인이 호빵을 나눠준다면?’ 조금은 엉뚱하게 들릴지 모르지만 실제로 작년 광화문 KT스퀘어에 등장했던 장면입니다. 삼립호빵하면 가장
                                            먼저 떠오르는 단어는 ‘따스함’, ‘겨울’, ‘전통’ 등의 키워드인데요. 이러한 익숙함의 틀을 바꿔보는 것도 재미있는 도전이 될 것이라 생각해,
                                            새로운 시도를 해보았습니다.</p>
                                        <img
                                            src="/img/now/now_02_05.png"
                                            alt=""
                                            className="mx-auto w-full max-w-[626px]"
                                        />
                                        <div className='text-center box'>
                                            <p>“삼립호빵은 50년이 넘는 브랜드인만큼, 전혀 새로운 기획이 아니면 소비자들의 관심을 끌기 어려울 것이라 생각했습니다. 소비자들에게
                                                의외성이라는 매력을 주면서 임팩트있는 이벤트를 전달하고자 기획했던 광고인데, 많은 분들이 사진도 찍고 SNS에 인증샷도 공유해주신 덕분에
                                                새로운 브랜드 경험을 전달할 수 있었습니다”</p>
                                            <p className='cation'>- 삼립 Brand Experience팀 최지해 담당자 -</p>
                                        </div>
                                        <p>여기에 더해, 삼립호빵은 무신사와의 협업을 통해 팝업 스토어도 진행했는데요. 젊은 세대가 열광하는 패션 브랜드 무신사와 함께 성수동 한복판에 호빵
                                            찜기를 연상시키는 대형 호찜이 부스를 설치하여 고객들과 만났어요. 오픈 일부터 종료까지 대기줄이 끊이지 않을 정도였으며, 4일 간 8천 명
                                            이상의 사람들이 참여했을 만큼, 큰 인기를 끌었습니다.</p>

                                        <img
                                            src="/img/now/now_02_06.png"
                                            alt=""
                                            className="mx-auto w-full max-w-[626px]"
                                        />
                                        <div className='text-center box'>
                                            <p> “일방적인 메시지 전달은 MZ세대에게 닿기가 어렵다고 생각합니다. 이번 마케팅은 MZ세대의 문화에 브랜드가 자연스럽게 녹아들 수 있도록
                                                구성하였고, 현장에서 브랜드와 소통하는 고객들의 반응에서 의미가 있었던 활동이라 판단하고 있습니다”</p>
                                            <p className='cation'>- 삼립 Brand Experience팀 안혜민 담당자 -</p>
                                        </div>

                                    </div>
                                </section>

                                <section className='section_mass'>
                                    <p className='label red'>다음 겨울을 기약하며 </p>
                                    <div className='contents'>
                                        <p>2025-2026 시즌의 삼립호빵은 유난히 새로운 시도가 많았습니다. 지금 돌이켜보면 성공적인 프로젝트로 기억되지만, 그 안에는 수많은 담당자들의
                                            치열한 고민과 디테일을 향한 노력이 담겨 있어요.
                                            삼립호빵은 앞으로도 겨울의 제철코어로 남기 위해, 그리고 더 많은 세대와 소통하기 위해, 진심을 담은 기획과 새로운 도전을 계속해
                                            나가겠습니다!</p>
                                    </div>
                                </section>
                            </div>
                        ),
                    },
                ],
                relatedStorys: [allStorysMeta[0]],
            }
            : sampleStoryDetail;

    const prevStory = numericId === 1 ? allStorysMeta[1] : allStorysMeta[0];
    const nextStory = numericId === 1 ? allStorysMeta[1] : allStorysMeta[0];

    const handleShare = async () => {
        if (window.innerWidth >= 1024) {
            setShowSocialIcons(!showSocialIcons);
            return;
        }

        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'SPC삼립 뉴스',
                    text: story.title,
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
        const text = encodeURIComponent(story.title);
        const shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
        window.open(shareUrl, '_blank', 'width=600,height=400');
    };

    const handleInstagramShare = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            alert('링크가 클립보드에 복사되었습니다. Instagram에 붙여넣어 공유하세요.');
        } catch (err) {
            console.error('❌ 복사 오류:', err);
            alert('링크 복사에 실패했습니다.');
        }
    };

    const [origin, setOrigin] = useState<string>('');

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
                                {story.tags.map((tag: string, index: number) => (
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
                                    description: story.sections
                                        .map((s: StorySection) => {
                                            if (s.htmlContent) return extractText(s.htmlContent);
                                            return s.content ?? s.mobileContent ?? s.pcContent ?? '';
                                        })
                                        .join(' ')
                                        .substring(0, 200) + '...',
                                    imageUrl: origin + story.imageUrl,
                                }}
                            />
                        </div>
                    </div>

                    {/* 본문 */}
                    <div className="pb-[46px] lg:pb-[68px]">
                        {story.sections.map((section, index) => {
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
                        <div className="flex flex-col gap-8 justify-center items-stretch lg:flex-row">
                            {story.relatedStorys.map((item: StoryItem) => (
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
                        {/* 이전글: 현재가 2번일 때만 노출 */}
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
