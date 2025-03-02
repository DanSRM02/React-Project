import React, { useEffect, useState } from "react";
import { FaExclamationCircle, FaTruckMoving, FaCheckCircle } from "react-icons/fa";
import { useAuth } from "../../contexts/AuthContext";

// Datos mockeados
const mockOrders = [
    {
        id: 1,
        status: "PENDIENTE",
        isPriority: true,
        order: {
            id: 1001,
            clientName: "Industrias ACME",
            address: "Calle 123 #45-67, Zona Industrial",
            products: [
                { id: 501, name: "Oxígeno Industrial Grado A", quantity: 15 },
                { id: 502, name: "Nitrógeno Comprimido", quantity: 8 }
            ]
        }
    },
    {
        id: 2,
        status: "EN_CAMINO",
        isPriority: false,
        order: {
            id: 1002,
            clientName: "Taller Metalúrgico Herrera",
            address: "Avenida Principal #98-76",
            products: [
                { id: 503, name: "Acetileno para Soldadura", quantity: 12 },
                { id: 504, name: "Argón Ultra Puro", quantity: 5 }
            ]
        }
    },
    {
        id: 3,
        status: "PENDIENTE",
        isPriority: false,
        order: {
            id: 1003,
            clientName: "Fábrica de Vidrios Seguros",
            address: "Carrera 45 #12-34, Bodega 5",
            products: [
                { id: 505, name: "CO2 para Enfriamiento", quantity: 20 }
            ]
        }
    }
];

const OrdersDeliveryPage = () => {
    const { user } = useAuth();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        // Simular llamada API con delay
        const fetchPendingOrders = async () => {
            try {
                await new Promise(resolve => setTimeout(resolve, 1000)); // Simular delay de carga
                setOrders(mockOrders);
            } catch (err) {
                setError("Error cargando órdenes mockeadas");
            } finally {
                setLoading(false);
            }
        };

        fetchPendingOrders();
    }, []);

    const handleStatusUpdate = (orderId, newStatus) => {
        // Actualización local de estado sin backend
        setOrders(orders.map(order =>
            order.id === orderId ? { ...order, status: newStatus } : order
        ));
    };

    if (loading) return (
        <div className="text-center py-8">
            <div className="animate-pulse">
                <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4"></div>
                <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="bg-white rounded-lg shadow-md p-6">
                            <div className="h-6 bg-gray-200 rounded w-1/3 mb-2"></div>
                            <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>
                            <div className="h-4 bg-gray-200 rounded w-full"></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    if (error) return <div className="text-red-500 text-center py-8">Error: {error}</div>;

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold mb-6">Órdenes Pendientes de Despacho (Modo Demo)</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {orders.map((order) => (
                    <div key={order.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow
                        relative border-l-4 ${order.isPriority ? 'border-red-500' : 'border-gray-200'}">

                        {order.isPriority && (
                            <div className="absolute top-2 right-2 animate-pulse">
                                <FaExclamationCircle className="text-red-500 text-2xl" />
                            </div>
                        )}

                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="text-lg font-semibold">
                                    Orden #{order.order.id}
                                    {order.isPriority && (
                                        <span className="ml-2 text-red-500 text-sm">
                                            PRIORITARIA
                                        </span>
                                    )}
                                </h3>
                                <p className="text-gray-600">{order.order.clientName}</p>
                                <p className="text-sm text-gray-500">{order.order.address}</p>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-sm 
                                ${order.status === 'PENDIENTE' ? 'bg-yellow-100 text-yellow-800' :
                                    order.status === 'EN_CAMINO' ? 'bg-blue-100 text-blue-800' :
                                        'bg-green-100 text-green-800'}`}>
                                {order.status.replace('_', ' ')}
                            </span>
                        </div>

                        <div className="border-t pt-4 mt-4">
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="font-medium">Productos:</p>
                                    <ul className="list-disc pl-5">
                                        {order.order.products.map((product) => (
                                            <li key={product.id} className="text-sm">
                                                <span className="font-medium">{product.name}</span>
                                                <span className="ml-2 text-gray-500">
                                                    ({product.quantity} cilindros)
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="flex flex-col gap-2">
                                    {order.status === 'PENDIENTE' && (
                                        <button
                                            onClick={() => handleStatusUpdate(order.id, 'EN_CAMINO')}
                                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 
                                                flex items-center gap-2 transition-colors"
                                        >
                                            <FaTruckMoving className="text-lg" />
                                            Iniciar Entrega
                                        </button>
                                    )}

                                    {order.status === 'EN_CAMINO' && (
                                        <button
                                            onClick={() => handleStatusUpdate(order.id, 'ENTREGADO')}
                                            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 
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
                ))}
            </div>

            <div className="mt-8 text-center text-gray-500 text-sm">
                <p>Modo demostración usando datos mockeados</p>
                <p>Total de órdenes cargadas: {orders.length}</p>
            </div>
        </div>
    );
};

export default OrdersDeliveryPage;