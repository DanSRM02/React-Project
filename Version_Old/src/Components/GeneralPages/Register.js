import React, { useState } from 'react';
import PlantillaUno from '../PlantillaUno';

const Register = () => {
  const initialFormState = {
    name: '',
    email: '',
    username: '',
    address: '',
    phone: '',
    identificationType: '',
    identification: '',
    terms: false,
  };

  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});

  const validate = () => {
    let formErrors = {};

    if (formData.name.length < 3 || formData.name.length > 20) {
      formErrors.name = 'Nombre debe tener entre 3 y 20 caracteres.';
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      formErrors.email = 'Correo electrónico no es válido.';
    }
    if (formData.username.length < 5 || formData.username.length > 15) {
      formErrors.username = 'Nombre de usuario debe tener entre 5 y 15 caracteres.';
    }
    if (formData.address.length < 10 || formData.address.length > 30) {
      formErrors.address = 'La dirección debe tener entre 10 y 30 caracteres.';
    }
    if (!/^[0-9]{10}$/.test(formData.phone)) {
      formErrors.phone = 'Número de teléfono debe tener 10 dígitos.';
    }
    if (!formData.identificationType) {
      formErrors.identificationType = 'Debes seleccionar un tipo de identificación.';
    }
    if (!/^[0-9]{10}$/.test(formData.identification)) {
      formErrors.identification = 'Número de identificación debe tener 10 dígitos.';
    }
    if (!formData.terms) {
      formErrors.terms = 'Debes aceptar los términos y condiciones.';
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log('Formulario válido', formData);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <PlantillaUno title="Registro">
      <div className="row">
        <div className="container-fluid backformulario ps-0 pe-0">
          <div className="row m-0">
            <div className="col-md-3"></div>
            <div className="col-md-6 pe-0 ps-0">
              <div className="card shadow-lg p-3 m-5 body-tertiary rounded">
                <div className="card-body">
                  <h1 className="text-center seccion-titulo">Regístrate</h1>
                  <p className="text-center seccion-descripcion">
                    Completa el formulario para poder registrarte
                  </p>
                  <form className="row g-3 needs-validation" onSubmit={handleSubmit} noValidate>
                    {/* Campos del formulario con validación mejorada */}
                    {['name', 'email', 'username', 'address', 'phone', 'identification'].map((field) => (
                      <div className="col-12 col-md-6 mb-3" key={field}>
                        <label htmlFor={field} className="form-label">
                          {{
                            name: 'Nombre del cliente/empresa',
                            email: 'Correo Electrónico',
                            username: 'Nombre de usuario',
                            address: 'Domicilio',
                            phone: 'Número de Teléfono',
                            identification: 'Número de identificación'
                          }[field]}
                        </label>
                        {field === 'username' ? (
                          <div className="input-group has-validation">
                            <span className="input-group-text">@</span>
                            <input
                              type="text"
                              className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                              name="username"
                              id="username"
                              onChange={handleChange}
                              value={formData.username}
                              aria-describedby="usernameError"
                            />
                          </div>
                        ) : (
                          <input
                            type={field === 'email' ? 'email' : 'text'}
                            className={`form-control ${errors[field] ? 'is-invalid' : ''}`}
                            name={field}
                            id={field}
                            onChange={handleChange}
                            value={formData[field]}
                            {...(field === 'phone' || field === 'identification' ? {
                              pattern: "[0-9]*",
                              maxLength: 10
                            } : {})}
                            aria-invalid={!!errors[field]}
                            aria-describedby={`${field}Error`}
                          />
                        )}
                        {errors[field] && (
                          <div id={`${field}Error`} className="invalid-feedback d-block">
                            {errors[field]}
                          </div>
                        )}
                      </div>
                    ))}

                    {/* Selector de tipo de identificación */}
                    <div className="col-12 col-md-6 mb-3">
                      <label htmlFor="identificationType" className="form-label">Tipo de identificación</label>
                      <select
                        className={`form-select ${errors.identificationType ? 'is-invalid' : ''}`}
                        id="identificationType"
                        name="identificationType"
                        onChange={handleChange}
                        value={formData.identificationType}
                        aria-describedby="identificationTypeError"
                      >
                        <option value="">Escoje...</option>
                        <option value="NIT">NIT</option>
                        <option value="CC">C.C</option>
                      </select>
                      {errors.identificationType && (
                        <div id="identificationTypeError" className="invalid-feedback d-block">
                          {errors.identificationType}
                        </div>
                      )}
                    </div>

                    {/* Checkbox de términos y condiciones */}
                    <div className="col-12 mb-3">
                      <div className={`form-check ${errors.terms ? 'is-invalid' : ''}`}>
                        <input
                          className={`form-check-input ${errors.terms ? 'is-invalid' : ''}`}
                          type="checkbox"
                          name="terms"
                          id="terms"
                          onChange={handleChange}
                          checked={formData.terms}
                          aria-describedby="termsError"
                        />
                        <label className="form-check-label" htmlFor="terms">
                          Acepto los términos y condiciones
                        </label>
                        {errors.terms && (
                          <div id="termsError" className="invalid-feedback d-block">
                            {errors.terms}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Botón de submit */}
                    <div className="col-12 d-flex justify-content-center mt-4">
                      <button type="submit" className="btn btn-secondary w-50">
                        Registrarse
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="col-md-3"></div>
          </div>
        </div>
      </div>
    </PlantillaUno>
  );
};

export default Register;