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

    changeStatus: async (orderId, status) => {
        try {
            console.log("Datos enviados al back ",status);
            
            const response = await apiClient.post(`/order/toggler/${orderId}`, {data:status});
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

    getOrdersKanban: async () => {
        try {
            const response = await apiClient.get(`/order/kanban`);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.error || "Error getting kanban orders");
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