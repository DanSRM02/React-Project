import React, { useState, useEffect } from "react";
import { STATES, STATE_LABELS } from "../../utils/states";
import DataTable from "../../components/UI/DataTable";
import OrderDetailsModal from "./OrderDetailsModal";
import { useOrders } from "../../hooks/useOrders";

const OrdersVendorPage = () => {
    const [selectedState, setSelectedState] = useState("PENDING");
    const [showDetailsModal, setShowDetailsModal] = useState(false);

    const {
        orders,
        currentOrder,
        loading,
        error,
        fetchOrdersByState,
        fetchOrderDetails,
        modifyOrder
    } = useOrders();

    useEffect(() => {
        fetchOrdersByState(selectedState);
    }, [selectedState]);

    const handleStateChange = async (orderId, newState) => {
        try {
            await modifyOrder(orderId, { state: newState });
            fetchOrdersByState(selectedState);
        } catch (error) {
            console.error(`Error actualizando estado: ${error.message}`);
        }
    };

    const handleViewDetails = async (orderId) => {
        try {
            await fetchOrderDetails(orderId);
            setShowDetailsModal(true);
        } catch (error) {
            console.error("Error cargando detalles:", error);
        }
    };

    const columns = [
        {
            header: "Fecha",
            accessor: "createdAt",
            render: (order) => new Date(order.createdAt).toLocaleDateString("es-ES"),
            headerClassName: "text-gray-600 font-medium py-4",
            cellClassName: "text-gray-700 text-center"
        },
        {
            header: "Cliente",
            accessor: "individual_name",
            render: (order) => order.individual_name || "N/A",
            headerClassName: "text-gray-600 font-medium",
            cellClassName: "text-gray-700 text-center font-medium"
        },
        {
            header: "Estado",
            accessor: "state",
            render: (order) => (
                <span className={`px-3 py-1.5 rounded-full text-sm font-semibold ${order.state === "PENDING" ? "bg-amber-100 text-amber-700" :
                        order.state === "PRIORITIZED" ? "bg-blue-100 text-blue-700" :
                            "bg-emerald-100 text-emerald-700"
                    }`}>
                    {STATE_LABELS[order.state]}
                </span>
            ),
            headerClassName: "text-gray-600 font-medium",
            cellClassName: "text-center"
        },
        {
            header: "Total",
            accessor: "total",
            render: (order) => (
                <span className="font-medium">
                    ${order.total.toLocaleString('es-ES', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                    })}
                </span>
            ),
            headerClassName: "text-gray-600 font-medium",
            cellClassName: "text-right text-gray-800"
        },
        {
            header: "Acciones",
            render: (order) => (
                <div className="flex gap-2 justify-center">
                    {order.state === "PENDING" && (
                        <button
                            onClick={() => handleStateChange(order.id, "PRIORITIZED")}
                            className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm transition-all"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                            </svg>
                            Priorizar
                        </button>
                    )}
                    {["PENDING", "PRIORITIZED"].includes(order.state) && (
                        <button
                            onClick={() => handleStateChange(order.id, "APPROVED")}
                            className="flex items-center gap-1 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md text-sm transition-all"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            Aprobar
                        </button>
                    )}
                    <button
                        onClick={() => handleViewDetails(order.id)}
                        className="flex items-center gap-1 px-3 py-1.5 bg-gray-600 hover:bg-gray-700 text-white rounded-md text-sm transition-all"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                        </svg>
                        Detalles
                    </button>
                </div>
            ),
            headerClassName: "text-gray-600 font-medium",
            cellClassName: "text-center"
        }
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Gestión de Órdenes</h2>

            <div className="flex flex-wrap justify-center gap-2 mb-8">
                {STATES.map((state) => (
                    <button
                        key={state.key}
                        onClick={() => setSelectedState(state.key)}
                        className={`px-4 py-2 rounded-full border transition-all ${selectedState === state.key
                                ? "bg-green-600 text-white shadow-md"
                                : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                            }`}
                    >
                        {state.label}
                    </button>
                ))}
            </div>

            {loading && <p className="text-center text-gray-600 py-8">Cargando órdenes...</p>}
            {error && <p className="text-center text-red-600 py-8">Error: {error}</p>}

            {!loading && !error && (
                <DataTable
                    columns={columns}
                    data={orders.data || []}
                    emptyMessage="No hay órdenes en este estado"
                    headerClassName="bg-gray-50 border-b border-gray-200"
                    rowClassName="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                    containerClassName="rounded-xl border border-gray-200 overflow-hidden shadow-sm"
                />
            )}

            {showDetailsModal && currentOrder && (
                <OrderDetailsModal
                    order={currentOrder}
                    onClose={() => setShowDetailsModal(false)}
                />
            )}
        </div>
    );
};

export default OrdersVendorPage;