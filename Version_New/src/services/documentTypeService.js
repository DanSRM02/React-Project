import apiClient from "./apiClient"; // Ajusta la ruta según tu estructura de carpetas

export const getAllDocumentTypes = async () => {
  console.debug("Obteniendo todos los tipos de documento...");
  const response = await apiClient.get("/document-type/all");
  console.debug("Respuesta de /document-type/all:", response.data);
  return response.data; 
};