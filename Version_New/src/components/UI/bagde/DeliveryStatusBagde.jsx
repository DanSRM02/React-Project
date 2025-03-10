import React from "react";
import {
    FaInfoCircle
} from "react-icons/fa";
export const DeliveryStatusBadge = ({ status }) => {
    const getStatusStyles = () => {
        switch (status) {
            case 'READY_TO_DISPATCH':
                return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'ON_THE_WAY':
                return 'bg-purple-100 text-purple-800 border-purple-200';
            case 'DELIVERED':
                return 'bg-emerald-100 text-emerald-800 border-emerald-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const getStatusText = () => {
        switch (status) {
            case 'READY_TO_DISPATCH':
                return 'Listo para enviar';
            case 'ON_THE_WAY':
                return 'En camino';
            case 'DELIVERED':
                return 'Entregado';
            default:
                return status;
        }
    };

    return (
        <div className={`px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-2 border ${getStatusStyles()}`}>
            <FaInfoCircle className="text-sm" />
            {getStatusText()}
        </div>
    );
};
