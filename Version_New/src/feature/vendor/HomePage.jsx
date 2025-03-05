import React from "react";
import Card from "../../components/UI/Card";
import {
    FaClipboardList,
    FaTasks,
    FaBox,
    FaUserShield
} from "react-icons/fa";
import { StatCard } from "../../components/UI/StatCard";

const VendorHomePage = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 py-8 sm:py-10">
            {/* Encabezado */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8">
                Panel del Vendedor
            </h1>

            {/* Sección de métricas (puedes adaptar los valores con datos reales) */}
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <StatCard
                    title="Órdenes Pendientes"
                    value="12"
                    icon={<FaClipboardList className="w-6 h-6" />}
                />
                <StatCard
                    title="Órdenes Priorizadas"
                    value="3"
                    icon={<FaTasks className="w-6 h-6" />}
                />
                <StatCard
                    title="Productos Activos"
                    value="25"
                    icon={<FaBox className="w-6 h-6" />}
                />               
            </section>

            {/* Sección de accesos rápidos con gradientes */}
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card
                    title="Gestión de Órdenes"
                    description="Visualiza y prioriza las órdenes pendientes."
                    linkLabel="Ir a Órdenes"
                    linkTo="/vendor/orders"
                    icon={FaClipboardList}
                    gradient="from-green-50 to-green-100"
                />
                <Card
                    title="Gestión de Productos"
                    description="Agrega, edita y controla el inventario de productos."
                    linkLabel="Ir a Productos"
                    linkTo="/vendor/products"
                    icon={FaBox}
                    gradient="from-blue-50 to-blue-100"
                />
                <Card
                    title="Reporte de Ventas"
                    description="Consulta estadísticas y reportes de ventas."
                    linkLabel="Ver Reportes"
                    linkTo="/vendor/reports"
                    icon={FaUserShield}
                    gradient="from-purple-50 to-purple-100"
                />              
            </section>
        </div>
    );
};

export default VendorHomePage;
