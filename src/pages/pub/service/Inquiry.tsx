import React, {useState, useRef} from 'react';
import {Icon} from '@/components/pub/icons';
import {Dropdown, DatePicker, FileUploadSection, type UploadFile} from '@/components/pub/atoms';
import {Modal} from '@/components/pub/modal/Modal';
import {Dialog} from '@/components/pub/modal/Dialog';
// 개인정보 처리방침 컴포넌트
const PrivacyPolicy = () => {
    return (
        <div className="privacy_policy">
            <section>
                <p>SPC삼립(이하 "회사")은 "온라인 1:1 문의" 서비스를 제공함에 있어 개인정보보호법 및 관련 법령에 따라 고객의 개인정보를 보호하고, 이와 관련한 고지를 아래와 같이
                    안내합니다.</p>
            </section>

            {/* 제1조 */}
            <div>
                <h3>제1조 [수집하는 개인정보 항목]</h3>
                <p>회사는 다음의 개인정보 항목을 수집합니다.</p>
                <table>
                    <thead>
                    <tr>
                        <th>구분</th>
                        <td>불만, 문의, 칭찬, 제안, 제보 등 상담 접수 및 처리</td>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <th className="font-bold text-left">항목</th>
                        <td>필수항목 : 이름, 이메일, 전화번호</td>
                    </tr>
                    </tbody>
                </table>
            </div>

            {/* 제2조 */}
            <div>
                <h3>제2조 [개인정보 처리목적]</h3>
                <p>회사는 수집한 개인정보를 다음의 목적으로 처리합니다.</p>
                <ol className="list-decimal">
                    <li>문의, 제안, 제보, 불만에 대한 상담 및 처리</li>
                    <li>제품의 교환, 환불, 배송 관련 상담 처리</li>
                    <li>상담 결과에 대한 해피콜(만족도 조사)</li>
                </ol>
                <p className="mt-2">회사는 목적 외 용도로 사용할 경우 별도 동의를 구하는 등의 절차를 거칩니다.</p>
            </div>

            {/* 제3조 */}
            <div>
                <h3>제3조 [개인정보 수집방법]</h3>
                <p>회사는 다음과 같은 방법으로 개인정보를 수집합니다.</p>
                <ol className="list-decimal">
                    <li>고객상담실(080-739-8572) 전화상담</li>
                    <li>홈페이지 상단 CUSTOMER(고객지원) 내 온라인 1:1 문의</li>
                    <li>서신 상담</li>
                    <li>개인정보 제3자 제공을 통한 수집 (한국소비자원 통합 소비자불만해결시스템)</li>
                </ol>
            </div>

            {/* 제4조 */}
            <div>
                <h3>제4조 [개인정보 보유 및 이용기간]</h3>
                <p>회사는 원칙적으로 개인정보 수집 및 이용목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다. 단, 다음의 정보에 대해서는 아래의 이유로 명시한 기간 동안 보존합니다.</p>
                <div className="space-y-2">
                    <div>
                        <p className="mb-1 font-semibold">1. 전자상거래 등에서의 소비자보호에 관한 법률 시행령</p>
                        <ul className="list-disc text-10px">
                            <li>표시·광고에 관한 기록: 6개월</li>
                            <li>계약 또는 청약철회 등에 관한 기록: 5년</li>
                            <li>대금결제 및 재화 등의 공급에 관한 기록: 5년</li>
                            <li>소비자의 불만 또는 분쟁처리에 관한 기록: 3년</li>
                        </ul>
                    </div>
                    <div>
                        <p className="mb-1 font-semibold">2. 통신비밀보호법 시행령</p>
                        <ul className="list-disc text-10px">
                            <li>통신사실확인자료: 3개월</li>
                        </ul>
                    </div>
                    <div>
                        <p className="mb-1 font-semibold">3. 국세기본법 등</p>
                        <ul className="list-disc text-10px">
                            <li>장부 및 증빙서류: 법정신고기한 기준일로부터 5년</li>
                        </ul>
                    </div>
                    <div>
                        <p className="mb-1 font-semibold">4. 전자금융거래법</p>
                        <ul className="list-disc text-10px">
                            <li>전자금융거래 기록: 5년</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* 제5조 */}
            <div>
                <h3>제5조 [개인정보 수집 동의 거부]</h3>
                <p>고객은 개인정보 수집 및 이용에 대한 동의를 거부할 권리가 있습니다. 다만, 필수 항목에 대한 동의를 거부할 경우 서비스 이용이 불가하거나 제한될 수 있습니다.</p>
            </div>

            {/* 제6조 */}
            <div>
                <h3>제6조 [개인정보 파기절차 및 파기방법]</h3>
                <p className="font-semibold">1. 파기절차</p>
                <p className="ml-2">회사는 목적 달성 또는 법정 보유기간 경과 후 개인정보를 파기합니다.</p>
                <p className="font-semibold">2. 파기방법</p>
                <ul className="list-disc">
                    <li>종이에 출력된 개인정보: 분쇄기로 분쇄하거나 소각</li>
                    <li>전자적 파일 형태의 개인정보: 기록을 재생할 수 없는 기술적 방법을 사용하여 삭제</li>
                </ul>
            </div>

            {/* 제7조 */}
            <div>
                <h3>제7조 [개인정보의 제3자 제공]</h3>
                <p>회사는 원칙적으로 고객의 개인정보를 제3자에게 제공하지 않습니다. 다만, 다음의 경우에는 예외로 합니다.</p>
                <ol className="mt-2 list-decimal">
                    <li>고객이 사전에 동의한 경우</li>
                    <li>법령의 규정에 의거하거나, 수사 목적으로 법령에 정해진 절차와 방법에 따라 수사기관의 요구가 있는 경우</li>
                </ol>
            </div>

            {/* 제8조 */}
            <div>
                <h3>제8조 [개인정보의 처리위탁]</h3>
                <p>회사는 원활한 개인정보 업무처리를 위하여 다음과 같이 개인정보 처리업무를 위탁하고 있습니다.</p>
                <table>
                    <thead>
                    <tr>
                        <th className="">수탁사</th>
                        <td>(주)섹타나인</td>
                    </tr>
                    <tr>
                        <th className="">처리 위탁내용</th>
                        <td>VOC시스템의 운영, 유지보수</td>
                    </tr>
                    <tr>
                        <th className="">제공하는 개인정보</th>
                        <td>성명, 이메일, 전화번호</td>
                    </tr>
                    </thead>
                </table>
                <p className="mt-2">회사는 위탁계약 체결 시 개인정보보호법에 따라 위탁업무 수행목적 외 개인정보 처리금지, 기술적·관리적 보호조치, 재위탁 제한, 수탁자에 대한
                    관리·감독, 손해배상 등에 관한 사항을 계약서 등 문서에 명시하고, 수탁자가 개인정보를 안전하게 처리하는지를 감독하고 있습니다.</p>
            </div>

            {/* 제9조 */}
            <div>
                <h3>제9조 [개인정보의 열람 및 정정, 삭제, 처리정지 요구, 수집 및 이용에 대한 동의 철회]</h3>
                <p>고객은 언제든지 다음 각 호의 개인정보 보호 관련 권리를 행사할 수 있습니다.</p>
                <ol className="mt-2 list-decimal">
                    <li>개인정보 열람 요구</li>
                    <li>오류 등이 있을 경우 정정 요구</li>
                    <li>삭제 요구</li>
                    <li>처리정지 요구</li>
                    <li>개인정보 수집 및 이용에 대한 동의 철회</li>
                </ol>
                <p className="mt-2">위 권리 행사는 회사에 대해 서면, 전자우편, 모사전송(FAX) 등을 통하여 하실 수 있으며 회사는 이에 대해 지체 없이 조치하겠습니다.</p>
            </div>

            {/* 제10조 */}
            <div>
                <h3>제10조 [개인정보의 안전성 확보 조치에 관한 사항]</h3>
                <p>회사는 개인정보의 분실, 도난, 유출, 훼손, 위조, 변조 등을 방지하기 위하여 다음과 같은 기술적·관리적·물리적 조치를 취하고 있습니다.</p>
                <ol className="list-decimal">
                    <li>개인정보에 대한 접근 제한</li>
                    <li>개인정보를 취급하는 직원의 최소화 및 교육</li>
                    <li>개인정보의 암호화</li>
                    <li>해킹 등에 대비한 기술적 대책</li>
                    <li>개인정보처리시스템 등의 접근권한 관리</li>
                </ol>
            </div>

            {/* 제11조 */}
            <div>
                <h3>제11조 [개인정보관리책임자 및 담당자의 연락처]</h3>
                <p>회사는 개인정보 보호 및 관련 불만 처리를 위하여 아래와 같이 개인정보관리책임자 및 담당자를 지정하고 있습니다.</p>
                <table>
                    <thead>
                    <tr>
                        <th className="font-bold text-left">개인정보관리책임자</th>
                        <th className="font-bold text-left">개인정보관리담당자</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr className='*:!py-4'>
                        <td className='text'>책임자 : 오진석 실장 <br/> 부서명 : 품질경영실 <br/> 연락처 : 031-739-2050 <br/> 이메일 :
                            oh183b@spc.co.kr
                        </td>
                        <td>담당자 : 김용건 팀장 <br/> 부서명 : CSM팀 <br/> 연락처 : 031-739-2029 <br/> 이메일 : kguny@spc.co.kr</td>
                    </tr>
                    <tr>
                    </tr>
                    </tbody>
                </table>
                <p className="">개인정보 침해로 인한 신고나 상담이 필요하신 경우에는 아래 기관에 문의하시기 바랍니다.</p>
                <ul className="list-disc text-10px">
                    <li>개인정보침해신고센터 (privacy.go.kr / 국번없이 182)</li>
                    <li>개인정보분쟁조정위원회 (www.kopico.go.kr / 1833-6972)</li>
                    <li>대검찰청 사이버수사과 (www.spo.go.kr / 02-3480-3573)</li>
                    <li>경찰청 사이버수사국 (www.police.go.kr / 국번없이 182)</li>
                </ul>
            </div>

            {/* 제12조 */}
            <div>
                <h3>제12조 [고지의 의무]</h3>
                <p>이 개인정보 처리방침은 시행일로부터 적용되며, 법령 및 방침에 따른 변경내용의 추가, 삭제 및 정정이 있는 경우에는 변경사항의 시행 7일 전부터 공지사항을 통하여 고지할 것입니다.
                    다만, 개인정보의 수집 및 활용, 제3자 제공 등과 같이 이용자 권리의 중요한 변경이 있을 경우에는 최소 30일 전에 미리 알려드리겠습니다.</p>
            </div>
        </div>
    );
};

