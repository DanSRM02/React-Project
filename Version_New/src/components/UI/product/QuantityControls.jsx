import React from "react";
import { FaTimes } from "react-icons/fa";

export const QuantityControls = ({ variantId, quantity, maxStock, onQuantityChange, onDeselect }) => (
    <div className="flex items-center gap-2">
        <input
            type="number"
            min="1"
            max={maxStock}
            value={quantity}
            onChange={(e) => onQuantityChange(variantId, e.target.value, maxStock)}
            className="w-20 border border-green-200 rounded-lg px-2 py-1 text-center text-sm focus:ring-2 focus:ring-green-500"
            aria-label="Cantidad"
        />
        <button
            onClick={onDeselect}
            className="text-red-500 hover:text-red-700 transition-colors"
            aria-label="Quitar producto"
        >
            <FaTimes className="w-4 h-4" />
        </button>
    </div>
);