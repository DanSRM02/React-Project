import React, { useState } from 'react';
import PlantillaUno from '../PlantillaUno';
import UserPicture1 from './../../Styles/img/UsersBack/user1.svg';

const CancelOrder = () => {
  const [showProfile, setShowProfile] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Solicitud enviada');
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

        <div className="container col-md-9">
          <div className="row">
            <div className="col-12">
              <h1 className="mt-5 seccion-titulo">Cancelar pedido</h1>
            </div>
            <p className="text-center seccion-texto mt-3">Aquí puedes solicitar el cancelamiento de tu pedido</p>
          </div>
          <div className="row">
            <div className="col-12">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-12">
                    <div className="mb-3">
                      <label htmlFor="motivo" className="form-label">Motivo</label>
                      <select name="motivo" id="motivo" className="form-select" required>
                        <option value="" disabled selected>Selecciona un motivo</option>
                        <option value="Producto defectuoso">Producto defectuoso</option>
                        <option value="Producto no coincide con la descripción">Producto no coincide con la descripción</option>
                        <option value="Entrega tardía">Entrega tardía</option>
                        <option value="Cambio de opinión">Cambio de opinión</option>
                        <option value="Encontré un mejor precio">Encontré un mejor precio</option>
                        <option value="Problemas con el pago">Problemas con el pago</option>
                        <option value="Servicio al cliente insatisfactorio">Servicio al cliente insatisfactorio</option>
                        <option value="Producto no disponible">Producto no disponible</option>
                        <option value="Error en el pedido">Error en el pedido</option>
                        <option value="Otros">Otros</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    <div className="mb-3">
                      <label htmlFor="observaciones" className="form-label">Observaciones</label>
                      <input name="observacion" type="text" className="form-control"
                        placeholder="Observaciones sobre el pedido (Mínimo 150 caracteres)" required
                        pattern="[0-9a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$" />
                    </div>
                  </div>
                </div>
                <div className="row text-center">
                  <div className="col mt-3">
                    <button type="submit" className="btn btn-secondary">Enviar solicitud</button>
                  </div>
                </div>
              </form>
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
    </PlantillaUno>
  );
};

export default CancelOrder;
