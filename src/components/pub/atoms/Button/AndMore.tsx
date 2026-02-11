// AND MORE.
import { Icon } from '@/components/pub/icons';

interface AndMoreProps {
  className?: string;
  onClick?: () => void;
}

export const AndMore = ({ 
  className = '',
  onClick
}: AndMoreProps) => {
  return (
    <button 
      onClick={onClick}
      className={`flex gap-3 justify-center items-center transition-all hover:text-samlipRed text-grilledMeats group ${className}`}
    >
      <span className='gt-ultra text-[16px] lg:text-[34px]'>
        AND MORE.
      </span>
      <Icon name="arrowMore" size={46} className='lg:size-[46px] transition-all size-[24px] *:fill-current' />
    </button>
  );
};

export default AndMore;
