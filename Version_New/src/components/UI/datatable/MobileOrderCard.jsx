import { ORDER_STATE_COLORS, STATE_LABELS } from "../../../utils/constans/states";
import { formatCurrency, formatLongDate } from "../../../utils/formatHelpers";

export const MobileOrderCard = ({ order, onClick }) => (
    <div
        className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-all"
        onClick={onClick}
        role="button"
        tabIndex="0"
        aria-label={`Ver detalles de la orden ${order.id}`}
    >
        <div className="flex justify-between items-start mb-2">
            <div>
                <h3 className="font-medium text-gray-800">#{order.id.toString().padStart(5, '0')}</h3>
                <p className="text-sm text-gray-500">{formatLongDate(order.createdAt)}</p>
            </div>
            <span className={`px-2 py-1 text-xs ${ORDER_STATE_COLORS[order.state]}`}>
                {STATE_LABELS[order.state]}
            </span>
        </div>
        <div className="flex justify-between items-center">
            <p className="text-sm text-gray-600">{order.length} producto{order.length > 1 ? 's' : ''}</p>
            <p className="font-medium text-green-700">{formatCurrency(order.total)}</p>
        </div>
    </div>
);