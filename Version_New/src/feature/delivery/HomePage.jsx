import React from "react";
import { FaClipboardList, FaUser, FaBox, FaTachometerAlt, FaHistory, FaStar } from "react-icons/fa";
import Card from "../../components/UI/Card";
import { StatCard } from "../../components/UI/StatCard";

const DomiciliaryHomePage = () => {
    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-10 text-center">
                    <div className="inline-flex items-center gap-3 mb-4">
                        <FaTachometerAlt className="text-3xl text-green-600" />
                        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
                            Panel de Domiciliario
                        </h1>
                    </div>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Bienvenido(a). Gestiona tus órdenes asignadas y revisa tu historial de entregas.
                    </p>
                </div>

                {/* Estadísticas mejoradas */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
                    <StatCard
                        title="Órdenes Pendientes"
                        value="5"
                        icon={<FaBox className="w-6 h-6" />}
                        color="bg-red-100 text-red-600"
                    />
                    <StatCard
                        title="Órdenes Entregadas"
                        value="32"
                        icon={<FaHistory className="w-6 h-6" />}
                        color="bg-blue-100 text-blue-600"
                    />
                    <StatCard
                        title="Calificación"
                        value="4.8"
                        icon={<FaStar className="w-6 h-6" />}
                        color="bg-amber-100 text-amber-600"
                    />
                </div>

                {/* Tarjetas de acción con hover effects */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Card
                        title="Órdenes Asignadas"
                        description="Revisa las órdenes pendientes por entregar"
                        linkLabel="Ver Detalles"
                        linkTo="/delivery/orders"
                        icon={FaBox}
                        gradient="from-green-50 to-green-100"
                    />
                    <Card
                        title="Historial de Entregas"
                        description="Consulta tu historial de entregas realizadas"
                        linkLabel="Ver Historial"
                        linkTo="/delivery/history/orders"
                        icon={FaClipboardList}
                        gradient="from-blue-50 to-blue-100"
                    />
                    <Card
                        title="Mi Perfil"
                        description="Actualiza tu información personal y de contacto"
                        linkLabel="Gestionar Perfil"
                        linkTo="/delivery/account"
                        icon={FaUser}
                        gradient="from-purple-50 to-purple-100"
                    />
                </div>
            </div>
        </div>
    );
};

export default DomiciliaryHomePage;