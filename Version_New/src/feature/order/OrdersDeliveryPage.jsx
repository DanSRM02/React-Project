import React, { useEffect, useState } from "react";
import { FaExclamationCircle, FaTruckMoving, FaCheckCircle } from "react-icons/fa";
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
                console.log(user.id);
                const response = await findDeliveryById(user.id);
                console.log(response);
                setOrder(response.data[0]); // Asume que solo hay una orden
            } catch (err) {
                setError("Error cargando la orden");
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
        <div className="text-center py-8">
            <div className="animate-pulse">
                <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4"></div>
                <div className="space-y-4">
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="h-6 bg-gray-200 rounded w-1/3 mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>
                        <div className="h-4 bg-gray-200 rounded w-full"></div>
                    </div>
                </div>
            </div>
        </div>
    );

    if (error || errorFind) return <div className="text-red-500 text-center py-8">Error: {error || errorFind}</div>;

    if (!order) return <div className="text-center py-8">No hay órdenes pendientes de despacho.</div>;

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold mb-6 text-green-600">Órdenes Pendientes de Despacho</h2>

            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow
                relative border-l-4 ${order.order.priority ? 'border-green-500' : 'border-gray-200'}">
                {order.order.priority && (
                    <div className="absolute top-2 right-2 animate-pulse">
                        <FaExclamationCircle className="text-green-600 text-2xl" />
                    </div>
                )}

                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800">
                            Orden #{order.order.id}
                            {order.order.priority && (
                                <span className="ml-2 text-green-600 text-sm">
                                    PRIORITARIA
                                </span>
                            )}
                        </h3>
                        <p className="text-gray-600">{order.order.user.individual.name}</p>
                        <p className="text-sm text-gray-500">{order.order.user.individual.address}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm 
                        ${order.delivery_state === 'READY_TO_DISPATCH' ? 'bg-yellow-100 text-yellow-800' :
                            order.delivery_state === 'ON_THE_WAY' ? 'bg-blue-100 text-blue-800' :
                                'bg-green-100 text-green-800'}`}>
                        {order.delivery_state.replace(/_/g, ' ')}
                    </span>
                </div>

                <div className="border-t border-green-50 pt-4 mt-4">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="font-medium text-gray-700">Productos:</p>
                            <ul className="list-disc pl-5">
                                {order.order.orderLines.map((line) => (
                                    <li key={line.id} className="text-sm">
                                        <span className="font-medium text-gray-700">
                                            Producto #{line.product_variant.id}
                                        </span>
                                        <span className="ml-2 text-gray-500">
                                            ({line.quantity} {line.product_variant.unit.acronym})
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="flex flex-col gap-2">
                            {order.delivery_state === 'READY_TO_DISPATCH' && (
                                <button
                                    onClick={() => handleStateChange('ON_THE_WAY')}
                                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md 
                                        flex items-center gap-2 transition-colors"
                                >
                                    <FaTruckMoving className="text-lg" />
                                    Iniciar Entrega
                                </button>
                            )}

                            {order.delivery_state === 'ON_THE_WAY' && (
                                <button
                                    onClick={() => handleStateChange('DELIVERED')}
                                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md 
                                        flex items-center gap-2 transition-colors"
                                >
                                    <FaCheckCircle className="text-lg" />
                                    Marcar como Entregado
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-8 text-center text-green-500 text-sm">
                <p>Total de órdenes cargadas: 1</p>
            </div>
        </div>
    );
};

export default OrdersDeliveryPage;