import React, {useCallback, useMemo} from 'react';
import {useRouter} from 'next/router';
import clsx from 'clsx';
import {Icon} from '@/components/pub/icons';

export default function ScrollTop() {
    const router = useRouter();

    const pathname = useMemo(() => {
        return (router.asPath ?? '').split('?')[0].split('#')[0];
    }, [router.asPath]);

    const scrollToTop = useCallback(() => {
        if (pathname.startsWith('/pub/company/ci-bi')) {
            window.dispatchEvent(new CustomEvent('cibi:reset', {detail: {behavior: 'smooth'}}));
            return;
        }

        if (pathname === '/pub/company/history') {
            window.dispatchEvent(new CustomEvent('history:scrollToTop', {detail: {behavior: 'smooth'}}));
            return;
        }

        if (pathname === '/pub/brand/bakery') {
            window.dispatchEvent(new CustomEvent('bakery:reset', {detail: {behavior: 'smooth'}}));
            return;
        }

        if (pathname === '/pub/brand/food') {
            window.dispatchEvent(new CustomEvent('food:reset', {detail: {behavior: 'smooth'}}));
            return;
        }

        window.scrollTo({top: 0, behavior: 'smooth'});
    }, [pathname]);

    return (
        <button
            type="button"
            className={clsx(
                'size-[43px]',
                'lg:size-[86px]',
                'rounded-full',
                'fixed',
                'right-5',
                'lg:right-10',
                'flex flex-col items-center justify-center',
                'z-[1002]',
                pathname === '/company/history' ? 'bottom-16 lg:bottom-24' : 'bottom-[15px] lg:bottom-10'
            )}
            style={{backgroundColor: 'var(--samplip-red-500)'}}
            onClick={scrollToTop}
            aria-label="Scroll to top"
        >
            <Icon name="arrowTop" size={24} className="mx-auto lg:size-[24px] size-[12px] fill-white"/>
            <span className="text-[10px] font-bold text-cream lg:text-[21px]">TOP</span>
        </button>
    );
}