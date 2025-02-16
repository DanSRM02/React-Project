import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ProductsAvailable from "../../utils/mocks/products.js";

// Modal de confirmación integrado sin portal
const ConfirmationModal = ({ isOpen, onCancel, onConfirm, title, message }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-lg transform transition-all">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    {title || "Confirmar Acción"}
                </h3>
                <p className="text-gray-600 mb-6">
                    {message || "¿Estás seguro de que deseas continuar?"}
                </p>
                <div className="flex justify-end gap-4">
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                    >
                        Confirmar
                    </button>
                </div>
            </div>
        </div>
    );
};

// Componente de tarjeta de producto
const ProductCard = ({ name, image, description, link, onShowModal }) => {
    return (
        <div className="bg-white shadow-lg rounded-xl overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-green-500">
            <div className="relative w-full h-48 sm:h-56 md:h-64">
                <img src={image} alt={name} className="w-full h-full object-contain" />
            </div>
            <div className="p-4 sm:p-6">
                <h5 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">
                    {name}
                </h5>
                <p className="text-gray-600 text-sm sm:text-base mb-4">{description}</p>
                <button
                    onClick={() => onShowModal(link)}
                    className="bg-green-600 text-white px-4 py-2 sm:px-5 sm:py-2.5 rounded-full hover:bg-green-700 transition duration-200"
                >
                    Ver más
                </button>
            </div>
        </div>
    );
};

// Sección de productos
const ProductsSection = ({ onShowModal }) => {
    return (
        <section className="py-16 bg-gray-100">
            <div className="container mx-auto px-4 sm:px-6 md:px-8 text-center">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-12">
                    Productos Disponibles
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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

// Componente principal de Productos
const Products = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [redirectLink, setRedirectLink] = useState("");
    const navigate = useNavigate();

    const openModal = (link) => {
        setRedirectLink(link);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleConfirm = () => {
        setIsModalOpen(false);
        navigate(redirectLink);
    };

    return (
        <div className="relative">
            <ProductsSection onShowModal={openModal} />
            {isModalOpen && (
                <ConfirmationModal
                    isOpen={isModalOpen}
                    title="Confirmar Acción"
                    message="Vas a salir de la página actual para ver la ficha técnica del producto. ¿Estás seguro?"
                    onCancel={closeModal}
                    onConfirm={handleConfirm}
                />
            )}
        </div>
    );
};

export default Products;
