import React from 'react';
import "../Styles/Footer.css"
import logo from "../Styles/img/logo.svg"



function Footer() {
  return (
    <footer id="footer" className="seccion-oscura d-flex flex-column align-items-center justify-content-center p-4">
      <div className="row">
        <div className="col text-center">
          {/* Logo centrado con margen inferior */}
          <img className="footer-logo mb-3" src={logo} alt="Logo del portafolio" style={{ width: '100px' }} />
          
          {/* Texto de bienvenida */}
          <p className="footer-texto">
            ¡Bienvenidos a Oxindustriales!
            <br /> Ofrecemos el mejor gas a precios accesibles.
          </p>

          {/* Iconos de redes sociales centrados */}
          <div className="iconos-redes-sociales d-flex flex-wrap align-items-center justify-content-center mt-3">
            <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="me-3">
              <i className="bi bi-twitter fs-4"></i>
            </a>
            <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="me-3">
              <i className="bi bi-github fs-4"></i>
            </a>
            <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" className="me-3">
              <i className="bi bi-linkedin fs-4"></i>
            </a>
            <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className="me-3">
              <i className="bi bi-instagram fs-4"></i>
            </a>
            <a href="mailto:dsramirez143@gmail.com" target="_blank" rel="noopener noreferrer">
              <i className="bi bi-envelope fs-4"></i>
            </a>
          </div>

          {/* Derechos de autor */}
          <div className="derechos-de-autor mt-3">
            Oxindustriales (2024) &#169;
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;


