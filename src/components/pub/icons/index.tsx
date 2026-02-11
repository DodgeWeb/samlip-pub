import React from 'react';
import clsx from 'clsx';

export type IconName =
    | 'arrowDown'
    | 'defaultMy'
    | 'search'
    | 'language'
    | 'arrowOutward'
    | 'arrowMore'
    | 'menubar'
    | 'doubleArrow'
    | 'arrowTop'
    | 'arrowsOutput'
    | 'checkbook'
    | 'corporateFare'
    | 'documentSearch'
    | 'groups'
    | 'campaign'
    | 'grading'
    | 'partnerExchange'
    | 'quickReferenceAll'
    | 'fileDown'
    | 'plus'
    | 'ethics01'
    | 'ethics02'
    | 'ethics03'
    | 'identity01'
    | 'identity02'
    | 'identity03'
    | 'identity04'
    | 'volunteer_activism'
    | 'mode_heat'
    | 'cognition_2'
    | 'account_box'
    | 'chat'
    | 'chevron_forward'
    | 's'
    | 'u'
    | 'p'
    | 'e'
    | 'r'
    | 'local_atm'
    | 'trophy'
    | 'paid'
    | 'percent_discount'
    | 'fork_spoon'
    | 'history'
    | 'featured_seasonal_and_gifts'
    | 'airplane_ticket'
    | 'family_restroom'
    | 'chair_umbrella'
    | 'co_present'
    | 'flight_takeoff'
    | 'health_and_safety'
    | 'cardiology'
    | 'syringe'
    | 'breastfeeding'
    | 'groups_fill'
    | 'arrow_down_black'
    | 'call'
    | 'letter_consultation'
    | 'back_wave'
    | 'share'
    | 'copy'
    | 'facebook'
    | 'instagram'
    | 'twitter'
    | 'youtube'
    | 'backward'
    | 'pr'
    | 'back_dumb'
    | 'arrowRight'
    | 'investFinance'
    | 'investAtm'
    | 'investNotice'
    | 'arrowUpdown'
    | 'bar'
    | 'back_tree'
    | 'map'
    | 'arrow_round'
    | 'down2'
    | 'paper'
    | 'zoom'
    | 'date'
    | 'diversity1'
    | 'diversity2'
    | 'diversity3'
    | 'close'
    | 'check_circle'
    | 'thin_search'
    | 'cancel_input'
    | 'kakao'
    | 'download02'
    | (string & {});

const ICON_FILE_MAP: Partial<Record<IconName, string>> = {
    arrowDown: 'arrow_down.svg',
    defaultMy: 'defult_my.svg',
    search: 'search.svg',
    language: 'lange.svg',
    arrowOutward: 'arrow_outward.svg',
    arrowMore: 'arrow_more.svg',
    menubar: 'menubar.svg',
    doubleArrow: 'double_arrow.svg',
    arrowTop: 'arrow_top.svg',
    arrowsOutput: 'arrows_output.svg',
    checkbook: 'checkbook.svg',
    corporateFare: 'corporate_fare.svg',
    documentSearch: 'document_search.svg',
    groups: 'groups.svg',
    campaign: 'campaign.svg',
    grading: 'grading.svg',
    partnerExchange: 'partner_exchange.svg',
    quickReferenceAll: 'quick_reference_all.svg',
    fileDown: 'file_down.svg',
    plus: 'plus.svg',
    ethics01: 'ethics_01.svg',
    ethics02: 'ethics_02.svg',
    ethics03: 'ethics_03.svg',
    identity01: 'identity_01.svg',
    identity02: 'identity_02.svg',
    identity03: 'identity_03.svg',
    identity04: 'identity_04.svg',
    volunteer_activism: 'volunteer_activism.svg',
    mode_heat: 'mode_heat.svg',
    cognition_2: 'cognition_2.svg',
    account_box: 'account_box.svg',
    chat: 'chat.svg',
    chevron_forward: 'chevron_forward.svg',
    s: 's.svg',
    u: 'u.svg',
    p: 'p.svg',
    e: 'e.svg',
    r: 'r.svg',
    local_atm: 'local_atm.svg',
    trophy: 'trophy.svg',
    paid: 'paid.svg',
    percent_discount: 'percent_discount.svg',
    fork_spoon: 'fork_spoon.svg',
    history: 'history.svg',
    featured_seasonal_and_gifts: 'featured_seasonal_and_gifts.svg',
    airplane_ticket: 'airplane_ticket.svg',
    family_restroom: 'family_restroom.svg',
    chair_umbrella: 'chair_umbrella.svg',
    co_present: 'co_present.svg',
    flight_takeoff: 'flight_takeoff.svg',
    health_and_safety: 'health_and_safety.svg',
    cardiology: 'cardiology.svg',
    syringe: 'syringe.svg',
    breastfeeding: 'breastfeeding.svg',
    groups_fill: 'groups_fill.svg',
    arrow_down_black: 'keyboard_arrow_down.svg',
    call: 'call.svg',
    letter_consultation: 'mark_as_unread.svg',
    back_wave: 'back_wave.svg',
    share: 'share.svg',
    copy: 'copy.svg',
    facebook: 'facebook.svg',
    instagram: 'instagram.svg',
    twitter: 'twitter.svg',
    youtube: 'youtube.svg',
    backward: 'back_warp.svg',
    pr: 'pr.svg',
    back_dumb: 'back_dumb.svg',
    arrowRight: 'arrow-right.svg',
    investFinance: 'invest-finance.svg',
    investAtm: 'invest-atm.svg',
    investNotice: 'invest-notice.svg',
    arrowUpdown: 'arrow-updown.svg',
    bar: 'bar.svg',
    back_tree: 'back_tree.svg',
    map: 'map.svg',
    arrow_round: 'arrow_round.svg',
    down2: 'down2.svg',
    paper: 'paper.svg',
    zoom: 'zoom.svg',
    date: 'date.svg',
    diversity1: 'diversity1.svg',
    diversity2: 'diversity2.svg',
    diversity3: 'diversity3.svg',
    close: 'close.svg',
    check_circle: 'check_circle.svg',
    thin_search: 'thin_search.svg',
    cancel_input: 'cancel_input.svg',
    kakao: 'kakao.svg',
    download02: 'download_02.svg',
};

