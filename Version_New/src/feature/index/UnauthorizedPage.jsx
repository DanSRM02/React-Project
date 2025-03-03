import { Link } from "react-router-dom";
import { FaExclamationTriangle } from "react-icons/fa";

const UnauthorizedPage = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
            <div className="max-w-md w-full text-center bg-white p-8 rounded-lg shadow-md">
                <div className="flex flex-col items-center">
                    <FaExclamationTriangle className="text-6xl text-yellow-500 mb-4" />
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">
                        Acceso no autorizado
                    </h1>
                    <p className="text-gray-600 mb-6">
                        No tienes los permisos necesarios para acceder a esta página.
                    </p>
                    <Link
                        to="/"
                        className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-6 rounded-lg transition-colors"
                    >
                        Volver al inicio
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default UnauthorizedPage;