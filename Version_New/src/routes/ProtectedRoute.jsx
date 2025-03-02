import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const ProtectedRoute = ({ allowedRoles, children }) => {
    const { user, authLoading } = useAuth();
    const location = useLocation();

    if (authLoading) {
        return (
            <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
                <div className="w-16 h-16 border-4 border-t-4 border-gray-300 rounded-full animate-spin"></div>
                <p className="mt-4 text-lg text-gray-600">Cargando, por favor espera...</p>
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    const userRole = user.role.toLowerCase();
    if (!allowedRoles.includes(userRole)) {
        return <Navigate to={`/${userRole}/home`} replace />;
    }

    return children;
};

export default ProtectedRoute;