// src/components/organisms/modal/Dialog.tsx

import React, { ReactNode, useEffect, useState, Fragment } from 'react';
import { createRoot, Root } from 'react-dom/client';
import styles from './Modal.module.css';

export interface DialogProps {
  children: ReactNode;
  okText?: string;
  cancelText?: string;
  onOk?: () => void;
  onCancel?: () => void;
  className?: string;
  open?: boolean;
  hideFooter?: boolean;
}

export const Dialog: React.FC<DialogProps> = ({
  children,
  okText = '확인',
  cancelText,
  onOk,
  onCancel,
  className,
  open,
  hideFooter = false,
}) => {
  const [internalVisible, setInternalVisible] = useState(false);
  const [visible, setVisible] = useState(false);

  const isControlled = open !== undefined;

  /* ===============================
     마운트 시 애니메이션 처리
  =============================== */
  useEffect(() => {
    if (!isControlled) {
      requestAnimationFrame(() => {
        setInternalVisible(true);
        setVisible(true);
      });
    }
  }, [isControlled]);

  /* ===============================
     외부 open 제어 처리
  =============================== */
  useEffect(() => {
    if (!isControlled) return;

    if (open) {
      setInternalVisible(true);
      setTimeout(() => setVisible(true), 10);
    } else {
      setVisible(false);
      setTimeout(() => setInternalVisible(false), 200);
    }
  }, [open, isControlled]);

  const close = (callback?: () => void) => {
    setVisible(false);
    setTimeout(() => {
      callback?.();
    }, 200);
  };

  const handleBackdropClick = () => close(onCancel);
  const stop = (e: React.MouseEvent) => e.stopPropagation();

  if (!internalVisible) return null;

  return (
      <div
          className={`${styles.backdrop} ${visible ? styles.visible : ''}`}
          onClick={handleBackdropClick}
      >
        <div
            className={`${styles.container} ${visible ? styles.visible : ''} ${className ?? ''}`}
            onClick={stop}
        >
          <div className={styles.contentTemplate}>
            {children}
          </div>

          {!hideFooter && (
              <div className={styles.footer}>
                {cancelText && (
                    <button
                        type="button"
                        className="w-full max-w-[230px] bg-[#D9D9D9] text-black py-3 lg:py-4 px-6 lg:px-8 text-[14px] lg:text-[18px] rounded-full hover:bg-[#C0C0C0] transition-colors"
                        onClick={() => close(onCancel)}
                    >
                      {cancelText}
                    </button>
                )}

                <button
                    type="button"
                    className="w-full max-w-[230px] bg-[#ED1B29] text-white py-3 lg:py-4 px-6 lg:px-8 text-[14px] lg:text-[18px] rounded-full hover:bg-[#DC1A27] transition-colors"
                    onClick={() => close(onOk)}
                >
                  {okText}
                </button>
              </div>
          )}
        </div>
      </div>
  );
};

/* =====================================================
   스크립트에서 호출 가능한 modal 유틸
===================================================== */

function createDialogContainer() {
  const div = document.createElement('div');
  document.body.appendChild(div);
  return { div, root: createRoot(div) };
}

function destroy(div: HTMLDivElement, root: Root) {
  root.unmount();
  div.remove();
}

export const Modal = {
  alert(message: string, okText?: string) {
    const { div, root } = createDialogContainer();

    return new Promise<void>((resolve) => {
      root.render(
          <Dialog
              okText={okText}
              onOk={() => {
                resolve();
                destroy(div, root);
              }}
          >
            {message.split('\n').map((line, i, arr) => (
                <Fragment key={i}>
                  {line}
                  {i < arr.length - 1 && <br />}
                </Fragment>
            ))}
          </Dialog>
      );
    });
  },

  confirm(
      content: React.ReactNode,
      okText?: string,
      cancelText?: string
  ) {
    const { div, root } = createDialogContainer();

    return new Promise<boolean>((resolve) => {
      root.render(
          <Dialog
              okText={okText}
              cancelText={cancelText}
              onOk={() => {
                resolve(true);
                destroy(div, root);
              }}
              onCancel={() => {
                resolve(false);
                destroy(div, root);
              }}
          >
            {content}
          </Dialog>
      );
    });
  },
};
