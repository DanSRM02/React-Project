import React from "react";

const AccountSettings = () => {
    return (
        <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
            {/* Título */}
            <h2 className="text-2xl font-bold text-green-700 text-center">
                 Configuración de Cuenta
            </h2>
            <p className="text-gray-600 text-center mb-6">
                Gestiona tu información personal y preferencias de cuenta.
            </p>

            {/* Información Personal */}
            <div className="mb-6 p-4 bg-gray-100 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-700 mb-3"> Información Personal</h3>
                <div className="mb-4">
                    <label className="block text-gray-600">Nombre:</label>
                    <input
                        type="text"
                        placeholder="Tu Nombre"
                        className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-600">Email:</label>
                    <input
                        type="email"
                        placeholder="tuemail@example.com"
                        className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                </div>
            </div>

            {/* Seguridad */}
            <div className="mb-6 p-4 bg-gray-100 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-700 mb-3"> Seguridad</h3>
                <div className="mb-4">
                    <label className="block text-gray-600">Nueva Contraseña:</label>
                    <input
                        type="password"
                        placeholder="Nueva Contraseña"
                        className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                </div>
            </div>

            {/* Notificaciones */}
            <div className="mb-6 p-4 bg-gray-100 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-700 mb-3"> Notificaciones</h3>
                <div className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <label className="text-gray-600">Recibir notificaciones por correo</label>
                </div>
            </div>

            {/* Botón de Guardar */}
            <button className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition">
                Guardar Cambios
            </button>
        </div>
    );
};

export default AccountSettings;
