export interface TabItem {
    label: string;
    path?: string;
    isActive?: boolean;
}

export interface TabProps {
    items: (string | TabItem)[];
    activeIndex?: number;
    onTabClick?: (index: number, item: TabItem) => void;
    className?: string;
    headerType?: 'default' | 'brand' | 'invest' | 'sustainability' | 'custom';
    buttonClassName?: string;
    activeButtonClassName?: string;
    inactiveButtonClassName?: string;
    queryParamKey?: string;
    useIndexAsValue?: boolean;
    clearParamsOnChange?: string[];
    disableQuerySync?: boolean;
    stickyTopOverride?: number;
    topTransitionDuration?: number;
}
