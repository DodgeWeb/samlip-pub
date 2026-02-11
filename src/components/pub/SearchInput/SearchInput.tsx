import React from 'react';
import styles from './SearchInput.module.scss';
import {Icon} from '@/components/pub/icons';

interface SearchInputProps {
    searchQuery: string;
    displayQuery?: string;
    onSearchQueryChange: (value: string) => void;
    onSearch: () => void;
    onClear: () => void;
    resultCount: number;
    showResultCount?: boolean;
    onClose?: () => void;
}

export const SearchInput: React.FC<SearchInputProps> = ({
    searchQuery,
    displayQuery,
    onSearchQueryChange,
    onSearch,
    onClear,
    resultCount,
    showResultCount = true,
    onClose,
}) => {
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') onSearch();
    };

    return (
        <div className={styles['search-title-wrapper']}>
            <div className="flex relative justify-center items-center w-full">
                {onClose && showResultCount === false && (
                    <button
                        className="hidden absolute right-[-110px] justify-center items-center w-8 h-8 lg:flex"
                        onClick={onClose}
                        aria-label="닫기"
                    >
                        <Icon name="close" className="size-[32px] *:*:fill-grilledMeats"/>
                    </button>
                )}
            </div>

            <h2 className={styles['search-title']}>통합검색</h2>

            <div className={styles['search-input-wrapper']}>
                <div className={styles['search-input-container']}>
                    <input
                        type="text"
                        className={styles['search-input']}
                        value={searchQuery}
                        onChange={(e) => onSearchQueryChange(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="검색어를 입력하세요"
                    />

                    {searchQuery && (
                        <button
                            className={styles['search-cancel-btn']}
                            onClick={onClear}
                            aria-label="검색어 삭제"
                        >
                            <Icon name="cancel_input" className="size-[14px] lg:!size-[32px]"/>
                        </button>
                    )}

                    <button
                        className={styles['search-submit-btn']}
                        onClick={onSearch}
                        aria-label="검색"
                    >
                        <Icon name="thin_search" className="!size-[16px] lg:!size-[32px] *:fill-none"/>
                    </button>
                </div>

                {showResultCount && (
                    <div className={styles['search-result-count']}>
                        <span className={styles['result-query']}>
                            '{displayQuery ?? searchQuery}'
                        </span>
                        <span className={styles['result-text']}>에 대한 검색결과가</span>
                        <span className={styles['result-count']}>{resultCount}건</span>
                        <span className={styles['result-text']}>있습니다.</span>
                    </div>
                )}
            </div>
        </div>
    );
};
