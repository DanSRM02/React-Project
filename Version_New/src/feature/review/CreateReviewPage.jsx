import React, { useEffect } from "react";
import { useFormik } from "formik";
import { useReviews } from "../../hooks/useReviews";
import { useProductVariants } from "../../hooks/useProductVariants";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { reviewSchema } from "../../utils/validation/validationSchema";


const CreateReviewPage = () => {
    const { user } = useAuth();
    const { addReview, loading, error } = useReviews();
    const navigate = useNavigate();
    const { variants, loading: productLoading, error: errorProduct, fetchVariants } = useProductVariants();

    const formik = useFormik({
        initialValues: {
            title: "",
            description: "",
            rating: "",
            productId: ""
        },
        validationSchema: reviewSchema,
        onSubmit: async (values, { resetForm }) => {
            const reviewData = {
                data: {
                    ...values,
                    rating: Number(values.rating),
                    product_id: Number(values.productId),
                    state: true,
                    user_id: user.id
                }
            };

            try {
                await addReview(reviewData);
                resetForm();
                navigate("/client/reviews");
            } catch (err) {
                // El error se maneja en el hook
            }
        }
    });

    useEffect(() => {
        fetchVariants();
    }, []);

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-3xl font-bold text-amber-600 mb-8">Crear Nueva Reseña</h1>

            <form onSubmit={formik.handleSubmit} className="space-y-6">
                <div className="space-y-4">
                    {/* Campo Título */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Título
                        </label>
                        <input
                            type="text"
                            name="title"
                            value={formik.values.title}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 ${formik.errors.title && formik.touched.title
                                    ? "border-red-500 focus:ring-red-500"
                                    : "border-amber-300 focus:ring-amber-500"
                                }`}
                        />
                        {formik.errors.title && formik.touched.title && (
                            <div className="text-red-500 text-sm mt-1">{formik.errors.title}</div>
                        )}
                    </div>

                    {/* Campo Descripción */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Descripción
                        </label>
                        <textarea
                            name="description"
                            value={formik.values.description}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 h-32 ${formik.errors.description && formik.touched.description
                                    ? "border-red-500 focus:ring-red-500"
                                    : "border-amber-300 focus:ring-amber-500"
                                }`}
                        />
                        {formik.errors.description && formik.touched.description && (
                            <div className="text-red-500 text-sm mt-1">{formik.errors.description}</div>
                        )}
                    </div>

                    {/* Campo Calificación */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Calificación
                        </label>
                        <select
                            name="rating"
                            value={formik.values.rating}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 bg-white ${formik.errors.rating && formik.touched.rating
                                    ? "border-red-500 focus:ring-red-500"
                                    : "border-amber-300 focus:ring-amber-500"
                                }`}
                        >
                            <option value="">Selecciona una calificación</option>
                            {[1, 2, 3, 4, 5].map((num) => (
                                <option key={num} value={num}>
                                    {Array(num).fill('★').join('')} ({num} Estrella{num > 1 ? 's' : ''})
                                </option>
                            ))}
                        </select>
                        {formik.errors.rating && formik.touched.rating && (
                            <div className="text-red-500 text-sm mt-1">{formik.errors.rating}</div>
                        )}
                    </div>

                    {/* Campo Producto */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Seleccionar Producto
                        </label>
                        <select
                            name="productId"
                            value={formik.values.productId}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 bg-white ${formik.errors.productId && formik.touched.productId
                                    ? "border-red-500 focus:ring-red-500"
                                    : "border-amber-300 focus:ring-amber-500"
                                }`}
                        >
                            <option value="">Selecciona un producto</option>
                            {variants?.map((product) => (
                                <option key={product.id} value={product.id}>
                                    {product.name}
                                </option>
                            ))}
                        </select>
                        {formik.errors.productId && formik.touched.productId && (
                            <div className="text-red-500 text-sm mt-1">{formik.errors.productId}</div>
                        )}
                    </div>
                </div>

                {/* Botón de enviar */}
                <button
                    type="submit"
                    disabled={loading || !formik.isValid}
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