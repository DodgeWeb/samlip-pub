import React from 'react';
import {MotionBox} from '@/components/pub/interAtion/MotionBox';
import {ProjectHProductSwiper} from '@/components/pub/ProjectHProductSwiper';
import {Icon} from '@/components/pub/icons';

const ProjectH = () => {

    const brandMediaImages = [
        '/img/brand/brand_media_01.png',
        '/img/brand/brand_media_02.png',
        '/img/brand/brand_media_03.png',
        '/img/brand/brand_media_04.png',
    ];

    const seasons = [
        {
            id: 1,
            badge: '프로젝트 시즌 제로',
            title: "'맛과 건강의 밸런스'",
            description: '건강 라이프와 미식 라이프, 그 어느 것 하나 포기하지 않고 세상 모든 사람들이 \'맛있는 빵이 주는 행복\'을 걱정 없이 누릴 수 있도록 프로젝트:H는 SPC삼립의 NO.1 베이커리 전문성을 바탕으로 단백질은 높고 당류는 낮으면서, 맛과 건강의 밸런스를 맞춘 고단저당 베이커리를 출시했습니다.',
            image: '/img/brand/project_h/season_zero_image.png',
            products: [
                {
                    id: 1,
                    name: '프로틴 저당 모닝롤 테프',
                    image: '/img/brand/project_h/product_01.png',
                    description: '\'테프\' 곡물이 들어가 식감과 영양이 풍부해진 모닝빵',
                },
                {
                    id: 2,
                    name: '프로틴 저당 큐브식빵 버라이어티팩',
                    image: '/img/brand/project_h/product_02.png',
                    description: '가장 인기있는 세가지 맛을 골고루 즐길 수 있는 큐브식빵 패키지 (단백질 13g, 식이섬유 8g, 당류 1g)',
                },
                {
                    id: 3,
                    name: '제로슈가 프로틴 도넛 더블초코',
                    image: '/img/brand/project_h/product_03.png',
                    description: '탄수화물을 33% 낮춰 더 가볍게 즐기는 설탕 걱정 없는 더블초코 도넛 (단백질 15g, 식이섬유 15g, 당류 0.3g)',
                },
                {
                    id: 4,
                    name: '프로틴 저당 큐브식빵 토마토 올리브',
                    image: '/img/brand/project_h/product_04.png',
                    description: '토마토와 블랙 올리브를 넣어 맛과 씹는 식감이 업그레이드된 식빵 (단백질 13g, 식이섬유 8g, 당류 1g)',
                },
                {
                    id: 5,
                    name: '프로틴 저당 큐브식빵 흑미병아리콩',
                    image: '/img/brand/project_h/product_05.png',
                    description: '흑미와 병아리콩의 식이섬유로 포만감 UP, 간장을 발라 풍미를 더한 식빵 (단백질 14g, 식이섬유 8g, 당류 1.2g)',
                },
                {
                    id: 6,
                    name: '프로틴 저당 큐브식빵 먹물치즈',
                    image: '/img/brand/project_h/product_06.png',
                    description: '오징어 먹물과 모짜렐라 치즈를 넣어 감칠맛을 더한 블랙 식빵 (단백질 17g, 식이섬유 9g, 당류 7g)',
                },
                {
                    id: 7,
                    name: '프로틴 저당 큐브식빵 테프',
                    image: '/img/brand/project_h/product_07.png',
                    description: '고단백, 고식이섬유, 저당으로 \'영양 균형\'을 개선한 테프 식빵 (단백질 15g, 식이섬유 9g, 당류 1g)',
                },
                {
                    id: 8,
                    name: '프로틴 저당 큐브식빵 흥국오트밀',
                    image: '/img/brand/project_h/product_08.png',
                    description: '흥국쌀을 넣어 반죽하고 오트밀을 올려 색깔까지 예쁜 레드 식빵 (단백질 14g, 식이섬유 9g, 당류 1g)',
                },
            ],
        },
        {
            id: 2,
            badge: '프로젝트 시즌 1',
            title: "'당을 낮추다, 건강하게'",
            description: '\'건강빵은 맛없다\'는 고정관념을 깨고 맛있게 먹을 수 있는 건강빵을 출시했습니다. 대체 당을 전혀 함유하지 않고 삼립 식품기술연구원의 효소 공법과 당류 저감 솔루션을 활용해 기존 유사 제품 대비 당류를 30%에서 최대 55%까지 줄인 저감 제품을 출시했습니다.',
            image: '/img/brand/project_h/season_one_image.png',
            products: [
                {
                    id: 9,
                    name: '6가지 곡물 단팥빵',
                    image: '/img/brand/project_h/project-h_02-01.png',
                    description: '6가지 곡물의 고소한 식감과 단팥의 순수한 단맛이 어우러진 단팥빵',
                },
                {
                    id: 10,
                    name: '메밀 꿀호떡',
                    image: '/img/brand/project_h/project-h_02-02.png',
                    description: '매력적인 향의 메밀 빵과 해바라기 씨의 고소함, 은은한 꿀 풍미가 더해진 호떡',
                },
                {
                    id: 11,
                    name: '밀크카스테라',
                    image: '/img/brand/project_h/project-h_02-03.png',
                    description: '부드러운 식감이 강조된 카스테라',
                },
                {
                    id: 12,
                    name: '바닐라빈 크림 카스텔라',
                    image: '/img/brand/project_h/project-h_02-04.png',
                    description: '당을 낮춘 바닐라 빈 크림이 함유된 부드러운 카스테라',
                },
                {
                    id: 13,
                    name: '새싹보리 곡물 크림빵',
                    image: '/img/brand/project_h/project-h_02-05.png',
                    description: '새싹 보리의 쌉싸름함과 당을 줄인 크림이 만나 맛과 영양의 밸런스를 모두 갖춘 크림빵',
                },
                {
                    id: 14,
                    name: '플레인 바스크치즈케익',
                    image: '/img/brand/project_h/project-h_02-06.png',
                    description: '진한 치즈 풍미가 매력적인 바스크 치즈케이크',
                },
                {
                    id: 15,
                    name: '호두 휘낭시에',
                    image: '/img/brand/project_h/project-h_02-07.png',
                    description: '호두의 오독오독한 식감과 고소함이 조화롭게 어우러지는 휘낭시에',
                },
            ],
        },
    ];

    return (
        <main className="bg-white">
            {/* 메인 섹션 */}
            <section className='w-full aspect-[1/1] lg:aspect-[12/6] relative overflow-hidden mt-[40px] lg:mt-[60px]'>
                <div className='absolute inset-0 z-10'>
                    <img src="/img/brand/project_h/logo.png" alt=""
                         className="absolute w-full max-w-[180px] lg:max-w-[420px] z-20 left-[calc(50%-70px)] -translate-x-1/2 top-[100px] lg:top-[32px] lg:left-[calc(50%-300px)] "/>
                    <img src="/img/brand/project_h/project_h_banner_object_mo.jpg" alt=""
                         className="object-cover absolute inset-0 w-full h-full lg:hidden"/>
                    <img src="/img/brand/project_h/project_h_banner_object.png" alt=""
                         className="hidden object-cover absolute inset-0 w-full h-full lg:block"/>
                </div>
            </section>

            {/* 브랜드 스토리 - 로만밀 */}
            <section
                className='bg-[#FFE5E6] w-full overflow-hidden pt-[28px] pb-[0px]  lg:py-[80px] lg:relative lg:pb-[320px]'>
                <h2 className='gt-ultra text-[22px] lg:text-[64px] font-bold text-[#4E0C0D] tracking-[-0.66px] leading-[1.1] text-center pb-6'>Brand
                    Story</h2>
                <p className='text-[18px] lg:text-[36px] lg:max-w-[400px]  text-[#4E0C0D] leading-[1.5] lg:leading-[1.3] text-center  font-extrabold tracking-[-0.54px] max-w-[200px] mx-auto pb-6'>빵의
                    모든 것을 바꾼다. 빵이 더 건강해 질 때까지!</p>
                <div
                    className='text-[12px] lg:text-[18px] text-[#4E0C0D] leading-[1.6] text-center tracking-[-0.54px] lg:tracking-[-0.18px] max-w-[300px] lg:max-w-[500px] mx-auto'>
                    <p className='mb-[16px]'>식품을 만드는 기술과 과학은 계속 발전하는데 왜 빵은 늘 그대로일까요? 왜 여전히 빵이 건강하지 않다고 생각할까요?</p>
                    <p className='mb-[16px]'>프로젝트:H는 SPC삼립의 최신 베이커리 기술로 빵을 건강한 식품으로 만들고자 합니다.</p>
                    <p>당저감, 고단백, 저당, 발효 공정 개선, 소화 개선 등등 사람들의 건강 관심사에 맞춰 빵을 만드는 모든 재료와 과정을 삼립의 기술로 하나씩 더 건강하게 바꾸어
                        나가겠습니다.</p>
                </div>
                <div
                    className='flex gap-4 lg:absolute lg:bottom-0 max-w-[1380px] mx-auto w-full lg:left-1/2 lg:-translate-x-1/2'>
                    <img src="/img/brand/project_h/project_h_back_01.png" alt=""
                         className='mx-auto w-[calc(100%-20px)] lg:max-w-[700px]'/>
                    <img src="/img/brand/project_h/project_h_back_02.png" alt=""
                         className='mx-auto w-[calc(100%-20px)] hidden lg:block flex-none lg:max-w-[500px] relative top-[30px]'/>
                </div>
            </section>


            <section>
                <ProjectHProductSwiper seasons={seasons}/>
            </section>

            <section className='w-full py-[60px]  lg:py-[120px] bg-[#FA9DA1] flex items-center justify-center'>
                <div
                    className='flex gap-2 lg:gap-4 lg:text-[32px] justify-center items-center text-base font-semibold text-[#4E0C0D] cursor-pointer'
                    onClick={() => {
                        window.open('https://brand.naver.com/samlip/category/387bb07f8aff4fd5851a128fae17a448?cp=1', '_blank');
                    }}
                >
                    <p>프로젝트:H 제품 만나러 가기</p>
                    <button
                        className="bg-[#4e0c0d] rounded-[500px] size-[23px] lg:size-[60px] flex items-center justify-center relative z-10">
                        <Icon
                            name="arrowTop"
                            className="rotate-90 size-[15px] lg:size-[25px]"
                            style={{color: '#ffffff'}}/>
                    </button>
                </div>

            </section>


        </main>
    );
};

export default ProjectH;