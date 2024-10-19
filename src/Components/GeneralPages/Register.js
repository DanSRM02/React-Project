import React from 'react';
import PlantillaUno from '../PlantillaUno';

  const Register = () => {
    return (
        <PlantillaUno title="Registro">
          <div className="row">
            <div className="container-fluid backformulario ps-0 pe-0">
              <div className="row m-0">
                <div className="col-md-3 "></div>
                <div className="col-md-6 pe-0 ps-0">
                  <div className="card shadow-lg p-3 m-5 body-tertiary rounded">
                    <div className="card-body ">
                      <h1 className="text-center seccion-titulo">Regístrate</h1>
                      <p className="text-center seccion-descripcion">
                        Completa el formulario para poder registrarte
                      </p>
                      <form className="row g-3 needs-validation" method="POST">
                        <div className="col-md-4">
                          <label className="form-label">Nombre del cliente / empresa</label>
                          <input
                            type="text"
                            name="name"
                            className="form-control"
                            id="name"
                            required
                            minLength="3"
                            maxLength="20"
                            defaultValue=""
                          />
                          <div className="invalid-feedback">
                            Por favor, escribe tu nombre o nombre de tu empresa.
                          </div>
                        </div>
                        <div className="col-md-4">
                          <label htmlFor="email" className="form-label">
                            Correo Electrónico
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            className="form-control"
                            minLength="3"
                            maxLength="40"
                            required
                            defaultValue=""
                          />
                          <div className="invalid-feedback">
                            Por favor, escribe un correo válido.
                          </div>
                        </div>
                        <div className="col-md-4">
                          <label htmlFor="username" className="form-label">
                            Nombre de usuario
                          </label>
                          <div className="input-group has-validation">
                            <span className="input-group-text" id="inputGroupPrepend">
                              @
                            </span>
                            <input
                              type="text"
                              className="form-control"
                              name="username"
                              id="username"
                              aria-describedby="inputGroupPrepend"
                              required
                              minLength="5"
                              maxLength="15"
                              defaultValue=""
                            />
                            <div className="invalid-feedback">
                              Por favor, escribe un nombre de usuario.
                            </div>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <label htmlFor="address" className="form-label">
                            Domicilio
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="address"
                            id="address"
                            required
                            minLength="10"
                            maxLength="30"
                            defaultValue=""
                          />
                          <div className="invalid-feedback">
                            Por favor, ingresa una dirección válida.
                          </div>
                        </div>
                        <div className="col-md-3">
                          <label htmlFor="phone" className="form-label">
                            Número de Teléfono
                          </label>
                          <input
                            type="number"
                            className="form-control"
                            name="phone"
                            id="phone"
                            required
                            min="1000000000"
                            max="9999999999"
                            defaultValue=""
                          />
                          <div className="invalid-feedback">
                            Por favor, ingresa un número de teléfono válido.
                          </div>
                        </div>
                        <div className="col-md-3">
                          <label htmlFor="identificationType" className="form-label">
                            Tipo de identificación
                          </label>
                          <select
                            className="form-select"
                            id="identificationType"
                            name="identificationType"
                            required
                          >
                            <option selected disabled value="">
                              Escoje...
                            </option>
                            <option value="NIT">NIT</option>
                            <option value="CC">C.C</option>
                          </select>
                          <div className="invalid-feedback">
                            Por favor, escoge una opción.
                          </div>
                        </div>
                        <div className="col-md-3">
                          <label htmlFor="identification" className="form-label">
                            Número de identificación
                          </label>
                          <input
                            name="identification"
                            type="number"
                            id="identification"
                            className="form-control"
                            required
                            min="1000000000"
                            max="9999999999"
                            defaultValue=""
                          />
                          <div className="invalid-feedback">
                            Por favor, escribe el número de identificación.
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value=""
                              id="invalidCheck"
                              required
                            />
                            <label className="form-check-label" htmlFor="invalidCheck">
                              Acepto los términos y condiciones.
                            </label>
                            <div className="invalid-feedback">
                              Debes estar de acuerdo con los términos y condiciones.
                            </div>
                          </div>
                        </div>
                        <div className="col-md-5 col-1"></div>
                        <div className="col-md-2 col-10 align-self-center">
                          <button type="submit" className="btn btn-secondary">
                            Registrarse
                          </button>
                        </div>
                        <div className="col-md-5 col-1"></div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-3"></div>
          </div>
        </PlantillaUno>
      );
    };
export default Register;