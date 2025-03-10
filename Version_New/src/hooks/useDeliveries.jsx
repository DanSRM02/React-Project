import { useState, useCallback } from 'react';
import { addDelivery, updateDelivery, findDelivery, findDeliveryById, togglerStatus as apiTogglerStatus, startDelivery as startDeliveryAPI } from '../services/deliveryService';

export const useDeliveries = () => {
    const [loadingAdd, setLoadingAdd] = useState(false);
    const [loadingUpdate, setLoadingUpdate] = useState(false);
    const [loadingFind, setLoadingFind] = useState(false);
    const [errorAdd, setErrorAdd] = useState(null);
    const [errorUpdate, setErrorUpdate] = useState(null);
    const [errorFind, setErrorFind] = useState(null);
    const [deliveries, setDeliveries] = useState([]);
    const handleAddDelivery = async (deliveryData) => {
        setLoadingAdd(true);
        setErrorAdd(null);
        try {
            const result = await addDelivery(deliveryData);
            return result;
        } catch (error) {
            setErrorAdd(error.message);
            throw error;
        } finally {
            setLoadingAdd(false);
        }
    };

    const startDelivery = async (deliveryId, coordinates) => {
        setLoadingUpdate(true);
        setErrorUpdate(null);
        try {
            const result = await startDeliveryAPI(deliveryId, coordinates);
            return result;
        } catch (error) {
            setErrorUpdate(error.message);
            throw error;
        } finally {
            setLoadingUpdate(false);
        }
    };

    const handleFindDeliveryById = useCallback(async (deliveryId) => {
        setLoadingFind(true);
        setErrorFind(null);
        try {
            const result = await findDeliveryById(deliveryId);
            setDeliveries(result.data || []); // Almacenar todas las entregas
            return result;
        } catch (error) {
            setErrorFind(error.message);
            throw error;
        } finally {
            setLoadingFind(false);
        }
    }, []);

    const handleUpdateDelivery = async (deliveryId, deliveryData) => {
        setLoadingUpdate(true);
        setErrorUpdate(null);
        try {
            const result = await updateDelivery(deliveryId, deliveryData);
            return result;
        } catch (error) {
            setErrorUpdate(error.message);
            throw error;
        } finally {
            setLoadingUpdate(false);
        }
    };

    const handleFindDelivery = async (deliveryId) => {
        setLoadingFind(true);
        setErrorFind(null);
        try {
            const result = await findDelivery(deliveryId);
            setDeliveries(result.data);
            return result;
        } catch (error) {
            setErrorFind(error.message);
            throw error;
        } finally {
            setLoadingFind(false);
        }
    };

    const handleTogglerStatus = async (id, status) => {
        setLoadingFind(true);
        setErrorFind(null);
        try {
            const result = await apiTogglerStatus(id, status);
            return result;
        } catch (error) {
            setErrorFind(error.message);
            throw error;
        } finally {
            setLoadingFind(false);
        }
    };

    return {
        // Estados de carga
        loadingAdd,
        loadingUpdate,
        loadingFind,

        // Estados de error
        errorAdd,
        errorUpdate,
        errorFind,

        // Datos
        deliveries,

        // Métodos
        addDelivery: handleAddDelivery,
        togglerStatus: handleTogglerStatus,
        updateDelivery: handleUpdateDelivery,
        findDelivery: handleFindDelivery,
        findDeliveryById: handleFindDeliveryById,
        startDelivery,

        // Helpers
        resetErrors: () => {
            setErrorAdd(null);
            setErrorUpdate(null);
            setErrorFind(null);
        },
        clearCurrentDelivery: () => setCurrentDelivery(null)
    };
};