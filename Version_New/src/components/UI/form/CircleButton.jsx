import React from "react";

const CircleButton = () => {
    return (
        <button className="p-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition">
            <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C8.67 6.165 8 7.388 8 8.75v5.408c0 .39-.149.765-.405 1.045L6 17h5m4 0a3 3 0 11-6 0h6z"></path>
            </svg>
        </button>
    )

}

export default CircleButton