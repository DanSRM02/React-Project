import React from "react";
import Card from "../../components/UI/Card";
import {
    FaClipboardList,
    FaPlusCircle,
    FaStar,
    FaLifeRing,
    FaMapMarkedAlt,
    FaFileInvoiceDollar,
    FaMoneyBillWave,
    FaShoppingBag
} from "react-icons/fa";
import { StatCard } from "../../components/UI/StatCard";

const ClientHomePage = ({ role }) => {
    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Encabezado mejorado */}
                <div className="mb-10 text-center">
                    <div className="inline-flex items-center gap-3 mb-4">
                        <FaShoppingBag className="text-3xl text-green-600" />
                        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
                            Panel del Cliente
                        </h1>
                    </div>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Gestiona tus pedidos, reseñas y configuración de cuenta desde un solo lugar.
                    </p>
                </div>

                {/* Estadísticas relevantes */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
                    <StatCard
                        title="Órdenes Activas"
                        value="2"
                        icon={<FaClipboardList className="w-6 h-6" />}
                        color="bg-blue-100 text-blue-600"
                    />
                    <StatCard
                        title="Reseñas Realizadas"
                        value="8"
                        icon={<FaStar className="w-6 h-6" />}
                        color="bg-amber-100 text-amber-600"
                    />
                    <StatCard
                        title="Soporte Pendiente"
                        value="1"
                        icon={<FaLifeRing className="w-6 h-6" />}
                        color="bg-red-100 text-red-600"
                    />
                </div>

                {/* Tarjetas de acción con estilo consistente */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Card
                        title="Mis Órdenes"
                        description="Consulta el estado de tus pedidos y su historial"
                        linkLabel="Ver Detalles"
                        linkTo="/client/orders"
                        icon={FaClipboardList}
                        gradient="from-blue-50 to-blue-100"
                    />

                    <Card
                        title="Nuevo Pedido"
                        description="Selecciona productos y genera una nueva orden"
                        linkLabel="Crear Ahora"
                        linkTo="/client/order/create"
                        icon={FaPlusCircle}
                        gradient="from-green-50 to-green-100"
                    />

                    <Card
                        title="Mis Reseñas"
                        description="Visualiza o edita tus comentarios sobre productos"
                        linkLabel="Gestionar"
                        linkTo="/client/reviews"
                        icon={FaStar}
                        gradient="from-amber-50 to-amber-100"
                    />

                    {role === "empresarial" && (
                        <>
                            <Card
                                title="Direcciones"
                                description="Administra múltiples direcciones de entrega"
                                linkLabel="Ver Direcciones"
                                linkTo="/client/addresses"
                                icon={FaMapMarkedAlt}
                                gradient="from-purple-50 to-purple-100"
                            />
                            <Card
                                title="Cotizaciones"
                                description="Solicita presupuestos para compras corporativas"
                                linkLabel="Ver Cotizaciones"
                                linkTo="/client/quotations"
                                icon={FaFileInvoiceDollar}
                                gradient="from-indigo-50 to-indigo-100"
                            />
                            <Card
                                title="Facturación"
                                description="Gestiona tus documentos fiscales y facturas"
                                linkLabel="Ver Facturación"
                                linkTo="/client/billing"
                                icon={FaMoneyBillWave}
                                gradient="from-cyan-50 to-cyan-100"
                            />
                        </>
                    )}

                    <Card
                        title="Soporte"
                        description="¿Necesitas ayuda? Contáctanos directamente"
                        linkLabel="Contactar"
                        linkTo="/support"
                        icon={FaLifeRing}
                        gradient="from-gray-50 to-gray-100"
                    />
                </div>
            </div>
        </div>
    );
};

export default ClientHomePage;