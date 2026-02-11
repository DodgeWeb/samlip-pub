export interface MenuSubItem {
    name: string;
    path: string;
}

export interface MenuItem {
    name: string;
    path?: string;
    subItems?: MenuSubItem[];
}

export interface HeaderIcon {
    name: string;
    size?: number;
    color?: string;
    onClick?: () => void;
}

export interface HeaderProps {
    menuItems?: MenuItem[];
    rightIcons?: HeaderIcon[];
    mobileIcons?: HeaderIcon[];
}
