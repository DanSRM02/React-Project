import { useState } from "react";
import { addProduct, removeProduct } from "../services/productService";

export const useProducts = () => {
    const [variants, setVariants] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    // En la función handlerAddProduct, cambia:
    const handlerAddProduct = async (productData) => {
        setLoading(true);
        setError(null);
        try {
            const response = await addProduct({ data: productData });
            // Actualiza el estado con la respuesta completa
            setVariants(prev => [...prev, response.data]);
            return response;
        } catch (err) {
            console.error("Error al agregar producto:", err);
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // Función para eliminar (deshabilitar) una variante
    const handlerRemoveProduct = async (id) => {
        setLoading(true);
        setError(null);
        try {
            await removeProduct(id);
            setVariants((prev) => prev.filter((variant) => variant.id !== id));
        } catch (err) {
            console.error("Error al eliminar variante:", err);
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return {
        variants,
        loading,
        error,
        handlerAddProduct,
        handlerRemoveProduct
    };
}