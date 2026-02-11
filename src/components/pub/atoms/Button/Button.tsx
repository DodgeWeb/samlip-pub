// src/components/atoms/Button/Button.tsx
import React from 'react';
import clsx from 'clsx';

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    size?: 'small' | 'default' | 'large';
    intent?: 'primary' | 'secondary' | 'danger';
    outline?: boolean;
    text?: boolean;
    rounded?: 'none' | 'full';
}

const sizeStyles = {
    small: 'px-2 py-1 text-sm rounded-md',
    default: 'px-3 py-[8.5px] text-[15px] leading-[15px] rounded-[10px]',
    large: 'px-6 py-4 text-xl rounded-xl',
};

const intentStyles = {
    primary: 'bg-[var(--btn-primary-bg-color)] text-[var(--btn-primary-text-color)] hover:bg-[var(--primary-600)]',
    secondary: 'bg-[var(--btn-secondary-bg-color)] text-[var(--btn-secondary-text-color)]',
    danger: 'bg-[var(--btn-error-bg-color)] text-[var(--btn-error-text-color)] hover:bg-[var(--red-600)]',
};

const outlineStyles = {
    primary:
        'border border-[var(--btn-primary-outline-border-color)] bg-[var(--btn-primary-outline-bg-color)] text-[var(--btn-primary-outline-text-color)] hover:bg-[var(--primary-100)]',
    secondary:
        'border border-[var(--btn-secondary-outline-border-color)] text-[var(--btn-secondary-outline-text-color)] hover:bg-[var(--gray-100)]',
    danger:
        'border border-[var(--btn-error-border-color)] text-[var(--btn-error-outline-text-color)] hover:bg-[var(--red-100)]',
};

const textStyles = {
    primary: 'bg-transparent text-[var(--primary-500)] hover:bg-[var(--primary-50)]',
    secondary: 'bg-transparent text-[var(--btn-secondary-text-text-color)] hover:bg-[var(--gray-100)]',
    danger: 'bg-transparent text-[var(--red-500)] hover:bg-[var(--red-100)]',
};

export const Button: React.FC<ButtonProps> = ({
    size = 'default',
    intent = 'primary',
    outline = false,
    text = false,
    rounded = 'none',
    className,
    disabled,
    children,
    ...rest
}) => {
    return (
        <button
            disabled={disabled}
            className={clsx(
                'inline-flex items-center justify-center transition-colors cursor-pointer',
                'disabled:opacity-60 disabled:cursor-not-allowed',

                sizeStyles[size],

                !outline && !text && intentStyles[intent],
                outline && outlineStyles[intent],
                text && textStyles[intent],

                rounded === 'full' && 'rounded-full',
                rounded === 'none' && 'rounded-none',

                className
            )}
            {...rest}
        >
            {children}
        </button>
    );
};

export default Button;
