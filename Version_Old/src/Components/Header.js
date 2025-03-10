import React from 'react';
import "../Styles/user.css"
import logo from "../Styles/img/logo.svg"

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
              <img src={"logo"} alt="OXI" />
            </a>
            <ul className="navbar-nav d-flex justify-content-center align-items-center">
              <li className="nav-item">
                <a className="nav-link" aria-current="page" href="#footer">
                  <i className="bi bi-people"></i> / Nosotros
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#footer">
                  <i className="bi bi-envelope"></i> / Contacto
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="Login.html">
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
