import React from 'react';
import { Link } from "react-router-dom"

const CardClient = ({ title, description, linkLabel, linkTo  }) => {
    return (
        <div className="bg-white shadow rounded-lg p-6 flex flex-col justify-between">
            <div>
                <h2 className="text-xl font-semibold mb-2">{title}</h2>
                <p className="text-gray-600">
                    {description}
                </p>
            </div>
            <Link
                to={linkTo}
                className="mt-4 inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
            >
                {linkLabel}
            </Link>
        </div>
    )
}

export default CardClient