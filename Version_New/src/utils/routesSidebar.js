const RoutesSidebar = {
    cliente: [
        { to: '/client/home', label: 'Inicio' },
        { to: '/client/orders', label: 'Mis Órdenes' },
        { to: '/client/reviews', label: 'Mis Reseñas' },
        { to: '/client/account', label: 'Mi Cuenta' },
        { to: '/logout', label: 'Cerrar Sesión' },
    ],
    vendedor: [
        { to: '/vendor/home', label: 'Inicio' },
        { to: '/vendor/products', label: 'Productos' },
        { to: '/vendor/orders', label: 'Órdenes' },
        { to: '/vendor/reports', label: 'Reportes' },
        { to: '/vendor/account', label: 'Mi Cuenta' },
        { to: '/logout', label: 'Cerrar Sesión' },
    ],
    domiciliario: [
        { to: '/delivery/home', label: 'Inicio' },
        { to: '/delivery/orders', label: 'Órdenes' },
        { to: '/delivery/history/orders', label: 'Mis Entregas' },
        { to: '/delivery/account', label: 'Mi Cuenta' },
        { to: '/logout', label: 'Cerrar Sesión' },
    ],
    gerente: [
        { to: '/manager/home', label: 'Inicio' },
        { to: '/manager/product', label: 'Productos' },
        { to: '/manager/orders', label: 'Órdenes' },
        { to: '/manager/users', label: 'Usuarios' },
        { to: '/manager/reports', label: 'Reportes' },        
        { to: '/manager/account', label: 'Mi Cuenta' },
        { to: '/logout', label: 'Cerrar Sesión' },
    ],
    desarrollador: [
        { to: '/developer/home', label: 'Inicio' },
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
