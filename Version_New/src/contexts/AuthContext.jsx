import React, { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { loginUser, fetchAddressById } from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // Stores user data (token, role, id)
    const [loading, setLoading] = useState(false); // For login operations
    const [authLoading, setAuthLoading] = useState(true); // For initial token check
    const [hasAddress, setHasAddress] = useState(null); // Boolean to indicate if user has address
    const [error, setError] = useState(null);

    // Helper to normalize role format from token
    const mapRoleFromToken = (roleToken) => {
        if (!roleToken) return "";
        let roleStr = Array.isArray(roleToken) ? roleToken[0] : roleToken;
        if (typeof roleStr === "string" && roleStr.startsWith("ROLE_")) {
            return roleStr.substring(5).toLowerCase();
        }
        return roleStr.toLowerCase();
    };

    // Initial authentication check using stored token
    useEffect(() => {
        const initAuth = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                setAuthLoading(false);
                return;
            }

            try {
                const decoded = jwtDecode(token);

                // Check token expiration
                if (decoded.exp && decoded.exp * 1000 < Date.now()) {
                    localStorage.removeItem("token");
                    setAuthLoading(false);
                    return;
                }

                const roleToken = decoded.roles || decoded.role;
                const userId = decoded.user_id;

                // Set user data
                setUser({
                    token,
                    role: mapRoleFromToken(roleToken),
                    id: userId
                });

                // Check if user has address
                try {
                    const addressResponse = await fetchAddressById(userId);
                    setHasAddress(!!addressResponse?.data);
                } catch (err) {
                    console.error("Error checking address:", err);
                    setHasAddress(false);
                }
            } catch (err) {
                console.error("Error decoding token:", err);
                localStorage.removeItem("token");
            } finally {
                setAuthLoading(false);
            }
        };

        initAuth();
    }, []);

    // Set up token expiration handler
    useEffect(() => {
        if (!user?.token) return;

        try {
            const decoded = jwtDecode(user.token);
            if (!decoded.exp) return;

            const expTime = decoded.exp * 1000;
            const timeout = expTime - Date.now();

            if (timeout <= 0) return;

            const timer = setTimeout(() => {
                logout();
                alert("Tu sesión ha expirado. Por favor, inicia sesión nuevamente.");
            }, timeout);

            return () => clearTimeout(timer);
        } catch (err) {
            console.error("Error processing token expiration:", err);
        }
    }, [user?.token]);

    // Login function
    const login = async (credentials) => {
        setLoading(true);
        setError(null);

        try {
            const response = await loginUser(credentials);

            if (!response?.jwt) {
                setError(new Error("No se encontró el token en la respuesta"));
                return null;
            }

            localStorage.setItem("token", response.jwt);
            const decoded = jwtDecode(response.jwt);
            const userId = decoded.user_id;

            // Set user data
            setUser({
                token: response.jwt,
                role: mapRoleFromToken(decoded.role),
                id: userId
            });

            // Check if user has address
            try {
                const addressResponse = await fetchAddressById(userId);
                setHasAddress(!!addressResponse?.data);
            } catch (err) {
                console.error("Error checking address:", err);
                setHasAddress(false);
            }

            return response;
        } catch (err) {
            console.error("Error during login:", err);
            setError(err);
            return null;
        } finally {
            setLoading(false);
        }
    };

    // Logout function
    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
        setHasAddress(null);
    };

    const contextValue = {
        user,
        hasAddress,
        login,
        logout,
        loading,
        authLoading,
        error
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);