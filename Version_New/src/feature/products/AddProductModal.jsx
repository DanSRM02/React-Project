import React, { useState, useEffect } from "react";
import { FaTimes, FaSpinner } from "react-icons/fa";
import { FiAlertCircle, FiCheckCircle, FiInfo } from "react-icons/fi";
import { useProductVariants } from "../../hooks/useProductVariants";
import { useUnits } from "../../hooks/useUnits";
import Label from "../../components/UI/form/Label";
import Input from "../../components/UI/form/Input";

const AddProductModal = ({ isOpen, onClose, product, variant, products = [], onSuccess }) => {
    const [variantForm, setVariantForm] = useState({
        quantity: "",
        price: "",
        unit_id: "",
        product_id: product?.id || ""
    });

    const [localError, setLocalError] = useState(null);
    const [showSuccess, setShowSuccess] = useState(false);
    const { addVariant, updateVariant, loading, error } = useProductVariants();
    const { units, loading: unitsLoading, error: unitsError } = useUnits();

    useEffect(() => {
        if (!isOpen) {
            // Resetear estado al cerrar
            setVariantForm({
                quantity: "",
                price: "",
                unit_id: "",
                product_id: product?.id || ""
            });
            setLocalError(null);
            setShowSuccess(false);
        }
    }, [isOpen]);

    useEffect(() => {
        if (variant) {
            setVariantForm({
                quantity: variant.quantity,
                price: variant.price,
                unit_id: variant.unit.id,
                product_id: variant.product.id,
            });
        }
    }, [variant]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Validación en tiempo real
        if ((name === 'quantity' || name === 'price') && value < 0) {
            setLocalError("Los valores no pueden ser negativos");
            return;
        }

        setLocalError(null);
        setVariantForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validación adicional
        if (!variantForm.product_id || !variantForm.unit_id) {
            setLocalError("Debes seleccionar un producto y una unidad");
            return;
        }

        try {
            const payload = {
                quantity: Number(variantForm.quantity),
                price: Number(variantForm.price),
                unit_id: variantForm.unit_id,
                product_id: variantForm.product_id,
            };

            if (variant) {
                await updateVariant(variant.id, payload);
            } else {
                await addVariant(payload);
            }

            // Feedback de éxito
            setShowSuccess(true);
            setTimeout(() => {
                onClose();
                onSuccess?.();
            }, 1500);

        } catch (err) {
            console.error("Error al enviar datos de la variante:", err);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4 shadow-2xl transform transition-all">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
                    aria-label="Cerrar modal"
                >
                    <FaTimes className="w-6 h-6" />
                </button>

                <div className="space-y-4">
                    <div className="flex items-center gap-2">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center 
                            ${showSuccess ? 'bg-green-100' : 'bg-gray-100'}`}>
                            {showSuccess ? (
                                <FiCheckCircle className="text-green-600 text-xl" />
                            ) : variant ? (
                                <FiInfo className="text-blue-600 text-xl" />
                            ) : (
                                <FiInfo className="text-gray-600 text-xl" />
                            )}
                        </div>
                        <h2 className="text-xl font-bold text-gray-800">
                            {showSuccess ? "¡Éxito!" : variant ? "Editar Variante" : "Nueva Variante"}
                        </h2>
                    </div>

                    {showSuccess ? (
                        <div className="bg-green-50 p-4 rounded-lg flex items-center gap-3">
                            <FiCheckCircle className="text-green-600 flex-shrink-0" />
                            <div>
                                <p className="text-green-800 font-medium">
                                    Variante {variant ? "actualizada" : "creada"} correctamente
                                </p>
                                <p className="text-green-700 text-sm">Redirigiendo...</p>
                            </div>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Mensajes de error */}
                            {(error || localError || unitsError) && (
                                <div className="bg-red-50 p-4 rounded-lg flex items-center gap-3">
                                    <FiAlertCircle className="text-red-600 flex-shrink-0" />
                                    <div>
                                        <p className="text-red-800 font-medium">
                                            {error?.message || localError || unitsError}
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* Campos del formulario */}
                            <div className="space-y-4">
                                <div>
                                    <Label htmlFor="product_id">Producto</Label>
                                    <select
                                        name="product_id"
                                        id="product_id"
                                        value={variantForm.product_id}
                                        onChange={handleChange}
                                        required
                                        disabled={!!product || loading}
                                        className="w-full border border-gray-200 rounded-lg px-4 py-3 mt-1
                                            focus:ring-2 focus:ring-green-500 focus:border-green-500
                                            disabled:bg-gray-100 disabled:cursor-not-allowed"
                                    >
                                        {product ? (
                                            <option value={product.id}>{product.name}</option>
                                        ) : (
                                            <>
                                                <option value="">Selecciona un producto</option>
                                                {products.map((prod) => (
                                                    <option key={prod.id} value={prod.id}>
                                                        {prod.name}
                                                    </option>
                                                ))}
                                            </>
                                        )}
                                    </select>
                                </div>

                                <div>
                                    <Label htmlFor="unit_id">Unidad de medida</Label>
                                    <div className="relative">
                                        <select
                                            name="unit_id"
                                            id="unit_id"
                                            value={variantForm.unit_id}
                                            onChange={handleChange}
                                            required
                                            disabled={loading}
                                            className="w-full border border-gray-200 rounded-lg px-4 py-3 mt-1
                                                focus:ring-2 focus:ring-green-500 focus:border-green-500
                                                disabled:bg-gray-100 disabled:cursor-not-allowed"
                                        >
                                            <option value="">Selecciona una unidad</option>
                                            {units.map((unit) => (
                                                <option key={unit.id} value={unit.id}>
                                                    {unit.acronym} ({unit.unit_type})
                                                </option>
                                            ))}
                                        </select>
                                        {unitsLoading && (
                                            <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                                <FaSpinner className="animate-spin text-gray-400" />
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="quantity">Cantidad por unidad</Label>
                                        <Input
                                            type="number"
                                            name="quantity"
                                            min="1"
                                            max="50"
                                            step="1"
                                            id="quantity"
                                            value={variantForm.quantity}
                                            onChange={handleChange}
                                            required
                                            disabled={loading}
                                            showIcon={false}
                                            className="disabled:bg-gray-100"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="price">Precio (COP)</Label>
                                        <div className="relative">
                                            <Input
                                                type="number"
                                                name="price"
                                                id="price"
                                                min="0"
                                                step="0.01"
                                                value={variantForm.price}
                                                onChange={handleChange}
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
                                        Procesando...
                                    </>
                                ) : variant ? (
                                    "Actualizar variante"
                                ) : (
                                    "Crear nueva variante"
                                )}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AddProductModal;