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

export const findDeliveryById = async (deliveryId) => {
    try {
        console.log("enviando datos al back", deliveryId);
        const response = await apiClient.get(`/delivery/domiciliary/${deliveryId}`);
        console.log("respuesta del back", response);
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message
            || error.message
            || `Error desconocido al buscar delivery por ID de domiciliario: ${deliveryId}`;
        throw new Error(errorMessage);
    }
};

export const startDelivery = async (deliveryId, location) => {
    try {
        console.log("data que va back",location);
        
        const response = await apiClient.patch(`/delivery/${deliveryId}/start-delivery`, { data: location });
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message
            || error.message
            || `Error desconocido al actualizar domiciliario ID: ${deliveryId}`;
        throw new Error(errorMessage);
    }
};

export const togglerStatus = async (id, status) => {
    try {
        console.log("enviando datos al back togglerStatus", status);
        const response = await apiClient.post(`/delivery/toggler/${id}`, { data: status });
        console.log("respuesta del back togglerStatus", response);
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message
            || error.message
            || `Error desconocido al buscar delivery por ID de domiciliario: ${deliveryId}`;
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