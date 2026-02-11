import React from 'react';
import {useRouter} from 'next/router';
import {Icon} from '@/components/pub/icons';
import {MediaCard} from '@/components/pub/MediaCard';


const Media = () => {
    const router = useRouter();

    return (
        <main className='overflow-hidden relative w-full bg-cream lg:pt-[120px] lg:mt-[90px]'>
            <div
                className='absolute top-[-120px] left-0 w-full h-[500px] lg:h-[1400px] lg:scale-[1.2] scale-[2] lg:top-[-15%] xl:top-[-18%]'>
                <Icon name="back_wave" className="absolute inset-0 w-full h-full *:*:fill-grilledMeats"/>
            </div>
            <section className='relative z-10 pt-[74px] pb-20 max-w-[1060px] mx-auto px-5'>
                <h1 className='lg:text-left text-[40px] lg:text-[80px] leading-[0.95] lg:pb-4 font-extrabold text-[#FBFAE7] text-center tracking-[-0.54px] lg:tracking-0 gt-ultra pb-3'>
                    SAMLIP MEDIA <br/>
                    ALL IN <br className='lg:hidden'/>
                    ONE PLACE! <br/>
                </h1>
                <p className='mo_subtitle  lg:!text-[32px] !font-semibold text-cream text-center  lg:text-left tracking-[-0.54px] lg:tracking-0 '>
                    삼립의 최근 소식을 모아서 한눈에 살펴보세요!
                </p>
            </section>

            <section className='px-5 max-w-[1060px] mx-auto pb-[60px]'>
                <MediaCard/>
            </section>

            <section className='bg-[#F2E3C2] relative py-[60px] px-5 lg:py-[120px] lg:px-0 overflow-hidden'>
                {/* 배경 웨이브 */}
                <div
                    className='flex overflow-hidden absolute justify-center items-center w-[120%] lg:w-[200%] left-1/2 -translate-x-1/2 h-[200%] top-1/2 -translate-y-1/2 '>
                    <Icon name="backward" className="*:fill-cream w-full"/>
                </div>

                {/* 콘텐츠 */}
                <div className='relative z-10 flex flex-col gap-6 lg:gap-[24px] items-center max-w-[1220px] mx-auto'>
                    {/* 제목 */}
                    <h2 className='text-[#f40202] text-center text-[36px] lg:text-[60px] font-extrabold leading-[0.95] tracking-[-1.08px] lg:tracking-[-1.44px] gt-ultra'>
                        Click the <br className='lg:hidden'/> media chips below!
                    </h2>

                    {/* 부제목 */}
                    <p className='mo_subtitle tl_body1 lg:!txet-[28px] text-samlipRed text-center font-semibold '>
                        아래 삼립 미디어 채널을 통해 더 살펴보세요!
                    </p>

                    {/* 미디어 칩들 */}
                    <div
                        className='relative gap-0 lg:gap-6 mt-4 w-full lg:mt-8 max-w-[240px] h-[135px] lg:max-w-[680px] lg:h-[400px] mx-auto'>
                        {/* PR 칩 */}
                        <div
                            className='absolute top-3.5 left-9 lg:top-[20px] lg:left-[120px] transform rotate-[-13deg] lg:rotate-[-13deg]'>
                            <button
                                onClick={() => router.push('/pub/now/pr')}
                                className='bg-[#500c08] flex gap-[6px] items-center justify-center px-5 py-2 lg:px-[65px] lg:py-[26px] rounded-full hover:opacity-90 transition-opacity w-auto h-[43px] lg:h-[123px]'
                            >
                                <Icon name="pr"
                                      className="*:fill-[#fbf7e9] w-[13px] h-[13px] lg:w-[36px] lg:h-[36px] "/>
                                <span
                                    className='text-[#fbf7e9] text-[14px] lg:text-[34px] font-extrabold gt-ultra whitespace-nowrap'>PR</span>
                            </button>
                        </div>

                        {/* Facebook 칩 */}
                        <div
                            className='absolute top-[36px]  right-0 lg:right-[10px] lg:top-[100px]  transform rotate-[10deg] lg:rotate-[11deg]'>
                            <button
                                onClick={() => window.open('https://www.facebook.com/samlipgf/?locale=ko_KR', '_blank')}
                                className='bg-[#54C7DE] flex gap-[4px] lg:gap-[6px] items-center justify-center px-5 py-2 lg:px-[65px] lg:py-[26px] rounded-full hover:opacity-90 transition-opacity w-auto h-[43px] lg:h-[123px]'>
                                <Icon name="facebook"
                                      className="*:fill-[#fbf7e9] w-[13px] h-[13px] lg:w-[36px] lg:h-[36px]"/>
                                <span
                                    className='text-[#fbf7e9] text-[14px] lg:text-[34px] font-extrabold gt-ultra whitespace-nowrap'>Facebook</span>
                            </button>
                        </div>

                        {/* Youtube 칩 */}
                        <div
                            className='absolute bottom-[30px] left-0 lg:bottom-[120px]  transform rotate-[-5deg] lg:rotate-[-6deg]'>
                            <button
                                onClick={() => window.open('https://www.youtube.com/channel/UC88W-nkd_7G9S7u-2xlX4DQ', '_blank')}
                                className='bg-[#ed1c2a] flex gap-[3px] lg:gap-[6px] items-center justify-center px-5 py-2 lg:px-[65px] lg:py-[26px] rounded-full hover:opacity-90 transition-opacity w-auto h-[43px] lg:h-[123px]'>
                                <Icon name="youtube"
                                      className="*:fill-[#fbf7e9] w-[13px] h-[13px] lg:w-[39px] lg:h-[39px]"/>
                                <span
                                    className='text-[#fbf7e9] text-[14px] lg:text-[34px] font-extrabold gt-ultra whitespace-nowrap'>Youtube</span>
                            </button>
                        </div>

                        {/* Instagram 칩 */}
                        <div
                            className='absolute bottom-[-1px] right-4 lg:bottom-[20px] lg:right-[80px] transform rotate-[-8deg] lg:rotate-[-7deg]'>
                            <button
                                onClick={() => window.open('https://www.instagram.com/samlip.official/', '_blank')}
                                className='bg-black flex gap-[4px] lg:gap-[6px] items-center justify-center px-5 py-2 lg:px-[65px] lg:py-[26px] rounded-full hover:opacity-90 transition-opacity w-auto h-[43px] lg:h-[123px]'>
                                <Icon name="instagram"
                                      className="*:fill-[#fbf7e9] w-[13px] h-[13px] lg:w-[42px] lg:h-[42px]"/>
                                <span
                                    className='text-[#fbf7e9] text-[14px] lg:text-[34px] font-extrabold gt-ultra whitespace-nowrap'>Instagram</span>
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Media;
