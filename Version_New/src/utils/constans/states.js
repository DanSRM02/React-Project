export const VENDOR_STATES = {
    PENDING: 'Pendiente',
    PRIORITIZED: 'Priorizada',
    APPROVED: 'Aprobada',
    CANCELLED: 'Cancelada',
    READY_FOR_DELIVERY: 'Lista para entrega'
};

export const DELIVERY_STATES = {
    ASSIGNED: 'Asignada',
    IN_TRANSIT: 'En camino',
    DELIVERED: 'Entregada',
    RETURNED: 'Devuelta',
    FAILED_ATTEMPT: 'Intento fallido'
};

export const COMMON_STATES = {
    COMPLETED: 'Completada',
    REFUNDED: 'Reembolsada'
};

export const CLIENT_STATES = {
    ...COMMON_STATES,
    DELIVERED: DELIVERY_STATES.DELIVERED,    
    CANCELLED: VENDOR_STATES.CANCELLED,
    PRIORITIZED: VENDOR_STATES.PRIORITIZED,
    APPROVED: VENDOR_STATES.APPROVED,
    PENDING: VENDOR_STATES.PENDING
};

export const STATE_COLORS = {
    // Estados de Vendedor
    ...VENDOR_STATES,
    ...DELIVERY_STATES,
    ...COMMON_STATES,

    // Colores correspondientes
    PENDING: 'bg-yellow-100 text-yellow-800 border-yellow-200 hover:bg-yellow-200',
    PRIORITIZED: 'bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-200',
    APPROVED: 'bg-green-100 text-green-800 border-green-200 hover:bg-green-200',
    CANCELLED: 'bg-red-100 text-red-800 border-red-200 hover:bg-red-200',
    READY_FOR_DELIVERY: 'bg-orange-100 text-orange-800 border-orange-200 hover:bg-orange-200',

    // Estados de Domiciliario
    ASSIGNED: 'bg-indigo-100 text-indigo-800 border-indigo-200 hover:bg-indigo-200',
    IN_TRANSIT: 'bg-purple-100 text-purple-800 border-purple-200 hover:bg-purple-200',
    DELIVERED: 'bg-emerald-100 text-emerald-800 border-emerald-200 hover:bg-emerald-200',
    RETURNED: 'bg-rose-100 text-rose-800 border-rose-200 hover:bg-rose-200',
    FAILED_ATTEMPT: 'bg-amber-100 text-amber-800 border-amber-200 hover:bg-amber-200',

    // Estados Comunes
    COMPLETED: 'bg-teal-100 text-teal-800 border-teal-200 hover:bg-teal-200',
    REFUNDED: 'bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-200'
};

export const ROLE_COLORS = {
    GERENTE: "bg-purple-100 text-purple-800",
    VENDEDOR: "bg-blue-100 text-blue-800",
    DOMICILIARIO: "bg-orange-100 text-orange-800",
    CLIENTE: "bg-green-100 text-green-800"
};

export const STATUS_BADGES = {
    active: "bg-green-100 text-green-800",
    inactive: "bg-red-100 text-red-800",
    pending: "bg-yellow-100 text-yellow-800"
};