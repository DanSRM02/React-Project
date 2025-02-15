import React from 'react';
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';
import logo from '../../assets/img/logo.svg'

const Layout = ({ children, title }) => {
    return (
        <>
            <Helmet>
                <title>{title}</title>
            </Helmet>
            {/* Header */}
            <header className="bg-white shadow-md py-4">
                <div className="container mx-auto flex justify-between items-center px-6">
                    <div className="flex items-center space-x-4">
                        <img
                            src={logo}
                            alt="Oxindustriales"
                            className="h-16 w-auto max-h-20 object-contain"
                        />
                    </div>
                    <nav>
                        <ul className="flex space-x-6">
                            <li><Link to="/" className="text-gray-700 hover:text-green-600">Nosotros</Link></li>
                            <li><Link to="#contacto" className="text-gray-700 hover:text-green-600">Contacto</Link></li>
                            <li><Link to="#" className="text-gray-700 hover:text-green-600">Iniciar sesión</Link></li>
                        </ul>
                    </nav>
                </div>
            </header>

            {/* Contenido principal */}
            <main className="main-content container mx-auto py-8 px-6 min-h-screen">
                {children}
            </main>

            {/* Footer */}
            <footer className="bg-gray-900 text-white text-center py-6">
                <p className="text-sm">&copy; 2025 Oxindustriales - Todos los derechos reservados</p>
            </footer>
        </>
    );
};

export default Layout;
