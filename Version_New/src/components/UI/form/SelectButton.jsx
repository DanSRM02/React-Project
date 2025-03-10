import React from "react";
export const SelectButton = ({ onClick, disabled }) => (
    <button
        onClick={onClick}
        disabled={disabled}
        className={`px-3 py-1.5 rounded-md text-sm transition-colors ${disabled
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-green-100 text-green-800 hover:bg-green-200"
            }`}
    >
        Seleccionar
    </button>
);
