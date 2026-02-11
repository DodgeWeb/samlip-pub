import React, { useEffect, useState } from 'react';
import {useRouter} from 'next/router';
import {Icon} from '@/components/pub/icons';
import {PromiseItem, PromiseItemCard} from './index';
import ShareButtons from '@/components/pub/ShareButtons';

// 섹션 타입
type PromiseSection = {
    htmlContent: React.ReactNode;
};

// 모든 약속 상세 데이터
const allPromiseDetails: (PromiseItem & {
    content: string;
    images: string[];
    author: {
        name: string;
        department: string;
        quote: string;
    };
    relatedPromises: PromiseItem[];
    sections: PromiseSection[];
})[] = [
    {
        id: 1,
        imageUrl: '',
        title: '안전을 향한 변화, ‘삼립의 약속’으로 시작합니다',
        date: '2025년 11월 28일',
        content: `"언제 어디서나 따뜻하게 즐겨요! 우리들의 '겨울 호올릭' 호빵 시즌 시작"`,
        images: ['/img/now/story_01.png'],
        author: {
            name: '김삼립',
            department: 'SPC삼립 브랜드마케팅부',
            quote: '"빵으로 전하는 진심, 삼립의 진심을 만드는 마케터"',
        },
        relatedPromises: [
            {
                id: 2,
                imageUrl: '/img/promise/promise_01.png',
                title: '안전을 향한 삼립의 세 가지 약속을 공유드립니다.',
                date: '2025년 11월 28일',
            },
            {
                id: 3,
                imageUrl: '/img/promise/promise_02.png',
                title: '안전 설비 도입 및 시스템 강화 활동을 진행했습니다',
                date: '2025년 11월 28일',
            },
        ],
        sections: [
            {
                htmlContent: (
                    <>
                        <div className='flex flex-col gap-8 lg:gap-20'>
                            <section className='section_mass'>
                                <div className='contents'>
                                    <p>SPC삼립은 ‘삼립의 약속’이라는 이름 아래, 안전한 근무환경을 만들기 위한 모든 과정과 책임을 투명하게 기록하고, 보여드리고자 합니다. </p>
                                    <p>지난 시간 동안 삼립은 안전 시스템이 현장에서 제대로 작동하고 있는지 하나하나 다시 살펴보았습니다. 무심코 지나쳤던 안전 사각지대는 없었는지,
                                        익숙해진 관행이 위험을 키우고 있지는 않았는지 점검했으며, 발견된 사항은 순차적으로 개선했습니다. </p>
                                    <p>이 과정에서 안전한 근무 환경은 단발적 조치가 아닌 지속적인 실행과 개선에서 비롯됨을 확인했습니다. 나아가, 모든 근로자가 안심하고 일할 수 있는
                                        환경을 위해서는 설비·제도·문화·투자가 함께 작동해야 함을 인지했습니다.</p>
                                    <p>지금 이 순간에도 삼립은 현장의 목소리에 귀 기울이며 작은 위험도 놓치지 않기 위해 점검과 개선을 이어가고 있습니다. ‘삼립의 약속’은 그 모든
                                        변화의 과정을 투명하게 전달하는 공간입니다. 앞으로 안전을 위한 실행과 점검, 그리고 우리가 지켜야 할 책임을 지속적이고 구체적으로
                                        공유하겠습니다. </p>
                                    <p>감사합니다.</p>
                                </div>
                            </section>
                        </div>
                    </>
                ),
            },
        ],
    },
    {
        id: 2,
        imageUrl: '/img/promise/promise_01.png',
        title: '안전을 향한 삼립의 세 가지 약속을 공유드립니다.',
        date: '2025년 11월 28일',
        content: `안전을 향한 삼립의 세 가지 약속`,
        images: ['/img/promise/promise_01.png'],
        author: {
            name: '이삼립',
            department: 'SPC삼립 안전관리부',
            quote: '"안전은 모든 것의 시작입니다"',
        },
        relatedPromises: [
            {
                id: 1,
                imageUrl: '',
                title: '안전을 위한 삼립의 변화, 새롭게 시작합니다',
                date: '2025년 11월 28일',
            },
            {
                id: 3,
                imageUrl: '/img/promise/promise_02.png',
                title: '안전 설비 도입 및 시스템 강화 활동을 진행했습니다',
                date: '2025년 11월 28일',
            },
        ],
        sections: [
            {
                htmlContent: (
                    <>
                        <div className='flex flex-col gap-8 lg:gap-20'>
                            <section className='section_mass'>
                                <div className='contents'>
                                    <p>SPC삼립은 안전을 향한 책임을 흔들림없이 지켜나가기 위해 세 가지 ‘삼립의 약속’을 정립하고 실천하고 있습니다.</p>
                                    <img src="/img/promise/promise_02_01.png" alt="안전을 향한 삼립의 세 가지 약속"/>
                                </div>
                            </section>

                            <section className='section_mass'>
                                <div className='contents contents_36px'>
                                    <div className='contents contents_20px'>
                                        <p className='label !mb-0'>1. 생산구조와 시스템을 ‘안전’ 중심으로 혁신합니다</p>
                                        <img src="/img/promise/promise_02_02.png" alt="안전을 향한 삼립의 세 가지 약속"/>
                                        <div className='contents contents_12px'>
                                            <h2 className='subtitle'>1) 생산 설비의 안전성 강화</h2>
                                            <p>생산 설비 전반을 면밀히 재점검하고, 사고 발생 가능성이 있는 요소를 사전 차단할 수 있도록 공장 내 설비를 지속 개선하고
                                                있습니다.</p>
                                        </div>
                                        <div className='contents contents_12px'>
                                            <h2 className='subtitle'>① 사고 설비의 전면 교체</h2>
                                            <p>제빵 공정 중 냉각 단계에서 사용되는 ‘냉각 스파이럴 컨베이어’를 근로자의 동선과 물리적으로 분리되어 더 안전한 ‘오버헤드
                                                컨베이어’로 교체하고 있습니다. 2026년 6월까지 공장 내 모든 냉각 스파이럴 컨베이어 장비를 100% 교체할
                                                계획입니다.</p>
                                        </div>

                                        <div className='contents contents_12px'>
                                            <h2 className='subtitle'>② 노후 설비의 순차 개선</h2>
                                            <p>SPC삼립 공장 내 주요 설비는 「산업안전보건법」에 따라 내구연한이 명시되지 않은 경우가 많아, 그동안 지속적인 정기 점검과 부품
                                                교체 중심으로 설비를 관리해왔습니다. 이에 삼립은 설비 노후화로 인한 위험 가능성을 사전에 차단하기 위해 노후 설비에 대한 자체
                                                기준과 관리 가이드라인을 강화했습니다. 해당 기준에 따라 2025년 하반기부터 현재까지 주요 설비 개선을 완료하며, 안전한 환경을
                                                만들기 위한 노력을 이어가고 있습니다.</p>
                                        </div>

                                        <div className='contents contents_12px'>
                                            <h2 className='subtitle'>③ 위험 요소 접근 차단 시스템 구축</h2>
                                            <p>근로자가 위험 기계에 접근하지 못하도록 ‘고정식 방호덮개’ 등 안전장치의 설치를 지속적으로 확대하고 있습니다. 또한, 설비
                                                점검·청소 시에는 기계의 전원을 사전에 차단하고 타인이 전원을 임의로 작동할 수 없도록 작동 금지 표지판을 부착하는 절차를 강화해
                                                절차를 고도화했습니다.</p>
                                        </div>
                                    </div>

                                    <div className='contents contents_20px'>
                                        <div className='contents contents_12px'>
                                            <h2 className='subtitle'>2) 3-STEP 안전 점검 체계 구축</h2>
                                            <p>안전 사각지대를 최소화하기 위해 다음과 같은 3단계 안전 점검 체계를 구축했습니다.</p>
                                        </div>
                                        <div className='contents contents_12px'>
                                            <h2 className='subtitle'>STEP ① 내부 정기 점검</h2>
                                            <p>제빵 공정 중 냉각 단계에서 사용되는 ‘냉각 스파이럴 컨베이어’를 근로자의 동선과 물리적으로 분리되어 더 안전한 ‘오버헤드
                                                컨베이어’로 교체하고 있습니다. 2026년 6월까지 공장 내 모든 냉각 스파이럴 컨베이어 장비를 100% 교체할
                                                계획입니다.</p>
                                        </div>
                                        <div className='contents contents_12px'>
                                            <h2 className='subtitle'>STEP ② 노사합동 안전 점검:</h2>
                                            <p>현장 근로자가 직접 참여해 실제 작업 상황의 위험 요소 정밀 점검 월 1회</p>
                                        </div>
                                        <div className='contents contents_12px'>
                                            <h2 className='subtitle'>STEP ③ 외부 전문기관 점검:</h2>
                                            <p>고용노동부 인증 외부 전문기관으로 구성된 외부 안전 전문 기관(대한산업안전협회, LRQA) 점검 분기 1회 내부-현장-경영진-외부가
                                                참여하는 3단계 점검 시스템을 통해 안전 커버·인터락·비상정지버튼 등 주요 장치의 작동 상태와 누락 여부를 다층적으로 확인하고
                                                있습니다. 점검 과정에서 근로자 의견을 매월 수렴하며, 요청사항의 평균 95% 이상을 반영하고 있습니다.
                                                2026년에는 이러한 프로세스를 기반으로 연간 안전 점검 계획을 선제적으로 수립하고 운영할 예정입니다.</p>
                                        </div>
                                    </div>

                                    <div className='contents contents_20px'>
                                        <div className='contents contents_12px'>
                                            <h2 className='subtitle'>3) 현장 책임자 안전 리더십 강화</h2>
                                            <p>SPC삼립은 리더십의 안전 인식이 현장 변화에 핵심이라는 판단 아래, 경영진과 책임자가 직접 생산라인을 점검하는 ‘리더십 안전
                                                투어’ 프로그램을 확대했습니다. 이를 통해 5대 중대재해 유형과 부딪힘·추락·끼임·화재·폭발·밀폐공간·폭염환경 등 주요 위험요인을
                                                정기적으로 점검하고 있습니다.
                                                또한, 안전보건관리책임자 및 관리자의 안전 점검을 일상화하여 설비의 안전장치부터 근로자의 불안전한 행동까지 현장의 세밀한 요소를
                                                폭넓게 점검함으로써, 잠재적 위험요인을 발굴하고 즉각적인 시정 조치를 시행하고 있습니다.</p>
                                        </div>
                                        <div className='contents contents_12px'>
                                            <h2 className='subtitle'>4) ‘제로백(Zero100)’ 캠페인 진행</h2>
                                            <p>100일간 무재해(Zero) 달성을 목표로 하는 ‘제로백(Zero100)’ 안전 캠페인을 운영하고 있습니다. 임직원 모두가 안전의
                                                기본을 다시 점검하고, 한마음으로 안전 문화를 만들어 간다는 의미를 담고 있습니다.
                                                제로백 캠페인은 7대 안전수칙 교육과 함께, 산업 현장에서 사고 비중이 높은 ‘끼임·추락·화재’ 3대 주요 재해에 대한 집중
                                                교육을 실시해 위험요소 제거에 적극 나서고 있습니다. <br/>
                                                근로자의 불안전한 행동을 유발하는 근본적인 작업 방법 및 공정을 개선하여 위험 요인을 제거하고, 현장 코칭을 병행함으로써 구성원의
                                                안전 인식을 근본적으로 변화시키는 행동기반안전(BBS) 관리를 실천하고 있습니다.</p>
                                        </div>
                                    </div>
                                </div>

                            </section>


                            <section className='section_mass'>
                                <p className='label'>2. 新근무제를 도입해 안전한 근무 환경을 설계합니다</p>
                                <div className='contents contents_36px'>
                                    <div className='contents contents_20px'>
                                        <div className='contents'>
                                            <img src="/img/promise/promise_02_03.png" alt="안전을 향한 삼립의 세 가지 약속"/>
                                        </div>
                                        <div className='contents contents_12px'>
                                            <h2 className='subtitle'>1) 근무 환경 개선을 위한 新근무제 도입</h2>
                                            <p>근로 현장의 안전성 확보 및 피로 누적 위험을 실질적으로 줄이기 위해 새로운 근무제를 도입하여 시행 중입니다.</p>
                                        </div>

                                        <div className='contents contents_12px'>
                                            <h2 className='subtitle'>① 8시간 초과 야간 근로 폐지 및 3교대 근무제 전환</h2>
                                            <p>2025년 10월 1일부터 하루 8시간을 초과하는 야간 근로를 전면 폐지, 3교대 근무제를 도입했습니다. 이에 따라 근로자들의 실제
                                                근무시간은 오전/오후조 6시간 30분, 야간조 7시간 40분으로, 과거 주 49시간에 가까웠던 근무시간이 평균 42시간으로 약
                                                14% 감소했습니다.</p>
                                        </div>

                                        <div className='contents contents_12px'>
                                            <h2 className='subtitle'>② 임금 보전</h2>
                                            <p>근로 시간 감소에 따른 임금 보전을 위해 기본급을 2% 상향하여, 임금 보전을 최대한 유지하고 있으며, 이와 관련해서는 근로자들과
                                                지속적인 협의를 통해 조율하고 있습니다.</p>
                                        </div>
                                    </div>
                                    <div className='contents contents_12px'>
                                        <h2 className='subtitle'>2) 4조 3교대 주 5일 근무 전환 목표</h2>
                                        <p>2026년까지 4조 3교대 주 5일 근무 전환을 목표로 인력 충원과 제도 정착을 위한 노력을 확대하고 있습니다. 현장 근로자의 안전 확보를
                                            최우선의 목표로 두고 선도적인 근로제 개편을 추진하고 있습니다.</p>
                                    </div>
                                </div>
                            </section>

                            <section className='section_mass'>
                                <p className='label'>3. 안전 투자를 확대합니다</p>
                                <div className='contents contents_36px'>
                                    <div className='contents contents_20px'>
                                        <div className='contents'>
                                            <img src="/img/promise/promise_02_04.png" alt="안전을 향한 삼립의 세 가지 약속"/>
                                        </div>
                                        <div className='contents contents_12px'>
                                            <h2 className='subtitle'>1) 안전 인프라 및 설비 투자 확대</h2>
                                            <p>
                                                2027년까지 SPC그룹 차원으로 총 624억원 규모의 안전 투자를 집행할 예정이고,
                                                이 중 삼립은 162억 원을 투입하여 현장의 안전성을 대폭 강화해 나갈 방침입니다.
                                                노후설비 교체, 위험공정 재배치, 생산 라인 재편, 안전 인력 증원, 안전 문화 장착 등
                                                모두가 안전하게 일할 수 있는 환경을 구축하기 위한 근본적인 안전 기반을 강화할 계획입니다.
                                                아울러 안전보건 전담 인력을 지속적으로 확충하고, 현장 중심의 안전관리 역량을 강화해
                                                사고 예방과 위험 대응의 실효성을 높여 나갈 계획입니다.
                                            </p>
                                        </div>
                                        <div className='contents contents_12px'>
                                            <h2 className='subtitle'>2) ‘안전 스마트 신공장’ 설립 추진</h2>
                                            <p>
                                                SPC그룹 차원에서 3000억원을 투자해 충청북도 음성군에 ‘안전 스마트 신공장’을 건립합니다.
                                                인공지능(AI)∙자동화 로봇∙IoT 센서 등 첨단 기술을 적용한 혁신 생산시설로,
                                                첨단 스마트 기술을 적용해 위험요소를 최소화하고
                                                생산 시스템 전반의 안전성을 높일 계획입니다.
                                            </p>
                                        </div>
                                        <div className='contents contents_12px'>
                                            <h2 className='subtitle'>3) ‘안전관리 IT 시스템’ 개발</h2>
                                            <p>
                                                AI·IoT 기반 안전관리 시스템을 개발해 현장 위험요인을 자동 분석하고
                                                데이터 기반의 선제적 안전관리를 강화하고 있습니다.
                                                데이터 기반의 안전 의사결정 체계를 지원하여 한층 고도화된 시각으로 현장 위험 요인을 정밀하게 관리할 수 있으며,
                                                협력업체 전용 시스템을 별도로 마련하여 고위험 작업 관리를 강화하고
                                                실시간 모니터링을 실시함으로써 발생 가능한 위험까지 선제적으로 대응할 수 있습니다.
                                                해당 시스템은 2027년 상반기 내 구축 완료를 목표로 개발이 진행 중입니다.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </>
                ),
            },
        ],
    },
    {
        id: 3,
        imageUrl: '/img/promise/promise_02.png',
        title: '안전 설비 도입 및 시스템 강화 활동을 진행했습니다',
        date: '2025년 11월 28일',
        content: `안전 설비 도입 및 시스템 강화 활동을 진행했습니다`,
        images: ['/img/promise/promise_02.png'],
        author: {
            name: '박삼립',
            department: 'SPC삼립 설비관리부',
            quote: '"최신 기술로 안전을 보장합니다"',
        },
        relatedPromises: [
            {
                id: 1,
                imageUrl: '',
                title: '안전을 위한 삼립의 변화, 새롭게 시작합니다',
                date: '2025년 11월 28일',
            },
            {
                id: 2,
                imageUrl: '/img/promise/promise_01.png',
                title: '안전을 향한 삼립의 세 가지 약속',
                date: '2025년 11월 28일',
            },
        ],
        sections: [
            {
                htmlContent: (
                    <>
                        <div className='flex flex-col gap-6 lg:gap-20'>
                            <section className='section_mass'>
                                <p>SPC 삼립은 전 공정에 대한 철저한 안전 점검을 실시했습니다. 공장 내부 설비를 안전하게 구축하기 위한 구조적인 조치와 작업 절차를 전면
                                    개선했습니다.더 안전한 환경을 위한 주요 개선 조치들이 실제 현장에서 어떤 변화로 이어졌는지 전달드립니다.</p>
                            </section>

                            <section className='section_mass'>
                                <div className='contents contents_20px'>
                                    <div className='contents contents_12px'>
                                        <p className='label'>1. <span
                                            className='ml-1 underline'> 생산 설비의 안전성을 대폭 강화했습니다</span></p>
                                        <p>생산 설비 전반에 대한 면밀한 재검토와 함께 위험 요소를 사전에 차단할 수 있도록 공장 내 설비를 지속 개선하고 있습니다. 보다 근본적으로
                                            근로자의 안전이 확보될 수 있도록 새로운 설비 도입 및 개선을 진행 중입니다. 상세한 사항에 대해 아래와 같이 공유드립니다.</p>
                                    </div>

                                    <div className='contents contents_12px'>
                                        <h2 className='subtitle'>1) ‘스파이럴 냉각 컨베이어’를 ‘오버헤드 컨베이어’로 교체</h2>
                                        <p>빵 생산 공정 (작업 준비 → 배합 → 분할, 정형 → 발효, 소성(오븐) → 냉각 → 크림 주입 → 포장) 단계 중 ‘냉각’ 단계에
                                            사용되는 자동화 설비인 ‘냉각 스파이럴 컨베이어’는 노사 및 외부 안전전문기관의 합동 점검을 통해 구조적인 위험 요소를 면밀히
                                            분석했습니다. <br/>
                                            기존 ‘스파이럴 냉각 컨베이어’를 대체할 ‘오버헤드 컨베이어’는 근로자의 작업 공간과 물리적으로 구분된 천정형 구조로, 설비가 상부에
                                            설치되어 있어 위험 요소를 원천 배재합니다.</p>
                                        <img src="/img/promise/promise_03_01.png" alt="안전을 향한 삼립의 세 가지 약속"/>
                                        <div>
                                            <img src="/img/promise/promise_03_02.png" alt="안전을 향한 삼립의 세 가지 약속"/>
                                            <p className='mt-2 text-center cation'>스파이럴 냉각 컨베이어와 오버헤드 컨베이어 비교</p>
                                        </div>
                                        <p>또한, 해당 설비의 유지·보수 작업이 필요할 시 관련 인원 외에는 출입이 통제되며, 출입문에는 인터락(Interlock)을 설치해 출입문이
                                            열리는 즉시 기계 작동이 자동으로 전면 중단됩니다.</p>
                                        <img src="/img/promise/promise_03_03.png" alt="안전을 향한 삼립의 세 가지 약속"/>
                                        <p>해당 설비 교체는 총 7대 중 3대를 완료했으며, 2026년 4월까지 모두 교체는 완료할 예정입니다.</p>
                                    </div>

                                    <div className='contents contents_12px'>
                                        <h2 className='subtitle'>2) 근로자가 기계에 접근하는 것을 원천적으로 차단하는 구조로 개선</h2>
                                        <p>오버헤드 컨베이어로의 교체가 진행되는 동안, 기존 스파이럴 냉각 컨베이어 설비에 대한 보안 조치를 선제적으로 시행했습니다. 해당 조치들은
                                            노사 및 고용노동부의 확인을 거쳐 시행된 조치로, 설비 전면 교체 전까지도 현장 안전성을 확보하고자 합니다.</p>
                                        <img src="/img/promise/promise_03_04.png" alt="안전을 향한 삼립의 세 가지 약속"/>

                                        <h2 className='subtitle'>① 고정식 방호덮개 설치 및 강화</h2>
                                        <p>고정식 방호덮개(높이 2m, 하부 간격 15cm)를 설치해 작업자의 임의 접근을 원천 차단했습니다. 방호덮개를 개방할 시에는 작업자가
                                            임의로 개방할 수 없도록 복잡한 형태의 특수 별모양 렌치를 열어야만 하는 방식으로 바꾸어, 안전을 강화했습니다. </p>
                                        <h2 className='subtitle'>② 인터락 설치 및 강화 </h2>
                                        <p>점검구 인터락을 적용하여, 내부 진입 시 즉시 기계가 자동으로 정지되도록 개선했습니다. 내부 정기 점검, 노사 합동 안전 점검, 외부 전문
                                            기관 점검 등을 통해 장치의 작동 상태와 누락 여부를 다층적으로 확인하고 있으며, 점검 과정에서 개선 사항이 발견될 경우 내부 절차에
                                            따라 개선을 진행하고 있습니다. </p>
                                    </div>
                                </div>
                            </section>

                            <section className='section_mass'>
                                <div className='contents contents_20px'>
                                    <div className='contents contents_12px'>
                                        <p className='label !mb-0'>2. <span className='ml-1 underline'>안전을 위하여 설비 점검 작업 절차를 강화했습니다</span>
                                        </p>
                                        <p>SPC삼립은 근로자의 안전을 최우선으로 확보할 수 있도록 작업 절차 전반에 걸쳐 안전 기준을 대폭 강화하였습니다.</p>
                                    </div>
                                    <div className='contents contents_36px'>
                                        <div className='contents contents_12px'>
                                            <h2 className='subtitle'>1) 방호덮개 개방 시 작업허가 승인 필수</h2>
                                            <p>스파이럴 냉각 컨베이어의 방호 장치를 해지하거나 위험 구역에 진입해야 할 경우 <span className='font-bold'> 반드시 엄격한 사전 승인을 거쳐야만 출입할 수 있는 절차가 마련</span>되어
                                                있었습니다.
                                                이에 더해, 공무팀이 설비를 청소할 경우에는 기계의 전원을 사전에 차단하고 타인이 전원을 임의로 작동할 수 없도록 작동 금지
                                                표지판을 부착하는 절차를 의무화했습니다. </p>
                                        </div>
                                        <div className='contents contents_12px'>
                                            <h2 className='subtitle'>2) 작업자 대상 철저한 안전 교육</h2>
                                            <p>전 작업자 대상으로 개선된 안전 작업 절차에 관한 교육을 시행하여 변경된 안전 수칙을 충분히 이해하고 현장에서 적용이 가능하도록
                                                교육을 진행했습니다.</p>
                                        </div>
                                    </div>
                                </div>
                            </section>
                            <section className='section_mass'>
                                <p>SPC삼립은 일련의 개선 조치 이후에도 혹여나 놓친 부분은 없는지 면밀히 검토하고, 추가 개선이 필요한 사항에 대해 꼼꼼히 파악하고자 생산 라인의 근무자
                                    및 공무팀을 대상으로 의견을 청취하는 시간을 가지고 있습니다.
                                    실제 현장에서의 경험을 바탕으로 수렴한 근로자분들의 의견을 토대로 우선순위가 높은 과제부터 순차적으로 개선하고 있습니다. <br/>
                                    SPC삼립은 앞으로도 근로자의 안전과 현장의 안전이 기업 운영의 최우선 가치로 자리잡을 수 있도록, 실질적이고 지속적인 개선 활동을 이어가겠습니다.
                                    단순한 선언에 그치지 않고, 실행력 있는 안전 문화 정착을 목표로 안전 경영에 만전을 기하겠습니다.</p>
                            </section>
                        </div>
                    </>
                ),
            }
        ],
    },
];

