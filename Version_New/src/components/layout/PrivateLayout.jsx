import React, { useState } from 'react';
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';
import logo from '../../assets/img/logo.svg';
import Input from '../UI/Input';
import CircleButton from '../UI/CircleButton';
import RoutesSidebar from '../../utils/routesSidebar';
import { FaTimes, FaBars } from '../UI/Icons';

const PrivateLayout = ({ children, role = 'client', title }) => {
    // Obtenemos el menú correspondiente al rol o un arreglo vacío si no coincide
    const links = RoutesSidebar[role] || [];
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <Helmet>
                <title>{title}</title>
            </Helmet>

            {/* Header privado */}
            <header className="bg-white shadow-md py-4">
                <div className="container mx-auto flex justify-between items-center px-6">
                    {/* Logo */}
                    <Link to="/">
                        <img
                            src={logo}
                            alt="Oxindustriales"
                            className="h-16 w-auto max-h-20 object-contain"
                        />
                    </Link>

                    {/* Elementos adicionales: búsqueda, notificaciones, avatar y botón menú */}
                    <div className="flex items-center space-x-4">
                        {/* Búsqueda y botones visibles a partir de md */}
                        <div className="hidden md:flex items-center space-x-4">
                            <Input text="Buscar..." />
                            <CircleButton />
                            <Link to="/profile">
                                <img
                                    src={logo}
                                    alt="Usuario"
                                    className="h-10 w-10 rounded-full border-2 border-green-600"
                                />
                            </Link>
                        </div>

                        {/* Botón hamburguesa para pantallas pequeñas */}
                        <button
                            className="md:hidden text-gray-700 hover:text-green-600"
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                        </button>
                    </div>
                </div>
            </header>

            {/* Contenedor principal: Menú lateral + Contenido */}
            <div className="min-h-screen flex relative">
                {/* Menú lateral dinámico */}
                <aside
                    className={`fixed md:static top-0 left-0 h-screen w-64 bg-gray-100 p-6 border-r border-gray-300 transform transition-transform duration-300 z-40
              ${isOpen ? "translate-x-0" : "-translate-x-full"}
              md:translate-x-0`}
                >
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold text-green-600">{title}</h1>
                    </div>
                    <ul className="space-y-2">
                        {links.map((link) => (
                            <li key={link.to}>
                                <Link
                                    to={link.to}
                                    className="block px-4 py-2 text-gray-700 hover:bg-green-600 hover:text-white rounded transition"
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </aside>

                {/* Contenido principal */}
                <main className="flex-1 p-6 bg-gray-50 md:ml-0">
                    {/* Barra de búsqueda, notificaciones y avatar en pantallas pequeñas */}
                    <div className="flex items-center justify-end mb-4 md:hidden space-x-4">
                        <Input placeholder="Buscar..." className="hidden md:block" />
                        <CircleButton />
                        <Link to="/profile">
                            <img
                                src={logo}
                                alt="Usuario"
                                className="h-10 w-10 rounded-full border-2 border-green-600"
                            />
                        </Link>
                    </div>

                    {children}
                </main>
            </div>

            {/* Footer */}
            <footer className="bg-gray-900 text-white text-center py-6">
                <p className="text-sm">
                    &copy; 2025 Oxindustriales - Todos los derechos reservados
                </p>
            </footer>
        </>
    );

};

export default PrivateLayout;
