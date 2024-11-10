import React, { useState } from 'react';
import './../../Styles/user.css';
import PlantillaUno from '../PlantillaUno';
import UserPicture1 from './../../Styles/img/UsersBack/user1.svg';

const HomeUser = ({ hasPurchases, userPurchases }) => {
  const [showProfile, setShowProfile] = useState(false);

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
            <li className="nav-item">
              <a className="nav-link" href="/products">
                <i className="bi bi-bag-check"></i> Ver Pedido
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/User/CancelOrder">
                <i className="bi bi-bag-x"></i> Cancelar Pedido
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/User/Create">
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

        <div className="col-md-9" style={{ marginTop: '100px' }}>
          {hasPurchases ? (
            <>
              <h1 className="text-center seccion-titulo">Estado de tu pedido</h1>
              <p className="text-center seccion-texto">Aquí puedes ver el estado de tu pedido</p>
              <div className="row mt-5">
                {userPurchases.map((purchase, index) => (
                  <div className="col-md-3" key={index}>
                    <div className="card bg-body-tertiary border-0 tarjeta2">
                      <div className="card-body">
                        <div className="card-title fs-1 text-center">
                          <i className={`bi ${index === 0 ? 'bi-arrow-clockwise' : 'bi-arrow-repeat'}`}></i>
                        </div>
                        <div className="card-text fs-6 text-center">
                          Código de pedido: {purchase.id}
                        </div>
                        <p className="seccion-texto text-center">Estado de tu pedido</p>
                        <div className="progress" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">
                          <div className="progress-bar bg-secondary" style={{ width: `${index * 20 + 20}%` }}>
                            {index * 20 + 20}%
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="row mt-5">
                <h1 className="text-center seccion-titulo">Tu pedido actual</h1>
                <div className="col-md-10 offset-md-1">
                  <table className="table table-striped">
                    <thead className="thead-dark">
                      <tr>
                        <th>#</th>
                        <th>Producto</th>
                        <th>Metraje</th>
                        <th>Cantidad</th>
                        <th>Valor Unitario</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody className="table-group-divider">
                      {userPurchases.map((purchase, index) => (
                        <tr key={index}>
                          <td>{purchase.id}</td>
                          <td>{purchase.productName}</td>
                          <td>{purchase.metraje}</td>
                          <td>{purchase.quantity}</td>
                          <td>{purchase.price}</td>
                          <td>{purchase.quantity * purchase.price}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          ) : (
            <h1 className="text-center seccion-titulo">No hay Registro de pedido</h1>
          )}
        </div>

        {showProfile && (
          <div className="modal show d-block" tabIndex="-1" role="dialog">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Perfil de Usuario</h5>
                  <button type="button" className="close" onClick={() => setShowProfile(false)} aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body text-center">
                  <img src={UserPicture1} alt="Usuario1" className="rounded-circle img-fluid mb-3" style={{ width: '100px', height: '100px' }} />
                  <p><strong>Nombre de Usuario:</strong> Nombre de Usuario</p>
                  <p><strong>Rol:</strong> Rol</p>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowProfile(false)}>
                    Cerrar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </PlantillaUno>
  );
};

export default HomeUser;
