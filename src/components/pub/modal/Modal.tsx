import React, { Fragment, useEffect, useState } from 'react';
import { createRoot, Root } from 'react-dom/client';
import styles from './Modal.module.css';

type ResolveFn = (value?: any) => void;

function parseMessage(message: string): React.ReactNode {
  return message.split(/\r?\n/).map((line, i, arr) => (
      <Fragment key={i}>
        {line}
        {i < arr.length - 1 && <br />}
      </Fragment>
  ));
}

interface ModalOptions {
  title?: string;
  message: string;
  okText?: string;
  cancelText?: string;
}

function createModalContainer(): { container: HTMLDivElement; root: Root } {
  const container = document.createElement('div');
  document.body.appendChild(container);
  const root = createRoot(container);
  return { container, root };
}

function destroy(container: HTMLDivElement, root: Root) {
  root.unmount();
  container.remove();
}

function ModalComponent({
  opts,
  resolve,
}: {
  opts: ModalOptions;
  resolve: ResolveFn;
}) {
  const { title, message, okText, cancelText } = opts;
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
  }, []);

  const handleClose = (val?: any) => {
    setVisible(false);
    setTimeout(() => resolve(val), 200);
  };

  return (
      <div
          className={`${styles.backdrop} ${visible ? styles.visible : ''}`}
          onClick={() => handleClose(cancelText ? false : undefined)}
      >
        <div
            className={`${styles.container} ${visible ? styles.visible : ''}`}
            onClick={(e) => e.stopPropagation()}
        >
          <div className={styles.content}>
            {title && (
                <div className="mb-4 text-lg font-bold text-gray-900">
                  {title}
                </div>
            )}
            <p className="text-[22px]">
              {parseMessage(message)}
            </p>
          </div>

          <div className={styles.footer}>
            {cancelText && (
                <button
                    type="button"
                    className="w-full max-w-[230px] bg-[#D9D9D9] text-black py-3 lg:py-4 px-6 lg:px-8 text-[14px] lg:text-[18px] rounded-full"
                    onClick={() => handleClose(false)}
                >
                  {cancelText}
                </button>
            )}
            <button
                type="button"
                className="w-full max-w-[230px] bg-[#ED1B29] text-white py-3 lg:py-4 px-6 lg:px-8 text-[14px] lg:text-[18px] rounded-full"
                onClick={() => handleClose(cancelText ? true : undefined)}
            >
              {okText || '확인'}
            </button>
          </div>
        </div>
      </div>
  );
}

export const Modal = {
  alert(props: { title?: string; message: string; okText?: string }) {
    const { container, root } = createModalContainer();
    return new Promise<void>((resolve) => {
      root.render(
          <ModalComponent
              opts={{
                title: props.title,
                message: props.message,
                okText: props.okText || '확인',
              }}
              resolve={() => {
                resolve();
                destroy(container, root);
              }}
          />
      );
    });
  },

  confirm(props: {
    title?: string;
    message: string;
    okText?: string;
    cancelText?: string;
  }) {
    const { container, root } = createModalContainer();
    return new Promise<boolean>((resolve) => {
      root.render(
        <ModalComponent
          opts={{
            title: props.title,
            message: props.message,
            okText: props.okText || '확인',
            cancelText: props.cancelText || '취소',
          }}
          resolve={(val) => {
            resolve(Boolean(val));
            destroy(container, root);
          }}
        />
      );
    });
  },
};
