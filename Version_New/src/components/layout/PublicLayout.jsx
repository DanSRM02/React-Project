import React from 'react';
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';
import logo from '../../assets/img/logo.svg';

const PublicLayout = ({ children, title }) => {
    return (
        <>
            <Helmet>
                <title>{title}</title>
            </Helmet>

            {/* Header con navbar público */}
            <header className="bg-white shadow-md py-4">
                <div className="container mx-auto flex justify-between items-center px-6">
                    <div className="flex items-center space-x-4">
                        <Link to={"/"}>
                            <img
                                src={logo}
                                alt="Oxindustriales"
                                className="h-16 w-auto max-h-20 object-contain"
                            />
                        </Link>
                    </div>
                    <nav>
                        <ul className="flex space-x-6">
                            <li>
                                <Link to="/register" className="text-gray-700 hover:text-green-600">
                                    Registrarse
                                </Link>
                            </li>
                            <li>
                                <Link to="/login" className="text-gray-700 hover:text-green-600">
                                    Iniciar Sesión
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>

            {/* Contenido principal */}
            <main className="container mx-auto py-8 px-6 min-h-screen">
                {children}
            </main>

            {/* Footer */}
            <footer className="bg-gray-900 text-white text-center py-6">
                <p className="text-sm">
                    &copy; 2025 Oxindustriales - Todos los derechos reservados
                </p>
            </footer>
        </>
    );
};

export default PublicLayout;
