import { ReactNode, useEffect, useRef } from 'react';

interface PreviewModalProps {
  title?: string;
  setModalOpen: (value: boolean) => void;
  modalOpen: boolean;
  children: ReactNode;
}

export const PreviewModal: React.FC<PreviewModalProps> = ({
  modalOpen,
  setModalOpen,
  title,
  children,
}) => {
  const trigger = useRef<any>(null);
  const modal = useRef<any>(null);

  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!modal.current) return;
      if (
        !modalOpen ||
        modal.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setModalOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!modalOpen || keyCode !== 27) return;
      setModalOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  return (
    <div ref={modal}>
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-75">
        <div className="rounded-lg bg-white p-6 shadow-lg">
          <div className="mb-4 flex items-center justify-between">
            {title ? <h2 className="text-lg font-semibold">{title}</h2> : <></>}
            <button
              onClick={() => {
                console.log(false);
                setModalOpen(false);
              }}
              className="text-gray-600 hover:text-gray-800"
            >
              X
            </button>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};
