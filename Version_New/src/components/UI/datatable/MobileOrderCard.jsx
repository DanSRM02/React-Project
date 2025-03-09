import { COMMON_STATES, DELIVERY_STATES, STATE_COLORS, VENDOR_STATES } from "../../../utils/constans/states";
import { formatCurrency, formatLongDate } from "../../../utils/formatHelpers";

export const MobileOrderCard = ({ order, onClick }) => {
    // Combinar todos los labels de estado
    const STATE_LABELS = {
        ...VENDOR_STATES,
        ...DELIVERY_STATES,
        ...COMMON_STATES
    };
       

    // Manejar estados no definidos
    const getStateLabel = () => STATE_LABELS[order.state] || "Estado desconocido";
    const getStateColor = () => STATE_COLORS[order.state] || "bg-gray-100 text-gray-800";

    return (
        <div
            className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-all"
            onClick={onClick}
            role="button"
            tabIndex="0"
            aria-label={`Orden ${order.id} - Estado: ${getStateLabel()}`}
        >
            <div className="flex justify-between items-start mb-2">
                <div>
                    <h3 className="font-medium text-gray-800">#{order.id.toString().padStart(5, '0')}</h3>
                    <p className="text-sm text-gray-500">{formatLongDate(order.createdAt)}</p>
                </div>
                <div className={`flex items-center px-2 py-1 rounded-full text-xs ${getStateColor()}`}>                    
                    <span>{getStateLabel()}</span>
                </div>
            </div>

            <div className="flex justify-between items-center">
                <p className="text-sm text-gray-600">
                    {order.itemsCount} producto{order.itemsCount > 1 ? 's' : ''}
                </p>
                <p className="font-medium text-green-700">{formatCurrency(order.total)}</p>
            </div>

            {/* Mostrar info adicional para estados específicos */}
            {order.state === DELIVERY_STATES.IN_TRANSIT && (
                <div className="mt-2 text-xs text-blue-600 flex items-center">
                    <TruckIcon className="h-3 w-3 mr-1" />
                    En camino - {order.deliveryPerson?.name || 'Domiciliario no asignado'}
                </div>
            )}
        </div>
    );
};