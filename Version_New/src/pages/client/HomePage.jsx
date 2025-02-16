import React from "react";
import Card from "../../components/UI/Card";
import {
    FaClipboardList,
    FaPlusCircle,
    FaStar,
    FaLifeRing,
    FaMapMarkedAlt,
    FaFileInvoiceDollar,
    FaMoneyBillWave
} from "../../components/UI/Icons";

const ClientHomePage = ({ role }) => {
    return (
        <div className="p-4">
            {/* Encabezado de bienvenida */}
            <h1 className="text-3xl font-bold mb-2">¡Bienvenido, {"m"}!</h1>
            <p className="text-gray-600 mb-6">
                Aquí encontrarás toda la información relacionada con tus órdenes, reseñas y más.
            </p>

            {/* Sección de accesos rápidos */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card
                    title="Mis Órdenes"
                    description="Consulta el estado de tus pedidos y su historial."
                    linkTo="/client/orders"
                    linkLabel="Ver Órdenes"
                    icon={FaClipboardList}
                />

                <Card
                    title="Crear Orden"
                    description="Selecciona tus productos y genera un nuevo pedido."
                    linkTo="/client/order/create"
                    linkLabel="Crear"
                    icon={FaPlusCircle}
                />

                <Card
                    title="Mis Reseñas"
                    description="Visualiza o edita tus comentarios sobre los productos."
                    linkTo="/client/reviews"
                    linkLabel="Ver Reseñas"
                    icon={FaStar}
                />

                <Card
                    title="Soporte"
                    description="¿Necesitas ayuda? Contáctanos para resolver tus dudas."
                    linkTo="/support"
                    linkLabel="Ir a Soporte"
                    icon={FaLifeRing}
                />

                {role === "empresarial" && (
                    <>
                        <Card
                            title="Direcciones"
                            description="Administra múltiples direcciones de entrega."
                            linkTo="/client/addresses"
                            linkLabel="Ver Direcciones"
                            icon={FaMapMarkedAlt}
                        />

                        <Card
                            title="Cotizaciones"
                            description="Solicita presupuestos para compras a gran escala."
                            linkTo="/client/quotations"
                            linkLabel="Ver Cotizaciones"
                            icon={FaFileInvoiceDollar}
                        />

                        <Card
                            title="Facturación"
                            description="Gestiona tus facturas y datos fiscales."
                            linkTo="/client/billing"
                            linkLabel="Ver Facturación"
                            icon={FaMoneyBillWave}
                        />
                    </>
                )}
            </div>
        </div>
    );
};

export default ClientHomePage;
