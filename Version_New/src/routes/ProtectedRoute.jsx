import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const ProtectedRoute = ({ allowedRoles, children }) => {
    const { user } = useAuth();

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    const userRole = user.role.toLowerCase();
    if (!allowedRoles.includes(userRole)) {
        return <Navigate to={`/${userRole}/home`} replace />;
    }

    return children;
};

export default ProtectedRoute;
