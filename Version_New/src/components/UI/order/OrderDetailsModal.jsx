import React from "react";
import { FaTimes } from "react-icons/fa";
import { STATE_LABELS } from "../../../utils/constans/states";
import { ProductCard } from "../product/ProductCard";
import { DetailItem } from "../datatable/DetailItem";
import { useAuth } from "../../../contexts/AuthContext";

const OrderDetailsModal = ({ isOpen, order, onClose }) => {
    const { user } = useAuth();
    const isVendor = user?.role === "vendedor";

    if (!isOpen || !order) return null; // Cambiar condición de renderizado

    const {
        id = "N/A",
        createdAt = "",
        state = "PENDING",
        total = 0,
        individual_name = "N/A",
        email = "N/A",
        address = "N/A",
        products = []
    } = order;

    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        try {
            const options = {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            };
            return new Date(dateString).toLocaleDateString("es-ES", options);
        } catch {
            return "Fecha inválida";
        }
    };

    return (
        <div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={onClose} // Cerrar al hacer clic fuera
        >
            <div
                className="bg-white rounded-xl w-full max-w-2xl shadow-2xl"
                onClick={(e) => e.stopPropagation()} // Prevenir cierre al hacer clic dentro
            >
                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-800">
                        Orden #{String(id).padStart(5, '0')}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 transition-colors p-2 rounded-lg hover:bg-gray-100"
                    >
                        <FaTimes className="w-6 h-6" />
                    </button>
                </div>


                {/* Cuerpo del modal */}
                <div className="p-6 space-y-6">
                    {/* Sección solo para vendedores */}
                    {isVendor && (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <DetailItem
                                        label="Fecha y hora"
                                        value={formatDate(createdAt)}
                                        className="text-blue-600 font-medium"
                                    />
                                    <DetailItem
                                        label="Estado"
                                        value={
                                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${state === "PENDING" ? "bg-yellow-100 text-yellow-800" :
                                                state === "PRIORITIZED" ? "bg-blue-100 text-blue-800" :
                                                    "bg-green-100 text-green-800"
                                                }`}>
                                                {STATE_LABELS[state] || state.toLowerCase()}
                                            </span>
                                        }
                                    />
                                </div>

                                <div className="space-y-4">
                                    <DetailItem label="Cliente" value={individual_name} />
                                    <DetailItem label="Email" value={email} />
                                    <DetailItem label="Dirección" value={address} />
                                </div>
                            </div>

                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h3 className="text-lg font-semibold text-gray-800">
                                    Total: {" "}
                                    <span className="text-2xl text-green-600 ml-2">
                                        ${total.toLocaleString('es-ES', {
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2
                                        })}
                                    </span>
                                </h3>
                            </div>
                        </>
                    )}

                    {/* Listado de productos para todos */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">
                            {isVendor ? "Productos solicitados" : "Tus productos"}
                        </h3>
                        <div className="space-y-4">
                            {products.map((item, index) => (
                                <ProductCard
                                    key={index}
                                    item={item}
                                    showQuantity={isVendor}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-gray-200 bg-gray-50 rounded-b-xl">
                    <button
                        onClick={onClose}
                        className="w-full py-3 px-6 bg-gray-800 hover:bg-gray-900 text-white rounded-lg transition-colors font-medium"
                    >
                        Cerrar detalle
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OrderDetailsModal;