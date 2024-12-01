import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PlantillaUno from "../PlantillaUno";
import UserPicture1 from "./../../Styles/img/UsersBack/user1.svg";
import axiosInstance from "../../api/axios";

const InventoryEdit = () => {
  const { id } = useParams();
  const [inventario, setInventario] = useState({
    id: null,
    nombreProducto: "",
    quantity: 0,
    price: 0.0,
    unidadMedida: "", // Este campo podría ser reemplazado por unit_Id
  });
  const [units, setUnits] = useState([]); // Estado para las unidades
  const [unit_Id, setUnit_Id] = useState(""); // Estado para la unidad seleccionada
  const [showProfile, setShowProfile] = useState(false);
  const navigate = useNavigate();

  // Cargar unidades disponibles
  useEffect(() => {
    const fetchUnits = async () => {
      try {
        const response = await axiosInstance.get("/api/v1/oxi/units");
        if (response.status === 200 && response.data.data) {
          setUnits(response.data.data);
        }
      } catch (error) {
        console.error("Error al obtener las unidades:", error);
      }
    };

    const fetchProductData = async () => {
      try {
        const response = await axiosInstance.get(`/api/v1/oxi/product/find/${id}`);
        if (response.status === 200 && response.data.data) {
          setInventario({
            id: response.data.data.id,
            nombreProducto: response.data.data.name,
            quantity: response.data.data.quantity,
            price: response.data.data.price,
            unidadMedida: response.data.data.unidadMedida || "", // Obtener la unidad de medida
          });
          setUnit_Id(response.data.data.unit_Id || ""); // Establecer el id de la unidad seleccionada
        }
      } catch (error) {
        console.error("Error al obtener el producto:", error);
      }
    };

    if (id) {
      fetchProductData();
    }
    fetchUnits();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInventario((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedInventario = { ...inventario, unidadMedida: unit_Id }; // Agregar la unidad seleccionada
      const response = await axiosInstance.put(`/api/v1/oxi/product/update/${id}`, updatedInventario);
      if (response.status === 200) {
        alert("Producto actualizado exitosamente");
        navigate("/inventory/Home");
      }
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
    }
  };

  return (
    <PlantillaUno>
      <div className="row">
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
          <h3 className="border border-light rounded p-2">Inventario</h3>
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" href="/Inventory/Home">
                <i className="bi bi-bag-check"></i> Ver inventario
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/Inventory/Create">
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
                  <div className="mb-3">
                    <label htmlFor="unit" className="form-label" style={{ color: "#333" }}>
                      Unidad de Medición
                    </label>
                    <select
                      id="unit"
                      className="form-control"
                      value={unit_Id}
                      onChange={(e) => setUnit_Id(e.target.value)}
                      required
                    >
                      {units.map((unit) => (
                        <option key={unit.id} value={unit.id}>
                          {unit.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Guardar
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => navigate("/inventory/Home")}
                  >
                    Cancelar
                  </button>
                </form>
              </div>
            </div>
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

export default InventoryEdit;
