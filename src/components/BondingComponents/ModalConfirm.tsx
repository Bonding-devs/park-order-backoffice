import React, { useEffect, useRef, useState } from 'react';

interface ModalConfirmProps {
    onDeactivate: () => void;
}

const ModalConfirm: React.FC<ModalConfirmProps> = ({ onDeactivate }) => {
    const [modalOpen, setModalOpen] = useState(false);

    const trigger = useRef<any>(null);
    const modal = useRef<any>(null);

    // close on click outside
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

    // close if the esc key is pressed
    useEffect(() => {
        const keyHandler = ({ keyCode }: KeyboardEvent) => {
            if (!modalOpen || keyCode !== 27) return;
            setModalOpen(false);
        };
        document.addEventListener('keydown', keyHandler);
        return () => document.removeEventListener('keydown', keyHandler);
    });

    return (
        <div>
            <button className="flex items-center gap-3.5 px-6 py-4 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
                onClick={() => setModalOpen(!modalOpen)}>
                <svg
                    className="fill-current"
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M15.5375 0.618744H11.6531C10.7594 0.618744 10.0031 1.37499 10.0031 2.26874V4.64062C10.0031 5.05312 10.3469 5.39687 10.7594 5.39687C11.1719 5.39687 11.55 5.05312 11.55 4.64062V2.23437C11.55 2.16562 11.5844 2.13124 11.6531 2.13124H15.5375C16.3625 2.13124 17.0156 2.78437 17.0156 3.60937V18.3562C17.0156 19.1812 16.3625 19.8344 15.5375 19.8344H11.6531C11.5844 19.8344 11.55 19.8 11.55 19.7312V17.3594C11.55 16.9469 11.2062 16.6031 10.7594 16.6031C10.3125 16.6031 10.0031 16.9469 10.0031 17.3594V19.7312C10.0031 20.625 10.7594 21.3812 11.6531 21.3812H15.5375C17.2219 21.3812 18.5625 20.0062 18.5625 18.3562V3.64374C18.5625 1.95937 17.1875 0.618744 15.5375 0.618744Z"
                        fill=""
                    />
                    <path
                        d="M6.05001 11.7563H12.2031C12.6156 11.7563 12.9594 11.4125 12.9594 11C12.9594 10.5875 12.6156 10.2438 12.2031 10.2438H6.08439L8.21564 8.07813C8.52501 7.76875 8.52501 7.2875 8.21564 6.97812C7.90626 6.66875 7.42501 6.66875 7.11564 6.97812L3.67814 10.4844C3.36876 10.7938 3.36876 11.275 3.67814 11.5844L7.11564 15.0906C7.25314 15.2281 7.45939 15.3312 7.66564 15.3312C7.87189 15.3312 8.04376 15.2625 8.21564 15.125C8.52501 14.8156 8.52501 14.3344 8.21564 14.025L6.05001 11.7563Z"
                        fill=""
                    />
                </svg>
                Log Out
            </button>
            <div
                className={`fixed left-0 top-0 z-999999 flex h-full min-h-screen w-full items-center justify-center bg-black/90 px-4 py-5 ${modalOpen ? 'block' : 'hidden'
                    }`}
            >
                <div
                    // ref={modal}
                    onFocus={() => setModalOpen(true)}
                    onBlur={() => setModalOpen(false)}
                    className="md:px-17.5 w-full max-w-142.5 rounded-lg bg-white px-8 py-12 text-center dark:bg-boxdark md:py-15"
                >
                    <span className="mx-auto inline-block">
                        <svg
                            width="60"
                            height="60"
                            viewBox="0 0 60 60"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <rect
                                opacity="0.1"
                                width="60"
                                height="60"
                                rx="30"
                                fill="#DC2626"
                            />
                            <path
                                d="M30 27.2498V29.9998V27.2498ZM30 35.4999H30.0134H30ZM20.6914 41H39.3086C41.3778 41 42.6704 38.7078 41.6358 36.8749L32.3272 20.3747C31.2926 18.5418 28.7074 18.5418 27.6728 20.3747L18.3642 36.8749C17.3296 38.7078 18.6222 41 20.6914 41Z"
                                stroke="#DC2626"
                                strokeWidth="2.2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </span>
                    <h3 className="mt-5.5 pb-2 text-xl font-bold text-black dark:text-white sm:text-2xl">
                        Log Out of Your Account
                    </h3>
                    <p className="mb-10">
                        Are you sure you want to log out? Any unsaved changes will be lost.
                    </p>
                    <div className="-mx-3 flex flex-wrap gap-y-4">
                        <div className="2xsm:w-1/2 w-full px-3">
                            <button
                                onClick={() => setModalOpen(false)}
                                className="block w-full rounded border border-stroke bg-gray p-3 text-center font-medium text-black transition hover:border-meta-1 hover:bg-meta-1 hover:text-white dark:border-strokedark dark:bg-meta-4 dark:text-white dark:hover:border-meta-1 dark:hover:bg-meta-1"
                            >
                                Cancel
                            </button>
                        </div>
                        <div className="2xsm:w-1/2 w-full px-3">
                            <button
                                onClick={onDeactivate}
                                className="block w-full rounded border border-meta-1 bg-meta-1 p-3 text-center font-medium text-white transition hover:bg-opacity-90"
                            >
                                Log Out
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalConfirm;
