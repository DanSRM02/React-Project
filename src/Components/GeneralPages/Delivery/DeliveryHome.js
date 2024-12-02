import React, { useState, useEffect } from 'react';
import './../../../Styles/user.css';
import PlantillaUno from '../../PlantillaUno';
import UserPicture1 from './../../../Styles/img/UsersBack/user1.svg';
import axiosInstance from '../../../api/axios';

const DeliveryHome = ({ userId }) => {
  const [showProfile, setShowProfile] = useState(false);
  const [userPurchases, setUserPurchases] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch user orders on component mount
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
            <li className="nav-item"><a className="nav-link" href="/products"><i className="bi bi-bag-check"></i> Ver Pedido</a></li>
            <li className="nav-item"><a className="nav-link" href="/User/CancelOrder"><i className="bi bi-bag-x"></i> Cancelar Pedido</a></li>
            <li className="nav-item"><a className="nav-link" href="/User/Create"><i className="bi bi-bag-plus"></i> Solicitar Pedido</a></li>
          </ul>
          <hr />
          <h3 className="mt-3 border border-light rounded p-2">Cuenta</h3>
          <ul className="navbar-nav">
            <li className="nav-item"><a className="nav-link" href="/data-change"><i className="bi bi-globe"></i> Cambiar datos</a></li>
          </ul>
          <hr />
        </div>

        <div className="col-md-9" style={{ marginTop: "100px" }}>
          <h2 className="text-center text-primary mb-4">Gestión de Pedidos</h2>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h4>Órdenes Registradas</h4>
          </div>

          {/* Show loading spinner or data */}
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
                  </tr>
                </thead>
                <tbody>
                  {userPurchases.length === 0 ? (
                    <tr><td colSpan="5" className="text-center">No se han encontrado pedidos.</td></tr>
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
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </PlantillaUno>
  );
};

export default DeliveryHome;
