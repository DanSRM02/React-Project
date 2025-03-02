import React, { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { loginUser } from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // Guardará { token, role }
    const [loading, setLoading] = useState(false); // Para operaciones de login
    const [authLoading, setAuthLoading] = useState(true); // Para rehidratar el token
    const [error, setError] = useState(null);

    const mapRoleFromToken = (roleToken) => {
        if (!roleToken) return "";
        let roleStr = Array.isArray(roleToken) ? roleToken[0] : roleToken;
        if (typeof roleStr === "string" && roleStr.startsWith("ROLE_")) {
            return roleStr.substring(5).toLowerCase();
        }
        return roleStr.toLowerCase();
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const decoded = jwtDecode(token);
                const roleToken = decoded.roles || decoded.role;
                setUser({
                    token,
                    role: mapRoleFromToken(roleToken),
                    id: decoded.user_id 
                });
            } catch (err) {
                console.error("Error al decodificar el token", err);
                localStorage.removeItem("token");
            }
        }
        setAuthLoading(false);
    }, []);

    useEffect(() => {
        if (user && user.token) {
            try {
                const decoded = jwtDecode(user.token);
                if (decoded.exp) {
                    const expTime = decoded.exp * 1000;
                    const timeout = expTime - Date.now();
                    if (timeout > 0) {
                        const timer = setTimeout(() => {
                            logout();
                            alert("Tu sesión ha expirado. Por favor, inicia sesión nuevamente.");
                        }, timeout);
                        return () => clearTimeout(timer);
                    }
                }
            } catch (err) {
                console.error("Error procesando la expiración del token:", err);
            }
        }
    }, [user]);

    const login = async (credentials) => {
        setLoading(true);
        setError(null);
        try {
            const response = await loginUser(credentials);
            if (response && response.jwt) {
                localStorage.setItem("token", response.jwt);
                const decoded = jwtDecode(response.jwt);
                setUser({
                    token: response.jwt,
                    role: mapRoleFromToken(decoded.role),
                    id: decoded.user_id 
                });
            } else {
                setError(new Error("No se encontró el token en la respuesta"));
            }
            return response;
        } catch (err) {
            console.error("Error en el login:", err);
            setError(err);
            return null;
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading, authLoading, error }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);