import React, { useEffect, useState } from 'react';

const ReviewsPage = () => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        fetch("/api/my-reviews")
            .then((res) => res.json())
            .then((data) => setReviews(data))
            .catch((err) => console.error(err));
    }, []);

    return (
        // <div>
        //     <h2 className="text-2xl font-bold mb-4">Mis Reseñas</h2>
        //     {reviews.map((review) => (
        //         <div key={review.review_id} className="bg-white p-4 shadow rounded mb-4">
        //             <p><strong>Producto ID:</strong> {review.product_id}</p>
        //             <p><strong>Comentario:</strong> {review.message}</p>
        //             {/* Botones para editar o eliminar reseña */}
        //         </div>
        //     ))}
        // </div>
        <h1>Reviews</h1>
    );
};

export default ReviewsPage;