const PromiseDetail = () => {
    const router = useRouter();
    const { id } = router.query;
    const numericId = Array.isArray(id)
        ? parseInt(id[0], 10)
        : id
            ? parseInt(id, 10)
            : 1;
    const column = allPromiseDetails.find(item => item.id === numericId) || allPromiseDetails[0];
    const [showSocialIcons, setShowSocialIcons] = React.useState<boolean>(false);

// 현재 인덱스 찾기
    const currentIndex = allPromiseDetails.findIndex(item => item.id === column.id);
    const prevItem = currentIndex > 0 ? allPromiseDetails[currentIndex - 1] : null;
    const nextItem = currentIndex < allPromiseDetails.length - 1 ? allPromiseDetails[currentIndex + 1] : null;

// 이전/다음 항목으로 이동하는 함수
    const navigateToItem = (itemId: number) => {
        if (typeof window !== 'undefined') {
            const lenis = (window as any).lenis;
            if (lenis?.scrollTo) {
                lenis.scrollTo(0, { duration: 0, immediate: true });
            } else {
                window.scrollTo({ top: 0 });
            }
        }

        setTimeout(() => {
            router.push(`/pub/now/promise/${itemId}`);
        }, 100);
    };

// 모바일 공유 기능 / PC에서 SNS 아이콘 토글
    const handleShare = async () => {
        // PC에서만 SNS 아이콘 토글
        if (window.innerWidth >= 1024) {
            setShowSocialIcons(!showSocialIcons);
            return;
        }

        // 모바일에서는 네이티브 공유
        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'SPC삼립 뉴스',
                    text: column.title,
                    url: window.location.href,
                });
                console.log('✅ 공유 완료!');
            } catch (err) {
                console.error('❌ 공유 취소 또는 오류:', err);
            }
        } else {
            alert('이 브라우저에서는 공유 기능이 지원되지 않습니다.');
        }
    };

