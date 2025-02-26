import { useState } from "react";
import { loginUser } from "../../../services/authService";

export const useAuthenticate = () => {
    // Estado para las credenciales o datos de login.
    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
      });
    // Estado para saber si se está procesando la petición.
    const [loading, setLoading] = useState(false);
    // Estado para capturar errores.
    const [error, setError] = useState(null);
    // Estado para data user
    const [user, setUser] = useState([]);

    const handleChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value,
        });
    };

    // Función que realiza el login
    const authenticateUser = async () => {
        setLoading(true);
        setError(null);

        console.debug("Enviando datos de autenticación:", credentials);

        try {
            // Aquí llamamos a la función que realiza la petición de login.
            const response = await loginUser(credentials);

            if (!response) {
                console.error("Error: no se recibió respuesta al iniciar sesión");
            }

            // Puedes procesar la respuesta (por ejemplo, guardar un token) aquí.
            setUser(response.data)
            
            
        } catch (err) {
            console.error("Error al enviar la petición de inicio de sesión:", err);
            setError(err);
            return null;
        } finally {
            setLoading(false);
        }
    };

    return { credentials, handleChange, authenticateUser, loading, error };
};
