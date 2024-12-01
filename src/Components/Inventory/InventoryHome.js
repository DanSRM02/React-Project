import React, { useState, useEffect } from "react";
import "./../../Styles/user.css";
import PlantillaUno from "../PlantillaUno";
import UserPicture1 from "./../../Styles/img/UsersBack/user1.svg";
import axiosInstance from "../../api/axios";

const InventoryHome = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosInstance.get("/api/v1/oxi/product/all");
        if (response.status === 200) {
          setProducts(response.data.data || []); // Ajuste para evitar valores nulos
        }
      } catch (error) {
        console.error("Error al obtener productos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("¿Estás seguro de eliminar este producto?")) {
      axiosInstance
        .delete(`/api/v1/oxi/product/delete/${id}`)
        .then((response) => {
          if (response.status === 200) {
            setProducts(products.filter((product) => product.id !== id)); // Eliminar el producto de la lista
            alert("Producto eliminado correctamente");
          }
        })
        .catch((error) => {
          console.error("Error al eliminar el producto:", error);
          alert("Error al eliminar el producto");
        });
    }
  };

  if (loading) {
    return (
      <PlantillaUno>
        <p className="text-center mt-5">Cargando productos...</p>
      </PlantillaUno>
    );
  }

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
          <h2 className="text-center text-primary mb-4">Gestión de Inventarios</h2>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h4>Productos Registrados</h4>
            <a href="/inventory/Create" className="btn btn-success">
              <i className="bi bi-plus-circle"></i> Agregar Nuevo Producto
            </a>
          </div>
          <div className="table-responsive">
            <table className="table table-striped table-bordered align-middle">
              <thead className="table-light">
                <tr>
                  <th>ID</th>
                  <th>Producto</th>
                  <th>Cantidad</th>
                  <th>Precio</th>
                  <th>Unidad de Medida</th>
                  <th>Estado</th>
                  <th>Acciones</th> {/* Nueva columna para acciones */}
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>{product.name}</td>
                    <td>{product.quantity}</td>
                    <td>${product.price.toFixed(2)}</td>
                    <td>
                      {product.unit && product.unit.unitType
                        ? product.unit.unitType
                        : "Sin unidad asignada"}
                    </td>
                    <td>{product.state ? "Disponible" : "Agotado"}</td>
                    <td>
                      <a
                        href={`/inventory/Edit/${product.id}`}
                        className="btn btn-warning btn-sm"
                      >
                        Editar
                      </a>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="btn btn-danger btn-sm ms-2"
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

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

export default InventoryHome;
