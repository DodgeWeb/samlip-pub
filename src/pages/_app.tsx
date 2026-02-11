// src/pages/_app.tsx
import type {AppProps} from 'next/app';
import PubLayout from '@/components/pub/layout/Layout';

/* Global */
import '@/styles/globals.css';

/* 기존 css */
import '@/assets/style/mixins.scss';
import '@/assets/style/common.scss';
import '@/assets/style/theme.css';
import '@/assets/style/index.css';
import '@/assets/style/components.scss';
import '@/assets/style/notice.scss';
import '@/assets/style/ckEditor.scss';
import '@/assets/style/privacy.scss';
import '@/assets/style/video202507.scss';
import '@/assets/style/tailwind.css';

/* Swiper */
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import '@/assets/style/Swiper.scss';

export default function App({Component, pageProps, router}: AppProps) {
    if (router.pathname.startsWith('/pub')) {
        return (
            <PubLayout>
                <Component {...pageProps} />
            </PubLayout>
        );
    }

    return <Component {...pageProps} />;
}