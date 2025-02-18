import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axios";
import PlantillaUno from "../PlantillaUno";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "", // Cambié "identification" a "password" para mayor claridad
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    let formErrors = {};
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      formErrors.email = "Correo electrónico no es válido.";
    }
    if (formData.password.length < 6) { // Cambié "identification" a "password"
      formErrors.password = "La contraseña debe tener al menos 6 caracteres.";
    }
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      const response = await axiosInstance.post("/api/v1/oxi/auth/login", {
        username: formData.username,
        password: formData.password, 
      });
      console.log("Login exitoso:", response.data);
      alert("Inicio de sesión exitoso");
      
      // Aquí puedes almacenar el token o la información del usuario en el almacenamiento local
      localStorage.setItem("user", JSON.stringify(response.data)); // Almacena la respuesta completa

      navigate("/dashboard");
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      alert("Credenciales incorrectas. Intente nuevamente.");
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
                    <label htmlFor="email" className="col-form-label">Correo:</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      onChange={handleChange}
                      value={formData.email}
                    />
                    {errors.email && <div className="invalid-feedback d-block">{errors.email}</div>}

                    <label htmlFor="password" className="col-form-label">Contraseña:</label>
                    <input
                      type="password"
                      placeholder="Ingrese su contraseña"
                      className="form-control"
                      id="password"
                      name="password" // Cambié "identification" a "password"
                      onChange={handleChange}
                      value={formData.password} // Cambié "identification" a "password"
                    />
                    {errors.password && <div className="invalid-feedback d-block">{errors.password}</div>}

                    <div className="mt-3 text-center">
                      <button type="submit" className="btn btn-secondary">Iniciar Sesión</button>
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