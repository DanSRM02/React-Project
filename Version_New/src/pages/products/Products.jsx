import React from "react";
import Layout from "../../Components/layout/Layout";
import ProductsAvailable from "../../utils/mocks/products.js";

const ProductCard = ({ name, image, description }) => {
    return (
        <div className="bg-white shadow-lg rounded-xl overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-green-500">
            <div className="relative w-full h-48">
                <img
                    src={image}
                    alt={name}
                    className="w-full h-full object-contain"
                />
            </div>
            <div className="p-4">
                <h5 className="text-xl font-semibold text-gray-800 mb-2">
                    {name}
                </h5>
                <p className="text-gray-600 text-sm mb-4">
                    {description}
                </p>
                <button className="bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition duration-200">
                    Ver más
                </button>
            </div>
        </div>
    );
};

const ProductsSection = () => {
    return (
        <section className="py-16 bg-gray-100">
            <div className="container mx-auto text-center">
                <h1 className="text-4xl font-bold text-gray-800 mb-12">
                    Productos Disponibles
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-6">
                    {ProductsAvailable.map((product, index) => (
                        <ProductCard
                            key={index}
                            name={product.name}
                            image={product.image}
                            description={product.description}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

const Products = () => {
    return (
        <Layout title={"Oxindustriales - Gases Disponibles"}>
            <ProductsSection />
        </Layout>
    );
};

export default Products;
