import React from 'react';
function UserContent() {
  return (
    <div className="row">
      <div className="col-md-3 menu">
        <div className="imgrol text-center mt-4 mb-3">
          <img className="rounded img-fluid" src="/img/UsersBack/user1.jpg" alt="Usuario1" />
        </div>
        <div className="infoROl text-center p-3 mt-3">
        </div>
        <div className="masInfo text-center mb-3">
          <button type="button" className="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Ver perfil
          </button>
        </div>
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-body">
                <div className="tarjeta">
                  <div className="card-body">
                    <h5 className="card-title">Nombre del usuario</h5>
                  </div>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">+57 Teléfono</li>
                    <li className="list-group-item">Email</li>
                    <li className="list-group-item">Dirección</li>
                  </ul>
                  <div className="modal-footer">
                    <button data-bs-dismiss="modal" className="btn btn-secondary">Cerrar</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr className="w-30" />
      <h3 className="border border-light rounded p-2">Productos</h3>
      <ul className="navbar-nav">
        <li className="nav-item">
          <a className="nav-link" href="/user/home">
            <i className="bi bi-bag-check"></i> Ver Pedido
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/user/destroy">
            <i className="bi bi-bag-x"></i> Cancelar Pedido
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/user/home">
            <i className="bi bi-bag-plus"></i> Ver Pedido
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/user/create">
            <i className="bi bi-bag-plus"></i> Solicitar Pedido
          </a>
        </li>
      </ul>
      <h3 className="mt-3 border border-light rounded p-2">Cuenta</h3>
      <ul className="navbar-nav">
        <li className="nav-item">
          <a className="nav-link" href="/user/data">
            <i className="bi bi-globe"></i> Cambiar datos
          </a>
        </li>
      </ul>
      <hr className="w-30" />
    </div>
  );
};

export default UserContent;
