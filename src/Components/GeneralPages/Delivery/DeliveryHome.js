import React, { useState } from 'react';
import PlantillaUno from '../../PlantillaUno';
import UserPicture1 from '../../../Styles/img/UsersBack/user1.svg';

const DeliveryHome = () => {
  const [showProfile, setShowProfile] = useState(false);

  // Datos simulados de los pedidos
  const pedidos = [
    { id: 1, producto: 'Gas 20L', fecha: '2024-11-20', estado: 'Entregado' },
    { id: 2, producto: 'Gas 30L', fecha: '2024-11-22', estado: 'En proceso' },
    { id: 3, producto: 'Gas 10L', fecha: '2024-11-25', estado: 'Cancelado' },
  ];

  return (
    <PlantillaUno>
      <div className="row">
        {/* Sidebar */}
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
            <li className="nav-item">
              <a className="nav-link" href="/products">
                <i className="bi bi-bag-check"></i> Ver Pedidos
              </a>
            </li>
          </ul>
          <hr />
        </div>

        {/* Tabla de pedidos */}
        <div className="container col-md-9">
          <h1 className="mt-5 seccion-titulo">Mis Pedidos</h1>
          <p className="text-center seccion-texto mt-3">
            Aquí puedes ver el historial de tus pedidos realizados.
          </p>
          {/* Recuadro alrededor de la tabla */}
          <div className="table-container border rounded p-3 shadow-sm mt-4">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Producto</th>
                  <th>Fecha</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {pedidos.map((pedido) => (
                  <tr key={pedido.id}>
                    <td>{pedido.id}</td>
                    <td>{pedido.producto}</td>
                    <td>{pedido.fecha}</td>
                    <td>{pedido.estado}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal del perfil */}
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
                  style={{ width: '100px', height: '100px' }}
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

export default DeliveryHome;
