import React from 'react';

function Header() {
  return (
    <div className="navb">
      <div className="row">
        <nav className="navbar navbar-expand-md navbar-light">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar-toggler"
                  aria-controls="navbar-toggler" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbar-toggler">
            <a className="navbar-brand" href="home.html">
              <img src="img/logo.svg" alt="OXI" />
            </a>
            <ul className="navbar-nav d-flex justify-content-center align-items-center">
              <li className="nav-item">
                <a className="nav-link" aria-current="page" href="home.html">
                  <i className="bi bi-people"></i> / Nosotros
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="Products.html">
                  <i className="bi bi-shop"></i> / Productos
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#footer">
                  <i className="bi bi-envelope"></i> / Contacto
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="login.html">
                  <i className="bi bi-person"></i> / Iniciar sesión
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default Header;
