const RoutesSidebar = {
    client: [
        { to: '/client/home', label: 'Dashboard' },
        { to: '/client/orders', label: 'Mis Órdenes' },
        { to: '/client/account', label: 'Mi Cuenta' },
        { to: '/client/reviews', label: 'Mis Reseñas' },        
        { to: '/logout', label: 'Cerrar Sesión' },
    ],
    vendor: [
        { to: '/vendor/home', label: 'Dashboard' },
        { to: '/vendor/inventory', label: 'Inventario' },
        { to: '/vendor/sales', label: 'Ventas' },
        { to: '/vendor/orders', label: 'Órdenes' },
        { to: '/logout', label: 'Cerrar Sesión' },
    ],
    manager: [
        { to: '/manager/home', label: 'Dashboard' },
        { to: '/manager/reports', label: 'Reportes' },
        { to: '/manager/users', label: 'Usuarios' },
        { to: '/manager/settings', label: 'Configuración' },
        { to: '/logout', label: 'Cerrar Sesión' },
    ],
    delivery: [
        { to: '/delivery/home', label: 'Dashboard' },
        { to: '/delivery/deliveries', label: 'Mis Entregas' },
        { to: '/delivery/routes', label: 'Rutas' },        
        { to: '/logout', label: 'Cerrar Sesión' },
    ],
};

export default RoutesSidebar