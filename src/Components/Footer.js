import React from 'react';
import "../Styles/Footer.css"
import logo from "../Styles/img/logo.svg"


function Footer() {
  return (
    <footer id="footer" className="seccion-oscura d-flex flex-column align-items-center justify-content-center">
      <div className="row">
        <img className="footer-logo" src={logo} alt="Logo del portafolio" />
        <p className="footer-texto text-center">
          ¡Bienvenidos a Oxindustriales!
          <br /> Ofrecemos el mejor gas a precios accesibles.
          <br />
        </p>
        <div className="iconos-redes-sociales d-flex flex-wrap align-items-center justify-content-center">
          <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
            <i className="bi bi-twitter"></i>
          </a>
          <a href="https://github.com/" target="_blank" rel="noopener noreferrer">
            <i className="bi bi-github"></i>
          </a>
          <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer">
            <i className="bi bi-linkedin"></i>
          </a>
          <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
            <i className="bi bi-instagram"></i>
          </a>
          <a href="mailto:dsramirez143@gmail.com" target="_blank" rel="noopener noreferrer">
            <i className="bi bi-envelope"></i>
          </a>
        </div>
        <div className="derechos-de-autor">Oxindustriales (2024) &#169;</div>
      </div>
    </footer>
  );
}

export default Footer;


