import apiClient from "./apiClient";

export const addOrder = async (orderData) => {
    try {
        console.log("addOrder - Enviando datos de orden:", orderData);
        const response = await apiClient.post("/order/add", { data: orderData });
        console.log("addOrder - Respuesta recibida:", response.data);
        return response.data;
    } catch (error) {
        console.error("addOrder - Error al agregar la orden:", error);
        throw error;
    }
};

export const updateOrder = async (orderId, orderData) => {
    try {
        console.log("updateOrder - Actualizando orden:", orderId, orderData);
        const response = await apiClient.put(`/order/update/${orderId}`, { data: orderData });
        console.log("updateOrder - Respuesta recibida:", response.data);
        return response.data;
    } catch (error) {
        console.error("updateOrder - Error al actualizar la orden:", error);
        throw error;
    }
};

export const getOrdersByState = async (state) => {
    try {
        console.log("getOrdersByState - Solicitando órdenes por estado:", state);
        const token = localStorage.getItem("token");
        const response = await apiClient.get(`/order/all/${state}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log("getOrdersByState - Respuesta recibida:", response.data);
        return response.data;
    } catch (error) {
        console.error("getOrdersByState - Error al obtener órdenes por estado:", error);
        throw error;
    }
};


export const getOrderDetails = async (id) => {
    try {
        console.log("getOrderDetails - Solicitando detalles de la orden con id:", id);
        const response = await apiClient.get(`/order/details/${id}`);
        console.log("getOrderDetails - Respuesta recibida:", response.data);
        return response.data;
    } catch (error) {
        console.error("getOrderDetails - Error al obtener detalles de la orden:", error);
        throw error;
    }
};

export const getAllOrders = async () => {
    try {
        console.log("getAllOrders - Solicitando todas las órdenes");
        const response = await apiClient.get("/order/all");
        console.log("getAllOrders - Respuesta recibida:", response.data);
        return response.data;
    } catch (error) {
        console.error("getAllOrders - Error al obtener las órdenes:", error);
        throw error;
    }
};

export const findOrder = async (orderId) => {
    try {
        console.log("findOrder - Buscando la orden con ID:", orderId);
        const response = await apiClient.get(`/order/find/${orderId}`);
        console.log("findOrder - Respuesta recibida:", response.data);
        return response.data;
    } catch (error) {
        console.error("findOrder - Error al buscar la orden:", error);
        throw error;
    }
};