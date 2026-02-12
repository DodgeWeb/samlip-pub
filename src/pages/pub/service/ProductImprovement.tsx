import React, {useState} from 'react';
import {motion, AnimatePresence} from 'framer-motion';
import {Icon} from '@/components/pub/icons';

interface ImprovementCase {
    id: number;
    number: string; // PC용 (점 포함)
    numberMobile: string; // 모바일용 (점 없음)
    title: string;
    request: string;
    requestImage?: string; // 요청 내용 이미지
    improvement: string;
    improvementImage?: string; // 개선 내용 이미지
}

const improvementCases: ImprovementCase[] = [
    {
        id: 2,
        number: '02.',
        numberMobile: '02',
        title: '호떡 개선 사례 ',
        request: '제품 내 불필요한 플라스틱 용기가 삽입되어 있어, 환경을 위해 줄여주시길 바랍니다.',
        requestImage: '/img/service/before_01.png',
        improvement: '이마트 옛날꿀호떡 제품 내 플라스틱 트레이를 제거했습니다.',
        improvementImage: '/img/service/after_01.png',
    },
    {
        id: 1,
        number: '01.',
        numberMobile: '01',
        title: '만쥬 카스테라롤 개선 사례',
        request: '제품이 담겨있는 트레이가 쉽게 깨져서 불편합니다.',
        requestImage: '/img/service/before_02.png',
        improvement: '기존에 패트 재질로 되어있는 트레이를 쉽게 파손되지 않는 PP재질로 변경했습니다.',
        improvementImage: '/img/service/after_02.png',
    },
];

const ProductImprovement = () => {
    const [expandedId, setExpandedId] = useState<number | null>(null);

    const toggleAccordion = (id: number) => {
        setExpandedId(expandedId === id ? null : id);
    };

    return (
        <div className="w-full max-w-[1220px] mx-auto px-5">
            <h2 className="text-[18px] lg:text-[42px] font-extrabold lg:pb-[70px] text-black text-center tracking-[-0.54px] lg:tracking-0 mb-6 lg:mb-0">제품개선사례</h2>
            <div className="flex flex-col gap-3">
                {improvementCases.map((item: ImprovementCase) => {
                    const isExpanded = expandedId === item.id;

                    return (
                        <section key={item.id} className="w-full">
                            {/* 아코디언 헤더 */}
                            <button
                                onClick={() => toggleAccordion(item.id)}
                                className={`
                        w-full flex flex-col lg:flex-row items-start gap-[8px] lg:items-center lg:gap-[9px] 
                        p-4 lg:p-[32px]
                        ${isExpanded ? 'bg-white border border-[#f40202]' : 'bg-[#F7F7F7]'}
                    `}
                            >
                                <div className='flex flex-row items-center w-full gap-[4px] lg:gap-[12px] lg:w-auto'>
                                    <span
                                        className="text-[12px] lg:text-[26px] font-bold lg:font-extrabold leading-[1.6] lg:leading-[0.67em] text-[#f40202] flex-shrink-0 tracking-[-0.36px] lg:tracking-0">
                                        {item.numberMobile}
                                    </span>
                                </div>

                                {/* 제목 */}
                                <div className='flex flex-row flex-1 justify-between items-center w-full'>
                                    <span
                                        className="flex-1 text-left text-[14px] lg:text-[22px] font-normal leading-[1.7] lg:leading-[1.6em] text-black tracking-[-0.42px] lg:tracking-0">
                                        {item.title}
                                    </span>
                                    <Icon
                                        name="arrow_down_black"
                                        size={20}
                                        className={`flex-shrink-0 !h-5 transition-transform duration-200 *:fill-black lg:size-10 ${
                                            isExpanded ? 'rotate-180' : ''
                                        }`}
                                    />
                                </div>
                            </button>

                            {/* 아코디언 내용 */}
                            <AnimatePresence>
                                {isExpanded && (
                                    <motion.div
                                        initial={{height: 0, opacity: 0}}
                                        animate={{height: 'auto', opacity: 1}}
                                        exit={{height: 0, opacity: 0}}
                                        transition={{duration: 0.3, ease: 'easeInOut'}}
                                        className="overflow-hidden bg-[#f7f7f7] "
                                    >
                                        <div
                                            className="px-5 py-5 lg:px-[100px] lg:py-[50px] flex flex-col gap-6 lg:gap-[100px] lg:grid lg:grid-cols-2 lg:justify-center">
                                            <div
                                                className="flex flex-col gap-[6px] lg:gap-3 lg:items-center lg:justify-center flex-1">
                                                <span
                                                    className="bg-[#7e7e7e]  px-2 py-0.5 lg:px-4 lg:py-1 text-[10px] lg:text-[18px] font-normal  text-white  flex-shrink-0 tracking-[-0.3px] lg:tracking-[-0.36px] lg:min-w-[80px] whitespace-pre center-box w-fit">
                                                  요청 내용
                                                </span>
                                                <p className="flex-1 text-[12px] lg:text-[18px] font-normal leading-[1.6] lg:leading-[1.6em] text-black tracking-[-0.36px] lg:tracking-0 lg:text-center">
                                                    {item.request}
                                                </p>
                                                {item.requestImage && (
                                                    <img
                                                        src={item.requestImage}
                                                        alt="요청 내용 이미지"
                                                        className="max-w-[120px]  w-full lg:max-w-[100%] "/>
                                                )}
                                            </div>
                                            <div
                                                className="flex flex-col gap-[6px] lg:gap-3 lg:items-center lg:justify-center">
                                                <span
                                                    className="bg-[#f40202] px-2 py-0.5 lg:px-4 lg:py-1 text-[10px] lg:text-[18px] font-normal  text-white flex-shrink-0 tracking-[-0.3px] lg:tracking-[-0.36px] lg:min-w-[80px] whitespace-pre center-box w-fit">
                                                  개선 내용
                                                </span>
                                                <p className="flex-1 text-[12px] lg:text-[18px] font-normal leading-[1.6] lg:leading-[1.6em] text-black tracking-[-0.36px] lg:tracking-0 lg:text-center">
                                                    {item.improvement}
                                                </p>

                                                {item.improvementImage && (
                                                    <img
                                                        src={item.improvementImage}
                                                        alt="개선 내용 이미지"
                                                        className="max-w-[120px] w-full lg:max-w-[100%]"/>
                                                )}
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </section>
                    );
                })}
            </div>
        </div>
    );
};

export default ProductImprovement;

