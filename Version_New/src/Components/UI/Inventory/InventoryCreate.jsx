import React, { useState } from "react";
import "./../../Styles/user.css";
import PlantillaUno from "../PlantillaUno";
import UserPicture1 from "./../../Styles/img/UsersBack/user1.svg";
import axiosInstance from "../../api/axios";
import { useNavigate } from "react-router-dom";
import { unitModel } from "../../Models/unitModel";  // Asegúrate de que unitModel es un array

const InventoryCreate = () => {
  // Estados para producto usando los modelos
  const [nombreProducto, setNombreProducto] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [state, setState] = useState("Disponible");
  const [unit_Id, setUnit_Id] = useState(3);  // Asignado por defecto a Metro Cúbico

  const navigate = useNavigate();

  // Verificar que unitModel sea un array antes de usarlo
  const units = Array.isArray(unitModel) ? unitModel : [];

  // Datos del producto con el modelo
  const productData = {
    data: {
      name: nombreProducto,
      quantity: parseInt(quantity),
      price: parseFloat(price),
      state: state === "Disponible",  // Convertir a booleano
      unit_id: parseInt(unit_Id),    // El ID de la unidad
    },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post(
        "/api/v1/oxi/product/add",  // Reemplaza con el endpoint correcto
        productData
      );
      console.log("Producto creado:", response.data);
      navigate("/Inventory/Home");  // Navegar al listado de inventarios
    } catch (error) {
      if (error.response) {
        console.error("Error del servidor:", error.response.data);
        console.error("Estado:", error.response.status);
      } else if (error.request) {
        console.error("Sin respuesta del servidor:", error.request);
      } else {
        console.error("Error al hacer la solicitud:", error.message);
      }
    }
  };

  return (
    <PlantillaUno>
      <div className="row">
        <div className="col-md-3 menu">
          {/* Menú de navegación */}
          <div className="imgrol text-center mt-2 mb-3">
            <img className="rounded img-fluid" src={UserPicture1} alt="Usuario1" />
          </div>
          <div className="infoRol text-center p-3 mt-3">
            <h5>Nombre de Usuario</h5>
            <h6>Rol</h6>
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
        </div>

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
                    <form onSubmit={handleSubmit}>
                      <div className="form-group">
                        <label htmlFor="nombreProducto">Nombre del Producto</label>
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
                          onChange={(e) => setState(e.target.value)}
                        >
                          <option value="Disponible">Disponible</option>
                          <option value="Agotado">Agotado</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label htmlFor="unit">Unidad de Medición</label>
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
      </div>
    </PlantillaUno>
  );
};

export default InventoryCreate;
