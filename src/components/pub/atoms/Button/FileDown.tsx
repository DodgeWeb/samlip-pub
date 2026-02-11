import React from 'react';
import { Icon } from '@/components/pub/icons';
import '@/assets/style/common.scss';

interface FileDownProps {
    className?: string;
    onClick?: () => void;
    text?: string;
}

const FileDown: React.FC<FileDownProps> = ({ 
    className = '',
    onClick,
    text = '공정거래 자율준수 프로그램 운영규정 e-book'
}) => {
    return (
        <button 
            onClick={onClick}
            className={`
                flex items-center justify-center gap-1 lg:gap-2 w-[320px] lg:w-auto h-12 lg:h-20 px-0 lg:px-6 border border-[#D9D9D9] text-black
                hover:bg-grilledMeats hover:text-white hover:border-transparent
                transition-all duration-300
                group
                ${className}
            `}
        >
            <span className="text-[14px] leading-[1.7] tracking-[-0.03em] lg:text-[26px] lg:leading-[1.4] lg:tracking-[-0.005em] lg:sub2">{text}</span>
            <Icon 
                name="fileDown" 
                size={20} 
                className="lg:size-10 *:fill-[#D9D9D9] flex-shrink-0 group-hover:*:*:fill-white transition-colors"
            />
        </button>
    );
};

export default FileDown;