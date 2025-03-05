import React, { useState } from "react";
import { HiOutlineUserAdd, HiOutlinePencil, HiOutlineBan, HiOutlineSearch } from "react-icons/hi";
import { useRegisterIndividual } from "../auth/hooks/useRegisterIndividual";
import { useUsers } from "../../hooks/useUsers";

const roleColors = {
    GERENTE: "bg-purple-100 text-purple-800",
    VENDEDOR: "bg-blue-100 text-blue-800",
    DOMICILIARIO: "bg-orange-100 text-orange-800",
    CLIENTE: "bg-green-100 text-green-800"
};

const statusColors = {
    true: "bg-green-100 text-green-800",
    false: "bg-red-100 text-red-800"
};

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

    const [selectedRole, setSelectedRole] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [currentView, setCurrentView] = useState("form"); // 'form' o 'list'

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
            await createUser(formData);
            setSelectedRole("");
            setCurrentView("list");
        } catch (err) {
            console.error("Error al registrar usuario:", err);
        }
    };

    const filteredUsers = users?.data?.filter(user => {
        const matchesSearch = user.individual?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.individual?.email?.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesSearch;
    });

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row justify-between items-start mb-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">Gestión de Usuarios</h1>

                <div className="flex gap-4 w-full md:w-96">
                    <div className="relative flex-1">
                        <HiOutlineSearch className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Buscar usuarios..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 pr-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>
                    <button
                        onClick={() => setCurrentView(current => current === "form" ? "list" : "form")}
                        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 flex items-center gap-2"
                    >
                        <HiOutlineUserAdd className="w-5 h-5" />
                        {currentView === "form" ? "Ver Lista" : "Nuevo Usuario"}
                    </button>
                </div>
            </div>

            {currentView === "form" && (
                <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
                    <h2 className="text-xl font-semibold text-gray-700 mb-6">Registrar Nuevo Usuario</h2>
                    <form onSubmit={handleAddUser} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Nombre Completo</label>
                            <input
                                type="text"
                                name="name"
                                value={individual.name}
                                onChange={handleChange}
                                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Correo Electrónico</label>
                            <input
                                type="email"
                                name="email"
                                value={individual.email}
                                onChange={handleChange}
                                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Tipo de Documento</label>
                            <select
                                name="document_type_id"
                                value={individual.document_type_id}
                                onChange={handleChange}
                                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                                required
                            >
                                <option value="">Seleccionar</option>
                                <option value="1">Cédula</option>
                                <option value="2">NIT</option>
                                <option value="3">Cédula extranjería</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Número de Documento</label>
                            <input
                                type="text"
                                name="document"
                                value={individual.document}
                                onChange={handleChange}
                                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Rol del Usuario</label>
                            <select
                                value={selectedRole}
                                onChange={(e) => setSelectedRole(e.target.value)}
                                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                                required
                            >
                                <option value="">Seleccionar</option>
                                <option value="Gerente">Gerente</option>
                                <option value="Domiciliario">Domiciliario</option>
                                <option value="Vendedor">Vendedor</option>
                                <option value="Cliente">Cliente</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Teléfono</label>
                            <input
                                type="tel"
                                name="phone"
                                value={individual.phone}
                                onChange={handleChange}
                                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                                required
                            />
                        </div>

                        <div className="md:col-span-2 space-y-2">
                            <label className="text-sm font-medium text-gray-700">Dirección</label>
                            <input
                                type="text"
                                name="address"
                                value={individual.address}
                                onChange={handleChange}
                                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                                required
                            />
                        </div>

                        <div className="md:col-span-2 mt-4">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 flex items-center justify-center gap-2 disabled:bg-gray-400"
                            >
                                <HiOutlineUserAdd className="w-5 h-5" />
                                {loading ? "Registrando..." : "Crear Usuario"}
                            </button>
                            {error && (
                                <p className="text-red-500 mt-2 text-sm text-center">
                                    Error: {error.message}
                                </p>
                            )}
                        </div>
                    </form>
                </div>
            )}

            {currentView === "list" && (
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Usuario</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Documento</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contacto</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rol</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Estado</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Acciones</th>
                                </tr>
                            </thead>

                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredUsers?.map(user => (
                                    <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                                                    <span className="text-green-600 font-medium">
                                                        {user.individual.name[0].toUpperCase()}
                                                    </span>
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {user.individual.name}
                                                    </div>
                                                    <div className="text-sm text-gray-500">
                                                        {user.individual.email}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="px-6 py-4">
                                            <div className="text-sm text-gray-900">
                                                {user.individual.document_type.acronym} {user.individual.document}
                                            </div>
                                        </td>

                                        <td className="px-6 py-4">
                                            <div className="text-sm text-gray-900">
                                                {user.individual.phone}
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                {user.individual.address}
                                            </div>
                                        </td>

                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${roleColors[user.rol_type.name]}`}>
                                                {user.rol_type.name.toLowerCase()}
                                            </span>
                                        </td>

                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[user.state]}`}>
                                                {user.state ? 'Activo' : 'Inactivo'}
                                            </span>
                                        </td>

                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end gap-3">
                                                <button
                                                    className="text-green-600 hover:text-green-800"
                                                    title="Editar usuario"
                                                >
                                                    <HiOutlinePencil className="w-5 h-5" />
                                                </button>
                                                <button
                                                    onClick={() => deleteUser(user.id)}
                                                    className="text-red-600 hover:text-red-800"
                                                    title="Desactivar usuario"
                                                >
                                                    <HiOutlineBan className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {filteredUsers?.length === 0 && (
                        <div className="text-center py-8 text-gray-500">
                            {isLoading ? "Cargando usuarios..." : "No se encontraron resultados"}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default CreateUserPage;