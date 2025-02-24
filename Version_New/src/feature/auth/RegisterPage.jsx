import React, { useState } from "react";
import { Link } from "react-router-dom";
import Input from "../../components/UI/Input";
import Label from "../../components/UI/Label";
import ConfirmationModal from "../../components/UI/ConfirmationModal";
import { useRegisterIndividual } from "./hooks/useRegisterIndividual";
import { useDocumentTypes } from "../../hooks/useDocumentTypes";
import { useIndividualTypes } from "../../hooks/useIndividualTypes";

const RegisterContainer = () => {
    const { individual, handleChange, registerIndividual, loading, error } = useRegisterIndividual();
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Obtención de catálogos dinámicos
    const { documentTypes, loading: loadingDocs, error: errorDocs } = useDocumentTypes();
    const { individualTypes, loading: loadingIndTypes, error: errorIndTypes } = useIndividualTypes();

    // Al enviar el formulario, se abre el modal de confirmación
    const onFormSubmit = (e) => {
        e.preventDefault();
        setIsModalOpen(true);
    };

    const handleConfirm = async () => {
        setIsModalOpen(false);
        await registerIndividual();
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 sm:p-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-center mb-2">
                    Crea tu cuenta
                </h2>
                <p className="text-center text-gray-500 mb-6">
                    Regístrate para acceder a todas nuestras funcionalidades
                </p>

                <form onSubmit={onFormSubmit} className="space-y-4">
                    <div>
                        <Label htmlFor="name">Nombre Completo</Label>
                        <Input
                            name="name"
                            id="name"
                            placeholder="Ingresa tu nombre completo"
                            value={individual.name}
                            onChange={handleChange}
                            showIcon={false}
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="email">Correo Electrónico</Label>
                        <Input
                            type="email"
                            name="email"
                            id="email"
                            placeholder="tucorreo@ejemplo.com"
                            value={individual.email}
                            onChange={handleChange}
                            showIcon={false}
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="address">Dirección</Label>
                        <Input
                            name="address"
                            id="address"
                            placeholder="Ingresa tu dirección"
                            value={individual.address}
                            onChange={handleChange}
                            showIcon={false}
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="phone">Teléfono</Label>
                        <Input
                            name="phone"
                            id="phone"
                            placeholder="Ingresa tu número de teléfono"
                            value={individual.phone}
                            onChange={handleChange}
                            showIcon={false}
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="document_type_id">Tipo de Documento</Label>
                        <select
                            id="document_type_id"
                            name="document_type_id"
                            value={individual.document_type_id}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-green-200"
                            required
                        >
                            <option value="">Selecciona un tipo de documento</option>
                            {loadingDocs ? (
                                <option>Cargando...</option>
                            ) : errorDocs ? (
                                <option>Error al cargar</option>
                            ) : (
                                documentTypes.map((dt) => (
                                    <option key={dt.id} value={dt.id}>
                                        {dt.name} {dt.acronym ? `(${dt.acronym})` : ""}
                                    </option>
                                ))
                            )}
                        </select>
                    </div>
                    <div>
                        <Label htmlFor="document">Documento</Label>
                        <Input
                            name="document"
                            id="document"
                            placeholder="Ingresa tu número de documento"
                            value={individual.document}
                            onChange={handleChange}
                            showIcon={false}
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="individual_type_id">Tipo de Individuo</Label>
                        {individual.individual_type_id ? (
                            <p className="w-full border border-gray-300 rounded-md px-3 py-2">
                                {loadingIndTypes
                                    ? "Cargando..."
                                    : errorIndTypes
                                        ? "Error al cargar"
                                        : individualTypes.find(
                                            (it) => it.id === Number(individual.individual_type_id)
                                        )?.name || "No encontrado"}
                            </p>
                        ) : (
                            <p className="w-full border border-gray-300 rounded-md px-3 py-2">
                                Sin asignar
                            </p>
                        )}
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition disabled:opacity-50"
                        disabled={loading}
                    >
                        {loading ? "Cargando..." : "Registrarse"}
                    </button>
                </form>

                <ConfirmationModal
                    isOpen={isModalOpen}
                    onCancel={handleCancel}
                    onConfirm={handleConfirm}
                    title="Registro exitoso."
                    message="Para ingresar, utiliza tu correo como 
                    nombre de usuario y tu número de documento como contraseña.
                    Recuerda cambiar tu contraseña en el primer acceso."
                />

                {error && (
                    <p className="text-red-500 text-center mt-2">
                        {error.message || "Ocurrió un error al registrarse"}
                    </p>
                )}

                <p className="text-center text-gray-600 text-sm mt-4">
                    ¿Ya tienes cuenta?{" "}
                    <Link to="/login" className="text-green-600 hover:underline">
                        Inicia sesión
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default RegisterContainer;