// URL 복사 기능
    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            alert('링크가 클립보드에 복사되었습니다.');
        } catch (err) {
            console.error('❌ 복사 오류:', err);
            alert('링크 복사에 실패했습니다.');
        }
    };

// Facebook 공유
    const handleFacebookShare = () => {
        const url = encodeURIComponent(window.location.href);
        const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        window.open(shareUrl, '_blank', 'width=600,height=400');
    };

// Twitter 공유
    const handleTwitterShare = () => {
        const url = encodeURIComponent(window.location.href);
        const text = encodeURIComponent(column.title);
        const shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
        window.open(shareUrl, '_blank', 'width=600,height=400');
    };

// Kakao SDK 타입 정의 (컴포넌트 내부에서만 사용)
    interface KakaoShare {
        sendDefault(options: {
            objectType: string;
            content: {
                title: string;
                description: string;
                imageUrl: string;
                link: {
                    mobileWebUrl: string;
                    webUrl: string;
                };
            };
            buttons?: Array<{
                title: string;
                link: {
                    mobileWebUrl: string;
                    webUrl: string;
                };
            }>;
        }): void;
    }

    interface KakaoSDK {
        init(key: string): void;

        isInitialized(): boolean;

        Share: KakaoShare;
    }

    interface WindowWithKakao extends Window {
        Kakao?: KakaoSDK;
    }

