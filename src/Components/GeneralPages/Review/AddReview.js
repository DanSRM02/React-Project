import React, { useState, useEffect } from "react";
import "../../../Styles/user.css";
import PlantillaUno from "../../PlantillaUno";
import UserPicture1 from "../../../Styles/img/UsersBack/user1.svg";
import axiosInstance from "../../../api/axios";

const AddReview = () => {
  const [newReview, setNewReview] = useState({
    title: "",
    description: "",
    message: "",
    product_id: "",
    user_id: "1",
  });
  const [products, setProducts] = useState([]); // Estado para almacenar los productos
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Obtener productos desde la API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosInstance.get("/api/v1/oxi/product/all");
        if (response.status === 200) {
          setProducts(response.data.data || []); // Asegura que los datos estén en un array
        } else {
          setError("No se pudieron cargar los productos.");
        }
      } catch (err) {
        console.error("Error al obtener productos:", err);
        setError("Error al cargar los productos. Intenta nuevamente más tarde.");
      }
    };

    fetchProducts();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReview({ ...newReview, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validación básica
    if (!newReview.title || !newReview.description || !newReview.message || !newReview.product_id) {
      setError("Por favor completa todos los campos.");
      return;
    }

    // Preparar los datos para el envío (sin el campo state)
    const reviewData = {
      data: {
        title: newReview.title,
        description: newReview.description, // Se incluye la descripción
        message: newReview.message,
        product_id: Number(newReview.product_id),
        user_id: Number(newReview.user_id),
      },
    };

    try {
      const response = await axiosInstance.post("/api/v1/oxi/review/add", reviewData);
      if (response.status === 200) {
        setSuccess("¡Reseña enviada con éxito!");
        setNewReview({
          title: "",
          description: "",
          message: "",
          product_id: "",
          user_id: "1",
        });
      }
    } catch (err) {
      console.error("Error al enviar la reseña:", err);
      setError(
        err.response?.status === 400
          ? "No se pudo enviar la reseña. Verifica los datos ingresados."
          : "Ocurrió un error inesperado. Inténtalo más tarde."
      );
    }
  };

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
          <hr />
          <h3 className="border border-light rounded p-2">Productos</h3>
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" href="/products">
                <i className="bi bi-bag-check"></i> Ver Pedidos
              </a>
            </li>
          </ul>
          <hr />
        </div>

        {/* Main Content */}
        <div className="col-md-9" style={{ marginTop: "30px" }}>
          <div className="container">
            <h1 className="text-center seccion-titulo">Reseñar un Producto</h1>
            <p className="text-center seccion-texto">Comparte tu experiencia con uno de nuestros productos.</p>
            <div className="card mt-5">
              <div className="card-header">
                <strong>Reseñar Producto</strong>
              </div>
              <div className="card-body">
                {error && <div className="alert alert-danger">{error}</div>}
                {success && <div className="alert alert-success">{success}</div>}
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="title" className="form-label">Título</label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      className="form-control"
                      value={newReview.title}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="description" className="form-label">Descripción</label>
                    <textarea
                      id="description"
                      name="description"
                      className="form-control"
                      value={newReview.description}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="message" className="form-label">Mensaje</label>
                    <textarea
                      id="message"
                      name="message"
                      className="form-control"
                      value={newReview.message}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="product_id" className="form-label">Producto</label>
                    <select
                      id="product_id"
                      name="product_id"
                      className="form-select"
                      value={newReview.product_id}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="" disabled>
                        Selecciona un producto
                      </option>
                      {products.map((product) => (
                        <option key={product.id} value={product.id}>
                          {product.name}
                        </option>
                      ))}
                    </select>
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
};

export default AddReview;
