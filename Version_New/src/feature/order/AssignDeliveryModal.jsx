import React from "react";
import { DeliveryCard } from "../../components/UI/DeliveryCard";

export const AssignDeliveryModal = ({ isOpen, order, deliveries, onAssign, onClose }) => {
    if (!isOpen || !order) return null;

    return (
        <div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50"
            onClick={onClose} // Cerrar al hacer clic fuera
        >
            <div
                className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-lg transform transition-all"
                onClick={(e) => e.stopPropagation()} // Prevenir cierre al hacer clic dentro
            >
                <h3 className="text-xl font-bold mb-4">Asignar orden #{order.id}</h3>

                <div className="space-y-3 max-h-96 overflow-y-auto">
                    {deliveries.map(delivery => (
                        <DeliveryCard
                            key={delivery.id}
                            delivery={delivery}
                            onSelect={() => {
                                onAssign(order.id, delivery.id);
                                onClose(); 
                            }}
                        />
                    ))}
                </div>

                <div className="mt-4 flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                    >
                        Cancelar
                    </button>
                </div>
            </div>
        </div>
    );
}