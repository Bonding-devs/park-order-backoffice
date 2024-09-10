import React from 'react';
interface ErrorMessageProps {
    message: String;
    retry?: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, retry }) => {
    return <div className="flex items-center justify-center p-6">
        <div className="text-center">
            <p className="text-red-500 mb-6">{message}</p>
            {retry && <button
                onClick={retry}
                className="inline-flex items-center justify-center bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
            >
                Retry
            </button>}
        </div>
    </div>
}

export default ErrorMessage;