import {MotionBox} from '@/components/pub/MotionBox';
import {ProductSwiper} from '@/components/pub/ProductSwiper';
import 'swiper/css/bundle';
import {Icon} from '@/components/pub/icons';
import {BrandMedia} from '@/components/pub/brand/BrandMedia';

const PigInTheGarden = () => {

    const brandMediaImages = [
        {
            image: '/img/brand_media/pig-in-the-garden_media_01.jpg',
            link: 'https://www.instagram.com/reel/DNplrZ8x74I/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=='
        },
        {
            image: '/img/brand_media/pig-in-the-garden_media_02.jpg',
            link: 'https://www.instagram.com/reel/DNE5irEpG3l/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=='
        },
        {
            image: '/img/brand_media/pig-in-the-garden_media_03.jpg',
            link: 'https://www.instagram.com/p/DII0tCBv6re/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=='
        },
        {
            image: '/img/brand_media/pig-in-the-garden_media_04.jpg',
            link: 'https://www.instagram.com/reel/DFCllETPHUU/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=='
        },
    ];


    const products = [
        {id: 1, name: '골든텐더 치킨 보울', image: '/img/brand/pigin_product_01.png'},
        {id: 2, name: '에그가먼저닭 미니샐러드', image: '/img/brand/pigin_product_02.png'},
        {id: 3, name: '시저샐러드', image: '/img/brand/pigin_product_03.png'},
        {id: 4, name: '데일리믹스', image: '/img/brand/pigin_product_04.png'},
        {id: 5, name: '데일리믹스', image: '/img/brand/pigin_product_05.png'},
        {id: 6, name: '데일리믹스 샐러드키트', image: '/img/brand/pigin_product_06.png'},
        {id: 7, name: '에그 스쿱샐러드', image: '/img/brand/pigin_product_07.png'},
        {id: 8, name: '에그마요 스쿱샐러드', image: '/img/brand/pigin_product_08.png'},
        {id: 9, name: '그레이프 발사믹 드레싱', image: '/img/brand/pigin_product_09.png'},
        {id: 10, name: '오리엔탈 드레싱', image: '/img/brand/pigin_product_10.png'},
    ];


    return (
        <main className="bg-white">
            {/* 메인 섹션 */}
            <section className='w-full h-[360px] lg:h-[800px] relative overflow-hidden lg:mt-[60px]'>
                <div className='absolute inset-0 z-10 w-full'>

                    <div
                        className="flex justify-start  px-5 md:px-10 py-4 items-end md:items-center h-full sticky z-20 mx-auto md:justify-start md:max-w-[700px] lg:max-w-[1180px]">
                        <img src="/img/brand/pigin_logo.svg" alt=""
                             className="max-w-[96px] md:max-w-[120px] lg:max-w-[278px] lg:mt-[40px]"/>
                    </div>


                    <img src="/img/brand/pigin_banner_object_mo.png" alt=""
                         className="object-cover absolute top-0 left-0 w-full h-full md:hidden"/>

                    <img src="/img/brand/pigin_banner_object.png" alt=""
                         className="hidden object-cover absolute top-0 left-0 w-full h-full md:block"/>
                </div>
            </section>

            {/* 피그인더가든 - 브랜드 스토리 */}
            <section className='bg-[#BBE363] relative w-full overflow-hidden py-9 lg:py-[120px]'>
                {/* 배경 장식 이미지 */}
                <img src="/img/brand/pigin_story_back.svg" alt=""
                     className="absolute inset-0  h-full fill-[#fff] w-[100%] object-cover "/>
                <div className='px-5 lg:px-0 max-w-[1080px] mx-auto w-full relative z-10'>
                    <div
                        className='flex flex-col gap-[24px] lg:gap-[80px] w-full lg:flex-row items-center lg:items-start'>
                        {/* Brand Story 제목 */}
                        <h2 className='gt-ultra text-[22px] lg:text-[22px] font-bold text-[#005348] tracking-[-0.66px] leading-[1.1] text-center lg:hidden'>Brand
                            Story</h2>
                        <p className="gt-bold text-[22px] lg:text-[32px] font-extrabold text-[#005348] tracking-[-0.66px] leading-[1.3] text-center lg:hidden">Greener,
                            Better, Together</p>
                        {/* 스토리 이미지 */}
                        <MotionBox>
                            <div
                                className='w-full flex-none lg:max-w-[500px] lg:w-[500px] h-[272px] lg:h-auto relative lg:aspect-[5/6]'>
                                <img
                                    src="/img/brand/pigin_story_01.png"
                                    alt="피그인더가든 스토리"
                                    className="object-cover w-full h-full"
                                />
                            </div>
                        </MotionBox>

                        <section className='flex flex-col gap-[24px] lg:gap-[40px] items-center lg:items-start w-full'>
                            <h2 className='gt-ultra text-[22px] lg:text-[64px] font-bold text-[#005348] tracking-[-0.66px] leading-[1.1] hidden lg:block text-center lg:text-left'>
                                Brand Story
                            </h2>

                            <p className="gt-bold text-[22px] lg:text-[32px] font-extrabold text-[#005348] tracking-[-0.66px] leading-[1.5] text-left hidden lg:block">Greener,
                                Better, Together</p>
                            {/* 첫 번째 텍스트 섹션 */}
                            <div className='flex flex-col gap-[8px] items-center  max-w-[320px] lg:max-w-[800px]'>

                                <div
                                    className='text-[12px] lg:text-[18px] text-[#005348] text-center lg:text-left leading-[1.6] tracking-[-0.36px]'>
                                    <p className='mb-[16px]'>
                                        자연 그대로의 싱그러움, 더 나은 나와 삶을 위한 실천, 주변과 함께 나누는 즐거움.
                                        <br/><br/>
                                        우리의 이런 가치들을 담아 당신의 일상이 리프레쉬 되고, 건강하도록 신선한 재료로 만든 맛과 영양 균형 잡힌 샐러드를 제안합니다.
                                        <br/><br/>
                                        우리의 삶의 밸런스를 맞추고 활기찬 일상을 함께 즐길 수 있도록 밸런스 있는 식문화와 라이프 스타일을 만들어가는 ‘Well-Balanced’
                                        브랜드.
                                        <br/><br/>
                                        Salad for meal 피그인더가든.
                                    </p>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </section>

            {/* 브랜드 히스토리 */}
            <section
                className='relative z-10 mx-auto w-full bg-[#F9ECE2] pt-9 pb-[280px]  lg:py-[120px] lg:pb-[210px] px-5 overflow-hidden'>
                <img src="/img/brand/pig/pigi.svg" alt=""
                     className='w-[677px] lg:w-[1440px] max-w-none absolute bottom-[-10px] left-1/2 translate-x-[-54%] lg:right-0 lg:left-none lg:translate-x-[-35%]'/>

                <div className="lg:flex justify-start items-center max-w-[1180px] mx-auto">
                    <div className="p-6 lg:p-10 bg-white max-w-[320px] mx-auto lg:max-w-[900px] lg:mx-0 lg:pr-[128px]">

                        <h2 className='text-[16px] lg:text-[42px] font-extrabold text-[#005348] mb-[24px] lg:mb-[40px] tracking-[-0.66px] lg:tracking-[-1.92px] leading-[1.3]'>특별한
                            초록색 돼지 피기</h2>
                        <p className="text-[12px] lg:text-[18px] leading-5 lg:leading-[1.6] text-[#005348] ">
                            피기가 태어나던 해 큰 태풍이 와서 피기는 토끼들이 사는 마을로 쓸려 내려왔습니다.<br/><br/>
                            지나가던 삼 남매의 엄마 토끼는 혼자 쓰러져있는 피기를 불쌍히 여기고 데려다 키우기로 했습니다. 피기는 평생 토끼들과만 살아와서 본인도 토끼인 줄 압니다. 태어날
                            때부터 얼굴과 몸이 왜 초록색인지는 아직도 미스터리이지만, 초록색 컬러만큼 초록 야채를 즐겨먹습니다. 그러다 가드닝의 매력에 빠져 가드닝도
                            시작했습니다. <br/><br/>
                            어릴 때부터 엄마 토끼가 피기에게 ‘넌 다른게 아니라 특별한거야’라고 매일 칭찬과 독려를 해주었기에 피기는 본인만의 넓은 귀도, 초록색 몸도, 꼬리도 좋아합니다.
                            피기는 코대중으로 샐러드의 완벽한 비율을 압니다. 직접 가드닝한 신선한 채소들과 맛있는 토핑들로 샐러드를 자주 만들곤 합니다.<br/><br/>
                            탄단지 비율이 완벽한! 신선하고 맛있는 샐러드를 여러분에게도 소개합니다!
                        </p>
                    </div>
                </div>
            </section>

            {/* 브랜드 제품 */}
            <section className="relative w-full lg:px-0 py-[36px] lg:py-[80px] overflow-hidden bg-[#FFFFFF]">
                <div className="max-w-[1000px] mx-auto w-full relative z-10">
                    <ProductSwiper products={products} aspectRatio="1/2" theme="pigin"/>
                </div>
            </section>

            {/* Brand Media 섹션 */}
            <section
                className='relative w-full px-5 lg:px-0 py-[36px] lg:py-[80px] overflow-hidden bg-[#FFFFFF]'>
                <img src="/img/brand/pigin_home_back_03.svg" alt=""
                     className='absolute scale-[200%]  lg:scale-[150%] w-full left-0 top-1/2 translate-y-[50%] lg:top-1/2 lg:translate-y-[-25%]'/>
                <div className="relative max-w-[1220px] mx-auto w-full z-10">
                    <BrandMedia images={brandMediaImages} theme="pigin"/>
                </div>
            </section>

            <section className="flex justify-center items-center py-[60px] lg:py-[120px] bg-[#BBE363]">
                <a href="https://www.instagram.com/piginthegarden_go/" target='_blank'
                   className="text-[16px] md:text-[24px] lg:text-[32px] text-[#005348] font-semibold flex justify-center items-center gap-2 lg:gap-4">피그인더가든
                    인스타그램
                    <div
                        className="w-[24px] h-[24px] md:w-[32px] md:h-[32px] lg:w-[60px] lg:h-[60px] bg-[#005348] flex justify-center items-center rounded-full">
                        <Icon name="arrowTop" className="size-4 lg:size-8 *:fill-white rotate-90 "/>
                    </div>
                </a>
            </section>
        </main>
    );
};

export default PigInTheGarden;
