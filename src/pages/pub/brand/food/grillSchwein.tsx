import {MotionBox} from '@/components/pub/MotionBox';
import {ProductSwiper} from '@/components/pub/ProductSwiper';
import 'swiper/css/bundle';
import {BrandMedia} from '@/components/pub/brand/BrandMedia';

const GrillSchwein = () => {

    const brandMediaImages = [
        {
            image: '/img/brand_media/glucks-schwein_media_01.jpg',
            link: 'https://www.instagram.com/reel/DNplrZ8x74I/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=='
        },
        {
            image: '/img/brand_media/glucks-schwein_media_02.jpg',
            link: 'https://www.instagram.com/reel/DHIfikUpP1i/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=='
        },
        {
            image: '/img/brand_media/glucks-schwein_media_03.jpg',
            link: 'https://www.instagram.com/p/C7Q2X_9pZmj/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=='
        },
        {
            image: '/img/brand_media/glucks-schwein_media_04.jpg',
            link: 'https://www.instagram.com/p/C5rrQmQrKLU/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=='
        },
    ];


    const products = [
        {id: 1, name: '육즙가득부어스트 바질', image: '/img/brand/grill/grill_product_01.png'},
        {id: 2, name: '육즙가득부어스트 스모크', image: '/img/brand/grill/grill_product_02.png'},
        {id: 3, name: '육즙가득부어스트 스모크', image: '/img/brand/grill/grill_product_03.png'},
        {id: 4, name: '그릭슈바인 캔햄', image: '/img/brand/grill/grill_product_04.png'},
    ];


    return (
        <main className="bg-white">
            {/* 메인 섹션 */}
            <section className='w-full h-[360px] lg:h-[800px] relative overflow-hidden mt-[40px] lg:mt-[60px]'>
                <div className='absolute inset-0 z-10 w-full'>

                    <div
                        className="flex justify-center items-center  h-full sticky z-20 mx-auto md:justify-start md:max-w-[700px] lg:max-w-[1180px]">
                        <img src="/img/brand/grill/grill_logo.svg" alt=""
                             className="max-w-[174px] md:max-w-[280px] lg:max-w-[430px] lg:mt-[-40px]"/>
                    </div>


                    <img src="/img/brand/grill/grill_banner_object_mo.png" alt=""
                         className="object-cover absolute top-0 left-0 w-full h-full md:hidden"/>
                    <img src="/img/brand/grill/grill_banner_object.png" alt=""
                         className="hidden object-cover absolute top-0 left-0 w-full h-full md:block"/>
                </div>
            </section>

            {/* 그릭슈바인 - 브랜드 스토리 */}
            <section className='bg-[#E3C5A0] relative w-full overflow-hidden py-9 lg:py-[120px]'>
                {/* 배경 장식 이미지 */}
                <img src="/img/brand/grill_story_back.svg" alt=""
                     className="absolute inset-0  h-full fill-[#fff] w-[100%] object-cover opacity-40 scale-[250%] lg:scale-[100%]"/>
                <div className='px-5 lg:px-0 max-w-[1080px] mx-auto w-full relative z-10'>
                    <div
                        className='flex flex-col gap-[24px] lg:gap-[80px] w-full lg:flex-row items-center lg:items-start'>
                        {/* Brand Story 제목 */}
                        <h2 className='gt-ultra text-[22px] lg:text-[22px] font-bold text-[#77140C] tracking-[-0.66px] leading-[1.1] text-center lg:hidden'>Brand
                            Story</h2>
                        <p className=" text-[22px] lg:text-[32px] font-extrabold text-[#77140C] tracking-[-0.66px] leading-[1.3] text-center lg:hidden">신선한
                            고기의 맛과 식감을 그대로!</p>
                        {/* 스토리 이미지 */}
                        <MotionBox className='hidden lg:block'>
                            <div
                                className='w-full flex-none lg:max-w-[500px] lg:w-[500px] h-[272px] lg:h-auto relative lg:aspect-[5/6] '>
                                <img
                                    src="/img/brand/grill/grill_story_01.png"
                                    alt="그릭 슈바인 스토리"
                                    className="object-cover w-full h-full"
                                />
                            </div>
                        </MotionBox>

                        <section className='flex flex-col gap-[24px] lg:gap-[40px] items-center lg:items-start w-full'>
                            <h2 className='gt-ultra text-[22px] lg:text-[64px] font-bold text-[#77140C] tracking-[-0.66px] leading-[1.1] hidden lg:block text-center lg:text-left'>
                                Brand Story
                            </h2>

                            <p className=" text-[18px] lg:text-[36px] font-extrabold text-[#77140C] tracking-[-0.66px] leading-[1.5] text-left hidden lg:block whitespace-nowrap">신선한
                                고기의 맛과 식감을 그대로!</p>

                            {/* 첫 번째 텍스트 섹션 */}
                            <div className='flex flex-col gap-[8px] items-center  max-w-[320px] lg:max-w-[800px]'>

                                <div
                                    className='text-[12px] lg:text-[18px] text-[#77140C] text-center lg:text-left leading-[1.6] tracking-[-0.36px]'>
                                    <p className='lg:mb-[16px]'>
                                        웰메이드 델리미트 그릭슈바인 국내산 냉장신선육을 저온 숙성해 풍부한 육즙과 톡 터지는 쫄깃한 식감을 입안 가득 전달하는 그릭슈바인은 제대로 만든
                                        델리미트입니다.
                                        <br/><br/>
                                        ‘행운의 돼지 = 그릭슈바인’이 전하는 고품질의 육가공 제품으로 고기 본질의 최상의 맛과 풍성한 식감을 즐겨보세요.
                                    </p>
                                </div>
                            </div>

                            <MotionBox>
                                <div
                                    className='w-full flex-none lg:max-w-[500px] lg:w-[500px] h-[272px] lg:h-auto relative lg:aspect-[5/6] lg:hidden block '>
                                    <img
                                        src="/img/brand/grill/grill_story_01.png"
                                        alt="그릭 슈바인 스토리"
                                        className="object-cover w-full h-full"
                                    />
                                </div>
                            </MotionBox>

                        </section>
                    </div>
                </div>
            </section>

            {/* 브랜드 제품 */}
            <section className="relative w-full lg:px-0 py-[36px] lg:py-[80px] overflow-hidden bg-[#401E1F]">
                <div className="max-w-[1000px] mx-auto w-full relative z-10">
                    <ProductSwiper products={products} aspectRatio="1/2" theme="grill"/>
                </div>
            </section>

            {/* Brand Media 섹션 */}
            <section
                className='relative w-full px-5 lg:px-0 py-[36px] pb-[48px] lg:py-[80px] overflow-hidden bg-[#401E1F] lg:bg-[#2D1112]'>
                <img src="/img/brand/grill/grill_home_back_02.svg" alt=""
                     className='hidden absolute left-0 z-10 w-full lg:top-0 lg:block'/>
                <img src="/img/brand/grill/grill_home_back_02_mo.svg" alt=""
                     className='absolute bottom-[40px] left-0 z-10 w-full lg:hidden'/>

                <div className="relative max-w-[1220px] mx-auto w-full z-10">
                    <BrandMedia images={brandMediaImages} theme="grill"/>
                </div>
            </section>
        </main>
    );
};

export default GrillSchwein;