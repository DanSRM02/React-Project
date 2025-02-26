import axios from "axios";

const apiClient = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE}`,    
});

// Configura un interceptor si lo necesitas
apiClient.interceptors.request.use(
    (config) => {
        // Si es necesario, agrega token u otros headers
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        console.debug("Enviando solicitud:", config);
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default apiClient;
