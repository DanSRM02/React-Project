import React, { useState } from 'react';
import PlantillaUno from '../PlantillaUno';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    identification: '',
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    let formErrors = {};

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      formErrors.email = 'Correo electrónico no es válido.';
    }
    if (formData.identification.length < 6) {
      formErrors.identification = 'La identificación debe tener al menos 6 caracteres.';
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // Lógica de envío del formulario
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <PlantillaUno title="Inicio de sesión">
      <div className="backformulario m-5">
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-6">
            <div className="card shadow-lg body-tertiary rounded">
              <div className="card-body">
                <div className="formulario">
                  <h1 className="text-center seccion-titulo">Iniciar sesión</h1>
                  <p className="text-center seccion-texto">Ingresa tus credenciales</p>
                  <form onSubmit={handleSubmit}>
                    <label htmlFor="email" className="col-form-label">
                      Correo:
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      onChange={handleChange}
                      value={formData.email}
                    />
                    {errors.email && <div className="invalid-feedback d-block">{errors.email}</div>}
                    
                    <label htmlFor="identification" className="col-form-label">
                      Identificación:
                    </label>
                    <input
                      type="password"
                      placeholder="Su contraseña es su número de identidad"
                      className="form-control"
                      id="identification"
                      name="identification"
                      onChange={handleChange}
                      value={formData.identification}
                    />
                    {errors.identification && (
                      <div className="invalid-feedback d-block">{errors.identification}</div>
                    )}

                    <div className="mt-3 text-center">
                      <button type="submit" className="btn btn-secondary">
                        Iniciar Sesión
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3 col-1"></div>
      </div>
    </PlantillaUno>
  );
};

export default Login;
