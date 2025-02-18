import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PlantillaUno from '../PlantillaUno';
import axiosInstance from '../../api/axios';

const Register = () => {
  const navigate = useNavigate();
  
  const initialFormState = {
    name: '',
    email: '',
    address: '',
    phone: '',
    documentType: '',
    document: '',
    individualType: ''
  };

  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false); // Estado para manejar el envío

  const validate = () => {
    const formErrors = {};

    if (formData.name.length < 3 || formData.name.length > 20) {
      formErrors.name = 'Nombre debe tener entre 3 y 20 caracteres.';
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      formErrors.email = 'Correo electrónico no es válido.';
    }
    if (formData.address.length < 10 || formData.address.length > 30) {
      formErrors.address = 'La dirección debe tener entre 10 y 30 caracteres.';
    }
    if (!/^[0-9]{10}$/.test(formData.phone)) {
      formErrors.phone = 'Número de teléfono debe tener 10 dígitos.';
    }
    if (!formData.documentType) {
      formErrors.documentType = 'Debes seleccionar un tipo de documento.';
    }
    if (!/^[0-9]{10}$/.test(formData.document)) {
      formErrors.document = 'Número de identificación debe tener 10 dígitos.';
    }
    if (!formData.individualType) {
      formErrors.individualType = 'Debes seleccionar si eres cliente o empresa.';
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const individualResponse = await axiosInstance.post("/api/v1/oxi/individual/add", {
        data: {
          ...formData,
          document_type_id: formData.documentType,
          individual_type_id: formData.individualType
        }
      });

      const individualId = individualResponse.data.id;
      if (!individualId) throw new Error("Error: El ID del individual no fue generado.");
  
      await axiosInstance.post("/api/v1/oxi/user/add", {
        data: {
          username: formData.email,
          password: formData.document,
          email: formData.email,
          address: formData.address,
          phone: formData.phone,
          state: true,
          individual_id: individualId,
          rol_type_id: 1
        }
      });
  
      alert("Registro exitoso");
      setFormData(initialFormState);
      navigate("/login");
    } catch (error) {
      console.error("Error al registrar:", error);
      const errorMessage = error.response?.data?.message || "Error al registrar. Intente nuevamente.";
      alert(errorMessage);
    } finally {
      setIsSubmitting(false); // Habilitar el botón de envío nuevamente
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  return (
    <PlantillaUno title="Registro">
      <div className="container-fluid backformulario ps-0 pe-0">
        <div className="row justify-content-center m-0">
          <div className="col-md-6 pe-0 ps-0">
            <div className="card shadow-lg p-3 m-5 rounded">
              <div className="card-body">
                <h1 className="text-center seccion-titulo">Regístrate</h1>
                <p className="text-center seccion-descripcion">Completa el formulario para poder registrarte</p>
                <form className="row g-3" onSubmit={handleSubmit} noValidate>
                  {["name", "email", "address", "phone", "document"].map((field) => (
                    <div className="col-12 col-md-6 mb-3" key={field}>
                      <label htmlFor={field} className="form-label">
                        {{
                          name: 'Nombre',
                          email: 'Correo Electrónico',
                          address: 'Domicilio',
                          phone: 'Número de Teléfono',
                          document: 'Número de identificación'
                        }[field]}
                      </label>
                      <input
                        type={field === 'email' ? 'email' : 'text'}
                        className={`form-control ${errors[field] ? 'is-invalid' : ''}`}
                        name={field}
                        id={field}
                        onChange={handleChange}
                        value={formData[field]}
                      />
                      {errors[field] && (
                        <div className="invalid-feedback d-block">{errors[field]}</div>
                      )}
                    </div>
                  ))}

                  {[{ name: "documentType", label: "Tipo de documento", options: [
                    { value: "", label: "Escoje..." },
                    { value: "1", label: "Cédula de ciudadanía" },
                    { value: "2", label: "Cédula de extranjería" },
                    { value: "3", label: "NIT" }
                  ]},
                  { name: "individualType", label: "¿Eres cliente o empresa?", options: [
                    { value: "", label: "Selecciona..." },
                    { value: "1", label: "Cliente" },
                    { value: "2", label: "Empresa" }
                  ]}].map(select => (
                    <div className="col-12 col-md-6 mb-3" key={select.name}>
                      <label htmlFor={select.name} className="form-label">{select.label}</label>
                      <select
                        className={`form-select ${errors[select.name] ? 'is -invalid' : ''}`}
                        id={select.name}
                        name={select.name}
                        onChange={handleChange}
                        value={formData[select.name]}
                      >
                        {select.options.map(option => (
                          <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                      </select>
                      {errors[select.name] && (
                        <div className="invalid-feedback d-block">{errors[select.name]}</div>
                      )}
                    </div>
                  ))}

                  <div className="col-12 d-flex justify-content-center mt-4">
                    <button type="submit" className="btn btn-secondary w-50" disabled={isSubmitting}>
                      {isSubmitting ? "Registrando..." : "Registrarse"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PlantillaUno>
  );
};

export default Register;