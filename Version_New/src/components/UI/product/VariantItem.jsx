import React from "react";
import { StockBadge } from "../bagde/StockBagde";
import { PriceBadge } from "../bagde/PriceBagde";
import { QuantityControls } from "./QuantityControls";
import { SelectButton } from "../form/SelectButton";

export const VariantItem = ({ variant, isSelected, quantity, onSelect, onQuantityChange }) => (
    <div className={`border p-4 rounded-lg transition-colors ${isSelected ? "border-green-300 bg-green-50" : "hover:border-green-100"
        }`}>
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
            <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                    <span className="font-medium text-gray-800">
                        {variant.unit.acronym}
                    </span>
                    <span className="text-sm text-gray-500">
                        ({variant.unit.unit_type})
                    </span>
                </div>
                <div className="flex flex-wrap gap-3 text-sm">
                    <StockBadge stock={variant.quantity} />
                    <PriceBadge price={variant.price} />
                </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
                {isSelected ? (
                    <QuantityControls
                        variantId={variant.id}
                        quantity={quantity}
                        maxStock={variant.quantity}
                        onQuantityChange={onQuantityChange}
                        onDeselect={() => onSelect(variant.id)}
                    />
                ) : (
                    <SelectButton
                        onClick={() => onSelect(variant.id)}
                        disabled={variant.quantity <= 0}
                    />
                )}
            </div>
        </div>
    </div>
);