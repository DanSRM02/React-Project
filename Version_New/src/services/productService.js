import apiClient from "./apiClient";

export const addProductVariant = async (productVariantData) => {
    try {
        console.log("addProductVariant - Enviando datos:", productVariantData);
        const response = await apiClient.post(
            "product-variant/add",
            productVariantData
        );
        console.log("addProductVariant - Respuesta:", response.data);
        return response.data;
    } catch (error) {
        console.error("addProductVariant - Error:", error);
        throw error;
    }
};

export const toggleProductStateVariant = async (id, productData) => {
    try {
        console.log("changeState - Actualizando estado:", id, productData);
        const response = await apiClient.post(
            `product/toggler/${id}`,
            productData
        );
        console.log("updateProductVariant - Respuesta:", response.data);
        return response.data;
    } catch (error) {
        console.error("updateProductVariant - Error:", error);
        throw error;
    }
};

export const updateProductVariant = async (id, productVariantData) => {
    try {
        console.log("updateProductVariant - Actualizando variante:", id, productVariantData);
        const response = await apiClient.put(
            `product-variant/update/${id}`,
            productVariantData
        );
        console.log("updateProductVariant - Respuesta:", response.data);
        return response.data;
    } catch (error) {
        console.error("updateProductVariant - Error:", error);
        throw error;
    }
};

export const getAllProductVariants = async () => {
    try {
        console.log("getAllProductVariants - Solicitando todas las variantes");
        const response = await apiClient.get("product/all");
        console.log("getAllProductVariants - Respuesta:", response.data);
        return response.data;
    } catch (error) {
        console.error("getAllProductVariants - Error:", error);
        throw error;
    }
};

export const findProductVariant = async (id) => {
    try {
        console.log("findProductVariant - Solicitando variante con ID:", id);
        const response = await apiClient.get(`product-variant/find/${id}`);
        console.log("findProductVariant - Respuesta:", response.data);
        return response.data;
    } catch (error) {
        console.error("findProductVariant - Error:", error);
        throw error;
    }
};

export const deleteProductVariant = async (id) => {
    try {
        console.log("deleteProductVariant - Eliminando variante con ID:", id);
        const response = await apiClient.delete(`product-variant/delete/${id}`);
        console.log("deleteProductVariant - Respuesta:", response.data);
        return response.data;
    } catch (error) {
        console.error("deleteProductVariant - Error:", error);
        throw error;
    }
};