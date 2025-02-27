// services/productService.js
import apiClient from "./apiClient";

export const addProduct = async (productData) => {
    try {
        console.log("addProduct - Enviando datos:", productData);
        const response = await apiClient.post("/product/add", productData, {
            headers: { "Content-Type": "application/json" },
        });
        console.log("addProduct - Respuesta:", response.data);
        return response.data;
    } catch (error) {
        console.error("addProduct - Error:", error);
        throw error;
    }
};

export const updateProduct = async (productId, productData) => {
    try {
        console.log("updateProduct - Actualizando producto:", productId, productData);
        const response = await apiClient.put(`/product/update/${productId}`, productData, {
            headers: { "Content-Type": "application/json" },
        });
        console.log("updateProduct - Respuesta:", response.data);
        return response.data;
    } catch (error) {
        console.error("updateProduct - Error:", error);
        throw error;
    }
};

export const getAllProducts = async () => {
    try {
        console.log("getAllProducts - Solicitando todos los productos");
        const token = localStorage.getItem("token");
        const response = await apiClient.get("/product/all");
        console.log("getAllProducts - Respuesta:", response.data), {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        };


        return response.data;
    } catch (error) {
        console.error("getAllProducts - Error:", error);
        throw error;
    }
};

export const findProduct = async (productId) => {
    try {
        console.log("findProduct - Solicitando producto:", productId);
        const response = await apiClient.get(`/product/find/${productId}`);
        console.log("findProduct - Respuesta:", response.data);
        return response.data;
    } catch (error) {
        console.error("findProduct - Error:", error);
        throw error;
    }
};

export const deleteProduct = async (productId) => {
    try {
        console.log("deleteProduct - Eliminando producto:", productId);
        const response = await apiClient.delete(`/product/delete/${productId}`);
        console.log("deleteProduct - Respuesta:", response.data);
        return response.data;
    } catch (error) {
        console.error("deleteProduct - Error:", error);
        throw error;
    }
};