import {useRouter} from 'next/router';
import {Icon} from '@/components/pub/icons';

const InvestIndex = () => {
    const router = useRouter();

return (
    <main className="mt-[44px] lg:mt-[60px]">
    <section className=" px-5 xl:px-0 pt-[40px] lg:pt-[160px] pb-[70px] lg:pb-[200px] max-w-[1180px] mx-auto w-full">
        <h2 className="text-grilledMeats text-center text-[24px] lg:text-[64px]">투자정보</h2>
        <p className="mt-6 mb-4 text-center text-[13px] lg:mb-20 lg:text-[32px]">
        SPC삼립의 주식정보, 재무정보, 공시정보를 <span className="block lg:inline">확인할 수 있습니다</span>
        </p>

        <ul className="flex flex-col gap-2 lg:flex-row lg:justify-between lg:gap-5">
        {/* 주식정보 */}
        <li
            className="cursor-pointer group w-full py-5 px-4 border border-gray-200 lg:h-[452px] lg:max-w-[380px] lg:flex lg:flex-col lg:items-center lg:justify-center hover:bg-grilledMeats duration-200"
            onClick={() => router.push('/pub/company/invest/stock')}
        >
            <div className="flex items-center justify-between lg:justify-center">
            <h3 className="flex items-center justify-start gap-1 text-grilledMeats text-lg font-extrabold mb-2 lg:text-5xl lg:flex-col lg:mb-9 lg:gap-9 group-hover:text-white">
                <Icon
                name="investFinance"
                className="w-6 h-6 lg:w-[74px] lg:h-[74px] group-hover:brightness-0 group-hover:invert"
                />
                주식정보
            </h3>

            <span className="lg:hidden group-hover:text-white">
                <Icon name="arrowRight" size={24} className="group-hover:brightness-0 group-hover:invert" />
            </span>
            </div>

            <div className="[&>*]:text-grilledMeats text-xs lg:text-xl lg:text-center [&>*]:lg:mb-1 [&>*]:group-hover:text-white">
            <span className="lg:block">실시간 주가정보</span>
            <span className="mx-1 lg:hidden">/</span>
            <span className="lg:block">배당정보</span>
            <span className="mx-1 lg:hidden">/</span>
            <span className="lg:block">공고</span>
            </div>
        </li>

        {/* 재무정보 */}
        <li
            className="cursor-pointer group w-full py-5 px-4 border border-gray-200 lg:h-[452px] lg:max-w-[380px] lg:flex lg:flex-col lg:items-center lg:justify-center hover:bg-grilledMeats duration-200"
            onClick={() => router.push('/pub/company/invest/finance')}
        >
            <div className="flex items-center justify-between lg:justify-center">
            <h3 className="flex items-center justify-start gap-1 text-grilledMeats text-lg font-extrabold mb-2 lg:text-5xl lg:flex-col lg:mb-9 lg:gap-9 group-hover:text-white">
                <Icon
                name="investAtm"
                className="w-6 h-6 lg:w-[74px] lg:h-[74px] group-hover:brightness-0 group-hover:invert"
                />
                재무정보
            </h3>

            <span className="lg:hidden group-hover:text-white">
                <Icon name="arrowRight" size={24} className="group-hover:brightness-0 group-hover:invert" />
            </span>
            </div>

            <div className="[&>*]:text-grilledMeats text-xs lg:text-xl lg:text-center [&>*]:lg:mb-1 [&>*]:group-hover:text-white">
            <span className="lg:block">연결손익계산서</span>
            <span className="mx-1 lg:hidden">/</span>
            <span className="lg:block">연결재무상태표</span>
            <span className="mx-1 lg:hidden">/</span>
            <span className="lg:block">연결현금흐름표</span>
            </div>
        </li>
        
        
        {/* 공시정보 */}
        <li
            className="cursor-pointer group w-full py-5 px-4 border border-gray-200 lg:h-[452px] lg:max-w-[380px] lg:flex lg:flex-col lg:items-center lg:justify-center hover:bg-grilledMeats duration-200"
            onClick={() => router.push('/pub/company/invest/disclosure')}
        >
            <div className="flex items-center justify-between lg:justify-center">
            <h3 className="flex items-center justify-start gap-1 text-grilledMeats text-lg font-extrabold mb-2 lg:text-5xl lg:flex-col lg:mb-9 lg:gap-9 group-hover:text-white">
                <Icon
                name="investNotice"
                className="w-6 h-6 lg:w-[74px] lg:h-[74px] group-hover:brightness-0 group-hover:invert"
                />
                공시정보
            </h3>

            <span className="lg:hidden group-hover:text-white">
                <Icon name="arrowRight" size={24} className="group-hover:brightness-0 group-hover:invert" />
            </span>
            </div>

            <div className="lg:h-[96px] [&>*]:text-grilledMeats text-xs lg:text-xl lg:text-center [&>*]:lg:mb-1 [&>*]:group-hover:text-white">
            <span className="lg:block">공시자료</span>
            <span className="mx-1 lg:hidden">/</span>
            <span className="lg:block">공시정보관리규정</span>
            </div>
        </li>
        </ul>
    </section>
    </main>
);
};

export default InvestIndex;
