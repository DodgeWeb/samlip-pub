// src/components/pub/footer/Footer.tsx
import React, {useEffect, useState} from 'react';
import Link from 'next/link';
import {Button} from '@/components/pub/atoms';
import {Icon} from '@/components/pub/icons';

// 푸터 메뉴 데이터 (링크 포함)
const footerMenuData = [
    {
        heading: "회사 소개",
        items: [
            {label: "Identity", path: "/pub/company/identity"},
            {label: "연혁", path: "/pub/company/history"},
            {label: "CI/BI", path: "/pub/company/ci-bi"},
            {label: "사업소개", path: "/pub/company/business"},
            {label: "삼립의 기술", path: "/pub/company/technology"},
            {label: "투자 정보", path: "/pub/company/invest"},
            {label: "위치", path: "/pub/company/location"}
        ]
    },
    {
        heading: "지속가능경영",
        items: [
            {label: "지속가능경영 체계", path: "/pub/sustainability/system"},
            {label: "환경", path: "/pub/sustainability/environment"},
            {label: "사회", path: "/pub/sustainability/social"},
            {label: "지배구조", path: "/pub/sustainability/governance"},
            {label: "보고서 및 정책", path: "/pub/sustainability/report-policy"},
            {label: "윤리경영", path: "/pub/sustainability/ethics"},
            {label: "사회공헌", path: "/pub/sustainability/contribution"}
        ]
    },
    {
        heading: "브랜드",
        items: [
            {label: "삼립", path: "/pub/brand/home"},
            {label: "베이커리", path: "/pub/brand/bakery"},
            {label: "푸드", path: "/pub/brand/food"},
            {label: "Store/온라인", path: "/pub/brand/store"}
        ]
    },
    {
        heading: "삼립 NOW",
        items: [
            {label: "삼립 스토리", path: "/pub/now/story"},
            {label: "미디어", path: "/pub/now/media"},
            {label: "삼립의 약속", path: "/pub/now/promise"},
            {label: "보도자료", path: "/pub/now/pr"}
        ]
    }
];

const terms = {
    privacy: '/terms',
    video: '/terms/video'
};

export function Footer() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    return (
        <footer className="bg-cream px-5 lg:px-10 py-[23px] lg:py-[70px] w-full">
            <img src="/img/footer_img.png" alt="footer_logo" className="hidden w-full lg:block"/>
            <img src="/img/footer_mo.png" alt="footer_logo" className="lg:hidden max-w-[202px]"/>

            <div className="">
                <div className="hidden gap-16 w-full lg:flex">
                    {footerMenuData.map((section, index) => (
                        <div
                            key={index}
                            className="space-y-4 text-[15px] *:leading-[14px] mt-[26px] mb-[90px]"
                        >
                            <h3 className="mb-5 font-bold text-samlipRed h-[14px]">
                                {section.heading}
                            </h3>

                            <ul className="space-y-5">
                                {section.items.map((item, itemIndex) => (
                                    <li key={itemIndex}>
                                        <Link
                                            href={item.path}
                                            className="text-[15px] h-[14px] text-[#000] transition-colors duration-200 hover:text-red-600 whitespace-nowrap margin"
                                        >
                                            {item.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <section>
                    <div className="hidden gap-4 justify-end items-center pb-3 lg:flex">
                        <Link
                            href="/pub/notice"
                            className=' text-[15px] font-bold text-[#500C08]'
                        >
                            공지사항
                        </Link>

                        <Link
                            href="/pub/recruit">
                            <Button
                                intent="secondary"
                                rounded="full"
                                className="flex gap-1 justify-center items-center"
                            >
                                <span className="text-[15px] leading-[15px]">인재채용</span>
                                <Icon name="arrowOutward" size={10} className=""/>
                            </Button>
                        </Link>
                    </div>

                    <div className="w-full h-[0.5px] bg-[#d1cdcd] lg:block hidden"></div>
                </section>

                <section className="flex justify-between pt-6 lg:pt-3">
                    <div
                        className="flex lg:gap-7 items-center text-[10px] gap-[10px] lg:text-[15px] *:leading-[14px] text-[#7E7E7E] font-light">
                        <a href={terms.privacy} className="cursor-pointer">개인정보처리방침</a>
                        <span className="h-[22px] w-[0.5px] bg-[#7E7E7E] bg-opacity-50 lg:block hidden"></span>

                        <a href={terms.video} className="cursor-pointer">영상정보처리기기 운영관리방침</a>
                        <span className="h-[22px] w-[0.5px] bg-[#7E7E7E] bg-opacity-50 lg:block hidden"></span>

                        <Link
                            href="https://procure.spc.co.kr/login?springViewName=redirect%3A%2Flogin"
                            target="_blank"
                            className="cursor-pointer"
                        >
                            거래희망회사 사전등록
                        </Link>
                    </div>

                    <div
                        className="lg:flex hidden gap-7 items-center text-[15px] font-light *:leading-[14px] text-[#7E7E7E]">
                        <Link
                            href="https://brand.naver.com/samlip"
                            target="_blank"
                            className="flex gap-2 items-center cursor-pointer"
                        >
                            삼립몰
                            <Icon name="arrowOutward" size={8} className="*:fill-[#7E7E7E]"/>
                        </Link>

                        <Link
                            href="/notice"
                            className='block lg:hidden'
                        >
                            공지사항
                        </Link>
                        <Link
                            href="/service"
                        >
                            고객서비스
                        </Link>

                        {/* <p className="cursor-pointer">언어설정</p> */}
                    </div>
                </section>

                <section
                    className="text-[10px] lg:text-[13px] *:leading-[14px] text-[#7E7E7E] lg:pt-8 pt-[28px] font-light">
                    <p>고객센터 전화번호 080-739-8572 (월~금 09:00~17:00)</p>
                    <p>
                        101, Gongdan 1-daero, Siheung-si, Gyeonggi-do, Republic of Korea (주)SPC삼립 대표이사 경재형, 김범수
                    </p>
                    <p className="pt-4 text-[11px] lg:text-[13px]">ⓒ SPC samlip. All rights reserved.</p>
                </section>
            </div>
        </footer>
    );
}

export default Footer;