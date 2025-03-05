import React, { useState, useEffect } from "react";
import { STATES, STATE_LABELS } from "../../utils/states";
import DataTable from "../../components/UI/DataTable";
import { useOrders } from "../../hooks/useOrders";
import { useUsers } from "../../hooks/useUsers";
import OrderDetailsModal from "./OrderDetailsModal";
import { AssignDeliveryModal } from "./AssignDeliveryModal";
import { useDeliveries } from "../../hooks/useDelivery";


const OrdersVendorPage = () => {
    const [selectedState, setSelectedState] = useState("PENDING");
    const [activeModal, setActiveModal] = useState(null);
    const [selectedOrder, setSelectedOrder] = useState(null);

    const { deliveriesActive, fetchDeliveriesActive } = useUsers();
    const { addDelivery } = useDeliveries();
    const {
        orders,
        currentOrder,
        loading,
        error,
        fetchOrdersByState,
        fetchOrderDetails,
        changeStatus
    } = useOrders();

    console.log(orders);


    useEffect(() => {
        fetchOrdersByState(selectedState);
        fetchDeliveriesActive();
    }, [selectedState]);

    const handleStateChange = async (orderId, newState) => {
        try {
            await changeStatus(orderId, { state: newState });
            fetchOrdersByState(selectedState);
        } catch (error) {
            console.error(`Error actualizando estado: ${error.message}`);
        }
    };

    const handleAssignDelivery = async (orderId, deliveryId) => {
        try {
            // Crear registro en tabla deliveries
            await addDelivery({
                order_id: orderId,
                user_id: deliveryId,
            });

            // Cerrar modal y actualizar datos
            setActiveModal(null);
            fetchOrdersByState(selectedState);

        } catch (error) {
            console.error("Error asignando domiciliario:", error);
            // Puedes agregar un toast o alerta de error aquí
        }
    };

    const handleOpenDetails = async (orderId) => {
        try {
            await fetchOrderDetails(orderId);
            setActiveModal('details');
            setSelectedOrder(orderId);
        } catch (error) {
            console.error("Error cargando detalles:", error);
        }
    };

    const handleOpenAssignment = (order) => {
        setSelectedOrder(order);
        setActiveModal('assign');
    };

    const columns = [
        {
            header: "Fecha",
            accessor: "createdAt",
            render: (order) => new Date(order.createdAt).toLocaleDateString("es-ES"),
            headerClassName: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
            cellClassName: "px-6 py-4 whitespace-nowrap text-sm text-gray-900"
        },
        {
            header: "Cliente",
            accessor: "individual_name",
            render: (order) => order.individual_name || "N/A",
            headerClassName: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
            cellClassName: "px-6 py-4 whitespace-nowrap text-sm text-gray-900"
        },
        {
            header: "Estado",
            accessor: "state",
            render: (order) => (
                <div className="flex flex-col items-center">
                    <span className={`px-3 py-1.5 rounded-full text-sm font-semibold ${order.order_state === "PENDING" ? "bg-amber-100 text-amber-700" :
                        order.order_state === "PRIORITIZED" ? "bg-blue-100 text-blue-700" :
                            "bg-emerald-100 text-emerald-700"
                        }`}>
                        {STATE_LABELS[order.order_state]}
                    </span>

                    {/* Mostrar domiciliario solo para órdenes aprobadas */}
                    {order.order_state === "APPROVED" && (
                        <span className="text-xs text-gray-500 mt-1">
                            {(order.delivery_person)
                                ? `Asignado a: ${order.delivery_person}`
                                : "Sin domiciliario asignado"}
                        </span>
                    )}
                </div>
            ),
            headerClassName: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
            cellClassName: "px-6 py-4 whitespace-nowrap text-sm text-gray-900"
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
            headerClassName: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
            cellClassName: "px-6 py-4 whitespace-nowrap text-sm text-gray-900"
        },
        {
            header: "Acciones",
            render: (order) => (
                <div className="flex gap-2 justify-center">
                    {order.order_state === "PENDING" && (
                        <button
                            onClick={() => handleStateChange(order.id, "PRIORITIZED")}
                            className="px-3 py-1.5 text-xs font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                        >
                            Priorizar
                        </button>
                    )}
                    {["PENDING", "PRIORITIZED"].includes(order.order_state) && (
                        <button
                            onClick={() => handleStateChange(order.id, "APPROVED")}
                            className="px-3 py-1.5 text-xs font-medium text-white bg-emerald-600 rounded-md hover:bg-emerald-700"
                        >
                            Aprobar
                        </button>
                    )}
                    {order.order_state === "APPROVED" && !order.delivery_id && (
                        <button
                            onClick={() => handleOpenAssignment(order)}
                            className="px-3 py-1.5 text-xs font-medium text-white bg-purple-600 rounded-md hover:bg-purple-700"
                        >
                            Asignar
                        </button>
                    )}
                    <button
                        onClick={() => handleOpenDetails(order.id)}
                        className="px-3 py-1.5 text-xs font-medium text-white bg-gray-600 rounded-md hover:bg-gray-700"
                    >
                        Detalles
                    </button>
                </div>
            ),
            headerClassName: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
            cellClassName: "px-6 py-4 whitespace-nowrap text-sm text-gray-900"
        }
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Gestión de Órdenes</h2>

            {/* Filtro de estados */}
            <div className="flex mb-8 border-b border-gray-200">
                {STATES.map((state) => (
                    <button
                        key={state.key}
                        onClick={() => setSelectedState(state.key)}
                        className={`px-4 py-2 mx-1 -mb-px font-medium ${selectedState === state.key
                            ? "text-green-600 border-b-2 border-green-600"
                            : "text-gray-500 hover:text-gray-700"
                            }`}
                    >
                        {state.label}
                    </button>
                ))}
            </div>

            {/* Contenido principal */}
            {loading && <p className="text-center text-gray-600 py-8">Cargando órdenes...</p>}
            {error && <p className="text-center text-red-600 py-8">Error: {error}</p>}

            {!loading && !error && (
                <DataTable
                    columns={columns}
                    data={orders.data || []}
                    emptyMessage="No hay órdenes en este estado"
                    containerClassName="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg"
                    tableClassName="min-w-full divide-y divide-gray-200"
                />
            )}

            {/* Modales */}
            <OrderDetailsModal
                isOpen={activeModal === 'details'}
                order={currentOrder}
                onClose={() => {
                    setActiveModal(null);
                    setSelectedOrder(null);
                }}
            />

            <AssignDeliveryModal
                isOpen={activeModal === 'assign'}
                order={selectedOrder}
                deliveries={deliveriesActive}
                onAssign={handleAssignDelivery}
                onClose={() => {
                    setActiveModal(null);
                    setSelectedOrder(null);
                }}
            />
        </div>
    );
};

export default OrdersVendorPage;