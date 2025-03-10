import React from "react";

export const DeliveryAssignment = ({
    order,
    domiciliarios,
    selectedDomiciliario,
    onSelectDomiciliario,
    onAssign,
    isLoading
}) => (
    <div className="w-full flex flex-col gap-2 mt-2">
        <select
            value={selectedDomiciliario || ""}
            onChange={(e) => onSelectDomiciliario(Number(e.target.value))}
            className="flex-1 border rounded-md p-2 text-sm disabled:opacity-50 min-w-[200px]"
            disabled={isLoading}
        >
            <option value="">Seleccionar domiciliario...</option>
            {domiciliarios?.map((dom) => (
                <option key={dom.id} value={dom.id}>
                    {dom.name} - {dom.phone}
                </option>
            ))}
        </select>
        <button
            onClick={() => onAssign(order.id)}
            disabled={!selectedDomiciliario || isLoading}
            className={`px-3 py-2 text-sm rounded-md transition-colors ${selectedDomiciliario && !isLoading
                    ? "bg-green-500 hover:bg-green-600 text-white"
                    : "bg-gray-200 text-gray-500 cursor-not-allowed"
                }`}
        >
            {isLoading ? (
                <span className="flex items-center justify-center gap-1">
                    <span className="animate-spin">↻</span>
                    <span>Asignando</span>
                </span>
            ) : "Asignar"}
        </button>
    </div>
);