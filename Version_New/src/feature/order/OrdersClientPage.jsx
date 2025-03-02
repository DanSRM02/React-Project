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
        COMPLETED: 'bg-green-100 text-green-800',
        CANCELLED: 'bg-red-100 text-red-800',
        PENDING: 'bg-yellow-100 text-yellow-800',
        PROCESSING: 'bg-blue-100 text-blue-800'
    }), []);

    const columns = useMemo(() => [
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
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${stateStyles[order.state] || 'bg-gray-100 text-gray-800'}`}>
                    {STATE_LABELS[order.state] || order.state.toLowerCase()}
                </span>
            )
        },
        {
            header: "Total",
            accessor: "total",
            render: (order) => formatCurrency(order.total),
            headerClassName: "text-right pr-6",
            cellClassName: "text-right pr-6 font-semibold"
        },
        {
            header: "Acciones",
            render: (order) => (
                <button
                    onClick={() => handleViewDetails(order.id)}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-2 rounded-lg transition-colors text-sm flex items-center gap-2"
                    aria-label={`Ver detalles de la orden ${order.id}`}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Detalles
                </button>
            )
        }
    ], [stateStyles]);

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
            <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex flex-wrap justify-between items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">Historial de Compras</h1>
                        <p className="text-gray-600 mt-2">
                            {filteredOrders.length} orden{filteredOrders.length !== 1 ? 'es' : ''} registrada{filteredOrders.length !== 1 ? 's' : ''}
                        </p>
                    </div>

                    <select
                        value={selectedState}
                        onChange={(e) => setSelectedState(e.target.value)}
                        className="bg-white border rounded-lg px-4 py-2 shadow-sm"
                    >
                        <option value="ALL">Todos los estados</option>
                        {['PENDING', 'APPROVED'].map(state => (
                            <option key={state} value={state}>
                                {STATE_LABELS[state]}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {loading && (
                <div className="py-12 flex flex-col items-center gap-4">
                    <Loader className="h-12 w-12 text-indigo-600 animate-spin" />
                    <p className="text-gray-600">Cargando tu historial...</p>
                </div>
            )}

            {error && (
                <ErrorMessage
                    message="Error al cargar el historial"
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
                        <p className="mt-2 text-sm text-gray-500">Tus próximas compras aparecerán aquí</p>
                        <div className="mt-6">
                            <a
                                href="/products"
                                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
                            >
                                <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                                Comenzar a comprar
                            </a>
                        </div>
                    </div>
                </div>
            )}

            {!loading && !error && filteredOrders.length > 0 && (
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                    <DataTable
                        columns={columns}
                        data={filteredOrders}
                        emptyMessage="No se encontraron órdenes"
                        rowClassName="hover:bg-indigo-50 transition-colors border-b border-gray-100"
                        headerClassName="bg-gray-50 text-gray-700 border-b border-gray-200"
                    />
                </div>
            )}


            {showDetailsModal && currentOrder && (
                <OrderDetailsModal
                    order={{
                        id: currentOrder.id,
                        createdAt: currentOrder.createdAt,
                        total: currentOrder.total,
                        products: currentOrder.products,
                        state: currentOrder.state
                    }}
                    onClose={() => setShowDetailsModal(false)}
                    title="Detalles de la compra"
                    className="max-w-3xl"
                />
            )}
        </div>
    );
};

export default OrdersClientPage;