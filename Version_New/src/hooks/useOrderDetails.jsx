import { useState, useEffect } from "react";
import { getOrderDetails } from "../services/OrderService";

export const useOrderDetails = (orderId) => {
    const [orderDetails, setOrderDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!orderId) return; // Si no hay ID, no se realiza la petición

        const fetchOrderDetails = async () => {
            try {
                setLoading(true);
                const result = await getOrderDetails(orderId);
                const ordersDetailsArray = result.data || [];
                console.debug("useOrders - Orders obtained:", ordersDetailsArray);
                setOrderDetails(ordersDetailsArray);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchOrderDetails();
    }, [orderId]);

    return { orderDetails, loading, error };
};
