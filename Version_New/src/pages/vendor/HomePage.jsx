import React from "react";
import Card from "../../components/UI/Card";
import { FaClipboardList, FaTasks, FaBox, FaUserShield } from "../../Components/UI/Icons"; 

const VendorHomePage = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-6 sm:py-8 md:py-10">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 text-center">
                Panel del Vendedor
            </h1>

            {/* Sección de métricas */}
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-lg shadow p-4 flex flex-col items-center justify-center">
                    <FaClipboardList className="text-3xl text-green-600 mb-2" />
                    <h3 className="text-lg font-semibold">Órdenes Pendientes</h3>
                    <p className="text-2xl font-bold text-green-600">12</p>
                </div>
                <div className="bg-white rounded-lg shadow p-4 flex flex-col items-center justify-center">
                    <FaTasks className="text-3xl text-green-600 mb-2" />
                    <h3 className="text-lg font-semibold">Órdenes Priorizadas</h3>
                    <p className="text-2xl font-bold text-green-600">3</p>
                </div>
                <div className="bg-white rounded-lg shadow p-4 flex flex-col items-center justify-center">
                    <FaBox className="text-3xl text-green-600 mb-2" />
                    <h3 className="text-lg font-semibold">Productos Activos</h3>
                    <p className="text-2xl font-bold text-green-600">25</p>
                </div>
                <div className="bg-white rounded-lg shadow p-4 flex flex-col items-center justify-center">
                    <FaUserShield className="text-3xl text-green-600 mb-2" />
                    <h3 className="text-lg font-semibold">Ventas del Día</h3>
                    <p className="text-2xl font-bold text-green-600">$1,500,000</p>
                </div>
            </section>

            {/* Sección de accesos rápidos */}
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card
                    title="Gestión de Órdenes"
                    description="Visualiza y prioriza las órdenes pendientes."
                    linkLabel="Ir a Órdenes"
                    linkTo="/vendor/orders"
                    icon={FaClipboardList}
                />
                <Card
                    title="Gestión de Productos"
                    description="Agrega, edita y controla el inventario de productos."
                    linkLabel="Ir a Productos"
                    linkTo="/vendor/products"
                    icon={FaBox}
                />
                <Card
                    title="Reporte de Ventas"
                    description="Consulta estadísticas y reportes de ventas."
                    linkLabel="Ver Reportes"
                    linkTo="/vendor/reports"
                    icon={FaUserShield}
                />
                <Card
                    title="Pendientes de Entrega"
                    description="Revisa los pedidos listos para ser despachados."
                    linkLabel="Ver Entregas"
                    linkTo="/vendor/deliveries"
                    icon={FaTasks}
                />
            </section>
        </div>
    );
};

export default VendorHomePage;
