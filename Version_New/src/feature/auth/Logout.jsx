import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useEffect } from 'react';

export const Logout = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        logout();
        navigate('/login');
    }, [logout, navigate]);

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="animate-pulse">
                <p className="text-gray-600">Cerrando sesión...</p>
            </div>
        </div>
    );
};