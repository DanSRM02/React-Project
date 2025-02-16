import React from "react"
import CardClient from "../../components/UI/CardClient"

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
                {/* Mis Órdenes */}
                <CardClient
                    title="Mis Órdenes"
                    description="Consulta el estado de tus pedidos y su historial."
                    linkTo="/client/orders"
                    linkLabel="Ver Órdenes"
                />

                <CardClient
                    title="Crear Orden"
                    description="Selecciona tus productos y genera un nuevo pedido."
                    linkTo="/client/create-order"
                    linkLabel="Crear"
                />

                <CardClient
                    title="Mis Reseñas  "
                    description="Visualiza o edita tus comentarios sobre los productos."
                    linkTo="/client/reviews"
                    linkLabel="Ver Reseñas"
                />

                <CardClient
                    title="Soporte"
                    description="¿Necesitas ayuda? Contáctanos para resolver tus dudas."
                    linkTo="/support"
                    linkLabel="Ir a Soporte"
                />

                {/* Opciones adicionales para clientes empresariales */}
                {role === "empresarial" && (
                    <>
                        <CardClient
                            title="Direcciones"
                            description="Administra múltiples direcciones de entrega."
                            linkTo="/client/addresses"
                            linkLabel="Ver Direcciones"
                        />

                        <CardClient
                            title="Cotizaciones"
                            description="Solicita presupuestos para compras a gran escala."
                            linkTo="/client/quotations"
                            linkLabel="Ver Cotizaciones"
                        />

                        <CardClient
                            title="Facturación"
                            description="Gestiona tus facturas y datos fiscales."
                            linkTo="/client/billing"
                            linkLabel="Ver Facturación"
                        />
                    </>
                )}
            </div>
        </div>
    )
}

export default ClientHomePage