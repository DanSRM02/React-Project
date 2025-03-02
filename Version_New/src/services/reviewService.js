import apiClient from './apiClient';

const reviewService = {
    addReview: async (reviewData) => {
        try {
            console.debug('Enviando nueva reseña:', reviewData);
            const response = await apiClient.post('/review/add', reviewData);
            console.debug('Respuesta de addReview:', response);
            return response.data;
        } catch (error) {
            console.error('Error en addReview:', error);
            throw error;
        }
    },

    updateReview: async (reviewId, reviewData) => {
        try {
            console.debug(`Actualizando reseña ${reviewId}:`, reviewData);
            const response = await apiClient.put(`/review/update/${reviewId}`, reviewData);
            console.debug('Respuesta de updateReview:', response);
            return response.data;
        } catch (error) {
            console.error('Error en updateReview:', error);
            throw error;
        }
    },

    findReview: async (reviewId) => {
        try {
            console.debug(`Buscando reseña ${reviewId}`);
            const response = await apiClient.get(`/review/find/${reviewId}`);
            console.debug('Respuesta de findReview:', response);
            return response.data;
        } catch (error) {
            console.error('Error en findReview:', error);
            throw error;
        }
    },

    getAllReviews: async () => {
        try {
            console.debug('Obteniendo todas las reseñas');
            const response = await apiClient.get('/review/all');
            console.debug('Respuesta de getAllReviews:', response);
            return response.data;
        } catch (error) {
            console.error('Error en getAllReviews:', error);
            throw error;
        }
    },

    deleteReview: async (reviewId) => {
        try {
            console.debug(`Eliminando reseña ${reviewId}`);
            const response = await apiClient.delete(`/review/delete/${reviewId}`);
            console.debug('Respuesta de deleteReview:', response);
            return response.data;
        } catch (error) {
            console.error('Error en deleteReview:', error);
            throw error;
        }
    }
};

export default reviewService;