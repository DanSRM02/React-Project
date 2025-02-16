import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE;

export const addDelivery = async (deliveryData) => {
    const response = await axios.post(`${API_BASE}/delivery/add`, { data: deliveryData });
    return response.data;
};

export const updateDelivery = async (deliveryId, deliveryData) => {
    const response = await axios.put(`${API_BASE}/delivery/update/${deliveryId}`, { data: deliveryData });
    return response.data;
};

export const findDelivery = async (deliveryId) => {
    const response = await axios.get(`${API_BASE}/delivery/find/${deliveryId}`);
    return response.data;
};
