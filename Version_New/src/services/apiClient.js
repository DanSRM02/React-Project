import axios from "axios";

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE,
    headers: {
        "Content-Type": "application/json"
    },
});

apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        console.debug("Solicitud enviada con headers:", config.headers);
        return config;
    },
    (error) => Promise.reject(error)
);
export default apiClient;
