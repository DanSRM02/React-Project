import React from "react";
export const StockBadge = ({ stock }) => (
    <div className={`px-2 py-1 rounded ${
        stock > 10 ? "bg-sky-100 text-sky-800" : "bg-amber-100 text-amber-800"
    }`}>
        Stock: {stock}
    </div>
);
