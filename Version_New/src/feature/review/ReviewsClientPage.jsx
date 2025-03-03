import React, { useEffect } from "react";
import { useReviews } from "../../hooks/useReviews";
import Loader from "../../components/UI/Loader";
import ErrorMessage from "../../components/UI/ErrorMessage";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { FaStar, FaEdit, FaTrash, FaUserCircle } from "react-icons/fa";

const ReviewsPage = () => {
    const { reviews, loading, error, fetchReviews, deleteReview } = useReviews();
    const { user } = useAuth();

    useEffect(() => {
        fetchReviews();
    }, [fetchReviews]);

    const handleDelete = async (reviewId) => {
        if (window.confirm("¿Estás seguro de querer eliminar esta reseña?")) {
            await deleteReview(reviewId);
        }
    };

    const renderRatingStars = (rating) => {
        return [...Array(5)].map((_, index) => (
            <span
                key={index}
                className={`text-xl ${index < rating ? "text-amber-400" : "text-gray-200"}`}
            >
                ★
            </span>
        ));
    };

    if (loading) return <Loader />;
    if (error) return <ErrorMessage message={error.message} />;

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Encabezado alineado con el estilo */}
                <div className="mb-10 text-center">
                    <div className="inline-flex items-center gap-3 mb-4">
                        <FaStar className="text-3xl text-amber-600" />
                        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
                            Reseñas de la Comunidad
                        </h1>
                    </div>
                    <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
                        <p className="text-lg text-gray-600">
                            {reviews.length} {reviews.length === 1 ? "reseña publicada" : "reseñas publicadas"}
                        </p>
                        <Link
                            to="/client/review/new"
                            className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2.5 rounded-full transition-all shadow-sm hover:shadow-md flex items-center gap-2"
                        >
                            <FaEdit className="w-4 h-4" />
                            Nueva Reseña
                        </Link>
                    </div>
                </div>

                {reviews.length === 0 ? (
                    <div className="bg-white rounded-xl p-8 text-center shadow-sm max-w-2xl mx-auto">
                        <div className="max-w-md mx-auto">
                            <FaStar className="mx-auto h-16 w-16 text-amber-200 mb-4" />
                            <h3 className="text-xl font-medium text-gray-900 mb-2">
                                ¡Sé el primero en compartir!
                            </h3>
                            <p className="text-gray-600 mb-6">
                                Aún no hay reseñas publicadas en la comunidad.
                            </p>
                            <Link
                                to="/nueva-reseña"
                                className="inline-flex items-center px-6 py-2.5 bg-amber-600 text-white rounded-full hover:bg-amber-700 transition-colors"
                            >
                                <FaEdit className="mr-2" />
                                Escribir Reseña
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
                        {reviews.map((review) => (
                            <div
                                key={review.id}
                                className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-all border border-gray-100 group relative"
                            >
                                {review.user?.id === user?.id && (
                                    <span className="absolute top-3 right-3 bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-xs">
                                        Tu reseña
                                    </span>
                                )}

                                <div className="flex items-start gap-4 mb-4">
                                    <div className="flex-shrink-0">
                                        <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                                            {review.user?.avatar ? (
                                                <img
                                                    src={review.user.avatar}
                                                    alt="Avatar"
                                                    className="w-full h-full rounded-full object-cover"
                                                />
                                            ) : (
                                                <FaUserCircle className="w-6 h-6 text-amber-600" />
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="text-lg font-semibold text-gray-800">
                                                    {review.title}
                                                </h3>
                                                <p className="text-sm text-gray-500 mt-1">
                                                    @{review.user?.username || "Usuario anónimo"}
                                                </p>
                                            </div>
                                            <span className="text-sm text-gray-500 whitespace-nowrap">
                                                {new Date(review.createdAt).toLocaleDateString("es-ES", {
                                                    day: "numeric",
                                                    month: "short",
                                                    year: "numeric"
                                                })}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center mb-4">
                                    {renderRatingStars(review.rating)}
                                    <span className="ml-2 text-amber-600 font-medium">
                                        {review.rating}/5
                                    </span>
                                </div>

                                <p className="text-gray-600 leading-relaxed mb-4">
                                    {review.description}
                                </p>

                                {review.user?.id === user?.id && (
                                    <div className="flex gap-3 pt-4 border-t border-gray-100">
                                        <button
                                            onClick={() => {/* Implementar edición */ }}
                                            className="flex items-center gap-2 px-4 py-2 text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                                        >
                                            <FaEdit className="w-4 h-4" />
                                            Editar
                                        </button>
                                        <button
                                            onClick={() => handleDelete(review.id)}
                                            className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                        >
                                            <FaTrash className="w-4 h-4" />
                                            Eliminar
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ReviewsPage;