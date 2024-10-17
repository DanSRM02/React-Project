import React from 'react';
import PlantillaUno from '../PlantillaUno';

export const Home = () => {
  return (
    <PlantillaUno title="Inicio de sesión">
      <section className="hero align-items-stretch">
        <div className="hero-principal justify-content-center align-items-center">
          <div className="hero-principal-contenedor">
            <h1>¡Bienvenidos a Oxindustriales!</h1>
            <h2>Ofrecemos el mejor gas a precios accesibles.</h2>
            <h3>
              Somos líderes en la industria del suministro de gases industriales, brindando una amplia gama de
              productos esenciales para una variedad de sectores. Desde oxígeno hasta nitrógeno, estamos aquí para
              satisfacer sus necesidades con calidad y compromiso.
            </h3>
          </div>
        </div>
      </section>

      <section id="nosotros" className="sobre-nosotros seccion-oscura">
        <div className="contenedor">
          <h2 className="seccion-titulo">Más Acerca de Nosotros</h2>
          <p className="seccion-texto">
            En Oxindustriales, nos enorgullece ser líderes en la industria de suministro de gases, ofreciendo una amplia gama de productos que incluyen oxígeno, dióxido de carbono, argón, mezclas para soldadura, hidrógeno y nitrógeno. Desde nuestra fundación, hemos mantenido un compromiso inquebrantable con la calidad, la innovación y el servicio al cliente.
          </p>
        </div>
      </section>

      <section id="habilidad" className="experiencia seccion-clara">
        <div className="container text-center">
          <h1>Habilidades y Cualidades en el ámbito</h1>
          <br />
          <div className="row">
            <div className="columnas col-12 col-md-4">
              <i className="bi bi-laptop"></i>
              <p className="experiencia-titulo">Suministro de Gases Industriales</p>
              <p>Poseemos una amplia experiencia en el suministro de una variedad de gases industriales, garantizando siempre la calidad y seguridad en cada entrega.</p>
              <div className="contenedor-badges">
                <span className="badge text-bg-secondary">Oxígeno</span>
                <span className="badge text-bg-secondary">Nitrógeno</span>
                <span className="badge text-bg-secondary">Argón</span>
                <span className="badge text-bg-secondary">Helio</span>
                <span className="badge text-bg-secondary">Hidrógeno</span>
              </div>
            </div>

            <div className="columnas col-12 col-md-4">
              <i className="bi bi-star"></i>
              <p className="experiencia-titulo">Valores</p>
              <p>Nuestros valores fundamentales guían cada interacción y transacción. Nos comprometemos a ofrecer un servicio basado en el respeto, el compromiso y la igualdad, asegurando la satisfacción de nuestros clientes.</p>
              <div className="contenedor-badges">
                <span className="badge text-bg-secondary">Respeto</span>
                <span className="badge text-bg-secondary">Compromiso</span>
                <span className="badge text-bg-secondary">Igualdad</span>
              </div>
            </div>

            <div className="columnas col-12 col-md-4">
              <i className="bi bi-book"></i>
              <p className="experiencia-titulo">Expertos en la Industria</p>
              <p>Nuestro equipo está en constante aprendizaje y actualización para ofrecer las mejores soluciones en gases industriales. Nos dedicamos a mejorar continuamente nuestros conocimientos y habilidades para servir mejor a nuestros clientes.</p>
              <div className="contenedor-badges">
                <span className="badge text-bg-secondary">Innovación</span>
                <span className="badge text-bg-secondary">Calidad</span>
                <span className="badge text-bg-secondary">Excelencia</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contacto" className="contacto seccion-oscura">
        <div className="container">
          <div className="container text-center rectangulo d-flex justify-content-evenly">
            <div className="row">
              <div className="col-12 col-md-4 seccion-titulo">¡Hablemos!</div>
            </div>
            <div className="col-12 col-md-4 descripcion">
              Ofrecemos soluciones personalizadas para garantizar eficiencia y seguridad en tus procesos. ¡Contáctanos hoy y transforma tus operaciones en una de las mejores!
            </div>
            <div className="col-12 col-md-4">
              <a href="mailto:dsramirez143@gmail.com">
                <button type="button">
                  Contacto
                  <i className="bi bi-envelope-check-fill"></i>
                </button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </PlantillaUno>
  );
};

export default Home;