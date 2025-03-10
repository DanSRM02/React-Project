import React from "react";
import { EnvelopeIcon, IdentificationIcon, MapPinIcon, PhoneIcon, ShieldCheckIcon, UserCircleIcon, UserIcon } from "../Icons";
export const DetailItem = ({ label, value, icon }) => {
    const icons = {
        user: <UserIcon className="h-5 w-5" />,
        id: <IdentificationIcon className="h-5 w-5" />,
        email: <EnvelopeIcon className="h-5 w-5" />,
        phone: <PhoneIcon className="h-5 w-5" />,
        location: <MapPinIcon className="h-5 w-5" />,
        badge: <ShieldCheckIcon className="h-5 w-5" />,
        person: <UserCircleIcon className="h-5 w-5" />
    };

    return (
        <div className="flex items-start gap-3">
            <span className="text-gray-400 mt-0.5">{icons[icon]}</span>
            <div>
                <dt className="text-sm font-medium text-gray-500 mb-1">{label}</dt>
                <dd className="text-gray-900 font-[500]">{value || 'No especificado'}</dd>
            </div>
        </div>
    );
};
