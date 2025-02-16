// services/productService.js
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE;

export const addProduct = async (productData) => {
    try {
        console.log("addProduct - Enviando datos:", productData);
        const response = await axios.post(`${API_BASE}/product/add`, { data: productData });
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
        const response = await axios.put(`${API_BASE}/product/update/${productId}`, { data: productData });
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
        const response = await axios.get(`${API_BASE}/product/all`);
        console.log("getAllProducts - Respuesta:", response.data);
        return response.data;
    } catch (error) {
        console.log("getAllProducts - Error:", error);
        throw error;
    }
};

export const findProduct = async (productId) => {
    try {
        console.log("findProduct - Solicitando producto:", productId);
        const response = await axios.get(`${API_BASE}/product/find/${productId}`);
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
        const response = await axios.delete(`${API_BASE}/product/delete/${productId}`);
        console.log("deleteProduct - Respuesta:", response.data);
        return response.data;
    } catch (error) {
        console.error("deleteProduct - Error:", error);
        throw error;
    }
};
