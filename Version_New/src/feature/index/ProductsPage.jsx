import React from "react";
import { Link } from "react-router-dom";
import ProductsAvailable from "../../utils/mocks/products.js";

const ProductCard = ({ name, image, description, link, onShowModal }) => {
    return (
        <div className="bg-white rounded-xl overflow-hidden shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl">
            <div className="relative h-56 sm:h-64 md:h-72">
                <img
                    src={image}
                    alt={name}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-50"></div>
            </div>
            <div className="p-6">
                <h5 className="text-xl font-bold text-gray-800 mb-2">{name}</h5>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {description}
                </p>
                <button
                    onClick={() => onShowModal(link)}
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-full transition"
                >
                    Ver Detalles
                </button>
            </div>
        </div>
    );
};

const ProductsSection = ({ onShowModal }) => {
    return (
        <section className="py-16 bg-gray-100">
            <div className="container mx-auto px-4 sm:px-6 md:px-8">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-gray-800 mb-12">
                    Productos Disponibles
                </h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {ProductsAvailable.map((product, index) => (
                        <ProductCard
                            key={index}
                            name={product.name}
                            image={product.image}
                            description={product.description}
                            link={product.link}
                            onShowModal={onShowModal}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProductsSection;
