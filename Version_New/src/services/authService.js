import apiClient from "./apiClient";

export const registerUser = async (registrationData) => {
    console.debug("Enviando solicitud a /auth/register con datos:", registrationData);
    const response = await apiClient.post("/auth/register", { data: registrationData });
    console.debug("Respuesta recibida de /auth/register:", response.data);
    return response.data;
};

export const loginUser = async (authetication) => {
    console.log("Enviando solicitud a /auth/login con datos:", authetication);
    const response = await apiClient.post("/auth/login", { data: authetication },);
    return response.data;
}

export const fetchAddressById = async (id) => {
    console.log("Enviando solicitud a /auth/login con datos:", id);
    const response = await apiClient.get(`/auth/has-address/${id}`);
    return response.data;
}

export const changePassword = async (id, userData) => {
    console.log("Enviando solicitud a /auth/change-password con datos:", userData);
    const response = await apiClient.post(`/auth/change-password/${id}`, { data: userData },);
    return response.data;
}