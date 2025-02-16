import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE;

export const addReview = async (reviewData) => {
    const response = await axios.post(`${API_BASE}/review/add`, { data: reviewData });
    return response.data;
};

export const updateReview = async (reviewId, reviewData) => {
    const response = await axios.put(`${API_BASE}/review/update/${reviewId}`, { data: reviewData });
    return response.data;
};

export const findReview = async (reviewId) => {
    const response = await axios.get(`${API_BASE}/review/find/${reviewId}`);
    return response.data;
};

export const getAllReviews = async () => {
    const response = await axios.get(`${API_BASE}/review/all`);
    return response.data;
};