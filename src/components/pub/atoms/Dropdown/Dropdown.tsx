import React, {useState, useRef, useEffect} from 'react';
import {motion, AnimatePresence} from 'framer-motion';
import {Icon} from '@/components/pub/icons';

interface DropdownProps {
    placeholder: string;
    options: string[];
    selected: string;
    onSelect: (value: string) => void;
    className?: string;
}

// 드롭다운 컴포넌트
const Dropdown: React.FC<DropdownProps> = ({
    placeholder,
    options,
    selected,
    onSelect,
    className
}) => {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        };

        if (open) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [open]);

    return (
        <div className={`relative w-full ${className}`} ref={dropdownRef}>
            <button
                type="button"
                onClick={() => setOpen(!open)}
                className={`w-full border border-[#D9D9D9] flex justify-between items-center gap-4 lg:gap-6 text-[14px] lg:text-[22px] px-3 lg:px-[18px] py-[11px] lg:py-[20px] leading-none bg-white transition duration-200  
            ${open ? 'border-samlipRed border' : ''}`}
            >
        <span className={selected ? 'text-black' : 'text-black'}>
          {selected || placeholder}
        </span>
                <Icon
                    name="arrow_down_black"
                    className={
                        `w-5 h-5 lg:w-6 lg:h-6 *:fill-[#000000] transition duration-200` +
                        (open ? ' rotate-180' : '')
                    }
                />
            </button>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{opacity: 0, height: 0, y: -10}}
                        animate={{opacity: 1, height: 'auto', y: 0}}
                        exit={{opacity: 0, height: 0, y: -10}}
                        transition={{duration: 0.2, ease: 'easeOut'}}
                        className="absolute left-0 top-full w-full border border-[#D9D9D9] bg-white shadow-sm z-10 max-h-[300px] overflow-hidden thin-transparent-scrollbar"
                    >
                        <div className="overflow-y-auto max-h-[300px]">
                            {options.map((opt) => (
                                <div
                                    key={opt}
                                    onClick={() => {
                                        onSelect(opt);
                                        setOpen(false);
                                    }}
                                    className="px-3 lg:px-4 py-2 lg:py-3 text-[12px] lg:text-[18px] hover:bg-[#f3f3f3] cursor-pointer"
                                >
                                    {opt}
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Dropdown;
