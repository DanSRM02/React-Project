import React, { useEffect, useState } from "react";
import { FaExclamationCircle, FaTruckMoving, FaCheckCircle, FaBoxOpen } from "react-icons/fa";
import { useAuth } from "../../contexts/AuthContext";
import { useDeliveries } from "../../hooks/useDeliveries";

const OrdersDeliveryPage = () => {
    const [order, setOrder] = useState(null);
    const { user } = useAuth();
    const { findDeliveryById, loadingFind, errorFind, togglerStatus } = useDeliveries();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const response = await findDeliveryById(user.id);

                // Manejar respuesta específica del backend
                if (response.status === 202 && response.data?.code === "NO_CONTENT") {
                    setOrder(null);
                    setError(""); // Limpiar errores previos
                    return;
                }

                if (response.data?.data && response.data.data.length > 0) {
                    setOrder(response.data.data[0]);
                } else {
                    setOrder(null);
                }
            } catch (err) {
                setError(err.response?.data?.message || "Error cargando la orden");
            } finally {
                setLoading(false);
            }
        };

        fetchOrder();
    }, [user.id, findDeliveryById]);

    const handleStateChange = async (newState) => {
        try {
            await togglerStatus(order.order.id, { state: newState });
            // Actualiza el estado local de la orden
            setOrder({ ...order, delivery_state: newState });
        } catch (error) {
            console.error(`Error actualizando estado: ${error.message}`);
        }
    };

    if (loading || loadingFind) return (
        <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
            <div className="space-y-8">
                <div className="h-10 bg-gray-100 rounded-lg w-80 max-w-full"></div>
                <div className="space-y-6">
                    <div className="h-64 bg-gray-50 rounded-xl shadow-sm"></div>
                    <div className="h-4 bg-gray-100 rounded w-48 mx-auto"></div>
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

    if (!order) return (
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
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between gap-4 items-start">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                        <FaTruckMoving className="text-green-600" />
                        Detalles de la Entrega
                    </h1>
                    <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">
                        <span>Orden #</span>
                        <span className="font-medium text-gray-700">{order.order.id}</span>
                    </div>
                </div>

                <div className="flex flex-wrap gap-2">
                    <div className={`px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-2
                        ${order.delivery_state === 'READY_TO_DISPATCH' ? 'bg-yellow-100 text-yellow-800' :
                            order.delivery_state === 'ON_THE_WAY' ? 'bg-blue-100 text-blue-800' :
                                'bg-green-100 text-green-800'}`}>
                        <FaInfoCircle className="text-sm" />
                        {order.delivery_state.replace(/_/g, ' ')}
                    </div>
                    {order.order.priority && (
                        <div className="px-3 py-1.5 rounded-full bg-red-100 text-red-700 text-sm font-medium flex items-center gap-2">
                            <FaExclamationCircle />
                            Prioridad Alta
                        </div>
                    )}
                </div>
            </div>

            {/* Tarjeta Principal */}
            <div className="bg-white rounded-xl shadow-md border border-gray-100 divide-y">
                {/* Sección Cliente */}
                <div className="p-6">
                    <div className="flex items-start gap-4">
                        <div className="bg-green-50 p-3 rounded-lg">
                            <FaUser className="text-green-600 text-xl" />
                        </div>
                        <div>
                            <h3 className="text-lg font-medium text-gray-900">Información del Cliente</h3>
                            <div className="mt-2 space-y-1">
                                <p className="text-gray-700">{order.order.user.individual.name}</p>
                                <div className="flex items-center gap-2 text-gray-500">
                                    <FaMapMarkerAlt className="flex-shrink-0" />
                                    <span>{order.order.user.individual.address}</span>
                                </div>
                                {order.order.user.individual.phone && (
                                    <p className="text-gray-500">Tel: {order.order.user.individual.phone}</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sección Productos */}
                <div className="p-6">
                    <div className="flex items-start gap-4">
                        <div className="bg-green-50 p-3 rounded-lg">
                            <FaBoxOpen className="text-green-600 text-xl" />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-lg font-medium text-gray-900 mb-3">Productos a Entregar</h3>
                            <div className="space-y-3">
                                {order.order.orderLines.map((line) => (
                                    <div key={line.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                        <div>
                                            <p className="font-medium text-gray-900">
                                                {line.product_variant.product.name}
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                {line.product_variant.unit.unit_type}
                                            </p>
                                        </div>
                                        <span className="text-sm font-medium text-gray-700">
                                            {line.quantity} {line.product_variant.unit.acronym}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Acciones */}
                <div className="p-6 bg-gray-50 rounded-b-xl">
                    {order.delivery_state === 'READY_TO_DISPATCH' && (
                        <button
                            onClick={() => handleStateChange('ON_THE_WAY')}
                            className="w-full bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg
                                font-medium flex items-center justify-center gap-2 transition-colors"
                        >
                            <FaTruckMoving className="text-xl" />
                            Iniciar Ruta de Entrega
                        </button>
                    )}

                    {order.delivery_state === 'ON_THE_WAY' && (
                        <button
                            onClick={() => handleStateChange('DELIVERED')}
                            className="w-full bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg
                                font-medium flex items-center justify-center gap-2 transition-colors"
                        >
                            <FaCheckCircle className="text-xl" />
                            Confirmar Entrega Exitosa
                        </button>
                    )}

                    {order.delivery_state === 'DELIVERED' && (
                        <div className="bg-green-100 p-4 rounded-lg flex items-center gap-3">
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
    );
};

export default OrdersDeliveryPage;