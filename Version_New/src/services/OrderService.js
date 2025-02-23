import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE;

export const addOrder = async (orderData) => {
    try {
        console.log("addOrder - Enviando datos de orden:", orderData);
        const response = await axios.post(`${API_BASE}/order/add`, { data: orderData });
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
        const response = await axios.put(`${API_BASE}/order/update/${orderId}`, { data: orderData });
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
        const response = await axios.get(`${API_BASE}/order/all/${state}`);    
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
      const response = await axios.get(`${API_BASE}/order/details/${id}`);
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
        const response = await axios.get(`${API_BASE}/order/all`);
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
        const response = await axios.get(`${API_BASE}/order/find/${orderId}`);
        console.log("findOrder - Respuesta recibida:", response.data);
        return response.data;
    } catch (error) {
        console.error("findOrder - Error al buscar la orden:", error);
        throw error;
    }
};
