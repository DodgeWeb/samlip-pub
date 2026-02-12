import {Icon} from '@/components/pub/icons';
import Link from 'next/link';

const CustomerFeedback = () => {

    const openInquiry = () => {
        return window.open('https://spcsamlip.co.kr/voc/', 'window_name', 'width=900,height=500,location=no,status=no,scrollbars=yes');
    }

    return (
        <div className="w-full">
            {/* 타이틀 */}
            <h2 className='text-center text-[18px] lg:text-[42px] font-extrabold leading-[1.5] lg:leading-[1.3em] text-black tracking-[-0.54px] lg:tracking-0 mb-6 lg:mb-8'>
                고객의견
            </h2>
            {/* 설명 */}
            <p className="text-center text-[14px] lg:text-[22px] font-normal leading-[1.7] lg:leading-[1.6em] text-black tracking-[-0.42px] lg:tracking-0 mb-6 lg:mb-12">
                SPC삼립은 소비자의 목소리를 <br className='lg:hidden'/> 가장 먼저 듣고, 나누며, 공감하겠습니다.
            </p>
            {/* 프로세스 섹션 */}
            <div className="flex flex-col  gap-[30px] lg:gap-[50px] mb-[50px] lg:mb-[80px] px-5 max-w-[1180px] mx-auto">
                {[
                    {
                        title: '고객지원 프로세스',
                        steps: [
                            {step: '01', title: '고객 요청사항 접수', desc: '전화, 홈페이지, SNS 등', bgColor: 'bg-[#500C08]'},
                            {step: '02', title: '고객상담', desc: '접수확인 및 현황파악', bgColor: 'bg-deilcut'},
                            {step: '03', title: '담당부서 전달 및 원인 분석', desc: '', bgColor: 'bg-[#500C08]'},
                            {step: '04', title: '개선대책 및 확인', desc: '', bgColor: 'bg-deilcut'},
                            {step: '05', title: '결과안내', desc: '', bgColor: 'bg-[#500C08]'},
                        ],
                    },
                    {
                        title: '지역사회 관련 제보/문의 프로세스',
                        steps: [
                            {step: '01', title: '지역사회 관련 제보/문의 접수', desc: '', bgColor: 'bg-[#500C08]'},
                            {step: '02', title: '제보/문의 고객상담', desc: '', bgColor: 'bg-deilcut'},
                            {step: '03', title: 'ESG 담당부서 전달 및 내용 파악', desc: '', bgColor: 'bg-[#500C08]'},
                            {step: '04', title: '개선방안 수립', desc: '', bgColor: 'bg-deilcut'},
                            {step: '05', title: '결과공유', desc: '', bgColor: 'bg-[#500C08]'},
                        ],
                    },
                ].map((process, processIndex) => (
                    <div key={processIndex} className="flex-1 bg-[#F7F7F7] p-5 lg:p-[50px]">
                        <h4 className="text-[18px] lg:text-[26px] lg:text-left text-center  font-extrabold leading-[1.3em] text-black mb-6 lg:mb-[50px]">
                            {process.title}
                        </h4>
                        <div className="flex flex-col gap-2 lg:gap-5 lg:grid lg:grid-cols-5">
                            {process.steps.map((item, index) => {
                                // 배경색에 따라 텍스트 색상 자동 결정
                                return (
                                    <div key={index} className="flex flex-col  items-center gap-[4px] lg:gap-5 w-full ">
                                        <div
                                            className={`flex items-center justify-center min-w-[60px] lg:min-w-[99px] h-[30px] w-full max-w-[156px] lg:h-[44px] ${item.bgColor} rounded-full`}>
                        <span
                            className={`text-[12px] lg:text-[22px] font-normal leading-[1.6em] text-[#FBFAE7] tracking-[-0.36px] lg:tracking-0`}>
                            STEP {item.step}
                        </span>
                                        </div>
                                        <div className="flex flex-col text-center">
                        <span
                            className="text-[14px] text-center  lg:text-[22px] font-normal leading-[1.6em] text-black tracking-[-0.42px] lg:tracking-0">
                            {item.title}
                        </span>
                                            {item.desc && (
                                                <span className="mo_caption pc_caption text-[#666666] lg:mt-1 ">
                            {item.desc}
                            </span>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>

            {/* 고객요청 접수절차 섹션 */}
            <div className="bg-[#fbfae7] px-5 py-[30px] lg:py-[60px]">
                <div className="max-w-[1180px] mx-auto flex flex-col gap-[12px] lg:gap-[17px]">
                    <h4 className="text-[18px] lg:text-left lg:text-[26px] font-extrabold leading-[1.3em] text-black text-center tracking-[-0.54px] lg:tracking-0">
                        고객요청 접수절차
                    </h4>

                    {/* 번호 목록 */}
                    <ol className="flex flex-col gap-[4px] lg:gap-2 list-decimal list-outside text-[12px] lg:text-[18px] font-normal leading-[1.6em] text-black tracking-[-0.36px] lg:tracking-0">
                        <li className="ml-[18px]">고객의 소리는 다양한 경로를 통해 접수합니다. (기록, 경청, 공감, 진정성, 신속, 정확)</li>
                        <li className="ml-[18px]">접수사항은 VOC(통합시스템)를 통해 일괄 접수 기록하여 해당 부서/담당자에게 즉시 통보합니다.</li>
                        <li className="ml-[18px]">문제발생 건에 대해서는 공정거래위원회 고시 소비자분쟁해결 기준에 의거 신속하게 처리합니다.</li>
                    </ol>

                    {/* 접수 방법 카드들 */}
                    <div className="flex flex-col gap-[12px] lg:gap-[30px] mt-4 lg:mt-4 lg:grid lg:grid-cols-3">
                        {/* 전화상담 */}
                        <div
                            className="bg-white border border-[#d9d9d9] px-4 py-3 lg:px-8 lg:py-6 flex flex-col gap-[5px] lg:gap-2.5">
                            <div className="flex gap-[4px] items-center lg:flex-col lg:items-start lg:gap-2.5">
                                <div className="flex justify-center items-center size-5 lg:size-12 shrink-0">
                                    <Icon name="call" className="*:*:fill-[#1C1B1F] size-full"/>
                                </div>
                                <span
                                    className="text-[14px] lg:text-[26px] font-bold leading-[1.7em] text-black tracking-[-0.42px] lg:tracking-0">
                    전화상담
                    </span>
                            </div>
                            <div className="flex flex-col gap-[4px] items-start">
                                <p className="text-[12px] lg:text-[18px] font-bold leading-[1.6em] text-black tracking-[-0.36px] lg:tracking-0">
                                    080-739-8572
                                </p>
                                <div
                                    className="text-[10px] lg:text-[18px] font-normal leading-[1.6em] text-black tracking-[-0.3px] lg:tracking-0">
                                    <p className="mb-0">상담시간 : 평일 09:00~ 17:00</p>
                                    <p className="mb-0">점심식사 및 휴식시간 : 11:30~ 13:00</p>
                                    <p>(주말, 공휴일 휴무/ 수신자부담)</p>
                                </div>
                            </div>
                        </div>

                        {/* 온라인 문의 */}
                        <div
                            className="bg-white border border-[#d9d9d9] px-4 py-3 lg:px-8 lg:py-6 flex flex-col lg:flex-row gap-[5px] lg:gap-4  justify-between">
                            <div
                                className="flex gap-[8px] items-stretch flex-1 w-full lg:flex-col lg:items-start lg:gap-2.5">
                                <div className="flex flex-col gap-[4px] flex-1">
                                    <div className="flex gap-[4px] items-center lg:flex-col lg:items-start lg:gap-2.5">
                                        <div className="flex justify-center items-center size-5 lg:size-12 shrink-0">
                                            <Icon name="co_present" className="*:*:fill-[#1C1B1F] size-full"/>
                                        </div>
                                        <span
                                            className="text-[14px] lg:text-[26px] font-bold leading-[1.7em] text-black tracking-[-0.42px] lg:tracking-0">
                            온라인 문의
                        </span>
                                    </div>
                                    <p className="text-[12px] lg:text-[18px] font-normal leading-[1.6em] text-black tracking-[-0.36px] lg:tracking-0 ml-6 lg:ml-0">상담접수시간:
                                        24시간</p>
                                </div>
                                <div className="lg:w-full">
                                    <button
                                        type="button"
                                        className="bg-[#500C08] px-2  py-1 lg:px-[24px] lg:py-2 text-white text-[11px] lg:w-full lg:text-[18px] font-normal leading-[1.6em] tracking-[-0.11px] lg:tracking-0 hover:bg-[#600E0A] transition-colors h-full lg:h-[56px] text-center flex items-center justify-center"
                                        onClick={() => openInquiry()}
                                    >
                                        문의하기
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* 서신 상담 */}
                        <div
                            className="bg-white border border-[#d9d9d9] px-4 py-3 lg:px-8 lg:py-6 flex flex-col gap-[5px] lg:gap-2.5">
                            <div className="flex gap-[4px] items-center lg:flex-col lg:items-start lg:gap-2.5">
                                <div className="flex justify-center items-center size-5 lg:size-12 shrink-0">
                                    <Icon name="letter_consultation" className="*:*:fill-[#1C1B1F] size-full"/>
                                </div>
                                <span
                                    className="text-[14px] lg:text-[26px] font-bold leading-[1.7em] text-black tracking-[-0.42px] lg:tracking-0">서신 상담</span>
                            </div>
                            <div className="flex flex-col gap-[4px] items-start ml-6 lg:ml-0">
                                <p className="text-[12px] lg:text-[22px] font-bold leading-[1.6em] text-black tracking-[-0.36px] lg:tracking-0">
                                    080-739-8572
                                </p>
                                <div
                                    className="text-[10px] lg:text-[18px] font-normal leading-[1.6em] text-black tracking-[-0.3px] lg:tracking-0">
                                    <p className="mb-0">13219</p>
                                    <p>경기도 성남시 중원구 둔촌대로 457번길 13 고객의 소리 담당자 앞</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <section
                className='flex flex-col lg:flex-row gap-[24px] max-w-[1180px] mx-auto pb-0 pt-[30px] lg:pt-[60px]'>
                {/* 고객불만 처리절차 섹션 */}
                <div className="flex-1">
                    <div className="max-w-[1180px] mx-auto flex flex-col gap-[12px] items-center lg:items-start">
                        <h4 className="text-[18px] lg:text-[26px] font-extrabold leading-[1.3em] text-black text-center tracking-[-0.54px] lg:tracking-0">
                            고객불만 처리절차
                        </h4>
                        <p className="text-[12px] lg:text-[18px] font-normal leading-[1.6em] text-black text-center lg:text-left tracking-[-0.36px] lg:tracking-0 max-w-[270px] lg:max-w-none">
                            공정거래위원회 고시 소비자분쟁해결기준에 의거 <br className='hidden lg:block'/> 정당한 소비자 피해에 대해 교환, 환불이 가능합니다.
                        </p>
                    </div>
                </div>

                {/* 고객VOC 접수 및 처리 섹션 */}
                <div className="flex-1">
                    <div className="max-w-[1180px] mx-auto flex flex-col gap-[12px] items-center lg:items-start">
                        <h4 className="text-[14px] lg:text-[22px] font-bold leading-[1.7em] text-black text-center tracking-[-0.42px] lg:tracking-0">
                            고객VOC 접수 및 처리 (현황 2024년 기준)
                        </h4>
                        <p className="text-[12px] lg:text-[18px] font-normal lg:hidden leading-[1.6em] text-black text-center lg:text-left tracking-[-0.36px] lg:tracking-0 max-w-[270px] lg:max-w-none">
                            공정거래위원회 고시 소비자분쟁해결기준에 의거 <br className='hidden lg:block'/> 정당한 소비자 피해에 대해 교환, 환불이 가능합니다.
                        </p>
                        {/* VOC 통계 테이블 */}
                        <div
                            className="bg-[#F7F7F7] flex flex-col gap-[5px] items-center justify-center px-0 py-4 lg:px-[25px] lg:py-[31.5px] mt-4 lg:mt-0 w-full max-w-[280px] lg:max-w-full">
                            <div className="flex gap-4 lg:gap-[16px] items-center w-full">
                                <div className="h-[41px] lg:h-[56px] shrink-0 w-px"/>
                                <div className="flex flex-col gap-[6px] lg:gap-3 items-center text-center flex-1">
                                    <p className="text-[12px] lg:text-[18px] font-normal leading-[1.6em] text-black tracking-[-0.36px] lg:tracking-0">문의</p>
                                    <p className="text-[16px] lg:text-[26px] font-semibold leading-[1.5em] text-black tracking-[-0.48px] lg:tracking-0">12,101</p>
                                </div>
                                <div className="bg-[#d9d9d9] h-[41px] lg:h-[56px] shrink-0 w-px"/>
                                <div className="flex flex-col gap-[6px] lg:gap-3 items-center text-center flex-1">
                                    <p className="text-[12px] lg:text-[18px] font-normal leading-[1.6em] text-black tracking-[-0.36px] lg:tracking-0">불만</p>
                                    <p className="text-[16px] lg:text-[26px] font-semibold leading-[1.5em] text-black tracking-[-0.48px] lg:tracking-0">2,305</p>
                                </div>
                                <div className="bg-[#d9d9d9] h-[41px] lg:h-[56px] shrink-0 w-px"/>
                                <div className="flex flex-col gap-[6px] lg:gap-3 items-center text-center flex-1">
                                    <p className="text-[12px] lg:text-[18px] font-normal leading-[1.6em] text-black tracking-[-0.36px] lg:tracking-0 w-full">칭찬
                                        및 제안</p>
                                    <p className="text-[16px] lg:text-[26px] font-semibold leading-[1.5em] text-black tracking-[-0.48px] lg:tracking-0">
                                        254
                                    </p>
                                </div>
                                <div className="h-[41px] lg:h-[56px] shrink-0 w-px"/>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default CustomerFeedback;

