import { useState, useCallback } from 'react';
import { addDelivery, updateDelivery, findDelivery, findDeliveryById, togglerStatus as apiTogglerStatus } from '../services/deliveryService';

export const useDeliveries = () => {
    const [loadingAdd, setLoadingAdd] = useState(false);
    const [loadingUpdate, setLoadingUpdate] = useState(false);
    const [loadingFind, setLoadingFind] = useState(false);
    const [errorAdd, setErrorAdd] = useState(null);
    const [errorUpdate, setErrorUpdate] = useState(null);
    const [errorFind, setErrorFind] = useState(null);
    const [currentDelivery, setCurrentDelivery] = useState(null);

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

    const handleFindDeliveryById = useCallback(async (deliveryId) => {
        setLoadingFind(true);
        setErrorFind(null);
        try {
            const result = await findDeliveryById(deliveryId);
            setCurrentDelivery(result.data);
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
            setCurrentDelivery(result.data);
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
        currentDelivery,

        // Métodos
        addDelivery: handleAddDelivery,
        togglerStatus: handleTogglerStatus,
        updateDelivery: handleUpdateDelivery,
        findDelivery: handleFindDelivery,
        findDeliveryById: handleFindDeliveryById,

        // Helpers
        resetErrors: () => {
            setErrorAdd(null);
            setErrorUpdate(null);
            setErrorFind(null);
        },
        clearCurrentDelivery: () => setCurrentDelivery(null)
    };
};