import React from 'react';
import {Icon} from '@/components/pub/icons';

export type FileStatus = 'uploading' | 'done' | 'removable';

export type UploadFile = {
    id: string;
    file: File;
    name: string;
    size: number;
    progress: number;
    status: FileStatus;
};

// 첨부파일 섹션 컴포넌트
interface FileUploadSectionProps {
    fileInputRef: React.RefObject<HTMLInputElement>;
    uploadFiles: UploadFile[];
    fileError: string;
    handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleRemoveFile: (id: string) => void;
}

const FileUploadSection: React.FC<FileUploadSectionProps> = ({
    fileInputRef,
    uploadFiles,
    fileError,
    handleFileChange,
    handleRemoveFile,
}) => {
    // 프로그레스 바 설정
    const radius = 10;
    const circumference = 2 * Math.PI * radius;
    return (
        <div className='flex flex-col gap-2 lg:gap-3'>
            <div className='flex flex-col gap-2 justify-between lg:gap-4'>
                <label
                    className='text-[16px] lg:text-[26px] font-semibold leading-[1.4] tracking-[-0.005em] text-black'>첨부파일</label>
                <div className='flex relative flex-col gap-4 p-9 w-full bg-grayBack'>
                    <p className='text-black text-sm lg:text-[22px] text-center leading-[1.7] tracking-[-0.005em]'>30MB
                        이하의 png, jpg 파일을 업로드 해주세요.</p>
                    <input
                        ref={fileInputRef}
                        id="fileInput"
                        name='fileInput'
                        type='file'
                        accept="image/png, image/jpeg"
                        multiple
                        hidden
                        onChange={handleFileChange}
                    />
                    <button
                        className='py-2 px-5 lg:py-3 lg:px-10 bg-grilledMeats text-white text-[14px] lg:text-[22px] leading-[1.6] tracking-[-0.01em] lg:w-[200px] flex items-center justify-center gap-1 lg:gap-2 rounded-full max-w-fit mx-auto'
                        onClick={() => fileInputRef.current?.click()}
                        type="button"
                    >
                        <span>파일 선택</span>
                        <Icon name="plus" className="w-6 h-6 *:fill-white"/>
                    </button>
                    {fileError && <p className='text-sm text-center text-samlipRed'>{fileError}</p>}
                </div>
            </div>
            <section className='flex flex-col gap-2'>
                <div className='flex flex-col gap-2 lg:gap-3'>
                    {uploadFiles.map((file) => (
                        <div key={file.id}
                             className='flex items-center gap-4 px-[18px] lg:py-4 py-3 flex-1 border border-line2'>
                            <span
                                className='text-[14px] lg:!text-[22px] leading-[1.6] tracking-[-0.01em] text-black desktop-body1 flex-1'>
                                {file.name}
                            </span>

                            {file.status === 'removable' && (
                                <button
                                    className='flex-shrink-0 w-6 h-6 lg:w-[30px] lg:h-[30px] rounded-full bg-grayTxt flex items-center justify-center'
                                    onClick={() => handleRemoveFile(file.id)}
                                    type='button'
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-full h-full p-[3px] *:stroke-white"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>
                            )}

                            {file.status === 'done' && (
                                <button
                                    className='flex-shrink-0 w-6 h-6 lg:w-[30px] lg:h-[30px] rounded-full flex items-center justify-center'
                                    type='button'>
                                    <svg className="w-full h-full" viewBox="0 0 24 24">
                                        <circle cx="12" cy="12" r="12" fill="#F40202"/>
                                        <path
                                            d="M7 12.5 L10 15.5 L17 8.5"
                                            fill="none"
                                            stroke="#FFFFFF"
                                            strokeWidth="2.2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </button>
                            )}

                            {file.status === 'uploading' && (
                                <div
                                    className="flex-shrink-0 w-6 h-6 lg:w-[30px] lg:h-[30px] rounded-full flex items-center justify-center">
                                    <svg className="w-full h-full" viewBox="0 0 24 24">
                                        <circle
                                            cx="12"
                                            cy="12"
                                            stroke="#D9D9D9"
                                            strokeWidth="3"
                                            fill="none"
                                        />
                                        <circle
                                            cx="12"
                                            cy="12"
                                            stroke="#F40202"
                                            strokeWidth="3"
                                            fill="none"
                                            strokeLinecap="round"
                                            strokeDasharray={circumference}
                                            strokeDashoffset={(1 - file.progress / 100) * circumference}
                                            transform="rotate(-90 12 12)"
                                        />
                                    </svg>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default FileUploadSection;
