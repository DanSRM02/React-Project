import React from 'react';
import { Link } from 'react-router-dom';

const Card = ({ title, description, linkLabel, linkTo, icon: Icon, gradient }) => {
    return (
        <div className={`bg-gradient-to-br ${gradient} rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}>
            <div className="p-6 h-full flex flex-col">
                <div className="flex flex-col items-center mb-4">
                    {Icon && <Icon className="w-12 h-12 p-2 text-white bg-green-600 rounded-full mb-4" />}
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">{title}</h2>
                    <p className="text-gray-600 text-center mb-4">{description}</p>
                </div>
                <Link
                    to={linkTo}
                    className="mt-auto inline-block w-full text-center bg-white text-green-600 px-6 py-2 rounded-lg font-medium hover:bg-green-50 transition-colors border border-green-100"
                >
                    {linkLabel}
                </Link>
            </div>
        </div>
    );
};
export default Card;
