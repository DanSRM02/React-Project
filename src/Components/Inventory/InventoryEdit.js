import React, { useState } from "react";
import PlantillaUno from "../PlantillaUno";
import UserPicture1 from "./../../Styles/img/UsersBack/user1.svg";

const InventoryEdit = ({ initialData, onSubmit }) => {
  const [inventario, setInventario] = useState({
    id: initialData?.id || null,
    nombreProducto: initialData?.nombreProducto || "",
    productID: initialData?.productID || "",
    quantity: initialData?.quantity || 0,
    price: initialData?.price || 0.0,
  });
  const [showProfile, setShowProfile] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInventario((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(inventario);
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

        <div className="col-md-9" style={{ marginTop: "100px" }}>
          <div className="row p-1">
            <div className="col-md-12">
              <h1 className="mt-4">
                {inventario.id ? "Editar Producto" : "Nuevo Producto"}
              </h1>
              <div
                className="border rounded p-4 bg-light shadow-sm"
                style={{ borderColor: "#4CAF50" }}
              >
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label
                      htmlFor="nombreProducto"
                      className="form-label"
                      style={{ color: "#333" }}
                    >
                      Nombre del Producto
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="nombreProducto"
                      name="nombreProducto"
                      value={inventario.nombreProducto}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="quantity"
                      className="form-label"
                      style={{ color: "#333" }}
                    >
                      Cantidad
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="quantity"
                      name="quantity"
                      value={inventario.quantity}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="price"
                      className="form-label"
                      style={{ color: "#333" }}
                    >
                      Precio
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="price"
                      name="price"
                      value={inventario.price}
                      onChange={handleChange}
                      step="0.01"
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Guardar
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => (window.location.href = "/inventarios")}
                  >
                    Cancelar
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de perfil */}
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
    </PlantillaUno>
  );
};

export default InventoryEdit;
