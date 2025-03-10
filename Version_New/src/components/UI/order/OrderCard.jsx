import React from "react";
import { DeliveryAssignment } from "./DeliveryAssignment";
import { COMMON_STATES, DELIVERY_STATES, STATE_COLORS, VENDOR_STATES } from "../../../utils/constans/states";

export const OrderCard = ({
    order,
    showAssignment,
    domiciliarios,
    selectedDomiciliario,
    onSelectDomiciliario,
    onStatusChange,
    onAssign,
    isLoading
}) => {
    const getStateLabel = () => {
        const allStates = { ...VENDOR_STATES, ...DELIVERY_STATES, ...COMMON_STATES };
        return allStates[order.order_state] || order.order_state;
    };    

    // Comparación sin importar mayúsculas/minúsculas
    const isPending = order.order_state &&
        (order.order_state === VENDOR_STATES.PENDING ||
            order.order_state.toUpperCase() === "PENDING");

    return (
        <div className="bg-white rounded-lg shadow-md p-4">
            <div className="mb-3">
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="font-medium text-gray-800">Orden #{order.id}</h3>
                        <p className="text-sm text-gray-600">{order.individual_name}</p>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${STATE_COLORS[order.order_state] || "bg-gray-100"}`}>
                        {getStateLabel()}
                    </span>
                </div>
            </div>
            <div className="space-y-2 mb-3">
                <div className="flex items-start">                    
                    <p className="text-sm text-gray-700">{order.address}</p>
                </div>
                <div className="flex items-center">                    
                    <p className="text-sm font-medium">${order.total.toLocaleString()}</p>
                </div>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">                
                {isPending && (
                    <>
                        <button
                            onClick={() => onStatusChange(order.id, "APPROVED")}
                            disabled={isLoading}
                            className={`px-3 py-1 rounded-full text-sm transition-colors ${isLoading
                                ? "bg-blue-300 text-white cursor-not-allowed"
                                : "bg-blue-100 text-blue-800 hover:bg-blue-200"
                                }`}
                        >
                            {isLoading ? "Procesando..." : "Aprobar"}
                        </button>
                        <button
                            onClick={() => onStatusChange(order.id, "CANCELLED")}
                            disabled={isLoading}
                            className={`px-3 py-1 rounded-full text-sm transition-colors ${isLoading
                                ? "bg-red-300 text-white cursor-not-allowed"
                                : "bg-red-100 text-red-800 hover:bg-red-200"
                                }`}
                        >
                            {isLoading ? "Procesando..." : "Cancelar"}
                        </button>
                    </>
                )}
                {showAssignment && !order.delivery_person && (
                    <DeliveryAssignment
                        order={order}
                        domiciliarios={domiciliarios}
                        selectedDomiciliario={selectedDomiciliario}
                        onSelectDomiciliario={onSelectDomiciliario}
                        onAssign={onAssign}
                        isLoading={isLoading}
                    />
                )}
                {order.delivery_person && (
                    <div className="w-full mt-2 text-sm bg-green-50 p-2 rounded-md text-green-700">
                        ✓ Asignado a: {typeof order.delivery_person === 'object' ? order.delivery_person.name : order.delivery_person}
                    </div>
                )}
            </div>
        </div>
    );
};