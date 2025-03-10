import React, { useEffect } from "react";
import { useFormik } from 'formik';
import ConfirmationModal from "../../components/UI/alert/ConfirmationModal";
import { useOrders } from "../../hooks/useOrders";
import { useProductVariants } from "../../hooks/useProductVariants";
import { orderSchema } from "../../utils/validation/validationSchema";
import Loader from "../../components/UI/Loader";
import { OrderSummary } from "../../components/UI/order/OrderSummary";
import { ProductSection } from "../../components/UI/product/ProductSection";
import { InfoAlert } from "../../components/UI/alert/InfoAlert";
import { ErrorAlert } from "../../components/UI/alert/ErrorAlert";
import { useAutoClearAlert } from "./hooks/useAutoClearAlert";
import { useAuth } from "../../contexts/AuthContext";
import { Navigate } from "react-router-dom";

const CreateOrderPage = () => {
    const { hasAddress, authLoading } = useAuth();        
    const { variants, variantsLoading, error: variantsError } = useProductVariants();
    const { createOrder, orderLoading, error: orderError } = useOrders();
    const [isConfirmModalOpen, setIsConfirmModalOpen] = React.useState(false);

    // Mejora: Hook personalizado para limpiar alertas automáticamente
    const [orderStatus, setOrderStatus, clearStatus] = useAutoClearAlert(5000);

    if (authLoading) {
        return <Loader message="Verificando datos de usuario..." />;
    }        

    // Redirección condicional directa en el render
    if (!hasAddress) {
        return <Navigate to="/client/account" replace />;
    }

    const formik = useFormik({
        initialValues: {
            selectedVariants: [],
            orderQuantities: {}
        },
        validationSchema: orderSchema,
        onSubmit: async (values) => {
            clearStatus();
            try {
                await createOrder({
                    product_ids: values.selectedVariants.map(id => ({
                        id,
                        quantity: values.orderQuantities[id]
                    }))
                });
                setOrderStatus({ type: "success", message: "¡Orden creada exitosamente!" });
                formik.resetForm();
            } catch (err) {
                setOrderStatus({ type: "error", message: orderError?.message || "Error al crear la orden" });
            } finally {
                setIsConfirmModalOpen(false);
            }
        }
    });

    // Memoizado para mejor rendimiento
    const total = React.useMemo(() => {
        return formik.values.selectedVariants.reduce((acc, variantId) => {
            const variant = variants
                .flatMap(p => p.variants)
                .find(v => v.id === variantId);
            return acc + (variant?.price || 0) * (formik.values.orderQuantities[variantId] || 0);
        }, 0);
    }, [formik.values.selectedVariants, formik.values.orderQuantities, variants]);

    // Memoizado para evitar recreación en cada render
    const variantMap = React.useMemo(() => {
        return variants.reduce((acc, product) => {
            product.variants.forEach(variant => {
                acc[variant.id] = { ...variant, productName: product.name };
            });
            return acc;
        }, {});
    }, [variants]);

    const handleSelectVariant = (variantId, maxStock) => {
        const isSelected = formik.values.selectedVariants.includes(variantId);

        formik.setValues({
            selectedVariants: isSelected
                ? formik.values.selectedVariants.filter(id => id !== variantId)
                : [...formik.values.selectedVariants, variantId],
            orderQuantities: {
                ...formik.values.orderQuantities,
                ...(isSelected
                    ? { [variantId]: undefined }
                    : { [variantId]: 1 }
                )
            }
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

            {/* Alertas de estado */}
            {orderStatus && (
                <div className={`p-4 mb-6 rounded-lg border-l-4 ${orderStatus.type === "success"
                    ? "bg-emerald-50 border-emerald-500 text-emerald-800"
                    : "bg-red-50 border-red-500 text-red-800"
                    }`}>
                    <p className="font-medium">{orderStatus.message}</p>
                </div>
            )}

            {/* Contenido principal */}
            {variantsLoading ? (
                <div className="text-center py-8">
                    <Loader className="h-8 w-8 mx-auto animate-spin text-green-600" />
                    <p className="mt-2 text-gray-600">Cargando productos...</p>
                </div>
            ) : variantsError ? (
                <ErrorAlert message={variantsError.message} />
            ) : variants.length === 0 ? (
                <InfoAlert message="No hay productos disponibles" />
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                    {/* Lista de productos */}
                    <div className="space-y-6">
                        {variants.map((product) => (
                            <ProductSection
                                key={product.id}
                                product={product}
                                formik={formik}
                                variantMap={variantMap}
                                onSelect={handleSelectVariant}
                                onQuantityChange={handleQuantityChange}
                            />
                        ))}
                    </div>

                    {/* Resumen de orden */}
                    <OrderSummary
                        selectedVariants={formik.values.selectedVariants}
                        quantities={formik.values.orderQuantities}
                        variantMap={variantMap}
                        total={total}
                        isValid={formik.isValid}
                        onConfirm={() => setIsConfirmModalOpen(true)}
                    />
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