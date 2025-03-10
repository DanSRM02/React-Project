import React from "react";
import { DetailItem } from "../datatable/DetailItem";

export const ProductCard = ({ item }) => (
    <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
        <div className="flex justify-between items-start">
            <div>
                <h4 className="font-medium text-gray-800 text-lg">
                    {item.product_name || "Producto sin nombre"}
                </h4>
                <div className="mt-2 grid grid-cols-2 gap-4 text-sm">
                    <DetailItem
                        label="Cantidad"
                        value={item.quantity_ordered}
                        className="text-gray-600"
                    />
                    <DetailItem
                        label="Precio unitario"
                        value={`$${(item.variant_price || 0).toLocaleString('es-ES', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                        })}`}
                    />
                    {item.unit && (
                        <DetailItem
                            label="Unidad de medida"
                            value={`${item.unit.acronym} (${item.unit.unit_type})`}
                        />
                    )}
                </div>
            </div>
        </div>
    </div>
);
