import React from 'react';
import {Icon} from '@/components/pub/icons';

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

interface ShareButtonsProps {
    showSocialIcons: boolean;
    onCopy: () => void;
    onShare: () => void;
    onFacebookShare: () => void;
    onTwitterShare: () => void;
    // 카카오 공유를 위한 데이터
    kakaoShareData?: {
        title: string;
        description: string;
        imageUrl: string;
    };
    // 또는 기존 방식 유지 (onKakaoShare 콜백)
    onKakaoShare?: () => void;
}

const ShareButtons: React.FC<ShareButtonsProps> = ({
    showSocialIcons,
    onCopy,
    onShare,
    onFacebookShare,
    onTwitterShare,
    kakaoShareData,
    onKakaoShare,
}) => {
    // 카카오 공유 핸들러
    const handleKakaoShare = React.useCallback(() => {
        // 외부에서 직접 처리하도록 요청된 경우 우선 사용
        if (onKakaoShare) {
            onKakaoShare();
            return;
        }

        // 내부 처리: KakaoTalk 공유
        if (!kakaoShareData) return;

        const win = window as unknown as WindowWithKakao;

        const sendKakao = () => {
            if (!win.Kakao) return;

            // SDK 초기화
            if (!win.Kakao.isInitialized()) {
                const kakaoKey = (process.env.REACT_APP_KAKAO_JS_KEY || '') as string;
                if (!kakaoKey) {
                    console.warn('카카오 JavaScript Key가 설정되지 않았습니다.');
                    return;
                }
                win.Kakao.init(kakaoKey);
            }

            try {
                win.Kakao.Share.sendDefault({
                    objectType: 'feed',
                    content: {
                        title: kakaoShareData.title,
                        description: kakaoShareData.description,
                        imageUrl: kakaoShareData.imageUrl,
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
            }
        };

        // Kakao SDK가 없으면 로드 후 실행
        if (!win.Kakao) {
            const script = document.createElement('script');
            script.src = 'https://developers.kakao.com/sdk/js/kakao.js';
            script.async = true;
            script.onload = sendKakao;
            script.onerror = () => console.warn('Kakao SDK 로드 실패');
            document.head.appendChild(script);
        } else {
            sendKakao();
        }
    }, [kakaoShareData, onKakaoShare]);
    return (
        <div className="flex gap-2 justify-center items-center w-full lg:pt-6 border-b border-[#D9D8CF] relative">
            <button
                onClick={onCopy}
                className="flex justify-center items-center size-9 bg-[#D9D8CF] hover:bg-grilledMeats transition-colors cursor-pointer lg:size-12"
            >
                <Icon name="copy" className="size-full fill-white"/>
            </button>

            {/* 모바일: 항상 표시, PC: 공유 버튼 클릭 시 표시 */}
            <button
                onClick={onShare}
                className="flex justify-center items-center size-9 bg-[#D9D8CF] hover:bg-grilledMeats transition-colors cursor-pointer lg:size-12"
            >
                <Icon name="share" className="size-full fill-white"/>
            </button>

            {/* 모바일에서는 숨김, PC에서만 표시 */}
            <div
                className={`hidden lg:flex gap-2 transition-all duration-300 ${
                    showSocialIcons
                        ? 'lg:opacity-100 lg:max-w-full lg:translate-x-0'
                        : 'lg:opacity-0 lg:max-w-0 lg:overflow-hidden lg:-translate-x-4'
                }`}
            >
                <button
                    onClick={onFacebookShare}
                    className="transition-opacity cursor-pointer hover:opacity-80"
                >
                    <Icon name="facebook" className="size-10"/>
                </button>
                <button
                    onClick={onTwitterShare}
                    className="transition-opacity cursor-pointer hover:opacity-80"
                >
                    <Icon name="twitter" className="size-10"/>
                </button>
                <button
                    onClick={handleKakaoShare}
                    className="transition-opacity cursor-pointer hover:opacity-80"
                >
                    <Icon name="kakao" className="size-10"/>
                </button>
            </div>
        </div>
    );
};

export default ShareButtons;

