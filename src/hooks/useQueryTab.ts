import {useState, useEffect, useMemo} from 'react';
import {useRouter} from 'next/router';

interface UseQueryTabOptions {
    queryParamKey?: string;
    useIndexAsValue?: boolean;
    defaultIndex?: number;
    clearParamsOnChange?: string[];
}

export function useQueryTab<T extends string | { label: string }>(
    items: T[],
    options: UseQueryTabOptions = {}
): [number, (index: number) => void] {
    const {
        queryParamKey = 'tab',
        useIndexAsValue = true,
        defaultIndex = 0,
        clearParamsOnChange = [],
    } = options;

    const router = useRouter();
    const {query, pathname} = router;

    const getLabel = (item: T): string =>
        typeof item === 'string' ? item : item.label;

    const activeIndexFromQuery = useMemo(() => {
        const value = query[queryParamKey];
        if (!value || Array.isArray(value)) return defaultIndex;

        if (useIndexAsValue) {
            const index = parseInt(value, 10);
            return isNaN(index)
                ? defaultIndex
                : Math.max(0, Math.min(index, items.length - 1));
        }

        const index = items.findIndex(item => getLabel(item) === value);
        return index >= 0 ? index : defaultIndex;
    }, [query, queryParamKey, useIndexAsValue, items, defaultIndex]);

    const [activeIndex, setActiveIndexState] = useState(activeIndexFromQuery);

    useEffect(() => {
        setActiveIndexState(activeIndexFromQuery);
    }, [activeIndexFromQuery]);

    const setActiveIndex = (index: number) => {
        if (index < 0 || index >= items.length) return;

        const nextQuery = {...query};

        if (index !== activeIndexFromQuery) {
            clearParamsOnChange.forEach(key => {
                delete nextQuery[key];
            });
        }

        nextQuery[queryParamKey] = useIndexAsValue
            ? String(index)
            : getLabel(items[index]);

        router.replace(
            {pathname, query: nextQuery},
            undefined,
            {shallow: true}
        );

        setActiveIndexState(index);
    };

    return [activeIndex, setActiveIndex];
}
