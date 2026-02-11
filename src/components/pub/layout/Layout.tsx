import PubHeader from '@/components/pub/header/Header';
import PubFooter from '@/components/pub/footer/Footer';
import ScrollTop from '@/components/pub/layout/ScrollTop';

export default function PubLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div id="pub-root">
            <PubHeader/>
            <main>{children}</main>
            <PubFooter/>
            <ScrollTop/>
        </div>
    );
}
