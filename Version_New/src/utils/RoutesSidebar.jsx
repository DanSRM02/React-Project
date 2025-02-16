const RoutesSidebar = {
    client: [
        { to: '/client/orders', label: 'Mis Órdenes' },
        { to: '/client/account', label: 'Mi Cuenta' },
        { to: '/client/reviews', label: 'Mis Reseñas' },
        { to: '/support', label: 'Soporte' },
        { to: '/logout', label: 'Cerrar Sesión' },
    ],
    vendor: [
        { to: '/vendor/inventory', label: 'Inventario' },
        { to: '/vendor/sales', label: 'Ventas' },
        { to: '/vendor/orders', label: 'Órdenes' },
        { to: '/logout', label: 'Cerrar Sesión' },
    ],
    manager: [
        { to: '/manager/dashboard', label: 'Dashboard' },
        { to: '/manager/reports', label: 'Reportes' },
        { to: '/manager/users', label: 'Usuarios' },
        { to: '/manager/settings', label: 'Configuración' },
        { to: '/logout', label: 'Cerrar Sesión' },
    ],
    delivery: [
        { to: '/delivery/deliveries', label: 'Mis Entregas' },
        { to: '/delivery/routes', label: 'Rutas' },
        { to: '/delivery/profile', label: 'Perfil' },
        { to: '/logout', label: 'Cerrar Sesión' },
    ],
};

export default RoutesSidebar