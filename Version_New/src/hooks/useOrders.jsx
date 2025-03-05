import { useCallback, useState } from "react";
import { orderService } from "../services/orderService"; // Importar el servicio completo

export const useOrders = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [orders, setOrders] = useState([]);
    const [currentOrder, setCurrentOrder] = useState(null);

    const handleRequest = async (requestFn, ...args) => {
        setLoading(true);
        setError(null);
        try {
            const data = await requestFn(...args);
            return data;
        } catch (err) {
            setError(err.message || "Error desconocido");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // Crear nueva orden
    const createOrder = async (orderData) => {
        try {
            const result = await handleRequest(orderService.addOrder, orderData);
            setOrders(prev => [...prev, result]);
            return { data: result.data };
        } catch (err) {
            return { error: err.message };
        }
    };

    // En useOrders.js
    const changeStatus = async (orderId, state) => {
        try {
            const result = await handleRequest(orderService.changeStatus, orderId, state);
            // Actualiza solo la orden modificada
            setOrders(prev => ({
                data: prev.data.map(order =>
                    order.id === orderId ? { ...order, ...state } : order
                )
            }));
            return result;
        } catch (err) {
            throw err;
        }
    };

    // Obtener órdenes por estado    
    const fetchOrdersByState = async (state) => {
        try {
            const result = await handleRequest(orderService.getOrdersByState, state);
            setOrders({ data: result?.data || [] });
            return result;
        } catch (err) {
            throw err;
        }
    };

    const fetchOrderDetails = async (orderId) => {
        try {
            const productDetails = await handleRequest(orderService.getOrderDetails, orderId);            
            
            const mainOrder = orders.data?.find(order => order.id === orderId) || {};

            const mergedOrder = {
                ...mainOrder,
                products: productDetails.data || []
            };

            setCurrentOrder(mergedOrder);
            return mergedOrder;
        } catch (err) {
            throw err;
        }
    };

    // Obtener todas las órdenes del usuario
    const fetchAllOrders = useCallback(async () => {
        try {
            const data = await handleRequest(orderService.getOrdersByUser);

            setOrders(data.data);
        } catch (err) {
            setError(err);
        }
    }, []);

    // Buscar orden específica
    const searchOrder = async (orderId) => {
        try {
            const result = await handleRequest(orderService.findOrder, orderId);
            setCurrentOrder(result);
            return { data: result.data };
        } catch (err) {
            return { error: err.message };
        }
    };

    return {
        loading,
        error,
        orders,
        currentOrder,
        setCurrentOrder,
        createOrder,
        changeStatus,
        fetchOrdersByState,
        fetchOrderDetails,
        fetchAllOrders,
        searchOrder,
        resetError: () => setError(null)
    };
};