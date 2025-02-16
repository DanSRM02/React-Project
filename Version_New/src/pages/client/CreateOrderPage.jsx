import React, { useState } from "react";
import { useProducts } from "../../hooks/useProducts.jsx";
import { addOrder } from "../../services/Orders";

const CreateOrderPage = () => {
    const { products, loading, error } = useProducts();
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [orderStatus, setOrderStatus] = useState(null);

    const handleSelectProduct = (productId) => {
        setSelectedProducts((prevSelected) => {
            if (prevSelected.includes(productId)) {
                return prevSelected.filter((id) => id !== productId);
            } else {
                return [...prevSelected, productId];
            }
        });
    };

    const handleSubmitOrder = async () => {
        // Datos de la orden; el user_id se obtendría dinámicamente
        const orderData = {
            state: true,
            user_id: 1,
            product_ids: selectedProducts.map((id) => ({ id })),
        };

        try {
            console.debug("CreateOrderPage - Enviando orden:", orderData);
            const response = await addOrder(orderData);
            console.debug("CreateOrderPage - Orden creada:", response);
            setOrderStatus("Orden creada exitosamente");
        } catch (err) {
            console.error("CreateOrderPage - Error al crear orden:", err);
            setOrderStatus("Error al crear la orden");
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold mb-8 text-center">Crear Orden</h2>
            {loading && <p className="text-center">Cargando productos...</p>}
            {error && <p className="text-center text-red-600">Error al cargar productos.</p>}
            {!loading && !error && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Lista de Productos */}
                    <div>
                        <h3 className="text-2xl font-semibold mb-4">Productos disponibles:</h3>
                        {products.length > 0 ? (
                            <div className="space-y-4">
                                {products.map((prod) => (
                                    <div
                                        key={prod.id}
                                        className="flex items-center bg-white p-4 rounded-lg shadow hover:shadow-lg transition"
                                    >
                                        <input
                                            type="checkbox"
                                            className="mr-4"
                                            checked={selectedProducts.includes(prod.id)}
                                            onChange={() => handleSelectProduct(prod.id)}
                                        />
                                        <div>
                                            <p className="font-semibold text-lg">{prod.name}</p>
                                            <p className="text-gray-600">${prod.price}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p>No hay productos disponibles.</p>
                        )}
                    </div>
                    {/* Resumen de la Orden */}
                    <div>
                        <h3 className="text-2xl font-semibold mb-4">Resumen de Orden</h3>
                        {selectedProducts.length > 0 ? (
                            <div className="bg-white p-4 rounded-lg shadow">
                                <ul className="divide-y divide-gray-200">
                                    {selectedProducts.map((id) => {
                                        const prod = products.find((p) => p.id === id);
                                        return (
                                            <li key={id} className="py-2 flex justify-between">
                                                <span>{prod?.name}</span>
                                                <span>${prod?.price}</span>
                                            </li>
                                        );
                                    })}
                                </ul>
                                <div className="mt-4 flex justify-between font-bold">
                                    <span>Total:</span>
                                    <span>
                                        $
                                        {selectedProducts.reduce((acc, id) => {
                                            const prod = products.find((p) => p.id === id);
                                            return acc + (prod ? prod.price : 0);
                                        }, 0)}
                                    </span>
                                </div>
                            </div>
                        ) : (
                            <p className="text-gray-600">No has seleccionado ningún producto.</p>
                        )}
                    </div>
                </div>
            )}
            <div className="mt-8 text-center">
                <button
                    onClick={handleSubmitOrder}
                    className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg transition"
                >
                    Crear Orden
                </button>
                {orderStatus && <p className="mt-4">{orderStatus}</p>}
            </div>
        </div>
    );
};

export default CreateOrderPage;
