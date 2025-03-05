import apiClient from './apiClient';

export const addDelivery = async (deliveryData) => {
    try {
        console.log(deliveryData);
        
        const response = await apiClient.post('/delivery/add', { data: deliveryData });
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message
            || error.message
            || 'Error desconocido al crear domiciliario';
        throw new Error(errorMessage);
    }
};

export const updateDelivery = async (deliveryId, deliveryData) => {
    try {        
        const response = await apiClient.put(`/delivery/update/${deliveryId}`, { data: deliveryData });
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message
            || error.message
            || `Error desconocido al actualizar domiciliario ID: ${deliveryId}`;
        throw new Error(errorMessage);
    }
};

export const findDelivery = async (deliveryId) => {
    try {
        const response = await apiClient.get(`/delivery/find/${deliveryId}`);
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message
            || error.message
            || `Error desconocido al buscar domiciliario ID: ${deliveryId}`;
        throw new Error(errorMessage);
    }
};