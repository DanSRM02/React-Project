import React from 'react';
import { FaIndustry, FaFlask, FaShippingFast } from "react-icons/fa";
import { Link } from 'react-router-dom';
import background from '../../assets/img/background.png';

const Home = () => {
  return (
    <div className="max-w-7xl mx-auto">
      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center h-[500px] flex items-center justify-center text-white text-center px-4 sm:px-6 md:px-8"
        style={{ backgroundImage: `url(${background})` }}
      >
        <div className="relative z-10 bg-black/50 p-8 sm:p-10 md:p-12 rounded-lg shadow-lg border border-gray-700">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold">
            ¡Bienvenidos a Oxindustriales!
          </h1>
          <p className="mt-4 text-base sm:text-lg md:text-xl font-light">
            Ofrecemos el mejor gas a precios accesibles con la más alta calidad y seguridad.
          </p>
          <Link
            to="/products"
            className="mt-6 inline-block bg-green-600 hover:bg-green-700 text-white px-6 sm:px-8 md:px-10 py-3 rounded-lg transition transform hover:scale-105"
          >
            Ver Productos
          </Link>
        </div>
      </section>

      {/* About Us */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-gray-900">
          Más Acerca de Nosotros
        </h2>
        <p className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed mb-8">
          Líderes en el suministro de gases industriales, garantizamos seguridad y calidad en cada producto.
          Desde oxígeno hasta nitrógeno, cubrimos todas tus necesidades con soluciones innovadoras y confiables.
        </p>

        {/* Features */}
        <section className="bg-gray-100 py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-6">
              Nuestros Servicios
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md">
                <FaIndustry className="text-green-600 text-4xl sm:text-5xl md:text-6xl mx-auto mb-4" />
                <h3 className="text-xl sm:text-2xl font-semibold">Suministro de Gases</h3>
                <p className="mt-2 text-sm sm:text-base text-gray-600">
                  Ofrecemos oxígeno, nitrógeno, argón, helio e hidrógeno con máxima calidad y seguridad.
                </p>
              </div>
              <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md">
                <FaFlask className="text-green-600 text-4xl sm:text-5xl md:text-6xl mx-auto mb-4" />
                <h3 className="text-xl sm:text-2xl font-semibold">Control de Calidad</h3>
                <p className="mt-2 text-sm sm:text-base text-gray-600">
                  Nuestros gases cumplen con las normativas más exigentes para uso industrial y médico.
                </p>
              </div>
              <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md">
                <FaShippingFast className="text-green-600 text-4xl sm:text-5xl md:text-6xl mx-auto mb-4" />
                <h3 className="text-xl sm:text-2xl font-semibold">Entrega Rápida</h3>
                <p className="mt-2 text-sm sm:text-base text-gray-600">
                  Contamos con una logística eficiente para entregas seguras y a tiempo.
                </p>
              </div>
            </div>
          </div>
        </section>
      </section>

      {/* Contact Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold mb-4">
          Contáctanos
        </h2>
        <p className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-gray-700 mb-6">
          Si necesitas más información sobre nuestros productos y servicios, no dudes en comunicarte con nosotros.
        </p>
        <a
          href="#contacto"
          className="inline-block bg-green-600 hover:bg-green-700 text-white px-6 sm:px-8 md:px-10 py-3 rounded-lg transition"
        >
          Escríbenos
        </a>
      </section>
    </div>
  );
};

export default Home;
