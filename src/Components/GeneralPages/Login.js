import React from 'react';

const Login = () => {
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
                <form method="POST">
                  <label htmlFor="email" className="col-form-label">Correo:</label>
                  <input type="email" className="form-control" id="email" name="email" />
                  
                  <label htmlFor="identification" className="col-form-label">Identificación:</label>
                  <input
                    type="password"
                    placeholder="Su contraseña es su número de identidad"
                    className="form-control"
                    id="identification"
                    name="identification"
                  />
                  
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
