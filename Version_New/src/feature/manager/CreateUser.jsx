import React, { useState } from "react";
import { HiOutlineUserAdd, HiOutlinePencil, HiOutlineBan } from "react-icons/hi";
import { useRegisterIndividual } from "../auth/hooks/useRegisterIndividual";
import { useUsers } from "../../hooks/useUsers";

const CreateUserPage = () => {
    const {
        individual,
        handleChange,
        registerIndividual,
        loading,
        error
    } = useRegisterIndividual();

    const {
        users,
        isLoading,
        error: usersError,
        createUser,
        updateUser,
        deleteUser
    } = useUsers();

    console.log("users data",users);
    

    const [selectedRole, setSelectedRole] = useState("");

    // Mapeo de roles a IDs según tu estructura del backend
    const roleMapping = {
        "Gerente": 4,
        "Domiciliario": 3,
        "Vendedor": 1,
        "Cliente": 2
    };

    const handleAddUser = async (e) => {
        e.preventDefault();
        if (!individual.name || !individual.email || !selectedRole) return;

        const formData = {
            ...individual,
            rol_type: roleMapping[selectedRole]
        };

        try {
            const response = await createUser(formData);
            if (response) setSelectedRole(""); // Resetear formulario
        } catch (err) {
            console.error("Error al registrar usuario:", err);
        }
    };

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-700">Gestión de Usuarios</h1>

            {/* Formulario actualizado */}
            <div className="bg-white shadow-sm rounded-lg p-6">
                <h2 className="text-lg font-bold text-gray-700 mb-4">Crear Usuario</h2>
                <form onSubmit={handleAddUser} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Campos del formulario */}
                    <input
                        type="text"
                        name="name"
                        placeholder="Nombre completo"
                        value={individual.name}
                        onChange={handleChange}
                        className="border border-gray-300 p-2 rounded"
                        required
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Correo electrónico"
                        value={individual.email}
                        onChange={handleChange}
                        className="border border-gray-300 p-2 rounded"
                        required
                    />

                    <input
                        type="text"
                        name="document"
                        placeholder="Número de documento"
                        value={individual.document}
                        onChange={handleChange}
                        className="border border-gray-300 p-2 rounded"
                        required
                    />

                    <select
                        name="document_type_id"
                        value={individual.document_type_id}
                        onChange={handleChange}
                        className="border border-gray-300 p-2 rounded"
                        required
                    >
                        <option value="">Tipo de documento</option>
                        <option value="1">Cédula</option>
                        <option value="2">NIT</option>
                        <option value="3">Cédula extranjería</option>
                    </select>

                    <input
                        type="text"
                        name="address"
                        placeholder="Dirección"
                        value={individual.address}
                        onChange={handleChange}
                        className="border border-gray-300 p-2 rounded"
                        required
                    />

                    <input
                        type="tel"
                        name="phone"
                        placeholder="Teléfono"
                        value={individual.phone}
                        onChange={handleChange}
                        className="border border-gray-300 p-2 rounded"
                        required
                    />

                    <select
                        value={selectedRole}
                        onChange={(e) => setSelectedRole(e.target.value)}
                        className="border border-gray-300 p-2 rounded"
                        required
                    >
                        <option value="">Seleccionar Rol</option>
                        <option value="Gerente">Gerente</option>
                        <option value="Domiciliario">Domiciliario</option>
                        <option value="Vendedor">Vendedor</option>
                        <option value="Cliente">Cliente</option>
                    </select>

                    <div className="md:col-span-3">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700 flex items-center justify-center gap-2 disabled:bg-gray-400"
                        >
                            <HiOutlineUserAdd className="w-5 h-5" />
                            {loading ? "Registrando..." : "Agregar Usuario"}
                        </button>

                        {error && (
                            <p className="text-red-500 mt-2 text-sm">
                                Error al registrar: {error.message}
                            </p>
                        )}
                    </div>
                </form>
            </div>

            {/* Lista de usuarios */}
            <div className="bg-white shadow-sm rounded-lg p-6">
                <h2 className="text-lg font-bold text-gray-700 mb-4">Lista de Usuarios</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full text-left border border-gray-300">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="py-2 px-4 border border-gray-300 text-gray-600">Nombre</th>
                                <th className="py-2 px-4 border border-gray-300 text-gray-600">Correo</th>
                                <th className="py-2 px-4 border border-gray-300 text-gray-600">Rol</th>
                                <th className="py-2 px-4 border border-gray-300 text-gray-600 text-center">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-600">
                            {users?.data?.length > 0 ? (
                                users.data.map((user) => (
                                    <tr key={user.id} className="bg-gray-100 hover:bg-gray-200">
                                        <td className="py-2 px-4 border border-gray-300 text-black">{user.individual?.name || "Sin Nombre"}</td>
                                        <td className="py-2 px-4 border border-gray-300 text-black">{user.individual?.email || "Sin Correo"}</td>
                                        <td className="py-2 px-4 border border-gray-300 text-black">{user.rol_type?.name || "Sin Rol"}</td>
                                        <td className="py-2 px-4 border border-gray-300 text-center flex justify-center space-x-2">
                                            <button className="text-blue-600 hover:text-blue-700 p-1" title="Editar">
                                                <HiOutlinePencil className="w-5 h-5" />
                                            </button>
                                            <button className="text-red-600 hover:text-red-700 p-1" onClick={() => deleteUser(user.id)} title="Eliminar">
                                                <HiOutlineBan className="w-5 h-5" />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="text-center py-4 text-gray-500">No hay usuarios registrados.</td>
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
