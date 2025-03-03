import React, { useState } from "react";

const VendorDeliveryPage = () => {
    // Datos de ejemplo (esto vendría de una API)
    const orders = [
        { id: 1, customer: "Juan Pérez", total: "$30,000", status: "Pendiente" },
        { id: 2, customer: "Ana Gómez", total: "$50,000", status: "Pendiente" },
    ];

    const deliveryPeople = ["Carlos López", "María Rodríguez", "Pedro Sánchez"];

    // Estado para almacenar asignaciones
    const [assignments, setAssignments] = useState({});

    const handleAssign = (orderId, deliveryPerson) => {
        setAssignments({ ...assignments, [orderId]: deliveryPerson });
    };

    return (
        <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-green-700 text-center mb-6">
                    Pendientes de Entrega
            </h2>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                    <thead className="bg-green-600 text-white">
                        <tr>
                            <th className="py-3 px-6 text-left">Cliente</th>
                            <th className="py-3 px-6 text-left">Total</th>
                            <th className="py-3 px-6 text-left">Estado</th>
                            <th className="py-3 px-6 text-left">Domiciliario</th>
                            <th className="py-3 px-6 text-center">Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order.id} className="border-b">
                                <td className="py-4 px-6">{order.customer}</td>
                                <td className="py-4 px-6">{order.total}</td>
                                <td className="py-4 px-6">
                                    <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-lg">
                                        {order.status}
                                    </span>
                                </td>
                                <td className="py-4 px-6">
                                    <select
                                        className="border border-gray-300 rounded-lg p-2 w-full"
                                        value={assignments[order.id] || ""}
                                        onChange={(e) => handleAssign(order.id, e.target.value)}
                                    >
                                        <option value="">Seleccionar</option>
                                        {deliveryPeople.map((person, index) => (
                                            <option key={index} value={person}>
                                                {person}
                                            </option>
                                        ))}
                                    </select>
                                </td>
                                <td className="py-4 px-6 text-center">
                                    <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition">
                                        Confirmar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default VendorDeliveryPage;
