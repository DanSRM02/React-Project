import apiClient from "./apiClient";

export const userService = {
    // Crear usuario (si lo necesitas)
    addUser: async (userData) => {
        try {
            console.log("addUser - Enviando datos:", userData);
            const response = await apiClient.post(
                "user/add",
                userData
            );
            console.log("addUser - Respuesta:", response.data);
            return response.data;
        } catch (error) {
            console.error("addUser - Error:", error);
            throw error;
        }
    },

    // Actualizar usuario
    updateUser: async (id, userData) => {
        try {
            console.log("updateUser - Actualizando usuario:", id, userData);
            const response = await apiClient.put(
                `user/update/${id}`,
                userData
            );
            console.log("updateUser - Respuesta:", response.data);
            return response.data;
        } catch (error) {
            console.error("updateUser - Error:", error);
            throw error;
        }
    },

    getDeliveriesActive: async () => {
        try {
            console.log("getDeliveriesActive - Solicitando todos los usuarios");
            const response = await apiClient.get("user/deliveries/active");
            console.log("getDeliveriesActive - Respuesta:", response.data);
            return response.data;
        } catch (error) {
            console.error("getDeliveriesActive - Error:", error);
            throw error;
        }
    },

    // Obtener todos los usuarios
    getAllUsers: async () => {
        try {
            console.log("getAllUsers - Solicitando todos los usuarios");
            const response = await apiClient.get("user/all");
            console.log("getAllUsers - Respuesta:", response.data);
            return response.data;
        } catch (error) {
            console.error("getAllUsers - Error:", error);
            throw error;
        }
    },

    // Obtener usuario por ID
    getUserById: async (id) => {
        try {
            console.log("getUserById - Solicitando usuario con ID:", id);
            const response = await apiClient.get(`user/find/${id}`);
            console.log("getUserById - Respuesta:", response.data);
            return response.data;
        } catch (error) {
            console.error("getUserById - Error:", error);
            throw error;
        }
    },

    // Eliminar usuario (si lo necesitas)
    deleteUser: async (id) => {
        try {
            console.log("deleteUser - Eliminando usuario con ID:", id);
            const response = await apiClient.delete(`user/delete/${id}`);
            console.log("deleteUser - Respuesta:", response.data);
            return response.data;
        } catch (error) {
            console.error("deleteUser - Error:", error);
            throw error;
        }
    }
};