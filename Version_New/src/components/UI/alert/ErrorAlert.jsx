import React from "react";
export const ErrorAlert = ({ message }) => (
    <div className="bg-red-50 p-4 rounded-lg max-w-md mx-auto text-center">
        <p className="text-red-600 font-medium">Error:</p>
        <p className="text-red-500 text-sm mt-1">{message}</p>
    </div>
);