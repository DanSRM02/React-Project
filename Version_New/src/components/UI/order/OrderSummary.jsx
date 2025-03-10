import { FaTimes } from "react-icons/fa";
import { InfoAlert } from "../alert/InfoAlert";

export const OrderSummary = ({ selectedVariants, quantities, variantMap, total, isValid, onConfirm }) => (
    <div className="lg:sticky lg:top-4 h-fit">
        <div className="bg-white p-4 sm:p-5 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Resumen de la Orden</h3>

            {selectedVariants.length > 0 ? (
                <>
                    <ul className="divide-y divide-gray-200 mb-6">
                        {selectedVariants.map(variantId => {
                            const variant = variantMap[variantId];
                            return (
                                <li
                                    key={variantId}
                                    className="py-3 flex items-center justify-between gap-2 hover:bg-gray-50 transition-colors"
                                >
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-gray-800">
                                            {variant.productName}
                                            <span className="ml-2 text-gray-500">({variant.unit.acronym})</span>
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            Cantidad: {quantities[variantId]}
                                            {variant.quantity < 10 && (
                                                <span className="ml-2 text-amber-600">
                                                    (Quedan {variant.quantity})
                                                </span>
                                            )}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="text-sm font-medium">
                                            ${(variant.price * quantities[variantId]).toLocaleString()}
                                        </span>
                                        <button
                                            onClick={() => handleSelectVariant(variantId)}
                                            className="text-red-500 hover:text-red-700 transition-colors"
                                            aria-label="Eliminar producto"
                                        >
                                            <FaTimes className="w-4 h-4" />
                                        </button>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>

                    <div className="border-t pt-4">
                        <div className="flex justify-between items-center mb-4">
                            <span className="font-semibold">Total:</span>
                            <span className="text-lg font-bold text-green-800">
                                ${total.toLocaleString()}
                            </span>
                        </div>

                        <button
                            onClick={onConfirm}
                            disabled={!isValid}
                            className={`w-full py-2.5 px-4 rounded-lg transition-colors ${!isValid
                                ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                : 'bg-green-600 hover:bg-green-700 text-white'
                                }`}
                        >
                            Confirmar Orden
                        </button>
                    </div>
                </>
            ) : (
                <InfoAlert message="Selecciona productos para generar una orden" />
            )}
        </div>
    </div>
);