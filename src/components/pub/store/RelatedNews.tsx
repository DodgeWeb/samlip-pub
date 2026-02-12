import React from 'react';
import Link from 'next/link';

export type RelatedNewsItem = {
    id: number | string;
    image?: string;
    title: string;
    date?: string;
    link?: string;
};

interface RelatedNewsProps {
    items: RelatedNewsItem[];
    className?: string;
    title?: string;
}

const withPubPrefix = (href: string) => {
    if (href.startsWith('http')) return href;
    if (href.startsWith('/pub/')) return href;
    if (href.startsWith('/')) return `/pub${href}`;
    return href;
};

export const RelatedNews: React.FC<RelatedNewsProps> = ({
    items,
    className = '',
    title = '관련 소식',
}) => {
    if (!items || items.length === 0) {
        return null;
    }

    return (
        <section className={className}>
            <h3 className="gt-ultra text-[22px] lg:text-[42px] font-extrabold tracking-[-0.66px] leading-[1.3] text-center lg:text-left">
                {title}
            </h3>

            <div className="grid grid-cols-1 gap-4 mt-6 lg:mt-10 lg:grid-cols-4">
                {items.map((item) => {
                    const content = (
                        <article className="overflow-hidden bg-white border border-[#E5E5E5] cursor-pointer hover:bg-gray-50 transition-colors">
                            {item.image && (
                                <div className="relative w-full aspect-[4/3] bg-[#f7f7f7]">
                                    <img
                                        src={item.image}
                                        alt=""
                                        className="absolute inset-0 object-cover w-full h-full"
                                    />
                                </div>
                            )}
                            <div className="p-4">
                                <p className="text-[14px] lg:text-[18px] font-semibold leading-[1.4] line-clamp-2">
                                    {item.title}
                                </p>
                                {item.date && (
                                    <p className="mt-2 text-[12px] lg:text-[14px] text-grayTxt">
                                        {item.date}
                                    </p>
                                )}
                            </div>
                        </article>
                    );

                    if (!item.link) {
                        return (
                            <div key={item.id}>
                                {content}
                            </div>
                        );
                    }

                    const href = withPubPrefix(item.link);

                    return (
                        <Link
                            key={item.id}
                            href={href}
                            target={href.startsWith('http') ? '_blank' : undefined}
                            rel={href.startsWith('http') ? 'noreferrer' : undefined}
                        >
                            {content}
                        </Link>
                    );
                })}
            </div>
        </section>
    );
};

export default RelatedNews;
