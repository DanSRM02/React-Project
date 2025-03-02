import React, { useState, useEffect } from 'react';
import { Helmet } from "react-helmet";
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/img/logo.svg';
import Input from '../UI/Input';
import CircleButton from '../UI/CircleButton';
import { FaTimes, FaBars } from '../UI/Icons';
import { useAuth } from '../../contexts/AuthContext';
import RoutesSidebar from '../../utils/RoutesSidebar';

const PrivateLayout = ({ children, role, title }) => {
    const navigate = useNavigate();
    const { logout, user, loading } = useAuth();
    const [isOpen, setIsOpen] = useState(false);

    // Si no se pasa role como prop, usamos el rol del usuario del contexto.
    const effectiveRole = role || (user ? user.role : "");
    // Obtenemos los links dinámicamente según el rol (asegúrate que RoutesSidebar tenga claves en minúscula: client, vendor, etc.)
    const links = RoutesSidebar[effectiveRole] || [];

    useEffect(() => {
        // Si no está autenticado y no se está cargando, redirige al login
        if (!loading && !user) {
            navigate("/login");
        }
        // Si se requiere un rol específico y el usuario no lo tiene, redirige a una ruta de no autorizado o a la home de su rol
        if (user && role && !user.role.includes(role.toLowerCase())) {
            navigate(`/${user.role}/home`);
        }
    }, [user, loading, role, navigate]);

    // Manejar cierre de sesión
    const handleLogout = () => {
        logout(); // Llamar la función de logout
        navigate("/login"); // Redirigir al login
    };

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
                            <button onClick={handleLogout}>
                                <img
                                    src={logo}
                                    alt="Usuario"
                                    className="h-10 w-10 rounded-full border-2 border-green-600"
                                />
                            </button>
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
                    className={`fixed md:static top-16 md:top-0 left-0 h-screen w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 z-40
            ${isOpen ? "translate-x-0" : "-translate-x-full"}
            md:translate-x-0`}
                >
                    <div className="h-16 hidden md:flex items-center justify-center border-b border-gray-200">
                        <h1 className="text-lg font-bold text-green-700">{title}</h1>
                    </div>
                    <nav className="flex flex-col p-4 space-y-2">
                        {links.length > 0 ? (
                            links.map((link) => (
                                <Link
                                    key={link.to}
                                    to={link.to}
                                    className="block px-4 py-2 text-gray-700 hover:bg-green-600 hover:text-white rounded transition"
                                >
                                    {link.label}
                                </Link>
                            ))
                        ) : (
                            <span className="text-gray-500">No hay menú disponible</span>
                        )}
                    </nav>
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