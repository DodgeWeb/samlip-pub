import React, { useMemo } from 'react';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import 'swiper/css/bundle';

export type BrandMediaImage = {
    image: string;
    link?: string;
};

interface BrandMediaProps {
    images: BrandMediaImage[];
    /** 페이지별 스타일 분기용(필요 시) */
    theme?: string;
    className?: string;
}

export const BrandMedia: React.FC<BrandMediaProps> = ({ images, className = '' }) => {
    const slides = useMemo(() => images ?? [], [images]);

    return (
        <section className={`brand_media_section ${className}`}>
            <div className="flex items-center justify-between mb-4 lg:mb-8">
                <h3 className="gt-ultra text-[22px] lg:text-[42px] font-extrabold tracking-[-0.66px] leading-[1.3]">
                    Brand Media
                </h3>
            </div>

            {slides.length === 0 ? (
                <div className="py-10 text-sm text-center text-gray-600">
                    등록된 미디어가 없습니다.
                </div>
            ) : (
                <Swiper
                    modules={[Navigation]}
                    navigation
                    spaceBetween={12}
                    slidesPerView={1.2}
                    breakpoints={{
                        640: { slidesPerView: 2.2, spaceBetween: 16 },
                        1024: { slidesPerView: 4, spaceBetween: 20 },
                    }}
                >
                    {slides.map((item, idx) => {
                        const content = (
                            <div className="overflow-hidden bg-white cursor-pointer">
                                <div className="relative w-full aspect-square">
                                    <img
                                        src={item.image}
                                        alt=""
                                        className="absolute inset-0 object-cover w-full h-full"
                                    />
                                </div>
                            </div>
                        );

                        return (
                            <SwiperSlide key={`${item.image}-${idx}`}>
                                {item.link ? (
                                    <Link
                                        href={item.link}
                                        target={item.link.startsWith('http') ? '_blank' : undefined}
                                        rel={item.link.startsWith('http') ? 'noreferrer' : undefined}
                                    >
                                        {content}
                                    </Link>
                                ) : (
                                    content
                                )}
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
            )}
        </section>
    );
};

export default BrandMedia;
