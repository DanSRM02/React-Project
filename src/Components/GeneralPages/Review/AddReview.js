import React, { useState } from 'react';
import "../../../Styles/user.css";
import PlantillaUno from '../../PlantillaUno';
import UserPicture1 from "../../../Styles/img/UsersBack/user1.svg"; 

function AddReview({ onAddReview }) {
    const [newReview, setNewReview] = useState({
        product: "",
        reviewer: "",
        rating: 1,
        comment: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewReview({ ...newReview, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const date = new Date().toISOString().split("T")[0];
        const reviewToAdd = { ...newReview, date };
        onAddReview(reviewToAdd);
        setNewReview({ product: "", reviewer: "", rating: 1, comment: "" });
    };
    
    const [showProfile, setShowProfile] = useState(false);

    return (
        <PlantillaUno>
            <div className="row">
                {/* Sidebar */}
                <div className="col-md-3 menu">
                    <div className="imgrol text-center mt-2 mb-3">
                        <img className="rounded img-fluid" src={UserPicture1} alt="Usuario1" />
                    </div>
                    <div className="infoRol text-center p-3 mt-3">
                        <h5>Nombre de Usuario</h5>
                        <h6>Rol</h6>
                    </div>
                    <div className="masInfo text-center mb-3">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => setShowProfile(true)}
                        >
                            Ver perfil
                        </button>
                    </div>
                    <hr />
                    <h3 className="border border-light rounded p-2">Productos</h3>
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link" href="/products">
                                <i className="bi bi-bag-check"></i> Ver Pedidos
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/User/Create">
                                <i className="bi bi-bag-plus"></i> Solicitar Pedido
                            </a>
                        </li>
                    </ul>
                    <hr />
                </div>
                
                {/* Main Content */}
                <div className="col-md-9" style={{ marginTop: '30px' }}>
                    <div className="container">
                        <h1 className="text-center seccion-titulo">Reseñar un Producto</h1>
                        <p className="text-center seccion-texto">Comparte tu experiencia con uno de nuestros productos.</p>
                        <div className="card mt-5">
                            <div className="card-header">
                                <strong>Reseñar Producto</strong>
                            </div>
                            <div className="card-body">
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="product" className="form-label">Producto</label>
                                        <input
                                            type="text"
                                            id="product"
                                            name="product"
                                            className="form-control"
                                            value={newReview.product}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="reviewer" className="form-label">Tu Nombre</label>
                                        <input
                                            type="text"
                                            id="reviewer"
                                            name="reviewer"
                                            className="form-control"
                                            value={newReview.reviewer}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="rating" className="form-label">Calificación</label>
                                        <select
                                            id="rating"
                                            name="rating"
                                            className="form-select"
                                            value={newReview.rating}
                                            onChange={handleInputChange}
                                            required
                                        >
                                            {[1, 2, 3, 4, 5].map((value) => (
                                                <option key={value} value={value}>{value} ⭐</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="comment" className="form-label">Comentario</label>
                                        <textarea
                                            id="comment"
                                            name="comment"
                                            className="form-control"
                                            value={newReview.comment}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-primary">Enviar Reseña</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PlantillaUno>
    );
}

export default AddReview;
