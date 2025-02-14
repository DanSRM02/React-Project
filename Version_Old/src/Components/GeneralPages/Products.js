import React from 'react';
import PlantillaUno from '../PlantillaUno';
import Oxygen from "../../Styles/img/products/dioxidocarbono.webp"
import DiCarbon from "../../Styles/img/products/dioxidocarbono.webp"
import Argon from "../../Styles/img/products/argon.webp"
import acetileno from "../../Styles/img/products/acetileno.webp"
import hidrogeno from "../../Styles/img/products/hidrogeno.png"
import nitrogeno from "../../Styles/img/products/nitrogeno.webp"


function Products() {
  return (
    <PlantillaUno title="Productos">
      <section id="productos" className="container-fluid productos seccion-clara d-flex justify-content-center align-items-center">
        <div className="row mb-3">
          <h1 className="seccion-titulo text-center mb-3">Productos Disponibles</h1>
          
          {/* Primer row de productos */}
          <div className="row">
            <div className="col-12 col-md-3 mb-4">
              <div className="card h-100">
                <img src={Oxygen} className="card-img-top m-2" alt="Oxígeno" />
                <div className="card-body seccion-texto">
                  <h5 className="card-title">Oxígeno</h5>
                  <p className="card-text">
                    El oxígeno es un elemento crucial para la industria. Su uso es requerido para diferentes
                    funciones como la combustión, soldadura, metalurgía y la producción de acero.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-12 col-md-3 mb-4">
              <div className="card h-100">
                <img src={DiCarbon} className="card-img-top m-2" alt="Dióxido de carbono" />
                <div className="card-body seccion-texto">
                  <h5 className="card-title">Dióxido de Carbono</h5>
                  <p className="card-text">
                    Se utiliza en gran parte para la creación de alimentos y preservación en la industria
                    alimentaria. También como el principal producto en la fabricación de extintores y otros
                    productos.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-12 col-md-3 mb-4">
              <div className="card h-100">
                <img src={Argon} className="card-img-top m-2" alt="Argón" />
                <div className="card-body seccion-texto">
                  <h5 className="card-title">Argón</h5>
                  <p className="card-text">
                    Su uso es indispensable en la industria metalmecánica, se emplea como gas de protección
                    durante las soldaduras debido a que se combina con otros gases permitiendo su fácil
                    manipulación.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-12 col-md-3 mb-4">
              <div className="card h-100">
                <img src={acetileno} className="card-img-top m-2" alt="Acetileno" />
                <div className="card-body seccion-texto">
                  <h5 className="card-title">Acetileno</h5>
                  <p className="card-text">
                    El acetileno es un producto químico que se utiliza en la industria metalmecánica para
                    soldaduras y recocido de metales. Es un gas que se combina con otros gases para crear una atmósfera
                    protectora e inerte en los hornos de recocido.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Segundo row de productos */}
          <div className="row justify-content-center">
            <div className="col-12 col-md-3 mb-4">
              <div className="card h-100">
                <img src={hidrogeno} className="card-img-top m-2" alt="Hidrógeno" />
                <div className="card-body seccion-texto">
                  <h5 className="card-title">Hidrógeno</h5>
                  <p className="card-text">
                    En la industria metalúrgica, se combina con el nitrógeno para crear una atmósfera
                    protectora e inerte en los hornos de recocido de metales. Esto ayuda a prevenir la oxidación y
                    mejora la calidad del proceso de tratamiento térmico.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-12 col-md-3 mb-4">
              <div className="card h-100">
                <img src={nitrogeno} className="card-img-top m-2" alt="Nitrógeno" />
                <div className="card-body seccion-texto">
                  <h5 className="card-title">Nitrógeno</h5>
                  <p className="card-text">
                    En la industria metalúrgica, se utiliza para que el material se contraiga
                    con el fin de facilitar el encaje de piezas, luego el material vuelva a su forma original y quede un ajuste
                    deseado.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PlantillaUno>
  );
}

export default Products;