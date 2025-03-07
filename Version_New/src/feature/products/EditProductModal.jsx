import React, { useState, useEffect } from "react";
import { FaTimes, FaSpinner } from "react-icons/fa";
import { FiCheckCircle, FiAlertCircle } from "react-icons/fi";
import { useProductVariants } from "../../hooks/useProductVariants";
import { useProducts } from "../../hooks/useProduct";
import Label from "../../components/UI/form/Label";
import Input from "../../components/UI/form/Input";

const EditProductModal = ({ isOpen, onClose, product, onSuccess }) => {
    const { updateVariant } = useProductVariants();
    const { handlerUpdateProduct } = useProducts();
    const [productName, setProductName] = useState("");
    const [variantsForm, setVariantsForm] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showSuccess, setShowSuccess] = useState(false);

    useEffect(() => {
        if (product) {
            setProductName(product.name);
            setVariantsForm(product.variants.map(v => ({
                id: v.id,
                quantity: v.quantity,
                price: v.price,
                unit_id: v.unit.id,
                product_id: product.id,
                unitText: `${v.unit.acronym} (${v.unit.unit_type})`
            })));
        }
    }, [product]);

    const handleVariantChange = (index, field, value) => {
        // Validación numérica
        if (['quantity', 'price'].includes(field) && value < 0) {
            setError("Los valores no pueden ser negativos");
            return;
        }

        setError(null);
        setVariantsForm(prev => {
            const updated = [...prev];
            updated[index] = { ...updated[index], [field]: value };
            return updated;
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            // Actualizar nombre del producto si cambió
            if (productName !== product.name) {
                await handlerUpdateProduct(product.id, { name: productName });
            }

            // Actualizar variantes
            await Promise.all(
                variantsForm.map(variant =>
                    updateVariant(variant.id, {
                        quantity: Number(variant.quantity),
                        price: Number(variant.price),
                        unit_id: variant.unit_id,
                        product_id: variant.product_id
                    })
                )
            );

            // Feedback de éxito
            setShowSuccess(true);
            setTimeout(() => {
                onClose();
                onSuccess?.();
            }, 1500);

        } catch (err) {
            console.error("Error actualizando:", err);
            setError(err.message || "Error al guardar los cambios");
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 max-w-lg w-full mx-4 shadow-2xl transform transition-all">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
                    aria-label="Cerrar modal"
                >
                    <FaTimes className="w-6 h-6" />
                </button>

                <div className="space-y-6">
                    <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center 
                            ${showSuccess ? 'bg-green-100' : 'bg-gray-100'}`}>
                            {showSuccess ? (
                                <FiCheckCircle className="text-green-600 text-xl" />
                            ) : (
                                <FiAlertCircle className="text-blue-600 text-xl" />
                            )}
                        </div>
                        <h2 className="text-xl font-bold text-gray-800">
                            {showSuccess ? "¡Cambios guardados!" : `Editar: ${productName}`}
                        </h2>
                    </div>

                    {showSuccess ? (
                        <div className="bg-green-50 p-4 rounded-lg flex items-center gap-3">
                            <FiCheckCircle className="text-green-600 flex-shrink-0" />
                            <div>
                                <p className="text-green-800 font-medium">
                                    Los cambios se guardaron correctamente
                                </p>
                                <p className="text-green-700 text-sm">Redirigiendo...</p>
                            </div>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {error && (
                                <div className="bg-red-50 p-4 rounded-lg flex items-center gap-3">
                                    <FiAlertCircle className="text-red-600 flex-shrink-0" />
                                    <p className="text-red-800 font-medium">{error}</p>
                                </div>
                            )}

                            <div>
                                <Label htmlFor="productName">Nombre del Producto</Label>
                                <Input
                                    type="text"
                                    id="productName"
                                    value={productName}
                                    onChange={(e) => setProductName(e.target.value)}
                                    showIcon={false}
                                    required
                                    disabled={loading}
                                    className="disabled:bg-gray-100"
                                />
                            </div>

                            <div className="space-y-4">
                                {variantsForm.map((variant, index) => (
                                    <div key={variant.id} className="border border-gray-200 rounded-lg p-4">
                                        <div className="flex items-center gap-2 mb-3">
                                            <span className="text-sm font-medium text-gray-600">
                                                Variante {index + 1}
                                            </span>
                                            <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                                                {variant.unitText}
                                            </span>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div>
                                                <Label htmlFor={`quantity-${variant.id}`}>
                                                    Cantidad por unidad
                                                </Label>
                                                <Input
                                                    type="number"
                                                    id={`quantity-${variant.id}`}
                                                    value={variant.quantity}
                                                    onChange={(e) =>
                                                        handleVariantChange(index, "quantity", e.target.value)
                                                    }
                                                    min="0"
                                                    step="1"
                                                    required
                                                    disabled={loading}
                                                    showIcon={false}
                                                    className="disabled:bg-gray-100"
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor={`price-${variant.id}`}>
                                                    Precio (COP)
                                                </Label>
                                                <div className="relative">
                                                    <Input
                                                        type="number"
                                                        id={`price-${variant.id}`}
                                                        value={variant.price}
                                                        onChange={(e) =>
                                                            handleVariantChange(index, "price", e.target.value)
                                                        }
                                                        min="0"
                                                        step="0.01"
                                                        required
                                                        disabled={loading}
                                                        showIcon={false}
                                                        className="disabled:bg-gray-100 pl-7"
                                                    />
                                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                                                        $
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg
                                    font-medium transition-colors flex items-center justify-center gap-2
                                    disabled:opacity-75 disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <>
                                        <FaSpinner className="animate-spin" />
                                        Guardando...
                                    </>
                                ) : (
                                    "Guardar cambios"
                                )}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EditProductModal;