const MAX_TOTAL_FILE_SIZE = 30 * 1024 * 1024; // 30MB

const Inquiry = () => {
    // 폼 상태 관리
    const [agreed, setAgreed] = useState(false);
    const [counselingType, setCounselingType] = useState('');
    const [contentType, setContentType] = useState('');
    const [occurrenceDate, setOccurrenceDate] = useState('');
    const [occurrenceHour, setOccurrenceHour] = useState('');
    const [occurrenceMinute, setOccurrenceMinute] = useState('');
    const [purchaseRegion, setPurchaseRegion] = useState('');
    const [purchasePlace, setPurchasePlace] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [name, setName] = useState('');
    const [contact, setContact] = useState('');
    const [emailId, setEmailId] = useState('');
    const [emailDomain, setEmailDomain] = useState('');
    const [emailDomainCustom, setEmailDomainCustom] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    // 파일 업로드 관련 (FileUploadSection용 - UI 확인용)
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [uploadFiles, setUploadFiles] = useState<UploadFile[]>([]);
    const [fileError, setFileError] = useState('');

    // 드롭다운 옵션
    const counselingTypeOptions = ['제품 문의', '서비스 문의', '불만 접수', '칭찬 및 제안', '기타'];
    const contentTypeOptions = ['제품 관련', '서비스 관련', '배송 관련', '환불/교환', '기타'];
    const hourOptions = Array.from({length: 24}, (_, i) => String(i).padStart(2, '0'));
    const minuteOptions = Array.from({length: 60}, (_, i) => String(i).padStart(2, '0'));
    const regionOptions = [
        '강원도',
        '경기도',
        '경상남도',
        '경상북도',
        '광주광역시',
        '대구광역시',
        '대전광역시',
        '부산광역시',
        '서울특별시',
        '세종특별자치시',
        '울산광역시',
        '인천광역시',
        '전라남도',
        '전라북도',
        '제주특별자치도',
        '충청남도',
        '충청북도',
    ];

    const emailDomainOptions = [
        '직접입력',
        'gmail.com',
        'naver.com',
        'daum.net',
        'nate.com',
        'icloud.com',
        'outlook.com',
        'hotmail.com',
        'kakao.com',
        'hanmail.net',
        'yahoo.com'
    ];

    // FileUploadSection용 파일 업로드 핸들러
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selected = Array.from(e.target.files || []);
        if (selected.length === 0) return;

        setFileError('');

        const allowedTypes = new Set(['image/jpeg', 'image/jpg', 'image/png']);

        const currentTotalSize = uploadFiles.reduce((sum, f) => sum + (f.size || 0), 0);
        let nextTotalSize = currentTotalSize;

        const nextFiles: UploadFile[] = [];

        for (const file of selected) {
            const isValidType = allowedTypes.has(file.type);
            if (!isValidType) {
                setFileError('png, jpg 파일만 업로드 가능합니다.');
                continue;
            }

            if (nextTotalSize + file.size > MAX_TOTAL_FILE_SIZE) {
                setFileError('첨부파일의 총 용량은 30MB 이하만 가능합니다.');
                continue;
            }

            nextTotalSize += file.size;

            const id = typeof crypto !== 'undefined' && 'randomUUID' in crypto
                ? crypto.randomUUID()
                : `${Date.now()}-${Math.random().toString(16).slice(2)}`;

            nextFiles.push({
                id,
                file,
                name: file.name,
                size: file.size,
                progress: 100,
                status: 'removable',
            });
        }

        if (nextFiles.length > 0) {
            setUploadFiles((prev) => [...prev, ...nextFiles]);
        }

        // 같은 파일을 다시 선택해도 onChange가 트리거되도록 초기화
        e.target.value = '';
    };

    const handleRemoveFile = (id: string) => {
        setUploadFiles((prev) => prev.filter((f) => f.id !== id));
        setFileError('');
    };

    // 공통 모달 테스트용 핸들러
    const handleModalNoSubmit = async () => {
        await Modal.alert({
            message: '아직 접수하지 않았습니다.',
            okText: '확인',
        });
    };

    const handleModalMissingRequired = async () => {
        await Modal.alert({

            message: '필수 입력값을 모두 입력해 주세요.',
            okText: '확인',
        });
    };

    const handleModalBeforeSubmit = async () => {
        await Modal.confirm({
            message: '입력하신 정보로 접수하시겠습니까?',
            okText: '확인',
            cancelText: '취소',
        });
    };

    // 이메일 도메인 선택 핸들러
    const handleEmailDomainSelect = (domain: string) => {
        if (domain === '직접입력') {
            setEmailDomain('');
            setEmailDomainCustom('');
        } else {
            setEmailDomain(domain);
            setEmailDomainCustom('');
        }
    };

    // 이메일 도메인 표시값
    const emailDomainDisplay = emailDomain && emailDomain !== '직접입력' ? emailDomain : '직접입력';
    const isCustomEmailDomain = emailDomainDisplay === '직접입력';

    // 폼 제출 핸들러
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // 폼 제출 로직 구현
        console.log('Form submitted');
    };

    return (
        <main className="pb-12 mx-auto w-full">
            <section className=''>
                {/* 페이지 제목 */}
                <h1 className="text-center py-9  lg:py-[100px] lg:mt-[80px] bg-cream text-[18px] lg:text-[42px] font-extrabold leading-[1.5] lg:leading-[1.3em] text-black tracking-[-0.54px] lg:tracking-0 mb-6 lg:mb-12">상담
                    문의</h1>
                <form onSubmit={handleSubmit} className="flex flex-col gap-6 lg:gap-[68px] max-w-[1220px] mx-auto px-5">
                    {/* 이용동의 섹션 */}
                    <div className="flex flex-col gap-4">
                        <h2 className="">1. 이용동의</h2>
                        <p className="text-[14px] lg:text-[18px] font-normal leading-[1.6em] text-black tracking-[-0.36px] lg:tracking-0 lg:mb-[68px]">상담
                            접수를 위해 반드시 개인정보 처리방침을 읽고 동의 여부에 확인해 주세요</p>

                        <section>
                            <div
                                className="border border-line2 p-4 lg:p-6 max-h-[300px] lg:max-h-[440px] overflow-y-auto thin-transparent-scrollbar">
                                <PrivacyPolicy/>
                            </div>
                            <label
                                className="flex gap-2 justify-center items-center border border-t-0 cursor-pointer privacy-checkbox-label border-line2">
                            <span
                                className="text-[16px] py-5 lg:text-[26px] font-bold leading-[1.6em] text-black tracking-[-0.36px] lg:tracking-0">
                            개인정보 처리방침 동의
                            </span>
                                <input
                                    type="checkbox"
                                    checked={agreed}
                                    onChange={(e) => setAgreed(e.target.checked)}
                                    className="privacy-checkbox"
                                />
                            </label>
                        </section>
                    </div>

                    {/* 이용안내 섹션 */}
                    <section className='flex flex-col gap-5'>
                        <h2 className="">2. 이용안내</h2>
                        <p className="text-[16px] lg:text-[22px] font-normal leading-[1.6em] text-black tracking-[-0.36px] lg:tracking-0">
                            저희 고객센터는 상담 접수 순서에 따라 순차적으로 연락 드리고 있습니다. 추가 문의 사항이 있으실 경우, 고객센터 080-739-0522로 연락 주시기 바랍니다.
                        </p>
                    </section>

                    {/* 문의 내용 작성 섹션 */}
                    <div className="flex flex-col gap-4 lg:gap-6 lg:border lg:border-line2 lg:p-[100px]">
                        <h2 className="">
                            3. 문의 내용 작성
                        </h2>

                        <div className="flex flex-col gap-4 lg:gap-6">
                            <div className='grid grid-cols-1 gap-2 lg:grid-cols-2 lg:gap-4'>
                                {/* 상담유형 */}
                                <div className="flex flex-col gap-2">
                                    <label
                                        className="text-[16px] lg:text-[26px] font-semibold leading-[1.6em] text-black tracking-[-0.36px] lg:tracking-0">
                                        상담유형
                                    </label>
                                    <Dropdown
                                        placeholder="선택"
                                        options={counselingTypeOptions}
                                        selected={counselingType}
                                        onSelect={setCounselingType}
                                    />
                                </div>

                                {/* 내용유형 */}
                                <div className="flex flex-col gap-2">
                                    <label
                                        className="text-[16px] lg:text-[26px] font-semibold leading-[1.6em] text-black tracking-[-0.36px] lg:tracking-0">
                                        내용유형
                                    </label>
                                    <Dropdown
                                        placeholder="선택"
                                        options={contentTypeOptions}
                                        selected={contentType}
                                        onSelect={setContentType}/>
                                </div>
                            </div>

                            {/* 발생일시 */}
                            <div className="flex flex-col gap-2 w-full">
                                <label
                                    className="text-[16px] lg:text-[26px] font-semibold leading-[1.6em] text-black tracking-[-0.36px] lg:tracking-0">
                                    발생일시
                                </label>
                                <div className="grid grid-cols-1 gap-2 items-start lg:grid-cols-2 lg:flex-row lg:gap-4">
                                    <div className="flex-1 w-full">
                                        <DatePicker
                                            value={occurrenceDate}
                                            onChange={setOccurrenceDate}
                                            placeholder="YYYY.MM.DD"
                                        />
                                    </div>
                                    <div className="flex gap-2 items-center w-full">
                                        <div className="flex-1">
                                            <Dropdown
                                                placeholder="시간"
                                                options={hourOptions}
                                                selected={occurrenceHour}
                                                onSelect={setOccurrenceHour}
                                            />
                                        </div>
                                        <span className="text-[12px] lg:text-[18px]">:</span>
                                        <div className="flex-1">
                                            <Dropdown
                                                placeholder="분"
                                                options={minuteOptions}
                                                selected={occurrenceMinute}
                                                onSelect={setOccurrenceMinute}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* 구입처 */}
                            <div className="flex flex-col gap-2">
                                <label
                                    className="text-[16px] lg:text-[26px] font-semibold leading-[1.6em] text-black tracking-[-0.36px] lg:tracking-0">
                                    구입지역
                                </label>
                                <div className="grid grid-cols-1 gap-2 lg:grid-cols-2 lg:gap-4">
                                    <div className="w-full">
                                        <Dropdown
                                            placeholder="지역 선택"
                                            options={regionOptions}
                                            selected={purchaseRegion}
                                            onSelect={setPurchaseRegion}
                                        />
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="ex) 서울특별시 강남구"
                                        value={purchasePlace}
                                        onChange={(e) => setPurchasePlace(e.target.value)}
                                        className="w-full report-input"
                                    />
                                </div>
                            </div>

                            {/* 제목 */}
                            <div className="flex flex-col gap-2">
                                <label
                                    className="text-[16px] lg:text-[26px] font-semibold leading-[1.6em] text-black tracking-[-0.36px] lg:tracking-0">
                                    제목
                                </label>
                                <input
                                    type="text"
                                    placeholder="제목을 입력해주세요"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="report-input"
                                />
                            </div>

                            {/* 내용 */}
                            <div className="flex flex-col gap-2">
                                <label
                                    className="text-[16px] lg:text-[26px] font-semibold leading-[1.6em] text-black tracking-[-0.36px] lg:tracking-0">
                                    내용
                                </label>
                                <textarea
                                    placeholder="내용을 입력해주세요"
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    rows={8}
                                    className="report-input"
                                />
                            </div>

                            {/* 파일첨부 */}
                            <FileUploadSection
                                fileInputRef={fileInputRef}
                                uploadFiles={uploadFiles}
                                fileError={fileError}
                                handleFileChange={handleFileChange}
                                handleRemoveFile={handleRemoveFile}
                            />

                            <section className='grid grid-cols-1 gap-2 lg:grid-cols-2 lg:gap-4'>
                                {/* 성명 */}
                                <div className="flex flex-col gap-2">
                                    <label
                                        className="text-[16px] lg:text-[26px] font-semibold leading-[1.6em] text-black tracking-[-0.36px] lg:tracking-0">
                                        성명
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="성명을 입력해주세요"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="report-input"
                                    />
                                </div>

                                {/* 연락처 */}
                                <div className="flex flex-col gap-2">
                                    <label
                                        className="text-[16px] lg:text-[26px] font-semibold leading-[1.6em] text-black tracking-[-0.36px] lg:tracking-0">
                                        연락처 (‘-’없이 번호만 입력)
                                    </label>
                                    <input
                                        type="tel"
                                        placeholder="연락처를 입력해주세요"
                                        value={contact}
                                        onChange={(e) => setContact(e.target.value)}
                                        className="report-input"
                                    />
                                </div>
                            </section>

                            {/* 이메일 */}
                            <div className="flex flex-col gap-2">
                                <label
                                    className="text-[16px] lg:text-[26px] font-semibold leading-[1.6em] text-black tracking-[-0.36px] lg:tracking-0">
                                    이메일
                                </label>
                                <div className="grid grid-cols-1 gap-2 w-full lg:grid-cols-4">
                                    <div className='flex col-span-3 gap-2 items-center w-full'>
                                        <input
                                            type="text"
                                            placeholder="이메일"
                                            value={emailId}
                                            onChange={(e) => setEmailId(e.target.value)}
                                            className="report-input"
                                        />
                                        <span className="text-[26px] font-bold ">@</span>
                                        <input
                                            type="text"
                                            value={isCustomEmailDomain ? emailDomainCustom : emailDomain}
                                            readOnly={!isCustomEmailDomain}
                                            onChange={(e) => setEmailDomainCustom(e.target.value)}
                                            className="report-input"
                                        />
                                    </div>
                                    <div className="flex flex-col flex-1 col-span-1 gap-2 w-full lg:flex-row lg:w-auto">
                                        <div className="w-full h-full">
                                            <Dropdown
                                                placeholder="직접입력"
                                                className="h-full *:h-full"
                                                options={emailDomainOptions}
                                                selected={emailDomainDisplay}
                                                onSelect={handleEmailDomainSelect}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <section className='grid grid-cols-1 gap-2 lg:grid-cols-2 lg:gap-4'>
                                {/* 비밀번호 */}
                                <div className="flex flex-col gap-2">
                                    <label
                                        className="text-[16px] lg:text-[26px] font-semibold leading-[1.6em] text-black tracking-[-0.36px] lg:tracking-0">
                                        비밀번호
                                    </label>
                                    <input
                                        type="password"
                                        placeholder="비밀번호를 입력해주세요"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="report-input"
                                    />
                                </div>

                                {/* 비밀번호확인 */}
                                <div className="flex flex-col gap-2">
                                    <label
                                        className="text-[16px] lg:text-[26px] font-semibold leading-[1.6em] text-black tracking-[-0.36px] lg:tracking-0">
                                        비밀번호확인
                                    </label>
                                    <input
                                        type="password"
                                        placeholder="비밀번호를 다시 입력해주세요"
                                        value={passwordConfirm}
                                        onChange={(e) => setPasswordConfirm(e.target.value)}
                                        className="report-input"
                                    />
                                </div>
                            </section>
                        </div>
                    </div>

                    {/* 접수하기 버튼 */}
                    <div className='flex justify-center mb-10 lg:mb-20'>
                        <button
                            type="submit"
                            className=" bg-[#ED1B29] w-auto text-white py-3 lg:py-4 text-[14px] lg:text-[22px] font-normal leading-[1.6em] tracking-[-0.42px] lg:tracking-0 hover:bg-[#DC1A27] transition-colors px-[52px] lg:px-[75px] rounded-full"
                        >
                            접수하기
                        </button>
                    </div>
                    <p>확인용이라 나중에 지워주세용</p>
                    <div className="flex gap-3">
                        <button
                            type="button"
                            onClick={handleModalNoSubmit}
                            className="px-3 py-2 text-white bg-red-500 rounded"
                        >
                            모달: 접수 안 했을 때
                        </button>
                        <button
                            type="button"
                            onClick={handleModalMissingRequired}
                            className="px-3 py-2 text-white bg-red-500 rounded"
                        >
                            모달: 필수값 미입력
                        </button>
                        <button
                            type="button"
                            onClick={handleModalBeforeSubmit}
                            className="px-3 py-2 text-white bg-red-500 rounded"
                        >
                            모달: 접수 전 최종 확인
                        </button>

                        <button
                            type="button"
                            onClick={() => setIsModalOpen(true)}
                            className="px-3 py-2 text-white bg-red-500 rounded"
                        >
                            모달: 전부다 완료 되었을떄
                        </button>
                    </div>
                    <Dialog
                        open={isModalOpen}
                        className='!max-w-[400px] lg:!max-w-[850px]'
                        okText="확인"
                        onOk={() => setIsModalOpen(false)}
                        hideFooter={false}>
                        <div className="flex flex-col gap-4 items-center px-5 pt-8 lg:pt-20">
                            <Icon name="check_circle" className="size-10 lg:size-[56px] *:fill-samlipRed"/>
                            <p className="text-[14px] lg:text-[26px] text-center lg:max-w-[600px]">상담 내용이 정상적으로 저장
                                되었습니다. 고객님께서 남겨주신 E-mail 또는 연락처를 통해 신속히 답변드릴 수 있도록 하겠습니다. 감사합니다.</p>
                            <p className='text-[10px] lg:text-[15px]   text-center '>* 주말, 공휴일에 남겨주신 글은 평일에 확인, 답변 드리는 점
                                양해 부탁드립니다.</p>
                        </div>
                    </Dialog>
                </form>
            </section>
        </main>
    );
};

export default Inquiry;
