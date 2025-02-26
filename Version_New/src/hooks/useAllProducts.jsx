import { useState, useEffect } from "react";
import { getAllProducts } from "../services/productService";

export const useAllProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAllProducts = async () => {
            try {
                setLoading(true);
                const result = await getAllProducts();
                // result.data contiene el arreglo de productos 
                const productsArray = result.data || [];
                console.debug("useProducts - Productos obtenidos:", productsArray);
                setProducts(productsArray);
            } catch (err) {
                console.error("useProducts - Error al obtener productos:", err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchAllProducts();
    }, []);

    return { products, loading, error };
};
