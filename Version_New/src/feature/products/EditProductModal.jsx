import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import { useProductVariants } from "../../hooks/useProductVariants";
import Label from "../../components/UI/Label";
import Input from "../../components/UI/Input";

const EditProductModal = ({ isOpen, onClose, product }) => {
    // Se espera que "product" tenga la forma:
    // { id, name, variants: [ { id, quantity, price, unit: { id, acronym, unit_type } }, ... ] }
    const { updateVariant } = useProductVariants();

    const [productName, setProductName] = useState("");
    const [variantsForm, setVariantsForm] = useState([]);

    useEffect(() => {
        console.log("EditProductModal: Received product prop:", product);
        if (product) {
            setProductName(product.name);
            const initialVariants = product.variants.map((v) => {
                console.log("EditProductModal: Mapping variant:", v);
                return {
                    id: v.id,
                    quantity: v.quantity,
                    price: v.price,
                    unit_id: v.unit.id, // unidad fija
                    product_id: product.id, // se extrae del producto
                    unitText: `${v.unit.acronym} (${v.unit.unit_type})`,
                };
            });
            setVariantsForm(initialVariants);
            console.log("EditProductModal: Initialized variantsForm:", initialVariants);
        } else {
            setProductName("");
            setVariantsForm([]);
            console.log("EditProductModal: No product received");
        }
    }, [product]);

    const handleVariantChange = (index, field, value) => {
        setVariantsForm((prev) => {
            const updated = [...prev];
            updated[index] = { ...updated[index], [field]: value };
            console.log(`EditProductModal: Updated variant ${updated[index].id}:`, updated[index]);
            return updated;
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("EditProductModal: Submitting variantsForm:", variantsForm);
        try {
            await Promise.all(
                variantsForm.map((variant) =>
                    updateVariant(variant.id, {
                        quantity: variant.quantity,
                        price: variant.price,
                        unit_id: variant.unit_id,
                        product_id: variant.product_id,
                    })
                )
            );
            onClose();
        } catch (err) {
            console.error("EditProductModal: Error actualizando variantes:", err);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-lg w-full mx-4 shadow-lg transform transition-all">
                {/* Botón para cerrar */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                >
                    <FaTimes className="w-5 h-5" />
                </button>
                <h2 className="text-xl font-bold mb-4">Editar Producto: {productName}</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Campo para editar el nombre del producto */}
                    <div>
                        <Label htmlFor="productName">Nombre del Producto</Label>
                        <Input
                            type="text"
                            readOnly
                            id="productName"
                            value={productName}
                            onChange={(e) => {
                                setProductName(e.target.value);
                                console.log("EditProductModal: Product name changed:", e.target.value);
                            }}
                            showIcon={false}
                        />
                    </div>
                    {/* Iterar sobre las variantes */}
                    {variantsForm.map((variant, index) => (
                        <div key={variant.id} className="border p-4 rounded-lg">
                            <h3 className="text-lg font-semibold mb-2">
                                Variante {variant.id}{" "}
                                <span className="text-sm text-gray-500">({variant.unitText})</span>
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor={`quantity-${variant.id}`}>Cantidad</Label>
                                    <Input
                                        type="number"
                                        id={`quantity-${variant.id}`}
                                        name="quantity"
                                        value={variant.quantity}
                                        onChange={(e) =>
                                            handleVariantChange(index, "quantity", e.target.value)
                                        }
                                        showIcon={false}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor={`price-${variant.id}`}>Precio</Label>
                                    <Input
                                        type="number"
                                        id={`price-${variant.id}`}
                                        name="price"
                                        value={variant.price}
                                        onChange={(e) =>
                                            handleVariantChange(index, "price", e.target.value)
                                        }
                                        showIcon={false}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                    <button
                        type="submit"
                        className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded"
                    >
                        Guardar Cambios
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditProductModal;
