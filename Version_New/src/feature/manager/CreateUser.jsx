import React, { useState } from "react";
import { HiOutlineUserAdd, HiOutlinePencil, HiOutlineBan } from "react-icons/hi";

const CreateUserPage = () => {
    // Estado para almacenar los usuarios (Ejemplo de datos)
    const [users, setUsers] = useState([
        { id: 1, name: "Carlos Pérez", email: "carlos@example.com", role: "Gerente", active: true },
        { id: 2, name: "María López", email: "maria@example.com", role: "Vendedor", active: true },
        { id: 3, name: "Juan Gómez", email: "juan@example.com", role: "Cliente", active: false },
    ]);

    // Estado para manejar el formulario
    const [form, setForm] = useState({ name: "", email: "", role: "" });

    // Manejar cambios en el formulario
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // Agregar un nuevo usuario (simulación)
    const handleAddUser = (e) => {
        e.preventDefault();
        if (!form.name || !form.email || !form.role) return;

        const newUser = {
            id: users.length + 1,
            ...form,
            active: true,
        };

        setUsers([...users, newUser]);
        setForm({ name: "", email: "", role: "" }); // Limpiar formulario
    };

    // Cambiar estado activo/inactivo
    const toggleUserStatus = (id) => {
        setUsers(users.map(user =>
            user.id === id ? { ...user, active: !user.active } : user
        ));
    };

    return (
        <div className="space-y-6">
            {/* Título */}
            <h1 className="text-2xl font-bold text-gray-700">Gestión de Usuarios</h1>

            {/* Formulario para agregar usuario */}
            <div className="bg-white shadow-sm rounded-lg p-6">
                <h2 className="text-lg font-bold text-gray-700 mb-4">Crear Usuario</h2>
                <form onSubmit={handleAddUser} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input
                        type="text"
                        name="name"
                        placeholder="Nombre"
                        value={form.name}
                        onChange={handleChange}
                        className="border border-gray-300 p-2 rounded"
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Correo Electrónico"
                        value={form.email}
                        onChange={handleChange}
                        className="border border-gray-300 p-2 rounded"
                    />
                    <select
                        name="role"
                        value={form.role}
                        onChange={handleChange}
                        className="border border-gray-300 p-2 rounded"
                    >
                        <option value="">Seleccionar Rol</option>
                        <option value="Gerente">Gerente</option>
                        <option value="Vendedor">Vendedor</option>
                        <option value="Cliente">Cliente</option>
                    </select>
                    <button
                        type="submit"
                        className="col-span-1 md:col-span-3 bg-green-600 text-white p-2 rounded hover:bg-green-700 flex items-center justify-center gap-2"
                    >
                        <HiOutlineUserAdd className="w-5 h-5" />
                        Agregar Usuario
                    </button>
                </form>
            </div>

            {/* Tabla de usuarios */}
            <div className="bg-white shadow-sm rounded-lg p-6">
                <h2 className="text-lg font-bold text-gray-700 mb-4">Lista de Usuarios</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="py-2 px-4 border-b border-gray-200 text-gray-600">Nombre</th>
                                <th className="py-2 px-4 border-b border-gray-200 text-gray-600">Correo</th>
                                <th className="py-2 px-4 border-b border-gray-200 text-gray-600">Rol</th>
                                <th className="py-2 px-4 border-b border-gray-200 text-gray-600 text-center">Estado</th>
                                <th className="py-2 px-4 border-b border-gray-200 text-gray-600 text-center">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-600">
                            {users.map((user) => (
                                <tr key={user.id} className="hover:bg-gray-50">
                                    <td className="py-2 px-4 border-b border-gray-200">{user.name}</td>
                                    <td className="py-2 px-4 border-b border-gray-200">{user.email}</td>
                                    <td className="py-2 px-4 border-b border-gray-200">{user.role}</td>
                                    <td className="py-2 px-4 border-b border-gray-200 text-center">
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-bold ${user.active ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                                                }`}
                                        >
                                            {user.active ? "Activo" : "Inactivo"}
                                        </span>
                                    </td>
                                    <td className="py-2 px-4 border-b border-gray-200 text-center">
                                        <div className="flex justify-center space-x-2">
                                            <button
                                                className="text-blue-600 hover:text-blue-700 p-1"
                                                title="Editar"
                                            >
                                                <HiOutlinePencil className="w-5 h-5" />
                                            </button>
                                            <button
                                                className={`p-1 ${user.active ? "text-red-600 hover:text-red-700" : "text-gray-400"} `}
                                                onClick={() => toggleUserStatus(user.id)}
                                                title={user.active ? "Deshabilitar" : "Habilitar"}
                                            >
                                                <HiOutlineBan className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {users.length === 0 && (
                                <tr>
                                    <td colSpan="5" className="text-center py-4 text-gray-500">
                                        No hay usuarios registrados.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default CreateUserPage;