// Kakao 공유
    const handleKakaoShare = () => {
        const win = window as unknown as WindowWithKakao;
        // Kakao SDK가 로드되어 있는지 확인
        if (win.Kakao) {
            // Kakao SDK가 이미 초기화되어 있는지 확인
            if (!win.Kakao.isInitialized()) {
                // Kakao SDK 초기화 (JavaScript Key 필요)
                // REACT_APP 환경 변수 확인
                const kakaoKey = (process.env.NEXT_PUBLIC_KAKAO_JS_KEY || '') as string;
                if (kakaoKey) {
                    win.Kakao.init(kakaoKey);
                } else {
                    console.warn('카카오 JavaScript Key가 설정되지 않았습니다. 환경 변수에 REACT_APP_KAKAO_JS_KEY를 추가해주세요.');
                }
            }

            // 카카오톡 공유하기
            try {
                win.Kakao.Share.sendDefault({
                    objectType: 'feed',
                    content: {
                        title: column.title,
                        description: column.content.substring(0, 200) + '...',
                        imageUrl: window.location.origin + column.imageUrl,
                        link: {
                            mobileWebUrl: window.location.href,
                            webUrl: window.location.href,
                        },
                    },
                    buttons: [
                        {
                            title: '자세히 보기',
                            link: {
                                mobileWebUrl: window.location.href,
                                webUrl: window.location.href,
                            },
                        },
                    ],
                });
            } catch (error) {
                console.error('카카오톡 공유 오류:', error);
                // SDK가 없거나 오류가 발생한 경우 대체 방법 사용
                const url = encodeURIComponent(window.location.href);
                const shareUrl = `https://story.kakao.com/share?url=${url}`;
                window.open(shareUrl, '_blank', 'width=600,height=400');
            }
        } else {
            // Kakao SDK가 로드되지 않은 경우 스크립트 로드
            const script = document.createElement('script');
            script.src = 'https://developers.kakao.com/sdk/js/kakao.js';
            script.async = true;
            script.onload = () => {
                const win = window as unknown as WindowWithKakao;
                const kakaoKey = (process.env.NEXT_PUBLIC_KAKAO_JS_KEY || '') as string;
                if (kakaoKey && win.Kakao) {
                    win.Kakao.init(kakaoKey);
                    handleKakaoShare(); // 재귀 호출
                } else {
                    // SDK 키가 없으면 대체 방법 사용
                    const url = encodeURIComponent(window.location.href);
                    const shareUrl = `https://story.kakao.com/share?url=${url}`;
                    window.open(shareUrl, '_blank', 'width=600,height=400');
                }
            };
            script.onerror = () => {
                // 스크립트 로드 실패 시 대체 방법 사용
                const url = encodeURIComponent(window.location.href);
                const shareUrl = `https://story.kakao.com/share?url=${url}`;
                window.open(shareUrl, '_blank', 'width=600,height=400');
            };
            document.head.appendChild(script);
        }
    };

    return (
        <main>
            <div className="max-w-[1220px] mx-auto px-5 pt-[56px] lg:pt-[92px]">
                <div className="w-full bg-white lg:pt-[100px]">
                    <button onClick={() => router.push('/pub/now/promise')} className="lg:hidden">
                        <Icon name="arrowTop" size={20} className="-rotate-90 lg:size-5 *:fill-grilledMeats"/>
                    </button>
                    {/* 뒤로가기 버튼 */}
                    <button
                        onClick={() => router.push('/pub/now/promise')}
                        className="group lg:border lg:border-[#930000] hover:lg:border-[#ED1C2A] lg:px-5 lg:py-1 rounded-[65px] lg:rounded-full  items-center gap-[3px] lg:gap-2 size-10 lg:size-auto lg:mb-[68px] hidden lg:flex transition-colors"
                    >
                        <Icon name="arrowTop" size={14}
                              className="-rotate-90 lg:size-5 *:fill-deilcut group-hover:[&_*]:fill-[#ED1C2A]"/>
                        <span
                            className="text-[12px] lg:text-[18px] font-normal text-deilcut group-hover:text-[#ED1C2A] leading-[1.6] tracking-[-0.36px] lg:tracking-[-0.45px] transition-colors">
                삼립의 약속 목록
            </span>
                    </button>

                    {/* 헤더 섹션 */}
                    <div className="pb-4 lg:pb-[70px]">
                        <div className="flex flex-col gap-4 items-center lg:gap-5">

                            {/* 제목 및 날짜 */}
                            <div className="flex flex-col gap-[4px] lg:gap-2 items-center text-center">
                                <h1 className="text-[18px] lg:text-[42px] font-extrabold text-[#000] leading-[1.3] tracking-[-0.54px] lg:tracking-0">
                                    {column.title}
                                </h1>
                                <p className="text-[10px] lg:text-[18px] font-normal text-[#AAA8A2] leading-[1.6] tracking-[-0.3px] lg:tracking-[-0.45px]">
                                    {column.date}
                                </p>
                            </div>

                            {/* SNS 공유 버튼 */}
                            <ShareButtons
                                showSocialIcons={showSocialIcons}
                                onCopy={handleCopy}
                                onShare={handleShare}
                                onFacebookShare={handleFacebookShare}
                                onTwitterShare={handleTwitterShare}
                                onKakaoShare={handleKakaoShare}
                            />
                        </div>
                    </div>

                    {/* 본문 */}
                    <div className="pb-[46px] lg:pb-[68px]">
                        <div className="flex flex-col gap-8 lg:gap-[64px] max-w-full mx-auto">
                            {column.sections.map((section, index) => (
                                <div key={index} className='hard_coding_edit'>
                                    {section.htmlContent}
                                </div>
                            ))}
                        </div>
                        {/* 이전/다음글 네비게이션 */}
                        <div
                            className="pt-[32px] lg:pt-[100px] lg:px-0 flex items-center justify-between lg:justify-center lg:gap-[200px] max-w-full  mx-auto px-[60px] ">
                            <button
                                onClick={() => prevItem && navigateToItem(prevItem.id)}
                                disabled={!prevItem}
                                className={`flex items-center gap-2 lg:gap-6 text-[14px] lg:text-[32px] font-normal leading-[1.7] lg:leading-[1.6] tracking-[-0.42px] lg:tracking-[-0.54px] ${
                                    prevItem ? 'text-[#aaa8a2] cursor-pointer hover:opacity-80' : 'opacity-50'
                                }`}
                            >
                                <div
                                    className={`flex justify-center items-center p-1.5 rounded-full size-6 lg:size-[56px] bg-[#AAA8A2]`}>
                                    <Icon name="arrowTop" size={28} className="-rotate-90"/>
                                </div>
                                <div className="flex flex-col font-bold text-left">
                                    <span>이전글</span>
                                </div>
                            </button>

                            <button
                                onClick={() => nextItem && navigateToItem(nextItem.id)}
                                disabled={!nextItem}
                                className={`flex items-center lg:gap-6 gap-2 text-[14px] lg:text-[32px] font-normal leading-[1.7] lg:leading-[1.6] tracking-[-0.42px] lg:tracking-[-0.54px] text-[#930000] ${
                                    nextItem ? ' cursor-pointer hover:opacity-80' : 'opacity-50'
                                }`}
                            >
                                <div className="flex flex-col font-bold text-right">
                                    <span>다음글</span>
                                </div>
                                <div
                                    className={`flex justify-center items-center p-1.5 rounded-full size-6 lg:size-[56px] bg-deilcut`}>
                                    <Icon name="arrowTop" size={28} className="rotate-90"/>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <section className="bg-[#F8F7F3]">
                <div className="max-w-[1220px] mx-auto px-5 pt-10 lg:pt-[120px] pb-[90px] flex flex-col gap-6 lg:gap-8">
                    <p className='text-[16px] lg:text-[32px] font-bold  text-[#500c08] text-center lg:text-left '>삼립의 또
                        다른 약속들
                    </p>
                    {/* 연관 콘텐츠 */}
                    <div className="">
                        <ul className='border-t border-[#d9d9d9]'>
                            {allPromiseDetails
                                .filter(item => item.id !== column.id)
                                .map(item => {
                                    // 날짜 포맷 변환: '2025년 11월 28일' -> '2025.11.28'
                                    const dateMatch = item.date.match(/(\d{4})년\s*(\d{1,2})월\s*(\d{1,2})일/);
                                    const formattedDate = dateMatch
                                        ? `${dateMatch[1]}.${dateMatch[2].padStart(2, '0')}.${dateMatch[3].padStart(2, '0')}`
                                        : item.date;

                                    return (
                                        <li
                                            key={item.id}
                                            className='flex justify-between items-center text-[16px] p-4 lg:py-[26px] border-b border-[#d9d9d9] cursor-pointer hover:bg-gray-50 transition-colors'
                                            onClick={() => {
                                                // 먼저 스크롤을 최상단으로 즉시 이동시킨 뒤 페이지 이동
                                                const lenis = (window as any).lenis;
                                                if (lenis && typeof lenis.scrollTo === 'function') {
                                                    lenis.scrollTo(0, {duration: 0, immediate: true});
                                                } else {
                                                    window.scrollTo({top: 0, behavior: 'auto'});
                                                    document.documentElement.scrollTop = 0;
                                                    document.body.scrollTop = 0;
                                                }
                                                // 스크롤 완료 후 페이지 이동
                                                setTimeout(() => {
                                                    router.push(`/pub/now/promise/${item.id}`);
                                                }, 100);
                                            }}
                                        >
                                            <p className='mo_body1 pc_body1'>{item.title}</p>
                                            <p className='mo_body2 pc_body1'>{formattedDate}</p>
                                        </li>
                                    );
                                })}
                        </ul>
                    </div>
                    {/* 버튼 */}
                    <div className="flex flex-col gap-6 lg:gap-[32px] items-center">
                        <button
                            onClick={() => router.push('/pub/now/promise')}
                            className="border rounded-full border-[#d9d9d9] bg-white flex gap-[2px] lg:gap-[10px] items-center justify-center px-[25px] lg:py-[10px] py-[8px] transition-opacity hover:opacity-80 lg:px-6 lg:mt-5"
                        >
                            <Icon name="menubar" className="size-5 lg:size-6 *:fill-[#1C1B1F]"/>
                            <span className="font-normal text-black text-[14px] lg:text-[22px] tracking-[-0.42px]">
                                전체 목록 보기
                            </span>
                        </button>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default PromiseDetail;
