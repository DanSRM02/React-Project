import { useState, useEffect } from "react";
import { getAllProducts } from "../services/ProductService";

export const useProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const result = await getAllProducts();
                // result.data contiene el arreglo de productos según la respuesta que muestras
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

        fetchProducts();
    }, []);

    return { products, loading, error };
};
