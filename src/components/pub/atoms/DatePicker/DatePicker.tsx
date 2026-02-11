import React, {useState, useRef, useEffect} from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import {motion, AnimatePresence} from 'framer-motion';
import {Icon} from '@/components/pub/icons';
import './DatePicker.module.scss';

type CalendarValue = Date | [Date, Date] | [Date | null, Date | null] | null;

interface DatePickerProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

// 날짜 선택 컴포넌트
const DatePicker: React.FC<DatePickerProps> = ({
    value,
    onChange,
    placeholder = 'YYYY.MM.DD'
}) => {
    const [open, setOpen] = useState(false);
    const [calendarValue, setCalendarValue] = useState<Date | null>(value ? new Date(value) : null);
    const datePickerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (datePickerRef.current && !datePickerRef.current.contains(event.target as Node)) {
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

    const handleCalendarChange = (value: CalendarValue, event: React.MouseEvent<HTMLButtonElement>) => {
        if (value instanceof Date) {
            setCalendarValue(value);
            const formattedDate = formatDate(value);
            onChange(formattedDate);
            setOpen(false);
        }
    };

    const formatDate = (date: Date): string => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}.${month}.${day}`;
    };

    return (
        <div className="relative w-full date-picker" ref={datePickerRef}>
            <div
                className="flex-1 relative flex items-center border border-[#D9D9D9] px-3 lg:px-4 py-2.5 lg:py-[18px] cursor-pointer "
                onClick={() => setOpen(!open)}
            >
                <input
                    type="text"
                    placeholder={placeholder}
                    value={value}
                    readOnly
                    className="flex-1 text-[14px] lg:text-[18px] outline-none bg-transparent cursor-pointer placeholder:text-black"
                />
                <Icon name="date" className="w-5 h-5 lg:w-6 lg:h-6 *:fill-[#000000]"/>
            </div>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{opacity: 0, y: -10, scale: 0.95}}
                        animate={{opacity: 1, y: 0, scale: 1}}
                        exit={{opacity: 0, y: -10, scale: 0.95}}
                        transition={{duration: 0.2, ease: 'easeOut'}}
                        className="absolute left-0 top-full w-full mt-1 z-20 bg-white border border-[#D9D9D9]"
                    >
                        <Calendar
                            onChange={handleCalendarChange}
                            value={calendarValue}
                            locale="ko-KR"
                            formatDay={(locale, date) => String(date.getDate())}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default DatePicker;
