import React from 'react';

export const InfoAlert = ({ message, title, actionText, onAction, className = "" }) => {
    return (
        <div className={`bg-blue-50 border-l-4 border-blue-500 p-4 rounded ${className}`}>
            <div className="flex items-start">
                <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
                    </svg>
                </div>
                <div className="ml-3 w-full">
                    <div className="flex justify-between items-center">
                        <h3 className="text-sm font-medium text-blue-800">
                            {title || "Información importante"}
                        </h3>
                        {actionText && onAction && (
                            <button
                                onClick={onAction}
                                className="ml-auto bg-blue-100 hover:bg-blue-200 text-blue-800 text-xs font-medium px-3 py-1 rounded transition-colors"
                            >
                                {actionText}
                            </button>
                        )}
                    </div>
                    <div className="mt-2 text-sm text-blue-700">
                        <p>{message}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};