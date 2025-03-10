import apiClient from "./apiClient";

export const getAllUnits = async () => {
    try {
        console.log("getAllUnits - Solicitando todas las unidades");
        const response = await apiClient.get("unit/all");
        console.log("getAllUnits - Respuesta:", response.data);
        return response.data;
    } catch (error) {
        console.error("getAllUnits - Error:", error);
        throw error;
    }
};
