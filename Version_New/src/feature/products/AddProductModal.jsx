import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import { useProductVariants } from "../../hooks/useProductVariants";
import { useUnits } from "../../hooks/useUnits";
import Label from "../../components/UI/Label";
import Input from "../../components/UI/Input";

const AddProductModal = ({ isOpen, onClose, product, variant, products = [] }) => {
    const initialProductId = product
        ? product.id
        : variant
            ? variant.product.id
            : "";

    const [variantForm, setVariantForm] = useState({
        quantity: "",
        price: "",
        unit_id: "",
        product_id: initialProductId,
    });

    const { addVariant, updateVariant, loading, error } = useProductVariants();
    const { units, loading: unitsLoading, error: unitsError } = useUnits();

    useEffect(() => {
        if (variant) {
            setVariantForm({
                quantity: variant.quantity,
                price: variant.price,
                unit_id: variant.unit.id,
                product_id: variant.product.id,
            });
        } else if (product) {
            setVariantForm((prev) => ({ ...prev, product_id: product.id }));
        } else {
            setVariantForm({
                quantity: "",
                price: "",
                unit_id: "",
                product_id: "",
            });
        }
    }, [variant, product]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setVariantForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (variant) {
                await updateVariant(variant.id, {
                    quantity: variantForm.quantity,
                    price: variantForm.price,
                    unit_id: variantForm.unit_id,
                    product_id: variantForm.product_id,
                });
            } else {
                await addVariant({
                    quantity: variantForm.quantity,
                    price: variantForm.price,
                    unit_id: variantForm.unit_id,
                    product_id: variantForm.product_id,
                });
            }
            onClose();
        } catch (err) {
            console.error("Error al enviar datos de la variante:", err);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-lg transform transition-all">
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                >
                    <FaTimes className="w-5 h-5" />
                </button>
                <h2 className="text-xl font-bold mb-4">
                    {variant ? "Editar Variante" : "Crear Variante"}
                </h2>
                {loading && <p className="text-sm text-gray-500">Guardando...</p>}
                {error && (
                    <p className="text-sm text-red-500">
                        Error: {error.message || "Ocurrió un error"}
                    </p>
                )}
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Primera sección: Producto y Unidad */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="product_id">Producto</Label>
                            {products && products.length > 0 ? (
                                <select
                                    name="product_id"
                                    id="product_id"
                                    value={variantForm.product_id}
                                    onChange={handleChange}
                                    required
                                    className="w-full border border-gray-300 rounded px-3 py-2 mt-1 bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-600"
                                >
                                    <option value="">Selecciona un producto</option>
                                    {products.map((prod) => (
                                        <option key={prod.id} value={prod.id}>
                                            {prod.name}
                                        </option>
                                    ))}
                                </select>
                            ) : (
                                <p className="text-sm text-gray-500">Cargando productos...</p>
                            )}
                        </div>
                        <div>
                            <Label htmlFor="unit_id">Unidad</Label>
                            {unitsLoading && (
                                <p className="text-sm text-gray-500">Cargando unidades...</p>
                            )}
                            {unitsError && (
                                <p className="text-sm text-red-500">Error al cargar unidades</p>
                            )}
                            {!unitsLoading && !unitsError && (
                                <select
                                    name="unit_id"
                                    id="unit_id"
                                    value={variantForm.unit_id}
                                    onChange={handleChange}
                                    required
                                    className="w-full border border-gray-300 rounded px-3 py-2 mt-1 bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-600"
                                >
                                    <option value="">Selecciona una unidad</option>
                                    {units.map((unit) => (
                                        <option key={unit.id} value={unit.id}>
                                            {unit.acronym} ({unit.unit_type})
                                        </option>
                                    ))}
                                </select>
                            )}
                        </div>
                    </div>
                    {/* Segunda sección: Cantidad y Precio */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="quantity">Cantidad</Label>
                            <Input
                                type="number"
                                name="quantity"
                                id="quantity"
                                value={variantForm.quantity}
                                onChange={handleChange}
                                required
                                showIcon={false}
                            />
                        </div>
                        <div>
                            <Label htmlFor="price">Precio</Label>
                            <Input
                                type="number"
                                name="price"
                                id="price"
                                value={variantForm.price}
                                onChange={handleChange}
                                required
                                showIcon={false}
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                        disabled={loading}
                    >
                        {variant ? "Actualizar" : "Crear"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddProductModal;