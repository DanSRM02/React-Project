import React, { useEffect, useMemo, useState } from "react";
import { useOrders } from "../../hooks/useOrders";
import { formatCurrency, formatLongDate } from "../../utils/formatHelpers";
import { MobileOrderCard } from "../../components/UI/datatable/MobileOrderCard";
import { StatCard } from "../../components/UI/card/StatCard";
import { PurchaseTrendChart } from "../../components/UI/chart/PurchaseTrendChart";
import ErrorMessage from "../../components/UI/alert/ErrorMessage";
import Loader from "../../components/UI/Loader";
import DataTable from "../../components/UI/datatable/DataTable";
import { CLIENT_STATES, STATE_COLORS } from "../../utils/constans/states";
import { FaMoneyBillWave } from "react-icons/fa";
import { OrderDetailsModal } from "../../components/UI/order/OrderDetailsModal";

const OrdersClientPage = () => {
    const [selectedState, setSelectedState] = useState('ALL');
    const { orders, currentOrder, loading, error, fetchAllOrders, fetchOrderDetails } = useOrders();
    const [showDetailsModal, setShowDetailsModal] = useState(false);

    const filteredOrders = useMemo(() =>
        orders?.filter(order =>
            selectedState === 'ALL' ? true : order.state === selectedState
        ) || [],
        [orders, selectedState]);

    const chartData = useMemo(() => ({
        labels: filteredOrders.map(o => formatLongDate(o.createdAt, 'short')),
        datasets: [{
            label: 'Monto de compras',
            data: filteredOrders.map(o => o.total),
            borderColor: '#16a34a',
            tension: 0.1
        }]
    }), [filteredOrders]);

    const totalSpent = useMemo(() =>
        filteredOrders.reduce((acc, order) => acc + order.total, 0),
        [filteredOrders]);

    useEffect(() => {
        fetchAllOrders();
    }, [fetchAllOrders]);

    const handleViewDetails = async (orderId) => {
        try {                        
            await fetchOrderDetails(orderId);
            setShowDetailsModal(true);            
        } catch (error) {
            console.error("Error cargando detalles:", error);
        }
    };    
    
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6 flex flex-wrap justify-between items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Historial de Compras</h1>
                    <p className="text-gray-600 mt-2">
                        {filteredOrders.length} orden{filteredOrders.length !== 1 ? 'es' : ''} registrada{filteredOrders.length !== 1 ? 's' : ''}
                    </p>
                </div>

                <select
                    value={selectedState}
                    onChange={(e) => setSelectedState(e.target.value)}
                    className="bg-white border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                >
                    <option value="ALL">Todos los estados</option>
                    {Object.entries(CLIENT_STATES).map(([key, label]) => (
                        <option key={key} value={key}>
                            {label}
                        </option>
                    ))}
                </select>
            </div>

            {loading && (
                <div className="py-12 flex flex-col items-center gap-4">
                    <Loader className="h-12 w-12 text-indigo-600 animate-spin" />
                    <p className="text-gray-600">Cargando tu historial...</p>
                </div>
            )}

            {error && (
                <ErrorMessage
                    message="Hubo un problema al cargar el historial de compras"
                    details={error.message}
                    className="mb-8"
                />
            )}

            {!loading && !error && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                        {filteredOrders.length === 0 ? (
                            <div className="bg-white rounded-xl p-8 text-center shadow-sm">
                                {/* ... (mismo contenido de estado vacío) */}
                            </div>
                        ) : (
                            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                                <DataTable
                                    onRowClick={(order) => handleViewDetails(order.id)}
                                    rowClassName="hover:bg-gray-50 cursor-pointer"
                                    columns={[
                                        {
                                            header: "N° Orden",
                                            accessor: "id",
                                            render: (order) => `#${order.id.toString().padStart(5, '0')}`,
                                            cellClassName: "font-medium text-gray-800"
                                        },
                                        {
                                            header: "Fecha",
                                            accessor: "createdAt",
                                            render: (order) => formatLongDate(order.createdAt),
                                            cellClassName: "text-gray-600"
                                        },
                                        {
                                            header: "Estado",
                                            accessor: "state",
                                            render: (order) => {
                                                const stateLabel = CLIENT_STATES[order.state] || "Estado desconocido";
                                                const stateColor = STATE_COLORS[order.state] || "bg-gray-100 text-gray-800";
                                                return (
                                                    <span className={`px-3 py-1 rounded-full text-xs ${stateColor}`}>
                                                        {stateLabel}
                                                    </span>
                                                );
                                            }
                                        },
                                        {
                                            header: "Total",
                                            accessor: "total",
                                            render: (order) => formatCurrency(order.total),
                                            cellClassName: "text-right pr-6 font-semibold" // ← Elimina hover y cursor-pointer
                                        }
                                    ]}
                                    data={filteredOrders}
                                    mobileRender={(item) => (
                                        <MobileOrderCard
                                            order={item}
                                            stateColors={STATE_COLORS}
                                            stateLabels={CLIENT_STATES}
                                            onClick={() => handleViewDetails(item.id)}
                                        />
                                    )}
                                    emptyMessage="No se encontraron órdenes"
                                />
                            </div>
                        )}
                    </div>

                    <div className="lg:col-span-1 space-y-6">
                        <PurchaseTrendChart data={chartData} />
                        <div className="grid grid-cols-1 gap-4">
                            <StatCard
                                title="Gasto Total"
                                value={formatCurrency(totalSpent)}
                                icon={<FaMoneyBillWave />}
                            />
                            <StatCard
                                title="Órdenes Promedio"
                                value={formatCurrency(filteredOrders.length > 0 ? totalSpent / filteredOrders.length : 0)}
                            />
                        </div>
                    </div>
                </div>
            )}

            {showDetailsModal && currentOrder && (                // En OrdersClientPage.jsx (Pasar la prop al modal)
                <OrderDetailsModal
                    isOpen={showDetailsModal}
                    order={currentOrder}
                    onClose={() => setShowDetailsModal(false)}
                    clientStates={CLIENT_STATES} 
                />
            )}
        </div>
    );
};

export default OrdersClientPage;