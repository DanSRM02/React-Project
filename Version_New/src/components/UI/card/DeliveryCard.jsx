import React from "react";

export const DeliveryCard = ({ delivery, onSelect }) => (
    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
        <div>
            <p className="font-medium">{delivery.name}</p>
            <p className="text-sm text-gray-500">{delivery.phone}</p>
        </div>
        <button
            onClick={onSelect}
            className="btn-primary-sm"
        >
            Seleccionar
        </button>
    </div>
);