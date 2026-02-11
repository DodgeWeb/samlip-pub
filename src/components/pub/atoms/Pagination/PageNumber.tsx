import React from 'react';

interface PageNumberProps {
    page: number;
    isActive?: boolean;
    onClick: (page: number) => void;
}

const PageNumber: React.FC<PageNumberProps> = ({page, isActive = false, onClick}) => {
    return (
        <div
            className="w-[36px] h-[36px] lg:w-[44px] lg:h-[44px] flex items-center justify-center cursor-pointer rounded"
            onClick={() => onClick(page)}
        >
            <p
                className={`text-[10px] lg:text-[15px] leading-[1.6] text-center tracking-[-0.3px] ${isActive ? 'text-[#f40202] font-extrabold' : 'text-black font-normal'}`}
            >
                {page}
            </p>
        </div>
    );
};

export default PageNumber;
