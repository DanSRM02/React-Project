import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useAllProducts } from "../../hooks/useAllProducts";
import ConfirmationModal from "../../components/UI/ConfirmationModal";
import { addOrder } from "../../services/orderService";

const CreateOrderPage = () => {
    const { products, loading, error } = useAllProducts();
    // IDs de las productos seleccionadas
    const [selectedVariants, setSelectedVariants] = useState([]);
    // Cantidades deseadas por variante (key: variantId, value: cantidad)
    const [orderQuantities, setOrderQuantities] = useState({});
    const [orderStatus, setOrderStatus] = useState(null);
    // Control del modal de confirmación
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

    // Selecciona o deselecciona una variante
    const handleSelectVariant = (variantId) => {
        setSelectedVariants((prevSelected) => {
            if (prevSelected.includes(variantId)) {
                const newSelected = prevSelected.filter((id) => id !== variantId);
                const newQuantities = { ...orderQuantities };
                delete newQuantities[variantId];
                setOrderQuantities(newQuantities);
                return newSelected;
            } else {
                setOrderQuantities((prevQuantities) => ({
                    ...prevQuantities,
                    [variantId]: 1,
                }));
                return [...prevSelected, variantId];
            }
        });
    };

    // Cambia la cantidad de una variante
    const handleQuantityChange = (variantId, inputValue, maxStock) => {
        let qty = parseInt(inputValue, 10);

        if (isNaN(qty)) qty = 1;
        if (qty < 1) qty = 1;
        if (qty > maxStock) qty = maxStock;

        setOrderQuantities((prev) => ({
            ...prev,
            [variantId]: qty,
        }));
    };


    // Quita un producto del resumen
    const handleRemoveVariant = (variantId) => {
        setSelectedVariants((prevSelected) =>
            prevSelected.filter((id) => id !== variantId)
        );
        setOrderQuantities((prevQuantities) => {
            const newQuantities = { ...prevQuantities };
            delete newQuantities[variantId];
            return newQuantities;
        });
    };

    // Envía la orden (se llama al confirmar en el modal)
    const handleSubmitOrder = async () => {
        const orderData = {
            user_id: 1,
            product_ids: selectedVariants.map((id) => ({
                id,
                quantity: orderQuantities[id],
            })),
        };

        try {
            console.debug("CreateOrderPage - Enviando orden:", orderData);
            const response = await addOrder(orderData);
            console.debug("CreateOrderPage - Orden creada:", response);
            setOrderStatus("Orden creada exitosamente");
            setIsConfirmModalOpen(false);
        } catch (err) {
            console.error("CreateOrderPage - Error al crear orden:", err);
            setOrderStatus("Error al crear la orden");
            setIsConfirmModalOpen(false);
        }
    };

    // Abre y cierra el modal de confirmación
    const openConfirmationModal = () => setIsConfirmModalOpen(true);
    const closeConfirmationModal = () => setIsConfirmModalOpen(false);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-6 sm:py-8 md:py-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-center">
                Generar Orden
            </h2>

            {loading && <p className="text-center">Cargando productos...</p>}
            {error && <p className="text-center text-red-600">Error al cargar productos.</p>}

            {!loading && !error && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Columna de productos */}
                    <div className="md:col-span-2 space-y-6">
                        {products.length > 0 ? (
                            products.map((prod) => (
                                <div key={prod.id} className="bg-white p-4 sm:p-6 rounded-lg shadow">
                                    <h3 className="text-xl sm:text-2xl font-semibold mb-4">{prod.name}</h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {prod.variants && prod.variants.length > 0 ? (
                                            prod.variants.map((variant) => (
                                                <div
                                                    key={variant.id}
                                                    className="border p-3 sm:p-4 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between"
                                                >
                                                    <div>
                                                        <p className="font-medium text-sm sm:text-base">
                                                            Unidad: <span className="font-semibold">{variant.unit.acronym}</span> ({variant.unit.unitType})
                                                        </p>
                                                        <p className="text-gray-600 text-sm sm:text-base">
                                                            Precio: <span className="font-medium">${variant.price}</span>
                                                        </p>
                                                        <p className="text-gray-600 text-sm sm:text-base">
                                                            Stock: <span className="font-medium">{variant.quantity}</span>
                                                        </p>
                                                    </div>
                                                    <div className="flex items-center mt-3 sm:mt-0">
                                                        <input
                                                            type="checkbox"
                                                            className="h-5 w-5 mr-2"
                                                            checked={selectedVariants.includes(variant.id)}
                                                            onChange={() => handleSelectVariant(variant.id)}
                                                        />
                                                        {selectedVariants.includes(variant.id) && (
                                                            <>
                                                                <input
                                                                    type="number"
                                                                    min="1"
                                                                    max={variant.quantity}
                                                                    value={orderQuantities[variant.id] || 1}
                                                                    onChange={(e) => handleQuantityChange(variant.id, e.target.value, variant.quantity)}
                                                                    className="w-16 sm:w-20 border border-gray-300 rounded-lg px-2 py-1 mr-2 text-sm"
                                                                />
                                                                <button
                                                                    onClick={() => handleRemoveVariant(variant.id)}
                                                                    className="text-red-500 hover:text-red-700"
                                                                >
                                                                    <FaTimes />
                                                                </button>
                                                            </>
                                                        )}
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-gray-600">No hay <strong>Stock disponible.</strong></p>
                                        )}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-700">No hay productos disponibles.</p>
                        )}
                    </div>

                    {/* Columna de resumen (sticky) */}
                    <div className="md:col-span-1">
                        <div className="bg-white p-4 sm:p-6 rounded-lg shadow sticky top-4 max-h-[calc(100vh-2rem)] overflow-auto">
                            <h3 className="text-xl sm:text-2xl font-semibold mb-4">Resumen de Orden</h3>
                            {selectedVariants.length > 0 ? (
                                <>
                                    <ul className="divide-y divide-gray-200">
                                        {selectedVariants.map((variantId) => {
                                            let variantData = null;
                                            let productName = "";
                                            products.forEach((prod) => {
                                                const found = prod.variants.find((v) => v.id === variantId);
                                                if (found) {
                                                    variantData = found;
                                                    productName = prod.name;
                                                }
                                            });
                                            return (
                                                <li key={variantId} className="py-2 flex justify-between items-center text-sm sm:text-base">
                                                    <span className="w-2/3">
                                                        {productName} - {variantData?.unit.acronym} x {orderQuantities[variantId]}
                                                    </span>
                                                    <span className="w-1/3 text-right">
                                                        ${variantData ? variantData.price * orderQuantities[variantId] : 0}
                                                    </span>
                                                    <button
                                                        onClick={() => handleRemoveVariant(variantId)}
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
                                            {selectedVariants.reduce((acc, variantId) => {
                                                const variant = products
                                                    .flatMap((prod) => prod.variants)
                                                    .find((v) => v.id === variantId);
                                                const qty = orderQuantities[variantId] || 0;
                                                return acc + (variant ? variant.price * qty : 0);
                                            }, 0)}
                                        </span>
                                    </div>
                                    <div className="mt-4 text-center">
                                        <button
                                            onClick={openConfirmationModal}
                                            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 sm:px-8 sm:py-3 rounded-lg transition w-full text-sm sm:text-base"
                                        >
                                            Crear Orden
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <p className="text-gray-600 text-sm sm:text-base">
                                    No has seleccionado ningún producto.
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Modal de confirmación */}
            <ConfirmationModal
                isOpen={isConfirmModalOpen}
                title="Confirmar Creación de Orden"
                message="¿Estás seguro de que deseas crear esta orden? Se enviará el total indicado."
                onCancel={closeConfirmationModal}
                onConfirm={handleSubmitOrder}
            />
        </div>
    );

};

export default CreateOrderPage;
