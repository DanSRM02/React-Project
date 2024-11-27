import React, { useState } from "react";
import "./../../Styles/user.css";
import PlantillaUno from "../PlantillaUno";
import UserPicture1 from "./../../Styles/img/UsersBack/user1.svg";
import axiosInstance from "../../api/axios";

const InventoryCreate = () => {
  // Manejo del estado para los campos del formulario
  const [nombreProducto, setNombreProducto] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [state, setState] = useState(true); // Usando un booleano para el estado
  const [showProfile, setShowProfile] = useState(false);
  const [unitId, setUnitId] = useState(1);

  // Crear un objeto con los datos del formulario
  const productData = {
    name: nombreProducto,
    quantity: quantity,
    price: price,
    state: state, // Usamos el valor booleano
    unit_id: unitId, // Agregamos unit_id
  };

  // Enviar los datos del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post(
        "/api/v1/oxi/product/add",
        productData
      );
      console.log("Producto creado:", response.data);
    } catch (error) {
      console.error("Error al crear el producto:", error);
    }
  };

  return (
    <PlantillaUno>
      <div className="row">
        <div className="col-md-3 menu">
          <div className="imgrol text-center mt-2 mb-3">
            <img
              className="rounded img-fluid"
              src={UserPicture1}
              alt="Usuario1"
            />
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
          <h3 className="border border-light rounded p-2">Inventario</h3>
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" href="/Inventory/Home">
                <i className="bi bi-bag-check"></i> Ver inventario
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/inventarios/Create">
                <i className="bi bi-bag-plus"></i> Añadir inventario
              </a>
            </li>
          </ul>
          <hr />
          <h3 className="mt-3 border border-light rounded p-2">Cuenta</h3>
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" href="/data-change">
                <i className="bi bi-globe"></i> Cambiar datos
              </a>
            </li>
          </ul>
          <hr />
        </div>

        {/* Contenido principal */}
        <div className="col-md-9" style={{ marginTop: "100px" }}>
          <h1 className="text-center seccion-titulo">Añadir inventario</h1>
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12">
                <div className="card card-default">
                  <div
                    className="card-header"
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span className="card-title">Añadir Producto</span>
                  </div>
                  <div className="card-body bg-white">
                    <form onSubmit={handleSubmit} role="form">
                      <div className="form-group">
                        <label htmlFor="nombreProducto">
                          Nombre del Producto
                        </label>
                        <input
                          type="text"
                          id="nombreProducto"
                          className="form-control"
                          value={nombreProducto}
                          onChange={(e) => setNombreProducto(e.target.value)}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="quantity">Cantidad</label>
                        <input
                          type="number"
                          id="quantity"
                          className="form-control"
                          value={quantity}
                          onChange={(e) => setQuantity(e.target.value)}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="price">Precio</label>
                        <input
                          type="number"
                          step="0.01"
                          id="price"
                          className="form-control"
                          value={price}
                          onChange={(e) => setPrice(e.target.value)}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="state">Estado</label>
                        <select
                          id="state"
                          className="form-control"
                          value={state}
                          onChange={(e) =>
                            setState(e.target.value === "Disponible")
                          }
                        >
                          <option value="Disponible">Disponible</option>
                          <option value="Agotado">Agotado</option>
                        </select>
                      </div>
                      <div className="mt-3" style={{ textAlign: "right" }}>
                        <button type="submit" className="btn btn-primary">
                          Añadir Producto
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal */}
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
                    style={{ width: "100px", height: "100px" }}
                  />
                  <p>
                    <strong>Nombre de Usuario:</strong> Nombre de Usuario
                  </p>
                  <p>
                    <strong>Rol:</strong> Rol
                  </p>
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
      </div>
    </PlantillaUno>
  );
};

export default InventoryCreate;
