import React from 'react';

function UserContent() {
  return (
    <div className="col-md-3 menu">
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
    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-body">
            <h5>Información del Perfil</h5>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">+57</li>
              <li className="list-group-item">Email</li>
              <li className="list-group-item">Dirección</li>
            </ul>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
            </div>
          </div>
        </div>
      </div>
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

  );
}

export default UserContent;
