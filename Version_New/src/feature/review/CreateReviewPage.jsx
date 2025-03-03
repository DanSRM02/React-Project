import React, { useEffect, useState } from "react";
import { useReviews } from "../../hooks/useReviews";
import { useProductVariants } from "../../hooks/useProductVariants";
import { useNavigate } from "react-router-dom";

const CreateReviewPage = () => {
    const { addReview, loading, error } = useReviews();
    const navigate = useNavigate();
    const { variants, loading: productLoading, error: errorProduct, fetchVariants } = useProductVariants();

    useEffect(() => {
        fetchVariants();
    }, []);

    // Estados para los campos del formulario
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [rating, setRating] = useState("");
    const [productId, setProductId] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Crear objeto con la estructura requerida por la API
        const reviewData = {
            data: {
                title,
                description,
                rating: Number(rating),
                product_id: Number(productId),
                state: true, // Valor por defecto
                user_id: 1 // Temporal - debería obtenerse del contexto de autenticación
            }
        };

        try {
            await addReview(reviewData);
            navigate("/client/reviews");
            // Resetear formulario después de enviar
            setTitle("");
            setDescription("");
            setRating("");
            setProductId("");
        } catch (err) {
            // El error ya se maneja en el hook
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-3xl font-bold text-amber-600 mb-8">Crear Nueva Reseña</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Grupo de Campos */}
                <div className="space-y-4">
                    {/* Título */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Título
                        </label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full px-4 py-2 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                            required
                        />
                    </div>

                    {/* Descripción */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Descripción
                        </label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full px-4 py-2 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 h-32"
                            required
                        />
                    </div>

                    {/* Calificación */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Calificación
                        </label>
                        <select
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                            className="w-full px-4 py-2 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-white"
                            required
                        >
                            <option value="">Selecciona una calificación</option>
                            {[1, 2, 3, 4, 5].map((num) => (
                                <option key={num} value={num} className="flex items-center">
                                    {Array(num).fill('★').join('')} ({num} Estrella{num > 1 ? 's' : ''})
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Producto */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Seleccionar Producto
                        </label>
                        <select
                            value={productId}
                            onChange={(e) => setProductId(e.target.value)}
                            className="w-full px-4 py-2 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-white"
                            required
                        >
                            <option value="">Selecciona un producto</option>
                            {variants?.map((product) => (
                                <option key={product.id} value={product.id}>
                                    {product.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Botón de enviar */}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? "Enviando..." : "Publicar Reseña"}
                </button>

                {error && (
                    <div className="p-3 bg-red-50 text-red-700 rounded-lg border border-red-200">
                        Error: {error.message}
                    </div>
                )}
            </form>
        </div>
    );
};

export default CreateReviewPage;    