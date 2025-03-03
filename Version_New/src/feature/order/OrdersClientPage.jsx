import React, { useEffect, useMemo, useState } from "react";
import { STATE_LABELS } from "../../utils/states";
import { useOrders } from "../../hooks/useOrders";
import DataTable from "../../components/UI/DataTable";
import OrderDetailsModal from "./OrderDetailsModal";
import Loader from "../../components/UI/Loader";
import ErrorMessage from "../../components/UI/ErrorMessage";
import { formatCurrency, formatLongDate } from "../../utils/formatHelpers";

const OrdersClientPage = () => {
    const [selectedState, setSelectedState] = useState('ALL');
    const { orders, currentOrder, loading, error, fetchAllOrders, fetchOrderDetails } = useOrders();
    const [showDetailsModal, setShowDetailsModal] = useState(false);

    const filteredOrders = useMemo(() =>
        orders?.filter(order =>
            selectedState === 'ALL' ? true : order.state === selectedState
        ) || []
        , [orders, selectedState]);

    const stateStyles = useMemo(() => ({
        COMPLETED: 'bg-green-100 text-green-800 border border-green-500 rounded-full px-3 py-1 text-xs font-semibold',
        CANCELLED: 'bg-red-100 text-red-800 border border-red-500 rounded-full px-3 py-1 text-xs font-semibold',
        PENDING: 'bg-yellow-100 text-yellow-800 border border-yellow-500 rounded-full px-3 py-1 text-xs font-semibold',
        PROCESSING: 'bg-blue-100 text-blue-800 border border-blue-500 rounded-full px-3 py-1 text-xs font-semibold'
    }), []);

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
                    {['PENDING', 'APPROVED'].map(state => (
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

            {!loading && !error && filteredOrders.length === 0 && (
                <div className="bg-white rounded-xl p-8 text-center shadow-sm max-w-2xl mx-auto">
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
            )}

            {!loading && !error && filteredOrders.length > 0 && (
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
                                    <span className={stateStyles[order.state] || 'bg-gray-100 text-gray-800 px-3 py-1 rounded-full'}>
                                        {STATE_LABELS[order.state] || order.state.toLowerCase()}
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
                        emptyMessage="No se encontraron órdenes"
                    />
                </div>
            )}

            {showDetailsModal && currentOrder && (
                <OrderDetailsModal
                    order={currentOrder}
                    onClose={() => setShowDetailsModal(false)}
                    title="Detalles de la compra"
                    className="max-w-3xl"
                />
            )}
        </div>
    );
};

export default OrdersClientPage;
