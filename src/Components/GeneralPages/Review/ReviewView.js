import React, { useState } from 'react';
import "../../../Styles/user.css";
import PlantillaUno from '../../PlantillaUno';
import UserPicture1 from "../../../Styles/img/UsersBack/user1.svg";

function ReviewView() {
    const [reviews, setReviews] = useState([
        {
          id: 1,
          product: "Gas 20L",
          reviewer: "Juan Pérez",
          rating: 5,
          comment: "Excelente producto, llegó a tiempo y en perfectas condiciones.",
          date: "2024-11-20",
        },
        {
          id: 2,
          product: "Gas 30L",
          reviewer: "María Gómez",
          rating: 4,
          comment: "Buen producto, pero el tiempo de entrega fue un poco largo.",
          date: "2024-11-22",
        },
        {
          id: 3,
          product: "Gas 10L",
          reviewer: "Carlos Sánchez",
          rating: 3,
          comment: "El producto no era exactamente lo que esperaba.",
          date: "2024-11-25",
        },
      ]);
    
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
                <li className="nav-item">
                  <a className="nav-link" href="/Review/Add">
                    <i className="bi bi-bag-plus"></i> Reseñar Producto
                  </a>
                </li>
              </ul>
              <hr />
            </div>
    
            {/* Reseñas */}
            <div className="col-md-9" style={{ marginTop: '100px' }}>
              <h1 className="text-center seccion-titulo">Reseñas de Productos</h1>
              <p className="text-center seccion-texto">
                Aquí puedes leer las opiniones de otros usuarios sobre nuestros productos.
              </p>
              <div className="container-fluid">
                {reviews.map((review) => (
                  <div className="card my-3" key={review.id}>
                    <div className="card-header">
                      <strong>{review.product}</strong> - Reseña de {review.reviewer}
                    </div>
                    <div className="card-body">
                      <p><strong>Calificación:</strong> {Array(review.rating).fill('⭐').join('')}</p>
                      <p><strong>Comentario:</strong> {review.comment}</p>
                      <p><small><strong>Fecha:</strong> {review.date}</small></p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
    
          {/* Modal del perfil */}
          {showProfile && (
            <div className="modal show d-block" tabIndex="-1" role="dialog">
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Perfil de Usuario</h5>
                    <button
                      type="button"
                      className="close"
                      onClick={() => setShowProfile(false)}
                      aria-label="Close"
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body text-center">
                    <img
                      src={UserPicture1}
                      alt="Usuario1"
                      className="rounded-circle img-fluid mb-3"
                      style={{ width: '100px', height: '100px' }}
                    />
                    <p><strong>Nombre de Usuario:</strong> Nombre de Usuario</p>
                    <p><strong>Rol:</strong> Rol</p>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => setShowProfile(false)}
                    >
                      Cerrar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </PlantillaUno>
    );
}

export default ReviewView;
