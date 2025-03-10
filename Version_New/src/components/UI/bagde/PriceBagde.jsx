import React from "react";
export const PriceBadge = ({ price }) => (
    <div className="bg-emerald-100 px-2 py-1 rounded text-emerald-800">
        ${price.toLocaleString()}
    </div>
);