import React, {useState} from 'react';
import {motion, AnimatePresence} from 'framer-motion';
import {Icon} from '@/components/pub/icons';

interface FAQItem {
    id: number;
    category: string;
    question: string;
    answer: string;
}

const faqItems: FAQItem[] = [
    {
        id: 1,
        category: '접수',
        question: 'SPC삼립 고객상담은 어떻게 접수하나요?',
        answer: '제품에 불편을 느끼셨다면, 제품 포장 하단에 표시된 고객상담실 번호(080-739-8572)로 연락 주시거나, 홈페이지의 [고객상담 > 1:1 문의하기]를 통해 접수해주세요. 주말이나 공휴일에 전화로 문의주실 경우, 자동 녹음 기능을 통해 메시지를 남겨 주시면, 업무가 시작되는 날 오전에 빠르게 확인 후 순차적으로 안내 드리겠습니다.',
    },
    {
        id: 2,
        category: '소비기한',
        question: '빵 제품의 소비 기한이 궁금합니다.',
        answer: '빵 제품의 소비기한은 제품에 따라 다르지만, 보통 가장 짧은 소비기한은 5~7일입니다. 보다 정확한 소비기한은 제품 별 포장지에 표시된 날짜를 꼭 확인해 주시길 바랍니다.',
    },
    {
        id: 3,
        category: '소비기한',
        question: '샐러드 간편 채소 제품 포장에 소비기한 표시되지 않은 제품이 있습니다. 언제까지 먹을 수 있나요?',
        answer: '소비기한 대신 포장일이 표시된 제품은 농산물 제품에 해당합니다. 반드시 냉장 보관해주시고, 구입 후 가급적 빠른 시일 내에 섭취하시는 것을 권장 드립니다.',
    },
    {
        id: 4,
        category: '제품',
        question: '샌드위치 및 버거 제품에서 얇은 막과 같은 물질이 나왔습니다.',
        answer: '이는 원재료인 양파에서 발생한 자연스러운 현상입니다. 양파는 여러 겹의 껍질로 이루어진 만큼, 조리 및 가공 과정에서 겉껍질 일부가 수분에 닿으면 얇고 투명한 막과 같은 형태로 변형됩니다. 이는 원재료의 일부로, 인체에 해롭지 않으니 안심하고 드셔도 됩니다.\n\nSPC삼립은 고객님께서 안전하게 제품을 드실 수 있도록 원재료 선별과 세척, 그리고 조리 전 과정에서의 검수 절차를 철저히 관리하고 있습니다. 앞으로 식품 안전과 위생을 최우선적으로 생각하며 품질 관리에 힘쓰겠습니다.',
    },
    {
        id: 5,
        category: '제품',
        question: '샌드위치 제품에서 빨간색 물질이 나왔습니다.',
        answer: '해당 물질은 샌드위치에 사용된 치폴레 소스의 주재료인 치포틀레 페퍼 조각입니다. 치포틀레 페퍼는 멕시코 전통 요리에 쓰이는 고추를 훈연 및 건조해 만든 원재료로 특유의 붉은색을 띕니다. 조리·가공 과정에서 작은 조각이 남아있을 수 있으며, 이는 식품 원재료의 일부로 인체해 해롭지 않으니 안심하고 드셔도 됩니다.\n\nSPC삼립은 고객님께서 안전하게 제품을 드실 수 있도록 원재료 선별과 세척, 그리고 조리 전 과정에서의 검수 절차를 철저히 관리하고 있습니다. 앞으로 식품 안전과 위생을 최우선적으로 생각하며 품질 관리에 힘쓰겠습니다.',
    },
    {
        id: 6,
        category: '보관 및 섭취',
        question: '빵 제품은 어떻게 보관하는 것이 좋나요?',
        answer: '개봉 후에는 되도록 빠른 시간 안에 드시는 것이 가장 좋습니다. 제품별로 적합한 보관 방법은 포장지 하단에 자세히 안내되어 있으니 반드시 확인해 주시기 바랍니다.',
    },
    {
        id: 7,
        category: '보관 및 섭취',
        question: '샐러드 제품에 들어있는 채소는 바로 섭취가 가능한가요?',
        answer: '별도의 토핑 없이 채소만 들어있는 샐러드 제품은 농산물 제품이므로, 섭취 전 반드시 흐르는 물에 세척해 주셔야 합니다. 저희는 제품의 신선도를 유지하기 위해 포장 과정에서 수분 접촉을 최소화하고 있으니, 드시기 전 가볍게 세척 후 섭취하시길 바랍니다.',
    },
];

const FAQ = () => {
    const [expandedId, setExpandedId] = useState<number | null>(null);

    const toggleAccordion = (id: number) => {
        setExpandedId(expandedId === id ? null : id);
    };

    return (
        <div className="w-full max-w-[1220px] mx-auto px-5 ">
            <h2 className="text-[18px] lg:text-[42px] font-extrabold lg:pb-[70px] text-black text-center tracking-[-0.54px] lg:tracking-0 mb-6 lg:mb-0">
                자주 묻는 질문
            </h2>
            <div className="flex flex-col gap-3">
                {faqItems.map((item) => {
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
                                        className="text-[12px] lg:text-[26px] font-bold lg:font-extrabold leading-[1.6] lg:leading-[0.67em] text-[#f40202] flex-shrink-0 tracking-[-0.36px] lg:tracking-0">Q.</span>
                                    {/* 카테고리 */}
                                    <div
                                        className="px-[10px] lg:px-[20px] py-px lg:py-0.5 bg-[#d9d9d9] rounded-[99px] flex-shrink-0 text-[10px] lg:text-[15px] font-normal leading-[1.6] text-black flex items-center justify-center">
                                        {item.category}
                                    </div>
                                </div>

                                {/* 질문 */}
                                <div className='flex flex-row flex-1 justify-between items-center w-full'>
                                    <span
                                        className="flex-1 text-left text-[14px] lg:text-[22px] font-normal leading-[1.7] lg:leading-[1.6em] text-black tracking-[-0.42px] lg:tracking-0">{item.question}</span>
                                    <Icon
                                        name="arrow_down_black"
                                        size={20}
                                        className={`flex-shrink-0 transition-transform duration-200 size-5 *:fill-black lg:size-10 ${
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
                                        className="overflow-hidden bg-[#FFF1F1]"
                                    >
                                        <div
                                            className="px-4 py-4 lg:px-[32px] lg:py-[24px] flex flex-col lg:flex-row gap-[8px] lg:gap-3 items-start">
                                            <span
                                                className="text-[12px] lg:text-[26px] font-bold lg:font-extrabold  text-[#f40202] flex-shrink-0 tracking-[-0.36px] lg:tracking-0">
                                              A.
                                            </span>
                                            <p className="flex-1 text-[12px] lg:text-[22px] font-normal leading-[1.6] lg:leading-[1.6em] text-black tracking-[-0.36px] lg:tracking-0 whitespace-pre-line">
                                                {item.answer}
                                            </p>
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

export default FAQ;

