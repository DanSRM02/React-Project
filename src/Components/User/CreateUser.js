import React, { useState } from 'react';
import PlantillaUno from '../PlantillaUno';

function CreateUser({ productStocks = [] }) {
  const [orderItems, setOrderItems] = useState([{ productstock_id: '', quantity: 1 }]);

  const addOrderItem = () => {
    setOrderItems([...orderItems, { productstock_id: '', quantity: 1 }]);
  };

  const removeOrderItem = (index) => {
    const newOrderItems = orderItems.filter((_, i) => i !== index);
    setOrderItems(newOrderItems);
  };

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const newOrderItems = [...orderItems];
    newOrderItems[index][name] = value;
    setOrderItems(newOrderItems);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Pedido realizado:', orderItems);
  };

  return (
    <PlantillaUno>
      {/* Contenedor padre con clase row para alinear la barra lateral y el contenido principal */}
      <div className="row">
        <div className="col-md-3 menu">
          {/* Barra lateral */}
          <div className="imgrol text-center mt-4 mb-3">
            <img className="rounded img-fluid" src="/static/img/UsersBack/user1.jpg" alt="Usuario1" />
          </div>
          <div className="infoROl text-center p-3 mt-3">
            <h5>Nombre de Usuario</h5>
            <h6>Rol</h6>
          </div>
          <div className="masInfo text-center mb-3">
            <button type="button" className="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#exampleModal">
              Ver perfil
            </button>
          </div>
          <hr />
          <h3 className="border border-light rounded p-2">Productos</h3>
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" href="/products">
                <i className="bi bi-bag-check"></i> Ver Pedido
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/cancel">
                <i className="bi bi-bag-x"></i> Cancelar Pedido
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/create">
                <i className="bi bi-bag-plus"></i> Solicitar Pedido
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

        {/* Contenedor principal de Solicitar Pedido */}
        <div className="col-md-9">
          <h1 className="text-center seccion-titulo">Solicitar Pedido</h1>
          <p className="text-center seccion-texto">Selecciona los productos y cantidades que deseas solicitar</p>
          <div className="container-fluid">
            <div className="card card-default">
              <div className="card-header d-flex justify-content-between align-items-center">
                <span className="card-title">Crear Pedido</span>
              </div>
              <div className="card-body bg-white">
                <form id="order-form" onSubmit={handleSubmit}>
                  <div id="order-list">
                    {orderItems.map((item, index) => (
                      <div className="order-item row mb-3" key={index}>
                        <div className="col-md-6">
                          <label htmlFor={`productstock_id_${index}`}>Producto</label>
                          <select
                            name="productstock_id"
                            className="form-select"
                            value={item.productstock_id}
                            onChange={(e) => handleInputChange(index, e)}
                            required
                          >
                            <option value="">Seleccionar Producto</option>
                            {productStocks.map((productStock) => (
                              <option key={productStock.id} value={productStock.id}>
                                {productStock.product.name} - {productStock.unit.name}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="col-md-4">
                          <label htmlFor={`quantity_${index}`}>Cantidad</label>
                          <input
                            type="number"
                            name="quantity"
                            className="form-control"
                            min="1"
                            max="50"
                            value={item.quantity}
                            onChange={(e) => handleInputChange(index, e)}
                            required
                          />
                        </div>
                        <div className="col-md-2 d-flex align-items-end">
                          <button type="button" className="btn btn-secondary" onClick={() => removeOrderItem(index)}>
                            Eliminar
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="text-end mt-3">
                    <button type="button" className="btn btn-secondary me-2" onClick={addOrderItem}>
                      Agregar Producto
                    </button>
                    <button type="submit" className="btn btn-primary">
                      Realizar Pedido
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PlantillaUno>
  );
}

export default CreateUser;
