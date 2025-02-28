// src/contexts/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { loginUser } from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // Guardará { token, role }
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Función para mapear el rol del token
    const mapRoleFromToken = (roleToken) => {
        if (!roleToken) return "";
        let roleStr = Array.isArray(roleToken) ? roleToken[0] : roleToken;
        if (typeof roleStr === "string" && roleStr.startsWith("ROLE_")) {
            return roleStr.substring(5).toLowerCase();
        }
        return roleStr.toLowerCase();
    };

    // Al montar, buscamos un token en localStorage y lo decodificamos para obtener el rol
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const decoded = jwtDecode(token);
                const roleToken = decoded.roles || decoded.role;
                setUser({ token, role: mapRoleFromToken(roleToken) });
            } catch (err) {
                console.error("Error al decodificar el token", err);
                localStorage.removeItem("token");
            }
        }
    }, []);

    // Efecto para auto logout cuando el token expire
    useEffect(() => {
        if (user && user.token) {
            try {
                const decoded = jwtDecode(user.token);
                if (decoded.exp) {
                    const expTime = decoded.exp * 24000000; 
                    const timeout = expTime - Date.now();
                    if (timeout > 0) {
                        const timer = setTimeout(() => {
                            logout();
                            alert("Tu sesión ha expirado. Por favor, inicia sesión nuevamente.");
                        }, timeout);
                        return () => clearTimeout(timer);
                    } else {
                        // Si el token ya expiró, hacemos logout de inmediato
                        logout();
                    }
                }
            } catch (err) {
                console.error("Error procesando la expiración del token:", err);
            }
        }
    }, [user]);

    // Función de login
    const login = async (credentials) => {
        setLoading(true);
        setError(null);        
        
        try {
            const response = await loginUser(credentials);
            if (response && response.jwt) {
                localStorage.setItem("token", response.jwt);
                console.log("JWT almacenado:", response.jwt);

                const decoded = jwtDecode(response.jwt);
                console.log("Decoded role:", decoded.role);

                const roleToken = mapRoleFromToken(decoded.role);
                console.log("Mapped role:", roleToken);

                setUser({ token: response.jwt, role: roleToken });
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

    // Función para cerrar sesión
    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading, error }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook para consumir el contexto
export const useAuth = () => useContext(AuthContext);