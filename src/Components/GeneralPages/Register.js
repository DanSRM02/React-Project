import React, { useState } from 'react';
import PlantillaUno from '../PlantillaUno';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    username: '',
    address: '',
    phone: '',
    identificationType: '',
    identification: '',
    terms: false,
  });

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
      // Aquí podrías enviar el formulario o realizar alguna acción adicional.
      console.log('Formulario válido');
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

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
                  <form className="row g-3 needs-validation" onSubmit={handleSubmit}>
                    <div className="col-md-4">
                      <label className="form-label">Nombre del cliente / empresa</label>
                      <input
                        type="text"
                        name="name"
                        className="form-control"
                        id="name"
                        onChange={handleChange}
                        value={formData.name}
                      />
                      {errors.name && <div className="invalid-feedback d-block">{errors.name}</div>}
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="email" className="form-label">Correo Electrónico</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="form-control"
                        onChange={handleChange}
                        value={formData.email}
                      />
                      {errors.email && <div className="invalid-feedback d-block">{errors.email}</div>}
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="username" className="form-label">Nombre de usuario</label>
                      <div className="input-group has-validation">
                        <span className="input-group-text" id="inputGroupPrepend">@</span>
                        <input
                          type="text"
                          className="form-control"
                          name="username"
                          id="username"
                          onChange={handleChange}
                          value={formData.username}
                        />
                        {errors.username && <div className="invalid-feedback d-block">{errors.username}</div>}
                      </div>
                    </div>
                    <div className="col-md-3">
                      <label htmlFor="address" className="form-label">Domicilio</label>
                      <input
                        type="text"
                        className="form-control"
                        name="address"
                        id="address"
                        onChange={handleChange}
                        value={formData.address}
                      />
                      {errors.address && <div className="invalid-feedback d-block">{errors.address}</div>}
                    </div>
                    <div className="col-md-3">
                      <label htmlFor="phone" className="form-label">Número de Teléfono</label>
                      <input
                        type="number"
                        className="form-control"
                        name="phone"
                        id="phone"
                        onChange={handleChange}
                        value={formData.phone}
                      />
                      {errors.phone && <div className="invalid-feedback d-block">{errors.phone}</div>}
                    </div>
                    <div className="col-md-3">
                      <label htmlFor="identificationType" className="form-label">Tipo de identificación</label>
                      <select
                        className="form-select"
                        id="identificationType"
                        name="identificationType"
                        onChange={handleChange}
                        value={formData.identificationType}
                      >
                        <option value="" disabled>Escoje...</option>
                        <option value="NIT">NIT</option>
                        <option value="CC">C.C</option>
                      </select>
                      {errors.identificationType && <div className="invalid-feedback d-block">{errors.identificationType}</div>}
                    </div>
                    <div className="col-md-3">
                      <label htmlFor="identification" className="form-label">Número de identificación</label>
                      <input
                        name="identification"
                        type="number"
                        id="identification"
                        className="form-control"
                        onChange={handleChange}
                        value={formData.identification}
                      />
                      {errors.identification && <div className="invalid-feedback d-block">{errors.identification}</div>}
                    </div>
                    <div className="col-12">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="terms"
                          id="invalidCheck"
                          onChange={handleChange}
                          checked={formData.terms}
                        />
                        <label className="form-check-label" htmlFor="invalidCheck">
                          Acepto los términos y condiciones.
                        </label>
                        {errors.terms && <div className="invalid-feedback d-block">{errors.terms}</div>}
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
