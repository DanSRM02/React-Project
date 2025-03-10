import { FaCalendarAlt, FaTimes, FaTruckMoving } from "react-icons/fa";
import { DetailItem } from "../datatable/DetailItem";
import { formatCurrency, formatLongDate } from "../../../utils/formatHelpers";
import { ProductCard } from "../product/ProductCard";

export const OrderDetailsModal = ({ isOpen, order, onClose, clientStates }) => {
    if (!isOpen || !order) return null;

    const {
        id = "N/A",
        createdAt = "",
        state = "PENDING",
        total = 0,
        products = []
    } = order;

    // Estilos basados únicamente en state de order
    const getStatusStyles = (orderState) => {
        const statusMap = {
            PENDING: "bg-yellow-100 text-yellow-800",
            APPROVED: "bg-green-100 text-green-800",
            CANCELLED: "bg-red-100 text-red-800",
            default: "bg-gray-100 text-gray-800"
        };
        return statusMap[orderState] || statusMap.default;
    };

    return (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={onClose}>

            <div className="bg-white rounded-xl w-full max-w-2xl shadow-2xl"
                onClick={(e) => e.stopPropagation()}>

                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-800">
                        Orden #{String(id).padStart(5, '0')}
                    </h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <FaTimes className="w-6 h-6" />
                    </button>
                </div>

                {/* Cuerpo */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {/* Sección básica */}
                    <div className="grid grid-cols-1 gap-6">
                        <DetailItem
                            label="Fecha"
                            value={formatLongDate(createdAt)}
                            icon={<FaCalendarAlt className="text-gray-500" />}
                        />

                        <DetailItem
                            label="Estado"
                            value={
                                <span className={`px-3 py-1 rounded-full text-sm ${getStatusStyles(state)}`}>
                                    {clientStates[state] || state}
                                </span>
                            }
                            icon={<FaTruckMoving className="text-gray-500" />}
                        />
                    </div>

                    {/* Productos */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-800">
                            Productos ({products.length})
                        </h3>
                        <div className="space-y-3">
                            {products.map((item, index) => (
                                <ProductCard
                                    key={index}
                                    item={item}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Total */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex justify-between items-center">
                            <span className="font-semibold">Total:</span>
                            <span className="text-xl font-bold text-green-600">
                                {formatCurrency(total)}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-gray-200">
                    <button
                        onClick={onClose}
                        className="w-full py-2 px-4 bg-gray-800 hover:bg-gray-900 text-white rounded-lg">
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    );
};