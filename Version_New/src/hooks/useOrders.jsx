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

    // Actualizar orden existente
    const modifyOrder = async (orderId, orderData) => {
        console.groupCollapsed(`🛠️ [modifyOrder] Iniciando actualización orden #${orderId}`);
        try {
            console.log('📤 Datos enviados:', orderData);
            console.log('🔄 Estado actual orders:', orders);

            // 1. Ejecutar la petición
            console.log(`📡 Enviando solicitud de actualización para orden ${orderId}...`);
            const result = await handleRequest(orderService.updateOrder, orderId, orderData);

            // 2. Validar respuesta
            if (!result?.data) {
                console.warn('⚠️ Respuesta inesperada de la API:', result);
                throw new Error('Estructura de respuesta inválida');
            }
            console.log('✅ Actualización API exitosa:', result.data);

            // 3. Actualizar estado con logging
            setOrders(prev => {
                console.log('📦 Estado anterior:', prev);

                const updated = prev.map(order =>
                    order.id === orderId ? { ...order, ...result.data } : order
                );

                console.log('🆕 Nuevo estado:', updated);
                console.groupEnd();

                return updated;
            });

            // 4. Verificar si se encontró la orden
            const orderExists = orders.some(order => order.id === orderId);
            if (!orderExists) {
                console.warn(`⚠️ Orden #${orderId} no encontrada en el estado local`);
            }

            return { data: result.data };
        } catch (err) {
            console.error('❌ Error en modifyOrder:', {
                orderId,
                error: err.message,
                stack: err.stack
            });
            console.groupEnd();
            return {
                error: err.message || 'Error al actualizar la orden',
                originalError: err // Para debugging en componentes
            };
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
        modifyOrder,
        fetchOrdersByState,
        fetchOrderDetails,
        fetchAllOrders,
        searchOrder,
        resetError: () => setError(null)
    };
};