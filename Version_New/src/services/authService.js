import apiClient from "./apiClient";

export const registerUser = async (registrationData) => {
    console.debug("Enviando solicitud a /auth/register con datos:", registrationData);
    const response = await apiClient.post("/auth/register", { data: registrationData });
    console.debug("Respuesta recibida de /auth/register:", response.data);
    return response.data;
};
