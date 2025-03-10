import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const ProtectedRoute = ({ allowedRoles, requireAddress = false, children }) => {
    const { user, hasAddress, authLoading } = useAuth();
    const location = useLocation();

    // Show loading spinner while authentication is being checked
    if (authLoading) {
        return (
            <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
                <div className="w-16 h-16 border-4 border-t-4 border-gray-300 rounded-full animate-spin"></div>
                <p className="mt-4 text-lg text-gray-600">Cargando, por favor espera...</p>
            </div>
        );
    }

    // Redirect to login if not authenticated
    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // Check role permission
    const userRole = user.role.toLowerCase();
    if (!allowedRoles.includes(userRole)) {
        return <Navigate to={`/${userRole}/home`} replace />;
    }

    // Check address requirement for client role
    if (userRole === 'cliente' && requireAddress && !hasAddress) {
        return <Navigate to="/client/account" state={{
            from: location,
            message: "Debes tener una dirección registrada para realizar esta acción"
        }} replace />;
    }

    // All checks passed, render children
    return children;
};

export default ProtectedRoute;