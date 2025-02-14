import React, { useState, useEffect } from 'react';
import './../../Styles/user.css';
import PlantillaUno from '../PlantillaUno';
import UserPicture1 from './../../Styles/img/UsersBack/user1.svg';
import axiosInstance from '../../api/axios';
import { useNavigate } from 'react-router-dom';

const HomeUser = ({ userId }) => {
  const navigate = useNavigate();
  const [showProfile, setShowProfile] = useState(false);
  const [userPurchases, setUserPurchases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null); // Store the selected order for editing

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get(`/api/v1/oxi/order/all`);
        if (response.data?.data) {
          setUserPurchases(response.data.data);
        } else {
          console.error("No data found in response");
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleEdit = (order) => {
    setSelectedOrder({ ...order });
  };

  const handleOrderUpdate = async () => {
    if (!selectedOrder) return;

    try {
      const updatedOrderData = {
        state: Boolean(selectedOrder.state), // Ensure the state is a boolean
        user_id: 1, // Adjust as needed
        product_ids: selectedOrder.productList.map(product => ({ id: product.id })),
      };

      const response = await axiosInstance.put(
        `/api/v1/oxi/order/update/${selectedOrder.id}`,
        { data: updatedOrderData }
      );

      if (response.status === 200) {
        setUserPurchases(prevOrders =>
          prevOrders.map(order =>
            order.id === selectedOrder.id ? { ...order, ...updatedOrderData } : order
          )
        );
        setSelectedOrder(null); // Close modal after updating
        navigate(0); // Refresh the page
      } else {
        console.error('Error: Could not update order.');
      }
    } catch (error) {
      console.error('Error updating order:', error.response?.data || error.message);
      alert("Error al actualizar la orden. Intente nuevamente.");
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
          <h3 className="border border-light rounded p-2">Productos</h3>
          <ul className="navbar-nav">
            <li className="nav-item"><a className="nav-link" href="/Home/User"><i className="bi bi-bag-check"></i> Ver Pedido</a></li>
            <li className="nav-item"><a className="nav-link" href="/User/Create"><i className="bi bi-bag-plus"></i> Solicitar Pedido</a></li>
          </ul>
          <hr />
        </div>

        <div className="col-md-9" style={{ marginTop: "100px" }}>
          <h2 className="text-center text-primary mb-4">Gestión de Pedidos</h2>
          {loading ? (
            <div className="text-center">Cargando...</div>
          ) : (
            <div className="table-responsive">
              <table className="table table-striped table-bordered align-middle">
                <thead className="table-light">
                  <tr>
                    <th>ID</th>
                    <th>Productos</th>
                    <th>Cantidad</th>
                    <th>Precio Total</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {userPurchases.length === 0 ? (
                    <tr><td colSpan="6" className="text-center">No se han encontrado pedidos.</td></tr>
                  ) : (
                    userPurchases.map(order => (
                      <tr key={order.id}>
                        <td>{order.id}</td>
                        <td>
                          {order.productList?.length ? (
                            order.productList.map((product, index) => (
                              <div key={index}>
                                <p><strong>Producto:</strong> {product.name}</p>
                                <p><strong>Cantidad:</strong> {product.quantity}</p>
                              </div>
                            ))
                          ) : <p>No hay productos</p>}
                        </td>
                        <td>{order.productList?.reduce((total, product) => total + product.quantity, 0)}</td>
                        <td>${order.productList?.reduce((total, product) => total + (product.price * product.quantity), 0).toFixed(2)}</td>
                        <td>{order.state ? "En proceso" : "Cancelado"}</td>
                        <td>
                          <button
                            onClick={() => handleEdit(order)}
                            className="btn btn-warning btn-sm"
                          >
                            Editar
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {selectedOrder && (
        <div className="modal show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Editar Orden</h5>
                <button type="button" className="close" onClick={() => setSelectedOrder(null)} aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label>ID de la Orden</label>
                  <input
                    type="text"
                    className="form-control"
                    value={selectedOrder.id}
                    readOnly
                  />
                </div>
                <div className="form-group">
                  <label>Estado</label>
                  <select
                    className="form-control"
                    value={selectedOrder.state}
                    onChange={(e) => setSelectedOrder({ ...selectedOrder, state: e.target.value === 'true' })}
                  >
                    <option value="true">En proceso</option>
                    <option value="false">Cancelado</option>
                  </select>
                </div>
                <div className="form-group mt-3">
                  <button className="btn btn-primary" onClick={handleOrderUpdate}>Guardar cambios</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </PlantillaUno>
  );
};

export default HomeUser;
