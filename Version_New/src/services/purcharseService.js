import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE;

export const addPurchase = async (purchaseData) => {
    const response = await axios.post(`${API_BASE}/purchase/add`, { data: purchaseData });
    return response.data;
};

export const getAllPurchases = async () => {
    const response = await axios.get(`${API_BASE}/purchase/all`);
    return response.data;
};