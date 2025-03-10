import React from "react";

const Input = ({
    type = "text",
    placeholder,
    leftIcon,
    value,
    onChange,
    label,
    onBlur, // Destructuramos onBlur para asegurarnos de que se pase correctamente
    showIcon = true,
    required = false,
    className = "",
    ...props
}) => {
    return (
        <div className={`relative ${className}`}>
            {label && (
                <label className="block mb-2 text-sm font-medium text-gray-700">
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                onBlur={onBlur} // Lo pasamos al input
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                {...props}
            />
            {leftIcon && <span className="input-icon"></span>}
            {showIcon && (
                <svg
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
            )}
        </div>
    );
};

export default Input;