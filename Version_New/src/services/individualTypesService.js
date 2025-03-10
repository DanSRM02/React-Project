import apiClient from "./apiClient"; // Ajusta la ruta según tu estructura

export const getAllIndividualTypes = async () => {
  console.debug("Obteniendo todos los tipos de individuo...");
  const response = await apiClient.get("/individual-type/all");
  console.debug("Respuesta de /individual-type/all:", response.data);
  return response.data; 
};