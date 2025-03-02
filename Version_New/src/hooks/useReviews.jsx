import { useState, useEffect, useCallback } from "react";
import reviewService from "../services/reviewService";

export const useReviews = () => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Cargar todas las reseñas
    const fetchReviews = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await reviewService.getAllReviews();
            setReviews(response.data || []);
        } catch (err) {
            console.error("Error al obtener reseñas:", err);
            setError(err);
        } finally {
            setLoading(false);
        }
    }, []);

    // Carga inicial al montar el componente
    useEffect(() => {
        fetchReviews();
    }, [fetchReviews]);

    // Agregar nueva reseña
    const addReview = async (reviewData) => {
        setLoading(true);
        setError(null);
        try {
            const newReview = await reviewService.addReview(reviewData);
            // Dependiendo del formato de respuesta, si newReview viene envuelto en data, ajusta aquí
            setReviews((prev) => [...prev, newReview.data || newReview]);
            return newReview;
        } catch (err) {
            console.error("Error al agregar reseña:", err);
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // Actualizar reseña existente
    const updateReview = async (reviewId, reviewData) => {
        setLoading(true);
        setError(null);
        try {
            const updatedReview = await reviewService.updateReview(reviewId, reviewData);
            setReviews((prev) =>
                prev.map((review) =>
                    review.id === reviewId ? (updatedReview.data || updatedReview) : review
                )
            );
            return updatedReview;
        } catch (err) {
            console.error("Error al actualizar reseña:", err);
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // Eliminar reseña
    const deleteReview = async (reviewId) => {
        setLoading(true);
        setError(null);
        try {
            await reviewService.deleteReview(reviewId);
            setReviews((prev) =>
                prev.filter((review) => review.id !== reviewId)
            );
        } catch (err) {
            console.error("Error al eliminar reseña:", err);
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // Buscar reseña por ID
    const findReview = async (reviewId) => {
        setLoading(true);
        setError(null);
        try {
            const review = await reviewService.findReview(reviewId);
            return review.data || review;
        } catch (err) {
            console.error("Error al buscar reseña:", err);
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return {
        reviews,
        loading,
        error,
        fetchReviews,
        addReview,
        updateReview,
        deleteReview,
        findReview,
    };
};
