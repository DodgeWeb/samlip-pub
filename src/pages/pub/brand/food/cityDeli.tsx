import {MotionBox} from '@/components/pub/interAtion/MotionBox';
import {ProductSwiper} from '@/components/pub/ProductSwiper';
import 'swiper/css/bundle';
import {BrandMedia} from '@/components/pub/brand/BrandMedia';

const CityDeli = () => {

    const brandMediaImages = [
        {
            image: '/img/brand_media/city-deli_media_01.jpg',
            link: 'https://www.instagram.com/p/DOF6bY1kqdG/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=='
        },
        {
            image: '/img/brand_media/city-deli_media_02.jpg',
            link: 'https://www.instagram.com/p/DHAxx0dRTOW/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=='
        },
        {
            image: '/img/brand_media/city-deli_media_03.jpg',
            link: 'https://www.instagram.com/p/DFe4PS4RDut/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=='
        },
        {
            image: '/img/brand_media/city-deli_media_04.jpg',
            link: 'https://www.instagram.com/reel/DD6do15Pixo/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=='
        },
    ];


    const products = [
        {id: 1, name: '육즙가득 함박스테이크', image: '/img/brand/citydeli_product_01.png'},
        {id: 2, name: '육즙가득 치즈 함박스테이크', image: '/img/brand/citydeli_product_02.png'},
        {id: 3, name: '로제치킨 라이스', image: '/img/brand/citydeli_product_03.png'},
        {id: 4, name: '미트볼 볼로네제', image: '/img/brand/citydeli_product_04.png'},
        {id: 5, name: '모짜렐라 치즈 핫도그(4입/1입)', image: '/img/brand/citydeli_product_08.png'},
        {id: 6, name: '크리스피 핫도그(4입/1입)', image: '/img/brand/citydeli_product_09.png'},
        {id: 7, name: '프랑크푸르터 핫도그(4입/1입)', image: '/img/brand/citydeli_product_10.png'},
    ];


    return (
        <main className="bg-white">
            {/* 메인 섹션 */}
            <section className='w-full h-[360px] lg:h-[900px] relative overflow-hidden mt-[40px] lg:mt-[60px]'>
                <div className='absolute inset-0 z-10 w-full'>
                    <img src="/img/brand/citydeli_logo.svg" alt=""
                         className="pt-[40px] mx-auto w-full max-w-[200px] lg:max-w-[524px] lg:pt-[120px] sticky z-20"/>


                    <img src="/img/brand/citydeli_banner_object.png" alt=""
                         className=" max-w-none object-cover lg:h-full lg:w-full lg:left-1/2 w-[800px] bottom-[0px] absolute left-[calc(60%-900px)] translate-x-1/2 lg:translate-x-[-50%]"/>
                </div>
            </section>

            {/* 시티델리 - 브랜드 스토리 */}
            <section className='bg-[#1E470B] relative w-full overflow-hidden py-9 lg:py-[120px]'>
                {/* 배경 장식 이미지 */}
                <img src="/img/brand/citydeli_story_back.svg" alt=""
                     className="absolute inset-0  h-full fill-[#fff] w-[100%] object-cover "/>
                <div className='px-5 lg:px-0 max-w-[1080px] mx-auto w-full relative z-10'>
                    <div
                        className='flex flex-col gap-[24px] lg:gap-[80px] w-full lg:flex-row items-center lg:items-start'>
                        {/* Brand Story 제목 */}
                        <h2 className='gt-ultra text-[22px] lg:text-[22px] font-bold text-[#fff] tracking-[-0.66px] leading-[1.1] text-center lg:hidden'>Brand
                            Story</h2>
                        <p className=" text-[22px] lg:text-[32px] font-extrabold text-[#fff] tracking-[-0.66px] leading-[1.3] text-center lg:hidden">Taste
                            the City, City Deli<br/>빠르게 흐르는 도시의 시간</p>
                        {/* 스토리 이미지 */}
                        <MotionBox>
                            <div
                                className='w-full flex-none lg:max-w-[500px] lg:w-[500px] h-[272px] lg:h-auto relative lg:aspect-[5/6]'>
                                <img
                                    src="/img/brand/citydeli_story_01.png"
                                    alt="시티델리 스토리"
                                    className="object-cover w-full h-full"
                                />
                            </div>
                        </MotionBox>

                        <section className='flex flex-col gap-[24px] lg:gap-[40px] items-center lg:items-start w-full'>
                            <h2 className='gt-ultra text-[22px] lg:text-[64px] font-bold text-[#fff] tracking-[-0.66px] leading-[1.1] hidden lg:block text-center lg:text-left'>
                                Brand Story
                            </h2>

                            <p className=" text-[22px] lg:text-[32px] font-extrabold text-[#fff] tracking-[-0.66px] leading-[1.5] text-left hidden lg:block">Taste
                                the City, City Deli<br/>빠르게 흐르는 도시의 시간</p>

                            {/* 첫 번째 텍스트 섹션 */}
                            <div className='flex flex-col gap-[8px] items-center  max-w-[320px] lg:max-w-[800px]'>

                                <div
                                    className='text-[12px] lg:text-[18px] text-[#fff] text-center lg:text-left leading-[1.6] tracking-[-0.36px]'>
                                    <p className='mb-[16px]'>
                                        시티델리는 당신의 하루에 어떤 음식이 필요할지 고민합니다.
                                        <br/><br/>
                                        바쁜 일상 속에서 챙기는 소중한 한 끼가 번거로운 시간이 아닌 미식의 순간이 될 수 있도록. 매일 반복되는 도시의 일상이 다양한 맛과 색다른
                                        순간으로 다채로워질 수 있도록.
                                        <br/><br/>
                                        세계 모든 도시의 미식을 연구하고 큐레이션하여 엄선한 재료로 만든 높은 품질을 기준으로 언제 어디서든 간편하게 즐기는 제대로 된 한 끼를
                                        제안합니다.
                                        <br/><br/>
                                        시티델리와 함께 당신의 하루를 다채롭게 채워보세요!
                                    </p>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </section>

            {/* 브랜드 제품 */}
            <section className="relative w-full lg:px-0 py-[36px] lg:py-[80px] overflow-hidden bg-[#D6F0DA]">
                <div className="max-w-[1000px] mx-auto w-full relative z-10">
                    <ProductSwiper products={products} aspectRatio="1/2" theme="cityDeli"/>
                </div>
            </section>

            {/* Brand Media 섹션 */}
            <section
                className='relative w-full px-5 lg:px-0 py-[36px] pb-[48px] lg:py-[80px] overflow-hidden bg-[#FFFFFF]'>
                <img src="/img/brand/citydeli_home_back_02.svg" alt=""
                     className='absolute top-0  left-0 w-full lg:scale-[1]'/>
                <div className="relative max-w-[1220px] mx-auto w-full z-10">
                    <BrandMedia images={brandMediaImages} theme="cityDeli"/>
                </div>
            </section>
        </main>
    );
};

export default CityDeli;
