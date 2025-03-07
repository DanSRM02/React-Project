import React, { useEffect, useMemo, useState } from "react";
import { useOrders } from "../../hooks/useOrders";
import { formatCurrency, formatLongDate } from "../../utils/formatHelpers";
import { MobileOrderCard } from "../../components/UI/datatable/MobileOrderCard";
import { StatCard } from "../../components/UI/card/StatCard";
import { PurchaseTrendChart } from "../../components/UI/chart/PurchaseTrendChart";
import { ORDER_STATE_COLORS, STATE_LABELS } from "../../utils/constans/states";
import { OrDetailsModal } from "../../components/UI/order/OrDetailsModal";
import ErrorMessage from "../../components/UI/alert/ErrorMessage";
import Loader from "../../components/UI/Loader";
import DataTable from "../../components/UI/datatable/DataTable";


const OrdersClientPage = () => {
    const [selectedState, setSelectedState] = useState('ALL');
    const { orders, currentOrder, loading, error, fetchAllOrders, fetchOrderDetails } = useOrders();
    const [showDetailsModal, setShowDetailsModal] = useState(false);

    const filteredOrders = useMemo(() =>
        orders?.filter(order =>
            selectedState === 'ALL' ? true : order.state === selectedState
        ) || [],
        [orders, selectedState]);

    // Corrige la estructura de chartData
    const chartData = useMemo(() => ({
        labels: filteredOrders.map(o => formatLongDate(o.createdAt, 'short')),
        datasets: [{
            label: 'Monto de compras',
            data: filteredOrders.map(o => o.total),
            borderColor: '#16a34a',
            tension: 0.1
        }]
    }), [filteredOrders]);

    // Estadísticas calculadas
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
                    {Object.keys(STATE_LABELS).map(state => (
                        <option key={state} value={state}>
                            {STATE_LABELS[state]}
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
                    {/* Sección principal de órdenes */}
                    <div className="lg:col-span-2 space-y-6">
                        {filteredOrders.length === 0 ? (
                            <div className="bg-white rounded-xl p-8 text-center shadow-sm">
                                <div className="max-w-md mx-auto">
                                    <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                    </svg>
                                    <h3 className="mt-4 text-lg font-medium text-gray-900">No hay órdenes registradas</h3>
                                    <p className="mt-2 text-sm text-gray-500">Tus próximas compras aparecerán aquí.</p>
                                    <div className="mt-6">
                                        <a
                                            href="/products"
                                            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
                                        >
                                            Comenzar a comprar
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                                <DataTable
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
                                            render: (order) => (
                                                <span className={`px-3 py-1 rounded-full text-xs ${ORDER_STATE_COLORS[order.state]}`}>
                                                    {STATE_LABELS[order.state]}
                                                </span>
                                            )
                                        },
                                        {
                                            header: "Total",
                                            accessor: "total",
                                            render: (order) => formatCurrency(order.total),
                                            cellClassName: "text-right pr-6 font-semibold"
                                        }
                                    ]}
                                    data={filteredOrders}
                                    mobileRender={(item) => (
                                        <MobileOrderCard
                                            order={item}
                                            onClick={() => handleViewDetails(item.id)}
                                        />
                                    )}
                                    emptyMessage="No se encontraron órdenes"
                                />
                            </div>
                        )}
                    </div>

                    {/* Sidebar con estadísticas y gráficos */}
                    <div className="lg:col-span-1 space-y-6">
                        <PurchaseTrendChart data={chartData} />

                        <div className="grid grid-cols-1 gap-4">
                            <StatCard
                                title="Gasto Total"
                                value={formatCurrency(totalSpent)}
                            />

                            <StatCard
                                title="Órdenes Promedio"
                                value={formatCurrency(filteredOrders.length > 0 ? totalSpent / filteredOrders.length : 0)}
                            />
                        </div>
                    </div>
                </div>
            )}

            {showDetailsModal && currentOrder && (
                <OrDetailsModal
                    order={currentOrder}
                    onClose={() => setShowDetailsModal(false)}
                />
            )}
        </div>
    );
};

export default OrdersClientPage;