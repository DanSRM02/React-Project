import React from 'react';
import { Link } from 'react-router-dom';

const Card = ({ title, description, linkLabel, linkTo, icon: Icon }) => {
    return (
        <div className="bg-white shadow rounded-lg p-6 flex flex-col justify-between">
            <div className="flex flex-col items-center">
                {Icon && <Icon className="text-4xl text-green-600 mb-4" />}
                <h2 className="text-xl font-semibold mb-2">{title}</h2>
                <p className="text-gray-600 text-center">{description}</p>
            </div>
            <Link
                to={linkTo}
                className="mt-4 inline-block bg-green-600 text-center text-white px-4 py-2 rounded hover:bg-green-700 transition"
            >
                {linkLabel}
            </Link>
        </div>
    );
};

export default Card;
