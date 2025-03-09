import React, { useEffect, useState } from "react";
import { useOrders } from "../../hooks/useOrders";
import { useUsers } from "../../hooks/useUsers";
import { useDeliveries } from "../../hooks/useDeliveries";
import { COMMON_STATES, DELIVERY_STATES, STATE_COLORS, VENDOR_STATES } from "../../utils/constans/states";
import { OrderCard } from "../../components/UI/order/OrderCard";

const OrdersVendorPage = () => {
    const {
        fetchOrdersKanban,
        orders,
        changeStatus,
        setCurrentOrder
    } = useOrders();
    const { addDelivery } = useDeliveries();
    const { fetchDeliveriesActive, deliveriesActive } = useUsers();
    const [loadingStates, setLoadingStates] = useState({});
    const [selectedDomiciliarios, setSelectedDomiciliarios] = useState({});

    useEffect(() => {
        fetchOrdersKanban();
        fetchDeliveriesActive();
    }, []);

    console.log(orders);
    

    const groupOrdersByState = (orders) => {
        return orders.reduce((acc, order) => {
            // Usa order_state en lugar de state
            const state = order.order_state || order.state;
            if (!acc[state]) acc[state] = [];
            acc[state].push(order);
            return acc;
        }, {});
    };

    const handleStatusChange = async (orderId, newState) => {
        setLoadingStates(prev => ({ ...prev, [orderId]: true }));
        try {
            await changeStatus(orderId, { state: newState });
            // Actualizar las órdenes localmente
            setCurrentOrder(prev => {
                if (!prev || !prev.data) return prev;

                return {
                    ...prev,
                    data: prev.data.map(order =>
                        order.id === orderId ? {
                            ...order,
                            order_state: newState,
                            state: newState
                        } : order
                    )
                };
            });
            // Recargar las órdenes para asegurar la vista actualizada
            fetchOrdersKanban();
        } catch (error) {
            console.error("Error cambiando estado:", error);
        }
        setLoadingStates(prev => ({ ...prev, [orderId]: false }));
    };

    const handleAssign = async (orderId) => {
        if (!selectedDomiciliarios[orderId]) return;

        setLoadingStates(prev => ({ ...prev, [orderId]: true }));
        try {
            await addDelivery({
                order_id: orderId,
                domiciliary_id: selectedDomiciliarios[orderId]
            });

            // Actualizar localmente
            setCurrentOrder(prev => {
                if (!prev || !prev.data) return prev;

                return {
                    ...prev,
                    data: prev.data.map(order =>
                        order.id === orderId ? {
                            ...order,
                            delivery_person: deliveriesActive.find(d => d.id === selectedDomiciliarios[orderId]),
                            order_state: DELIVERY_STATES.ASSIGNED,
                            state: DELIVERY_STATES.ASSIGNED
                        } : order
                    )
                };
            });

            // Recargar las órdenes después de la asignación
            fetchOrdersKanban();
        } catch (error) {
            console.error("Error asignando domiciliario:", error);
        }
        setLoadingStates(prev => ({ ...prev, [orderId]: false }));
    };

    const KanbanColumn = ({ title, orders, color, showAssignment = false }) => (
        <div className="flex flex-col bg-white rounded-lg shadow-lg h-full flex-1 min-w-[250px] mx-2 first:ml-4 last:mr-4">
            <div className={`p-4 ${color} rounded-t-lg`}>
                <h3 className="font-semibold text-lg">{title}</h3>
                <span className="text-sm text-gray-600">({orders?.length || 0})</span>
            </div>
            <div className="p-2 space-y-4 flex-1 overflow-y-auto">
                {orders?.map((order) => (
                    <OrderCard
                        key={order.id}
                        order={order}
                        showAssignment={showAssignment}
                        domiciliarios={deliveriesActive}
                        selectedDomiciliario={selectedDomiciliarios[order.id]}
                        onSelectDomiciliario={(id) => setSelectedDomiciliarios(prev => ({
                            ...prev,
                            [order.id]: id
                        }))}
                        onStatusChange={handleStatusChange}
                        onAssign={handleAssign}
                        isLoading={loadingStates[order.id] || false}
                    />
                ))}
            </div>
        </div>
    );

    // Asegurarse de que se están procesando los datos correctamente
    const groupedOrders = orders && orders.data ? groupOrdersByState(orders.data) : {};

    return (
        <div className="flex flex-col h-full w-full overflow-hidden">
            <h1 className="text-2xl font-bold text-gray-800 mb-6 px-4">
                Panel de Gestión de Órdenes
            </h1>

            <div className="flex-1 w-full overflow-x-auto pb-4">
                <div className="flex h-full w-full pr-4">
                    <KanbanColumn
                        title={VENDOR_STATES.PENDING}
                        orders={groupedOrders.PENDING || []}
                        color={STATE_COLORS.PENDING}
                    />
                    <KanbanColumn
                        title={VENDOR_STATES.PRIORITIZED}
                        orders={groupedOrders.PRIORITIZED || []}
                        color={STATE_COLORS.PRIORITIZED}
                        showAssignment={true}
                    />
                    <KanbanColumn
                        title={VENDOR_STATES.APPROVED}
                        orders={groupedOrders.APPROVED || []}
                        color={STATE_COLORS.APPROVED}
                        showAssignment={true}
                    />                    
                    <KanbanColumn
                        title={COMMON_STATES.COMPLETED}
                        orders={groupedOrders.COMPLETED || []}
                        color={STATE_COLORS.COMPLETED}
                    />
                    <KanbanColumn
                        title={VENDOR_STATES.CANCELLED}
                        orders={groupedOrders.CANCELLED || []}
                        color={STATE_COLORS.CANCELLED}
                    />
                </div>
            </div>
        </div>
    );
};

export default OrdersVendorPage;