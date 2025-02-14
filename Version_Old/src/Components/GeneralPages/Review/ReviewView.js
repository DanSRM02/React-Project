import React, { useState, useEffect } from "react";
import "../../../Styles/user.css";
import PlantillaUno from "../../PlantillaUno";
import UserPicture1 from "../../../Styles/img/UsersBack/user1.svg";
import axiosInstance from "../../../api/axios"; // Asegúrate de tener configurado axios

function ReviewView() {
  const [reviews, setReviews] = useState([]);
  const [showProfile, setShowProfile] = useState(false);
  const [error, setError] = useState("");

  // Obtener las reseñas desde la API
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axiosInstance.get("/api/v1/oxi/review/all"); // Endpoint que devuelve todas las reseñas
        if (response.status === 200) {
          setReviews(response.data.data || []); // Guarda las reseñas obtenidas
        } else {
          setError("No se pudieron cargar las reseñas.");
        }
      } catch (err) {
        console.error("Error al obtener reseñas:", err);
        setError("Error al cargar las reseñas. Intenta nuevamente más tarde.");
      }
    };

    fetchReviews();
  }, []);

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
            {error && <div className="alert alert-danger">{error}</div>}
            {reviews.length === 0 && !error && <p>No hay reseñas disponibles.</p>}
            {reviews.map((review) => (
              <div className="card my-3" key={review.id}>
                <div className="card-header">
                  <strong>{review.title}</strong> - {review.product.name} {/* Mostrar título de reseña y nombre del producto */}
                </div>
                <div className="card-body">
                  <p><strong>descripción:</strong> {review.message}</p>
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
