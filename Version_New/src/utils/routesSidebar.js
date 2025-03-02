const RoutesSidebar = {
    cliente: [
        { to: '/client/home', label: 'Dashboard' },
        { to: '/client/orders', label: 'Mis Órdenes' },
        { to: '/client/account', label: 'Mi Cuenta' },
        { to: '/client/reviews', label: 'Mis Reseñas' },        
        { to: '/logout', label: 'Cerrar Sesión' },
    ],
    vendedor: [
        { to: '/vendor/home', label: 'Dashboard' },
        { to: '/vendor/products', label: 'Productos' },
        { to: '/vendor/sales', label: 'Ventas' },
        { to: '/vendor/orders', label: 'Órdenes' },
        { to: '/logout', label: 'Cerrar Sesión' },
    ],
    domiciliario: [
        { to: '/delivery/home', label: 'Dashboard' },
        { to: '/delivery/deliveries', label: 'Mis Entregas' },
        { to: '/delivery/routes', label: 'Rutas' },        
        { to: '/logout', label: 'Cerrar Sesión' },
    ],
    gerente: [
        { to: '/manager/home', label: 'Dashboard' },
        { to: '/manager/reports', label: 'Reportes' },
        { to: '/manager/users', label: 'Usuarios' },
        { to: '/manager/settings', label: 'Configuración' },
        { to: '/logout', label: 'Cerrar Sesión' },
    ],
    desarrollador: [
        { to: '/developer/home', label: 'Dashboard' },
        { to: '/developer/reports', label: 'Reportes' },
        { to: '/developer/users', label: 'Usuarios' },
        { to: '/developer/settings', label: 'Configuración' },
        { to: '/developer/inventory', label: 'Inventario' },
        { to: '/developer/sales', label: 'Ventas' },
        { to: '/developer/orders', label: 'Órdenes' },
        { to: '/developer/routes', label: 'Rutas' },
        { to: '/logout', label: 'Cerrar Sesión' },
    ],
};

export default RoutesSidebar;
