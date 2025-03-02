import { useState, useEffect } from "react";
import {
    getAllProductVariants,
    addProductVariant,
    updateProductVariant,
    deleteProductVariant,
    findProductVariant,
} from "../services/productService";

export const useProductVariants = () => {
    const [variants, setVariants] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Función para cargar todas las variantes de producto
    const fetchVariants = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await getAllProductVariants();
            // Se asume que la respuesta puede venir envuelta en "data"
            setVariants(response.data || response);
        } catch (err) {
            console.error("Error al obtener variantes de producto:", err);
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    // Cargar las variantes al montar
    useEffect(() => {
        fetchVariants();
    }, []);

    // Función para agregar una variante (se envía dentro de "data")
    const addVariant = async (variantData) => {
        setLoading(true);
        setError(null);
        try {
            // Enviamos los datos envueltos en una propiedad "data"
            const newVariant = await addProductVariant({ data: variantData });
            setVariants((prev) => [...prev, newVariant]);
            return newVariant;
        } catch (err) {
            console.error("Error al agregar variante:", err);
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // Función para actualizar una variante (se envía dentro de "data")
    const updateVariant = async (id, variantData) => {
        setLoading(true);
        setError(null);
        try {
            const updatedVariant = await updateProductVariant(id, { data: variantData });
            setVariants((prev) =>
                prev.map((variant) => (variant.id === id ? updatedVariant : variant))
            );
            return updatedVariant;
        } catch (err) {
            console.error("Error al actualizar variante:", err);
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // Función para eliminar (deshabilitar) una variante
    const deleteVariant = async (id) => {
        setLoading(true);
        setError(null);
        try {
            await deleteProductVariant(id);
            setVariants((prev) => prev.filter((variant) => variant.id !== id));
        } catch (err) {
            console.error("Error al eliminar variante:", err);
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // Función para buscar una variante por ID
    const findVariant = async (id) => {
        setLoading(true);
        setError(null);
        try {
            const variant = await findProductVariant(id);
            return variant;
        } catch (err) {
            console.error("Error al buscar variante:", err);
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
        fetchVariants,
        addVariant,
        updateVariant,
        deleteVariant,
        findVariant,
    };
};