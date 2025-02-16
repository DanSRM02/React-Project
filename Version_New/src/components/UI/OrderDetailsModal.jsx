import React from "react";
import { FaTimes } from "react-icons/fa";

const OrderDetailsModal = ({ order, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-lg w-full mx-4 shadow-lg">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-2xl font-bold text-gray-800">
                        Detalles de la Orden #{order.id}
                    </h3>
                    <button onClick={onClose} className="text-gray-600 hover:text-gray-800">
                        <FaTimes size={24} />
                    </button>
                </div>
                <div className="mb-4 space-y-1">
                    <p className="text-gray-600">
                        <strong>Fecha:</strong> {order.createdAt}
                    </p>
                    <p className="text-gray-600">
                        <strong>Estado:</strong> {order.state.toLowerCase()}
                    </p>
                    <p className="text-gray-600">
                        <strong>Cliente:</strong> {order.user?.individual?.name || "N/A"}
                    </p>
                    <p className="text-gray-600">
                        <strong>Email:</strong> {order.user?.individual?.email || "N/A"}
                    </p>
                    <p className="text-gray-600">
                        <strong>Dirección:</strong> {order.user?.individual?.address || "N/A"}
                    </p>
                </div>
                <div className="mb-4">
                    <h4 className="text-xl font-semibold mb-2">Productos</h4>
                    {order.productList && order.productList.length > 0 ? (
                        <div className="space-y-3">
                            {order.productList.map((prod) => (
                                <div key={prod.id} className="border p-3 rounded">
                                    <p className="text-gray-800 font-medium">{prod.name}</p>
                                    {prod.variants && prod.variants.length > 0 ? (
                                        <ul className="ml-4 mt-2 list-disc text-gray-600 text-sm">
                                            {prod.variants.map((variant) => (
                                                <li key={variant.id}>
                                                    {variant.unit.acronym} ({variant.unit.unitType}) - Precio: ${variant.price} - Stock: {variant.quantity}
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p className="text-gray-600 text-sm">No hay variantes para este producto.</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-600">No hay productos asociados a esta orden.</p>
                    )}
                </div>
                <div className="mb-4 text-right font-bold text-lg">
                    Total: ${order.total}
                </div>
                <div className="text-right">
                    <button
                        onClick={onClose}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition"
                    >
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OrderDetailsModal;
