import apiClient from "./apiClient";
import { jwtDecode } from "jwt-decode";

const getUserIdFromToken = () => {
    const token = localStorage.getItem("token");
    if (!token) return null;
    try {
        const decoded = jwtDecode(token);
        return decoded.user_id;
    } catch (error) {
        console.error("Error decoding token:", error);
        return null;
    }
};

export const orderService = {
    addOrder: async (orderData) => {
        const userId = getUserIdFromToken();
        try {
            const response = await apiClient.post("/order/add", {
                data: {
                    ...orderData,
                    user_id: userId
                }
            });
            return response.data; // Extraer datos de la clave data
        } catch (error) {
            throw new Error(error.response?.data?.error || "Error adding order");
        }
    },

    updateOrder: async (orderId, orderData) => {
        const userId = getUserIdFromToken();
        try {
            // Estructura requerida por el backend Java
            const payload = {
                user_id: userId, // Mismo nombre que en validateData
                product_ids: orderData.products.map(p => ({
                    id: p.productVariant.id, // Coincide con productJson.getLong("id")
                    quantity: p.quantity // Coincide con productJson.optInt("quantity", 1)
                })),
                state: orderData.state, // Campo adicional si es necesario
                priority: orderData.priority // Campo adicional si es necesario
            };

            const response = await apiClient.put(`/order/update/${orderId}`, payload);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.error || "Error actualizando orden");
        }
    },

    getOrdersByUser: async () => {
        const userId = getUserIdFromToken();
        try {
            const response = await apiClient.get(`/order/user/${userId}`);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.error || "Error getting user orders");
        }
    },

    getAllOrders: async () => {
        try {
            const response = await apiClient.get("/order/all");
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.error || "Error getting all orders");
        }
    },

    getOrdersByState: async (state) => {
        try {
            const response = await apiClient.get(`/order/state/${state}`);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.error || "Error getting orders by state");
        }
    },

    getOrderDetails: async (orderId) => {
        try {
            const response = await apiClient.get(`/order/details/${orderId}`);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.error || "Error getting order details");
        }
    },

    findOrder: async (orderId) => {
        try {
            const response = await apiClient.get(`/order/find/${orderId}`);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.error || "Error finding order");
        }
    }
};