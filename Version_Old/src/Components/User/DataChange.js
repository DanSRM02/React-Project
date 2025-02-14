import React, { useState } from 'react';
import './../../Styles/user.css';
import PlantillaUno from '../PlantillaUno';
import UserPicture1 from './../../Styles/img/UsersBack/user1.svg';

const DataChange = () => {
  const [showProfile, setShowProfile] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Agrega la lógica para manejar el envío del formulario aquí
    console.log("Formulario enviado");
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

        <div className="col-md-9" style={{ marginTop: '100px' }}>
          <div className="row">
            <div className="col-md-6 offset-md-3">
              <form className="formulario" onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label seccion-texto-formulario">Correo</label>
                  <input type="email" className="form-control" name="email" id="email" pattern="^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" />
                </div>
                <div className="mb-3">
                  <label className="form-label seccion-texto-formulario">Nueva contraseña</label>
                  <input type="password" className="form-control" name="password" id="password" placeholder="********" />
                </div>
                <div className="mb-3">
                  <label className="form-label seccion-texto-formulario">Repetir contraseña</label>
                  <input type="password" className="form-control" placeholder="********" />
                </div>
                <div className="mb-3">
                  <label className="form-label seccion-texto-formulario">Nombres</label>
                  <input type="text" className="form-control" id="name" name="name" pattern="^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$" />
                </div>
                <div className="mb-3">
                  <label className="form-label seccion-texto-formulario">Celular</label>
                  <input type="number" className="form-control" name="phone" id="phone" pattern="^[0-9]+$" />
                </div>
                <div className="text-center mb-3">
                  <button type="submit" className="btn btn-secondary">Cambiar</button>
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

export default DataChange;
