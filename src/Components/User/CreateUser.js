import React, { useState } from 'react';
import PlantillaUser from './PlantillaUser';

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
    <PlantillaUser title="User">
      <div>
        <h1 className="text-center seccion-titulo">Solicitar Pedido</h1>
        <p className="text-center seccion-texto">
          Selecciona los productos y las cantidades que deseas solicitar
        </p>

        <div className="row mt-5 justify-content-center">
          <div className="col-md-8">
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
                      >
                        <option value="">Seleccionar Producto</option>
                        {productStocks.length > 0 ? (
                          productStocks.map((productStock) => (
                            <option key={productStock.id} value={productStock.id}>
                              {productStock.product.name} - {productStock.unit.name}
                            </option>
                          ))
                        ) : (
                          <option value="">No hay productos disponibles</option>
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
                        max="50"
                        value={item.quantity}
                        onChange={(e) => handleInputChange(index, e)}
                        required
                      />
                    </div>
                    <div className="col-md-2 d-flex align-items-end">
                      <button
                        type="button"
                        className="btn btn-secondary remove-order-item"
                        onClick={() => removeOrderItem(index)}
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-center">
                <button type="button" id="add-order-item" className="btn btn-secondary" onClick={addOrderItem}>
                  Agregar Producto
                </button>
                <button type="submit" className="btn btn-secondary">
                  Realizar Pedido
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </PlantillaUser>
  );
}

export default CreateUser;
