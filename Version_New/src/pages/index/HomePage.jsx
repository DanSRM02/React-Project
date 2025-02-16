import React from 'react';
import { FaIndustry, FaFlask, FaShippingFast } from "react-icons/fa";
import { Link } from 'react-router-dom';
import background from '../../assets/img/background.png';

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center h-[500px] flex items-center justify-center text-white text-center px-6"
        style={{ backgroundImage: `url(${background})` }}
      >
        <div className="relative z-10 bg-black bg-opacity-50 p-8 rounded-lg shadow-lg border border-gray-700">
          <h1 className="text-5xl font-extrabold">¡Bienvenidos a Oxindustriales!</h1>
          <p className="text-lg mt-4 font-light">
            Ofrecemos el mejor gas a precios accesibles con la más alta calidad y seguridad.
          </p>
          <Link
            to="/products"
            className="mt-6 inline-block bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg transition transform hover:scale-105"
          >
            Ver Productos
          </Link>
        </div>
      </section>

      {/* About Us */}
      <section className="container mx-auto py-14 px-6 text-center">
        <h2 className="text-4xl font-bold mb-8 text-gray-900">Más Acerca de Nosotros</h2>
        <p className="text-gray-700 max-w-2xl mx-auto text-lg leading-relaxed mb-10">
          Líderes en el suministro de gases industriales, garantizamos seguridad y calidad en cada producto.
          Desde oxígeno hasta nitrógeno, cubrimos todas tus necesidades con soluciones innovadoras y confiables.
        </p>

        {/* Features */}
        <section className="bg-gray-100 py-16 px-6">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-semibold mb-10">Nuestros Servicios</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 shadow-md rounded-lg">
                <FaIndustry className="text-green-600 text-6xl mx-auto mb-4" />
                <h3 className="text-xl font-semibold">Suministro de Gases</h3>
                <p className="text-gray-600 mt-2">
                  Ofrecemos oxígeno, nitrógeno, argón, helio e hidrógeno con máxima calidad y seguridad.
                </p>
              </div>
              <div className="bg-white p-6 shadow-md rounded-lg">
                <FaFlask className="text-green-600 text-6xl mx-auto mb-4" />
                <h3 className="text-xl font-semibold">Control de Calidad</h3>
                <p className="text-gray-600 mt-2">
                  Nuestros gases cumplen con las normativas más exigentes para uso industrial y médico.
                </p>
              </div>
              <div className="bg-white p-6 shadow-md rounded-lg">
                <FaShippingFast className="text-green-600 text-6xl mx-auto mb-4" />
                <h3 className="text-xl font-semibold">Entrega Rápida</h3>
                <p className="text-gray-600 mt-2">
                  Contamos con una logística eficiente para entregas seguras y a tiempo.
                </p>
              </div>
            </div>
          </div>
        </section>
      </section>

      {/* Contact Section */}
      <section className="container mx-auto py-16 px-6 text-center">
        <h2 className="text-3xl font-semibold mb-6">Contáctanos</h2>
        <p className="text-gray-700 max-w-2xl mx-auto">
          Si necesitas más información sobre nuestros productos y servicios, no dudes en comunicarte con nosotros.
        </p>
        <a
          href="#contacto"
          className="mt-4 inline-block bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition"
        >
          Escríbenos
        </a>
      </section>
    </div>

  );
};

export default Home;
