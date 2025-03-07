export const STATE_LABELS = {
    PENDING: 'Pendiente',
    PRIORITIZED: 'Priorizada',
    PROCESSING: 'En proceso',
    APPROVED: 'Aprobada',
    COMPLETED: 'Completada',
    CANCELLED: 'Cancelada',
    SHIPPED: 'Enviada',
    DELIVERED: 'Entregada',
    REFUNDED: 'Reembolsada'
};

export const ORDER_STATE_COLORS = {
    PENDING: 'bg-yellow-100 text-yellow-800 border-yellow-200 hover:bg-yellow-200',
    PRIORITIZED: 'bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-200',
    PROCESSING: 'bg-indigo-100 text-indigo-800 border-indigo-200 hover:bg-indigo-200',
    APPROVED: 'bg-green-100 text-green-800 border-green-200 hover:bg-green-200',
    CANCELLED: 'bg-red-100 text-red-800 border-red-200 hover:bg-red-200',
    SHIPPED: 'bg-purple-100 text-purple-800 border-purple-200 hover:bg-purple-200',
    DELIVERED: 'bg-emerald-100 text-emerald-800 border-emerald-200 hover:bg-emerald-200',
    REFUNDED: 'bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-200'
};

export const ROLE_COLORS = {
    GERENTE: "bg-purple-100 text-purple-800",
    VENDEDOR: "bg-blue-100 text-blue-800",
    DOMICILIARIO: "bg-orange-100 text-orange-800",
    CLIENTE: "bg-green-100 text-green-800"
};

export const STATUS = {
    true: "bg-green-100 text-green-800",
    false: "bg-red-100 text-red-800"
};
