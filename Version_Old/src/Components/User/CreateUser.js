import React, { useState, useEffect } from "react";
import "./../../Styles/user.css";
import PlantillaUno from "../PlantillaUno";
import UserPicture1 from "./../../Styles/img/UsersBack/user1.svg";
import axiosInstance from "../../api/axios";

const CreateUser = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [orderItems, setOrderItems] = useState([{ product_id: "", quantity: "" }]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosInstance.get("/api/v1/oxi/product/all");
        console.log('Productos obtenidos:', response.data); // Verifica qué devuelve la API
        if (response.status === 200) {
          setProducts(response.data.data || []);
        } else {
          setError("No se pudo obtener productos.");
        }
      } catch (err) {
        console.error("Error al obtener productos:", err);
        setError("Error al cargar los productos. Por favor, inténtalo más tarde.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const addOrderItem = () => {
    setOrderItems([...orderItems, { product_id: "", quantity: "" }]);
  };

  const removeOrderItem = (index) => {
    setOrderItems(orderItems.filter((_, i) => i !== index));
  };

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const updatedItems = [...orderItems];
    updatedItems[index][name] = value;
    setOrderItems(updatedItems);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    // Validaciones
    if (orderItems.some((item) => !item.product_id || item.quantity <= 0)) {
      setError("Todos los productos deben tener una cantidad válida.");
      return;
    }

    const uniqueProducts = new Set(orderItems.map((item) => item.product_id));
    if (uniqueProducts.size < orderItems.length) {
      setError("No puedes seleccionar el mismo producto más de una vez.");
      return;
    }

    const orderData = {
      data: {
        state: true,
        user_id: 1,
        product_ids: orderItems.map((item) => ({
          id: Number(item.product_id),
          quantity: Number(item.quantity),
        })),
      },
    };

    try {
      const response = await axiosInstance.post("/api/v1/oxi/order/add", orderData);
      if (response.status === 200) {
        alert("Pedido realizado con éxito");

        // Manejo de la descarga del PDF
        if (response.data.pdfUrl) {
          const link = document.createElement('a');
          link.href = response.data.pdfUrl;
          link.download = 'pedido.pdf';
          link.click();
        } else if (response.data.pdfData) {
          const blob = new Blob([response.data.pdfData], { type: 'application/pdf' });
          const link = document.createElement('a');
          link.href = URL.createObjectURL(blob);
          link.download = 'pedido.pdf';
          link.click();
        }

        setOrderItems([{ product_id: "", quantity: "" }]); // Resetear el formulario
      }
    } catch (err) {
      console.error("Error al realizar el pedido:", err);
      const message =
        err.response?.status === 400
          ? "El pedido no pudo ser procesado. Verifica los datos e inténtalo nuevamente."
          : "Ocurrió un error inesperado. Inténtalo más tarde.";
      setError(message);
    }
  };

  const renderOrderItem = (item, index) => (
    <div className="row mb-3" key={index}>
      <div className="col-md-6">
        <label htmlFor={`product_id_${index}`}>Producto</label>
        <select
          id={`product_id_${index}`}
          name="product_id"
          className="form-select"
          value={item.product_id}
          onChange={(e) => handleInputChange(index, e)}
          required
        >
          <option value="" disabled>
            Selecciona un producto
          </option>
          {products.length > 0 ? (
            products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.name}
              </option>
            ))
          ) : (
            <option disabled>No hay productos disponibles</option>
          )}
        </select>
      </div>
      <div className="col-md-4">
        <label htmlFor={`quantity_${index}`}>Cantidad</label>
        <input
          type="number"
          name="quantity"
          className="form-control"
          min="1"
          value={item.quantity}
          onChange={(e) => handleInputChange(index, e)}
          required
        />
      </div>
      <div className="col-md-2 d-flex align-items-end">
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => removeOrderItem(index)}
        >
          Eliminar
        </button>
      </div>
    </div>
  );

  return (
    <PlantillaUno>
      <div className="row">
        <div className="col-md-3 menu">
          <div className="imgrol text-center mt-2 mb-3">
            <img className="rounded img-fluid" src={UserPicture1} alt="Usuario" />
          </div>
          <div className="infoRol text-center p-3 mt-3">
            <h5>Nombre de Usuario</h5>
            <h6>Rol</h6>
          </div>
          <hr />
          <h3 className="border border-light rounded p-2">Cuenta</h3>
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" href="/data-change">
                <i className="bi bi-globe"></i> Cambiar datos
              </a>
            </li>
          </ul>
        </div>

        <div className="col-md-9" style={{ marginTop: "100px" }}>
          <h1 className="text-center text-primary">Solicitar Pedido</h1>
          <form onSubmit={handleSubmit}>
            {error && <div className="alert alert-danger">{error}</div>}
            {orderItems.map(renderOrderItem)}
            <div className="text-end">
              <button type="button" className="btn btn-secondary" onClick={addOrderItem}>
                Agregar Producto
              </button>
              <button type="submit" className="btn btn-primary ms-2">
                Realizar Pedido
              </button>
            </div>
          </form>
        </div>
      </div>
    </PlantillaUno>
  );
};

export default CreateUser;
