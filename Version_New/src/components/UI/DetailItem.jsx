import React from "react";

export const DetailItem = ({ label, value, className }) => (
    <div>
        <dt className="text-sm text-gray-500 mb-1">{label}</dt>
        <dd className={`text-gray-800 ${className || ""}`}>{value}</dd>
    </div>
);