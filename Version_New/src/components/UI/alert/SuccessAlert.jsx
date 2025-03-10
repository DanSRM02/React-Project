import { FaCheckCircle } from 'react-icons/fa';

export const SuccessAlert = ({ message, className = '', onClose }) => {
    return (
        <div
            className={`p-4 mb-4 bg-green-50 border border-green-200 rounded-lg flex items-center ${className}`}
            role="alert"
        >
            <FaCheckCircle className="flex-shrink-0 w-5 h-5 text-green-600" />
            <div className="ml-3 text-sm font-medium text-green-800">
                {message}
            </div>
            {onClose && (
                <button
                    onClick={onClose}
                    className="ml-auto -mx-1.5 -my-1.5 bg-green-50 text-green-500 rounded-lg focus:ring-2 focus:ring-green-400 p-1.5 hover:bg-green-200 transition-colors"
                    aria-label="Cerrar"
                >
                    <span className="sr-only">Cerrar</span>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                </button>
            )}
        </div>
    );
};