import React, { useState, useEffect } from 'react';
import { ImageModal } from './ImageModal';

interface ClickableImageProps {
  src: string;
  alt?: string;
  className?: string;
  showButton?: boolean;
  buttonText?: string;
  buttonClassName?: string;
  children?: React.ReactNode; // 커스텀 컨텐츠 (선택적)
}

export const ClickableImage: React.FC<ClickableImageProps> = ({
  src,
  alt = '',
  className = '',
  showButton = true,
  buttonText = '확대',
  buttonClassName = '',
  children,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // 모바일 여부 체크
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024); // lg 브레이크포인트 기준
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleOpen = () => setIsModalOpen(true);
  const handleClose = () => setIsModalOpen(false);

  // 이미지 클릭 핸들러 (모바일에서만 작동)
  const handleImageClick = (e: React.MouseEvent) => {
    if (isMobile && showButton) {
      e.stopPropagation();
      handleOpen();
    }
  };

  // 기본 이미지 렌더링
  const defaultImage = (
    <img
      src={src}
      alt={alt}
      className={className}
      onClick={showButton && isMobile ? handleImageClick : undefined}
      style={showButton && isMobile ? { cursor: 'pointer' } : undefined}
    />
  );

  return (
    <>
      <div className="relative">
        {/* 이미지 자체가 클릭 가능한 경우 */}
        {!showButton && (
          <div onClick={handleOpen} className="cursor-pointer">
            {children || defaultImage}
          </div>
        )}

        {/* 버튼이 있는 경우 */}
        {showButton && (
          <div className="relative group">
            {children ? (
              <div
                onClick={isMobile ? handleImageClick : undefined}
                style={isMobile ? { cursor: 'pointer' } : undefined}
              >
                {children}
              </div>
            ) : (
              defaultImage
            )}
            <button
              onClick={handleOpen}
              className={`flex absolute right-1 bottom-1 justify-center items-center text-white rounded-full transition-colors lg:hidden size-9 ${buttonClassName}`}
            //   bg-white
            >
              {/* <Icon name="arrowsOutput" size={24} /> */}
            </button>
          </div>
        )}
      </div>

      <ImageModal
        isOpen={isModalOpen}
        onClose={handleClose}
        imageSrc={src}
        alt={alt}
      />
    </>
  );
};

