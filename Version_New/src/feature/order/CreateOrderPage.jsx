import React from "react";
import { useFormik } from 'formik';
import { FaTimes } from "react-icons/fa";
import ConfirmationModal from "../../components/UI/ConfirmationModal";
import { addOrder } from "../../services/orderService";
import { useProductVariants } from "../../hooks/useProductVariants";
import { orderSchema } from "../../utils/validation/validationSchema";


const CreateOrderPage = () => {
    const { variants, loading, error } = useProductVariants();
    const [orderStatus, setOrderStatus] = React.useState(null);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = React.useState(false);

    const formik = useFormik({
        initialValues: {
            selectedVariants: [],
            orderQuantities: {}
        },
        validationSchema: orderSchema,
        onSubmit: async (values) => {
            const orderData = {
                user_id: 1,
                product_ids: values.selectedVariants.map((id) => ({
                    id,
                    quantity: values.orderQuantities[id]
                }))
            };

            try {
                await addOrder(orderData);
                setOrderStatus("Orden creada exitosamente");
                setIsConfirmModalOpen(false);
            } catch (err) {
                console.error("Error al crear orden:", err);
                setOrderStatus("Error al crear la orden");
                setIsConfirmModalOpen(false);
            }
        }
    });

    const handleSelectVariant = (variantId, maxStock) => {
        const isSelected = formik.values.selectedVariants.includes(variantId);

        if (isSelected) {
            const newSelected = formik.values.selectedVariants.filter(id => id !== variantId);
            const newQuantities = { ...formik.values.orderQuantities };
            delete newQuantities[variantId];

            formik.setValues({
                selectedVariants: newSelected,
                orderQuantities: newQuantities
            });
        } else {
            formik.setValues({
                selectedVariants: [...formik.values.selectedVariants, variantId],
                orderQuantities: {
                    ...formik.values.orderQuantities,
                    [variantId]: 1
                }
            });
        }
    };

    const handleQuantityChange = (variantId, value, maxStock) => {
        let qty = parseInt(value) || 1;
        qty = Math.max(1, Math.min(qty, maxStock));
        formik.setFieldValue(`orderQuantities.${variantId}`, qty);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-6 sm:py-8 md:py-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-center">
                Generar Orden
            </h2>

            {loading && <p className="text-center">Cargando productos...</p>}
            {error && <p className="text-center text-red-600">Error al cargar productos.</p>}

            {!loading && !error && variants.length === 0 && (
                <p className="text-center text-gray-600">No hay productos disponibles.</p>
            )}

            {!loading && !error && variants.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Columna con la lista de productos */}
                    <div className="md:col-span-2 space-y-6">
                        {variants.map((prod) => (
                            <div key={prod.id} className="bg-white p-4 sm:p-6 rounded-lg shadow">
                                <h3 className="text-xl sm:text-2xl font-semibold mb-4">{prod.name}</h3>
                                {prod.variants && prod.variants.length > 0 ? (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {prod.variants.map((variant) => (
                                            <div
                                                key={variant.id}
                                                className="border p-3 sm:p-4 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between"
                                            >
                                                <div>
                                                    <p className="font-medium text-sm sm:text-base">
                                                        Unidad:{" "}
                                                        <span className="font-semibold">
                                                            {variant.unit.acronym}
                                                        </span>{" "}
                                                        ({variant.unit.unit_type})
                                                    </p>
                                                    <p className="text-gray-600 text-sm sm:text-base">
                                                        Precio:{" "}
                                                        <span className="font-medium">${variant.price}</span>
                                                    </p>
                                                    <p className="text-gray-600 text-sm sm:text-base">
                                                        Stock:{" "}
                                                        <span className="font-medium">{variant.quantity}</span>
                                                    </p>
                                                </div>
                                                <div className="flex items-center mt-3 sm:mt-0">
                                                    <input
                                                        type="checkbox"
                                                        className="h-5 w-5 mr-2"
                                                        checked={formik.values.selectedVariants.includes(variant.id)}
                                                        onChange={() => handleSelectVariant(variant.id, variant.quantity)}
                                                    />
                                                    {formik.values.selectedVariants.includes(variant.id) && (
                                                        <>
                                                            <input
                                                                type="number"
                                                                min="1"
                                                                max={variant.quantity}
                                                                value={formik.values.orderQuantities[variant.id] || 1}
                                                                onChange={(e) =>
                                                                    handleQuantityChange(
                                                                        variant.id,
                                                                        e.target.value,
                                                                        variant.quantity
                                                                    )
                                                                }
                                                                className="w-16 sm:w-20 border border-gray-300 rounded-lg px-2 py-1 mr-2 text-sm"
                                                            />
                                                            <button
                                                                onClick={() => handleSelectVariant(variant.id)}
                                                                className="text-red-500 hover:text-red-700"
                                                            >
                                                                <FaTimes />
                                                            </button>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-gray-600">
                                        No hay <strong>Stock disponible.</strong>
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Columna de resumen */}
                    <div className="md:col-span-1">
                        <div className="bg-white p-4 sm:p-6 rounded-lg shadow sticky top-4 max-h-[calc(100vh-2rem)] overflow-auto">
                            <h3 className="text-xl sm:text-2xl font-semibold mb-4">
                                Resumen de Orden
                            </h3>
                            {formik.values.selectedVariants.length > 0 ? (
                                <>
                                    <ul className="divide-y divide-gray-200">
                                        {formik.values.selectedVariants.map((variantId) => {
                                            let variantData = null;
                                            let productName = "";
                                            variants.forEach((prod) => {
                                                const found = prod.variants.find(
                                                    (v) => v.id === variantId
                                                );
                                                if (found) {
                                                    variantData = found;
                                                    productName = prod.name;
                                                }
                                            });
                                            return (
                                                <li
                                                    key={variantId}
                                                    className="py-2 flex justify-between items-center text-sm sm:text-base"
                                                >
                                                    <span className="w-2/3">
                                                        {productName} - {variantData?.unit?.acronym} x{" "}
                                                        {formik.values.orderQuantities[variantId]}
                                                    </span>
                                                    <span className="w-1/3 text-right">
                                                        $
                                                        {variantData
                                                            ? variantData.price * formik.values.orderQuantities[variantId]
                                                            : 0}
                                                    </span>
                                                    <button
                                                        onClick={() => handleSelectVariant(variantId)}
                                                        className="ml-2 text-red-500 hover:text-red-700"
                                                    >
                                                        <FaTimes />
                                                    </button>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                    <div className="mt-4 flex justify-between font-bold">
                                        <span>Total:</span>
                                        <span>
                                            $
                                            {formik.values.selectedVariants.reduce((acc, variantId) => {
                                                let variant = null;
                                                variants.forEach((prod) => {
                                                    const found = prod.variants.find(
                                                        (v) => v.id === variantId
                                                    );
                                                    if (found) variant = found;
                                                });
                                                const qty = formik.values.orderQuantities[variantId] || 0;
                                                return acc + (variant ? variant.price * qty : 0);
                                            }, 0)}
                                        </span>
                                    </div>
                                    <div className="mt-4 text-center">
                                        <button
                                            onClick={() => setIsConfirmModalOpen(true)}
                                            disabled={!formik.isValid}
                                            className={`bg-green-600 hover:bg-green-700 text-white px-6 py-2 sm:px-8 sm:py-3 rounded-lg transition w-full text-sm sm:text-base ${!formik.isValid ? 'opacity-50 cursor-not-allowed' : ''
                                                }`}
                                        >
                                            Crear Orden
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <p className="text-gray-600 text-sm sm:text-base">
                                    No has seleccionado ninguna variante.
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {formik.errors.selectedVariants && (
                <div className="text-red-500 text-center mt-4">
                    {formik.errors.selectedVariants}
                </div>
            )}

            <ConfirmationModal
                isOpen={isConfirmModalOpen}
                title="Confirmar Orden"
                message="¿Estás seguro de querer crear esta orden?"
                onCancel={() => setIsConfirmModalOpen(false)}
                onConfirm={formik.handleSubmit}
            />
        </div>
    );
};

export default CreateOrderPage;