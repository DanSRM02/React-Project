import React, { useEffect, useState } from "react";
import { useUsers } from "../../hooks/useUsers";
import { useAuth } from "../../contexts/AuthContext";
import Input from "../../components/UI/Input";
import Label from "../../components/UI/Label";
import Loader from "../../components/UI/Loader";

const AccountSettings = () => {
    const { fetchUserById, updateUser, error, isLoading, selectedUser } = useUsers();
    const { user } = useAuth();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        address: "",
        document: "",
        phone: ""
    });
    const [newPassword, setNewPassword] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    useEffect(() => {
        const loadUserData = async () => {
            try {
                await fetchUserById(user.id);
            } catch (err) {
                console.error("Error cargando usuario:", err);
            }
        };
        loadUserData();
    }, []);    


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userData = { individual: { ...formData } };
            if (newPassword) userData.password = newPassword;

            await updateUser(selectedUser.id, userData);
            setSuccessMessage("Cambios guardados exitosamente!");
            setTimeout(() => setSuccessMessage(""), 3000);
            setNewPassword("");
        } catch (err) {
            console.error("Error actualizando usuario:", err);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Configuración de Cuenta</h1>
                <p className="text-gray-600 mt-2">
                    Gestiona tu información personal y preferencias de cuenta
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Sección de Información del Sistema */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-800 mb-6">Información del Sistema</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <Label>Nombre de usuario</Label>
                            <Input
                                showIcon={false}
                                value={selectedUser?.username || ""}
                                readOnly
                                className="bg-gray-50"
                            />
                        </div>
                        <div>
                            <Label>Rol del usuario</Label>
                            <Input
                                showIcon={false}
                                value={selectedUser?.rol_type?.name || ""}
                                readOnly
                                className="bg-gray-50"
                            />
                        </div>
                    </div>
                </div>

                {/* Sección de Información Personal */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-800 mb-6">Información Personal</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <Label>Nombre completo</Label>
                            <Input
                                showIcon={false}
                                name="name"
                                value={selectedUser?.individual.name}
                                onChange={handleChange}
                                placeholder="Ej: Juan Pérez"
                            />
                        </div>
                        <div>
                            <Label>Correo electrónico</Label>
                            <Input                            
                                showIcon={false}
                                type="email"
                                name="email"
                                value={selectedUser?.individual.email}
                                onChange={handleChange}
                                placeholder="Ej: juan@example.com"
                            />
                        </div>
                        <div>
                            <Label>Documento</Label>
                            <div className="flex gap-3">
                                <Input
                                    showIcon={false}
                                    name="document"
                                    value={selectedUser?.individual.document}
                                    onChange={handleChange}
                                    className="flex-1"
                                    placeholder="Número de documento"
                                />
                                <Input
                                    showIcon={false}
                                    value={selectedUser?.individual?.document_type?.acronym || ""}
                                    readOnly
                                    className="w-20 bg-gray-50"
                                />
                            </div>
                        </div>
                        <div>
                            <Label>Teléfono</Label>
                            <Input
                                showIcon={false}
                                type="tel"
                                name="phone"
                                value={selectedUser?.individual.phone}
                                onChange={handleChange}
                                placeholder="Ej: 300 123 4567"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <Label>Dirección</Label>
                            <Input
                                showIcon={false}
                                name="address"
                                value={selectedUser?.individual.address}
                                onChange={handleChange}
                                placeholder="Ej: Carrera 45 # 20-30"
                            />
                        </div>
                    </div>
                </div>

                {/* Mensajes de estado */}
                {successMessage && (
                    <div className="p-4 bg-green-50 text-green-700 rounded-lg">
                        {successMessage}
                    </div>
                )}

                {error.update && (
                    <div className="p-4 bg-red-50 text-red-700 rounded-lg">
                        Error al guardar: {error.update.message}
                    </div>
                )}

                {/* Botón de enviar */}
                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={isLoading.update}
                        className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading.update ? (
                            <Loader />
                        ) : (
                            "Guardar Cambios"
                        )}
                    </button>
                </div>
            </form>
        </div>

    );
};

export default AccountSettings;