interface SeeMoreProps {
  className?: string;
  onClick?: () => void;
}

export const SeeMore = ({ 
  className = '',
  onClick
}: SeeMoreProps) => {
  return (
    <button 
      onClick={onClick}
      className={`see-more ${className}`}
    >
        SEE MORE
    </button>
  );
};

export default SeeMore;