function isProbablySafeSvg(svgText: string) {
    return !/<script[\s>]/i.test(svgText);
}

type SvgPayload = {
    viewBox?: string;
    innerHtml: string;
};

const svgCache = new Map<string, SvgPayload>();

function normalizeSvgForCssControl(svgEl: SVGElement) {
    const all = svgEl.querySelectorAll('*');

    all.forEach((el) => {
        const fill = el.getAttribute('fill');
        if (fill && fill !== 'none') el.removeAttribute('fill');

        const stroke = el.getAttribute('stroke');
        if (stroke && stroke !== 'none') el.removeAttribute('stroke');

        const styleAttr = el.getAttribute('style');
        if (styleAttr) {
            const next = styleAttr
                .split(';')
                .map((s) => s.trim())
                .filter(Boolean)
                .filter((rule) => {
                    const key = rule.split(':')[0]?.trim()?.toLowerCase();
                    return key !== 'fill' && key !== 'stroke';
                })
                .join('; ');
            if (next) el.setAttribute('style', next);
            else el.removeAttribute('style');
        }
    });

    ['fill', 'stroke'].forEach((attr) => {
        const v = svgEl.getAttribute(attr);
        if (v && v !== 'none') svgEl.removeAttribute(attr);
    });

    const svgStyle = svgEl.getAttribute('style');
    if (svgStyle) {
        const next = svgStyle
            .split(';')
            .map((s) => s.trim())
            .filter(Boolean)
            .filter((rule) => {
                const key = rule.split(':')[0]?.trim()?.toLowerCase();
                return key !== 'fill' && key !== 'stroke';
            })
            .join('; ');
        if (next) svgEl.setAttribute('style', next);
        else svgEl.removeAttribute('style');
    }
}

function parseSvg(svgText: string, preserveInlineColor: boolean): SvgPayload | null {
    if (typeof window === 'undefined') return null;

    try {
        const parser = new DOMParser();
        const doc = parser.parseFromString(svgText, 'image/svg+xml');
        const svgEl = doc.querySelector('svg');
        if (!svgEl) return null;

        if (!preserveInlineColor) {
            normalizeSvgForCssControl(svgEl);
        }

        svgEl.removeAttribute('width');
        svgEl.removeAttribute('height');

        const viewBox = svgEl.getAttribute('viewBox') ?? undefined;
        const innerHtml = svgEl.innerHTML;

        return {viewBox, innerHtml};
    } catch {
        return null;
    }
}

export interface IconProps
    extends Omit<React.SVGProps<SVGSVGElement>, 'children'> {
    name: IconName;
    size?: number | string;
    color?: string;
    fileName?: string;
    preserveInlineColor?: boolean;
    ariaHidden?: boolean;
}

export const Icon: React.FC<IconProps> = ({
    name,
    size = 24,
    color = 'currentColor',
    fileName,
    preserveInlineColor = true,
    className,
    style,
    ariaHidden = true,
    ...rest
}) => {
    const resolvedFileName = fileName ?? ICON_FILE_MAP[name] ?? `${name}.svg`;
    const url = `/icons/${resolvedFileName}`;

    const [payload, setPayload] = React.useState<SvgPayload | null>(() => svgCache.get(url) ?? null);

    React.useEffect(() => {
        let cancelled = false;

        const load = async () => {
            const cached = svgCache.get(url);
            if (cached) {
                setPayload(cached);
                return;
            }

            try {
                const res = await fetch(url);
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                const text = await res.text();

                if (!isProbablySafeSvg(text)) throw new Error('Unsafe SVG content');

                const parsed = parseSvg(text, preserveInlineColor);
                if (!parsed) throw new Error('Invalid SVG');

                svgCache.set(url, parsed);
                if (!cancelled) setPayload(parsed);
            } catch (e) {
                if (process.env.NODE_ENV !== 'production') {
                    // eslint-disable-next-line no-console
                    console.warn(`[Icon] failed to load: ${url}`, e);
                }
                if (!cancelled) setPayload(null);
            }
        };

        load();
        return () => {
            cancelled = true;
        };
    }, [url, preserveInlineColor]);

    if (!payload) return null;

    return (
        <svg
            width={size}
            // height={size}
            viewBox={payload.viewBox}
            className={clsx(className)}
            fill={color}
            style={{
                color,
                ...style,
            }}
            aria-hidden={ariaHidden}
            focusable="false"
            xmlns="http://www.w3.org/2000/svg"
            dangerouslySetInnerHTML={{__html: payload.innerHtml}}
            {...rest}
        />
    );
};