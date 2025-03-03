import React, { useState } from "react";

const OrdersPendingPage = () => {
    // Datos de ejemplo (esto debería venir de una API)
    const orders = [
        { id: 1, deliveryPerson: "Carlos López", customer: "Juan Pérez", total: "$30,000", status: "Entregado" },
        { id: 2, deliveryPerson: "María Rodríguez", customer: "Ana Gómez", total: "$50,000", status: "Entregado" },
        { id: 3, deliveryPerson: "Carlos López", customer: "Pedro Sánchez", total: "$40,000", status: "Entregado" },
        { id: 4, deliveryPerson: "Carlos López", customer: "Juan Pérez", total: "$30,000", status: "Entregado" },
        { id: 5, deliveryPerson: "María Rodríguez", customer: "Ana Gómez", total: "$50,000", status: "Entregado" },
        { id: 6, deliveryPerson: "Carlos López", customer: "Pedro Sánchez", total: "$40,000", status: "Entregado" },
        { id: 7, deliveryPerson: "Luis Ramírez", customer: "Sofía Torres", total: "$28,000", status: "Entregado" },
        { id: 8, deliveryPerson: "Luis Ramírez", customer: "Fernando Díaz", total: "$45,000", status: "Entregado" },
        { id: 9, deliveryPerson: "Andrea Mendoza", customer: "Carla Fernández", total: "$35,500", status: "Entregado" },
        { id: 10, deliveryPerson: "Andrea Mendoza", customer: "Roberto Méndez", total: "$60,000", status: "Entregado" },
        { id: 11, deliveryPerson: "Carlos López", customer: "Juliana Castillo", total: "$55,000", status: "Entregado" },
        { id: 12, deliveryPerson: "María Rodríguez", customer: "Alejandro Suárez", total: "$42,500", status: "Entregado" },
        { id: 13, deliveryPerson: "Luis Ramírez", customer: "Valeria Martínez", total: "$38,000", status: "Entregado" },
        { id: 14, deliveryPerson: "Andrea Mendoza", customer: "Elena Gómez", total: "$47,000", status: "Entregado" },
        { id: 15, deliveryPerson: "Carlos López", customer: "Daniel Herrera", total: "$52,000", status: "Entregado" },
        { id: 16, deliveryPerson: "Luis Ramírez", customer: "Gabriela Ruiz", total: "$33,500", status: "Entregado" },
        { id: 17, deliveryPerson: "María Rodríguez", customer: "Miguel Ángel", total: "$48,000", status: "Entregado" },
        { id: 18, deliveryPerson: "Andrea Mendoza", customer: "Lucía Torres", total: "$39,000", status: "Entregado" },
    ];

    const [selectedDeliveryPerson, setSelectedDeliveryPerson] = useState("");

    // Filtrar órdenes por domiciliario seleccionado
    const filteredOrders = orders.filter(order =>
        selectedDeliveryPerson ? order.deliveryPerson === selectedDeliveryPerson : true
    );

    return (
        <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-green-700 text-center mb-6">Historial de Órdenes</h2>

            {/* Filtro de domiciliario */}
            <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">Seleccionar Cliente:</label>
                <select
                    className="border border-gray-300 rounded-lg p-2 w-full"
                    value={selectedDeliveryPerson}
                    onChange={(e) => setSelectedDeliveryPerson(e.target.value)}
                >
                    <option value="">Todos</option>
                    <option value="Carlos López">Carlos López</option>
                    <option value="María Rodríguez">María Rodríguez</option>
                </select>
            </div>

            {/* Tabla de órdenes */}
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                    <thead className="bg-green-600 text-white">
                        <tr>
                            <th className="py-3 px-6 text-left">Cliente</th>
                            <th className="py-3 px-6 text-left">Total</th>
                            <th className="py-3 px-6 text-left">Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredOrders.length > 0 ? (
                            filteredOrders.map((order) => (
                                <tr key={order.id} className="border-b">
                                    <td className="py-4 px-6">{order.customer}</td>
                                    <td className="py-4 px-6">{order.total}</td>
                                    <td className="py-4 px-6">
                                        <span
                                            className={`px-3 py-1 rounded-lg ${order.status === "Entregado"
                                                ? "bg-yellow-100 text-yellow-700"
                                                : order.status === "Entregado"
                                                    ? "bg-blue-100 text-blue-700"
                                                    : "bg-green-100 text-green-700"
                                                }`}
                                        >
                                            {order.status}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3" className="py-4 px-6 text-center text-gray-500">
                                    No hay órdenes asignadas.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default OrdersPendingPage;
