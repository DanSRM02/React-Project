import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PlantillaUno from "../PlantillaUno";
import UserPicture1 from "./../../Styles/img/UsersBack/user1.svg";
import axiosInstance from "../../api/axios";
import { unitModel } from "../../Models/unitModel"; // Importar el modelo

const InventoryEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Estados para producto
  const [nombreProducto, setNombreProducto] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [unit_Id, setUnit_Id] = useState("");
  const [state, setState] = useState("Disponible");

  // Cargar datos del producto al montar
  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await axiosInstance.get(`/api/v1/oxi/product/find/${id}`);
        const product = response.data.data;
        setNombreProducto(product.name || "");
        setQuantity(product.quantity || "");
        setPrice(product.price || "");
        setUnit_Id(product.unit_Id || ""); // Asegúrate de cargar la unidad seleccionada
      } catch (error) {
        console.error("Error al cargar producto:", error);
        alert("Error al cargar los datos del producto. Intente nuevamente.");
      }
    };

    if (id) fetchProductData();
  }, [id]);

  // Manejo del envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const updatedProduct = {  
      name: nombreProducto,
      quantity: parseInt(quantity),
      price: parseFloat(price),
      state: state === "Disponible",  // Convertir a booleano
      unit_id: parseInt(unit_Id),    // El ID de la unidad
    };
  
    // Log de los datos antes de enviarlos
    console.log("Datos enviados:", { data: updatedProduct });
  
    try {
      const response = await axiosInstance.put(`/api/v1/oxi/product/update/${id}`, {
        data: updatedProduct,
      });
      if (response.status === 200) {
        alert("Producto actualizado con éxito");
        navigate("/inventory/Home");
      }
    } catch (error) {
      console.error("Error al actualizar producto:", error);
      alert("Error al actualizar el producto. Intente nuevamente.");
    }
  };
  

  return (
    <PlantillaUno>
      <div className="row">
        <div className="col-md-3 menu">
          <div className="imgrol text-center mt-2 mb-3">
            <img className="rounded img-fluid" src={UserPicture1} alt="Usuario1" />
          </div>
          <h3 className="border border-light rounded p-2">Inventario</h3>
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" href="/Inventory/Home">
                <i className="bi bi-bag-check"></i> Ver inventario
              </a>
            </li>
          </ul>
        </div>

        <div className="col-md-9" style={{ marginTop: "100px" }}>
          <h1 className="text-center">Editar Producto</h1>
          <form onSubmit={handleSubmit} className="p-4 bg-light rounded shadow-sm">
  <div className="form-group">
    <label htmlFor="nombreProducto" className="form-label">
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
    <label htmlFor="quantity" className="form-label">
      Cantidad
    </label>
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
    <label htmlFor="price" className="form-label">
      Precio
    </label>
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
    <label htmlFor="state" className="form-label">
      Estado
    </label>
    <select
      id="state"
      className="form-control"
      value={state}
      onChange={(e) => setState(e.target.value)}
      required
    >
      <option value="Disponible">Disponible</option>
      <option value="Agotado">Agotado</option>
    </select>
  </div>

  <div className="form-group">
    <label htmlFor="unit" className="form-label">
      Unidad de Medición
    </label>
    <select
      id="unit"
      className="form-control"
      value={unit_Id}
      onChange={(e) => setUnit_Id(e.target.value)}
      required
    >
      <option value="" disabled>
        Seleccione una unidad
      </option>
      {unitModel.map((unit) => (
        <option key={unit.id} value={unit.id}>
          {unit.name}
        </option>
      ))}
    </select>
  </div>

  <div className="mt-3" style={{ textAlign: "right" }}>
    <button type="submit" className="btn btn-primary me-2">
      Guardar
    </button>
    <button
      type="button"
      className="btn btn-secondary"
      onClick={() => navigate("/inventory/Home")}
    >
      Cancelar
    </button>
  </div>
</form>

        </div>
      </div>
    </PlantillaUno>
  );
};

export default InventoryEdit;
