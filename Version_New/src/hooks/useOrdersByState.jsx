import { useState, useEffect } from "react";
import { getOrdersByState } from "../services/OrderService";

export const useOrdersByState = (selectedState) => {
    const [ordersByState, setOrdersByState] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrdersByState = async () => {
            try {
                setLoading(true);
                const result = await getOrdersByState(selectedState);
                const ordersArray = result.data || [];
                console.debug("useOrders - Orders obtained:", ordersArray);
                setOrdersByState(ordersArray);
            } catch (err) {
                console.error("useOrders - Error fetching orders:", err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchOrdersByState();
    }, [selectedState]);

    return { ordersByState, loading, error };
};
