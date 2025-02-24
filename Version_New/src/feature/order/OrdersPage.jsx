import React, { useState } from "react";
import { STATES, STATE_LABELS } from "../../utils/states";
import { useOrdersByState } from "./hooks/useOrdersByState";
import OrderDetailsModal from "../../components/UI/OrderDetailsModal";
import { useOrderDetails } from "./hooks/useOrderDetails";

const OrdersPage = () => {
    const [selectedState, setSelectedState] = useState("PENDING");
    const { ordersByState, loading, error } = useOrdersByState(selectedState);

    // Estado para la orden seleccionada (objeto completo) y su ID
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [selectedOrderId, setSelectedOrderId] = useState(null);

    // Hook para cargar detalles de la orden (se activa cuando selectedOrderId cambia)
    const { orderDetails, loading: detailsLoading, error: detailsError } = useOrderDetails(selectedOrderId);

    const [showDetailsModal, setShowDetailsModal] = useState(false);

    const handlePrioritize = (orderId) => {
        console.log(`Priorizar orden ${orderId}`);
        // Llamar a la API para priorizar la orden
    };

    const handleApprove = (orderId) => {
        console.log(`Aprobar orden ${orderId}`);
        // Llamar a la API para aprobar la orden
    };

    const handleCancel = (orderId) => {
        console.log(`Cancelar orden ${orderId}`);
        // Llamar a la API para cancelar la orden
    };

    const handleViewDetails = (orderId) => {
        // Busca la orden en la lista
        const foundOrder = ordersByState.find((o) => o.id === orderId);
        // Guarda la orden completa en el estado
        setSelectedOrder(foundOrder);
        // Guarda el ID para que el hook useOrderDetails cargue los detalles
        setSelectedOrderId(orderId);
        // Muestra el modal
        setShowDetailsModal(true);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold mb-6 text-center">Gestión de Órdenes</h2>

            {/* Filtro de estados */}
            <div className="flex flex-wrap justify-center gap-2 mb-6">
                {STATES.map((state) => (
                    <button
                        key={state.key}
                        onClick={() => setSelectedState(state.key)}
                        className={`px-4 py-2 rounded-full border ${selectedState === state.key
                                ? "bg-green-600 text-white"
                                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                            }`}
                    >
                        {state.label}
                    </button>
                ))}
            </div>

            {loading && <p className="text-center">Cargando órdenes...</p>}
            {error && <p className="text-center text-red-600">Error al cargar órdenes.</p>}
            {!loading && !error && ordersByState.length === 0 && (
                <p className="text-center text-gray-600">No hay órdenes en este estado.</p>
            )}

            {!loading && !error && ordersByState.length > 0 && (
                <div className="overflow-auto">
                    <table className="min-w-full bg-white shadow rounded-lg">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Fecha</th>
                                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Cliente</th>
                                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Estado</th>
                                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Total</th>
                                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ordersByState.map((order) => (
                                <tr key={order.id} className="border-b hover:bg-gray-50">
                                    <td className="px-4 py-2 text-sm">{order.createdAt}</td>
                                    <td className="px-4 py-2 text-sm">{order.individual_name || "N/A"}</td>
                                    <td className="px-4 py-2 text-sm">
                                        {STATE_LABELS[order.state] || order.state.toLowerCase()}
                                    </td>
                                    <td className="px-4 py-2 text-sm">${order.total}</td>
                                    <td className="px-4 py-2 text-sm">
                                        <div className="flex flex-wrap gap-1">
                                            {order.state === "PENDING" && (
                                                <button
                                                    onClick={() => handlePrioritize(order.id)}
                                                    className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 text-xs"
                                                >
                                                    Priorizar
                                                </button>
                                            )}
                                            {order.state === "PENDING" && (
                                                <button
                                                    onClick={() => handleCancel(order.id)}
                                                    className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700 text-xs"
                                                >
                                                    Cancelar
                                                </button>
                                            )}
                                            {(order.state === "PRIORITIZED" || order.state === "PENDING") && (
                                                <button
                                                    onClick={() => handleApprove(order.id)}
                                                    className="bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700 text-xs"
                                                >
                                                    Aprobar
                                                </button>
                                            )}
                                            <button
                                                onClick={() => handleViewDetails(order.id)}
                                                className="bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700 text-xs"
                                            >
                                                Detalles
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Modal de detalles: se muestra cuando ambos estados están disponibles */}
            {showDetailsModal && orderDetails && selectedOrder && (
                
                <OrderDetailsModal
                    order={selectedOrder}
                    productList={orderDetails}  // La lista que trae el hook useOrderDetails                    
                    onClose={() => setShowDetailsModal(false)}
                />
            )}
        </div>
    );
};

export default OrdersPage;
