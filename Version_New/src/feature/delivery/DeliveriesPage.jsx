import React, { useEffect, useState } from "react";
import {
    FaExclamationCircle,
    FaTruckMoving,
    FaCheckCircle,
    FaBoxOpen,
    FaUser,
    FaMapMarkerAlt,
    FaPhone,
    FaClipboardList,
    FaMoneyBillWave,
} from "react-icons/fa";
import { useAuth } from "../../contexts/AuthContext";
import { useDeliveries } from "../../hooks/useDeliveries";
import { DeliveryStatusBadge } from "../../components/UI/bagde/DeliveryStatusBagde";
import { OrderDetailsModal } from "../../components/UI/order/OrderDetailsModal";
import { CLIENT_STATES } from "../../utils/constans/states";
import { formatCurrency } from "../../utils/formatHelpers";

const DeliveriesPage = () => {
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const { user } = useAuth();
    const {
        findDeliveryById,
        loadingFind,
        errorFind,
        togglerStatus,
        deliveries,
        setDeliveries
    } = useDeliveries();


    console.log(deliveries);


    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [activeTab, setActiveTab] = useState("pending"); // pending, completed

    useEffect(() => {
        const fetchDeliveries = async () => {
            try {
                const response = await findDeliveryById(user.id);

                if (response.status === 202 && response.data?.code === "NO_CONTENT") {
                    setError("");
                }
            } catch (err) {
                setError(err.response?.data?.message || "Error cargando las entregas");
            } finally {
                setLoading(false);
            }
        };

        fetchDeliveries();
    }, [user.id, findDeliveryById]);

    const handleViewDetails = async (orderId) => {
        try {
            await fetchOrderDetails(orderId);
            setShowDetailsModal(true);
        } catch (error) {
            console.error("Error cargando detalles:", error);
        }
    };

    const handleStateChange = async (deliveryId, newState) => {
        try {
            await togglerStatus(deliveryId, { state: newState });

            // Actualizar estado local de la entrega específica
            setDeliveries(prev => prev.map(d =>
                d.id === deliveryId ? { ...d, delivery_state: newState } : d
            ));
        } catch (error) {
            console.error(`Error actualizando estado: ${error.message}`);
        }
    };

    const pendingDeliveries = deliveries?.filter(d => d.delivery_state !== 'DELIVERED') || [];
    const completedDeliveries = deliveries?.filter(d => d.delivery_state === 'DELIVERED') || [];

    if (loading || loadingFind) return (
        <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
            <div className="space-y-8">
                <div className="h-10 bg-gray-100 rounded-lg w-80 max-w-full animate-pulse"></div>
                <div className="space-y-6">
                    <div className="h-64 bg-gray-50 rounded-xl shadow-sm animate-pulse"></div>
                    <div className="h-4 bg-gray-100 rounded w-48 mx-auto animate-pulse"></div>
                </div>
            </div>
        </div>
    );

    if (error || errorFind) return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="bg-red-50 rounded-xl p-6 flex items-start gap-4">
                <FaExclamationCircle className="text-red-400 text-2xl flex-shrink-0" />
                <div>
                    <h3 className="text-lg font-medium text-red-800">Error de carga</h3>
                    <p className="mt-2 text-red-700">{error || errorFind}</p>
                </div>
            </div>
        </div>
    );

    if (!deliveries || deliveries.length === 0) return (
        <div className="max-w-4xl mx-auto px-4 py-8 text-center">
            <div className="bg-gray-50 rounded-xl p-8 border-2 border-dashed border-gray-200">
                <FaBoxOpen className="mx-auto text-4xl text-gray-400 mb-4" />
                <h3 className="text-xl font-medium text-gray-900">Sin entregas asignadas</h3>
                <p className="mt-2 text-gray-500">No tienes órdenes pendientes en este momento</p>
            </div>
        </div>
    );

    return (
        <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
            {/* Header with stats */}
            <div className="bg-white rounded-xl shadow-sm p-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">Panel de Entregas</h1>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-green-50 rounded-lg p-4">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-sm text-gray-500">Pendientes</p>
                                <p className="text-2xl font-bold text-gray-900">{pendingDeliveries.length}</p>
                            </div>
                            <div className="bg-green-100 p-3 rounded-full">
                                <FaClipboardList className="text-green-600 text-xl" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-purple-50 rounded-lg p-4">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-sm text-gray-500">Completadas</p>
                                <p className="text-2xl font-bold text-gray-900">{completedDeliveries.length}</p>
                            </div>
                            <div className="bg-purple-100 p-3 rounded-full">
                                <FaCheckCircle className="text-purple-600 text-xl" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-blue-50 rounded-lg p-4">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-sm text-gray-500">Total</p>
                                <p className="text-2xl font-bold text-gray-900">{deliveries.length}</p>
                            </div>
                            <div className="bg-blue-100 p-3 rounded-full">
                                <FaTruckMoving className="text-blue-600 text-xl" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-xl shadow-sm p-4">
                <div className="flex space-x-2 border-b">
                    <button
                        className={`px-4 py-2 font-medium rounded-t-lg ${activeTab === 'pending'
                            ? 'text-green-600 border-b-2 border-green-500'
                            : 'text-gray-500 hover:text-gray-700'}`}
                        onClick={() => setActiveTab('pending')}
                    >
                        Pendientes
                    </button>
                    <button
                        className={`px-4 py-2 font-medium rounded-t-lg ${activeTab === 'completed'
                            ? 'text-green-600 border-b-2 border-green-500'
                            : 'text-gray-500 hover:text-gray-700'}`}
                        onClick={() => setActiveTab('completed')}
                    >
                        Completadas
                    </button>
                </div>
            </div>

            {/* Delivery Cards */}
            <div className="space-y-6">
                {(activeTab === 'pending' ? pendingDeliveries : completedDeliveries).map((delivery) => (
                    <div key={delivery.delivery_id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">

                        {/* Encabezado actualizado */}
                        <div className="p-4 md:p-6 border-b border-gray-100">
                            <div className="flex flex-col md:flex-row justify-between gap-4 items-start">
                                <div className="flex items-center gap-3">
                                    <div className="bg-green-100 p-2 rounded-lg">
                                        <FaTruckMoving className="text-green-600 text-xl" />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold text-gray-900">
                                            Entrega #{delivery.delivery_id}
                                        </h2>
                                        <div className="text-sm text-gray-500 mt-1">
                                            Orden #{delivery.order_id}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <DeliveryStatusBadge status={delivery.delivery_state} />
                                    {delivery.priority && (
                                        <div className="px-3 py-1.5 rounded-full bg-red-100 text-red-700 text-sm font-medium flex items-center gap-2 border border-red-200">
                                            <FaExclamationCircle />
                                            Prioritaria
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Contenido principal actualizado */}
                        <div className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Sección Cliente */}
                            <div className="bg-gray-50 rounded-lg p-4">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="bg-green-100 p-2 rounded-full">
                                        <FaUser className="text-green-600" />
                                    </div>
                                    <h3 className="font-medium text-gray-900">Cliente</h3>
                                </div>
                                <div className="space-y-2">
                                    <p className="text-gray-800 font-medium">
                                        {delivery.client_name || 'Nombre no disponible'}
                                    </p>
                                    <div className="flex items-start gap-2 text-gray-600">
                                        <FaMapMarkerAlt className="flex-shrink-0 mt-1" />
                                        <span className="text-sm">
                                            {delivery.client_address || 'Dirección no disponible'}
                                        </span>
                                    </div>
                                    {delivery.client_phone && (
                                        <div className="flex items-center gap-2 text-gray-600">
                                            <FaPhone className="flex-shrink-0" />
                                            <a href={`tel:${delivery.client_phone}`} className="text-sm text-blue-600 hover:underline">
                                                {delivery.client_phone}
                                            </a>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Sección Productos actualizada */}
                            <div className="md:col-span-2 bg-gray-50 rounded-lg p-4">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="bg-blue-100 p-2 rounded-full">
                                        <FaBoxOpen className="text-blue-600" />
                                    </div>
                                    <h3 className="font-medium text-gray-900">Productos</h3>
                                </div>
                                <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
                                    {delivery.products?.map((product, index) => (
                                        <div key={index} className="flex flex-col p-2 bg-white rounded border border-gray-200">
                                            <div className="flex justify-between items-center mb-2">
                                                <p className="font-medium text-gray-800">
                                                    {product.product_name}
                                                </p>
                                                <div className="flex items-center gap-4">
                                                    <span className="text-sm font-medium text-gray-700">
                                                        Cantidad: {product.quantity_ordered}
                                                    </span>
                                                    <span className="text-sm font-medium text-gray-700 bg-gray-100 px-2 py-1 rounded">
                                                        {product.unit_acronym} ({product.unit_type})
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="text-right text-sm text-gray-600">
                                                Precio unitario: {formatCurrency(product.unit_price)}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Sección Total y Acciones actualizada */}
                        <div className="bg-gray-50 p-4 md:p-6 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
                            <div className="flex items-center gap-4">
                                <div className="bg-green-100 p-2 rounded-full">
                                    <FaMoneyBillWave className="text-green-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Total a cobrar:</p>
                                    <p className="text-xl font-bold text-gray-900">
                                        {formatCurrency(delivery.order_total)}
                                    </p>
                                </div>
                            </div>

                            {/* Botones de acción actualizados */}
                            <div className="w-full md:w-auto">
                                {delivery.delivery_state === 'READY_TO_DISPATCH' && (
                                    <button
                                        onClick={() => handleStateChange(delivery.delivery_id, 'ON_THE_WAY')}
                                        className="w-full md:w-auto bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg
                               font-medium flex items-center justify-center gap-2 transition-colors"
                                    >
                                        <FaTruckMoving className="text-xl" />
                                        Iniciar Entrega
                                    </button>
                                )}

                                {delivery.delivery_state === 'ON_THE_WAY' && (
                                    <button
                                        onClick={() => handleStateChange(delivery.delivery_id, 'DELIVERED')}
                                        className="w-full md:w-auto bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg
                               font-medium flex items-center justify-center gap-2 transition-colors"
                                    >
                                        <FaCheckCircle className="text-xl" />
                                        Confirmar Entrega
                                    </button>
                                )}

                                {delivery.delivery_state === 'DELIVERED' && (
                                    <div className="w-full bg-green-100 p-4 rounded-lg flex items-center gap-3">
                                        <FaCheckCircle className="text-green-600 text-xl" />
                                        <div>
                                            <p className="font-medium text-green-800">Entrega completada</p>
                                            <p className="text-sm text-green-700">Gracias por tu servicio</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}

                {/* Empty state for each tab */}
                {activeTab === 'pending' && pendingDeliveries.length === 0 && (
                    <div className="bg-white rounded-xl p-8 text-center border border-dashed border-gray-200">
                        <FaClipboardList className="mx-auto text-4xl text-gray-400 mb-4" />
                        <h3 className="text-xl font-medium text-gray-900">No hay entregas pendientes</h3>
                        <p className="mt-2 text-gray-500">¡Todas tus entregas han sido completadas!</p>
                    </div>
                )}

                {activeTab === 'completed' && completedDeliveries.length === 0 && (
                    <div className="bg-white rounded-xl p-8 text-center border border-dashed border-gray-200">
                        <FaCheckCircle className="mx-auto text-4xl text-gray-400 mb-4" />
                        <h3 className="text-xl font-medium text-gray-900">Sin entregas completadas</h3>
                        <p className="mt-2 text-gray-500">Aún no has completado ninguna entrega</p>
                    </div>
                )}
                {showDetailsModal && (
                    <OrderDetailsModal
                        isOpen={showDetailsModal}
                        order={currentOrder}
                        onClose={() => setShowDetailsModal(false)}
                        clientStates={CLIENT_STATES} // Asegúrate de definir CLIENT_STATES
                    />
                )}

            </div>
        </div>
    );
};

export default DeliveriesPage;