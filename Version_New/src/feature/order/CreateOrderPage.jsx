import React from "react";
import { useFormik } from 'formik';
import { FaTimes } from "react-icons/fa";
import ConfirmationModal from "../../components/UI/ConfirmationModal";
import { useOrders } from "../../hooks/useOrders";
import { useProductVariants } from "../../hooks/useProductVariants";
import { orderSchema } from "../../utils/validation/validationSchema";
import Loader from "../../components/UI/Loader";

const CreateOrderPage = () => {
    const { variants, variantsLoading, error: variantsError } = useProductVariants();
    const { createOrder, orderLoading, error: orderError } = useOrders();

    const [isConfirmModalOpen, setIsConfirmModalOpen] = React.useState(false);
    const [orderStatus, setOrderStatus] = React.useState(null);

    const formik = useFormik({
        initialValues: {
            selectedVariants: [],
            orderQuantities: {}
        },
        validationSchema: orderSchema,
        onSubmit: async (values) => {
            try {
                const orderData = {
                    product_ids: values.selectedVariants.map((id) => ({
                        id,
                        quantity: values.orderQuantities[id]
                    }))
                };

                await createOrder(orderData);
                setOrderStatus("success");
                formik.resetForm();
            } catch (err) {
                setOrderStatus("error");
            } finally {
                setIsConfirmModalOpen(false);
            }
        }
    });

    const total = React.useMemo(() => {
        return formik.values.selectedVariants.reduce((acc, variantId) => {
            const variant = variants
                .flatMap(p => p.variants)
                .find(v => v.id === variantId);
            return acc + (variant?.price || 0) * (formik.values.orderQuantities[variantId] || 0);
        }, 0);
    }, [formik.values.selectedVariants, formik.values.orderQuantities, variants]);

    const handleSelectVariant = (variantId, maxStock) => {
        const isSelected = formik.values.selectedVariants.includes(variantId);
        const newSelected = isSelected
            ? formik.values.selectedVariants.filter(id => id !== variantId)
            : [...formik.values.selectedVariants, variantId];

        const newQuantities = { ...formik.values.orderQuantities };
        if (isSelected) {
            delete newQuantities[variantId];
        } else {
            newQuantities[variantId] = 1;
        }

        formik.setValues({
            selectedVariants: newSelected,
            orderQuantities: newQuantities
        });
    };

    const handleQuantityChange = (variantId, value, maxStock) => {
        const qty = Math.max(1, Math.min(parseInt(value) || 1, maxStock));
        formik.setFieldValue(`orderQuantities.${variantId}`, qty);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-6">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-green-900">
                Generar Orden
            </h2>

            {/* Estado de la orden */}
            {orderStatus === "success" && (
                <div className="bg-emerald-50 border-l-4 border-emerald-500 text-emerald-800 p-4 mb-6 rounded">
                    <p className="font-medium">¡Orden creada exitosamente!</p>
                </div>
            )}

            {orderStatus === "error" && (
                <div className="bg-red-50 border-l-4 border-red-500 text-red-800 p-4 mb-6 rounded">
                    <p className="font-medium">Error: {orderError?.message || "No se pudo crear la orden"}</p>
                </div>
            )}

            {/* Estados de carga */}
            {variantsLoading ? (
                <div className="text-center py-8">
                    <Loader className="h-8 w-8 mx-auto animate-spin text-green-600" />
                    <p className="mt-2 text-gray-600">Cargando productos...</p>
                </div>
            ) : variantsError ? (
                <div className="bg-red-50 p-4 rounded-lg max-w-md mx-auto text-center">
                    <p className="text-red-600 font-medium">Error al cargar productos:</p>
                    <p className="text-red-500 text-sm mt-1">{variantsError.message}</p>
                </div>
            ) : variants.length === 0 ? (
                <div className="bg-amber-50 p-4 rounded-lg max-w-md mx-auto text-center">
                    <p className="text-amber-700">No hay productos disponibles</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                    {/* Columna de productos */}
                    <div className="space-y-6">
                        {variants.map((product) => (
                            <div
                                key={product.id}
                                className="bg-white p-4 sm:p-5 rounded-xl shadow-sm border border-gray-100 hover:border-green-100 transition-colors"
                            >
                                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                                    {product.name}
                                </h3>

                                {product.variants?.length > 0 ? (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {product.variants.map((variant) => (
                                            <div
                                                key={variant.id}
                                                className="border p-4 rounded-lg hover:border-green-100 transition-colors"
                                            >
                                                <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                                                    {/* Información de la variante */}
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-2 mb-2">
                                                            <span className="font-medium text-gray-800">
                                                                {variant.unit.acronym}
                                                            </span>
                                                            <span className="text-sm text-gray-500">
                                                                ({variant.unit.unit_type})
                                                            </span>
                                                        </div>
                                                        <div className="flex flex-wrap gap-3 text-sm">
                                                            <div className="bg-sky-100 px-2 py-1 rounded text-sky-800">
                                                                Stock: {variant.quantity}
                                                            </div>
                                                            <div className="bg-emerald-100 px-2 py-1 rounded text-emerald-800">
                                                                ${variant.price}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Controles */}
                                                    <div className="flex items-center gap-2 w-full sm:w-auto">
                                                        {formik.values.selectedVariants.includes(variant.id) ? (
                                                            <div className="flex items-center gap-2">
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
                                                                    className="w-20 border border-green-200 rounded-lg px-2 py-1 text-center text-sm focus:ring-2 focus:ring-green-500"
                                                                />
                                                                <button
                                                                    onClick={() => handleSelectVariant(variant.id)}
                                                                    className="text-red-500 hover:text-red-700 transition-colors"
                                                                >
                                                                    <FaTimes className="w-4 h-4" />
                                                                </button>
                                                            </div>
                                                        ) : (
                                                            <button
                                                                onClick={() => handleSelectVariant(variant.id)}
                                                                className="px-3 py-1.5 bg-green-100 text-green-800 rounded-md hover:bg-green-200 transition-colors text-sm"
                                                            >
                                                                Seleccionar
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="bg-amber-50 p-3 rounded-lg">
                                        <p className="text-amber-700 text-sm">
                                            No hay stock disponible para este producto
                                        </p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Columna de resumen */}
                    <div className="lg:sticky lg:top-4 h-fit">
                        <div className="bg-white p-4 sm:p-5 rounded-xl shadow-sm border border-gray-100">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">
                                Resumen de la Orden
                            </h3>

                            {formik.values.selectedVariants.length > 0 ? (
                                <>
                                    <ul className="divide-y divide-gray-200 mb-6">
                                        {formik.values.selectedVariants.map((variantId) => {
                                            const variant = variants
                                                .flatMap(p => p.variants)
                                                .find(v => v.id === variantId);
                                            const product = variants.find(p =>
                                                p.variants.some(v => v.id === variantId)
                                            );

                                            return (
                                                <li
                                                    key={variantId}
                                                    className="py-3 flex items-center justify-between gap-2 hover:bg-gray-50 transition-colors"
                                                >
                                                    <div className="flex-1">
                                                        <p className="text-sm font-medium text-gray-800">
                                                            {product?.name}
                                                            <span className="ml-2 text-gray-500">
                                                                ({variant?.unit.acronym})
                                                            </span>
                                                        </p>
                                                        <p className="text-xs text-gray-500">
                                                            Cantidad: {formik.values.orderQuantities[variantId]}
                                                        </p>
                                                    </div>
                                                    <div className="flex items-center gap-3">
                                                        <span className="text-sm font-medium">
                                                            ${(variant?.price || 0) * (formik.values.orderQuantities[variantId] || 0)}
                                                        </span>
                                                        <button
                                                            onClick={() => handleSelectVariant(variantId)}
                                                            className="text-red-500 hover:text-red-700 transition-colors"
                                                        >
                                                            <FaTimes className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </li>
                                            );
                                        })}
                                    </ul>

                                    <div className="border-t pt-4">
                                        <div className="flex justify-between items-center">
                                            <span className="font-semibold">Total:</span>
                                            <span className="text-lg font-bold text-green-800">
                                                ${total.toLocaleString()}
                                            </span>
                                        </div>

                                        <button
                                            onClick={() => setIsConfirmModalOpen(true)}
                                            disabled={!formik.isValid || formik.values.selectedVariants.length === 0}
                                            className={`mt-4 w-full py-2.5 px-4 rounded-lg transition-colors
                                                ${!formik.isValid
                                                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                                    : 'bg-green-600 hover:bg-green-700 text-white'}
                                            `}
                                        >
                                            Confirmar Orden
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <p className="text-gray-600 text-center text-sm">
                                        Selecciona productos para generar una orden
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            <ConfirmationModal
                isOpen={isConfirmModalOpen}
                title="Confirmar Orden"
                message="¿Estás seguro de querer crear esta orden?"
                onCancel={() => setIsConfirmModalOpen(false)}
                onConfirm={formik.handleSubmit}
                isLoading={orderLoading}
            />
        </div>
    );
};

export default CreateOrderPage;